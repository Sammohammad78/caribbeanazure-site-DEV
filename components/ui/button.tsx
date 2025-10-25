import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary lift-hover text-base tracking-tight",
        destructive:
          "rounded-xl bg-[color:color-mix(in_oklab,var(--err)_82%,black_8%)] text-white shadow-sm hover:bg-[color:color-mix(in_oklab,var(--err)_90%,black_6%)]",
        outline: "btn-outline text-body lift-hover backdrop-blur-sm hover:backdrop-blur-md",
        secondary:
          "rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-body shadow-sm hover:bg-[color:color-mix(in_oklab,var(--brand-soft)_80%,transparent)] backdrop-blur-sm hover:backdrop-blur-md",
        ghost: "hover:bg-[color:color-mix(in_oklab,var(--accent-soft)_60%,transparent)] hover:text-body hover:backdrop-blur-sm",
        link: "text-[color:var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 rounded-xl px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
