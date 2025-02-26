import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface YoutubeDialogProps {
  videoId: string | null;
  onClose: () => void;
}

export default function YoutubeDialog({
  videoId,
  onClose,
}: YoutubeDialogProps) {
  const open = Boolean(videoId);

  return (
    <Dialog open={open} onOpenChange={open => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60" />
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 backdrop-blur-sm">
            {videoId && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
            <DialogClose className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
