
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Service card component with colorful headers
const ServiceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color: "blue" | "indigo" | "purple" | "green" | "red" | "amber"
  }
>(({ className, color = "blue", ...props }, ref) => {
  const colorClasses = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    green: "bg-green-600",
    red: "bg-red-600",
    amber: "bg-amber-600"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white",
        className
      )}
      {...props}
    >
      <div className={`h-2 ${colorClasses[color]}`}></div>
      <div className="p-6">{props.children}</div>
    </div>
  )
})
ServiceCard.displayName = "ServiceCard"

// Icon wrapper for service cards
const ServiceIconWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color: "blue" | "indigo" | "purple" | "green" | "red" | "amber"
  }
>(({ className, color = "blue", ...props }, ref) => {
  const bgColorClasses = {
    blue: "bg-blue-100",
    indigo: "bg-indigo-100",
    purple: "bg-purple-100",
    green: "bg-green-100",
    red: "bg-red-100",
    amber: "bg-amber-100"
  }

  return (
    <div
      ref={ref}
      className={cn(
        `rounded-full ${bgColorClasses[color]} p-3 w-14 h-14 mb-4 flex items-center justify-center`,
        className
      )}
      {...props}
    />
  )
})
ServiceIconWrapper.displayName = "ServiceIconWrapper"

// Feature card component
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300",
      className
    )}
    {...props}
  />
))
FeatureCard.displayName = "FeatureCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  ServiceCard,
  ServiceIconWrapper,
  FeatureCard
}
