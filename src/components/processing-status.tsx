import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
    isProcessing: boolean;
    progress: number;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
    isProcessing,
    progress
}) => {
    if (!isProcessing) return null;

    return (
        <div className="w-1/2 mx-auto space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-gray-500 text-center">
                Processing file... {progress}%
            </p>
        </div>

    );
};