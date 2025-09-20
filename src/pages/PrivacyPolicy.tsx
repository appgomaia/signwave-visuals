import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlassCard } from '@/components/ui/glass-card';

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <GlassCard className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Informações Gerais</h2>
                <p className="text-muted-foreground">
                  A FBRSigns valoriza a privacidade de seus clientes e está comprometida em proteger suas informações pessoais. 
                  Esta política descreve como coletamos, usamos e protegemos suas informações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Informações Coletadas</h2>
                <p className="text-muted-foreground">
                  Coletamos informações que você nos fornece diretamente, como:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 mt-2">
                  <li>Nome, email e telefone</li>
                  <li>Informações sobre projetos e orçamentos</li>
                  <li>Dados de navegação no site</li>
                  <li>Histórico de compras e pedidos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Uso das Informações</h2>
                <p className="text-muted-foreground">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 mt-2">
                  <li>Processar pedidos e orçamentos</li>
                  <li>Comunicar sobre projetos e serviços</li>
                  <li>Melhorar nossos produtos e atendimento</li>
                  <li>Enviar newsletters (com seu consentimento)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Proteção de Dados</h2>
                <p className="text-muted-foreground">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações 
                  contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Informações</h2>
                <p className="text-muted-foreground">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                  exceto quando necessário para prestar nossos serviços ou conforme exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Seus Direitos</h2>
                <p className="text-muted-foreground">
                  Você tem o direito de:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-4 mt-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos</li>
                  <li>Solicitar exclusão de seus dados</li>
                  <li>Retirar consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Contato</h2>
                <p className="text-muted-foreground">
                  Para questões sobre esta política ou seus dados pessoais, entre em contato conosco através 
                  do email: contato@fbrsigns.com.br ou telefone: (11) 99999-9999.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Alterações</h2>
                <p className="text-muted-foreground">
                  Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre 
                  disponível em nosso site.
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

export default PrivacyPolicy;