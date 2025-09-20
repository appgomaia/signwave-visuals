-- Fix critical security issue: Remove public access to customer personal data in orders table
-- Drop the overly permissive policy that allows anyone to read all order data
DROP POLICY IF EXISTS "orders_public_select" ON public.orders;

-- Create secure policies for order data access
-- Policy 1: Customers can view their own orders (requires authentication and matching customer_id or user_id)
-- This assumes orders are linked to customers via customer_id or a user_id field
CREATE POLICY "Customers can view own orders" 
ON public.orders 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND (
    -- If customer has user_id, match directly
    (customer_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.customers 
      WHERE customers.id = orders.customer_id 
      AND customers.user_id = auth.uid()
    ))
    -- Or match by email if customer is authenticated
    OR (customer_email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ))
  )
);

-- Policy 2: Admins can view all orders
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);

-- Policy 3: Allow legitimate order creation (for checkout process)
-- Only allow INSERT if the customer email matches authenticated user or admin is creating
CREATE POLICY "Controlled order creation" 
ON public.orders 
FOR INSERT 
WITH CHECK (
  -- Admin can create any order
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
  OR
  -- Authenticated users can create orders with their own email
  (
    auth.uid() IS NOT NULL 
    AND customer_email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  )
);

-- Policy 4: Admins can update orders (for order management)
CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);

-- Policy 5: Admins can delete orders (for order management)
CREATE POLICY "Admins can delete orders" 
ON public.orders 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);

-- Also secure the order_items table to prevent data leakage through related items
-- Drop any existing permissive policies on order_items
DROP POLICY IF EXISTS "order_items_public_select" ON public.order_items;
DROP POLICY IF EXISTS "Allow all for authenticated" ON public.order_items;

-- Add RLS to order_items if not already enabled
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy for order_items: Users can only see items for orders they have access to
CREATE POLICY "Users can view order items for accessible orders" 
ON public.order_items 
FOR SELECT 
USING (
  -- Admin access
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
  OR
  -- Customer access to their own order items
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id
    AND (
      -- Customer owns the order
      (orders.customer_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.customers 
        WHERE customers.id = orders.customer_id 
        AND customers.user_id = auth.uid()
      ))
      -- Or email matches authenticated user
      OR (orders.customer_email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      ))
    )
  )
);

-- Allow admins to manage order items
CREATE POLICY "Admins can manage order items" 
ON public.order_items 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admins 
    WHERE user_id = auth.uid() 
    AND active = true
  )
);

-- Add security comment
COMMENT ON TABLE public.orders IS 
'Orders table with strict RLS policies. Customer personal data is protected - only accessible to the customer who owns the order or authenticated admins. Prevents unauthorized access to names, emails, phone numbers, and shipping addresses.';