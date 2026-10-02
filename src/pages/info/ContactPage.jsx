import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { SITE } from '../../config';

export default function ContactPage() {
  useSeo({ title: 'Contact', description: 'Get in touch with Wow Geography.' });
  return (
    <>
      <PageHeader title="Contact" intro="Found a mistake, have a suggestion, or want to work together? Reach us through any of the options below." />
      <div className="wrap">
        <div className="contact-layout">

          <a className="contact-card contact-card--email" href={`mailto:${SITE.email}`}>
            <span className="contact-card__icon">✉️</span>
            <div>
              <strong className="contact-card__title">Send an email</strong>
              <span className="contact-card__sub">{SITE.email}</span>
              <p className="contact-card__desc">Best for reporting wrong answers, suggesting a game idea, or any other enquiry. We read every message.</p>
            </div>
          </a>

          {SITE.youtube && (
            <a className="contact-card contact-card--yt" href={SITE.youtube} target="_blank" rel="noopener noreferrer">
              <span className="contact-card__icon">▶</span>
              <div>
                <strong className="contact-card__title">YouTube channel</strong>
                <span className="contact-card__sub">@wowgeography</span>
                <p className="contact-card__desc">Leave a comment on any video. We post about flags, maps, and geography — and reply to comments.</p>
              </div>
            </a>
          )}

        </div>

        <div className="contact-note">
          <h2>What to include in your message</h2>
          <ul>
            <li><strong>Wrong answer or data error:</strong> tell us the question, the answer the game accepted, and what the correct answer is.</li>
            <li><strong>Game suggestion:</strong> a brief description is enough — no need to prototype anything.</li>
            <li><strong>Country page mistake:</strong> include the country name and the specific fact that needs correcting, with a source if possible.</li>
          </ul>
          <p>We try to respond within a few days. If you don't hear back, it may have gone to spam — try again with a clear subject line.</p>
        </div>
      </div>
    </>
  );
}
