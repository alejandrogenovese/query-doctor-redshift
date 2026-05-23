/* global React */
// Lucide icon wrapper shared by every component.
const { useEffect: __useEffectIcon, useRef: __useRefIcon } = React;

function QDIcon({ name, size = 16, color, style }) {
  const ref = __useRefIcon(null);
  __useEffectIcon(() => {
    if (ref.current && window.lucide) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: { width: size, height: size, 'stroke-width': 1.5 },
      });
    }
  }, [name, size]);
  return <span ref={ref} style={{ display: 'inline-flex', color, ...style }} />;
}

window.QDIcon = QDIcon;
