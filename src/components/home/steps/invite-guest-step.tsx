'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { FormEvent } from 'react'
import { GuestInviteModal } from '../guest-invite-modal'
import { TripConfirmModal } from '../trip-confirm-modal'

interface InviteGuestStepProps {
  emailsToInvite: string[]
  isPending: boolean
  addNewEmailsToInvite: (e: FormEvent<HTMLFormElement>) => void
  removeEmailsFromInvite: (email: string) => void
  handleCreateTrip: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export function InviteGuestStep({
  emailsToInvite,
  addNewEmailsToInvite,
  removeEmailsFromInvite,
  handleCreateTrip,
  isPending,
}: InviteGuestStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <GuestInviteModal
        addNewEmailsToInvite={addNewEmailsToInvite}
        emailsToInvite={emailsToInvite}
        removeEmailsFromInvite={removeEmailsFromInvite}
      >
        <button type="button" className="flex items-center gap-2 flex-1">
          <UserRoundPlus className="size-5 text-zinc-400" />

          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1 text-left">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1 text-left">
              Quem estará na viagem
            </span>
          )}
        </button>
      </GuestInviteModal>

      <div className="w-px h-6 bg-zinc-800" />
      <TripConfirmModal isPending={isPending} createTrip={handleCreateTrip}>
        <Button>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </TripConfirmModal>
    </div>
  )
}
