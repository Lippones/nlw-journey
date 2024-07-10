'use client'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const Dialog = RadixDialog.Root

const DialogTrigger = RadixDialog.Trigger

const DialogPortal = RadixDialog.Portal

const DialogClose = RadixDialog.Close

interface DialogOverlayProps extends RadixDialog.DialogOverlayProps {}

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <RadixDialog.Overlay
      className={twMerge('fixed inset-0 bg-black/60', className)}
      {...props}
    />
  )
}
interface DialogContentProps extends RadixDialog.DialogContentProps {}

function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        className={twMerge(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 min-w-[640px] space-y-5 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          className,
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close className="absolute right-4 top-1">
          <X className="size-5 text-zinc-400" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </DialogPortal>
  )
}

interface DialogTitleProps extends RadixDialog.DialogTitleProps {}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <RadixDialog.Title
      className={twMerge('text-lg font-semibold', className)}
      {...props}
    />
  )
}
interface DialogDescriptionProps extends RadixDialog.DialogDescriptionProps {}

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      className={twMerge('text-sm text-zinc-400', className)}
      {...props}
    />
  )
}
interface DialogHeaderProps extends ComponentProps<'div'> {}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div {...props} className={twMerge('space-y-2', className)} />
}

export {
  Dialog,
  DialogPortal,
  DialogHeader,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
}
