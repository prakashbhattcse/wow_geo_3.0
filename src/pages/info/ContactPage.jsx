import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { SITE } from '../../config';

export default function ContactPage() {
  useSeo({ title: 'Contact', description: 'Get in touch with Wow Geography.' });
  return (
    <>
      <PageHeader title="Contact" />
      <div className="wrap prose">
        <p>Found a wrong answer, have an idea for a game, or want to work together? Email <a className="btn btn--text" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        <p>You can also leave a comment on any video on the <a className="btn btn--text" href={SITE.youtube} target="_blank" rel="noopener">YouTube channel</a>.</p>
      </div>
    </>
  );
}
