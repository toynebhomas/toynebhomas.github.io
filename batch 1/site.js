/* Public site: enlarged view (lightbox) + phone menu. No libraries. */
(function () {
  var menu = document.getElementById('menuButton');
  var sidebar = document.getElementById('sidebar');
  if (menu && sidebar) {
    menu.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var box = document.getElementById('lightbox');
  if (!box) return;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.cell button.open'));
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCaption');
  var film = document.getElementById('lbFilm');
  var prev = document.getElementById('lbPrev');
  var next = document.getElementById('lbNext');
  var index = 0;
  var lastFocus = null;

  function show(i) {
    index = (i + buttons.length) % buttons.length;
    var b = buttons[index];
    img.src = b.getAttribute('data-full');
    img.alt = b.querySelector('img').alt;
    cap.textContent = b.getAttribute('data-caption') || '';
    film.textContent = b.getAttribute('data-film') || '';
    // load the next photo in the background so arrows feel instant
    var n = buttons[(index + 1) % buttons.length];
    if (n) new Image().src = n.getAttribute('data-full');
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    prev.hidden = next.hidden = buttons.length < 2;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }

  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  buttons.forEach(function (b, i) {
    b.addEventListener('click', function () { open(i); });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  prev.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();
