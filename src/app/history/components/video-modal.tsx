import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface VideoModalProps {
  videoUrl: string
}

export function VideoModal({ videoUrl }: VideoModalProps) {
  return (
    <Dialog>
        <DialogTitle/>
      <DialogTrigger asChild>
        <div className="relative aspect-video overflow-hidden rounded-md cursor-pointer">
          <video className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <video controls className="w-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  )
}

