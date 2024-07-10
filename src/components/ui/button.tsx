import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-lg px-5 py-2 font-medium inline-flex items-center justify-center gap-2 transition-colors',
  variants: {
    variant: {
      primary:
        'bg-lime-300 text-lime-950 hover:bg-lime-400 disabled:bg-lime-700',
      secondary:
        'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 disabled:bg-zinc-800',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends ComponentProps<'button'>, ButtonVariants {}

export function Button({
  children,
  variant,
  size,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      {...props}
      className={twMerge(buttonVariants({ variant, size }), className)}
    >
      {children}
    </button>
  )
}
