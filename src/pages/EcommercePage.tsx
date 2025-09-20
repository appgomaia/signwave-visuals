import React, { useState } from 'react';
import { EcommerceNavbar } from '@/components/layout/EcommerceNavbar';
import { CartSidebar } from '@/components/ecommerce/CartSidebar';
import { ProductDetails } from '@/components/ecommerce/ProductDetails';
import { Checkout } from '@/components/ecommerce/Checkout';
import { GlassFooter } from '@/components/layout/GlassFooter';
import Products from '@/pages/Products';

type ViewMode = 'products' | 'product-details' | 'checkout' | 'success';

interface Product {
  id: string;
  name: string;
  description?: string;
  detailed_description?: string;
  price: number;
  image_url?: string;
  additional_images?: string[];
  category?: string;
  unit?: string;
  specifications?: Record<string, any>;
  material?: string;
  dimensions?: string;
  warranty_info?: string;
  installation_info?: string;
  lead_time_days?: number;
  min_quantity?: number;
  max_quantity?: number;
}

export default function EcommercePage() {
  const [currentView, setCurrentView] = useState<ViewMode>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleCheckoutSuccess = () => {
    setCurrentView('success');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return <Products onProductSelect={handleProductSelect} />;
      
      case 'product-details':
        return selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onBack={handleBackToProducts}
          />
        ) : null;
      
      case 'checkout':
        return (
          <Checkout 
            onBack={handleBackToProducts}
            onSuccess={handleCheckoutSuccess}
          />
        );
      
      case 'success':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4">Pedido Realizado!</h1>
              <p className="text-muted-foreground mb-8">
                Obrigado pela sua compra. Você receberá um email de confirmação em breve.
              </p>
              <button
                onClick={handleBackToProducts}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        );
      
      default:
        return <Products onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <EcommerceNavbar onCartOpen={() => setIsCartOpen(true)} />
      
      {renderContent()}
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      
      {currentView !== 'checkout' && currentView !== 'success' && <GlassFooter />}
    </div>
  );
}