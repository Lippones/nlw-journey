import { Link2, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-semibold text-lg">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium">Reserva de AirBnB</span>
            <Link
              href="#"
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </Link>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>
      <Button variant="secondary" size="full">
        <Plus className="size-5" /> Cadastrar novo link
      </Button>
    </div>
  )
}
