import { createContext, useContext, useEffect } from 'react';
import { SITE } from '../config';

// On the server, pages write their title/description into this object.
export const HeadContext = createContext(null);

export function useSeo({ title, description }) {
  const head = useContext(HeadContext);
  const full = title ? `${title} | ${SITE.name}` : `${SITE.name} – Free Geography Games, Maps and Quizzes`;
  if (head) Object.assign(head, { title: full, description });
  useEffect(() => {
    document.title = full;
    const m = document.querySelector('meta[name="description"]');
    if (m && description) m.setAttribute('content', description);
  }, [full, description]);
}
