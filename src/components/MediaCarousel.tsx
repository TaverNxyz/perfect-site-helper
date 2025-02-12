import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './ui/button';

const videos = [
  { id: 1, url: 'https://streamable.com/e/yd3tbf?autoplay=1&loop=0' },
  { id: 2, url: 'https://streamable.com/e/lwokde?autoplay=0' },
  { id: 3, url: 'https://streamable.com/e/apex' }
];

const MediaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const videoRefs = useRef<Array<HTMLIFrameElement | null>>([]);

  useEffect(() => {
    const handleVideoEnd = (index: number) => {
      if (index < videos.length - 1) {
        emblaApi?.scrollNext();
        // Start the next video
        if (videoRefs.current[index + 1]) {
          const nextVideo = videoRefs.current[index + 1];
          if (nextVideo && nextVideo.src) {
            nextVideo.src = nextVideo.src.replace('autoplay=0', 'autoplay=1');
          }
        }
      }
    };

    // Set up video event listeners
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        videoRef.addEventListener('ended', () => handleVideoEnd(index));
      }
    });

    return () => {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          videoRef.removeEventListener('ended', () => handleVideoEnd(index));
        }
      });
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative w-full h-[80vh] mx-auto">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {videos.map((video, index) => (
            <div className="flex-[0_0_100%] min-w-0 h-full" key={video.id}>
              <div className="relative w-full h-full">
                <iframe
                  ref={el => videoRefs.current[index] = el}
                  src={video.url}
                  className="w-full h-full object-cover"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={scrollPrev} 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75"
        size="icon"
        variant="ghost"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75"
        size="icon"
        variant="ghost"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MediaCarousel;