import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassCard } from '@/components/ui/glass-card';

const TermsOfService = () => {
  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Termos de Uso</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                <p className="text-muted-foreground">
                  Ao utilizar os serviços da FBRSigns, você concorda com estes termos de uso. 
                  Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Descrição dos Serviços</h2>
                <p className="text-muted-foreground">
                  A FBRSigns oferece serviços de:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 mt-2">
                  <li>Criação e produção de placas e sinalização</li>
                  <li>Sinalização digital e LED</li>
                  <li>Adesivos veiculares e decoração</li>
                  <li>Stands e displays para eventos</li>
                  <li>Consultoria em comunicação visual</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Ordens de Serviço e Pagamento</h2>
                <p className="text-muted-foreground">
                  Todos os serviços devem ser formalizados através de orçamento aprovado. 
                  Os prazos de entrega são estimados e podem variar conforme complexidade do projeto. 
                  O pagamento deve ser realizado conforme condições acordadas no orçamento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Propriedade Intelectual</h2>
                <p className="text-muted-foreground">
                  O cliente mantém os direitos sobre sua marca e conteúdo fornecido. 
                  A FBRSigns mantém direitos sobre metodologias e técnicas desenvolvidas. 
                  É vedada a reprodução não autorizada de nossos trabalhos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Responsabilidades do Cliente</h2>
                <p className="text-muted-foreground">
                  O cliente deve:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 mt-2">
                  <li>Fornecer informações precisas e completas</li>
                  <li>Aprovar projetos dentro do prazo estipulado</li>
                  <li>Realizar pagamentos conforme acordado</li>
                  <li>Garantir que possui direitos sobre materiais fornecidos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Garantias e Limitações</h2>
                <p className="text-muted-foreground">
                  Oferecemos garantia de qualidade conforme especificado em cada orçamento. 
                  A garantia não cobre danos causados por mau uso, vandalismo ou desgaste natural. 
                  Nossa responsabilidade limita-se ao valor do serviço contratado.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cancelamentos e Reembolsos</h2>
                <p className="text-muted-foreground">
                  Cancelamentos devem ser comunicados por escrito. Projetos já iniciados serão 
                  cobrados proporcionalmente ao trabalho realizado. Reembolsos seguem política 
                  específica de cada tipo de serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Modificações dos Termos</h2>
                <p className="text-muted-foreground">
                  Estes termos podem ser modificados a qualquer momento. Clientes serão notificados 
                  sobre mudanças significativas. O uso continuado dos serviços implica aceitação 
                  dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Lei Aplicável</h2>
                <p className="text-muted-foreground">
                  Estes termos são regidos pela legislação brasileira. Eventuais disputas serão 
                  resolvidas no foro da comarca de São Paulo/SP.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
                <p className="text-muted-foreground">
                  Para questões sobre estes termos, entre em contato através do email: 
                  contato@fbrsigns.com.br ou telefone: (11) 99999-9999.
                </p>
              </section>

              <div className="text-center mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsOfService;