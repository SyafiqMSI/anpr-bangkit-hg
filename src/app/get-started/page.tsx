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
import Link from "next/link"

export default function About() {

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
                                    <BreadcrumbPage>About</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="p-6">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Get Started with APNR
                        </h1>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Welcome to the Automatic Plate Number Recognition (APNR) system! Follow these steps to quickly understand how to use our application.
                        </p>
                        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            Features Overview
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            APNR offers the following key features:
                        </p>
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>Upload images to detect license plates instantly.</li>
                            <li>Live camera detection for real-time plate recognition.</li>
                            <li>Export results in Excel or PDF format.</li>
                            <li>Access history of detected plates.</li>
                        </ul>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            How to Use APNR
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Get started in just a few simple steps:
                        </p>
                        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                            <li>Register or log in to your account.</li>
                            <li>Choose your method: upload an image or use the live camera feature.</li>
                            <li>View the detection results displayed on your dashboard.</li>
                            <li>Export or save the results as needed.</li>
                        </ol>
                        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                            Frequently Asked Questions (FAQ)
                        </h3>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>Q:</strong> What image formats are supported? <br />
                            <strong>A:</strong> JPG, PNG, and JPEG formats are supported.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>Q:</strong> Is this application free to use? <br />
                            <strong>A:</strong> Yes, basic features are free, while advanced features require a subscription.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            <strong>Q:</strong> Is my data secure? <br />
                            <strong>A:</strong> Absolutely! Your data is encrypted and stored securely.
                        </p>
                        <Link href={"/dashboard"}>
                            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight underline underline-offset-4">
                                Start Detecting Now!
                            </h3>
                        </Link>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Ready to explore the capabilities of APNR? Click the button below to begin your first detection journey.
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            If you need assistance, visit our <a href="/support" className="font-medium text-primary underline underline-offset-4">Support Page</a>.
                        </p>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
