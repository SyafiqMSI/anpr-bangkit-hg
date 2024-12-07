"use client"
import * as React from "react"
import { useEffect, useState } from 'react'
import { auth } from '../app/firebase'
import { BookOpen, Bot, SquareTerminal, Video } from 'lucide-react'
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarHeader,
 SidebarRail,
 useSidebar,
} from "@/components/ui/sidebar"

const navMainData = [
 {
   title: "Playground",
   url: "#",
   icon: SquareTerminal,
   isActive: true,
   items: [
     {
       title: "Detect",
       url: "https://anpr-442309.et.r.appspot.com/detect",
     },
     {
       title: "History",
       url: "#",
     },
   ],
 },
 {
   title: "Models",
   url: "#",
   icon: Bot,
   items: [
     {
       title: "yolo11n.pt",
       url: "https://github.com/APNR-C242-AP01/apnr-yolo/blob/main/model/yolo11n.pt",
     },
     {
       title: "best.pt",
       url: "https://github.com/APNR-C242-AP01/apnr-yolo/blob/main/model/best.pt",
     },
   ],
 },
 {
   title: "Documentation",
   url: "#",
   icon: BookOpen,
   items: [
     {
       title: "Introduction",
       url: "#",
     },
     {
       title: "Get Started",
       url: "https://anpr-442309.et.r.appspot.com/landing",
     },
     {
       title: "About",
       url: "https://anpr-442309.et.r.appspot.com/about",
     },
     {
      title: "Support Page",
      url: "https://anpr-442309.et.r.appspot.com/support",
    },
   ],
 },
]

export function AppSidebar({ ...props }) {
 const { state } = useSidebar()
 interface User {
   name: string;
   email: string;
   avatar: string;
 }

 const [user, setUser] = useState<User | null>(null)

 useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
     if (currentUser) {
       setUser({
         name: currentUser.displayName || "",
         email: currentUser.email || "",
         avatar: currentUser.photoURL || ""
       })
     }
   })
   return () => unsubscribe()
 }, [])

 if (!user) return null

 const data = {
   user,
   navMain: navMainData
 }

 return (
   <Sidebar collapsible="icon" {...props}>
     <SidebarHeader>
       <div className="flex items-center justify-center border-b p-2">
         <Video className="size-5 fill-foreground" />
         {state === "expanded" && (
           <span className="ml-2 text-lg font-semibold">APNR-C242-AP01</span>
         )}
       </div>
     </SidebarHeader>
     <SidebarContent>
       <NavMain items={data.navMain} />
     </SidebarContent>
     <SidebarFooter>
       {state === "expanded" ? (
         <NavUser user={data.user} />
       ) : (
         <div className="flex justify-center p-2" />
       )}
     </SidebarFooter>
     <SidebarRail />
   </Sidebar>
 )
}