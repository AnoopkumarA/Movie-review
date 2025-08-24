import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface MovieImageGalleryProps {
  imageUrls: string[];
  title?: string;
}

export const MovieImageGallery = ({ imageUrls, title }: MovieImageGalleryProps) => {
  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <section className="space-y-4">
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <Carousel className="w-full">
        <CarouselContent>
          {imageUrls.map((url, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <img src={url} alt={`Movie image ${idx + 1}`} className="w-full h-64 object-cover" />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};


