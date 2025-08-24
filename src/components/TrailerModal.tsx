import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TrailerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId?: string | null;
  title?: string;
}

export const TrailerModal = ({ open, onOpenChange, videoId, title }: TrailerModalProps) => {
  const src = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : undefined;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title ? `${title} — Trailer` : 'Trailer'}</DialogTitle>
        </DialogHeader>
        <div>
          <AspectRatio ratio={16 / 9}>
            {src ? (
              <iframe
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-md"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-md" />
            )}
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};


