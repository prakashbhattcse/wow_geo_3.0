import { Heading, ContinentMap } from '../common';

export default function ContinentsSection() {
  return (
    <section className="world">
      <div className="wrap">
        <Heading className="world-head" title="Pick a continent" intro="Click any part of the map to see its countries, capitals and flags, then test yourself on just that region." />
        <ContinentMap />
      </div>
    </section>
  );
}
