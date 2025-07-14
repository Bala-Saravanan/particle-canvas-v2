"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ParticlesCanvas = exports["default"] = /*#__PURE__*/function () {
  function ParticlesCanvas(canvas) {
    var numParticles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    _classCallCheck(this, ParticlesCanvas);
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Provided canvas is not a valid <canvas> element.");
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.numParticles = numParticles;
    this.particles = [];
    this.mouse = {
      x: null,
      y: null,
      radius: 100
    };
    this.init();
    this.bindEvents();
    this.animate = this.animate.bind(this); // bind for RAF
  }
  return _createClass(ParticlesCanvas, [{
    key: "init",
    value: function init() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      // this.canvas.style.overflow = hidden;
      this.particles = [];
      for (var i = 0; i < this.numParticles; i++) {
        var x = Math.random() * this.canvas.width;
        var y = Math.random() * this.canvas.height;
        this.particles.push(new Particle(x, y, this.canvas));
      }
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      window.addEventListener("mousemove", function (e) {
        _this.mouse.x = e.x;
        _this.mouse.y = e.y;
      });
      window.addEventListener("resize", function () {
        _this.init();
      });
    }
  }, {
    key: "handleParticles",
    value: function handleParticles() {
      var _this2 = this;
      this.particles.forEach(function (particle) {
        var dx = _this2.mouse.x - particle.x;
        var dy = _this2.mouse.y - particle.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < _this2.mouse.radius) {
          var angle = Math.atan2(dy, dx);
          var force = (_this2.mouse.radius - distance) / _this2.mouse.radius;
          var directionX = Math.cos(angle) * force * 5;
          var directionY = Math.sin(angle) * force * 5;
          particle.x -= directionX;
          particle.y -= directionY;
        }
        particle.update();
        particle.draw(_this2.ctx);
      });
    }
  }, {
    key: "animate",
    value: function animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.handleParticles();
      requestAnimationFrame(this.animate);
    }
  }, {
    key: "start",
    value: function start() {
      this.animate();
    }
  }]);
}(); // Inner class (not exported)
var Particle = /*#__PURE__*/function () {
  function Particle(x, y, canvas) {
    _classCallCheck(this, Particle);
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.speedY = Math.random() * 0.6 - 0.3;
    this.color = "rgba(255,255,255,".concat(Math.random(), ")");
  }
  return _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }]);
}();