import { Button } from "@/components/ui/button";
import Meteors from "@/components/ui/meteors";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, LucideInfo, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 flex items-center justify-between p-4 backdrop-blur-md border-b">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="font-bold text-sm md:text-base">APNR-C242-AP01</Link>
                </div>
                <nav className="flex items-center space-x-2 md:space-x-4">
                    <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                        Feature
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs md:text-sm">
                        <User className="w-4 h-4 md:w-5 md:h-5" />
                        <Link href="/login">Login</Link>

                    </Button>
                </nav>
            </header>

            <aside className="fixed inset-y-0 left-0 z-20 hidden lg:flex h-full flex-col border-r p-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <nav className="mt-auto grid gap-1">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <ModeToggle />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Theme
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/about"
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-lg "
                                        aria-label="About"
                                    >
                                        <LucideInfo className="size-5" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                About
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="https://github.com/APNR-C242-AP01/"
                                    target="_blank"
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-lg"
                                        aria-label="Github"
                                    >
                                        <Github className="size-5" />
                                    </Button>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                GitHub
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            <aside className="fixed inset-y-0 right-0 z-20 hidden lg:flex h-full flex-col border-l p-5 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                <nav className="mt-auto grid gap-1">
                </nav>
            </aside>

            <main className="flex-grow flex pt-24 pb-16 px-4 sm:px-6 lg:px-8 items-center justify-center">
                <div className="max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
                    <div className="relative flex min-h-[300px] md:h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
                        <Meteors number={20} />
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text pb-2">
                            Automatic Plate Number Recognition
                        </h1>
                    </div>
                </div>
            </main>

            <div className="p-4 md:p-6 space-y-8 flex flex-col lg:flex-row space-between container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:w-1/2 space-y-8 order-2 lg:order-1">
                    <div className="px-4 sm:px-0">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4">APNR</h1>
                        <ul className="space-y-2 text-gray-400 text-sm md:text-base px-4 sm:px-0">
                            <li>Fitur </li>
                            <li>Fitur </li>
                            <li>Fitur </li>
                            <li>Fitur </li>
                            <li>Fitur </li>
                        </ul>
                    </div>

                    <Separator className="mx-4 sm:mx-0" />

                    <div className="space-y-4 px-4 sm:px-0">
                        <p className="text-sm md:text-lg">
                            The web is more powerful than ever. You need tools that will help
                            you get ahead, not get in the way. Were introducing updates to our
                            security offering, AI tooling, feature flag management support, and
                            more.
                        </p>
                        <Button className="w-full md:w-auto mx-4 sm:mx-0">
                            <Link href="/dashboard" className="flex items-center space-x-2">
                                <span>Get Started</span>
                                <FaArrowRight />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="lg:w-1/2 order-2 lg:order-1 mb-8 lg:mb-0 lg:-mt-8 lg:ml-16 flex-end hidden lg:block">
                    <Image
                        src="https://storage.googleapis.com/apnr-output-bucket/processed/1733312056.jpeg"
                        alt="Plat"
                        className="rounded-xl w-full h-auto object-cover"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </div>

            <footer className="w-full border-t mt-auto">
                <div className="p-4 text-center text-xs md:text-sm">
                    <p>&copy; 2024 APNR. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}