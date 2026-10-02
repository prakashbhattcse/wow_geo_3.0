import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';

export default function TermsPage() {
  useSeo({ title: 'Terms of use', description: 'Terms of use for Wow Geography.' });
  return (
    <>
      <PageHeader title="Terms of use" intro="Last updated 1 October 2026." />
      <div className="wrap"><div className="doc-page prose">
        <p>Wow Geography is free to use for personal and classroom learning. Teachers are welcome to use the games in lessons.</p>
        <p>We work hard to keep answers accurate, but geography changes: borders move, capitals get renamed. The content is provided as is, without warranty. If you find an error, let us know.</p>
        <p>Map shapes are simplified and are not authoritative depictions of international boundaries.</p>
        <p>Please don't copy the site wholesale or scrape it. Linking to any page is always fine.</p>
      </div></div>
    </>
  );
}
