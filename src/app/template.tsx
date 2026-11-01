/**
 * Re-mounts on every navigation, so each page eases in. Pure CSS (see `.page-enter`): the HTML is visible on first paint
 * instead of waiting for JavaScript to hydrate, which keeps Largest Contentful Paint fast.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
