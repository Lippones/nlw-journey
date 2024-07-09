'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GuestInviteModal } from './guest-invite-modal'
import { TripConfirmModal } from './trip-confirm-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step-'
import { InviteGuestStep } from './steps/invite-guest-step'

export function PlannerForm() {
  const router = useRouter()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModelOpen, setIsConfirmTripModelOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  function handleOpenGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function handleOpenConfirmTripModal() {
    setIsConfirmTripModelOpen(!isConfirmTripModelOpen)
  }

  function handleOpenGuestsModal() {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function handleCreateTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.push('/trips/1')
  }

  function addNewEmailsToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const email = data.get('email')?.toString()

    if (!email || emailsToInvite.includes(email)) return

    setEmailsToInvite([...emailsToInvite, email])
  }

  function removeEmailsFromInvite(email: string) {
    setEmailsToInvite(emailsToInvite.filter((e) => e !== email))
  }

  return (
    <div className="">
      <div className="space-y-4">
        <DestinationAndDateStep
          handleOpenGuestsInput={handleOpenGuestsInput}
          isGuestsInputOpen={isGuestsInputOpen}
        />
        {isGuestsInputOpen && (
          <InviteGuestStep
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={handleOpenConfirmTripModal}
            openGuestsModal={handleOpenGuestsModal}
          />
        )}

        {isGuestsModalOpen && (
          <GuestInviteModal
            addNewEmailsToInvite={addNewEmailsToInvite}
            closeModal={handleOpenGuestsModal}
            emailsToInvite={emailsToInvite}
            removeEmailsFromInvite={removeEmailsFromInvite}
          />
        )}

        {isConfirmTripModelOpen && (
          <TripConfirmModal
            createTrip={handleCreateTrip}
            closeModal={handleOpenConfirmTripModal}
          />
        )}
      </div>
    </div>
  )
}
