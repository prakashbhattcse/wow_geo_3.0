import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { SITE } from '../../config';

export default function PrivacyPage() {
  useSeo({ title: 'Privacy policy', description: 'How Wow Geography handles your data.' });
  return (
    <>
      <PageHeader title="Privacy policy" intro="Last updated 1 October 2026." />
      <div className="wrap"><div className="doc-page prose">
        <p>Wow Geography doesn't have user accounts and doesn't ask for personal information to play.</p>
        <h2>Scores</h2><p>Your best scores are saved in your own browser's local storage so you can see them next time. They never leave your device. Clearing your browser data removes them.</p>
        <h2>Advertising and cookies</h2><p>This site may show ads from Google and other ad partners. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this and other websites. Google's use of advertising cookies lets it and its partners serve ads based on your visits. You can opt out of personalised advertising at Google's Ads Settings page, or opt out of some third-party vendors' cookies at aboutads.info.</p>
        <h2>Analytics</h2><p>We may use privacy-friendly analytics to count visits and see which games are popular. This data is aggregated and not used to identify you.</p>
        <h2>Email</h2><p>If you join the newsletter, we use your email only to send new-game updates, and you can unsubscribe at any time.</p>
        <h2>Contact</h2><p>Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div></div>
    </>
  );
}
