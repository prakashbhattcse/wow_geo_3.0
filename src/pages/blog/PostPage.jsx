import { useParams } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { posts } from '../../data/extra';
import { formatDate } from '../../lib/util';
import NotFoundPage from '../NotFoundPage';

export default function PostPage() {
  const { slug } = useParams();
  const p = posts.find(x => x.slug === slug);
  useSeo({ title: p ? p.title : 'Not found', description: p?.summary });
  if (!p) return <NotFoundPage />;
  return (
    <>
      <PageHeader crumbs={[['/blog', 'Blog'], [null, p.title]]} title={p.title} intro={p.summary} />
      <article className="wrap prose"><time>{formatDate(p.date)}</time>{p.body.map((t, i) => <p key={i}>{t}</p>)}</article>
    </>
  );
}
