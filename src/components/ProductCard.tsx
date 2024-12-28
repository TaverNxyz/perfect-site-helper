import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    imageUrl?: string;
    videoUrl?: string;
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showVideo, setShowVideo] = useState(false);

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
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
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
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <Button 
            className="bg-[#1EAEDB] hover:bg-[#0FA0CE] text-white"
          >
            View Product
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;