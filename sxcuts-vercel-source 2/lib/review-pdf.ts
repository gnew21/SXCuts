import { jsPDF } from 'jspdf';
import { reviewSections, reviewRevision, atelierUrl, type ReviewDraft } from './review-sections';

async function loadAsset(path: string): Promise<Uint8Array> {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Could not load ' + path);
  return new Uint8Array(await response.arrayBuffer());
}
function base64(data: Uint8Array) {
  let binary = '';
  for (let offset = 0; offset < data.length; offset += 8192) binary += String.fromCharCode(...data.subarray(offset, offset + 8192));
  return btoa(binary);
}
export async function createReviewPdf(draft: ReviewDraft, load = loadAsset) {
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  pdf.addFileToVFS('Manrope.ttf', base64(await load('/fonts/manrope.ttf')));
  pdf.addFont('Manrope.ttf', 'Manrope', 'normal');
  pdf.setFont('Manrope', 'normal');
  pdf.setProperties({title:'SXcuts - Atelier design feedback',author:draft.name.trim() || 'Reviewer',subject:reviewRevision,creator:'SXcuts design review'});
  const margin = 17, width = 176, bottom = 274;
  let y = 20;
  const text = (value: string, size = 11, colour = '#24332b') => {
    pdf.setFontSize(size); pdf.setTextColor(colour);
    const lines: string[] = pdf.splitTextToSize(value.replace(/\r\n/g,'\n'), width);
    const height = size * 0.3528 * 1.65;
    for (const line of lines) {
      if (y + height > bottom) { pdf.addPage(); y = 22; }
      pdf.text(line, margin, y); y += height;
    }
  };
  const rule = () => { pdf.setDrawColor('#d4ded7'); pdf.line(margin,y,193,y); y+=10; };
  text('SXCUTS / DESIGN REVIEW',10,'#52725f'); y+=7;
  text('The Atelier',30); y+=3;
  text('Website feedback',18); y+=10;
  text('Reviewed by: ' + (draft.name.trim() || 'Not specified'),12);
  text('Exported: ' + new Date().toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'}),10,'#65776a');
  text(reviewRevision,10,'#65776a');
  pdf.setFontSize(9); pdf.setTextColor('#284c43'); pdf.textWithLink('View the Atelier website',margin,y,{url:atelierUrl}); y+=13;
  const reviewed = reviewSections.filter(s=>draft.notes[s.id]?.text.trim() || draft.notes[s.id]?.approved).length;
  text(`${reviewed} of ${reviewSections.length} sections reviewed`,12); y+=5; rule();
  text('Overall feedback',15); y+=4;
  text(draft.overall.trim() || 'No overall feedback added.'); y+=10;
  text('How to use this review',13); y+=3;
  text('Each section includes its screenshot, review status and comments. Unreviewed sections are not approvals. Send this PDF to Gabe and add it to the website chat to request the changes.',10,'#65776a');
  for (const [i,section] of reviewSections.entries()) {
    pdf.addPage(); y=20;
    text('SXCUTS / ATELIER / SECTION '+String(i+1).padStart(2,'0'),9,'#52725f'); y+=5;
    text(section.title,20); y+=3;
    text(section.detail,10,'#65776a'); y+=5;
    const image = await load('/review/'+section.id+'.jpg');
    const properties = pdf.getImageProperties(image);
    const h = width * properties.height / properties.width;
    pdf.addImage(image,'JPEG',margin,y,width,h,section.id,'FAST'); y+=h+12;
    const note = draft.notes[section.id];
    const status = note?.text.trim() ? (note.approved ? 'Looks good, with comments' : 'Comments added') : note?.approved ? 'Looks good' : 'Not reviewed';
    text('Status: '+status,11,'#284c43'); y+=4; rule();
    text('Comments',12); y+=3;
    text(note?.text.trim() || (note?.approved ? 'No changes requested.' : 'No comment added.'));
  }
  const pages = pdf.getNumberOfPages();
  for(let i=1;i<=pages;i++) {
    pdf.setPage(i); pdf.setDrawColor('#d4ded7'); pdf.line(margin,282,193,282);
    pdf.setFontSize(8); pdf.setTextColor('#718276');
    pdf.text('SXcuts · Atelier design feedback',margin,288);
    pdf.text(`${i} / ${pages}`,193,288,{align:'right'});
  }
  return pdf;
}
