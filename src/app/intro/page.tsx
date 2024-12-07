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

export default function Intro() {

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
                                    <BreadcrumbLink href="">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Introduction</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-6">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Welcome to APNR
                        </h1>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            The Automatic Plate Number Recognition (APNR) system is a cutting-edge solution designed to simplify vehicle license plate recognition processes. This project is proudly developed by Megalogic, a forward-thinking company committed to leveraging technology for impactful solutions.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            APNR is also part of the Capstone Program Bangkit 2024. It represents the hard work and collaboration of talented individuals striving to address real-world challenges using machine learning and software development.
                        </p>
                        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Why Choose APNR?
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            APNR offers the following key advantages:
                        </p>
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>High accuracy in detecting and recognizing license plates.</li>
                            <li>Fast processing speeds for real-time applications.</li>
                            <li>Seamless integration with existing systems.</li>
                            <li>Cloud-based deployment for scalability and flexibility.</li>
                        </ul>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            Built with Innovative Technologies
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            APNR leverages advanced technologies like YOLO for object detection and EasyOCR for optical character recognition, ensuring accurate and efficient results. Our system combines AI, computer vision, and cloud computing to deliver state-of-the-art performance.
                        </p>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            Real-World Applications
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Our system is ideal for:
                        </p>
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Automating parking management systems.</li>
                            <li>Assisting law enforcement in traffic monitoring.</li>
                            <li>Enhancing security for residential and commercial areas.</li>
                            <li>Streamlining fleet management operations.</li>
                        </ul>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            A Collaborative Vision
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            APNR reflects the collaborative vision of the Megalogic program, aiming to nurture innovation and problem-solving through technology. As part of this journey, we are proud to showcase how AI and machine learning can address practical challenges effectively.
                        </p>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            Ready to Start?
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Explore the power of APNR today. Visit our{" "}
                            <a
                                href="/get-started"
                                className="font-medium text-primary underline underline-offset-4"
                            >
                                Get Started
                            </a>{" "}
                            page for a guided experience.
                        </p>
                        <blockquote className="mt-6 border-l-2 pl-6 italic">
                            Empowering tomorrow with innovation and collaboration
                        </blockquote>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            For inquiries, visit our{" "}
                            <a
                                href="/support"
                                className="font-medium text-primary underline underline-offset-4"
                            >
                                Support Page
                            </a>{" "}
                            for assistance.
                        </p>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
