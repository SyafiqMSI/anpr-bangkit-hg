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
    FileVideo2,
    Github,
    LinkIcon,
    LucideInfo,
    Upload,
    Video,
} from 'lucide-react';

import React, {  useRef, useState } from 'react';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/ui/mode-toggle';

const VideoUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            console.log('Submitting file:', selectedFile);
        }
    };

    return (
        <div
            className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl bg-muted/50 flex flex-col items-center justify-center p-6 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <FileVideo2 className="w-16 h-16 text-gray-400 mb-4" />

            <p className="text-sm text-gray-600 mb-4">
                Drag and drop your video here, or
            </p>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
            />

            <div className="flex gap-4">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Choose File
                </Button>

                {selectedFile && (
                    <Button onClick={handleSubmit} disabled={!selectedFile}>
                        Submit Video
                    </Button>
                )}
            </div>

            {selectedFile && (
                <div>
                <p className="mt-4 text-sm text-gray-600">
                    Selected: {selectedFile.name}
                </p>
                </div>
            )}
        </div>
    );
};

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
                    <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-2">
                        <div className="relative flex flex-col items-start gap-3">
                            <VideoUpload />
                        </div>
                        <div
                            className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Badge variant="outline" className="absolute right-3 top-3">
                                Output
                            </Badge>
                        </div>
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
