import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"
import { taskSchema } from "@/data/schema"
import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columns"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/src/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function Dashboard() {
  const tasks = await getTasks()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Recent Activity</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50 flex flex-col justify-center items-center">
              <div className="text-center text-xl font-semibold">
                Limit
              </div>
              <div className="text-center text-9xl font-bold mt-2">
                6
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <Image
                src="https://storage.googleapis.com/apnr-output-bucket/uploads/1733340030.jpg"
                alt="Output"
                className="rounded-xl w-full h-auto object-cover"
                width={500}
                height={500}
                priority
              />
            </div>
            <div className="aspect-video rounded-xl bg-muted/50">
              <Image
                src="https://storage.googleapis.com/apnr-output-bucket/processed/1733340030.jpg"
                alt="Output"
                className="rounded-xl w-full h-auto object-cover"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <DataTable data={tasks} columns={columns} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
