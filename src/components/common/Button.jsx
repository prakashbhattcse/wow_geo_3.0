import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// One button for the whole site.
// <Button to="/games">        -> internal link (React Router)
// <Button href="https://...">  -> external link, opens in a new tab
// <Button onClick={...}>      -> real <button>
// variant: 'primary' | 'outline' | 'text'    size: 'md' | 'sm'
const Button = forwardRef(function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }, ref) {
  const cls = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className].filter(Boolean).join(' ');
  if (to) return <Link ref={ref} to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a ref={ref} href={href} className={cls} target="_blank" rel="noopener" {...rest}>{children}</a>;
  return <button ref={ref} type="button" className={cls} {...rest}>{children}</button>;
});
export default Button;
