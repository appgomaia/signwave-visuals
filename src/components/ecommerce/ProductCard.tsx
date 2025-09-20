import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { GlassCard } from '@/components/ui/glass-card';
import { GlassButton } from '@/components/ui/glass-button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  unit?: string;
  categories?: { name: string };
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails, 
  viewMode = 'grid' 
}) => {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      unit: product.unit
    });
  };

  return (
    <GlassCard 
      variant="interactive" 
      className={`group ${viewMode === "list" ? "flex gap-6" : ""}`}
    >
      {/* Product Image */}
      <div className={`${
        viewMode === "list" ? "w-48 flex-shrink-0" : "mb-6"
      } aspect-square rounded-lg overflow-hidden bg-muted relative`}>
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        
        {/* Category Badge */}
        {(product.categories?.name || product.category) && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm"
          >
            {product.categories?.name || product.category}
          </Badge>
        )}

        {/* Rating */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-3 w-3 fill-yellow-400 text-yellow-400" 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex-1">
        <div className="mb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        {product.description && (
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gradient">
              {formatPrice(product.price)}
            </span>
            {product.unit && (
              <span className="text-xs text-muted-foreground">
                por {product.unit}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            {onViewDetails && (
              <GlassButton 
                variant="outline" 
                size="sm"
                onClick={onViewDetails}
                className="whitespace-nowrap"
              >
                <Eye className="h-4 w-4 mr-2" />
                {viewMode === 'list' ? 'Ver Detalhes' : 'Ver'}
              </GlassButton>
            )}
            <GlassButton 
              variant="default" 
              size="sm"
              onClick={handleAddToCart}
              className="whitespace-nowrap"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {viewMode === 'list' ? 'Adicionar ao Carrinho' : 'Adicionar'}
            </GlassButton>
          </div>
        </div>
        
        {/* Additional Info for List View */}
        {viewMode === 'list' && (
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>✓ Entrega Rápida</span>
            <span>✓ Garantia Inclusa</span>
            <span>✓ Instalação Profissional</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};