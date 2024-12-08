import OrbitingCircles from "@/components/ui/orbiting-circles";
import { Upload } from "lucide-react";
import { FiCheckCircle, FiShield, FiZap } from "react-icons/fi";

export function OrbitingCirclesDemo() {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center ">
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={20}
                radius={160}
            >
                <HyperTxt.whatsapp />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                duration={20}
                delay={10}
                radius={160}
            >
                <HyperTxt.notion />
            </OrbitingCircles>

            {/* Outer Circles (reverse) */}
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={240}
                duration={20}
                reverse
            >
                <HyperTxt.googleDrive />
            </OrbitingCircles>
            <OrbitingCircles
                className="size-[50px] border-none bg-transparent"
                radius={240}
                duration={20}
                delay={20}
                reverse
            >
                <HyperTxt.gitHub />
            </OrbitingCircles>
        </div>
    );
}

const HyperTxt = {
    gitHub: () => (
        <Upload
            className="text-4xl font-bold text-black dark:text-white"
        />
    ),
    notion: () => (
        <FiShield
            className="text-4xl font-bold text-black dark:text-white"
        />
    ),
    openai: () => (
        <FiZap
            className="text-4xl font-bold text-black dark:text-white"
        />
    ),
    googleDrive: () => (
        <FiCheckCircle
            className="text-4xl font-bold text-black dark:text-white"
        />
    ),
    whatsapp: () => (
        <FiZap
            className="text-4xl font-bold text-black dark:text-white"
        />
    ),
};
