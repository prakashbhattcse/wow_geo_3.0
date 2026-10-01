// Country flag from /public/flags (4:3 SVGs). `id` is the 2-letter country code.
export default function Flag({ id, className = '', alt = '' }) {
  return <img className={'flag ' + className} src={`/flags/${id}.svg`} alt={alt} loading="lazy" width="80" height="60" />;
}
