import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContent } from "../context/ContentContext";

export function useMetaPixel() {
  const location = useLocation();
  const { content } = useContent();

  useEffect(() => {
    let pixelId = "1739772653824128";
    try {
      const seoData = JSON.parse(content.seoSettingsJson);
      if (seoData.fbPixelId) {
        pixelId = seoData.fbPixelId;
      }
    } catch (e) {}
    
    // Privacy compliance: Respect browser's "Do Not Track" and local opt-out choice
    const isOptedOut = localStorage.getItem("fb_pixel_opt_out") === "true";
    const respectDoNotTrack = navigator.doNotTrack === "1" || (window as any).doNotTrack === "1";
    
    if (isOptedOut || respectDoNotTrack) {
      console.log("Meta Pixel is inactive due to privacy preference (opt-out or Do Not Track)");
      return;
    }

    // Initialize Meta Pixel script on window dynamically if not already loaded
    if (!(window as any).fbq) {
      /* eslint-disable */
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      
      (window as any).fbq('init', pixelId);
    }

    // Track dynamic PageView on route changes
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq('track', 'PageView');
      console.log(`Meta Pixel tracked pageview: ${location.pathname}${location.search}`);
    }
  }, [location]);
}
