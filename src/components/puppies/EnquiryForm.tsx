'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MessageCircle } from 'lucide-react';
import { site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';

const schema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.'),
  phone: z.string().trim().regex(/^\+?[0-9][0-9\s().-]{6,19}$/, 'Enter a phone or WhatsApp number with country code, e.g. +971 50 123 4567.'),
  email: z.union([z.literal(''), z.string().trim().email('That email address does not look right.')]),
  area: z.string().trim().max(80).optional(),
  interest: z.string().optional(),
  message: z.string().trim().max(1000, 'Please keep your message under 1000 characters.').optional(),
  website: z.string().max(0), // honeypot
});
type Values = z.infer<typeof schema>;

const field = 'mt-1.5 w-full rounded-2xl border-[3px] border-cocoa bg-milk px-4 py-3 text-base transition-shadow focus:shadow-[0_3px_0_var(--color-toffee)]';
const err = 'mt-1.5 text-sm font-semibold text-toffee-ink';

export function EnquiryForm({ defaultMessage, interests, heading }: { defaultMessage: string; interests?: string[]; heading?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', area: '', interest: interests?.[0] ?? '', message: defaultMessage, website: '' },
  });
  const [done, setDone] = useState<Values | null>(null);

  const compose = (v: Values) =>
    [
      v.message || defaultMessage,
      v.interest ? `Interested in: ${v.interest}` : '',
      `My name: ${v.name}`,
      `Phone/WhatsApp: ${v.phone}`,
      v.email ? `Email: ${v.email}` : '',
      v.area ? `Area: ${v.area}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  if (done) {
    const text = compose(done);
    return (
      <div role="status" className="rounded-[2rem] border-[3px] border-cocoa bg-honey-soft p-7 shadow-[0_6px_0_var(--color-cocoa)]" data-testid="enquiry-ready">
        <PuppyMascot name="coco" expression="happy" wag className="mascot-hover mb-2 w-24" label="Coco wagging with excitement" />
        <h3 className="h-card text-3xl">Almost there, {done.name.split(' ')[0]}!</h3>
        <p className="mt-3 text-cocoa-soft">
          Your enquiry is ready, but this website does not store or email enquiries by itself — nothing has been sent yet. Pick how you would like to send it and we&apos;ll reply promptly.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            <MessageCircle size={18} aria-hidden="true" /> Send on WhatsApp
          </a>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent('Puppy enquiry')}&body=${encodeURIComponent(text)}`} className="btn btn-ghost">
            <Mail size={18} aria-hidden="true" /> Send by email
          </a>
          <button type="button" className="btn btn-sm text-cocoa underline" onClick={() => setDone(null)}>
            Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(v => setDone({ ...getValues(), ...v }))} noValidate aria-label={heading ?? 'Enquiry form'} className="space-y-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-6 shadow-[0_6px_0_var(--color-cocoa)] md:p-8">
      <div>
        <label htmlFor="enq-name" className="font-semibold">
          Your name <span aria-hidden="true">*</span>
        </label>
        <input id="enq-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'enq-name-e' : undefined} className={field} {...register('name')} />
        {errors.name && <p id="enq-name-e" className={err}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="enq-phone" className="font-semibold">
          Phone or WhatsApp <span aria-hidden="true">*</span>
        </label>
        <input id="enq-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="With country code, e.g. +971 50 123 4567" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'enq-phone-e' : undefined} className={field} {...register('phone')} />
        {errors.phone && <p id="enq-phone-e" className={err}>{errors.phone.message}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enq-email" className="font-semibold">
            Email <span className="font-normal text-cocoa-soft">(optional)</span>
          </label>
          <input id="enq-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'enq-email-e' : undefined} className={field} {...register('email')} />
          {errors.email && <p id="enq-email-e" className={err}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="enq-area" className="font-semibold">
            Your area <span className="font-normal text-cocoa-soft">(optional)</span>
          </label>
          <input id="enq-area" autoComplete="address-level2" placeholder="e.g. Dubai Marina" className={field} {...register('area')} />
        </div>
      </div>
      {interests && (
        <div>
          <label htmlFor="enq-interest" className="font-semibold">
            Which puppy?
          </label>
          <select id="enq-interest" className={cn(field, 'appearance-none')} {...register('interest')}>
            {interests.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="enq-message" className="font-semibold">
          Message <span className="font-normal text-cocoa-soft">(optional)</span>
        </label>
        <textarea id="enq-message" rows={4} aria-invalid={!!errors.message} className={field} {...register('message')} />
        {errors.message && <p className={err}>{errors.message.message}</p>}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="enq-website">Website</label>
        <input id="enq-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
        Send enquiry
      </button>
      <p className="text-sm text-cocoa-soft">We&apos;ll prepare your message for WhatsApp or email — nothing is stored on this site.</p>
    </form>
  );
}
