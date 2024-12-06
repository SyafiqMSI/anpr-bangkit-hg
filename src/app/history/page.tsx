import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageModal } from "./components/image-modal"
import { VideoModal } from "./components/video-modal"

interface ImageDetectionResult {
    id: string
    timestamp: string
    plateNumber: string
    confidence: number
    imageUrl: string
}

interface VideoDetectionResult {
    id: string
    videoUrl: string
}

const dummyImageDetections: ImageDetectionResult[] = [
    {
        id: '1',
        timestamp: '2024-03-06 14:30:22',
        plateNumber: 'ABC 123',
        confidence: 98.5,
        imageUrl: 'https://storage.googleapis.com/apnr-output-bucket/processed/1733340030.jpg'
    },
    {
        id: '2',
        timestamp: '2024-03-06 15:45:10',
        plateNumber: 'XYZ 789',
        confidence: 97.2,
        imageUrl: 'https://storage.googleapis.com/apnr-output-bucket/processed/1733340030.jpg'
    },
    {
        id: '3',
        timestamp: '2024-03-06 16:20:05',
        plateNumber: 'DEF 456',
        confidence: 99.1,
        imageUrl: 'https://storage.googleapis.com/apnr-output-bucket/processed/1733340030.jpg'
    },
]

const dummyVideoDetections: VideoDetectionResult[] = [
    {
        id: 'v1',
        videoUrl: 'https://storage.googleapis.com/apnr-output-bucket/output/1733477821_output.mp4',
    },
    {
        id: 'v2',
        videoUrl: 'https://storage.googleapis.com/apnr-output-bucket/output/1733477821_output.mp4',
    },
    {
        id: 'v3',
        videoUrl: 'https://storage.googleapis.com/apnr-output-bucket/output/1733477821_output.mp4',
    },
]

export default function History() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>History</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-6">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold mb-4">Image Detections</h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {dummyImageDetections.map((detection) => (
                                        <Card key={detection.id}>
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">{detection.plateNumber}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ImageModal imageUrl={detection.imageUrl} plateNumber={detection.plateNumber} />
                                                <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                                                    <span>{detection.timestamp}</span>
                                                    <Badge variant="secondary">
                                                        Conf: {detection.confidence.toFixed(1)}%
                                                    </Badge>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4">Video Detections</h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {dummyVideoDetections.map((detection) => (
                                        <Card key={detection.id}>
                                            <CardContent className="p-0">
                                                <VideoModal videoUrl={detection.videoUrl} />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

