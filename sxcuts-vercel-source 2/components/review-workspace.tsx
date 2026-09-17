'use client';
import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Check, ChevronLeft, ChevronRight, Expand, MessageSquare, Monitor, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { reviewSections, reviewRevision, atelierUrl, type ReviewDraft } from '@/lib/review-sections';
import './review.css';

const key = 'sxcuts-atelier-review-v1';
const empty: ReviewDraft = { name: 'Saul', overall: '', notes: {} };
function restore(value: unknown): ReviewDraft {
  if (!value || typeof value !== 'object') return empty;
  const v = value as Partial<ReviewDraft>;
  const notes: ReviewDraft['notes'] = {};
  for (const section of reviewSections) {
    const n = v.notes?.[section.id];
    if (n && typeof n.text === 'string') notes[section.id] = { text: n.text, approved: n.approved === true };
  }
  return { name: typeof v.name === 'string' ? v.name : 'Saul', overall: typeof v.overall === 'string' ? v.overall : '', notes };
}
export default function ReviewWorkspace() {
  const [draft, setDraft] = useState<ReviewDraft>(empty);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState('Loading your draft…');
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw) setDraft(restore(JSON.parse(raw))); }
    catch { setSaved('Browser storage unavailable. Download your PDF before leaving.'); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(draft)); setSaved('Saved in this browser'); }
    catch { setSaved('Not saved. Download your PDF before leaving.'); }
  }, [draft, ready]);
  const section = reviewSections[index];
  const note = draft.notes[section.id] || { text: '', approved: false };
  const reviewed = reviewSections.filter(s => draft.notes[s.id]?.text.trim() || draft.notes[s.id]?.approved).length;
  const updateNote = (patch: Partial<typeof note>) => { setNotice(''); setDraft(d => ({ ...d, notes: { ...d.notes, [section.id]: { ...note, ...patch } } })); };
  async function download() {
    setBusy(true); setError(''); setNotice('');
    try {
      const { createReviewPdf } = await import('@/lib/review-pdf');
      const pdf = await createReviewPdf(draft);
      pdf.save('SXcuts-Atelier-feedback-' + new Date().toISOString().slice(0,10) + '.pdf');
      setNotice('Your PDF is ready. Send it to Gabe to bring back into the chat.');
    } catch { setError('The PDF could not be created. Your notes are still here. Check your connection and try again.'); }
    finally { setBusy(false); }
  }
  return <div className="rv">
    <header className="rv-header"><a className="rv-brand" href="/option-2">SXcuts<span>DESIGN REVIEW</span></a><div className="rv-header-actions"><a href={atelierUrl} target="_blank" rel="noreferrer">View website <ArrowUpRight size={16}/></a><Button className="rv-download" disabled={!ready || busy} onClick={download}><ArrowDownToLine/>{busy ? 'Preparing PDF…' : 'Download PDF'}</Button></div></header>
    <div className="rv-intro"><div><span className="rv-eyebrow">OPTION 02 / THE ATELIER</span><h1>Make it yours, Saul.</h1><p>Select a section, leave a note, then download your feedback.</p></div><div className="rv-progress"><span><strong>{reviewed}</strong> / {reviewSections.length} reviewed</span><div role="progressbar" aria-label="Sections reviewed" aria-valuenow={reviewed} aria-valuemin={0} aria-valuemax={reviewSections.length}><i style={{width:(reviewed/reviewSections.length*100)+'%'}}/></div><small>It’s fine to skip sections.</small></div></div>
    <p style={{padding:"0 3.2vw 24px",fontSize:14}}>These screenshots show the original Atelier design. <a href="/option-2" style={{textDecoration:"underline"}}>View the updated website</a> with Saul’s September feedback applied.</p>
    <main className="rv-workspace">
      <nav className="rv-sections" aria-label="Website sections"><div className="rv-list-title">THE WEBSITE <span>{reviewSections.length} SECTIONS</span></div><div className="rv-section-list">{reviewSections.map((s,i) => {
        const n = draft.notes[s.id]; const status = n?.text.trim() ? 'Has comments' : n?.approved ? 'Looks good' : 'Not reviewed';
        return <button key={s.id} aria-current={index === i ? 'true' : undefined} onClick={() => setIndex(i)} className={index === i ? 'is-selected' : ''}><img src={'/review/'+s.id+'.jpg'} alt=""/><span><small>{String(i+1).padStart(2,'0')}</small><strong>{s.title}</strong><em>{status}</em></span>{n?.text.trim() ? <MessageSquare size={15}/> : n?.approved ? <Check size={16}/> : null}</button>;
      })}</div></nav>
      <section className="rv-editor" aria-label="Selected section"><div className="rv-editor-top"><span><Monitor size={15}/> DESKTOP SNAPSHOT</span><span>{String(index+1).padStart(2,'0')} / {reviewSections.length}</span></div><div className="rv-section-heading"><div><h2>{section.title}</h2><p>{section.detail}</p></div><Button variant="ghost" className="rv-zoom" aria-label="Enlarge screenshot" onClick={()=>setZoom(true)}><Expand size={17}/></Button></div>
        <button className="rv-screenshot" onClick={()=>setZoom(true)} aria-label={'Enlarge '+section.title+' screenshot'}><img src={'/review/'+section.id+'.jpg'} alt={section.title+' — Atelier website screenshot'}/><span><Expand size={14}/> Click to enlarge</span></button>
        <div className="rv-note"><label htmlFor="section-note">What would you like to change?</label><textarea id="section-note" value={note.text} disabled={!ready} onChange={e=>updateNote({text:e.target.value})} placeholder="For example: Change the headline to… / Use a different photo…" rows={4}/><label className="rv-approve"><Checkbox checked={note.approved} disabled={!ready} onCheckedChange={value=>updateNote({approved:value})}/> Looks good to me</label></div>
        <div className="rv-step"><Button variant="ghost" disabled={index===0} onClick={()=>setIndex(i=>i-1)}><ChevronLeft/> Previous</Button><span>{reviewed === reviewSections.length ? 'All sections reviewed' : `${reviewSections.length-reviewed} sections left`}</span><Button variant="outline" disabled={index===reviewSections.length-1} onClick={()=>setIndex(i=>i+1)}>Next section <ChevronRight/></Button></div>
      </section>
      <aside className="rv-summary"><span className="rv-eyebrow">YOUR FEEDBACK</span><label htmlFor="reviewer">Your name</label><input id="reviewer" value={draft.name} disabled={!ready} onChange={e=>setDraft(d=>({...d,name:e.target.value}))}/><label htmlFor="overall">Anything about the whole site?</label><textarea id="overall" rows={5} value={draft.overall} disabled={!ready} onChange={e=>{setNotice('');setDraft(d=>({...d,overall:e.target.value}));}} placeholder="Colours, fonts, overall feeling, missing information…"/>
        <div className="rv-export"><span className="rv-export-icon"><ArrowDownToLine size={21}/></span><h3>Ready to send?</h3><p>Your PDF includes every screenshot, your comments and any sections marked “Looks good”.</p><Button className="rv-download" disabled={!ready || busy} onClick={download}>{busy?'Preparing PDF…':'Download feedback PDF'}<ArrowDownToLine/></Button><p className="rv-delivery">Send the PDF to Gabe. He can add it to the chat to make your changes.</p></div>
        <div className="rv-saved"><CheckCircle2 size={16}/><span>{saved}</span></div><p className="rv-privacy">No sign-in needed. Notes stay in this browser and aren’t shared automatically. Download the PDF to keep or share them.</p>
      </aside>
    </main>
    {(notice || error) && <div className={'rv-toast '+(error?'rv-error':'')} role={error?'alert':'status'}>{error || notice}<button onClick={()=>{setNotice('');setError('');}} aria-label="Dismiss message">×</button></div>}
    <footer className="rv-footer"><span>{reviewRevision}</span><span>Review at your own pace.</span></footer>
    <Dialog open={zoom} onOpenChange={setZoom}><DialogContent className="rv-modal"><DialogTitle>{section.title}</DialogTitle><DialogDescription>Full-size screenshot. Scroll sideways on a smaller screen to inspect the details.</DialogDescription><div className="rv-full-image"><img src={'/review/'+section.id+'.jpg'} alt={section.title+' — full-size screenshot'}/></div></DialogContent></Dialog>
  </div>;
}
