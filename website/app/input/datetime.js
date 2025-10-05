"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Calendar24({ date, setDate }) {
  const [open, setOpen] = React.useState(false)

  const glassStyle = {
    background: "rgba(0, 0, 0, 0.36)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    borderRadius: "22px",
    transition: "transform 0.3s ease, background 0.3s ease",
  };

  return (
    <div className="flex gap-y-4 gap-x-2.5 text-white">
      <div className="flex flex-col gap-y-3">
        <Label htmlFor="date-picker" className="px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              style={glassStyle}
              className="w-sm h-12 px-4! justify-between font-normal text-white!"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
