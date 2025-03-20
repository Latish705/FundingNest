"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "TechVision AI",
    type: "Investment",
    amount: "$25,000",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=64&h=64&fit=crop&crop=faces"
  },
  {
    name: "GreenEnergy Solutions",
    type: "Bid Placed",
    amount: "$50,000",
    date: "5 hours ago",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=faces"
  },
  {
    name: "HealthTech Pro",
    type: "Meeting Scheduled",
    date: "Yesterday",
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=64&h=64&fit=crop&crop=faces"
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.image} alt={activity.name} />
            <AvatarFallback>{activity.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.type}
              {activity.amount && ` • ${activity.amount}`}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {activity.date}
          </div>
        </div>
      ))}
    </div>
  )
}