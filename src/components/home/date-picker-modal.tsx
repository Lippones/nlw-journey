'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { DateRange, DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface DatePickerModalProps {
  children: React.ReactNode
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DatePickerModal({
  children,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DatePickerModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-0">
        <DialogHeader>
          <DialogTitle>Selecione a data</DialogTitle>
        </DialogHeader>
        <DayPicker
          mode="range"
          styles={{
            root: {
              // @ts-expect-error - TS doesn't know about CSS variables
              '--rdp-accent-color': '#bef264',
              '--rdp-background-color': '#365314',
              '--rdp-selected-color': '#09090b',
              '--rdp-outline': '2px solid #bef264',
              '--rdp-outline-selected': '3px solid #bef264',
            },
          }}
          selected={eventStartAndEndDates}
          onSelect={setEventStartAndEndDates}
        />
      </DialogContent>
    </Dialog>
  )
}
