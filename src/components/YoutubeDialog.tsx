import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface YoutubeDialogProps {
  videoId: string | null;
  title?: string;
  onClose: () => void;
}

export default function YoutubeDialog({
  videoId,
  onClose,
}: YoutubeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (videoId) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [videoId]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!videoId || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-lg bg-black/5 p-0 backdrop-blur-sm">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
