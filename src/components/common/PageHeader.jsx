import Breadcrumbs from './Breadcrumbs';
// Title block at the top of every inner page.
export default function PageHeader({ title, intro, crumbs }) {
  return (
    <div className="page-head">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1>{title}</h1>
        {intro && <p className="lead">{intro}</p>}
      </div>
    </div>
  );
}
