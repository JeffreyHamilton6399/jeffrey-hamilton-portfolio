/* ==========================================================================
   Intro: five simulated collaborators build the header and hero live.

   How it works
   - The inline script in <head> decides, before first paint, whether the
     intro plays (first visit this session, no reduced motion, no #hash) and
     sets html.intro. intro.css hides the parts that get built while keeping
     their layout boxes, so nothing on the finished page ever moves.
   - Every visible change is made to the real DOM: text is split into
     per-character spans that are revealed as they are "typed", and real
     elements are transformed while they are dragged and resized.
   - One clock drives everything. Each cursor runs its own async script
     against that clock, so they overlap like real people do.
   - When the build ends (or Skip is pressed) every touched element gets its
     original markup and style attribute back, so what remains is exactly
     the normal page.

   URL flags for testing: ?intro forces it to play, ?nointro skips it,
   ?introspeed=2 runs the clock at double speed.
   ========================================================================== */

(function () {
  'use strict';

  window.__ibStarted = true;

  var root = document.documentElement;
  var KEY = 'jh-intro-seen';
  var SKIP = { skip: true };
  var params = new URLSearchParams(location.search);
  var SPEED = Math.max(0.1, parseFloat(params.get('introspeed')) || 1);
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  var PEOPLE = [
    { id: 'alex',   name: 'Alex',   role: 'Design',            color: '#E2622B', pace: 1.00 },
    { id: 'sam',    name: 'Sam',    role: 'Development',       color: '#2B6CB0', pace: 0.92 },
    { id: 'jordan', name: 'Jordan', role: 'Content',           color: '#7C4DBF', pace: 1.08 },
    { id: 'taylor', name: 'Taylor', role: 'Layout',            color: '#148A74', pace: 0.96 },
    { id: 'casey',  name: 'Casey',  role: 'Finishing Touches', color: '#D23C83', pace: 1.04 }
  ];

  /* ------------------------------------------------------------ helpers */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [].slice.call((ctx || document).querySelectorAll(sel)); }
  function R(el) { return el.getBoundingClientRect(); }
  function cs(el) { return getComputedStyle(el); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function val(v) { return typeof v === 'function' ? v() : v; }
  function rect(l, t, r, b) { return { left: l, top: t, right: r, bottom: b, width: r - l, height: b - t }; }
  function pad(r, p) { return rect(r.left - p, r.top - p, r.right + p, r.bottom + p); }
  function mk(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  }
  function deferred() {
    var res;
    var p = new Promise(function (r) { res = r; });
    p.resolve = res;
    return p;
  }

  var ease = {
    /* minimum-jerk: how a hand actually accelerates and settles */
    mj: function (p) { return p * p * p * (10 - 15 * p + 6 * p * p); },
    human: function (p) { return ease.mj(Math.pow(p, 0.86)); },
    out: function (p) { return 1 - Math.pow(1 - p, 3); },
    inOut: function (p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
    back: function (p) { var c = 1.5; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }
  };

  /* ------------------------------------------------------------ clock */

  var clock = { t: 0, last: 0, raf: 0 };
  var jobs = [];
  var renderers = [];
  var aborted = false;

  function frame(now) {
    var dt = clock.last ? Math.min(50, now - clock.last) : 16;
    clock.last = now;
    clock.t += dt * SPEED;

    var list = jobs.slice();
    for (var i = 0; i < list.length; i++) {
      var j = list[i];
      if (j.dead) continue;
      var keep;
      try { keep = j.fn(clock.t, dt * SPEED); }
      catch (err) { j.dead = true; j.rej(err); continue; }
      if (keep === false) j.dead = true;
    }
    jobs = jobs.filter(function (j) { return !j.dead; });

    for (var k = 0; k < renderers.length; k++) renderers[k](clock.t, dt);
    clock.raf = requestAnimationFrame(frame);
  }

  function addJob(fn) {
    if (aborted) return Promise.reject(SKIP);
    return new Promise(function (res, rej) {
      jobs.push({ fn: function (t, dt) { return fn(t, dt, res); }, rej: rej });
    });
  }

  /* Run fn(eased, raw) every frame for ms of clock time. */
  function tween(ms, fn, easing) {
    var start = clock.t;
    ms = Math.max(1, ms);
    return addJob(function (t, dt, res) {
      var p = clamp((t - start) / ms, 0, 1);
      if (fn) fn(easing ? easing(p) : p, p);
      if (p >= 1) { res(); return false; }
    });
  }
  function wait(ms) { return tween(ms, null); }

  function abortAll() {
    if (aborted) return;
    aborted = true;
    var list = jobs; jobs = [];
    list.forEach(function (j) { j.rej(SKIP); });
  }

  /* ------------------------------------------------------------ overlay */

  var layer, grid;
  var overlays = [];

  function Box(color, o) {
    o = o || {};
    this.el = mk('div', 'ib-box' + (o.cls ? ' ' + o.cls : ''));
    this.el.style.setProperty('--c', color);
    this.tag = mk('span', 'ib-tag');
    this.dim = mk('span', 'ib-dim');
    if (o.tag) this.tag.textContent = o.tag; else this.tag.style.display = 'none';
    this.el.appendChild(this.tag);
    this.el.appendChild(this.dim);
    this.setHandles(o.handles || []);
    this.fn = null;
    this.dimFn = null;
    layer.appendChild(this.el);
    overlays.push(this);
  }
  Box.prototype.setHandles = function (list) {
    $$('.ib-handle', this.el).forEach(function (h) { h.remove(); });
    var el = this.el;
    list.forEach(function (h) { el.appendChild(mk('i', 'ib-handle ' + h)); });
    return this;
  };
  Box.prototype.setTag = function (text) {
    this.tag.textContent = text;
    this.tag.style.display = text ? '' : 'none';
    return this;
  };
  Box.prototype.show = function (fn) {
    if (fn) this.fn = fn;
    this.render();
    this.el.classList.add('on');
    return this;
  };
  Box.prototype.hide = function () {
    this.el.classList.remove('on');
    this.dimFn = null;
    this.dim.textContent = '';
    return this;
  };
  Box.prototype.render = function () {
    if (!this.fn) return;
    var r = this.fn();
    if (!r) return;
    var s = this.el.style;
    s.transform = 'translate3d(' + r.left.toFixed(1) + 'px,' + r.top.toFixed(1) + 'px,0)';
    s.width = Math.max(2, r.width).toFixed(1) + 'px';
    s.height = Math.max(2, r.height).toFixed(1) + 'px';
    if (this.dimFn) this.dim.textContent = this.dimFn(r);
  };

  function Guide(color) {
    this.el = mk('div', 'ib-guide');
    this.el.style.setProperty('--c', color);
    layer.appendChild(this.el);
    this.fn = null;
    overlays.push(this);
  }
  /* fn returns {x1,y1,x2,y2}, one axis held constant */
  Guide.prototype.show = function (fn) { this.fn = fn; this.render(); this.el.classList.add('on'); return this; };
  Guide.prototype.hide = function () { this.el.classList.remove('on'); return this; };
  Guide.prototype.render = function () {
    if (!this.fn) return;
    var g = this.fn();
    var s = this.el.style;
    s.transform = 'translate3d(' + Math.min(g.x1, g.x2) + 'px,' + Math.min(g.y1, g.y2) + 'px,0)';
    s.width = Math.max(1, Math.abs(g.x2 - g.x1)) + 'px';
    s.height = Math.max(1, Math.abs(g.y2 - g.y1)) + 'px';
  };

  function Measure(color) {
    this.el = mk('div', 'ib-measure');
    this.el.style.setProperty('--c', color);
    this.line = mk('i', 'ib-mline');
    this.capA = mk('i', 'ib-mline');
    this.capB = mk('i', 'ib-mline');
    this.label = mk('span', 'ib-mlabel');
    [this.line, this.capA, this.capB, this.label].forEach(function (n) { this.el.appendChild(n); }, this);
    layer.appendChild(this.el);
    this.fn = null;
    overlays.push(this);
  }
  /* fn returns {x1,y1,x2,y2}: a vertical (x1 == x2) or horizontal gap */
  Measure.prototype.show = function (fn) { this.fn = fn; this.render(); this.el.classList.add('on'); return this; };
  Measure.prototype.hide = function () { this.el.classList.remove('on'); return this; };
  Measure.prototype.render = function () {
    if (!this.fn) return;
    var m = this.fn();
    var vertical = Math.abs(m.x2 - m.x1) < Math.abs(m.y2 - m.y1);
    var len = vertical ? m.y2 - m.y1 : m.x2 - m.x1;
    function place(n, x, y, w, h) {
      n.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      n.style.width = w + 'px';
      n.style.height = h + 'px';
    }
    if (vertical) {
      place(this.line, m.x1, m.y1, 1, Math.max(1, len));
      place(this.capA, m.x1 - 4, m.y1, 9, 1);
      place(this.capB, m.x1 - 4, m.y2 - 1, 9, 1);
      this.label.style.transform = 'translate3d(' + (m.x1 + 7) + 'px,' + (m.y1 + len / 2 - 8) + 'px,0)';
    } else {
      place(this.line, m.x1, m.y1, Math.max(1, len), 1);
      place(this.capA, m.x1, m.y1 - 4, 1, 9);
      place(this.capB, m.x2 - 1, m.y1 - 4, 1, 9);
      this.label.style.transform = 'translate3d(' + (m.x1 + len / 2 - 9) + 'px,' + (m.y1 - 22) + 'px,0)';
    }
    this.label.textContent = Math.round(Math.abs(len));
  };

  function Caret(color) {
    this.el = mk('div', 'ib-caret');
    this.el.style.setProperty('--c', color);
    layer.appendChild(this.el);
    this.fn = null;
    overlays.push(this);
  }
  Caret.prototype.show = function (fn) { this.fn = fn; this.render(); this.el.classList.add('on'); this.solid(); return this; };
  Caret.prototype.hide = function () { this.el.classList.remove('on', 'blink'); this.fn = null; return this; };
  Caret.prototype.blink = function () { this.el.classList.add('blink'); return this; };
  Caret.prototype.solid = function () { this.el.classList.remove('blink'); return this; };
  Caret.prototype.render = function () {
    if (!this.fn) return;
    var c = this.fn();
    this.el.style.transform = 'translate3d(' + (c.x - 1).toFixed(1) + 'px,' + c.y.toFixed(1) + 'px,0)';
    this.el.style.height = c.h.toFixed(1) + 'px';
  };

  /* A small floating property panel. opts: [{html, on}] */
  function Panel(color, label, opts) {
    this.el = mk('div', 'ib-panel');
    this.el.style.setProperty('--c', color);
    this.el.appendChild(mk('span', 'ib-plabel', label));
    this.opts = opts.map(function (o) {
      var n = mk('span', 'ib-opt' + (o.on ? ' on' : ''), o.html);
      this.el.appendChild(n);
      return n;
    }, this);
    layer.appendChild(this.el);
    this.fn = null;
    overlays.push(this);
  }
  Panel.prototype.show = function (fn) { this.fn = fn; this.render(); this.el.classList.add('on'); return this; };
  Panel.prototype.hide = function () { this.el.classList.remove('on'); return this; };
  Panel.prototype.render = function () {
    if (!this.fn) return;
    var p = this.fn(this.el.offsetWidth, this.el.offsetHeight);
    this.el.style.transform = 'translate3d(' + p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px,0)';
  };
  Panel.prototype.pick = function (i) {
    this.opts.forEach(function (o, k) { o.classList.toggle('on', k === i); });
  };
  Panel.prototype.center = function (i) {
    var o = this.opts[i];
    return function () { var r = R(o); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  };

  function ripple(x, y, color) {
    var r = mk('div', 'ib-ripple');
    r.style.setProperty('--c', color);
    r.style.setProperty('--at', 'translate3d(' + x + 'px,' + y + 'px,0)');
    r.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    layer.appendChild(r);
    setTimeout(function () { r.remove(); }, 520);
  }

  /* ------------------------------------------------------------ cursors */

  var SHAPES = {
    arrow:  { x: 3,  y: 2 },
    text:   { x: 10, y: 10 },
    resize: { x: 10, y: 10 },
    ew:     { x: 10, y: 10 }
  };

  var CURSOR_SVG =
    '<svg viewBox="0 0 20 20" aria-hidden="true">' +
      '<g class="ib-shape ib-shape-arrow"><path d="M3 2 L3 16.6 L6.9 12.9 L9.5 18.6 L12.2 17.4 L9.6 11.8 L15.1 11.6 Z" style="fill:var(--c)" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></g>' +
      '<g class="ib-shape ib-shape-text" fill="none" stroke-linecap="round"><path d="M7.2 3.5h5.6M10 3.5v13M7.2 16.5h5.6" stroke="#fff" stroke-width="4"/><path d="M7.2 3.5h5.6M10 3.5v13M7.2 16.5h5.6" style="stroke:var(--c)" stroke-width="1.7"/></g>' +
      '<g class="ib-shape ib-shape-resize" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5L15 15M5 5v4.5M5 5h4.5M15 15v-4.5M15 15h-4.5" stroke="#fff" stroke-width="4"/><path d="M5 5L15 15M5 5v4.5M5 5h4.5M15 15v-4.5M15 15h-4.5" style="stroke:var(--c)" stroke-width="1.7"/></g>' +
      '<g class="ib-shape ib-shape-ew" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h14M3 10l3.5-3.5M3 10l3.5 3.5M17 10l-3.5-3.5M17 10l-3.5 3.5" stroke="#fff" stroke-width="4"/><path d="M3 10h14M3 10l3.5-3.5M3 10l3.5 3.5M17 10l-3.5-3.5M17 10l-3.5 3.5" style="stroke:var(--c)" stroke-width="1.7"/></g>' +
    '</svg>';

  var cursors = [];

  function Cursor(p, narrow, start) {
    this.p = p;
    this.color = p.color;
    this.pace = p.pace;
    this.x = start.x;
    this.y = start.y;
    this.sepX = 0; this.sepY = 0;
    this.drift = 0;
    this.phase = Math.random() * 1000;
    this.busy = false;
    this.down = false;
    this.el = mk('div', 'ib-cursor');
    this.el.style.setProperty('--c', p.color);
    this.el.innerHTML = CURSOR_SVG +
      '<span class="ib-name">' + p.name + (narrow ? '' : ' <small>&middot; ' + p.role + '</small>') + '</span>';
    this.svg = this.el.firstChild;
    this.svg.style.position = 'absolute';
    this.setShape('arrow');
    layer.appendChild(this.el);
    cursors.push(this);
  }

  Cursor.prototype.setShape = function (name) {
    var hs = SHAPES[name] || SHAPES.arrow;
    this.el.setAttribute('data-shape', name);
    this.svg.style.left = -hs.x + 'px';
    this.svg.style.top = -hs.y + 'px';
    this.svg.style.transformOrigin = hs.x + 'px ' + hs.y + 'px';
  };

  Cursor.prototype.setDown = function (d) {
    this.down = d;
    this.el.classList.toggle('down', d);
  };

  /* Fold any visual nudge into the real position before acting */
  Cursor.prototype.settle = function () {
    this.x += this.sepX; this.y += this.sepY;
    this.sepX = this.sepY = 0;
  };

  Cursor.prototype.render = function (t) {
    var target = this.busy || this.down ? 0 : 1;
    this.drift += (target - this.drift) * 0.06;
    var dx = (Math.sin(t * 0.0011 + this.phase) + Math.sin(t * 0.0023 + this.phase * 2) * 0.5) * 1.3 * this.drift;
    var dy = (Math.cos(t * 0.0013 + this.phase) + Math.sin(t * 0.0019 + this.phase * 3) * 0.5) * 1.1 * this.drift;
    this.el.style.transform = 'translate3d(' + (this.x + this.sepX + dx).toFixed(2) + 'px,' +
                                               (this.y + this.sepY + dy).toFixed(2) + 'px,0)';
  };

  /* Move to a point (or a function returning one, so the target can move
     while we travel). Curved path, minimum-jerk speed profile, and on long
     moves a small overshoot followed by a correction, like a real hand. */
  Cursor.prototype.moveTo = function (target, o) {
    o = o || {};
    var c = this;
    c.settle();
    c.busy = true;
    var sx = c.x, sy = c.y;
    var p0 = val(target);
    var d = Math.hypot(p0.x - sx, p0.y - sy);
    if (d < 0.5) {
      if (o.shape) c.setShape(o.shape);
      if (!o.keepBusy) c.busy = false;
      return Promise.resolve();
    }
    var dur = o.dur || (170 + 108 * Math.log2(1 + d / 14)) * c.pace * (o.slow || 1);
    var bend = o.straight ? 0 : (o.curve != null ? o.curve : rand(0.05, 0.15) * (Math.random() < 0.5 ? -1 : 1));
    var over = (!o.exact && d > 180) ? rand(0.012, 0.03) * Math.min(d, 700) : 0;

    return tween(dur, function (e) {
      var t = val(target);
      var vx = t.x - sx, vy = t.y - sy, vd = Math.hypot(vx, vy) || 1;
      var ex = t.x + vx / vd * over, ey = t.y + vy / vd * over;
      var mx = (sx + ex) / 2 - vy * bend, my = (sy + ey) / 2 + vx * bend;
      var u = 1 - e;
      c.x = u * u * sx + 2 * u * e * mx + e * e * ex;
      c.y = u * u * sy + 2 * u * e * my + e * e * ey;
      if (o.onFrame) o.onFrame(c.x, c.y, e);
    }, ease.human).then(function () {
      if (over) return c.moveTo(target, { exact: true, straight: true, dur: rand(110, 170), onFrame: o.onFrame, keepBusy: true });
    }).then(function () {
      if (o.shape) c.setShape(o.shape);
      if (!o.keepBusy) c.busy = false;
    });
  };

  Cursor.prototype.click = function () {
    var c = this;
    c.settle();
    c.busy = true;
    return wait(rand(70, 150) * c.pace).then(function () {
      c.setDown(true);
      ripple(c.x, c.y, c.color);
      return wait(90);
    }).then(function () {
      c.setDown(false);
      c.busy = false;
    });
  };

  Cursor.prototype.press = function () {
    var c = this;
    c.settle();
    c.busy = true;
    return wait(rand(70, 140) * c.pace).then(function () { c.setDown(true); return wait(60); });
  };

  Cursor.prototype.release = function () {
    var c = this;
    c.setDown(false);
    return wait(rand(50, 90)).then(function () { c.busy = false; });
  };

  /* Drag along a path the caller computes: fn(eased, raw) -> {x, y} */
  Cursor.prototype.drag = function (ms, fn, easing) {
    var c = this;
    c.busy = true;
    return tween(ms * c.pace, function (e, p) {
      var pt = fn(e, p);
      c.x = pt.x; c.y = pt.y;
    }, easing || ease.human);
  };

  /* Idle cursors drift apart instead of stacking on top of each other */
  function separate() {
    for (var i = 0; i < cursors.length; i++) {
      var a = cursors[i];
      var tx = 0, ty = 0;
      if (!a.busy && !a.down) {
        for (var j = 0; j < cursors.length; j++) {
          if (i === j) continue;
          var b = cursors[j];
          var vx = (a.x + a.sepX) - (b.x + b.sepX), vy = (a.y + a.sepY) - (b.y + b.sepY);
          var d = Math.hypot(vx, vy);
          if (d < 44) {
            var push = (44 - d) / 44 * 26;
            if (d < 0.5) { vx = 1; vy = 0.4; d = 1.08; }
            tx += vx / d * push; ty += vy / d * push;
          }
        }
      }
      a.sepX += (tx - a.sepX) * 0.08;
      a.sepY += (ty - a.sepY) * 0.08;
    }
  }

  /* ------------------------------------------------------------ text */

  /* Wrap an element's content in one inline run and split every text node
     into per-character spans. Layout is unchanged: the spans are inline and
     whitespace is collapsed the same way the browser already collapses it. */
  function splitText(el) {
    var items = [];
    var run = mk('span', 'ib-run');
    while (el.firstChild) run.appendChild(el.firstChild);
    el.appendChild(run);

    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var txt = n.nodeValue.replace(/\s+/g, ' ');
          var frag = document.createDocumentFragment();
          Array.from(txt).forEach(function (ch) {
            var s = mk('span', 'ib-ch');
            s.textContent = ch;
            frag.appendChild(s);
            items.push({ el: s, ch: ch });
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeName === 'BR') {
          items.push({ el: n, br: true });
        } else if (n.nodeType === 1) {
          walk(n);
        }
      });
    })(run);

    while (items.length && items[0].ch === ' ') items.shift().el.remove();
    while (items.length && items[items.length - 1].ch === ' ') items.pop().el.remove();
    // collapse doubled spaces left by separate text nodes
    for (var i = items.length - 1; i > 0; i--) {
      if (items[i].ch === ' ' && items[i - 1].ch === ' ') { items[i].el.remove(); items.splice(i, 1); }
    }
    return { el: el, items: items, n: 0, typo: null };
  }

  function lineHeightPx(el) {
    var s = cs(el);
    return parseFloat(s.fontSize) * 1.15;
  }

  function caretPos(T) {
    if (T.typo && T.typo.textContent) {
      var tr = R(T.typo);
      return { x: tr.right, y: tr.top, h: tr.height };
    }
    var items = T.items, n = T.n;
    var last = n > 0 ? items[n - 1] : null;
    var next = items[n];
    var r;
    if (last && !last.br) {
      r = R(last.el);
      if (last.ch === ' ' && next && !next.br) {
        var nr = R(next.el);
        if (nr.top > r.top + r.height * 0.5) return { x: nr.left, y: nr.top, h: nr.height };
      }
      return { x: r.right, y: r.top, h: r.height };
    }
    if (next && !next.br) { r = R(next.el); return { x: r.left, y: r.top, h: r.height }; }
    for (var k = n; k < items.length; k++) {
      if (!items[k].br) { r = R(items[k].el); return { x: r.left, y: r.top, h: r.height }; }
    }
    r = R(T.el);
    return { x: r.left, y: r.top, h: lineHeightPx(T.el) };
  }

  /* The box around what has been typed so far */
  function textRect(T, upto) {
    var n = upto == null ? T.n : upto;
    var l = 1e9, t = 1e9, r = -1e9, b = -1e9, any = false;
    function add(x) {
      if (!x.width && !x.height) return;
      any = true;
      if (x.left < l) l = x.left; if (x.top < t) t = x.top;
      if (x.right > r) r = x.right; if (x.bottom > b) b = x.bottom;
    }
    var real = [];
    for (var i = 0; i < n; i++) if (!T.items[i].br) real.push(T.items[i]);
    if (real.length <= 48) {
      real.forEach(function (it) { add(R(it.el)); });
    } else {
      var f = R(real[0].el), z = R(real[real.length - 1].el);
      add(f); add(z);
      if (z.top > f.top + 2) { var er = R(T.el); l = Math.min(l, er.left); r = Math.max(r, er.right); }
    }
    if (T.typo && T.typo.textContent) add(R(T.typo));
    var c = caretPos(T);
    if (!any) return rect(c.x, c.y, c.x + 28, c.y + c.h);
    return rect(l, t, Math.max(r, c.x + 2), Math.max(b, c.y + c.h));
  }

  /* Type T out character by character. Several characters can land in one
     frame, so fast typing isn't capped at the frame rate. */
  function type(T, o) {
    o = o || {};
    var base = o.base || 60;
    var queue = [];
    for (var i = 0; i < T.items.length; i++) {
      if (o.typo && o.typo.at === i) {
        Array.from(o.typo.wrong).forEach(function (ch) { queue.push({ k: 'typo', ch: ch }); });
        queue.push({ k: 'pause', ms: rand(240, 340) });
        Array.from(o.typo.wrong).forEach(function () { queue.push({ k: 'back' }); });
        queue.push({ k: 'pause', ms: 110 });
      }
      queue.push({ k: 'char', i: i });
    }

    var nextAt = clock.t;
    var prev = '';
    function delay(ch) {
      var d = base * rand(0.55, 1.45);
      if (ch === ' ') d *= 1.35;
      if (/[.,!?]/.test(prev)) d += base * rand(2.5, 4.5);
      if (Math.random() < 0.035) d += rand(110, 240);
      return d;
    }

    return addJob(function (t, dt, res) {
      while (t >= nextAt) {
        var q = queue.shift();
        if (!q) { res(); return false; }
        if (q.k === 'char') {
          var it = T.items[q.i];
          if (!it.br) it.el.classList.add('on');
          T.n = q.i + 1;
          nextAt += it.br ? base * rand(2.5, 3.5) : delay(it.ch);
          prev = it.ch || '';
        } else if (q.k === 'typo') {
          if (!T.typo) {
            T.typo = mk('span', 'ib-typo');
            var ref = T.items[T.n];
            ref.el.parentNode.insertBefore(T.typo, ref.el);
          }
          T.typo.textContent += q.ch;
          nextAt += delay(q.ch);
        } else if (q.k === 'back') {
          T.typo.textContent = T.typo.textContent.slice(0, -1);
          if (!T.typo.textContent) { T.typo.remove(); T.typo = null; }
          nextAt += base * rand(1.4, 2);
        } else {
          nextAt += q.ms;
        }
        if (o.onChar) o.onChar(T);
      }
    });
  }

  /* ------------------------------------------------------------ the page */

  var E, T, N, touched, signals, narrow;

  function touch(el, html) {
    for (var i = 0; i < touched.length; i++) if (touched[i].el === el) return;
    touched.push({ el: el, style: el.getAttribute('style'), html: html ? el.innerHTML : null });
  }

  function setStyle(el, prop, v) { el.style.setProperty(prop, v); }

  function inView(el, margin) {
    var r = R(el);
    return r.top >= 0 && r.bottom <= innerHeight - (margin || 8) && r.width > 0;
  }
  function topInView(el) {
    var r = R(el);
    return r.top < innerHeight - 40 && r.width > 0;
  }

  function prepare() {
    E = {
      bubble: $('.bubble'),
      wordmark: $('.wordmark'),
      nav: $('.nav'),
      links: $$('.nav a'),
      copy: $('.hero-copy'),
      title: $('.hero-title'),
      role: $('.hero-role'),
      lede: $('.lede'),
      actions: $('.hero-actions'),
      btns: $$('.hero-actions .btn'),
      meta: $('.hero-meta'),
      metaItems: $$('.hero-meta li'),
      portrait: $('.hero-portrait'),
      grid: $('.hero-grid')
    };
    for (var k in E) {
      if (!E[k] || (Array.isArray(E[k]) && !E[k].length)) throw new Error('intro: missing ' + k);
    }

    touched = [];
    narrow = innerWidth < 620;

    /* Final values, read before anything is changed */
    var bs = cs(E.btns[0]);
    N = {
      titleSize: parseFloat(cs(E.title).fontSize),
      roleMargin: parseFloat(cs(E.role).marginTop),
      gap: parseFloat(cs(E.actions).columnGap) || 14,
      ledeMax: Math.min(parseFloat(cs(E.lede).maxWidth) || 1e4, E.lede.offsetWidth || 1e4),
      btnPad: [parseFloat(bs.paddingTop), parseFloat(bs.paddingRight)],
      column: cs(E.bubble).flexDirection === 'column'
    };

    [E.wordmark, E.title, E.role, E.lede].concat(E.links, E.btns, E.metaItems)
      .forEach(function (el) { touch(el, true); });
    [E.bubble, E.nav, E.actions, E.meta, E.portrait, E.copy].forEach(function (el) { touch(el); });
    E.copy.children && [].forEach.call(E.copy.children, function (el) { touch(el); });

    T = {
      word: splitText(E.wordmark),
      links: E.links.map(splitText),
      title: splitText(E.title),
      role: splitText(E.role),
      lede: splitText(E.lede),
      btns: E.btns.map(splitText),
      meta: E.metaItems.map(splitText)
    };

    /* Starting states: what each element looks like before someone fixes it */
    N.navOffset = N.column ? 26 : 74;
    setStyle(E.nav, 'transform', 'translateX(' + -N.navOffset + 'px)');
    setStyle(E.wordmark, 'display', 'inline-block');
    setStyle(E.wordmark, 'transform', 'translateX(5px)');

    N.title = { tx: narrow ? 8 : 16, ty: 10, s: 0.56 };
    applyTitle();

    N.ledeStart = Math.round(N.ledeMax * 0.72);
    setStyle(E.lede, 'max-width', N.ledeStart + 'px');

    var small = [Math.round(N.btnPad[0] * 0.62), Math.round(N.btnPad[1] * 0.55)];
    N.btnSmall = small;
    E.btns.forEach(function (b, i) {
      b.classList.add('ib-raw');
      if (i === 0) setStyle(b, 'padding', small[0] + 'px ' + small[1] + 'px');
    });

    if (!narrow) {
      // Casey's fixes: a gap that's too big, a gap that's too small, a row that's centred
      setStyle(E.role, 'margin-top', (N.roleMargin + 20) + 'px');
      setStyle(E.actions, 'gap', '5px');
      setStyle(E.meta, 'justify-content', 'center');
    }

    signals = {
      titleDone: deferred(),
      roleMade: deferred(),
      buttonsDone: deferred()
    };
  }

  function applyTitle() {
    var t = N.title;
    E.title.style.transform = 'translate(' + t.tx.toFixed(2) + 'px,' + t.ty.toFixed(2) + 'px) scale(' + t.s.toFixed(4) + ')';
  }

  /* Where an element sits in the layout, ignoring its transform */
  function layoutRect(el) {
    var op = el.offsetParent;
    var o = op ? R(op) : { left: 0, top: 0 };
    var l = o.left + el.offsetLeft + (op ? op.clientLeft : 0);
    var t = o.top + el.offsetTop + (op ? op.clientTop : 0);
    return rect(l, t, l + el.offsetWidth, t + el.offsetHeight);
  }

  function on(el) { el.classList.add('ib-on'); }

  /* A text element being written: click, caret, type, done */
  async function writeText(c, T, o) {
    o = o || {};
    var start = caretPos(T);
    await c.moveTo({ x: start.x + 2, y: start.y + start.h * 0.55 }, { shape: 'text' });
    await c.click();
    on(T.el);
    if (o.onCreate) o.onCreate();
    var box = new Box(c.color, { tag: o.tag, cls: 'soft' }).show(function () { return pad(textRect(T), 4); });
    var caret = new Caret(c.color).show(function () { return caretPos(T); });
    await wait(rand(120, 220));
    // hand comes off the mouse to type
    var away = { x: c.x + rand(18, 46) * (Math.random() < 0.3 ? -1 : 1), y: c.y + rand(26, 48) };
    c.moveTo(away, { slow: 1.6, exact: true, shape: 'arrow' }).catch(function () {});
    await type(T, { base: o.base, typo: o.typo, onChar: o.onChar });
    caret.blink();
    await wait(rand(260, 420));
    caret.hide();
    if (o.keepBox) return box;
    box.hide();
    return null;
  }

  /* Draw a frame with a marquee drag; the element is revealed under it */
  async function drawFrame(c, el, o) {
    o = o || {};
    var r0 = layoutRect(el);
    await c.moveTo({ x: r0.left + 1, y: r0.top + 1 }, { exact: o.exact });
    await c.press();
    var box = new Box(c.color, { cls: 'marquee' });
    var rad = o.radius || '0';
    on(el);
    el.style.clipPath = 'inset(0 100% 100% 0 round ' + rad + ')';
    var x0 = r0.left, y0 = r0.top;
    box.show(function () { return rect(x0, y0, Math.max(x0 + 1, c.x), Math.max(y0 + 1, c.y)); });
    await c.drag(o.dur || 620, function (e, p) {
      var r = layoutRect(el);
      var x = lerp(x0, r.right, e);
      var y = lerp(y0, r.bottom, ease.out(clamp(p * 1.6, 0, 1)));
      el.style.clipPath = 'inset(0 ' + Math.max(0, r.right - x).toFixed(1) + 'px ' +
                          Math.max(0, r.bottom - y).toFixed(1) + 'px 0 round ' + rad + ')';
      return { x: x, y: y };
    });
    el.style.clipPath = '';
    await c.release();
    box.el.classList.remove('marquee');
    box.setHandles(['tl', 'tr', 'bl', 'br']).setTag(o.tag || '');
    box.show(function () { return R(el); });
    return box;
  }

  /* ------------------------------------------------------------ scripts */

  /* Alex: the navigation bar, then the portrait */
  async function alex(c) {
    await wait(250);
    var frame = await drawFrame(c, E.bubble, { tag: 'Nav · Frame', radius: '999px', dur: 760 });
    await wait(240);
    frame.hide();

    await writeText(c, T.word, { base: 62, tag: 'Logo' });

    for (var i = 0; i < T.links.length; i++) {
      await writeText(c, T.links[i], { base: 58 });
      await wait(rand(60, 140));
    }
    on(E.nav);

    // the links group is too far left: drag it over until it snaps
    var sel = new Box(c.color, { tag: 'Links', handles: ['tl', 'tr', 'bl', 'br'] });
    await c.moveTo(function () { var r = R(E.nav); return { x: r.left + r.width * 0.42, y: r.top + r.height * 0.55 }; });
    await c.click();
    sel.show(function () { return R(E.nav); });
    await wait(160);
    await c.press();
    var guide = new Guide(c.color);
    var gx = function () {
      var b = R(E.bubble);
      if (N.column) return b.left + b.width / 2;
      return b.right - parseFloat(cs(E.bubble).paddingRight);
    };
    var off = N.navOffset;
    var grabX = c.x, grabY = c.y;
    await c.drag(640, function (e) {
      var cur = off * (1 - e) + (e > 0.86 ? 0 : 4 * Math.sin(e * Math.PI)); // a little wobble before it lands
      if (e > 0.86) cur = 0;
      E.nav.style.transform = 'translateX(' + (-cur).toFixed(2) + 'px)';
      return { x: grabX + (off - cur), y: grabY + Math.sin(e * Math.PI) * 1.5 };
    });
    E.nav.style.transform = 'translateX(0px)';
    guide.show(function () { var b = R(E.bubble); var x = gx(); return { x1: x, y1: b.top - 10, x2: x, y2: b.bottom + 10 }; });
    await wait(260);
    await c.release();
    guide.hide();
    sel.hide();

    // and the logo is 5px off: nudge it with the arrow keys
    await c.moveTo(function () { var r = R(E.wordmark); return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.6 }; });
    await c.click();
    var wsel = new Box(c.color, { tag: 'Logo', handles: ['tl', 'tr', 'bl', 'br'] }).show(function () { return R(E.wordmark); });
    for (var n = 4; n >= 0; n -= 2) {
      await wait(rand(110, 170));
      E.wordmark.style.transform = 'translateX(' + Math.max(0, n - 1) + 'px)';
      wsel.dim.textContent = 'X −' + (5 - Math.max(0, n - 1));
    }
    E.wordmark.style.transform = 'translateX(0px)';
    await wait(240);
    wsel.hide();

    if (!narrow && topInView(E.portrait) && R(E.portrait).bottom < innerHeight + 200) {
      await placePortrait(c);
    }
  }

  async function placePortrait(c) {
    var P = E.portrait;
    var fx = 0.3, fy = 0.26;          // where on the image the cursor holds it
    var s0 = 0.3, s1 = 0.8;
    function place(x, y, s) {
      var nat = layoutRect(P);
      var tx = x - nat.width * s * fx - nat.left;
      var ty = y - nat.height * s * fy - nat.top;
      P.style.transform = 'translate(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px) scale(' + s.toFixed(4) + ')';
    }
    var startY = clamp(layoutRect(P).top + 120, 60, innerHeight - 120);

    // reach outside the window for the file...
    await c.moveTo({ x: innerWidth + 40, y: startY }, { exact: true });
    await wait(200);
    on(P);
    place(c.x, c.y, s0);
    await c.press();

    // ...and drag it in, growing as it lands
    var drop = function () {
      var nat = layoutRect(P);
      return { x: nat.left + nat.width * s1 * fx + 7, y: nat.top + nat.height * s1 * fy + 5 };
    };
    var sx = c.x;
    await c.moveTo(drop, {
      exact: true, curve: -0.12, slow: 1.25,
      onFrame: function (x, y) {
        var d = drop();
        var k = clamp(1 - (x - d.x) / Math.max(1, sx - d.x), 0, 1);
        place(x, y, lerp(s0, s1, ease.out(k)));
      }
    });

    // snap to the column edges
    var gV = new Guide(c.color), gH = new Guide(c.color);
    var target = drop();
    c.x = target.x - 7; c.y = target.y - 5;
    place(c.x, c.y, s1);
    gV.show(function () { var n = layoutRect(P); var g = R(E.grid); return { x1: n.left, y1: g.top - 20, x2: n.left, y2: g.bottom + 20 }; });
    gH.show(function () { var n = layoutRect(P); return { x1: n.left - 40, y1: n.top, x2: innerWidth, y2: n.top }; });
    await wait(300);
    await c.release();
    gV.hide(); gH.hide();

    // grab the corner and size it up to fill the column
    var box = new Box(c.color, { tag: 'Portrait · Image', handles: ['tl', 'tr', 'bl', 'br'] })
      .show(function () { return R(P); });
    box.dimFn = function (r) { return Math.round(r.width) + ' × ' + Math.round(r.height); };
    await c.moveTo(function () { var r = R(P); return { x: r.right, y: r.bottom }; }, { shape: 'resize' });
    await c.press();
    var scale = s1;
    function setScale(s) {
      scale = s;
      P.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    setScale(s1);
    await c.drag(720, function (e) {
      setScale(lerp(s1, 1, e));
      var r = R(P);
      return { x: r.right, y: r.bottom };
    }, ease.back);
    setScale(1);
    await c.release();
    c.setShape('arrow');
    await wait(220);
    box.hide();
    P.style.transform = '';
  }

  /* Sam: the headline */
  async function sam(c) {
    await wait(520);
    var box = await writeText(c, T.title, { base: 88, tag: 'H1', keepBox: true });
    var full = function () { return pad(textRect(T.title, T.title.items.length), 4); };
    box.el.classList.remove('soft');
    box.show(full).setHandles(['tl', 'tr', 'bl', 'br']);
    box.dimFn = function () { return Math.round(N.titleSize * N.title.s) + 'px'; };
    box.setTag('H1 · Heading');
    await wait(180);

    // drag the corner handle to scale the type up
    await c.moveTo(function () { var r = full(); return { x: r.right, y: r.bottom }; }, { shape: 'resize' });
    await c.press();
    var s0 = N.title.s;
    await c.drag(860, function (e) {
      N.title.s = lerp(s0, 1, e);
      applyTitle();
      var r = full();
      return { x: r.right, y: r.bottom };
    }, ease.back);
    N.title.s = 1; applyTitle();
    await c.release();
    c.setShape('arrow');
    await wait(160);

    // then move it onto the column edge
    var guide = new Guide(c.color);
    await c.moveTo(function () { var r = full(); return { x: r.left + r.width * 0.36, y: r.top + r.height * 0.4 }; });
    await c.press();
    var t0 = { x: N.title.tx, y: N.title.ty };
    var gx0 = c.x, gy0 = c.y;
    await c.drag(560, function (e) {
      var k = e > 0.84 ? 1 : e;
      N.title.tx = t0.x * (1 - k);
      N.title.ty = t0.y * (1 - k);
      applyTitle();
      return { x: gx0 - (t0.x - N.title.tx), y: gy0 - (t0.y - N.title.ty) };
    });
    N.title.tx = 0; N.title.ty = 0; applyTitle();
    guide.show(function () { var x = R(E.copy).left; var r = full(); return { x1: x, y1: r.top - 24, x2: x, y2: Math.min(innerHeight, R(E.copy).bottom) }; });
    await wait(280);
    await c.release();
    guide.hide();
    box.dimFn = null; box.dim.textContent = '';
    await wait(120);

    // click away to deselect
    await c.moveTo(function () { var r = full(); return { x: Math.min(innerWidth - 40, r.right + rand(40, 90)), y: r.top + r.height * 0.3 }; });
    await c.click();
    box.hide();
    E.title.style.transform = '';
    signals.titleDone.resolve();

    if (narrow) await buildMeta(c);
  }

  /* Jordan: the positioning line and the intro paragraph */
  async function jordan(c) {
    await wait(1050);
    await writeText(c, T.role, {
      base: 34, tag: 'Text',
      onCreate: function () { signals.roleMade.resolve(); }
    });

    if (!topInView(E.lede)) return;

    var txt = T.lede.items.map(function (i) { return i.ch || ''; }).join('');
    var at = txt.indexOf('wanted');
    var box = await writeText(c, T.lede, {
      base: 12, tag: 'Text', keepBox: true,
      typo: at > 0 ? { at: at + 1, wrong: 'na' } : null
    });

    // the paragraph is too narrow: pull the right edge out
    box.el.classList.remove('soft');
    box.setHandles(['ml', 'mr']).setTag('Paragraph');
    box.show(function () { return R(E.lede); });
    box.dimFn = function (r) { return 'W ' + Math.round(r.width); };
    await wait(200);
    await c.moveTo(function () { var r = R(E.lede); return { x: r.right, y: r.top + r.height / 2 }; }, { shape: 'ew' });
    await c.press();
    var w0 = N.ledeStart, w1 = N.ledeMax;
    var over = Math.min(26, innerWidth - R(E.lede).left - w1 - 12);
    await c.drag(720, function (e) {
      E.lede.style.maxWidth = lerp(w0, w1 + Math.max(0, over), e).toFixed(1) + 'px';
      var r = R(E.lede);
      return { x: r.right, y: c.y };
    });
    await c.release();
    await wait(200);
    // a second look: a touch too wide, bring it back in
    await c.press();
    var wNow = parseFloat(E.lede.style.maxWidth);
    await c.drag(300, function (e) {
      E.lede.style.maxWidth = lerp(wNow, w1, e).toFixed(1) + 'px';
      var r = R(E.lede);
      return { x: r.right, y: c.y };
    });
    E.lede.style.maxWidth = w1 + 'px';
    await c.release();
    c.setShape('arrow');
    await wait(200);
    box.hide();
  }

  /* Taylor: the two buttons */
  async function taylor(c) {
    await wait(1700);
    try {
      if (!inView(E.btns[0], 4)) return;
      var b1 = E.btns[0], b2 = E.btns[1];

      // button one: draw it, label it, fill it, size it
      on(E.actions);
      var frame = await drawFrame(c, b1, { tag: 'Button', dur: 460 });
      await wait(140);
      frame.hide();
      await writeText(c, T.btns[0], { base: 64 });

      var sel = new Box(c.color, { tag: 'Button', handles: ['tl', 'tr', 'bl', 'br'] }).show(function () { return R(b1); });
      var fill = new Panel(c.color, 'Fill', [
        { html: '<i class="ib-sw" style="background:var(--paper)"></i>', on: true },
        { html: '<i class="ib-sw" style="background:var(--bark)"></i>' },
        { html: '<i class="ib-sw" style="background:var(--moss)"></i>' }
      ]).show(function (w, h) { var r = R(b1); return { x: r.left, y: r.top - h - 12 }; });
      await wait(140);
      await c.moveTo(fill.center(1));
      await c.click();
      fill.pick(1);
      b1.classList.add('ib-styling');
      b1.classList.remove('ib-raw');
      await wait(380);
      fill.hide();

      await c.moveTo(function () { var r = R(b1); return { x: r.right, y: r.bottom }; }, { shape: 'resize' });
      await c.press();
      sel.dimFn = function (r) { return Math.round(r.width) + ' × ' + Math.round(r.height); };
      var p0 = N.btnSmall, p1 = N.btnPad;
      await c.drag(520, function (e) {
        b1.style.padding = lerp(p0[0], p1[0], e).toFixed(2) + 'px ' + lerp(p0[1], p1[1], e).toFixed(2) + 'px';
        var r = R(b1);
        return { x: r.right, y: r.bottom };
      }, ease.back);
      b1.style.padding = p1[0] + 'px ' + p1[1] + 'px';
      await c.release();
      c.setShape('arrow');
      await wait(160);
      sel.hide();

      // button two: the quiet one
      if (inView(b2, 4)) {
        var frame2 = await drawFrame(c, b2, { tag: 'Button', dur: 420 });
        await wait(120);
        frame2.hide();
        await writeText(c, T.btns[1], { base: 60 });
        var sel2 = new Box(c.color, { tag: 'Button', handles: ['tl', 'tr', 'bl', 'br'] }).show(function () { return R(b2); });
        var style = new Panel(c.color, 'Style', [
          { html: '<i class="ib-sw" style="background:var(--bark)"></i>', on: true },
          { html: '<i class="ib-sw" style="background:transparent;border:1.5px solid var(--bark)"></i>' }
        ]).show(function (w, h) { var r = R(b2); return { x: r.left, y: r.top - h - 12 }; });
        await wait(140);
        await c.moveTo(style.center(1));
        await c.click();
        style.pick(1);
        b2.classList.add('ib-styling');
        b2.classList.remove('ib-raw');
        await wait(360);
        style.hide();
        await c.moveTo(function () { var r = R(b2); return { x: r.right + rand(40, 80), y: r.bottom + rand(16, 30) }; });
        await c.click();
        sel2.hide();
      }
    } finally {
      signals.buttonsDone.resolve();
    }
  }

  /* The four facts under the buttons. Casey on desktop, Sam on phones. */
  async function buildMeta(c) {
    if (!inView(E.meta, 4)) return;
    on(E.meta);
    for (var i = 0; i < T.meta.length; i++) {
      on(E.metaItems[i]);
      await writeText(c, T.meta[i], { base: 34 });
      await wait(rand(40, 110));
    }
  }

  /* Casey: the meta row, then spacing, alignment and a final review */
  async function casey(c) {
    await wait(1400);
    await buildMeta(c);

    await signals.titleDone;
    await signals.roleMade;

    // the gap above the positioning line is too big: drag the block up
    var m = new Measure(c.color);
    var headBottom = function () { return textRect(T.title, T.title.items.length).bottom; };
    var sel = new Box(c.color, { tag: 'Text', handles: ['tl', 'tr', 'bl', 'br'] });
    await c.moveTo(function () { var r = R(E.role); return { x: r.left + r.width * 0.55, y: r.top + 18 }; });
    await c.click();
    sel.show(function () { return R(E.role); });
    m.show(function () {
      var x = R(E.role).left + 22;
      return { x1: x, y1: headBottom(), x2: x, y2: R(E.role).top };
    });
    await wait(260);
    await c.press();
    var m0 = N.roleMargin + 20, m1 = N.roleMargin;
    var y0 = c.y;
    await c.drag(560, function (e) {
      var k = e > 0.86 ? 1 : e;
      E.role.style.marginTop = lerp(m0, m1, k).toFixed(2) + 'px';
      return { x: c.x, y: y0 - (m0 - lerp(m0, m1, k)) };
    });
    E.role.style.marginTop = m1 + 'px';
    await wait(260);
    await c.release();
    m.hide();
    sel.hide();

    // the meta row should sit flush left like everything else
    if (E.meta.classList.contains('ib-on') && inView(E.meta, 4)) {
      var msel = new Box(c.color, { tag: 'Row', handles: ['tl', 'tr', 'bl', 'br'] });
      await c.moveTo(function () { var r = R(E.meta); return { x: r.left + r.width * 0.62, y: r.bottom - 8 }; });
      await c.click();
      msel.show(function () { return R(E.meta); });
      var al = function (k) { return '<span class="ib-al">' + [10, 6, 8].map(function (w) {
        var ml = k === 0 ? 0 : k === 1 ? (12 - w) / 2 : 12 - w;
        return '<i style="width:' + w + 'px;margin-left:' + ml + 'px"></i>'; }).join('') + '</span>'; };
      var panel = new Panel(c.color, 'Align', [{ html: al(0) }, { html: al(1), on: true }, { html: al(2) }])
        .show(function (w, h) { var r = R(E.meta); return { x: r.left + r.width / 2 - w / 2, y: r.top - h - 10 }; });
      await wait(160);
      await c.moveTo(panel.center(0));
      await c.click();
      panel.pick(0);
      // FLIP the items so the jump to the left edge glides
      var before = E.metaItems.map(function (li) { return R(li).left; });
      E.meta.style.justifyContent = 'flex-start';
      var after = E.metaItems.map(function (li) { return R(li).left; });
      await tween(380, function (e) {
        E.metaItems.forEach(function (li, i) {
          li.style.transform = 'translateX(' + ((before[i] - after[i]) * (1 - e)).toFixed(2) + 'px)';
        });
      }, ease.out);
      E.metaItems.forEach(function (li) { li.style.transform = ''; });
      await wait(200);
      panel.hide();
      msel.hide();
    }

    // when the buttons are done, open up the gap between them
    await signals.buttonsDone;
    var b1 = E.btns[0], b2 = E.btns[1];
    if (b2.classList.contains('ib-on') && !b2.classList.contains('ib-raw')) {
      var bsel = new Box(c.color, { tag: 'Button', handles: ['tl', 'tr', 'bl', 'br'] });
      var gm = new Measure(c.color);
      await c.moveTo(function () { var r = R(b2); return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.55 }; });
      await c.click();
      bsel.show(function () { return R(b2); });
      gm.show(function () { var a = R(b1), b = R(b2); var y = a.top + a.height / 2; return { x1: a.right, y1: y, x2: b.left, y2: y }; });
      await wait(200);
      await c.press();
      var g0 = 5, g1 = N.gap, x0 = c.x;
      await c.drag(460, function (e) {
        var k = e > 0.85 ? 1 : e;
        E.actions.style.gap = lerp(g0, g1, k).toFixed(2) + 'px';
        return { x: x0 + (lerp(g0, g1, k) - g0), y: c.y };
      });
      E.actions.style.gap = g1 + 'px';
      await wait(240);
      await c.release();
      gm.hide();
      bsel.hide();
    } else {
      E.actions.style.gap = N.gap + 'px';
    }

    // one last look over the page
    var look = new Box(c.color, { handles: ['tl', 'tr', 'bl', 'br'] });
    var stops = [
      { el: E.title, tag: 'H1 · Heading', fn: function () { return pad(textRect(T.title, T.title.items.length), 4); } },
      { el: E.lede, tag: 'Paragraph' },
      { el: E.btns[0], tag: 'Button' }
    ];
    for (var i = 0; i < stops.length; i++) {
      var s = stops[i];
      if (!s.el.classList.contains('ib-on') || !inView(s.el, 0)) continue;
      var f = s.fn || (function (el) { return function () { return R(el); }; })(s.el);
      await c.moveTo(function () { var r = f(); return { x: r.left + r.width * rand(0.3, 0.6), y: r.top + r.height * 0.5 }; });
      await c.click();
      look.setTag(s.tag).show(f);
      await wait(rand(260, 360));
    }
    await c.moveTo({ x: Math.min(innerWidth - 60, R(E.copy).right + 30), y: R(E.copy).top + 20 });
    await c.click();
    look.hide();
  }

  /* ------------------------------------------------------------ phases */

  var loader, skipBtn, mainEl, running = false, finished = true, failsafe = 0;

  function loadPhase() {
    var bar = $('.ib-bar-fill', loader);
    var pct = $('.ib-pct', loader);
    var dots = $$('.ib-joiners i', loader);
    var barWrap = $('.ib-bar', loader);

    /* Real work: the fonts the hero is set in and the portrait. On a warm
       cache these are instant, so the bar paces itself over ~2.3s; on a
       slow connection it waits at whatever has actually finished. */
    var tasks = [];
    if (document.fonts && document.fonts.load) {
      ['600 1em "Source Serif 4"', 'italic 400 1em "Source Serif 4"', '400 1em "Source Serif 4"',
       '400 1em Inter', '500 1em Inter'].forEach(function (f) { tasks.push(document.fonts.load(f)); });
    }
    var img = $('.hero-portrait img');
    if (img) {
      tasks.push(img.complete ? (img.decode ? img.decode() : Promise.resolve()) : new Promise(function (res) {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      }).then(function () { return img.decode && img.decode(); }));
    }
    var done = 0, total = tasks.length || 1;
    if (!tasks.length) done = 1;
    tasks.forEach(function (p) {
      Promise.resolve(p).catch(function () {}).then(function () { done++; });
    });

    var MIN = 2300, MAX = 7000, start = clock.t, shown = 0, finishedAt = 0;
    return addJob(function (t, dt, res) {
      var el = t - start;
      var timeP = clamp(el / MIN, 0, 1);
      timeP = timeP < 1 ? 1 - Math.pow(1 - timeP, 1.35) : 1;
      var real = done / total;
      var cap = done >= total ? 1 : 0.12 + real * 0.8;
      var target = el > MAX ? 1 : Math.min(timeP, cap);
      shown += (target - shown) * Math.min(1, dt * 0.012);
      if (target === 1 && shown > 0.996) shown = 1;
      bar.style.transform = 'scaleX(' + shown.toFixed(4) + ')';
      var n = Math.round(shown * 100);
      pct.textContent = n + '%';
      barWrap.setAttribute('aria-valuenow', n);
      dots.forEach(function (d, i) { if (shown >= 0.12 + i * 0.19) d.classList.add('on'); });
      if (shown >= 1) {
        if (!finishedAt) finishedAt = t;
        if (t - finishedAt > 260) { res(); return false; }
      }
    });
  }

  function buildLayer() {
    layer = mk('div', 'ib-layer');
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    grid = mk('div', 'ib-grid');
    grid.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(grid, document.body.firstChild);
    overlays = [];
    cursors = [];
    renderers = [
      function () { overlays.forEach(function (o) { o.render(); }); },
      separate,
      function (t) { cursors.forEach(function (c) { c.render(t); }); }
    ];
  }

  async function play(withLoader) {
    running = true;
    finished = false;
    aborted = false;
    jobs = [];
    clock.t = 0; clock.last = 0;
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    mainEl.setAttribute('aria-busy', 'true');
    skipBtn.classList.remove('is-leaving');
    skipBtn.hidden = false;
    buildLayer();
    clock.raf = requestAnimationFrame(frame);
    failsafe = setTimeout(function () { skip(); }, 45000);

    try {
      if (withLoader) {
        loader.classList.remove('is-done');
        await loadPhase();
        loader.classList.add('is-done');
        await wait(380);
      } else {
        loader.classList.add('is-done');
      }

      prepare();
      grid.classList.add('on');
      await wait(650);

      var vw = innerWidth, vh = innerHeight;
      var starts = {
        alex:   { x: vw * 0.78, y: -30 },
        sam:    { x: -30, y: vh * 0.36 },
        jordan: { x: -30, y: vh * 0.82 },
        taylor: { x: vw * 0.44, y: vh + 30 },
        casey:  { x: vw + 30, y: vh * 0.7 }
      };
      var plan = { alex: alex, sam: sam, jordan: jordan, taylor: taylor, casey: casey };
      var cast = PEOPLE.filter(function (p) { return !(narrow && p.id === 'casey'); });
      await Promise.all(cast.map(function (p) {
        var c = new Cursor(p, narrow, starts[p.id]);
        return plan[p.id](c).then(function () {
          if (params.has('introdebug')) console.log('done', p.id, Math.round(clock.t));
          // drift somewhere out of the way and wait for the others
          if (narrow) return;
          return c.moveTo({ x: clamp(c.x + rand(-60, 60), 30, vw - 120), y: clamp(c.y + rand(30, 70), 30, vh - 40) }, { slow: 1.4 });
        });
      }));

      // everyone takes a look at what they made
      await wait(520);
      await outro();
    } catch (err) {
      if (err !== SKIP && window.console) console.error(err);
    }
    finish(aborted);
  }

  async function outro() {
    overlays.forEach(function (o) { if (o.hide) o.hide(); });
    grid.classList.remove('on');
    skipBtn.classList.add('is-leaving');
    cursors.forEach(function (c) { c.el.classList.add('quiet'); });
    await wait(260);
    var vw = innerWidth, vh = innerHeight;
    await Promise.all(cursors.map(function (c, i) {
      return wait(i * rand(50, 110)).then(function () {
        var ex = c.x > vw / 2 ? vw + 40 : -40;
        var ey = c.y + rand(-80, 80);
        var p = c.moveTo({ x: ex, y: ey }, { exact: true, slow: 0.9 });
        setTimeout(function () { c.el.classList.add('gone'); }, 260);
        return p;
      });
    }));
  }

  function finish(wasSkipped) {
    if (finished) return;
    finished = true;
    running = false;
    clearTimeout(failsafe);
    abortAll();

    // Put back exactly what was there. In reverse, so parents restore after children.
    if (touched) {
      for (var i = touched.length - 1; i >= 0; i--) {
        var t = touched[i];
        if (t.html != null) t.el.innerHTML = t.html;
        if (t.style == null) t.el.removeAttribute('style'); else t.el.setAttribute('style', t.style);
        t.el.classList.remove('ib-on', 'ib-raw', 'ib-styling');
      }
      touched = null;
    }

    if (wasSkipped) root.classList.add('ib-flash');
    root.classList.remove('intro');
    root.classList.add('intro-done');
    mainEl.removeAttribute('aria-busy');
    loader.classList.add('is-done');
    skipBtn.classList.add('is-leaving');
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto';

    if (grid) grid.classList.remove('on');
    if (layer) {
      layer.style.transition = 'opacity .3s ease';
      layer.style.opacity = '0';
    }
    var l = layer, g = grid;
    setTimeout(function () {
      cancelAnimationFrame(clock.raf);
      if (l) l.remove();
      if (g) g.remove();
      skipBtn.hidden = true;
      root.classList.remove('ib-flash');
    }, 800);
  }

  function skip() {
    if (!running) return;
    abortAll();
    finish(true);
  }

  function replay() {
    if (running || reduceMotion.matches) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    root.classList.remove('intro-done');
    root.classList.add('intro');
    play(false);
  }

  /* ------------------------------------------------------------ boot */

  function boot() {
    loader = $('.ib-loader');
    skipBtn = $('.ib-skip');
    mainEl = $('main');
    var replayBtn = $('.replay-intro');

    if (!loader || !skipBtn || !mainEl) { root.classList.remove('intro'); return; }

    skipBtn.addEventListener('click', skip);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && running) skip(); });
    window.addEventListener('hashchange', function () { if (running) skip(); });

    if (replayBtn && !reduceMotion.matches) {
      replayBtn.hidden = false;
      replayBtn.addEventListener('click', replay);
    }

    if (root.classList.contains('intro')) {
      window.scrollTo(0, 0);
      play(true);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
