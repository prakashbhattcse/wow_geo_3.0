// Section heading with optional intro text and an optional element on the right (e.g. a "See all" link).
export default function Heading({ as: Tag = 'h2', title, intro, aside, className = '' }) {
  return (
    <div className={'heading ' + className}>
      <div>
        <Tag>{title}</Tag>
        {intro && <p className="heading__intro">{intro}</p>}
      </div>
      {aside && <div className="heading__aside">{aside}</div>}
    </div>
  );
}
