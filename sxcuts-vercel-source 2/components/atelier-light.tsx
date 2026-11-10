'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { site } from '@/lib/site';
import './atelier-light.css';
import GoogleReviews from '@/components/google-reviews';

const questions = [
  ['WHAT SHOULD I BRING?', 'A reference photo is always welcome. Think about what you like about your current cut, what you’d change and how you usually style it.'],
  ['NOT SURE WHICH CUT SUITS YOU?', 'That’s what the consultation is for. Saul will talk through your hair type, growth patterns, preferred length and everyday routine before getting started.'],
  ['WHERE CAN I SEE SERVICES & PRICES?', 'The SXcuts Square booking site has the current service menu, prices and available appointment times. Use Book a cut in the header to find your next appointment.'],
  ['HAVE A QUESTION BEFORE YOU ARRIVE?', 'Send Saul a message on Instagram or email him using the contact details above.'],
];
const navigation = [['HOME','/'],['THE STUDIO','/studio'],['VISIT','/visit']];


export default function AtelierLight({page='home'}:{page?:'home'|'studio'|'visit'}) {
  const [menu,setMenu]=useState(false);
  return <div className={"atelier-light al-multipage al-page-"+page}>
    <a className="skip" href="#atelier-main">Skip to content</a>
    <header className="al-nav"><a className="al-logo" href="/">SXcuts<small>ST IVES / STYLIST</small></a><nav className="al-desktop-nav" aria-label="Main navigation">{navigation.map(([label,url])=><a key={url} href={url} aria-current={(page==='home'?url==='/':url.endsWith(page))?'page':undefined}>{label}</a>)}</nav><div className="al-nav-right"><a href={site.bookingUrl} target="_blank" rel="noreferrer" className="al-nav-book">BOOK A CUT <ArrowUpRight size={16}/></a><Sheet open={menu} onOpenChange={setMenu}><SheetTrigger render={<Button variant="ghost" className="al-menu-button" aria-label="Open navigation"/>}>MENU</SheetTrigger><SheetContent className="al-menu"><SheetTitle>SXcuts</SheetTitle><SheetDescription>Saul Newhouse. St Ives, Sydney.</SheetDescription><nav>{navigation.map(([title,id],i)=><a key={id} href={id} onClick={()=>setMenu(false)}><span>0{i+1}</span>{title}<ArrowUpRight/></a>)}</nav></SheetContent></Sheet></div></header>
    <main id="atelier-main">
      {page==='home' && <><section className="al-hero"><div className="al-hero-copy"><span className="al-kicker">SAUL NEWHOUSE</span><div><h1>SX CUTS</h1><span className="al-rule"/><p>ST IVES / STYLIST</p></div><a className="al-explore" href="/studio">EXPLORE THE STUDIO <ArrowRight size={16}/></a></div><div className="al-hero-photo"><img src="/images/atelier/studio-chair.jpg" alt="The SXcuts chair, workstation and hexagonal studio lights in St Ives" width={1920} height={2560} fetchPriority="high"/><span>53 KITCHENER STREET / ST IVES</span></div></section>
      <section className="al-home-intro al-section"><span className="al-kicker">YOUR LOCAL / ST IVES</span><div><h2>ONE BARBER.<br/>YOUR NEXT CUT.</h2><p>I'm Saul. Come in for your usual, bring a reference, or ask me what would suit you.</p><a className="al-link" href="/studio">MEET SAUL & SEE THE STUDIO <ArrowUpRight size={18}/></a></div><a className="al-home-portrait" href="/studio" aria-label="Meet Saul"><img src="/images/atelier/saul-portrait.png" alt="Saul at work in his St Ives studio" loading="lazy"/></a></section></>}
      {page==='studio' && <><div className="al-page-heading"><span className="al-kicker">SXCUTS / THE STUDIO</span><h1>A SPACE<br/>OF OUR OWN.</h1><p>53 Kitchener Street, St Ives.</p></div>
      <section className="al-about al-section" id="saul"><div className="al-about-photo"><img src="/images/atelier/saul-portrait.png" alt="Saul Newhouse beside a client in the SXcuts chair" width={1179} height={2556} loading="lazy"/></div><div className="al-about-copy"><span className="al-kicker">MEET YOUR BARBER</span><h2>SAUL.<br/>GOOD TO<br/>MEET YOU.</h2><p>I’m Saul, the barber behind SXcuts in St Ives.</p><p>Come in for your usual or bring a photo of something you’d like to try. Not sure what suits you? We’ll work it out together.</p><a className="al-link" href={site.instagramUrl} target="_blank" rel="noreferrer">MEET SAUL ON INSTAGRAM <ArrowUpRight size={18}/></a></div></section>
      <section id="studio" className="al-studio al-section"><div className="al-section-head"><span className="al-kicker">53 KITCHENER STREET</span><h2>IN THE<br/>STUDIO.</h2></div><div className="al-studio-grid"><figure className="al-station"><img src="/images/atelier/workstation.jpg" alt="Saul’s workstation with styling products, clippers and mirror" width={2560} height={1920} loading="lazy"/><figcaption><span>01 / THE SETUP</span><span>ST IVES, SYDNEY</span></figcaption></figure><figure className="al-working"><div><img src="/images/atelier/saul-at-work.png" alt="Saul cutting a client’s hair, reflected in the studio mirror" width={1179} height={2556} loading="lazy"/></div><figcaption>02 / IN THE CHAIR</figcaption></figure></div><a className="al-link" href={site.instagramUrl} target="_blank" rel="noreferrer">SEE THE LATEST CUTS ON INSTAGRAM <ArrowUpRight size={18}/></a>
        <div className="al-approach">{[['01','CONVERSATION','The look you have in mind. The length you want to keep. The details worth talking through.'],['02','CRAFT','Fresh shape, thoughtful texture and a clean transition. Explore Saul’s cuts to find your direction.'],['03','CHARACTER','A subtle change or a distinctive design. A finish that feels like yours.']].map(([n,t,p])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
      </section>
      </>}
      {page==='home' && <GoogleReviews/>}
      {page==='visit' && <>
        <section className="al-visit-hero" aria-labelledby="visit-title">
          <div className="al-visit-copy">
            <span className="al-kicker">SXCUTS / ST IVES, SYDNEY</span>
            <h1 id="visit-title">VISIT THE<br/>STUDIO.</h1>
            <p className="al-visit-intro">Good hair starts with a conversation.<br/>Find us in St Ives, and make yourself at home.</p>
            <div className="al-visit-address">
              <span className="al-kicker">FIND US</span>
              <address>53 Kitchener Street<br/>St Ives, NSW 2075</address>
              <a className="al-link" href={site.directionsUrl} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={18}/></a>
            </div>
          </div>
          <figure className="al-visit-photo">
            <img src="/images/atelier/studio-chair.jpg" alt="The SXcuts chair and workstation at the St Ives studio" width={1920} height={2560} fetchPriority="high"/>
            <figcaption>YOUR LOCAL CHAIR / SXCUTS</figcaption>
          </figure>
        </section>
        <section className="al-visit-info al-section" aria-label="Appointment and contact information">
          <div><span className="al-kicker">01 / YOUR APPOINTMENT</span><h2>A TIME FOR YOU.</h2><p>Current services, prices and appointment times are available on Square. Every visit starts with a conversation about your cut.</p></div>
          <div><span className="al-kicker">02 / GET IN TOUCH</span><h2>A QUESTION FOR SAUL?</h2><p>For anything you’d like to ask before your visit.</p><a className="al-visit-email" href={'mailto:'+site.email}>{site.email}</a><a className="al-link" href={site.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM / @SX.CUTS_ <ArrowUpRight size={18}/></a></div>
        </section>
        <section className="al-faq al-section"><div><span className="al-kicker">A FEW THINGS TO KNOW</span><h2>BEFORE<br/>YOU ARRIVE.</h2></div><Accordion>{questions.map(([q,a],i)=><AccordionItem key={q} value={'atelier-faq-'+i}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></section>
      </>}
    </main>
    <footer className="al-footer"><div className="al-footer-main"><a className="al-logo" href="/">SXcuts<small>ST IVES / STYLIST</small></a><nav aria-label="Footer navigation">{navigation.map(([label,url])=><a key={url} href={url}>{label}</a>)}</nav></div><div className="al-footer-bottom"><span>© {new Date().getFullYear()} SXcuts</span><span>53 Kitchener Street, St Ives</span><a href={site.instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM</a></div></footer>
  </div>;
}
