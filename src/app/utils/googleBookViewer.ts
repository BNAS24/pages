// utils/googleBookViewer.ts
export function loadScript(src: string, onLoad: () => void) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onLoad;
    document.body.appendChild(script);
  }
  