'use client'
import { Plus } from 'lucide-react'
import { Activities } from './activities'
import { Guests } from './guests'
import { ImportantLinks } from './important-links'
import { Button } from '../ui/button'
import { CreateActivityModal } from './create-activity-modal'

export function ActivitiesMain() {
  return (
    <main className="flex gap-16 px-4">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Atividades</h1>
          <CreateActivityModal>
            <Button>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </CreateActivityModal>
        </div>

        <Activities />
      </div>

      <div className="w-80 space-y-6">
        <ImportantLinks />
        <div className="w-full h-px bg-zinc-800" />
        <Guests />
      </div>
    </main>
  )
}
