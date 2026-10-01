import { Link } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { PageHeader } from '../../components/common';
import { posts } from '../../data/extra';
import { formatDate } from '../../lib/util';

export default function BlogPage() {
  useSeo({ title: 'Blog', description: 'Short reads about flags, borders, capitals and the odd corners of world geography.' });
  return (
    <>
      <PageHeader title="Blog" intro="The stories behind the questions." />
      <div className="wrap"><ul className="posts">{posts.map(p => <li key={p.slug}><Link to={`/blog/${p.slug}`}><time>{formatDate(p.date)}</time><strong>{p.title}</strong><span>{p.summary}</span></Link></li>)}</ul></div>
    </>
  );
}
