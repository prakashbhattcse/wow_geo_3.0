import { createContext, useContext, useEffect } from 'react';
import { SITE } from '../config';

// On the server, pages write their title/description/noindex into this object.
export const HeadContext = createContext(null);

export function useSeo({ title, description, noindex = false }) {
  const head = useContext(HeadContext);
  const full = title ? `${title} | ${SITE.name}` : `${SITE.name} – Free Geography Games, Maps and Quizzes`;
  if (head) Object.assign(head, { title: full, description, noindex });
  useEffect(() => {
    document.title = full;
    const m = document.querySelector('meta[name="description"]');
    if (m && description) m.setAttribute('content', description);
    // Manage robots meta for noindex pages (client-side hydration)
    let r = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!r) {
        r = document.createElement('meta');
        r.setAttribute('name', 'robots');
        document.head.appendChild(r);
      }
      r.setAttribute('content', 'noindex, follow');
    } else if (r && r.getAttribute('content') === 'noindex, follow') {
      r.setAttribute('content', 'index, follow');
    }
  }, [full, description, noindex]);
}
