import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  return <NextGoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />;
}
