import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    prices: {
      daily: number;
      weekly: number;
      monthly: number;
    };
    description: string;
    features: string[];
    imageUrl?: string;
    videoUrl?: string;
  }
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
];

const ProductCard = ({ product }: ProductCardProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate(`/checkout/${product.id}?plan=${selectedPlan}`);
  };

  const getFallbackImage = () => {
    const index = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    return `${FALLBACK_IMAGES[index]}?auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <Card className="relative overflow-hidden group bg-[#0A0A0A]/80 border-[#222] hover:border-[#1EAEDB] transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        {showVideo ? (
          <div className="relative w-full h-full">
            <Button 
              className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/75"
              size="icon"
              variant="ghost"
              onClick={() => setShowVideo(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <iframe 
              src={`${product.videoUrl}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              frameBorder="0"
            />
          </div>
        ) : (
          <>
            <div className="w-full h-full bg-card">
              <img 
                src={imgError ? getFallbackImage() : (product.imageUrl || getFallbackImage())}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
            {product.videoUrl && (
              <Button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75"
                size="icon"
                variant="ghost"
                onClick={() => setShowVideo(true)}
              >
                <Play className="h-6 w-6" />
              </Button>
            )}
          </>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#1EAEDB] mb-2">{product.name}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button
            variant={selectedPlan === 'daily' ? 'default' : 'outline'}
            onClick={() => setSelectedPlan('daily')}
            className="w-full"
          >
            ${product.prices.daily}/day
          </Button>
          <Button
            variant={selectedPlan === 'weekly' ? 'default' : 'outline'}
            onClick={() => setSelectedPlan('weekly')}
            className="w-full"
          >
            ${product.prices.weekly}/week
          </Button>
          <Button
            variant={selectedPlan === 'monthly' ? 'default' : 'outline'}
            onClick={() => setSelectedPlan('monthly')}
            className="w-full"
          >
            ${product.prices.monthly}/month
          </Button>
        </div>

        <Button 
          className="w-full bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white"
          onClick={handlePurchase}
        >
          Purchase
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;