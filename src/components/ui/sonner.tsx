// Toast host on sonner, restyled to the app tokens. Fixed to the light theme because the app has
// no dark mode; following the system theme turned toast text white on a white card.
// On phones toasts sit at the top, clear of the bottom tab bar and the main action.

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { useMedia } from "@/hooks/brief/use-media"

const Toaster = ({ ...props }: ToasterProps) => {
  const phone = useMedia("(max-width: 767px)")

  return (
    <Sonner
      theme="light"
      position={phone ? "top-center" : "bottom-right"}
      className="md-toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
