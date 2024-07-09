import { PlannerForm } from '@/components/home/planner-form'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex items-center justify-center h-svh bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.svg"
            alt="plann.er"
            width={172}
            height={44}
            quality={100}
          />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>
        <PlannerForm />
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
    </main>
  )
}
