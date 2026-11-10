'use client';

import { useState } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import data from '@/lib/google-reviews.json';
import { site } from '@/lib/site';

export default function GoogleReviews() {
  const [expanded, setExpanded] = useState(false);
  const visibleReviews = expanded ? data.reviews : data.reviews.slice(0, 6);

  return (
    <section id="client-words" className="al-reviews al-section" aria-labelledby="client-words-title">
      <div className="al-section-head">
        <div>
          <span className="al-kicker">ON GOOGLE</span>
          <a className="al-rating" href={site.googleProfileUrl} target="_blank" rel="noreferrer" aria-label={`${data.rating.toFixed(1)} out of 5 from ${data.totalReviews} Google reviews`}>
            <strong>{data.rating.toFixed(1)}</strong>
            <span><span aria-hidden="true">★★★★★</span><small>{data.totalReviews} Google reviews</small></span>
          </a>
        </div>
        <h2 id="client-words-title">CLIENT<br/>WORDS.</h2>
      </div>
      <div id="google-review-list" className="al-quotes al-google-quotes al-review-collection">
        {visibleReviews.map(review => (
          <figure key={review.id}>
            <span aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}</span>
            <blockquote>“{review.quote}{review.excerpt ? ' …' : ''}”</blockquote>
            <figcaption>
              <a href={review.authorUrl} target="_blank" rel="noreferrer" aria-label={`View ${review.name} on Google`}>
                {review.name}<ArrowUpRight size={13} aria-hidden="true"/>
              </a>
              <small>GOOGLE REVIEW</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="al-review-actions">
        <button className="al-link al-review-toggle" type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="google-review-list">
          {expanded ? 'SHOW FEWER REVIEWS' : `VIEW ALL ${data.reviews.length} WRITTEN REVIEWS`}
          {expanded ? <Minus size={18} aria-hidden="true"/> : <Plus size={18} aria-hidden="true"/>}
        </button>
        <a className="al-link" href={site.googleProfileUrl} target="_blank" rel="noreferrer">WRITE A GOOGLE REVIEW <ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
    </section>
  );
}
