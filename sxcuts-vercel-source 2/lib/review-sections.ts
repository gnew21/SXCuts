export const reviewSections = [
  { id: 'hero', title: 'First impression', detail: 'Header, hero image, headline and booking button.' },
  { id: 'menu', title: 'Navigation menu', detail: 'The menu that opens from the top corner.' },
  { id: 'gallery-texture', title: 'Gallery · texture & design', detail: 'Gallery layout, labels and the first haircut.' },
  { id: 'gallery-fades', title: 'Gallery · fades & tapers', detail: 'The second gallery selection.' },
  { id: 'gallery-crops', title: 'Gallery · crops & shape', detail: 'The third gallery selection.' },
  { id: 'lightbox', title: 'Enlarged haircut', detail: 'The photo view that opens when a haircut is selected.' },
  { id: 'barber', title: 'Meet your barber', detail: 'Saul’s introduction and Instagram link.' },
  { id: 'studio', title: 'The studio photo', detail: 'The large photograph and its caption.' },
  { id: 'approach', title: 'The approach', detail: 'Conversation, craft and character.' },
  { id: 'reviews', title: 'Client words', detail: 'Testimonials, names and the Google link.' },
  { id: 'contact', title: 'Booking & contact', detail: 'Address, appointments, email and Instagram.' },
  { id: 'faq', title: 'FAQs · overview', detail: 'The questions shown before an answer is opened.' },
  { id: 'faq-booking', title: 'FAQ · booking', detail: 'The expanded booking answer.' },
  { id: 'faq-choosing', title: 'FAQ · finding your cut', detail: 'The expanded haircut advice.' },
  { id: 'faq-studio', title: 'FAQ · the studio', detail: 'The expanded studio answer.' },
  { id: 'faq-availability', title: 'FAQ · availability', detail: 'The expanded availability answer.' },
  { id: 'footer', title: 'Footer', detail: 'The final links and “Get in touch” line.' },
] as const;
export type ReviewNote = { text: string; approved: boolean };
export type ReviewDraft = { name: string; overall: string; notes: Record<string, ReviewNote> };
export const reviewRevision = 'Atelier / option 02 · screenshots 15 September 2026';
export const atelierUrl = 'https://sxcuts-studio.gabenewhouse21.chatgpt.site/option-2';
