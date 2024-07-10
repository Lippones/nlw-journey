'use client'
import { FormEvent, useState, useTransition } from 'react'
import { DestinationAndDateStep } from './steps/destination-and-date-step-'
import { InviteGuestStep } from './steps/invite-guest-step'
import { DateRange } from 'react-day-picker'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { z } from 'zod'
import { toast } from 'sonner'

const tripSchema = z
  .object({
    destination: z.string().min(1, { message: 'O destino é obrigatório' }),
    starts_at: z.date({
      message: 'A data de início é obrigatória',
    }),
    ends_at: z.date({
      message: 'A data de término é obrigatória',
    }),
    emails_to_invite: z
      .array(z.string().email('E-mail de algum convidado inválido'))
      .min(1, {
        message: 'É necessário convidar pelo menos uma pessoa',
      }),
    owner_name: z.string().min(1, { message: 'O nome do dono é obrigatório' }),
    owner_email: z.string().email('O e-mail do dono é inválido'),
  })
  .refine(
    (data) => {
      if (data.emails_to_invite.includes(data.owner_email)) {
        return false
      }

      return true
    },
    {
      message: 'O dono da viagem não pode ser convidado',
    },
  )

export function PlannerForm() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >(undefined)

  const [destination, setDestination] = useState('')

  function handleOpenGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
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

  async function handleCreateTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const ownerName = data.get('name')?.toString()
    const ownerEmail = data.get('email')?.toString()

    console.log({
      destination,
      eventStartAndEndDates,
      emailsToInvite,
    })

    const tripData = {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    }

    try {
      const parsedData = tripSchema.parse(tripData)

      startTransition(async () => {
        try {
          const { data } = await api.post<{
            tripId: string
          }>('/trips', {
            destination: parsedData.destination,
            starts_at: parsedData.starts_at,
            ends_at: parsedData.ends_at,
            emails_to_invite: parsedData.emails_to_invite,
            owner_name: parsedData.owner_name,
            owner_email: parsedData.owner_email,
          })

          router.push(`/trips/${data.tripId}`)
        } catch (error) {
          toast.error('Erro ao criar viagem')
        }
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(
          JSON.parse(error.message).map((e: { message: string }) => e.message),
        )
        toast.error(`Error: ${JSON.parse(error.message)[0].message}`)
      }
    }
  }

  return (
    <div className="">
      <div className="space-y-4">
        <DestinationAndDateStep
          destination={destination}
          handleOpenGuestsInput={handleOpenGuestsInput}
          setDestination={setDestination}
          setEventStartAndEndDates={setEventStartAndEndDates}
          eventStartAndEndDates={eventStartAndEndDates}
          isGuestsInputOpen={isGuestsInputOpen}
        />
        {isGuestsInputOpen && (
          <InviteGuestStep
            isPending={isPending}
            handleCreateTrip={handleCreateTrip}
            emailsToInvite={emailsToInvite}
            addNewEmailsToInvite={addNewEmailsToInvite}
            removeEmailsFromInvite={removeEmailsFromInvite}
          />
        )}
      </div>
    </div>
  )
}
