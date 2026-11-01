'use client';

import dynamic from 'next/dynamic';

/**
 * The enquiry form (react-hook-form + zod) is below the fold on every page that uses it, so it loads in its own chunk
 * after the page is interactive instead of weighing on first load. A same-size skeleton prevents layout shift.
 */
export const LazyEnquiryForm = dynamic(() => import('./EnquiryForm').then(m => m.EnquiryForm), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[34rem] rounded-[2rem] border-[3px] border-cocoa/20 bg-milk" />,
});
