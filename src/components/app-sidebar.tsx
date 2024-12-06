"use client"

import * as React from "react"
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://assets-a2.kompasiana.com/items/album/2024/03/15/8d5ec0cd7efb650367c2b60511ebfeec-65f3a59c1470931e216feed3.jpg?v=770",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Detect",
          url: "http://localhost:3000/",
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
          url: "http://localhost:3000/get-started",
        },
        {
          title: "About",
          url: "http://localhost:3000/about",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className="flex items-center justify-center border-b p-2"
        >
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
          <div className="flex justify-center p-2">
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
