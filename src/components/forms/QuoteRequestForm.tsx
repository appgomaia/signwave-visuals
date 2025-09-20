import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, Building, FileText } from 'lucide-react';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Select a project type'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget: z.string().min(1, 'Select a budget range'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const projectTypes = [
  'Commercial Signs',
  'Digital Signage',
  'Vehicle Wraps',
  'Stands and Displays',
  'Industrial Signage',
  'Other',
];

const budgetRanges = [
  'Up to $1,000',
  '$1,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  'Above $25,000',
];

export const QuoteRequestForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const { error } = await supabase
        .from('orcamentos')
        .insert({
          nome: data.name,
          email: data.email,
          telefone: data.phone,
          empresa: data.company || null,
          servico: data.projectType,
          descricao: data.description,
          orcamento_estimado: null, // Will be filled by admin
          status: 'pendente',
          prioridade: 'media',
        });

      if (error) {
        console.error('Error submitting quote:', error);
        throw error;
      }
      
      toast({
        title: "Quote requested successfully!",
        description: "We will contact you within 24 hours.",
      });
      
      reset();
    } catch (error) {
      console.error('Quote submission error:', error);
      toast({
        title: "Error requesting quote",
        description: "Please try again in a few minutes.",
        variant: "destructive",
      });
    }
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Request Your Quote</h2>
        <p className="text-muted-foreground">
          Fill out the form below and receive a personalized proposal within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Your full name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your@email.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone *
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(555) 123-4567"
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Company name (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <select
              id="projectType"
              {...register('projectType')}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select project type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-sm text-destructive">{errors.projectType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range *</Label>
            <select
              id="budget"
              {...register('budget')}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Project Description *
          </Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Describe your project in detail, including dimensions, desired materials, deadlines and any relevant information..."
            rows={6}
            className={errors.description ? 'border-destructive' : ''}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <GlassButton
            type="submit"
            variant="hero"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Request Quote'}
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  );
};