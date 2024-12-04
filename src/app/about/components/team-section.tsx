import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const teamMembers = [
  { name: "Eric", role: "Project Lead", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
  { name: "Syafiq", role: "ML Cohort", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
  { name: "Anjas", role: "ML Cohort", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
  { name: "Sofia", role: "ML Cohort", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
  { name: "Alvin", role: "ML Cohort", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
  { name: "Hanif", role: "CC Cohort", avatar: "/placeholder.svg?height=100&width=100", github: "SyafiqMSI" },
]

export function TeamSection() {
  return (
    <Card className="bg-background/60 h-full">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Our Team</CardTitle>
        <CardDescription>Meet the people behind the APNR project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Link href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                <h3 className="font-semibold text-lg hover:underline">{member.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
