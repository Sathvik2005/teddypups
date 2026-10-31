import { MessageCircle, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';

/** Mobile-only sticky contact bar (the reference shows "WhatsApp us" + "Call" on small screens). */
export function WhatsAppFloat() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 flex gap-2 lg:hidden">
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm flex-1">
        <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
      </a>
      <a href={site.phoneHref} className="btn btn-sm border-cocoa bg-milk text-cocoa shadow-[0_4px_0_var(--color-cocoa)]">
        <Phone size={16} aria-hidden="true" /> Call
      </a>
    </div>
  );
}
