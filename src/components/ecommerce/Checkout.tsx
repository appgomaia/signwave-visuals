import React, { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Building, LogIn, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/useCart';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LoginDialog } from '@/components/auth/LoginDialog';

const checkoutSchema = z.object({
  // Shipping Address
  street: z.string().min(5, 'Address must be at least 5 characters'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Neighborhood is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  
  // Payment
  paymentMethod: z.enum(['credit_card', 'paypal']),
  
  // Credit Card fields (conditional)
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  
  // PayPal fields (conditional)
  paypalEmail: z.string().optional(),
  
  // Additional
  notes: z.string().optional()
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'credit_card') {
    if (!data.cardNumber || data.cardNumber.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card number is required",
        path: ["cardNumber"]
      });
    }
    if (!data.cardName || data.cardName.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cardholder name is required",
        path: ["cardName"]
      });
    }
    if (!data.cardExpiry || data.cardExpiry.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expiry date is required",
        path: ["cardExpiry"]
      });
    }
    if (!data.cardCvv || data.cardCvv.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CVV is required",
        path: ["cardCvv"]
      });
    }
  }
  
  if (data.paymentMethod === 'paypal') {
    if (!data.paypalEmail || data.paypalEmail.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "PayPal email is required",
        path: ["paypalEmail"]
      });
    } else if (!z.string().email().safeParse(data.paypalEmail).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address",
        path: ["paypalEmail"]
      });
    }
  }
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface CheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack, onSuccess }) => {
  const { state, clearCart } = useCart();
  
  // Check auth state and fetch customer data
  useEffect(() => {
    // 1) Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Defer Supabase calls to avoid deadlocks
        setTimeout(async () => {
          const { data: customerData } = await supabase
            .from('customers')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setCustomer(customerData ?? null);
        }, 0);
      } else {
        setUser(null);
        setCustomer(null);
      }
    });

    // 2) Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setTimeout(async () => {
          const { data: customerData } = await supabase
            .from('customers')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setCustomer(customerData ?? null);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const [user, setUser] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      // Shipping
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      // Payment
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      paypalEmail: '',
      // Additional
      notes: ''
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const onSubmit = async (data: CheckoutForm) => {
    if (state.items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Add items to cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    // Require auth to place order due to database security policies
    const { data: authData } = await supabase.auth.getUser();
    const authUser = authData?.user;
    if (!authUser) {
      toast({
        title: "Sign in required",
        description: "Please sign in to place your order. Your cart is saved.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create shipping address object
      const shippingAddress = {
        street: data.street,
        number: data.number,
        complement: data.complement || '',
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      };

      // Create order in database (ensure customer_email matches auth email for RLS)
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customer?.id || null,
          customer_name: customer?.full_name || (authUser.user_metadata?.full_name as string | undefined) || authUser.email,
          customer_email: authUser.email, // Must match auth.users.email for RLS
          customer_phone: customer?.phone || customer?.phone_number,
          total: state.total,
          payment_method: data.paymentMethod,
          shipping_address: shippingAddress,
          notes: data.notes || '',
          status: 'Pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = state.items.map(item => ({
        order_id: order.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and show success
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.invoice_number || order.id.slice(0, 8)} has been created. You will receive a confirmation email shortly.`
      });

      onSuccess();

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Error processing order",
        description: error.message || "Please try again or contact us.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Empty Cart</h1>
        <p className="text-muted-foreground mb-8">
          Add products to your cart before checkout.
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Customer Info Section */}
            {user ? (
              <GlassCard className="p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Welcome back!</h2>
                </div>
                <div className="bg-primary/5 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{customer?.full_name || user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{customer?.email || user.email}</p>
                    </div>
                    {customer?.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{customer.phone}</p>
                      </div>
                    )}
                    {customer?.company && (
                      <div>
                        <p className="text-sm text-muted-foreground">Company</p>
                        <p className="font-medium">{customer.company}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <button
                      onClick={() => supabase.auth.signOut()}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Sign out and checkout as guest
                    </button>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-6 mb-8">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4">Already have an account?</h2>
                  <p className="text-muted-foreground mb-4">
                    Sign in to use your saved information and track your orders.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <LoginDialog>
                      <GlassButton variant="outline" className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </GlassButton>
                    </LoginDialog>
                    <LoginDialog defaultTab="signup">
                      <GlassButton variant="ghost" className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create Account
                      </GlassButton>
                    </LoginDialog>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      New customers can continue as guest below
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Address */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apartment/Suite</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neighborhood *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" placeholder="CA" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="md:w-48">
                          <FormLabel>ZIP Code *</FormLabel>
                          <FormControl>
                            <Input {...field} className="glass-input" placeholder="12345" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </GlassCard>

                {/* Payment Method */}
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Payment Method</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50">
                              <RadioGroupItem value="credit_card" id="credit_card" />
                              <Label htmlFor="credit_card" className="flex-1 cursor-pointer">Credit Card (Test Mode)</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border/50 hover:border-primary/50">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Dynamic Payment Fields */}
                  {form.watch('paymentMethod') === 'credit_card' && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <h3 className="text-lg font-medium mb-4">Credit Card Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Card Number *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="glass-input" 
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Cardholder Name *</FormLabel>
                              <FormControl>
                                <Input {...field} className="glass-input" placeholder="John Doe" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="glass-input" 
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardCvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV *</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  className="glass-input" 
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        ⚠️ Test Mode: <br/>
                        • Card Number: 4242 4242 4242 4242<br/>
                        • Cardholder Name: Any name<br/>
                        • Expiry Date: Any future date (e.g., 12/25)<br/>
                        • CVV: Any 3 digits (e.g., 123)
                      </p>
                    </div>
                  )}
                  
                  {form.watch('paymentMethod') === 'paypal' && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <h3 className="text-lg font-medium mb-4">PayPal Information</h3>
                      <FormField
                        control={form.control}
                        name="paypalEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PayPal Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="email"
                                className="glass-input" 
                                placeholder="your-email@paypal.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-sm text-muted-foreground mt-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}
                </GlassCard>

                {/* Additional Notes */}
                <GlassCard className="p-6">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="glass-input min-h-20"
                            placeholder="Additional information about your order..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </GlassCard>

                {/* Submit Button */}
<GlassButton 
  type="submit" 
  className="w-full" 
  size="lg"
  disabled={isSubmitting || !user}
>
  {isSubmitting ? "Processing..." : user ? "Place Order" : "Sign in to place order"}
</GlassButton>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/50 pt-4 mt-6">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Frete:</span>
                  <span className="text-success">Grátis</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border/30">
                  <span>Total:</span>
                  <span className="text-gradient">{formatPrice(state.total)}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Ao finalizar a compra, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
  );
};