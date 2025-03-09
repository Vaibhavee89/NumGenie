import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistoryProps {
  items: string[]
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  return (
    <ScrollArea className="h-40 w-full rounded-md p-2 mb-4 bg-calc-display text-calc-text">
      {items.length === 0 ? (
        <div className="text-sm text-center opacity-50">No history yet</div>
      ) : (
        items.map((item, index) => (
          <div key={index} className="text-sm mb-1 opacity-70 hover:opacity-100 transition-opacity">
            {item}
          </div>
        ))
      )}
    </ScrollArea>
  )
}

