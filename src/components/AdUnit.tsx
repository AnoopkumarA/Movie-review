import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdUnit = () => {
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
      style={{ display: 'block', width: '100%', height: '250px', minWidth: '300px' }}
      data-ad-client="ca-pub-9962210800771864"
      data-ad-slot="8895126316"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
