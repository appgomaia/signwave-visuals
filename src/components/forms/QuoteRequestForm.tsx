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
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Selecione o tipo de projeto'),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const projectTypes = [
  'Placas Comerciais',
  'Sinalização Digital',
  'Adesivos Veiculares',
  'Stands e Displays',
  'Sinalização Industrial',
  'Outros',
];

const budgetRanges = [
  'Até R$ 1.000',
  'R$ 1.000 - R$ 5.000',
  'R$ 5.000 - R$ 10.000',
  'R$ 10.000 - R$ 25.000',
  'Acima de R$ 25.000',
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
        title: "Orçamento solicitado com sucesso!",
        description: "Entraremos em contato em até 24 horas.",
      });
      
      reset();
    } catch (error) {
      console.error('Quote submission error:', error);
      toast({
        title: "Erro ao solicitar orçamento",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    }
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Solicite seu Orçamento</h2>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo e receba uma proposta personalizada em até 24 horas
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Nome Completo *
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Seu nome completo"
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
              placeholder="seu@email.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefone *
            </Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="(11) 99999-9999"
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Nome da empresa (opcional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Tipo de Projeto *</Label>
            <select
              id="projectType"
              {...register('projectType')}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecione o tipo de projeto</option>
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
            <Label htmlFor="budget">Faixa de Orçamento *</Label>
            <select
              id="budget"
              {...register('budget')}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecione a faixa de orçamento</option>
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
            Descrição do Projeto *
          </Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Descreva detalhadamente seu projeto, incluindo dimensões, materiais desejados, prazos e qualquer informação relevante..."
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
            {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
          </GlassButton>
        </div>
      </form>
    </GlassCard>
  );
};