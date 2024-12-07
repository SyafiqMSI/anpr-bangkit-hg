import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

export default function SupportPage() {

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
                                    <BreadcrumbLink href="/">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Support Page</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-6">
                        <div className="flex flex-col items-center justify-center p-8 space-y-8">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Support Page
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Meet our team and connect with us through social media.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                <Card className="w-80">
                                    <CardHeader>
                                        <CardTitle>Eric Vincent Kho</CardTitle>
                                        <CardDescription>APNR CC Cohort</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Specialized in CC responsible for deploying the model</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Popover>
                                            <PopoverTrigger className="text-primary underline cursor-pointer">
                                                Social Media
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="w-48">
                                                <div className="flex flex-col space-y-3">
                                                    <a
                                                        href="https://github.com/khovincent"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaGithub size={20} className="mr-2" />
                                                        GitHub
                                                    </a>
                                                    <a
                                                        href="https://linkedin.com/in/ericvkho"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaLinkedin size={20} className="mr-2" />
                                                        LinkedIn
                                                    </a>
                                                    <a
                                                        href="mailto:c239b4ky1270@bangkit.academy"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaEnvelope size={20} className="mr-2" />
                                                        Email
                                                    </a>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </CardFooter>
                                </Card>

                                <Card className="w-80">
                                    <CardHeader>
                                        <CardTitle>Muhammad Syafiq Ibrahim</CardTitle>
                                        <CardDescription>APNR ML Cohort</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Specialized in ML responsible for building the model</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Popover>
                                            <PopoverTrigger className="text-primary underline cursor-pointer">
                                                Social Media
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="w-48">
                                                <div className="flex flex-col space-y-3">
                                                    <a
                                                        href="https://github.com/syafiqmsi"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaGithub size={20} className="mr-2" />
                                                        GitHub
                                                    </a>
                                                    <a
                                                        href="https://linkedin.com/in/syafiqmsi"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaLinkedin size={20} className="mr-2" />
                                                        LinkedIn
                                                    </a>
                                                    <a
                                                        href="mailto:m312b4ky3095@bangkit.academy"
                                                        className="flex items-center text-muted-foreground hover:text-primary"
                                                    >
                                                        <FaEnvelope size={20} className="mr-2" />
                                                        Email
                                                    </a>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

