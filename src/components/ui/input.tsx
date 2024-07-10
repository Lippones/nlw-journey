import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ className, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      {...props}
      className={twMerge(
        'bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1',
        className,
      )}
    />
  )
}
