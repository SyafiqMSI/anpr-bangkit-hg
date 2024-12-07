'use client';
import { Button } from '@/components/ui/button';
import Meteors from '@/components/ui/meteors';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Github, LucideInfo, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiZap, FiCheckCircle, FiUpload, FiShield } from 'react-icons/fi';
import { auth,googleProvider } from './firebase'; // Sesuaikan path
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      document.cookie = 'auth=true; path=/';
      const user = result.user;

      const userData = {
        uid: user.uid, // ID unik user
        email: user.email, // Email
        displayName: user.displayName, // Nama lengkap
        photoURL: user.photoURL, // Foto profil
        emailVerified: user.emailVerified, // Status verifikasi
      };
      console.log('User:', userData);
      console.log('Token:', googleProvider); 
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/70 flex items-center justify-between p-4 backdrop-blur-md border-b">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="font-bold text-sm md:text-base"
          >
            APNR-C242-AP01
          </Link>
        </div>
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs md:text-sm"
          >
            Feature
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs md:text-sm"
            onClick={handleLogin}
          >
            <User className="w-4 h-4 md:w-5 md:h-5" />
            Login
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
              <TooltipContent
                side="right"
                sideOffset={5}
              >
                Theme
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/about">
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
              <TooltipContent
                side="right"
                sideOffset={5}
              >
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
              <TooltipContent
                side="right"
                sideOffset={5}
              >
                GitHub
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <aside className="fixed inset-y-0 right-0 z-20 hidden lg:flex h-full flex-col border-l p-5 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <nav className="mt-auto grid gap-1"></nav>
      </aside>

      <main className="flex-grow flex pt-24 pb-16 px-4 sm:px-6 lg:px-8 items-center justify-center">
        <div className="max-w-7xl w-full text-center px-4 sm:px-6 lg:px-8">
          <div className="relative flex min-h-[300px] md:h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
            <Meteors number={20} />
            <h1 className="text-4xl py-2 md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Automatic Plate Number Recognition</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Upload photos or videos to automatically detect license plates with our AI technology. Easy, fast and efficient.</p>
            <Button className="mt-6">
              <Link
                href="/detect"
                className="flex items-center space-x-2"
              >
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <div className="p-4 md:p-6 space-y-8 flex flex-col lg:flex-row space-between container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="lg:w-1/2 space-y-8 order-2 lg:order-1">
    <div className="px-4 sm:px-0">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Feature</h1>
      <p className="text-gray-800 dark:text-white text-sm md:text-base pb-6">
        Enjoy various advanced features designed to provide the best experience in detecting vehicle license plates quickly and accurately.
      </p>
      <ul className="space-y-4">
        <li className="flex items-start space-x-4">
          <div className="w-12 h-12 p-1 flex items-center justify-center bg-black text-white dark:text-black dark:bg-white rounded-full">
            <FiCheckCircle className="w-6 h-6" />
          </div>
          <p className="text-gray-800 dark:text-white text-sm md:text-base">
            <span className="font-semibold">Accurate Detection:</span> Data analysis with high accuracy levels thanks to the latest AI technology.
          </p>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-12 h-12 p-1 flex items-center justify-center bg-black text-white dark:text-black dark:bg-white rounded-full">
            <FiUpload className="w-6 h-6" />
          </div>
          <p className="text-gray-800 dark:text-white text-sm md:text-base">
            <span className="font-semibold">Easy Upload:</span> Supports various photo and video formats for your flexibility.
          </p>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-12 h-12 p-1 flex items-center justify-center bg-black text-white dark:text-black dark:bg-white rounded-full">
            <FiZap className="w-6 h-6" />
          </div>
          <p className="text-gray-800 dark:text-white text-sm md:text-base">
            <span className="font-semibold">Free Daily Limit:</span> Access up to 10 uploads per day for free.
          </p>
        </li>
        <li className="flex items-center space-x-4">
          <div className="w-12 h-12 p-1 flex items-center justify-center bg-black text-white dark:text-black dark:bg-white rounded-full">
            <FiShield className="w-6 h-6" />
          </div>
          <p className="text-gray-800 dark:text-white text-sm md:text-base">
            <span className="font-semibold">Data Security:</span> You can manage your data securely and comfortably.
          </p>
        </li>
      </ul>
    </div>

    <Separator className="mx-4 sm:mx-0" />

    <div className="space-y-4 px-4 sm:px-0">
      <p className="text-sm md:text-lg">Ready to try the APNR System? Get an instant detection result by uploading a photo or video! We offer 10 free uploads per day, so don't hesitate to give it a try.</p>
      <Button className="w-full md:w-auto mx-4 sm:mx-0">
        <Link
          href="/detect"
          className="flex items-center space-x-2"
        >
          <span>Try Now</span>
          <FaArrowRight />
        </Link>
      </Button>
    </div>
  </div>
  <div className="lg:w-1/2 order-2 lg:order-1 mb-8 lg:mb-0 lg:-mt-8 lg:ml-16 flex-end hidden lg:block">
    <Image
      src="https://storage.googleapis.com/apnr-output-bucket/processed/1733312056.jpeg"
      alt="License Plate"
      className="rounded-xl w-full h-auto object-cover"
      width={500}
      height={500}
      priority
    />
  </div>
</div>


      <footer className="w-full border-t mt-auto bg-white dark:bg-black text-black dark:text-white">
  <div className="max-w-7xl mx-auto p-6">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <p className="text-xs md:text-sm">&copy; 2024 APNR. All rights reserved.</p>
      </div>
      <div className="flex space-x-6 text-sm">
        <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
        <Link href="/terms-of-service" className="hover:text-gray-400">Terms of Service</Link>
        <Link href="/about" className="hover:text-gray-400">About</Link>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link href="https://facebook.com" target="_blank" className="hover:text-gray-400">
          <FaFacebook className="w-5 h-5" />
        </Link>
        <Link href="https://twitter.com" target="_blank" className="hover:text-gray-400">
          <FaTwitter className="w-5 h-5" />
        </Link>
        <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-400">
          <FaLinkedin className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}
