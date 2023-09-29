import React, { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    // Load the adsbygoogle.js script dynamically
    const script = document.createElement('script');
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4736749900506771';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    // Check if an ad is already loaded
    const isAdAlreadyLoaded = !!document.querySelector(
      '.adsbygoogle:not([data-ad-status="filled"])'
    );

    if (!isAdAlreadyLoaded) {
      // Delay the ad request slightly
      setTimeout(() => {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }, 1000); // 1 second delay, can be adjusted
    }
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4736749900506771"
        data-ad-slot="9754369071"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default GoogleAd;
