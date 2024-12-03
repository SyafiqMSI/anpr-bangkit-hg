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
  FileImage,
  FileVideo2,
  Github,
  LinkIcon,
  LucideInfo,
  Upload,
  Video,
} from 'lucide-react';

import React, { useRef, useState } from 'react';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/ui/mode-toggle';
import Image from 'next/image';
import { ProcessingStatus } from '@/components/processing-status';

const MediaUpload: React.FC<{ onFileSelect: (file: File | null) => void; onSubmit: (file: File) => void }> = ({ onFileSelect, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
      console.log('Attach file:', file);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('image/'))) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
      console.log('Submitting file:', selectedFile);
    }
  };

  return (
    <div
      className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl bg-muted/50 flex flex-col items-center justify-center p-6 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!previewUrl ? (
        <>
          <div className="flex gap-4 mb-4">
            <FileImage className="w-12 h-12 text-gray-400" />
            <FileVideo2 className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600">
            Drag and drop your image or video here, or
          </p>
        </>
      ) : (
        <div className="w-full max-w-[320px]">
          {selectedFile?.type.startsWith('video/') ? (
            <video controls className="w-full h-auto rounded-lg">
              <source src={previewUrl} type={selectedFile?.type} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg"
              width={320}
              height={240}
            />
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*,video/*"
        className="hidden"
      />

      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" /> Choose File
        </Button>

        {selectedFile && (
          <Button onClick={handleSubmit} disabled={!selectedFile}>
            Submit File
          </Button>
        )}
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>Selected: {selectedFile.name}</span>
          <button
            onClick={handleCancel}
            className="text-grey-100 hover:text-red-700"
            aria-label="Cancel selection"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedResult, setProcessedResult] = useState<{
    processedImage?: string;
    processedVideo?: string;
    plates: string[];
    text: string;
    conf: number[];
    region: string[];
  } | null>(null);

  const simulateProgress = () => {
    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    simulateProgress();
  
    try {
      const formData = new FormData();
      formData.append(selectedFile.type.startsWith('image/') ? 'image' : 'video', selectedFile);
  
      console.log('Sending request to server...');
      const endpoint = selectedFile.type.startsWith('image/') 
        ? 'http://127.0.0.1:5000/api/process-image'
        : 'http://127.0.0.1:5000/api/process-video';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
  
      const processedImageUrl = data.processed_image 
        ? `http://127.0.0.1:5000/output/${data.processed_image}`
        : undefined;
      const processedVideoUrl = data.processed_video 
        ? `http://127.0.0.1:5000/output/${data.processed_video}`
        : undefined;
  
      if (processedImageUrl) {
        const imageResponse = await fetch(processedImageUrl);
        if (!imageResponse.ok) {
          console.error('Failed to fetch processed image', imageResponse.status);
          throw new Error('Could not retrieve processed image');
        }
      }
      
      console.log('Processed image:', processedImageUrl);
      console.log('Processed video:', processedVideoUrl);
      setProcessedResult({
        processedImage: processedImageUrl,
        processedVideo: processedVideoUrl,
        plates: data.detected_plates || [],
        text: data.text,
        conf: data.conf,
        region: data.region,
      });
  
      toast({
        title: 'Success',
        description: 'File processed successfully',
      });
  
    } catch (error) {
      console.error('Error details:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to process file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

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
            <h1 className="text-xl font-semibold md:text-base">
              <span className="hidden md:inline"> [C242-AP] Automatic Plate Number Recognition (APNR)</span>
              <span className="md:hidden">
                APNR
              </span>
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
          <main
            className={`grid flex-1 gap-4 overflow-auto p-4 ${selectedFile ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
              }`}
          >
            <div
              className={`relative flex flex-col items-start gap-3 ${!selectedFile ? 'col-span-1 md:col-span-2' : ''
                }`}
            >
              <MediaUpload onFileSelect={setSelectedFile} onSubmit={handleFileSubmit} />
            </div>

            {selectedFile && (
              <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4">
                <Badge variant="outline" className="absolute right-3 top-3">
                  Output
                </Badge>
                <div className="flex items-center justify-center h-full">
                  <ProcessingStatus
                    isProcessing={isProcessing}
                    progress={progress}
                  />
                  {processedResult && !isProcessing && (
                    <div className="flex flex-col gap-4 mb-2">
                      {processedResult.processedImage && (
                        <Image
                          src={processedResult.processedImage}
                          alt="Processed Image"
                          className="rounded-xl"
                          width={400}
                          height={300}
                        />
                      )}
                      {processedResult.processedVideo && (
                        <video controls className="w-full h-auto rounded-xl max-w-[320px]">       

                          <source src={processedResult.processedVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      <div>
                        {/* <h2 className='flex flex-col gap-4 mt-2 mb-2 items-center justify-center'>Detected Plates</h2> */}
                        <ul className="list-disc pl-5">
                          {processedResult.plates.map((plate, index) => (
                            <li key={index}>
                              {plate} {processedResult.region[index]} {processedResult.conf[index].toFixed(2)}
                            </li>
                          ))}
                        </ul>

                      </div>
                    </div>
                  )}
                  {!processedResult && !isProcessing && (
                    <div className="flex flex-col gap-4 mt-4">
                      <p className="text-gray-600">Your output will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
