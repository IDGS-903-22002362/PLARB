import Home from '@/components/portfolio/home';
import { SiteShell } from '@/components/portfolio/shell';
export default function Portfolio() {
  return (
    <SiteShell home>
      <Home />
    </SiteShell>
  );
}
