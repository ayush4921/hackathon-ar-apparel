/**
 * Jeeliz Glasses VTO Widget - https://github.com/jeeliz/jeelizGlassesVTOWidget
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
"use strict";
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function ($a) {
  var tb = 0;
  return function () {
    return tb < $a.length ? { done: !1, value: $a[tb++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function ($a) {
  return { next: $jscomp.arrayIteratorImpl($a) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function ($a, tb, wb) {
        if ($a == Array.prototype || $a == Object.prototype) return $a;
        $a[tb] = wb.value;
        return $a;
      };
$jscomp.getGlobal = function ($a) {
  $a = [
    "object" == typeof globalThis && globalThis,
    $a,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var tb = 0; tb < $a.length; ++tb) {
    var wb = $a[tb];
    if (wb && wb.Math == Math) return wb;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function ($a, tb) {
  var wb = $jscomp.propertyToPolyfillSymbol[tb];
  if (null == wb) return $a[tb];
  wb = $a[wb];
  return void 0 !== wb ? wb : $a[tb];
};
$jscomp.polyfill = function ($a, tb, wb, ub) {
  tb &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated($a, tb, wb, ub)
      : $jscomp.polyfillUnisolated($a, tb, wb, ub));
};
$jscomp.polyfillUnisolated = function ($a, tb, wb, ub) {
  wb = $jscomp.global;
  $a = $a.split(".");
  for (ub = 0; ub < $a.length - 1; ub++) {
    var Nb = $a[ub];
    if (!(Nb in wb)) return;
    wb = wb[Nb];
  }
  $a = $a[$a.length - 1];
  ub = wb[$a];
  tb = tb(ub);
  tb != ub &&
    null != tb &&
    $jscomp.defineProperty(wb, $a, {
      configurable: !0,
      writable: !0,
      value: tb,
    });
};
$jscomp.polyfillIsolated = function ($a, tb, wb, ub) {
  var Nb = $a.split(".");
  $a = 1 === Nb.length;
  ub = Nb[0];
  ub = !$a && ub in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var dd = 0; dd < Nb.length - 1; dd++) {
    var pd = Nb[dd];
    if (!(pd in ub)) return;
    ub = ub[pd];
  }
  Nb = Nb[Nb.length - 1];
  wb = $jscomp.IS_SYMBOL_NATIVE && "es6" === wb ? ub[Nb] : null;
  tb = tb(wb);
  null != tb &&
    ($a
      ? $jscomp.defineProperty($jscomp.polyfills, Nb, {
          configurable: !0,
          writable: !0,
          value: tb,
        })
      : tb !== wb &&
        (($jscomp.propertyToPolyfillSymbol[Nb] = $jscomp.IS_SYMBOL_NATIVE
          ? $jscomp.global.Symbol(Nb)
          : $jscomp.POLYFILL_PREFIX + Nb),
        (Nb = $jscomp.propertyToPolyfillSymbol[Nb]),
        $jscomp.defineProperty(ub, Nb, {
          configurable: !0,
          writable: !0,
          value: tb,
        })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
  "Symbol",
  function ($a) {
    if ($a) return $a;
    var tb = function (Nb, dd) {
      this.$jscomp$symbol$id_ = Nb;
      $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: dd,
      });
    };
    tb.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var wb = 0,
      ub = function (Nb) {
        if (this instanceof ub)
          throw new TypeError("Symbol is not a constructor");
        return new tb("jscomp_symbol_" + (Nb || "") + "_" + wb++, Nb);
      };
    return ub;
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Symbol.iterator",
  function ($a) {
    if ($a) return $a;
    $a = Symbol("Symbol.iterator");
    for (
      var tb = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
          " "
        ),
        wb = 0;
      wb < tb.length;
      wb++
    ) {
      var ub = $jscomp.global[tb[wb]];
      "function" === typeof ub &&
        "function" != typeof ub.prototype[$a] &&
        $jscomp.defineProperty(ub.prototype, $a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
          },
        });
    }
    return $a;
  },
  "es6",
  "es3"
);
$jscomp.iteratorPrototype = function ($a) {
  $a = { next: $a };
  $a[Symbol.iterator] = function () {
    return this;
  };
  return $a;
};
var JeeWidget = (function () {
  function $a() {
    ob.mode = rc.realtime;
    ob.canRT = !0;
    ob.isRT = !0;
    dd();
    pd();
    jd.enabled && Jb.do_instantDetection(jd.interval, jd.callback);
    ed && (ed(!0), (ed = null));
  }
  function tb() {
    ob.canRT = !1;
    ob.isRT = !1;
    if ($c.disableFallback) ub("FALLBACK_UNAVAILABLE");
    else if (
      ((Ga.uploadNotice = document.getElementById("JeeWidgetUploadNotice")),
      dc.toggle_loading(!1),
      Ga.uploadNotice)
    ) {
      $(Ga.uploadNotice).show();
      var la = document.getElementById("JeeWidgetFileInputNotice"),
        Ka = document.getElementById("JeeWidgetFileInputButtonNotice");
      la && Ka
        ? ($(Ka).click(function (db) {
            $(la.click());
          }),
          $(la).change(function (db) {
            dc.toggle_loading(!0);
            Od.read(
              la,
              function (Ta) {
                JeefitFallback.switch_toFallbackMode(
                  function () {
                    console.log(
                      "INFO in JeeWidget - switch_toFallbackMode(): success callback launched"
                    );
                    JeefitFallback.set_serverURL($c.fallbackURL);
                    $(Ga.uploadNotice).hide();
                    pd();
                    $(Ga.inputFileButton).show();
                    Gd(Ta, function () {
                      ob.sku && dc.load_fallback(ob.sku, !1);
                    });
                    ed && (ed(!1), (ed = null));
                  },
                  function () {
                    ub("FATAL");
                  }
                );
              },
              function (Ta) {
                dc.toggle_loading(!1);
                ub(Ta);
              }
            );
          }))
        : ub("NOFILEINPUTNOTICE");
    }
  }
  function wb() {
    ub("INVALID_SKU");
  }
  function ub(la) {
    Hd.error ? Hd.error(la) : console.log("ERROR:", la);
  }
  function Nb() {
    Id = $(Ga.container).width();
    Jd = $(Ga.container).height();
    yd = Math.round(1 * Id);
    zd = Math.round(1 * Jd);
    $(Ga.cv).css({ width: Id.toString() + "px", height: Jd.toString() + "px" });
    Ga.cv.width = yd;
    Ga.cv.height = zd;
    Jb && (ob.mode === rc.notLoaded ? Jb.set_size(yd, zd) : Jb.resize(yd, zd));
  }
  function dd() {
    Ga.adjust = document.getElementById("JeeWidgetAdjust");
    Ga.adjust &&
      ((Ga.adjustNotice = document.getElementById("JeeWidgetAdjustNotice")),
      (Ga.adjustExit = document.getElementById("JeeWidgetAdjustExit")),
      (Ga.changeModelContainer = document.getElementById(
        "JeeWidgetChangeModelContainer"
      )),
      (Ga.buttonResizeCanvas = document.getElementById("buttonResizeCanvas")),
      $(Ga.adjust).click(function () {
        $(Ga.adjust).hide();
        $(Ga.inputFileButton).hide();
        $(Ga.backToRTButton).hide();
        Ga.changeModelContainer && $(Ga.changeModelContainer).hide();
        Ga.buttonResizeCanvas && $(Ga.buttonResizeCanvas).hide();
        ob.mode = rc.adjust;
        Ga.adjustNotice.style.display = "block";
        $(Ga.adjustExit).show();
        Ga.cv.style.cursor = "move";
        Jb.switch_modeInteractor("movePinch");
      }),
      $(Ga.adjustExit).click(function () {
        $(Ga.adjust).show();
        $(Ga.adjustNotice).hide();
        $(Ga.adjustExit).hide();
        $(Ga.inputFileButton).show();
        ob.canRT && !ob.isRT && $(Ga.backToRTButton).show();
        Ga.changeModelContainer &&
          (Ga.changeModelContainer.style.display = "block");
        Ga.buttonResizeCanvas && $(Ga.buttonResizeCanvas).show();
        Ga.cv.style.cursor = "auto";
        ob.mode = ob.isRT ? ob.realtime : ob.fallback;
        Jb.switch_modeInteractor("idle");
      }),
      $(Ga.adjust).show(),
      $(Ga.changeModelContainer).show(),
      $(Ga.buttonResizeCanvas).show());
  }
  function pd() {
    Ga.inputFile = document.getElementById("JeeWidgetFileInput");
    Ga.inputFileButton = document.getElementById("JeeWidgetFileInputButton");
    Ga.inputFile &&
      Ga.inputFileButton &&
      ($(Ga.inputFileButton).click(function (la) {
        $(Ga.inputFile.click());
      }),
      $(Ga.inputFile).change(function (la) {
        dc.toggle_loading(!0);
        Od.read(
          Ga.inputFile,
          function (Ka) {
            ob.isRT
              ? Vd(Ka, function () {
                  ob.sku && dc.load_fallback(ob.sku, !1);
                })
              : Gd(Ka, function () {
                  ob.sku && dc.load_fallback(ob.sku, !1);
                });
          },
          function (Ka) {
            dc.toggle_loading(!1);
            ub(Ka);
          }
        );
      }),
      $(Ga.inputFileButton).show());
  }
  function Gd(la, Ka) {
    JeefitFallback.reset_adjust();
    JeefitFallback.detect(la, !1, function () {
      console.log(
        "INFO in JeeWidget - detect_fallback(): detection done successfully"
      );
      Ka && Ka();
    });
  }
  function Vd(la, Ka) {
    if (!ob.isRT) return !1;
    $c.disableFallback
      ? ub("FALLBACK_UNAVAILABLE")
      : JeefitFallback.switch_toFallbackMode(
          function () {
            console.log(
              "INFO in JeeWidget - switch_toFallbackMode(): success callback launched"
            );
            ob.isRT = !1;
            JeefitFallback.set_serverURL($c.fallbackURL);
            Gd(la, function () {
              ob.canRT && Ga.backToRTButton && $(Ga.backToRTButton).show();
              Ka();
            });
          },
          function () {
            ub("FALLBACK_UNAVAILABLE");
          }
        );
  }
  function Wd() {
    Ga.backToRTButton = document.getElementById(
      "JeeWidgetBackToRealtimeButton"
    );
    $(Ga.backToRTButton).click(function () {
      $(Ga.backToRTButton).hide();
      JeefitFallback.switch_toFullMode(function () {
        ob.isRT = !0;
        ob.mode = rc.realtime;
      });
    });
  }
  function Xd() {
    if (!Ga.trackIframe) {
      var la = $c.appstaticURL + "jeewidget/";
      Ga.trackIframe = document.createElement("iframe");
      Ga.trackIframe.width = "10";
      Ga.trackIframe.height = "10";
      Ga.trackIframe.src = la + "trackIframe.html";
      $(Ga.trackIframe)
        .css({ position: "absolute", zIndex: -1, bottom: "0px", right: "0px" })
        .appendTo(Ga.container);
    }
  }
  function Pd(la) {
    if (Ga.trackIframe) {
      var Ka = location.href.split("?").shift().split("://").pop();
      Ka = Ka.split("/").shift();
      Ka = Ka.split("www.").pop();
      try {
        Ga.trackIframe.contentWindow.postMessage(
          { action: "COUNTTRYONSESSION", domain: Ka, sku: la },
          "*"
        );
      } catch (db) {}
    }
  }
  function Qd(la, Ka, db) {
    Jb.load_model(
      Ka.mod + ".json",
      Ka.mats,
      function () {
        ob.mode = rc.realtime;
        db && db();
        dc.toggle_loading(!1);
        Pd(la);
      },
      la
    );
  }
  var Jb = (function () {
    function la(c, e) {
      var m = new XMLHttpRequest();
      m.open("GET", c, !0);
      m.withCredentials = !1;
      m.onreadystatechange = function () {
        4 !== m.readyState ||
          (200 !== m.status && 0 !== m.status) ||
          e(m.responseText);
      };
      m.send();
    }
    function Ka(c, e) {
      if (0 === e || "object" !== typeof c) return c;
      c = Object.assign({}, c);
      e = void 0 === e || -1 === e ? -1 : e - 1;
      for (var m in c) c[m] = Ka(c[m], e);
      return c;
    }
    function db(c) {
      return 0.5 > c ? 4 * c * c * c : (c - 1) * (2 * c - 2) * (2 * c - 2) + 1;
    }
    function Ta(c) {
      switch (c) {
        case "relu":
          return "gl_FragColor=max(vec4(0.,0.,0.,0.),gl_FragColor);";
        case "elu":
          return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.,1.,1.,1.),gl_FragColor,step(0.,gl_FragColor));";
        case "elu01":
          return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1,0.1,0.1,0.1),gl_FragColor,step(0.,gl_FragColor));";
        case "arctan":
          return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
        case "copy":
          return "";
        default:
          return !1;
      }
    }
    function mb(c, e) {
      var m = e % 8;
      return (c[(e - m) / 8] >> (7 - m)) & 1;
    }
    function gb(c, e, m) {
      var k = 1,
        u = 0;
      for (m = e + m - 1; m >= e; --m) (u += k * mb(c, m)), (k *= 2);
      return u;
    }
    function xb(c) {
      c =
        "undefined" === typeof btoa
          ? Buffer.from(c.data, "base64").toString("latin1")
          : atob(c.data);
      for (var e = c.length, m = new Uint8Array(e), k = 0; k < e; ++k)
        m[k] = c.charCodeAt(k);
      return m;
    }
    function Ua(c) {
      var e = JSON.parse(c);
      c = e.nb;
      var m = e.n;
      e = xb(e);
      for (var k = new Uint32Array(m), u = 0; u < m; ++u)
        k[u] = gb(e, u * c, c);
      return k;
    }
    function pb(c) {
      var e = JSON.parse(c);
      c = e.ne;
      var m = e.nf,
        k = e.n;
      e = xb(e);
      for (
        var u = new Float32Array(k),
          q = new Float32Array(m),
          K = c + m + 1,
          x = 0;
        x < k;
        ++x
      ) {
        var z = K * x,
          B = 0 === mb(e, z) ? 1 : -1,
          v = gb(e, z + 1, c);
        z = z + 1 + c;
        for (var E = q.length, C = 0, A = z; A < z + E; ++A)
          (q[C] = mb(e, A)), ++C;
        for (E = z = 0; E < m; ++E) z += q[E] * Math.pow(2, -E - 1);
        u[x] =
          0 === z && 0 === v
            ? 0
            : B * (1 + z) * Math.pow(2, 1 + v - Math.pow(2, c - 1));
      }
      return u;
    }
    function yb(c) {
      var e = null,
        m = null,
        k = null,
        u = 0;
      this.m = function (q) {
        this.om(q.Zc);
        k.Cj({ af: q.af, Ye: q.Ye });
      };
      this.xk = function (q) {
        return e[q];
      };
      this.om = function (q) {
        var K = null;
        u = q.length;
        e = q.map(function (x, z) {
          x = Object.assign({}, x, {
            index: z,
            parent: this,
            jd: K,
            dl: z === u - 1,
          });
          return (K = 0 === z ? nb.instance(x) : Fb.instance(x));
        });
        m = e[0];
        k = e[u - 1];
        e.forEach(function (x, z) {
          0 !== z && x.Nl();
        });
      };
      this.wa = function (q, K) {
        var x = K;
        e.forEach(function (z) {
          x = z.wa(x, q);
        });
        return x;
      };
      this.wk = function () {
        return m.K();
      };
      this.Jg = function () {
        return k.Ak();
      };
      this.Bg = function () {
        return k.Bg();
      };
      this.L = function () {
        e &&
          (e.forEach(function (q) {
            q.L();
          }),
          (k = m = e = null),
          (u = 0));
      };
      "undefined" !== typeof c && this.m(c);
    }
    function hb(c, e) {
      c[e] = !0;
      c.setAttribute(e, "true");
    }
    function Tb() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    function wc() {
      var c = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return c && c.length && 2 < c.length
        ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3] || 0, 10)]
        : [0, 0, 0];
    }
    function xc() {
      var c = navigator.userAgent.toLowerCase();
      return -1 !== c.indexOf("safari") && -1 === c.indexOf("chrome") ? !0 : !1;
    }
    function yc(c) {
      if (!c) return c;
      var e = null;
      if (c.video) {
        var m = function (k) {
          return k && "object" === typeof k ? Object.assign({}, k) : k;
        };
        e = {};
        "undefined" !== typeof c.video.width && (e.width = m(c.video.width));
        "undefined" !== typeof c.video.height && (e.height = m(c.video.height));
        "undefined" !== typeof c.video.facingMode &&
          (e.facingMode = m(c.video.facingMode));
      }
      e = { audio: c.audio, video: e };
      "undefined" !== typeof c.deviceId && (e.deviceId = c.deviceId);
      return e;
    }
    function Ub(c) {
      var e = c.video.width;
      c.video.width = c.video.height;
      c.video.height = e;
      return c;
    }
    function Rb(c) {
      function e(C) {
        return [
          480,
          576,
          640,
          648,
          720,
          768,
          800,
          960,
          1080,
          1152,
          1280,
          1366,
          1920,
        ].sort(function (A, I) {
          return Math.abs(A - C) - Math.abs(I - C);
        });
      }
      function m(C) {
        var A = yc(c);
        C = C(A);
        u.push(C);
        k(C);
      }
      function k(C) {
        if (C.video && C.video.facingMode && C.video.facingMode.exact) {
          var A = C.video.facingMode.exact;
          C = yc(C);
          delete C.video.facingMode.exact;
          C.video.facingMode.ideal = A;
          u.push(C);
        }
      }
      var u = [];
      if (!c || !c.video) return u;
      k(c);
      if (c.video.width && c.video.height) {
        if (c.video.width.ideal && c.video.height.ideal) {
          var q = e(c.video.width.ideal).slice(0, 3),
            K = e(c.video.height.ideal).slice(0, 3),
            x = {},
            z = 0;
          for (x.bb = void 0; z < q.length; x = { bb: x.bb }, ++z) {
            x.bb = q[z];
            var B = {},
              v = 0;
            for (B.ab = void 0; v < K.length; B = { ab: B.ab }, ++v)
              if (
                ((B.ab = K[v]),
                x.bb !== c.video.width.ideal || B.ab !== c.video.height.ideal)
              ) {
                var E = Math.max(x.bb, B.ab) / Math.min(x.bb, B.ab);
                E < 4 / 3 - 0.1 ||
                  E > 16 / 9 + 0.1 ||
                  m(
                    (function (C, A) {
                      return function (I) {
                        I.video.width.ideal = C.bb;
                        I.video.height.ideal = A.ab;
                        return I;
                      };
                    })(x, B)
                  );
              }
          }
        }
        m(function (C) {
          return Ub(C);
        });
      }
      c.video.width &&
        c.video.height &&
        (c.video.width.ideal &&
          c.video.height.ideal &&
          m(function (C) {
            delete C.video.width.ideal;
            delete C.video.height.ideal;
            return C;
          }),
        m(function (C) {
          delete C.video.width;
          delete C.video.height;
          return C;
        }));
      c.video.facingMode &&
        (m(function (C) {
          delete C.video.facingMode;
          return C;
        }),
        c.video.width &&
          c.video.height &&
          m(function (C) {
            Ub(C);
            delete C.video.facingMode;
            return C;
          }));
      u.push({ audio: c.audio, video: !0 });
      return u;
    }
    function ha(c) {
      try {
        var e = window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
      } catch (k) {
        e = window.innerHeight > window.innerWidth;
      }
      if (e && c && c.video) {
        e = c.video.width;
        var m = c.video.height;
        e &&
          m &&
          e.ideal &&
          m.ideal &&
          e.ideal > m.ideal &&
          ((c.video.height = e), (c.video.width = m));
      }
    }
    function oa(c) {
      c.volume = 0;
      hb(c, "muted");
      if (xc()) {
        if (1 === c.volume) {
          var e = function () {
            c.volume = 0;
            window.removeEventListener("mousemove", e, !1);
            window.removeEventListener("touchstart", e, !1);
          };
          window.addEventListener("mousemove", e, !1);
          window.addEventListener("touchstart", e, !1);
        }
        setTimeout(function () {
          c.volume = 0;
          hb(c, "muted");
        }, 5);
      }
    }
    function va(c, e, m, k) {
      function u(K) {
        q || ((q = !0), m(K));
      }
      var q = !1;
      navigator.mediaDevices
        .getUserMedia(k)
        .then(function (K) {
          function x() {
            setTimeout(function () {
              if (c.currentTime) {
                var z = c.videoWidth,
                  B = c.videoHeight;
                if (0 === z || 0 === B) u("VIDEO_NULLSIZE");
                else {
                  z && (c.style.width = z.toString() + "px");
                  B && (c.style.height = B.toString() + "px");
                  z = { zj: null, uf: null, zl: null };
                  try {
                    var v = K.getVideoTracks()[0];
                    v &&
                      ((z.zl = v),
                      (z.zj = v.getCapabilities()),
                      (z.uf = v.getSettings()));
                  } catch (E) {}
                  xc() || Tb()
                    ? c.parentNode && null !== c.parentNode
                      ? (q || e(c, K, z),
                        setTimeout(function () {
                          c.play();
                        }, 100))
                      : (document.body.appendChild(c),
                        oa(c),
                        q || e(c, K, z),
                        setTimeout(function () {
                          c.style.transform = "scale(0.0001,0.0001)";
                          c.style.position = "fixed";
                          c.style.bottom = "0px";
                          c.style.right = "0px";
                          oa(c);
                          setTimeout(function () {
                            c.play();
                          }, 100);
                        }, 80))
                    : q || e(c, K, z);
                }
              } else u("VIDEO_NOTSTARTED");
            }, 700);
          }
          "undefined" !== typeof c.srcObject
            ? (c.srcObject = K)
            : ((c.src = window.URL.createObjectURL(K)), (c.videoStream = K));
          oa(c);
          c.addEventListener(
            "loadeddata",
            function () {
              var z = c.play();
              oa(c);
              "undefined" === typeof z
                ? x()
                : z
                    .then(function () {
                      x();
                    })
                    .catch(function () {
                      u("VIDEO_PLAYPROMISEREJECTED");
                    });
            },
            !1
          );
        })
        .catch(function (K) {
          u(K);
        });
    }
    function La(c, e, m) {
      var k =
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          ? document.createElement("video")
          : !1;
      if (k)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          if (m && m.video) {
            if (Tb()) {
              var u = wc();
              0 !== u[0] && (12 > u[0] || (12 === u[0] && 2 > u[1])) && ha(m);
            }
            m.video.width &&
              m.video.width.ideal &&
              (k.style.width = m.video.width.ideal + "px");
            m.video.height &&
              m.video.height.ideal &&
              (k.style.height = m.video.height.ideal + "px");
          }
          hb(k, "autoplay");
          hb(k, "playsinline");
          m && m.audio ? (k.volume = 0) : hb(k, "muted");
          va(
            k,
            c,
            function () {
              function q(x) {
                if (0 === x.length) e("INVALID_FALLBACKCONSTRAINTS");
                else {
                  var z = x.shift();
                  va(
                    k,
                    c,
                    function () {
                      q(x);
                    },
                    z
                  );
                }
              }
              var K = Rb(m);
              q(K);
            },
            m
          );
        } else e && e("MEDIASTREAMAPI_NOTFOUND");
      else e && e("VIDEO_NOTPROVIDED");
    }
    function Na(c) {
      navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        ? navigator.mediaDevices
            .enumerateDevices()
            .then(function (e) {
              (e = e.filter(function (m) {
                return (
                  m.kind &&
                  -1 !== m.kind.toLowerCase().indexOf("video") &&
                  m.label &&
                  m.deviceId
                );
              })) &&
              e.length &&
              0 < e.length
                ? c(e, !1)
                : c(!1, "NODEVICESFOUND");
            })
            .catch(function () {
              c(!1, "PROMISEREJECTED");
            })
        : c(!1, "NOTSUPPORTED");
    }
    function Ea() {
      function c() {
        var Q = kd.le;
        Nc = Q * U.width;
        ib = Q * U.height;
      }
      function e() {
        ++T;
        2 === T &&
          (B(),
          Oa.Tg(),
          Oa.pi(),
          Oa.dm(),
          ma.Ac.forEach(function (Q) {
            Q();
          }),
          ma.Ac.splice(0),
          ia.model && !ma.isBusy && Oa.oh(ia.model));
      }
      function m(Q) {
        qb = setTimeout(q.bind(null, Q), J);
      }
      function k() {
        fc.reset();
        aa && window.cancelAnimationFrame(aa);
        q(0);
      }
      function u(Q) {
        Ob && (Za.Ul(Ob), Ob.remove());
        Za.Ni(Q);
        Ob = Q;
      }
      function q(Q) {
        xa = -1;
        Ba
          ? (xa = a)
          : d.isEnabled
          ? (xa = d.xh)
          : Ca
          ? (z(), (xa = D === W.aa ? fc.T() : 1))
          : ((xa = U.yc[0]), z());
        Va.ia();
        for (var sa = 0; sa < xa; ++sa)
          za.set("s51"),
            G.Xc.R(),
            G.pb.h(0),
            V.raw.h(1),
            ta.l(!1, !1),
            G.Xc.h(0),
            y.wa(!1, G.Xc);
        Ba
          ? (b(), (Ba = !1), f.flush(), (aa = window.requestAnimationFrame(q)))
          : (Za.animate(Q),
            d.isEnabled ||
              (Ca &&
                (fc.Lm(),
                (sa = fc.Cg(1)),
                (Ja = U.Ld[1] + sa * (U.Ld[0] - U.Ld[1])),
                U.Lb &&
                  D === W.aa &&
                  ((ba.ri = U.mh + (U.nh - U.mh) * sa),
                  (ba.td = U.lh + (U.ql - U.lh) * sa),
                  (ba.td = Math.min(ba.td, 0.5)))),
              (N = Q),
              D !== W.xa && (aa = window.requestAnimationFrame(m))));
      }
      function K() {
        N = Date.now();
        Ca = !0;
      }
      function x() {
        qb && (clearTimeout(qb), (qb = !1));
        aa && (window.cancelAnimationFrame(aa), (aa = !1));
      }
      function z() {
        var Q = jc.currentTime - gc;
        0 > Q && (gc = jc.currentTime);
        1e3 * Q < U.$m ||
          (fd.refresh(),
          (gc += Q),
          za.set("s49"),
          Va.ia(),
          G.pb.R(),
          fd.h(0),
          ta.l(!1, !0),
          null !== G.rb &&
            (za.set("s50"), G.xc.o(), G.pb.h(0), G.rb.h(1), ta.l(!1, !1)));
      }
      function B() {
        G.Di = ra.instance({
          isPot: !0,
          rl: !0,
          isFloat: !1,
          url: U.$ + U.ta + U.an,
        });
        var Q = { isPot: !1, rl: !0, isFloat: !1, width: Nc, height: ib };
        G.pb = ra.instance(Q);
        G.xc = ra.instance(Q);
        F.si.push(G.pb, G.xc);
        G.Xc = ra.instance({ isPot: !0, isFloat: !1, width: y.wk() });
        U.ad &&
          (h = ra.instance({
            isPot: !1,
            isFloat: !1,
            isLinear: !0,
            url: (-1 === U.Qe.indexOf("//") ? U.$ + U.ta : "") + U.Qe,
          }));
      }
      function v() {
        var Q = {
            width: 2,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0]),
          },
          sa = {
            width: 2,
            height: 1,
            isFloat: !0,
            isPot: !1,
            array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
          };
        V.raw = ra.instance(Q);
        V.vc = ra.instance(Q);
        V.nc = zc.instance(Q);
        V.fe = ra.instance(sa);
        V.Jf = ra.instance(sa);
        V.Ad = ra.instance(sa);
        ba.gd = ra.instance({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0, 0, 0]),
        });
      }
      function E(Q) {
        za.set("s57");
        V.Jf.R();
        V.raw.h(1);
        V.Ad.h(2);
        var sa = U.Pd[0] + fc.Cg(0.5) * (U.Pd[1] - U.Pd[0]);
        za.F("u51", sa);
        za.F("u52", fc.sk() / xa);
        ta.l(!1, !1);
        za.set("s58");
        V.Ad.o();
        V.Jf.h(0);
        ta.l(!1, !1);
        Q.h(0);
        V.raw.o();
        f.viewport(0, 0, 1, 1);
        za.set("s52");
        za.sf("u37", Bc.get());
        V.nc.h(1);
        ta.l(!1, !1);
        za.set("s53");
        f.viewport(1, 0, 1, 1);
        ta.l(!1, !1);
        V.fe.R();
        za.set("s54");
        za.S("u46", U.cc[0] * Ja, U.cc[1]);
        V.raw.h(0);
        V.nc.h(1);
        ta.l(!1, !1);
        za.set("s55");
        V.nc.um(1);
        V.fe.h(0);
        V.Ad.h(2);
        ta.l(!1, !1);
        za.set("s56");
        V.nc.h(0);
        V.vc.o();
        ta.l(!1, !1);
        N - ba.jh > ba.ri &&
          U.Lb &&
          D === W.aa &&
          ((ba.jh = N),
          ba.gd.o(),
          za.set("s59"),
          Q.h(0),
          ta.l(!1, !1),
          eb.qb.Bi(fd, ba.gd, ba.td));
      }
      function C() {
        var Q = U.$,
          sa = U.Gd.split("://").shift();
        if ("http" === sa || "https" === sa) Q = "";
        Q += U.Gd;
        "json" !== Q.split(".").pop() && (Q += U.neuralNetworkPath);
        la(Q, function (fa) {
          fa = JSON.parse(fa);
          y = new yb({ Zc: fa.layers, af: "gpuRawAvg", Ye: E });
          e();
        });
      }
      var A = [-1, -1],
        I = null,
        P = [0.5, 0, 0, 0.5],
        F = { Wa: null, Jb: !1, Hb: !1, si: [] },
        ea = [0, U.Ia[1], U.Ia[2]],
        J = U.dc,
        p = null,
        y = null;
      c();
      var X = [0, 0, 0],
        ja = 1,
        R = 0,
        G = { pb: null, xc: null, Xc: null, Di: null, rb: null },
        V = { raw: null, vc: null, nc: null, fe: null, Jf: null, Ad: null },
        N = 0,
        aa = null,
        ba = {
          Xa: null,
          Ya: null,
          Ve: null,
          jh: 0,
          ri: U.nh,
          td: 0.1,
          gd: null,
        },
        T = 0,
        ua = !1,
        Ca = !0,
        Ja = 1,
        xa = -1,
        W = { xa: -1, aa: 0, Ba: 1, Xb: 2, Yb: 3 },
        D = W.aa,
        da = null,
        S = W.aa,
        wa = !1,
        Ba = !1,
        a = 1,
        b = !1,
        d = { isEnabled: !1, de: null, Qa: null, xh: 0 },
        h = null,
        l = -1,
        n = !1,
        r = !1,
        w = !1,
        H = [0, 0, 0],
        Y = 1,
        M,
        na,
        Ma,
        Ra = { Ia: [0, 0, 0], Ob: 1, kd: 0, Da: 0, va: 0, qa: U.qa },
        Pa = [0, 0, 0],
        Xa = { scale: 1, offsetX: 0, offsetY: 0 },
        qb = null,
        gc = 0,
        Oa = {
          Sg: function () {
            c();
            A[0] = 1;
            A[1] = Nc / ib;
            Bc.m({
              fd: U.scanOverlapFactors,
              wh: U.scanNScaleLevels,
              $a: Nc,
              De: ib,
              Th: U.scanScale0Factor,
              La: U.La,
              Uh: !0,
            });
            l =
              U.width > U.height
                ? [U.width / U.height, 1]
                : [1, U.height / U.width];
            F.Hb = !0;
          },
          m: function () {
            za.Rf([
              {
                id: "s49",
                name: "_",
                s:
                  "attribute vec2 a0;uniform mat2 u32;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5,.5)+u32*a0;}",
                G: ["a0"],
                N: [2],
                g:
                  "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1", "u32"],
                precision: "lowp",
              },
              {
                id: "s51",
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                s:
                  "attribute vec2 a0;uniform sampler2D u33;uniform vec2 u34;uniform float u35;const vec2 f=vec2(.25,.5),g=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u33,f);vec2 d=a.gb,b=a.a*u34;vec4 c=texture2D(u33,g);float l=c.a,i=c.y;vec2 j=vec2(mix(1.,1./cos(i),u35),1.);b*=j;vec2 k=a0*.5+e;vv0=d+(k-e)*b,gl_Position=vec4(a0,0.,1.);}",
                G: ["a0"],
                N: [2],
                i: ["u1", "u33", "u34", "u35"],
                precision: "lowp",
              },
              {
                id: "s52",
                name: "_",
                s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g:
                  "uniform sampler2D u36,u33;uniform vec3 u37,u38;uniform float u39,u40;const vec4 e=vec4(.25,.25,.25,.25);void main(){vec4 b=texture2D(u36,vec2(.625,.625)),c=texture2D(u36,vec2(.875,.625));float d=dot(b-c,e);bool f=d>u40;vec4 a=texture2D(u33,vec2(.25,.5));f?a.r=2.:a.r>u39?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u37);else{float g=dot(e,texture2D(u36,vec2(.875,.875))),h=dot(e,texture2D(u36,vec2(.125,.625))),i=dot(e,texture2D(u36,vec2(.375,.625)));a.r*=step(1.9,a.r),a.gba+=vec3(g,h,i)*u38*a.a;}gl_FragColor=a;}",
                i: "u36 u33 u37 u39 u38 u40".split(" "),
              },
              {
                id: "s53",
                name: "_",
                s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g:
                  "uniform sampler2D u36,u33;uniform vec3 u41,u42;uniform vec2 u43;const vec4 l=vec4(1.,1.,1.,1.),f=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);void main(){float b=dot(texture2D(u36,vec2(0.,0.)),e),a=smoothstep(u43.x,u43.y,b);vec4 c=texture2D(u33,vec2(.25,.5)),d=texture2D(u33,vec2(.75,.5));float g=d.a;a=mix(a,g,.3);if(c.r<1.9){gl_FragColor=f;return;}float h=dot(e,texture2D(u36,vec2(0.,.75))),i=dot(e,texture2D(u36,vec2(.25,.75))),j=dot(e,texture2D(u36,vec2(.5,.75)));vec3 k=u42+vec3(h,i,j)*u41;gl_FragColor=vec4(k,a);}",
                i: "u36 u33 u43 u41 u42 u44".split(" "),
              },
              {
                id: "s54",
                name: "_",
                g:
                  "uniform sampler2D u33,u45;uniform vec2 u46;uniform float u47,u48;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(1.,0.,0.,0.),h=vec4(0.,0.,0.,1.);varying vec2 vv0;void main(){vec4 c=texture2D(u33,vv0),d=texture2D(u45,vv0),i=texture2D(u33,vec2(.75,.5));float j=pow(i.a,u48),k=(1.-j)*(u46.y-u46.x)+u46.x,a=step(.5,vv0.x);vec4 l=mix(g,h,a),b=max(k*f,l);b*=mix(f,u47*vec4(1.,1.,1.,0.)+vec4(0.,0.,0.,1.),a);vec4 m=c-d;gl_FragColor=m*b;}",
                i: ["u33", "u45", "u46", "u47", "u48"],
                precision: "highp",
              },
              {
                id: "s55",
                name: "_",
                g:
                  "uniform sampler2D u45,u49,u44;const vec4 g=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 c=texture2D(u45,vv0),d=texture2D(u49,vv0),a=c+d;float f=step(.5,vv0.x),b=a.a;b*=texture2D(u44,vec2(.25,.5)).a,b*=texture2D(u44,vec2(.75,.5)).a,a.a=mix(a.a,b,f),gl_FragColor=a;}",
                i: ["u45", "u49", "u44"],
                precision: "highp",
              },
              {
                id: "s56",
                name: "_",
                g:
                  "uniform sampler2D u33;uniform float u50;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u33,vv0);float b=step(.5,vv0.x),c=texture2D(u33,vec2(.75,.5)).g;a.a+=a.a*(1.-b)*u50*abs(sin(c)),gl_FragColor=a;}",
                i: ["u33", "u50"],
                precision: "highp",
              },
              {
                id: "s57",
                name: "_",
                g:
                  "uniform sampler2D u33,u44,u36;uniform vec3 u41,u42;uniform float u51,u52;const vec4 e=vec4(.25,.25,.25,.25);const vec3 g=vec3(1.,1.,1.);varying vec2 vv0;void main(){float a=step(.5,vv0.x);vec4 c=texture2D(u44,vv0);float d=texture2D(u33,vec2(.75,.5)).a;vec2 h=mix(vec2(.75,.75),vec2(0.,.75),a),i=mix(vec2(0.,.5),vec2(.25,.75),a),j=mix(vec2(.25,.5),vec2(.5,.75),a);float k=dot(e,texture2D(u36,h)),l=dot(e,texture2D(u36,i)),m=dot(e,texture2D(u36,j));vec3 n=mix(vec3(1.,1.,.2),u41,a),b=n*vec3(k,l,m);if(a>.5){vec3 o=texture2D(u33,vec2(.75,.5)).rgb;b=u42+b-o;}b*=d/u52;vec4 p=mix(vec4(b,0.),c,vec4(u51*g,0.));gl_FragColor=p;}",
                i: "u33 u44 u36 u51 u52 u41 u42".split(" "),
                precision: "highp",
              },
              {
                id: "s58",
                name: "_",
                g:
                  "uniform sampler2D u44;const vec4 h=vec4(.25,.25,.25,.25);varying vec2 vv0;void main(){float a=step(.5,vv0.x),c=mix(.02,5e-4,a),d=mix(.05,1e-3,a);vec3 b=texture2D(u44,vv0).rgb;float f=length(b),g=1.-smoothstep(c,d,f);gl_FragColor=vec4(b,g);}",
                i: ["u44"],
                precision: "highp",
              },
              {
                id: "s59",
                name: "_",
                s: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                g:
                  "uniform sampler2D u36;const vec4 g=vec4(1.,1.,1.,1.),h=vec4(0.,0.,0.,0.),e=vec4(.25,.25,.25,.25);const float f=3.1415;void main(){float a=dot(texture2D(u36,vec2(.25,.25)),e),b=dot(texture2D(u36,vec2(.5,.25)),e),c=f/2.*dot(texture2D(u36,vec2(.75,.25)),e),d=4.18*dot(texture2D(u36,vec2(0.,.25)),e);gl_FragColor=vec4(d,a,b,c);}",
                i: ["u36"],
              },
              {
                id: "s50",
                name: "_",
                g:
                  "uniform sampler2D u1,u54;varying vec2 vv0;vec4 i(vec4 a,sampler2D g){mediump float b=a.b*63.;mediump vec2 c;c.y=floor(floor(b)/8.),c.x=floor(b)-c.y*8.;mediump vec2 d;d.y=floor(ceil(b)/8.),d.x=ceil(b)-d.y*8.;highp vec2 e;e.x=c.x*.125+9.765625e-4+.123047*a.r,e.y=c.y*.125+9.765625e-4+.123047*a.g;highp vec2 f;f.x=d.x*.125+9.765625e-4+.123047*a.r,f.y=d.y*.125+9.765625e-4+.123047*a.g;lowp vec4 j=texture2D(g,e),k=texture2D(g,f),l=mix(j,k,fract(b));return l;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=i(a,u54);}",
                i: ["u1", "u54"],
              },
            ]);
            v();
            C();
            fc.m({ Xe: 0, n: U.yc[1] - U.yc[0] + 1, kh: U.yc[0] });
            ma.set_videoRotation = function (Q) {
              Wb.rotate = Q;
              ma.ready && (kc.tf(jc.videoWidth, jc.videoHeight), kc.zf());
            };
            ma.set_viewRotation = function () {};
            ma.set_LUT = function (Q) {
              Q
                ? ra.instance({
                    url: Q,
                    isFloat: !1,
                    isFlipY: !1,
                    O: function (sa) {
                      G.rb = sa;
                      Oa.uc();
                    },
                  })
                : ((G.rb = null), Oa.uc());
            };
            ma.resize = function (Q, sa) {
              function fa() {
                x();
                F.Wa && (clearTimeout(F.Wa), (F.Wa = null));
                if (!F.Jb)
                  if (U.width === pa && U.height === Qa) k();
                  else if (D !== W.aa && D !== W.Ba)
                    F.Wa = setTimeout(fa, U.Qh);
                  else {
                    var Ia = "undefined" === typeof Xb ? !1 : Xb.get_mode(),
                      Cb = D;
                    D = W.xa;
                    Ba = F.Jb = !0;
                    b = function () {
                      Ba = !1;
                      F.Jb = !1;
                      K();
                      J = U.dc;
                      p && clearTimeout(p);
                      p = !1;
                      D = Cb;
                    };
                    U.width = pa;
                    U.height = Qa;
                    Oa.Sg();
                    Oa.Tg();
                    F.si.forEach(function (jb) {
                      jb.resize(pa, Qa);
                    });
                    Aa.resize(Nc, ib);
                    Oa.uc();
                    kc.tf(
                      jc.videoWidth ? jc.videoWidth : jc.width,
                      jc.videoHeight ? jc.videoHeight : jc.height
                    );
                    kc.zf();
                    kc.pi();
                    k();
                    D === W.Ba && ((D = W.aa), ma.switch_viewer3D(!0, !1));
                    Ia && Xb.switch_mode(Ia);
                  }
              }
              if (ma.ready) {
                F.Wa && (clearTimeout(F.Wa), (F.Wa = null));
                x();
                var pa = Q * kd.le,
                  Qa = sa * kd.le;
                F.Wa = setTimeout(fa, U.Qh);
              }
            };
          },
          Tg: function () {
            za.j("s51", [
              { type: "1i", name: "u1", value: 0 },
              { type: "1i", name: "u33", value: 1 },
              { type: "2f", name: "u34", value: A },
              { type: "1f", name: "u35", value: U.hg },
            ]);
            za.j("s52", [
              { type: "1i", name: "u36", value: 0 },
              { type: "1i", name: "u33", value: 1 },
              { type: "1f", name: "u39", value: U.Mm },
              { type: "1f", name: "u40", value: U.Lj },
              {
                type: "3f",
                name: "u38",
                value: [U.La[0] * A[0], U.La[1] * A[1], U.La[2]],
              },
            ]);
            za.j("s53", [
              { type: "1i", name: "u36", value: 0 },
              { type: "1i", name: "u33", value: 1 },
              { type: "1i", name: "u44", value: 2 },
              { type: "2f", name: "u43", value: U.Lh },
              { type: "3f", name: "u41", value: [-U.ma[0], -U.ma[1], U.ma[2]] },
              { type: "3f", name: "u42", value: U.ui },
            ]);
            za.j("s54", [
              { type: "1i", name: "u33", value: 0 },
              { type: "1i", name: "u45", value: 1 },
              { type: "2f", name: "u46", value: U.cc },
              { type: "1f", name: "u47", value: U.Sh },
              { type: "1f", name: "u48", value: U.Kh },
            ]);
            za.j("s55", [
              { type: "1i", name: "u45", value: 1 },
              { type: "1i", name: "u49", value: 0 },
              { type: "1i", name: "u44", value: 2 },
            ]);
            za.j("s56", [
              { type: "1i", name: "u33", value: 0 },
              { type: "1f", name: "u50", value: U.$l },
            ]);
            za.j("s57", [
              { type: "1i", name: "u36", value: 0 },
              { type: "1i", name: "u33", value: 1 },
              { type: "1i", name: "u44", value: 2 },
              { type: "3f", name: "u41", value: [-U.ma[0], -U.ma[1], U.ma[2]] },
              { type: "3f", name: "u42", value: U.ui },
            ]);
            za.j("s58", [{ type: "1i", name: "u44", value: 0 }]);
            za.j("s59", [{ type: "1i", name: "u36", value: 0 }]);
            za.j("s50", [
              { type: "1i", name: "u1", value: 0 },
              { type: "1i", name: "u54", value: 1 },
            ]);
          },
          uc: function () {
            Za.$h(V.vc, null === G.rb ? G.pb : G.xc, ba.gd, G.Di);
          },
          zk: function () {
            return Xa;
          },
          fi: function (Q) {
            Xa = Q;
          },
          yd: function () {
            Pa[0] = X[0] - Xa.offsetX;
            Pa[1] = X[1] + Xa.offsetY;
            Pa[2] = X[2];
            Za.gm(ea, Ra.Ia, Pa);
          },
          zd: function () {
            Za.hm(ja * U.Ob, Ra.Ob, Xa.scale);
          },
          zi: function () {
            Za.im(R + Ra.kd);
          },
          Qm: function () {
            Za.em(U.Da + Ra.Da, U.va + Ra.va);
          },
          Sm: function () {
            Za.fm((0 === Ra.qa[0] && 0 === Ra.qa[1] ? U : Ra).qa);
          },
          If: function () {
            Oa.yd();
            Oa.zd();
            Oa.zi();
            Oa.Qm();
            Oa.Sm();
          },
          Zl: function () {
            x();
            da && (clearInterval(da), (da = !1));
            d.isEnabled = !0;
            d.xh = 0;
            n = Za.yk();
            r = Ob.Ig();
            w = Ob.Gg();
            Y = Ra.Ob;
            H = Ra.Ia;
            M = Ra.qa;
            na = Ra.Da;
            Ma = Ra.va;
            Ba = !1;
            Za.ud(!1);
          },
          Yl: function (Q) {
            var sa = null,
              fa = 0;
            sa = function () {
              2 === ++fa &&
                ((d.isEnabled = !1),
                (Ra.Ob = Y),
                (Ra.Ia = H),
                (Ra.qa = M),
                (Ra.Da = na),
                (Ra.va = Ma),
                Oa.If(),
                Za.na(n),
                k(),
                Q && Q());
            };
            D === W.Xb ? (D = W.Ba) : D === W.Yb && (D = W.aa);
            Za.Sa(D === W.aa ? 0 : 1);
            Ob.replace(r, sa);
            Ob.lf(w, sa);
            Oa.uc();
            Za.ud(!0);
          },
          pi: function () {
            var Q = Math.tan(tc / 2);
            Za.Zh({
              oe: U.oe / Q,
              am: Q,
              Ol: Ad,
              za: U.za,
              cd: U.cd,
              Gi: A,
              Ji: U.dn,
              ic: U.ic,
              Ce: U.Ce,
              Ae: U.Ae,
              Be: U.Be,
              qa: U.qa,
              Md: U.Md,
              Zd: U.Zd,
              df: U.df,
              Ub: U.Ub,
              Bm: U.ki,
              Cm: U.li,
              sd: U.sd,
              Vb: U.Vb,
              Ic: U.Ic,
              ce: U.ce,
              be: U.be,
              ae: U.ae,
              Rd: U.Rd,
              Qd: U.$ + U.ta + U.Qd,
              Da: U.Da,
              va: U.va,
              ye: U.ye,
              Of: U.Of,
              Nf: U.Nf,
              Cd: U.Cd,
              ln: U.kn,
              hn: ld,
              ad: U.ad,
              tl: h,
              $c: U.$c,
              Re: U.Re,
              Pe: U.Pe,
              sl: l,
              Af: U.Af,
            });
          },
          Aj: function () {
            var Q = Wb.Fd,
              sa = Wb.Ed,
              fa = 1 / Math.tan(tc / 2),
              pa = Gb.Y() / Gb.K();
            Ad = [
              fa,
              0,
              0,
              0,
              0,
              fa / pa,
              0,
              0,
              0,
              0,
              -(sa + Q) / (sa - Q),
              -1,
              0,
              0,
              (-2 * Q * sa) / (sa - Q),
              0,
            ];
            ld = 1 / Math.tan((U.gn * Math.PI) / 360) / fa;
          },
          tf: function (Q, sa) {
            I = [0.5, 0.5];
            Q = sa / Q;
            sa = Gb.Y() / Gb.K();
            90 === Math.abs(Wb.rotate) && (Q = 1 / Q);
            Q > sa ? (I[1] *= sa / Q) : (I[0] *= Q / sa);
            P[0] = 0;
            P[1] = 0;
            P[2] = 0;
            P[3] = 0;
            switch (Wb.rotate) {
              case 0:
                P[0] = I[0];
                P[3] = I[1];
                break;
              case 180:
                P[0] = -I[0];
                P[3] = -I[1];
                break;
              case 90:
                P[1] = I[0];
                P[2] = -I[1];
                break;
              case -90:
                (P[1] = -I[0]), (P[2] = I[1]);
            }
            tc =
              2 *
              Math.atan(
                2 *
                  I[0] *
                  Math.tan(
                    ((1 < Q ? Wb.Ii : Wb.FOVdesktop) * Math.PI) / 180 / 2
                  )
              );
            Oa.Aj();
          },
          zf: function () {
            za.j("s49", [
              { type: "1i", name: "u1", value: 0 },
              { type: "mat2", name: "u32", value: P },
            ]);
          },
          Ge: function (Q, sa) {
            F.Hb || Oa.Sg();
            Oa.Vk(Q, sa);
            Oa.m();
            if (!Oa.Sk())
              return (
                ma.eb && ma.eb("GL_INCOMPATIBLE", "Cannot init JEEFITAPI"), !1
              );
            Oa.Qg();
            return !0;
          },
          Vk: function (Q, sa) {
            ma.tb = document.createElement("canvas");
            ma.sb = document.createElement("canvas");
            ma.sb.width = U.width;
            ma.sb.height = U.height;
            ma.Ki = ma.sb.getContext("2d");
            ma.replace_video = function (fa) {
              jc = fa;
              qd.ja = jc;
              return !0;
            };
            ma.bc = ma.tb.getContext("2d");
            ma.capture_background = function (fa, pa) {
              fa = "undefined" === typeof fa ? Q : fa;
              pa = "undefined" === typeof pa ? sa : pa;
              ma.tb.width = fa;
              ma.tb.height = pa;
              var Qa = fa / pa,
                Ia = 0,
                Cb = 0;
              if (Q / sa > Qa) {
                var jb = sa * Qa;
                Qa = sa;
                Ia = Math.round((Q - jb) / 2);
              } else (jb = Q), (Qa = Q / Qa), (Cb = Math.round((sa - Qa) / 2));
              ma.bc.save();
              ma.bc.translate(fa, 0);
              ma.bc.scale(-1, 1);
              ma.bc.drawImage(jc, Ia, Cb, jb, Qa, 0, 0, fa, pa);
              ma.bc.restore();
              fa = document.createElement("canvas");
              fa.width = ma.tb.width;
              fa.height = ma.tb.height;
              fa.getContext("2d").drawImage(ma.tb, 0, 0);
              return fa;
            };
          },
          Qg: function () {
            window.CanvasListeners &&
              (Xb.init({ pa: Gb.ib() }),
              (ma.init_listeners = Oa.Qg),
              (ma.add_listener = Xb.add_listener),
              (ma.remove_listener = Xb.remove_listener),
              (ma.animate_swipe = Xb.animate_swipe),
              (ma.switch_modeInteractor = Xb.switch_mode),
              (ma.get_modeInteractor = Xb.get_mode),
              Xb.add_listener(
                "move",
                function (Q, sa) {
                  D === W.aa &&
                    (U.ul &&
                      ((Xa.offsetX -= sa[0] * U.qh),
                      (Xa.offsetX = Math.min(
                        Math.max(Xa.offsetX, -U.bd),
                        U.bd
                      ))),
                    (Xa.offsetY -= sa[1] * U.qh),
                    (Xa.offsetY = Math.min(Math.max(Xa.offsetY, -U.bd), U.bd)),
                    Oa.yd());
                },
                !0
              ).add_listener(
                "pinch",
                function (Q, sa) {
                  D === W.aa &&
                    ((Xa.scale += sa * U.vl),
                    (Xa.scale = Math.min(Math.max(Xa.scale, U.rh[0]), U.rh[1])),
                    Oa.zd());
                },
                !0
              ));
          },
          Sk: function () {
            return Aa.m({
              Yc: !1,
              yj: !1,
              expand: !1,
              pa: Gb.ib(),
              Gb: Gb,
              onload: function () {
                ba.Ya = gd.instance({
                  fb: U.$ + U.ta + Vb.bn,
                  xb: U.$ + U.ta + Vb.cn,
                  wb: Vb.Ei,
                  yb: Vb.Fi,
                });
                U.Lb
                  ? ((ba.Xa = gd.instance({})), eb.qb.na(ba.Xa))
                  : (ba.Xa = ba.Ya);
                Za.na(ba.Xa);
                ba.Ve = U.Lb ? Kd.instance({ pl: ba.Xa, nl: ba.Ya }) : ba.Ya;
                e();
              },
            });
          },
          dm: function () {
            ma.load_model = function (Q, sa, fa) {
              if (ma.isBusy) return !1;
              ma.isBusy = !0;
              if (ia.model)
                ma.set_model(
                  Q,
                  function () {
                    ma.set_materials(sa, function () {
                      ma.isBusy = !1;
                      fa && fa();
                    });
                  },
                  function () {
                    ma.isBusy = !1;
                  }
                );
              else {
                var pa = U.$ + U.ta + U.Te + "/",
                  Qa = sa.map(function (Ia) {
                    return pa + Ia;
                  });
                ia.model = {
                  url: U.$ + U.ta + U.We + "/" + Q,
                  mc: Qa,
                  vb: !1,
                  ub: !1,
                };
                Oa.oh(ia.model, function () {
                  ma.isBusy = !1;
                  fa && fa();
                });
              }
              return !0;
            };
            ma.set_offset = function (Q) {
              X = Q;
              Oa.yd();
            };
            ma.set_scale = function (Q) {
              ja = Q;
              Oa.zd();
            };
            ma.set_rx = function (Q) {
              R = Q;
              Oa.zi();
            };
            ma.switch_shadow = Za.yf;
            ma.switch_bgBlur = Za.xf;
            ma.set_zoom = Za.jf;
            ma.is_viewer3D = function () {
              return D === W.Ba;
            };
            ma.switch_viewer3D = function (Q, sa) {
              if (
                D === W.Xb ||
                D === W.Yb ||
                (D === W.aa && !Q) ||
                (D === W.Ba && Q) ||
                Ba
              )
                return !1;
              if (D === W.xa)
                return S !== W.Ba || Q
                  ? S === W.aa && Q
                    ? ((S = W.Ba), Za.na(ba.Ya), Za.Sa(1), sa && sa(), !0)
                    : !1
                  : ((S = W.aa), Za.na(ba.Xa), Za.Sa(0), sa && sa(), !0);
              var fa = 0,
                pa = -1,
                Qa = 0;
              D === W.aa
                ? ((D = W.Xb), (pa = U.jn))
                : D === W.Ba && ((D = W.Yb), (pa = U.mn));
              var Ia = Date.now();
              da = setInterval(function () {
                var Cb = Date.now();
                fa += (Cb - Ia) / pa;
                1 <= fa &&
                  ((fa = 1),
                  D === W.Xb
                    ? ((D = W.Ba), Za.na(ba.Ya))
                    : ((D = W.aa), Za.na(ba.Xa)),
                  sa && sa(),
                  clearInterval(da),
                  (da = !1));
                var jb = D === W.Yb || D === W.aa ? 1 - U.fn(fa) : U.en(fa);
                Za.Sa(jb);
                (D !== W.Yb && D !== W.Xb) ||
                  0 !== Qa++ % 2 ||
                  (Za.na(ba.Ve), ba.Ve.wm(jb));
                Ia = Cb;
              }, 0.016);
              return !0;
            };
            ma.capture_image = function (Q, sa, fa, pa) {
              a = Q;
              Ba = !0;
              "undefined" === typeof isAllocate && (fa = !1);
              (pa = "undefined" === typeof pa ? !1 : pa) && Za.ud(!1);
              z();
              b = function () {
                Za.Nh(0);
                f.flush();
                var Qa = Gb.Dg(fa);
                sa(Qa);
                pa && Za.ud(!0);
              };
            };
            ma.capture_detection = function (Q, sa) {
              a = Q;
              Ba = !0;
              var fa = null === G.rb ? G.pb : G.xc;
              b = function () {
                var pa = md.instance({
                  $d: V.vc.clone(),
                  uh: Ob.Ig(),
                  th: Ob.Gg(),
                  background: fa.clone(),
                  Qa: eb.qb.Lk().clone(),
                  Se: Xa,
                });
                sa(pa);
              };
            };
            ma.process_offlineRendering = function (Q, sa, fa, pa, Qa) {
              function Ia() {
                if (2 === ++Cb) {
                  d.Qa || (d.Qa = gd.instance({}));
                  Q.Fg() &&
                    (d.Qa.ei(Q.Fg()), U.Ln ? Za.na(ba.Ya) : Za.na(d.Qa));
                  d.de.set();
                  k();
                  d.de = !1;
                  Oa.Yl(
                    pa
                      ? function () {
                          Gb.ib().parentNode.removeChild(ma.sb);
                        }
                      : !1
                  );
                  var jb = Gb.Dg(!1);
                  setTimeout(function () {
                    Qa(jb);
                  }, 1);
                }
              }
              Oa.Zl();
              pa &&
                (ma.Ki.drawImage(Gb.ib(), 0, 0),
                Gb.ib().parentNode.insertBefore(ma.sb, Gb.ib()),
                ma.sb.setAttribute("class", "jeefitMask"));
              d.de = Q;
              var Cb = 0;
              ma.set_model(sa, function () {
                Ia();
                ma.set_materials(fa, function () {
                  setTimeout(Ia, 1);
                });
              });
            };
            ma.serialize_detection = function (Q) {
              return Q.pc();
            };
            ma.unserialize_detection = function (Q, sa, fa) {
              return md.wc(Q, sa, fa);
            };
            ma.do_instantDetection = function (Q, sa) {
              ad.m(V.vc);
              ad.start(Q, sa);
            };
            ma.relieve_DOM = function (Q, sa) {
              if (F.Jb) return !1;
              J = sa || 160;
              Ca = !1;
              p && clearTimeout(p);
              p = setTimeout(function () {
                J = U.dc;
                p = !1;
                K();
              }, Q);
              return !0;
            };
            ma.switch_slow = function (Q, sa) {
              if (F.Jb) return !1;
              "undefined" === typeof sa && (sa = U.Kj);
              p && ((J = U.dc), K(), clearTimeout(p), (p = !1));
              Q ? (Ca = !1) : K();
              J = Q ? sa : U.dc;
              return !0;
            };
            ma.switch_deepSleep = function (Q) {
              if (wa === Q) return !1;
              wa = !1;
              ma.switch_sleep(Q);
              wa = Q;
              return !0;
            };
            ma.switch_sleep = function (Q) {
              if (!F.Jb && !wa) {
                if ((Q && D === W.xa) || (!Q && D !== W.xa)) return !1;
                da && (clearInterval(da), (da = !1));
                D === W.Yb
                  ? ((D = W.aa), Za.na(ba.Xa), Za.Sa(0))
                  : D === W.Xb && ((D = W.Ba), Za.na(ba.Ya), Za.Sa(1));
                x();
                Q ? ((aa = !1), (S = D), (D = W.xa)) : ((D = S), k());
                return !0;
              }
            };
            ma.set_modelStandalone = function (Q, sa) {
              Za.vd(!1);
              rd.instance({
                url: Q.model,
                mc: Q.materials,
                vb: !1,
                ub: !1,
                O: function (fa) {
                  sa && sa();
                  u(fa);
                  Oa.vf();
                  Za.vd(!0);
                },
              });
            };
            ma.start_rendering = Oa.vf;
            ma.update_material = function (Q, sa) {
              Ob && Ob.Tm(Q, sa);
            };
            ma.set_model = function (Q, sa, fa) {
              Ob &&
                Ob.replace(
                  "http" === Q.substring(0, 4).toLowerCase()
                    ? Q
                    : U.$ + U.ta + U.We + "/" + Q,
                  function () {
                    sa && sa(Ob.Bj());
                  },
                  fa
                );
            };
            ma.set_tweaker = function (Q, sa) {
              function fa(pa) {
                ma.Qf(pa);
                sa && sa();
              }
              "string" === typeof Q
                ? la(U.$ + U.ta + U.Nm + "/" + Q, fa)
                : fa(Q);
            };
            ma.Qf = function (Q) {
              Q &&
                (Q.preOffset && (Ra.Ia = Q.preOffset),
                Q.preScale && (Ra.Ob = Q.preScale),
                Q.rx && (Ra.kd = Q.rx),
                Q.beginBendZ && (Ra.Da = Q.beginBendZ),
                Q.bendStrength && (Ra.va = Q.bendStrength),
                Q.maskBranchStartEnd && (Ra.qa = Q.maskBranchStartEnd),
                ma.ready && Oa.If());
            };
            ma.set_materials = function (Q, sa) {
              if (Ob) {
                var fa = U.$ + U.ta + U.Te + "/";
                Q = Q.map(function (pa) {
                  var Qa = pa;
                  "string" === typeof pa &&
                    ((Qa = fa + pa), (Qa = Qa.replace(/([^:])\/\//, "$1/")));
                  return Qa;
                });
                Ob.lf(Q, sa);
              }
            };
          },
          vf: function () {
            ua ||
              (Oa.uc(),
              U.Lb && (Va.reset(), eb.qb.sj(fd), eb.qb.rj()),
              U.gk || Za.Qj(),
              (ma.ready = !0),
              (N = 0),
              k(),
              (T = 0),
              (ua = !0),
              Aa.Hf(kd.ik),
              Oa.If(),
              Za.Hm(),
              ma.Bc.forEach(function (Q) {
                Q();
              }),
              ma.Bc.splice(0));
          },
          oh: function (Q, sa) {
            Q = rd.instance({
              O: function () {
                Oa.vf();
                sa && sa();
              },
              url: Q.url,
              mc: Q.mc,
              vb: Q.vb,
              ub: Q.ub,
            });
            u(Q);
          },
          Km: function () {
            U.Lb && eb.qb.mf(Vb);
          },
        };
      return Oa;
    }
    function Fa(c) {
      return 3 === arguments.length ? this.gb(arguments) : this.set(c);
    }
    function Sa(c, e) {
      e = Math.floor(e);
      c.r = ((e >> 16) & 255) / 255;
      c.W = ((e >> 8) & 255) / 255;
      c.b = (e & 255) / 255;
    }
    function vb(c, e) {
      function m(x) {
        void 0 !== x &&
          1 > parseFloat(x) &&
          console.warn(
            "JETHREE.Color: Alpha component of " + e + " will be ignored."
          );
      }
      var k;
      if ((k = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(e))) {
        var u = k[2];
        switch (k[1]) {
          case "rgb":
          case "rgba":
            if (
              (k = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                u
              ))
            ) {
              c.r = Math.min(255, parseInt(k[1], 10)) / 255;
              c.W = Math.min(255, parseInt(k[2], 10)) / 255;
              c.b = Math.min(255, parseInt(k[3], 10)) / 255;
              m(k[5]);
              return;
            }
            if (
              (k = /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                u
              ))
            ) {
              c.r = Math.min(100, parseInt(k[1], 10)) / 100;
              c.W = Math.min(100, parseInt(k[2], 10)) / 100;
              c.b = Math.min(100, parseInt(k[3], 10)) / 100;
              m(k[5]);
              return;
            }
            break;
          case "hsl":
          case "hsla":
            if (
              (k = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                u
              ))
            ) {
              u = parseFloat(k[1]) / 360;
              var q = parseInt(k[2], 10) / 100,
                K = parseInt(k[3], 10) / 100;
              m(k[5]);
              c.cm(u, q, K);
              return;
            }
        }
      } else if ((k = /^#([A-Fa-f0-9]+)$/.exec(e))) {
        k = k[1];
        u = k.length;
        if (3 === u) {
          c.r = parseInt(k.charAt(0) + k.charAt(0), 16) / 255;
          c.W = parseInt(k.charAt(1) + k.charAt(1), 16) / 255;
          c.b = parseInt(k.charAt(2) + k.charAt(2), 16) / 255;
          return;
        }
        if (6 === u) {
          c.r = parseInt(k.charAt(0) + k.charAt(1), 16) / 255;
          c.W = parseInt(k.charAt(2) + k.charAt(3), 16) / 255;
          c.b = parseInt(k.charAt(4) + k.charAt(5), 16) / 255;
          return;
        }
      }
      e &&
        0 < e.length &&
        ((k = nd[e]),
        void 0 !== k
          ? Sa(c, k)
          : console.warn("JETHREE.Color: Unknown color " + e));
    }
    function Hb(c, e, m, k) {
      this.A = c || 0;
      this.B = e || 0;
      this.C = m || 0;
      this.M = void 0 !== k ? k : 1;
    }
    function Bb(c, e, m) {
      var k = e.A,
        u = e.B,
        q = e.C;
      e = e.M;
      var K = m.A,
        x = m.B,
        z = m.C;
      m = m.M;
      c.A = k * m + e * K + u * z - q * x;
      c.B = u * m + e * x + q * K - k * z;
      c.C = q * m + e * z + k * x - u * K;
      c.M = e * m - k * K - u * x - q * z;
      return c;
    }
    function zb(c, e) {
      this.x = c || 0;
      this.y = e || 0;
    }
    function Ya(c, e, m) {
      this.x = c || 0;
      this.y = e || 0;
      this.z = m || 0;
    }
    function lc(c, e) {
      var m = c.x,
        k = c.y,
        u = c.z;
      c.x = k * e.z - u * e.y;
      c.y = u * e.x - m * e.z;
      c.z = m * e.y - k * e.x;
    }
    function bc(c, e, m, k) {
      this.A = c || 0;
      this.B = e || 0;
      this.C = m || 0;
      this.Ma = k || bc.Hi;
    }
    function Eb(c, e) {
      this.min = void 0 !== c ? c : new Ya(Infinity, Infinity, Infinity);
      this.max = void 0 !== e ? e : new Ya(-Infinity, -Infinity, -Infinity);
    }
    function Yb(c) {
      return new Ya().Cc(c.min, c.max).ya(0.5);
    }
    function Fc(c, e) {
      c.min.min(e);
      c.max.max(e);
    }
    function Kb() {
      this.elements = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      ]);
      0 < arguments.length &&
        console.error(
          "JETHREE.Matrix4: the constructor no longer reads arguments. use .set() instead."
        );
    }
    function Gc(c, e, m) {
      var k = e.elements,
        u = m.elements;
      m = c.elements;
      e = k[0];
      var q = k[4],
        K = k[8],
        x = k[12],
        z = k[1],
        B = k[5],
        v = k[9],
        E = k[13],
        C = k[2],
        A = k[6],
        I = k[10],
        P = k[14],
        F = k[3],
        ea = k[7],
        J = k[11];
      k = k[15];
      var p = u[0],
        y = u[4],
        X = u[8],
        ja = u[12],
        R = u[1],
        G = u[5],
        V = u[9],
        N = u[13],
        aa = u[2],
        ba = u[6],
        T = u[10],
        ua = u[14],
        Ca = u[3],
        Ja = u[7],
        xa = u[11];
      u = u[15];
      m[0] = e * p + q * R + K * aa + x * Ca;
      m[4] = e * y + q * G + K * ba + x * Ja;
      m[8] = e * X + q * V + K * T + x * xa;
      m[12] = e * ja + q * N + K * ua + x * u;
      m[1] = z * p + B * R + v * aa + E * Ca;
      m[5] = z * y + B * G + v * ba + E * Ja;
      m[9] = z * X + B * V + v * T + E * xa;
      m[13] = z * ja + B * N + v * ua + E * u;
      m[2] = C * p + A * R + I * aa + P * Ca;
      m[6] = C * y + A * G + I * ba + P * Ja;
      m[10] = C * X + A * V + I * T + P * xa;
      m[14] = C * ja + A * N + I * ua + P * u;
      m[3] = F * p + ea * R + J * aa + k * Ca;
      m[7] = F * y + ea * G + J * ba + k * Ja;
      m[11] = F * X + ea * V + J * T + k * xa;
      m[15] = F * ja + ea * N + J * ua + k * u;
      return c;
    }
    function Ic(c, e, m, k, u, q) {
      this.a = c;
      this.b = e;
      this.c = m;
      this.Ga = k instanceof Ya ? k : new Ya();
      this.Bd = Array.isArray(k) ? k : [];
      this.color = u instanceof Fa ? u : new Fa();
      this.Lf = Array.isArray(u) ? u : [];
      this.Mb = void 0 !== q ? q : 0;
    }
    function ec(c, e, m) {
      var k = new XMLHttpRequest();
      k.open("GET", c, !0);
      var u = (k.withCredentials = !1);
      k.onreadystatechange = function () {
        404 !== k.status || u || ((u = !0), m && m(404));
        if (4 === k.readyState && 200 === k.status) {
          var q = null;
          try {
            q = JSON.parse(k.responseText);
          } catch (K) {
            m && m(-1);
          }
          e && q && e(q);
        }
      };
      k.onerror = function () {
        m && m(0);
      };
      k.send();
    }
    function Cc(c, e, m) {
      "object" === typeof c ? e(c) : ec(c, e, m);
    }
    function Oc(c, e) {
      for (var m = new Ya(), k = new Ya(), u = 0, q = e.length; u < q; u++) {
        var K = e[u],
          x = c[K.a],
          z = c[K.b];
        m.Va(c[K.c], z);
        k.Va(x, z);
        lc(m, k);
        0 !== m.Ie() && (m.normalize(), K.Ga.H(m));
      }
    }
    function hc(c, e) {
      for (var m = Array(c.length), k = 0, u = c.length; k < u; ++k)
        m[k] = new Ya();
      k = new Ya();
      u = new Ya();
      for (var q = 0, K = e.length; q < K; ++q) {
        var x = e[q],
          z = c[x.a],
          B = c[x.b];
        k.Va(c[x.c], B);
        u.Va(z, B);
        lc(k, u);
        m[x.a].add(k);
        m[x.b].add(k);
        m[x.c].add(k);
      }
      k = 0;
      for (c = c.length; k < c; ++k) m[k].normalize();
      c = 0;
      for (k = e.length; c < k; ++c)
        (u = e[c]),
          (q = u.Bd),
          3 === q.length
            ? (q[0].H(m[u.a]), q[1].H(m[u.b]), q[2].H(m[u.c]))
            : ((q[0] = m[u.a].clone()),
              (q[1] = m[u.b].clone()),
              (q[2] = m[u.c].clone()));
      return m;
    }
    function Dc(c, e, m, k) {
      function u(ja) {
        y.H(e[ja]);
        X.H(y);
        var R = x[ja];
        J.H(R);
        J.sub(y.ya(y.Kc(R))).normalize();
        var G = X.x,
          V = X.y,
          N = X.z,
          aa = R.x,
          ba = R.y;
        R = R.z;
        p.x = V * R - N * ba;
        p.y = N * aa - G * R;
        p.z = G * ba - V * aa;
        G = 0 > p.Kc(z[ja]) ? -1 : 1;
        K[4 * ja] = J.x;
        K[4 * ja + 1] = J.y;
        K[4 * ja + 2] = J.z;
        K[4 * ja + 3] = G;
      }
      for (
        var q = c.length,
          K = new Float32Array(4 * q),
          x = Array(q),
          z = Array(q),
          B = 0;
        B < q;
        B++
      )
        (x[B] = new Ya()), (z[B] = new Ya());
      var v = new Ya(),
        E = new Ya(),
        C = new Ya(),
        A = new zb(),
        I = new zb(),
        P = new zb(),
        F = new Ya(),
        ea = new Ya();
      k.forEach(function (ja) {
        var R = ja.a,
          G = ja.b;
        ja = ja.c;
        v.H(c[R]);
        E.H(c[G]);
        C.H(c[ja]);
        A.H(m[R]);
        I.H(m[G]);
        P.H(m[ja]);
        var V = E.x - v.x,
          N = C.x - v.x,
          aa = E.y - v.y,
          ba = C.y - v.y,
          T = E.z - v.z,
          ua = C.z - v.z,
          Ca = I.x - A.x,
          Ja = P.x - A.x,
          xa = I.y - A.y,
          W = P.y - A.y,
          D = 1 / (Ca * W - Ja * xa);
        F.set(
          (W * V - xa * N) * D,
          (W * aa - xa * ba) * D,
          (W * T - xa * ua) * D
        );
        ea.set(
          (Ca * N - Ja * V) * D,
          (Ca * ba - Ja * aa) * D,
          (Ca * ua - Ja * T) * D
        );
        x[R].add(F);
        x[G].add(F);
        x[ja].add(F);
        z[R].add(ea);
        z[G].add(ea);
        z[ja].add(ea);
      });
      var J = new Ya(),
        p = new Ya(),
        y = new Ya(),
        X = new Ya();
      k.forEach(function (ja) {
        u(ja.a);
        u(ja.b);
        u(ja.c);
      });
      return K;
    }
    function oc(c, e, m, k) {
      return Math.sqrt((c - m) * (c - m) + (e - k) * (e - k));
    }
    var ia = {
        gg: !0,
        Jn: !1,
        Kn: !1,
        Jj: !1,
        fg: !1,
        In: !1,
        Fa: !1,
        Pl: !1,
        Yc: !1,
        lo: !1,
        $: "",
        yl: "",
        ij: 700,
        hj: 200,
        ig: !1,
        Wm: !1,
        Xm: !1,
        Vm: !1,
        Qi: 3,
        Cb: !1,
        Sf: !0,
        fb: "images/backgrounds/interior2.jpg",
        xb: "images/backgrounds/interior_light.jpg",
        kj: [256, 256, 512, 512],
        wb: 2.1,
        yb: 8,
        jj: [64, 128, 256, 256],
        Yk: [60, 96, 160, 250],
        Xk: [8, 12, 18, 40],
        Nb: 2.2,
        hd: 1,
        Sd: 300,
        Wf: 500,
        Td: 50,
        tj: 0,
        uj: 0,
        zn: 45,
        Bn: 1,
        An: 1e3,
        Xf: 20,
        nn: 10,
        on: 10,
        pn: 5,
        Ll: 0.1,
        Dh: 20,
        Gh: 100,
        Hh: 100,
        Kl: -Math.PI / 3,
        Jl: Math.PI / 3,
        Fh: 0,
        ti: 0,
        dk: [40, 32, 16, 16],
        Pi: [0, 0.87, 0.92, 0.9],
        Gl: 2,
        Cl: 100,
        ba: !1,
        Ri: 16,
        Si: 0.4,
        Ui: [0.72, 0.73, 0.72, 0.74],
        dj: 1.2,
        aj: [0.5, 0.5, 0.5, 1],
        fj: 140,
        ej: 280,
        gj: 1.2,
        Vi: 20,
        Wi: 40,
        cj: [6, 9, 9, 12],
        $i: [0.03, 0.02, 0.02, 0.018],
        Zi: [0.35, 0.35, 0.4, 0.5],
        Xi: [0.2, 0.2, 0.2, 0.2],
        Ti: [0.1, 0.15, 0.15, 0.15],
        bj: [200, 200, 150, 120],
        Yi: [1, 2, 3, 5],
        Dm: 1.1,
        Do: [0.25, 0.5, 1, 2],
        Eo: 256,
        Co: 256,
        Bo: 200,
        Em: [40, 80, 200, 500],
        Fm: [35, 45, 80, 120],
        Dj: !0,
        Ej: "CCW",
      },
      Pc = {},
      za = (function () {
        function c(R, G, V) {
          G = R.createShader(G);
          R.shaderSource(G, V);
          R.compileShader(G);
          return R.getShaderParameter(G, R.COMPILE_STATUS) ? G : !1;
        }
        function e(R, G, V) {
          G = c(R, R.VERTEX_SHADER, G);
          V = c(R, R.FRAGMENT_SHADER, V);
          R === f && K.push(G, V);
          var N = R.createProgram();
          R.attachShader(N, G);
          R.attachShader(N, V);
          R.linkProgram(N);
          return N;
        }
        function m(R, G) {
          void 0 === G.s &&
            (G.s =
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
          void 0 === G.G && (G.G = ["a0"]);
          void 0 === G.N && (G.N = [2]);
          if (void 0 === G.precision || "highp" === G.precision)
            G.precision = E;
          G.id = B++;
          void 0 !== G.Vh &&
            (G.Vh.forEach(function (N, aa) {
              G.g = G.g.replace(N, G.Aa[aa]);
            }),
            G.Vh.splice(0));
          G.Mf = 0;
          G.N.forEach(function (N) {
            G.Mf += 4 * N;
          });
          G.ka = e(R, G.s, "precision " + G.precision + " float;\n" + G.g);
          G.v = {};
          G.i.forEach(function (N) {
            G.v[N] = R.getUniformLocation(G.ka, N);
          });
          G.attributes = {};
          G.ua = [];
          G.G.forEach(function (N) {
            var aa = R.getAttribLocation(G.ka, N);
            G.attributes[N] = aa;
            G.ua.push(aa);
          });
          if (G.u) {
            R.useProgram(G.ka);
            z = G;
            x = G.id;
            for (var V in G.u) R.uniform1i(G.v[V], G.u[V]);
          }
          G.Hb = !0;
        }
        function k(R) {
          bb.ii(ja);
          x !== R.id &&
            (ja.I(),
            (x = R.id),
            (z = R),
            f.useProgram(R.ka),
            R.ua.forEach(function (G) {
              0 !== G && f.enableVertexAttribArray(G);
            }));
        }
        function u(R, G, V) {
          m(R, G, V);
          R.useProgram(G.ka);
          R.enableVertexAttribArray(0);
          x = -1;
          return (z = G);
        }
        function q() {
          return {
            g:
              "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            u: { u1: 0 },
          };
        }
        var K = [],
          x = -1,
          z = null,
          B = 0,
          v = !1,
          E = "highp",
          C = ["u1"],
          A = ["u0"],
          I = { u1: 0 },
          P = { u0: 0 },
          F = { u1: 0, u2: 1 },
          ea = { u3: 0 },
          J = {
            s0: q(),
            s1: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: C,
              u: I,
              precision: "lowp",
            },
            s2: {
              g:
                "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
              i: ["u1", "u2"],
              u: F,
            },
            s3: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
              i: C,
              u: I,
            },
            s4: {
              g:
                "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
              i: ["u1", "u2"],
              u: F,
            },
            s5: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
              i: C,
              u: I,
            },
            s6: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
              i: C,
              u: I,
            },
            s7: {
              g:
                "uniform sampler2D u0;uniform float u4;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u4;}",
              i: ["u0", "u4"],
              u: P,
            },
            s8: {
              g:
                "uniform sampler2D u0;uniform float u4;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u4,f);gl_FragColor=b*g;}",
              i: ["u0", "u4"],
              u: P,
            },
            s9: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
              i: C,
              u: I,
            },
            s10: {
              g:
                "uniform sampler2D u1,u5;uniform float u6;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u5,vv0);gl_FragColor=mix(b,a,u6*f);}",
              i: ["u1", "u5", "u6"],
              u: { u1: 0, u5: 1 },
            },
            s11: {
              g:
                "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u7)+texture2D(u1,vv0+u7*vec2(1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,-1.))+texture2D(u1,vv0+u7*vec2(-1.,1.)));}",
              i: ["u1", "u7"],
              u: I,
            },
            s12: {
              g:
                "uniform sampler2D u1;uniform vec4 u8;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u8);gl_FragColor=j(a);}",
              i: ["u1", "u8"],
              u: I,
            },
            s13: {
              g:
                "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
              i: A,
              u: P,
            },
            s14: {
              g:
                "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
              i: A,
              u: P,
            },
            s15: {
              g:
                "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
              i: A,
              u: P,
            },
            s16: {
              g:
                "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
              i: A,
              u: P,
            },
            s17: {
              g:
                "uniform sampler2D u0,u6,u9;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u6,vv0),d=texture2D(u9,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}",
              i: ["u0", "u6", "u9"],
              u: { u0: 0, u6: 1, u9: 2 },
            },
            s18: {
              g:
                "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
              i: A,
              u: P,
            },
            s19: {
              g:
                "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=log(f+a);gl_FragColor=b;}",
              i: A,
              u: P,
            },
            s20: {
              g:
                "uniform sampler2D u0,u10;uniform float u11;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u10,e);float b=u11*u11;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
              i: ["u0", "u10", "u11"],
              u: { u0: 0, u10: 1 },
            },
            s21: {
              g:
                "uniform sampler2D u1;uniform vec2 u12;varying vec2 vv0;void main(){float a=u12.x*u12.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u12.y),f=floor(u12.x*fract(b*u12.y)),g=(f*u12.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
              i: ["u1", "u12"],
              u: I,
            },
            s22: {
              g:
                "uniform sampler2D u13,u14,u15;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u13,b),f=texture2D(u14,c);gl_FragColor=d*f;}",
              i: ["u13", "u14", "u15"],
              u: { u14: 0, u13: 1, u15: 2 },
            },
            s23: {
              g:
                "uniform float u16;uniform sampler2D u13,u14;varying vec2 vv0;void main(){vec2 a=fract(vv0*u16);vec4 b=texture2D(u13,vv0),c=texture2D(u14,a);gl_FragColor=b*c;}",
              i: ["u14", "u13", "u16"],
              u: { u14: 0, u13: 1 },
            },
            s24: {
              g:
                "uniform float u16;uniform sampler2D u13,u14,u17,u18,u19,u20;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 h=vv0*u16,l=floor(h),c=h-l;vec4 m=texture2D(u13,vv0),d=texture2D(u14,c),a=texture2D(u20,vv0);a=a*255.;vec4 n=texture2D(u17,c),o=texture2D(u18,c),p=texture2D(u19,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b;d=i*d+j*n+k*o+q*p,gl_FragColor=m*d;}",
              i: "u13 u14 u16 u20 u17 u18 u19".split(" "),
              u: { u14: 0, u13: 1, u20: 3, u17: 4, u18: 5, u19: 6 },
            },
            s25: {
              g:
                "uniform sampler2D u13,u14,u21;uniform float u16,u22,u23,u24;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u22*vv0),b=u22*vv0-a;float c=u16/u22;vec2 d=floor(b*c),f=b*c-d,g=(a+f)/u22;float k=u22*u24/u16;vec2 l=k*d,h=(l+f*u23)/u24,i=step(h,j);vec4 m=texture2D(u13,g),n=texture2D(u14,h),o=m*n*i.x*i.y,p=texture2D(u21,g);gl_FragColor=o*u23*u23+p;}",
              i: "u13 u14 u16 u22 u23 u24 u21".split(" "),
              u: { u14: 0, u13: 1, u21: 2 },
            },
            s26: {
              g:
                "uniform sampler2D u13,u14;varying vec2 vv0;void main(){vec4 a=texture2D(u13,vv0),b=texture2D(u14,vv0);gl_FragColor=a*b;}",
              i: ["u13", "u14"],
              u: { u14: 0, u13: 1 },
            },
            s27: {
              g:
                "uniform sampler2D u1,u21;uniform float u25;varying vec2 vv0;void main(){gl_FragColor=texture2D(u21,vv0)+u25*texture2D(u1,vv0);}",
              i: ["u1", "u21", "u25"],
              u: { u1: 0, u21: 1 },
            },
            s28: {
              g:
                "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
              i: C,
              u: I,
              precision: "lowp",
            },
            s29: {
              g:
                "varying vec2 vv0;uniform sampler2D u1;uniform float u26;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u26)).rgb,c=texture2D(u1,vv0+vec2(u26,u26)).rgb,d=texture2D(u1,vv0+vec2(u26,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
              i: ["u1", "u26"],
              u: I,
              precision: "lowp",
            },
            s30: {
              g:
                "varying vec2 vv0;uniform sampler2D u1;uniform float u26;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u26)).rgb,c=texture2D(u1,vv0+vec2(u26,u26)).rgb,d=texture2D(u1,vv0+vec2(u26,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
              i: ["u1", "u26"],
              u: I,
              precision: "lowp",
            },
            s31: {
              g:
                "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u27;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u27,vv0.y-u27))*1.,a-=texture2D(u1,vec2(vv0.x-u27,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u27,vv0.y+u27))*1.,a+=texture2D(u1,vec2(vv0.x+u27,vv0.y-u27))*1.,a+=texture2D(u1,vec2(vv0.x+u27,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u27,vv0.y+u27))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u27,vv0.y-u27))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u27))*2.,b-=texture2D(u1,vec2(vv0.x+u27,vv0.y-u27))*1.,b+=texture2D(u1,vec2(vv0.x-u27,vv0.y+u27))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u27))*2.,b+=texture2D(u1,vec2(vv0.x+u27,vv0.y+u27))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
              i: ["u1", "u2", "u27"],
              u: F,
            },
            s32: {
              g:
                "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u27;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u27,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
              i: ["u1", "u2", "u27"],
              u: F,
            },
            s33: {
              g:
                "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u7*g;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*h),d=texture2D(u3,a+u7*i),j=texture2D(u3,a+u7),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
              i: ["u3", "u7"],
              u: ea,
            },
            s34: {
              g:
                "uniform sampler2D u3;uniform vec2 u7;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u7*k),d=texture2D(u3,a+u7*l),g=texture2D(u3,a+u7),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u7*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u7*m),d=f(a+u7*2.),g=f(a+u7*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
              i: ["u3", "u7"],
              u: ea,
            },
            s35: {
              g:
                "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
              i: ["u1"],
              u: I,
              precision: "lowp",
            },
            s36: {
              g:
                "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u7)+2002./e*texture2D(u1,vv0-2.*u7)+3003./e*texture2D(u1,vv0-u7)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u7)+2002./e*texture2D(u1,vv0+2.*u7)+1001./e*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
              i: ["u7", "u1"],
              u: I,
              precision: "lowp",
            },
            s37: {
              g:
                "uniform sampler2D u1,u28,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u28,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
              i: ["u1", "u28", "u29"],
              u: { u1: 0, u28: 1, u29: 2 },
            },
          },
          p = {
            s38: {
              g:
                "uniform float u16,u30;uniform sampler2D u13,u14,u21;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u21,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u16,xyTo=floor(vv0*u16+eps2);float weightSize=toSparsity*u16;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u16,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u13,uvWeight)*texture2D(u14,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: ["u16", "u13", "u14", "u21", "u30"],
              Aa: ["1.1111", "gl_FragColor\\*=2.2222;"],
            },
            s39: {
              g:
                "uniform float u16,u30,u24;uniform sampler2D u13,u14,u21;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u21,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u24,xyTo=floor(vv0*u16+eps2);float weightSize=fromSparsity*u24;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u16;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u24,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u13,uvWeight)*texture2D(u14,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: "u16 u24 u13 u14 u21 u30".split(" "),
              Aa: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
            },
          },
          y = null,
          X = null,
          ja = {
            Kb: function () {
              return v;
            },
            m: function () {
              if (!v) {
                y = Ka(J, 2);
                X = Ka(p, 2);
                E = "highp";
                for (var R in y) m(f, y[R], R);
                za.set("s0");
                f.enableVertexAttribArray(0);
                v = !0;
              }
            },
            Rf: function (R) {
              R.forEach(function (G) {
                ja.la(G);
              });
            },
            la: function (R) {
              y[R.id] = R;
              m(f, R, R.id);
            },
            Rg: function (R, G, V) {
              G || (G = R);
              y[G] = Object.create(X[R]);
              y[G].cl = !0;
              X[R].Aa &&
                X[R].Aa.forEach(function (N, aa) {
                  y[G].g = y[G].g.replace(new RegExp(N, "g"), V[aa]);
                });
              m(f, y[G], G);
            },
            set: function (R) {
              k(y[R]);
            },
            Qb: function (R) {
              return u(R, q(), "s40");
            },
            od: function (R) {
              return u(
                R,
                {
                  g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                  i: [],
                  precision: "highp",
                },
                "s41"
              );
            },
            hk: function (R) {
              return "undefined" === typeof y[R] ? !1 : y[R].Hb;
            },
            I: function () {
              -1 !== x &&
                ((x = -1),
                z.ua.forEach(function (R) {
                  0 !== R && f.disableVertexAttribArray(R);
                }));
            },
            qd: function () {
              var R = 0;
              z.ua.forEach(function (G, V) {
                V = z.N[V];
                f.vertexAttribPointer(G, V, f.FLOAT, !1, z.Mf, R);
                R += 4 * V;
              });
            },
            Nn: function () {
              f.enableVertexAttribArray(0);
            },
            sc: function () {
              ja.Sb(f);
            },
            Sb: function (R) {
              R.vertexAttribPointer(z.ua[0], 2, R.FLOAT, !1, 8, 0);
            },
            pd: function (R, G) {
              f.uniform1i(z.v[R], G);
            },
            F: function (R, G) {
              f.uniform1f(z.v[R], G);
            },
            S: function (R, G, V) {
              f.uniform2f(z.v[R], G, V);
            },
            ji: function (R, G) {
              f.uniform2fv(z.v[R], G);
            },
            sf: function (R, G) {
              f.uniform3fv(z.v[R], G);
            },
            rf: function (R, G, V, N) {
              f.uniform3f(z.v[R], G, V, N);
            },
            Ao: function (R, G, V, N, aa) {
              f.uniform4f(z.v[R], G, V, N, aa);
            },
            ra: function (R, G) {
              f.uniform4fv(z.v[R], G);
            },
            ym: function (R, G) {
              f.uniformMatrix2fv(z.v[R], !1, G);
            },
            zm: function (R, G) {
              f.uniformMatrix3fv(z.v[R], !1, G);
            },
            rc: function (R, G) {
              f.uniformMatrix4fv(z.v[R], !1, G);
            },
            j: function (R, G) {
              ja.set(R);
              G.forEach(function (V) {
                switch (V.type) {
                  case "4f":
                    f.uniform4fv(z.v[V.name], V.value);
                    break;
                  case "3f":
                    f.uniform3fv(z.v[V.name], V.value);
                    break;
                  case "2f":
                    f.uniform2fv(z.v[V.name], V.value);
                    break;
                  case "1f":
                    f.uniform1f(z.v[V.name], V.value);
                    break;
                  case "1i":
                    f.uniform1i(z.v[V.name], V.value);
                    break;
                  case "mat2":
                    f.uniformMatrix2fv(z.v[V.name], !1, V.value);
                    break;
                  case "mat3":
                    f.uniformMatrix3fv(z.v[V.name], !1, V.value);
                    break;
                  case "mat4":
                    f.uniformMatrix4fv(z.v[V.name], !1, V.value);
                }
              });
            },
            Wn: function () {
              return "lowp";
            },
            L: function () {
              f.disableVertexAttribArray(0);
              ja.I();
              for (var R in y) {
                var G = y[R];
                G.Hb && ((G.Hb = !1), f.deleteProgram(G.ka));
                G.cl && delete y[R];
              }
              K.forEach(function (V) {
                f.deleteShader(V);
              });
              K.splice(0);
              B = 0;
              v = !1;
              z = null;
              x = -1;
            },
          };
        return ja;
      })(),
      f = null,
      Gb = (function () {
        function c(E) {
          console.log("ERROR in ContextFF: ", E);
          return !1;
        }
        function e(E) {
          function C() {
            sb.L();
            I.getExtension("WEBGL_lose_context").loseContext();
          }
          if (
            navigator.userAgent &&
            -1 !== navigator.userAgent.indexOf("forceWebGL1")
          )
            return !1;
          var A = document.createElement("canvas");
          A.setAttribute("width", 1);
          A.setAttribute("height", 1);
          var I = null;
          try {
            I = A.getContext("webgl2", E);
          } catch (P) {
            return !1;
          }
          if (!I) return !1;
          m(I);
          cb.pg(I);
          E = cb.ee(I);
          if (!E.Oa && !E.Pa) return C(), !1;
          E = sb.Yf(I, E);
          C();
          return E ? !0 : !1;
        }
        function m(E) {
          E.clearColor(0, 0, 0, 0);
          E.disable(E.DEPTH_TEST);
          E.disable(E.BLEND);
          E.disable(E.DITHER);
          E.disable(E.STENCIL_TEST);
          E.disable(E.CULL_FACE);
          E.GENERATE_MIPMAP_HINT && E.hint(E.GENERATE_MIPMAP_HINT, E.FASTEST);
          E.disable(E.SAMPLE_ALPHA_TO_COVERAGE);
          E.disable(E.SAMPLE_COVERAGE);
          E.depthFunc(E.LEQUAL);
          E.clearDepth(1);
        }
        var k = null,
          u = null,
          q = null,
          K = null,
          x = !0,
          z = null,
          B = null,
          v = {
            K: function () {
              return k.width;
            },
            Y: function () {
              return k.height;
            },
            ib: function () {
              return k;
            },
            kk: function () {
              return f;
            },
            ha: function () {
              return x;
            },
            flush: function () {
              f.flush();
            },
            rk: function () {
              z || (z = new Uint8Array(k.width * k.height * 4));
              f.readPixels(0, 0, k.width, k.height, f.RGBA, f.UNSIGNED_BYTE, z);
              return z;
            },
            Sn: function () {
              return k.toDataURL("image/jpeg");
            },
            Tn: function () {
              Va.Z();
              u ||
                ((u = document.createElement("canvas")),
                (q = u.getContext("2d")));
              u.width = k.width;
              u.height = k.height;
              for (
                var E = v.rk(),
                  C = q.createImageData(u.width, u.height),
                  A = u.width,
                  I = u.height,
                  P = C.data,
                  F = 0;
                F < I;
                ++F
              )
                for (var ea = I - F - 1, J = 0; J < A; ++J) {
                  var p = 4 * (F * A + J),
                    y = 4 * (ea * A + J);
                  P[p] = E[y];
                  P[p + 1] = E[y + 1];
                  P[p + 2] = E[y + 2];
                  P[p + 3] = E[y + 3];
                }
              q.putImageData(C, 0, 0);
              return u.toDataURL("image/png");
            },
            Dg: function (E) {
              !u &&
                E &&
                ((u = document.createElement("canvas")),
                (q = u.getContext("2d")));
              var C = E ? u : document.createElement("canvas");
              C.width = k.width;
              C.height = k.height;
              (E ? q : C.getContext("2d")).drawImage(k, 0, 0);
              return C;
            },
            m: function (E) {
              E.eg && !E.pa
                ? (k = document.getElementById(E.eg))
                : E.pa && (k = E.pa);
              k || (k = document.createElement("canvas"));
              k.width = E && void 0 !== E.width ? E.width : 512;
              k.height = E && void 0 !== E.height ? E.height : 512;
              "undefined" === typeof E && (E = {});
              void 0 === E.premultipliedAlpha && (E.premultipliedAlpha = !1);
              void 0 === E.Yg && (E.Yg = !0);
              void 0 === E.antialias && (E.antialias = !1);
              if (f) x = f instanceof WebGL2RenderingContext;
              else {
                x = !0;
                var C = {
                  antialias: E.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: E.premultipliedAlpha,
                  stencil: !1,
                  depth: E.Yg,
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                  (C.antialias = !1);
                var A = e(C);
                !A && C.antialias && ((C.antialias = !1), (A = e(C)));
                A && (f = k.getContext("webgl2", C));
                f
                  ? (x = !0)
                  : ((f = k.getContext("webgl", C)) ||
                      (f = k.getContext("experimental-webgl", C)),
                    (x = !1));
              }
              if (!f) return c("WebGL1 and 2 are not enabled");
              (K = f.getExtension("WEBGL_lose_context")) &&
                E.Ah &&
                ((B = E.Ah), k.addEventListener("webglcontextlost", B, !1));
              if (!cb.m()) return c("Not enough GL capabilities");
              m(f);
              za.m();
              ta.m();
              return sb.Yf(f, cb.nk()) ? !0 : c("Cannot filter float textures");
            },
            L: function () {
              f && (cb.L(), sb.L());
              K &&
                B &&
                (k.removeEventListener("webglcontextlost", B, !1),
                (K = B = null));
              f = z = q = u = k = null;
            },
          };
        return v;
      })(),
      bb = (function () {
        function c() {
          null === e &&
            ("undefined" !== typeof za
              ? (e = za)
              : "undefined" !== typeof O && (e = O));
        }
        var e = null;
        c();
        return {
          ii: function (m) {
            e !== m && (e && e.I(), (e = m));
          },
          Kb: function () {
            return e.Kb();
          },
          sc: function () {
            return e.sc();
          },
          Sb: function (m) {
            return e.Sb(m);
          },
          qd: function () {
            return e.qd();
          },
          I: function () {
            return e.I();
          },
          set: function (m) {
            return e.set(m);
          },
          Qb: function (m) {
            c();
            return e.Qb(m);
          },
          od: function (m) {
            c();
            return e.od(m);
          },
          L: function () {
            return e.L();
          },
        };
      })(),
      ra = (function () {
        function c(N) {
          f.bindTexture(f.TEXTURE_2D, N);
        }
        function e(N) {
          var aa = new Uint16Array(N.length);
          N.forEach(function (ba, T) {
            ja[0] = ba;
            var ua = R[0];
            var Ca = (ua >> 16) & 32768;
            ba = (ua >> 12) & 2047;
            var Ja = (ua >> 23) & 255;
            ua =
              103 > Ja
                ? Ca
                : 142 < Ja
                ? Ca | 31744 | ((255 == Ja ? 0 : 1) && ua & 8388607)
                : 113 > Ja
                ? ((ba |= 2048),
                  Ca | ((ba >> (114 - Ja)) + ((ba >> (113 - Ja)) & 1)))
                : (Ca | ((Ja - 112) << 10) | (ba >> 1)) + (ba & 1);
            aa[T] = ua;
          });
          return aa;
        }
        function m() {
          if (null !== G.Ee) return G.Ee;
          var N = k(e([1, 1, 1, 1]));
          return null === N ? !0 : (G.Ee = N);
        }
        function k(N) {
          if (!bb.Kb() || !A) return null;
          var aa = null;
          try {
            var ba = f.getError();
            if ("FUCKING_BIG_ERROR" === ba) return !1;
            aa = V.instance({ isFloat: !1, P: !0, array: N, width: 1 });
            ba = f.getError();
            if (ba !== f.NO_ERROR) return !1;
          } catch (T) {
            return !1;
          }
          Va.Z();
          f.viewport(0, 0, 1, 1);
          f.clearColor(0, 0, 0, 0);
          f.clear(f.COLOR_BUFFER_BIT);
          bb.set("s0");
          aa.zb(0);
          ta.l(!0, !0);
          N = new Uint8Array(4);
          f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, N);
          N = 0.9 < N[0];
          aa.remove();
          Va.ia();
          return N;
        }
        var u = 0,
          q = null,
          K = 0,
          x = null,
          z = null,
          B = null,
          v = null,
          E = null,
          C = null,
          A = !1,
          I = [],
          P = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            ja: null,
            Lg: null,
            al: !1,
            P: !1,
            O: null,
            D: 4,
            Ue: 0,
          },
          F = !1,
          ea = null,
          J = null,
          p = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          y = !1,
          X = !1,
          ja = new Float32Array(1),
          R = new Int32Array(ja.buffer),
          G = { Ee: null, Fe: null },
          V = {
            m: function () {
              A ||
                ((E = [f.RGB, null, f.RGB, f.RGBA]),
                (C = [f.RGB, null, f.RGB, f.RGBA]),
                (q = [
                  f.TEXTURE0,
                  f.TEXTURE1,
                  f.TEXTURE2,
                  f.TEXTURE3,
                  f.TEXTURE4,
                  f.TEXTURE5,
                  f.TEXTURE6,
                  f.TEXTURE7,
                ]),
                (y = "undefined" !== typeof Aa),
                (X = "undefined" !== typeof cb),
                (x = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (v = [f.UNSIGNED_BYTE, f.FLOAT, f.FLOAT]),
                (A = !0));
            },
            Tk: function () {
              if (!z) {
                for (var N = new Float32Array(16384), aa = 0; 16384 > aa; ++aa)
                  N[aa] = 2 * Math.random() - 1;
                z = {
                  random: V.instance({
                    isFloat: !0,
                    isPot: !0,
                    array: N,
                    width: 64,
                  }),
                  vi: V.instance({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0]),
                  }),
                };
              }
              V.Rm();
            },
            Kg: function () {
              return z.vi;
            },
            Rm: function () {
              v[1] = cb.se(f);
            },
            sm: function () {
              C = E = [f.RGBA, f.RGBA, f.RGBA, f.RGBA];
            },
            no: function (N, aa) {
              za.set("s1");
              Va.Z();
              var ba = N.K(),
                T = N.Y();
              f.viewport(0, 0, ba, T);
              N.h(0);
              ta.l(!1, !1);
              f.readPixels(0, 0, ba, T, f.RGBA, f.UNSIGNED_BYTE, aa);
            },
            wg: function (N, aa, ba, T, ua, Ca, Ja) {
              N.activeTexture(N.TEXTURE0);
              var xa = N.createTexture();
              N.bindTexture(N.TEXTURE_2D, xa);
              ua = ua instanceof Float32Array ? ua : new Float32Array(ua);
              0 !== Math.log2(ua.length) % 1 &&
                (N.texParameteri(
                  N.TEXTURE_2D,
                  N.TEXTURE_WRAP_S,
                  N.CLAMP_TO_EDGE
                ),
                N.texParameteri(
                  N.TEXTURE_2D,
                  N.TEXTURE_WRAP_T,
                  N.CLAMP_TO_EDGE
                ));
              N.texParameteri(N.TEXTURE_2D, N.TEXTURE_MAG_FILTER, N.NEAREST);
              N.texParameteri(N.TEXTURE_2D, N.TEXTURE_MIN_FILTER, N.NEAREST);
              N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL, Ca);
              N.texImage2D(
                N.TEXTURE_2D,
                0,
                N.RGBA,
                ba,
                T,
                0,
                N.RGBA,
                N.FLOAT,
                ua
              );
              N.bindTexture(N.TEXTURE_2D, null);
              N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL, !1);
              Ja && (Va.ia(), za.set("s0"));
              N.viewport(0, 0, ba, T);
              N.framebufferTexture2D(
                N.FRAMEBUFFER,
                N.COLOR_ATTACHMENT0,
                N.TEXTURE_2D,
                aa,
                0
              );
              N.bindTexture(N.TEXTURE_2D, xa);
              Ja ? ta.l(!0, !0) : ta.Db(N);
              N.deleteTexture(xa);
              A && ((x[0] = -1), (B = null), (u = 0));
            },
            Kd: function (N) {
              N !== u && (f.activeTexture(q[N]), (u = N));
            },
            instance: function (N) {
              function aa(fa) {
                var pa = f.getError();
                if ("FUCKING_BIG_ERROR" === pa) return !1;
                f.texImage2D(f.TEXTURE_2D, 0, Y, M, na, fa);
                pa = f.getError();
                pa !== f.NO_ERROR &&
                  M !== f.RGBA &&
                  ((M = f.RGBA), f.texImage2D(f.TEXTURE_2D, 0, Y, M, na, fa));
                return !0;
              }
              function ba() {
                if (!h) {
                  c(S);
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, Ma);
                  T.isPot
                    ? (f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_WRAP_S,
                        T.isMirrorX ? f.MIRRORED_REPEAT : f.REPEAT
                      ),
                      f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_WRAP_T,
                        T.isMirrorY ? f.MIRRORED_REPEAT : f.REPEAT
                      ))
                    : (f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_WRAP_S,
                        f.CLAMP_TO_EDGE
                      ),
                      f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_WRAP_T,
                        f.CLAMP_TO_EDGE
                      ));
                  T.isAnisotropicFiltering &&
                    "undefined" !== typeof ia &&
                    f.texParameterf(
                      f.TEXTURE_2D,
                      Aa.tk().TEXTURE_MAX_ANISOTROPY_EXT,
                      ia.Qi
                    );
                  f.texParameteri(
                    f.TEXTURE_2D,
                    f.TEXTURE_MAG_FILTER,
                    T.isLinear ? f.LINEAR : f.NEAREST
                  );
                  T.isLinear
                    ? f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_MIN_FILTER,
                        T.isMipmap && !Pa ? f.NEAREST_MIPMAP_LINEAR : f.LINEAR
                      )
                    : f.texParameteri(
                        f.TEXTURE_2D,
                        f.TEXTURE_MIN_FILTER,
                        T.isMipmap && !Pa ? f.NEAREST_MIPMAP_NEAREST : f.NEAREST
                      );
                  M = E[T.D - 1];
                  Y = C[T.D - 1];
                  na = v[Ca];
                  if (cb.ha()) {
                    var fa = f.RGBA32F;
                    M === f.RGBA && na === f.FLOAT
                      ? T.isMipmap || T.isLinear
                        ? (Y = sb.vk(f))
                        : cb.ca()
                        ? fa && (Y = fa)
                        : (Y = f.RGBA16F || f.RGBA)
                      : M === f.RGB &&
                        na === f.FLOAT &&
                        fa &&
                        ((Y = fa), (M = f.RGBA));
                  }
                  if (
                    (T.P && !T.isFloat) ||
                    (T.isFloat && T.isMipmap && sb.il())
                  )
                    (fa = f.RGBA16F) && (Y = fa), (na = cb.se(f));
                  T.Ue && (qb = T.Ue);
                  T.isSrgb && 4 === T.D && (M = Aa.Kk());
                  if (T.ja) aa(T.ja);
                  else if (T.url) aa(wa);
                  else if (Ba) {
                    fa = Ba;
                    try {
                      "FUCKING_BIG_ERROR" !== f.getError() &&
                        (f.texImage2D(f.TEXTURE_2D, 0, Y, a, b, 0, M, na, fa),
                        f.getError() !== f.NO_ERROR &&
                          (f.texImage2D(
                            f.TEXTURE_2D,
                            0,
                            Y,
                            a,
                            b,
                            0,
                            M,
                            na,
                            null
                          ),
                          f.getError() !== f.NO_ERROR &&
                            f.texImage2D(
                              f.TEXTURE_2D,
                              0,
                              f.RGBA,
                              a,
                              b,
                              0,
                              f.RGBA,
                              f.UNSIGNED_BYTE,
                              null
                            )));
                    } catch (jb) {
                      f.texImage2D(f.TEXTURE_2D, 0, Y, a, b, 0, M, na, null);
                    }
                    T.isKeepArray || (Ba = null);
                  } else
                    (fa = f.getError()),
                      "FUCKING_BIG_ERROR" !== fa &&
                        (f.texImage2D(f.TEXTURE_2D, 0, Y, a, b, 0, M, na, null),
                        (fa = f.getError()),
                        fa !== f.NO_ERROR &&
                          ((M = f.RGBA),
                          T.P &&
                            na !== f.FLOAT &&
                            ((na = f.FLOAT),
                            f.texImage2D(
                              f.TEXTURE_2D,
                              0,
                              Y,
                              a,
                              b,
                              0,
                              M,
                              na,
                              null
                            ))));
                  if (T.isMipmap)
                    if (!Pa && Q) Q.Rc(), (gc = !0);
                    else if (Pa) {
                      fa = Math.log2(Math.min(a, b));
                      Xa = Array(1 + fa);
                      Xa[0] = S;
                      for (var pa = 1; pa <= fa; ++pa) {
                        var Qa = Math.pow(2, pa),
                          Ia = a / Qa;
                        Qa = b / Qa;
                        var Cb = f.createTexture();
                        c(Cb);
                        f.texParameteri(
                          f.TEXTURE_2D,
                          f.TEXTURE_MIN_FILTER,
                          f.NEAREST
                        );
                        f.texParameteri(
                          f.TEXTURE_2D,
                          f.TEXTURE_MAG_FILTER,
                          f.NEAREST
                        );
                        f.texImage2D(
                          f.TEXTURE_2D,
                          0,
                          Y,
                          Ia,
                          Qa,
                          0,
                          M,
                          na,
                          null
                        );
                        c(null);
                        Xa[pa] = Cb;
                      }
                      gc = !0;
                    }
                  c(null);
                  x[u] = -1;
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
                  d = !0;
                  T.O && Q && (T.O(Q), (T.O = null));
                }
              }
              var T = Object.assign({}, P, N),
                ua = K++;
              null === T.isFlipY && (T.isFlipY = T.url || T.array ? !0 : !1);
              T.data &&
                ((T.array =
                  "string" === typeof T.data
                    ? pb(T.data)
                    : T.isFloat
                    ? new Float32Array(T.data)
                    : new Uint8Array(T.data)),
                (T.isFlipY = !1));
              var Ca = 0,
                Ja = T.ja ? !0 : !1,
                xa = null,
                W = null,
                D = !1,
                da = null;
              T.P = T.P || T.isFloat;
              T.P && (Ca = 1);
              T.al ||
                cb.ha() ||
                !T.isFloat ||
                !X ||
                cb.ca() ||
                (T.isFloat = !1);
              T.isFloat && (Ca = 2);
              T.isAnisotropicFiltering &&
                y &&
                !Aa.hl() &&
                (T.isAnisotropicFiltering = !1);
              var S = T.Lg || f.createTexture(),
                wa = null,
                Ba = !1,
                a = 0,
                b = 0,
                d = !1,
                h = !1,
                l = !1,
                n = null,
                r = null,
                w = null,
                H = null,
                Y = null,
                M = null,
                na = null,
                Ma = T.isFlipY,
                Ra = (N = T.P && T.isMipmap) && sb.wj(),
                Pa = N && Ra ? !0 : !1,
                Xa = null,
                qb = -1,
                gc = !1,
                Oa = { ah: !1, Uf: null, xg: null };
              T.width && ((a = T.width), (b = T.height ? T.height : a));
              var Q = {
                get: function () {
                  return S;
                },
                K: function () {
                  return a;
                },
                Y: function () {
                  return b;
                },
                Mk: function () {
                  return T.url;
                },
                gh: function () {
                  return T.isFloat;
                },
                hh: function () {
                  return T.P;
                },
                ho: function () {
                  return T.isLinear;
                },
                Rc: function () {
                  f.generateMipmap(f.TEXTURE_2D);
                },
                pj: function (fa, pa) {
                  Pa
                    ? (fa || (fa = Q.Hg()), V.Kd(pa), c(Xa[fa]), (x[pa] = -1))
                    : Q.h(pa);
                },
                Hg: function () {
                  -1 === qb && (qb = Math.log(a) / Math.log(2));
                  return qb;
                },
                jk: function (fa) {
                  if (Pa) {
                    fa || (fa = Q.Hg());
                    za.set("s11");
                    V.Kd(0);
                    for (var pa = a, Qa = b, Ia = 1; Ia <= fa; ++Ia)
                      (pa /= 2),
                        (Qa /= 2),
                        za.S("u7", 0.25 / pa, 0.25 / Qa),
                        f.viewport(0, 0, pa, Qa),
                        c(Xa[Ia - 1]),
                        f.framebufferTexture2D(
                          Va.Vc(),
                          f.COLOR_ATTACHMENT0,
                          f.TEXTURE_2D,
                          Xa[Ia],
                          0
                        ),
                        ta.l(!1, 1 === Ia);
                    x[0] = -1;
                  } else Q.Rc();
                },
                h: function (fa) {
                  if (!d) return !1;
                  V.Kd(fa);
                  if (x[fa] === ua) return !1;
                  c(S);
                  x[fa] = ua;
                  return !0;
                },
                zb: function (fa) {
                  f.activeTexture(q[fa]);
                  u = fa;
                  c(S);
                  x[fa] = ua;
                },
                o: function () {
                  B = Q;
                  f.framebufferTexture2D(
                    Va.Vc(),
                    f.COLOR_ATTACHMENT0,
                    f.TEXTURE_2D,
                    S,
                    0
                  );
                },
                R: function () {
                  B = Q;
                  f.viewport(0, 0, a, b);
                  f.framebufferTexture2D(
                    Va.Vc(),
                    f.COLOR_ATTACHMENT0,
                    f.TEXTURE_2D,
                    S,
                    0
                  );
                },
                xd: V.xd,
                resize: function (fa, pa) {
                  a = fa;
                  b = pa;
                  ba();
                },
                clone: function (fa) {
                  fa = V.instance({
                    width: a,
                    height: b,
                    P: T.P,
                    isFloat: T.isFloat,
                    isLinear: T.isLinear,
                    isMirrorY: T.isMirrorY,
                    isFlipY: fa ? !Ma : Ma,
                    isPot: T.isPot,
                  });
                  bb.set("s0");
                  Va.ia();
                  fa.o();
                  f.viewport(0, 0, a, b);
                  Q.h(0);
                  ta.l(!0, !0);
                  return fa;
                },
                tc: function () {
                  f.viewport(0, 0, a, b);
                },
                remove: function () {
                  f.deleteTexture(S);
                  h = !0;
                  I.splice(I.indexOf(Q), 1);
                  Q = null;
                },
                refresh: function () {
                  Q.zb(0);
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !0);
                  Ja
                    ? f.texImage2D(f.TEXTURE_2D, 0, Y, M, f.UNSIGNED_BYTE, T.ja)
                    : f.texImage2D(f.TEXTURE_2D, 0, Y, a, b, 0, M, na, Ba);
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
                },
                cg: function () {
                  var fa = a * b * 4;
                  r = [
                    new Uint8Array(fa),
                    new Uint8Array(fa),
                    new Uint8Array(fa),
                    new Uint8Array(fa),
                  ];
                  n = [
                    new Float32Array(r[0].buffer),
                    new Float32Array(r[1].buffer),
                    new Float32Array(r[2].buffer),
                    new Float32Array(r[3].buffer),
                  ];
                  w = new Uint8Array(4 * fa);
                  H = new Float32Array(w.buffer);
                  l = !0;
                },
                Mh: function () {
                  l || Q.cg();
                  f.readPixels(0, 0, a, 4 * b, f.RGBA, f.UNSIGNED_BYTE, w);
                  for (
                    var fa = a * b, pa = 2 * fa, Qa = 3 * fa, Ia = 0;
                    Ia < fa;
                    ++Ia
                  )
                    (n[0][Ia] = H[Ia]),
                      (n[1][Ia] = H[Ia + fa]),
                      (n[2][Ia] = H[Ia + pa]),
                      (n[3][Ia] = H[Ia + Qa]);
                  return n;
                },
                Rl: function () {
                  Oa.ah ||
                    ((Oa.Uf = new Uint8Array(a * b * 4)),
                    (Oa.xg = new Float32Array(Oa.buffer)),
                    (Oa.ah = !0));
                  f.readPixels(0, 0, a, b, f.RGBA, f.UNSIGNED_BYTE, Oa.Uf);
                  return Oa.xg;
                },
                mg: function (fa) {
                  Va.Z();
                  za.set("s12");
                  Q.h(0);
                  if (fa)
                    f.viewport(0, 0, a, b),
                      za.ra("u8", 0.25, 0.25, 0.25, 0.25),
                      ta.l(!1, !0);
                  else
                    for (fa = 0; 4 > fa; ++fa)
                      f.viewport(0, b * fa, a, b),
                        za.ra("u8", p[fa]),
                        ta.l(!1, 0 === fa);
                },
                No: function (fa) {
                  var pa;
                  if ((pa = na === v[0]))
                    null !== G.Fe
                      ? (pa = G.Fe)
                      : ((pa = k(new Uint8Array([255, 255, 255, 255]))),
                        (pa = null === pa ? !0 : (G.Fe = pa))),
                      (pa = !pa);
                  c(S);
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !0);
                  pa
                    ? (D ||
                        ((xa = document.createElement("canvas")),
                        (xa.width = a),
                        (xa.height = b),
                        (W = xa.getContext("2d")),
                        (da = W.createImageData(a, b)),
                        (D = !0)),
                      da.data.set(fa),
                      W.putImageData(da, 0, 0),
                      f.texImage2D(f.TEXTURE_2D, 0, Y, M, na, xa))
                    : f.texImage2D(f.TEXTURE_2D, 0, Y, a, b, 0, M, na, fa);
                  x[u] = ua;
                  Ma && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Oo: function (fa, pa) {
                  c(S);
                  pa && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !0);
                  f.texImage2D(f.TEXTURE_2D, 0, Y, M, na, fa);
                  x[u] = ua;
                  pa && f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1);
                },
                pc: function (fa, pa) {
                  var Qa = a * b,
                    Ia = 4 * Qa;
                  fa = T.P ? (fa ? "RGBE" : "JSON") : "RGBA";
                  pa && (fa = pa);
                  pa = cb.ha() && !1;
                  var Cb = null;
                  switch (fa) {
                    case "RGBE":
                      Cb = "s42";
                      break;
                    case "JSON":
                      Cb = pa ? "s0" : "s12";
                      break;
                    case "RGBA":
                    case "RGBAARRAY":
                      Cb = "s6";
                  }
                  l ||
                    ("RGBA" === fa || "RGBE" === fa || "RGBAARRAY" === fa
                      ? ((r = new Uint8Array(Ia)), (l = !0))
                      : "JSON" !== fa || pa || Q.cg());
                  Va.Z();
                  za.set(Cb);
                  Q.h(0);
                  Ia = null;
                  if ("RGBA" === fa || "RGBE" === fa || "RGBAARRAY" === fa) {
                    f.viewport(0, 0, a, b);
                    ta.l(!0, !0);
                    f.readPixels(0, 0, a, b, f.RGBA, f.UNSIGNED_BYTE, r);
                    if ("RGBAARRAY" === fa) return { data: r };
                    F ||
                      ((ea = document.createElement("canvas")),
                      (J = ea.getContext("2d")),
                      (F = !0));
                    ea.width = a;
                    ea.height = b;
                    Qa = J.createImageData(a, b);
                    Qa.data.set(r);
                    J.putImageData(Qa, 0, 0);
                    Ia = ea.toDataURL("image/png");
                  } else if ("JSON" === fa)
                    if (pa)
                      (Ia = new Float32Array(Qa)),
                        f.viewport(0, 0, a, b),
                        ta.l(!0, !0),
                        f.readPixels(0, 0, a, b, f.RGBA, f.FLOAT, Ia);
                    else {
                      for (Ia = 0; 4 > Ia; ++Ia)
                        f.viewport(0, b * Ia, a, b),
                          za.ra("u8", p[Ia]),
                          ta.l(!Ia, !Ia);
                      Q.Mh();
                      Ia = Array(Qa);
                      for (pa = 0; pa < Qa; ++pa)
                        (Ia[4 * pa] = n[0][pa]),
                          (Ia[4 * pa + 1] = n[1][pa]),
                          (Ia[4 * pa + 2] = n[2][pa]),
                          (Ia[4 * pa + 3] = n[3][pa]);
                    }
                  return {
                    format: fa,
                    data: Ia,
                    width: a,
                    height: b,
                    isMirrorY: T.isMirrorY,
                    isFlipY: "RGBA" === fa ? T.isFlipY : !T.isFlipY,
                  };
                },
              };
              T.isMipmap && !Pa && d && !gc && (Q.Rc(), (gc = !0));
              if (T.url)
                c(S),
                  f.texImage2D(
                    f.TEXTURE_2D,
                    0,
                    f.RGBA,
                    1,
                    1,
                    0,
                    f.RGBA,
                    f.UNSIGNED_BYTE,
                    null
                  ),
                  (wa = new Image()),
                  (wa.Hn = "Anonymous"),
                  (wa.crossOrigin = "Anonymous"),
                  (wa.src = T.url),
                  (wa.onload = function () {
                    a = wa.width;
                    b = wa.height;
                    ba();
                  });
              else if (T.ja) {
                var sa = function () {
                  a = void 0 !== T.ja.videoWidth ? T.ja.videoWidth : T.ja.width;
                  b =
                    void 0 !== T.ja.videoHeight
                      ? T.ja.videoHeight
                      : T.ja.height;
                  a ? ba() : setTimeout(sa, 1);
                };
                sa();
              } else
                T.array
                  ? (T.P && !T.isFloat
                      ? T.array instanceof Uint16Array
                        ? ((Ba = T.array), ba())
                        : m()
                        ? ((Ba = e(T.array)), ba())
                        : (ba(), V.wg(f, S, Q.K(), Q.Y(), T.array, Ma, !0))
                      : ((Ba = T.isFloat
                          ? T.array instanceof Float32Array
                            ? T.array
                            : new Float32Array(T.array)
                          : T.array instanceof Uint8Array
                          ? T.array
                          : new Uint8Array(T.array)),
                        ba()),
                    T.isKeepArray ||
                      (Ba && Ba !== T.array && (Ba = null), delete T.array))
                  : T.Lg || ba();
              Q.Zn = Q.K;
              T.O && d && (T.O(Q), (T.O = null));
              I.push(Q);
              return Q;
            },
            Z: function (N) {
              N !== u && (f.activeTexture(q[N]), (u = N));
              x[N] = -1;
              c(null);
            },
            qj: function (N) {
              z.random.h(N);
            },
            xd: function () {
              B = null;
              f.framebufferTexture2D(
                Va.Vc(),
                f.COLOR_ATTACHMENT0,
                f.TEXTURE_2D,
                null,
                0
              );
            },
            reset: function () {
              for (var N = 0; N < q.length; ++N) x[N] = -1;
              u = -1;
            },
            qo: function () {
              u = -1;
            },
            wi: function () {
              for (var N = 0; N < q.length; ++N) V.Z(N);
            },
            J: function () {
              z && (z.random.remove(), z.vi.remove());
            },
            wc: function (N, aa) {
              if ("RGBA" === N.format || "RGBE" === N.format) {
                var ba = new Image();
                ba.src = N.data;
                ba.onload = function () {
                  V.instance({
                    isMirrorY: N.isMirrorY,
                    isFlipY: N.isFlipY,
                    isFloat: !1,
                    ja: ba,
                    O: function (T) {
                      if ("RGBA" === N.format) aa(T);
                      else {
                        var ua = N.width,
                          Ca = N.height,
                          Ja = V.instance({
                            isMirrorY: N.isMirrorY,
                            isFloat: !0,
                            width: ua,
                            height: Ca,
                            isFlipY: N.isFlipY,
                          });
                        Va.ia();
                        f.viewport(0, 0, ua, Ca);
                        za.set("s43");
                        Ja.o();
                        T.h(0);
                        ta.l(!0, !0);
                        V.Z(0);
                        aa(Ja);
                        f.flush();
                        setTimeout(T.remove, 50);
                      }
                    },
                  });
                };
              } else
                "JSON" === N.format
                  ? aa(
                      V.instance({
                        isFloat: !0,
                        isFlipY: N.isFlipY,
                        width: N.width,
                        height: N.height,
                        array: new Float32Array(N.data),
                      })
                    )
                  : aa(!1);
            },
            L: function () {
              B && (Va.ia(), V.xd(), Va.Z());
              V.wi();
              I.slice(0).forEach(function (N) {
                N.remove();
              });
              I.splice(0);
              A = !1;
              K = 0;
              "undefined" !== typeof sb && sb.L();
              z = null;
            },
          };
        return V;
      })(),
      zc = {
        instance: function (c) {
          var e = [ra.instance(c), ra.instance(c)],
            m = [e[1], e[0]],
            k = m,
            u = {
              um: function (q) {
                k[1].o();
                k[0].h(q);
                u.mi();
              },
              zo: function (q) {
                k[1].R();
                k[0].h(q);
                u.mi();
              },
              mi: function () {
                k = k === e ? m : e;
              },
              refresh: function () {
                k[0].refresh();
                k[1].refresh();
              },
              h: function (q) {
                k[0].h(q);
              },
              xn: function (q) {
                k[1].h(q);
              },
              Vn: function () {
                return k[0];
              },
              remove: function () {
                k[0].remove();
                k[1].remove();
                k = null;
              },
            };
          return u;
        },
      },
      ta = (function () {
        function c(z) {
          var B = { fa: null, U: null };
          B.fa = z.createBuffer();
          z.bindBuffer(z.ARRAY_BUFFER, B.fa);
          z.bufferData(
            z.ARRAY_BUFFER,
            new Float32Array([-1, -1, 3, -1, -1, 3]),
            z.STATIC_DRAW
          );
          B.U = z.createBuffer();
          z.bindBuffer(z.ELEMENT_ARRAY_BUFFER, B.U);
          z.bufferData(
            z.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2]),
            z.STATIC_DRAW
          );
          return B;
        }
        var e = null,
          m = 0,
          k = !1,
          u = [],
          q = -2,
          K = -2,
          x = {
            reset: function () {
              K = q = -2;
            },
            m: function () {
              k || ((e = c(f)), x.Nd(), (k = !0));
            },
            instance: function (z) {
              var B = m++,
                v = z.U ? z.U.length : 0,
                E = "undefined" === typeof z.mode ? f.STATIC_DRAW : z.mode,
                C = f.createBuffer();
              f.bindBuffer(f.ARRAY_BUFFER, C);
              f.bufferData(
                f.ARRAY_BUFFER,
                z.fa instanceof Float32Array ? z.fa : new Float32Array(z.fa),
                E
              );
              q = B;
              var A = null,
                I = null,
                P = null;
              if (z.U) {
                A = f.createBuffer();
                f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, A);
                var F = null;
                65536 > z.U.length
                  ? ((F = Uint16Array), (I = f.UNSIGNED_SHORT), (P = 2))
                  : ((F = Uint32Array), (I = f.UNSIGNED_INT), (P = 4));
                F = z.U instanceof F ? z.U : new F(z.U);
                f.bufferData(f.ELEMENT_ARRAY_BUFFER, F, E);
                K = B;
              }
              var ea = {
                ec: function (J) {
                  q !== B && (f.bindBuffer(f.ARRAY_BUFFER, C), (q = B));
                  J && bb.qd();
                },
                nj: function () {
                  K !== B && (f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, A), (K = B));
                },
                bind: function (J) {
                  ea.ec(J);
                  ea.nj();
                },
                V: function () {
                  f.drawElements(f.TRIANGLES, v, I, 0);
                },
                Ea: function (J, p) {
                  f.drawElements(f.TRIANGLES, J, I, p * P);
                },
                remove: function () {
                  f.deleteBuffer(C);
                  z.U && f.deleteBuffer(A);
                  ea = null;
                },
              };
              u.push(ea);
              return ea;
            },
            Nd: function () {
              -1 !== q && (f.bindBuffer(f.ARRAY_BUFFER, e.fa), (q = -1));
              -1 !== K && (f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, e.U), (K = -1));
            },
            l: function (z, B) {
              z && ta.Nd();
              B && bb.sc();
              f.drawElements(f.TRIANGLES, 3, f.UNSIGNED_SHORT, 0);
            },
            Db: function (z) {
              z = z || f;
              var B = c(z);
              z.bindBuffer(z.ARRAY_BUFFER, B.fa);
              z.bindBuffer(z.ELEMENT_ARRAY_BUFFER, B.U);
              bb.Sb(z);
              z.drawElements(z.TRIANGLES, 3, z.UNSIGNED_SHORT, 0);
              z.deleteBuffer(B.fa);
              z.deleteBuffer(B.U);
              x.reset();
              k && (x.Nd(), bb.sc());
            },
            J: function () {
              var z = f,
                B = e;
              z.deleteBuffer(B.fa);
              z.deleteBuffer(B.U);
            },
            L: function () {
              x.J();
              u.forEach(function (z) {
                z.remove();
              });
              f.bindBuffer(f.ARRAY_BUFFER, null);
              f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, null);
              x.reset();
              k = !1;
              u.splice(0);
              m = 0;
            },
          };
        return x;
      })(),
      Va = (function () {
        var c = null,
          e = null,
          m = null,
          k = !1,
          u = [],
          q = { ga_: -2, vg: 1 },
          K = {
            Kb: function () {
              return k;
            },
            m: function () {
              if (!k) {
                c = f.createFramebuffer();
                var x = cb.ha();
                e =
                  x && f.DRAW_FRAMEBUFFER ? f.DRAW_FRAMEBUFFER : f.FRAMEBUFFER;
                m =
                  x && f.READ_FRAMEBUFFER ? f.READ_FRAMEBUFFER : f.FRAMEBUFFER;
                k = !0;
              }
            },
            uk: function () {
              return e;
            },
            Eg: function () {
              return m;
            },
            Vc: function () {
              return f.FRAMEBUFFER;
            },
            Yn: function () {
              return q;
            },
            Qn: function () {
              return c;
            },
            instance: function (x) {
              void 0 === x.jc && (x.jc = !1);
              var z = x.Ka ? x.Ka : null,
                B = x.width,
                v = void 0 !== x.height ? x.height : x.width,
                E = c,
                C = null,
                A = !1,
                I = !1,
                P = 0;
              z && ((B = B ? B : z.K()), (v = v ? v : z.Y()));
              var F = {
                Wh: function () {
                  A || ((E = f.createFramebuffer()), (A = !0), (P = q.vg++));
                },
                Dc: function () {
                  F.Wh();
                  F.o();
                  C = f.createRenderbuffer();
                  f.bindRenderbuffer(f.RENDERBUFFER, C);
                  f.renderbufferStorage(
                    f.RENDERBUFFER,
                    f.DEPTH_COMPONENT16,
                    B,
                    v
                  );
                  f.framebufferRenderbuffer(
                    e,
                    f.DEPTH_ATTACHMENT,
                    f.RENDERBUFFER,
                    C
                  );
                  f.clearDepth(1);
                },
                bind: function (ea, J) {
                  P !== q.ga_ && (f.bindFramebuffer(e, E), (q.ga_ = P));
                  z && z.o();
                  J && f.viewport(0, 0, B, v);
                  ea && f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                },
                Tf: function () {
                  P !== q.ga_ && (f.bindFramebuffer(e, E), (q.ga_ = P));
                },
                clear: function () {
                  f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                },
                Vd: function () {
                  f.clear(f.COLOR_BUFFER_BIT);
                },
                $f: function () {
                  f.clear(f.DEPTH_BUFFER_BIT);
                },
                tc: function () {
                  f.viewport(0, 0, B, v);
                },
                o: function () {
                  P !== q.ga_ && (f.bindFramebuffer(e, E), (q.ga_ = P));
                },
                rtt: function (ea) {
                  z = ea;
                  q.ga_ !== P &&
                    (f.bindFramebuffer(f.FRAMEBUFFER, E), (q.ga_ = P));
                  ea.o();
                },
                Z: function () {
                  f.bindFramebuffer(e, null);
                  q.ga_ = -1;
                },
                resize: function (ea, J) {
                  B = ea;
                  v = J;
                  C &&
                    (f.bindRenderbuffer(f.RENDERBUFFER, C),
                    f.renderbufferStorage(
                      f.RENDERBUFFER,
                      f.DEPTH_COMPONENT16,
                      B,
                      v
                    ));
                },
                remove: function () {
                  E === c ||
                    I ||
                    (f.bindFramebuffer(e, E),
                    f.framebufferTexture2D(
                      e,
                      f.COLOR_ATTACHMENT0,
                      f.TEXTURE_2D,
                      null,
                      0
                    ),
                    C &&
                      f.framebufferRenderbuffer(
                        e,
                        f.DEPTH_ATTACHMENT,
                        f.RENDERBUFFER,
                        null
                      ),
                    f.bindFramebuffer(e, null),
                    f.deleteFramebuffer(E),
                    C && f.deleteRenderbuffer(C));
                  I = !0;
                },
              };
              x.jc && F.Dc();
              u.push(F);
              return F;
            },
            Z: function () {
              f.bindFramebuffer(e, null);
              q.ga_ = -1;
            },
            Ko: function () {
              f.bindFramebuffer(e, null);
              f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
              f.viewport(0, 0, cb.K(), cb.Y());
              q.ga_ = -1;
            },
            reset: function () {
              q.ga_ = -2;
            },
            ia: function () {
              0 !== q.ga_ && (f.bindFramebuffer(e, c), (q.ga_ = 0));
            },
            clear: function () {
              f.viewport(0, 0, cb.K(), cb.Y());
              f.clear(f.COLOR_BUFFER_BIT);
            },
            L: function () {
              K.Z();
              u.forEach(function (x) {
                x.remove();
              });
              f.deleteFramebuffer(c);
              K.reset();
              k = !1;
              u.splice(0);
              q.ga_ = -2;
              q.vg = 1;
            },
          };
        return K;
      })(),
      cb = (function () {
        function c() {
          m = "undefined" === typeof Gb ? Aa : Gb;
          k = !0;
        }
        function e(v, E) {
          for (var C = 0; C < v.length; ++C) {
            var A = E.getExtension(v[C]);
            if (A) return A;
          }
          return null;
        }
        var m = null,
          k = !1,
          u = {
            Zg: !1,
            Bf: null,
            Cf: null,
            dh: !1,
            fl: !1,
            Df: null,
            eh: !1,
            Ef: null,
            $g: !1,
            Wd: null,
            Zk: !1,
            Xd: null,
            $k: !1,
          },
          q = null,
          K = { Oa: !0, Pa: !0, me: !0 },
          x = null,
          z = "undefined" === typeof window ? {} : window,
          B = {
            m: function () {
              if (k) return !0;
              q = Object.assign({}, u);
              x = Object.assign({}, K);
              k || c();
              var v = f;
              if (!q.Zg) {
                q.Bf = B.sg(v);
                z.GL_EXT_FLOAT = q.Bf;
                q.dh = q.Bf ? !0 : !1;
                if (q.dh || B.ha())
                  (q.Cf = B.tg(v)),
                    (q.fl = q.Cf ? !0 : !1),
                    (z.GL_EXT_FLOATLINEAR = q.Cf);
                q.Zg = !0;
              }
              if (!q.$g) {
                q.Df = B.Pc(v);
                q.Df && ((q.eh = !0), (z.GL_EXT_HALFFLOAT = q.Df));
                if (q.eh || B.ha())
                  (q.Ef = B.ug(v)), (z.GL_EXT_HALFFLOATLINEAR = q.Ef);
                q.eo = q.Ef ? !0 : !1;
                q.$g = !0;
              }
              q.Wd = B.qg(v);
              q.Zk = q.Wd ? !0 : !1;
              z.GL_EXT_COLORBUFFERFLOAT = q.Wd;
              q.Xd = B.rg(v);
              q.$k = q.Xd ? !0 : !1;
              z.GL_EXT_COLORBUFFERHALFFLOAT = q.Xd;
              Va.m();
              ra.m();
              if (!B.Nj()) return !1;
              ta.m();
              ra.Tk();
              return !0;
            },
            K: function () {
              k || c();
              return m.K();
            },
            Y: function () {
              k || c();
              return m.Y();
            },
            ha: function () {
              k || c();
              return m.ha();
            },
            pg: function (v) {
              B.qg(v);
              B.rg(v);
              B.sg(v);
              B.tg(v);
              B.Pc(v);
              B.ug(v);
            },
            qg: e.bind(null, [
              "EXT_color_buffer_float",
              "WEBGL_color_buffer_float",
              "OES_color_buffer_float",
            ]),
            rg: e.bind(null, [
              "EXT_color_buffer_half_float",
              "WEBGL_color_buffer_half_float",
              "OES_color_buffer_half_float",
            ]),
            sg: e.bind(null, [
              "OES_texture_float",
              "MOZ_OES_texture_float",
              "WEBKIT_OES_texture_float",
            ]),
            tg: e.bind(null, [
              "OES_texture_float_linear",
              "MOZ_OES_texture_float_linear",
              "WEBKIT_OES_texture_float_linear",
            ]),
            Pc: e.bind(null, [
              "OES_texture_half_float",
              "MOZ_OES_texture_half_float",
              "WEBKIT_OES_texture_half_float",
            ]),
            ug: e.bind(null, [
              "OES_texture_half_float_linear",
              "MOZ_OES_texture_half_float_linear",
              "WEBKIT_OES_texture_half_float_linear",
            ]),
            se: function (v) {
              var E = B.Pc(v);
              return E && E.HALF_FLOAT_OES
                ? E.HALF_FLOAT_OES
                : v.HALF_FLOAT || v.FLOAT;
            },
            nk: function () {
              return x;
            },
            ca: function () {
              return x.Oa;
            },
            Cn: function () {
              return x.Pa;
            },
            vj: function () {
              return x.me;
            },
            wd: function (v, E, C) {
              function A() {
                v.bindTexture(v.TEXTURE_2D, null);
                v.bindFramebuffer(I, null);
                v.deleteTexture(ea);
                v.deleteFramebuffer(F);
              }
              var I = v.FRAMEBUFFER,
                P = v.NEAREST,
                F = v.createFramebuffer();
              v.bindFramebuffer(I, F);
              var ea = v.createTexture();
              v.bindTexture(v.TEXTURE_2D, ea);
              v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL, !1);
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, P);
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, P);
              v.texImage2D(v.TEXTURE_2D, 0, E, 1, 1, 0, v.RGBA, C, null);
              v.framebufferTexture2D(
                v.FRAMEBUFFER,
                v.COLOR_ATTACHMENT0,
                v.TEXTURE_2D,
                ea,
                0
              );
              if (
                v.checkFramebufferStatus(
                  v.READ_FRAMEBUFFER || v.FRAMEBUFFER
                ) !== v.FRAMEBUFFER_COMPLETE
              )
                return A(), !1;
              bb.od(v);
              v.clearColor(0, 0, 0, 0);
              v.viewport(0, 0, 1, 1);
              v.disable(v.DEPTH_TEST);
              v.clear(v.COLOR_BUFFER_BIT);
              ta.Db(v);
              v.bindFramebuffer(I, null);
              bb.Qb(v);
              v.activeTexture(v.TEXTURE0);
              v.bindTexture(v.TEXTURE_2D, ea);
              ta.Db(v);
              E = new Uint8Array(4);
              v.readPixels(0, 0, 1, 1, v.RGBA, v.UNSIGNED_BYTE, E);
              A();
              return 3 < Math.abs(E[0] - 127) ? !1 : !0;
            },
            ee: function (v) {
              var E = { Oa: !1, Pa: !1 };
              v.disable(v.BLEND);
              v.clearColor(0, 0, 0, 0);
              v.clear(v.COLOR_BUFFER_BIT);
              v.RGBA32F && B.wd(v, v.RGBA32F, v.FLOAT) && (E.Oa = !0);
              !E.Oa && B.wd(v, v.RGBA, v.FLOAT) && (E.Oa = !0);
              var C = B.se(v);
              v.RGBA16F && B.wd(v, v.RGBA16F, C) && (E.Pa = !0);
              !E.Pa && B.wd(v, v.RGBA, C) && (E.Pa = !0);
              return E;
            },
            Pj: function () {
              var v = Va.instance({ width: 1 });
              v.Wh();
              var E = ra.instance({ width: 1, isFloat: !0, D: 3 });
              v.o();
              E.o();
              f.flush();
              f.checkFramebufferStatus(Va.Eg()) !== f.FRAMEBUFFER_COMPLETE
                ? (ra.sm(), (x.me = !1))
                : (x.me = !0);
              v.remove();
              E.remove();
            },
            Nj: function () {
              var v = B.ee(f);
              Object.assign(x, v);
              if (!x.Oa && !x.Pa) return !1;
              B.Pj();
              return !0;
            },
            L: function () {
              ra.L();
              bb.L();
              Va.L();
              ta.L();
              k = !1;
            },
          };
        return B;
      })(),
      sb = (function () {
        function c(J, p, y, X) {
          A.texParameteri(
            A.TEXTURE_2D,
            A.TEXTURE_MIN_FILTER,
            X ? A.NEAREST_MIPMAP_NEAREST : A.LINEAR
          );
          var ja = null;
          if (null !== y)
            try {
              ja = A.getError();
              if ("FUCKING_BIG_ERROR" === ja) return !1;
              A.texImage2D(A.TEXTURE_2D, 0, J, 2, 2, 0, A.RGBA, p, y);
              ja = A.getError();
              if (ja !== A.NO_ERROR) return !1;
            } catch (R) {
              return !1;
            }
          X && A.generateMipmap(A.TEXTURE_2D);
          A.clear(A.COLOR_BUFFER_BIT);
          ta.Db(A);
          ja = A.getError();
          if ("FUCKING_BIG_ERROR" === ja) return !1;
          A.readPixels(0, 0, 1, 1, A.RGBA, A.UNSIGNED_BYTE, v);
          ja = A.getError();
          ja === A.INVALID_OPERATION &&
            "undefined" !== typeof A.PIXEL_PACK_BUFFER &&
            (A.bindBuffer(A.PIXEL_PACK_BUFFER, null),
            A.readPixels(0, 0, 1, 1, A.RGBA, A.UNSIGNED_BYTE, v),
            (ja = A.getError()));
          if (ja !== A.NO_ERROR) return !1;
          if ((y = 0 !== v[0])) (z.Ih = p), (z.Wg = J);
          return y;
        }
        function e(J, p) {
          return I.Oa && c(J, A.FLOAT, new Float32Array(C), p)
            ? ((x = K.Pf), !0)
            : !1;
        }
        function m(J, p, y) {
          if (!I.Pa) return !1;
          var X = cb.Pc(A);
          if (
            (X &&
              X.HALF_FLOAT_OES &&
              c(J, X.HALF_FLOAT_OES, new Uint16Array(C), p)) ||
            (A.HALF_FLOAT && c(J, A.HALF_FLOAT, new Uint16Array(C), p)) ||
            c(J, A.FLOAT, new Float32Array(C), p)
          )
            return (x = K.ac), !0;
          A.bindTexture(A.TEXTURE_2D, y);
          A.texImage2D(
            A.TEXTURE_2D,
            0,
            A.RGBA,
            1,
            1,
            0,
            A.RGBA,
            A.UNSIGNED_BYTE,
            null
          );
          A.bindFramebuffer(z.Lc, ea);
          ra.wg(A, y, 1, 1, new Float32Array(C), !1, !1);
          A.bindFramebuffer(z.Lc, null);
          A.bindTexture(A.TEXTURE_2D, y);
          return c(J, null, null, p) ? ((x = K.ac), !0) : !1;
        }
        function k(J, p, y) {
          B = !0;
          if (m(J, !0, y) || e(p, !0)) return !0;
          B = !1;
          return m(J, !1, y) || e(p, !1) ? !0 : !1;
        }
        function u(J) {
          if (x === K.I) {
            A = J || f;
            x = K.RGBA8;
            B = !0;
            cb.pg(A);
            I || (I = cb.ee(A));
            Va.reset();
            ea = A.createFramebuffer();
            z.Lc = A.DRAW_FRAMEBUFFER || A.FRAMEBUFFER;
            A.bindFramebuffer(z.Lc, null);
            A.clearColor(0, 0, 0, 0);
            A.viewport(0, 0, 1, 1);
            za.I();
            P = za.Qb(A);
            J = A.createTexture();
            A.activeTexture(A.TEXTURE0);
            A.bindTexture(A.TEXTURE_2D, J);
            A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_S, A.REPEAT);
            A.texParameteri(A.TEXTURE_2D, A.TEXTURE_WRAP_T, A.REPEAT);
            A.texParameteri(A.TEXTURE_2D, A.TEXTURE_MAG_FILTER, A.NEAREST);
            F = J;
            var p = (J = A.RGBA),
              y = A.RGBA16F,
              X = A.RGBA32F;
            X && (J = X);
            y && (p = y);
            if ((y || X) && k(p, J, F)) return q(), !0;
            J = p = A.RGBA;
            if (k(p, J, F)) return q(), !0;
            x = K.RGBA8;
            q();
            return !1;
          }
        }
        function q() {
          A.deleteProgram(P.ka);
          A.deleteTexture(F);
          F = P = null;
        }
        var K = { I: -1, Pf: 3, ac: 2, RGBA8: 0 },
          x = K.I,
          z = { Ih: null, Wg: null, Lc: null },
          B = !0,
          v = new Uint8Array(4),
          E = [0.8, 1, 0.8, 1],
          C = [].concat(E, E, E, E),
          A = null,
          I = null,
          P = null,
          F = null,
          ea = null;
        return {
          wj: function (J) {
            u(J);
            return B;
          },
          Yf: function (J, p) {
            x === K.I && (typeof ("undefined" !== p) && (I = p), u(J));
            return x !== K.RGBA8;
          },
          fo: function (J) {
            u(J);
            return x === K.Pf;
          },
          il: function (J) {
            u(J);
            return x === K.ac;
          },
          Un: function (J) {
            u(J);
            return z.Ih;
          },
          vk: function (J) {
            u(J);
            return z.Wg;
          },
          L: function () {
            A = null;
            B = !0;
            x = K.I;
            I = null;
          },
        };
      })(),
      ya = {
        instance: function (c) {
          var e = ra.instance(c.alpha),
            m = ra.instance(c.beta);
          return {
            Xj: function () {
              e.h(1);
              m.h(2);
            },
          };
        },
      },
      nb = {
        instance: function (c) {
          var e = null,
            m = !1,
            k = !1,
            u = null,
            q = !1,
            K = !1,
            x = null,
            z = "undefined" === typeof c.preprocessing ? !1 : c.preprocessing,
            B =
              "undefined" === typeof c.preprocessingSize
                ? c.size
                : c.preprocessingSize;
          c.mask &&
            ((m = !0),
            U && void 0 !== U.$ && (c.mask = U.$ + c.mask),
            (e = ra.instance({ isFloat: !1, url: c.mask })));
          var v = !1;
          c.customInputShader &&
            ((v = "s44"),
            za.la({
              name: "_",
              id: v,
              g: c.customInputShader,
              Lo: ["uSource"],
              precision: "lowp",
            }),
            za.j(v, [{ type: "1i", name: "_", value: 0 }]));
          switch (z) {
            case "sobel":
              x = "s31";
              q = !0;
              break;
            case "meanNormalization":
              x = "s32";
              q = !0;
              break;
            case "grayScale":
              x = "s28";
              q = !1;
              break;
            case "grayScaleTilt":
              x = "s29";
              K = !0;
              q = !1;
              break;
            case "rgbGrayTilt":
              x = "s30";
              K = !0;
              q = !1;
              break;
            case "copy":
              x = v ? v : "s0";
              break;
            case "inputLightRegulation":
              x = v ? v : "s28";
              u = uc.instance({ Vg: B, Ch: c.size, vh: c.nBlurPass, gl: !1 });
              k = !0;
              break;
            case "direct":
            case "none":
              x = !1;
              break;
            default:
              x = "s3";
          }
          K && za.j(x, [{ name: "u26", type: "1f", value: c.tilt }]);
          m && (x += "Mask");
          var E = ra.instance({ isFloat: !1, isPot: !1, width: c.size }),
            C = {
              K: function () {
                return B;
              },
              te: function () {
                return C.K();
              },
              Ak: function () {
                return k ? u.Jg() : E;
              },
              wa: function () {
                Va.ia();
                x &&
                  (za.set(x),
                  q && za.F("u27", 1 / c.size),
                  E.R(),
                  m && e.h(1),
                  ta.l(!1, !1),
                  E.h(0),
                  k && u.process(E));
              },
              L: function () {
                E.remove();
                m && e.remove();
              },
            };
          return C;
        },
      },
      Fb = {
        instance: function (c) {
          "undefined" === typeof c.normalize && (c.normalize = !1);
          var e = {
              input: null,
              Ec: null,
              He: null,
              Ha: null,
              ed: null,
              Ze: null,
              $e: null,
            },
            m = null,
            k = [],
            u = [],
            q = !1,
            K = null,
            x = !0,
            z = -1,
            B = c.isReorganize ? c.isReorganize : !1,
            v = c.kernelsCount ? !0 : !1,
            E = c.dynPelu ? ya.instance(c.dynPelu) : !1,
            C = E ? !0 : !1,
            A = { isEnabled: !1 };
          c.dl
            ? ((c.sparsity =
                "undefined" !== typeof c.sparsity ? c.sparsity : c.jd.te()),
              (x = !1))
            : "full" === c.connectivityUp && (c.sparsity = c.jd.te());
          var I = {
              elu: "s15",
              elu01: "s16",
              relu: "s14",
              arctan: "s18",
              sigmoid: "s13",
              copy: "s0",
              softplus: "s19",
              dynPelu: "s17",
            }[c.activation],
            P = c.sparsity * c.sparsity,
            F = !1,
            ea = c.size,
            J = "";
          if (c.maxPooling) {
            switch (c.maxPooling.size) {
              case 2:
                J = "s33";
                break;
              case 4:
                J = "s34";
            }
            F = !0;
            ea /= c.maxPooling.size;
            e.Ze = ra.instance({ isFloat: !0, isPot: !1, width: ea });
          }
          var p = void 0 !== c.Dl && c.Dl ? !0 : !1,
            y = null,
            X = null,
            ja = null;
          if (p) {
            y = "s45" + c.index.toString();
            za.Rg("s45", y, [((c.normalization.n - 1) / 2).toFixed(1)]);
            za.j(y, [
              { type: "1i", name: "u1", value: 0 },
              { type: "2f", name: "u7", value: [1 / c.size, 1 / c.size] },
              { type: "1f", name: "u6", value: c.normalization.alpha },
              { type: "1f", name: "u9", value: c.normalization.beta },
              { type: "1f", name: "u31", value: c.normalization.k },
            ]);
            var R = { isFloat: !0, isPot: !0, width: c.size };
            X = ra.instance(R);
            ja = ra.instance(R);
          }
          var G = -1,
            V = null;
          x && (e.Ha = ra.instance({ isFloat: !0, isPot: !1, width: c.size }));
          e.Ec = ra.instance(c.bias);
          var N = {
            K: function () {
              return c.size;
            },
            te: function () {
              return ea;
            },
            Bg: function () {
              return c.classesCount;
            },
            oj: function (aa) {
              m.h(aa);
            },
            Nl: function () {
              c.remap &&
                c.remap.isEnabled &&
                (A = {
                  isEnabled: !0,
                  xl: ra.instance({
                    isFloat: !1,
                    isFlipY: !1,
                    array: new Uint8Array(c.remap.maskTexture.data),
                    width: c.remap.maskTexture.width,
                    isPot: !1,
                  }),
                  Zc: c.remap.layers.map(function (aa) {
                    return c.parent.xk(aa);
                  }),
                  depth: c.remap.depth,
                });
            },
            tm: function () {
              switch (c.connectivityUp) {
                case "direct":
                  V = ic.instance(c.connectivity);
                  break;
                case "square":
                  V = g.instance(c.connectivity);
                  break;
                case "squareFast":
                  V = Hc.instance(c.connectivity, c.activation);
                  break;
                case "full":
                  V = Wa.instance(c.connectivity);
                  break;
                case "conv":
                  (z = c.kernelsCount),
                    (V = Ec.instance(c.connectivity)),
                    B &&
                      (e.ed = ra.instance({
                        width: ea,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1,
                      }));
              }
              if (V.Wb) {
                var aa = c.size * c.sparsity;
                G = Math.log(aa / c.size) / Math.log(2);
                e.input = ra.instance({
                  isMipmap: !0,
                  isFloat: !0,
                  isPot: !0,
                  width: aa,
                  Ue: G,
                });
                e.He = ra.instance({ isFloat: !0, isPot: !0, width: c.size });
              }
            },
            wa: function (aa) {
              m = aa;
              V.Wb
                ? (e.input.R(),
                  v && e.Ec.h(2),
                  V.wa(A),
                  e.input.h(0),
                  e.input.jk(G),
                  e.He.R(),
                  v ? za.set("s0") : (za.set("s27"), za.F("u25", P), e.Ec.h(1)),
                  e.input.pj(G, 0),
                  ta.l(!1, !1),
                  za.set(I),
                  p ? X.o() : e.Ha.o(),
                  e.He.h(0),
                  C && E.Xj(),
                  ta.l(!1, !1))
                : (e.Ha.R(), e.Ec.h(1), V.wa());
              p &&
                (za.set(y),
                ja.o(),
                X.h(0),
                ta.l(!1, !1),
                za.set("s46"),
                za.F("u6", 1),
                e.Ha.o(),
                ja.h(1),
                ta.l(!1, !1));
              if (x)
                return (
                  F
                    ? (e.Ze.R(),
                      e.Ha.h(0),
                      za.set(J),
                      za.S("u7", 1 / c.size, 1 / c.size),
                      ta.l(!1, !1),
                      (aa = e.Ze))
                    : (aa = e.Ha),
                  aa.h(0),
                  B &&
                    (e.ed.o(),
                    za.set("s21"),
                    za.S("u12", z, ea / z),
                    ta.l(!1, !1),
                    (aa = e.ed),
                    e.ed.h(0)),
                  aa
                );
              aa = e.Ha;
              c.normalize &&
                (za.set("gpuRawAvg" === q ? "s8" : "s7"),
                za.F("u4", 1 / c.size),
                e.$e.R(),
                e.Ha.h(0),
                ta.l(!1, !1),
                (aa = e.$e));
              switch (q) {
                case "cpuRGBA2Float":
                  aa.mg(!1);
                  aa = N.Ql(aa);
                  K(aa);
                  break;
                case "cpuMeanFloat":
                  aa.mg(!0);
                  aa = aa.Rl();
                  K(aa);
                  break;
                case "gpuRawAvg":
                case "gpuRaw":
                  aa.h(0);
                case "none":
                  null !== K && K(aa);
              }
              return !1;
            },
            Cj: function (aa) {
              aa && ((q = aa.af || "none"), (K = aa.Ye || null));
              e.Ha = ra.instance({
                isFloat: !0,
                isPot: !0,
                isMipmap: !1,
                width: c.size,
              });
              aa =
                "undefined" !== typeof c.classesCount && c.classesCount
                  ? c.classesCount
                  : c.size * c.size;
              for (var ba = 0, T = 0, ua = 0; ba < aa; ++ba)
                k.push(T + (c.size - 1 - ua) * c.size),
                  u.push([-1, -1, -1, -1]),
                  ++T,
                  T === c.size && ((T = 0), ++ua);
              c.normalize &&
                (e.$e = ra.instance({ isFloat: !0, isPot: !0, width: c.size }));
            },
            Ql: function (aa) {
              var ba = aa.Mh();
              k.forEach(function (T, ua) {
                u[ua][0] = ba[0][T];
                u[ua][1] = ba[1][T];
                u[ua][2] = ba[2][T];
                u[ua][3] = ba[3][T];
              });
              return u;
            },
            L: function () {
              for (var aa in e) {
                var ba = e[aa];
                ba && ba.remove();
              }
              V && (V.L(), (V = null));
            },
          };
          c.jd && N.tm(c.jd);
          return N;
        },
      },
      ic = {
        instance: function (c) {
          var e = ra.instance(c.weights);
          return {
            Wb: !0,
            Uc: function () {
              return 1;
            },
            L: function () {
              e.remove();
            },
            Nk: function () {
              return e;
            },
            wa: function () {
              za.set("s26");
              e.h(1);
              ta.l(!1, !1);
            },
          };
        },
      },
      Wa = {
        instance: function (c) {
          var e = c.fromLayerSize,
            m = ra.instance(c.weights);
          return {
            Wb: !0,
            Uc: function () {
              return e;
            },
            L: function () {
              m.remove();
            },
            wa: function (k) {
              if (k.isEnabled) {
                za.set("s24");
                k.xl.h(3);
                var u,
                  q = Math.min(k.Zc.length, k.depth);
                for (u = 0; u < q; ++u) k.Zc[u].oj(4 + u);
              } else za.set("s23");
              za.F("u16", c.toLayerSize);
              m.h(1);
              ta.l(!1, !1);
            },
          };
        },
      },
      g = {
        instance: function (c) {
          for (
            var e = c.fromLayerSize,
              m = c.toLayerSize,
              k = c.toSparsity,
              u = k * m,
              q = u / e,
              K = e / m,
              x = 0,
              z = 0,
              B = 0,
              v = Array(k * m * k * m * 4),
              E = Array(k * m * k * m * 4),
              C = Array(e * e),
              A = 0;
            A < C.length;
            ++A
          )
            C[A] = 0;
          A = Math.floor(k / 2);
          for (var I = 0.5 / m, P = 0.5 / e, F = 0.5 / u, ea = 0; ea < m; ++ea)
            for (var J = Math.round(ea * K), p = 0; p < m; ++p) {
              var y = Math.round(p * K),
                X = ea / m,
                ja = p / m;
              X += I;
              ja += I;
              for (var R = 0; R < k; ++R) {
                var G = J + R - A;
                0 > G && (G += e);
                G >= e && (G -= e);
                for (var V = 0; V < k; ++V) {
                  var N = x / u,
                    aa = z / u,
                    ba = y + V - A;
                  0 > ba && (ba += e);
                  ba >= e && (ba -= e);
                  var T = G / e,
                    ua = ba / e;
                  aa = 1 - aa - 1 / u;
                  T += P;
                  ua += P;
                  N += F;
                  aa += F;
                  var Ca = ea * k + R,
                    Ja = p * k + V;
                  Ja = m * k - Ja - 1;
                  Ca = Ja * m * k + Ca;
                  v[4 * Ca] = N;
                  v[4 * Ca + 1] = aa;
                  v[4 * Ca + 2] = T;
                  v[4 * Ca + 3] = ua;
                  ua = C[ba * e + G]++;
                  Ca = ua % q;
                  T = G * q + Ca;
                  ba = ba * q + (ua - Ca) / q;
                  ba = e * q - 1 - ba;
                  ba = ba * e * q + T;
                  E[4 * ba] = N;
                  E[4 * ba + 1] = aa;
                  E[4 * ba + 2] = X;
                  E[4 * ba + 3] = ja;
                  ++x >= u && ((x = 0), ++z);
                  ++B;
                }
              }
            }
          C = null;
          var xa = ra.instance(c.weights);
          delete c.weights.data;
          var W = ra.instance({
            width: u,
            isFloat: !0,
            array: new Float32Array(E),
            isPot: !0,
          });
          E = null;
          var D = ra.instance({
            width: u,
            isFloat: !0,
            array: new Float32Array(v),
            isPot: !0,
          });
          v = null;
          return {
            Wb: !0,
            Uc: function () {
              return q;
            },
            L: function () {
              W.remove();
              D.remove();
              xa.remove();
            },
            wa: function () {
              za.set("s22");
              xa.h(1);
              D.h(2);
              ta.l(!1, !1);
            },
          };
        },
      },
      Ec = {
        instance: function (c) {
          var e = c.kernelsCount,
            m = c.toSparsity,
            k = (m * c.toLayerSize) / c.fromLayerSize,
            u = ra.instance(c.weights);
          return {
            Wb: !0,
            Uc: function () {
              return k;
            },
            ao: function () {
              return m;
            },
            Nk: function () {
              return u;
            },
            L: function () {
              u.remove();
            },
            wa: function () {
              za.set("s25");
              za.F("u22", e);
              za.F("u23", m);
              za.F("u16", c.toLayerSize);
              za.F("u24", c.fromLayerSize);
              u.h(1);
              ta.l(!1, !1);
            },
          };
        },
      },
      Hc = {
        instance: function (c, e) {
          var m = c.fromLayerSize,
            k = c.toLayerSize,
            u = c.toSparsity,
            q = c.stride ? c.stride : 1,
            K = (u * k) / m,
            x = k < m,
            z = m / k,
            B = ra.instance(c.weights),
            v =
              "s47" +
              [m.toString(), k.toString(), u.toString(), q.toString(), e].join(
                "_"
              );
          za.hk(v) ||
            ((c = Ta(e)),
            (k = [
              { type: "1f", name: "u16", value: k },
              { type: "1f", name: "u30", value: q },
            ]),
            x && k.push({ type: "1f", name: "u24", value: m }),
            (m = [(x ? K : u).toFixed(1), c]),
            x && m.push(z.toFixed(1)),
            za.Rg(x ? "s39" : "s38", v, m),
            za.j(
              v,
              k.concat([
                { type: "1i", name: "u14", value: 0 },
                { type: "1i", name: "u21", value: 1 },
                { type: "1i", name: "u13", value: 3 },
              ])
            ));
          return {
            Wb: !1,
            Uc: function () {
              return K;
            },
            L: function () {
              B.remove();
            },
            wa: function () {
              za.set(v);
              B.h(3);
              ta.l(!1, !1);
            },
          };
        },
      },
      uc = {
        instance: function (c) {
          var e = c.vh ? c.vh : 3,
            m = c.Vg ? c.Vg : 64,
            k = c.Ch ? c.Ch : 64,
            u = c.gl ? !0 : !1;
          c = { isFloat: !1, width: m, isPot: !1, isFlipY: !1 };
          var q = ra.instance(c),
            K = ra.instance(c),
            x = ra.instance(c),
            z = ra.instance(c),
            B = ra.instance({ isFloat: !0, width: k, isPot: !1, isFlipY: !1 }),
            v = 1 / m;
          return {
            process: function (E) {
              za.set("s35");
              z.o();
              ta.l(u, !1);
              za.set("s36");
              for (var C = 0; C < e; ++C)
                q.o(),
                  za.S("u7", v, 0),
                  ta.l(u, !1),
                  x.o(),
                  z.h(0),
                  ta.l(u, !1),
                  K.o(),
                  q.h(0),
                  za.S("u7", 0, v),
                  ta.l(u, !1),
                  z.o(),
                  x.h(0),
                  ta.l(u, !1),
                  C !== e - 1 && K.h(0);
              za.set("s37");
              B.o();
              E.h(0);
              K.h(1);
              z.h(2);
              ta.l(u, !1);
              B.h(0);
            },
            Jg: function () {
              return B;
            },
          };
        },
      },
      Xb = (function () {
        function c(w) {
          switch (ja) {
            case X.movePinch:
              var H = -w.deltaY;
              0 === R && P("pinch", -1, 0.001 * H, null);
          }
          w.deltaY;
          w.preventDefault();
        }
        function e(w) {
          if (-1 !== R)
            switch (ja) {
              case X.swipe:
                if (1 !== R) break;
                z();
                v(w, V);
                var H = V[0] - G[0];
                u(H);
                w = H / ((20 * J.offsetWidth) / 100);
                P("swipeMove", Math.min(Math.max(w, -1), 1), w, null);
                break;
              case X.movePinch:
                if (2 === R || 3 === R) {
                  v(w, V);
                  H = V[0] - G[0];
                  var Y = V[1] - G[1];
                  2 === R
                    ? ((Ba += Math.sqrt(H * H + Y * Y)),
                      10 > Ba
                        ? ((G[0] = V[0]), (G[1] = V[1]))
                        : (d || ((d = !0), P("moveStart", null, null, null)),
                          (a[0] = H),
                          (a[1] = Y),
                          (aa[0] = H - N[0]),
                          (aa[1] = Y - N[1]),
                          P("move", a, aa, null),
                          (N[0] = a[0]),
                          (N[1] = a[1])))
                    : 3 === R &&
                      ((w = B(w) / b), P("pinch", w, w - h, null), (h = w));
                }
            }
        }
        function m(w) {
          if (-1 !== R)
            switch (ja) {
              case X.swipe:
                if (1 !== R) break;
                z();
                v(w, V);
                w = V[0] - G[0];
                var H = 0 > w;
                (w = 20 < (100 * Math.abs(w)) / J.offsetWidth) && H
                  ? P("swipeLeft", ba, null, null)
                  : w && !H && P("swipeRight", ba, null, null);
                var Y = function () {
                  setTimeout(function () {
                    x();
                    R = 0;
                    P("swipeEnd", null, null, null);
                  }, 202);
                };
                w
                  ? ((w = function () {
                      var M = (H ? -1 : 1) * J.width,
                        na = ((H ? 1 : -1) * M) / J.width;
                      ba.style.transitionDuration = (400).toString() + "ms";
                      ba.style.left = (xa[0] + M).toString() + "px";
                      ba.style.top = xa[1].toString() + "px";
                      ba.style.transform = "rotate( " + na.toString() + "rad )";
                      Y();
                    }),
                    Ja ? w() : (W = w))
                  : ((ba.style.transitionDuration = (200).toString() + "ms"),
                    (ba.style.opacity = "0"),
                    (ba.style.left = xa[0].toString() + "px"),
                    (ba.style.top = xa[1].toString() + "px"),
                    (ba.style.transform = ""),
                    Y());
                R = -1;
                break;
              case X.movePinch:
                if (2 === R || 3 === R)
                  R === R.move
                    ? P("moveEnd", null, null, null)
                    : 3 === R && P("pinchEnd", null, null, null),
                    (R = 0);
            }
        }
        function k(w) {
          w.preventDefault();
          if (-1 !== R)
            switch (ja) {
              case X.swipe:
                if (0 !== R) break;
                z();
                R = 1;
                D = setTimeout(function () {
                  x();
                  D = null;
                  1 === R && ((R = 0), P("swipeEnd", null, null, null));
                }, 1e3);
                q();
                P("swipeStart", null, null, null);
                P("swipeGetCanvas", ba, ua, T);
                v(w, G);
                break;
              case X.movePinch:
                0 !== R
                  ? 2 !== R ||
                    d ||
                    (void 0 === w.changedTouches && void 0 === w.touches) ||
                    ((b = B(w)),
                    20 < b &&
                      ((R = 3), (h = 1), P("pinchStart", null, null, null)))
                  : 3 !== R &&
                    ((d = !1),
                    v(w, G),
                    (N[0] = 0),
                    (N[1] = 0),
                    (R = 2),
                    (Ba = 0));
            }
        }
        function u(w) {
          var H = 0 > w;
          ba.style.left = xa[0] + w + "px";
          ba.style.transformOrigin = H ? S : da;
          ba.style.transform =
            "rotate( " + (((H ? 1 : -1) * w) / J.width).toString() + "rad )";
        }
        function q() {
          Ja = !1;
          var w = J.getBoundingClientRect();
          xa[0] = w.left;
          xa[1] = w.top;
          ba.width = Math.round(J.width / 4);
          ba.height = Math.round(J.height / 4);
          T.width = ba.width;
          T.height = ba.height;
          ba.style.width = J.offsetWidth + "px";
          ba.style.height = J.offsetHeight + "px";
          ba.style.left = xa[0] + "px";
          ba.style.top = xa[1] + "px";
          setTimeout(K, 0);
        }
        function K() {
          ua.drawImage(J, 0, 0, ba.width, ba.height);
          Ca.drawImage(ba, 0, 0);
          Ja = !0;
          document.body.appendChild(ba);
          W && (W(), (W = !1));
        }
        function x() {
          ba.style.transitionDuration = "0ms";
          ba.style.opacity = "1";
          ba.style.transform = "";
          Ja && (document.body.removeChild(ba), (Ja = !1));
        }
        function z() {
          D && (window.clearTimeout(D), (D = null));
        }
        function B(w) {
          E(w, l, 0);
          E(w, n, 1);
          return Math.sqrt(l[0] * l[0] + n[0] * n[0]);
        }
        function v(w, H) {
          void 0 !== w.changedTouches || void 0 !== w.touches
            ? E(w, H, 0)
            : ((H[0] = w.pageX), (H[1] = w.pageY));
        }
        function E(w, H, Y) {
          w.touches.length > Y
            ? ((H[0] = w.touches[Y].pageX), (H[1] = w.touches[Y].pageY))
            : ((H[0] = w.changedTouches[Y].pageX),
              (H[1] = w.changedTouches[Y].pageY));
        }
        function C() {
          y.forEach(function (w) {
            J.removeEventListener(w.type, w.hb, !1);
          });
          return y.splice(0, y.length);
        }
        function A(w) {
          w.forEach(function (H) {
            I(H.type, H.hb);
          });
        }
        function I(w, H) {
          J.removeEventListener(w, H, !1);
          ba.removeEventListener(w, H, !1);
          J.addEventListener(w, H, !1);
          ba.addEventListener(w, H, !1);
          0 ===
            y.filter(function (Y) {
              return Y.type === w && Y.hb === H;
            }).length && y.push({ type: w, hb: H });
        }
        function P(w, H, Y, M) {
          p[w].forEach(function (na) {
            na.hb(H, Y, M);
          });
        }
        function F(w) {
          return w[0] + "% " + (100 - w[1]).toString() + "%";
        }
        var ea = !1,
          J = null,
          p = {
            swipeStart: [],
            swipeEnd: [],
            swipeLeft: [],
            swipeRight: [],
            swipeMove: [],
            swipeGetCanvas: [],
            pinch: [],
            pinchStart: [],
            pinchEnd: [],
            move: [],
            moveStart: [],
            moveEnd: [],
          },
          y = [],
          X = { idle: 0, swipe: 1, movePinch: 2 },
          ja = X.idle,
          R = 0,
          G = [0, 0],
          V = [0, 0],
          N = [0, 0],
          aa = [0, 0],
          ba = document.createElement("canvas"),
          T = document.createElement("canvas"),
          ua = ba.getContext("2d"),
          Ca = T.getContext("2d");
        ba.style.position = "fixed";
        ba.style.zIndex = "800";
        ba.style.cursor = "move";
        ba.style.pointerEvents = "none";
        ba.className = "swipeImage";
        ba.setAttribute("draggable", !1);
        var Ja = !1,
          xa = [0, 0],
          W = null,
          D = null,
          da = F([50, 100]),
          S = F([50, 0]),
          wa = null,
          Ba = 0,
          a = [0, 0],
          b = 0,
          d = !1,
          h = 1,
          l = [0, 0],
          n = [0, 0],
          r = {
            init: function (w) {
              if (ea) r.switch_canvas(w.pa);
              else
                return (
                  (J = w.pa),
                  I("mousedown", k),
                  I("mouseup", m),
                  I("mouseout", m),
                  I("mousemove", e),
                  I("mousemove", e),
                  I("wheel", c),
                  I("touchstart", k),
                  I("touchend", m),
                  I("touchmove", e),
                  (ea = !0),
                  r
                );
            },
            switch_canvas: function (w) {
              if (!ea) r.init({ pa: w });
              else if (J !== w) {
                var H = C();
                J = w;
                A(H);
                for (var Y in p)
                  for (w = p[Y], H = w.length - 1; 0 <= H; --H)
                    w[H].Tl && w.splice(H, 1);
              }
            },
            get_mode: function () {
              for (var w in X) if (X[w] === ja) return w;
              return !1;
            },
            switch_mode: function (w) {
              ea &&
                "undefined" !== typeof X[w] &&
                ((w = X[w]), ja !== w && (z(), (ja = w), (R = 0)));
            },
            add_listener: function (w, H, Y) {
              p[w].push({ hb: H, Tl: "undefined" === typeof Y ? !1 : Y });
              return r;
            },
            remove_listener: function (w) {
              p[w].splice(0, p[w].length);
              return r;
            },
            animate_swipe: function (w, H) {
              wa && (clearInterval(wa), (wa = null));
              q();
              var Y = (J.width / (H / 1e3)) * ("left" === w ? -1 : 1),
                M = 0,
                na,
                Ma = Date.now();
              wa = setInterval(function () {
                wa &&
                  ((na = Date.now()),
                  (M += ((na - Ma) / 1e3) * Y),
                  u(M),
                  (Ma = na),
                  Math.abs(M) > 0.75 * J.width &&
                    wa &&
                    (clearInterval(wa), (wa = null), x()));
              }, 16);
            },
          };
        return r;
      })();
    window.CanvasListeners = Xb;
    var fc = (function () {
        var c = {
            n: 5,
            Xe: 1,
            kh: 0,
            Qc: [30, 45],
            Oc: [2, 200],
            k: 0.7,
            Pm: 200,
            Il: 0.05,
          },
          e = -1,
          m = null,
          k = -1,
          u = -1,
          q = 0,
          K = -1,
          x = -1,
          z = 0,
          B = 0,
          v = c.Oc[1],
          E = {
            T: function () {
              switch (e) {
                case -1:
                  return -1;
                case 0:
                  return x + m.kh;
                case 1:
                  return z;
              }
            },
            Cg: function (C) {
              return Math.pow(
                Math.min(Math.max(K, 0), m.n - 1) / (m.n - 1),
                C || 1
              );
            },
            m: function (C) {
              m = Object.assign({}, c, C);
              K = x = m.Xe;
              e = 0;
              E.reset();
            },
            Lm: function (C) {
              C = ("undefined" === typeof C ? Date.now() : C) || 0;
              var A = Math.min(Math.max(C - B, m.Oc[0]), m.Oc[1]);
              v = A;
              B = C;
              var I = -1 === k ? 0 : m.k;
              k = Math.min(Math.max(1e3 / A, 5), 120) * (1 - I) + k * I;
              C - u > m.Pm &&
                5 < ++q &&
                ((A = m.k),
                (K =
                  K * (1 - A) +
                  (k < m.Qc[0] ? x - 1 : k > m.Qc[1] ? x + 1 : x) * A),
                Math.abs(K - x) > 1 - m.Il &&
                  ((A = Math.min(Math.max(Math.round(K), 0), m.n - 1)),
                  A !== x && ((K = x = A), (k = (m.Qc[1] - m.Qc[0]) / 2))),
                (u = C));
            },
            yo: function (C) {
              z = C;
              e = 1;
            },
            Mo: function () {
              e = 0;
              E.reset();
            },
            reset: function () {
              v = c.Oc[1];
              u = k = -1;
              q = 0;
            },
            sk: function () {
              return v;
            },
          };
        return E;
      })(),
      Bc = (function () {
        var c = {
            wh: 4,
            fd: [1.5, 1.5, 2],
            La: [0.1, 0.1, 0.1],
            Th: 1,
            $a: -1,
            De: -1,
            Jm: 2,
            Fl: 1,
            Uh: !0,
            fk: 0.8,
          },
          e = null,
          m = [],
          k = 0,
          u = [0.5, 0.5, 1];
        return {
          m: function (q) {
            e = Object.assign({}, c, q);
            m.splice(0);
            q = e.fd[0] * e.La[0];
            var K = e.fd[1] * e.La[1],
              x = 1 / (1 + e.fd[2] * e.La[2]),
              z = e.Th * Math.min(e.$a, e.De),
              B = z / e.$a;
            z /= e.De;
            var v = 0.5 * e.fk;
            v *= v;
            for (var E = 0; E < e.wh; ++E) {
              var C = Math.pow(x, E),
                A = B * C,
                I = z * C;
              C = A * q;
              var P = I * K,
                F = A / 2;
              I /= 2;
              for (
                var ea = 1 + (1 - F - F) / C, J = 1 + (1 - I - I) / P, p = 0;
                p < J;
                ++p
              )
                for (var y = I + p * P, X = y - 0.5, ja = 0; ja < ea; ++ja) {
                  var R = F + ja * C,
                    G = R - 0.5;
                  G * G + X * X > v || m.push([R, y, A * e.Fl]);
                }
            }
            e.Uh &&
              m.sort(function (V, N) {
                var aa = V[0] - 0.5;
                V = V[1] - 0.5;
                var ba = N[0] - 0.5;
                N = N[1] - 0.5;
                return aa * aa + V * V - (ba * ba + N * N);
              });
          },
          get: function () {
            var q = m.length;
            if (0 === q) return u;
            k >= q && (k = 0);
            var K = m[Math.floor(k)];
            k = (k + 1 / e.Jm) % q;
            return K;
          },
        };
      })(),
      ma = {
        Bc: [],
        Ac: [],
        Id: !1,
        Hd: !1,
        Jd: !1,
        isFallback: !1,
        ready: !1,
        isBusy: !1,
      },
      Wb = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1280,
        minHeight: 480,
        maxHeight: 1280,
        FOVdesktop: 60,
        rotate: 0,
        Ii: 23,
        Fd: 10,
        Ed: 8e3,
      },
      U = {
        We: "models3D",
        Te: "materials",
        Nm: "tweakers",
        neuralNetworkPath: "built/jeefitNNC.json",
        $: "",
        ta: "",
        Gd: "",
        dc: 0,
        Kj: 20,
        width: 1024,
        height: 1024,
        Hl: [1.7, 3],
        Qh: 500,
        yc: [2, 6],
        scanOverlapFactors: [2, 2, 3],
        scanNScaleLevels: 3,
        scanScale0Factor: 0.7,
        La: [0.1, 0.1, 0.3],
        Mm: 55,
        Lj: 1,
        Lh: [0.2, 0.6],
        Kh: 2,
        Af: [0, 0.6],
        ma: [0.73, 1.16, 0.28],
        ui: [0, 0, 0],
        Ia: [0, -66, 18],
        Ob: 1,
        za: [0, -60, 0],
        cd: 10,
        hg: 1,
        oe: 73,
        cc: [0.08, 0.9],
        Pd: [0.7, 0.98],
        $l: 0.3,
        Sh: 0.5,
        $m: 20,
        gk: !1,
        ic: 145,
        Ce: -18,
        Ae: 20,
        Be: 3,
        qa: [-110, 0],
        Ub: 1,
        ki: 0.4,
        li: 3,
        sd: [0, 0, 0],
        Vb: [1.1, 1],
        Ic: 0,
        ce: 0.95,
        be: 90,
        ae: 50,
        Da: 30,
        va: 0,
        ye: !0,
        ad: !0,
        Qe: "images/masks/target.jpg",
        $c: [1 / 255, 175 / 255, 236 / 255, 0],
        Re: 0.001,
        Pe: 3.14,
        Rd: 0,
        Qd: "images/masks/burka.png",
        Md: Math.PI - Math.PI / 4,
        Zd: Math.PI / 4,
        df: [0.3, 0.2, 0.1],
        Lb: 1,
        nh: 700,
        mh: 90,
        ql: 0.2,
        lh: 0.04,
        an: "images/backgrounds/viewer3D.png",
        Of: [0, 0, 0],
        Nf: [0, 15, 60],
        Cd: 0.3,
        kn: 50,
        en: Pc ? db : !1,
        fn: Pc ? db : !1,
        jn: 1e3,
        mn: 1e3,
        gn: 40,
        dn: [0, 0, -400],
        qh: 0.1,
        vl: 0.5,
        rh: [0.5, 1.5],
        bd: 30,
        ul: !0,
      };
    ia.model = !1;
    ia.Nb = 1;
    ia.hd = 1;
    ia.gg = !0;
    ia.ig = !0;
    ia.fg = !1;
    ia.Fa = !0;
    var Vb = {
      ff: 3.5,
      Pb: "images/debug/picsou.png",
      ld: 45,
      Me: 0.785,
      Ne: 0.3925,
      Oe: 5,
      Ke: 2,
      Le: 0,
      Je: 0,
      bn: "images/backgrounds/bg1.jpg",
      cn: "images/backgrounds/bg1_light.jpg",
      Ei: 1,
      Fi: 2,
    };
    "undefined" === typeof U && (U = {});
    "undefined" === typeof ia && (ia = {});
    "undefined" === typeof Vb && (Vb = {});
    U.ma = [0.7, 1.13, 0.262];
    U.Pn = [4, 50];
    U.qa = [-110, 0];
    U.ki = 0.3473;
    U.li = 3;
    U.sd = [0, -3.6287, 25];
    U.Vb = [0.95, 1];
    ia.Nb = 2.1289;
    ia.hd = 1;
    Vb.ff = 2.5858;
    Vb.Me = 0.4388;
    Vb.Ne = 0.118;
    Vb.Pb = "images/debug/hdri2.png";
    Vb.ld = 180;
    Vb.ef = 0.8065;
    Vb.Oe = 5.3887;
    Vb.Ke = 0.5351;
    Vb.Le = -0.3019;
    Vb.Je = 0;
    Vb.Ei = 3.5288;
    Vb.Fi = 6.2168;
    U.hg = 0.4;
    U.cd = 42;
    U.cc[0] = 0.02;
    U.Ld = [1, 10];
    U.cc[1] = 0.9;
    U.ma[0] *= 0.75;
    U.ma[1] *= 0.6;
    U.ma[2] *= 1;
    U.Lh = [0.3, 0.65];
    U.Kh = 1.3;
    U.Sh = 1;
    var jc = null,
      fd = null,
      qd = null,
      sd = -1,
      tc = -1,
      Ad = null,
      ld = -1,
      Ob = null,
      Nc = -1,
      ib = -1,
      sc = U.Hl,
      td = window.devicePixelRatio ? window.devicePixelRatio : 1;
    var kd = { ik: Math.max(sc[0], td) / td, le: Math.min(td, sc[1]) };
    var kc = null;
    ma.onLoad = function (c) {
      ma.ready ? c() : ma.Bc.push(c);
    };
    ma.onHalfLoad = function (c) {
      ma.load_model ? c() : ma.Ac.push(c);
    };
    ma.onWebcamAsk = function (c) {
      ma.Id = c;
    };
    ma.onContextLost = function (c) {
      ma.Hd = c;
    };
    ma.onWebcamGet = function (c) {
      ma.Jd = c;
    };
    ma.get_onHalfLoadCallstack = function () {
      return ma.Ac;
    };
    ma.set_size = function (c, e) {
      U.width = c;
      U.height = e;
    };
    ma.get_videoDevices = function (c) {
      Na(c);
    };
    ma.set_videoDevice = function (c) {
      sd = c;
    };
    ma.set_videoSizes = function (c, e, m, k, u, q) {
      Wb.idealWidth = c;
      Wb.idealHeight = e;
      Wb.minWidth = m;
      Wb.maxWidth = k;
      Wb.minHeight = u;
      Wb.maxHeight = q;
    };
    ma.set_loading = function (c, e) {
      c && (U.Qe = c);
      "number" === typeof e && ((c = new Fa(e)), (U.$c = [c.r, c.W, c.b, 0]));
    };
    ma.set_settings = function (c, e, m) {
      c &&
        Object.keys(c).forEach(function (k) {
          U[k] = c[k];
        });
      e &&
        Object.keys(e).forEach(function (k) {
          Wb[k] = e[k];
        });
      m &&
        Object.keys(m).forEach(function (k) {
          Vb[k] = m[k];
        });
    };
    ma.get_size = function () {
      return { width: U.width, height: U.height };
    };
    ma.get_cv = function () {
      return Gb.ib();
    };
    ma.set_NNCPath = function (c) {
      U.Gd = c;
    };
    ma.set_materialsPath = function (c) {
      U.Te = c;
    };
    ma.set_modelsPath = function (c) {
      U.We = c;
    };
    ma.init = function (c, e, m, k) {
      kc = Ea();
      ma.eb = m
        ? function (u, q) {
            m(u, q);
            ma.eb = !1;
          }
        : function () {};
      ma.sn = kc;
      c && (U.$ = c);
      e && ma.Bc.push(e);
      Vb.Pb = U.$ + U.ta + Vb.Pb;
      kc.Km();
      if (
        !Gb.m({
          eg: "jeefitCanvas",
          pa: k,
          width: Nc,
          height: ib,
          debug: !1,
          Ah: function () {
            ma.Hd && ma.Hd();
          },
          premultipliedAlpha: !0,
        })
      )
        return ma.eb && ma.eb("GL_INCOMPATIBLE", "Cannot init Context"), !1;
      ma.Id && ma.Id();
      ((c = {
        width: { min: Wb.minWidth, max: Wb.maxWidth, ideal: Wb.idealWidth },
        height: { min: Wb.minHeight, max: Wb.maxHeight, ideal: Wb.idealHeight },
      }),
      -1 !== sd)
        ? (c.deviceId = sd)
        : (c.facingMode = { ideal: "user" });
      La(
        function (u) {
          ma.Jd && ma.Jd(u);
          jc = u;
          u = jc.videoWidth;
          var q = jc.videoHeight;
          qd = { ja: jc, isPot: !1, isFloat: !1, isFlipY: !0 };
          fd = ra.instance(qd);
          kc.tf(u, q);
          kc.Ge(u, q) && kc.zf();
        },
        function (u) {
          ma.eb && ma.eb("WEBCAM_UNAVAILABLE", u);
        },
        { video: c, audio: !1 }
      );
      return !0;
    };
    window.JEEFITAPI = ma;
    var ad = (function () {
        function c() {
          Va.Z();
          f.viewport(0, 0, 1, 1);
          za.set("s60");
          k.h(0);
          ta.l(!1);
          f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, q);
          e(0 < q[0]);
        }
        var e = null,
          m = !1,
          k = null,
          u = !1,
          q = null,
          K = {
            m: function (x) {
              if (u) return !1;
              k = x;
              za.Rf([
                {
                  id: "s60",
                  name: "_",
                  g:
                    "uniform sampler2D u33;void main(){vec4 a=texture2D(u33,vec2(.25,.5));float b=step(1.99,a.r);gl_FragColor=vec4(b,0.,0.,1.);}",
                  i: ["u33"],
                  precision: "lowp",
                },
              ]);
              za.j("s60", [{ type: "1i", name: "u33", value: 0 }]);
              q = new Uint8Array(4);
              return (u = !0);
            },
            start: function (x, z) {
              K.stop();
              e = z;
              m = window.setInterval(c, x);
            },
            stop: function () {
              m && (window.clearInterval(c), (m = !1));
            },
          };
        return K;
      })(),
      Jc = Jc || {};
    Fa.prototype = {
      constructor: Fa,
      r: 1,
      W: 1,
      b: 1,
      set: function (c) {
        c instanceof Fa
          ? this.H(c)
          : "number" === typeof c
          ? Sa(this, c)
          : "string" === typeof c && vb(this, c);
        return this;
      },
      cm: (function () {
        function c(e, m, k) {
          0 > k && (k += 1);
          1 < k && --k;
          return k < 1 / 6
            ? e + 6 * (m - e) * k
            : 0.5 > k
            ? m
            : k < 2 / 3
            ? e + 6 * (m - e) * (2 / 3 - k)
            : e;
        }
        return function (e, m, k) {
          e = Jc.Math.On(e, 1);
          m = Jc.Math.Ud(m, 0, 1);
          k = Jc.Math.Ud(k, 0, 1);
          0 === m
            ? (this.r = this.W = this.b = k)
            : ((m = 0.5 >= k ? k * (1 + m) : k + m - k * m),
              (k = 2 * k - m),
              (this.r = c(k, m, e + 1 / 3)),
              (this.W = c(k, m, e)),
              (this.b = c(k, m, e - 1 / 3)));
          return this;
        };
      })(),
      clone: function () {
        return new this.constructor(this.r, this.W, this.b);
      },
      H: function (c) {
        this.r = c.r;
        this.W = c.W;
        this.b = c.b;
        return this;
      },
      add: function (c) {
        this.r += c.r;
        this.W += c.W;
        this.b += c.b;
        return this;
      },
      multiply: function (c) {
        this.r *= c.r;
        this.W *= c.W;
        this.b *= c.b;
        return this;
      },
      ya: function (c) {
        this.r *= c;
        this.W *= c;
        this.b *= c;
        return this;
      },
      gb: function (c, e) {
        void 0 === e && (e = 0);
        this.r = c[e];
        this.W = c[e + 1];
        this.b = c[e + 2];
        return this;
      },
    };
    var nd = {};
    Hb.prototype = {
      constructor: Hb,
      get x() {
        return this.A;
      },
      set x(c) {
        this.A = c;
      },
      get y() {
        return this.B;
      },
      set y(c) {
        this.B = c;
      },
      get z() {
        return this.C;
      },
      set z(c) {
        this.C = c;
      },
      get w() {
        return this.M;
      },
      set w(c) {
        this.M = c;
      },
      set: function (c, e, m, k) {
        this.A = c;
        this.B = e;
        this.C = m;
        this.M = k;
        return this;
      },
      clone: function () {
        return new this.constructor(this.A, this.B, this.C, this.M);
      },
      H: function (c) {
        this.A = c.x;
        this.B = c.y;
        this.C = c.z;
        this.M = c.w;
        return this;
      },
      inverse: function () {
        this.A *= -1;
        this.B *= -1;
        this.C *= -1;
        this.normalize();
        return this;
      },
      Kc: function (c) {
        return this.A * c.A + this.B * c.B + this.C * c.C + this.M * c.M;
      },
      Ie: function () {
        return (
          this.A * this.A + this.B * this.B + this.C * this.C + this.M * this.M
        );
      },
      length: function () {
        return Math.sqrt(
          this.A * this.A + this.B * this.B + this.C * this.C + this.M * this.M
        );
      },
      normalize: function () {
        var c = this.length();
        0 === c
          ? ((this.C = this.B = this.A = 0), (this.M = 1))
          : ((c = 1 / c),
            (this.A *= c),
            (this.B *= c),
            (this.C *= c),
            (this.M *= c));
        return this;
      },
      multiply: function (c, e) {
        return void 0 !== e
          ? (console.warn(
              "JETHREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."
            ),
            Bb(this, c, e))
          : Bb(this, this, c);
      },
      gb: function (c, e) {
        void 0 === e && (e = 0);
        this.A = c[e];
        this.B = c[e + 1];
        this.C = c[e + 2];
        this.M = c[e + 3];
        return this;
      },
    };
    zb.prototype = {
      constructor: zb,
      get width() {
        return this.x;
      },
      set width(c) {
        this.x = c;
      },
      get height() {
        return this.y;
      },
      set height(c) {
        this.y = c;
      },
      set: function (c, e) {
        this.x = c;
        this.y = e;
        return this;
      },
      Xh: function (c) {
        this.x = c;
        return this;
      },
      Yh: function (c) {
        this.y = c;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y);
      },
      H: function (c) {
        this.x = c.x;
        this.y = c.y;
        return this;
      },
      add: function (c, e) {
        if (void 0 !== e)
          return (
            console.warn(
              "JETHREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.Cc(c, e)
          );
        this.x += c.x;
        this.y += c.y;
        return this;
      },
      Cc: function (c, e) {
        this.x = c.x + e.x;
        this.y = c.y + e.y;
        return this;
      },
      sub: function (c, e) {
        if (void 0 !== e)
          return (
            console.warn(
              "JETHREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.Va(c, e)
          );
        this.x -= c.x;
        this.y -= c.y;
        return this;
      },
      Va: function (c, e) {
        this.x = c.x - e.x;
        this.y = c.y - e.y;
        return this;
      },
      multiply: function (c) {
        this.x *= c.x;
        this.y *= c.y;
        return this;
      },
      ya: function (c) {
        isFinite(c) ? ((this.x *= c), (this.y *= c)) : (this.y = this.x = 0);
        return this;
      },
      ge: function (c) {
        return this.ya(1 / c);
      },
      min: function (c) {
        this.x = Math.min(this.x, c.x);
        this.y = Math.min(this.y, c.y);
        return this;
      },
      max: function (c) {
        this.x = Math.max(this.x, c.x);
        this.y = Math.max(this.y, c.y);
        return this;
      },
      Ud: function (c, e) {
        this.x = Math.max(c.x, Math.min(e.x, this.x));
        this.y = Math.max(c.y, Math.min(e.y, this.y));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      },
      Kc: function (c) {
        return this.x * c.x + this.y * c.y;
      },
      Ie: function () {
        return this.x * this.x + this.y * this.y;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      normalize: function () {
        return this.ge(this.length());
      },
      gb: function (c, e) {
        void 0 === e && (e = 0);
        this.x = c[e];
        this.y = c[e + 1];
        return this;
      },
    };
    Ya.prototype = {
      constructor: Ya,
      set: function (c, e, m) {
        this.x = c;
        this.y = e;
        this.z = m;
        return this;
      },
      Xh: function (c) {
        this.x = c;
        return this;
      },
      Yh: function (c) {
        this.y = c;
        return this;
      },
      clone: function () {
        return new this.constructor(this.x, this.y, this.z);
      },
      H: function (c) {
        this.x = c.x;
        this.y = c.y;
        this.z = c.z;
        return this;
      },
      add: function (c, e) {
        if (void 0 !== e)
          return (
            console.warn(
              "JETHREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."
            ),
            this.Cc(c, e)
          );
        this.x += c.x;
        this.y += c.y;
        this.z += c.z;
        return this;
      },
      Cc: function (c, e) {
        this.x = c.x + e.x;
        this.y = c.y + e.y;
        this.z = c.z + e.z;
        return this;
      },
      sub: function (c, e) {
        if (void 0 !== e)
          return (
            console.warn(
              "JETHREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."
            ),
            this.Va(c, e)
          );
        this.x -= c.x;
        this.y -= c.y;
        this.z -= c.z;
        return this;
      },
      Va: function (c, e) {
        this.x = c.x - e.x;
        this.y = c.y - e.y;
        this.z = c.z - e.z;
        return this;
      },
      multiply: function (c, e) {
        if (void 0 !== e)
          return (
            console.warn(
              "JETHREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."
            ),
            (this.x = c.x * e.x),
            (this.y = c.y * e.y),
            (this.z = c.z * e.z),
            this
          );
        this.x *= c.x;
        this.y *= c.y;
        this.z *= c.z;
        return this;
      },
      ya: function (c) {
        isFinite(c)
          ? ((this.x *= c), (this.y *= c), (this.z *= c))
          : (this.z = this.y = this.x = 0);
        return this;
      },
      ge: function (c) {
        return this.ya(1 / c);
      },
      min: function (c) {
        this.x = Math.min(this.x, c.x);
        this.y = Math.min(this.y, c.y);
        this.z = Math.min(this.z, c.z);
        return this;
      },
      max: function (c) {
        this.x = Math.max(this.x, c.x);
        this.y = Math.max(this.y, c.y);
        this.z = Math.max(this.z, c.z);
        return this;
      },
      Ud: function (c, e) {
        this.x = Math.max(c.x, Math.min(e.x, this.x));
        this.y = Math.max(c.y, Math.min(e.y, this.y));
        this.z = Math.max(c.z, Math.min(e.z, this.z));
        return this;
      },
      floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
      },
      ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
      },
      round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
      },
      Kc: function (c) {
        return this.x * c.x + this.y * c.y + this.z * c.z;
      },
      Ie: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      },
      length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      },
      normalize: function () {
        return this.ge(this.length());
      },
      gb: function (c, e) {
        void 0 === e && (e = 0);
        this.x = c[e];
        this.y = c[e + 1];
        this.z = c[e + 2];
        return this;
      },
    };
    bc.Hi = "XYZ";
    bc.prototype = {
      constructor: bc,
      get x() {
        return this.A;
      },
      set x(c) {
        this.A = c;
      },
      get y() {
        return this.B;
      },
      set y(c) {
        this.B = c;
      },
      get z() {
        return this.C;
      },
      set z(c) {
        this.C = c;
      },
      get order() {
        return this.Ma;
      },
      set order(c) {
        this.Ma = c;
      },
      set: function (c, e, m, k) {
        this.A = c;
        this.B = e;
        this.C = m;
        this.Ma = k || this.Ma;
        return this;
      },
      clone: function () {
        return new this.constructor(this.A, this.B, this.C, this.Ma);
      },
      H: function (c) {
        this.A = c.A;
        this.B = c.B;
        this.C = c.C;
        this.Ma = c.Ma;
        return this;
      },
      gb: function (c) {
        this.A = c[0];
        this.B = c[1];
        this.C = c[2];
        void 0 !== c[3] && (this.Ma = c[3]);
        return this;
      },
    };
    Eb.prototype = {
      constructor: Eb,
      set: function (c, e) {
        this.min.H(c);
        this.max.H(e);
        return this;
      },
      clone: function () {
        return new this.constructor().H(this);
      },
      H: function (c) {
        this.min.H(c.min);
        this.max.H(c.max);
        return this;
      },
      empty: function () {
        return (
          this.max.x < this.min.x ||
          this.max.y < this.min.y ||
          this.max.z < this.min.z
        );
      },
      size: function (c) {
        return (c || new Ya()).Va(this.max, this.min);
      },
      getParameter: function (c, e) {
        return (e || new Ya()).set(
          (c.x - this.min.x) / (this.max.x - this.min.x),
          (c.y - this.min.y) / (this.max.y - this.min.y),
          (c.z - this.min.z) / (this.max.z - this.min.z)
        );
      },
      translate: function (c) {
        this.min.add(c);
        this.max.add(c);
        return this;
      },
    };
    Kb.prototype = {
      constructor: Kb,
      set: function (c, e, m, k, u, q, K, x, z, B, v, E, C, A, I, P) {
        var F = this.elements;
        F[0] = c;
        F[4] = e;
        F[8] = m;
        F[12] = k;
        F[1] = u;
        F[5] = q;
        F[9] = K;
        F[13] = x;
        F[2] = z;
        F[6] = B;
        F[10] = v;
        F[14] = E;
        F[3] = C;
        F[7] = A;
        F[11] = I;
        F[15] = P;
        return this;
      },
      clone: function () {
        return new Kb().gb(this.elements);
      },
      H: function (c) {
        this.elements.set(c.elements);
        return this;
      },
      multiply: function (c, e) {
        return void 0 !== e
          ? (console.warn(
              "JETHREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."
            ),
            Gc(this, c, e))
          : Gc(this, this, c);
      },
      ya: function (c) {
        var e = this.elements;
        e[0] *= c;
        e[4] *= c;
        e[8] *= c;
        e[12] *= c;
        e[1] *= c;
        e[5] *= c;
        e[9] *= c;
        e[13] *= c;
        e[2] *= c;
        e[6] *= c;
        e[10] *= c;
        e[14] *= c;
        e[3] *= c;
        e[7] *= c;
        e[11] *= c;
        e[15] *= c;
        return this;
      },
      setPosition: function (c) {
        var e = this.elements;
        e[12] = c.x;
        e[13] = c.y;
        e[14] = c.z;
        return this;
      },
      translate: function () {
        console.error("JETHREE.Matrix4: .translate() has been removed.");
      },
      scale: function (c) {
        var e = this.elements,
          m = c.x,
          k = c.y;
        c = c.z;
        e[0] *= m;
        e[4] *= k;
        e[8] *= c;
        e[1] *= m;
        e[5] *= k;
        e[9] *= c;
        e[2] *= m;
        e[6] *= k;
        e[10] *= c;
        e[3] *= m;
        e[7] *= k;
        e[11] *= c;
        return this;
      },
      gb: function (c) {
        this.elements.set(c);
        return this;
      },
    };
    Ic.prototype = {
      constructor: Ic,
      clone: function () {
        return new this.constructor().H(this);
      },
      H: function (c) {
        this.a = c.a;
        this.b = c.b;
        this.c = c.c;
        this.Ga.H(c.Ga);
        this.color.H(c.color);
        this.Mb = c.Mb;
        for (var e = 0, m = c.Bd.length; e < m; e++)
          this.Bd[e] = c.Bd[e].clone();
        e = 0;
        for (m = c.Lf.length; e < m; e++) this.Lf[e] = c.Lf[e].clone();
        return this;
      },
    };
    var O = (function () {
        function c(p, y, X) {
          y = p.createShader(y);
          p.shaderSource(y, X);
          p.compileShader(y);
          return p.getShaderParameter(y, p.COMPILE_STATUS) ? y : !1;
        }
        function e(p, y) {
          Aa.ha() && (y.g = y.g.replace(/gl_FragData\[([0-3])\]/g, "gbuf$1"));
          y.xe = c(p, p.VERTEX_SHADER, y.s, y.name + " VERTEX");
          y.we = c(p, p.FRAGMENT_SHADER, y.g, y.name + " FRAGMENT");
          var X = p.createProgram();
          p.attachShader(X, y.xe);
          p.attachShader(X, y.we);
          p.linkProgram(X);
          return X;
        }
        function m(p) {
          p.s = "#version 300 es\n" + p.s.replace(/varying/g, "out");
          p.g = "#version 300 es\n" + p.g.replace(/varying/g, "in");
          p.s = p.s.replace(/texture2D\(/g, "texture(");
          p.g = p.g.replace(/texture2D\(/g, "texture(");
          p.da ||
            ((p.g = p.g.replace(
              /void main/g,
              "out vec4 FragColor;\nvoid main"
            )),
            (p.g = p.g.replace(/gl_FragColor/g, "FragColor")));
          var y = 0,
            X = [];
          p.s = p.s.replace(
            /attribute ([a-z]+[0-4]*) ([_a-zA-Z,0-9\s]+);/g,
            function (ja, R, G) {
              var V = "";
              G.split(",").forEach(function (N) {
                N = N.trim();
                V += "layout(location = " + y + ") in " + R + " " + N + ";\n";
                X.push(N);
                ++y;
              });
              return V;
            }
          );
          p.Li = X;
        }
        function k(p, y) {
          if (y.Ug) return !1;
          var X = Aa.ha();
          ia.co || X || p.enableVertexAttribArray(0);
          void 0 === y.da && (y.da = !1);
          y.da &&
            ((y.pe = J.lk()),
            (y.zc = X ? 3 : 2),
            (y.mo = X ? "none" : "highp"));
          y.id = ea++;
          void 0 === y.zc && (y.zc = 2);
          void 0 === y.pe && (y.pe = "");
          void 0 === y.Ci && (y.Ci = "");
          void 0 === y.precision && (y.precision = "highp");
          "none" !== y.precision &&
            (y.g = "precision " + y.precision + " float;\n" + y.g);
          y.g = y.pe + y.g;
          void 0 === y.s &&
            (y.s =
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
          y.s = y.Ci + y.s;
          X && 3 <= y.zc && m(y);
          y.Aa &&
            y.Aa.forEach(function (ja) {
              y.s = y.s.replace(ja.search, ja.replace);
              y.g = y.g.replace(ja.search, ja.replace);
            });
          y.ka = e(p, y);
          y.v = {};
          y.i.forEach(function (ja) {
            y.v[ja] = p.getUniformLocation(y.ka, ja);
          });
          y.attributes = {};
          y.ua = [];
          y.Kf = 0;
          void 0 === y.G && (y.G = ["a0"]);
          void 0 === y.N && (y.N = [2]);
          y.G.forEach(function (ja, R) {
            var G =
              X && 3 <= y.zc ? y.Li.indexOf(ja) : p.getAttribLocation(y.ka, ja);
            y.attributes[ja] = G;
            y.ua.push(G);
            y.Kf += 4 * y.N[R];
          });
          y.set = function () {
            P !== y.id &&
              (-1 !== P && F.I(),
              (P = y.id),
              (F = y),
              p.useProgram(y.ka),
              y.ua.forEach(function (ja) {
                0 !== ja && p.enableVertexAttribArray(ja);
              }));
          };
          y.I = function () {
            P = -1;
            y.ua.forEach(function (ja) {
              0 !== ja && p.disableVertexAttribArray(ja);
            });
          };
          y.Ug = !0;
        }
        function u(p, y) {
          k(p, y);
          y.set();
          P = -1;
          return y;
        }
        function q() {
          return {
            name: "_",
            g:
              "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            precision: "highp",
          };
        }
        function K() {
          J.j("s89", [{ type: "1i", name: "u1", value: 0 }]);
          J.j("s90", [{ type: "1i", name: "u132", value: 0 }]);
          J.j("s91", [{ type: "1i", name: "u56", value: 0 }]);
        }
        function x() {
          var p = "u33 u122 u123 u124 u125 u34 u60".split(" ").concat(C, A);
          I.s92 = {
            name: "_",
            g:
              "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            s:
              "attribute vec3 a0;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.,1.);const vec3 l=vec3(1.,1.,1.);const vec2 w=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 m(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*l;vec2 n=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 o=m(g);vec3 p=mix(u122,u65,a);float q=mix(u123,u68,u67);vec3 r=mix(u60,u66,a);float s=mix(u63,1.,u67);vec2 h=u62/n;vec3 i=a0;float t=max(0.,-a0.z-u124)*u125;i.x+=t*sign(a0.x)*(1.-u67);vec3 b=o*(i+p)*q+r;b.x+=u59*sin(g.y);vec2 u=h*s;vec3 v=vec3(f*u,-h)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(v,1.)),vv0=b,vv1=smoothstep(u128,u129,a0.z);}",
            i: ["u128", "u129"].concat(p),
            G: ["a0"],
            precision: "highp",
          };
          I.s93 = {
            name: "_",
            g:
              "uniform sampler2D u1;uniform vec3 u126;uniform float u55;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u126,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u126,b,u55),a.a);gl_FragColor=c;}",
            s:
              "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;varying vec2 vv0;const vec2 e=vec2(1.,1.);const vec3 k=vec3(1.,1.,1.);const vec2 v=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 l(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*k;vec2 m=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 n=l(f);vec3 o=mix(u122,u65,a);float p=mix(u123,u68,u67);vec3 q=mix(u60,u66,a);float r=mix(u63,1.,u67);vec2 g=u62/m;vec3 h=a0;float s=max(0.,-a0.z-u124)*u125;h.x+=s*sign(a0.x)*(1.-u67);vec3 i=n*(h+o)*p+q;i.x+=u59*sin(f.y);vec2 t=g*r;vec3 u=vec3(d*t,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(u,1.)),vv0=a1;}",
            i: ["u126"].concat(v, p),
            G: ["a0", "a1"],
            N: [3, 2],
            precision: "lowp",
          };
          I.s94 = {
            name: "_",
            g: "uniform vec3 u126;void main(){gl_FragColor=vec4(u126,0.);}",
            s:
              "attribute vec3 a0;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;const vec2 e=vec2(1.,1.);const vec3 j=vec3(1.,1.,1.);const vec2 u=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 k(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*j;vec2 l=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 m=k(f);vec3 n=mix(u122,u65,a);float o=mix(u123,u68,u67);vec3 p=mix(u60,u66,a);float q=mix(u63,1.,u67);vec2 g=u62/l;vec3 h=a0;float r=max(0.,-a0.z-u124)*u125;h.x+=r*sign(a0.x)*(1.-u67);vec3 i=m*(h+n)*o+p;i.x+=u59*sin(f.y);vec2 s=g*q;vec3 t=vec3(d*s,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(t,1.));}",
            i: ["u126"].concat(p),
            N: [3],
            precision: "lowp",
          };
          I.s95 = {
            name: "_",
            g:
              "uniform vec4 u6;varying vec3 vv0;varying float vv1;void main(){float a=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv1);gl_FragColor=vec4(normalize(vv0),a);}",
            s:
              "attribute vec3 a0,a2;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.,1.);const vec3 m=vec3(1.,1.,1.);const vec2 w=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 n(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*m;vec2 o=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 g=n(f);vec3 p=mix(u122,u65,a);float q=mix(u123,u68,u67);vec3 r=mix(u60,u66,a);float s=mix(u63,1.,u67);vec2 h=u62/o;vec3 i=a0;float t=max(0.,-a0.z-u124)*u125;i.x+=t*sign(a0.x)*(1.-u67);vec3 j=g*(i+p)*q+r;j.x+=u59*sin(f.y);vec2 u=h*s;vec3 v=vec3(d*u,-h)+j*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(v,1.)),vv0=g*a2*vec3(1.,-1.,-1.),vv1=a0.y;}",
            i: ["u6", "u60"].concat(p),
            G: ["a0", "a2"],
            precision: "highp",
          };
          I.s96 = {
            name: "_",
            g:
              "uniform sampler2D u132;uniform vec4 u6;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=vec3(0.,0.,-1.),c=normalize(vv1),b=texture2D(u132,vv2).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv1:a;float m=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv3);gl_FragColor=vec4(a,m);}",
            s:
              "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 y=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*o;vec2 q=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 g=p(f);vec3 r=mix(u122,u65,a);float s=mix(u123,u68,u67);vec3 t=mix(u60,u66,a);float u=mix(u63,1.,u67);vec2 h=u62/q;vec3 i=a0;float v=max(0.,-a0.z-u124)*u125;i.x+=v*sign(a0.x)*(1.-u67);vec3 j=g*(i+r)*s+t;j.x+=u59*sin(f.y);vec2 w=h*u;vec3 x=vec3(d*w,-h)+j*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(x,1.)),vv1=g*a2*vec3(1.,-1.,-1.),vv0=a3,vv2=a1,vv3=a0.y;}",
            i: ["u6", "u60", "u132"].concat(p),
            G: ["a3", "a0", "a2", "a1"],
            N: [4, 3, 3, 2],
            precision: "highp",
          };
          I.s97 = {
            name: "_",
            g:
              "uniform vec4 u91;uniform float u127;void main(){float b=u127;vec4 a=u91;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            s:
              "attribute vec3 a0;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;const vec2 e=vec2(1.,1.);const vec3 j=vec3(1.,1.,1.);const vec2 u=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 k(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*j;vec2 l=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 m=k(f);vec3 n=mix(u122,u65,a);float o=mix(u123,u68,u67);vec3 p=mix(u60,u66,a);float q=mix(u63,1.,u67);vec2 g=u62/l;vec3 h=a0;float r=max(0.,-a0.z-u124)*u125;h.x+=r*sign(a0.x)*(1.-u67);vec3 i=m*(h+n)*o+p;i.x+=u59*sin(f.y);vec2 s=g*q;vec3 t=vec3(d*s,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(t,1.));}",
            i: ["u91", "u127"].concat(p),
            precision: "lowp",
          };
          I.s98 = {
            name: "_",
            g:
              "uniform sampler2D u56;uniform vec4 u91,u57;uniform float u127;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u127;vec4 a=u91,d=texture2D(u56,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u57*e),c=mix(c,l,u57.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            s:
              "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u124,u125,u131;varying vec2 vv0;const vec2 e=vec2(1.,1.);const vec3 k=vec3(1.,1.,1.);const vec2 v=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 l(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*k;vec2 m=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 n=l(f);vec3 o=mix(u122,u65,a);float p=mix(u123,u68,u67);vec3 q=mix(u60,u66,a);float r=mix(u63,1.,u67);vec2 g=u62/m;vec3 h=a0;float s=max(0.,-a0.z-u124)*u125;h.x+=s*sign(a0.x)*(1.-u67);vec3 i=n*(h+o)*p+q;i.x+=u59*sin(f.y);vec2 t=g*r;vec3 u=vec3(d*t,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(u,1.)),vv0=a1;}",
            i: ["u91", "u127"].concat(E, p),
            G: ["a0", "a1"],
            N: [3, 2],
            precision: "lowp",
          };
          p = ["u115", "u103", "u116"];
          I.s99 = {
            name: "_",
            g:
              "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
            s:
              "attribute vec3 a0;uniform mat4 u115,u103,u116;varying vec3 vv0;varying float vv1;void main(){vec4 a=u116*vec4(a0,1.);gl_Position=u115*u103*a,vv0=a.xyz,vv1=1.;}",
            i: p,
            precision: "highp",
          };
          I.s100 = {
            name: "_",
            g:
              "varying vec3 vv0;void main(){gl_FragColor=vec4(normalize(vv0),1.);}",
            s:
              "attribute vec3 a0,a2;uniform mat4 u115,u103,u116;varying vec3 vv0;varying float vv1;void main(){vec4 a=u116*vec4(a2,0.);gl_Position=u115*u103*u116*vec4(a0,1.),vv0=a.xyz,vv1=a0.y;}",
            i: p,
            G: ["a0", "a2"],
            precision: "highp",
          };
          I.s90 = {
            name: "_",
            g:
              "uniform sampler2D u132;uniform vec3 u133;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=normalize(vv1+u133),c=normalize(vv2),b=texture2D(u132,vv3).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv2:a,gl_FragColor=vec4(a,1.);}",
            s:
              "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;void main(){vec4 b=u116*vec4(a2,0.),a=u116*vec4(a0,1.);gl_Position=u115*u103*a,vv0=a3,vv2=b.xyz,vv3=a1,vv1=a.xyz;}",
            i: ["u132", "u133"].concat(p),
            G: ["a0", "a2", "a1", "a3"],
            precision: "highp",
          };
          I.s89 = {
            name: "_",
            g:
              "uniform sampler2D u1;uniform vec3 u126;uniform float u55;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 b=mix(u126,a.rgb,a.a);vec4 c=vec4(mix(a.rgb*u126,b,u55),a.a);gl_FragColor=c;}",
            s:
              "attribute vec3 a0;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec2 vv0;const vec4 f=vec4(0.,0.,5e-4,0.);void main(){gl_Position=u115*u103*u116*vec4(a0,1.)+f,vv0=a1;}",
            i: ["u126"].concat(v, p),
            G: ["a0", "a1"],
            Aa: [{ search: "0.0005", replace: cb.ca() ? "0.0005" : "0.0" }],
            precision: "lowp",
          };
          I.s101 = {
            name: "_",
            g:
              "uniform vec4 u91;uniform float u127;void main(){float b=u127;vec4 a=u91;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
            s:
              "attribute vec3 a0;uniform mat4 u115,u103,u116;void main(){gl_Position=u115*u103*u116*vec4(a0,1.);}",
            i: ["u91"].concat(p),
            precision: "highp",
          };
          I.s91 = {
            name: "_",
            g:
              "uniform sampler2D u56;uniform vec4 u91,u57;uniform float u127;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u127;vec4 a=u91,d=texture2D(u56,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u57*e),c=mix(c,l,u57.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
            s:
              "attribute vec3 a0;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec2 vv0;void main(){gl_Position=u115*u103*u116*vec4(a0,1.),vv0=a1;}",
            i: ["u91"].concat(E, p),
            G: ["a0", "a1"],
            N: [3, 2],
            precision: "highp",
          };
        }
        function z() {
          for (var p in I) k(f, I[p]);
        }
        var B = !1,
          v = ["u1", "u55"],
          E = ["u56", "u57"],
          C = "u58 u59 u60 u61 u62 u63".split(" "),
          A = "u64 u65 u66 u67 u68 u69".split(" "),
          I = {},
          P = -1,
          F = null,
          ea = 0,
          J = {
            lk: function () {
              return Aa.ha()
                ? "precision highp float;\n            layout(location = 0) out vec4 gbuf0;\n            layout(location = 1) out vec4 gbuf1;\n            layout(location = 2) out vec4 gbuf2;\n            layout(location = 3) out vec4 gbuf3;\n"
                : "#extension GL_EXT_draw_buffers : require\n";
            },
            la: function (p, y) {
              I[p] = y;
              B && k(f, I[p]);
            },
            po: function (p, y) {
              I[p] = y;
              y.Ug = !1;
              k(f, I[p]);
            },
            Kb: function () {
              return B;
            },
            m: function () {
              I.s0 = q();
              I.s1 = {
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1"],
                precision: "lowp",
              };
              I.s61 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u5;uniform float u6;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){gl_FragColor=vec4(mix(texture2D(u5,vv0).rgb,texture2D(u1,vv0).rgb,u6*f),1.);}",
                i: ["u1", "u5", "u6"],
                precision: "highp",
              };
              I.s62 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u5;uniform float u6;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){gl_FragColor=mix(texture2D(u5,vv0),texture2D(u1,vv0),u6*f);}",
                i: ["u1", "u5", "u6"],
                precision: "highp",
              };
              I.s11 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u28;uniform vec2 u70;uniform float u71,u72;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 b=texture2D(u28,vv0*u70),c=texture2D(u1,vv0*u70);float a=smoothstep(u71,0.,vv0.y);a+=smoothstep(1.-u71,1.,vv0.y),gl_FragColor=pow(mix(c,b,a*f),u72*f);}",
                i: ["u1", "u70", "u28", "u71", "u72"],
              };
              I.s63 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u28;uniform vec2 u70;uniform float u71,u72;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),f=exp2(c);vec3 g=clamp(b/f,0.,1.);return vec4(g,(c+128.)/256.);}void main(){vec2 a=vv0*u70;float c=floor(a.x),d=mod(c,2.);a.x=mod(a.x,1.),a.x=mix(a.x,1.-a.x,d);vec3 f=texture2D(u28,a).rgb,g=texture2D(u1,a).rgb;float b=smoothstep(u71,0.,vv0.y);b+=smoothstep(1.-u71,1.,vv0.y);vec3 j=mix(g,f,b*h);vec4 k=i(pow(j,u72*h));gl_FragColor=k;}",
                i: ["u1", "u70", "u28", "u71", "u72"],
                precision: "highp",
              };
              I.s64 = {
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);if(a.a<.5)discard;gl_FragColor=a;}",
                i: ["u1"],
                precision: "lowp",
              };
              I.s65 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u73;uniform vec2 u7;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u7*f).rgb+texture2D(u1,a+u7*g).rgb+texture2D(u1,a+u7*h).rgb+texture2D(u1,a+u7*i).rgb;gl_FragColor=vec4(b/5.,1.);}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s66 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u73,u33;uniform vec2 u7,u74;varying vec2 vv0;const vec3 k=vec3(1.,1.,1.);const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u7*f).rgb+texture2D(u1,a+u7*g).rgb+texture2D(u1,a+u7*h).rgb+texture2D(u1,a+u7*i).rgb;float c=texture2D(u33,vec2(.75,.5)).a,d=u74.x+pow(c,2.)*(u74.y-u74.x);vec3 j=mix(b/5.,texture2D(u73,a).rgb,d);gl_FragColor=vec4(j,1.);}",
                i: ["u1", "u73", "u7", "u33", "u74"],
                precision: "lowp",
              };
              I.s67 = {
                name: "_",
                g:
                  "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec3 f=vec3(.299,.587,.114);const float m=.007813,n=.125,h=8.;void main(){vec2 x=vv0;vec3 o=texture2D(u1,vv0+vec2(-1.,-1.)*u7).xyz,p=texture2D(u1,vv0+vec2(1.,-1.)*u7).xyz,q=texture2D(u1,vv0+vec2(-1.,1.)*u7).xyz,r=texture2D(u1,vv0+vec2(1.,1.)*u7).xyz,s=texture2D(u1,vv0).xyz;float b=dot(o,f),c=dot(p,f),e=dot(q,f),g=dot(r,f),i=dot(s,f),t=min(i,min(min(b,c),min(e,g))),u=max(i,max(max(b,c),max(e,g)));vec2 a;a.x=-(b+c-(e+g)),a.y=b+e-(c+g);float v=max((b+c+e+g)*(.25*n),m),w=1./(min(abs(a.x),abs(a.y))+v);a=min(vec2(h,h),max(vec2(-h,-h),a*w))*u7;vec3 j=.5*(texture2D(u1,vv0+a*-.166667).rgb+texture2D(u1,vv0+a*.166667).rgb),k=j*.5+.25*(texture2D(u1,vv0+a*-.5).rgb+texture2D(u1,vv0+a*.5).rgb);float l=dot(k,f);gl_FragColor=l<t||l>u?vec4(j,1.):vec4(k,1.);}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s42 = {
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(0.,0.,0.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=g(max(a,f));}",
                i: ["u1"],
                precision: "highp",
              };
              I.s68 = {
                name: "_",
                g:
                  "uniform sampler2D u75,u76;uniform float u77,u78;varying vec2 vv0;void main(){vec3 a=texture2D(u76,vv0).rgb,b=texture2D(u75,vv0).rgb;gl_FragColor=vec4(b*u78+u77*a,1.);}",
                i: ["u75", "u76", "u77", "u78"],
                precision: "highp",
              };
              I.s69 = {
                name: "_",
                g:
                  "uniform sampler2D u79,u80;uniform float u72;varying vec2 vv0;const int j=8888;const float e=3.141592;const vec2 k=vec2(0.,0.);const vec3 n=vec3(1.,1.,1.),o=vec3(0.,0.,0.);void main(){float p=e*(vv0.x*2.-1.),q=e/2.*(vv0.y*2.-1.),b,c,r,l,m;vec4 d;vec3 f=o;vec2 g=k,a=k;for(int h=0;h<j;h+=1)a.x=float(h),a.y=floor(a.x/64.),d=texture2D(u80,a/64.),b=e*d.r,c=2.*asin(sqrt(.25+d.g*.25)),l=p+c*cos(b),m=q+c*sin(b),g.x=.5+.5*l/e,g.y=.5+m/e,f+=pow(texture2D(u79,g).rgb,u72*n);f/=float(j),gl_FragColor=vec4(f,1.);}",
                i: ["u79", "u80", "u72"],
                precision: "lowp",
                Aa: [{ search: "8888", replace: ia.Yk[Aa.T()] }],
              };
              I.s70 = {
                name: "_",
                g:
                  "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);float b=.031496*texture2D(u1,vv0-3.*u7).a+.110236*texture2D(u1,vv0-2.*u7).a+.220472*texture2D(u1,vv0-u7).a+.275591*a.a+.220472*texture2D(u1,vv0+u7).a+.110236*texture2D(u1,vv0+2.*u7).a+.031496*texture2D(u1,vv0+3.*u7).a;gl_FragColor=vec4(a.rgb,4.*b);}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s71 = {
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=.3*pow(a.a,2.);gl_FragColor=vec4(a.rgb+b*f,1.);}",
                i: ["u1"],
                precision: "lowp",
              };
              I.s72 = {
                name: "_",
                g:
                  "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){vec4 a=.031496*texture2D(u1,vv0-3.*u7)+.110236*texture2D(u1,vv0-2.*u7)+.220472*texture2D(u1,vv0-u7)+.275591*texture2D(u1,vv0)+.220472*texture2D(u1,vv0+u7)+.110236*texture2D(u1,vv0+2.*u7)+.031496*texture2D(u1,vv0+3.*u7);gl_FragColor=a;}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s73 = {
                name: "_",
                g:
                  "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0-3.*u7)+texture2D(u1,vv0-2.*u7)+texture2D(u1,vv0-u7)+texture2D(u1,vv0)+texture2D(u1,vv0+u7)+texture2D(u1,vv0+2.*u7)+texture2D(u1,vv0+3.*u7);gl_FragColor=a/7.;}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s74 = {
                name: "_",
                g:
                  "uniform sampler2D u1;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.);const float e=256.;void main(){vec4 b=g;float c=0.;vec2 d;for(float a=0.;a<e;a+=1.)d=vec2((a+.5)/e,vv0.y),b+=texture2D(u1,d),c+=1.;gl_FragColor=b/c;}",
                i: ["u1"],
                precision: "highp",
              };
              I.s75 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u28;varying vec2 vv0;const vec4 h=vec4(1.,1.,1.,1.);const float f=0.,g=.3;void main(){vec4 b=texture2D(u28,vv0),c=texture2D(u1,vv0);float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=mix(c,b,a*h);}",
                i: ["u1", "u28"],
                precision: "highp",
              };
              I.s76 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u28;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);const float f=0.,g=.3;vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),j=exp2(c);vec3 k=clamp(b/j,0.,1.);return vec4(k,(c+128.)/256.);}void main(){vec3 b=texture2D(u28,vv0).rgb,c=texture2D(u1,vv0).rgb;float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=i(mix(c,b,a*h));}",
                i: ["u1", "u28"],
                precision: "highp",
              };
              I.s77 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u81,u2,u82;uniform vec4 u83;uniform vec2 u84;uniform float u85,u86,u87;varying vec2 vv0;const vec2 g=vec2(1.,1.),h=vec2(.5,.5);const float e=3.141592;void main(){vec4 d=texture2D(u1,vv0),i=texture2D(u81,vec2(1.-vv0.x,vv0.y));float j=step(texture2D(u82,vec2(.25,.5)).r,1.);vec2 a=vv0*2.-g;float k=texture2D(u2,a*u84*.5+h).r,l=atan(a.x,a.y),m=-(mod(u85,2.*e)-e),b=mod(l-m+e,2.*e)-e,c=1.-smoothstep(0.,u86,b);c*=(sign(b)+1.)/2.;vec4 n=i+c*u83*k;gl_FragColor=mix(d,n,j*u87);}",
                i: "u1 u2 u82 u81 u83 u85 u86 u87 u84".split(" "),
                precision: "lowp",
              };
              var p = "u88 u89 u90 u91 u79 u92 u21 u93 u81 u94 u95 u96 u97 u98".split(
                " "
              );
              ia.ba &&
                (I.s78 = {
                  name: "_",
                  g:
                    "uniform sampler2D u88,u89,u90,u91,u79,u92,u99,u81;uniform vec3 u93,u96;uniform float u21,u100,u95,u97,u94;varying vec2 vv0;const float j=3.141592;const vec3 u=vec3(0.,0.,0.),v=vec3(.299,.587,.114);const float w=2.;vec3 l(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 x(vec3 a){float b=atan(a.x,a.z),c=acos(-a.y);return vec2(.5-.5*b/j,1.-c/j);}vec2 y(vec3 a,float b){vec2 d=vec2(1.,.5)/pow(2.,b),f=vec2(0.,1.-pow(.5,b));float g=atan(a.x,a.z),h=acos(-a.y),c=.5+.5*g/j,i=h/j,k=pow(2.,b)/u94;c=(1.-k)*c;return f+vec2(c,i)*d;}void main(){vec4 c=texture2D(u88,vv0);vec3 k=texture2D(u81,vec2(1.-vv0.x,vv0.y)).rgb;if(c.a<.01){gl_FragColor=vec4(k,0.);return;}float z=c.a;vec3 A=c.rgb,B=A+u93;vec4 b=texture2D(u91,vv0),m=texture2D(u89,vv0);vec3 d=m.rgb;float f=m.a;vec4 n=texture2D(u90,vv0);vec3 C=n.rgb;float o=b.r,D=b.g,p=floor(b.b*255.),g=floor(p/16.),E=(p-16.*g)/16.;g/=16.;float F=b.a;f=1.-(1.-f)*(1.-n.a);vec2 G=x(-d);vec3 q=(1.-F)*l(texture2D(u92,G)),r=normalize(B),h=u,s=reflect(-r,d);vec2 H=y(s,floor(D*u21));float I=acos(-s.z),J=smoothstep(u95-u97,u95+u97,I);h=mix(l(texture2D(u79,H)),u96,J);float a=o+(E-o)*pow(1.-dot(d,-r),g*16.);a=clamp(a,0.,1.);float t=1.-u100*texture2D(u99,vv0).r;h*=pow(t,2.),q*=t;vec3 i=C*mix(q,h,a),M=mix(k,i,z*(f*(1.-a)+a));float K=dot(i,v),L=max(0.,(K-1.)/(w-1.));gl_FragColor=vec4(i,L);}",
                  i: p.concat(["u99", "u100"]),
                  precision: "highp",
                });
              I.s79 = {
                name: "_",
                g:
                  "uniform sampler2D u88,u89,u90,u91,u79,u92,u81;uniform vec3 u93,u96;uniform float u21,u95,u97,u98,u101,u102,u94;varying vec2 vv0;const float l=3.141592;const vec3 x=vec3(0.,0.,0.),m=vec3(1.,1.,1.),y=vec3(.299,.587,.114);const float z=2.;vec3 n(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 A(vec3 a){float b=atan(a.x,-a.z),c=acos(-a.y);return vec2(.5-.5*b/l,1.-c/l);}vec2 B(vec3 a,float d){float b=pow(2.,d);vec2 f=vec2(1.,.5)/b,g=vec2(0.,1.-1./b);float h=atan(a.x,a.z),i=acos(-a.y),c=.5+.5*h/l,j=i/l,k=.5*b/u94;c=(1.-k)*c;return g+vec2(c,j)*f;}void main(){vec4 f=texture2D(u88,vv0),g=texture2D(u81,vec2(1.-vv0.x,vv0.y));if(f.a<.01){gl_FragColor=vec4(g.rgb,0.);return;}float o=f.a;vec3 C=f.rgb,D=C+u93;vec4 b=texture2D(u91,vv0),p=texture2D(u89,vv0);vec3 h=p.rgb;float i=p.a;vec4 j=texture2D(u90,vv0);vec3 c=j.rgb;if(o>1.){gl_FragColor=vec4(mix(g.rgb,c,j.a),1.);return;}c=pow(c,u101*m);float q=b.r,E=b.g,F=b.a,r=floor(b.b*255.),k=floor(r/16.),G=(r-16.*k)/16.;k/=16.,i=1.-(1.-i)*(1.-j.a);vec2 H=A(h);vec3 I=n(texture2D(u92,H)),J=(1.-F)*I,s=normalize(D),t=x,u=reflect(-s,h);float K=floor(E*u21);vec2 L=B(u,K);float M=acos(-u.z),N=smoothstep(u95-u97,u95+u97,M);vec3 O=n(texture2D(u79,L));t=mix(O,u96,N*u98);float a=q+(G-q)*pow(1.+dot(h,s),k*15.);a=clamp(a,0.,1.);vec3 P=c*mix(J,t,a);float v=o*(i*(1.-a)+a);vec3 d=mix(g.rgb,pow(P,m/u101),v);float w=dot(d,y),Q=max(0.,(w-1.)/(z-1.));d=mix(w*m,d,mix(1.,u102,v)*m),gl_FragColor=vec4(d,Q);}",
                i: p.concat(["u101", "u102"]),
                precision: "highp",
              };
              ia.ba &&
                ((I.s80 = {
                  name: "_",
                  g:
                    "uniform sampler2D u88,u89;uniform mat4 u103;uniform vec2 u104,u7,u105;uniform float u106,u107,u108,u109,u110,u111,u112,u113,u100;varying vec2 vv0;const float PI=3.141593,HALFPI=1.570796,N=8888.8;void main(){vec2 uvt=vv0+u105;vec4 pos=texture2D(u88,uvt);if(pos.a<.01){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 co0=pos.rgb;float c=cos(u106),s=sin(u106);vec3 no0=texture2D(u89,uvt).rgb;float zv=(u103*vec4(co0,1.)).z;vec3 co;vec2 scale=u104/abs(zv),uv,duv=u7*vec2(c,s)*scale;vec3 dp,dpn;float dzMax=0.,angleMin=0.,angle;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u88,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u112,u113,length(dp)),angleMin=max(angleMin,angle),dzMax=max(dzMax,sin(angle)*length(dp));float angleMinInv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u88,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u112,u113,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMinInv=max(angleMinInv,angle);duv=u7*vec2(s,c)*scale;float angleMin2=0.;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u88,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u112,u113,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2=max(angleMin2,angle);float angleMin2Inv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u88,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u112,u113,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2Inv=max(angleMin2Inv,angle);float omegaMin=PI/4.*(angleMin+angleMinInv)*(angleMin2+angleMin2Inv),dzFactor=clamp(dzMax/u109,u110,1.),ao=dzFactor*clamp(u108*omegaMin*u111,0.,u100);gl_FragColor=vec4(ao,ao,ao,u107);}",
                  i: "u88 u89 u108 u107 u106 u7 u114 u109 u110 u111 u112 u113 u103 u104 u100".split(
                    " "
                  ),
                  Aa: [{ search: "8888.8", replace: ia.cj[Aa.T()].toFixed(1) }],
                  precision: "lowp",
                }),
                (I.s81 = {
                  name: "_",
                  g:
                    "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4),j=vec2(-1.9,.9),k=vec2(.9,1.9),l=vec2(-.9,-1.9),m=vec2(1.9,-.9);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u7*f)+texture2D(u1,a+u7*g)+texture2D(u1,a+u7*h)+texture2D(u1,a+u7*i);b+=texture2D(u1,a+u7*j)+texture2D(u1,a+u7*k)+texture2D(u1,a+u7*l)+texture2D(u1,a+u7*m),gl_FragColor=b/9.;}",
                  i: ["u1", "u7"],
                  precision: "lowp",
                }));
              I.s82 = {
                name: "_",
                g: "varying vec3 vv0;void main(){gl_FragColor=vec4(vv0,1.);}",
                s:
                  "attribute vec3 a0;uniform mat4 u115,u103,u116;varying vec3 vv0;void main(){vec4 a=u115*u103*u116*vec4(a0,1.);gl_Position=a,vv0=a.xyz/a.w;}",
                i: ["u115", "u103", "u116"],
                precision: "lowp",
              };
              I.s83 = {
                name: "_",
                g:
                  "uniform sampler2D u117,u92,u80;uniform mat4 u115,u118;uniform vec2 u119;uniform float u120;varying vec2 vv0;const float n=8888.8,o=9999.9,p=25.,v=50.,w=1.2,e=3.141592;const vec4 x=vec4(0.,0.,0.,0.),A=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);vec2 y(vec3 a){float b=atan(a.x,a.z),c=acos(a.y);return vec2(.5-.5*b/e,1.-c/e);}void main(){float d,a,q;vec2 z=vec2(vv0.x,1.-vv0.y),b;vec3 r=vec3(u119*(z-f),0.),B=vec3(u118*vec4(r,1.)),g,s;vec4 t=x,h,c,u;vec3 i;int j;for(float k=0.;k<n;k+=1.){b.x=k,b.y=floor(b.x/64.),c=texture2D(u80,b/64.),d=e*c.r,a=2.*asin(sqrt(.25+c.g*.25)),g=vec3(cos(d)*sin(a),sin(d)*sin(a),-cos(a)),q=p+(.5+.5*c.b)*(v-p),j=0;for(float l=0.;l<=o;l+=1.){u=vec4(r+g*q*pow(l/o,w),1.),h=u115*u,i=h.xyz/h.w;if(texture2D(u117,f+f*i.xy).z<i.z){j=1;break;}}if(j==1)continue;s=vec3(u118*vec4(g,0.)),t+=texture2D(u92,y(s));}gl_FragColor=vec4(u120*t.rgb/n,1.);}",
                i: "u117 u92 u80 u115 u118 u119 u120".split(" "),
                Aa: [
                  { search: "8888.8", replace: ia.Em[Aa.T()].toFixed(1) },
                  { search: "9999.9", replace: ia.Fm[Aa.T()].toFixed(1) },
                ],
                precision: "lowp",
              };
              I.s84 = {
                name: "_",
                g:
                  "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){vec4 a=.285714*texture2D(u1,vv0-u7)+.428571*texture2D(u1,vv0)+.285714*texture2D(u1,vv0+u7);gl_FragColor=a;}",
                i: ["u1", "u7"],
                precision: "lowp",
              };
              I.s85 = {
                name: "_",
                g:
                  "uniform sampler2D u1,u121;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                s:
                  "attribute vec3 a0;attribute vec2 a1;uniform mat4 u115,u103;varying vec2 vv0;void main(){vec4 a=u115*u103*vec4(a0,1.);gl_Position=a,vv0=a1;}",
                i: ["u115", "u103", "u1"],
                G: ["a0", "a1"],
                precision: "lowp",
              };
              if (Aa.X()) {
                p = "u33 u122 u123 u124 u125 u34 u91 u126 u127 u6 u128 u129 u60"
                  .split(" ")
                  .concat(C, A);
                Aa.fh() ||
                  (I.s86 = {
                    name: "_",
                    s:
                      "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    g:
                      "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,0.,0.),gl_FragData[2]=vec4(0.,0.,0.,0.),gl_FragData[3]=vec4(0.,0.,0.,0.);}",
                    i: [],
                    precision: "lowp",
                    da: !0,
                  });
                I.s87 = {
                  name: "_",
                  s:
                    "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                  g:
                    "uniform vec4 color;void main(){gl_FragData[0]=color,gl_FragData[1]=color,gl_FragData[2]=color,gl_FragData[3]=color;}",
                  i: ["color"],
                  da: !0,
                };
                I.s88NNGLcolor = {
                  name: "_",
                  g:
                    "uniform vec4 u91,u6;uniform vec3 u126;uniform float u127;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv3),c=u127;vec4 a=u91;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u126,0.),gl_FragData[3]=a;}",
                  s:
                    "attribute vec3 a0,a2;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec3 vv0,vv1;varying float vv2,vv3;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 y=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*o;vec2 q=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 h=p(g);vec3 r=mix(u122,u65,a);float s=mix(u123,u68,u67);vec3 t=mix(u60,u66,a);float u=mix(u63,1.,u67);vec2 i=u62/q;vec3 j=a0;float v=max(0.,-a0.z-u124)*u125;j.x+=v*sign(a0.x)*(1.-u67);vec3 b=h*(j+r)*s+t;b.x+=u59*sin(g.y);vec2 w=i*u;vec3 x=vec3(f*w,-i)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(x,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv2=smoothstep(u128,u129,a0.z),vv0=b,vv3=a0.y;}",
                  i: p,
                  G: ["a0", "a2"],
                  N: [3, 3],
                  da: !0,
                };
                I.s88NNGLtexture = {
                  name: "_",
                  g:
                    "uniform sampler2D u1;uniform vec4 u91,u6;uniform vec3 u126;uniform float u127,u55;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv4),d=u127;vec4 b=u91;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u126,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u126,l,u55),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  s:
                    "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.,1.);const vec3 p=vec3(1.,1.,1.);const vec2 z=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*p;vec2 r=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 h=q(g);vec3 s=mix(u122,u65,a);float t=mix(u123,u68,u67);vec3 u=mix(u60,u66,a);float v=mix(u63,1.,u67);vec2 i=u62/r;vec3 j=a0;float w=max(0.,-a0.z-u124)*u125;j.x+=w*sign(a0.x)*(1.-u67);vec3 b=h*(j+s)*t+u;b.x+=u59*sin(g.y);vec2 x=i*v;vec3 y=vec3(f*x,-i)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(y,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u128,u129,a0.z),vv2=a1,vv0=b,vv4=a0.y;}",
                  i: p.concat(v),
                  G: ["a0", "a2", "a1"],
                  N: [3, 3, 2],
                  da: !0,
                };
                I.s88NNGLtextureNormalMap = {
                  name: "_",
                  g:
                    "uniform vec4 u91,u6;uniform vec3 u126;uniform sampler2D u1,u132;uniform float u127,u55;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u132,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u127;vec4 c=u91;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u126,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u126,t,u55),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  s:
                    "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.,1.);const vec3 q=vec3(1.,1.,1.);const vec2 A=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*q;vec2 s=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 h=r(g);vec3 t=mix(u122,u65,a);float u=mix(u123,u68,u67);vec3 v=mix(u60,u66,a);float w=mix(u63,1.,u67);vec2 i=u62/s;vec3 j=a0;float x=max(0.,-a0.z-u124)*u125;j.x+=x*sign(a0.x)*(1.-u67);vec3 b=h*(j+t)*u+v;b.x+=u59*sin(g.y);vec2 y=i*w;vec3 z=vec3(f*y,-i)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(z,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv4=smoothstep(u128,u129,a0.z),vv3=a1,vv1=b,vv5=a0.y;}",
                  i: p.concat(v, ["u132"]),
                  G: ["a3", "a0", "a2", "a1"],
                  N: [4, 3, 3, 2],
                  da: !0,
                };
                I.s88NNGLtextureParamsMap = {
                  name: "_",
                  g:
                    "uniform sampler2D u1,u56;uniform vec4 u91,u6,u57;uniform vec3 u126;uniform float u127,u55;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv4),d=u127;vec4 a=u91,e=texture2D(u56,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u57*f),d=mix(d,r,u57.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u126,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u126,u,u55),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  s:
                    "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.,1.);const vec3 p=vec3(1.,1.,1.);const vec2 z=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*p;vec2 r=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 h=q(g);vec3 s=mix(u122,u65,a);float t=mix(u123,u68,u67);vec3 u=mix(u60,u66,a);float v=mix(u63,1.,u67);vec2 i=u62/r;vec3 j=a0;float w=max(0.,-a0.z-u124)*u125;j.x+=w*sign(a0.x)*(1.-u67);vec3 b=h*(j+s)*t+u;b.x+=u59*sin(g.y);vec2 x=i*v;vec3 y=vec3(f*x,-i)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(y,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u128,u129,a0.z),vv2=a1,vv0=b,vv4=a0.y;}",
                  i: p.concat(v, E),
                  G: ["a0", "a2", "a1"],
                  N: [3, 3, 2],
                  da: !0,
                };
                I.s88NNGLtextureNormalParamsMap = {
                  name: "_",
                  g:
                    "uniform sampler2D u1,u132,u56;uniform vec4 u91,u6,u57;uniform vec3 u126;uniform float u127,u55;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u132,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u127;vec4 a=u91,f=texture2D(u56,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u57*l),e=mix(e,z,u57.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u126,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u126,C,u55),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  s:
                    "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u130;uniform float u123,u128,u129,u124,u125,u131;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.,1.);const vec3 q=vec3(1.,1.,1.);const vec2 A=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 c=texture2D(u33,vec2(.25,.5));vec2 d=u67*e;vec3 a=u67*q;vec2 s=mix(c.a*u34,e,d),f=(2.*c.gb-e)*(1.-d);f.x*=-1.;vec3 g=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 h=r(g);vec3 t=mix(u122,u65,a);float u=mix(u123,u68,u67);vec3 v=mix(u60,u66,a);float w=mix(u63,1.,u67);vec2 i=u62/s;vec3 j=a0;float x=max(0.,-a0.z-u124)*u125;j.x+=x*sign(a0.x)*(1.-u67);vec3 b=h*(j+t)*u+v;b.x+=u59*sin(g.y);vec2 y=i*w;vec3 z=vec3(f*y,-i)+b*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(z,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv4=smoothstep(u128,u129,a0.z),vv3=a1,vv1=b,vv5=a0.y;}",
                  i: p.concat(v, ["u132"], E),
                  G: ["a3", "a0", "a2", "a1"],
                  N: [4, 3, 3, 2],
                  da: !0,
                };
                p = "u115 u103 u116 u91 u126 u127 u6".split(" ");
                I.s88color = {
                  name: "_",
                  g:
                    "uniform vec4 u91,u6;uniform vec3 u126;uniform float u127;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv3),c=u127;vec4 a=u91;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u126,0.),gl_FragData[3]=a;}",
                  s:
                    "attribute vec3 a0,a2;uniform mat4 u115,u103,u116;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){vec4 a=u116*vec4(a0,1.),b=u116*vec4(a2,0.);gl_Position=u115*u103*a,vv0=a.xyz,vv1=b.xyz,vv2=1.,vv3=a0.y;}",
                  i: p,
                  G: ["a0", "a2"],
                  da: !0,
                };
                I.s88 = {
                  name: "_",
                  g:
                    "uniform sampler2D u1;uniform vec4 u91,u6;uniform vec3 u126;uniform float u127,u55;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float c=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv4),d=u127;vec4 b=u91;float j=floor(15.99*d),k=floor(15.99*b.b);b.b=(j+16.*k)/255.;vec4 a=texture2D(u1,vv2);vec3 l=mix(u126,a.rgb,a.a);vec4 m=vec4(mix(a.rgb*u126,l,u55),a.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),c),gl_FragData[2]=m,gl_FragData[3]=b;}",
                  s:
                    "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u116*vec4(a0,1.),b=u116*vec4(a2,0.);gl_Position=u115*u103*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: p.concat(v),
                  G: ["a0", "a2", "a1"],
                  da: !0,
                };
                var y = ["u132", "u133"];
                I.s88NormalMap = {
                  name: "_",
                  g:
                    "uniform sampler2D u1,u132;uniform vec4 u91,u6;uniform vec3 u133,u126;uniform float u127,u55;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 l=vec3(1.,1.,1.);void main(){float m=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv5);vec3 v=vec3(0.,0.,-1.),d=normalize(vv2),b=texture2D(u132,vv3).xyz;b=normalize(b*255./127.-1.007874*l);vec3 g=vv0.xyz,n=cross(d,g)*vv0.w;mat3 o=mat3(g,n,d);vec3 p=o*b;float q=u127;vec4 c=u91;float r=floor(15.99*q),s=floor(15.99*c.b);c.b=(r+16.*s)/255.;vec4 a=texture2D(u1,vv3);vec3 t=mix(u126,a.rgb,a.a);vec4 u=vec4(mix(a.rgb*u126,t,u55),a.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(p,m),gl_FragData[2]=u,gl_FragData[3]=c;}",
                  s:
                    "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u116*vec4(a0,1.),b=u116*vec4(a2,0.);gl_Position=u115*u103*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: p.concat(v, y),
                  G: ["a0", "a2", "a1", "a3"],
                  da: !0,
                };
                I.s88ParamsMap = {
                  name: "_",
                  g:
                    "uniform sampler2D u1,u56;uniform vec4 u91,u6,u57;uniform vec3 u126;uniform float u127,u55;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float g=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv4),d=u127;vec4 a=u91,e=texture2D(u56,vv2);vec2 b=j(e.b,4.);float h=1.-b.x,o=b.y;b=j(e.a,1.);float p=b.x,f=b.y;vec4 q=vec4(e.rg,o,p);float r=h;a=mix(a,q,u57*f),d=mix(d,r,u57.b*f);float s=floor(15.99*d),t=floor(15.99*a.b);a.b=(s+16.*t)/255.;vec4 c=texture2D(u1,vv2);vec3 u=mix(u126,c.rgb,c.a);vec4 v=vec4(mix(c.rgb*u126,u,u55),c.a);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),g),gl_FragData[2]=v,gl_FragData[3]=a;}",
                  s:
                    "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u116*vec4(a0,1.),b=u116*vec4(a2,0.);gl_Position=u115*u103*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                  i: p.concat(v, E),
                  G: ["a0", "a2", "a1"],
                  da: !0,
                };
                I.s88NormalParamsMap = {
                  name: "_",
                  g:
                    "uniform sampler2D u1,u132,u56;uniform vec4 u91,u6,u57;uniform vec3 u133,u126;uniform float u127,u55;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 q=vec3(1.,1.,1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float r=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv5);vec3 E=vec3(0.,0.,-1.),g=normalize(vv2),d=texture2D(u132,vv3).xyz;d=normalize(d*255./127.-1.007874*q);vec3 h=vv0.xyz,s=cross(g,h)*vv0.w;mat3 t=mat3(h,s,g);vec3 u=t*d;float e=u127;vec4 a=u91,f=texture2D(u56,vv3);vec2 b=k(f.b,4.);float v=1.-b.x,w=b.y;b=k(f.a,1.);float x=b.x,l=b.y;vec4 y=vec4(f.rg,w,x);float z=v;a=mix(a,y,u57*l),e=mix(e,z,u57.b*l);float A=floor(15.99*e),B=floor(15.99*a.b);a.b=(A+16.*B)/255.;vec4 c=texture2D(u1,vv3);vec3 C=mix(u126,c.rgb,c.a);vec4 D=vec4(mix(c.rgb*u126,C,u55),c.a);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(u,r),gl_FragData[2]=D,gl_FragData[3]=a;}",
                  s:
                    "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u115,u103,u116;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u116*vec4(a0,1.),b=u116*vec4(a2,0.);gl_Position=u115*u103*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                  i: p.concat(v, y, E),
                  G: ["a0", "a2", "a1", "a3"],
                  da: !0,
                };
              } else x();
              z();
              p = [{ type: "1i", name: "u1", value: 0 }];
              J.j("s0", p);
              J.j("s1", p);
              J.j("s61", [{ type: "1i", name: "u5", value: 1 }].concat(p));
              J.j("s62", [{ type: "1i", name: "u5", value: 1 }].concat(p));
              J.j("s11", [{ type: "1i", name: "u28", value: 1 }].concat(p));
              J.j("s63", [{ type: "1i", name: "u28", value: 1 }].concat(p));
              J.j("s64", p);
              J.j("s65", p);
              J.j(
                "s66",
                [
                  { type: "1i", name: "u73", value: 1 },
                  { type: "1i", name: "u33", value: 2 },
                ].concat(p)
              );
              J.j("s67", p);
              J.j("s42", p);
              J.j("s68", [
                { type: "1i", name: "u75", value: 0 },
                { type: "1i", name: "u76", value: 1 },
              ]);
              J.j("s69", [
                { type: "1i", name: "u79", value: 0 },
                { type: "1i", name: "u80", value: 1 },
              ]);
              J.j("s70", p);
              J.j("s71", p);
              J.j("s72", p);
              J.j("s73", p);
              J.j("s74", p);
              J.j("s75", [{ type: "1i", name: "u28", value: 1 }].concat(p));
              J.j("s76", [{ type: "1i", name: "u28", value: 1 }].concat(p));
              ia.ba &&
                (J.j("s80", [
                  { type: "1i", name: "u88", value: 0 },
                  { type: "1i", name: "u89", value: 1 },
                  { type: "1f", name: "u109", value: ia.Ri },
                  { type: "1f", name: "u110", value: ia.Si },
                  { type: "1f", name: "u111", value: ia.dj },
                  { type: "1f", name: "u112", value: ia.Vi },
                  { type: "1f", name: "u113", value: ia.Wi },
                  { type: "1f", name: "u108", value: 1 },
                  { type: "1f", name: "u100", value: 1 },
                ]),
                J.j("s81", p));
              y = [
                { type: "1i", name: "u88", value: 0 },
                { type: "1i", name: "u89", value: 1 },
                { type: "1i", name: "u90", value: 2 },
                { type: "1i", name: "u79", value: 3 },
                { type: "1i", name: "u92", value: 4 },
                { type: "1i", name: "u91", value: 6 },
                { type: "1i", name: "u81", value: 7 },
                { type: "1f", name: "u98", value: 0 },
                { type: "1f", name: "u95", value: 0 },
                { type: "1f", name: "u97", value: 0 },
              ];
              ia.ba &&
                J.j(
                  "s78",
                  y.concat([
                    { type: "1f", name: "u100", value: ia.Ui[Aa.T()] },
                    { type: "1i", name: "u99", value: 5 },
                  ])
                );
              J.j(
                "s79",
                y.concat([
                  { type: "1f", name: "u101", value: ia.Nb },
                  { type: "1f", name: "u102", value: ia.hd },
                ])
              );
              J.j("s83", [
                { type: "1i", name: "u117", value: 0 },
                { type: "1i", name: "u92", value: 1 },
                { type: "1i", name: "u80", value: 2 },
                { type: "1f", name: "u120", value: ia.Dm },
              ]);
              J.j("s84", p);
              J.j("s85", p);
              J.j(
                "s77",
                [
                  { type: "1i", name: "u2", value: 1 },
                  { type: "1i", name: "u82", value: 2 },
                  { type: "1i", name: "u81", value: 3 },
                  { type: "1f", name: "u87", value: 1 },
                  { type: "2f", name: "u84", value: [0, 0] },
                ].concat(p)
              );
              Aa.X()
                ? (J.j("s88", p),
                  J.j(
                    "s88NormalMap",
                    [{ type: "1i", name: "u132", value: 1 }].concat(p)
                  ),
                  J.j(
                    "s88ParamsMap",
                    [{ type: "1i", name: "u56", value: 1 }].concat(p)
                  ),
                  J.j(
                    "s88NormalParamsMap",
                    [
                      { type: "1i", name: "u132", value: 1 },
                      { type: "1i", name: "u56", value: 2 },
                    ].concat(p)
                  ))
                : K();
              B = !0;
            },
            rm: function () {
              x();
              z();
              K();
            },
            Tc: function () {
              return F.id;
            },
            ue: function () {
              return C;
            },
            ve: function () {
              return A;
            },
            set: function (p) {
              bb.ii(J);
              I[p].set();
            },
            Qb: function (p) {
              return u(p, q());
            },
            od: function (p) {
              return u(p, {
                name: "_",
                g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                i: [],
                precision: "highp",
              });
            },
            vm: function (p) {
              return u(p, {
                name: "_",
                g:
                  "const vec4 d=vec4(.5,.5,.5,.5);void main(){gl_FragData[0]=d,gl_FragData[1]=d,gl_FragData[2]=d,gl_FragData[3]=d;}",
                i: [],
                precision: "highp",
                da: !0,
              });
            },
            I: function () {
              -1 !== P && F.I();
            },
            qd: function () {
              var p = 0;
              F.ua.forEach(function (y, X) {
                X = F.N[X];
                f.vertexAttribPointer(y, X, f.FLOAT, !1, F.Kf, p);
                p += 4 * X;
              });
            },
            sc: function () {
              J.Sb(f);
            },
            Sb: function (p) {
              p.vertexAttribPointer(F.ua[0], 2, p.FLOAT, !1, 8, 0);
            },
            to: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 12, 0);
            },
            Ja: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 32, 0);
            },
            Ra: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 24, 0);
            },
            bi: function () {
              f.vertexAttribPointer(F.attributes.a2, 3, f.FLOAT, !1, 32, 12);
            },
            ci: function () {
              f.vertexAttribPointer(F.attributes.a2, 3, f.FLOAT, !1, 24, 12);
            },
            qc: function () {
              f.vertexAttribPointer(F.attributes.a1, 2, f.FLOAT, !1, 32, 24);
            },
            uo: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 20, 0);
              f.vertexAttribPointer(F.attributes.a1, 2, f.FLOAT, !1, 20, 12);
            },
            jm: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 32, 0);
              f.vertexAttribPointer(F.attributes.a2, 3, f.FLOAT, !1, 32, 12);
              f.vertexAttribPointer(F.attributes.a1, 2, f.FLOAT, !1, 32, 24);
            },
            km: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 32, 0);
              f.vertexAttribPointer(F.attributes.a2, 3, f.FLOAT, !1, 32, 12);
            },
            lm: function () {
              f.vertexAttribPointer(F.attributes.a0, 3, f.FLOAT, !1, 24, 0);
              f.vertexAttribPointer(F.attributes.a2, 3, f.FLOAT, !1, 24, 12);
            },
            md: function () {
              f.vertexAttribPointer(F.attributes.a3, 4, f.FLOAT, !1, 16, 0);
            },
            pd: function (p, y) {
              f.uniform1i(F.v[p], y);
            },
            F: function (p, y) {
              f.uniform1f(F.v[p], y);
            },
            S: function (p, y, X) {
              f.uniform2f(F.v[p], y, X);
            },
            ji: function (p, y) {
              f.uniform2fv(F.v[p], y);
            },
            rf: function (p, y, X, ja) {
              f.uniform3f(F.v[p], y, X, ja);
            },
            sf: function (p, y) {
              f.uniform3fv(F.v[p], y);
            },
            ra: function (p, y) {
              f.uniform4fv(F.v[p], y);
            },
            ym: function (p, y) {
              f.uniformMatrix2fv(F.v[p], !1, y);
            },
            zm: function (p, y) {
              f.uniformMatrix3fv(F.v[p], !1, y);
            },
            rc: function (p, y) {
              f.uniformMatrix4fv(F.v[p], !1, y);
            },
            j: function (p, y) {
              J.set(p);
              y.forEach(function (X) {
                switch (X.type) {
                  case "4f":
                    f.uniform4fv(F.v[X.name], X.value);
                    break;
                  case "3f":
                    f.uniform3fv(F.v[X.name], X.value);
                    break;
                  case "2f":
                    f.uniform2fv(F.v[X.name], X.value);
                    break;
                  case "1f":
                    f.uniform1f(F.v[X.name], X.value);
                    break;
                  case "1i":
                    f.uniform1i(F.v[X.name], X.value);
                    break;
                  case "mat2":
                    f.uniformMatrix2fv(F.v[X.name], !1, X.value);
                    break;
                  case "mat4":
                    f.uniformMatrix4fv(F.v[X.name], !1, X.value);
                }
              });
            },
            J: function () {
              for (var p in I) {
                var y = I[p];
                f.detachShader(y.ka, y.xe);
                f.detachShader(y.ka, y.we);
                f.deleteShader(y.xe);
                f.deleteShader(y.we);
                f.deleteProgram(y.ka);
              }
            },
            L: function () {},
          };
        return J;
      })(),
      Ib = (function () {
        var c = {},
          e = [],
          m = !1,
          k = 0,
          u = 0,
          q = -1,
          K = -1,
          x = -1,
          z = 1,
          B = null,
          v = !1,
          E = null,
          C = !1,
          A = !1,
          I = !1,
          P = !1,
          F = !1,
          ea = !1,
          J = !1,
          p = null,
          y = null,
          X = -1,
          ja = -1,
          R = null,
          G = -1,
          V,
          N = null,
          aa = null,
          ba = null,
          T = null,
          ua = null,
          Ca = null,
          Ja = null,
          xa = [
            { type: "1f", name: "u67", value: 0 },
            { type: "1f", name: "u128", value: 0 },
            { type: "1f", name: "u129", value: 0 },
            { type: "1f", name: "u62", value: 1 },
            { type: "1f", name: "u59", value: 0 },
            { type: "1f", name: "u69", value: 1 },
          ],
          W = {
            m: function (D, da) {
              c.uf = D;
              Aa.Gf();
              ud.ke();
              Uc.ke(D.Cd);
              q = D.oe;
              K = D.ln;
              x = D.cd;
              z = D.hn;
              var S = [
                { type: "1f", name: "u62", value: q },
                { type: "1f", name: "u59", value: x },
                { type: "1f", name: "u63", value: D.am },
                { type: "mat4", name: "u58", value: D.Ol },
                { type: "2f", name: "u34", value: D.Gi },
              ];
              D.Ff = S;
              var wa = [
                { type: "3f", name: "u64", value: [0, 0, 0] },
                { type: "3f", name: "u65", value: D.Of },
                { type: "3f", name: "u66", value: D.Nf },
                { type: "1f", name: "u67", value: 0 },
                { type: "1f", name: "u68", value: D.Cd },
                { type: "1f", name: "u69", value: 1 },
              ];
              D.xi = wa;
              W.Uk(D, da);
              m || void 0 !== D.za || (D.za = [0, 0, 120]);
              J = ea = U.ye;
              if (!m && ea) {
                da = 1 * Aa.Fb();
                var Ba = 1 * Aa.Eb(),
                  a = { isLinear: !0, isPot: !1, width: da, height: Ba };
                p = ra.instance(a);
                y = ra.instance(a);
                X = 1 / da;
                ja = 1 / Ba;
              }
              S = [
                { type: "1i", name: "u33", value: 1 },
                { type: "3f", name: "u60", value: D.za },
                { type: "1f", name: "u124", value: D.Da },
                { type: "1f", name: "u125", value: D.va },
              ].concat(S, wa);
              B = D.qa;
              wa = [
                { type: "1f", name: "u128", value: B[0] },
                { type: "1f", name: "u129", value: B[1] },
              ];
              Aa.X()
                ? ((da = [{ type: "1i", name: "u1", value: 0 }]),
                  (Ba = [{ type: "1i", name: "u132", value: 2 }]),
                  O.j("s88NNGLcolor", S.concat(wa)),
                  O.j("s88NNGLtexture", [].concat(da, S, wa)),
                  O.j("s88NNGLtextureNormalMap", [].concat(da, Ba, S, wa)),
                  O.j(
                    "s88NNGLtextureParamsMap",
                    [{ type: "1i", name: "u56", value: 2 }].concat(da, S, wa)
                  ),
                  O.j(
                    "s88NNGLtextureNormalParamsMap",
                    [{ type: "1i", name: "u56", value: 3 }].concat(
                      da,
                      Ba,
                      S,
                      wa
                    )
                  ))
                : (O.j("s92", S.concat(wa)),
                  O.j("s93", [{ type: "1i", name: "u1", value: 0 }].concat(S)),
                  O.j("s94", S),
                  O.j("s95", S),
                  O.j(
                    "s96",
                    S.concat([{ type: "1i", name: "u132", value: 0 }])
                  ),
                  O.j("s97", S),
                  O.j(
                    "s98",
                    S.concat([{ type: "1i", name: "u56", value: 0 }])
                  ));
              O.j("s66", [{ type: "2f", name: "u74", value: D.Af }]);
              O.j(ia.ba ? "s78" : "s79", [
                { type: "1f", name: "u95", value: D.Md },
                { type: "3f", name: "u96", value: D.df },
                { type: "1f", name: "u97", value: D.Zd },
                { type: "1f", name: "u98", value: 1 },
                { type: "3f", name: "u93", value: D.Ji },
              ]);
              if ((V = D.ad))
                (R = D.tl),
                  O.j("s77", [
                    { type: "4f", name: "u83", value: D.$c },
                    { type: "1f", name: "u86", value: D.Pe },
                    { type: "2f", name: "u84", value: D.sl },
                  ]),
                  (G = D.Re);
              e.forEach(function (b) {
                b.Zh(D);
              });
              m = !0;
            },
            Uk: function (D, da) {
              void 0 !== eb.oa &&
                D.Ub &&
                Aa.X() &&
                (eb.oa.m(D),
                (C = !0),
                da.push(function (S) {
                  eb.oa.kf(S);
                  A = !0;
                }),
                void 0 !== eb.sa &&
                  D.Ic &&
                  (eb.sa.m(D),
                  da.push(function (S) {
                    eb.sa.kf(S);
                    I = !0;
                  })),
                void 0 !== eb.$b && D.Rd && (eb.$b.m(D), (F = P = !0)));
              void 0 !== eb.cb &&
                (eb.cb.m(D),
                (E = eb.cb.Wk({
                  width: D.ic,
                  height: 2 * D.ic,
                  depth: 1.5 * D.ic,
                  ek: -D.Ce,
                  Na: D.Ae,
                  Fj: D.Be,
                })),
                (v = !0));
            },
            xm: function (D, da, S, wa) {
              D &&
                ((Ja = D),
                C && eb.oa.Rb(D),
                I && eb.sa.Rb(D),
                P && eb.$b.Rb(D),
                e.forEach(function (Ba) {
                  Ba.Rb(D);
                }));
              S && (T = S);
              wa && (ua = wa);
            },
            mb: function (D) {
              Aa.X()
                ? (O.j("s88NNGLcolor", D),
                  O.j("s88NNGLtexture", D),
                  O.j("s88NNGLtextureNormalMap", D),
                  O.j("s88NNGLtextureParamsMap", D),
                  O.j("s88NNGLtextureNormalParamsMap", D))
                : (O.j("s92", D),
                  O.j("s93", D),
                  O.j("s94", D),
                  O.j("s95", D),
                  O.j("s96", D),
                  O.j("s97", D),
                  O.j("s98", D));
            },
            Ta: function (D, da, S) {
              var wa = [D[0] + da[0], D[1] + da[1], D[2] + da[2]];
              wa = [wa[0] + S[0], wa[1] + S[1], wa[2] + S[2]];
              c.Ia = wa;
              c.Al = da;
              c.Ym = S;
              W.mb([{ type: "3f", name: "u122", value: wa }]);
              Aa.X() && (C && eb.oa.Ta(D, da, S), I && eb.sa.Ta(wa));
              v && eb.cb.Ta(D);
            },
            Ua: function (D, da, S) {
              var wa = D * da * S;
              c.Bl = da;
              c.Zm = S;
              c.Ok = D;
              W.mb([{ type: "1f", name: "u123", value: wa }]);
              Aa.X() && (C && eb.oa.Ua(D * da, S), I && eb.sa.Ua(wa));
              v && eb.cb.Ua(D);
            },
            Rh: function () {
              W.Ta(c.Ia, c.Al, c.Ym);
              W.Ua(c.Ok, c.Bl, c.Zm);
              W.gi(c.kd);
              W.m(c.uf);
              W.di(c.lj, c.va);
            },
            gi: function (D) {
              c.kd = D;
              W.mb([{ type: "1f", name: "u61", value: D }]);
              Aa.X() && (C && eb.oa.pf(D), I && eb.sa.pf(D));
            },
            di: function (D, da) {
              c.lj = D;
              c.va = da;
              W.mb([
                { type: "1f", name: "u124", value: D },
                { type: "1f", name: "u125", value: da },
              ]);
            },
            pm: function (D) {
              B = D;
              0 === k &&
                W.mb([
                  { type: "1f", name: "u128", value: B[0] },
                  { type: "1f", name: "u129", value: B[1] },
                ]);
            },
            Sa: function (D) {
              function da() {
                v && eb.cb.toggle(!1);
                V && O.j("s77", [{ type: "1f", name: "u87", value: 0 }]);
              }
              0 >= D
                ? ((u = 0),
                  0 !== k &&
                    ((k = 0),
                    Uc.Xl(),
                    v && eb.cb.toggle(!0),
                    V && O.j("s77", [{ type: "1f", name: "u87", value: 1 }])))
                : 1 <= D
                ? ((u = 1), 1 !== k && ((k = 1), Uc.oi(!0)), da())
                : ((u = D), 2 !== k && (Uc.oi(!1), (k = 2), da()));
              O.j("s79", [{ type: "1f", name: "u98", value: 1 - D }]);
              xa[0].value = u;
              xa[1].value = B[0] * (1 - D) + -300 * D;
              xa[2].value = B[1] * (1 - D) + -300 * D;
              xa[3].value = q * (1 - D) + D * K;
              xa[4].value = x * (1 - D);
              xa[5].value = 1 - D + D * z;
              A && eb.oa.qf(u, xa);
              I && eb.sa.qf(u, xa);
              W.mb(xa);
            },
            ak: function (D) {
              Ja.h(1);
              D.forEach(function (da) {
                da.Vj();
              });
              v && E.V();
            },
            ll: function () {
              return 1 === k;
            },
            Od: function (D) {
              Ja.zb(D);
            },
            Oi: function (D) {
              e.push(D);
            },
            yf: function (D) {
              A = D && C;
            },
            xf: function (D) {
              F = D && P;
            },
            jf: function (D) {
              I && Aa.X() && eb.sa.Am(D);
            },
            ob: function () {
              Aa.X() && (C && eb.oa.ob(), I && eb.sa.ob());
            },
            Yj: function (D, da) {
              if (!J) return !1;
              p.R();
              D.h(0);
              O.set("s70");
              O.S("u7", 0, ja);
              ta.l(!1, !1);
              y.o();
              p.h(0);
              O.S("u7", X, 0);
              ta.l(!1, !1);
              O.set("s71");
              da.R();
              y.h(0);
              ta.l(!1, !1);
              return !0;
            },
            ni: function (D) {
              J = D && ea;
            },
            resize: function (D, da, S) {
              ea &&
                ((D *= S),
                (da *= S),
                p.resize(D, da),
                y.resize(D, da),
                (X = 1 / D),
                (ja = 1 / da));
            },
            gf: function (D, da) {
              var S = D.K(),
                wa = D.Y(),
                Ba = { width: S, height: wa, isPot: !1 };
              C && (ba && ba.remove(), (ba = ra.instance(Ba)));
              N = Va.instance({ width: S, height: wa });
              P || I
                ? (eb.$b.hf(S, wa), aa && aa.remove(), (aa = ra.instance(Ba)))
                : (aa = D);
              C && eb.oa.hf(S, wa);
              da && (Ca && Ca.remove(), (Ca = ra.instance(Ba)));
            },
            Tj: function (D) {
              var da = null;
              switch (k) {
                case 0:
                  da = D;
                  break;
                case 2:
                  N.bind(!1, !0);
                  Ca.o();
                  O.set("s61");
                  O.F("u6", u);
                  D.h(1);
                  ua.h(0);
                  ta.l(!0, !0);
                  da = Ca;
                  break;
                case 1:
                  da = ua;
              }
              if (!A || 1 === k || !Aa.X()) return da;
              da.zb(0);
              F && eb.$b.V(da, aa);
              N.bind(!1, !F);
              I &&
                (F ? da.h(0) : (aa.o(), O.set("s1"), ta.l(!0, !0)), eb.sa.V());
              aa.h(0);
              T.zb(2);
              eb.oa.V();
              ba.o();
              O.set("s1");
              F || I ? aa.h(0) : da.h(0);
              ta.l(!0, !ia.ba);
              eb.oa.add();
              return ba;
            },
            Zj: function (D, da) {
              if (!V) return !1;
              O.set("s77");
              O.F("u85", D * G);
              R.h(1);
              Ib.Od(2);
              aa ? aa.h(3) : da.h(3);
              return !0;
            },
          };
        return W;
      })(),
      Za = (function () {
        function c() {
          x.forEach(function (S) {
            S.bk(ua);
          });
        }
        function e() {
          x.forEach(function (S) {
            S.Mc(ua);
          });
        }
        function m() {
          x.forEach(function (S) {
            S.$j(ua);
          });
        }
        function k() {
          x.forEach(function (S) {
            S.Nc(ua);
          });
        }
        function u() {
          ua
            ? Ib.ak(x)
            : x.forEach(function (S) {
                S.Wj();
              });
        }
        function q() {
          aa && clearTimeout(aa);
          aa = setTimeout(function () {
            aa = ja = !1;
          }, 16);
        }
        function K(S) {
          S();
        }
        var x = [],
          z = [],
          B = { ea: !1, position: !1, kb: !1 },
          v = [],
          E = [],
          C = null,
          A = 0,
          I = !1,
          P = null,
          F = null,
          ea = null,
          J = null,
          p = !1,
          y = !1,
          X = !1,
          ja = !1,
          R = !1,
          G = !1,
          V = !1,
          N = !1,
          aa = !1,
          ba = null,
          T = !1,
          ua = !1,
          Ca = !1,
          Ja = !1,
          xa = !1,
          W = !1,
          D = !1,
          da = {
            m: function () {
              f.enable(f.DEPTH_TEST);
              f.depthFunc(f.LEQUAL);
              f.clearDepth(1);
              ia.Dj
                ? (f.enable(f.CULL_FACE),
                  f.frontFace("CCW" === ia.Ej ? f.CCW : f.CW),
                  f.cullFace(f.BACK))
                : f.disable(f.CULL_FACE);
              da.dg();
              var S = {
                isPot: !1,
                isLinear: !1,
                width: Aa.Fb(),
                height: Aa.Eb(),
                D: 4,
                isFloat: !1,
              };
              P = ra.instance(S);
              S = Object.assign({}, S, {
                isLinear: !0,
                width: Aa.K(),
                height: Aa.Y(),
              });
              F = ra.instance(S);
              ea = ra.instance(S);
              ia.Fa &&
                ((S = Object.assign({}, S, { isLinear: !1 })),
                (J = ra.instance(S)));
              G = cb.ca();
              ia.Fa ||
                (C = gd.instance({
                  fb: ia.fb,
                  xb: ia.xb,
                  yb: ia.yb,
                  wb: ia.wb,
                }));
              p = !0;
            },
            dg: function () {
              Aa.X()
                ? (B = Wc.instance({}))
                : ((B.ea = Qc.instance({
                    Tb: ia.Fa ? !1 : "s89",
                    isFloat: !1,
                    Ib: !0,
                    clearColor: [0, 0, 0, 0],
                    D: 4,
                  })),
                  (B.position = Qc.instance({
                    Tb: ia.Fa ? !1 : "s99",
                    isFloat: !0,
                    Ib: !0,
                    clearColor: [0, 0, 0, 0],
                    D: 4,
                  })),
                  (B.kb = Qc.instance({
                    Tb: !1,
                    isFloat: !0,
                    Ib: !0,
                    clearColor: [0, 0, 0, 0],
                    D: 4,
                  })),
                  (B.lc = Qc.instance({
                    Tb: !1,
                    isFloat: !1,
                    Ib: !0,
                    clearColor: [0, 0, 0, 0],
                    D: 4,
                  })));
            },
            yk: function () {
              return C;
            },
            na: function (S) {
              C = S;
            },
            Io: function () {},
            ob: function () {
              Ib.ob();
            },
            Zh: function (S) {
              Ib.m(S, v);
              Aa.X() || (B.ea.hi(!1), B.position.hi("s92"));
              ua = Ja = !0;
            },
            ro: function () {
              Ib.Rh();
            },
            tn: function (S) {
              Ib.Oi(S);
            },
            gm: function (S, wa, Ba) {
              Ib.Ta(S, wa, Ba);
            },
            hm: function (S, wa, Ba) {
              Ib.Ua(S, wa, Ba);
            },
            em: function (S, wa) {
              Ib.di(S, wa);
            },
            fm: function (S) {
              Ib.pm(S);
            },
            im: function (S) {
              Ib.gi(S);
            },
            Sa: function (S) {
              Ib.Sa(S);
            },
            $h: function (S, wa, Ba, a) {
              Ib.xm(S, wa, Ba, a);
              wa && da.gf(wa, a ? !0 : !1);
              Ca = !0;
            },
            yf: function (S) {
              Ib.yf(S);
            },
            jf: function (S) {
              Ib.jf(S);
            },
            xf: function (S) {
              Ib.xf(S);
            },
            ni: function (S) {
              Ib.ni(S);
            },
            un: function (S) {
              T &&
                ((xa = !0),
                (W = ra.instance({ width: ba.K(), height: ba.Y(), isPot: !1 })),
                (D = S));
            },
            gf: function (S, wa) {
              ba =
                "string" === typeof S
                  ? ra.instance({ url: S, isFloat: !1 })
                  : S;
              ua && Ib.gf(ba, wa);
              T = !0;
            },
            Ni: function (S) {
              x.push(S);
              0 !== v.length &&
                (v.forEach(function (wa) {
                  wa(S);
                }),
                v.splice(0, v.length));
            },
            Ul: function (S) {
              S = x.indexOf(S);
              -1 !== S && x.splice(S, 1);
            },
            vn: function (S) {
              z.push(S);
            },
            oo: function (S) {
              S = z.indexOf(S);
              -1 !== S && z.splice(S, 1);
            },
            vd: function (S) {
              ua && (y = S);
            },
            animate: function (S) {
              !ia.Fa || (ua && Ca)
                ? y &&
                  (ja || (A > ia.Cl && R)
                    ? (V && clearTimeout(V),
                      ++A,
                      window.cancelAnimationFrame(da.animate),
                      (V = setTimeout(function () {
                        window.requestAnimationFrame(da.animate);
                      }, 16)))
                    : (I && FPSCounter.Jo(),
                      da.Nh(S),
                      ++A,
                      ua || (y && window.requestAnimationFrame(da.animate))))
                : setTimeout(da.animate, 100);
            },
            yn: function (S) {
              E.push(S);
            },
            Nh: function (S) {
              if ((!ia.Fa || (ua && Ca)) && p) {
                E.forEach(K);
                if (Aa.X()) {
                  if (!B.set() && !Aa.ha()) {
                    Aa.Om();
                    da.dg();
                    Qc.Dc();
                    O.rm();
                    ia.Fa && Ib.Rh();
                    f.flush();
                    window.requestAnimationFrame(da.animate);
                    return;
                  }
                  ua || rd.Wl();
                  u();
                  B.I();
                  G && f.depthMask(!1);
                } else
                  ua && Ib.Od(1),
                    B.ea.set(!0, !0, !0),
                    e(),
                    B.ea.I(),
                    G && f.depthMask(!1),
                    B.lc.set(!1, !G, !1),
                    m(),
                    B.lc.I(),
                    B.position.set(!0, !G, !1),
                    Sb.V(),
                    c(),
                    B.position.I(),
                    B.kb.set(!1, !G, !1),
                    k(),
                    B.kb.I();
                f.disable(f.DEPTH_TEST);
                G || f.depthMask(!1);
                ia.ba && Kc.V();
                var wa = da.zg();
                null !== wa &&
                  (wa.h(7),
                  O.set(ia.ba ? "s78" : "s79"),
                  Qc.mj(),
                  P.R(),
                  ia.Pl
                    ? (f.enable(f.BLEND),
                      f.clearColor(0, 0, 0, 0),
                      f.clear(f.COLOR_BUFFER_BIT),
                      f.blendFunc(f.ONE, f.ONE_MINUS_SRC_ALPHA))
                    : f.disable(f.BLEND),
                  ua || Sb.je(),
                  B.position.h(0),
                  B.kb.h(1),
                  B.ea.h(2),
                  C.Fc(3),
                  B.lc.h(6),
                  C.Gc(4),
                  C.jg(),
                  ia.ba && Kc.h(5),
                  ta.l(!0, !0),
                  Va.ia(),
                  Ib.Yj(P, F) || (O.set("s1"), F.R(), P.h(0), ta.l(!1, !1)),
                  O.set("s67"),
                  ea.R(),
                  F.h(0),
                  ta.l(!1, !1),
                  F.o(),
                  ea.h(0),
                  Ja && ua
                    ? (O.set("s66"),
                      J.h(1),
                      Ib.Od(2),
                      ta.l(!1, !1),
                      O.set("s1"),
                      J.R(),
                      F.h(0),
                      ta.l(!1, !1))
                    : (O.set("s65"), ta.l(!1, !1), F.h(0)),
                  Va.Z(),
                  f.viewport(0, 0, Aa.K(), Aa.Y()),
                  (ua && Ib.Zj(S, wa)) || O.set("s1"),
                  ta.l(!1, !1),
                  f.enable(f.DEPTH_TEST),
                  f.depthMask(!0),
                  f.flush());
              }
            },
            zg: function () {
              if (!T) return ra.Kg();
              if (!ua) return ba;
              if (xa && !Ib.ll()) {
                O.set(D);
                Va.ia();
                W.tc();
                W.o();
                ba.h(0);
                var S = W;
                ta.l(!0, !0);
              } else S = ba;
              return Ib.Tj(S);
            },
            Hm: function () {
              ia.Jj ||
                y ||
                ((y = !0),
                da.animate(Date.now()),
                X || od.Im(),
                X || Uc.Zb(!1),
                N && clearTimeout(N),
                ia.ba && Kc.nd(),
                (N = setTimeout(da.xa, ia.ij)),
                X || Aa.Rk(),
                (X = !0));
            },
            Go: function () {
              y && ((R = y = !1), cancelAnimationFrame(da.animate));
            },
            xa: function () {
              R ||
                !X ||
                ja ||
                ia.gg ||
                ((R = ja = !0),
                N && clearTimeout(N),
                aa && clearTimeout(aa),
                Sb.re().Oh(),
                (N = setTimeout(function () {
                  Aa.Hf(ia.Gl);
                  ia.ba && Kc.yi();
                  A = 0;
                  q();
                }, 24)));
            },
            wake: function () {
              R &&
                X &&
                !ja &&
                ((ja = !0),
                (R = !1),
                (A = 0),
                Sb.re().Oh(),
                N && clearTimeout(N),
                aa && clearTimeout(aa),
                (N = setTimeout(function () {
                  Aa.Hf(1);
                  ia.ba && Kc.nd();
                  q();
                }, 16)));
            },
            bo: function () {
              I = !0;
            },
            Qj: function () {
              I && FPSCounter.remove();
              I = !1;
            },
            ud: function (S) {
              Ja = S;
            },
            Po: function () {
              O.j("s79", [
                { type: "1f", name: "u101", value: ia.Nb },
                { type: "1f", name: "u102", value: ia.hd },
              ]);
            },
            resize: function (S, wa, Ba) {
              P.resize(S * Ba, wa * Ba);
              F.resize(S, wa);
              ea.resize(S, wa);
              ia.Fa && J.resize(S, wa);
              Ib.resize(S, wa, Ba);
              S = [{ type: "2f", name: "u7", value: [1 / S, 1 / wa] }];
              O.j("s67", S);
              O.j("s65", S);
            },
            J: function () {
              x.concat(z).forEach(function (S) {
                S.J();
              });
              x.splice(0, x.length);
              z.splice(0, z.length);
              B.ea.remove();
              B.kb.remove();
              B.lc.remove();
              B.position.remove();
              P.remove();
              F.remove();
              ea.remove();
              J && J.remove();
              ja = !0;
            },
          };
        return da;
      })(),
      eb = {},
      Aa = (function () {
        function c() {
          Qc.resize(m * C, k * C);
          J.X() && Wc.resize(m * C, k * C);
          Za.resize(m, k, C);
          ia.ba && Kc.resize(m * C, k * C, C);
          J.Gf();
        }
        var e = null,
          m = 0,
          k = 0,
          u = -1,
          q = !1,
          K = !1,
          x = !1,
          z = !1,
          B = !1,
          v = !1,
          E = !1,
          C = 1,
          A = !1,
          I = !1,
          P = !1,
          F = !1,
          ea = !1,
          J = {
            m: function (p) {
              void 0 !== p.onload && p.onload && (I = p.onload);
              void 0 === p.expand && (p.expand = !1);
              void 0 === p.Yc && (p.Yc = !1);
              void 0 === p.pa && (p.pa = !1);
              void 0 === p.Gb && (p.Gb = !1);
              void 0 === p.alpha && (p.alpha = !1);
              void 0 === p.preserveDrawingBuffer &&
                (p.preserveDrawingBuffer = !1);
              p.Yc && (q = !0);
              e = p.pa ? p.pa : document.getElementById(p.yj);
              p.expand && J.expand();
              try {
                window.qn = p.Gb
                  ? p.Gb.kk()
                  : e.getContext("webgl", {
                      antialias: !1,
                      alpha: p.alpha,
                      depth: !0,
                      premultipliedAlpha: !1,
                      stencil: !1,
                      preserveDrawingBuffer: p.preserveDrawingBuffer,
                    });
                F = p.Gb ? p.Gb.ha() : !1;
                P = !F;
                8 > f.getParameter(f.MAX_TEXTURE_IMAGE_UNITS) &&
                  J.Jc("too few texture image units");
                if (!cb.m()) return J.Jc("invalid config");
                ia.Vm &&
                  (K = f.getExtension("EXT_texture_filter_anisotropic")) &&
                  (B = !0);
                ia.Wm && f.getExtension("WEBGL_compressed_texture_s3tc");
                P &&
                  (f.getExtension("OES_element_index_uint") ||
                    f.getExtension("MOZ_OES_element_index_uint") ||
                    f.getExtension("WEBKIT_OES_element_index_uint"));
                !F && ia.Xm && (x = f.getExtension("EXT_sRGB")) && (v = !0);
                P
                  ? (z = f.getExtension("WEBGL_draw_buffers")) &&
                    !ia.fg &&
                    (E = !0)
                  : (E = 4 <= f.getParameter(f.MAX_DRAW_BUFFERS));
                if (E) {
                  var y = J.Mj();
                  E = E && y;
                }
              } catch (X) {
                return J.Jc(X);
              }
              if (null === f || !f) return J.Jc("NO_GL");
              p.expand && window.addEventListener("resize", J.expand, !1);
              e.addEventListener(
                "contextmenu",
                function (X) {
                  X.preventDefault();
                  return !1;
                },
                !1
              );
              m = e.width;
              k = e.height;
              J.Ge();
              return !0;
            },
            Ge: function () {
              u = q ? 3 : 2;
              cb.ca() || (u = Math.min(u, 1));
              cb.vj() || (u = Math.min(u, 0));
              ud.m();
              Qc.m();
              for (var p in eb) eb[p].oc();
              O.m();
              Sb.m();
              Uc.m();
              Za.m();
              od.m();
              ia.ba && Kc.m();
              "undefined" !== typeof FPSCounter && FPSCounter.m();
              J.Gf();
              J.Oj();
              A = !0;
              I && I();
              return !0;
            },
            Oj: function () {
              if (E) {
                var p = Wc.instance({ width: 256, height: 1 });
                p.bind();
                f.viewport(0, 0, 256, 1);
                O.set("s87");
                O.ra("color", [1, 0, 0, 1]);
                ta.l(!0, !0);
                f.clearColor(0, 0, 0, 0);
                f.clear(f.COLOR_BUFFER_BIT || f.DEPTH_BUFFER_BIT);
                Va.Z();
                O.set("s1");
                p.kb.h(0);
                ta.l(!1, !1);
                p = new Uint8Array(1024);
                f.readPixels(0, 0, 256, 1, f.RGBA, f.UNSIGNED_BYTE, p);
                ea = 1 >= p[1020];
              }
            },
            Mj: function () {
              var p = Wc.instance({ width: 1, height: 1 });
              if (!p.set()) return p.remove(), !1;
              O.vm(f);
              ta.Db(f);
              f.bindFramebuffer(f.FRAMEBUFFER, null);
              O.Qb(f);
              p.ea.zb(0);
              ta.Db(f);
              var y = new Uint8Array(4);
              f.readPixels(0, 0, 1, 1, f.RGBA, f.UNSIGNED_BYTE, y);
              p.remove();
              return 3 < Math.abs(y[0] - 127) ? !1 : !0;
            },
            ha: function () {
              return F;
            },
            K: function () {
              return m;
            },
            Y: function () {
              return k;
            },
            Fb: function () {
              return C * J.K();
            },
            Eb: function () {
              return C * J.Y();
            },
            mk: function () {
              return m / k;
            },
            T: function () {
              return u;
            },
            jl: function () {
              return 3 === u;
            },
            fh: function () {
              return ea;
            },
            X: function () {
              return E;
            },
            Om: function () {
              E = !1;
            },
            io: function () {
              return !1;
            },
            xj: function () {
              return 0 < J.T();
            },
            Dn: function () {
              return J.X() && 0 < J.T();
            },
            qe: function (p) {
              var y = f,
                X = "";
              F || ((y = z), (X = "_WEBGL"));
              return [
                y["COLOR_ATTACHMENT0" + X],
                y["COLOR_ATTACHMENT1" + X],
                y["COLOR_ATTACHMENT2" + X],
                y["COLOR_ATTACHMENT3" + X],
              ].splice(0, p);
            },
            Sc: function (p) {
              return J.qe(4)[p];
            },
            Kk: function () {
              return F
                ? f.SRGB
                  ? f.SRGB
                  : f.RGBA
                : v
                ? x.SRGB_ALPHA_EXT
                : f.RGBA;
            },
            hl: function () {
              return B;
            },
            tk: function () {
              return K;
            },
            wl: function (p) {
              J.ha() ? f.drawBuffers(J.qe(p)) : z.drawBuffersWEBGL(J.qe(p));
            },
            expand: function () {
              Za.wake();
              J.resize(window.innerWidth, window.innerHeight);
              Za.xa();
            },
            resize: function (p, y) {
              !e ||
                (p === m && y === k) ||
                ((m = p),
                (k = y),
                (e.width = m),
                (e.height = k),
                A && (Sb.resize(), c()));
            },
            Gf: function () {
              var p = [
                { type: "2f", name: "u7", value: [1 / Aa.Fb(), 1 / Aa.Eb()] },
              ];
              O.j("s67", p);
              O.j("s65", p);
            },
            Hf: function (p) {
              C = p;
              c();
            },
            Ca: function (p, y) {
              e.addEventListener(p, y, !1);
            },
            Jc: function () {
              u = -1;
              return !1;
            },
            Zf: function () {
              return 0 <= u;
            },
            ko: function () {},
            so: function () {},
            Fo: function () {
              var p = document.getElementById("loading");
              p && (p.style.display = "block");
            },
            Rk: function () {
              var p = document.getElementById("loading");
              p && (p.style.display = "none");
            },
            J: function () {
              J.Zf() &&
                (ra.wi(),
                Za.J(),
                ta.J(),
                Qc.J(),
                ia.ba && Kc.J(),
                gd.J(),
                od.J(),
                O.J(),
                ra.J(),
                f.flush(),
                (f = null));
            },
          };
        return J;
      })(),
      Sb = (function () {
        var c = !1,
          e = !1,
          m = [];
        return {
          m: function () {},
          instance: function (k) {
            void 0 === k.Ph && (k.Ph = !0);
            void 0 === k.Fd && (k.Fd = 0.1);
            void 0 === k.Ed && (k.Ed = 100);
            void 0 === k.direction && (k.direction = [0, 0, -1]);
            void 0 === k.yg && (k.yg = 45);
            var u = new Kb(),
              q = new Ya(50, -50, -400),
              K = null;
            u.setPosition(q);
            var x = new Int8Array(20),
              z = new Int8Array(20),
              B = 0,
              v = 0,
              E = 0,
              C = 0,
              A = {
                V: function () {
                  z[O.Tc()] || (O.rc("u103", u.elements), (z[O.Tc()] = 1));
                  x[O.Tc()] || (O.rc("u115", K), (x[O.Tc()] = 1));
                },
                ie: function () {
                  v || (O.rc("u103", u.elements), (v = 1));
                  B || (O.S("u104", K[0], K[5]), (B = 1));
                },
                je: function () {
                  E || (O.rf("u93", q.x, q.y, q.z), (E = 1));
                },
                Bb: function () {
                  C || (O.rf("u133", q.x, q.y, q.z), (C = 1));
                },
                ag: function () {
                  var I = k.Fd,
                    P = k.Ed,
                    F = Math.tan((0.5 * k.yg * Math.PI) / 180);
                  K = [
                    0.5 / F,
                    0,
                    0,
                    0,
                    0,
                    (0.5 * Aa.mk()) / F,
                    0,
                    0,
                    0,
                    0,
                    -(P + I) / (P - I),
                    -1,
                    0,
                    0,
                    (-2 * P * I) / (P - I),
                    0,
                  ];
                  for (I = 0; 20 > I; ++I) x[I] = 0;
                  B = 0;
                },
                qm: function (I, P) {
                  q.Xh(P[0]).Yh(P[1]).z = P[2];
                  u.elements.set(I);
                  for (I = 0; 20 > I; ++I) z[I] = 0;
                  C = E = v = 0;
                },
                Oh: function () {
                  for (var I = (C = E = 0); 20 > I; ++I) z[I] = 0;
                },
              };
            A.ag();
            c = A;
            e = !0;
            k.Ph && m.push(A);
            return A;
          },
          V: function () {
            e && c.V();
          },
          ie: function () {
            e && c.ie();
          },
          je: function () {
            e && c.je();
          },
          Bb: function () {
            e && c.Bb();
          },
          resize: function () {
            m.forEach(function (k) {
              k.ag();
            });
          },
          re: function () {
            return c;
          },
        };
      })(),
      Qc = (function () {
        var c = [],
          e = null;
        return {
          m: function () {
            e = Va.instance({ width: Aa.Fb(), height: Aa.Eb(), jc: !Aa.X() });
          },
          instance: function (m) {
            void 0 === m.width && (m.width = Aa.Fb());
            void 0 === m.height && (m.height = Aa.Eb());
            void 0 === m.isFloat && (m.isFloat = !1);
            void 0 === m.Ib && (m.Ib = !1);
            void 0 === m.clearColor && (m.clearColor = [0, 0, 0, 0]);
            void 0 === m.D && (m.D = 4);
            var k = ra.instance({
                isFloat: m.isFloat && cb.ca(),
                P: m.isFloat,
                width: m.width,
                height: m.height,
                isPot: !1,
                isLinear: !1,
                D: m.D,
              }),
              u = void 0 !== m.Tb && m.Tb ? !0 : !1,
              q = m.Tb,
              K = {
                set: function (x, z, B) {
                  B && e.bind(!1, B);
                  k.o();
                  x &&
                    (f.clearColor(
                      m.clearColor[0],
                      m.clearColor[1],
                      m.clearColor[2],
                      m.clearColor[3]
                    ),
                    e.Vd());
                  z && e.$f();
                  u && O.set(q);
                },
                hi: function (x) {
                  u = (q = x) ? !0 : !1;
                },
                I: function () {
                  k.xd();
                },
                h: function (x) {
                  k.h(x);
                },
                resize: function (x, z) {
                  k.resize(x, z);
                },
                debug: function () {
                  k.debug();
                },
                remove: function () {
                  k.remove();
                },
              };
            m.Ib && c.push(K);
            return K;
          },
          resize: function (m, k) {
            e.resize(m, k);
            c.forEach(function (u) {
              u.resize(m, k);
            });
          },
          mj: function () {
            e.Tf();
          },
          Dc: function () {
            e.Dc();
          },
          tc: function () {
            e.tc();
          },
          Gn: function () {
            e.$f();
          },
          Fn: function () {
            e.Vd();
          },
          En: function () {
            e.clear();
          },
          J: function () {
            e.remove();
          },
        };
      })(),
      Wc = (function () {
        var c = [];
        return {
          instance: function (e) {
            void 0 === e.width && (e.width = Aa.Fb());
            void 0 === e.height && (e.height = Aa.Eb());
            var m = f.createFramebuffer(),
              k = e.width,
              u = e.height,
              q = !0;
            e = {
              isFloat: cb.ca(),
              P: !0,
              width: k,
              height: u,
              isPot: !1,
              isLinear: !1,
              D: 4,
            };
            var K = ra.instance(e),
              x = ra.instance(e),
              z = ra.instance(e),
              B = ra.instance(e),
              v = Va.uk(),
              E = Va.Eg();
            f.bindFramebuffer(v, m);
            var C = f.createRenderbuffer();
            f.bindRenderbuffer(f.RENDERBUFFER, C);
            f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_COMPONENT16, k, u);
            f.framebufferRenderbuffer(v, f.DEPTH_ATTACHMENT, f.RENDERBUFFER, C);
            f.clearDepth(1);
            f.framebufferTexture2D(v, Aa.Sc(0), f.TEXTURE_2D, K.get(), 0);
            f.framebufferTexture2D(v, Aa.Sc(1), f.TEXTURE_2D, x.get(), 0);
            f.framebufferTexture2D(v, Aa.Sc(2), f.TEXTURE_2D, B.get(), 0);
            f.framebufferTexture2D(v, Aa.Sc(3), f.TEXTURE_2D, z.get(), 0);
            Aa.wl(4);
            f.bindFramebuffer(v, null);
            Va.reset();
            var A = {
              position: K,
              kb: x,
              lc: z,
              ea: B,
              bind: function () {
                f.bindFramebuffer(v, m);
                Va.reset();
              },
              set: function () {
                f.checkFramebufferStatus(E);
                f.bindFramebuffer(v, m);
                Va.reset();
                if (q) {
                  if (f.checkFramebufferStatus(E) !== f.FRAMEBUFFER_COMPLETE)
                    return !1;
                  q = !1;
                }
                f.viewport(0, 0, k, u);
                f.clearColor(0, 0, 0, 0);
                O.Kb() && !Aa.fh() && (O.set("s86"), ta.l(!1, !1));
                f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT);
                return !0;
              },
              I: function () {},
              resize: function (I, P) {
                k = I;
                u = P;
                K.resize(I, P);
                x.resize(I, P);
                B.resize(I, P);
                z.resize(I, P);
                f.bindRenderbuffer(f.RENDERBUFFER, C);
                f.renderbufferStorage(
                  f.RENDERBUFFER,
                  f.DEPTH_COMPONENT16,
                  k,
                  u
                );
                f.bindRenderbuffer(f.RENDERBUFFER, null);
              },
              remove: function () {
                K.remove();
                x.remove();
                B.remove();
                z.remove();
                f.deleteRenderbuffer(C);
                f.deleteFramebuffer(m);
                var I = c.indexOf(A);
                -1 !== I && c.splice(I, 1);
              },
            };
            c.push(A);
            return A;
          },
          resize: function (e, m) {
            c.forEach(function (k) {
              k.resize(e, m);
            });
          },
        };
      })(),
      gd = (function () {
        var c = [],
          e = ia.Sf;
        return {
          instance: function (m) {
            function k() {
              x
                ? u()
                : ((P = Bd.instance({ Ka: v, el: e })),
                  (K = ia.jj[Aa.T()]),
                  (E = ra.instance({
                    isFloat: cb.ca(),
                    P: !0,
                    isPot: !0,
                    isLinear: !1,
                    jb: !0,
                    width: K,
                    height: K / 2,
                    D: 3,
                  })),
                  (C = ra.instance({
                    isFloat: cb.ca(),
                    P: !0,
                    isPot: !0,
                    isLinear: !1,
                    jb: !0,
                    width: K,
                    height: K / 2,
                    D: 3,
                  })),
                  (A = ra.instance({
                    isFloat: cb.ca(),
                    P: !0,
                    isPot: !0,
                    width: 1,
                    height: K / 2,
                    D: 3,
                  })),
                  (I = ra.instance({
                    isFloat: cb.ca() && !e,
                    P: !e,
                    isPot: !1,
                    isLinear: !0,
                    jb: !0,
                    isMipmap: !1,
                    width: K,
                    height: K / 2,
                    D: e ? 4 : 3,
                  })),
                  (x = !0),
                  u(),
                  ea.forEach(function (p) {
                    p();
                  }),
                  ea.splice(0, ea.length));
            }
            function u() {
              if (x) {
                Va.ia();
                P.Sl();
                E.R();
                O.set("s69");
                v.h(0);
                O.F("u72", ia.Nb);
                ra.qj(1);
                ta.l(!0, !0);
                for (var p = ia.Xk[Aa.T()], y = 0; y < p; ++y)
                  C.o(),
                    O.set("s72"),
                    O.S("u7", 1 / K, 0),
                    E.h(0),
                    ta.l(!1, !1),
                    E.o(),
                    O.S("u7", 0, 2 / K),
                    C.h(0),
                    ta.l(!1, !1);
                A.R();
                O.set("s74");
                E.h(0);
                ta.l(!1, !1);
                O.set(e ? "s76" : "s75");
                I.R();
                E.h(0);
                A.h(1);
                ta.l(!1, !1);
                ra.Z(0);
                ra.Z(1);
              }
            }
            m.fb || (m.fb = !1);
            m.xb || (m.xb = !1);
            m.yb || (m.yb = 0);
            m.wb || (m.wb = 0);
            var q = 0,
              K = 0,
              x = !1,
              z = null,
              B = null,
              v = null,
              E = null,
              C = null,
              A = null,
              I = null,
              P = null,
              F = 0,
              ea = [],
              J = {
                m: function () {
                  function p() {
                    2 === ++y &&
                      ((v = ra.instance({
                        isFloat: cb.ca(),
                        P: !0,
                        isPot: !1,
                        isMipmap: !1,
                        isLinear: !1,
                        jb: !0,
                        width: q,
                        height: q / 2,
                        D: 3,
                      })),
                      Va.ia(),
                      v.R(),
                      O.set("s68"),
                      O.F("u77", m.yb),
                      O.F("u78", m.wb),
                      z.h(0),
                      B.h(1),
                      ta.l(!0, !0),
                      k());
                  }
                  var y = 0;
                  q = ia.kj[Aa.T()];
                  F = Math.log2(q) - 1;
                  m.fb &&
                    ((z = ra.instance({
                      isPot: !1,
                      url: m.fb,
                      O: p,
                      D: 3,
                      isFlipY: !1,
                    })),
                    (B = ra.instance({
                      isPot: !1,
                      url: m.xb,
                      O: p,
                      D: 3,
                      isFlipY: !1,
                    })));
                },
                ei: function (p) {
                  v = p;
                  k();
                },
                Fc: function (p) {
                  x && (P.h(p), O.F("u94", P.K()));
                },
                Gc: function (p) {
                  x && I.h(p);
                },
                jg: function () {
                  O.F("u21", F);
                },
                Ag: function () {
                  return F;
                },
                K: function () {
                  return q;
                },
                Ab: function (p) {
                  x ? p() : ea.push(p);
                },
                J: function () {
                  z && z.remove();
                  B && B.remove();
                  E.remove();
                  A.remove();
                  C.remove();
                  P.remove();
                  I.remove();
                  v.remove();
                },
              };
            c.push(J);
            J.m();
            return J;
          },
          J: function () {
            c.forEach(function (m) {
              m.J();
            });
          },
        };
      })(),
      Kd = {
        instance: function (c) {
          var e = c.pl,
            m = c.nl,
            k = 0,
            u = e.K();
          c = ia.Sf;
          var q = ra.instance({
              isFloat: cb.ca() && !c,
              P: !c,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: u,
              D: c ? 4 : 3,
              isFlipY: !1,
            }),
            K = ra.instance({
              isFloat: cb.ca() && !c,
              P: !c,
              isPot: !1,
              isLinear: !0,
              jb: !0,
              isMipmap: !1,
              width: u,
              height: u / 2,
              D: c ? 4 : 3,
            }),
            x = Va.instance({ width: u, height: u }),
            z = c ? "s62" : "s61";
          return {
            wm: function (B) {
              k = B;
              O.set(z);
              f.viewport(0, 0, u, u);
              x.o();
              q.o();
              O.F("u6", k);
              e.Fc(1);
              m.Fc(0);
              ta.l(!0, !0);
              f.viewport(0, 0, u, u / 2);
              K.o();
              e.Gc(1);
              m.Gc(0);
              ta.l(!1, !1);
              f.flush();
            },
            Fc: function (B) {
              q.h(B);
            },
            Gc: function (B) {
              K.h(B);
            },
            jg: function () {
              O.F("u21", e.Ag() * (1 - k) + m.Ag() * k);
            },
          };
        },
      },
      Uc = (function () {
        function c(aa) {
          var ba = (X - ia.Td) / (ia.Wf - ia.Td);
          ba = 1 - Math.pow(1 - ba, ia.on);
          X += aa * (1 + ba * ia.pn);
          X = Math.min(Math.max(X, ia.Td), ia.Wf);
          N.Zb();
        }
        function e(aa) {
          -1 !== x &&
            ((ea = F = 0),
            K(),
            c((ia.nn * aa.deltaY) / window.innerHeight),
            aa.preventDefault());
        }
        function m() {
          p += F;
          y += ea;
          y = Math.min(Math.max(y, ia.Kl), ia.Jl);
          N.Zb();
        }
        function k(aa) {
          if (0 === x || -1 === x) return !1;
          var ba = void 0 !== aa.touches && aa.touches.length;
          aa.preventDefault();
          if (2 === x) {
            var T = oc(
              aa.touches[0].pageX,
              aa.touches[0].pageY,
              aa.touches[1].pageX,
              aa.touches[1].pageY
            );
            c(-(I - T) * ia.Ll);
            I = T;
          } else
            (T = ba ? aa.touches[0].clientX : aa.clientX),
              (aa = ba ? aa.touches[0].clientY : aa.clientY),
              (F = (2 * (T - C) * Math.PI) / Aa.K()),
              (ea = (2 * (aa - A) * Math.PI) / Aa.Y()),
              4 === x
                ? ((V[0] += F * ia.Dh),
                  (V[1] -= ea * ia.Dh),
                  (V[0] = Math.min(Math.max(V[0], -ia.Gh), ia.Gh)),
                  (V[1] = Math.min(Math.max(V[1], -ia.Hh), ia.Hh)),
                  N.Zb())
                : m(),
              (C = T),
              (A = aa);
        }
        function u() {
          0 !== x &&
            -1 !== x &&
            ((0 === F && 0 === ea) || 1 !== x || !R
              ? Za.xa()
              : (K(), (P = Date.now()), (ja = setInterval(N.ml, J))),
            (x = 0));
        }
        function q(aa) {
          if (2 !== x && -1 !== x) {
            ea = F = 0;
            K();
            Za.wake();
            var ba = void 0 !== aa.changedTouches && aa.touches.length;
            aa.preventDefault();
            ba && 2 === aa.touches.length
              ? ((x = 2),
                (I = oc(
                  aa.touches[0].pageX,
                  aa.touches[0].pageY,
                  aa.touches[1].pageX,
                  aa.touches[1].pageY
                )))
              : ((x = ba || 2 !== aa.button ? 1 : 4),
                (C = ba ? aa.touches[0].clientX : aa.clientX),
                (A = ba ? aa.touches[0].clientY : aa.clientY));
            return !1;
          }
        }
        function K() {
          ja && (clearInterval(ja), (ja = !1));
        }
        var x = 0,
          z = !1,
          B = !1,
          v = !1,
          E = 1,
          C = 0,
          A = 0,
          I = 0,
          P = 0,
          F = 0,
          ea = 0,
          J = 16,
          p = ia.ti,
          y = ia.Fh,
          X = ia.Sd,
          ja = !1,
          R = 0,
          G = new Float32Array([0, 0, 0, 0, 0]),
          V = [ia.tj, ia.uj],
          N = {
            m: function () {
              R = ia.Pi[Aa.T()];
              J = ia.dk[Aa.T()];
              Aa.Ca("mousedown", q);
              Aa.Ca("mouseup", u);
              Aa.Ca("mouseout", u);
              Aa.Ca("mousemove", k);
              Aa.Ca("mousemove", k);
              Aa.Ca("wheel", e);
              Aa.Ca("touchstart", q);
              Aa.Ca("touchend", u);
              Aa.Ca("touchmove", k);
            },
            Zb: function (aa) {
              z
                ? ((B[0] = -y),
                  (B[1] = p),
                  (v[1].value = (E / ia.Sd) * X),
                  Ib.mb(v))
                : ((G[0] = p),
                  (G[1] = y),
                  (G[2] = X),
                  (G[3] = V[0]),
                  (G[4] = V[1]),
                  od.bm(G, aa));
            },
            ml: function () {
              if ((1e-4 > F && 1e-4 > ea) || -1 === x)
                K(), (ea = F = 0), 0 === x && Za.xa();
              var aa = Date.now(),
                ba = aa - P;
              P = aa;
              aa = Math.pow(R, ba / J);
              F *= aa;
              ea *= aa;
              m();
            },
            ke: function (aa) {
              z ||
                ((z = !0),
                (x = -1),
                (B = [0, 0, 0]),
                (v = [
                  { name: "u64", type: "3f", value: B },
                  { name: "u68", type: "1f", value: 1 },
                ]),
                (E = aa));
            },
            oi: function (aa) {
              -1 === x && aa && (x = 0);
              aa || (x = -1);
            },
            Xl: function () {
              ea = F = 0;
              p = ia.ti;
              y = ia.Fh;
              X = ia.Sd;
              N.Zb();
            },
            wo: function (aa) {
              X = aa;
            },
            xo: function (aa) {
              V[0] = aa[0];
              V[1] = aa[1];
              ia.Xf = aa[2];
            },
            vo: function (aa, ba) {
              p = aa;
              y = ba;
            },
          };
        return N;
      })(),
      rd = (function () {
        var c = {
          s88: !1,
          s88color: !1,
          s88NormalMap: !1,
          s88ParamsMap: !1,
          s88NormalParamsMap: !1,
        };
        return {
          instance: function (e) {
            function m(W) {
              if (xa) {
                W.tweaker && window.JEEFITAPI && ma.Qf(W.tweaker);
                G.splice(0, G.length);
                G.push({ n: 0, offset: 0 });
                X.min.set(Infinity, Infinity, Infinity);
                X.max.set(-Infinity, -Infinity, -Infinity);
                var D = W.uvs;
                D &&
                  (D = D.filter(function (H) {
                    return H;
                  }));
                Ca = D && 0 < D.length && 0 < D[0].length;
                "undefined" !== typeof Ua &&
                  "string" === typeof W.faces &&
                  (W.faces = Ua(W.faces));
                "undefined" !== typeof pb &&
                  ("string" === typeof W.vertices &&
                    (W.vertices = pb(W.vertices)),
                  D &&
                    D.length &&
                    D.forEach(function (H, Y) {
                      "string" === typeof H && (D[Y] = pb(H));
                    }));
                var da = W.metadata.faces,
                  S = 1 + (Ca ? 1 : 0);
                da = (W.faces.length - da) / (W.metadata.faces * S);
                (6 !== da && 8 !== da) || Ca || ((Ca = !0), ++S, (da /= 2));
                if (4 === da) {
                  da = 6 * S + 2;
                  for (
                    var wa = 4 * S + 1,
                      Ba = Array(W.metadata.faces * da),
                      a = 0;
                    a < W.metadata.faces;
                    ++a
                  )
                    for (var b = 0; b < S; ++b)
                      (Ba[a * da + 4 * b] = W.faces[a * wa + 5 * b]),
                        (Ba[a * da + 4 * b + 1] = W.faces[a * wa + 5 * b + 1]),
                        (Ba[a * da + 4 * b + 2] = W.faces[a * wa + 5 * b + 2]),
                        0 === b && (Ba[a * da + 3] = W.faces[a * wa + 4]),
                        (Ba[a * da + 4 * b + 3 * S + 1] =
                          W.faces[a * wa + 5 * b]),
                        (Ba[a * da + 4 * b + 3 * S + 2] =
                          W.faces[a * wa + 5 * b + 2]),
                        (Ba[a * da + 4 * b + 3 * S + 3] =
                          W.faces[a * wa + 5 * b + 3]),
                        0 === b &&
                          (Ba[a * da + 3 * S + 4] = W.faces[a * wa + 4]);
                  W.faces = Ba;
                  W.metadata.faces *= 2;
                }
                C = Array(W.metadata.vertices);
                for (da = 0; da < W.metadata.vertices; ++da)
                  (C[da] = new Ya(
                    W.vertices[3 * da],
                    W.vertices[3 * da + 1],
                    W.vertices[3 * da + 2]
                  )),
                    Fc(X, C[da]);
                A = Array(W.metadata.faces);
                S = 3 * S + 1;
                for (da = 0; da < W.metadata.faces; ++da)
                  (A[da] = new Ic(
                    W.faces[S * da],
                    W.faces[S * da + 1],
                    W.faces[S * da + 2]
                  )),
                    (A[da].Mb = W.faces[S * da + 3]);
                N = 3 < C.length;
                xa && (xa.visible = N);
                Oc(C, A);
                I = hc(C, A);
                if (Ca) {
                  S = Array(C.length);
                  da = ["a", "b", "c"];
                  for (wa = 0; wa < W.metadata.faces; ++wa)
                    for (Ba = 0; 3 > Ba; ++Ba)
                      if (
                        ((a = W.faces[7 * wa + Ba]),
                        (b = W.faces[7 * wa + 1 + Ba + 3]),
                        "undefined" === typeof S[a])
                      )
                        S[a] = [[a, b]];
                      else if (S[a][0][1] !== b) {
                        for (var d = -1, h = 1; h < S[a].length; ++h)
                          if (S[a][h][1] === b) {
                            d = S[a][h][0];
                            break;
                          }
                        h = -1;
                        -1 === d
                          ? ((h = C.length),
                            C.push(C[a].clone()),
                            I.push(I[a].clone()),
                            S[a].push([h, b]),
                            (S[h] = [[h, b]]))
                          : (h = d);
                        W.faces[7 * wa + Ba] = h;
                        A[wa][da[Ba]] = h;
                      }
                  P = Array(C.length);
                  for (W = 0; W < C.length; ++W)
                    (da = S[W][0][1]),
                      (P[W] = new zb(D[0][2 * da], D[0][2 * da + 1]));
                }
                var l = Yb(X);
                e.ub &&
                  (C.forEach(function (H) {
                    H.x -= l.x;
                    H.z -= l.z;
                    H.y -= X.min.y;
                  }),
                  (X.min.x -= l.x),
                  (X.max.x -= l.x),
                  (X.min.z -= l.z),
                  (X.max.z -= l.z),
                  (X.max.y -= X.min.y),
                  (X.min.y = 0));
                if (e.vb) {
                  var n =
                    ia.hj /
                    Math.max(
                      X.max.x - X.min.x,
                      X.max.y - X.min.y,
                      X.max.z - X.min.z
                    );
                  C.forEach(function (H) {
                    H.ya(n);
                  });
                  X.min.ya(n);
                  X.max.ya(n);
                }
                W = Ca ? 8 : 6;
                S = new Float32Array(C.length * W);
                for (da = 0; da < C.length; ++da)
                  (S[W * da] = C[da].x),
                    (S[W * da + 1] = C[da].y),
                    (S[W * da + 2] = C[da].z),
                    (S[W * da + 3] = I[da].x),
                    (S[W * da + 4] = I[da].y),
                    (S[W * da + 5] = I[da].z),
                    Ca &&
                      ((S[W * da + 6] = P[da].x), (S[W * da + 7] = P[da].y));
                A.sort(function (H, Y) {
                  return H.Mb - Y.Mb;
                });
                var r = new (65536 > 3 * A.length ? Uint16Array : Uint32Array)(
                    3 * A.length
                  ),
                  w = 0;
                A.forEach(function (H, Y) {
                  H.Mb === w
                    ? (G[w].n += 3)
                    : (G.push({ n: 3, offset: 3 * Y }), ++w);
                  r[3 * Y] = H.a;
                  r[3 * Y + 1] = H.b;
                  r[3 * Y + 2] = H.c;
                });
                F && F.remove();
                F = ta.instance({ fa: S, U: r });
                p = J = !1;
                ua && xa.bg();
                aa = !0;
                xa.he();
                e.O && (e.O(xa), (e.O = null));
              }
            }
            function k(W) {
              F.Ea(W.n, W.offset);
            }
            function u(W, D) {
              T[D] &&
                (O.set(T[D].Fk()),
                F.bind(!1),
                Ca ? (O.Ja(), O.bi()) : (O.Ra(), O.ci()),
                T[D].kc() && (O.qc(), J.ec(!1), O.md(), Sb.Bb()),
                T[D].Rj(),
                T[D].Nc(),
                F.Ea(W.n, W.offset));
            }
            function q(W, D) {
              T[D] &&
                (O.set(T[D].Gk()),
                F.bind(!1),
                Ca ? (O.Ja(), O.bi()) : (O.Ra(), O.ci()),
                T[D].kc() && (O.qc(), J.ec(!1), O.md(), Sb.Bb()),
                xa.hc(),
                T[D].Nc(),
                F.Ea(W.n, W.offset));
            }
            function K(W, D) {
              Ja && T[D] && (T[D].Sj(), F.Ea(W.n, W.offset));
            }
            function x(W, D) {
              Ja && T[D] && (T[D].Uj(Ca), F.Ea(W.n, W.offset));
            }
            function z(W, D) {
              T[D] && (O.set(T[D].Bk()), T[D].og(), F.Ea(W.n, W.offset));
            }
            function B(W, D) {
              T[D] &&
                (O.set(T[D].Ck()), xa.hc(), T[D].og(), F.Ea(W.n, W.offset));
            }
            function v(W, D) {
              T[D] &&
                (O.set(T[D].Dk()),
                T[D].kc() && (J.ec(!1), O.md(), Sb.Bb()),
                F.bind(!1),
                T[D].lg(Ca),
                F.Ea(W.n, W.offset));
            }
            function E(W, D) {
              if (T[D]) {
                var da = T[D].Ek();
                O.set(da);
                T[D].kc() && (J.ec(!1), O.md(), Sb.Bb(), F.bind(!1));
                c[da] || (xa.hc(), F.bind(!1), (c[da] = !0));
                T[D].lg(Ca);
                F.Ea(W.n, W.offset);
              }
            }
            if (!Aa.Zf()) return !1;
            void 0 === e.ub && (e.ub = !1);
            void 0 === e.vb && (e.vb = !1);
            void 0 === e.Vf && (e.Vf = !1);
            var C = null,
              A = null,
              I = null,
              P = null,
              F = null,
              ea = null,
              J = null,
              p = !1,
              y = new Kb(),
              X = new Eb(),
              ja = [],
              R = null,
              G = [{ n: 0, offset: 0 }],
              V = [],
              N = !1,
              aa = !1,
              ba = [],
              T = [],
              ua = !1,
              Ca = !1,
              Ja = !1,
              xa = {
                visible: N,
                Bj: function () {
                  return G.length;
                },
                bg: function () {
                  !p &&
                    Ca &&
                    ((A = A.filter(function (W) {
                      return null !== W;
                    })),
                    (ea = Dc(C, I, P, A)),
                    (J = ta.instance({ fa: ea, U: !1 })),
                    (P = I = A = C = ea = null),
                    (p = !0));
                },
                hc: function () {
                  Sb.V();
                  xa.ng();
                },
                ng: function () {
                  O.rc("u116", y.elements);
                },
                Mn: function () {
                  N && (xa.ng(), F.bind(!1), Ca ? O.Ja() : O.Ra(), F.V());
                },
                bk: function (W) {
                  N && (W || xa.hc(), F.bind(!1), Ca ? O.Ja() : O.Ra(), F.V());
                },
                ck: function () {
                  N && (F.bind(!1), Ca ? O.Ja() : O.Ra(), G.forEach(K));
                },
                kg: function () {
                  N && (F.bind(!1), Ca ? O.Ja() : O.Ra(), V.forEach(k));
                },
                $j: function (W) {
                  Ja &&
                    N &&
                    (F.bind(!1),
                    Ca ? O.Ja() : O.Ra(),
                    W ? G.forEach(z) : G.forEach(B));
                },
                Mc: function (W) {
                  N &&
                    (W || xa.hc(),
                    F.bind(!1),
                    W || (O.Ja(), O.qc()),
                    Ja && G.forEach(x));
                },
                Nc: function (W) {
                  Ja && N && (W ? G.forEach(u) : G.forEach(q));
                },
                Wj: function () {
                  Ja && N && G.forEach(E);
                },
                Vj: function () {
                  Ja && N && G.forEach(v);
                },
                Ig: function () {
                  return R;
                },
                Gg: function () {
                  return ba;
                },
                Tm: function (W, D) {
                  T[W].update(D);
                  xa.Ai();
                },
                lf: function (W, D) {
                  function da(Ba, a) {
                    Ba &&
                      ((Ba.O = function () {
                        xa &&
                          ++wa === S &&
                          ((Ja = !0),
                          ua && xa.Ab(xa.bg, 5),
                          xa.he(),
                          D &&
                            xa.Ab(function () {
                              D(xa);
                            }, 10));
                      }),
                      (Ba = ud.instance(Ba)),
                      T[a] && T[a].J(),
                      (T[a] = Ba),
                      (ua = ua || Ba.kc()));
                  }
                  ba = W;
                  Ja = !1;
                  var S = W.length,
                    wa = 0;
                  T = Array(S);
                  ua = !1;
                  W.forEach(function (Ba, a) {
                    "string" === typeof Ba
                      ? Cc(
                          -1 === Ba.indexOf(".json") ? Ba + ".json" : Ba,
                          function (b) {
                            b.name = Ba;
                            da(b, a, Ba);
                          }
                        )
                      : da(Ba, a, !1);
                  });
                  xa.Ab(function () {
                    xa.Ai();
                    Za.ob();
                    Za.vd(!0);
                  }, 4);
                },
                Ai: function () {
                  V.splice(0, V.length);
                  G.forEach(function (W, D) {
                    T[D] && T[D].kl() && V.push(W);
                  });
                },
                Ab: function (W, D) {
                  aa && Ja ? W(xa) : ja.push({ hb: W, order: D ? D : 0 });
                },
                he: function () {
                  aa &&
                    Ja &&
                    (ja.sort(function (W, D) {
                      return 0 > W.order - D.order ? 1 : -1;
                    }),
                    ja.forEach(function (W) {
                      W.hb(xa);
                    }),
                    ja.splice(0, ja.length));
                },
                remove: function () {
                  xa.J();
                  xa = null;
                },
                J: function () {
                  N = aa = !1;
                  F && F.remove();
                  T.forEach(function (W) {
                    W.J();
                  });
                  p && J.remove();
                },
                Ik: function () {
                  return X.size().x;
                },
                Jk: function () {
                  return X.size().y;
                },
                $n: function () {
                  return X.size().z;
                },
                pk: function () {
                  return Yb(X).x;
                },
                qk: function () {
                  return Yb(X).y;
                },
                Rn: function () {
                  return Yb(X).z;
                },
                Xn: function () {
                  return X.min.y;
                },
                replace: function (W, D, da) {
                  if (W === R) return D && xa && (xa.he(), D(xa)), !1;
                  R = W;
                  Za.vd(!1);
                  Cc(
                    W,
                    function (S) {
                      m(S);
                      D && D(xa);
                    },
                    da
                  );
                  return !0;
                },
              };
            e.mc && xa.lf(e.mc, e.Vf);
            R = e.url;
            Cc(e.url, m);
            return xa;
          },
          Wl: function () {
            c.s88 = !1;
            c.s88color = !1;
            c.s88NormalMap = !1;
            c.s88ParamsMap = !1;
            c.s88NormalParamsMap = !1;
          },
        };
      })(),
      od = (function () {
        var c = null,
          e = !1,
          m = !1,
          k = null,
          u = new Float32Array(16),
          q = new Float32Array(3),
          K = { data: 0 },
          x = {
            m: function () {
              c = ia.Cb
                ? new Worker("js/worker.php")
                : {
                    postMessage: function (z) {
                      K.data = z;
                      vd.Bh(K);
                    },
                    terminate: function () {},
                  };
              c.onmessage = function (z) {
                switch (z.data[0]) {
                  case 3:
                    for (var B = 0; 16 > B; ++B) u[B] = z.data[B + 1];
                    for (B = 0; 3 > B; ++B) q[B] = z.data[B + 17];
                    Sb.re().qm(u, q);
                    break;
                  case 6:
                    x.mm(),
                      (e = !0),
                      Uc.Zb(!1),
                      ia.ba && (Kc.enable(), Kc.nd());
                }
              };
              k = new Float32Array(6);
              k[0] = 2;
              ia.Cb || vd.nm(c);
            },
            Im: function () {
              ia.ig || (m = !0);
            },
            Ho: function () {
              m = !1;
            },
            bm: function (z, B) {
              if (B || (e && m))
                (k[1] = z[0]),
                  (k[2] = z[1]),
                  (k[3] = z[2]),
                  (k[4] = z[3]),
                  (k[5] = z[4]),
                  c.postMessage(k);
            },
            mm: function () {
              c.postMessage([5, ia.Xf]);
            },
            J: function () {
              ia.Cb && c.terminate();
            },
          };
        return x;
      })(),
      vd = (function () {
        var c = 0,
          e = 0,
          m = 0,
          k = [0, 0],
          u = new Kb(),
          q = new Hb(),
          K = new Hb(),
          x = new Ya(),
          z = new Ya(),
          B = new bc(),
          v = 0,
          E = new Float32Array(20);
        E[0] = 3;
        var C = !1,
          A = { data: !1 },
          I = {
            m: function () {
              "undefined" === typeof ia && (self.rn = { Cb: !0 });
              ia.Cb && ((onmessage = I.Bh), I.bf([6]));
            },
            Bh: function (P) {
              switch (P.data[0]) {
                case 2:
                  I.mf(P.data);
                  break;
                case 5:
                  v = P.data[1];
              }
            },
            bf: function (P) {
              ia.Cb ? postMessage(P) : ((A.data = P), C.onmessage(A));
            },
            mf: function (P) {
              c = P[1];
              e = P[2];
              m = P[3];
              k[0] = P[4];
              k[1] = P[5];
              x.set(k[0], k[1], -m);
              B.set(e, c, 0, "XYZ");
              if (!1 === B instanceof bc)
                throw Error(
                  "JETHREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order."
                );
              P = Math.cos(B.A / 2);
              var F = Math.cos(B.B / 2),
                ea = Math.cos(B.C / 2),
                J = Math.sin(B.A / 2),
                p = Math.sin(B.B / 2),
                y = Math.sin(B.C / 2),
                X = B.order;
              "XYZ" === X
                ? ((q.A = J * F * ea + P * p * y),
                  (q.B = P * p * ea - J * F * y),
                  (q.C = P * F * y + J * p * ea),
                  (q.M = P * F * ea - J * p * y))
                : "YXZ" === X
                ? ((q.A = J * F * ea + P * p * y),
                  (q.B = P * p * ea - J * F * y),
                  (q.C = P * F * y - J * p * ea),
                  (q.M = P * F * ea + J * p * y))
                : "ZXY" === X
                ? ((q.A = J * F * ea - P * p * y),
                  (q.B = P * p * ea + J * F * y),
                  (q.C = P * F * y + J * p * ea),
                  (q.M = P * F * ea - J * p * y))
                : "ZYX" === X
                ? ((q.A = J * F * ea - P * p * y),
                  (q.B = P * p * ea + J * F * y),
                  (q.C = P * F * y - J * p * ea),
                  (q.M = P * F * ea + J * p * y))
                : "YZX" === X
                ? ((q.A = J * F * ea + P * p * y),
                  (q.B = P * p * ea + J * F * y),
                  (q.C = P * F * y - J * p * ea),
                  (q.M = P * F * ea - J * p * y))
                : "XZY" === X &&
                  ((q.A = J * F * ea - P * p * y),
                  (q.B = P * p * ea - J * F * y),
                  (q.C = P * F * y + J * p * ea),
                  (q.M = P * F * ea + J * p * y));
              x.y -= v;
              P = u.elements;
              y = q.x;
              var ja = q.y,
                R = q.z;
              J = q.w;
              var G = y + y,
                V = ja + ja;
              p = R + R;
              F = y * G;
              ea = y * V;
              y *= p;
              X = ja * V;
              ja *= p;
              R *= p;
              G *= J;
              V *= J;
              J *= p;
              P[0] = 1 - (X + R);
              P[4] = ea - J;
              P[8] = y + V;
              P[1] = ea + J;
              P[5] = 1 - (F + R);
              P[9] = ja - G;
              P[2] = y - V;
              P[6] = ja + G;
              P[10] = 1 - (F + X);
              P[3] = 0;
              P[7] = 0;
              P[11] = 0;
              P[12] = 0;
              P[13] = 0;
              P[14] = 0;
              P[15] = 1;
              u.setPosition(x);
              K.H(q).inverse();
              P = z.H(x);
              ja = P.x;
              G = P.y;
              R = P.z;
              F = K.x;
              ea = K.y;
              J = K.z;
              p = K.w;
              y = p * ja + ea * R - J * G;
              X = p * G + J * ja - F * R;
              V = p * R + F * G - ea * ja;
              ja = -F * ja - ea * G - J * R;
              P.x = y * p + ja * -F + X * -J - V * -ea;
              P.y = X * p + ja * -ea + V * -F - y * -J;
              P.z = V * p + ja * -J + y * -ea - X * -F;
              for (P = 1; 17 > P; ++P) E[P] = u.elements[P - 1];
              E[17] = z.x;
              E[18] = z.y;
              E[19] = z.z;
              I.bf(E);
            },
            nm: function (P) {
              C = P;
              I.bf([6]);
            },
          };
        return I;
      })();
    vd.m();
    var ud = (function () {
        function c(K) {
          var x = K.split(":").shift();
          return "data" === x || "blob" === x
            ? K
            : ("undefined" !== typeof U && U.$ ? U : ia).$ + ia.yl + K;
        }
        function e(K, x) {
          return Math.min(x + K + x * K, 1);
        }
        var m = !1,
          k = null,
          u = 1,
          q = {
            diffuseTexture: null,
            normalTexture: null,
            paramsTexture: null,
            colorTextureUsage: 0,
            metalness: 0.5,
            roughness: 0.5,
            fresnelMin: 0,
            fresnelMax: 1,
            fresnelPow: 5,
            alpha: 1,
            diffuseColor: [255, 255, 255],
            paramsMapMask: [0, 0, 0, 0],
            O: null,
          };
        return {
          m: function () {
            k = ra.instance({
              width: 1,
              height: 1,
              isMipmap: !1,
              D: 4,
              array: new Uint8Array([255, 255, 255, 255]),
              bh: !1,
            });
          },
          ke: function () {
            m = !0;
            u = 2;
          },
          instance: function (K) {
            function x(N) {
              function aa() {
                ++T === ba && N && N();
              }
              var ba = 1,
                T = 0;
              (B = A.normalTexture && Aa.xj() ? !0 : !1) &&
                !F.Ga &&
                (++ba,
                (F.Ga = ra.instance({
                  url: c(A.normalTexture),
                  isLinear: !0,
                  isMipmap: !0,
                  Xg: Aa.jl(),
                  isPot: !0,
                  D: 3,
                  O: aa,
                })));
              (v = A.diffuseTexture && "" !== A.diffuseTexture ? !0 : !1) &&
              !F.ea
                ? (++ba,
                  (F.ea = ra.instance({
                    url: c(A.diffuseTexture),
                    isMipmap: !0,
                    isLinear: !0,
                    isPot: !0,
                    Xg: !0,
                    bh: !1,
                    jb: !1,
                    bl: !1,
                    D: 4,
                    O: aa,
                  })),
                  (P = "s93"))
                : F.ea || ((P = "s94"), (F.ea = k));
              I = [
                A.diffuseColor[0] / 255,
                A.diffuseColor[1] / 255,
                A.diffuseColor[2] / 255,
              ];
              (ea = A.paramsTexture ? !0 : !1) &&
                !F.lb &&
                (A.paramsTexture === A.diffuseTexture
                  ? (F.lb = F.ea)
                  : (++ba,
                    (F.lb = ra.instance({
                      url: c(A.paramsTexture),
                      isMipmap: !0,
                      isLinear: !0,
                      isPot: !0,
                      Xg: !0,
                      bh: !1,
                      jb: !1,
                      bl: !1,
                      D: 4,
                      O: aa,
                    }))));
              aa();
            }
            function z(N) {
              "number" === typeof A.alpha
                ? ((E[0] = A.alpha), (E[1] = 0), (E[2] = 0), (E[3] = 0))
                : ((E[0] = A.alpha[0]),
                  (E[1] = A.alpha[1] - A.alpha[0]),
                  (E[2] = A.alpha[2]),
                  (E[3] = A.alpha[3]));
              var aa = 1 <= A.fresnelPow ? A.fresnelMin : A.fresnelMax;
              C[0] = e(E[0], aa);
              C[1] = e(E[1], aa);
              C[2] = E[2];
              C[3] = E[3];
              J = {
                Eh: A.fresnelMax,
                ph: [A.fresnelMin, A.roughness, A.fresnelPow / 15, A.metalness],
                sh: A.paramsMapMask,
              };
              N = A.O ? A.O.bind(null, N) : null;
              x(N);
              B || ea || v
                ? B || ea
                  ? B && !ea
                    ? ((p = "s88NormalMap"), (y = "s88NNGLtextureNormalMap"))
                    : !B && ea
                    ? ((p = "s88ParamsMap"), (y = "s88NNGLtextureParamsMap"))
                    : ((p = "s88NormalParamsMap"),
                      (y = "s88NNGLtextureNormalParamsMap"))
                  : ((p = "s88"), (y = "s88NNGLtexture"))
                : ((p = "s88color"), (y = "s88NNGLcolor"));
              X = B ? "s96" : "s95";
              ja = B ? "s90" : "s100";
              R = ea ? "s98" : "s97";
              G = ea ? "s91" : "s101";
            }
            var B,
              v,
              E = [1, 0, 0, 0],
              C = [0, 0, 0, 0],
              A = Object.assign({}, q, K),
              I = null,
              P = null,
              F = { ea: null, Ga: null, lb: null },
              ea = (B = v = !1),
              J = null,
              p = null,
              y = null,
              X = null,
              ja = null,
              R = null,
              G = null,
              V = {
                update: function (N) {
                  Object.assign(A, N);
                  z();
                },
                kc: function () {
                  return B;
                },
                kl: function () {
                  return 0.99 > E[0];
                },
                Gk: function () {
                  return ja;
                },
                Fk: function () {
                  return X;
                },
                Ck: function () {
                  return G;
                },
                Bk: function () {
                  return R;
                },
                Ek: function () {
                  return p;
                },
                Dk: function () {
                  return y;
                },
                Nc: function () {
                  B && F.Ga.h(0);
                },
                Uj: function (N) {
                  m && O.set(P);
                  N ? O.Ja() : O.Ra();
                  v && O.qc();
                  V.Mc();
                },
                Mc: function () {
                  v && (O.F("u55", A.colorTextureUsage), F.ea.h(0));
                  O.sf("u126", I);
                },
                og: function () {
                  ea && (F.lb.h(0), O.ra("u57", J.sh), O.qc());
                  O.ra("u91", J.ph);
                  O.F("u127", J.Eh);
                },
                lg: function (N) {
                  ea && !B
                    ? F.lb.h(u)
                    : B && (v || k.h(0), F.Ga.h(u), ea && F.lb.h(u + 1));
                  ea && O.ra("u57", J.sh);
                  v || B ? O.jm() : N ? O.km() : O.lm();
                  V.Mc();
                  O.ra("u6", E);
                  O.ra("u91", J.ph);
                  O.F("u127", J.Eh);
                },
                Rj: function () {
                  O.ra("u6", E);
                },
                Sj: function () {
                  O.ra("u6", C);
                },
                J: function () {
                  v && F.ea.remove();
                  B && F.Ga.remove();
                  ea && A.paramsTexture !== A.diffuseTexture && F.lb.remove();
                },
              };
            z(V);
            return V;
          },
        };
      })(),
      Kc = (function () {
        var c = 0,
          e = 0,
          m = 0,
          k = 0,
          u = 0,
          q = 0,
          K = ia.fj,
          x = ia.ej,
          z = ia.gj,
          B = 0,
          v = 0,
          E = null,
          C = null,
          A = 0,
          I = 0,
          P = 0,
          F = 0,
          ea = 0,
          J = null,
          p = 0,
          y = 0,
          X = 0,
          ja = Date.now(),
          R = !1,
          G = !1,
          V = !1,
          N = !1,
          aa = 1,
          ba = !1,
          T = {
            m: function () {
              c = ia.aj[Aa.T()];
              e = ia.$i[Aa.T()];
              m = ia.Zi[Aa.T()];
              y = ia.bj[Aa.T()];
              k = ia.Ti[Aa.T()];
              u = ia.Xi[Aa.T()];
              P = ia.Yi[Aa.T()];
              F = Aa.K();
              ea = Aa.Y();
              B = Math.round(F * c);
              v = Math.round(ea * c);
              C = Va.instance({ width: B, height: v, jc: !1 });
              E = ra.instance({ width: B, height: v, isPot: !1, isLinear: !0 });
              J = ra.instance({
                width: B,
                height: v,
                isPot: !1,
                isLinear: !0,
                D: 1,
              });
              G = !0;
            },
            resize: function (ua, Ca, Ja) {
              aa = Ja;
              F = ua;
              ea = Ca;
              B = Math.round(ua * c);
              v = Math.round(Ca * c);
              C.resize(B, v);
              V = !0;
            },
            V: function () {
              var ua = Math.exp(-(Date.now() - ja) / y);
              p = N ? X + (1 - ua) * (1 - X) : X * ua;
              A = e + p * (m - e);
              I = k + (1 - p) * (1 - k);
              q = u + (1 - p) * (1 - u);
              ra.Z(5);
              if (V && G)
                ra.Z(6),
                  J.resize(B, v),
                  O.set("s0"),
                  O.pd("u1", 6),
                  C.bind(!1, !0),
                  J.o(),
                  C.Vd(),
                  E.h(6),
                  ta.l(!0, !0),
                  E.resize(B, v),
                  E.o(),
                  J.h(6),
                  ta.l(!1, !1),
                  O.pd("u1", 0),
                  (V = !1);
              else {
                f.enable(f.BLEND);
                f.blendFunc(f.CONSTANT_ALPHA, f.ONE_MINUS_SRC_ALPHA);
                ua = A / P;
                f.blendColor(ua, ua, ua, ua);
                f.colorMask(!0, !1, !1, !0);
                O.set("s80");
                Sb.ie();
                O.F("u107", A);
                y && (O.F("u108", I), O.F("u100", q));
                var Ca = aa * (K + Math.pow(Math.random(), z) * (x - K));
                O.S("u7", Ca / F, Ca / ea);
                C.Tf();
                C.tc();
                E.o();
                Ca = 2 * Math.PI * Math.random();
                for (var Ja = !0, xa = 0; xa < P; ++xa)
                  1 === xa &&
                    (f.blendFunc(f.SRC_ALPHA, f.ONE), O.F("u107", ua)),
                    O.F("u106", Ca + (xa / P) * (Math.PI / 2)),
                    O.S(
                      "u105",
                      (Math.random() - 0.5) / F,
                      (Math.random() - 0.5) / ea
                    ),
                    ta.l(Ja, Ja),
                    (Ja = !1);
                f.disable(f.BLEND);
                O.set("s81");
                O.S("u7", 1 / B, 1 / v);
                J.o();
                E.h(7);
                ta.l(!1, !1);
                f.colorMask(!0, !0, !0, !0);
              }
            },
            h: function (ua) {
              J.h(ua);
            },
            enable: function () {
              ba = !0;
            },
            Ml: function () {
              if (N || !ba) return !1;
              R && clearTimeout(R);
              T.nd();
              R = setTimeout(T.yi, 400);
            },
            nd: function () {
              R && (clearTimeout(R), (R = !1));
              !N &&
                ba &&
                (JESSMP.disable(), (N = !0), (ja = Date.now()), (X = p));
            },
            yi: function () {
              N &&
                ba &&
                (R && (clearTimeout(R), (R = !1)),
                JESSMP.enable(),
                (N = !1),
                (ja = Date.now()),
                (X = p));
            },
            J: function () {
              E.remove();
              J.remove();
              C.remove();
            },
          };
        T.Ml();
        return T;
      })(),
      Bd = {
        instance: function (c) {
          var e = c.Ka.K(),
            m = c.el ? !0 : !1,
            k = m ? "s63" : "s11",
            u = ra.instance({
              isFloat: c.Ka.gh() && cb.ca() && !m,
              P: c.Ka.hh() && !m,
              isLinear: !0,
              isMipmap: !1,
              isPot: !1,
              width: e,
              height: e,
              D: m ? 4 : 3,
            }),
            q = ra.instance({
              isFloat: c.Ka.gh() && cb.ca(),
              P: c.Ka.hh(),
              isPot: !0,
              width: 1,
              height: e / 2,
              D: 3,
            });
          q.o();
          O.set("s74");
          c.Ka.h(0);
          ta.l(!0, !0);
          var K = Math.round(Math.log(e) / Math.log(2));
          u.Sl = function () {
            u.o();
            O.set(k);
            O.F("u72", ia.Nb);
            c.Ka.h(0);
            q.h(1);
            for (var x = 0, z = 0; z <= K; ++z) {
              var B = Math.pow(2, K - z),
                v = B / 2;
              f.viewport(0, x, e, v);
              O.S("u70", e / B, 1);
              O.F("u71", Math.min(6 / v, 0.6));
              x += B / 2;
              ta.l(0 === z, 0 === z);
            }
          };
          u.Vl = u.remove;
          u.remove = function () {
            u.Vl();
            q.remove();
          };
          return u;
        },
      };
    eb.qb = (function () {
      var c = {
          ld: 45,
          ef: 1,
          Pb: "../../images/debug/picsou.png",
          ff: 0.8,
          Me: 3.14 / 6,
          Ne: 0.314,
          Oe: 4,
          Ke: 0.5,
          Le: -0.25,
          ol: 1,
          $a: 256,
          Je: 0.15,
        },
        e = null,
        m = null,
        k = null,
        u = !1,
        q = !1,
        K = -1,
        x = null,
        z = null,
        B = null,
        v = Math.PI / 180,
        E = {
          m: function (C) {
            K = C.width;
            C = {
              isFloat: cb.ca(),
              P: !0,
              isPot: !1,
              isMipmap: !1,
              isLinear: !1,
              jb: !0,
              width: K,
              height: K / 2,
              D: 3,
            };
            e = ra.instance(C);
            m = ra.instance(C);
            O.j("s102", [{ type: "1i", name: "u134", value: 0 }]);
            O.j("s103", [{ type: "1i", name: "u139", value: 0 }]);
            E.Um();
          },
          Um: function () {
            O.j("s103", [
              { type: "1f", name: "u140", value: c.Me },
              { type: "1f", name: "u141", value: c.Ne },
              { type: "1f", name: "u142", value: c.Oe },
              { type: "1f", name: "u143", value: c.Ke },
              { type: "1f", name: "u144", value: c.Le },
            ]);
          },
          jo: function () {
            return q;
          },
          na: function (C) {
            x = C;
          },
          oc: function () {
            z =
              "uniform sampler2D u134;uniform vec2 u135,u136,u4;uniform int u137;uniform float u138,u120;varying vec2 vv0;const float h=3.141593;const vec2 i=vec2(.5,.5);const float e=1.2;const vec3 g=vec3(1.,1.,1.);void main(){vec2 c=vec2(vv0.x*2.,-vv0.y+.5)*h,a=i+u4*(c-u135)/u136;float b=1.;if(u137==0){if(a.x<0.||a.x>1.||a.y<0.||a.y>1.)discard;}else b*=smoothstep(-e,0.,a.x),b*=1.-smoothstep(1.,1.+e,a.x),b*=smoothstep(-e,0.,a.y),b*=1.-smoothstep(1.,1.+e,a.y);vec3 d=mix(u138*g,texture2D(u134,a).rgb*u120,b*g);gl_FragColor=vec4(d,1.);}";
            B =
              "uniform sampler2D u139;uniform float u140,u141,u142,u143,u144;varying vec2 vv0;const float f=3.141593;const vec2 o=vec2(.5,.5);const vec3 h=vec3(1.,1.,1.);void main(){float i=(vv0.x*2.-1.)*f,c=(-vv0.y+.5)*f;vec4 a=texture2D(u139,vec2(.5,.5));float d=a.r,j=u142*a.g,k=u143*(a.b+u144),b=a.a,g=asin(cos(b)*cos(d)),l=atan(cos(b)*sin(d),-sin(b)),m=acos(sin(c)*sin(g)+cos(c)*cos(g)*cos(i-l)),n=1.-smoothstep(u140-u141,u140+u141,m);gl_FragColor=vec4(h*(max(k,0.)+max(j,0.)*n),1.);}";
            O.la("s102", {
              name: "_",
              g: z,
              i: "u134 u135 u137 u136 u138 u120 u4".split(" "),
              precision: "highp",
            });
            O.la("s103", {
              name: "_",
              g: B,
              i: "u139 u140 u141 u142 u143 u144".split(" "),
              precision: "highp",
            });
          },
          wf: function (C, A, I, P, F, ea, J, p) {
            O.S("u135", A, I);
            O.pd("u137", P ? 1 : 0);
            O.S("u136", F, F / ea);
            O.ji("u4", p);
            J && C.h(0);
            ta.l(!1, !1);
          },
          Mi: function (C) {
            f.viewport(0, 0, c.$a, c.$a / 2);
            O.set("s103");
            C.h(0);
            ta.l(!1, !1);
          },
          Lk: function () {
            return e;
          },
          sj: function (C) {
            E.m({ width: c.$a });
            E.Bi(C, !1, 1);
            q = !0;
          },
          rj: function () {
            (u && k.Mk() === c.Pb) ||
              ((u = !1),
              (k = ra.instance({
                url: c.Pb,
                isFloat: !1,
                O: function () {
                  u = !0;
                },
              })));
          },
          mf: function (C) {
            for (var A in C) c[A] = C[A];
          },
          Bi: function (C, A, I) {
            var P = c.$a;
            Va.ia();
            m.R();
            O.set("s0");
            e.h(0);
            ta.l(!0, !0);
            ra.Z(0);
            e.o();
            O.set("s102");
            O.F("u138", c.Je);
            O.F("u120", c.ol);
            E.wf(C, Math.PI, 0, !0, 90 * v, C.K() / C.Y(), !0, [1, 1]);
            u &&
              (O.F("u120", c.ff),
              f.viewport(0, 0, P / 2, P / 2),
              E.wf(k, 0, 0, !1, 2 * c.ld * v, 2 * c.ef, !0, [1, 1]),
              f.viewport(P / 2, 0, P / 2, P / 2),
              E.wf(k, 2 * Math.PI, 0, !1, 2 * c.ld * v, 2 * c.ef, !1, [1, 1]));
            f.enable(f.BLEND);
            f.blendFunc(f.ONE, f.ONE);
            A && E.Mi(A);
            O.set("s0");
            f.blendColor(0, 0, 0, 1 - I);
            f.blendFunc(f.CONSTANT_ALPHA, f.ONE_MINUS_CONSTANT_ALPHA);
            m.h(0);
            ta.l(!1, !1);
            f.disable(f.BLEND);
            x.ei(e);
          },
        };
      return E;
    })();
    eb.cb = (function () {
      var c = !1,
        e = !0,
        m = !1,
        k = !1,
        u = {
          oc: function () {
            Aa.X() &&
              (O.la("s104", {
                name: "_",
                s:
                  "attribute vec3 a0;uniform sampler2D u33;uniform vec2 u34;uniform vec3 u122;const float j=1.,k=0.,l=0.,x=1.;const vec2 e=vec2(1.,1.);const vec3 m=vec3(1.,1.,1.);const vec2 y=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 n(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*m;vec2 o=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 p=n(f);vec3 q=mix(u122,u65,a);float r=mix(j,u68,u67);vec3 s=mix(u60,u66,a);float t=mix(u63,1.,u67);vec2 g=u62/o;vec3 h=a0;float u=max(0.,-a0.z-k)*l;h.x+=u*sign(a0.x)*(1.-u67);vec3 i=p*(h+q)*r+s;i.x+=u59*sin(f.y);vec2 v=g*t;vec3 w=vec3(d*v,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(w,1.));}",
                g:
                  "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,1.,1.),gl_FragData[2]=vec4(1.,0.,0.,0.),gl_FragData[3]=vec4(0.,.5,1.,0.);}",
                i: ["u33", "u34", "u60", "u122"].concat(O.ue(), O.ve()),
                G: ["a0"],
                N: [3],
                da: !0,
              }),
              (c = !0));
          },
          m: function (q) {
            c &&
              O.j(
                "s104",
                [
                  { type: "1i", name: "u33", value: 1 },
                  { type: "3f", name: "u60", value: q.za },
                  { type: "1f", name: "u61", value: 0 },
                  { type: "1f", name: "u69", value: 1 },
                ].concat(q.Ff)
              );
          },
          Ua: function (q) {
            k = q;
            m && u.Pg();
          },
          Ta: function (q) {
            m = q;
            k && u.Pg();
          },
          Pg: function () {
            Aa.X() &&
              (O.j("s104", [
                {
                  type: "3f",
                  name: "u122",
                  value: [m[0] * k, m[1] * k, m[2] * k],
                },
              ]),
              O.I());
          },
          Wk: function (q) {
            for (
              var K = q.width / 2,
                x = q.height / 2,
                z = q.depth,
                B = q.ek,
                v = q.height / 4,
                E = q.Fj,
                C = 2 * E + 4,
                A = [],
                I = [],
                P = -K + q.Na,
                F = -B - q.Na,
                ea = K - q.Na,
                J = -B - q.Na,
                p = 0;
              p < C;
              ++p
            ) {
              var y = 0,
                X = 0;
              0 === p
                ? ((y = -K), (X = -B - z))
                : 1 <= p && p <= 1 + E
                ? ((X = (((p - 1) / E) * Math.PI) / 2),
                  (y = P - Math.cos(X) * q.Na),
                  (X = F + Math.sin(X) * q.Na))
                : p >= 2 + E && p <= 2 + 2 * E
                ? ((X = (((p - 2 - E) / E) * Math.PI) / 2),
                  (y = ea + Math.sin(X) * q.Na),
                  (X = J + Math.cos(X) * q.Na))
                : p === C - 1 && ((y = K), (X = -B - z));
              A.push(y, x + v, X, y, -x + v, X);
              0 !== p &&
                I.push(
                  2 * p,
                  2 * p - 2,
                  2 * p - 1,
                  2 * p,
                  2 * p - 1,
                  2 * p + 1
                );
            }
            return u.instance({ fa: A, U: I });
          },
          toggle: function (q) {
            e = q;
          },
          instance: function (q) {
            var K = ta.instance({ fa: q.fa, U: q.U });
            return {
              V: function () {
                c && e && (O.set("s104"), K.bind(!0), K.V());
              },
            };
          },
        };
      return u;
    })();
    eb.oa = (function () {
      var c = {
        ze: -87,
        Qk: [85, 95],
        Og: [90, 90],
        Ng: [85, 70],
        Hc: 24,
        Gj: 12,
        Hj: 2,
        cf: [-80, 10],
        Mg: [40, 140],
        Wc: [1, 8],
        Pk: 80,
        zh: [-120, -10],
        El: 2,
        rd: [0, -15],
        Dd: 1024,
        Za: 256,
        dd: 4,
        Gm: [6, 30],
        yh: 1.2,
      };
      c.Jh = c.cf;
      var e = !1,
        m = !1,
        k = !1,
        u = null,
        q = null,
        K = null,
        x = null,
        z = null,
        B = null,
        v = !1,
        E = !1,
        C = null,
        A = null,
        I = null,
        P = null,
        F = 0.5,
        ea = [{ type: "1f", name: "u146", value: 1 }],
        J = null,
        p = null,
        y = null,
        X = null,
        ja = null,
        R = {
          Hk: function () {
            return {
              name: "_",
              s:
                "attribute vec3 a0,a2;attribute vec2 a1;varying vec2 vv0;varying float vv1;uniform sampler2D u33;uniform vec2 u34;uniform float u123;uniform vec3 u122;const float m=0.,n=0.;const vec2 e=vec2(1.,1.);const vec3 o=vec3(1.,1.,1.);const vec2 z=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*o;vec2 q=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 g=p(f);vec3 r=mix(u122,u65,a);float s=mix(u123,u68,u67);vec3 t=mix(u60,u66,a);float u=mix(u63,1.,u67);vec2 h=u62/q;vec3 i=a0;float v=max(0.,-a0.z-m)*n;i.x+=v*sign(a0.x)*(1.-u67);vec3 j=g*(i+r)*s+t;j.x+=u59*sin(f.y);vec2 w=h*u;vec3 x=vec3(d*w,-h)+j*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(x,1.)),vv0=a1,gl_Position*=vec4(-1.,1.,1.,1.);vec3 y=g*a2;vv1=-y.z;}",
              g:
                "uniform sampler2D u153,u139;uniform vec2 u70,u154;uniform float u155,u146;varying vec2 vv0;varying float vv1;void main(){vec2 b=u154*u155+u70*vv0;vec4 a=u146*texture2D(u153,b);a.r*=step(0.,vv0.y),gl_FragColor=vec4(0.,0.,0.,a.r*vv1);}",
              i: "u33 u153 u139 u34 u60 u155 u154 u123 u122 u70 u146"
                .split(" ")
                .concat(O.ue())
                .concat(O.ve()),
              G: ["a0", "a2", "a1"],
              N: [3, 3, 2],
              precision: "lowp",
            };
          },
          oc: function () {
            O.la("s105", {
              name: "_",
              s:
                "attribute vec3 a0;uniform vec3 u122;uniform vec2 u147,u148;uniform float u123,u149,u150,u151;varying float vv0,vv1;void main(){vec3 a=(a0+u122)*u123;float b=atan(a.x,a.z-u149),d=2.*(a.y-u150)/(u151-u150)-1.;vv0=a0.y;float g=1.-u147.x*u147.x/(u147.y*u147.y),c=u147.x/sqrt(1.-g*pow(cos(b),2.));vec3 h=vec3(c*sin(b),a.y,c*cos(b)+u149);vv1=smoothstep(u148.x,u148.y,length(h-a)),gl_Position=vec4(b,d,0.,1.);}",
              g:
                "uniform float u152;uniform vec4 u6;varying float vv0,vv1;void main(){float a=u6.x+u6.y*smoothstep(-u6.w,-u6.z,vv0),b=min(a,1.)*u152;gl_FragColor=vec4(b,vv1,1.,1.);}",
              i: "u123 u122 u147 u148 u149 u150 u151 u6 u152".split(" "),
              G: ["a0"],
              N: [3],
              precision: "highp",
            });
            O.la("s106", R.Hk());
            O.la("s107", {
              name: "_",
              g:
                "uniform sampler2D u1;uniform vec2 u7;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u1,vv0-3.*u7),c=texture2D(u1,vv0-2.*u7),d=texture2D(u1,vv0-u7),f=texture2D(u1,vv0+u7),g=texture2D(u1,vv0+2.*u7),h=texture2D(u1,vv0+3.*u7);float j=.031496*b.r+.110236*c.r+.220472*d.r+.275591*a.r+.220472*f.r+.110236*g.r+.031496*h.r;vec2 i=b.gb*b.b+c.gb*c.b+d.gb*d.b+a.gb*a.b+f.gb*f.b+g.gb*g.b+h.gb*h.b;i/=b.b+c.b+d.b+a.b+f.b+g.b+h.b,gl_FragColor=vec4(mix(j,a.r,1.-i.x),i,1);}",
              i: ["u1", "u7"],
              precision: "lowp",
            });
            e = !0;
          },
          m: function (G) {
            if (e) {
              if (void 0 === G.Ub || !G.Ub) return !1;
              if (m) R.ai(G);
              else {
                x = ra.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: c.Dd,
                  height: c.Dd / 4,
                  D: 4,
                });
                var V = c.Za / 4,
                  N = {
                    isFloat: !1,
                    isPot: !1,
                    isMipmap: !1,
                    isLinear: !1,
                    width: c.Za,
                    height: V,
                    D: 4,
                  };
                K = ra.instance(N);
                B = ra.instance(N);
                z = ra.instance({
                  isFloat: !1,
                  isPot: !1,
                  isMipmap: !1,
                  isLinear: !0,
                  width: c.Za,
                  height: V * c.dd,
                  D: 4,
                });
                V = 0.5 - 0.5 / G.Vb[1];
                N = 0.5 + 0.5 / G.Vb[1];
                for (
                  var aa = c.Gj + 1,
                    ba = [],
                    T = [],
                    ua = new Float32Array(16 * c.Hc),
                    Ca = new Uint16Array(6 * (c.Hc - 1)),
                    Ja = 0,
                    xa = 0,
                    W = 0,
                    D = 0;
                  D < c.Hc;
                  ++D
                ) {
                  var da = (2 * D) / (c.Hc - 1) - 1;
                  da = Math.sign(da) * Math.pow(Math.abs(da), c.Hj);
                  da = (Math.PI * (da + 1)) / 2 - Math.PI / 2;
                  var S = Math.sin(da),
                    wa = Math.cos(da),
                    Ba = Math.sin(da * c.yh),
                    a = Math.cos(da * c.yh),
                    b = da / (Math.PI * G.Vb[0]) + 0.5,
                    d = c.Ng[0] * S,
                    h = c.Jh[0],
                    l = c.Ng[1] * wa + c.ze,
                    n = b,
                    r = V,
                    w = c.Og[0] * S,
                    H = c.Jh[1],
                    Y = c.Og[1] * wa + c.ze,
                    M = N,
                    na = 16 * D;
                  ua[na] = w;
                  ua[na + 1] = H;
                  ua[na + 2] = Y;
                  ua[na + 3] = Ba;
                  ua[na + 4] = 0;
                  ua[na + 5] = a;
                  ua[na + 6] = b;
                  ua[na + 7] = M;
                  ua[na + 8] = d;
                  ua[na + 9] = h;
                  ua[na + 10] = l;
                  ua[na + 11] = Ba;
                  ua[na + 12] = 0;
                  ua[na + 13] = a;
                  ua[na + 14] = n;
                  ua[na + 15] = r;
                  0 !== D &&
                    ((n = 2 * D),
                    (r = 6 * (D - 1)),
                    (Ca[r] = n),
                    (Ca[r + 1] = n - 1),
                    (Ca[r + 2] = n - 2),
                    (Ca[r + 3] = n),
                    (Ca[r + 4] = n + 1),
                    (Ca[r + 5] = n - 1));
                  r = Math.pow(
                    0.5 *
                      (1 +
                        Math.cos(
                          Math.min(
                            Math.max((Math.PI / c.Mg[0]) * d, -Math.PI),
                            Math.PI
                          )
                        )),
                    c.El
                  );
                  h -= c.Pk * r;
                  n = c.Mg[1] * r;
                  d -= S * c.Wc[0];
                  l -= wa * c.Wc[1];
                  w -= S * c.Wc[0];
                  Y -= wa * c.Wc[1];
                  S = 0.001 > r ? 2 : aa;
                  for (wa = 0; wa < S; ++wa)
                    (r = wa / (S - 1)),
                      (b = h * (1 - r) + H * r),
                      (M = c.zh[0]),
                      (M = Math.min(Math.max((b - M) / (c.zh[1] - M), 0), 1)),
                      (M = M * M * (3 - 2 * M)),
                      ba.push(
                        d * (1 - r) + w * r,
                        b,
                        (l +
                          n * Math.exp(400 * -Math.abs(da) * Math.pow(r, 4))) *
                          (1 - M) +
                          Y * M,
                        Ba,
                        0,
                        a,
                        0,
                        0
                      );
                  da = 0 === D ? 0 : 2 < S && 2 < xa ? S - 1 : 1;
                  for (Ba = 1; Ba <= da; ++Ba)
                    (a = S > xa ? S - 2 : 0),
                      T.push(
                        Ja + Ba + a,
                        Ja + Ba - 1,
                        W + Ba - 1,
                        W + Ba - 1,
                        W + Ba + (S < xa ? xa - 2 : 0),
                        Ja + Ba + a
                      );
                  xa = S;
                  W = Ja;
                  Ja += S;
                }
                X = ta.instance({
                  fa: new Float32Array(ba),
                  U: new Uint16Array(T),
                });
                ja = ta.instance({ fa: ua, U: Ca });
                R.ai(G);
                O.j("s107", [{ type: "1i", name: "u1", value: 0 }]);
                m = !0;
              }
            }
          },
          ai: function (G) {
            F = G.Bm;
            P = G.sd;
            J = [
              { type: "1i", name: "u33", value: 1 },
              { type: "1i", name: "u153", value: 0 },
              { type: "1i", name: "u139", value: 2 },
              {
                type: "3f",
                name: "u60",
                value: [G.za[0], G.za[1] - c.rd[0], G.za[2] + c.rd[1]],
              },
              { type: "1f", name: "u155", value: G.Cm },
              { type: "2f", name: "u70", value: [1, 1 / c.dd] },
              { type: "2f", name: "u154", value: [0, 1 / c.dd] },
              { type: "1f", name: "u146", value: 1 },
            ].concat(G.Ff, G.xi);
            O.j("s106", J);
          },
          Rb: function (G) {
            u = G;
          },
          kf: function (G) {
            p = G;
            p.Ab(R.fc);
          },
          ih: function () {
            return k && null !== p && null !== y;
          },
          fc: function () {
            if (!(k || (E && v)) || null === p || null === y) return !1;
            f.viewport(0, 0, c.Dd, c.Dd / 4);
            Va.ia();
            x.o();
            f.clearColor(0, 0, 0, 0);
            f.clear(f.COLOR_BUFFER_BIT);
            O.j("s105", [
              { type: "1f", name: "u149", value: c.ze },
              { type: "1f", name: "u150", value: c.cf[0] },
              { type: "1f", name: "u151", value: c.cf[1] },
              {
                type: "3f",
                name: "u122",
                value: [C[0] + A[0], C[1] + A[1], C[2] + A[2]],
              },
              { type: "1f", name: "u152", value: F },
              { type: "2f", name: "u147", value: c.Qk },
              { type: "2f", name: "u148", value: c.Gm },
            ]);
            p.ck();
            O.set("s1");
            var G = c.Za / 4;
            f.viewport(0, 0, c.Za, G);
            K.o();
            x.h(0);
            x.Rc();
            ta.l(!0, !0);
            for (var V = 0; V < c.dd; ++V)
              O.set("s107"),
                0 !== V && f.viewport(0, 0, c.Za, G),
                B.o(),
                K.h(0),
                O.S("u7", 1 / c.Za, 0),
                ta.l(!1, !1),
                K.o(),
                B.h(0),
                O.S("u7", 0, 1 / G),
                ta.l(!1, !1),
                c.Ij && f.colorMask(0 === V, 1 === V, 2 === V, !0),
                O.set("s1"),
                z.o(),
                K.h(0),
                f.viewport(0, V * G, c.Za, G),
                ta.l(!1, !1),
                c.Ij && f.colorMask(!0, !0, !0, !0);
            return (k = !0);
          },
          V: function () {
            R.ih() &&
              (y.bind(!1, !1),
              q.o(),
              f.clearColor(0, 0, 0, 0),
              f.enable(f.DEPTH_TEST),
              f.depthMask(!0),
              f.clear(f.COLOR_BUFFER_BIT | f.DEPTH_BUFFER_BIT),
              O.set("s106"),
              u.h(1),
              z.h(0),
              X.bind(!0),
              X.V(),
              ja.bind(!0),
              ja.V(),
              f.disable(f.DEPTH_TEST),
              f.depthMask(!1));
          },
          add: function () {
            R.ih() &&
              (f.enable(f.BLEND),
              f.blendFunc(f.ONE, f.ONE_MINUS_SRC_ALPHA),
              q.h(0),
              ta.l(!1, !1),
              f.disable(f.BLEND));
          },
          hf: function (G, V) {
            y = Va.instance({ width: G, height: V, jc: !0 });
            q = ra.instance({ width: G, height: V, isFloat: !1, isPot: !1 });
            R.fc();
          },
          Ta: function (G, V, N) {
            G || ((G = C), (V = A), (N = I));
            O.j("s106", [
              {
                type: "3f",
                name: "u122",
                value: [
                  N[0] + P[0],
                  N[1] + P[1] - c.rd[0],
                  N[2] + P[2] + c.rd[1],
                ],
              },
            ]);
            C = G;
            A = V;
            I = N;
            E = !0;
            !k && v && R.fc();
            O.I();
          },
          Ua: function (G, V) {
            O.j("s105", [{ type: "1f", name: "u123", value: G }]);
            O.j("s106", [{ type: "1f", name: "u123", value: V }]);
            v = !0;
            !k && E && R.fc();
            O.I();
          },
          pf: function (G) {
            O.j("s106", [{ type: "1f", name: "u61", value: G }]);
            O.I();
          },
          ob: function () {
            R.fc();
          },
          qf: function (G, V) {
            ea[0].value = 1 - G;
            O.j("s106", ea);
            O.j("s106", V);
          },
          J: function () {},
        };
      return R;
    })();
    eb.sa = (function () {
      var c = !1,
        e = null,
        m = 0,
        k = 0,
        u = 0,
        q = [{ type: "1f", name: "u146", value: 1 }],
        K = null,
        x = null,
        z = null,
        B = {
          oc: function () {
            O.la("s108", {
              name: "_",
              s:
                "attribute vec3 a0;uniform vec2 u156,u157;varying vec2 vv0;void main(){vec2 a=2.*(a0.xy-u157)/u156;gl_Position=vec4(a,0.,1.),vv0=a0.xy;}",
              g:
                "uniform vec2 u158;uniform float u159,u160,u161;varying vec2 vv0;void main(){vec2 b=vec2(sign(vv0.x)*.5*u159,u160),a=vv0-b,c=u161*a,d=(c-a)*u158;gl_FragColor=vec4(d,0.,1.);}",
              i: "u156 u157 u159 u160 u161 u158".split(" "),
              G: ["a0"],
              N: [3],
              precision: "highp",
            });
            O.la("s109", {
              name: "_",
              s:
                "attribute vec3 a0;varying vec2 vv0,vv1;uniform sampler2D u33;uniform vec3 u122;uniform vec2 u34,u156,u157;uniform float u123;const float l=0.,m=0.;const vec2 e=vec2(1.,1.);const vec3 n=vec3(1.,1.,1.);const vec2 y=vec2(-1.,1.);uniform mat4 u58;uniform vec3 u60,u64,u65,u66;uniform float u59,u67,u68,u61,u62,u63,u69;mat3 o(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,a.z,a.y*b.z,b.y*a.z*b.x-a.x*a.y,-b.z*b.x,a.y*a.z*b.x+b.y*a.x,b.y*a.z*a.x+a.y*b.x,-a.x*b.z,a.y*a.z*a.x-b.y*b.x);}void main(){vec4 b=texture2D(u33,vec2(.25,.5));vec2 c=u67*e;vec3 a=u67*n;vec2 p=mix(b.a*u34,e,c),d=(2.*b.gb-e)*(1.-c);d.x*=-1.;vec3 f=mix(texture2D(u33,vec2(.75,.5)).rgb+vec3(u61,0.,0.),u64,a);mat3 q=o(f);vec3 r=mix(u122,u65,a);float s=mix(u123,u68,u67);vec3 t=mix(u60,u66,a);float u=mix(u63,1.,u67);vec2 g=u62/p;vec3 h=a0;float v=max(0.,-a0.z-l)*m;h.x+=v*sign(a0.x)*(1.-u67);vec3 i=q*(h+r)*s+t;i.x+=u59*sin(f.y);vec2 w=g*u;vec3 x=vec3(d*w,-g)+i*vec3(1.,-1.,-1.);gl_Position=u58*(vec4(u69*e,e)*vec4(x,1.)),gl_Position*=vec4(-1.,1.,1.,1.),vv0=vec2(.5,.5)+(a0.xy-u157)/u156,vv1=vec2(.5,.5)+.5*gl_Position.xy/gl_Position.w;}",
              g:
                "uniform sampler2D u162,u163;uniform float u146;varying vec2 vv0,vv1;void main(){vec2 a=u146*texture2D(u162,vv0).rg;gl_FragColor=texture2D(u163,a+vv1);}",
              i: "u146 u33 u162 u163 u156 u157 u34 u60 u123 u122"
                .split(" ")
                .concat(O.ue(), O.ve()),
              G: ["a0"],
              N: [3],
              precision: "lowp",
            });
            c = !0;
          },
          m: function (v) {
            if (c) {
              if (void 0 === v.Ub || !v.Ic) return !1;
              x = ra.instance({
                isFloat: !0,
                isPot: !1,
                isMipmap: !1,
                isLinear: !1,
                width: 256,
                height: 128,
                D: 4,
              });
              z = Va.instance({ width: 256, height: 128 });
              O.j(
                "s109",
                [
                  { type: "1i", name: "u33", value: 1 },
                  { type: "1i", name: "u162", value: 2 },
                  { type: "1i", name: "u163", value: 0 },
                  { type: "3f", name: "u60", value: v.za },
                  { type: "1f", name: "u146", value: 1 },
                ].concat(v.xi, v.Ff)
              );
              k = v.be;
              u = v.ae;
              m = v.ce;
            }
          },
          Rb: function (v) {
            e = v;
          },
          kf: function (v) {
            K = v;
            K.Ab(B.Yd);
          },
          Yd: function () {
            f.viewport(0, 0, 256, 128);
            z.o();
            x.o();
            var v = K.Ik(),
              E = K.Jk(),
              C = [
                { type: "2f", name: "u156", value: [v, E] },
                { type: "2f", name: "u157", value: [K.pk(), K.qk()] },
              ];
            O.j(
              "s108",
              C.concat([
                { type: "1f", name: "u159", value: k },
                { type: "1f", name: "u160", value: u },
                { type: "1f", name: "u161", value: m },
                { type: "2f", name: "u158", value: [1 / v, -1 / E] },
              ])
            );
            K.kg();
            O.j("s109", C);
          },
          V: function () {
            O.set("s109");
            e.h(1);
            x.h(2);
            K.kg();
          },
          Ta: function (v) {
            O.j("s109", [{ type: "3f", name: "u122", value: v }]);
            O.I();
          },
          Ua: function (v) {
            O.j("s109", [{ type: "1f", name: "u123", value: v }]);
            O.I();
          },
          pf: function (v) {
            O.j("s109", [{ type: "1f", name: "u61", value: v }]);
            O.I();
          },
          Am: function (v) {
            m = v;
            B.Yd();
            O.I();
            Za.animate(Date.now());
          },
          ob: function () {
            B.Yd();
          },
          qf: function (v, E) {
            q.u146 = 1 - v;
            O.j("s109", q);
            O.j("s109", E);
          },
          J: function () {},
        };
      return B;
    })();
    eb.$b = (function () {
      var c = [0, -0.5],
        e = !1,
        m = !1,
        k = null,
        u = null,
        q = null,
        K = null,
        x = null,
        z = -1,
        B = -1;
      return {
        oc: function () {
          O.la("s110", {
            name: "_",
            s:
              "attribute vec2 a0;uniform sampler2D u33;uniform vec2 u34,u164;uniform float u4;varying vec2 vv0;const vec2 f=vec2(1.,1.);void main(){vec4 a=texture2D(u33,vec2(.25,.5));vec2 b=a.a*u34,c=2.*a.gb-f,d=u164+a0*u4;gl_Position=vec4(c+b*d,0.,1.),vv0=vec2(.5,.5)+.5*a0;}",
            g:
              "uniform sampler2D u165;varying vec2 vv0;void main(){gl_FragColor=texture2D(u165,vv0);}",
            i: ["u33", "u165", "u34", "u164", "u4"],
            precision: "lowp",
          });
          O.la("s111", {
            name: "_",
            g:
              "uniform sampler2D u2,u166,u167;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){float a=texture2D(u2,vv0).r;vec3 b=texture2D(u167,vv0).rgb,c=texture2D(u166,vv0).rgb;gl_FragColor=vec4(mix(b,c,a*f),1.);}",
            i: ["u2", "u167", "u166"],
            precision: "lowp",
          });
          e = !0;
        },
        m: function (v) {
          e &&
            ((x = ra.instance({
              isFloat: !1,
              isPot: !0,
              url: v.Qd,
              O: function () {
                m = !0;
              },
            })),
            O.j("s110", [
              { type: "1i", name: "u33", value: 1 },
              { type: "1i", name: "u165", value: 0 },
              { type: "2f", name: "u34", value: v.Gi },
              { type: "2f", name: "u164", value: c },
              { type: "1f", name: "u4", value: 3.8 },
            ]),
            O.j("s111", [
              { type: "1i", name: "u166", value: 0 },
              { type: "1i", name: "u2", value: 1 },
              { type: "1i", name: "u167", value: 2 },
            ]));
        },
        Rb: function (v) {
          u = v;
        },
        hf: function (v, E) {
          var C = {
            isFloat: !1,
            isPot: !1,
            isMipmap: !1,
            isLinear: !1,
            width: v,
            height: E,
            D: 4,
          };
          z = 2 / v;
          B = 2 / E;
          q = ra.instance(C);
          K = ra.instance(C);
          k = Va.instance({ width: v, height: E });
        },
        V: function (v, E) {
          if (m) {
            k.bind(!1, !0);
            O.set("s73");
            for (var C = 0; 2 > C; ++C) {
              O.S("u7", z, 0);
              q.o();
              0 !== C && K.h(0);
              var A = 0 === C && !ia.ba;
              ta.l(A, A);
              O.S("u7", 0, B);
              K.o();
              q.h(0);
              ta.l(!1, !1);
            }
            O.set("s110");
            u.h(1);
            x.h(0);
            q.o();
            f.clearColor(1, 0, 0, 1);
            f.clear(f.COLOR_BUFFER_BIT);
            ta.l(!1, !1);
            O.set("s111");
            E.o();
            K.h(0);
            q.h(1);
            v.h(2);
            ta.l(!1, !1);
          }
        },
        J: function () {},
      };
    })();
    var md = (function () {
      var c = {
        instance: function (e) {
          var m = e.uh,
            k = e.th,
            u = e.$d,
            q = e.background ? e.background : ra.Kg(),
            K = e.Qa,
            x = { scale: 1, offsetX: 0, offsetY: 0 },
            z = null;
          e.Se && ((x.scale = e.Se.scale), (x.offsetY = e.Se.offsetY));
          return {
            Fg: function () {
              return K;
            },
            zg: function () {
              return q;
            },
            set: function () {
              z = kc.zk();
              kc.fi(x);
              kc.yd();
              kc.zd();
              Za.$h(u, q, !1, !1);
            },
            I: function () {
              kc.fi(z);
            },
            pc: function () {
              return {
                modelURL: m,
                materialsURLs: k,
                background: q.pc(!1),
                $d: u.pc(!1),
                Qa: K.pc(!0),
              };
            },
            wn: function (B) {
              q.h(B);
            },
          };
        },
        wc: function (e, m, k) {
          function u() {
            if (3 === ++z && m) {
              var B = c.instance({
                uh: e.modelURL,
                th: e.materialsURLs,
                background: q,
                $d: K,
                Qa: x,
              });
              m(B);
            }
          }
          var q = null,
            K = null,
            x = null,
            z = 0;
          ra.wc(e.background, function (B) {
            !B && k ? k() : ((q = B), u());
          });
          ra.wc(e.dataState, function (B) {
            !B && k ? k() : ((K = B), u());
          });
          ra.wc(e.light, function (B) {
            !B && k ? k() : ((x = B), u());
          });
        },
      };
      return c;
    })();
    return Jb || window.JEEFITAPI;
  })();
  window.JeefitFallback = (function () {
    function la() {
      window.CanvasListeners &&
        (CanvasListeners.switch_canvas(Eb),
        (sb.add_listener = CanvasListeners.add_listener),
        (sb.remove_listener = CanvasListeners.remove_listener),
        (sb.animate_swipe = CanvasListeners.animate_swipe),
        (sb.switch_modeInteractor = CanvasListeners.switch_mode),
        (sb.get_modeInteractor = CanvasListeners.get_mode),
        CanvasListeners.add_listener(
          "move",
          function (ya, nb) {
            Fc &&
              ((Cc += nb[0] * Ta.f),
              (Cc = Math.min(Math.max(Cc, -Ta.a), Ta.a)),
              (Oc += nb[1] * Ta.f),
              (Oc = Math.min(Math.max(Oc, -Ta.a), Ta.a)),
              Ka());
          },
          !0
        ).add_listener(
          "pinch",
          function (ya, nb) {
            Fc &&
              ((ec += nb * Ta.o),
              (ec = Math.min(Math.max(ec, Ta.g[0]), Ta.g[1])),
              Ka());
          },
          !0
        ));
    }
    function Ka() {
      if (!Fc || !ta) return !1;
      Yb.save();
      Yb.translate(Hb.width, 0);
      Yb.scale(-1, 1);
      Yb.drawImage(Hb, 0, 0);
      Yb.restore();
      Yb.save();
      Yb.translate(oc[0], oc[1]);
      Yb.scale(ec, ec);
      Yb.drawImage(
        ta,
        0,
        0,
        ta.width,
        ta.height,
        -oc[0] + Cc + ra,
        -oc[1] + Oc + zc,
        Gb,
        bb
      );
      Yb.restore();
      return !0;
    }
    function db(ya, nb) {
      va = ya;
      La = nb;
      Eb.width = va;
      Eb.height = La;
      Hb.width = va;
      Hb.height = La;
    }
    var Ta = {
        b: "https://fallback.jeeliz.com",
        H: "jpeg",
        D: 800,
        C: 800,
        f: 0.3,
        o: 0.5,
        g: [0.5, 1.5],
        a: 40,
        h: 500,
      },
      mb = !1,
      gb = !1,
      xb = !1,
      Ua = !1,
      pb = !1,
      yb = !1,
      hb = !1,
      Tb = null,
      wc = null,
      xc = !1,
      yc = !1,
      Ub = !1,
      Rb = !1,
      ha = !1,
      oa = [],
      va = 0,
      La = 0,
      Na = {},
      Ea = !1,
      Fa = !1,
      Sa = 0,
      vb = 0,
      Hb = null,
      Bb = null,
      zb = null,
      Ya = !1,
      lc = !1,
      bc = [],
      Eb = null,
      Yb = null,
      Fc = !1,
      Kb = !1,
      Gc = !1,
      Ic = !1,
      ec = 1,
      Cc = 0,
      Oc = 0,
      hc = null,
      Dc = null,
      oc = null,
      ia = 0,
      Pc = 0,
      za = 0,
      f = 0,
      Gb = 0,
      bb = 0,
      ra = 0,
      zc = 0,
      ta = null,
      Va = null,
      cb = null,
      sb = {
        switch_toFallbackMode: function (ya, nb) {
          if (xb || yb) return !1;
          yb = xb = !0;
          if (zb)
            return (
              zb.switch_deepSleep(!0),
              (Ya.style.display = "none"),
              (Eb.style.display = "block"),
              (Ya.id = lc + "_old"),
              (Eb.id = lc),
              la(),
              (window.JEEFITAPI = sb),
              (Ub = Ua = mb = yb = !1),
              (Na = {}),
              ya && ya(),
              !0
            );
          zb = Jb;
          var Fb = zb.get_size();
          zb.switch_deepSleep && zb.switch_deepSleep(!0);
          Kb = nb;
          sb.init(
            {},
            function () {
              sb.set_size(Fb.width, Fb.height);
              Ya = Jb.get_cv();
              Ya.style.display = "none";
              Ya.parentNode.insertBefore(Eb, Ya);
              Eb.style.position = "absolute";
              Eb.className = Ya.className;
              lc = Ya.id;
              Eb.id = lc;
              Ya.id = lc + "_old";
              bc = bc.concat(zb.get_onHalfLoadCallstack());
              yb = !1;
              ya && ya();
              la();
            },
            function () {
              yb = !1;
              nb && nb();
            }
          );
          window.JEEFITAPI = sb;
          return !0;
        },
        switch_toFullMode: function (ya) {
          if (!xb || yb || !zb || !zb.ready) return !1;
          xb = !1;
          yb = !0;
          Ya.style.display = "block";
          Eb.style.display = "none";
          Ya.id = lc;
          Eb.id = lc + "_old";
          window.JEEFITAPI = zb;
          Jb.init_listeners();
          zb.switch_deepSleep(!1);
          ya && ((yb = !1), ya());
          return !0;
        },
        set_serverURL: function (ya) {
          Ta.b = ya;
        },
        call_onDetect: function (ya) {
          mb ? ya() : bc.push(ya);
        },
        reset_adjust: function () {
          ec = 1;
          Oc = Cc = 0;
        },
        get_cv: function () {
          return Eb;
        },
        get_displayedCv: function () {
          return Eb;
        },
        set_size: function (ya, nb) {
          db(ya, nb);
          Yb = Eb.getContext("2d");
          Yb.globalCompositeOperation = "source-over";
          Bb = Hb.getContext("2d");
          Na = {};
        },
        resize: function (ya, nb) {
          function Fb() {
            hb && (clearTimeout(hb), (hb = !1));
            if (yb) hb = setTimeout(Fb, Ta.h);
            else if (ya !== va || nb !== La) {
              var ic = CanvasListeners.get_mode();
              db(ya, nb);
              mb &&
                Ua &&
                sb.detect(Ua, pb, function () {
                  CanvasListeners.switch_mode(ic);
                });
            }
          }
          hb && (clearTimeout(hb), (hb = !1));
          hb = setTimeout(Fb, Ta.h);
        },
        ready: !1,
        isFallback: !0,
        init: function (ya, nb) {
          for (var Fb in Ta) "undefined" !== typeof ya[Fb] && (Ta[Fb] = ya[Fb]);
          Tb = document.createElement("canvas");
          Tb.width = Ta.D;
          Tb.height = Ta.C;
          wc = Tb.getContext("2d");
          Eb = document.createElement("canvas");
          Ea = document.createElement("canvas");
          Hb = document.createElement("canvas");
          Fa = Ea.getContext("2d");
          hc = document.createElement("canvas");
          Dc = hc.getContext("2d");
          gb = !0;
          nb && nb();
          oa.forEach(function (ic) {
            ic();
          });
          oa.splice(0, oa.length);
          sb.ready = !0;
        },
        onLoad: function (ya) {
          gb ? ya() : oa.push(ya);
        },
        is_viewer3D: function () {
          return !1;
        },
        switch_viewer3D: function (ya, nb) {
          nb && nb();
          return !1;
        },
        switch_sleep: function () {},
        relieve_DOM: function () {},
        switch_slow: function () {},
        capture_image: function (ya, nb) {
          var Fb = new Image();
          Fb.src = Eb.toDataURL("image/jpeg");
          Fb.onload = function () {
            nb(Fb);
          };
        },
        load_model: function (ya, nb, Fb, ic) {
          ha = Fb;
          if (ic in Na)
            (Fc = !0),
              (ya = Na[ic]),
              (ta = ya.u),
              (ia = ya.F),
              (Pc = ya.G),
              (za = ya.B),
              (f = ya.A),
              (ra = ya.l),
              (zc = ya.m),
              (Gb = ya.j),
              (bb = ya.i),
              (Sa = ya.w),
              (vb = ya.v),
              (oc = ya.s),
              Ka(),
              Fb && Fb();
          else
            sb["try"](ic, function (Wa) {
              var g = va / La;
              Wa.width / Wa.height > g
                ? ((f = Wa.height),
                  (za = Wa.height * g),
                  (ia = Math.round((Wa.width - za) / 2)),
                  (Pc = 0))
                : ((za = Wa.width),
                  (f = Wa.width / g),
                  (ia = 0),
                  (Pc = Math.round((Wa.height - f) / 2)));
              1 > Ea.width / Ea.height
                ? ((bb = Gb = g = Sa),
                  (ra = Math.round((va - g) / 2)),
                  (zc = Math.round((La - g) / 2)))
                : ((bb = Gb = g = vb),
                  (ra = Math.round((va - g) / 2)),
                  (zc = Math.round((La - g) / 2)));
              ta = Wa;
              Fc = !0;
              hc.width = Eb.width;
              hc.height = Eb.height;
              Dc.clearRect(0, 0, Eb.width, Eb.height);
              Dc.drawImage(Wa, ia, Pc, za, f, 0, 0, va, La);
              g = hc.width;
              for (
                var Ec = hc.height,
                  Hc = Dc.getImageData(0, 0, g, Ec).data,
                  uc = 0,
                  Xb = [0, 0],
                  fc = 0;
                fc < g;
                ++fc
              )
                for (var Bc = 0; Bc < Ec; ++Bc) {
                  var ma = Hc[4 * (fc + Bc * g) + 3] / 255;
                  Xb[0] += ma * fc;
                  Xb[1] += ma * Bc;
                  uc += ma;
                }
              Xb[0] /= uc;
              Xb[1] /= uc;
              oc = Xb;
              Ka();
              Na[ic] = {
                u: Wa,
                s: oc,
                F: ia,
                G: Pc,
                B: za,
                A: f,
                l: ra,
                m: zc,
                j: Gb,
                i: bb,
                w: Sa,
                v: vb,
              };
              Fb && Fb();
            });
        },
        detect: function (ya, nb, Fb, ic) {
          if (yb)
            setTimeout(function () {
              sb.detect(ya, nb, Fb, ic);
            }, 1e3);
          else if ("IMG" !== ya.tagName || ya.complete) {
            yb = !0;
            mb = !1;
            Ua = ya;
            pb = nb;
            Fb && (Ic = Fb);
            ic && (Gc = ic);
            nb
              ? (Va = ya)
              : ((Va && cb) ||
                  ((Va = document.createElement("canvas")),
                  (cb = Va.getContext("2d"))),
                (Va.width = ya.width),
                (Va.height = ya.height),
                cb.save(),
                cb.translate(ya.width, 0),
                cb.scale(-1, 1),
                cb.drawImage(ya, 0, 0),
                cb.restore());
            va || sb.set_size(ya.width, ya.height);
            ta = !1;
            Na = {};
            var Wa = 0,
              g = 0,
              Ec = 0,
              Hc = 0;
            ya.width >= ya.height
              ? ((g = 0),
                (Ec = Hc = ya.height),
                (Wa = Math.round((ya.width - ya.height) / 2)))
              : ((Wa = 0),
                (Ec = Hc = ya.width),
                (g = Math.round((ya.height - ya.width) / 2)));
            wc.drawImage(Va, Wa, g, Ec, Hc, 0, 0, Tb.width, Tb.height);
            sb.c(
              Ta.b,
              { action: "detect", imageData: Tb.toDataURL("image/" + Ta.H) },
              sb.on_detect,
              function () {
                yb = !1;
              }
            );
            Wa = va / La;
            var uc = -1;
            ya.width / ya.height > Wa
              ? ((Hc = ya.height),
                (Ec = Math.round(ya.height * Wa)),
                (Wa = Math.round((ya.width - Ec) / 2)),
                (g = 0),
                (uc = La / ya.height))
              : ((Ec = ya.width),
                (Hc = Math.round(ya.width / Wa)),
                (Wa = 0),
                (g = Math.round((ya.height - Hc) / 2)),
                (uc = va / ya.width));
            Sa = Math.round(uc * ya.width);
            vb = Math.round(uc * ya.height);
            uc = Math.min(uc, 1);
            Ea.width = Math.round(uc * ya.width);
            Ea.height = Math.round(uc * ya.height);
            Fa.drawImage(
              Va,
              0,
              0,
              ya.width,
              ya.height,
              0,
              0,
              Ea.width,
              Ea.height
            );
            Bb.drawImage(Va, Wa, g, Ec, Hc, 0, 0, va, La);
          } else
            ya.onload = function () {
              sb.detect(ya, nb, Fb, ic);
            };
        },
        get_reducedImage: function () {
          return Ea;
        },
        on_detect: function (ya) {
          yb = !1;
          ya = JSON.parse(ya);
          ya.detectionId
            ? ((xc = ya.detectionId),
              (mb = !0),
              bc.forEach(function (nb) {
                sb.onLoad(nb);
              }),
              bc.splice(0, bc.length),
              Ic && Ic(xc),
              Rb && Ub && sb.load_model(!1, !1, ha, Ub))
            : Gc && Gc();
        },
        try: function (ya, nb) {
          if (yb || !mb) return !1;
          yb = !0;
          Rb = !1;
          Ub = ya;
          yc = nb;
          sb.c(
            Ta.b,
            { action: "try", sku: ya, detectionId: xc },
            sb.on_try,
            function () {
              yb = !1;
            }
          );
          return !0;
        },
        on_try: function (ya) {
          yb = !1;
          if ((ya = JSON.parse(ya)) && ya.imageData) {
            var nb = new Image();
            nb.src = ya.imageData;
            Rb = !0;
            yc &&
              (nb.onload = function () {
                yc(nb);
              });
          } else Kb && Kb();
        },
        c: function (ya, nb, Fb, ic) {
          var Wa = new XMLHttpRequest();
          Wa.open("POST", ya, !0);
          Wa.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
          ic && (Wa.onerror = ic);
          Wa.onreadystatechange = function () {
            4 === Wa.readyState && 200 === Wa.status && Fb(Wa.responseText);
          };
          Wa.send(JSON.stringify(nb));
        },
      };
    sb.onHalfLoad = sb.onLoad;
    return sb;
  })();
  !(function (la, Ka) {
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = la.document
          ? Ka(la, !0)
          : function (db) {
              if (!db.document)
                throw Error("jQuery requires a window with a document");
              return Ka(db);
            })
      : Ka(la);
  })("undefined" != typeof window ? window : this, function (la, Ka) {
    function db(a, b) {
      b = b || bb;
      var d = b.createElement("script");
      d.text = a;
      b.head.appendChild(d).parentNode.removeChild(d);
    }
    function Ta(a) {
      var b = !!a && "length" in a && a.length,
        d = g.type(a);
      return (
        "function" !== d &&
        !g.isWindow(a) &&
        ("array" === d ||
          0 === b ||
          ("number" == typeof b && 0 < b && b - 1 in a))
      );
    }
    function mb(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    }
    function gb(a, b, d) {
      return g.isFunction(b)
        ? g.grep(a, function (h, l) {
            return !!b.call(h, l, h) !== d;
          })
        : b.nodeType
        ? g.grep(a, function (h) {
            return (h === b) !== d;
          })
        : "string" != typeof b
        ? g.grep(a, function (h) {
            return -1 < cb.call(b, h) !== d;
          })
        : Vb.test(b)
        ? g.filter(b, a, d)
        : ((b = g.filter(b, a)),
          g.grep(a, function (h) {
            return -1 < cb.call(b, h) !== d && 1 === h.nodeType;
          }));
    }
    function xb(a, b) {
      for (; (a = a[b]) && 1 !== a.nodeType; );
      return a;
    }
    function Ua(a) {
      var b = {};
      return (
        g.each(a.match(tc) || [], function (d, h) {
          b[h] = !0;
        }),
        b
      );
    }
    function pb(a) {
      return a;
    }
    function yb(a) {
      throw a;
    }
    function hb(a, b, d, h) {
      var l;
      try {
        a && g.isFunction((l = a.promise))
          ? l.call(a).done(b).fail(d)
          : a && g.isFunction((l = a.then))
          ? l.call(a, b, d)
          : b.apply(void 0, [a].slice(h));
      } catch (n) {
        d.apply(void 0, [n]);
      }
    }
    function Tb() {
      bb.removeEventListener("DOMContentLoaded", Tb);
      la.removeEventListener("load", Tb);
      g.ready();
    }
    function wc() {
      this.expando = g.expando + wc.uid++;
    }
    function xc(a, b, d) {
      var h;
      if (void 0 === d && 1 === a.nodeType)
        if (
          ((h = "data-" + b.replace(kd, "-$&").toLowerCase()),
          (d = a.getAttribute(h)),
          "string" == typeof d)
        ) {
          try {
            (h = d),
              (d =
                "true" === h ||
                ("false" !== h &&
                  ("null" === h
                    ? null
                    : h === +h + ""
                    ? +h
                    : td.test(h)
                    ? JSON.parse(h)
                    : h)));
          } catch (l) {}
          sc.set(a, b, d);
        } else d = void 0;
      return d;
    }
    function yc(a, b, d, h) {
      var l,
        n = 1,
        r = 20,
        w = h
          ? function () {
              return h.cur();
            }
          : function () {
              return g.css(a, b, "");
            },
        H = w(),
        Y = (d && d[3]) || (g.cssNumber[b] ? "" : "px"),
        M = (g.cssNumber[b] || ("px" !== Y && +H)) && ad.exec(g.css(a, b));
      if (M && M[3] !== Y) {
        Y = Y || M[3];
        d = d || [];
        M = +H || 1;
        do (n = n || ".5"), (M /= n), g.style(a, b, M + Y);
        while (n !== (n = w() / H) && 1 !== n && --r);
      }
      return (
        d &&
          ((M = +M || +H || 0),
          (l = d[1] ? M + (d[1] + 1) * d[2] : +d[2]),
          h && ((h.unit = Y), (h.start = M), (h.end = l))),
        l
      );
    }
    function Ub(a, b) {
      for (var d, h, l = [], n = 0, r = a.length; n < r; n++)
        if (((h = a[n]), h.style))
          if (((d = h.style.display), b)) {
            if (
              ("none" === d &&
                ((l[n] = ib.get(h, "display") || null),
                l[n] || (h.style.display = "")),
              "" === h.style.display && nd(h))
            ) {
              d = n;
              var w = void 0;
              var H = h.ownerDocument;
              var Y = h.nodeName;
              H = (h = Ib[Y])
                ? h
                : ((w = H.body.appendChild(H.createElement(Y))),
                  (h = g.css(w, "display")),
                  w.parentNode.removeChild(w),
                  "none" === h && (h = "block"),
                  (Ib[Y] = h),
                  h);
              l[d] = H;
            }
          } else "none" !== d && ((l[n] = "none"), ib.set(h, "display", d));
      for (n = 0; n < r; n++) null != l[n] && (a[n].style.display = l[n]);
      return a;
    }
    function Rb(a, b) {
      var d;
      return (
        (d =
          "undefined" != typeof a.getElementsByTagName
            ? a.getElementsByTagName(b || "*")
            : "undefined" != typeof a.querySelectorAll
            ? a.querySelectorAll(b || "*")
            : []),
        void 0 === b || (b && mb(a, b)) ? g.merge([a], d) : d
      );
    }
    function ha(a, b) {
      for (var d = 0, h = a.length; d < h; d++)
        ib.set(a[d], "globalEval", !b || ib.get(b[d], "globalEval"));
    }
    function oa(a, b, d, h, l) {
      for (
        var n,
          r,
          w,
          H,
          Y = b.createDocumentFragment(),
          M = [],
          na = 0,
          Ma = a.length;
        na < Ma;
        na++
      )
        if (((n = a[na]), n || 0 === n))
          if ("object" === g.type(n)) g.merge(M, n.nodeType ? [n] : n);
          else if (Qc.test(n)) {
            r = r || Y.appendChild(b.createElement("div"));
            w = (eb.exec(n) || ["", ""])[1].toLowerCase();
            w = Sb[w] || Sb._default;
            r.innerHTML = w[1] + g.htmlPrefilter(n) + w[2];
            for (w = w[0]; w--; ) r = r.lastChild;
            g.merge(M, r.childNodes);
            r = Y.firstChild;
            r.textContent = "";
          } else M.push(b.createTextNode(n));
      Y.textContent = "";
      for (na = 0; (n = M[na++]); )
        if (h && -1 < g.inArray(n, h)) l && l.push(n);
        else if (
          ((H = g.contains(n.ownerDocument, n)),
          (r = Rb(Y.appendChild(n), "script")),
          H && ha(r),
          d)
        )
          for (w = 0; (n = r[w++]); ) Aa.test(n.type || "") && d.push(n);
      return Y;
    }
    function va() {
      return !0;
    }
    function La() {
      return !1;
    }
    function Na() {
      try {
        return bb.activeElement;
      } catch (a) {}
    }
    function Ea(a, b, d, h, l, n) {
      var r, w;
      if ("object" == typeof b) {
        "string" != typeof d && ((h = h || d), (d = void 0));
        for (w in b) Ea(a, w, d, h, b[w], n);
        return a;
      }
      if (
        (null == h && null == l
          ? ((l = d), (h = d = void 0))
          : null == l &&
            ("string" == typeof d
              ? ((l = h), (h = void 0))
              : ((l = h), (h = d), (d = void 0))),
        !1 === l)
      )
        l = La;
      else if (!l) return a;
      return (
        1 === n &&
          ((r = l),
          (l = function (H) {
            return g().off(H), r.apply(this, arguments);
          }),
          (l.guid = r.guid || (r.guid = g.guid++))),
        a.each(function () {
          g.event.add(this, b, l, h, d);
        })
      );
    }
    function Fa(a, b) {
      return mb(a, "table") && mb(11 !== b.nodeType ? b : b.firstChild, "tr")
        ? g(">tbody", a)[0] || a
        : a;
    }
    function Sa(a) {
      return (a.type = (null !== a.getAttribute("type")) + "/" + a.type), a;
    }
    function vb(a) {
      var b = ud.exec(a.type);
      return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function Hb(a, b) {
      var d, h, l, n, r, w;
      if (1 === b.nodeType) {
        if (
          ib.hasData(a) &&
          ((d = ib.access(a)), (h = ib.set(b, d)), (w = d.events))
        )
          for (l in (delete h.handle, (h.events = {}), w))
            for (d = 0, h = w[l].length; d < h; d++) g.event.add(b, l, w[l][d]);
        sc.hasData(a) &&
          ((n = sc.access(a)), (r = g.extend({}, n)), sc.set(b, r));
      }
    }
    function Bb(a, b, d, h) {
      b = ta.apply([], b);
      var l,
        n,
        r,
        w = 0,
        H = a.length,
        Y = H - 1,
        M = b[0],
        na = g.isFunction(M);
      if (na || (1 < H && "string" == typeof M && !Wa.checkClone && vd.test(M)))
        return a.each(function (Ra) {
          var Pa = a.eq(Ra);
          na && (b[0] = M.call(this, Ra, Pa.html()));
          Bb(Pa, b, d, h);
        });
      if (
        H &&
        ((l = oa(b, a[0].ownerDocument, !1, a, h)),
        (n = l.firstChild),
        1 === l.childNodes.length && (l = n),
        n || h)
      ) {
        n = g.map(Rb(l, "script"), Sa);
        for (r = n.length; w < H; w++) {
          var Ma = l;
          w !== Y &&
            ((Ma = g.clone(Ma, !0, !0)), r && g.merge(n, Rb(Ma, "script")));
          d.call(a[w], Ma, w);
        }
        if (r)
          for (
            l = n[n.length - 1].ownerDocument, g.map(n, vb), w = 0;
            w < r;
            w++
          )
            (Ma = n[w]),
              Aa.test(Ma.type || "") &&
                !ib.access(Ma, "globalEval") &&
                g.contains(l, Ma) &&
                (Ma.src
                  ? g._evalUrl && g._evalUrl(Ma.src)
                  : db(Ma.textContent.replace(Kc, ""), l));
      }
      return a;
    }
    function zb(a, b, d) {
      for (var h = b ? g.filter(b, a) : a, l = 0; null != (b = h[l]); l++)
        d || 1 !== b.nodeType || g.cleanData(Rb(b)),
          b.parentNode &&
            (d && g.contains(b.ownerDocument, b) && ha(Rb(b, "script")),
            b.parentNode.removeChild(b));
      return a;
    }
    function Ya(a, b, d) {
      var h,
        l,
        n,
        r,
        w = a.style;
      return (
        (d = d || c(a)),
        d &&
          ((r = d.getPropertyValue(b) || d[b]),
          "" !== r || g.contains(a.ownerDocument, a) || (r = g.style(a, b)),
          !Wa.pixelMarginRight() &&
            md.test(r) &&
            Bd.test(b) &&
            ((h = w.width),
            (l = w.minWidth),
            (n = w.maxWidth),
            (w.minWidth = w.maxWidth = w.width = r),
            (r = d.width),
            (w.width = h),
            (w.minWidth = l),
            (w.maxWidth = n))),
        void 0 !== r ? r + "" : r
      );
    }
    function lc(a, b) {
      return {
        get: function () {
          return a()
            ? void delete this.get
            : (this.get = b).apply(this, arguments);
        },
      };
    }
    function bc(a) {
      var b = g.cssProps[a];
      if (!b) {
        b = g.cssProps;
        a: {
          var d = a;
          if (!(d in K)) {
            for (var h = d[0].toUpperCase() + d.slice(1), l = q.length; l--; )
              if (((d = q[l] + h), d in K)) break a;
            d = void 0;
          }
        }
        b = b[a] = d || a;
      }
      return b;
    }
    function Eb(a, b, d) {
      return (a = ad.exec(b))
        ? Math.max(0, a[2] - (d || 0)) + (a[3] || "px")
        : b;
    }
    function Yb(a, b, d, h, l) {
      var n = 0;
      for (
        b = d === (h ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        4 > b;
        b += 2
      )
        "margin" === d && (n += g.css(a, d + Jc[b], !0, l)),
          h
            ? ("content" === d && (n -= g.css(a, "padding" + Jc[b], !0, l)),
              "margin" !== d &&
                (n -= g.css(a, "border" + Jc[b] + "Width", !0, l)))
            : ((n += g.css(a, "padding" + Jc[b], !0, l)),
              "padding" !== d &&
                (n += g.css(a, "border" + Jc[b] + "Width", !0, l)));
      return n;
    }
    function Fc(a, b, d) {
      var h,
        l = c(a),
        n = Ya(a, b, l),
        r = "border-box" === g.css(a, "boxSizing", !1, l);
      return md.test(n)
        ? n
        : ((h = r && (Wa.boxSizingReliable() || n === a.style[b])),
          "auto" === n && (n = a["offset" + b[0].toUpperCase() + b.slice(1)]),
          (n = parseFloat(n) || 0),
          n + Yb(a, b, d || (r ? "border" : "content"), h, l) + "px");
    }
    function Kb(a, b, d, h, l) {
      return new Kb.prototype.init(a, b, d, h, l);
    }
    function Gc() {
      z &&
        (!1 === bb.hidden && la.requestAnimationFrame
          ? la.requestAnimationFrame(Gc)
          : la.setTimeout(Gc, g.fx.interval),
        g.fx.tick());
    }
    function Ic() {
      return (
        la.setTimeout(function () {
          x = void 0;
        }),
        (x = g.now())
      );
    }
    function ec(a, b) {
      var d = 0,
        h = { height: a };
      for (b = b ? 1 : 0; 4 > d; d += 2 - b) {
        var l = Jc[d];
        h["margin" + l] = h["padding" + l] = a;
      }
      return b && (h.opacity = h.width = a), h;
    }
    function Cc(a, b, d) {
      for (
        var h,
          l = (hc.tweeners[b] || []).concat(hc.tweeners["*"]),
          n = 0,
          r = l.length;
        n < r;
        n++
      )
        if ((h = l[n].call(d, b, a))) return h;
    }
    function Oc(a, b) {
      var d, h, l, n, r;
      for (d in a)
        if (
          ((h = g.camelCase(d)),
          (l = b[h]),
          (n = a[d]),
          Array.isArray(n) && ((l = n[1]), (n = a[d] = n[0])),
          d !== h && ((a[h] = n), delete a[d]),
          (r = g.cssHooks[h]),
          r && "expand" in r)
        )
          for (d in ((n = r.expand(n)), delete a[h], n))
            d in a || ((a[d] = n[d]), (b[d] = l));
        else b[h] = l;
    }
    function hc(a, b, d) {
      var h,
        l = 0,
        n = hc.prefilters.length,
        r = g.Deferred().always(function () {
          delete w.elem;
        }),
        w = function () {
          if (h) return !1;
          var Y = x || Ic();
          Y = Math.max(0, H.startTime + H.duration - Y);
          for (
            var M = 1 - (Y / H.duration || 0), na = 0, Ma = H.tweens.length;
            na < Ma;
            na++
          )
            H.tweens[na].run(M);
          return (
            r.notifyWith(a, [H, M, Y]),
            1 > M && Ma
              ? Y
              : (Ma || r.notifyWith(a, [H, 1, 0]), r.resolveWith(a, [H]), !1)
          );
        },
        H = r.promise({
          elem: a,
          props: g.extend({}, b),
          opts: g.extend(
            !0,
            { specialEasing: {}, easing: g.easing._default },
            d
          ),
          originalProperties: b,
          originalOptions: d,
          startTime: x || Ic(),
          duration: d.duration,
          tweens: [],
          createTween: function (Y, M) {
            Y = g.Tween(
              a,
              H.opts,
              Y,
              M,
              H.opts.specialEasing[Y] || H.opts.easing
            );
            return H.tweens.push(Y), Y;
          },
          stop: function (Y) {
            var M = 0,
              na = Y ? H.tweens.length : 0;
            if (h) return this;
            for (h = !0; M < na; M++) H.tweens[M].run(1);
            return (
              Y
                ? (r.notifyWith(a, [H, 1, 0]), r.resolveWith(a, [H, Y]))
                : r.rejectWith(a, [H, Y]),
              this
            );
          },
        });
      d = H.props;
      for (Oc(d, H.opts.specialEasing); l < n; l++)
        if ((b = hc.prefilters[l].call(H, a, d, H.opts)))
          return (
            g.isFunction(b.stop) &&
              (g._queueHooks(H.elem, H.opts.queue).stop = g.proxy(b.stop, b)),
            b
          );
      return (
        g.map(d, Cc, H),
        g.isFunction(H.opts.start) && H.opts.start.call(a, H),
        H.progress(H.opts.progress)
          .done(H.opts.done, H.opts.complete)
          .fail(H.opts.fail)
          .always(H.opts.always),
        g.fx.timer(g.extend(w, { elem: a, anim: H, queue: H.opts.queue })),
        H
      );
    }
    function Dc(a) {
      return (a.match(tc) || []).join(" ");
    }
    function oc(a) {
      return (a.getAttribute && a.getAttribute("class")) || "";
    }
    function ia(a, b, d, h) {
      var l;
      if (Array.isArray(b))
        g.each(b, function (n, r) {
          d || y.test(a)
            ? h(a, r)
            : ia(
                a + "[" + ("object" == typeof r && null != r ? n : "") + "]",
                r,
                d,
                h
              );
        });
      else if (d || "object" !== g.type(b)) h(a, b);
      else for (l in b) ia(a + "[" + l + "]", b[l], d, h);
    }
    function Pc(a) {
      return function (b, d) {
        "string" != typeof b && ((d = b), (b = "*"));
        var h = 0,
          l = b.toLowerCase().match(tc) || [];
        if (g.isFunction(d))
          for (; (b = l[h++]); )
            "+" === b[0]
              ? ((b = b.slice(1) || "*"), (a[b] = a[b] || []).unshift(d))
              : (a[b] = a[b] || []).push(d);
      };
    }
    function za(a, b, d, h) {
      function l(w) {
        var H;
        return (
          (n[w] = !0),
          g.each(a[w] || [], function (Y, M) {
            Y = M(b, d, h);
            return "string" != typeof Y || r || n[Y]
              ? r
                ? !(H = Y)
                : void 0
              : (b.dataTypes.unshift(Y), l(Y), !1);
          }),
          H
        );
      }
      var n = {},
        r = a === Ca;
      return l(b.dataTypes[0]) || (!n["*"] && l("*"));
    }
    function f(a, b) {
      var d,
        h,
        l = g.ajaxSettings.flatOptions || {};
      for (d in b) void 0 !== b[d] && ((l[d] ? a : h || (h = {}))[d] = b[d]);
      return h && g.extend(!0, a, h), a;
    }
    var Gb = [],
      bb = la.document,
      ra = Object.getPrototypeOf,
      zc = Gb.slice,
      ta = Gb.concat,
      Va = Gb.push,
      cb = Gb.indexOf,
      sb = {},
      ya = sb.toString,
      nb = sb.hasOwnProperty,
      Fb = nb.toString,
      ic = Fb.call(Object),
      Wa = {},
      g = function (a, b) {
        return new g.fn.init(a, b);
      },
      Ec = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      Hc = /^-ms-/,
      uc = /-([a-z])/g,
      Xb = function (a, b) {
        return b.toUpperCase();
      };
    g.fn = g.prototype = {
      jquery: "3.2.1",
      constructor: g,
      length: 0,
      toArray: function () {
        return zc.call(this);
      },
      get: function (a) {
        return null == a
          ? zc.call(this)
          : 0 > a
          ? this[a + this.length]
          : this[a];
      },
      pushStack: function (a) {
        a = g.merge(this.constructor(), a);
        return (a.prevObject = this), a;
      },
      each: function (a) {
        return g.each(this, a);
      },
      map: function (a) {
        return this.pushStack(
          g.map(this, function (b, d) {
            return a.call(b, d, b);
          })
        );
      },
      slice: function () {
        return this.pushStack(zc.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (a) {
        var b = this.length;
        a = +a + (0 > a ? b : 0);
        return this.pushStack(0 <= a && a < b ? [this[a]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      push: Va,
      sort: Gb.sort,
      splice: Gb.splice,
    };
    g.extend = g.fn.extend = function () {
      var a,
        b,
        d,
        h,
        l = arguments[0] || {},
        n = 1,
        r = arguments.length,
        w = !1;
      "boolean" == typeof l && ((w = l), (l = arguments[n] || {}), n++);
      "object" == typeof l || g.isFunction(l) || (l = {});
      for (n === r && ((l = this), n--); n < r; n++)
        if (null != (a = arguments[n]))
          for (b in a) {
            var H = l[b];
            var Y = a[b];
            l !== Y &&
              (w && Y && (g.isPlainObject(Y) || (d = Array.isArray(Y)))
                ? (d
                    ? ((d = !1), (h = H && Array.isArray(H) ? H : []))
                    : (h = H && g.isPlainObject(H) ? H : {}),
                  (l[b] = g.extend(w, h, Y)))
                : void 0 !== Y && (l[b] = Y));
          }
      return l;
    };
    g.extend({
      expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (a) {
        throw Error(a);
      },
      noop: function () {},
      isFunction: function (a) {
        return "function" === g.type(a);
      },
      isWindow: function (a) {
        return null != a && a === a.window;
      },
      isNumeric: function (a) {
        var b = g.type(a);
        return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
      },
      isPlainObject: function (a) {
        var b, d;
        return (
          !(!a || "[object Object]" !== ya.call(a)) &&
          (!(b = ra(a)) ||
            ((d = nb.call(b, "constructor") && b.constructor),
            "function" == typeof d && Fb.call(d) === ic))
        );
      },
      isEmptyObject: function (a) {
        for (var b in a) return !1;
        return !0;
      },
      type: function (a) {
        return null == a
          ? a + ""
          : "object" == typeof a || "function" == typeof a
          ? sb[ya.call(a)] || "object"
          : typeof a;
      },
      globalEval: function (a) {
        db(a);
      },
      camelCase: function (a) {
        return a.replace(Hc, "ms-").replace(uc, Xb);
      },
      each: function (a, b) {
        var d,
          h = 0;
        if (Ta(a))
          for (d = a.length; h < d && !1 !== b.call(a[h], h, a[h]); h++);
        else for (h in a) if (!1 === b.call(a[h], h, a[h])) break;
        return a;
      },
      trim: function (a) {
        return null == a ? "" : (a + "").replace(Ec, "");
      },
      makeArray: function (a, b) {
        b = b || [];
        return (
          null != a &&
            (Ta(Object(a))
              ? g.merge(b, "string" == typeof a ? [a] : a)
              : Va.call(b, a)),
          b
        );
      },
      inArray: function (a, b, d) {
        return null == b ? -1 : cb.call(b, a, d);
      },
      merge: function (a, b) {
        for (var d = +b.length, h = 0, l = a.length; h < d; h++) a[l++] = b[h];
        return (a.length = l), a;
      },
      grep: function (a, b, d) {
        for (var h = [], l = 0, n = a.length, r = !d; l < n; l++)
          (d = !b(a[l], l)), d !== r && h.push(a[l]);
        return h;
      },
      map: function (a, b, d) {
        var h,
          l = 0,
          n = [];
        if (Ta(a))
          for (h = a.length; l < h; l++) {
            var r = b(a[l], l, d);
            null != r && n.push(r);
          }
        else for (l in a) (r = b(a[l], l, d)), null != r && n.push(r);
        return ta.apply([], n);
      },
      guid: 1,
      proxy: function (a, b) {
        var d, h, l;
        if (
          ("string" == typeof b && ((d = a[b]), (b = a), (a = d)),
          g.isFunction(a))
        )
          return (
            (h = zc.call(arguments, 2)),
            (l = function () {
              return a.apply(b || this, h.concat(zc.call(arguments)));
            }),
            (l.guid = a.guid = a.guid || g.guid++),
            l
          );
      },
      now: Date.now,
      support: Wa,
    });
    "function" == typeof Symbol &&
      (g.fn[Symbol.iterator] = Gb[Symbol.iterator]);
    g.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (a, b) {
        sb["[object " + b + "]"] = b.toLowerCase();
      }
    );
    var fc = (function (a) {
      function b(t, L, Z, ca) {
        var ka,
          qa,
          Ha,
          ab,
          Da = L && L.ownerDocument,
          kb = L ? L.nodeType : 9;
        if (
          ((Z = Z || []),
          "string" != typeof t || !t || (1 !== kb && 9 !== kb && 11 !== kb))
        )
          return Z;
        if (
          !ca &&
          ((L ? L.ownerDocument || L : Zb) !== jb && hd(L), (L = L || jb), mc)
        ) {
          if (11 !== kb && (ab = Yd.exec(t)))
            if ((ka = ab[1]))
              if (9 === kb) {
                if (!(qa = L.getElementById(ka))) return Z;
                if (qa.id === ka) return Z.push(qa), Z;
              } else {
                if (
                  Da &&
                  (qa = Da.getElementById(ka)) &&
                  nc(L, qa) &&
                  qa.id === ka
                )
                  return Z.push(qa), Z;
              }
            else {
              if (ab[2]) return bd.apply(Z, L.getElementsByTagName(t)), Z;
              if (
                (ka = ab[3]) &&
                $b.getElementsByClassName &&
                L.getElementsByClassName
              )
                return bd.apply(Z, L.getElementsByClassName(ka)), Z;
            }
          if (!(!$b.qsa || Rc[t + " "] || (Lb && Lb.test(t)))) {
            if (1 !== kb) {
              Da = L;
              var lb = t;
            } else if ("object" !== L.nodeName.toLowerCase()) {
              (Ha = L.getAttribute("id"))
                ? (Ha = Ha.replace(Rd, Sd))
                : L.setAttribute("id", (Ha = Ab));
              qa = Cd(t);
              for (ka = qa.length; ka--; ) qa[ka] = "#" + Ha + " " + Ra(qa[ka]);
              lb = qa.join(",");
              Da = (Ld.test(t) && na(L.parentNode)) || L;
            }
            if (lb)
              try {
                return bd.apply(Z, Da.querySelectorAll(lb)), Z;
              } catch (fb) {
              } finally {
                Ha === Ab && L.removeAttribute("id");
              }
          }
        }
        return pa(t.replace(Dd, "$1"), L, Z, ca);
      }
      function d() {
        function t(Z, ca) {
          return (
            L.push(Z + " ") > Db.cacheLength && delete t[L.shift()],
            (t[Z + " "] = ca)
          );
        }
        var L = [];
        return t;
      }
      function h(t) {
        return (t[Ab] = !0), t;
      }
      function l(t) {
        var L = jb.createElement("fieldset");
        try {
          return !!t(L);
        } catch (Z) {
          return !1;
        } finally {
          L.parentNode && L.parentNode.removeChild(L);
        }
      }
      function n(t, L) {
        t = t.split("|");
        for (var Z = t.length; Z--; ) Db.attrHandle[t[Z]] = L;
      }
      function r(t, L) {
        var Z = L && t,
          ca =
            Z &&
            1 === t.nodeType &&
            1 === L.nodeType &&
            t.sourceIndex - L.sourceIndex;
        if (ca) return ca;
        if (Z) for (; (Z = Z.nextSibling); ) if (Z === L) return -1;
        return t ? 1 : -1;
      }
      function w(t) {
        return function (L) {
          return "input" === L.nodeName.toLowerCase() && L.type === t;
        };
      }
      function H(t) {
        return function (L) {
          var Z = L.nodeName.toLowerCase();
          return ("input" === Z || "button" === Z) && L.type === t;
        };
      }
      function Y(t) {
        return function (L) {
          return "form" in L
            ? L.parentNode && !1 === L.disabled
              ? "label" in L
                ? "label" in L.parentNode
                  ? L.parentNode.disabled === t
                  : L.disabled === t
                : L.isDisabled === t || (L.isDisabled !== !t && Zd(L) === t)
              : L.disabled === t
            : "label" in L && L.disabled === t;
        };
      }
      function M(t) {
        return h(function (L) {
          return (
            (L = +L),
            h(function (Z, ca) {
              for (var ka, qa = t([], Z.length, L), Ha = qa.length; Ha--; )
                Z[(ka = qa[Ha])] && (Z[ka] = !(ca[ka] = Z[ka]));
            })
          );
        });
      }
      function na(t) {
        return t && "undefined" != typeof t.getElementsByTagName && t;
      }
      function Ma() {}
      function Ra(t) {
        for (var L = 0, Z = t.length, ca = ""; L < Z; L++) ca += t[L].value;
        return ca;
      }
      function Pa(t, L, Z) {
        var ca = L.dir,
          ka = L.next,
          qa = ka || ca,
          Ha = Z && "parentNode" === qa,
          ab = wd++;
        return L.first
          ? function (Da, kb, lb) {
              for (; (Da = Da[ca]); )
                if (1 === Da.nodeType || Ha) return t(Da, kb, lb);
              return !1;
            }
          : function (Da, kb, lb) {
              var fb,
                Mb,
                cc,
                ac = [Pb, ab];
              if (lb)
                for (; (Da = Da[ca]); ) {
                  if ((1 === Da.nodeType || Ha) && t(Da, kb, lb)) return !0;
                }
              else
                for (; (Da = Da[ca]); )
                  if (1 === Da.nodeType || Ha)
                    if (
                      ((cc = Da[Ab] || (Da[Ab] = {})),
                      (Mb = cc[Da.uniqueID] || (cc[Da.uniqueID] = {})),
                      ka && ka === Da.nodeName.toLowerCase())
                    )
                      Da = Da[ca] || Da;
                    else {
                      if ((fb = Mb[qa]) && fb[0] === Pb && fb[1] === ab)
                        return (ac[2] = fb[2]);
                      if (((Mb[qa] = ac), (ac[2] = t(Da, kb, lb)))) return !0;
                    }
              return !1;
            };
      }
      function Xa(t) {
        return 1 < t.length
          ? function (L, Z, ca) {
              for (var ka = t.length; ka--; ) if (!t[ka](L, Z, ca)) return !1;
              return !0;
            }
          : t[0];
      }
      function qb(t, L, Z, ca, ka) {
        for (
          var qa, Ha = [], ab = 0, Da = t.length, kb = null != L;
          ab < Da;
          ab++
        )
          (qa = t[ab]) &&
            ((Z && !Z(qa, ca, ka)) || (Ha.push(qa), kb && L.push(ab)));
        return Ha;
      }
      function gc(t, L, Z, ca, ka, qa) {
        return (
          ca && !ca[Ab] && (ca = gc(ca)),
          ka && !ka[Ab] && (ka = gc(ka, qa)),
          h(function (Ha, ab, Da, kb) {
            var lb,
              fb = [],
              Mb = [],
              cc = ab.length,
              ac;
            if (!(ac = Ha)) {
              ac = L || "*";
              for (
                var rb = Da.nodeType ? [Da] : Da,
                  Vc = [],
                  Ac = 0,
                  Sc = rb.length;
                Ac < Sc;
                Ac++
              )
                b(ac, rb[Ac], Vc);
              ac = Vc;
            }
            ac = !t || (!Ha && L) ? ac : qb(ac, fb, t, Da, kb);
            rb = Z ? (ka || (Ha ? t : cc || ca) ? [] : ab) : ac;
            if ((Z && Z(ac, rb, Da, kb), ca)) {
              var pc = qb(rb, Mb);
              ca(pc, [], Da, kb);
              for (Da = pc.length; Da--; )
                (lb = pc[Da]) && (rb[Mb[Da]] = !(ac[Mb[Da]] = lb));
            }
            if (Ha) {
              if (ka || t) {
                if (ka) {
                  pc = [];
                  for (Da = rb.length; Da--; )
                    (lb = rb[Da]) && pc.push((ac[Da] = lb));
                  ka(null, (rb = []), pc, kb);
                }
                for (Da = rb.length; Da--; )
                  (lb = rb[Da]) &&
                    -1 < (pc = ka ? id(Ha, lb) : fb[Da]) &&
                    (Ha[pc] = !(ab[pc] = lb));
              }
            } else (rb = qb(rb === ab ? rb.splice(cc, rb.length) : rb)), ka ? ka(null, ab, rb, kb) : bd.apply(ab, rb);
          })
        );
      }
      function Oa(t) {
        var L,
          Z,
          ca = t.length,
          ka = Db.relative[t[0].type];
        var qa = ka || Db.relative[" "];
        for (
          var Ha = ka ? 1 : 0,
            ab = Pa(
              function (lb) {
                return lb === L;
              },
              qa,
              !0
            ),
            Da = Pa(
              function (lb) {
                return -1 < id(L, lb);
              },
              qa,
              !0
            ),
            kb = [
              function (lb, fb, Mb) {
                lb =
                  (!ka && (Mb || fb !== Qa)) ||
                  ((L = fb).nodeType ? ab(lb, fb, Mb) : Da(lb, fb, Mb));
                return (L = null), lb;
              },
            ];
          Ha < ca;
          Ha++
        )
          if ((qa = Db.relative[t[Ha].type])) kb = [Pa(Xa(kb), qa)];
          else {
            if (
              ((qa = Db.filter[t[Ha].type].apply(null, t[Ha].matches)), qa[Ab])
            ) {
              for (Z = ++Ha; Z < ca && !Db.relative[t[Z].type]; Z++);
              return gc(
                1 < Ha && Xa(kb),
                1 < Ha &&
                  Ra(
                    t
                      .slice(0, Ha - 1)
                      .concat({ value: " " === t[Ha - 2].type ? "*" : "" })
                  ).replace(Dd, "$1"),
                qa,
                Ha < Z && Oa(t.slice(Ha, Z)),
                Z < ca && Oa((t = t.slice(Z))),
                Z < ca && Ra(t)
              );
            }
            kb.push(qa);
          }
        return Xa(kb);
      }
      function Q(t, L) {
        var Z = 0 < L.length,
          ca = 0 < t.length,
          ka = function (qa, Ha, ab, Da, kb) {
            var lb,
              fb,
              Mb = 0,
              cc = "0",
              ac = qa && [],
              rb = [],
              Vc = Qa,
              Ac = qa || (ca && Db.find.TAG("*", kb)),
              Sc = (Pb += null == Vc ? 1 : Math.random() || 0.1),
              pc = Ac.length;
            for (
              kb && (Qa = Ha === jb || Ha || kb);
              cc !== pc && null != (lb = Ac[cc]);
              cc++
            ) {
              if (ca && lb) {
                var Md = 0;
                for (
                  Ha || lb.ownerDocument === jb || (hd(lb), (ab = !mc));
                  (fb = t[Md++]);

                )
                  if (fb(lb, Ha || jb, ab)) {
                    Da.push(lb);
                    break;
                  }
                kb && (Pb = Sc);
              }
              Z && ((lb = !fb && lb) && Mb--, qa && ac.push(lb));
            }
            if (((Mb += cc), Z && cc !== Mb)) {
              for (Md = 0; (fb = L[Md++]); ) fb(ac, rb, Ha, ab);
              if (qa) {
                if (0 < Mb)
                  for (; cc--; ) ac[cc] || rb[cc] || (rb[cc] = $d.call(Da));
                rb = qb(rb);
              }
              bd.apply(Da, rb);
              kb &&
                !qa &&
                0 < rb.length &&
                1 < Mb + L.length &&
                b.uniqueSort(Da);
            }
            return kb && ((Pb = Sc), (Qa = Vc)), ac;
          };
        return Z ? h(ka) : ka;
      }
      var sa,
        fa,
        pa,
        Qa,
        Ia,
        Cb,
        jb,
        qc,
        mc,
        Lb,
        Qb,
        Tc,
        nc,
        Ab = "sizzle" + 1 * new Date(),
        Zb = a.document,
        Pb = 0,
        wd = 0,
        Lc = d(),
        vc = d(),
        Rc = d(),
        Mc = function (t, L) {
          return t === L && (Cb = !0), 0;
        },
        cd = {}.hasOwnProperty,
        Xc = [],
        $d = Xc.pop,
        ae = Xc.push,
        bd = Xc.push,
        Td = Xc.slice,
        id = function (t, L) {
          for (var Z = 0, ca = t.length; Z < ca; Z++) if (t[Z] === L) return Z;
          return -1;
        },
        be = /[\x20\t\r\n\f]+/g,
        Dd = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        ce = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        de = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
        ee = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
        fe = /:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
        ge = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/,
        Ed = {
          ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
          CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
          TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/,
          ATTR: /^\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\]/,
          PSEUDO: /^:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
          CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
          bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
          needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
        },
        he = /^(?:input|select|textarea|button)$/i,
        ie = /^h\d$/i,
        xd = /^[^{]+\{\s*\[native \w/,
        Yd = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Ld = /[+~]/,
        Yc = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/gi,
        Zc = function (t, L, Z) {
          t = "0x" + L - 65536;
          return t !== t || Z
            ? L
            : 0 > t
            ? String.fromCharCode(t + 65536)
            : String.fromCharCode((t >> 10) | 55296, (1023 & t) | 56320);
        },
        Rd = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        Sd = function (t, L) {
          return L
            ? "\x00" === t
              ? "\ufffd"
              : t.slice(0, -1) +
                "\\" +
                t.charCodeAt(t.length - 1).toString(16) +
                " "
            : "\\" + t;
        },
        Ud = function () {
          hd();
        },
        Zd = Pa(
          function (t) {
            return !0 === t.disabled && ("form" in t || "label" in t);
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        bd.apply((Xc = Td.call(Zb.childNodes)), Zb.childNodes),
          Xc[Zb.childNodes.length].nodeType;
      } catch (t) {
        bd = {
          apply: Xc.length
            ? function (L, Z) {
                ae.apply(L, Td.call(Z));
              }
            : function (L, Z) {
                for (var ca = L.length, ka = 0; (L[ca++] = Z[ka++]); );
                L.length = ca - 1;
              },
        };
      }
      var $b = (b.support = {});
      var je = (b.isXML = function (t) {
        t = t && (t.ownerDocument || t).documentElement;
        return !!t && "HTML" !== t.nodeName;
      });
      var hd = (b.setDocument = function (t) {
        var L, Z;
        t = t ? t.ownerDocument || t : Zb;
        return t !== jb && 9 === t.nodeType && t.documentElement
          ? ((jb = t),
            (qc = jb.documentElement),
            (mc = !je(jb)),
            Zb !== jb &&
              (Z = jb.defaultView) &&
              Z.top !== Z &&
              (Z.addEventListener
                ? Z.addEventListener("unload", Ud, !1)
                : Z.attachEvent && Z.attachEvent("onunload", Ud)),
            ($b.attributes = l(function (ca) {
              return (ca.className = "i"), !ca.getAttribute("className");
            })),
            ($b.getElementsByTagName = l(function (ca) {
              return (
                ca.appendChild(jb.createComment("")),
                !ca.getElementsByTagName("*").length
              );
            })),
            ($b.getElementsByClassName = xd.test(jb.getElementsByClassName)),
            ($b.getById = l(function (ca) {
              return (
                (qc.appendChild(ca).id = Ab),
                !jb.getElementsByName || !jb.getElementsByName(Ab).length
              );
            })),
            $b.getById
              ? ((Db.filter.ID = function (ca) {
                  var ka = ca.replace(Yc, Zc);
                  return function (qa) {
                    return qa.getAttribute("id") === ka;
                  };
                }),
                (Db.find.ID = function (ca, ka) {
                  if ("undefined" != typeof ka.getElementById && mc)
                    return (ca = ka.getElementById(ca)) ? [ca] : [];
                }))
              : ((Db.filter.ID = function (ca) {
                  var ka = ca.replace(Yc, Zc);
                  return function (qa) {
                    return (
                      (qa =
                        "undefined" != typeof qa.getAttributeNode &&
                        qa.getAttributeNode("id")) && qa.value === ka
                    );
                  };
                }),
                (Db.find.ID = function (ca, ka) {
                  if ("undefined" != typeof ka.getElementById && mc) {
                    var qa,
                      Ha = ka.getElementById(ca);
                    if (Ha) {
                      if (
                        ((qa = Ha.getAttributeNode("id")),
                        qa && qa.value === ca)
                      )
                        return [Ha];
                      var ab = ka.getElementsByName(ca);
                      for (ka = 0; (Ha = ab[ka++]); )
                        if (
                          ((qa = Ha.getAttributeNode("id")),
                          qa && qa.value === ca)
                        )
                          return [Ha];
                    }
                    return [];
                  }
                })),
            (Db.find.TAG = $b.getElementsByTagName
              ? function (ca, ka) {
                  return "undefined" != typeof ka.getElementsByTagName
                    ? ka.getElementsByTagName(ca)
                    : $b.qsa
                    ? ka.querySelectorAll(ca)
                    : void 0;
                }
              : function (ca, ka) {
                  var qa = [],
                    Ha = 0;
                  ka = ka.getElementsByTagName(ca);
                  if ("*" === ca) {
                    for (; (ca = ka[Ha++]); ) 1 === ca.nodeType && qa.push(ca);
                    return qa;
                  }
                  return ka;
                }),
            (Db.find.CLASS =
              $b.getElementsByClassName &&
              function (ca, ka) {
                if ("undefined" != typeof ka.getElementsByClassName && mc)
                  return ka.getElementsByClassName(ca);
              }),
            (Qb = []),
            (Lb = []),
            ($b.qsa = xd.test(jb.querySelectorAll)) &&
              (l(function (ca) {
                qc.appendChild(ca).innerHTML =
                  "<a id='" +
                  Ab +
                  "'></a><select id='" +
                  Ab +
                  "-\r\\' msallowcapture=''><option selected=''></option></select>";
                ca.querySelectorAll("[msallowcapture^='']").length &&
                  Lb.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                ca.querySelectorAll("[selected]").length ||
                  Lb.push(
                    "\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)"
                  );
                ca.querySelectorAll("[id~=" + Ab + "-]").length ||
                  Lb.push("~=");
                ca.querySelectorAll(":checked").length || Lb.push(":checked");
                ca.querySelectorAll("a#" + Ab + "+*").length ||
                  Lb.push(".#.+[+~]");
              }),
              l(function (ca) {
                ca.innerHTML =
                  "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var ka = jb.createElement("input");
                ka.setAttribute("type", "hidden");
                ca.appendChild(ka).setAttribute("name", "D");
                ca.querySelectorAll("[name=d]").length &&
                  Lb.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                2 !== ca.querySelectorAll(":enabled").length &&
                  Lb.push(":enabled", ":disabled");
                qc.appendChild(ca).disabled = !0;
                2 !== ca.querySelectorAll(":disabled").length &&
                  Lb.push(":enabled", ":disabled");
                ca.querySelectorAll("*,:x");
                Lb.push(",.*:");
              })),
            ($b.matchesSelector = xd.test(
              (Tc =
                qc.matches ||
                qc.webkitMatchesSelector ||
                qc.mozMatchesSelector ||
                qc.oMatchesSelector ||
                qc.msMatchesSelector)
            )) &&
              l(function (ca) {
                $b.disconnectedMatch = Tc.call(ca, "*");
                Tc.call(ca, "[s!='']:x");
                Qb.push(
                  "!=",
                  ":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"
                );
              }),
            (Lb = Lb.length && new RegExp(Lb.join("|"))),
            (Qb = Qb.length && new RegExp(Qb.join("|"))),
            (L = xd.test(qc.compareDocumentPosition)),
            (nc =
              L || xd.test(qc.contains)
                ? function (ca, ka) {
                    var qa = 9 === ca.nodeType ? ca.documentElement : ca;
                    ka = ka && ka.parentNode;
                    return (
                      ca === ka ||
                      !(
                        !ka ||
                        1 !== ka.nodeType ||
                        !(qa.contains
                          ? qa.contains(ka)
                          : ca.compareDocumentPosition &&
                            16 & ca.compareDocumentPosition(ka))
                      )
                    );
                  }
                : function (ca, ka) {
                    if (ka)
                      for (; (ka = ka.parentNode); ) if (ka === ca) return !0;
                    return !1;
                  }),
            (Mc = L
              ? function (ca, ka) {
                  if (ca === ka) return (Cb = !0), 0;
                  var qa =
                    !ca.compareDocumentPosition - !ka.compareDocumentPosition;
                  return qa
                    ? qa
                    : ((qa =
                        (ca.ownerDocument || ca) === (ka.ownerDocument || ka)
                          ? ca.compareDocumentPosition(ka)
                          : 1),
                      1 & qa ||
                      (!$b.sortDetached &&
                        ka.compareDocumentPosition(ca) === qa)
                        ? ca === jb || (ca.ownerDocument === Zb && nc(Zb, ca))
                          ? -1
                          : ka === jb || (ka.ownerDocument === Zb && nc(Zb, ka))
                          ? 1
                          : Ia
                          ? id(Ia, ca) - id(Ia, ka)
                          : 0
                        : 4 & qa
                        ? -1
                        : 1);
                }
              : function (ca, ka) {
                  if (ca === ka) return (Cb = !0), 0;
                  var qa = 0,
                    Ha = ca.parentNode,
                    ab = ka.parentNode,
                    Da = [ca],
                    kb = [ka];
                  if (!Ha || !ab)
                    return ca === jb
                      ? -1
                      : ka === jb
                      ? 1
                      : Ha
                      ? -1
                      : ab
                      ? 1
                      : Ia
                      ? id(Ia, ca) - id(Ia, ka)
                      : 0;
                  if (Ha === ab) return r(ca, ka);
                  for (; (ca = ca.parentNode); ) Da.unshift(ca);
                  for (ca = ka; (ca = ca.parentNode); ) kb.unshift(ca);
                  for (; Da[qa] === kb[qa]; ) qa++;
                  return qa
                    ? r(Da[qa], kb[qa])
                    : Da[qa] === Zb
                    ? -1
                    : kb[qa] === Zb
                    ? 1
                    : 0;
                }),
            jb)
          : jb;
      });
      b.matches = function (t, L) {
        return b(t, null, null, L);
      };
      b.matchesSelector = function (t, L) {
        if (
          ((t.ownerDocument || t) !== jb && hd(t),
          (L = L.replace(ee, "='$1']")),
          !(
            !$b.matchesSelector ||
            !mc ||
            Rc[L + " "] ||
            (Qb && Qb.test(L)) ||
            (Lb && Lb.test(L))
          ))
        )
          try {
            var Z = Tc.call(t, L);
            if (
              Z ||
              $b.disconnectedMatch ||
              (t.document && 11 !== t.document.nodeType)
            )
              return Z;
          } catch (ca) {}
        return 0 < b(L, jb, null, [t]).length;
      };
      b.contains = function (t, L) {
        return (t.ownerDocument || t) !== jb && hd(t), nc(t, L);
      };
      b.attr = function (t, L) {
        (t.ownerDocument || t) !== jb && hd(t);
        var Z = Db.attrHandle[L.toLowerCase()];
        Z =
          Z && cd.call(Db.attrHandle, L.toLowerCase()) ? Z(t, L, !mc) : void 0;
        return void 0 !== Z
          ? Z
          : $b.attributes || !mc
          ? t.getAttribute(L)
          : (Z = t.getAttributeNode(L)) && Z.specified
          ? Z.value
          : null;
      };
      b.escape = function (t) {
        return (t + "").replace(Rd, Sd);
      };
      b.error = function (t) {
        throw Error("Syntax error, unrecognized expression: " + t);
      };
      b.uniqueSort = function (t) {
        var L,
          Z = [],
          ca = 0,
          ka = 0;
        if (
          ((Cb = !$b.detectDuplicates),
          (Ia = !$b.sortStable && t.slice(0)),
          t.sort(Mc),
          Cb)
        ) {
          for (; (L = t[ka++]); ) L === t[ka] && (ca = Z.push(ka));
          for (; ca--; ) t.splice(Z[ca], 1);
        }
        return (Ia = null), t;
      };
      var Nd = (b.getText = function (t) {
        var L,
          Z = "",
          ca = 0;
        if ((L = t.nodeType))
          if (1 === L || 9 === L || 11 === L) {
            if ("string" == typeof t.textContent) return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling) Z += Nd(t);
          } else {
            if (3 === L || 4 === L) return t.nodeValue;
          }
        else for (; (L = t[ca++]); ) Z += Nd(L);
        return Z;
      });
      var Db = (b.selectors = {
        cacheLength: 50,
        createPseudo: h,
        match: Ed,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: !0 },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: !0 },
          "~": { dir: "previousSibling" },
        },
        preFilter: {
          ATTR: function (t) {
            return (
              (t[1] = t[1].replace(Yc, Zc)),
              (t[3] = (t[3] || t[4] || t[5] || "").replace(Yc, Zc)),
              "~=" === t[2] && (t[3] = " " + t[3] + " "),
              t.slice(0, 4)
            );
          },
          CHILD: function (t) {
            return (
              (t[1] = t[1].toLowerCase()),
              "nth" === t[1].slice(0, 3)
                ? (t[3] || b.error(t[0]),
                  (t[4] = +(t[4]
                    ? t[5] + (t[6] || 1)
                    : 2 * ("even" === t[3] || "odd" === t[3]))),
                  (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                : t[3] && b.error(t[0]),
              t
            );
          },
          PSEUDO: function (t) {
            var L,
              Z = !t[6] && t[2];
            return Ed.CHILD.test(t[0])
              ? null
              : (t[3]
                  ? (t[2] = t[4] || t[5] || "")
                  : Z &&
                    fe.test(Z) &&
                    (L = Cd(Z, !0)) &&
                    (L = Z.indexOf(")", Z.length - L) - Z.length) &&
                    ((t[0] = t[0].slice(0, L)), (t[2] = Z.slice(0, L))),
                t.slice(0, 3));
          },
        },
        filter: {
          TAG: function (t) {
            var L = t.replace(Yc, Zc).toLowerCase();
            return "*" === t
              ? function () {
                  return !0;
                }
              : function (Z) {
                  return Z.nodeName && Z.nodeName.toLowerCase() === L;
                };
          },
          CLASS: function (t) {
            var L = Lc[t + " "];
            return (
              L ||
              ((L = new RegExp(
                "(^|[\\x20\\t\\r\\n\\f])" + t + "([\\x20\\t\\r\\n\\f]|$)"
              )),
              Lc(t, function (Z) {
                return L.test(
                  ("string" == typeof Z.className && Z.className) ||
                    ("undefined" != typeof Z.getAttribute &&
                      Z.getAttribute("class")) ||
                    ""
                );
              }))
            );
          },
          ATTR: function (t, L, Z) {
            return function (ca) {
              ca = b.attr(ca, t);
              return null == ca
                ? "!=" === L
                : !L ||
                    ((ca += ""),
                    "=" === L
                      ? ca === Z
                      : "!=" === L
                      ? ca !== Z
                      : "^=" === L
                      ? Z && 0 === ca.indexOf(Z)
                      : "*=" === L
                      ? Z && -1 < ca.indexOf(Z)
                      : "$=" === L
                      ? Z && ca.slice(-Z.length) === Z
                      : "~=" === L
                      ? -1 < (" " + ca.replace(be, " ") + " ").indexOf(Z)
                      : "|=" === L &&
                        (ca === Z || ca.slice(0, Z.length + 1) === Z + "-"));
            };
          },
          CHILD: function (t, L, Z, ca, ka) {
            var qa = "nth" !== t.slice(0, 3),
              Ha = "last" !== t.slice(-4),
              ab = "of-type" === L;
            return 1 === ca && 0 === ka
              ? function (Da) {
                  return !!Da.parentNode;
                }
              : function (Da, kb, lb) {
                  var fb, Mb;
                  kb = qa !== Ha ? "nextSibling" : "previousSibling";
                  var cc = Da.parentNode,
                    ac = ab && Da.nodeName.toLowerCase();
                  lb = !lb && !ab;
                  var rb = !1;
                  if (cc) {
                    if (qa) {
                      for (; kb; ) {
                        for (fb = Da; (fb = fb[kb]); )
                          if (
                            ab
                              ? fb.nodeName.toLowerCase() === ac
                              : 1 === fb.nodeType
                          )
                            return !1;
                        var Vc = (kb = "only" === t && !Vc && "nextSibling");
                      }
                      return !0;
                    }
                    if (
                      ((Vc = [Ha ? cc.firstChild : cc.lastChild]), Ha && lb)
                    ) {
                      fb = cc;
                      var Ac = fb[Ab] || (fb[Ab] = {});
                      var Sc = Ac[fb.uniqueID] || (Ac[fb.uniqueID] = {});
                      var pc = Sc[t] || [];
                      rb = (Mb = pc[0] === Pb && pc[1]) && pc[2];
                      for (
                        fb = Mb && cc.childNodes[Mb];
                        (fb =
                          (++Mb && fb && fb[kb]) || (rb = Mb = 0) || Vc.pop());

                      )
                        if (1 === fb.nodeType && ++rb && fb === Da) {
                          Sc[t] = [Pb, Mb, rb];
                          break;
                        }
                    } else if (
                      (lb &&
                        ((fb = Da),
                        (Ac = fb[Ab] || (fb[Ab] = {})),
                        (Sc = Ac[fb.uniqueID] || (Ac[fb.uniqueID] = {})),
                        (pc = Sc[t] || []),
                        (Mb = pc[0] === Pb && pc[1]),
                        (rb = Mb)),
                      !1 === rb)
                    )
                      for (
                        ;
                        (fb =
                          (++Mb && fb && fb[kb]) ||
                          (rb = Mb = 0) ||
                          Vc.pop()) &&
                        ((ab
                          ? fb.nodeName.toLowerCase() !== ac
                          : 1 !== fb.nodeType) ||
                          !++rb ||
                          (lb &&
                            ((Ac = fb[Ab] || (fb[Ab] = {})),
                            (Sc = Ac[fb.uniqueID] || (Ac[fb.uniqueID] = {})),
                            (Sc[t] = [Pb, rb])),
                          fb !== Da));

                      );
                    return (
                      (rb -= ka), rb === ca || (0 === rb % ca && 0 <= rb / ca)
                    );
                  }
                };
          },
          PSEUDO: function (t, L) {
            var Z,
              ca =
                Db.pseudos[t] ||
                Db.setFilters[t.toLowerCase()] ||
                b.error("unsupported pseudo: " + t);
            return ca[Ab]
              ? ca(L)
              : 1 < ca.length
              ? ((Z = [t, t, "", L]),
                Db.setFilters.hasOwnProperty(t.toLowerCase())
                  ? h(function (ka, qa) {
                      for (var Ha, ab = ca(ka, L), Da = ab.length; Da--; )
                        (Ha = id(ka, ab[Da])), (ka[Ha] = !(qa[Ha] = ab[Da]));
                    })
                  : function (ka) {
                      return ca(ka, 0, Z);
                    })
              : ca;
          },
        },
        pseudos: {
          not: h(function (t) {
            var L = [],
              Z = [],
              ca = fa(t.replace(Dd, "$1"));
            return ca[Ab]
              ? h(function (ka, qa, Ha, ab) {
                  var Da;
                  Ha = ca(ka, null, ab, []);
                  for (ab = ka.length; ab--; )
                    (Da = Ha[ab]) && (ka[ab] = !(qa[ab] = Da));
                })
              : function (ka, qa, Ha) {
                  return (
                    (L[0] = ka), ca(L, null, Ha, Z), (L[0] = null), !Z.pop()
                  );
                };
          }),
          has: h(function (t) {
            return function (L) {
              return 0 < b(t, L).length;
            };
          }),
          contains: h(function (t) {
            return (
              (t = t.replace(Yc, Zc)),
              function (L) {
                return -1 < (L.textContent || L.innerText || Nd(L)).indexOf(t);
              }
            );
          }),
          lang: h(function (t) {
            return (
              ge.test(t || "") || b.error("unsupported lang: " + t),
              (t = t.replace(Yc, Zc).toLowerCase()),
              function (L) {
                var Z;
                do
                  if (
                    (Z = mc
                      ? L.lang
                      : L.getAttribute("xml:lang") || L.getAttribute("lang"))
                  )
                    return (
                      (Z = Z.toLowerCase()), Z === t || 0 === Z.indexOf(t + "-")
                    );
                while ((L = L.parentNode) && 1 === L.nodeType);
                return !1;
              }
            );
          }),
          target: function (t) {
            var L = a.location && a.location.hash;
            return L && L.slice(1) === t.id;
          },
          root: function (t) {
            return t === qc;
          },
          focus: function (t) {
            return (
              t === jb.activeElement &&
              (!jb.hasFocus || jb.hasFocus()) &&
              !!(t.type || t.href || ~t.tabIndex)
            );
          },
          enabled: Y(!1),
          disabled: Y(!0),
          checked: function (t) {
            var L = t.nodeName.toLowerCase();
            return (
              ("input" === L && !!t.checked) || ("option" === L && !!t.selected)
            );
          },
          selected: function (t) {
            return (
              t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
            );
          },
          empty: function (t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (6 > t.nodeType) return !1;
            return !0;
          },
          parent: function (t) {
            return !Db.pseudos.empty(t);
          },
          header: function (t) {
            return ie.test(t.nodeName);
          },
          input: function (t) {
            return he.test(t.nodeName);
          },
          button: function (t) {
            var L = t.nodeName.toLowerCase();
            return ("input" === L && "button" === t.type) || "button" === L;
          },
          text: function (t) {
            var L;
            return (
              "input" === t.nodeName.toLowerCase() &&
              "text" === t.type &&
              (null == (L = t.getAttribute("type")) ||
                "text" === L.toLowerCase())
            );
          },
          first: M(function () {
            return [0];
          }),
          last: M(function (t, L) {
            return [L - 1];
          }),
          eq: M(function (t, L, Z) {
            return [0 > Z ? Z + L : Z];
          }),
          even: M(function (t, L) {
            for (var Z = 0; Z < L; Z += 2) t.push(Z);
            return t;
          }),
          odd: M(function (t, L) {
            for (var Z = 1; Z < L; Z += 2) t.push(Z);
            return t;
          }),
          lt: M(function (t, L, Z) {
            for (L = 0 > Z ? Z + L : Z; 0 <= --L; ) t.push(L);
            return t;
          }),
          gt: M(function (t, L, Z) {
            for (Z = 0 > Z ? Z + L : Z; ++Z < L; ) t.push(Z);
            return t;
          }),
        },
      });
      Db.pseudos.nth = Db.pseudos.eq;
      for (sa in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        Db.pseudos[sa] = w(sa);
      for (sa in { submit: !0, reset: !0 }) Db.pseudos[sa] = H(sa);
      Ma.prototype = Db.filters = Db.pseudos;
      Db.setFilters = new Ma();
      var Cd = (b.tokenize = function (t, L) {
        var Z, ca, ka, qa, Ha;
        if ((qa = vc[t + " "])) return L ? 0 : qa.slice(0);
        qa = t;
        var ab = [];
        for (Ha = Db.preFilter; qa; ) {
          (Da && !(Z = ce.exec(qa))) ||
            (Z && (qa = qa.slice(Z[0].length) || qa), ab.push((ca = [])));
          var Da = !1;
          (Z = de.exec(qa)) &&
            ((Da = Z.shift()),
            ca.push({ value: Da, type: Z[0].replace(Dd, " ") }),
            (qa = qa.slice(Da.length)));
          for (ka in Db.filter)
            !(Z = Ed[ka].exec(qa)) ||
              (Ha[ka] && !(Z = Ha[ka](Z))) ||
              ((Da = Z.shift()),
              ca.push({ value: Da, type: ka, matches: Z }),
              (qa = qa.slice(Da.length)));
          if (!Da) break;
        }
        return L ? qa.length : qa ? b.error(t) : vc(t, ab).slice(0);
      });
      return (
        (fa = b.compile = function (t, L) {
          var Z,
            ca = [],
            ka = [],
            qa = Rc[t + " "];
          if (!qa) {
            L || (L = Cd(t));
            for (Z = L.length; Z--; )
              (qa = Oa(L[Z])), qa[Ab] ? ca.push(qa) : ka.push(qa);
            qa = Rc(t, Q(ka, ca));
            qa.selector = t;
          }
          return qa;
        }),
        (pa = b.select = function (t, L, Z, ca) {
          var ka,
            qa,
            Ha,
            ab,
            Da,
            kb = "function" == typeof t && t,
            lb = !ca && Cd((t = kb.selector || t));
          if (((Z = Z || []), 1 === lb.length)) {
            if (
              ((qa = lb[0] = lb[0].slice(0)),
              2 < qa.length &&
                "ID" === (Ha = qa[0]).type &&
                9 === L.nodeType &&
                mc &&
                Db.relative[qa[1].type])
            ) {
              if (
                ((L = (Db.find.ID(Ha.matches[0].replace(Yc, Zc), L) || [])[0]),
                !L)
              )
                return Z;
              kb && (L = L.parentNode);
              t = t.slice(qa.shift().value.length);
            }
            for (
              ka = Ed.needsContext.test(t) ? 0 : qa.length;
              ka-- && ((Ha = qa[ka]), !Db.relative[(ab = Ha.type)]);

            )
              if (
                (Da = Db.find[ab]) &&
                (ca = Da(
                  Ha.matches[0].replace(Yc, Zc),
                  (Ld.test(qa[0].type) && na(L.parentNode)) || L
                ))
              ) {
                if ((qa.splice(ka, 1), (t = ca.length && Ra(qa)), !t))
                  return bd.apply(Z, ca), Z;
                break;
              }
          }
          return (
            (kb || fa(t, lb))(
              ca,
              L,
              !mc,
              Z,
              !L || (Ld.test(t) && na(L.parentNode)) || L
            ),
            Z
          );
        }),
        ($b.sortStable = Ab.split("").sort(Mc).join("") === Ab),
        ($b.detectDuplicates = !!Cb),
        hd(),
        ($b.sortDetached = l(function (t) {
          return 1 & t.compareDocumentPosition(jb.createElement("fieldset"));
        })),
        l(function (t) {
          return (
            (t.innerHTML = "<a href='#'></a>"),
            "#" === t.firstChild.getAttribute("href")
          );
        }) ||
          n("type|href|height|width", function (t, L, Z) {
            if (!Z)
              return t.getAttribute(L, "type" === L.toLowerCase() ? 1 : 2);
          }),
        ($b.attributes &&
          l(function (t) {
            return (
              (t.innerHTML = "<input/>"),
              t.firstChild.setAttribute("value", ""),
              "" === t.firstChild.getAttribute("value")
            );
          })) ||
          n("value", function (t, L, Z) {
            if (!Z && "input" === t.nodeName.toLowerCase())
              return t.defaultValue;
          }),
        l(function (t) {
          return null == t.getAttribute("disabled");
        }) ||
          n(
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            function (t, L, Z) {
              var ca;
              if (!Z)
                return !0 === t[L]
                  ? L.toLowerCase()
                  : (ca = t.getAttributeNode(L)) && ca.specified
                  ? ca.value
                  : null;
            }
          ),
        b
      );
    })(la);
    g.find = fc;
    g.expr = fc.selectors;
    g.expr[":"] = g.expr.pseudos;
    g.uniqueSort = g.unique = fc.uniqueSort;
    g.text = fc.getText;
    g.isXMLDoc = fc.isXML;
    g.contains = fc.contains;
    g.escapeSelector = fc.escape;
    var Bc = function (a, b, d) {
        for (var h = [], l = void 0 !== d; (a = a[b]) && 9 !== a.nodeType; )
          if (1 === a.nodeType) {
            if (l && g(a).is(d)) break;
            h.push(a);
          }
        return h;
      },
      ma = function (a, b) {
        for (var d = []; a; a = a.nextSibling)
          1 === a.nodeType && a !== b && d.push(a);
        return d;
      },
      Wb = g.expr.match.needsContext,
      U = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      Vb = /^.[^:#\[\.,]*$/;
    g.filter = function (a, b, d) {
      var h = b[0];
      return (
        d && (a = ":not(" + a + ")"),
        1 === b.length && 1 === h.nodeType
          ? g.find.matchesSelector(h, a)
            ? [h]
            : []
          : g.find.matches(
              a,
              g.grep(b, function (l) {
                return 1 === l.nodeType;
              })
            )
      );
    };
    g.fn.extend({
      find: function (a) {
        var b,
          d = this.length,
          h = this;
        if ("string" != typeof a)
          return this.pushStack(
            g(a).filter(function () {
              for (b = 0; b < d; b++) if (g.contains(h[b], this)) return !0;
            })
          );
        var l = this.pushStack([]);
        for (b = 0; b < d; b++) g.find(a, h[b], l);
        return 1 < d ? g.uniqueSort(l) : l;
      },
      filter: function (a) {
        return this.pushStack(gb(this, a || [], !1));
      },
      not: function (a) {
        return this.pushStack(gb(this, a || [], !0));
      },
      is: function (a) {
        return !!gb(
          this,
          "string" == typeof a && Wb.test(a) ? g(a) : a || [],
          !1
        ).length;
      },
    });
    var jc = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (g.fn.init = function (a, b, d) {
      var h, l;
      if (!a) return this;
      if (((d = d || fd), "string" == typeof a)) {
        if (
          ((h =
            "<" === a[0] && ">" === a[a.length - 1] && 3 <= a.length
              ? [null, a, null]
              : jc.exec(a)),
          !h || (!h[1] && b))
        )
          return !b || b.jquery
            ? (b || d).find(a)
            : this.constructor(b).find(a);
        if (h[1]) {
          if (
            ((b = b instanceof g ? b[0] : b),
            g.merge(
              this,
              g.parseHTML(h[1], b && b.nodeType ? b.ownerDocument || b : bb, !0)
            ),
            U.test(h[1]) && g.isPlainObject(b))
          )
            for (h in b)
              g.isFunction(this[h]) ? this[h](b[h]) : this.attr(h, b[h]);
          return this;
        }
        return (
          (l = bb.getElementById(h[2])),
          l && ((this[0] = l), (this.length = 1)),
          this
        );
      }
      return a.nodeType
        ? ((this[0] = a), (this.length = 1), this)
        : g.isFunction(a)
        ? void 0 !== d.ready
          ? d.ready(a)
          : a(g)
        : g.makeArray(a, this);
    }).prototype = g.fn;
    var fd = g(bb);
    var qd = /^(?:parents|prev(?:Until|All))/,
      sd = { children: !0, contents: !0, next: !0, prev: !0 };
    g.fn.extend({
      has: function (a) {
        var b = g(a, this),
          d = b.length;
        return this.filter(function () {
          for (var h = 0; h < d; h++) if (g.contains(this, b[h])) return !0;
        });
      },
      closest: function (a, b) {
        var d,
          h = 0,
          l = this.length,
          n = [],
          r = "string" != typeof a && g(a);
        if (!Wb.test(a))
          for (; h < l; h++)
            for (d = this[h]; d && d !== b; d = d.parentNode)
              if (
                11 > d.nodeType &&
                (r
                  ? -1 < r.index(d)
                  : 1 === d.nodeType && g.find.matchesSelector(d, a))
              ) {
                n.push(d);
                break;
              }
        return this.pushStack(1 < n.length ? g.uniqueSort(n) : n);
      },
      index: function (a) {
        return a
          ? "string" == typeof a
            ? cb.call(g(a), this[0])
            : cb.call(this, a.jquery ? a[0] : a)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (a, b) {
        return this.pushStack(g.uniqueSort(g.merge(this.get(), g(a, b))));
      },
      addBack: function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      },
    });
    g.each(
      {
        parent: function (a) {
          return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
        },
        parents: function (a) {
          return Bc(a, "parentNode");
        },
        parentsUntil: function (a, b, d) {
          return Bc(a, "parentNode", d);
        },
        next: function (a) {
          return xb(a, "nextSibling");
        },
        prev: function (a) {
          return xb(a, "previousSibling");
        },
        nextAll: function (a) {
          return Bc(a, "nextSibling");
        },
        prevAll: function (a) {
          return Bc(a, "previousSibling");
        },
        nextUntil: function (a, b, d) {
          return Bc(a, "nextSibling", d);
        },
        prevUntil: function (a, b, d) {
          return Bc(a, "previousSibling", d);
        },
        siblings: function (a) {
          return ma((a.parentNode || {}).firstChild, a);
        },
        children: function (a) {
          return ma(a.firstChild);
        },
        contents: function (a) {
          return mb(a, "iframe")
            ? a.contentDocument
            : (mb(a, "template") && (a = a.content || a),
              g.merge([], a.childNodes));
        },
      },
      function (a, b) {
        g.fn[a] = function (d, h) {
          var l = g.map(this, b, d);
          return (
            "Until" !== a.slice(-5) && (h = d),
            h && "string" == typeof h && (l = g.filter(h, l)),
            1 < this.length &&
              (sd[a] || g.uniqueSort(l), qd.test(a) && l.reverse()),
            this.pushStack(l)
          );
        };
      }
    );
    var tc = /[^\x20\t\r\n\f]+/g;
    g.Callbacks = function (a) {
      a = "string" == typeof a ? Ua(a) : g.extend({}, a);
      var b,
        d,
        h,
        l,
        n = [],
        r = [],
        w = -1,
        H = function () {
          l = l || a.once;
          for (h = b = !0; r.length; w = -1)
            for (d = r.shift(); ++w < n.length; )
              !1 === n[w].apply(d[0], d[1]) &&
                a.stopOnFalse &&
                ((w = n.length), (d = !1));
          a.memory || (d = !1);
          b = !1;
          l && (n = d ? [] : "");
        },
        Y = {
          add: function () {
            return (
              n &&
                (d && !b && ((w = n.length - 1), r.push(d)),
                (function Ma(na) {
                  g.each(na, function (Ra, Pa) {
                    g.isFunction(Pa)
                      ? (a.unique && Y.has(Pa)) || n.push(Pa)
                      : Pa && Pa.length && "string" !== g.type(Pa) && Ma(Pa);
                  });
                })(arguments),
                d && !b && H()),
              this
            );
          },
          remove: function () {
            return (
              g.each(arguments, function (M, na) {
                for (var Ma; -1 < (Ma = g.inArray(na, n, Ma)); )
                  n.splice(Ma, 1), Ma <= w && w--;
              }),
              this
            );
          },
          has: function (M) {
            return M ? -1 < g.inArray(M, n) : 0 < n.length;
          },
          empty: function () {
            return n && (n = []), this;
          },
          disable: function () {
            return (l = r = []), (n = d = ""), this;
          },
          disabled: function () {
            return !n;
          },
          lock: function () {
            return (l = r = []), d || b || (n = d = ""), this;
          },
          locked: function () {
            return !!l;
          },
          fireWith: function (M, na) {
            return (
              l ||
                ((na = na || []),
                (na = [M, na.slice ? na.slice() : na]),
                r.push(na),
                b || H()),
              this
            );
          },
          fire: function () {
            return Y.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!h;
          },
        };
      return Y;
    };
    g.extend({
      Deferred: function (a) {
        var b = [
            [
              "notify",
              "progress",
              g.Callbacks("memory"),
              g.Callbacks("memory"),
              2,
            ],
            [
              "resolve",
              "done",
              g.Callbacks("once memory"),
              g.Callbacks("once memory"),
              0,
              "resolved",
            ],
            [
              "reject",
              "fail",
              g.Callbacks("once memory"),
              g.Callbacks("once memory"),
              1,
              "rejected",
            ],
          ],
          d = "pending",
          h = {
            state: function () {
              return d;
            },
            always: function () {
              return l.done(arguments).fail(arguments), this;
            },
            catch: function (n) {
              return h.then(null, n);
            },
            pipe: function () {
              var n = arguments;
              return g
                .Deferred(function (r) {
                  g.each(b, function (w, H) {
                    var Y = g.isFunction(n[H[4]]) && n[H[4]];
                    l[H[1]](function () {
                      var M = Y && Y.apply(this, arguments);
                      M && g.isFunction(M.promise)
                        ? M.promise()
                            .progress(r.notify)
                            .done(r.resolve)
                            .fail(r.reject)
                        : r[H[0] + "With"](this, Y ? [M] : arguments);
                    });
                  });
                  n = null;
                })
                .promise();
            },
            then: function (n, r, w) {
              function H(M, na, Ma, Ra) {
                return function () {
                  var Pa = this,
                    Xa = arguments,
                    qb = function () {
                      var Oa;
                      if (!(M < Y)) {
                        if (((Oa = Ma.apply(Pa, Xa)), Oa === na.promise()))
                          throw new TypeError("Thenable self-resolution");
                        var Q =
                          Oa &&
                          ("object" == typeof Oa || "function" == typeof Oa) &&
                          Oa.then;
                        g.isFunction(Q)
                          ? Ra
                            ? Q.call(Oa, H(Y, na, pb, Ra), H(Y, na, yb, Ra))
                            : (Y++,
                              Q.call(
                                Oa,
                                H(Y, na, pb, Ra),
                                H(Y, na, yb, Ra),
                                H(Y, na, pb, na.notifyWith)
                              ))
                          : (Ma !== pb && ((Pa = void 0), (Xa = [Oa])),
                            (Ra || na.resolveWith)(Pa, Xa));
                      }
                    },
                    gc = Ra
                      ? qb
                      : function () {
                          try {
                            qb();
                          } catch (Oa) {
                            g.Deferred.exceptionHook &&
                              g.Deferred.exceptionHook(Oa, gc.stackTrace),
                              M + 1 >= Y &&
                                (Ma !== yb && ((Pa = void 0), (Xa = [Oa])),
                                na.rejectWith(Pa, Xa));
                          }
                        };
                  M
                    ? gc()
                    : (g.Deferred.getStackHook &&
                        (gc.stackTrace = g.Deferred.getStackHook()),
                      la.setTimeout(gc));
                };
              }
              var Y = 0;
              return g
                .Deferred(function (M) {
                  b[0][3].add(H(0, M, g.isFunction(w) ? w : pb, M.notifyWith));
                  b[1][3].add(H(0, M, g.isFunction(n) ? n : pb));
                  b[2][3].add(H(0, M, g.isFunction(r) ? r : yb));
                })
                .promise();
            },
            promise: function (n) {
              return null != n ? g.extend(n, h) : h;
            },
          },
          l = {};
        return (
          g.each(b, function (n, r) {
            var w = r[2],
              H = r[5];
            h[r[1]] = w.add;
            H &&
              w.add(
                function () {
                  d = H;
                },
                b[3 - n][2].disable,
                b[0][2].lock
              );
            w.add(r[3].fire);
            l[r[0]] = function () {
              return (
                l[r[0] + "With"](this === l ? void 0 : this, arguments), this
              );
            };
            l[r[0] + "With"] = w.fireWith;
          }),
          h.promise(l),
          a && a.call(l, l),
          l
        );
      },
      when: function (a) {
        var b = arguments.length,
          d = b,
          h = Array(d),
          l = zc.call(arguments),
          n = g.Deferred(),
          r = function (w) {
            return function (H) {
              h[w] = this;
              l[w] = 1 < arguments.length ? zc.call(arguments) : H;
              --b || n.resolveWith(h, l);
            };
          };
        if (
          1 >= b &&
          (hb(a, n.done(r(d)).resolve, n.reject, !b),
          "pending" === n.state() || g.isFunction(l[d] && l[d].then))
        )
          return n.then();
        for (; d--; ) hb(l[d], r(d), n.reject);
        return n.promise();
      },
    });
    var Ad = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    g.Deferred.exceptionHook = function (a, b) {
      la.console &&
        la.console.warn &&
        a &&
        Ad.test(a.name) &&
        la.console.warn("jQuery.Deferred exception: " + a.message, a.stack, b);
    };
    g.readyException = function (a) {
      la.setTimeout(function () {
        throw a;
      });
    };
    var ld = g.Deferred();
    g.fn.ready = function (a) {
      return (
        ld.then(a)["catch"](function (b) {
          g.readyException(b);
        }),
        this
      );
    };
    g.extend({
      isReady: !1,
      readyWait: 1,
      ready: function (a) {
        (!0 === a ? --g.readyWait : g.isReady) ||
          ((g.isReady = !0),
          (!0 !== a && 0 < --g.readyWait) || ld.resolveWith(bb, [g]));
      },
    });
    g.ready.then = ld.then;
    "complete" === bb.readyState ||
    ("loading" !== bb.readyState && !bb.documentElement.doScroll)
      ? la.setTimeout(g.ready)
      : (bb.addEventListener("DOMContentLoaded", Tb),
        la.addEventListener("load", Tb));
    var Ob = function (a, b, d, h, l, n, r) {
        var w = 0,
          H = a.length,
          Y = null == d;
        if ("object" === g.type(d))
          for (w in ((l = !0), d)) Ob(a, b, w, d[w], !0, n, r);
        else if (
          void 0 !== h &&
          ((l = !0),
          g.isFunction(h) || (r = !0),
          Y &&
            (r
              ? (b.call(a, h), (b = null))
              : ((Y = b),
                (b = function (M, na, Ma) {
                  return Y.call(g(M), Ma);
                }))),
          b)
        )
          for (; w < H; w++) b(a[w], d, r ? h : h.call(a[w], w, b(a[w], d)));
        return l ? a : Y ? b.call(a) : H ? b(a[0], d) : n;
      },
      Nc = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
      };
    wc.uid = 1;
    wc.prototype = {
      cache: function (a) {
        var b = a[this.expando];
        return (
          b ||
            ((b = {}),
            Nc(a) &&
              (a.nodeType
                ? (a[this.expando] = b)
                : Object.defineProperty(a, this.expando, {
                    value: b,
                    configurable: !0,
                  }))),
          b
        );
      },
      set: function (a, b, d) {
        var h;
        a = this.cache(a);
        if ("string" == typeof b) a[g.camelCase(b)] = d;
        else for (h in b) a[g.camelCase(h)] = b[h];
        return a;
      },
      get: function (a, b) {
        return void 0 === b
          ? this.cache(a)
          : a[this.expando] && a[this.expando][g.camelCase(b)];
      },
      access: function (a, b, d) {
        return void 0 === b || (b && "string" == typeof b && void 0 === d)
          ? this.get(a, b)
          : (this.set(a, b, d), void 0 !== d ? d : b);
      },
      remove: function (a, b) {
        var d,
          h = a[this.expando];
        if (void 0 !== h) {
          if (void 0 !== b)
            for (
              Array.isArray(b)
                ? (b = b.map(g.camelCase))
                : ((b = g.camelCase(b)),
                  (b = (b in h) ? [b] : b.match(tc) || [])),
                d = b.length;
              d--;

            )
              delete h[b[d]];
          (void 0 === b || g.isEmptyObject(h)) &&
            (a.nodeType ? (a[this.expando] = void 0) : delete a[this.expando]);
        }
      },
      hasData: function (a) {
        a = a[this.expando];
        return void 0 !== a && !g.isEmptyObject(a);
      },
    };
    var ib = new wc(),
      sc = new wc(),
      td = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      kd = /[A-Z]/g;
    g.extend({
      hasData: function (a) {
        return sc.hasData(a) || ib.hasData(a);
      },
      data: function (a, b, d) {
        return sc.access(a, b, d);
      },
      removeData: function (a, b) {
        sc.remove(a, b);
      },
      _data: function (a, b, d) {
        return ib.access(a, b, d);
      },
      _removeData: function (a, b) {
        ib.remove(a, b);
      },
    });
    g.fn.extend({
      data: function (a, b) {
        var d,
          h,
          l,
          n = this[0],
          r = n && n.attributes;
        if (void 0 === a) {
          if (
            this.length &&
            ((l = sc.get(n)), 1 === n.nodeType && !ib.get(n, "hasDataAttrs"))
          ) {
            for (d = r.length; d--; )
              r[d] &&
                ((h = r[d].name),
                0 === h.indexOf("data-") &&
                  ((h = g.camelCase(h.slice(5))), xc(n, h, l[h])));
            ib.set(n, "hasDataAttrs", !0);
          }
          return l;
        }
        return "object" == typeof a
          ? this.each(function () {
              sc.set(this, a);
            })
          : Ob(
              this,
              function (w) {
                var H;
                if (n && void 0 === w) {
                  if (
                    ((H = sc.get(n, a)), void 0 !== H) ||
                    ((H = xc(n, a)), void 0 !== H)
                  )
                    return H;
                } else
                  this.each(function () {
                    sc.set(this, a, w);
                  });
              },
              null,
              b,
              1 < arguments.length,
              null,
              !0
            );
      },
      removeData: function (a) {
        return this.each(function () {
          sc.remove(this, a);
        });
      },
    });
    g.extend({
      queue: function (a, b, d) {
        var h;
        if (a)
          return (
            (b = (b || "fx") + "queue"),
            (h = ib.get(a, b)),
            d &&
              (!h || Array.isArray(d)
                ? (h = ib.access(a, b, g.makeArray(d)))
                : h.push(d)),
            h || []
          );
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var d = g.queue(a, b),
          h = d.length,
          l = d.shift(),
          n = g._queueHooks(a, b),
          r = function () {
            g.dequeue(a, b);
          };
        "inprogress" === l && ((l = d.shift()), h--);
        l &&
          ("fx" === b && d.unshift("inprogress"),
          delete n.stop,
          l.call(a, r, n));
        !h && n && n.empty.fire();
      },
      _queueHooks: function (a, b) {
        var d = b + "queueHooks";
        return (
          ib.get(a, d) ||
          ib.access(a, d, {
            empty: g.Callbacks("once memory").add(function () {
              ib.remove(a, [b + "queue", d]);
            }),
          })
        );
      },
    });
    g.fn.extend({
      queue: function (a, b) {
        var d = 2;
        return (
          "string" != typeof a && ((b = a), (a = "fx"), d--),
          arguments.length < d
            ? g.queue(this[0], a)
            : void 0 === b
            ? this
            : this.each(function () {
                var h = g.queue(this, a, b);
                g._queueHooks(this, a);
                "fx" === a && "inprogress" !== h[0] && g.dequeue(this, a);
              })
        );
      },
      dequeue: function (a) {
        return this.each(function () {
          g.dequeue(this, a);
        });
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", []);
      },
      promise: function (a, b) {
        var d,
          h = 1,
          l = g.Deferred(),
          n = this,
          r = this.length,
          w = function () {
            --h || l.resolveWith(n, [n]);
          };
        "string" != typeof a && ((b = a), (a = void 0));
        for (a = a || "fx"; r--; )
          (d = ib.get(n[r], a + "queueHooks")) &&
            d.empty &&
            (h++, d.empty.add(w));
        return w(), l.promise(b);
      },
    });
    var kc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ad = new RegExp("^(?:([+-])=|)(" + kc + ")([a-z%]*)$", "i"),
      Jc = ["Top", "Right", "Bottom", "Left"],
      nd = function (a, b) {
        return (
          (a = b || a),
          "none" === a.style.display ||
            ("" === a.style.display &&
              g.contains(a.ownerDocument, a) &&
              "none" === g.css(a, "display"))
        );
      },
      O = function (a, b, d, h) {
        var l,
          n = {};
        for (l in b) (n[l] = a.style[l]), (a.style[l] = b[l]);
        d = d.apply(a, h || []);
        for (l in b) a.style[l] = n[l];
        return d;
      },
      Ib = {};
    g.fn.extend({
      show: function () {
        return Ub(this, !0);
      },
      hide: function () {
        return Ub(this);
      },
      toggle: function (a) {
        return "boolean" == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              nd(this) ? g(this).show() : g(this).hide();
            });
      },
    });
    var Za = /^(?:checkbox|radio)$/i,
      eb = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      Aa = /^$|\/(?:java|ecma)script/i,
      Sb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    Sb.optgroup = Sb.option;
    Sb.tbody = Sb.tfoot = Sb.colgroup = Sb.caption = Sb.thead;
    Sb.th = Sb.td;
    var Qc = /<|&#?\w+;/;
    !(function () {
      var a = bb.createDocumentFragment().appendChild(bb.createElement("div")),
        b = bb.createElement("input");
      b.setAttribute("type", "radio");
      b.setAttribute("checked", "checked");
      b.setAttribute("name", "t");
      a.appendChild(b);
      Wa.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked;
      a.innerHTML = "<textarea>x</textarea>";
      Wa.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue;
    })();
    var Wc = bb.documentElement,
      gd = /^key/,
      Kd = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Uc = /^([^.]*)(?:\.(.+)|)/;
    g.event = {
      global: {},
      add: function (a, b, d, h, l) {
        var n, r, w, H, Y, M, na, Ma;
        if ((H = ib.get(a)))
          for (
            d.handler && ((n = d), (d = n.handler), (l = n.selector)),
              l && g.find.matchesSelector(Wc, l),
              d.guid || (d.guid = g.guid++),
              (w = H.events) || (w = H.events = {}),
              (r = H.handle) ||
                (r = H.handle = function (Xa) {
                  return "undefined" != typeof g &&
                    g.event.triggered !== Xa.type
                    ? g.event.dispatch.apply(a, arguments)
                    : void 0;
                }),
              b = (b || "").match(tc) || [""],
              H = b.length;
            H--;

          ) {
            var Ra = Uc.exec(b[H]) || [];
            var Pa = (Ma = Ra[1]);
            Ra = (Ra[2] || "").split(".").sort();
            Pa &&
              ((M = g.event.special[Pa] || {}),
              (Pa = (l ? M.delegateType : M.bindType) || Pa),
              (M = g.event.special[Pa] || {}),
              (Y = g.extend(
                {
                  type: Pa,
                  origType: Ma,
                  data: h,
                  handler: d,
                  guid: d.guid,
                  selector: l,
                  needsContext: l && g.expr.match.needsContext.test(l),
                  namespace: Ra.join("."),
                },
                n
              )),
              (na = w[Pa]) ||
                ((na = w[Pa] = []),
                (na.delegateCount = 0),
                (M.setup && !1 !== M.setup.call(a, h, Ra, r)) ||
                  (a.addEventListener && a.addEventListener(Pa, r))),
              M.add &&
                (M.add.call(a, Y), Y.handler.guid || (Y.handler.guid = d.guid)),
              l ? na.splice(na.delegateCount++, 0, Y) : na.push(Y),
              (g.event.global[Pa] = !0));
          }
      },
      remove: function (a, b, d, h, l) {
        var n,
          r,
          w,
          H,
          Y,
          M,
          na,
          Ma,
          Ra = ib.hasData(a) && ib.get(a);
        if (Ra && (H = Ra.events)) {
          b = (b || "").match(tc) || [""];
          for (Y = b.length; Y--; )
            if (
              ((w = Uc.exec(b[Y]) || []),
              (M = Ma = w[1]),
              (na = (w[2] || "").split(".").sort()),
              M)
            ) {
              var Pa = g.event.special[M] || {};
              M = (h ? Pa.delegateType : Pa.bindType) || M;
              var Xa = H[M] || [];
              w =
                w[2] &&
                new RegExp("(^|\\.)" + na.join("\\.(?:.*\\.|)") + "(\\.|$)");
              for (r = n = Xa.length; n--; ) {
                var qb = Xa[n];
                (!l && Ma !== qb.origType) ||
                  (d && d.guid !== qb.guid) ||
                  (w && !w.test(qb.namespace)) ||
                  (h && h !== qb.selector && ("**" !== h || !qb.selector)) ||
                  (Xa.splice(n, 1),
                  qb.selector && Xa.delegateCount--,
                  Pa.remove && Pa.remove.call(a, qb));
              }
              r &&
                !Xa.length &&
                ((Pa.teardown && !1 !== Pa.teardown.call(a, na, Ra.handle)) ||
                  g.removeEvent(a, M, Ra.handle),
                delete H[M]);
            } else for (M in H) g.event.remove(a, M + b[Y], d, h, !0);
          g.isEmptyObject(H) && ib.remove(a, "handle events");
        }
      },
      dispatch: function (a) {
        var b = g.event.fix(a),
          d,
          h,
          l,
          n,
          r = Array(arguments.length);
        var w = (ib.get(this, "events") || {})[b.type] || [];
        var H = g.event.special[b.type] || {};
        r[0] = b;
        for (d = 1; d < arguments.length; d++) r[d] = arguments[d];
        if (
          ((b.delegateTarget = this),
          !H.preDispatch || !1 !== H.preDispatch.call(this, b))
        ) {
          var Y = g.event.handlers.call(this, b, w);
          for (d = 0; (l = Y[d++]) && !b.isPropagationStopped(); )
            for (
              b.currentTarget = l.elem, w = 0;
              (n = l.handlers[w++]) && !b.isImmediatePropagationStopped();

            )
              (b.rnamespace && !b.rnamespace.test(n.namespace)) ||
                ((b.handleObj = n),
                (b.data = n.data),
                (h = (
                  (g.event.special[n.origType] || {}).handle || n.handler
                ).apply(l.elem, r)),
                void 0 !== h &&
                  !1 === (b.result = h) &&
                  (b.preventDefault(), b.stopPropagation()));
          return H.postDispatch && H.postDispatch.call(this, b), b.result;
        }
      },
      handlers: function (a, b) {
        var d,
          h = [],
          l = b.delegateCount,
          n = a.target;
        if (l && n.nodeType && !("click" === a.type && 1 <= a.button))
          for (; n !== this; n = n.parentNode || this)
            if (1 === n.nodeType && ("click" !== a.type || !0 !== n.disabled)) {
              var r = [];
              var w = {};
              for (d = 0; d < l; d++) {
                var H = b[d];
                var Y = H.selector + " ";
                void 0 === w[Y] &&
                  (w[Y] = H.needsContext
                    ? -1 < g(Y, this).index(n)
                    : g.find(Y, this, null, [n]).length);
                w[Y] && r.push(H);
              }
              r.length && h.push({ elem: n, handlers: r });
            }
        return (
          (n = this),
          l < b.length && h.push({ elem: n, handlers: b.slice(l) }),
          h
        );
      },
      addProp: function (a, b) {
        Object.defineProperty(g.Event.prototype, a, {
          enumerable: !0,
          configurable: !0,
          get: g.isFunction(b)
            ? function () {
                if (this.originalEvent) return b(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[a];
              },
          set: function (d) {
            Object.defineProperty(this, a, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: d,
            });
          },
        });
      },
      fix: function (a) {
        return a[g.expando] ? a : new g.Event(a);
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== Na() && this.focus) return this.focus(), !1;
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === Na() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if ("checkbox" === this.type && this.click && mb(this, "input"))
              return this.click(), !1;
          },
          _default: function (a) {
            return mb(a.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (a) {
            void 0 !== a.result &&
              a.originalEvent &&
              (a.originalEvent.returnValue = a.result);
          },
        },
      },
    };
    g.removeEvent = function (a, b, d) {
      a.removeEventListener && a.removeEventListener(b, d);
    };
    g.Event = function (a, b) {
      return this instanceof g.Event
        ? (a && a.type
            ? ((this.originalEvent = a),
              (this.type = a.type),
              (this.isDefaultPrevented =
                a.defaultPrevented ||
                (void 0 === a.defaultPrevented && !1 === a.returnValue)
                  ? va
                  : La),
              (this.target =
                a.target && 3 === a.target.nodeType
                  ? a.target.parentNode
                  : a.target),
              (this.currentTarget = a.currentTarget),
              (this.relatedTarget = a.relatedTarget))
            : (this.type = a),
          b && g.extend(this, b),
          (this.timeStamp = (a && a.timeStamp) || g.now()),
          void (this[g.expando] = !0))
        : new g.Event(a, b);
    };
    g.Event.prototype = {
      constructor: g.Event,
      isDefaultPrevented: La,
      isPropagationStopped: La,
      isImmediatePropagationStopped: La,
      isSimulated: !1,
      preventDefault: function () {
        var a = this.originalEvent;
        this.isDefaultPrevented = va;
        a && !this.isSimulated && a.preventDefault();
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        this.isPropagationStopped = va;
        a && !this.isSimulated && a.stopPropagation();
      },
      stopImmediatePropagation: function () {
        var a = this.originalEvent;
        this.isImmediatePropagationStopped = va;
        a && !this.isSimulated && a.stopImmediatePropagation();
        this.stopPropagation();
      },
    };
    g.each(
      {
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (a) {
          var b = a.button;
          return null == a.which && gd.test(a.type)
            ? null != a.charCode
              ? a.charCode
              : a.keyCode
            : !a.which && void 0 !== b && Kd.test(a.type)
            ? 1 & b
              ? 1
              : 2 & b
              ? 3
              : 4 & b
              ? 2
              : 0
            : a.which;
        },
      },
      g.event.addProp
    );
    g.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (a, b) {
        g.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function (d) {
            var h,
              l = d.relatedTarget,
              n = d.handleObj;
            return (
              (l && (l === this || g.contains(this, l))) ||
                ((d.type = n.origType),
                (h = n.handler.apply(this, arguments)),
                (d.type = b)),
              h
            );
          },
        };
      }
    );
    g.fn.extend({
      on: function (a, b, d, h) {
        return Ea(this, a, b, d, h);
      },
      one: function (a, b, d, h) {
        return Ea(this, a, b, d, h, 1);
      },
      off: function (a, b, d) {
        var h, l;
        if (a && a.preventDefault && a.handleObj)
          return (
            (h = a.handleObj),
            g(a.delegateTarget).off(
              h.namespace ? h.origType + "." + h.namespace : h.origType,
              h.selector,
              h.handler
            ),
            this
          );
        if ("object" == typeof a) {
          for (l in a) this.off(l, b, a[l]);
          return this;
        }
        return (
          (!1 !== b && "function" != typeof b) || ((d = b), (b = void 0)),
          !1 === d && (d = La),
          this.each(function () {
            g.event.remove(this, a, d, b);
          })
        );
      },
    });
    var rd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      od = /<script|<style|<link/i,
      vd = /checked\s*(?:[^=]|=\s*.checked.)/i,
      ud = /^true\/(.*)/,
      Kc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    g.extend({
      htmlPrefilter: function (a) {
        return a.replace(rd, "<$1></$2>");
      },
      clone: function (a, b, d) {
        var h,
          l = a.cloneNode(!0),
          n = g.contains(a.ownerDocument, a);
        if (
          !(
            Wa.noCloneChecked ||
            (1 !== a.nodeType && 11 !== a.nodeType) ||
            g.isXMLDoc(a)
          )
        ) {
          var r = Rb(l);
          var w = Rb(a);
          var H = 0;
          for (h = w.length; H < h; H++) {
            var Y = w[H],
              M = r[H],
              na = M.nodeName.toLowerCase();
            "input" === na && Za.test(Y.type)
              ? (M.checked = Y.checked)
              : ("input" !== na && "textarea" !== na) ||
                (M.defaultValue = Y.defaultValue);
          }
        }
        if (b)
          if (d)
            for (
              w = w || Rb(a), r = r || Rb(l), H = 0, h = w.length;
              H < h;
              H++
            )
              Hb(w[H], r[H]);
          else Hb(a, l);
        return (
          (r = Rb(l, "script")), 0 < r.length && ha(r, !n && Rb(a, "script")), l
        );
      },
      cleanData: function (a) {
        for (
          var b, d, h, l = g.event.special, n = 0;
          void 0 !== (d = a[n]);
          n++
        )
          if (Nc(d)) {
            if ((b = d[ib.expando])) {
              if (b.events)
                for (h in b.events)
                  l[h] ? g.event.remove(d, h) : g.removeEvent(d, h, b.handle);
              d[ib.expando] = void 0;
            }
            d[sc.expando] && (d[sc.expando] = void 0);
          }
      },
    });
    g.fn.extend({
      detach: function (a) {
        return zb(this, a, !0);
      },
      remove: function (a) {
        return zb(this, a);
      },
      text: function (a) {
        return Ob(
          this,
          function (b) {
            return void 0 === b
              ? g.text(this)
              : this.empty().each(function () {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    (this.textContent = b);
                });
          },
          null,
          a,
          arguments.length
        );
      },
      append: function () {
        return Bb(this, arguments, function (a) {
          (1 !== this.nodeType &&
            11 !== this.nodeType &&
            9 !== this.nodeType) ||
            Fa(this, a).appendChild(a);
        });
      },
      prepend: function () {
        return Bb(this, arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = Fa(this, a);
            b.insertBefore(a, b.firstChild);
          }
        });
      },
      before: function () {
        return Bb(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this);
        });
      },
      after: function () {
        return Bb(this, arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
        });
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++)
          1 === a.nodeType && (g.cleanData(Rb(a, !1)), (a.textContent = ""));
        return this;
      },
      clone: function (a, b) {
        return (
          (a = null != a && a),
          (b = null == b ? a : b),
          this.map(function () {
            return g.clone(this, a, b);
          })
        );
      },
      html: function (a) {
        return Ob(
          this,
          function (b) {
            var d = this[0] || {},
              h = 0,
              l = this.length;
            if (void 0 === b && 1 === d.nodeType) return d.innerHTML;
            if (
              "string" == typeof b &&
              !od.test(b) &&
              !Sb[(eb.exec(b) || ["", ""])[1].toLowerCase()]
            ) {
              b = g.htmlPrefilter(b);
              try {
                for (; h < l; h++)
                  (d = this[h] || {}),
                    1 === d.nodeType &&
                      (g.cleanData(Rb(d, !1)), (d.innerHTML = b));
                d = 0;
              } catch (n) {}
            }
            d && this.empty().append(b);
          },
          null,
          a,
          arguments.length
        );
      },
      replaceWith: function () {
        var a = [];
        return Bb(
          this,
          arguments,
          function (b) {
            var d = this.parentNode;
            0 > g.inArray(this, a) &&
              (g.cleanData(Rb(this)), d && d.replaceChild(b, this));
          },
          a
        );
      },
    });
    g.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (a, b) {
        g.fn[a] = function (d) {
          for (var h = [], l = g(d), n = l.length - 1, r = 0; r <= n; r++)
            (d = r === n ? this : this.clone(!0)),
              g(l[r])[b](d),
              Va.apply(h, d.get());
          return this.pushStack(h);
        };
      }
    );
    var Bd = /^margin/,
      md = new RegExp("^(" + kc + ")(?!px)[a-z%]+$", "i"),
      c = function (a) {
        var b = a.ownerDocument.defaultView;
        return (b && b.opener) || (b = la), b.getComputedStyle(a);
      };
    !(function () {
      function a() {
        if (r) {
          r.style.cssText =
            "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
          r.innerHTML = "";
          Wc.appendChild(n);
          var w = la.getComputedStyle(r);
          b = "1%" !== w.top;
          l = "2px" === w.marginLeft;
          d = "4px" === w.width;
          r.style.marginRight = "50%";
          h = "4px" === w.marginRight;
          Wc.removeChild(n);
          r = null;
        }
      }
      var b,
        d,
        h,
        l,
        n = bb.createElement("div"),
        r = bb.createElement("div");
      r.style &&
        ((r.style.backgroundClip = "content-box"),
        (r.cloneNode(!0).style.backgroundClip = ""),
        (Wa.clearCloneStyle = "content-box" === r.style.backgroundClip),
        (n.style.cssText =
          "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
        n.appendChild(r),
        g.extend(Wa, {
          pixelPosition: function () {
            return a(), b;
          },
          boxSizingReliable: function () {
            return a(), d;
          },
          pixelMarginRight: function () {
            return a(), h;
          },
          reliableMarginLeft: function () {
            return a(), l;
          },
        }));
    })();
    var e = /^(none|table(?!-c[ea]).+)/,
      m = /^--/,
      k = { position: "absolute", visibility: "hidden", display: "block" },
      u = { letterSpacing: "0", fontWeight: "400" },
      q = ["Webkit", "Moz", "ms"],
      K = bb.createElement("div").style;
    g.extend({
      cssHooks: {
        opacity: {
          get: function (a, b) {
            if (b) return (a = Ya(a, "opacity")), "" === a ? "1" : a;
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: "cssFloat" },
      style: function (a, b, d, h) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
          var l,
            n,
            r,
            w = g.camelCase(b),
            H = m.test(b),
            Y = a.style;
          return (
            H || (b = bc(w)),
            (r = g.cssHooks[b] || g.cssHooks[w]),
            void 0 === d
              ? r && "get" in r && void 0 !== (l = r.get(a, !1, h))
                ? l
                : Y[b]
              : ((n = typeof d),
                "string" === n &&
                  (l = ad.exec(d)) &&
                  l[1] &&
                  ((d = yc(a, b, l)), (n = "number")),
                null != d &&
                  d === d &&
                  ("number" === n &&
                    (d += (l && l[3]) || (g.cssNumber[w] ? "" : "px")),
                  Wa.clearCloneStyle ||
                    "" !== d ||
                    0 !== b.indexOf("background") ||
                    (Y[b] = "inherit"),
                  (r && "set" in r && void 0 === (d = r.set(a, d, h))) ||
                    (H ? Y.setProperty(b, d) : (Y[b] = d))),
                void 0)
          );
        }
      },
      css: function (a, b, d, h) {
        var l,
          n,
          r,
          w = g.camelCase(b);
        return (
          m.test(b) || (b = bc(w)),
          (r = g.cssHooks[b] || g.cssHooks[w]),
          r && "get" in r && (l = r.get(a, !0, d)),
          void 0 === l && (l = Ya(a, b, h)),
          "normal" === l && b in u && (l = u[b]),
          "" === d || d
            ? ((n = parseFloat(l)), !0 === d || isFinite(n) ? n || 0 : l)
            : l
        );
      },
    });
    g.each(["height", "width"], function (a, b) {
      g.cssHooks[b] = {
        get: function (d, h, l) {
          if (h)
            return !e.test(g.css(d, "display")) ||
              (d.getClientRects().length && d.getBoundingClientRect().width)
              ? Fc(d, b, l)
              : O(d, k, function () {
                  return Fc(d, b, l);
                });
        },
        set: function (d, h, l) {
          var n,
            r = l && c(d);
          l =
            l && Yb(d, b, l, "border-box" === g.css(d, "boxSizing", !1, r), r);
          return (
            l &&
              (n = ad.exec(h)) &&
              "px" !== (n[3] || "px") &&
              ((d.style[b] = h), (h = g.css(d, b))),
            Eb(d, h, l)
          );
        },
      };
    });
    g.cssHooks.marginLeft = lc(Wa.reliableMarginLeft, function (a, b) {
      if (b)
        return (
          (parseFloat(Ya(a, "marginLeft")) ||
            a.getBoundingClientRect().left -
              O(a, { marginLeft: 0 }, function () {
                return a.getBoundingClientRect().left;
              })) + "px"
        );
    });
    g.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
      g.cssHooks[a + b] = {
        expand: function (d) {
          var h = 0,
            l = {};
          for (d = "string" == typeof d ? d.split(" ") : [d]; 4 > h; h++)
            l[a + Jc[h] + b] = d[h] || d[h - 2] || d[0];
          return l;
        },
      };
      Bd.test(a) || (g.cssHooks[a + b].set = Eb);
    });
    g.fn.extend({
      css: function (a, b) {
        return Ob(
          this,
          function (d, h, l) {
            var n,
              r = {},
              w = 0;
            if (Array.isArray(h)) {
              l = c(d);
              for (n = h.length; w < n; w++) r[h[w]] = g.css(d, h[w], !1, l);
              return r;
            }
            return void 0 !== l ? g.style(d, h, l) : g.css(d, h);
          },
          a,
          b,
          1 < arguments.length
        );
      },
    });
    g.Tween = Kb;
    Kb.prototype = {
      constructor: Kb,
      init: function (a, b, d, h, l, n) {
        this.elem = a;
        this.prop = d;
        this.easing = l || g.easing._default;
        this.options = b;
        this.start = this.now = this.cur();
        this.end = h;
        this.unit = n || (g.cssNumber[d] ? "" : "px");
      },
      cur: function () {
        var a = Kb.propHooks[this.prop];
        return a && a.get ? a.get(this) : Kb.propHooks._default.get(this);
      },
      run: function (a) {
        var b,
          d = Kb.propHooks[this.prop];
        return (
          this.options.duration
            ? (this.pos = b = g.easing[this.easing](
                a,
                this.options.duration * a,
                0,
                1,
                this.options.duration
              ))
            : (this.pos = b = a),
          (this.now = (this.end - this.start) * b + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          d && d.set ? d.set(this) : Kb.propHooks._default.set(this),
          this
        );
      },
    };
    Kb.prototype.init.prototype = Kb.prototype;
    Kb.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return 1 !== a.elem.nodeType ||
            (null != a.elem[a.prop] && null == a.elem.style[a.prop])
            ? a.elem[a.prop]
            : ((b = g.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0);
        },
        set: function (a) {
          g.fx.step[a.prop]
            ? g.fx.step[a.prop](a)
            : 1 !== a.elem.nodeType ||
              (null == a.elem.style[g.cssProps[a.prop]] && !g.cssHooks[a.prop])
            ? (a.elem[a.prop] = a.now)
            : g.style(a.elem, a.prop, a.now + a.unit);
        },
      },
    };
    Kb.propHooks.scrollTop = Kb.propHooks.scrollLeft = {
      set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
      },
    };
    g.easing = {
      linear: function (a) {
        return a;
      },
      swing: function (a) {
        return 0.5 - Math.cos(a * Math.PI) / 2;
      },
      _default: "swing",
    };
    g.fx = Kb.prototype.init;
    g.fx.step = {};
    var x,
      z,
      B = /^(?:toggle|show|hide)$/,
      v = /queueHooks$/;
    g.Animation = g.extend(hc, {
      tweeners: {
        "*": [
          function (a, b) {
            var d = this.createTween(a, b);
            return yc(d.elem, a, ad.exec(b), d), d;
          },
        ],
      },
      tweener: function (a, b) {
        g.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.match(tc));
        for (var d, h = 0, l = a.length; h < l; h++)
          (d = a[h]),
            (hc.tweeners[d] = hc.tweeners[d] || []),
            hc.tweeners[d].unshift(b);
      },
      prefilters: [
        function (a, b, d) {
          var h,
            l,
            n,
            r,
            w,
            H,
            Y,
            M,
            na = "width" in b || "height" in b,
            Ma = this,
            Ra = {},
            Pa = a.style,
            Xa = a.nodeType && nd(a),
            qb = ib.get(a, "fxshow");
          d.queue ||
            ((r = g._queueHooks(a, "fx")),
            null == r.unqueued &&
              ((r.unqueued = 0),
              (w = r.empty.fire),
              (r.empty.fire = function () {
                r.unqueued || w();
              })),
            r.unqueued++,
            Ma.always(function () {
              Ma.always(function () {
                r.unqueued--;
                g.queue(a, "fx").length || r.empty.fire();
              });
            }));
          for (h in b)
            if (((l = b[h]), B.test(l))) {
              if (
                (delete b[h],
                (n = n || "toggle" === l),
                l === (Xa ? "hide" : "show"))
              ) {
                if ("show" !== l || !qb || void 0 === qb[h]) continue;
                Xa = !0;
              }
              Ra[h] = (qb && qb[h]) || g.style(a, h);
            }
          if (((H = !g.isEmptyObject(b)), H || !g.isEmptyObject(Ra)))
            for (h in (na &&
              1 === a.nodeType &&
              ((d.overflow = [Pa.overflow, Pa.overflowX, Pa.overflowY]),
              (Y = qb && qb.display),
              null == Y && (Y = ib.get(a, "display")),
              (M = g.css(a, "display")),
              "none" === M &&
                (Y
                  ? (M = Y)
                  : (Ub([a], !0),
                    (Y = a.style.display || Y),
                    (M = g.css(a, "display")),
                    Ub([a]))),
              ("inline" === M || ("inline-block" === M && null != Y)) &&
                "none" === g.css(a, "float") &&
                (H ||
                  (Ma.done(function () {
                    Pa.display = Y;
                  }),
                  null == Y && ((M = Pa.display), (Y = "none" === M ? "" : M))),
                (Pa.display = "inline-block"))),
            d.overflow &&
              ((Pa.overflow = "hidden"),
              Ma.always(function () {
                Pa.overflow = d.overflow[0];
                Pa.overflowX = d.overflow[1];
                Pa.overflowY = d.overflow[2];
              })),
            (H = !1),
            Ra))
              H ||
                (qb
                  ? "hidden" in qb && (Xa = qb.hidden)
                  : (qb = ib.access(a, "fxshow", { display: Y })),
                n && (qb.hidden = !Xa),
                Xa && Ub([a], !0),
                Ma.done(function () {
                  Xa || Ub([a]);
                  ib.remove(a, "fxshow");
                  for (h in Ra) g.style(a, h, Ra[h]);
                })),
                (H = Cc(Xa ? qb[h] : 0, h, Ma)),
                h in qb ||
                  ((qb[h] = H.start), Xa && ((H.end = H.start), (H.start = 0)));
        },
      ],
      prefilter: function (a, b) {
        b ? hc.prefilters.unshift(a) : hc.prefilters.push(a);
      },
    });
    g.speed = function (a, b, d) {
      var h =
        a && "object" == typeof a
          ? g.extend({}, a)
          : {
              complete: d || (!d && b) || (g.isFunction(a) && a),
              duration: a,
              easing: (d && b) || (b && !g.isFunction(b) && b),
            };
      return (
        g.fx.off
          ? (h.duration = 0)
          : "number" != typeof h.duration &&
            (h.duration in g.fx.speeds
              ? (h.duration = g.fx.speeds[h.duration])
              : (h.duration = g.fx.speeds._default)),
        (null != h.queue && !0 !== h.queue) || (h.queue = "fx"),
        (h.old = h.complete),
        (h.complete = function () {
          g.isFunction(h.old) && h.old.call(this);
          h.queue && g.dequeue(this, h.queue);
        }),
        h
      );
    };
    g.fn.extend({
      fadeTo: function (a, b, d, h) {
        return this.filter(nd)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: b }, a, d, h);
      },
      animate: function (a, b, d, h) {
        var l = g.isEmptyObject(a),
          n = g.speed(b, d, h);
        b = function () {
          var r = hc(this, g.extend({}, a), n);
          (l || ib.get(this, "finish")) && r.stop(!0);
        };
        return (
          (b.finish = b),
          l || !1 === n.queue ? this.each(b) : this.queue(n.queue, b)
        );
      },
      stop: function (a, b, d) {
        var h = function (l) {
          var n = l.stop;
          delete l.stop;
          n(d);
        };
        return (
          "string" != typeof a && ((d = b), (b = a), (a = void 0)),
          b && !1 !== a && this.queue(a || "fx", []),
          this.each(function () {
            var l = !0,
              n = null != a && a + "queueHooks",
              r = g.timers,
              w = ib.get(this);
            if (n) w[n] && w[n].stop && h(w[n]);
            else for (n in w) w[n] && w[n].stop && v.test(n) && h(w[n]);
            for (n = r.length; n--; )
              r[n].elem !== this ||
                (null != a && r[n].queue !== a) ||
                (r[n].anim.stop(d), (l = !1), r.splice(n, 1));
            (!l && d) || g.dequeue(this, a);
          })
        );
      },
      finish: function (a) {
        return (
          !1 !== a && (a = a || "fx"),
          this.each(function () {
            var b = ib.get(this),
              d = b[a + "queue"];
            var h = b[a + "queueHooks"];
            var l = g.timers,
              n = d ? d.length : 0;
            b.finish = !0;
            g.queue(this, a, []);
            h && h.stop && h.stop.call(this, !0);
            for (h = l.length; h--; )
              l[h].elem === this &&
                l[h].queue === a &&
                (l[h].anim.stop(!0), l.splice(h, 1));
            for (h = 0; h < n; h++)
              d[h] && d[h].finish && d[h].finish.call(this);
            delete b.finish;
          })
        );
      },
    });
    g.each(["toggle", "show", "hide"], function (a, b) {
      var d = g.fn[b];
      g.fn[b] = function (h, l, n) {
        return null == h || "boolean" == typeof h
          ? d.apply(this, arguments)
          : this.animate(ec(b, !0), h, l, n);
      };
    });
    g.each(
      {
        slideDown: ec("show"),
        slideUp: ec("hide"),
        slideToggle: ec("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (a, b) {
        g.fn[a] = function (d, h, l) {
          return this.animate(b, d, h, l);
        };
      }
    );
    g.timers = [];
    g.fx.tick = function () {
      var a = 0,
        b = g.timers;
      for (x = g.now(); a < b.length; a++) {
        var d = b[a];
        d() || b[a] !== d || b.splice(a--, 1);
      }
      b.length || g.fx.stop();
      x = void 0;
    };
    g.fx.timer = function (a) {
      g.timers.push(a);
      g.fx.start();
    };
    g.fx.interval = 13;
    g.fx.start = function () {
      z || ((z = !0), Gc());
    };
    g.fx.stop = function () {
      z = null;
    };
    g.fx.speeds = { slow: 600, fast: 200, _default: 400 };
    g.fn.delay = function (a, b) {
      return (
        (a = g.fx ? g.fx.speeds[a] || a : a),
        (b = b || "fx"),
        this.queue(b, function (d, h) {
          var l = la.setTimeout(d, a);
          h.stop = function () {
            la.clearTimeout(l);
          };
        })
      );
    };
    (function () {
      var a = bb.createElement("input"),
        b = bb.createElement("select").appendChild(bb.createElement("option"));
      a.type = "checkbox";
      Wa.checkOn = "" !== a.value;
      Wa.optSelected = b.selected;
      a = bb.createElement("input");
      a.value = "t";
      a.type = "radio";
      Wa.radioValue = "t" === a.value;
    })();
    var E = g.expr.attrHandle;
    g.fn.extend({
      attr: function (a, b) {
        return Ob(this, g.attr, a, b, 1 < arguments.length);
      },
      removeAttr: function (a) {
        return this.each(function () {
          g.removeAttr(this, a);
        });
      },
    });
    g.extend({
      attr: function (a, b, d) {
        var h,
          l,
          n = a.nodeType;
        if (3 !== n && 8 !== n && 2 !== n)
          return "undefined" == typeof a.getAttribute
            ? g.prop(a, b, d)
            : ((1 === n && g.isXMLDoc(a)) ||
                (l =
                  g.attrHooks[b.toLowerCase()] ||
                  (g.expr.match.bool.test(b) ? C : void 0)),
              void 0 !== d
                ? null === d
                  ? void g.removeAttr(a, b)
                  : l && "set" in l && void 0 !== (h = l.set(a, d, b))
                  ? h
                  : (a.setAttribute(b, d + ""), d)
                : l && "get" in l && null !== (h = l.get(a, b))
                ? h
                : ((h = g.find.attr(a, b)), null == h ? void 0 : h));
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!Wa.radioValue && "radio" === b && mb(a, "input")) {
              var d = a.value;
              return a.setAttribute("type", b), d && (a.value = d), b;
            }
          },
        },
      },
      removeAttr: function (a, b) {
        var d = 0,
          h = b && b.match(tc);
        if (h && 1 === a.nodeType) for (; (b = h[d++]); ) a.removeAttribute(b);
      },
    });
    var C = {
      set: function (a, b, d) {
        return !1 === b ? g.removeAttr(a, d) : a.setAttribute(d, d), d;
      },
    };
    g.each(g.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var d = E[b] || g.find.attr;
      E[b] = function (h, l, n) {
        var r,
          w,
          H = l.toLowerCase();
        return (
          n ||
            ((w = E[H]),
            (E[H] = r),
            (r = null != d(h, l, n) ? H : null),
            (E[H] = w)),
          r
        );
      };
    });
    var A = /^(?:input|select|textarea|button)$/i,
      I = /^(?:a|area)$/i;
    g.fn.extend({
      prop: function (a, b) {
        return Ob(this, g.prop, a, b, 1 < arguments.length);
      },
      removeProp: function (a) {
        return this.each(function () {
          delete this[g.propFix[a] || a];
        });
      },
    });
    g.extend({
      prop: function (a, b, d) {
        var h,
          l,
          n = a.nodeType;
        if (3 !== n && 8 !== n && 2 !== n)
          return (
            (1 === n && g.isXMLDoc(a)) ||
              ((b = g.propFix[b] || b), (l = g.propHooks[b])),
            void 0 !== d
              ? l && "set" in l && void 0 !== (h = l.set(a, d, b))
                ? h
                : (a[b] = d)
              : l && "get" in l && null !== (h = l.get(a, b))
              ? h
              : a[b]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            var b = g.find.attr(a, "tabindex");
            return b
              ? parseInt(b, 10)
              : A.test(a.nodeName) || (I.test(a.nodeName) && a.href)
              ? 0
              : -1;
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
    });
    Wa.optSelected ||
      (g.propHooks.selected = {
        get: function (a) {
          a = a.parentNode;
          return a && a.parentNode && a.parentNode.selectedIndex, null;
        },
        set: function (a) {
          a = a.parentNode;
          a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex);
        },
      });
    g.each(
      "tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(
        " "
      ),
      function () {
        g.propFix[this.toLowerCase()] = this;
      }
    );
    g.fn.extend({
      addClass: function (a) {
        var b,
          d,
          h,
          l,
          n,
          r,
          w = 0;
        if (g.isFunction(a))
          return this.each(function (H) {
            g(this).addClass(a.call(this, H, oc(this)));
          });
        if ("string" == typeof a && a)
          for (b = a.match(tc) || []; (d = this[w++]); )
            if (((l = oc(d)), (h = 1 === d.nodeType && " " + Dc(l) + " "))) {
              for (r = 0; (n = b[r++]); )
                0 > h.indexOf(" " + n + " ") && (h += n + " ");
              h = Dc(h);
              l !== h && d.setAttribute("class", h);
            }
        return this;
      },
      removeClass: function (a) {
        var b,
          d,
          h,
          l,
          n,
          r,
          w = 0;
        if (g.isFunction(a))
          return this.each(function (H) {
            g(this).removeClass(a.call(this, H, oc(this)));
          });
        if (!arguments.length) return this.attr("class", "");
        if ("string" == typeof a && a)
          for (b = a.match(tc) || []; (d = this[w++]); )
            if (((l = oc(d)), (h = 1 === d.nodeType && " " + Dc(l) + " "))) {
              for (r = 0; (n = b[r++]); )
                for (; -1 < h.indexOf(" " + n + " "); )
                  h = h.replace(" " + n + " ", " ");
              h = Dc(h);
              l !== h && d.setAttribute("class", h);
            }
        return this;
      },
      toggleClass: function (a, b) {
        var d = typeof a;
        return "boolean" == typeof b && "string" === d
          ? b
            ? this.addClass(a)
            : this.removeClass(a)
          : g.isFunction(a)
          ? this.each(function (h) {
              g(this).toggleClass(a.call(this, h, oc(this), b), b);
            })
          : this.each(function () {
              var h, l;
              if ("string" === d) {
                var n = 0;
                var r = g(this);
                for (l = a.match(tc) || []; (h = l[n++]); )
                  r.hasClass(h) ? r.removeClass(h) : r.addClass(h);
              } else (void 0 !== a && "boolean" !== d) || ((h = oc(this)), h && ib.set(this, "__className__", h), this.setAttribute && this.setAttribute("class", h || !1 === a ? "" : ib.get(this, "__className__") || ""));
            });
      },
      hasClass: function (a) {
        var b,
          d = 0;
        for (a = " " + a + " "; (b = this[d++]); )
          if (1 === b.nodeType && -1 < (" " + Dc(oc(b)) + " ").indexOf(a))
            return !0;
        return !1;
      },
    });
    var P = /\r/g;
    g.fn.extend({
      val: function (a) {
        var b,
          d,
          h,
          l = this[0];
        if (arguments.length)
          return (
            (h = g.isFunction(a)),
            this.each(function (n) {
              var r;
              1 === this.nodeType &&
                ((r = h ? a.call(this, n, g(this).val()) : a),
                null == r
                  ? (r = "")
                  : "number" == typeof r
                  ? (r += "")
                  : Array.isArray(r) &&
                    (r = g.map(r, function (w) {
                      return null == w ? "" : w + "";
                    })),
                (b =
                  g.valHooks[this.type] ||
                  g.valHooks[this.nodeName.toLowerCase()]),
                (b && "set" in b && void 0 !== b.set(this, r, "value")) ||
                  (this.value = r));
            })
          );
        if (l)
          return (
            (b = g.valHooks[l.type] || g.valHooks[l.nodeName.toLowerCase()]),
            b && "get" in b && void 0 !== (d = b.get(l, "value"))
              ? d
              : ((d = l.value),
                "string" == typeof d ? d.replace(P, "") : null == d ? "" : d)
          );
      },
    });
    g.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = g.find.attr(a, "value");
            return null != b ? b : Dc(g.text(a));
          },
        },
        select: {
          get: function (a) {
            var b,
              d,
              h = a.options,
              l = a.selectedIndex,
              n = "select-one" === a.type,
              r = n ? null : [],
              w = n ? l + 1 : h.length;
            for (d = 0 > l ? w : n ? l : 0; d < w; d++)
              if (
                ((b = h[d]),
                !(
                  (!b.selected && d !== l) ||
                  b.disabled ||
                  (b.parentNode.disabled && mb(b.parentNode, "optgroup"))
                ))
              ) {
                if (((a = g(b).val()), n)) return a;
                r.push(a);
              }
            return r;
          },
          set: function (a, b) {
            for (var d, h = a.options, l = g.makeArray(b), n = h.length; n--; )
              (b = h[n]),
                (b.selected = -1 < g.inArray(g.valHooks.option.get(b), l)) &&
                  (d = !0);
            return d || (a.selectedIndex = -1), l;
          },
        },
      },
    });
    g.each(["radio", "checkbox"], function () {
      g.valHooks[this] = {
        set: function (a, b) {
          if (Array.isArray(b))
            return (a.checked = -1 < g.inArray(g(a).val(), b));
        },
      };
      Wa.checkOn ||
        (g.valHooks[this].get = function (a) {
          return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var F = /^(?:focusinfocus|focusoutblur)$/;
    g.extend(g.event, {
      trigger: function (a, b, d, h) {
        var l,
          n,
          r,
          w,
          H,
          Y = [d || bb],
          M = nb.call(a, "type") ? a.type : a;
        var na = nb.call(a, "namespace") ? a.namespace.split(".") : [];
        if (
          ((l = n = d = d || bb),
          3 !== d.nodeType &&
            8 !== d.nodeType &&
            !F.test(M + g.event.triggered) &&
            (-1 < M.indexOf(".") &&
              ((na = M.split(".")), (M = na.shift()), na.sort()),
            (r = 0 > M.indexOf(":") && "on" + M),
            (a = a[g.expando] ? a : new g.Event(M, "object" == typeof a && a)),
            (a.isTrigger = h ? 2 : 3),
            (a.namespace = na.join(".")),
            (a.rnamespace = a.namespace
              ? new RegExp("(^|\\.)" + na.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (a.result = void 0),
            a.target || (a.target = d),
            (b = null == b ? [a] : g.makeArray(b, [a])),
            (H = g.event.special[M] || {}),
            h || !H.trigger || !1 !== H.trigger.apply(d, b)))
        ) {
          if (!h && !H.noBubble && !g.isWindow(d)) {
            var Ma = H.delegateType || M;
            for (F.test(Ma + M) || (l = l.parentNode); l; l = l.parentNode)
              Y.push(l), (n = l);
            n === (d.ownerDocument || bb) &&
              Y.push(n.defaultView || n.parentWindow || la);
          }
          for (na = 0; (l = Y[na++]) && !a.isPropagationStopped(); )
            (a.type = 1 < na ? Ma : H.bindType || M),
              (w =
                (ib.get(l, "events") || {})[a.type] && ib.get(l, "handle")) &&
                w.apply(l, b),
              (w = r && l[r]) &&
                w.apply &&
                Nc(l) &&
                ((a.result = w.apply(l, b)),
                !1 === a.result && a.preventDefault());
          return (
            (a.type = M),
            h ||
              a.isDefaultPrevented() ||
              (H._default && !1 !== H._default.apply(Y.pop(), b)) ||
              !Nc(d) ||
              (r &&
                g.isFunction(d[M]) &&
                !g.isWindow(d) &&
                ((n = d[r]),
                n && (d[r] = null),
                (g.event.triggered = M),
                d[M](),
                (g.event.triggered = void 0),
                n && (d[r] = n))),
            a.result
          );
        }
      },
      simulate: function (a, b, d) {
        a = g.extend(new g.Event(), d, { type: a, isSimulated: !0 });
        g.event.trigger(a, null, b);
      },
    });
    g.fn.extend({
      trigger: function (a, b) {
        return this.each(function () {
          g.event.trigger(a, b, this);
        });
      },
      triggerHandler: function (a, b) {
        var d = this[0];
        if (d) return g.event.trigger(a, b, d, !0);
      },
    });
    g.each(
      "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
        " "
      ),
      function (a, b) {
        g.fn[b] = function (d, h) {
          return 0 < arguments.length
            ? this.on(b, null, d, h)
            : this.trigger(b);
        };
      }
    );
    g.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a);
      },
    });
    Wa.focusin = "onfocusin" in la;
    Wa.focusin ||
      g.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
        var d = function (h) {
          g.event.simulate(b, h.target, g.event.fix(h));
        };
        g.event.special[b] = {
          setup: function () {
            var h = this.ownerDocument || this,
              l = ib.access(h, b);
            l || h.addEventListener(a, d, !0);
            ib.access(h, b, (l || 0) + 1);
          },
          teardown: function () {
            var h = this.ownerDocument || this,
              l = ib.access(h, b) - 1;
            l
              ? ib.access(h, b, l)
              : (h.removeEventListener(a, d, !0), ib.remove(h, b));
          },
        };
      });
    var ea = la.location,
      J = g.now(),
      p = /\?/;
    g.parseXML = function (a) {
      if (!a || "string" != typeof a) return null;
      try {
        var b = new la.DOMParser().parseFromString(a, "text/xml");
      } catch (d) {
        b = void 0;
      }
      return (
        (b && !b.getElementsByTagName("parsererror").length) ||
          g.error("Invalid XML: " + a),
        b
      );
    };
    var y = /\[\]$/,
      X = /\r?\n/g,
      ja = /^(?:submit|button|image|reset|file)$/i,
      R = /^(?:input|select|textarea|keygen)/i;
    g.param = function (a, b) {
      var d,
        h = [],
        l = function (n, r) {
          r = g.isFunction(r) ? r() : r;
          h[h.length] =
            encodeURIComponent(n) +
            "=" +
            encodeURIComponent(null == r ? "" : r);
        };
      if (Array.isArray(a) || (a.jquery && !g.isPlainObject(a)))
        g.each(a, function () {
          l(this.name, this.value);
        });
      else for (d in a) ia(d, a[d], b, l);
      return h.join("&");
    };
    g.fn.extend({
      serialize: function () {
        return g.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = g.prop(this, "elements");
          return a ? g.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !g(this).is(":disabled") &&
              R.test(this.nodeName) &&
              !ja.test(a) &&
              (this.checked || !Za.test(a))
            );
          })
          .map(function (a, b) {
            a = g(this).val();
            return null == a
              ? null
              : Array.isArray(a)
              ? g.map(a, function (d) {
                  return { name: b.name, value: d.replace(X, "\r\n") };
                })
              : { name: b.name, value: a.replace(X, "\r\n") };
          })
          .get();
      },
    });
    var G = /%20/g,
      V = /#.*$/,
      N = /([?&])_=[^&]*/,
      aa = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      ba = /^(?:GET|HEAD)$/,
      T = /^\/\//,
      ua = {},
      Ca = {},
      Ja = "*/".concat("*"),
      xa = bb.createElement("a");
    xa.href = ea.href;
    g.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ea.href,
        type: "GET",
        isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
          ea.protocol
        ),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Ja,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": JSON.parse,
          "text xml": g.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (a, b) {
        return b ? f(f(a, g.ajaxSettings), b) : f(g.ajaxSettings, a);
      },
      ajaxPrefilter: Pc(ua),
      ajaxTransport: Pc(Ca),
      ajax: function (a, b) {
        function d(pa, Qa, Ia, Cb) {
          var jb,
            qc,
            mc,
            Lb = Qa;
          if (!fa) {
            fa = !0;
            r && la.clearTimeout(r);
            h = void 0;
            l = Cb || "";
            Q.readyState = 0 < pa ? 4 : 0;
            Cb = (200 <= pa && 300 > pa) || 304 === pa;
            if (Ia) {
              var Qb = M;
              for (
                var Tc = Q, nc, Ab, Zb, Pb, wd = Qb.contents, Lc = Qb.dataTypes;
                "*" === Lc[0];

              )
                Lc.shift(),
                  void 0 === nc &&
                    (nc = Qb.mimeType || Tc.getResponseHeader("Content-Type"));
              if (nc)
                for (Ab in wd)
                  if (wd[Ab] && wd[Ab].test(nc)) {
                    Lc.unshift(Ab);
                    break;
                  }
              if (Lc[0] in Ia) Zb = Lc[0];
              else {
                for (Ab in Ia) {
                  if (!Lc[0] || Qb.converters[Ab + " " + Lc[0]]) {
                    Zb = Ab;
                    break;
                  }
                  Pb || (Pb = Ab);
                }
                Zb = Zb || Pb;
              }
              Ia = Zb ? (Zb !== Lc[0] && Lc.unshift(Zb), Ia[Zb]) : void 0;
              Qb = Ia;
            }
            a: {
              Ia = M;
              nc = Qb;
              Ab = Q;
              Zb = Cb;
              var vc, Rc, Mc;
              Qb = {};
              Tc = Ia.dataTypes.slice();
              if (Tc[1])
                for (vc in Ia.converters)
                  Qb[vc.toLowerCase()] = Ia.converters[vc];
              for (Pb = Tc.shift(); Pb; )
                if (
                  (Ia.responseFields[Pb] && (Ab[Ia.responseFields[Pb]] = nc),
                  !Mc &&
                    Zb &&
                    Ia.dataFilter &&
                    (nc = Ia.dataFilter(nc, Ia.dataType)),
                  (Mc = Pb),
                  (Pb = Tc.shift()))
                )
                  if ("*" === Pb) Pb = Mc;
                  else if ("*" !== Mc && Mc !== Pb) {
                    if (((vc = Qb[Mc + " " + Pb] || Qb["* " + Pb]), !vc))
                      for (cd in Qb)
                        if (
                          ((Rc = cd.split(" ")),
                          Rc[1] === Pb &&
                            (vc = Qb[Mc + " " + Rc[0]] || Qb["* " + Rc[0]]))
                        ) {
                          !0 === vc
                            ? (vc = Qb[cd])
                            : !0 !== Qb[cd] &&
                              ((Pb = Rc[0]), Tc.unshift(Rc[1]));
                          break;
                        }
                    if (!0 !== vc)
                      if (vc && Ia["throws"]) nc = vc(nc);
                      else
                        try {
                          nc = vc(nc);
                        } catch (Xc) {
                          var cd = {
                            state: "parsererror",
                            error: vc
                              ? Xc
                              : "No conversion from " + Mc + " to " + Pb,
                          };
                          break a;
                        }
                  }
              cd = { state: "success", data: nc };
            }
            Qb = cd;
            Cb
              ? (M.ifModified &&
                  ((mc = Q.getResponseHeader("Last-Modified")),
                  mc && (g.lastModified[sa] = mc),
                  (mc = Q.getResponseHeader("etag")),
                  mc && (g.etag[sa] = mc)),
                204 === pa || "HEAD" === M.type
                  ? (Lb = "nocontent")
                  : 304 === pa
                  ? (Lb = "notmodified")
                  : ((Lb = Qb.state),
                    (jb = Qb.data),
                    (qc = Qb.error),
                    (Cb = !qc)))
              : ((qc = Lb),
                (!pa && Lb) || ((Lb = "error"), 0 > pa && (pa = 0)));
            Q.status = pa;
            Q.statusText = (Qa || Lb) + "";
            Cb
              ? Ra.resolveWith(na, [jb, Lb, Q])
              : Ra.rejectWith(na, [Q, Lb, qc]);
            Q.statusCode(Xa);
            Xa = void 0;
            w &&
              Ma.trigger(Cb ? "ajaxSuccess" : "ajaxError", [
                Q,
                M,
                Cb ? jb : qc,
              ]);
            Pa.fireWith(na, [Q, Lb]);
            w &&
              (Ma.trigger("ajaxComplete", [Q, M]),
              --g.active || g.event.trigger("ajaxStop"));
          }
        }
        "object" == typeof a && ((b = a), (a = void 0));
        b = b || {};
        var h,
          l,
          n,
          r,
          w,
          H,
          Y,
          M = g.ajaxSetup({}, b),
          na = M.context || M,
          Ma = M.context && (na.nodeType || na.jquery) ? g(na) : g.event,
          Ra = g.Deferred(),
          Pa = g.Callbacks("once memory"),
          Xa = M.statusCode || {},
          qb = {},
          gc = {},
          Oa = "canceled",
          Q = {
            readyState: 0,
            getResponseHeader: function (pa) {
              var Qa;
              if (fa) {
                if (!n)
                  for (n = {}; (Qa = aa.exec(l)); )
                    n[Qa[1].toLowerCase()] = Qa[2];
                Qa = n[pa.toLowerCase()];
              }
              return null == Qa ? null : Qa;
            },
            getAllResponseHeaders: function () {
              return fa ? l : null;
            },
            setRequestHeader: function (pa, Qa) {
              return (
                null == fa &&
                  ((pa = gc[pa.toLowerCase()] = gc[pa.toLowerCase()] || pa),
                  (qb[pa] = Qa)),
                this
              );
            },
            overrideMimeType: function (pa) {
              return null == fa && (M.mimeType = pa), this;
            },
            statusCode: function (pa) {
              var Qa;
              if (pa)
                if (fa) Q.always(pa[Q.status]);
                else for (Qa in pa) Xa[Qa] = [Xa[Qa], pa[Qa]];
              return this;
            },
            abort: function (pa) {
              pa = pa || Oa;
              return h && h.abort(pa), d(0, pa), this;
            },
          };
        if (
          (Ra.promise(Q),
          (M.url = ((a || M.url || ea.href) + "").replace(
            T,
            ea.protocol + "//"
          )),
          (M.type = b.method || b.type || M.method || M.type),
          (M.dataTypes = (M.dataType || "*").toLowerCase().match(tc) || [""]),
          null == M.crossDomain)
        ) {
          a = bb.createElement("a");
          try {
            (a.href = M.url),
              (a.href = a.href),
              (M.crossDomain =
                xa.protocol + "//" + xa.host != a.protocol + "//" + a.host);
          } catch (pa) {
            M.crossDomain = !0;
          }
        }
        if (
          (M.data &&
            M.processData &&
            "string" != typeof M.data &&
            (M.data = g.param(M.data, M.traditional)),
          za(ua, M, b, Q),
          fa)
        )
          return Q;
        (w = g.event && M.global) &&
          0 === g.active++ &&
          g.event.trigger("ajaxStart");
        M.type = M.type.toUpperCase();
        M.hasContent = !ba.test(M.type);
        var sa = M.url.replace(V, "");
        M.hasContent
          ? M.data &&
            M.processData &&
            0 ===
              (M.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
            (M.data = M.data.replace(G, "+"))
          : ((Y = M.url.slice(sa.length)),
            M.data &&
              ((sa += (p.test(sa) ? "&" : "?") + M.data), delete M.data),
            !1 === M.cache &&
              ((sa = sa.replace(N, "$1")),
              (Y = (p.test(sa) ? "&" : "?") + "_=" + J++ + Y)),
            (M.url = sa + Y));
        M.ifModified &&
          (g.lastModified[sa] &&
            Q.setRequestHeader("If-Modified-Since", g.lastModified[sa]),
          g.etag[sa] && Q.setRequestHeader("If-None-Match", g.etag[sa]));
        ((M.data && M.hasContent && !1 !== M.contentType) || b.contentType) &&
          Q.setRequestHeader("Content-Type", M.contentType);
        Q.setRequestHeader(
          "Accept",
          M.dataTypes[0] && M.accepts[M.dataTypes[0]]
            ? M.accepts[M.dataTypes[0]] +
                ("*" !== M.dataTypes[0] ? ", " + Ja + "; q=0.01" : "")
            : M.accepts["*"]
        );
        for (H in M.headers) Q.setRequestHeader(H, M.headers[H]);
        if (M.beforeSend && (!1 === M.beforeSend.call(na, Q, M) || fa))
          return Q.abort();
        if (
          ((Oa = "abort"),
          Pa.add(M.complete),
          Q.done(M.success),
          Q.fail(M.error),
          (h = za(Ca, M, b, Q)))
        ) {
          if (((Q.readyState = 1), w && Ma.trigger("ajaxSend", [Q, M]), fa))
            return Q;
          M.async &&
            0 < M.timeout &&
            (r = la.setTimeout(function () {
              Q.abort("timeout");
            }, M.timeout));
          try {
            var fa = !1;
            h.send(qb, d);
          } catch (pa) {
            if (fa) throw pa;
            d(-1, pa);
          }
        } else d(-1, "No Transport");
        return Q;
      },
      getJSON: function (a, b, d) {
        return g.get(a, b, d, "json");
      },
      getScript: function (a, b) {
        return g.get(a, void 0, b, "script");
      },
    });
    g.each(["get", "post"], function (a, b) {
      g[b] = function (d, h, l, n) {
        return (
          g.isFunction(h) && ((n = n || l), (l = h), (h = void 0)),
          g.ajax(
            g.extend(
              { url: d, type: b, dataType: n, data: h, success: l },
              g.isPlainObject(d) && d
            )
          )
        );
      };
    });
    g._evalUrl = function (a) {
      return g.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0,
      });
    };
    g.fn.extend({
      wrapAll: function (a) {
        var b;
        return (
          this[0] &&
            (g.isFunction(a) && (a = a.call(this[0])),
            (b = g(a, this[0].ownerDocument).eq(0).clone(!0)),
            this[0].parentNode && b.insertBefore(this[0]),
            b
              .map(function () {
                for (var d = this; d.firstElementChild; )
                  d = d.firstElementChild;
                return d;
              })
              .append(this)),
          this
        );
      },
      wrapInner: function (a) {
        return g.isFunction(a)
          ? this.each(function (b) {
              g(this).wrapInner(a.call(this, b));
            })
          : this.each(function () {
              var b = g(this),
                d = b.contents();
              d.length ? d.wrapAll(a) : b.append(a);
            });
      },
      wrap: function (a) {
        var b = g.isFunction(a);
        return this.each(function (d) {
          g(this).wrapAll(b ? a.call(this, d) : a);
        });
      },
      unwrap: function (a) {
        return (
          this.parent(a)
            .not("body")
            .each(function () {
              g(this).replaceWith(this.childNodes);
            }),
          this
        );
      },
    });
    g.expr.pseudos.hidden = function (a) {
      return !g.expr.pseudos.visible(a);
    };
    g.expr.pseudos.visible = function (a) {
      return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
    };
    g.ajaxSettings.xhr = function () {
      try {
        return new la.XMLHttpRequest();
      } catch (a) {}
    };
    var W = { 0: 200, 1223: 204 },
      D = g.ajaxSettings.xhr();
    Wa.cors = !!D && "withCredentials" in D;
    Wa.ajax = D = !!D;
    g.ajaxTransport(function (a) {
      var b, d;
      if (Wa.cors || (D && !a.crossDomain))
        return {
          send: function (h, l) {
            var n,
              r = a.xhr();
            if (
              (r.open(a.type, a.url, a.async, a.username, a.password),
              a.xhrFields)
            )
              for (n in a.xhrFields) r[n] = a.xhrFields[n];
            a.mimeType && r.overrideMimeType && r.overrideMimeType(a.mimeType);
            a.crossDomain ||
              h["X-Requested-With"] ||
              (h["X-Requested-With"] = "XMLHttpRequest");
            for (n in h) r.setRequestHeader(n, h[n]);
            b = function (w) {
              return function () {
                b &&
                  ((b = d = r.onload = r.onerror = r.onabort = r.onreadystatechange = null),
                  "abort" === w
                    ? r.abort()
                    : "error" === w
                    ? "number" != typeof r.status
                      ? l(0, "error")
                      : l(r.status, r.statusText)
                    : l(
                        W[r.status] || r.status,
                        r.statusText,
                        "text" !== (r.responseType || "text") ||
                          "string" != typeof r.responseText
                          ? { binary: r.response }
                          : { text: r.responseText },
                        r.getAllResponseHeaders()
                      ));
              };
            };
            r.onload = b();
            d = r.onerror = b("error");
            void 0 !== r.onabort
              ? (r.onabort = d)
              : (r.onreadystatechange = function () {
                  4 === r.readyState &&
                    la.setTimeout(function () {
                      b && d();
                    });
                });
            b = b("abort");
            try {
              r.send((a.hasContent && a.data) || null);
            } catch (w) {
              if (b) throw w;
            }
          },
          abort: function () {
            b && b();
          },
        };
    });
    g.ajaxPrefilter(function (a) {
      a.crossDomain && (a.contents.script = !1);
    });
    g.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        "text script": function (a) {
          return g.globalEval(a), a;
        },
      },
    });
    g.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1);
      a.crossDomain && (a.type = "GET");
    });
    g.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b, d;
        return {
          send: function (h, l) {
            b = g("<script>")
              .prop({ charset: a.scriptCharset, src: a.url })
              .on(
                "load error",
                (d = function (n) {
                  b.remove();
                  d = null;
                  n && l("error" === n.type ? 404 : 200, n.type);
                })
              );
            bb.head.appendChild(b[0]);
          },
          abort: function () {
            d && d();
          },
        };
      }
    });
    var da = [],
      S = /(=)\?(?=&|$)|\?\?/;
    g.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var a = da.pop() || g.expando + "_" + J++;
        return (this[a] = !0), a;
      },
    });
    g.ajaxPrefilter("json jsonp", function (a, b, d) {
      var h,
        l,
        n,
        r =
          !1 !== a.jsonp &&
          (S.test(a.url)
            ? "url"
            : "string" == typeof a.data &&
              0 ===
                (a.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              S.test(a.data) &&
              "data");
      if (r || "jsonp" === a.dataTypes[0])
        return (
          (h = a.jsonpCallback = g.isFunction(a.jsonpCallback)
            ? a.jsonpCallback()
            : a.jsonpCallback),
          r
            ? (a[r] = a[r].replace(S, "$1" + h))
            : !1 !== a.jsonp &&
              (a.url += (p.test(a.url) ? "&" : "?") + a.jsonp + "=" + h),
          (a.converters["script json"] = function () {
            return n || g.error(h + " was not called"), n[0];
          }),
          (a.dataTypes[0] = "json"),
          (l = la[h]),
          (la[h] = function () {
            n = arguments;
          }),
          d.always(function () {
            void 0 === l ? g(la).removeProp(h) : (la[h] = l);
            a[h] && ((a.jsonpCallback = b.jsonpCallback), da.push(h));
            n && g.isFunction(l) && l(n[0]);
            n = l = void 0;
          }),
          "script"
        );
    });
    Wa.createHTMLDocument = (function () {
      var a = bb.implementation.createHTMLDocument("").body;
      return (
        (a.innerHTML = "<form></form><form></form>"), 2 === a.childNodes.length
      );
    })();
    g.parseHTML = function (a, b, d) {
      if ("string" != typeof a) return [];
      "boolean" == typeof b && ((d = b), (b = !1));
      var h, l, n;
      return (
        b ||
          (Wa.createHTMLDocument
            ? ((b = bb.implementation.createHTMLDocument("")),
              (h = b.createElement("base")),
              (h.href = bb.location.href),
              b.head.appendChild(h))
            : (b = bb)),
        (l = U.exec(a)),
        (n = !d && []),
        l
          ? [b.createElement(l[1])]
          : ((l = oa([a], b, n)),
            n && n.length && g(n).remove(),
            g.merge([], l.childNodes))
      );
    };
    g.fn.load = function (a, b, d) {
      var h,
        l,
        n,
        r = this,
        w = a.indexOf(" ");
      return (
        -1 < w && ((h = Dc(a.slice(w))), (a = a.slice(0, w))),
        g.isFunction(b)
          ? ((d = b), (b = void 0))
          : b && "object" == typeof b && (l = "POST"),
        0 < r.length &&
          g
            .ajax({ url: a, type: l || "GET", dataType: "html", data: b })
            .done(function (H) {
              n = arguments;
              r.html(h ? g("<div>").append(g.parseHTML(H)).find(h) : H);
            })
            .always(
              d &&
                function (H, Y) {
                  r.each(function () {
                    d.apply(this, n || [H.responseText, Y, H]);
                  });
                }
            ),
        this
      );
    };
    g.each(
      "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(
        " "
      ),
      function (a, b) {
        g.fn[b] = function (d) {
          return this.on(b, d);
        };
      }
    );
    g.expr.pseudos.animated = function (a) {
      return g.grep(g.timers, function (b) {
        return a === b.elem;
      }).length;
    };
    g.offset = {
      setOffset: function (a, b, d) {
        var h,
          l,
          n,
          r = g.css(a, "position"),
          w = g(a),
          H = {};
        "static" === r && (a.style.position = "relative");
        var Y = w.offset();
        var M = g.css(a, "top");
        var na = g.css(a, "left");
        ("absolute" === r || "fixed" === r) && -1 < (M + na).indexOf("auto")
          ? ((h = w.position()), (n = h.top), (l = h.left))
          : ((n = parseFloat(M) || 0), (l = parseFloat(na) || 0));
        g.isFunction(b) && (b = b.call(a, d, g.extend({}, Y)));
        null != b.top && (H.top = b.top - Y.top + n);
        null != b.left && (H.left = b.left - Y.left + l);
        "using" in b ? b.using.call(a, H) : w.css(H);
      },
    };
    g.fn.extend({
      offset: function (a) {
        if (arguments.length)
          return void 0 === a
            ? this
            : this.each(function (r) {
                g.offset.setOffset(this, a, r);
              });
        var b,
          d,
          h,
          l,
          n = this[0];
        if (n)
          return n.getClientRects().length
            ? ((h = n.getBoundingClientRect()),
              (b = n.ownerDocument),
              (d = b.documentElement),
              (l = b.defaultView),
              {
                top: h.top + l.pageYOffset - d.clientTop,
                left: h.left + l.pageXOffset - d.clientLeft,
              })
            : { top: 0, left: 0 };
      },
      position: function () {
        if (this[0]) {
          var a,
            b,
            d = this[0],
            h = { top: 0, left: 0 };
          return (
            "fixed" === g.css(d, "position")
              ? (b = d.getBoundingClientRect())
              : ((a = this.offsetParent()),
                (b = this.offset()),
                mb(a[0], "html") || (h = a.offset()),
                (h = {
                  top: h.top + g.css(a[0], "borderTopWidth", !0),
                  left: h.left + g.css(a[0], "borderLeftWidth", !0),
                })),
            {
              top: b.top - h.top - g.css(d, "marginTop", !0),
              left: b.left - h.left - g.css(d, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var a = this.offsetParent;
            a && "static" === g.css(a, "position");

          )
            a = a.offsetParent;
          return a || Wc;
        });
      },
    });
    g.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (a, b) {
        var d = "pageYOffset" === b;
        g.fn[a] = function (h) {
          return Ob(
            this,
            function (l, n, r) {
              var w;
              return (
                g.isWindow(l)
                  ? (w = l)
                  : 9 === l.nodeType && (w = l.defaultView),
                void 0 === r
                  ? w
                    ? w[b]
                    : l[n]
                  : void (w
                      ? w.scrollTo(d ? w.pageXOffset : r, d ? r : w.pageYOffset)
                      : (l[n] = r))
              );
            },
            a,
            h,
            arguments.length
          );
        };
      }
    );
    g.each(["top", "left"], function (a, b) {
      g.cssHooks[b] = lc(Wa.pixelPosition, function (d, h) {
        if (h)
          return (h = Ya(d, b)), md.test(h) ? g(d).position()[b] + "px" : h;
      });
    });
    g.each({ Height: "height", Width: "width" }, function (a, b) {
      g.each(
        { padding: "inner" + a, content: b, "": "outer" + a },
        function (d, h) {
          g.fn[h] = function (l, n) {
            var r = arguments.length && (d || "boolean" != typeof l),
              w = d || (!0 === l || !0 === n ? "margin" : "border");
            return Ob(
              this,
              function (H, Y, M) {
                var na;
                return g.isWindow(H)
                  ? 0 === h.indexOf("outer")
                    ? H["inner" + a]
                    : H.document.documentElement["client" + a]
                  : 9 === H.nodeType
                  ? ((na = H.documentElement),
                    Math.max(
                      H.body["scroll" + a],
                      na["scroll" + a],
                      H.body["offset" + a],
                      na["offset" + a],
                      na["client" + a]
                    ))
                  : void 0 === M
                  ? g.css(H, Y, w)
                  : g.style(H, Y, M, w);
              },
              b,
              r ? l : void 0,
              r
            );
          };
        }
      );
    });
    g.fn.extend({
      bind: function (a, b, d) {
        return this.on(a, null, b, d);
      },
      unbind: function (a, b) {
        return this.off(a, null, b);
      },
      delegate: function (a, b, d, h) {
        return this.on(b, a, d, h);
      },
      undelegate: function (a, b, d) {
        return 1 === arguments.length
          ? this.off(a, "**")
          : this.off(b, a || "**", d);
      },
    });
    g.holdReady = function (a) {
      a ? g.readyWait++ : g.ready(!0);
    };
    g.isArray = Array.isArray;
    g.parseJSON = JSON.parse;
    g.nodeName = mb;
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return g;
      });
    var wa = la.jQuery,
      Ba = la.$;
    return (
      (g.noConflict = function (a) {
        return (
          la.$ === g && (la.$ = Ba), a && la.jQuery === g && (la.jQuery = wa), g
        );
      }),
      Ka || (la.jQuery = la.$ = g),
      g
    );
  });
  (function (la, Ka) {
    "function" === typeof define && define.amd
      ? define(Ka)
      : "object" === typeof exports
      ? (module.exports = Ka())
      : (la.ResizeSensor = Ka());
  })("undefined" !== typeof window ? window : this, function () {
    function la(Ta, mb) {
      var gb = Object.prototype.toString.call(Ta),
        xb = 0,
        Ua = Ta.length;
      if (
        "[object Array]" === gb ||
        "[object NodeList]" === gb ||
        "[object HTMLCollection]" === gb ||
        "[object Object]" === gb ||
        ("undefined" !== typeof jQuery && Ta instanceof jQuery) ||
        ("undefined" !== typeof Elements && Ta instanceof Elements)
      )
        for (; xb < Ua; xb++) mb(Ta[xb]);
      else mb(Ta);
    }
    if ("undefined" === typeof window) return null;
    var Ka =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (Ta) {
          return window.setTimeout(Ta, 20);
        },
      db = function (Ta, mb) {
        function gb() {
          var Ua = [];
          this.add = function (hb) {
            Ua.push(hb);
          };
          var pb, yb;
          this.call = function () {
            pb = 0;
            for (yb = Ua.length; pb < yb; pb++) Ua[pb].call();
          };
          this.remove = function (hb) {
            var Tb = [];
            pb = 0;
            for (yb = Ua.length; pb < yb; pb++)
              Ua[pb] !== hb && Tb.push(Ua[pb]);
            Ua = Tb;
          };
          this.length = function () {
            return Ua.length;
          };
        }
        function xb(Ua, pb) {
          if (Ua)
            if (Ua.resizedAttached) Ua.resizedAttached.add(pb);
            else {
              Ua.resizedAttached = new gb();
              Ua.resizedAttached.add(pb);
              Ua.resizeSensor = document.createElement("div");
              Ua.resizeSensor.className = "resize-sensor";
              Ua.resizeSensor.style.cssText =
                "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
              Ua.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div>';
              Ua.appendChild(Ua.resizeSensor);
              Ua.resizeSensor.offsetParent !== Ua &&
                (Ua.style.position = "relative");
              var yb = Ua.resizeSensor.childNodes[0],
                hb = yb.childNodes[0],
                Tb = Ua.resizeSensor.childNodes[1],
                wc,
                xc,
                yc,
                Ub,
                Rb = Ua.offsetWidth,
                ha = Ua.offsetHeight,
                oa = function () {
                  hb.style.width = "100000px";
                  hb.style.height = "100000px";
                  yb.scrollLeft = 1e5;
                  yb.scrollTop = 1e5;
                  Tb.scrollLeft = 1e5;
                  Tb.scrollTop = 1e5;
                };
              oa();
              var va = function () {
                xc = 0;
                wc &&
                  ((Rb = yc),
                  (ha = Ub),
                  Ua.resizedAttached && Ua.resizedAttached.call());
              };
              pb = function () {
                yc = Ua.offsetWidth;
                Ub = Ua.offsetHeight;
                (wc = yc != Rb || Ub != ha) && !xc && (xc = Ka(va));
                oa();
              };
              var La = function (Na, Ea, Fa) {
                Na.attachEvent
                  ? Na.attachEvent("on" + Ea, Fa)
                  : Na.addEventListener(Ea, Fa);
              };
              La(yb, "scroll", pb);
              La(Tb, "scroll", pb);
            }
        }
        la(Ta, function (Ua) {
          xb(Ua, mb);
        });
        this.detach = function (Ua) {
          db.detach(Ta, Ua);
        };
      };
    db.detach = function (Ta, mb) {
      la(Ta, function (gb) {
        if (gb) {
          if (
            gb.resizedAttached &&
            "function" == typeof mb &&
            (gb.resizedAttached.remove(mb), gb.resizedAttached.length())
          )
            return;
          gb.resizeSensor &&
            (gb.contains(gb.resizeSensor) && gb.removeChild(gb.resizeSensor),
            delete gb.resizeSensor,
            delete gb.resizedAttached);
        }
      });
    };
    return db;
  });
  (function () {
    function la(ha, oa) {
      oa || ha.match(/^data:([^;]+);base64,/im);
      ha = ha.replace(/^data:([^;]+);base64,/gim, "");
      ha = atob(ha);
      oa = ha.length;
      for (
        var va = new ArrayBuffer(oa), La = new Uint8Array(va), Na = 0;
        Na < oa;
        Na++
      )
        La[Na] = ha.charCodeAt(Na);
      return va;
    }
    function Ka(ha, oa) {
      var va = new XMLHttpRequest();
      va.open("GET", ha, !0);
      va.responseType = "blob";
      va.onload = function (La) {
        (200 != this.status && 0 !== this.status) || oa(this.response);
      };
      va.send();
    }
    function db(ha, oa) {
      function va(Fa) {
        var Sa = Ta(Fa);
        ha.exifdata = Sa || {};
        a: if (
          ((Sa = new DataView(Fa)),
          255 != Sa.getUint8(0) || 216 != Sa.getUint8(1))
        )
          Sa = !1;
        else {
          for (var vb = 2, Hb = Fa.byteLength; vb < Hb; ) {
            var Bb = Sa,
              zb = vb;
            if (
              56 === Bb.getUint8(zb) &&
              66 === Bb.getUint8(zb + 1) &&
              73 === Bb.getUint8(zb + 2) &&
              77 === Bb.getUint8(zb + 3) &&
              4 === Bb.getUint8(zb + 4) &&
              4 === Bb.getUint8(zb + 5)
            ) {
              Bb = Sa.getUint8(vb + 7);
              0 !== Bb % 2 && (Bb += 1);
              0 === Bb && (Bb = 4);
              Hb = vb + 8 + Bb;
              vb = Sa.getUint16(vb + 6 + Bb);
              Sa = Hb;
              Hb = new DataView(Fa);
              Bb = {};
              for (zb = Sa; zb < Sa + vb; ) {
                if (28 === Hb.getUint8(zb) && 2 === Hb.getUint8(zb + 1)) {
                  var Ya = Hb.getUint8(zb + 2);
                  if (Ya in Rb) {
                    var lc = Hb.getInt16(zb + 3);
                    Ya = Rb[Ya];
                    lc = xb(Hb, zb + 5, lc);
                    Bb.hasOwnProperty(Ya)
                      ? Bb[Ya] instanceof Array
                        ? Bb[Ya].push(lc)
                        : (Bb[Ya] = [Bb[Ya], lc])
                      : (Bb[Ya] = lc);
                  }
                }
                zb++;
              }
              Sa = Bb;
              break a;
            }
            vb++;
          }
          Sa = void 0;
        }
        ha.iptcdata = Sa || {};
        if (hb.isXmpEnabled) {
          a: if ("DOMParser" in self)
            if (
              ((Sa = new DataView(Fa)),
              255 != Sa.getUint8(0) || 216 != Sa.getUint8(1))
            )
              var bc = !1;
            else {
              vb = 2;
              Hb = Fa.byteLength;
              for (Fa = new DOMParser(); vb < Hb - 4; )
                if ("http" == xb(Sa, vb, 4)) {
                  Hb = vb - 1;
                  vb = Sa.getUint16(vb - 2) - 1;
                  Sa = xb(Sa, Hb, vb);
                  vb = Sa.indexOf("xmpmeta>") + 8;
                  Sa = Sa.substring(Sa.indexOf("<x:xmpmeta"), vb);
                  vb = Sa.indexOf("x:xmpmeta") + 10;
                  Sa =
                    Sa.slice(0, vb) +
                    'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' +
                    Sa.slice(vb);
                  b: {
                    Fa = Fa.parseFromString(Sa, "text/xml");
                    try {
                      Sa = {};
                      if (0 < Fa.children.length)
                        for (vb = 0; vb < Fa.children.length; vb++) {
                          var Eb = Fa.children.item(vb),
                            Yb = Eb.attributes,
                            Fc;
                          for (Fc in Yb) {
                            var Kb = Yb[Fc],
                              Gc = Kb.nodeName,
                              Ic = Kb.nodeValue;
                            void 0 !== Gc && (Sa[Gc] = Ic);
                          }
                          var ec = Eb.nodeName;
                          if ("undefined" == typeof Sa[ec]) Sa[ec] = pb(Eb);
                          else {
                            if ("undefined" == typeof Sa[ec].push) {
                              var Cc = Sa[ec];
                              Sa[ec] = [];
                              Sa[ec].push(Cc);
                            }
                            Sa[ec].push(pb(Eb));
                          }
                        }
                      else Sa = Fa.textContent;
                      bc = Sa;
                      break b;
                    } catch (Oc) {
                      console.log(Oc.message);
                    }
                    bc = void 0;
                  }
                  break a;
                } else vb++;
              bc = void 0;
            }
          else bc = void 0;
          ha.xmpdata = bc || {};
        }
        oa && oa.call(ha);
      }
      if (ha.src)
        if (/^data:/i.test(ha.src)) {
          var La = la(ha.src);
          va(La);
        } else if (/^blob:/i.test(ha.src)) {
          var Na = new FileReader();
          Na.onload = function (Fa) {
            va(Fa.target.result);
          };
          Ka(ha.src, function (Fa) {
            Na.readAsArrayBuffer(Fa);
          });
        } else {
          var Ea = new XMLHttpRequest();
          Ea.onload = function () {
            if (200 == this.status || 0 === this.status) va(Ea.response);
            else throw "Could not load image";
            Ea = null;
          };
          Ea.open("GET", ha.src, !0);
          Ea.responseType = "arraybuffer";
          Ea.send(null);
        }
      else
        self.FileReader &&
          (ha instanceof self.Blob || ha instanceof self.File) &&
          ((Na = new FileReader()),
          (Na.onload = function (Fa) {
            va(Fa.target.result);
          }),
          Na.readAsArrayBuffer(ha));
    }
    function Ta(ha) {
      var oa = new DataView(ha);
      if (255 != oa.getUint8(0) || 216 != oa.getUint8(1)) return !1;
      var va = 2;
      ha = ha.byteLength;
      for (var La; va < ha; ) {
        if (255 != oa.getUint8(va)) return !1;
        La = oa.getUint8(va + 1);
        if (225 == La) return Ua(oa, va + 4, oa.getUint16(va + 2) - 2);
        va += 2 + oa.getUint16(va + 2);
      }
    }
    function mb(ha, oa, va, La, Na) {
      var Ea = ha.getUint16(va, !Na),
        Fa = {},
        Sa;
      for (Sa = 0; Sa < Ea; Sa++) {
        var vb = va + 12 * Sa + 2;
        var Hb = La[ha.getUint16(vb, !Na)];
        Fa[Hb] = gb(ha, vb, oa, va, Na);
      }
      return Fa;
    }
    function gb(ha, oa, va, La, Na) {
      var Ea = ha.getUint16(oa + 2, !Na);
      La = ha.getUint32(oa + 4, !Na);
      va = ha.getUint32(oa + 8, !Na) + va;
      switch (Ea) {
        case 1:
        case 7:
          if (1 == La) return ha.getUint8(oa + 8, !Na);
          va = 4 < La ? va : oa + 8;
          oa = [];
          for (Ea = 0; Ea < La; Ea++) oa[Ea] = ha.getUint8(va + Ea);
          return oa;
        case 2:
          return xb(ha, 4 < La ? va : oa + 8, La - 1);
        case 3:
          if (1 == La) return ha.getUint16(oa + 8, !Na);
          va = 2 < La ? va : oa + 8;
          oa = [];
          for (Ea = 0; Ea < La; Ea++) oa[Ea] = ha.getUint16(va + 2 * Ea, !Na);
          return oa;
        case 4:
          if (1 == La) return ha.getUint32(oa + 8, !Na);
          oa = [];
          for (Ea = 0; Ea < La; Ea++) oa[Ea] = ha.getUint32(va + 4 * Ea, !Na);
          return oa;
        case 5:
          if (1 == La) {
            var Fa = ha.getUint32(va, !Na);
            var Sa = ha.getUint32(va + 4, !Na);
            ha = new Number(Fa / Sa);
            ha.numerator = Fa;
            ha.denominator = Sa;
            return ha;
          }
          oa = [];
          for (Ea = 0; Ea < La; Ea++)
            (Fa = ha.getUint32(va + 8 * Ea, !Na)),
              (Sa = ha.getUint32(va + 4 + 8 * Ea, !Na)),
              (oa[Ea] = new Number(Fa / Sa)),
              (oa[Ea].numerator = Fa),
              (oa[Ea].denominator = Sa);
          return oa;
        case 9:
          if (1 == La) return ha.getInt32(oa + 8, !Na);
          oa = [];
          for (Ea = 0; Ea < La; Ea++) oa[Ea] = ha.getInt32(va + 4 * Ea, !Na);
          return oa;
        case 10:
          if (1 == La) return ha.getInt32(va, !Na) / ha.getInt32(va + 4, !Na);
          oa = [];
          for (Ea = 0; Ea < La; Ea++)
            oa[Ea] =
              ha.getInt32(va + 8 * Ea, !Na) / ha.getInt32(va + 4 + 8 * Ea, !Na);
          return oa;
      }
    }
    function xb(ha, oa, va) {
      var La = "";
      for (va = oa + va; oa < va; ++oa)
        La += String.fromCharCode(ha.getUint8(oa));
      return La;
    }
    function Ua(ha, oa) {
      if ("Exif" != xb(ha, oa, 4)) return !1;
      var va = oa + 6;
      if (18761 == ha.getUint16(va)) var La = !1;
      else if (19789 == ha.getUint16(va)) La = !0;
      else return !1;
      if (42 != ha.getUint16(va + 2, !La)) return !1;
      var Na = ha.getUint32(va + 4, !La);
      if (8 > Na) return !1;
      oa = mb(ha, va, va + Na, wc, La);
      if (oa.ExifIFDPointer) {
        var Ea = mb(ha, va, va + oa.ExifIFDPointer, Tb, La);
        for (Fa in Ea) {
          switch (Fa) {
            case "LightSource":
            case "Flash":
            case "MeteringMode":
            case "ExposureProgram":
            case "SensingMethod":
            case "SceneCaptureType":
            case "SceneType":
            case "CustomRendered":
            case "WhiteBalance":
            case "GainControl":
            case "Contrast":
            case "Saturation":
            case "Sharpness":
            case "SubjectDistanceRange":
            case "FileSource":
              Ea[Fa] = Ub[Fa][Ea[Fa]];
              break;
            case "ExifVersion":
            case "FlashpixVersion":
              Ea[Fa] = String.fromCharCode(
                Ea[Fa][0],
                Ea[Fa][1],
                Ea[Fa][2],
                Ea[Fa][3]
              );
              break;
            case "ComponentsConfiguration":
              Ea[Fa] =
                Ub.Components[Ea[Fa][0]] +
                Ub.Components[Ea[Fa][1]] +
                Ub.Components[Ea[Fa][2]] +
                Ub.Components[Ea[Fa][3]];
          }
          oa[Fa] = Ea[Fa];
        }
      }
      if (oa.GPSInfoIFDPointer)
        for (Fa in ((Ea = mb(ha, va, va + oa.GPSInfoIFDPointer, xc, La)), Ea)) {
          switch (Fa) {
            case "GPSVersionID":
              Ea[Fa] =
                Ea[Fa][0] + "." + Ea[Fa][1] + "." + Ea[Fa][2] + "." + Ea[Fa][3];
          }
          oa[Fa] = Ea[Fa];
        }
      var Fa = La;
      Na = va + Na;
      La = ha.getUint16(Na, !Fa);
      if ((Na = ha.getUint32(Na + 2 + 12 * La, !Fa)))
        if (Na > ha.byteLength) ha = {};
        else {
          Fa = mb(ha, va, va + Na, yc, Fa);
          if (Fa.Compression)
            switch (Fa.Compression) {
              case 6:
                Fa.JpegIFOffset &&
                  Fa.JpegIFByteCount &&
                  (Fa.blob = new Blob(
                    [
                      new Uint8Array(
                        ha.buffer,
                        va + Fa.JpegIFOffset,
                        Fa.JpegIFByteCount
                      ),
                    ],
                    { type: "image/jpeg" }
                  ));
                break;
              case 1:
                console.log(
                  "Thumbnail image format is TIFF, which is not implemented."
                );
                break;
              default:
                console.log(
                  "Unknown thumbnail image format '%s'",
                  Fa.Compression
                );
            }
          else
            2 == Fa.PhotometricInterpretation &&
              console.log(
                "Thumbnail image format is RGB, which is not implemented."
              );
          ha = Fa;
        }
      else ha = {};
      oa.thumbnail = ha;
      return oa;
    }
    function pb(ha) {
      var oa = {};
      if (1 == ha.nodeType) {
        if (0 < ha.attributes.length) {
          oa["@attributes"] = {};
          for (var va = 0; va < ha.attributes.length; va++) {
            var La = ha.attributes.item(va);
            oa["@attributes"][La.nodeName] = La.nodeValue;
          }
        }
      } else if (3 == ha.nodeType) return ha.nodeValue;
      if (ha.hasChildNodes())
        for (va = 0; va < ha.childNodes.length; va++) {
          La = ha.childNodes.item(va);
          var Na = La.nodeName;
          if (null == oa[Na]) oa[Na] = pb(La);
          else {
            if (null == oa[Na].push) {
              var Ea = oa[Na];
              oa[Na] = [];
              oa[Na].push(Ea);
            }
            oa[Na].push(pb(La));
          }
        }
      return oa;
    }
    var yb = this || window,
      hb = function (ha) {
        if (ha instanceof hb) return ha;
        if (!(this instanceof hb)) return new hb(ha);
        this.EXIFwrapped = ha;
      };
    "undefined" !== typeof exports
      ? ("undefined" !== typeof module &&
          module.exports &&
          (exports = module.exports = hb),
        (exports.EXIF = hb))
      : (yb.EXIF = hb);
    var Tb = (hb.Tags = {
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubsecTime",
        37521: "SubsecTimeOriginal",
        37522: "SubsecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "ISOSpeedRatings",
        34856: "OECF",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRation",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        40965: "InteroperabilityIFDPointer",
        42016: "ImageUniqueID",
      }),
      wc = (hb.TiffTags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
      }),
      xc = (hb.GPSTags = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
      }),
      yc = (hb.IFD1Tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        273: "StripOffsets",
        274: "Orientation",
        277: "SamplesPerPixel",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        282: "XResolution",
        283: "YResolution",
        284: "PlanarConfiguration",
        296: "ResolutionUnit",
        513: "JpegIFOffset",
        514: "JpegIFByteCount",
        529: "YCbCrCoefficients",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        532: "ReferenceBlackWhite",
      }),
      Ub = (hb.StringValues = {
        ExposureProgram: {
          0: "Not defined",
          1: "Manual",
          2: "Normal program",
          3: "Aperture priority",
          4: "Shutter priority",
          5: "Creative program",
          6: "Action program",
          7: "Portrait mode",
          8: "Landscape mode",
        },
        MeteringMode: {
          0: "Unknown",
          1: "Average",
          2: "CenterWeightedAverage",
          3: "Spot",
          4: "MultiSpot",
          5: "Pattern",
          6: "Partial",
          255: "Other",
        },
        LightSource: {
          0: "Unknown",
          1: "Daylight",
          2: "Fluorescent",
          3: "Tungsten (incandescent light)",
          4: "Flash",
          9: "Fine weather",
          10: "Cloudy weather",
          11: "Shade",
          12: "Daylight fluorescent (D 5700 - 7100K)",
          13: "Day white fluorescent (N 4600 - 5400K)",
          14: "Cool white fluorescent (W 3900 - 4500K)",
          15: "White fluorescent (WW 3200 - 3700K)",
          17: "Standard light A",
          18: "Standard light B",
          19: "Standard light C",
          20: "D55",
          21: "D65",
          22: "D75",
          23: "D50",
          24: "ISO studio tungsten",
          255: "Other",
        },
        Flash: {
          0: "Flash did not fire",
          1: "Flash fired",
          5: "Strobe return light not detected",
          7: "Strobe return light detected",
          9: "Flash fired, compulsory flash mode",
          13: "Flash fired, compulsory flash mode, return light not detected",
          15: "Flash fired, compulsory flash mode, return light detected",
          16: "Flash did not fire, compulsory flash mode",
          24: "Flash did not fire, auto mode",
          25: "Flash fired, auto mode",
          29: "Flash fired, auto mode, return light not detected",
          31: "Flash fired, auto mode, return light detected",
          32: "No flash function",
          65: "Flash fired, red-eye reduction mode",
          69: "Flash fired, red-eye reduction mode, return light not detected",
          71: "Flash fired, red-eye reduction mode, return light detected",
          73: "Flash fired, compulsory flash mode, red-eye reduction mode",
          77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
          79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
          89: "Flash fired, auto mode, red-eye reduction mode",
          93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
          95: "Flash fired, auto mode, return light detected, red-eye reduction mode",
        },
        SensingMethod: {
          1: "Not defined",
          2: "One-chip color area sensor",
          3: "Two-chip color area sensor",
          4: "Three-chip color area sensor",
          5: "Color sequential area sensor",
          7: "Trilinear sensor",
          8: "Color sequential linear sensor",
        },
        SceneCaptureType: {
          0: "Standard",
          1: "Landscape",
          2: "Portrait",
          3: "Night scene",
        },
        SceneType: { 1: "Directly photographed" },
        CustomRendered: { 0: "Normal process", 1: "Custom process" },
        WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" },
        GainControl: {
          0: "None",
          1: "Low gain up",
          2: "High gain up",
          3: "Low gain down",
          4: "High gain down",
        },
        Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" },
        Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" },
        Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" },
        SubjectDistanceRange: {
          0: "Unknown",
          1: "Macro",
          2: "Close view",
          3: "Distant view",
        },
        FileSource: { 3: "DSC" },
        Components: { 0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" },
      }),
      Rb = {
        120: "caption",
        110: "credit",
        25: "keywords",
        55: "dateCreated",
        80: "byline",
        85: "bylineTitle",
        122: "captionWriter",
        105: "headline",
        116: "copyright",
        15: "category",
      };
    hb.enableXmp = function () {
      hb.isXmpEnabled = !0;
    };
    hb.disableXmp = function () {
      hb.isXmpEnabled = !1;
    };
    hb.getData = function (ha, oa) {
      if (
        ((self.Image && ha instanceof self.Image) ||
          (self.HTMLImageElement && ha instanceof self.HTMLImageElement)) &&
        !ha.complete
      )
        return !1;
      ha.exifdata ? oa && oa.call(ha) : db(ha, oa);
      return !0;
    };
    hb.getTag = function (ha, oa) {
      if (ha.exifdata) return ha.exifdata[oa];
    };
    hb.getIptcTag = function (ha, oa) {
      if (ha.exifdata) return ha.iptcdata[oa];
    };
    hb.getAllTags = function (ha) {
      if (!ha.exifdata) return {};
      var oa;
      ha = ha.exifdata;
      var va = {};
      for (oa in ha) ha.hasOwnProperty(oa) && (va[oa] = ha[oa]);
      return va;
    };
    hb.getAllIptcTags = function (ha) {
      if (!ha.exifdata) return {};
      var oa;
      ha = ha.iptcdata;
      var va = {};
      for (oa in ha) ha.hasOwnProperty(oa) && (va[oa] = ha[oa]);
      return va;
    };
    hb.pretty = function (ha) {
      if (!ha.exifdata) return "";
      var oa;
      ha = ha.exifdata;
      var va = "";
      for (oa in ha)
        ha.hasOwnProperty(oa) &&
          (va =
            "object" == typeof ha[oa]
              ? ha[oa] instanceof Number
                ? va +
                  (oa +
                    " : " +
                    ha[oa] +
                    " [" +
                    ha[oa].numerator +
                    "/" +
                    ha[oa].denominator +
                    "]\r\n")
                : va + (oa + " : [" + ha[oa].length + " values]\r\n")
              : va + (oa + " : " + ha[oa] + "\r\n"));
      return va;
    };
    hb.readFromBinaryFile = function (ha) {
      return Ta(ha);
    };
    "function" === typeof define &&
      define.amd &&
      define("exif-js", [], function () {
        return hb;
      });
  }.call(this));
  var Od = (function () {
      function la(db, Ta, mb, gb) {
        var xb = new FileReader();
        xb.onload = function () {
          var Ua = new Image();
          Ua.src = xb.result;
          Ua.onload = Ka.process.bind(Ka, db, Ua, mb, gb);
        };
        xb.onerror = function () {
          gb("WRONGFILEFORMAT");
        };
        xb.readAsDataURL(Ta);
      }
      var Ka = {
        read: function (db, Ta, mb) {
          if (db.files && db.files.length) {
            var gb = db.files[0];
            db = gb.name.split(".").pop().toLowerCase();
            -1 === ["jpg", "jpeg", "png"].indexOf(db)
              ? mb("WRONGFILEFORMAT")
              : EXIF.getData(gb, function () {
                  console.log(
                    "INFO in ImageProcess - read() - EXIF data =",
                    EXIF.pretty(gb)
                  );
                  var xb = EXIF.getTag(gb, "Orientation");
                  la(xb, gb, Ta, mb);
                }) || la(-1, gb, Ta, mb);
          } else mb("NOFILE");
        },
        process: function (db, Ta, mb, gb) {
          if ("number" === typeof db && 2 <= db && 8 >= db) {
            console.log(
              "INFO in ImageProcess - process(): image needs to be reoriented. orientation =",
              db
            );
            gb = Ta.width;
            var xb = Ta.height,
              Ua = document.createElement("canvas");
            -1 < [5, 6, 7, 8].indexOf(db)
              ? (console.log(
                  "INFO in ImageProcess - process(): the image needs to be 90\u00b0 rotated"
                ),
                (Ua.width = xb),
                (Ua.height = gb))
              : ((Ua.width = gb), (Ua.height = xb));
            var pb = Ua.getContext("2d");
            switch (db) {
              case 2:
                pb.transform(-1, 0, 0, 1, gb, 0);
                break;
              case 3:
                pb.transform(-1, 0, 0, -1, gb, xb);
                break;
              case 4:
                pb.transform(1, 0, 0, -1, 0, xb);
                break;
              case 5:
                pb.transform(0, 1, 1, 0, 0, 0);
                break;
              case 6:
                pb.transform(0, 1, -1, 0, xb, 0);
                break;
              case 7:
                pb.transform(0, -1, -1, 0, xb, gb);
                break;
              case 8:
                pb.transform(0, -1, 1, 0, 0, gb);
                break;
              default:
                pb.transform(1, 0, 0, 1, 0, 0);
            }
            pb.drawImage(Ta, 0, 0);
            db = Ua;
          } else db = Ta;
          mb(db);
        },
      };
      return Ka;
    })(),
    $c = {
      disableFallback: !0,
      glassesDBURL: "https://glassesdbcached.jeeliz.com/sku/",
      appstaticURL: "https://appstatic.jeeliz.com/",
      fallbackURL: "https://fallbackglassesdb.jeeliz.com",
    },
    rc = {
      notLoaded: -1,
      init: 0,
      fallback: 1,
      realtime: 2,
      loadingModel: 3,
      paused: 4,
    },
    ob = { canRT: !0, isRT: !0, sku: void 0, mode: rc.notLoaded },
    Id = -1,
    Jd = -1,
    yd = -1,
    zd = -1,
    Ga = {
      cv: null,
      container: null,
      adjust: null,
      adjustNotice: null,
      adjustExit: null,
      inputFile: null,
      inputFileButton: null,
      inputFileButtonFallbackMessage: null,
      uploadNotice: null,
      backToRTButton: null,
      loading: null,
      trackIframe: null,
    },
    jd = { enabled: !1, callback: null, interval: 1e3 },
    Hd = { error: !1 },
    Fd = null,
    ed = null,
    dc = {
      start: function (la) {
        console.log("INFO in JeeWidget.js: start()");
        if (ob.mode !== rc.notLoaded) dc.resume();
        else {
          if (la.settings) for (var Ka in la.settings) $c[Ka] = la.settings[Ka];
          la.NNCPath && Jb.set_NNCPath(la.NNCPath);
          la.faceDetectionCallback &&
            ((jd.enabled = !0),
            (jd.callback = la.faceDetectionCallback),
            (jd.interval =
              "undefined" === typeof la.faceDetectionInterval
                ? 1e3
                : la.faceDetectionInterval));
          Ga.container = document.getElementById("JeeWidget");
          if (!Ga.container)
            throw Error(
              "Cannot find a <div> element with id=JeeWidget to append the VTO widget."
            );
          Ga.cv = document.getElementById("JeeWidgetCanvas");
          Ga.cv ||
            ((Ga.cv = document.createElement("canvas")),
            Ga.container.appendChild(Ga.cv));
          Ga.loading = document.getElementById("JeeWidgetLoading");
          Wd();
          la.onError && (Hd.error = la.onError);
          Xd();
          if (!$(Ga.container).width()) return ub("PLACEHOLDER_NULL_WIDTH"), !1;
          if (!$(Ga.container).height())
            return ub("PLACEHOLDER_NULL_HEIGHT"), !1;
          Nb();
          new ResizeSensor($(Ga.container), function (db) {
            Nb();
          });
          (la.searchImageMask || la.searchImageColor) &&
            Jb.set_loading(la.searchImageMask, la.searchImageColor);
          la.callbackReady && (ed = la.callbackReady);
          ob.mode = rc.init;
          Ka =
            "undefined" === typeof la.assetsPath
              ? $c.appstaticURL + "jeefit/"
              : la.assetsPath;
          "undefined" !== typeof la.catalog && (Fd = la.catalog);
          if (la.onWebcamGet) Jb.onWebcamGet(la.onWebcamGet);
          Jb.init(Ka, $a, tb, Ga.cv);
          Jb.onHalfLoad(dc.load.bind(dc, la.sku ? la.sku : null));
          return !0;
        }
      },
      pause: function () {
        ob.isRT && (Jb.switch_sleep(!0), (ob.mode = rc.paused));
      },
      resume: function () {
        ob.isRT && (Jb.switch_sleep(!1), (ob.mode = rc.realtime));
      },
      set_videoRotation: function (la) {
        ob.isRT && Jb.set_videoRotation(la);
      },
      set_videoSizes: function (la, Ka, db, Ta, mb, gb) {
        ob.isRT && Jb.set_videoSizes(la, Ka, db, Ta, mb, gb);
      },
      resize: function () {
        Nb();
      },
      set_scale: function (la) {
        Jb.set_scale(la);
      },
      capture_image: function (la, Ka, db) {
        Jb && Jb.ready ? Jb.capture_image(la, Ka, db, !1) : Ka(!1);
      },
      toggle_loading: function (la) {
        Ga.loading && (la ? $(Ga.loading).show() : $(Ga.loading).hide());
      },
      load_modelStandalone: function (la, Ka) {
        if (!ob.isRT)
          throw Error("Loading standalone models is only available in RT mode");
        ob.mode === rc.paused && dc.resume();
        ob.mode = rc.loadingModel;
        if ("string" === typeof la)
          $.ajax({ method: "GET", url: la, dataType: "json" })
            .then(function (Ta) {
              Jb.set_modelStandalone(Ta, Ka, la);
            })
            .fail(wb);
        else {
          var db = "RANDOM_SKU_" + Date.now().toString();
          Jb.set_modelStandalone(la, Ka, db);
        }
      },
      load: function (la, Ka) {
        dc.toggle_loading(!0);
        ob.isRT ? dc.load_RT(la, Ka) : dc.load_fallback(la, Ka);
      },
      load_fallback: function (la, Ka) {
        la &&
          ((ob.mode = rc.loadingModel),
          Jb.load_model(
            null,
            null,
            function () {
              ob.mode = rc.fallback;
              dc.toggle_loading(!1);
              Ka && Ka();
              Pd(la);
            },
            la
          ));
      },
      load_RT: function (la, Ka) {
        la === ob.sku
          ? dc.toggle_loading(!1)
          : ((ob.sku = la),
            (ob.mode = rc.loadingModel),
            ob.mode === rc.paused && dc.resume(),
            la
              ? Fd && Fd[la]
                ? Qd(la, Fd[la], Ka)
                : $.ajax({
                    method: "GET",
                    url: $c.glassesDBURL + la,
                    dataType: "json",
                  })
                    .then(function (db) {
                      if (db.error) return wb();
                      Qd(la, db.intrinsic, Ka);
                    })
                    .fail(wb)
              : ((ob.mode = rc.realtime),
                dc.toggle_loading(!1),
                Jb.start_rendering(),
                Ka && Ka()));
      },
    };
  return dc;
})();
window.JEEFITAPI = JEEFITAPI;
window.JeefitFallback = JeefitFallback;
window.JEEWIDGET = {
  start: JeeWidget.start,
  pause: JeeWidget.pause,
  resume: JeeWidget.resume,
  load: JeeWidget.load,
  load_modelStandalone: JeeWidget.load_modelStandalone,
  capture_image: JeeWidget.capture_image,
  set_videoRotation: JeeWidget.set_videoRotation,
  resize: JeeWidget.resize,
  set_scale: JeeWidget.set_scale,
  set_videoSizes: JeeWidget.set_videoSizes,
};
