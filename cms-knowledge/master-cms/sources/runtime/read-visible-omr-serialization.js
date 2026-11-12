(() => {
  const roots = Array.from(document.querySelectorAll('[data-omr-code]')).filter(e => e.getBoundingClientRect().width > 0);
  if (roots.length !== 1) throw new Error('Expected one visible OMR form root');
  const root = roots[0];
  const code = root.getAttribute('data-omr-code');
  const serializer = window.omrSerializers?.[code];
  if (!serializer || typeof serializer.serialize !== 'function') throw new Error('No serializer for visible form');
  return {code, serialized: serializer.serialize(root)};
})()
