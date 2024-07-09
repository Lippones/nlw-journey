import { ActivitiesMain } from '@/components/trips/activities-main'
import { DestinationAndDateHeader } from '@/components/trips/destination-and-date-header'

export default function TripDetailsPage() {
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <ActivitiesMain />
    </div>
  )
}
