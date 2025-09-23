import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/components/layout/PageLayout';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';

const QuoteRequest = () => {
  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <QuoteRequestForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default QuoteRequest;