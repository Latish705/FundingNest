"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { LinkedinIcon } from "lucide-react"

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former ML Lead at Google, PhD in Computer Vision from Stanford",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-founder",
    bio: "15 years experience in AI and robotics, previously at Boston Dynamics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=faces",
    linkedin: "https://linkedin.com"
  },
  {
    name: "David Park",
    role: "Head of Engineering",
    bio: "Led development of computer vision systems at Tesla",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=64&h=64&fit=crop&crop=faces",
    linkedin: "https://linkedin.com"
  },
]

export function StartupTeam() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <Card key={member.name}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{member.name}</h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm">{member.bio}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}