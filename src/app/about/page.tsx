"use client";

import { Button } from '@/components/ui/button';
import { ToastProvider } from '@/components/ui/toast';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import {
    Github,
    LinkIcon,
    LucideInfo,
    Video,
} from 'lucide-react';

import React from 'react';

import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';
 
export default function Dashboard() {
    const { toast } = useToast();

    const handleShareClick = () => {
        navigator.clipboard.writeText('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        toast({
            title: 'Link copied',
            description: 'Link copied to clipboard successfully.',
            variant: 'default',
        });
        console.log('Link copied to clipboard');
    };

    return (
        <ToastProvider>
            <div className="grid h-screen w-full pl-[50px]">
                <aside
                    className="fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        className="border-b p-2"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Link
                            href="https://en.wikipedia.org/wiki/Automatic_number-plate_recognition"
                            target="_blank"
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Home"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Video className="size-5 fill-foreground" />
                            </Button>
                        </Link>
                    </div>
                    <nav
                        className="grid gap-1 p-2"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        onClick={() => {
                                            toast({
                                                title: 'Theme has been changed!',
                                                description: 'Theme has been changed successfully.',
                                            });
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    ></div>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                    <nav className="mt-auto grid gap-1 p-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        onClick={() => {
                                            toast({
                                                title: "Theme has been changed!",
                                                description: "Theme has been changed successfully.",
                                            });
                                        }}
                                    >
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
                                        href="https://github.com/APNR-C242-AP01/"
                                        target="_blank"
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
                <div className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                        <h1 className="text-xl font-semibold">
                            [C242-AP] Automatic Plate Number Recognition (APNR)
                        </h1>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto gap-1.5 text-sm"
                            onClick={handleShareClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LinkIcon className="size-3.5" />
                            Share
                        </Button>
                    </header>
                    <main className="flex items-center justify-center h-full">
                        <p className="text-4xl font-bold text-center">INI ABOUT</p>
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
