import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// In-Article Ad Unit
export const InArticleAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
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

// Display Ad Unit
export const DisplayAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9962210800771864"
      data-ad-slot="8895126316"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

// Sidebar Ad Unit (Square/Rectangle)
export const SidebarAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Error loading ad:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9962210800771864"
      data-ad-slot="8895126316"
      data-ad-format="rectangle"
    />
  );
};
