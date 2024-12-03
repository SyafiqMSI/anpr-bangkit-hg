import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
    isProcessing: boolean;
    progress: number;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
    isProcessing,
    progress
}) => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        if (progress === 100) {
            const interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + '.' : '.'));
            }, 500);

            return () => clearInterval(interval); 
        }
    }, [progress]);

    if (!isProcessing) return null;

    return (
        <div className="w-1/2 mx-auto space-y-2">
            {progress < 100 ? (
                <>
                    <Progress value={progress} />
                    <p className="text-sm text-gray-500 text-center">
                        Processing file... {progress}%
                    </p>
                </>
            ) : (
                <p className="text-sm text-gray-500 text-center">
                    Wah ternyata agak rumit nih bree sabar yaa{dots}
                </p>
            )}
        </div>
    );
};
