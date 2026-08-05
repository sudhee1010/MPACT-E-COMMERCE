// Toggle `has-value` class on email and password inputs so CSS can switch fonts
(function initEmailPasswordToggle() {
  if (typeof window === 'undefined' || !document) return;

  function bind(el) {
    const update = () => {
      if (el.value && el.value.toString().trim() !== '') el.classList.add('has-value');
      else el.classList.remove('has-value');
    };

    update();
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  }

  function scanAndBind(root = document) {
    const nodes = root.querySelectorAll(
      'input[type="email"], input[name="email"], input[type="password"], input[name="password"]'
    );
    nodes.forEach(bind);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scanAndBind(document));
  } else scanAndBind(document);

  // Observe dynamically added inputs
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches && node.matches('input[type="email"], input[name="email"], input[type="password"], input[name="password"]')) bind(node);
        if (node.querySelectorAll) {
          const nested = node.querySelectorAll('input[type="email"], input[name="email"], input[type="password"], input[name="password"]');
          nested.forEach(bind);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
