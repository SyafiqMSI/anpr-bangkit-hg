import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'

interface ImageModalProps {
  imageUrl: string
  plateNumber: string
}

export function ImageModal({ imageUrl, plateNumber }: ImageModalProps) {
  return (
    <Dialog>
        <DialogTitle/>
        <DialogTrigger asChild>
        <div className="relative aspect-video overflow-hidden rounded-md cursor-pointer">
          <Image
            src={imageUrl}
            alt={`Detected plate: ${plateNumber}`}
            fill
            className="object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={`Detected plate: ${plateNumber}`}
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

