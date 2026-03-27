import Script from "next/script";
import { PostHogInit } from "./posthog-provider";

export function AnalyticsProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <PostHogInit />
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}
