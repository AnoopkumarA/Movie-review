import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}


export const InArticleAdUnit = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Error loading in-article ad:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-gw-3+1f-3d+2z"
      data-ad-client="ca-pub-9962210800771864"
      data-ad-slot="8706034993"
    />
  );
};

