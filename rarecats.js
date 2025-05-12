(() => {
    var fo = Object.create;
    var jt = Object.defineProperty;
    var Qo = Object.getOwnPropertyDescriptor;
    var bo = Object.getOwnPropertyNames;
    var go = Object.getPrototypeOf,
        Fo = Object.prototype.hasOwnProperty;
    var Bo = (o, t, e) => t in o ? jt(o, t, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: e
    }) : o[t] = e;
    var xt = (o => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(o, {
        get: (t, e) => (typeof require < "u" ? require : t)[e]
    }) : o)(function(o) {
        if (typeof require < "u") return require.apply(this, arguments);
        throw Error('Dynamic require of "' + o + '" is not supported')
    });
    var qn = (o, t) => () => (t || o((t = {
            exports: {}
        }).exports, t), t.exports),
        A = (o, t) => {
            for (var e in t) jt(o, e, {
                get: t[e],
                enumerable: true
            })
        },
        Uo = (o, t, e, n) => {
            if (t && typeof t == "object" || typeof t == "function")
                for (let i of bo(t)) !Fo.call(o, i) && i !== e && jt(o, i, {
                    get: () => t[i],
                    enumerable: !(n = Qo(t, i)) || n.enumerable
                });
            return o
        };
    var Pt = (o, t, e) => (e = o != null ? fo(go(o)) : {}, Uo(t || !o || !o.__esModule ? jt(e, "default", {
        value: o,
        enumerable: true
    }) : e, o));
    var X = (o, t, e) => (Bo(o, typeof t != "symbol" ? t + "" : t, e), e);
    var Howler = qn(Xe => {
        (function() {
            "use strict";
            var o = function() {
                this.init()
            };
            o.prototype = {
                init: function() {
                    var s = this || t;
                    return s._counter = 1e3, s._html5AudioPool = [], s.html5PoolSize = 10, s._codecs = {}, s._howls = [], s._muted = false, s._volume = 1, s._canPlayEvent = "canplaythrough", s._navigator = typeof window < "u" && window.navigator ? window.navigator : null, s.masterGain = null, s.noAudio = false, s.usingWebAudio = true, s.autoSuspend = true, s.ctx = null, s.autoUnlock = true, s._setup(), s
                },
                volume: function(s) {
                    var r = this || t;
                    if (s = parseFloat(s), r.ctx || m(), typeof s < "u" && s >= 0 && s <= 1) {
                        if (r._volume = s, r._muted) return r;
                        r.usingWebAudio && r.masterGain.gain.setValueAtTime(s, t.ctx.currentTime);
                        for (var d = 0; d < r._howls.length; d++)
                            if (!r._howls[d]._webAudio)
                                for (var h = r._howls[d]._getSoundIds(), p = 0; p < h.length; p++) {
                                    var f = r._howls[d]._soundById(h[p]);
                                    f && f._node && (f._node.volume = f._volume * s)
                                }
                        return r
                    }
                    return r._volume
                },
                mute: function(s) {
                    var r = this || t;
                    r.ctx || m(), r._muted = s, r.usingWebAudio && r.masterGain.gain.setValueAtTime(s ? 0 : r._volume, t.ctx.currentTime);
                    for (var d = 0; d < r._howls.length; d++)
                        if (!r._howls[d]._webAudio)
                            for (var h = r._howls[d]._getSoundIds(), p = 0; p < h.length; p++) {
                                var f = r._howls[d]._soundById(h[p]);
                                f && f._node && (f._node.muted = s ? true : f._muted)
                            }
                    return r
                },
                stop: function() {
                    for (var s = this || t, r = 0; r < s._howls.length; r++) s._howls[r].stop();
                    return s
                },
                unload: function() {
                    for (var s = this || t, r = s._howls.length - 1; r >= 0; r--) s._howls[r].unload();
                    return s.usingWebAudio && s.ctx && typeof s.ctx.close < "u" && (s.ctx.close(), s.ctx = null, m()), s
                },
                codecs: function(s) {
                    return (this || t)._codecs[s.replace(/^x-/, "")]
                },
                _setup: function() {
                    var s = this || t;
                    if (s.state = s.ctx && s.ctx.state || "suspended", s._autoSuspend(), !s.usingWebAudio)
                        if (typeof Audio < "u") try {
                            var r = new Audio;
                            typeof r.oncanplaythrough > "u" && (s._canPlayEvent = "canplay")
                        } catch {
                            s.noAudio = true
                        } else s.noAudio = true;
                    try {
                        var r = new Audio;
                        r.muted && (s.noAudio = true)
                    } catch {}
                    return s.noAudio || s._setupCodecs(), s
                },
                _setupCodecs: function() {
                    var s = this || t,
                        r = null;
                    try {
                        r = typeof Audio < "u" ? new Audio : null
                    } catch {
                        return s
                    }
                    if (!r || typeof r.canPlayType != "function") return s;
                    var d = r.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                        h = s._navigator ? s._navigator.userAgent : "",
                        p = h.match(/OPR\/(\d+)/g),
                        f = p && parseInt(p[0].split("/")[1], 10) < 33,
                        Q = h.indexOf("Safari") !== -1 && h.indexOf("Chrome") === -1,
                        b = h.match(/Version\/(.*?) /),
                        g = Q && b && parseInt(b[1], 10) < 15;
                    return s._codecs = {
                        mp3: !!(!f && (d || r.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                        mpeg: !!d,
                        opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                        ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                        wav: !!(r.canPlayType('audio/wav; codecs="1"') || r.canPlayType("audio/wav")).replace(/^no$/, ""),
                        aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""),
                        caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                        m4a: !!(r.canPlayType("audio/x-m4a;") || r.canPlayType("audio/m4a;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        m4b: !!(r.canPlayType("audio/x-m4b;") || r.canPlayType("audio/m4b;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        mp4: !!(r.canPlayType("audio/x-mp4;") || r.canPlayType("audio/mp4;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                        weba: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        webm: !!(!g && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                        dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                        flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(/^no$/, "")
                    }, s
                },
                _unlockAudio: function() {
                    var s = this || t;
                    if (!(s._audioUnlocked || !s.ctx)) {
                        s._audioUnlocked = false, s.autoUnlock = false, !s._mobileUnloaded && s.ctx.sampleRate !== 44100 && (s._mobileUnloaded = true, s.unload()), s._scratchBuffer = s.ctx.createBuffer(1, 1, 22050);
                        var r = function(d) {
                            for (; s._html5AudioPool.length < s.html5PoolSize;) try {
                                var h = new Audio;
                                h._unlocked = true, s._releaseHtml5Audio(h)
                            } catch {
                                s.noAudio = true;
                                break
                            }
                            for (var p = 0; p < s._howls.length; p++)
                                if (!s._howls[p]._webAudio)
                                    for (var f = s._howls[p]._getSoundIds(), Q = 0; Q < f.length; Q++) {
                                        var b = s._howls[p]._soundById(f[Q]);
                                        b && b._node && !b._node._unlocked && (b._node._unlocked = true, b._node.load())
                                    }
                            s._autoResume();
                            var g = s.ctx.createBufferSource();
                            g.buffer = s._scratchBuffer, g.connect(s.ctx.destination), typeof g.start > "u" ? g.noteOn(0) : g.start(0), typeof s.ctx.resume == "function" && s.ctx.resume(), g.onended = function() {
                                g.disconnect(0), s._audioUnlocked = true, document.removeEventListener("touchstart", r, true), document.removeEventListener("touchend", r, true), document.removeEventListener("click", r, true), document.removeEventListener("keydown", r, true);
                                for (var B = 0; B < s._howls.length; B++) s._howls[B]._emit("unlock")
                            }
                        };
                        return document.addEventListener("touchstart", r, true), document.addEventListener("touchend", r, true), document.addEventListener("click", r, true), document.addEventListener("keydown", r, true), s
                    }
                },
                _obtainHtml5Audio: function() {
                    var s = this || t;
                    if (s._html5AudioPool.length) return s._html5AudioPool.pop();
                    var r = new Audio().play();
                    return r && typeof Promise < "u" && (r instanceof Promise || typeof r.then == "function") && r.catch(function() {
                        console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                    }), new Audio
                },
                _releaseHtml5Audio: function(s) {
                    var r = this || t;
                    return s._unlocked && r._html5AudioPool.push(s), r
                },
                _autoSuspend: function() {
                    var s = this;
                    if (!(!s.autoSuspend || !s.ctx || typeof s.ctx.suspend > "u" || !t.usingWebAudio)) {
                        for (var r = 0; r < s._howls.length; r++)
                            if (s._howls[r]._webAudio) {
                                for (var d = 0; d < s._howls[r]._sounds.length; d++)
                                    if (!s._howls[r]._sounds[d]._paused) return s
                            } return s._suspendTimer && clearTimeout(s._suspendTimer), s._suspendTimer = setTimeout(function() {
                            if (s.autoSuspend) {
                                s._suspendTimer = null, s.state = "suspending";
                                var h = function() {
                                    s.state = "suspended", s._resumeAfterSuspend && (delete s._resumeAfterSuspend, s._autoResume())
                                };
                                s.ctx.suspend().then(h, h)
                            }
                        }, 3e4), s
                    }
                },
                _autoResume: function() {
                    var s = this;
                    if (!(!s.ctx || typeof s.ctx.resume > "u" || !t.usingWebAudio)) return s.state === "running" && s.ctx.state !== "interrupted" && s._suspendTimer ? (clearTimeout(s._suspendTimer), s._suspendTimer = null) : s.state === "suspended" || s.state === "running" && s.ctx.state === "interrupted" ? (s.ctx.resume().then(function() {
                        s.state = "running";
                        for (var r = 0; r < s._howls.length; r++) s._howls[r]._emit("resume")
                    }), s._suspendTimer && (clearTimeout(s._suspendTimer), s._suspendTimer = null)) : s.state === "suspending" && (s._resumeAfterSuspend = true), s
                }
            };
            var t = new o,
                e = function(s) {
                    var r = this;
                    if (!s.src || s.src.length === 0) {
                        console.error("An array of source files must be passed with any new Howl.");
                        return
                    }
                    r.init(s)
                };
            e.prototype = {
                init: function(s) {
                    var r = this;
                    return t.ctx || m(), r._autoplay = s.autoplay || false, r._format = typeof s.format != "string" ? s.format : [s.format], r._html5 = s.html5 || false, r._muted = s.mute || false, r._loop = s.loop || false, r._pool = s.pool || 5, r._preload = typeof s.preload == "boolean" || s.preload === "metadata" ? s.preload : true, r._rate = s.rate || 1, r._sprite = s.sprite || {}, r._src = typeof s.src != "string" ? s.src : [s.src], r._volume = s.volume !== void 0 ? s.volume : 1, r._xhr = {
                        method: s.xhr && s.xhr.method ? s.xhr.method : "GET",
                        headers: s.xhr && s.xhr.headers ? s.xhr.headers : null,
                        withCredentials: s.xhr && s.xhr.withCredentials ? s.xhr.withCredentials : false
                    }, r._duration = 0, r._state = "unloaded", r._sounds = [], r._endTimers = {}, r._queue = [], r._playLock = false, r._onend = s.onend ? [{
                        fn: s.onend
                    }] : [], r._onfade = s.onfade ? [{
                        fn: s.onfade
                    }] : [], r._onload = s.onload ? [{
                        fn: s.onload
                    }] : [], r._onloaderror = s.onloaderror ? [{
                        fn: s.onloaderror
                    }] : [], r._onplayerror = s.onplayerror ? [{
                        fn: s.onplayerror
                    }] : [], r._onpause = s.onpause ? [{
                        fn: s.onpause
                    }] : [], r._onplay = s.onplay ? [{
                        fn: s.onplay
                    }] : [], r._onstop = s.onstop ? [{
                        fn: s.onstop
                    }] : [], r._onmute = s.onmute ? [{
                        fn: s.onmute
                    }] : [], r._onvolume = s.onvolume ? [{
                        fn: s.onvolume
                    }] : [], r._onrate = s.onrate ? [{
                        fn: s.onrate
                    }] : [], r._onseek = s.onseek ? [{
                        fn: s.onseek
                    }] : [], r._onunlock = s.onunlock ? [{
                        fn: s.onunlock
                    }] : [], r._onresume = [], r._webAudio = t.usingWebAudio && !r._html5, typeof t.ctx < "u" && t.ctx && t.autoUnlock && t._unlockAudio(), t._howls.push(r), r._autoplay && r._queue.push({
                        event: "play",
                        action: function() {
                            r.play()
                        }
                    }), r._preload && r._preload !== "none" && r.load(), r
                },
                load: function() {
                    var s = this,
                        r = null;
                    if (t.noAudio) {
                        s._emit("loaderror", null, "No audio support.");
                        return
                    }
                    typeof s._src == "string" && (s._src = [s._src]);
                    for (var d = 0; d < s._src.length; d++) {
                        var h, p;
                        if (s._format && s._format[d]) h = s._format[d];
                        else {
                            if (p = s._src[d], typeof p != "string") {
                                s._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                continue
                            }
                            h = /^data:audio\/([^;,]+);/i.exec(p), h || (h = /\.([^.]+)$/.exec(p.split("?", 1)[0])), h && (h = h[1].toLowerCase())
                        }
                        if (h || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), h && t.codecs(h)) {
                            r = s._src[d];
                            break
                        }
                    }
                    if (!r) {
                        s._emit("loaderror", null, "No codec support for selected audio sources.");
                        return
                    }
                    return s._src = r, s._state = "loading", window.location.protocol === "https:" && r.slice(0, 5) === "http:" && (s._html5 = true, s._webAudio = false), new n(s), s._webAudio && a(s), s
                },
                play: function(s, r) {
                    var d = this,
                        h = null;
                    if (typeof s == "number") h = s, s = null;
                    else {
                        if (typeof s == "string" && d._state === "loaded" && !d._sprite[s]) return null;
                        if (typeof s > "u" && (s = "__default", !d._playLock)) {
                            for (var p = 0, f = 0; f < d._sounds.length; f++) d._sounds[f]._paused && !d._sounds[f]._ended && (p++, h = d._sounds[f]._id);
                            p === 1 ? s = null : h = null
                        }
                    }
                    var Q = h ? d._soundById(h) : d._inactiveSound();
                    if (!Q) return null;
                    if (h && !s && (s = Q._sprite || "__default"), d._state !== "loaded") {
                        Q._sprite = s, Q._ended = false;
                        var b = Q._id;
                        return d._queue.push({
                            event: "play",
                            action: function() {
                                d.play(b)
                            }
                        }), b
                    }
                    if (h && !Q._paused) return r || d._loadQueue("play"), Q._id;
                    d._webAudio && t._autoResume();
                    var g = Math.max(0, Q._seek > 0 ? Q._seek : d._sprite[s][0] / 1e3),
                        B = Math.max(0, (d._sprite[s][0] + d._sprite[s][1]) / 1e3 - g),
                        w = B * 1e3 / Math.abs(Q._rate),
                        x = d._sprite[s][0] / 1e3,
                        E = (d._sprite[s][0] + d._sprite[s][1]) / 1e3;
                    Q._sprite = s, Q._ended = false;
                    var y = function() {
                        Q._paused = false, Q._seek = g, Q._start = x, Q._stop = E, Q._loop = !!(Q._loop || d._sprite[s][2])
                    };
                    if (g >= E) {
                        d._ended(Q);
                        return
                    }
                    var T = Q._node;
                    if (d._webAudio) {
                        var S = function() {
                            d._playLock = false, y(), d._refreshBuffer(Q);
                            var N = Q._muted || d._muted ? 0 : Q._volume;
                            T.gain.setValueAtTime(N, t.ctx.currentTime), Q._playStart = t.ctx.currentTime, typeof T.bufferSource.start > "u" ? Q._loop ? T.bufferSource.noteGrainOn(0, g, 86400) : T.bufferSource.noteGrainOn(0, g, B) : Q._loop ? T.bufferSource.start(0, g, 86400) : T.bufferSource.start(0, g, B), w !== 1 / 0 && (d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), w)), r || setTimeout(function() {
                                d._emit("play", Q._id), d._loadQueue()
                            }, 0)
                        };
                        t.state === "running" && t.ctx.state !== "interrupted" ? S() : (d._playLock = true, d.once("resume", S), d._clearTimer(Q._id))
                    } else {
                        var U = function() {
                            T.currentTime = g, T.muted = Q._muted || d._muted || t._muted || T.muted, T.volume = Q._volume * t.volume(), T.playbackRate = Q._rate;
                            try {
                                var N = T.play();
                                if (N && typeof Promise < "u" && (N instanceof Promise || typeof N.then == "function") ? (d._playLock = true, y(), N.then(function() {
                                        d._playLock = false, T._unlocked = true, r ? d._loadQueue() : d._emit("play", Q._id)
                                    }).catch(function() {
                                        d._playLock = false, d._emit("playerror", Q._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), Q._ended = true, Q._paused = true
                                    })) : r || (d._playLock = false, y(), d._emit("play", Q._id)), T.playbackRate = Q._rate, T.paused) {
                                    d._emit("playerror", Q._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                    return
                                }
                                s !== "__default" || Q._loop ? d._endTimers[Q._id] = setTimeout(d._ended.bind(d, Q), w) : (d._endTimers[Q._id] = function() {
                                    d._ended(Q), T.removeEventListener("ended", d._endTimers[Q._id], false)
                                }, T.addEventListener("ended", d._endTimers[Q._id], false))
                            } catch (Y) {
                                d._emit("playerror", Q._id, Y)
                            }
                        };
                        T.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (T.src = d._src, T.load());
                        var M = window && window.ejecta || !T.readyState && t._navigator.isCocoonJS;
                        if (T.readyState >= 3 || M) U();
                        else {
                            d._playLock = true, d._state = "loading";
                            var C = function() {
                                d._state = "loaded", U(), T.removeEventListener(t._canPlayEvent, C, false)
                            };
                            T.addEventListener(t._canPlayEvent, C, false), d._clearTimer(Q._id)
                        }
                    }
                    return Q._id
                },
                pause: function(s) {
                    var r = this;
                    if (r._state !== "loaded" || r._playLock) return r._queue.push({
                        event: "pause",
                        action: function() {
                            r.pause(s)
                        }
                    }), r;
                    for (var d = r._getSoundIds(s), h = 0; h < d.length; h++) {
                        r._clearTimer(d[h]);
                        var p = r._soundById(d[h]);
                        if (p && !p._paused && (p._seek = r.seek(d[h]), p._rateSeek = 0, p._paused = true, r._stopFade(d[h]), p._node))
                            if (r._webAudio) {
                                if (!p._node.bufferSource) continue;
                                typeof p._node.bufferSource.stop > "u" ? p._node.bufferSource.noteOff(0) : p._node.bufferSource.stop(0), r._cleanBuffer(p._node)
                            } else(!isNaN(p._node.duration) || p._node.duration === 1 / 0) && p._node.pause();
                        arguments[1] || r._emit("pause", p ? p._id : null)
                    }
                    return r
                },
                stop: function(s, r) {
                    var d = this;
                    if (d._state !== "loaded" || d._playLock) return d._queue.push({
                        event: "stop",
                        action: function() {
                            d.stop(s)
                        }
                    }), d;
                    for (var h = d._getSoundIds(s), p = 0; p < h.length; p++) {
                        d._clearTimer(h[p]);
                        var f = d._soundById(h[p]);
                        f && (f._seek = f._start || 0, f._rateSeek = 0, f._paused = true, f._ended = true, d._stopFade(h[p]), f._node && (d._webAudio ? f._node.bufferSource && (typeof f._node.bufferSource.stop > "u" ? f._node.bufferSource.noteOff(0) : f._node.bufferSource.stop(0), d._cleanBuffer(f._node)) : (!isNaN(f._node.duration) || f._node.duration === 1 / 0) && (f._node.currentTime = f._start || 0, f._node.pause(), f._node.duration === 1 / 0 && d._clearSound(f._node))), r || d._emit("stop", f._id))
                    }
                    return d
                },
                mute: function(s, r) {
                    var d = this;
                    if (d._state !== "loaded" || d._playLock) return d._queue.push({
                        event: "mute",
                        action: function() {
                            d.mute(s, r)
                        }
                    }), d;
                    if (typeof r > "u")
                        if (typeof s == "boolean") d._muted = s;
                        else return d._muted;
                    for (var h = d._getSoundIds(r), p = 0; p < h.length; p++) {
                        var f = d._soundById(h[p]);
                        f && (f._muted = s, f._interval && d._stopFade(f._id), d._webAudio && f._node ? f._node.gain.setValueAtTime(s ? 0 : f._volume, t.ctx.currentTime) : f._node && (f._node.muted = t._muted ? true : s), d._emit("mute", f._id))
                    }
                    return d
                },
                volume: function() {
                    var s = this,
                        r = arguments,
                        d, h;
                    if (r.length === 0) return s._volume;
                    if (r.length === 1 || r.length === 2 && typeof r[1] > "u") {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? h = parseInt(r[0], 10) : d = parseFloat(r[0])
                    } else r.length >= 2 && (d = parseFloat(r[0]), h = parseInt(r[1], 10));
                    var Q;
                    if (typeof d < "u" && d >= 0 && d <= 1) {
                        if (s._state !== "loaded" || s._playLock) return s._queue.push({
                            event: "volume",
                            action: function() {
                                s.volume.apply(s, r)
                            }
                        }), s;
                        typeof h > "u" && (s._volume = d), h = s._getSoundIds(h);
                        for (var b = 0; b < h.length; b++) Q = s._soundById(h[b]), Q && (Q._volume = d, r[2] || s._stopFade(h[b]), s._webAudio && Q._node && !Q._muted ? Q._node.gain.setValueAtTime(d, t.ctx.currentTime) : Q._node && !Q._muted && (Q._node.volume = d * t.volume()), s._emit("volume", Q._id))
                    } else return Q = h ? s._soundById(h) : s._sounds[0], Q ? Q._volume : 0;
                    return s
                },
                fade: function(s, r, d, h) {
                    var p = this;
                    if (p._state !== "loaded" || p._playLock) return p._queue.push({
                        event: "fade",
                        action: function() {
                            p.fade(s, r, d, h)
                        }
                    }), p;
                    s = Math.min(Math.max(0, parseFloat(s)), 1), r = Math.min(Math.max(0, parseFloat(r)), 1), d = parseFloat(d), p.volume(s, h);
                    for (var f = p._getSoundIds(h), Q = 0; Q < f.length; Q++) {
                        var b = p._soundById(f[Q]);
                        if (b) {
                            if (h || p._stopFade(f[Q]), p._webAudio && !b._muted) {
                                var g = t.ctx.currentTime,
                                    B = g + d / 1e3;
                                b._volume = s, b._node.gain.setValueAtTime(s, g), b._node.gain.linearRampToValueAtTime(r, B)
                            }
                            p._startFadeInterval(b, s, r, d, f[Q], typeof h > "u")
                        }
                    }
                    return p
                },
                _startFadeInterval: function(s, r, d, h, p, f) {
                    var Q = this,
                        b = r,
                        g = d - r,
                        B = Math.abs(g / .01),
                        w = Math.max(4, B > 0 ? h / B : h),
                        x = Date.now();
                    s._fadeTo = d, s._interval = setInterval(function() {
                        var E = (Date.now() - x) / h;
                        x = Date.now(), b += g * E, b = Math.round(b * 100) / 100, g < 0 ? b = Math.max(d, b) : b = Math.min(d, b), Q._webAudio ? s._volume = b : Q.volume(b, s._id, true), f && (Q._volume = b), (d < r && b <= d || d > r && b >= d) && (clearInterval(s._interval), s._interval = null, s._fadeTo = null, Q.volume(d, s._id), Q._emit("fade", s._id))
                    }, w)
                },
                _stopFade: function(s) {
                    var r = this,
                        d = r._soundById(s);
                    return d && d._interval && (r._webAudio && d._node.gain.cancelScheduledValues(t.ctx.currentTime), clearInterval(d._interval), d._interval = null, r.volume(d._fadeTo, s), d._fadeTo = null, r._emit("fade", s)), r
                },
                loop: function() {
                    var s = this,
                        r = arguments,
                        d, h, p;
                    if (r.length === 0) return s._loop;
                    if (r.length === 1)
                        if (typeof r[0] == "boolean") d = r[0], s._loop = d;
                        else return p = s._soundById(parseInt(r[0], 10)), p ? p._loop : false;
                    else r.length === 2 && (d = r[0], h = parseInt(r[1], 10));
                    for (var f = s._getSoundIds(h), Q = 0; Q < f.length; Q++) p = s._soundById(f[Q]), p && (p._loop = d, s._webAudio && p._node && p._node.bufferSource && (p._node.bufferSource.loop = d, d && (p._node.bufferSource.loopStart = p._start || 0, p._node.bufferSource.loopEnd = p._stop, s.playing(f[Q]) && (s.pause(f[Q], true), s.play(f[Q], true)))));
                    return s
                },
                rate: function() {
                    var s = this,
                        r = arguments,
                        d, h;
                    if (r.length === 0) h = s._sounds[0]._id;
                    else if (r.length === 1) {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? h = parseInt(r[0], 10) : d = parseFloat(r[0])
                    } else r.length === 2 && (d = parseFloat(r[0]), h = parseInt(r[1], 10));
                    var Q;
                    if (typeof d == "number") {
                        if (s._state !== "loaded" || s._playLock) return s._queue.push({
                            event: "rate",
                            action: function() {
                                s.rate.apply(s, r)
                            }
                        }), s;
                        typeof h > "u" && (s._rate = d), h = s._getSoundIds(h);
                        for (var b = 0; b < h.length; b++)
                            if (Q = s._soundById(h[b]), Q) {
                                s.playing(h[b]) && (Q._rateSeek = s.seek(h[b]), Q._playStart = s._webAudio ? t.ctx.currentTime : Q._playStart), Q._rate = d, s._webAudio && Q._node && Q._node.bufferSource ? Q._node.bufferSource.playbackRate.setValueAtTime(d, t.ctx.currentTime) : Q._node && (Q._node.playbackRate = d);
                                var g = s.seek(h[b]),
                                    B = (s._sprite[Q._sprite][0] + s._sprite[Q._sprite][1]) / 1e3 - g,
                                    w = B * 1e3 / Math.abs(Q._rate);
                                (s._endTimers[h[b]] || !Q._paused) && (s._clearTimer(h[b]), s._endTimers[h[b]] = setTimeout(s._ended.bind(s, Q), w)), s._emit("rate", Q._id)
                            }
                    } else return Q = s._soundById(h), Q ? Q._rate : s._rate;
                    return s
                },
                seek: function() {
                    var s = this,
                        r = arguments,
                        d, h;
                    if (r.length === 0) s._sounds.length && (h = s._sounds[0]._id);
                    else if (r.length === 1) {
                        var p = s._getSoundIds(),
                            f = p.indexOf(r[0]);
                        f >= 0 ? h = parseInt(r[0], 10) : s._sounds.length && (h = s._sounds[0]._id, d = parseFloat(r[0]))
                    } else r.length === 2 && (d = parseFloat(r[0]), h = parseInt(r[1], 10));
                    if (typeof h > "u") return 0;
                    if (typeof d == "number" && (s._state !== "loaded" || s._playLock)) return s._queue.push({
                        event: "seek",
                        action: function() {
                            s.seek.apply(s, r)
                        }
                    }), s;
                    var Q = s._soundById(h);
                    if (Q)
                        if (typeof d == "number" && d >= 0) {
                            var b = s.playing(h);
                            b && s.pause(h, true), Q._seek = d, Q._ended = false, s._clearTimer(h), !s._webAudio && Q._node && !isNaN(Q._node.duration) && (Q._node.currentTime = d);
                            var g = function() {
                                b && s.play(h, true), s._emit("seek", h)
                            };
                            if (b && !s._webAudio) {
                                var B = function() {
                                    s._playLock ? setTimeout(B, 0) : g()
                                };
                                setTimeout(B, 0)
                            } else g()
                        } else if (s._webAudio) {
                        var w = s.playing(h) ? t.ctx.currentTime - Q._playStart : 0,
                            x = Q._rateSeek ? Q._rateSeek - Q._seek : 0;
                        return Q._seek + (x + w * Math.abs(Q._rate))
                    } else return Q._node.currentTime;
                    return s
                },
                playing: function(s) {
                    var r = this;
                    if (typeof s == "number") {
                        var d = r._soundById(s);
                        return d ? !d._paused : false
                    }
                    for (var h = 0; h < r._sounds.length; h++)
                        if (!r._sounds[h]._paused) return true;
                    return false
                },
                duration: function(s) {
                    var r = this,
                        d = r._duration,
                        h = r._soundById(s);
                    return h && (d = r._sprite[h._sprite][1] / 1e3), d
                },
                state: function() {
                    return this._state
                },
                unload: function() {
                    for (var s = this, r = s._sounds, d = 0; d < r.length; d++) r[d]._paused || s.stop(r[d]._id), s._webAudio || (s._clearSound(r[d]._node), r[d]._node.removeEventListener("error", r[d]._errorFn, false), r[d]._node.removeEventListener(t._canPlayEvent, r[d]._loadFn, false), r[d]._node.removeEventListener("ended", r[d]._endFn, false), t._releaseHtml5Audio(r[d]._node)), delete r[d]._node, s._clearTimer(r[d]._id);
                    var h = t._howls.indexOf(s);
                    h >= 0 && t._howls.splice(h, 1);
                    var p = true;
                    for (d = 0; d < t._howls.length; d++)
                        if (t._howls[d]._src === s._src || s._src.indexOf(t._howls[d]._src) >= 0) {
                            p = false;
                            break
                        } return i && p && delete i[s._src], t.noAudio = false, s._state = "unloaded", s._sounds = [], s = null, null
                },
                on: function(s, r, d, h) {
                    var p = this,
                        f = p["_on" + s];
                    return typeof r == "function" && f.push(h ? {
                        id: d,
                        fn: r,
                        once: h
                    } : {
                        id: d,
                        fn: r
                    }), p
                },
                off: function(s, r, d) {
                    var h = this,
                        p = h["_on" + s],
                        f = 0;
                    if (typeof r == "number" && (d = r, r = null), r || d)
                        for (f = 0; f < p.length; f++) {
                            var Q = d === p[f].id;
                            if (r === p[f].fn && Q || !r && Q) {
                                p.splice(f, 1);
                                break
                            }
                        } else if (s) h["_on" + s] = [];
                        else {
                            var b = Object.keys(h);
                            for (f = 0; f < b.length; f++) b[f].indexOf("_on") === 0 && Array.isArray(h[b[f]]) && (h[b[f]] = [])
                        } return h
                },
                once: function(s, r, d) {
                    var h = this;
                    return h.on(s, r, d, 1), h
                },
                _emit: function(s, r, d) {
                    for (var h = this, p = h["_on" + s], f = p.length - 1; f >= 0; f--)(!p[f].id || p[f].id === r || s === "load") && (setTimeout(function(Q) {
                        Q.call(this, r, d)
                    }.bind(h, p[f].fn), 0), p[f].once && h.off(s, p[f].fn, p[f].id));
                    return h._loadQueue(s), h
                },
                _loadQueue: function(s) {
                    var r = this;
                    if (r._queue.length > 0) {
                        var d = r._queue[0];
                        d.event === s && (r._queue.shift(), r._loadQueue()), s || d.action()
                    }
                    return r
                },
                _ended: function(s) {
                    var r = this,
                        d = s._sprite;
                    if (!r._webAudio && s._node && !s._node.paused && !s._node.ended && s._node.currentTime < s._stop) return setTimeout(r._ended.bind(r, s), 100), r;
                    var h = !!(s._loop || r._sprite[d][2]);
                    if (r._emit("end", s._id), !r._webAudio && h && r.stop(s._id, true).play(s._id), r._webAudio && h) {
                        r._emit("play", s._id), s._seek = s._start || 0, s._rateSeek = 0, s._playStart = t.ctx.currentTime;
                        var p = (s._stop - s._start) * 1e3 / Math.abs(s._rate);
                        r._endTimers[s._id] = setTimeout(r._ended.bind(r, s), p)
                    }
                    return r._webAudio && !h && (s._paused = true, s._ended = true, s._seek = s._start || 0, s._rateSeek = 0, r._clearTimer(s._id), r._cleanBuffer(s._node), t._autoSuspend()), !r._webAudio && !h && r.stop(s._id, true), r
                },
                _clearTimer: function(s) {
                    var r = this;
                    if (r._endTimers[s]) {
                        if (typeof r._endTimers[s] != "function") clearTimeout(r._endTimers[s]);
                        else {
                            var d = r._soundById(s);
                            d && d._node && d._node.removeEventListener("ended", r._endTimers[s], false)
                        }
                        delete r._endTimers[s]
                    }
                    return r
                },
                _soundById: function(s) {
                    for (var r = this, d = 0; d < r._sounds.length; d++)
                        if (s === r._sounds[d]._id) return r._sounds[d];
                    return null
                },
                _inactiveSound: function() {
                    var s = this;
                    s._drain();
                    for (var r = 0; r < s._sounds.length; r++)
                        if (s._sounds[r]._ended) return s._sounds[r].reset();
                    return new n(s)
                },
                _drain: function() {
                    var s = this,
                        r = s._pool,
                        d = 0,
                        h = 0;
                    if (!(s._sounds.length < r)) {
                        for (h = 0; h < s._sounds.length; h++) s._sounds[h]._ended && d++;
                        for (h = s._sounds.length - 1; h >= 0; h--) {
                            if (d <= r) return;
                            s._sounds[h]._ended && (s._webAudio && s._sounds[h]._node && s._sounds[h]._node.disconnect(0), s._sounds.splice(h, 1), d--)
                        }
                    }
                },
                _getSoundIds: function(s) {
                    var r = this;
                    if (typeof s > "u") {
                        for (var d = [], h = 0; h < r._sounds.length; h++) d.push(r._sounds[h]._id);
                        return d
                    } else return [s]
                },
                _refreshBuffer: function(s) {
                    var r = this;
                    return s._node.bufferSource = t.ctx.createBufferSource(), s._node.bufferSource.buffer = i[r._src], s._panner ? s._node.bufferSource.connect(s._panner) : s._node.bufferSource.connect(s._node), s._node.bufferSource.loop = s._loop, s._loop && (s._node.bufferSource.loopStart = s._start || 0, s._node.bufferSource.loopEnd = s._stop || 0), s._node.bufferSource.playbackRate.setValueAtTime(s._rate, t.ctx.currentTime), r
                },
                _cleanBuffer: function(s) {
                    var r = this,
                        d = t._navigator && t._navigator.vendor.indexOf("Apple") >= 0;
                    if (!s.bufferSource) return r;
                    if (t._scratchBuffer && s.bufferSource && (s.bufferSource.onended = null, s.bufferSource.disconnect(0), d)) try {
                        s.bufferSource.buffer = t._scratchBuffer
                    } catch {}
                    return s.bufferSource = null, r
                },
                _clearSound: function(s) {
                    var r = /MSIE |Trident\//.test(t._navigator && t._navigator.userAgent);
                    r || (s.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
                }
            };
            var n = function(s) {
                this._parent = s, this.init()
            };
            n.prototype = {
                init: function() {
                    var s = this,
                        r = s._parent;
                    return s._muted = r._muted, s._loop = r._loop, s._volume = r._volume, s._rate = r._rate, s._seek = 0, s._paused = true, s._ended = true, s._sprite = "__default", s._id = ++t._counter, r._sounds.push(s), s.create(), s
                },
                create: function() {
                    var s = this,
                        r = s._parent,
                        d = t._muted || s._muted || s._parent._muted ? 0 : s._volume;
                    return r._webAudio ? (s._node = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), s._node.gain.setValueAtTime(d, t.ctx.currentTime), s._node.paused = true, s._node.connect(t.masterGain)) : t.noAudio || (s._node = t._obtainHtml5Audio(), s._errorFn = s._errorListener.bind(s), s._node.addEventListener("error", s._errorFn, false), s._loadFn = s._loadListener.bind(s), s._node.addEventListener(t._canPlayEvent, s._loadFn, false), s._endFn = s._endListener.bind(s), s._node.addEventListener("ended", s._endFn, false), s._node.src = r._src, s._node.preload = r._preload === true ? "auto" : r._preload, s._node.volume = d * t.volume(), s._node.load()), s
                },
                reset: function() {
                    var s = this,
                        r = s._parent;
                    return s._muted = r._muted, s._loop = r._loop, s._volume = r._volume, s._rate = r._rate, s._seek = 0, s._rateSeek = 0, s._paused = true, s._ended = true, s._sprite = "__default", s._id = ++t._counter, s
                },
                _errorListener: function() {
                    var s = this;
                    s._parent._emit("loaderror", s._id, s._node.error ? s._node.error.code : 0), s._node.removeEventListener("error", s._errorFn, false)
                },
                _loadListener: function() {
                    var s = this,
                        r = s._parent;
                    r._duration = Math.ceil(s._node.duration * 10) / 10, Object.keys(r._sprite).length === 0 && (r._sprite = {
                        __default: [0, r._duration * 1e3]
                    }), r._state !== "loaded" && (r._state = "loaded", r._emit("load"), r._loadQueue()), s._node.removeEventListener(t._canPlayEvent, s._loadFn, false)
                },
                _endListener: function() {
                    var s = this,
                        r = s._parent;
                    r._duration === 1 / 0 && (r._duration = Math.ceil(s._node.duration * 10) / 10, r._sprite.__default[1] === 1 / 0 && (r._sprite.__default[1] = r._duration * 1e3), r._ended(s)), s._node.removeEventListener("ended", s._endFn, false)
                }
            };
            var i = {},
                a = function(s) {
                    var r = s._src;
                    if (i[r]) {
                        s._duration = i[r].duration, u(s);
                        return
                    }
                    if (/^data:[^;]+;base64,/.test(r)) {
                        for (var d = atob(r.split(",")[1]), h = new Uint8Array(d.length), p = 0; p < d.length; ++p) h[p] = d.charCodeAt(p);
                        c(h.buffer, s)
                    } else {
                        var f = new XMLHttpRequest;
                        f.open(s._xhr.method, r, true), f.withCredentials = s._xhr.withCredentials, f.responseType = "arraybuffer", s._xhr.headers && Object.keys(s._xhr.headers).forEach(function(Q) {
                            f.setRequestHeader(Q, s._xhr.headers[Q])
                        }), f.onload = function() {
                            var Q = (f.status + "")[0];
                            if (Q !== "0" && Q !== "2" && Q !== "3") {
                                s._emit("loaderror", null, "Failed loading audio file with status: " + f.status + ".");
                                return
                            }
                            c(f.response, s)
                        }, f.onerror = function() {
                            s._webAudio && (s._html5 = true, s._webAudio = false, s._sounds = [], delete i[r], s.load())
                        }, l(f)
                    }
                },
                l = function(s) {
                    try {
                        s.send()
                    } catch {
                        s.onerror()
                    }
                },
                c = function(s, r) {
                    var d = function() {
                            r._emit("loaderror", null, "Decoding audio data failed.")
                        },
                        h = function(p) {
                            p && r._sounds.length > 0 ? (i[r._src] = p, u(r, p)) : d()
                        };
                    typeof Promise < "u" && t.ctx.decodeAudioData.length === 1 ? t.ctx.decodeAudioData(s).then(h).catch(d) : t.ctx.decodeAudioData(s, h, d)
                },
                u = function(s, r) {
                    r && !s._duration && (s._duration = r.duration), Object.keys(s._sprite).length === 0 && (s._sprite = {
                        __default: [0, s._duration * 1e3]
                    }), s._state !== "loaded" && (s._state = "loaded", s._emit("load"), s._loadQueue())
                },
                m = function() {
                    if (t.usingWebAudio) {
                        try {
                            typeof AudioContext < "u" ? t.ctx = new AudioContext : typeof webkitAudioContext < "u" ? t.ctx = new webkitAudioContext : t.usingWebAudio = false
                        } catch {
                            t.usingWebAudio = false
                        }
                        t.ctx || (t.usingWebAudio = false);
                        var s = /iP(hone|od|ad)/.test(t._navigator && t._navigator.platform),
                            r = t._navigator && t._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                            d = r ? parseInt(r[1], 10) : null;
                        if (s && d && d < 9) {
                            var h = /safari/.test(t._navigator && t._navigator.userAgent.toLowerCase());
                            t._navigator && !h && (t.usingWebAudio = false)
                        }
                        t.usingWebAudio && (t.masterGain = typeof t.ctx.createGain > "u" ? t.ctx.createGainNode() : t.ctx.createGain(), t.masterGain.gain.setValueAtTime(t._muted ? 0 : t._volume, t.ctx.currentTime), t.masterGain.connect(t.ctx.destination)), t._setup()
                    }
                };
            typeof define == "function" && define.amd && define([], function() {
                return {
                    Howler: t,
                    Howl: e
                }
            }), typeof Xe < "u" && (Xe.Howler = t, Xe.Howl = e), typeof global < "u" ? (global.HowlerGlobal = o, global.Howler = t, global.Howl = e, global.Sound = n) : typeof window < "u" && (window.HowlerGlobal = o, window.Howler = t, window.Howl = e, window.Sound = n)
        })();
        (function() {
            "use strict";
            HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(t) {
                var e = this;
                if (!e.ctx || !e.ctx.listener) return e;
                for (var n = e._howls.length - 1; n >= 0; n--) e._howls[n].stereo(t);
                return e
            }, HowlerGlobal.prototype.pos = function(t, e, n) {
                var i = this;
                if (!i.ctx || !i.ctx.listener) return i;
                if (e = typeof e != "number" ? i._pos[1] : e, n = typeof n != "number" ? i._pos[2] : n, typeof t == "number") i._pos = [t, e, n], typeof i.ctx.listener.positionX < "u" ? (i.ctx.listener.positionX.setTargetAtTime(i._pos[0], Howler.ctx.currentTime, .1), i.ctx.listener.positionY.setTargetAtTime(i._pos[1], Howler.ctx.currentTime, .1), i.ctx.listener.positionZ.setTargetAtTime(i._pos[2], Howler.ctx.currentTime, .1)) : i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]);
                else return i._pos;
                return i
            }, HowlerGlobal.prototype.orientation = function(t, e, n, i, a, l) {
                var c = this;
                if (!c.ctx || !c.ctx.listener) return c;
                var u = c._orientation;
                if (e = typeof e != "number" ? u[1] : e, n = typeof n != "number" ? u[2] : n, i = typeof i != "number" ? u[3] : i, a = typeof a != "number" ? u[4] : a, l = typeof l != "number" ? u[5] : l, typeof t == "number") c._orientation = [t, e, n, i, a, l], typeof c.ctx.listener.forwardX < "u" ? (c.ctx.listener.forwardX.setTargetAtTime(t, Howler.ctx.currentTime, .1), c.ctx.listener.forwardY.setTargetAtTime(e, Howler.ctx.currentTime, .1), c.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1), c.ctx.listener.upX.setTargetAtTime(i, Howler.ctx.currentTime, .1), c.ctx.listener.upY.setTargetAtTime(a, Howler.ctx.currentTime, .1), c.ctx.listener.upZ.setTargetAtTime(l, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(t, e, n, i, a, l);
                else return u;
                return c
            }, Howl.prototype.init = function(t) {
                return function(e) {
                    var n = this;
                    return n._orientation = e.orientation || [1, 0, 0], n._stereo = e.stereo || null, n._pos = e.pos || null, n._pannerAttr = {
                        coneInnerAngle: typeof e.coneInnerAngle < "u" ? e.coneInnerAngle : 360,
                        coneOuterAngle: typeof e.coneOuterAngle < "u" ? e.coneOuterAngle : 360,
                        coneOuterGain: typeof e.coneOuterGain < "u" ? e.coneOuterGain : 0,
                        distanceModel: typeof e.distanceModel < "u" ? e.distanceModel : "inverse",
                        maxDistance: typeof e.maxDistance < "u" ? e.maxDistance : 1e4,
                        panningModel: typeof e.panningModel < "u" ? e.panningModel : "HRTF",
                        refDistance: typeof e.refDistance < "u" ? e.refDistance : 1,
                        rolloffFactor: typeof e.rolloffFactor < "u" ? e.rolloffFactor : 1
                    }, n._onstereo = e.onstereo ? [{
                        fn: e.onstereo
                    }] : [], n._onpos = e.onpos ? [{
                        fn: e.onpos
                    }] : [], n._onorientation = e.onorientation ? [{
                        fn: e.onorientation
                    }] : [], t.call(this, e)
                }
            }(Howl.prototype.init), Howl.prototype.stereo = function(t, e) {
                var n = this;
                if (!n._webAudio) return n;
                if (n._state !== "loaded") return n._queue.push({
                    event: "stereo",
                    action: function() {
                        n.stereo(t, e)
                    }
                }), n;
                var i = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
                if (typeof e > "u")
                    if (typeof t == "number") n._stereo = t, n._pos = [t, 0, 0];
                    else return n._stereo;
                for (var a = n._getSoundIds(e), l = 0; l < a.length; l++) {
                    var c = n._soundById(a[l]);
                    if (c)
                        if (typeof t == "number") c._stereo = t, c._pos = [t, 0, 0], c._node && (c._pannerAttr.panningModel = "equalpower", (!c._panner || !c._panner.pan) && o(c, i), i === "spatial" ? typeof c._panner.positionX < "u" ? (c._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.setPosition(t, 0, 0) : c._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)), n._emit("stereo", c._id);
                        else return c._stereo
                }
                return n
            }, Howl.prototype.pos = function(t, e, n, i) {
                var a = this;
                if (!a._webAudio) return a;
                if (a._state !== "loaded") return a._queue.push({
                    event: "pos",
                    action: function() {
                        a.pos(t, e, n, i)
                    }
                }), a;
                if (e = typeof e != "number" ? 0 : e, n = typeof n != "number" ? -.5 : n, typeof i > "u")
                    if (typeof t == "number") a._pos = [t, e, n];
                    else return a._pos;
                for (var l = a._getSoundIds(i), c = 0; c < l.length; c++) {
                    var u = a._soundById(l[c]);
                    if (u)
                        if (typeof t == "number") u._pos = [t, e, n], u._node && ((!u._panner || u._panner.pan) && o(u, "spatial"), typeof u._panner.positionX < "u" ? (u._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), u._panner.positionY.setValueAtTime(e, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(n, Howler.ctx.currentTime)) : u._panner.setPosition(t, e, n)), a._emit("pos", u._id);
                        else return u._pos
                }
                return a
            }, Howl.prototype.orientation = function(t, e, n, i) {
                var a = this;
                if (!a._webAudio) return a;
                if (a._state !== "loaded") return a._queue.push({
                    event: "orientation",
                    action: function() {
                        a.orientation(t, e, n, i)
                    }
                }), a;
                if (e = typeof e != "number" ? a._orientation[1] : e, n = typeof n != "number" ? a._orientation[2] : n, typeof i > "u")
                    if (typeof t == "number") a._orientation = [t, e, n];
                    else return a._orientation;
                for (var l = a._getSoundIds(i), c = 0; c < l.length; c++) {
                    var u = a._soundById(l[c]);
                    if (u)
                        if (typeof t == "number") u._orientation = [t, e, n], u._node && (u._panner || (u._pos || (u._pos = a._pos || [0, 0, -.5]), o(u, "spatial")), typeof u._panner.orientationX < "u" ? (u._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), u._panner.orientationY.setValueAtTime(e, Howler.ctx.currentTime), u._panner.orientationZ.setValueAtTime(n, Howler.ctx.currentTime)) : u._panner.setOrientation(t, e, n)), a._emit("orientation", u._id);
                        else return u._orientation
                }
                return a
            }, Howl.prototype.pannerAttr = function() {
                var t = this,
                    e = arguments,
                    n, i, a;
                if (!t._webAudio) return t;
                if (e.length === 0) return t._pannerAttr;
                if (e.length === 1)
                    if (typeof e[0] == "object") n = e[0], typeof i > "u" && (n.pannerAttr || (n.pannerAttr = {
                        coneInnerAngle: n.coneInnerAngle,
                        coneOuterAngle: n.coneOuterAngle,
                        coneOuterGain: n.coneOuterGain,
                        distanceModel: n.distanceModel,
                        maxDistance: n.maxDistance,
                        refDistance: n.refDistance,
                        rolloffFactor: n.rolloffFactor,
                        panningModel: n.panningModel
                    }), t._pannerAttr = {
                        coneInnerAngle: typeof n.pannerAttr.coneInnerAngle < "u" ? n.pannerAttr.coneInnerAngle : t._coneInnerAngle,
                        coneOuterAngle: typeof n.pannerAttr.coneOuterAngle < "u" ? n.pannerAttr.coneOuterAngle : t._coneOuterAngle,
                        coneOuterGain: typeof n.pannerAttr.coneOuterGain < "u" ? n.pannerAttr.coneOuterGain : t._coneOuterGain,
                        distanceModel: typeof n.pannerAttr.distanceModel < "u" ? n.pannerAttr.distanceModel : t._distanceModel,
                        maxDistance: typeof n.pannerAttr.maxDistance < "u" ? n.pannerAttr.maxDistance : t._maxDistance,
                        refDistance: typeof n.pannerAttr.refDistance < "u" ? n.pannerAttr.refDistance : t._refDistance,
                        rolloffFactor: typeof n.pannerAttr.rolloffFactor < "u" ? n.pannerAttr.rolloffFactor : t._rolloffFactor,
                        panningModel: typeof n.pannerAttr.panningModel < "u" ? n.pannerAttr.panningModel : t._panningModel
                    });
                    else return a = t._soundById(parseInt(e[0], 10)), a ? a._pannerAttr : t._pannerAttr;
                else e.length === 2 && (n = e[0], i = parseInt(e[1], 10));
                for (var l = t._getSoundIds(i), c = 0; c < l.length; c++)
                    if (a = t._soundById(l[c]), a) {
                        var u = a._pannerAttr;
                        u = {
                            coneInnerAngle: typeof n.coneInnerAngle < "u" ? n.coneInnerAngle : u.coneInnerAngle,
                            coneOuterAngle: typeof n.coneOuterAngle < "u" ? n.coneOuterAngle : u.coneOuterAngle,
                            coneOuterGain: typeof n.coneOuterGain < "u" ? n.coneOuterGain : u.coneOuterGain,
                            distanceModel: typeof n.distanceModel < "u" ? n.distanceModel : u.distanceModel,
                            maxDistance: typeof n.maxDistance < "u" ? n.maxDistance : u.maxDistance,
                            refDistance: typeof n.refDistance < "u" ? n.refDistance : u.refDistance,
                            rolloffFactor: typeof n.rolloffFactor < "u" ? n.rolloffFactor : u.rolloffFactor,
                            panningModel: typeof n.panningModel < "u" ? n.panningModel : u.panningModel
                        };
                        var m = a._panner;
                        m || (a._pos || (a._pos = t._pos || [0, 0, -.5]), o(a, "spatial"), m = a._panner), m.coneInnerAngle = u.coneInnerAngle, m.coneOuterAngle = u.coneOuterAngle, m.coneOuterGain = u.coneOuterGain, m.distanceModel = u.distanceModel, m.maxDistance = u.maxDistance, m.refDistance = u.refDistance, m.rolloffFactor = u.rolloffFactor, m.panningModel = u.panningModel
                    } return t
            }, Sound.prototype.init = function(t) {
                return function() {
                    var e = this,
                        n = e._parent;
                    e._orientation = n._orientation, e._stereo = n._stereo, e._pos = n._pos, e._pannerAttr = n._pannerAttr, t.call(this), e._stereo ? n.stereo(e._stereo) : e._pos && n.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
                }
            }(Sound.prototype.init), Sound.prototype.reset = function(t) {
                return function() {
                    var e = this,
                        n = e._parent;
                    return e._orientation = n._orientation, e._stereo = n._stereo, e._pos = n._pos, e._pannerAttr = n._pannerAttr, e._stereo ? n.stereo(e._stereo) : e._pos ? n.pos(e._pos[0], e._pos[1], e._pos[2], e._id) : e._panner && (e._panner.disconnect(0), e._panner = void 0, n._refreshBuffer(e)), t.call(this)
                }
            }(Sound.prototype.reset);
            var o = function(t, e) {
                e = e || "spatial", e === "spatial" ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.panningModel = t._pannerAttr.panningModel, typeof t._panner.positionX < "u" ? (t._panner.positionX.setValueAtTime(t._pos[0], Howler.ctx.currentTime), t._panner.positionY.setValueAtTime(t._pos[1], Howler.ctx.currentTime), t._panner.positionZ.setValueAtTime(t._pos[2], Howler.ctx.currentTime)) : t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), typeof t._panner.orientationX < "u" ? (t._panner.orientationX.setValueAtTime(t._orientation[0], Howler.ctx.currentTime), t._panner.orientationY.setValueAtTime(t._orientation[1], Howler.ctx.currentTime), t._panner.orientationZ.setValueAtTime(t._orientation[2], Howler.ctx.currentTime)) : t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.setValueAtTime(t._stereo, Howler.ctx.currentTime)), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, true).play(t._id, true)
            }
        })()
    });
    var lo = qn((ro, Jn) => {
        (function(o) {
            typeof ro == "object" && typeof Jn < "u" ? Jn.exports = o() : typeof define == "function" && define.amd ? define([], o) : (typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : this).basicScroll = o()
        })(function() {
            return function o(t, e, n) {
                function i(c, u) {
                    if (!e[c]) {
                        if (!t[c]) {
                            var m = typeof xt == "function" && xt;
                            if (!u && m) return m(c, true);
                            if (a) return a(c, true);
                            var s = new Error("Cannot find module '" + c + "'");
                            throw s.code = "MODULE_NOT_FOUND", s
                        }
                        var r = e[c] = {
                            exports: {}
                        };
                        t[c][0].call(r.exports, function(d) {
                            return i(t[c][1][d] || d)
                        }, r, r.exports, o, t, e, n)
                    }
                    return e[c].exports
                }
                for (var a = typeof xt == "function" && xt, l = 0; l < n.length; l++) i(n[l]);
                return i
            }({
                1: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 2.5949095;
                        return (n *= 2) < 1 ? n * n * ((i + 1) * n - i) * .5 : .5 * ((n -= 2) * n * ((i + 1) * n + i) + 2)
                    }
                }, {}],
                2: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 1.70158;
                        return n * n * ((i + 1) * n - i)
                    }
                }, {}],
                3: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = 1.70158;
                        return --n * n * ((i + 1) * n + i) + 1
                    }
                }, {}],
                4: [function(o, t, e) {
                    var n = o("./bounce-out");
                    t.exports = function(i) {
                        return i < .5 ? .5 * (1 - n(1 - 2 * i)) : .5 * n(2 * i - 1) + .5
                    }
                }, {
                    "./bounce-out": 6
                }],
                5: [function(o, t, e) {
                    var n = o("./bounce-out");
                    t.exports = function(i) {
                        return 1 - n(1 - i)
                    }
                }, {
                    "./bounce-out": 6
                }],
                6: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = n * n;
                        return n < 4 / 11 ? 7.5625 * i : n < 8 / 11 ? 9.075 * i - 9.9 * n + 3.4 : n < .9 ? 4356 / 361 * i - 35442 / 1805 * n + 16061 / 1805 : 10.8 * n * n - 20.52 * n + 10.72
                    }
                }, {}],
                7: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
                    }
                }, {}],
                8: [function(o, t, e) {
                    t.exports = function(n) {
                        return 1 - Math.sqrt(1 - n * n)
                    }
                }, {}],
                9: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sqrt(1 - --n * n)
                    }
                }, {}],
                10: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? 4 * n * n * n : .5 * Math.pow(2 * n - 2, 3) + 1
                    }
                }, {}],
                11: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n * n
                    }
                }, {}],
                12: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = n - 1;
                        return i * i * i + 1
                    }
                }, {}],
                13: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? .5 * Math.sin(13 * Math.PI / 2 * 2 * n) * Math.pow(2, 10 * (2 * n - 1)) : .5 * Math.sin(-13 * Math.PI / 2 * (2 * n - 1 + 1)) * Math.pow(2, -10 * (2 * n - 1)) + 1
                    }
                }, {}],
                14: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(13 * n * Math.PI / 2) * Math.pow(2, 10 * (n - 1))
                    }
                }, {}],
                15: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(-13 * (n + 1) * Math.PI / 2) * Math.pow(2, -10 * n) + 1
                    }
                }, {}],
                16: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 0 || n === 1 ? n : n < .5 ? .5 * Math.pow(2, 20 * n - 10) : -.5 * Math.pow(2, 10 - 20 * n) + 1
                    }
                }, {}],
                17: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 0 ? n : Math.pow(2, 10 * (n - 1))
                    }
                }, {}],
                18: [function(o, t, e) {
                    t.exports = function(n) {
                        return n === 1 ? n : 1 - Math.pow(2, -10 * n)
                    }
                }, {}],
                19: [function(o, t, e) {
                    t.exports = {
                        backInOut: o("./back-in-out"),
                        backIn: o("./back-in"),
                        backOut: o("./back-out"),
                        bounceInOut: o("./bounce-in-out"),
                        bounceIn: o("./bounce-in"),
                        bounceOut: o("./bounce-out"),
                        circInOut: o("./circ-in-out"),
                        circIn: o("./circ-in"),
                        circOut: o("./circ-out"),
                        cubicInOut: o("./cubic-in-out"),
                        cubicIn: o("./cubic-in"),
                        cubicOut: o("./cubic-out"),
                        elasticInOut: o("./elastic-in-out"),
                        elasticIn: o("./elastic-in"),
                        elasticOut: o("./elastic-out"),
                        expoInOut: o("./expo-in-out"),
                        expoIn: o("./expo-in"),
                        expoOut: o("./expo-out"),
                        linear: o("./linear"),
                        quadInOut: o("./quad-in-out"),
                        quadIn: o("./quad-in"),
                        quadOut: o("./quad-out"),
                        quartInOut: o("./quart-in-out"),
                        quartIn: o("./quart-in"),
                        quartOut: o("./quart-out"),
                        quintInOut: o("./quint-in-out"),
                        quintIn: o("./quint-in"),
                        quintOut: o("./quint-out"),
                        sineInOut: o("./sine-in-out"),
                        sineIn: o("./sine-in"),
                        sineOut: o("./sine-out")
                    }
                }, {
                    "./back-in": 2,
                    "./back-in-out": 1,
                    "./back-out": 3,
                    "./bounce-in": 5,
                    "./bounce-in-out": 4,
                    "./bounce-out": 6,
                    "./circ-in": 8,
                    "./circ-in-out": 7,
                    "./circ-out": 9,
                    "./cubic-in": 11,
                    "./cubic-in-out": 10,
                    "./cubic-out": 12,
                    "./elastic-in": 14,
                    "./elastic-in-out": 13,
                    "./elastic-out": 15,
                    "./expo-in": 17,
                    "./expo-in-out": 16,
                    "./expo-out": 18,
                    "./linear": 20,
                    "./quad-in": 22,
                    "./quad-in-out": 21,
                    "./quad-out": 23,
                    "./quart-in": 25,
                    "./quart-in-out": 24,
                    "./quart-out": 26,
                    "./quint-in": 28,
                    "./quint-in-out": 27,
                    "./quint-out": 29,
                    "./sine-in": 31,
                    "./sine-in-out": 30,
                    "./sine-out": 32
                }],
                20: [function(o, t, e) {
                    t.exports = function(n) {
                        return n
                    }
                }, {}],
                21: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n /= .5) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
                    }
                }, {}],
                22: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n
                    }
                }, {}],
                23: [function(o, t, e) {
                    t.exports = function(n) {
                        return -n * (n - 2)
                    }
                }, {}],
                24: [function(o, t, e) {
                    t.exports = function(n) {
                        return n < .5 ? 8 * Math.pow(n, 4) : -8 * Math.pow(n - 1, 4) + 1
                    }
                }, {}],
                25: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.pow(n, 4)
                    }
                }, {}],
                26: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.pow(n - 1, 3) * (1 - n) + 1
                    }
                }, {}],
                27: [function(o, t, e) {
                    t.exports = function(n) {
                        return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
                    }
                }, {}],
                28: [function(o, t, e) {
                    t.exports = function(n) {
                        return n * n * n * n * n
                    }
                }, {}],
                29: [function(o, t, e) {
                    t.exports = function(n) {
                        return --n * n * n * n * n + 1
                    }
                }, {}],
                30: [function(o, t, e) {
                    t.exports = function(n) {
                        return -.5 * (Math.cos(Math.PI * n) - 1)
                    }
                }, {}],
                31: [function(o, t, e) {
                    t.exports = function(n) {
                        var i = Math.cos(n * Math.PI * .5);
                        return Math.abs(i) < 1e-14 ? 1 : 1 - i
                    }
                }, {}],
                32: [function(o, t, e) {
                    t.exports = function(n) {
                        return Math.sin(n * Math.PI / 2)
                    }
                }, {}],
                33: [function(o, t, e) {
                    t.exports = function(n, i) {
                        i || (i = [0, ""]), n = String(n);
                        var a = parseFloat(n, 10);
                        return i[0] = a, i[1] = n.match(/[\d.\-\+]*\s*(.*)/)[1] || "", i
                    }
                }, {}],
                34: [function(o, t, e) {
                    "use strict";
                    Object.defineProperty(e, "__esModule", {
                        value: true
                    }), e.create = void 0;
                    var n = a(o("parse-unit")),
                        i = a(o("eases"));

                    function a(x) {
                        return x && x.__esModule ? x : {
                            default: x
                        }
                    }

                    function l(x) {
                        return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(E) {
                            return typeof E
                        } : function(E) {
                            return E && typeof Symbol == "function" && E.constructor === Symbol && E !== Symbol.prototype ? "symbol" : typeof E
                        })(x)
                    }
                    var c, u, m, s = [],
                        r = typeof window < "u",
                        d = function() {
                            return (document.scrollingElement || document.documentElement).scrollTop
                        },
                        h = function() {
                            return window.innerHeight || window.outerHeight
                        },
                        p = function(x) {
                            return isNaN((0, n.default)(x)[0]) === false
                        },
                        f = function(x) {
                            var E = (0, n.default)(x);
                            return {
                                value: E[0],
                                unit: E[1]
                            }
                        },
                        Q = function(x) {
                            return String(x).match(/^[a-z]+-[a-z]+$/) !== null
                        },
                        b = function(x, E) {
                            return x === true ? E.elem : x instanceof HTMLElement ? E.direct : E.global
                        },
                        g = function(x, E) {
                            var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : d(),
                                T = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : h(),
                                S = E.getBoundingClientRect(),
                                U = x.match(/^[a-z]+/)[0],
                                M = x.match(/[a-z]+$/)[0],
                                C = 0;
                            return M === "top" && (C -= 0), M === "middle" && (C -= T / 2), M === "bottom" && (C -= T), U === "top" && (C += S.top + y), U === "middle" && (C += S.top + y + S.height / 2), U === "bottom" && (C += S.top + y + S.height), "".concat(C, "px")
                        },
                        B = function(x) {
                            var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d(),
                                y = x.getData(),
                                T = y.to.value - y.from.value,
                                S = E - y.from.value,
                                U = S / (T / 100),
                                M = Math.min(Math.max(U, 0), 100),
                                C = b(y.direct, {
                                    global: document.documentElement,
                                    elem: y.elem,
                                    direct: y.direct
                                }),
                                N = Object.keys(y.props).reduce(function(At, Jt) {
                                    var lt = y.props[Jt],
                                        Ht = lt.from.unit || lt.to.unit,
                                        uo = lt.from.value - lt.to.value,
                                        ho = lt.timing(M / 100),
                                        mo = lt.from.value - uo * ho,
                                        po = Math.round(1e4 * mo) / 1e4;
                                    return At[Jt] = po + Ht, At
                                }, {}),
                                Y = U >= 0 && U <= 100,
                                Se = U < 0 || U > 100;
                            return Y === true && y.inside(x, U, N), Se === true && y.outside(x, U, N), {
                                elem: C,
                                props: N
                            }
                        },
                        w = function(x, E) {
                            Object.keys(E).forEach(function(y) {
                                return function(T, S) {
                                    T.style.setProperty(S.key, S.value)
                                }(x, {
                                    key: y,
                                    value: E[y]
                                })
                            })
                        };
                    e.create = function(x) {
                        var E = null,
                            y = false,
                            T = {
                                isActive: function() {
                                    return y
                                },
                                getData: function() {
                                    return E
                                },
                                calculate: function() {
                                    E = function() {
                                        var U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                        if ((U = Object.assign({}, U)).inside == null && (U.inside = function() {}), U.outside == null && (U.outside = function() {}), U.direct == null && (U.direct = false), U.track == null && (U.track = true), U.props == null && (U.props = {}), U.from == null) throw new Error("Missing property `from`");
                                        if (U.to == null) throw new Error("Missing property `to`");
                                        if (typeof U.inside != "function") throw new Error("Property `inside` must be undefined or a function");
                                        if (typeof U.outside != "function") throw new Error("Property `outside` must be undefined or a function");
                                        if (typeof U.direct != "boolean" && U.direct instanceof HTMLElement == 0) throw new Error("Property `direct` must be undefined, a boolean or a DOM element/node");
                                        if (U.direct === true && U.elem == null) throw new Error("Property `elem` is required when `direct` is true");
                                        if (typeof U.track != "boolean") throw new Error("Property `track` must be undefined or a boolean");
                                        if (l(U.props) !== "object") throw new Error("Property `props` must be undefined or an object");
                                        if (U.elem == null) {
                                            if (p(U.from) === false) throw new Error("Property `from` must be a absolute value when no `elem` has been provided");
                                            if (p(U.to) === false) throw new Error("Property `to` must be a absolute value when no `elem` has been provided")
                                        } else Q(U.from) === true && (U.from = g(U.from, U.elem)), Q(U.to) === true && (U.to = g(U.to, U.elem));
                                        return U.from = f(U.from), U.to = f(U.to), U.props = Object.keys(U.props).reduce(function(M, C) {
                                            var N = Object.assign({}, U.props[C]);
                                            if (p(N.from) === false) throw new Error("Property `from` of prop must be a absolute value");
                                            if (p(N.to) === false) throw new Error("Property `from` of prop must be a absolute value");
                                            if (N.from = f(N.from), N.to = f(N.to), N.timing == null && (N.timing = i.default.linear), typeof N.timing != "string" && typeof N.timing != "function") throw new Error("Property `timing` of prop must be undefined, a string or a function");
                                            if (typeof N.timing == "string" && i.default[N.timing] == null) throw new Error("Unknown timing for property `timing` of prop");
                                            return typeof N.timing == "string" && (N.timing = i.default[N.timing]), M[C] = N, M
                                        }, {}), U
                                    }(x)
                                },
                                update: function() {
                                    var U = B(T),
                                        M = U.elem,
                                        C = U.props;
                                    return w(M, C), C
                                },
                                start: function() {
                                    y = true
                                },
                                stop: function() {
                                    y = false
                                },
                                destroy: function() {
                                    s[S] = void 0
                                }
                            },
                            S = s.push(T) - 1;
                        return T.calculate(), T
                    }, r === true ? (function x(E, y) {
                        var T = function() {
                                requestAnimationFrame(function() {
                                    return x(E, y)
                                })
                            },
                            S = function(M) {
                                return M.filter(function(C) {
                                    return C != null && C.isActive()
                                })
                            }(s);
                        if (S.length === 0) return T();
                        var U = d();
                        if (y === U) return T();
                        y = U, S.map(function(M) {
                            return B(M, U)
                        }).forEach(function(M) {
                            var C = M.elem,
                                N = M.props;
                            return w(C, N)
                        }), T()
                    }(), window.addEventListener("resize", (c = function() {
                        (function(x) {
                            return x.filter(function(E) {
                                return E != null && E.getData().track
                            })
                        })(s).forEach(function(x) {
                            x.calculate(), x.update()
                        })
                    }, u = 50, m = null, function() {
                        for (var x = arguments.length, E = new Array(x), y = 0; y < x; y++) E[y] = arguments[y];
                        clearTimeout(m), m = setTimeout(function() {
                            return c.apply(void 0, E)
                        }, u)
                    }))) : console.warn("basicScroll is not executing because you are using it in an environment without a `window` object")
                }, {
                    eases: 19,
                    "parse-unit": 33
                }]
            }, {}, [34])(34)
        })
    });
    var ke = class {
        constructor(t, e, n) {
            this.eventTarget = t, this.eventName = e, this.eventOptions = n, this.unorderedBindings = new Set
        }
        connect() {
            this.eventTarget.addEventListener(this.eventName, this, this.eventOptions)
        }
        disconnect() {
            this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions)
        }
        bindingConnected(t) {
            this.unorderedBindings.add(t)
        }
        bindingDisconnected(t) {
            this.unorderedBindings.delete(t)
        }
        handleEvent(t) {
            let e = vo(t);
            for (let n of this.bindings) {
                if (e.immediatePropagationStopped) break;
                n.handleEvent(e)
            }
        }
        hasBindings() {
            return this.unorderedBindings.size > 0
        }
        get bindings() {
            return Array.from(this.unorderedBindings).sort((t, e) => {
                let n = t.index,
                    i = e.index;
                return n < i ? -1 : n > i ? 1 : 0
            })
        }
    };

    function vo(o) {
        if ("immediatePropagationStopped" in o) return o;
        {
            let {
                stopImmediatePropagation: t
            } = o;
            return Object.assign(o, {
                immediatePropagationStopped: false,
                stopImmediatePropagation() {
                    this.immediatePropagationStopped = true, t.call(this)
                }
            })
        }
    }
    var Dispatcher = class {
            constructor(t) {
                this.application = t, this.eventListenerMaps = new Map, this.started = false
            }
            start() {
                this.started || (this.started = true, this.eventListeners.forEach(t => t.connect()))
            }
            stop() {
                this.started && (this.started = false, this.eventListeners.forEach(t => t.disconnect()))
            }
            get eventListeners() {
                return Array.from(this.eventListenerMaps.values()).reduce((t, e) => t.concat(Array.from(e.values())), [])
            }
            bindingConnected(t) {
                this.fetchEventListenerForBinding(t).bindingConnected(t)
            }
            bindingDisconnected(t, e = false) {
                this.fetchEventListenerForBinding(t).bindingDisconnected(t), e && this.clearEventListenersForBinding(t)
            }
            handleError(t, e, n = {}) {
                this.application.handleError(t, `Error ${e}`, n)
            }
            clearEventListenersForBinding(t) {
                let e = this.fetchEventListenerForBinding(t);
                e.hasBindings() || (e.disconnect(), this.removeMappedEventListenerFor(t))
            }
            removeMappedEventListenerFor(t) {
                let {
                    eventTarget: e,
                    eventName: n,
                    eventOptions: i
                } = t, a = this.fetchEventListenerMapForEventTarget(e), l = this.cacheKey(n, i);
                a.delete(l), a.size == 0 && this.eventListenerMaps.delete(e)
            }
            fetchEventListenerForBinding(t) {
                let {
                    eventTarget: e,
                    eventName: n,
                    eventOptions: i
                } = t;
                return this.fetchEventListener(e, n, i)
            }
            fetchEventListener(t, e, n) {
                let i = this.fetchEventListenerMapForEventTarget(t),
                    a = this.cacheKey(e, n),
                    l = i.get(a);
                return l || (l = this.createEventListener(t, e, n), i.set(a, l)), l
            }
            createEventListener(t, e, n) {
                let i = new ke(t, e, n);
                return this.started && i.connect(), i
            }
            fetchEventListenerMapForEventTarget(t) {
                let e = this.eventListenerMaps.get(t);
                return e || (e = new Map, this.eventListenerMaps.set(t, e)), e
            }
            cacheKey(t, e) {
                let n = [t];
                return Object.keys(e).sort().forEach(i => {
                    n.push(`${e[i]?"":"!"}${i}`)
                }), n.join(":")
            }
        },
        yo = {
            stop({
                event: o,
                value: t
            }) {
                return t && o.stopPropagation(), true
            },
            prevent({
                event: o,
                value: t
            }) {
                return t && o.preventDefault(), true
            },
            self({
                event: o,
                value: t,
                element: e
            }) {
                return t ? e === o.target : true
            }
        },
        xo = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;

    function wo(o) {
        let e = o.trim().match(xo) || [],
            n = e[2],
            i = e[3];
        return i && !["keydown", "keyup", "keypress"].includes(n) && (n += `.${i}`, i = ""), {
            eventTarget: To(e[4]),
            eventName: n,
            eventOptions: e[7] ? Eo(e[7]) : {},
            identifier: e[5],
            methodName: e[6],
            keyFilter: e[1] || i
        }
    }

    function To(o) {
        if (o == "window") return window;
        if (o == "document") return document
    }

    function Eo(o) {
        return o.split(":").reduce((t, e) => Object.assign(t, {
            [e.replace(/^!/, "")]: !/^!/.test(e)
        }), {})
    }

    function No(o) {
        if (o == window) return "window";
        if (o == document) return "document"
    }

    function ln(o) {
        return o.replace(/(?:[_-])([a-z0-9])/g, (t, e) => e.toUpperCase())
    }

    function De(o) {
        return ln(o.replace(/--/g, "-").replace(/__/g, "_"))
    }

    function Tt(o) {
        return o.charAt(0).toUpperCase() + o.slice(1)
    }

    function ci(o) {
        return o.replace(/([A-Z])/g, (t, e) => `-${e.toLowerCase()}`)
    }

    function Lo(o) {
        return o.match(/[^\s]+/g) || []
    }

    function ti(o) {
        return o != null
    }

    function _e(o, t) {
        return Object.prototype.hasOwnProperty.call(o, t)
    }
    var ei = ["meta", "ctrl", "alt", "shift"],
        Ge = class {
            constructor(t, e, n, i) {
                this.element = t, this.index = e, this.eventTarget = n.eventTarget || t, this.eventName = n.eventName || Xo(t) || Kt("missing event name"), this.eventOptions = n.eventOptions || {}, this.identifier = n.identifier || Kt("missing identifier"), this.methodName = n.methodName || Kt("missing method name"), this.keyFilter = n.keyFilter || "", this.schema = i
            }
            static forToken(t, e) {
                return new this(t.element, t.index, wo(t.content), e)
            }
            toString() {
                let t = this.keyFilter ? `.${this.keyFilter}` : "",
                    e = this.eventTargetName ? `@${this.eventTargetName}` : "";
                return `${this.eventName}${t}${e}->${this.identifier}#${this.methodName}`
            }
            shouldIgnoreKeyboardEvent(t) {
                if (!this.keyFilter) return false;
                let e = this.keyFilter.split("+");
                if (this.keyFilterDissatisfied(t, e)) return true;
                let n = e.filter(i => !ei.includes(i))[0];
                return n ? (_e(this.keyMappings, n) || Kt(`contains unknown key filter: ${this.keyFilter}`), this.keyMappings[n].toLowerCase() !== t.key.toLowerCase()) : false
            }
            shouldIgnoreMouseEvent(t) {
                if (!this.keyFilter) return false;
                let e = [this.keyFilter];
                return !!this.keyFilterDissatisfied(t, e)
            }
            get params() {
                let t = {},
                    e = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
                for (let {
                        name: n,
                        value: i
                    }
                    of Array.from(this.element.attributes)) {
                    let a = n.match(e),
                        l = a && a[1];
                    l && (t[ln(l)] = Oo(i))
                }
                return t
            }
            get eventTargetName() {
                return No(this.eventTarget)
            }
            get keyMappings() {
                return this.schema.keyMappings
            }
            keyFilterDissatisfied(t, e) {
                let [n, i, a, l] = ei.map(c => e.includes(c));
                return t.metaKey !== n || t.ctrlKey !== i || t.altKey !== a || t.shiftKey !== l
            }
        },
        ni = {
            a: () => "click",
            button: () => "click",
            form: () => "submit",
            details: () => "toggle",
            input: o => o.getAttribute("type") == "submit" ? "click" : "input",
            select: () => "change",
            textarea: () => "input"
        };

    function Xo(o) {
        let t = o.tagName.toLowerCase();
        if (t in ni) return ni[t](o)
    }

    function Kt(o) {
        throw new Error(o)
    }

    function Oo(o) {
        try {
            return JSON.parse(o)
        } catch {
            return o
        }
    }
    var Ie = class {
            constructor(t, e) {
                this.context = t, this.action = e
            }
            get index() {
                return this.action.index
            }
            get eventTarget() {
                return this.action.eventTarget
            }
            get eventOptions() {
                return this.action.eventOptions
            }
            get identifier() {
                return this.context.identifier
            }
            handleEvent(t) {
                let e = this.prepareActionEvent(t);
                this.willBeInvokedByEvent(t) && this.applyEventModifiers(e) && this.invokeWithEvent(e)
            }
            get eventName() {
                return this.action.eventName
            }
            get method() {
                let t = this.controller[this.methodName];
                if (typeof t == "function") return t;
                throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`)
            }
            applyEventModifiers(t) {
                let {
                    element: e
                } = this.action, {
                    actionDescriptorFilters: n
                } = this.context.application, {
                    controller: i
                } = this.context, a = true;
                for (let [l, c] of Object.entries(this.eventOptions))
                    if (l in n) {
                        let u = n[l];
                        a = a && u({
                            name: l,
                            value: c,
                            event: t,
                            element: e,
                            controller: i
                        })
                    } else continue;
                return a
            }
            prepareActionEvent(t) {
                return Object.assign(t, {
                    params: this.action.params
                })
            }
            invokeWithEvent(t) {
                let {
                    target: e,
                    currentTarget: n
                } = t;
                try {
                    this.method.call(this.controller, t), this.context.logDebugActivity(this.methodName, {
                        event: t,
                        target: e,
                        currentTarget: n,
                        action: this.methodName
                    })
                } catch (i) {
                    let {
                        identifier: a,
                        controller: l,
                        element: c,
                        index: u
                    } = this, m = {
                        identifier: a,
                        controller: l,
                        element: c,
                        index: u,
                        event: t
                    };
                    this.context.handleError(i, `invoking action "${this.action}"`, m)
                }
            }
            willBeInvokedByEvent(t) {
                let e = t.target;
                return t instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(t) || t instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(t) ? false : this.element === e ? true : e instanceof Element && this.element.contains(e) ? this.scope.containsElement(e) : this.scope.containsElement(this.action.element)
            }
            get controller() {
                return this.context.controller
            }
            get methodName() {
                return this.action.methodName
            }
            get element() {
                return this.scope.element
            }
            get scope() {
                return this.context.scope
            }
        },
        $t = class {
            constructor(t, e) {
                this.mutationObserverInit = {
                    attributes: true,
                    childList: true,
                    subtree: true
                }, this.element = t, this.started = false, this.delegate = e, this.elements = new Set, this.mutationObserver = new MutationObserver(n => this.processMutations(n))
            }
            start() {
                this.started || (this.started = true, this.mutationObserver.observe(this.element, this.mutationObserverInit), this.refresh())
            }
            pause(t) {
                this.started && (this.mutationObserver.disconnect(), this.started = false), t(), this.started || (this.mutationObserver.observe(this.element, this.mutationObserverInit), this.started = true)
            }
            stop() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = false)
            }
            refresh() {
                if (this.started) {
                    let t = new Set(this.matchElementsInTree());
                    for (let e of Array.from(this.elements)) t.has(e) || this.removeElement(e);
                    for (let e of Array.from(t)) this.addElement(e)
                }
            }
            processMutations(t) {
                if (this.started)
                    for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                t.type == "attributes" ? this.processAttributeChange(t.target, t.attributeName) : t.type == "childList" && (this.processRemovedNodes(t.removedNodes), this.processAddedNodes(t.addedNodes))
            }
            processAttributeChange(t, e) {
                this.elements.has(t) ? this.delegate.elementAttributeChanged && this.matchElement(t) ? this.delegate.elementAttributeChanged(t, e) : this.removeElement(t) : this.matchElement(t) && this.addElement(t)
            }
            processRemovedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e);
                    n && this.processTree(n, this.removeElement)
                }
            }
            processAddedNodes(t) {
                for (let e of Array.from(t)) {
                    let n = this.elementFromNode(e);
                    n && this.elementIsActive(n) && this.processTree(n, this.addElement)
                }
            }
            matchElement(t) {
                return this.delegate.matchElement(t)
            }
            matchElementsInTree(t = this.element) {
                return this.delegate.matchElementsInTree(t)
            }
            processTree(t, e) {
                for (let n of this.matchElementsInTree(t)) e.call(this, n)
            }
            elementFromNode(t) {
                if (t.nodeType == Node.ELEMENT_NODE) return t
            }
            elementIsActive(t) {
                return t.isConnected != this.element.isConnected ? false : this.element.contains(t)
            }
            addElement(t) {
                this.elements.has(t) || this.elementIsActive(t) && (this.elements.add(t), this.delegate.elementMatched && this.delegate.elementMatched(t))
            }
            removeElement(t) {
                this.elements.has(t) && (this.elements.delete(t), this.delegate.elementUnmatched && this.delegate.elementUnmatched(t))
            }
        },
        qt = class {
            constructor(t, e, n) {
                this.attributeName = e, this.delegate = n, this.elementObserver = new $t(t, this)
            }
            get element() {
                return this.elementObserver.element
            }
            get selector() {
                return `[${this.attributeName}]`
            }
            start() {
                this.elementObserver.start()
            }
            pause(t) {
                this.elementObserver.pause(t)
            }
            stop() {
                this.elementObserver.stop()
            }
            refresh() {
                this.elementObserver.refresh()
            }
            get started() {
                return this.elementObserver.started
            }
            matchElement(t) {
                return t.hasAttribute(this.attributeName)
            }
            matchElementsInTree(t) {
                let e = this.matchElement(t) ? [t] : [],
                    n = Array.from(t.querySelectorAll(this.selector));
                return e.concat(n)
            }
            elementMatched(t) {
                this.delegate.elementMatchedAttribute && this.delegate.elementMatchedAttribute(t, this.attributeName)
            }
            elementUnmatched(t) {
                this.delegate.elementUnmatchedAttribute && this.delegate.elementUnmatchedAttribute(t, this.attributeName)
            }
            elementAttributeChanged(t, e) {
                this.delegate.elementAttributeValueChanged && this.attributeName == e && this.delegate.elementAttributeValueChanged(t, e)
            }
        };

    function Ro(o, t, e) {
        di(o, t).add(e)
    }

    function Co(o, t, e) {
        di(o, t).delete(e), Zo(o, t)
    }

    function di(o, t) {
        let e = o.get(t);
        return e || (e = new Set, o.set(t, e)), e
    }

    function Zo(o, t) {
        let e = o.get(t);
        e != null && e.size == 0 && o.delete(t)
    }
    var it = class {
        constructor() {
            this.valuesByKey = new Map
        }
        get keys() {
            return Array.from(this.valuesByKey.keys())
        }
        get values() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e.concat(Array.from(n)), [])
        }
        get size() {
            return Array.from(this.valuesByKey.values()).reduce((e, n) => e + n.size, 0)
        }
        add(t, e) {
            Ro(this.valuesByKey, t, e)
        }
        delete(t, e) {
            Co(this.valuesByKey, t, e)
        }
        has(t, e) {
            let n = this.valuesByKey.get(t);
            return n != null && n.has(e)
        }
        hasKey(t) {
            return this.valuesByKey.has(t)
        }
        hasValue(t) {
            return Array.from(this.valuesByKey.values()).some(n => n.has(t))
        }
        getValuesForKey(t) {
            let e = this.valuesByKey.get(t);
            return e ? Array.from(e) : []
        }
        getKeysForValue(t) {
            return Array.from(this.valuesByKey).filter(([e, n]) => n.has(t)).map(([e, n]) => e)
        }
    };
    var ze = class {
            constructor(t, e, n, i) {
                this._selector = e, this.details = i, this.elementObserver = new $t(t, this), this.delegate = n, this.matchesByElement = new it
            }
            get started() {
                return this.elementObserver.started
            }
            get selector() {
                return this._selector
            }
            set selector(t) {
                this._selector = t, this.refresh()
            }
            start() {
                this.elementObserver.start()
            }
            pause(t) {
                this.elementObserver.pause(t)
            }
            stop() {
                this.elementObserver.stop()
            }
            refresh() {
                this.elementObserver.refresh()
            }
            get element() {
                return this.elementObserver.element
            }
            matchElement(t) {
                let {
                    selector: e
                } = this;
                if (e) {
                    let n = t.matches(e);
                    return this.delegate.selectorMatchElement ? n && this.delegate.selectorMatchElement(t, this.details) : n
                } else return false
            }
            matchElementsInTree(t) {
                let {
                    selector: e
                } = this;
                if (e) {
                    let n = this.matchElement(t) ? [t] : [],
                        i = Array.from(t.querySelectorAll(e)).filter(a => this.matchElement(a));
                    return n.concat(i)
                } else return []
            }
            elementMatched(t) {
                let {
                    selector: e
                } = this;
                e && this.selectorMatched(t, e)
            }
            elementUnmatched(t) {
                let e = this.matchesByElement.getKeysForValue(t);
                for (let n of e) this.selectorUnmatched(t, n)
            }
            elementAttributeChanged(t, e) {
                let {
                    selector: n
                } = this;
                if (n) {
                    let i = this.matchElement(t),
                        a = this.matchesByElement.has(n, t);
                    i && !a ? this.selectorMatched(t, n) : !i && a && this.selectorUnmatched(t, n)
                }
            }
            selectorMatched(t, e) {
                this.delegate.selectorMatched(t, e, this.details), this.matchesByElement.add(e, t)
            }
            selectorUnmatched(t, e) {
                this.delegate.selectorUnmatched(t, e, this.details), this.matchesByElement.delete(e, t)
            }
        },
        Ye = class {
            constructor(t, e) {
                this.element = t, this.delegate = e, this.started = false, this.stringMap = new Map, this.mutationObserver = new MutationObserver(n => this.processMutations(n))
            }
            start() {
                this.started || (this.started = true, this.mutationObserver.observe(this.element, {
                    attributes: true,
                    attributeOldValue: true
                }), this.refresh())
            }
            stop() {
                this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = false)
            }
            refresh() {
                if (this.started)
                    for (let t of this.knownAttributeNames) this.refreshAttribute(t, null)
            }
            processMutations(t) {
                if (this.started)
                    for (let e of t) this.processMutation(e)
            }
            processMutation(t) {
                let e = t.attributeName;
                e && this.refreshAttribute(e, t.oldValue)
            }
            refreshAttribute(t, e) {
                let n = this.delegate.getStringMapKeyForAttribute(t);
                if (n != null) {
                    this.stringMap.has(t) || this.stringMapKeyAdded(n, t);
                    let i = this.element.getAttribute(t);
                    if (this.stringMap.get(t) != i && this.stringMapValueChanged(i, n, e), i == null) {
                        let a = this.stringMap.get(t);
                        this.stringMap.delete(t), a && this.stringMapKeyRemoved(n, t, a)
                    } else this.stringMap.set(t, i)
                }
            }
            stringMapKeyAdded(t, e) {
                this.delegate.stringMapKeyAdded && this.delegate.stringMapKeyAdded(t, e)
            }
            stringMapValueChanged(t, e, n) {
                this.delegate.stringMapValueChanged && this.delegate.stringMapValueChanged(t, e, n)
            }
            stringMapKeyRemoved(t, e, n) {
                this.delegate.stringMapKeyRemoved && this.delegate.stringMapKeyRemoved(t, e, n)
            }
            get knownAttributeNames() {
                return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)))
            }
            get currentAttributeNames() {
                return Array.from(this.element.attributes).map(t => t.name)
            }
            get recordedAttributeNames() {
                return Array.from(this.stringMap.keys())
            }
        },
        te = class {
            constructor(t, e, n) {
                this.attributeObserver = new qt(t, e, this), this.delegate = n, this.tokensByElement = new it
            }
            get started() {
                return this.attributeObserver.started
            }
            start() {
                this.attributeObserver.start()
            }
            pause(t) {
                this.attributeObserver.pause(t)
            }
            stop() {
                this.attributeObserver.stop()
            }
            refresh() {
                this.attributeObserver.refresh()
            }
            get element() {
                return this.attributeObserver.element
            }
            get attributeName() {
                return this.attributeObserver.attributeName
            }
            elementMatchedAttribute(t) {
                this.tokensMatched(this.readTokensForElement(t))
            }
            elementAttributeValueChanged(t) {
                let [e, n] = this.refreshTokensForElement(t);
                this.tokensUnmatched(e), this.tokensMatched(n)
            }
            elementUnmatchedAttribute(t) {
                this.tokensUnmatched(this.tokensByElement.getValuesForKey(t))
            }
            tokensMatched(t) {
                t.forEach(e => this.tokenMatched(e))
            }
            tokensUnmatched(t) {
                t.forEach(e => this.tokenUnmatched(e))
            }
            tokenMatched(t) {
                this.delegate.tokenMatched(t), this.tokensByElement.add(t.element, t)
            }
            tokenUnmatched(t) {
                this.delegate.tokenUnmatched(t), this.tokensByElement.delete(t.element, t)
            }
            refreshTokensForElement(t) {
                let e = this.tokensByElement.getValuesForKey(t),
                    n = this.readTokensForElement(t),
                    i = Mo(e, n).findIndex(([a, l]) => !So(a, l));
                return i == -1 ? [
                    [],
                    []
                ] : [e.slice(i), n.slice(i)]
            }
            readTokensForElement(t) {
                let e = this.attributeName,
                    n = t.getAttribute(e) || "";
                return Wo(n, t, e)
            }
        };

    function Wo(o, t, e) {
        return o.trim().split(/\s+/).filter(n => n.length).map((n, i) => ({
            element: t,
            attributeName: e,
            content: n,
            index: i
        }))
    }

    function Mo(o, t) {
        let e = Math.max(o.length, t.length);
        return Array.from({
            length: e
        }, (n, i) => [o[i], t[i]])
    }

    function So(o, t) {
        return o && t && o.index == t.index && o.content == t.content
    }
    var ee = class {
            constructor(t, e, n) {
                this.tokenListObserver = new te(t, e, this), this.delegate = n, this.parseResultsByToken = new WeakMap, this.valuesByTokenByElement = new WeakMap
            }
            get started() {
                return this.tokenListObserver.started
            }
            start() {
                this.tokenListObserver.start()
            }
            stop() {
                this.tokenListObserver.stop()
            }
            refresh() {
                this.tokenListObserver.refresh()
            }
            get element() {
                return this.tokenListObserver.element
            }
            get attributeName() {
                return this.tokenListObserver.attributeName
            }
            tokenMatched(t) {
                let {
                    element: e
                } = t, {
                    value: n
                } = this.fetchParseResultForToken(t);
                n && (this.fetchValuesByTokenForElement(e).set(t, n), this.delegate.elementMatchedValue(e, n))
            }
            tokenUnmatched(t) {
                let {
                    element: e
                } = t, {
                    value: n
                } = this.fetchParseResultForToken(t);
                n && (this.fetchValuesByTokenForElement(e).delete(t), this.delegate.elementUnmatchedValue(e, n))
            }
            fetchParseResultForToken(t) {
                let e = this.parseResultsByToken.get(t);
                return e || (e = this.parseToken(t), this.parseResultsByToken.set(t, e)), e
            }
            fetchValuesByTokenForElement(t) {
                let e = this.valuesByTokenByElement.get(t);
                return e || (e = new Map, this.valuesByTokenByElement.set(t, e)), e
            }
            parseToken(t) {
                try {
                    return {
                        value: this.delegate.parseValueForToken(t)
                    }
                } catch (e) {
                    return {
                        error: e
                    }
                }
            }
        },
        Ae = class {
            constructor(t, e) {
                this.context = t, this.delegate = e, this.bindingsByAction = new Map
            }
            start() {
                this.valueListObserver || (this.valueListObserver = new ee(this.element, this.actionAttribute, this), this.valueListObserver.start())
            }
            stop() {
                this.valueListObserver && (this.valueListObserver.stop(), delete this.valueListObserver, this.disconnectAllActions())
            }
            get element() {
                return this.context.element
            }
            get identifier() {
                return this.context.identifier
            }
            get actionAttribute() {
                return this.schema.actionAttribute
            }
            get schema() {
                return this.context.schema
            }
            get bindings() {
                return Array.from(this.bindingsByAction.values())
            }
            connectAction(t) {
                let e = new Ie(this.context, t);
                this.bindingsByAction.set(t, e), this.delegate.bindingConnected(e)
            }
            disconnectAction(t) {
                let e = this.bindingsByAction.get(t);
                e && (this.bindingsByAction.delete(t), this.delegate.bindingDisconnected(e))
            }
            disconnectAllActions() {
                this.bindings.forEach(t => this.delegate.bindingDisconnected(t, true)), this.bindingsByAction.clear()
            }
            parseValueForToken(t) {
                let e = Ge.forToken(t, this.schema);
                if (e.identifier == this.identifier) return e
            }
            elementMatchedValue(t, e) {
                this.connectAction(e)
            }
            elementUnmatchedValue(t, e) {
                this.disconnectAction(e)
            }
        },
        Je = class {
            constructor(t, e) {
                this.context = t, this.receiver = e, this.stringMapObserver = new Ye(this.element, this), this.valueDescriptorMap = this.controller.valueDescriptorMap
            }
            start() {
                this.stringMapObserver.start(), this.invokeChangedCallbacksForDefaultValues()
            }
            stop() {
                this.stringMapObserver.stop()
            }
            get element() {
                return this.context.element
            }
            get controller() {
                return this.context.controller
            }
            getStringMapKeyForAttribute(t) {
                if (t in this.valueDescriptorMap) return this.valueDescriptorMap[t].name
            }
            stringMapKeyAdded(t, e) {
                let n = this.valueDescriptorMap[e];
                this.hasValue(t) || this.invokeChangedCallback(t, n.writer(this.receiver[t]), n.writer(n.defaultValue))
            }
            stringMapValueChanged(t, e, n) {
                let i = this.valueDescriptorNameMap[e];
                t !== null && (n === null && (n = i.writer(i.defaultValue)), this.invokeChangedCallback(e, t, n))
            }
            stringMapKeyRemoved(t, e, n) {
                let i = this.valueDescriptorNameMap[t];
                this.hasValue(t) ? this.invokeChangedCallback(t, i.writer(this.receiver[t]), n) : this.invokeChangedCallback(t, i.writer(i.defaultValue), n)
            }
            invokeChangedCallbacksForDefaultValues() {
                for (let {
                        key: t,
                        name: e,
                        defaultValue: n,
                        writer: i
                    }
                    of this.valueDescriptors) n != null && !this.controller.data.has(t) && this.invokeChangedCallback(e, i(n), void 0)
            }
            invokeChangedCallback(t, e, n) {
                let i = `${t}Changed`,
                    a = this.receiver[i];
                if (typeof a == "function") {
                    let l = this.valueDescriptorNameMap[t];
                    try {
                        let c = l.reader(e),
                            u = n;
                        n && (u = l.reader(n)), a.call(this.receiver, c, u)
                    } catch (c) {
                        throw c instanceof TypeError && (c.message = `Stimulus Value "${this.context.identifier}.${l.name}" - ${c.message}`), c
                    }
                }
            }
            get valueDescriptors() {
                let {
                    valueDescriptorMap: t
                } = this;
                return Object.keys(t).map(e => t[e])
            }
            get valueDescriptorNameMap() {
                let t = {};
                return Object.keys(this.valueDescriptorMap).forEach(e => {
                    let n = this.valueDescriptorMap[e];
                    t[n.name] = n
                }), t
            }
            hasValue(t) {
                let e = this.valueDescriptorNameMap[t],
                    n = `has${Tt(e.name)}`;
                return this.receiver[n]
            }
        },
        He = class {
            constructor(t, e) {
                this.context = t, this.delegate = e, this.targetsByName = new it
            }
            start() {
                this.tokenListObserver || (this.tokenListObserver = new te(this.element, this.attributeName, this), this.tokenListObserver.start())
            }
            stop() {
                this.tokenListObserver && (this.disconnectAllTargets(), this.tokenListObserver.stop(), delete this.tokenListObserver)
            }
            tokenMatched({
                element: t,
                content: e
            }) {
                this.scope.containsElement(t) && this.connectTarget(t, e)
            }
            tokenUnmatched({
                element: t,
                content: e
            }) {
                this.disconnectTarget(t, e)
            }
            connectTarget(t, e) {
                var n;
                this.targetsByName.has(e, t) || (this.targetsByName.add(e, t), (n = this.tokenListObserver) === null || n === void 0 || n.pause(() => this.delegate.targetConnected(t, e)))
            }
            disconnectTarget(t, e) {
                var n;
                this.targetsByName.has(e, t) && (this.targetsByName.delete(e, t), (n = this.tokenListObserver) === null || n === void 0 || n.pause(() => this.delegate.targetDisconnected(t, e)))
            }
            disconnectAllTargets() {
                for (let t of this.targetsByName.keys)
                    for (let e of this.targetsByName.getValuesForKey(t)) this.disconnectTarget(e, t)
            }
            get attributeName() {
                return `data-${this.context.identifier}-target`
            }
            get element() {
                return this.context.element
            }
            get scope() {
                return this.context.scope
            }
        };

    function Et(o, t) {
        let e = ui(o);
        return Array.from(e.reduce((n, i) => (Vo(i, t).forEach(a => n.add(a)), n), new Set))
    }

    function ko(o, t) {
        return ui(o).reduce((n, i) => (n.push(...Do(i, t)), n), [])
    }

    function ui(o) {
        let t = [];
        for (; o;) t.push(o), o = Object.getPrototypeOf(o);
        return t.reverse()
    }

    function Vo(o, t) {
        let e = o[t];
        return Array.isArray(e) ? e : []
    }

    function Do(o, t) {
        let e = o[t];
        return e ? Object.keys(e).map(n => [n, e[n]]) : []
    }
    var je = class {
            constructor(t, e) {
                this.started = false, this.context = t, this.delegate = e, this.outletsByName = new it, this.outletElementsByName = new it, this.selectorObserverMap = new Map, this.attributeObserverMap = new Map
            }
            start() {
                this.started || (this.outletDefinitions.forEach(t => {
                    this.setupSelectorObserverForOutlet(t), this.setupAttributeObserverForOutlet(t)
                }), this.started = true, this.dependentContexts.forEach(t => t.refresh()))
            }
            refresh() {
                this.selectorObserverMap.forEach(t => t.refresh()), this.attributeObserverMap.forEach(t => t.refresh())
            }
            stop() {
                this.started && (this.started = false, this.disconnectAllOutlets(), this.stopSelectorObservers(), this.stopAttributeObservers())
            }
            stopSelectorObservers() {
                this.selectorObserverMap.size > 0 && (this.selectorObserverMap.forEach(t => t.stop()), this.selectorObserverMap.clear())
            }
            stopAttributeObservers() {
                this.attributeObserverMap.size > 0 && (this.attributeObserverMap.forEach(t => t.stop()), this.attributeObserverMap.clear())
            }
            selectorMatched(t, e, {
                outletName: n
            }) {
                let i = this.getOutlet(t, n);
                i && this.connectOutlet(i, t, n)
            }
            selectorUnmatched(t, e, {
                outletName: n
            }) {
                let i = this.getOutletFromMap(t, n);
                i && this.disconnectOutlet(i, t, n)
            }
            selectorMatchElement(t, {
                outletName: e
            }) {
                let n = this.selector(e),
                    i = this.hasOutlet(t, e),
                    a = t.matches(`[${this.schema.controllerAttribute}~=${e}]`);
                return n ? i && a && t.matches(n) : false
            }
            elementMatchedAttribute(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            elementAttributeValueChanged(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            elementUnmatchedAttribute(t, e) {
                let n = this.getOutletNameFromOutletAttributeName(e);
                n && this.updateSelectorObserverForOutlet(n)
            }
            connectOutlet(t, e, n) {
                var i;
                this.outletElementsByName.has(n, e) || (this.outletsByName.add(n, t), this.outletElementsByName.add(n, e), (i = this.selectorObserverMap.get(n)) === null || i === void 0 || i.pause(() => this.delegate.outletConnected(t, e, n)))
            }
            disconnectOutlet(t, e, n) {
                var i;
                this.outletElementsByName.has(n, e) && (this.outletsByName.delete(n, t), this.outletElementsByName.delete(n, e), (i = this.selectorObserverMap.get(n)) === null || i === void 0 || i.pause(() => this.delegate.outletDisconnected(t, e, n)))
            }
            disconnectAllOutlets() {
                for (let t of this.outletElementsByName.keys)
                    for (let e of this.outletElementsByName.getValuesForKey(t))
                        for (let n of this.outletsByName.getValuesForKey(t)) this.disconnectOutlet(n, e, t)
            }
            updateSelectorObserverForOutlet(t) {
                let e = this.selectorObserverMap.get(t);
                e && (e.selector = this.selector(t))
            }
            setupSelectorObserverForOutlet(t) {
                let e = this.selector(t),
                    n = new ze(document.body, e, this, {
                        outletName: t
                    });
                this.selectorObserverMap.set(t, n), n.start()
            }
            setupAttributeObserverForOutlet(t) {
                let e = this.attributeNameForOutletName(t),
                    n = new qt(this.scope.element, e, this);
                this.attributeObserverMap.set(t, n), n.start()
            }
            selector(t) {
                return this.scope.outlets.getSelectorForOutletName(t)
            }
            attributeNameForOutletName(t) {
                return this.scope.schema.outletAttributeForScope(this.identifier, t)
            }
            getOutletNameFromOutletAttributeName(t) {
                return this.outletDefinitions.find(e => this.attributeNameForOutletName(e) === t)
            }
            get outletDependencies() {
                let t = new it;
                return this.router.modules.forEach(e => {
                    let n = e.definition.controllerConstructor;
                    Et(n, "outlets").forEach(a => t.add(a, e.identifier))
                }), t
            }
            get outletDefinitions() {
                return this.outletDependencies.getKeysForValue(this.identifier)
            }
            get dependentControllerIdentifiers() {
                return this.outletDependencies.getValuesForKey(this.identifier)
            }
            get dependentContexts() {
                let t = this.dependentControllerIdentifiers;
                return this.router.contexts.filter(e => t.includes(e.identifier))
            }
            hasOutlet(t, e) {
                return !!this.getOutlet(t, e) || !!this.getOutletFromMap(t, e)
            }
            getOutlet(t, e) {
                return this.application.getControllerForElementAndIdentifier(t, e)
            }
            getOutletFromMap(t, e) {
                return this.outletsByName.getValuesForKey(e).find(n => n.element === t)
            }
            get scope() {
                return this.context.scope
            }
            get schema() {
                return this.context.schema
            }
            get identifier() {
                return this.context.identifier
            }
            get application() {
                return this.context.application
            }
            get router() {
                return this.application.router
            }
        },
        Pe = class {
            constructor(t, e) {
                this.logDebugActivity = (n, i = {}) => {
                    let {
                        identifier: a,
                        controller: l,
                        element: c
                    } = this;
                    i = Object.assign({
                        identifier: a,
                        controller: l,
                        element: c
                    }, i), this.application.logDebugActivity(this.identifier, n, i)
                }, this.module = t, this.scope = e, this.controller = new t.controllerConstructor(this), this.bindingObserver = new Ae(this, this.dispatcher), this.valueObserver = new Je(this, this.controller), this.targetObserver = new He(this, this), this.outletObserver = new je(this, this);
                try {
                    this.controller.initialize(), this.logDebugActivity("initialize")
                } catch (n) {
                    this.handleError(n, "initializing controller")
                }
            }
            connect() {
                this.bindingObserver.start(), this.valueObserver.start(), this.targetObserver.start(), this.outletObserver.start();
                try {
                    this.controller.connect(), this.logDebugActivity("connect")
                } catch (t) {
                    this.handleError(t, "connecting controller")
                }
            }
            refresh() {
                this.outletObserver.refresh()
            }
            disconnect() {
                try {
                    this.controller.disconnect(), this.logDebugActivity("disconnect")
                } catch (t) {
                    this.handleError(t, "disconnecting controller")
                }
                this.outletObserver.stop(), this.targetObserver.stop(), this.valueObserver.stop(), this.bindingObserver.stop()
            }
            get application() {
                return this.module.application
            }
            get identifier() {
                return this.module.identifier
            }
            get schema() {
                return this.application.schema
            }
            get dispatcher() {
                return this.application.dispatcher
            }
            get element() {
                return this.scope.element
            }
            get parentElement() {
                return this.element.parentElement
            }
            handleError(t, e, n = {}) {
                let {
                    identifier: i,
                    controller: a,
                    element: l
                } = this;
                n = Object.assign({
                    identifier: i,
                    controller: a,
                    element: l
                }, n), this.application.handleError(t, `Error ${e}`, n)
            }
            targetConnected(t, e) {
                this.invokeControllerMethod(`${e}TargetConnected`, t)
            }
            targetDisconnected(t, e) {
                this.invokeControllerMethod(`${e}TargetDisconnected`, t)
            }
            outletConnected(t, e, n) {
                this.invokeControllerMethod(`${De(n)}OutletConnected`, t, e)
            }
            outletDisconnected(t, e, n) {
                this.invokeControllerMethod(`${De(n)}OutletDisconnected`, t, e)
            }
            invokeControllerMethod(t, ...e) {
                let n = this.controller;
                typeof n[t] == "function" && n[t](...e)
            }
        };

    function _o(o) {
        return Go(o, Io(o))
    }

    function Go(o, t) {
        let e = Jo(o),
            n = zo(o.prototype, t);
        return Object.defineProperties(e.prototype, n), e
    }

    function Io(o) {
        return Et(o, "blessings").reduce((e, n) => {
            let i = n(o);
            for (let a in i) {
                let l = e[a] || {};
                e[a] = Object.assign(l, i[a])
            }
            return e
        }, {})
    }

    function zo(o, t) {
        return Ao(t).reduce((e, n) => {
            let i = Yo(o, t, n);
            return i && Object.assign(e, {
                [n]: i
            }), e
        }, {})
    }

    function Yo(o, t, e) {
        let n = Object.getOwnPropertyDescriptor(o, e);
        if (!(n && "value" in n)) {
            let a = Object.getOwnPropertyDescriptor(t, e).value;
            return n && (a.get = n.get || a.get, a.set = n.set || a.set), a
        }
    }
    var Ao = typeof Object.getOwnPropertySymbols == "function" ? o => [...Object.getOwnPropertyNames(o), ...Object.getOwnPropertySymbols(o)] : Object.getOwnPropertyNames,
        Jo = (() => {
            function o(e) {
                function n() {
                    return Reflect.construct(e, arguments, new.target)
                }
                return n.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: n
                    }
                }), Reflect.setPrototypeOf(n, e), n
            }

            function t() {
                let n = o(function() {
                    this.a.call(this)
                });
                return n.prototype.a = function() {}, new n
            }
            try {
                return t(), o
            } catch {
                return n => class extends n {}
            }
        })();

    function Ho(o) {
        return {
            identifier: o.identifier,
            controllerConstructor: _o(o.controllerConstructor)
        }
    }
    var Ke = class {
            constructor(t, e) {
                this.application = t, this.definition = Ho(e), this.contextsByScope = new WeakMap, this.connectedContexts = new Set
            }
            get identifier() {
                return this.definition.identifier
            }
            get controllerConstructor() {
                return this.definition.controllerConstructor
            }
            get contexts() {
                return Array.from(this.connectedContexts)
            }
            connectContextForScope(t) {
                let e = this.fetchContextForScope(t);
                this.connectedContexts.add(e), e.connect()
            }
            disconnectContextForScope(t) {
                let e = this.contextsByScope.get(t);
                e && (this.connectedContexts.delete(e), e.disconnect())
            }
            fetchContextForScope(t) {
                let e = this.contextsByScope.get(t);
                return e || (e = new Pe(this, t), this.contextsByScope.set(t, e)), e
            }
        },
        $e = class {
            constructor(t) {
                this.scope = t
            }
            has(t) {
                return this.data.has(this.getDataKey(t))
            }
            get(t) {
                return this.getAll(t)[0]
            }
            getAll(t) {
                let e = this.data.get(this.getDataKey(t)) || "";
                return Lo(e)
            }
            getAttributeName(t) {
                return this.data.getAttributeNameForKey(this.getDataKey(t))
            }
            getDataKey(t) {
                return `${t}-class`
            }
            get data() {
                return this.scope.data
            }
        },
        qe = class {
            constructor(t) {
                this.scope = t
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get(t) {
                let e = this.getAttributeNameForKey(t);
                return this.element.getAttribute(e)
            }
            set(t, e) {
                let n = this.getAttributeNameForKey(t);
                return this.element.setAttribute(n, e), this.get(t)
            }
            has(t) {
                let e = this.getAttributeNameForKey(t);
                return this.element.hasAttribute(e)
            }
            delete(t) {
                if (this.has(t)) {
                    let e = this.getAttributeNameForKey(t);
                    return this.element.removeAttribute(e), true
                } else return false
            }
            getAttributeNameForKey(t) {
                return `data-${this.identifier}-${ci(t)}`
            }
        },
        tn = class {
            constructor(t) {
                this.warnedKeysByObject = new WeakMap, this.logger = t
            }
            warn(t, e, n) {
                let i = this.warnedKeysByObject.get(t);
                i || (i = new Set, this.warnedKeysByObject.set(t, i)), i.has(e) || (i.add(e), this.logger.warn(n, t))
            }
        };

    function en(o, t) {
        return `[${o}~="${t}"]`
    }
    var nn = class {
            constructor(t) {
                this.scope = t
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get schema() {
                return this.scope.schema
            }
            has(t) {
                return this.find(t) != null
            }
            find(...t) {
                return t.reduce((e, n) => e || this.findTarget(n) || this.findLegacyTarget(n), void 0)
            }
            findAll(...t) {
                return t.reduce((e, n) => [...e, ...this.findAllTargets(n), ...this.findAllLegacyTargets(n)], [])
            }
            findTarget(t) {
                let e = this.getSelectorForTargetName(t);
                return this.scope.findElement(e)
            }
            findAllTargets(t) {
                let e = this.getSelectorForTargetName(t);
                return this.scope.findAllElements(e)
            }
            getSelectorForTargetName(t) {
                let e = this.schema.targetAttributeForScope(this.identifier);
                return en(e, t)
            }
            findLegacyTarget(t) {
                let e = this.getLegacySelectorForTargetName(t);
                return this.deprecate(this.scope.findElement(e), t)
            }
            findAllLegacyTargets(t) {
                let e = this.getLegacySelectorForTargetName(t);
                return this.scope.findAllElements(e).map(n => this.deprecate(n, t))
            }
            getLegacySelectorForTargetName(t) {
                let e = `${this.identifier}.${t}`;
                return en(this.schema.targetAttribute, e)
            }
            deprecate(t, e) {
                if (t) {
                    let {
                        identifier: n
                    } = this, i = this.schema.targetAttribute, a = this.schema.targetAttributeForScope(n);
                    this.guide.warn(t, `target:${e}`, `Please replace ${i}="${n}.${e}" with ${a}="${e}". The ${i} attribute is deprecated and will be removed in a future version of Stimulus.`)
                }
                return t
            }
            get guide() {
                return this.scope.guide
            }
        },
        on = class {
            constructor(t, e) {
                this.scope = t, this.controllerElement = e
            }
            get element() {
                return this.scope.element
            }
            get identifier() {
                return this.scope.identifier
            }
            get schema() {
                return this.scope.schema
            }
            has(t) {
                return this.find(t) != null
            }
            find(...t) {
                return t.reduce((e, n) => e || this.findOutlet(n), void 0)
            }
            findAll(...t) {
                return t.reduce((e, n) => [...e, ...this.findAllOutlets(n)], [])
            }
            getSelectorForOutletName(t) {
                let e = this.schema.outletAttributeForScope(this.identifier, t);
                return this.controllerElement.getAttribute(e)
            }
            findOutlet(t) {
                let e = this.getSelectorForOutletName(t);
                if (e) return this.findElement(e, t)
            }
            findAllOutlets(t) {
                let e = this.getSelectorForOutletName(t);
                return e ? this.findAllElements(e, t) : []
            }
            findElement(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))[0]
            }
            findAllElements(t, e) {
                return this.scope.queryElements(t).filter(i => this.matchesElement(i, t, e))
            }
            matchesElement(t, e, n) {
                let i = t.getAttribute(this.scope.schema.controllerAttribute) || "";
                return t.matches(e) && i.split(" ").includes(n)
            }
        },
        sn = class o {
            constructor(t, e, n, i) {
                this.targets = new nn(this), this.classes = new $e(this), this.data = new qe(this), this.containsElement = a => a.closest(this.controllerSelector) === this.element, this.schema = t, this.element = e, this.identifier = n, this.guide = new tn(i), this.outlets = new on(this.documentScope, e)
            }
            findElement(t) {
                return this.element.matches(t) ? this.element : this.queryElements(t).find(this.containsElement)
            }
            findAllElements(t) {
                return [...this.element.matches(t) ? [this.element] : [], ...this.queryElements(t).filter(this.containsElement)]
            }
            queryElements(t) {
                return Array.from(this.element.querySelectorAll(t))
            }
            get controllerSelector() {
                return en(this.schema.controllerAttribute, this.identifier)
            }
            get isDocumentScope() {
                return this.element === document.documentElement
            }
            get documentScope() {
                return this.isDocumentScope ? this : new o(this.schema, document.documentElement, this.identifier, this.guide.logger)
            }
        },
        an = class {
            constructor(t, e, n) {
                this.element = t, this.schema = e, this.delegate = n, this.valueListObserver = new ee(this.element, this.controllerAttribute, this), this.scopesByIdentifierByElement = new WeakMap, this.scopeReferenceCounts = new WeakMap
            }
            start() {
                this.valueListObserver.start()
            }
            stop() {
                this.valueListObserver.stop()
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            parseValueForToken(t) {
                let {
                    element: e,
                    content: n
                } = t;
                return this.parseValueForElementAndIdentifier(e, n)
            }
            parseValueForElementAndIdentifier(t, e) {
                let n = this.fetchScopesByIdentifierForElement(t),
                    i = n.get(e);
                return i || (i = this.delegate.createScopeForElementAndIdentifier(t, e), n.set(e, i)), i
            }
            elementMatchedValue(t, e) {
                let n = (this.scopeReferenceCounts.get(e) || 0) + 1;
                this.scopeReferenceCounts.set(e, n), n == 1 && this.delegate.scopeConnected(e)
            }
            elementUnmatchedValue(t, e) {
                let n = this.scopeReferenceCounts.get(e);
                n && (this.scopeReferenceCounts.set(e, n - 1), n == 1 && this.delegate.scopeDisconnected(e))
            }
            fetchScopesByIdentifierForElement(t) {
                let e = this.scopesByIdentifierByElement.get(t);
                return e || (e = new Map, this.scopesByIdentifierByElement.set(t, e)), e
            }
        },
        Router = class {
            constructor(t) {
                this.application = t, this.scopeObserver = new an(this.element, this.schema, this), this.scopesByIdentifier = new it, this.modulesByIdentifier = new Map
            }
            get element() {
                return this.application.element
            }
            get schema() {
                return this.application.schema
            }
            get logger() {
                return this.application.logger
            }
            get controllerAttribute() {
                return this.schema.controllerAttribute
            }
            get modules() {
                return Array.from(this.modulesByIdentifier.values())
            }
            get contexts() {
                return this.modules.reduce((t, e) => t.concat(e.contexts), [])
            }
            start() {
                this.scopeObserver.start()
            }
            stop() {
                this.scopeObserver.stop()
            }
            loadDefinition(t) {
                this.unloadIdentifier(t.identifier);
                let e = new Ke(this.application, t);
                this.connectModule(e);
                let n = t.controllerConstructor.afterLoad;
                n && n.call(t.controllerConstructor, t.identifier, this.application)
            }
            unloadIdentifier(t) {
                let e = this.modulesByIdentifier.get(t);
                e && this.disconnectModule(e)
            }
            getContextForElementAndIdentifier(t, e) {
                let n = this.modulesByIdentifier.get(e);
                if (n) return n.contexts.find(i => i.element == t)
            }
            proposeToConnectScopeForElementAndIdentifier(t, e) {
                let n = this.scopeObserver.parseValueForElementAndIdentifier(t, e);
                n ? this.scopeObserver.elementMatchedValue(n.element, n) : console.error(`Couldn't find or create scope for identifier: "${e}" and element:`, t)
            }
            handleError(t, e, n) {
                this.application.handleError(t, e, n)
            }
            createScopeForElementAndIdentifier(t, e) {
                return new sn(this.schema, t, e, this.logger)
            }
            scopeConnected(t) {
                this.scopesByIdentifier.add(t.identifier, t);
                let e = this.modulesByIdentifier.get(t.identifier);
                e && e.connectContextForScope(t)
            }
            scopeDisconnected(t) {
                this.scopesByIdentifier.delete(t.identifier, t);
                let e = this.modulesByIdentifier.get(t.identifier);
                e && e.disconnectContextForScope(t)
            }
            connectModule(t) {
                this.modulesByIdentifier.set(t.identifier, t), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.connectContextForScope(n))
            }
            disconnectModule(t) {
                this.modulesByIdentifier.delete(t.identifier), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach(n => t.disconnectContextForScope(n))
            }
        },
        jo = {
            controllerAttribute: "data-controller",
            actionAttribute: "data-action",
            targetAttribute: "data-target",
            targetAttributeForScope: o => `data-${o}-target`,
            outletAttributeForScope: (o, t) => `data-${o}-${t}-outlet`,
            keyMappings: Object.assign(Object.assign({
                enter: "Enter",
                tab: "Tab",
                esc: "Escape",
                space: " ",
                up: "ArrowUp",
                down: "ArrowDown",
                left: "ArrowLeft",
                right: "ArrowRight",
                home: "Home",
                end: "End",
                page_up: "PageUp",
                page_down: "PageDown"
            }, ii("abcdefghijklmnopqrstuvwxyz".split("").map(o => [o, o]))), ii("0123456789".split("").map(o => [o, o])))
        };

    function ii(o) {
        return o.reduce((t, [e, n]) => Object.assign(Object.assign({}, t), {
            [e]: n
        }), {})
    }
    var ne = class {
        constructor(t = document.documentElement, e = jo) {
            this.logger = console, this.debug = false, this.logDebugActivity = (n, i, a = {}) => {
                this.debug && this.logFormattedMessage(n, i, a)
            }, this.element = t, this.schema = e, this.dispatcher = new Dispatcher(this), this.router = new Router(this), this.actionDescriptorFilters = Object.assign({}, yo)
        }
        static start(t, e) {
            let n = new this(t, e);
            return n.start(), n
        }
        async start() {
            await Po(), this.logDebugActivity("application", "starting"), this.dispatcher.start(), this.router.start(), this.logDebugActivity("application", "start")
        }
        stop() {
            this.logDebugActivity("application", "stopping"), this.dispatcher.stop(), this.router.stop(), this.logDebugActivity("application", "stop")
        }
        register(t, e) {
            this.load({
                identifier: t,
                controllerConstructor: e
            })
        }
        registerActionOption(t, e) {
            this.actionDescriptorFilters[t] = e
        }
        load(t, ...e) {
            (Array.isArray(t) ? t : [t, ...e]).forEach(i => {
                i.controllerConstructor.shouldLoad && this.router.loadDefinition(i)
            })
        }
        unload(t, ...e) {
            (Array.isArray(t) ? t : [t, ...e]).forEach(i => this.router.unloadIdentifier(i))
        }
        get controllers() {
            return this.router.contexts.map(t => t.controller)
        }
        getControllerForElementAndIdentifier(t, e) {
            let n = this.router.getContextForElementAndIdentifier(t, e);
            return n ? n.controller : null
        }
        handleError(t, e, n) {
            var i;
            this.logger.error(`%s

%o

%o`, e, t, n), (i = window.onerror) === null || i === void 0 || i.call(window, e, "", 0, 0, t)
        }
        logFormattedMessage(t, e, n = {}) {
            n = Object.assign({
                application: this
            }, n), this.logger.groupCollapsed(`${t} #${e}`), this.logger.log("details:", Object.assign({}, n)), this.logger.groupEnd()
        }
    };

    function Po() {
        return new Promise(o => {
            document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", o) : o()
        })
    }

    function Ko(o) {
        return Et(o, "classes").reduce((e, n) => Object.assign(e, $o(n)), {})
    }

    function $o(o) {
        return {
            [`${o}Class`]: {
                get() {
                    let {
                        classes: t
                    } = this;
                    if (t.has(o)) return t.get(o);
                    {
                        let e = t.getAttributeName(o);
                        throw new Error(`Missing attribute "${e}"`)
                    }
                }
            },
            [`${o}Classes`]: {
                get() {
                    return this.classes.getAll(o)
                }
            },
            [`has${Tt(o)}Class`]: {
                get() {
                    return this.classes.has(o)
                }
            }
        }
    }

    function qo(o) {
        return Et(o, "outlets").reduce((e, n) => Object.assign(e, ts(n)), {})
    }

    function oi(o, t, e) {
        return o.application.getControllerForElementAndIdentifier(t, e)
    }

    function si(o, t, e) {
        let n = oi(o, t, e);
        if (n || (o.application.router.proposeToConnectScopeForElementAndIdentifier(t, e), n = oi(o, t, e), n)) return n
    }

    function ts(o) {
        let t = De(o);
        return {
            [`${t}Outlet`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o);
                    if (e) {
                        let i = si(this, e, o);
                        if (i) return i;
                        throw new Error(`The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`)
                    }
                    throw new Error(`Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`)
                }
            },
            [`${t}Outlets`]: {
                get() {
                    let e = this.outlets.findAll(o);
                    return e.length > 0 ? e.map(n => {
                        let i = si(this, n, o);
                        if (i) return i;
                        console.warn(`The provided outlet element is missing an outlet controller "${o}" instance for host controller "${this.identifier}"`, n)
                    }).filter(n => n) : []
                }
            },
            [`${t}OutletElement`]: {
                get() {
                    let e = this.outlets.find(o),
                        n = this.outlets.getSelectorForOutletName(o);
                    if (e) return e;
                    throw new Error(`Missing outlet element "${o}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`)
                }
            },
            [`${t}OutletElements`]: {
                get() {
                    return this.outlets.findAll(o)
                }
            },
            [`has${Tt(t)}Outlet`]: {
                get() {
                    return this.outlets.has(o)
                }
            }
        }
    }

    function es(o) {
        return Et(o, "targets").reduce((e, n) => Object.assign(e, ns(n)), {})
    }

    function ns(o) {
        return {
            [`${o}Target`]: {
                get() {
                    let t = this.targets.find(o);
                    if (t) return t;
                    throw new Error(`Missing target element "${o}" for "${this.identifier}" controller`)
                }
            },
            [`${o}Targets`]: {
                get() {
                    return this.targets.findAll(o)
                }
            },
            [`has${Tt(o)}Target`]: {
                get() {
                    return this.targets.has(o)
                }
            }
        }
    }

    function is(o) {
        let t = ko(o, "values"),
            e = {
                valueDescriptorMap: {
                    get() {
                        return t.reduce((n, i) => {
                            let a = hi(i, this.identifier),
                                l = this.data.getAttributeNameForKey(a.key);
                            return Object.assign(n, {
                                [l]: a
                            })
                        }, {})
                    }
                }
            };
        return t.reduce((n, i) => Object.assign(n, os(i)), e)
    }

    function os(o, t) {
        let e = hi(o, t),
            {
                key: n,
                name: i,
                reader: a,
                writer: l
            } = e;
        return {
            [i]: {
                get() {
                    let c = this.data.get(n);
                    return c !== null ? a(c) : e.defaultValue
                },
                set(c) {
                    c === void 0 ? this.data.delete(n) : this.data.set(n, l(c))
                }
            },
            [`has${Tt(i)}`]: {
                get() {
                    return this.data.has(n) || e.hasCustomDefaultValue
                }
            }
        }
    }

    function hi([o, t], e) {
        return ls({
            controller: e,
            token: o,
            typeDefinition: t
        })
    }

    function ie(o) {
        switch (o) {
            case Array:
                return "array";
            case Boolean:
                return "boolean";
            case Number:
                return "number";
            case Object:
                return "object";
            case String:
                return "string"
        }
    }

    function wt(o) {
        switch (typeof o) {
            case "boolean":
                return "boolean";
            case "number":
                return "number";
            case "string":
                return "string"
        }
        if (Array.isArray(o)) return "array";
        if (Object.prototype.toString.call(o) === "[object Object]") return "object"
    }

    function ss(o) {
        let {
            controller: t,
            token: e,
            typeObject: n
        } = o, i = ti(n.type), a = ti(n.default), l = i && a, c = i && !a, u = !i && a, m = ie(n.type), s = wt(o.typeObject.default);
        if (c) return m;
        if (u) return s;
        if (m !== s) {
            let r = t ? `${t}.${e}` : e;
            throw new Error(`The specified default value for the Stimulus Value "${r}" must match the defined type "${m}". The provided default value of "${n.default}" is of type "${s}".`)
        }
        if (l) return m
    }

    function as(o) {
        let {
            controller: t,
            token: e,
            typeDefinition: n
        } = o, a = ss({
            controller: t,
            token: e,
            typeObject: n
        }), l = wt(n), c = ie(n), u = a || l || c;
        if (u) return u;
        let m = t ? `${t}.${n}` : e;
        throw new Error(`Unknown value type "${m}" for "${e}" value`)
    }

    function rs(o) {
        let t = ie(o);
        if (t) return ai[t];
        let e = _e(o, "default"),
            n = _e(o, "type"),
            i = o;
        if (e) return i.default;
        if (n) {
            let {
                type: a
            } = i, l = ie(a);
            if (l) return ai[l]
        }
        return o
    }

    function ls(o) {
        let {
            token: t,
            typeDefinition: e
        } = o, n = `${ci(t)}-value`, i = as(o);
        return {
            type: i,
            key: n,
            name: ln(n),
            get defaultValue() {
                return rs(e)
            },
            get hasCustomDefaultValue() {
                return wt(e) !== void 0
            },
            reader: cs[i],
            writer: ri[i] || ri.default
        }
    }
    var ai = {
            get array() {
                return []
            },
            boolean: false,
            number: 0,
            get object() {
                return {}
            },
            string: ""
        },
        cs = {
            array(o) {
                let t = JSON.parse(o);
                if (!Array.isArray(t)) throw new TypeError(`expected value of type "array" but instead got value "${o}" of type "${wt(t)}"`);
                return t
            },
            boolean(o) {
                return !(o == "0" || String(o).toLowerCase() == "false")
            },
            number(o) {
                return Number(o.replace(/_/g, ""))
            },
            object(o) {
                let t = JSON.parse(o);
                if (t === null || typeof t != "object" || Array.isArray(t)) throw new TypeError(`expected value of type "object" but instead got value "${o}" of type "${wt(t)}"`);
                return t
            },
            string(o) {
                return o
            }
        },
        ri = {
            default: ds,
            array: li,
            object: li
        };

    function li(o) {
        return JSON.stringify(o)
    }

    function ds(o) {
        return `${o}`
    }
    var L = class {
        constructor(t) {
            this.context = t
        }
        static get shouldLoad() {
            return true
        }
        static afterLoad(t, e) {}
        get application() {
            return this.context.application
        }
        get scope() {
            return this.context.scope
        }
        get element() {
            return this.scope.element
        }
        get identifier() {
            return this.scope.identifier
        }
        get targets() {
            return this.scope.targets
        }
        get outlets() {
            return this.scope.outlets
        }
        get classes() {
            return this.scope.classes
        }
        get data() {
            return this.scope.data
        }
        initialize() {}
        connect() {}
        disconnect() {}
        dispatch(t, {
            target: e = this.element,
            detail: n = {},
            prefix: i = this.identifier,
            bubbles: a = true,
            cancelable: l = true
        } = {}) {
            let c = i ? `${i}:${t}` : t,
                u = new CustomEvent(c, {
                    detail: n,
                    bubbles: a,
                    cancelable: l
                });
            return e.dispatchEvent(u), u
        }
    };
    L.blessings = [Ko, es, is, qo];
    L.targets = [];
    L.outlets = [];
    L.values = {};
    var F = (o, t = 10000) => (o = parseFloat(o + "") || 0, Math.round((o + Number.EPSILON) * t) / t),
        wn = function(o) {
            if (!(o && o instanceof Element && o.offsetParent)) return false;
            let t = o.scrollHeight > o.clientHeight,
                e = window.getComputedStyle(o).overflowY,
                n = e.indexOf("hidden") !== -1,
                i = e.indexOf("visible") !== -1;
            return t && !n && !i
        },
        Qe = function(o, t = void 0) {
            return !(!o || o === document.body || t && o === t) && (wn(o) ? o : Qe(o.parentElement, t))
        },
        tt = function(o) {
            var t = new DOMParser().parseFromString(o, "text/html").body;
            if (t.childElementCount > 1) {
                for (var e = document.createElement("div"); t.firstChild;) e.appendChild(t.firstChild);
                return e
            }
            return t.firstChild
        },
        Ln = o => `${o||""}`.split(" ").filter(t => !!t),
        et = (o, t, e) => {
            o && Ln(t).forEach(n => {
                o.classList.toggle(n, e || false)
            })
        },
        dt = class {
            constructor(t) {
                Object.defineProperty(this, "pageX", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "pageY", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "clientX", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "clientY", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "id", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "time", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "nativePointer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
            }
        },
        bt = {
            passive: false
        },
        Tn = class {
            constructor(t, {
                start: e = () => true,
                move: n = () => {},
                end: i = () => {}
            }) {
                Object.defineProperty(this, "element", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "startCallback", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "moveCallback", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "endCallback", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), Object.defineProperty(this, "currentPointers", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                }), Object.defineProperty(this, "startPointers", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                }), this.element = t, this.startCallback = e, this.moveCallback = n, this.endCallback = i;
                for (let a of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[a] = this[a].bind(this);
                this.element.addEventListener("mousedown", this.onPointerStart, bt), this.element.addEventListener("touchstart", this.onTouchStart, bt), this.element.addEventListener("touchmove", this.onMove, bt), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd)
            }
            onPointerStart(t) {
                if (!t.buttons || t.button !== 0) return;
                let e = new dt(t);
                this.currentPointers.some(n => n.id === e.id) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
            }
            onTouchStart(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new dt(e), t);
                window.addEventListener("blur", this.onWindowBlur)
            }
            onMove(t) {
                let e = this.currentPointers.slice(),
                    n = "changedTouches" in t ? Array.from(t.changedTouches || []).map(a => new dt(a)) : [new dt(t)],
                    i = [];
                for (let a of n) {
                    let l = this.currentPointers.findIndex(c => c.id === a.id);
                    l < 0 || (i.push(a), this.currentPointers[l] = a)
                }
                i.length && this.moveCallback(t, this.currentPointers.slice(), e)
            }
            onPointerEnd(t) {
                t.buttons > 0 && t.button !== 0 || (this.triggerPointerEnd(t, new dt(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
            }
            onTouchEnd(t) {
                for (let e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new dt(e))
            }
            triggerPointerStart(t, e) {
                return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), true)
            }
            triggerPointerEnd(t, e) {
                let n = this.currentPointers.findIndex(i => i.id === e.id);
                n < 0 || (this.currentPointers.splice(n, 1), this.startPointers.splice(n, 1), this.endCallback(t, e, this.currentPointers.slice()))
            }
            onWindowBlur() {
                this.clear()
            }
            clear() {
                for (; this.currentPointers.length;) {
                    let t = this.currentPointers[this.currentPointers.length - 1];
                    this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
                        bubbles: true,
                        cancelable: true,
                        clientX: t.clientX,
                        clientY: t.clientY
                    }), t, this.currentPointers.slice())
                }
            }
            stop() {
                this.element.removeEventListener("mousedown", this.onPointerStart, bt), this.element.removeEventListener("touchstart", this.onTouchStart, bt), this.element.removeEventListener("touchmove", this.onMove, bt), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
            }
        };

    function mi(o, t) {
        return t ? Math.sqrt(Math.pow(t.clientX - o.clientX, 2) + Math.pow(t.clientY - o.clientY, 2)) : 0
    }

    function pi(o, t) {
        return t ? {
            clientX: (o.clientX + t.clientX) / 2,
            clientY: (o.clientY + t.clientY) / 2
        } : o
    }
    var En = o => typeof o == "object" && o !== null && o.constructor === Object && Object.prototype.toString.call(o) === "[object Object]",
        I = (o, ...t) => {
            let e = t.length;
            for (let n = 0; n < e; n++) {
                let i = t[n] || {};
                Object.entries(i).forEach(([a, l]) => {
                    let c = Array.isArray(l) ? [] : {};
                    o[a] || Object.assign(o, {
                        [a]: c
                    }), En(l) ? Object.assign(o[a], I(c, l)) : Array.isArray(l) ? Object.assign(o, {
                        [a]: [...l]
                    }) : Object.assign(o, {
                        [a]: l
                    })
                })
            }
            return o
        },
        cn = function(o, t) {
            return o.split(".").reduce((e, n) => typeof e == "object" ? e[n] : void 0, t)
        },
        yt = class {
            constructor(t = {}) {
                Object.defineProperty(this, "options", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: t
                }), Object.defineProperty(this, "events", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: new Map
                }), this.setOptions(t);
                for (let e of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) e.startsWith("on") && typeof this[e] == "function" && (this[e] = this[e].bind(this))
            }
            setOptions(t) {
                this.options = t ? I({}, this.constructor.defaults, t) : {};
                for (let [e, n] of Object.entries(this.option("on") || {})) this.on(e, n)
            }
            option(t, ...e) {
                let n = cn(t, this.options);
                return n && typeof n == "function" && (n = n.call(this, this, ...e)), n
            }
            optionFor(t, e, n, ...i) {
                let a = cn(e, t);
                var l;
                typeof(l = a) != "string" || isNaN(l) || isNaN(parseFloat(l)) || (a = parseFloat(a)), a === "true" && (a = true), a === "false" && (a = false), a && typeof a == "function" && (a = a.call(this, this, t, ...i));
                let c = cn(e, this.options);
                return c && typeof c == "function" ? a = c.call(this, this, t, ...i, a) : a === void 0 && (a = c), a === void 0 ? n : a
            }
            cn(t) {
                let e = this.options.classes;
                return e && e[t] || ""
            }
            localize(t, e = []) {
                t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (n, i, a) => {
                    let l = "";
                    return a ? l = this.option(`${i[0]+i.toLowerCase().substring(1)}.l10n.${a}`) : i && (l = this.option(`l10n.${i}`)), l || (l = n), l
                });
                for (let n = 0; n < e.length; n++) t = t.split(e[n][0]).join(e[n][1]);
                return t = t.replace(/\{\{(.*?)\}\}/g, (n, i) => i)
            }
            on(t, e) {
                let n = [];
                typeof t == "string" ? n = t.split(" ") : Array.isArray(t) && (n = t), this.events || (this.events = new Map), n.forEach(i => {
                    let a = this.events.get(i);
                    a || (this.events.set(i, []), a = []), a.includes(e) || a.push(e), this.events.set(i, a)
                })
            }
            off(t, e) {
                let n = [];
                typeof t == "string" ? n = t.split(" ") : Array.isArray(t) && (n = t), n.forEach(i => {
                    let a = this.events.get(i);
                    if (Array.isArray(a)) {
                        let l = a.indexOf(e);
                        l > -1 && a.splice(l, 1)
                    }
                })
            }
            emit(t, ...e) {
                [...this.events.get(t) || []].forEach(n => n(this, ...e)), t !== "*" && this.emit("*", t, ...e)
            }
        };
    Object.defineProperty(yt, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "5.0.36"
    }), Object.defineProperty(yt, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
    });
    var Rt = class extends yt {
            constructor(t = {}) {
                super(t), Object.defineProperty(this, "plugins", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: {}
                })
            }
            attachPlugins(t = {}) {
                let e = new Map;
                for (let [n, i] of Object.entries(t)) {
                    let a = this.option(n),
                        l = this.plugins[n];
                    l || a === false ? l && a === false && (l.detach(), delete this.plugins[n]) : e.set(n, new i(this, a || {}))
                }
                for (let [n, i] of e) this.plugins[n] = i, i.attach()
            }
            detachPlugins(t) {
                t = t || Object.keys(this.plugins);
                for (let e of t) {
                    let n = this.plugins[e];
                    n && n.detach(), delete this.plugins[e]
                }
                return this.emit("detachPlugins"), this
            }
        },
        R;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Error = 1] = "Error", o[o.Ready = 2] = "Ready", o[o.Panning = 3] = "Panning", o[o.Mousemove = 4] = "Mousemove", o[o.Destroy = 5] = "Destroy"
    })(R || (R = {}));
    var ot = ["a", "b", "c", "d", "e", "f"],
        Gi = {
            PANUP: "Move up",
            PANDOWN: "Move down",
            PANLEFT: "Move left",
            PANRIGHT: "Move right",
            ZOOMIN: "Zoom in",
            ZOOMOUT: "Zoom out",
            TOGGLEZOOM: "Toggle zoom level",
            TOGGLE1TO1: "Toggle zoom level",
            ITERATEZOOM: "Toggle zoom level",
            ROTATECCW: "Rotate counterclockwise",
            ROTATECW: "Rotate clockwise",
            FLIPX: "Flip horizontally",
            FLIPY: "Flip vertically",
            FITX: "Fit horizontally",
            FITY: "Fit vertically",
            RESET: "Reset",
            TOGGLEFS: "Toggle fullscreen"
        },
        us = {
            content: null,
            width: "auto",
            height: "auto",
            panMode: "drag",
            touch: true,
            dragMinThreshold: 3,
            lockAxis: false,
            mouseMoveFactor: 1,
            mouseMoveFriction: .12,
            zoom: true,
            pinchToZoom: true,
            panOnlyZoomed: "auto",
            minScale: 1,
            maxScale: 2,
            friction: .25,
            dragFriction: .35,
            decelFriction: .05,
            click: "toggleZoom",
            dblClick: false,
            wheel: "zoom",
            wheelLimit: 7,
            spinner: true,
            bounds: "auto",
            infinite: false,
            rubberband: true,
            bounce: true,
            maxVelocity: 75,
            transformParent: false,
            classes: {
                content: "f-panzoom__content",
                isLoading: "is-loading",
                canZoomIn: "can-zoom_in",
                canZoomOut: "can-zoom_out",
                isDraggable: "is-draggable",
                isDragging: "is-dragging",
                inFullscreen: "in-fullscreen",
                htmlHasFullscreen: "with-panzoom-in-fullscreen"
            },
            l10n: Gi
        },
        fi = '<circle cx="25" cy="25" r="20"></circle>',
        Xn = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + fi + fi + "</svg></div>",
        G = o => o && o !== null && o instanceof Element && "nodeType" in o,
        O = (o, t) => {
            o && Ln(t).forEach(e => {
                o.classList.remove(e)
            })
        },
        v = (o, t) => {
            o && Ln(t).forEach(e => {
                o.classList.add(e)
            })
        },
        oe = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        },
        hs = 100000,
        se = 10000,
        J = "mousemove",
        Qi = "drag",
        bi = "content",
        H = "auto",
        dn = null,
        un = null,
        Qt = class o extends Rt {
            get fits() {
                return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1
            }
            get isTouchDevice() {
                return un === null && (un = window.matchMedia("(hover: none)").matches), un
            }
            get isMobile() {
                return dn === null && (dn = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), dn
            }
            get panMode() {
                return this.options.panMode !== J || this.isTouchDevice ? Qi : J
            }
            get panOnlyZoomed() {
                let t = this.options.panOnlyZoomed;
                return t === H ? this.isTouchDevice : t
            }
            get isInfinite() {
                return this.option("infinite")
            }
            get angle() {
                return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
            }
            get targetAngle() {
                return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
            }
            get scale() {
                let {
                    a: t,
                    b: e
                } = this.current;
                return Math.sqrt(t * t + e * e) || 1
            }
            get targetScale() {
                let {
                    a: t,
                    b: e
                } = this.target;
                return Math.sqrt(t * t + e * e) || 1
            }
            get minScale() {
                return this.option("minScale") || 1
            }
            get fullScale() {
                let {
                    contentRect: t
                } = this;
                return t.fullWidth / t.fitWidth || 1
            }
            get maxScale() {
                return this.fullScale * (this.option("maxScale") || 1) || 1
            }
            get coverScale() {
                let {
                    containerRect: t,
                    contentRect: e
                } = this, n = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
                return Math.min(this.fullScale, n)
            }
            get isScaling() {
                return Math.abs(this.targetScale - this.scale) > 0.00001 && !this.isResting
            }
            get isContentLoading() {
                let t = this.content;
                return !!(t && t instanceof HTMLImageElement) && !t.complete
            }
            get isResting() {
                if (this.isBouncingX || this.isBouncingY) return false;
                for (let t of ot) {
                    let e = t == "e" || t === "f" ? 0.0001 : 0.00001;
                    if (Math.abs(this.target[t] - this.current[t]) > e) return false
                }
                return !(!this.ignoreBounds && !this.checkBounds().inBounds)
            }
            constructor(t, e = {}, n = {}) {
                var i;
                if (super(e), Object.defineProperty(this, "pointerTracker", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "resizeObserver", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "updateTimer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "clickTimer", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "rAF", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "isTicking", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), Object.defineProperty(this, "ignoreBounds", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), Object.defineProperty(this, "isBouncingX", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), Object.defineProperty(this, "isBouncingY", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), Object.defineProperty(this, "clicks", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "trackingPoints", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: []
                    }), Object.defineProperty(this, "pwt", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "cwd", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "pmme", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0
                    }), Object.defineProperty(this, "friction", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: R.Init
                    }), Object.defineProperty(this, "isDragging", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0
                    }), Object.defineProperty(this, "content", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0
                    }), Object.defineProperty(this, "spinner", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "containerRect", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0
                        }
                    }), Object.defineProperty(this, "contentRect", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            fullWidth: 0,
                            fullHeight: 0,
                            fitWidth: 0,
                            fitHeight: 0,
                            width: 0,
                            height: 0
                        }
                    }), Object.defineProperty(this, "dragStart", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            x: 0,
                            y: 0,
                            top: 0,
                            left: 0,
                            time: 0
                        }
                    }), Object.defineProperty(this, "dragOffset", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            x: 0,
                            y: 0,
                            time: 0
                        }
                    }), Object.defineProperty(this, "current", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: Object.assign({}, oe)
                    }), Object.defineProperty(this, "target", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: Object.assign({}, oe)
                    }), Object.defineProperty(this, "velocity", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {
                            a: 0,
                            b: 0,
                            c: 0,
                            d: 0,
                            e: 0,
                            f: 0
                        }
                    }), Object.defineProperty(this, "lockedAxis", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: false
                    }), !t) throw new Error("Container Element Not Found");
                this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), n)), this.emit("attachPlugins"), this.emit("init");
                let a = this.content;
                if (a.addEventListener("load", this.onLoad), a.addEventListener("error", this.onError), this.isContentLoading) {
                    if (this.option("spinner")) {
                        t.classList.add(this.cn("isLoading"));
                        let l = tt(Xn);
                        !t.contains(a) || a.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(l) : this.spinner = ((i = a.parentElement) === null || i === void 0 ? void 0 : i.insertBefore(l, a)) || null
                    }
                    this.emit("beforeLoad")
                } else queueMicrotask(() => {
                    this.enable()
                })
            }
            initContent() {
                let {
                    container: t
                } = this, e = this.cn(bi), n = this.option(bi) || t.querySelector(`.${e}`);
                if (n || (n = t.querySelector("img,picture") || t.firstElementChild, n && v(n, e)), n instanceof HTMLPictureElement && (n = n.querySelector("img")), !n) throw new Error("No content found");
                this.content = n
            }
            onLoad() {
                let {
                    spinner: t,
                    container: e,
                    state: n
                } = this;
                t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), n === R.Init ? this.enable() : this.updateMetrics()
            }
            onError() {
                this.state !== R.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = R.Error, this.emit("error"))
            }
            getNextScale(t) {
                let {
                    fullScale: e,
                    targetScale: n,
                    coverScale: i,
                    maxScale: a,
                    minScale: l
                } = this, c = l;
                switch (t) {
                    case "toggleMax":
                        c = n - l < .5 * (a - l) ? a : l;
                        break;
                    case "toggleCover":
                        c = n - l < .5 * (i - l) ? i : l;
                        break;
                    case "toggleZoom":
                        c = n - l < .5 * (e - l) ? e : l;
                        break;
                    case "iterateZoom":
                        let u = [1, e, a].sort((s, r) => s - r),
                            m = u.findIndex(s => s > n + 1e-5);
                        c = u[m] || 1
                }
                return c
            }
            attachObserver() {
                var t;
                let e = () => {
                    let {
                        container: n,
                        containerRect: i
                    } = this;
                    return Math.abs(i.width - n.getBoundingClientRect().width) > .1 || Math.abs(i.height - n.getBoundingClientRect().height) > .1
                };
                this.resizeObserver || window.ResizeObserver === void 0 || (this.resizeObserver = new ResizeObserver(() => {
                    this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
                        e() && this.onResize(), this.updateTimer = null
                    }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null))
                })), (t = this.resizeObserver) === null || t === void 0 || t.observe(this.container)
            }
            detachObserver() {
                var t;
                (t = this.resizeObserver) === null || t === void 0 || t.disconnect()
            }
            attachEvents() {
                let {
                    container: t
                } = this;
                t.addEventListener("click", this.onClick, {
                    passive: false,
                    capture: false
                }), t.addEventListener("wheel", this.onWheel, {
                    passive: false
                }), this.pointerTracker = new Tn(t, {
                    start: this.onPointerDown,
                    move: this.onPointerMove,
                    end: this.onPointerUp
                }), document.addEventListener(J, this.onMouseMove)
            }
            detachEvents() {
                var t;
                let {
                    container: e
                } = this;
                e.removeEventListener("click", this.onClick, {
                    passive: false,
                    capture: false
                }), e.removeEventListener("wheel", this.onWheel, {
                    passive: false
                }), (t = this.pointerTracker) === null || t === void 0 || t.stop(), this.pointerTracker = null, document.removeEventListener(J, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, true), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
            }
            animate() {
                this.setTargetForce();
                let t = this.friction,
                    e = this.option("maxVelocity");
                for (let n of ot) t ? (this.velocity[n] *= 1 - t, e && !this.isScaling && (this.velocity[n] = Math.max(Math.min(this.velocity[n], e), -1 * e)), this.current[n] += this.velocity[n]) : this.current[n] = this.target[n];
                this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current")
            }
            setTargetForce() {
                for (let t of ot) t === "e" && this.isBouncingX || t === "f" && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
            }
            checkBounds(t = 0, e = 0) {
                let {
                    current: n
                } = this, i = n.e + t, a = n.f + e, l = this.getBounds(), {
                    x: c,
                    y: u
                } = l, m = c.min, s = c.max, r = u.min, d = u.max, h = 0, p = 0;
                return m !== 1 / 0 && i < m ? h = m - i : s !== 1 / 0 && i > s && (h = s - i), r !== 1 / 0 && a < r ? p = r - a : d !== 1 / 0 && a > d && (p = d - a), Math.abs(h) < 1e-4 && (h = 0), Math.abs(p) < 1e-4 && (p = 0), Object.assign(Object.assign({}, l), {
                    xDiff: h,
                    yDiff: p,
                    inBounds: !h && !p
                })
            }
            clampTargetBounds() {
                let {
                    target: t
                } = this, {
                    x: e,
                    y: n
                } = this.getBounds();
                e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), n.min !== 1 / 0 && (t.f = Math.max(t.f, n.min)), n.max !== 1 / 0 && (t.f = Math.min(t.f, n.max))
            }
            calculateContentDim(t = this.current) {
                let {
                    content: e,
                    contentRect: n
                } = this, {
                    fitWidth: i,
                    fitHeight: a,
                    fullWidth: l,
                    fullHeight: c
                } = n, u = l, m = c;
                if (this.option("zoom") || this.angle !== 0) {
                    let s = !(e instanceof HTMLImageElement) && (window.getComputedStyle(e).maxWidth === "none" || window.getComputedStyle(e).maxHeight === "none"),
                        r = s ? l : i,
                        d = s ? c : a,
                        h = this.getMatrix(t),
                        p = new DOMPoint(0, 0).matrixTransform(h),
                        f = new DOMPoint(0 + r, 0).matrixTransform(h),
                        Q = new DOMPoint(0 + r, 0 + d).matrixTransform(h),
                        b = new DOMPoint(0, 0 + d).matrixTransform(h),
                        g = Math.abs(Q.x - p.x),
                        B = Math.abs(Q.y - p.y),
                        w = Math.abs(b.x - f.x),
                        x = Math.abs(b.y - f.y);
                    u = Math.max(g, w), m = Math.max(B, x)
                }
                return {
                    contentWidth: u,
                    contentHeight: m
                }
            }
            setEdgeForce() {
                if (this.ignoreBounds || this.isDragging || this.panMode === J || this.targetScale < this.scale) return this.isBouncingX = false, void(this.isBouncingY = false);
                let {
                    target: t
                } = this, {
                    x: e,
                    y: n,
                    xDiff: i,
                    yDiff: a
                } = this.checkBounds(), l = this.option("maxVelocity"), c = this.velocity.e, u = this.velocity.f;
                i !== 0 ? (this.isBouncingX = true, i * c <= 0 ? c += .14 * i : (c = .14 * i, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), l && (c = Math.max(Math.min(c, l), -1 * l))) : this.isBouncingX = false, a !== 0 ? (this.isBouncingY = true, a * u <= 0 ? u += .14 * a : (u = .14 * a, n.min !== 1 / 0 && (this.target.f = Math.max(t.f, n.min)), n.max !== 1 / 0 && (this.target.f = Math.min(t.f, n.max))), l && (u = Math.max(Math.min(u, l), -1 * l))) : this.isBouncingY = false, this.isBouncingX && (this.velocity.e = c), this.isBouncingY && (this.velocity.f = u)
            }
            enable() {
                let {
                    content: t
                } = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
                for (let n of ot) this.current[n] = this.target[n] = e[n];
                this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = R.Ready, this.emit("ready")
            }
            onClick(t) {
                var e;
                t.type === "click" && t.detail === 0 && (this.dragOffset.x = 0, this.dragOffset.y = 0), this.isDragging && ((e = this.pointerTracker) === null || e === void 0 || e.clear(), this.trackingPoints = [], this.startDecelAnim());
                let n = t.target;
                if (!n || t.defaultPrevented) return;
                if (n.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
                if ((() => {
                        let h = window.getSelection();
                        return h && h.type === "Range"
                    })() && !n.closest("button")) return;
                let i = n.closest("[data-panzoom-action]"),
                    a = n.closest("[data-panzoom-change]"),
                    l = i || a,
                    c = l && G(l) ? l.dataset : null;
                if (c) {
                    let h = c.panzoomChange,
                        p = c.panzoomAction;
                    if ((h || p) && t.preventDefault(), h) {
                        let f = {};
                        try {
                            f = JSON.parse(h)
                        } catch {
                            console && console.warn("The given data was not valid JSON")
                        }
                        return void this.applyChange(f)
                    }
                    if (p) return void(this[p] && this[p]())
                }
                if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
                if (n.closest("[data-fancybox]")) return;
                let u = this.content.getBoundingClientRect(),
                    m = this.dragStart;
                if (m.time && !this.canZoomOut() && (Math.abs(u.x - m.x) > 2 || Math.abs(u.y - m.y) > 2)) return;
                this.dragStart.time = 0;
                let s = h => {
                        this.option("zoom", t) && h && typeof h == "string" && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(h) && typeof this[h] == "function" && (t.preventDefault(), this[h]({
                            event: t
                        }))
                    },
                    r = this.option("click", t),
                    d = this.option("dblClick", t);
                d ? (this.clicks++, this.clicks == 1 && (this.clickTimer = setTimeout(() => {
                    this.clicks === 1 ? (this.emit("click", t), !t.defaultPrevented && r && s(r)) : (this.emit("dblClick", t), t.defaultPrevented || s(d)), this.clicks = 0, this.clickTimer = null
                }, 350))) : (this.emit("click", t), !t.defaultPrevented && r && s(r))
            }
            addTrackingPoint(t) {
                let e = this.trackingPoints.filter(n => n.time > Date.now() - 100);
                e.push(t), this.trackingPoints = e
            }
            onPointerDown(t, e, n) {
                var i;
                if (this.option("touch", t) === false) return false;
                this.pwt = 0, this.dragOffset = {
                    x: 0,
                    y: 0,
                    time: 0
                }, this.trackingPoints = [];
                let a = this.content.getBoundingClientRect();
                if (this.dragStart = {
                        x: a.x,
                        y: a.y,
                        top: a.top,
                        left: a.left,
                        time: Date.now()
                    }, this.clickTimer) return false;
                if (this.panMode === J && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), false;
                let l = t.composedPath()[0];
                if (!n.length) {
                    if (["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(l.nodeName) || l.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return false;
                    (i = window.getSelection()) === null || i === void 0 || i.removeAllRanges()
                }
                if (t.type === "mousedown")["A", "BUTTON"].includes(l.nodeName) || t.preventDefault();
                else if (Math.abs(this.velocity.a) > .3) return false;
                return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), this.isDragging || (this.isDragging = true, this.addTrackingPoint(e), this.emit("touchStart", t)), true
            }
            onPointerMove(t, e, n) {
                if (this.option("touch", t) === false || !this.isDragging || e.length < 2 && this.panOnlyZoomed && F(this.targetScale) <= F(this.minScale) || (this.emit("touchMove", t), t.defaultPrevented)) return;
                this.addTrackingPoint(e[0]);
                let {
                    content: i
                } = this, a = pi(n[0], n[1]), l = pi(e[0], e[1]), c = 0, u = 0;
                if (e.length > 1) {
                    let B = i.getBoundingClientRect();
                    c = a.clientX - B.left - .5 * B.width, u = a.clientY - B.top - .5 * B.height
                }
                let m = mi(n[0], n[1]),
                    s = mi(e[0], e[1]),
                    r = m ? s / m : 1,
                    d = l.clientX - a.clientX,
                    h = l.clientY - a.clientY;
                this.dragOffset.x += d, this.dragOffset.y += h, this.dragOffset.time = Date.now() - this.dragStart.time;
                let p = F(this.targetScale) === F(this.minScale) && this.option("lockAxis");
                if (p && !this.lockedAxis)
                    if (p === "xy" || p === "y" || t.type === "touchmove") {
                        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
                        let B = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
                        this.lockedAxis = B > 45 && B < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, d = 0, h = 0
                    } else this.lockedAxis = p;
                if (Qe(t.target, this.content) && (p = "x", this.dragOffset.y = 0), p && p !== "xy" && this.lockedAxis !== p && F(this.targetScale) === F(this.minScale)) return;
                t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
                let f = this.checkBounds(d, h);
                this.option("rubberband") ? (this.isInfinite !== "x" && (f.xDiff > 0 && d < 0 || f.xDiff < 0 && d > 0) && (d *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * f.xDiff))), this.isInfinite !== "y" && (f.yDiff > 0 && h < 0 || f.yDiff < 0 && h > 0) && (h *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * f.yDiff)))) : (f.xDiff && (d = 0), f.yDiff && (h = 0));
                let Q = this.targetScale,
                    b = this.minScale,
                    g = this.maxScale;
                Q < .5 * b && (r = Math.max(r, b)), Q > 1.5 * g && (r = Math.min(r, g)), this.lockedAxis === "y" && F(Q) === F(b) && (d = 0), this.lockedAxis === "x" && F(Q) === F(b) && (h = 0), this.applyChange({
                    originX: c,
                    originY: u,
                    panX: d,
                    panY: h,
                    scale: r,
                    friction: this.option("dragFriction"),
                    ignoreBounds: true
                })
            }
            onPointerUp(t, e, n) {
                if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void(this.trackingPoints = []);
                this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), Qe(t.target, this.content) && this.lockedAxis === "y" && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = false, this.lockedAxis = false, this.state !== R.Destroy && (t.defaultPrevented || this.startDecelAnim()))
            }
            startDecelAnim() {
                var t;
                let e = this.isScaling;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = false, this.isBouncingY = false;
                for (let B of ot) this.velocity[B] = 0;
                this.target.e = this.current.e, this.target.f = this.current.f, O(this.container, "is-scaling"), O(this.container, "is-animating"), this.isTicking = false;
                let {
                    trackingPoints: n
                } = this, i = n[0], a = n[n.length - 1], l = 0, c = 0, u = 0;
                a && i && (l = a.clientX - i.clientX, c = a.clientY - i.clientY, u = a.time - i.time);
                let m = ((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1;
                m !== 1 && (l *= m, c *= m);
                let s = 0,
                    r = 0,
                    d = 0,
                    h = 0,
                    p = this.option("decelFriction"),
                    f = this.targetScale;
                if (u > 0) {
                    d = Math.abs(l) > 3 ? l / (u / 30) : 0, h = Math.abs(c) > 3 ? c / (u / 30) : 0;
                    let B = this.option("maxVelocity");
                    B && (d = Math.max(Math.min(d, B), -1 * B), h = Math.max(Math.min(h, B), -1 * B))
                }
                d && (s = d / (1 / (1 - p) - 1)), h && (r = h / (1 / (1 - p) - 1)), (this.option("lockAxis") === "y" || this.option("lockAxis") === "xy" && this.lockedAxis === "y" && F(f) === this.minScale) && (s = d = 0), (this.option("lockAxis") === "x" || this.option("lockAxis") === "xy" && this.lockedAxis === "x" && F(f) === this.minScale) && (r = h = 0);
                let Q = this.dragOffset.x,
                    b = this.dragOffset.y,
                    g = this.option("dragMinThreshold") || 0;
                Math.abs(Q) < g && Math.abs(b) < g && (s = r = 0, d = h = 0), (this.option("zoom") && (f < this.minScale - 1e-5 || f > this.maxScale + 1e-5) || e && !s && !r) && (p = .35), this.applyChange({
                    panX: s,
                    panY: r,
                    friction: p
                }), this.emit("decel", d, h, Q, b)
            }
            onWheel(t) {
                var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(a, l) {
                    return Math.abs(l) > Math.abs(a) ? l : a
                });
                let n = Math.max(-1, Math.min(1, e));
                if (this.emit("wheel", t, n), this.panMode === J || t.defaultPrevented) return;
                let i = this.option("wheel");
                i === "pan" ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
                    panX: 2 * -t.deltaX,
                    panY: 2 * -t.deltaY,
                    bounce: false
                })) : i === "zoom" && this.option("zoom") !== false && this.zoomWithWheel(t)
            }
            onMouseMove(t) {
                this.panWithMouse(t)
            }
            onKeydown(t) {
                t.key === "Escape" && this.toggleFS()
            }
            onResize() {
                this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
            }
            setTransform() {
                this.emit("beforeTransform");
                let {
                    current: t,
                    target: e,
                    content: n,
                    contentRect: i
                } = this, a = Object.assign({}, oe);
                for (let Q of ot) {
                    let b = Q == "e" || Q === "f" ? se : hs;
                    a[Q] = F(t[Q], b), Math.abs(e[Q] - t[Q]) < (Q == "e" || Q === "f" ? .51 : .001) && (t[Q] = e[Q])
                }
                let {
                    a: l,
                    b: c,
                    c: u,
                    d: m,
                    e: s,
                    f: r
                } = a, d = `matrix(${l}, ${c}, ${u}, ${m}, ${s}, ${r})`, h = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
                if (this.option("transformParent") && (h = h.parentElement || h), h.style.transform === d) return;
                h.style.transform = d;
                let {
                    contentWidth: p,
                    contentHeight: f
                } = this.calculateContentDim();
                i.width = p, i.height = f, this.emit("afterTransform")
            }
            updateMetrics(t = false) {
                var e;
                if (!this || this.state === R.Destroy || this.isContentLoading) return;
                let n = Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1),
                    {
                        container: i,
                        content: a
                    } = this,
                    l = a instanceof HTMLImageElement,
                    c = i.getBoundingClientRect(),
                    u = getComputedStyle(this.container),
                    m = c.width * n,
                    s = c.height * n,
                    r = parseFloat(u.paddingTop) + parseFloat(u.paddingBottom),
                    d = m - (parseFloat(u.paddingLeft) + parseFloat(u.paddingRight)),
                    h = s - r;
                this.containerRect = {
                    width: m,
                    height: s,
                    innerWidth: d,
                    innerHeight: h
                };
                let p = parseFloat(a.dataset.width || "") || (N => {
                        let Y = 0;
                        return Y = N instanceof HTMLImageElement ? N.naturalWidth : N instanceof SVGElement ? N.width.baseVal.value : Math.max(N.offsetWidth, N.scrollWidth), Y || 0
                    })(a),
                    f = parseFloat(a.dataset.height || "") || (N => {
                        let Y = 0;
                        return Y = N instanceof HTMLImageElement ? N.naturalHeight : N instanceof SVGElement ? N.height.baseVal.value : Math.max(N.offsetHeight, N.scrollHeight), Y || 0
                    })(a),
                    Q = this.option("width", p) || H,
                    b = this.option("height", f) || H,
                    g = Q === H,
                    B = b === H;
                typeof Q != "number" && (Q = p), typeof b != "number" && (b = f), g && (Q = p * (b / f)), B && (b = f / (p / Q));
                let w = a.parentElement instanceof HTMLPictureElement ? a.parentElement : a;
                this.option("transformParent") && (w = w.parentElement || w);
                let x = w.getAttribute("style") || "";
                w.style.setProperty("transform", "none", "important"), l && (w.style.width = "", w.style.height = ""), w.offsetHeight;
                let E = a.getBoundingClientRect(),
                    y = E.width * n,
                    T = E.height * n,
                    S = y,
                    U = T;
                y = Math.min(y, Q), T = Math.min(T, b), l ? {
                    width: y,
                    height: T
                } = ((N, Y, Se, At) => {
                    let Jt = Se / N,
                        lt = At / Y,
                        Ht = Math.min(Jt, lt);
                    return {
                        width: N *= Ht,
                        height: Y *= Ht
                    }
                })(Q, b, y, T) : (y = Math.min(y, Q), T = Math.min(T, b));
                let M = .5 * (U - T),
                    C = .5 * (S - y);
                this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
                    top: E.top - c.top + M,
                    bottom: c.bottom - E.bottom + M,
                    left: E.left - c.left + C,
                    right: c.right - E.right + C,
                    fitWidth: y,
                    fitHeight: T,
                    width: y,
                    height: T,
                    fullWidth: Q,
                    fullHeight: b
                }), w.style.cssText = x, l && (w.style.width = `${y}px`, w.style.height = `${T}px`), this.setTransform(), t !== true && this.emit("refresh"), this.ignoreBounds || (F(this.targetScale) < F(this.minScale) ? this.zoomTo(this.minScale, {
                    friction: 0
                }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
                    friction: 0
                }) : this.state === R.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
            }
            calculateBounds() {
                let {
                    contentWidth: t,
                    contentHeight: e
                } = this.calculateContentDim(this.target), {
                    targetScale: n,
                    lockedAxis: i
                } = this, {
                    fitWidth: a,
                    fitHeight: l
                } = this.contentRect, c = 0, u = 0, m = 0, s = 0, r = this.option("infinite");
                if (r === true || i && r === i) c = -1 / 0, m = 1 / 0, u = -1 / 0, s = 1 / 0;
                else {
                    let {
                        containerRect: d,
                        contentRect: h
                    } = this, p = F(a * n, se), f = F(l * n, se), {
                        innerWidth: Q,
                        innerHeight: b
                    } = d;
                    if (d.width === p && (Q = d.width), d.width === f && (b = d.height), t > Q) {
                        m = .5 * (t - Q), c = -1 * m;
                        let g = .5 * (h.right - h.left);
                        c += g, m += g
                    }
                    if (a > Q && t < Q && (c -= .5 * (a - Q), m -= .5 * (a - Q)), e > b) {
                        s = .5 * (e - b), u = -1 * s;
                        let g = .5 * (h.bottom - h.top);
                        u += g, s += g
                    }
                    l > b && e < b && (c -= .5 * (l - b), m -= .5 * (l - b))
                }
                return {
                    x: {
                        min: c,
                        max: m
                    },
                    y: {
                        min: u,
                        max: s
                    }
                }
            }
            getBounds() {
                let t = this.option("bounds");
                return t !== H ? t : this.calculateBounds()
            }
            updateControls() {
                let t = this,
                    e = t.container,
                    {
                        panMode: n,
                        contentRect: i,
                        targetScale: a,
                        minScale: l
                    } = t,
                    c = l,
                    u = t.option("click") || false;
                u && (c = t.getNextScale(u));
                let m = t.canZoomIn(),
                    s = t.canZoomOut(),
                    r = n === Qi && !!this.option("touch"),
                    d = s && r;
                if (r && (F(a) < F(l) && !this.panOnlyZoomed && (d = true), (F(i.width, 1) > F(i.fitWidth, 1) || F(i.height, 1) > F(i.fitHeight, 1)) && (d = true)), F(i.width * a, 1) < F(i.fitWidth, 1) && (d = false), n === J && (d = false), et(e, this.cn("isDraggable"), d), !this.option("zoom")) return;
                let h = m && F(c) > F(a),
                    p = !h && !d && s && F(c) < F(a);
                et(e, this.cn("canZoomIn"), h), et(e, this.cn("canZoomOut"), p);
                for (let f of e.querySelectorAll("[data-panzoom-action]")) {
                    let Q = false,
                        b = false;
                    switch (f.dataset.panzoomAction) {
                        case "zoomIn":
                            m ? Q = true : b = true;
                            break;
                        case "zoomOut":
                            s ? Q = true : b = true;
                            break;
                        case "toggleZoom":
                        case "iterateZoom":
                            m || s ? Q = true : b = true;
                            let g = f.querySelector("g");
                            g && (g.style.display = m ? "" : "none")
                    }
                    Q ? (f.removeAttribute("disabled"), f.removeAttribute("tabindex")) : b && (f.setAttribute("disabled", ""), f.setAttribute("tabindex", "-1"))
                }
            }
            panTo({
                x: t = this.target.e,
                y: e = this.target.f,
                scale: n = this.targetScale,
                friction: i = this.option("friction"),
                angle: a = 0,
                originX: l = 0,
                originY: c = 0,
                flipX: u = false,
                flipY: m = false,
                ignoreBounds: s = false
            }) {
                this.state !== R.Destroy && this.applyChange({
                    panX: t - this.target.e,
                    panY: e - this.target.f,
                    scale: n / this.targetScale,
                    angle: a,
                    originX: l,
                    originY: c,
                    friction: i,
                    flipX: u,
                    flipY: m,
                    ignoreBounds: s
                })
            }
            applyChange({
                panX: t = 0,
                panY: e = 0,
                scale: n = 1,
                angle: i = 0,
                originX: a = -this.current.e,
                originY: l = -this.current.f,
                friction: c = this.option("friction"),
                flipX: u = false,
                flipY: m = false,
                ignoreBounds: s = false,
                bounce: r = this.option("bounce")
            }) {
                let d = this.state;
                if (d === R.Destroy) return;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = c || 0, this.ignoreBounds = s;
                let {
                    current: h
                } = this, p = h.e, f = h.f, Q = this.getMatrix(this.target), b = new DOMMatrix().translate(p, f).translate(a, l).translate(t, e);
                if (this.option("zoom")) {
                    if (!s) {
                        let g = this.targetScale,
                            B = this.minScale,
                            w = this.maxScale;
                        g * n < B && (n = B / g), g * n > w && (n = w / g)
                    }
                    b = b.scale(n)
                }
                b = b.translate(-a, -l).translate(-p, -f).multiply(Q), i && (b = b.rotate(i)), u && (b = b.scale(-1, 1)), m && (b = b.scale(1, -1));
                for (let g of ot) g !== "e" && g !== "f" && (b[g] > this.minScale + 1e-5 || b[g] < this.minScale - 1e-5) ? this.target[g] = b[g] : this.target[g] = F(b[g], se);
                (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === J || r === false) && !s && this.clampTargetBounds(), d === R.Init ? this.animate() : this.isResting || (this.state = R.Panning, this.requestTick())
            }
            stop(t = false) {
                if (this.state === R.Init || this.state === R.Destroy) return;
                let e = this.isTicking;
                this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = false, this.isBouncingY = false;
                for (let n of ot) this.velocity[n] = 0, t === "current" ? this.current[n] = this.target[n] : t === "target" && (this.target[n] = this.current[n]);
                this.setTransform(), O(this.container, "is-scaling"), O(this.container, "is-animating"), this.isTicking = false, this.state = R.Ready, e && (this.emit("endAnimation"), this.updateControls())
            }
            requestTick() {
                this.isTicking || (this.emit("startAnimation"), this.updateControls(), v(this.container, "is-animating"), this.isScaling && v(this.container, "is-scaling")), this.isTicking = true, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()))
            }
            panWithMouse(t, e = this.option("mouseMoveFriction")) {
                if (this.pmme = t, this.panMode !== J || !t || F(this.targetScale) <= F(this.minScale)) return;
                this.emit("mouseMove", t);
                let {
                    container: n,
                    containerRect: i,
                    contentRect: a
                } = this, l = i.width, c = i.height, u = n.getBoundingClientRect(), m = (t.clientX || 0) - u.left, s = (t.clientY || 0) - u.top, {
                    contentWidth: r,
                    contentHeight: d
                } = this.calculateContentDim(this.target), h = this.option("mouseMoveFactor");
                h > 1 && (r !== l && (r *= h), d !== c && (d *= h));
                let p = .5 * (r - l) - m / l * 100 / 100 * (r - l);
                p += .5 * (a.right - a.left);
                let f = .5 * (d - c) - s / c * 100 / 100 * (d - c);
                f += .5 * (a.bottom - a.top), this.applyChange({
                    panX: p - this.target.e,
                    panY: f - this.target.f,
                    friction: e
                })
            }
            zoomWithWheel(t) {
                if (this.state === R.Destroy || this.state === R.Init) return;
                let e = Date.now();
                if (e - this.pwt < 45) return void t.preventDefault();
                this.pwt = e;
                var n = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(m, s) {
                    return Math.abs(s) > Math.abs(m) ? s : m
                });
                let i = Math.max(-1, Math.min(1, n)),
                    {
                        targetScale: a,
                        maxScale: l,
                        minScale: c
                    } = this,
                    u = a * (100 + 45 * i) / 100;
                F(u) < F(c) && F(a) <= F(c) ? (this.cwd += Math.abs(i), u = c) : F(u) > F(l) && F(a) >= F(l) ? (this.cwd += Math.abs(i), u = l) : (this.cwd = 0, u = Math.max(Math.min(u, l), c)), this.cwd > this.option("wheelLimit") || (t.preventDefault(), F(u) !== F(a) && this.zoomTo(u, {
                    event: t
                }))
            }
            canZoomIn() {
                return this.option("zoom") && (F(this.contentRect.width, 1) < F(this.contentRect.fitWidth, 1) || F(this.targetScale) < F(this.maxScale))
            }
            canZoomOut() {
                return this.option("zoom") && F(this.targetScale) > F(this.minScale)
            }
            zoomIn(t = 1.25, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomOut(t = .8, e) {
                this.zoomTo(this.targetScale * t, e)
            }
            zoomToFit(t) {
                this.zoomTo("fit", t)
            }
            zoomToCover(t) {
                this.zoomTo("cover", t)
            }
            zoomToFull(t) {
                this.zoomTo("full", t)
            }
            zoomToMax(t) {
                this.zoomTo("max", t)
            }
            toggleZoom(t) {
                this.zoomTo(this.getNextScale("toggleZoom"), t)
            }
            toggleMax(t) {
                this.zoomTo(this.getNextScale("toggleMax"), t)
            }
            toggleCover(t) {
                this.zoomTo(this.getNextScale("toggleCover"), t)
            }
            iterateZoom(t) {
                this.zoomTo("next", t)
            }
            zoomTo(t = 1, {
                friction: e = H,
                originX: n = H,
                originY: i = H,
                event: a
            } = {}) {
                if (this.isContentLoading || this.state === R.Destroy) return;
                let {
                    targetScale: l,
                    fullScale: c,
                    maxScale: u,
                    coverScale: m
                } = this;
                if (this.stop(), this.panMode === J && (a = this.pmme || a), a || n === H || i === H) {
                    let r = this.content.getBoundingClientRect(),
                        d = this.container.getBoundingClientRect(),
                        h = a ? a.clientX : d.left + .5 * d.width,
                        p = a ? a.clientY : d.top + .5 * d.height;
                    n = h - r.left - .5 * r.width, i = p - r.top - .5 * r.height
                }
                let s = 1;
                typeof t == "number" ? s = t : t === "full" ? s = c : t === "cover" ? s = m : t === "max" ? s = u : t === "fit" ? s = 1 : t === "next" && (s = this.getNextScale("iterateZoom")), s = s / l || 1, e = e === H ? s > 1 ? .15 : .25 : e, this.applyChange({
                    scale: s,
                    originX: n,
                    originY: i,
                    friction: e
                }), a && this.panMode === J && this.panWithMouse(a, e)
            }
            rotateCCW() {
                this.applyChange({
                    angle: -90
                })
            }
            rotateCW() {
                this.applyChange({
                    angle: 90
                })
            }
            flipX() {
                this.applyChange({
                    flipX: true
                })
            }
            flipY() {
                this.applyChange({
                    flipY: true
                })
            }
            fitX() {
                this.stop("target");
                let {
                    containerRect: t,
                    contentRect: e,
                    target: n
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - n.e,
                    panY: .5 * t.height - (e.top + .5 * e.fitHeight) - n.f,
                    scale: t.width / e.fitWidth / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: true
                })
            }
            fitY() {
                this.stop("target");
                let {
                    containerRect: t,
                    contentRect: e,
                    target: n
                } = this;
                this.applyChange({
                    panX: .5 * t.width - (e.left + .5 * e.fitWidth) - n.e,
                    panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - n.f,
                    scale: t.height / e.fitHeight / this.targetScale,
                    originX: 0,
                    originY: 0,
                    ignoreBounds: true
                })
            }
            toggleFS() {
                let {
                    container: t
                } = this, e = this.cn("inFullscreen"), n = this.cn("htmlHasFullscreen");
                t.classList.toggle(e);
                let i = t.classList.contains(e);
                i ? (document.documentElement.classList.add(n), document.addEventListener("keydown", this.onKeydown, true)) : (document.documentElement.classList.remove(n), document.removeEventListener("keydown", this.onKeydown, true)), this.updateMetrics(), this.emit(i ? "enterFS" : "exitFS")
            }
            getMatrix(t = this.current) {
                let {
                    a: e,
                    b: n,
                    c: i,
                    d: a,
                    e: l,
                    f: c
                } = t;
                return new DOMMatrix([e, n, i, a, l, c])
            }
            reset(t) {
                if (this.state !== R.Init && this.state !== R.Destroy) {
                    this.stop("current");
                    for (let e of ot) this.target[e] = oe[e];
                    this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), this.isResting || (this.friction = t === void 0 ? this.option("friction") : t, this.state = R.Panning, this.requestTick())
                }
            }
            destroy() {
                this.stop(), this.state = R.Destroy, this.detachEvents(), this.detachObserver();
                let {
                    container: t,
                    content: e
                } = this, n = this.option("classes") || {};
                for (let i of Object.values(n)) t.classList.remove(i + "");
                e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
            }
        };
    Object.defineProperty(Qt, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: us
    }), Object.defineProperty(Qt, "Plugins", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {}
    });
    var gi = function(o, t) {
            let e = true;
            return (...n) => {
                e && (e = false, o(...n), setTimeout(() => {
                    e = true
                }, t))
            }
        },
        Fi = (o, t) => {
            let e = [];
            return o.childNodes.forEach(n => {
                n.nodeType !== Node.ELEMENT_NODE || t && !n.matches(t) || e.push(n)
            }), e
        },
        ms = {
            viewport: null,
            track: null,
            enabled: true,
            slides: [],
            axis: "x",
            transition: "fade",
            preload: 1,
            slidesPerPage: "auto",
            initialPage: 0,
            friction: .12,
            Panzoom: {
                decelFriction: .12
            },
            center: true,
            infinite: true,
            fill: true,
            dragFree: false,
            adaptiveHeight: false,
            direction: "ltr",
            classes: {
                container: "f-carousel",
                viewport: "f-carousel__viewport",
                track: "f-carousel__track",
                slide: "f-carousel__slide",
                isLTR: "is-ltr",
                isRTL: "is-rtl",
                isHorizontal: "is-horizontal",
                isVertical: "is-vertical",
                inTransition: "in-transition",
                isSelected: "is-selected"
            },
            l10n: {
                NEXT: "Next slide",
                PREV: "Previous slide",
                GOTO: "Go to slide #%d"
            }
        },
        k;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Destroy = 2] = "Destroy"
    })(k || (k = {}));
    var hn = o => {
            if (typeof o == "string" || o instanceof HTMLElement) o = {
                html: o
            };
            else {
                let t = o.thumb;
                t !== void 0 && (typeof t == "string" && (o.thumbSrc = t), t instanceof HTMLImageElement && (o.thumbEl = t, o.thumbElSrc = t.src, o.thumbSrc = t.src), delete o.thumb)
            }
            return Object.assign({
                html: "",
                el: null,
                isDom: false,
                class: "",
                customClass: "",
                index: -1,
                dim: 0,
                gap: 0,
                pos: 0,
                transition: false
            }, o)
        },
        ps = (o = {}) => Object.assign({
            index: -1,
            slides: [],
            dim: 0,
            pos: -1
        }, o),
        z = class extends yt {
            constructor(t, e) {
                super(e), Object.defineProperty(this, "instance", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: t
                })
            }
            attach() {}
            detach() {}
        },
        fs = {
            classes: {
                list: "f-carousel__dots",
                isDynamic: "is-dynamic",
                hasDots: "has-dots",
                dot: "f-carousel__dot",
                isBeforePrev: "is-before-prev",
                isPrev: "is-prev",
                isCurrent: "is-current",
                isNext: "is-next",
                isAfterNext: "is-after-next"
            },
            dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
            dynamicFrom: 11,
            maxCount: 1 / 0,
            minCount: 2
        },
        be = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "isDynamic", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                }), Object.defineProperty(this, "list", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                })
            }
            onRefresh() {
                this.refresh()
            }
            build() {
                let t = this.list;
                if (!t) {
                    t = document.createElement("ul"), v(t, this.cn("list")), t.setAttribute("role", "tablist");
                    let e = this.instance.container;
                    e.appendChild(t), v(e, this.cn("hasDots")), this.list = t
                }
                return t
            }
            refresh() {
                var t;
                let e = this.instance.pages.length,
                    n = Math.min(2, this.option("minCount")),
                    i = Math.max(2e3, this.option("maxCount")),
                    a = this.option("dynamicFrom");
                if (e < n || e > i) return void this.cleanup();
                let l = typeof a == "number" && e > 5 && e >= a,
                    c = !this.list || this.isDynamic !== l || this.list.children.length !== e;
                c && this.cleanup();
                let u = this.build();
                if (et(u, this.cn("isDynamic"), !!l), c)
                    for (let r = 0; r < e; r++) u.append(this.createItem(r));
                let m, s = 0;
                for (let r of [...u.children]) {
                    let d = s === this.instance.page;
                    d && (m = r), et(r, this.cn("isCurrent"), d), (t = r.children[0]) === null || t === void 0 || t.setAttribute("aria-selected", d ? "true" : "false");
                    for (let h of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) O(r, this.cn(h));
                    s++
                }
                if (m = m || u.firstChild, l && m) {
                    let r = m.previousElementSibling,
                        d = r && r.previousElementSibling;
                    v(r, this.cn("isPrev")), v(d, this.cn("isBeforePrev"));
                    let h = m.nextElementSibling,
                        p = h && h.nextElementSibling;
                    v(h, this.cn("isNext")), v(p, this.cn("isAfterNext"))
                }
                this.isDynamic = l
            }
            createItem(t = 0) {
                var e;
                let n = document.createElement("li");
                n.setAttribute("role", "presentation");
                let i = tt(this.instance.localize(this.option("dotTpl"), [
                    ["%d", t + 1]
                ]).replace(/\%i/g, t + ""));
                return n.appendChild(i), (e = n.children[0]) === null || e === void 0 || e.setAttribute("role", "tab"), n
            }
            cleanup() {
                this.list && (this.list.remove(), this.list = null), this.isDynamic = false, O(this.instance.container, this.cn("hasDots"))
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        };
    Object.defineProperty(be, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: fs
    });
    var ae = "disabled",
        re = "next",
        Bi = "prev",
        ge = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "container", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "prev", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "next", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "isDom", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                })
            }
            onRefresh() {
                let t = this.instance,
                    e = t.pages.length,
                    n = t.page;
                if (e < 2) return void this.cleanup();
                this.build();
                let i = this.prev,
                    a = this.next;
                i && a && (i.removeAttribute(ae), a.removeAttribute(ae), t.isInfinite || (n <= 0 && i.setAttribute(ae, ""), n >= e - 1 && a.setAttribute(ae, "")))
            }
            addBtn(t) {
                var e;
                let n = this.instance,
                    i = document.createElement("button");
                i.setAttribute("tabindex", "0"), i.setAttribute("title", n.localize(`{{${t.toUpperCase()}}}`)), v(i, this.cn("button") + " " + this.cn(t === re ? "isNext" : "isPrev"));
                let a = n.isRTL ? t === re ? Bi : re : t;
                var l;
                return i.innerHTML = n.localize(this.option(`${a}Tpl`)), i.dataset[`carousel${l=t,l?l.match("^[a-z]")?l.charAt(0).toUpperCase()+l.substring(1):l:""}`] = "true", (e = this.container) === null || e === void 0 || e.appendChild(i), i
            }
            build() {
                let t = this.instance.container,
                    e = this.cn("container"),
                    {
                        container: n,
                        prev: i,
                        next: a
                    } = this;
                n || (n = t.querySelector("." + e), this.isDom = !!n), n || (n = document.createElement("div"), v(n, e), t.appendChild(n)), this.container = n, a || (a = n.querySelector("[data-carousel-next]")), a || (a = this.addBtn(re)), this.next = a, i || (i = n.querySelector("[data-carousel-prev]")), i || (i = this.addBtn(Bi)), this.prev = i
            }
            cleanup() {
                this.isDom || (this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove()), this.prev = null, this.next = null, this.container = null, this.isDom = false
            }
            attach() {
                this.instance.on(["refresh", "change"], this.onRefresh)
            }
            detach() {
                this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
            }
        };
    Object.defineProperty(ge, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            classes: {
                container: "f-carousel__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev"
            },
            nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
            prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
        }
    });
    var Fe = class extends z {
        constructor() {
            super(...arguments), Object.defineProperty(this, "selectedIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            }), Object.defineProperty(this, "target", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            }), Object.defineProperty(this, "nav", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            })
        }
        addAsTargetFor(t) {
            this.target = this.instance, this.nav = t, this.attachEvents()
        }
        addAsNavFor(t) {
            this.nav = this.instance, this.target = t, this.attachEvents()
        }
        attachEvents() {
            let {
                nav: t,
                target: e
            } = this;
            t && e && (t.options.initialSlide = e.options.initialPage, t.state === k.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), e.state === k.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady))
        }
        onNavReady(t) {
            t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange()
        }
        onTargetReady(t) {
            t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
        }
        onNavClick(t, e, n) {
            this.onNavTouch(t, t.panzoom, n)
        }
        onNavTouch(t, e, n) {
            var i, a;
            if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
            let l = n.target,
                {
                    nav: c,
                    target: u
                } = this;
            if (!c || !u || !l) return;
            let m = l.closest("[data-index]");
            if (n.stopPropagation(), n.preventDefault(), !m) return;
            let s = parseInt(m.dataset.index || "", 10) || 0,
                r = u.getPageForSlide(s),
                d = c.getPageForSlide(s);
            c.slideTo(d), u.slideTo(r, {
                friction: ((a = (i = this.nav) === null || i === void 0 ? void 0 : i.plugins) === null || a === void 0 ? void 0 : a.Sync.option("friction")) || 0
            }), this.markSelectedSlide(s)
        }
        onNavCreateSlide(t, e) {
            e.index === this.selectedIndex && this.markSelectedSlide(e.index)
        }
        onTargetChange() {
            var t, e;
            let {
                target: n,
                nav: i
            } = this;
            if (!n || !i || i.state !== k.Ready || n.state !== k.Ready) return;
            let a = (e = (t = n.pages[n.page]) === null || t === void 0 ? void 0 : t.slides[0]) === null || e === void 0 ? void 0 : e.index,
                l = i.getPageForSlide(a);
            this.markSelectedSlide(a), i.slideTo(l, i.prevPage === null && n.prevPage === null ? {
                friction: 0
            } : void 0)
        }
        markSelectedSlide(t) {
            let e = this.nav;
            e && e.state === k.Ready && (this.selectedIndex = t, [...e.slides].map(n => {
                n.el && n.el.classList[n.index === t ? "add" : "remove"]("is-nav-selected")
            }))
        }
        attach() {
            let t = this,
                e = t.options.target,
                n = t.options.nav;
            e ? t.addAsNavFor(e) : n && t.addAsTargetFor(n)
        }
        detach() {
            let t = this,
                e = t.nav,
                n = t.target;
            e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, n && (n.off("ready", t.onTargetReady), n.off("refresh", t.onTargetChange), n.off("change", t.onTargetChange)), t.target = null
        }
    };
    Object.defineProperty(Fe, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            friction: .35
        }
    });
    var Qs = {
            Navigation: ge,
            Dots: be,
            Sync: Fe
        },
        le = "animationend",
        Ui = "isSelected",
        ce = "slide",
        vt = class o extends Rt {
            get axis() {
                return this.isHorizontal ? "e" : "f"
            }
            get isEnabled() {
                return this.state === k.Ready
            }
            get isInfinite() {
                let t = false,
                    {
                        contentDim: e,
                        viewportDim: n,
                        pages: i,
                        slides: a
                    } = this,
                    l = a[0];
                return i.length >= 2 && l && e + l.dim >= n && (t = this.option("infinite")), t
            }
            get isRTL() {
                return this.option("direction") === "rtl"
            }
            get isHorizontal() {
                return this.option("axis") === "x"
            }
            constructor(t, e = {}, n = {}) {
                if (super(), Object.defineProperty(this, "bp", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: ""
                    }), Object.defineProperty(this, "lp", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "userOptions", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {}
                    }), Object.defineProperty(this, "userPlugins", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: {}
                    }), Object.defineProperty(this, "state", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: k.Init
                    }), Object.defineProperty(this, "page", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "prevPage", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "container", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: void 0
                    }), Object.defineProperty(this, "viewport", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "track", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "slides", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: []
                    }), Object.defineProperty(this, "pages", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: []
                    }), Object.defineProperty(this, "panzoom", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: null
                    }), Object.defineProperty(this, "inTransition", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: new Set
                    }), Object.defineProperty(this, "contentDim", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), Object.defineProperty(this, "viewportDim", {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: 0
                    }), typeof t == "string" && (t = document.querySelector(t)), !t || !G(t)) throw new Error("No Element found");
                this.container = t, this.slideNext = gi(this.slideNext.bind(this), 150), this.slidePrev = gi(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = n, queueMicrotask(() => {
                    this.processOptions()
                })
            }
            processOptions() {
                var t, e;
                let n = I({}, o.defaults, this.userOptions),
                    i = "",
                    a = n.breakpoints;
                if (a && En(a))
                    for (let [l, c] of Object.entries(a)) window.matchMedia(l).matches && En(c) && (i += l, I(n, c));
                i === this.bp && this.state !== k.Init || (this.bp = i, this.state === k.Ready && (n.initialSlide = ((e = (t = this.pages[this.page]) === null || t === void 0 ? void 0 : t.slides[0]) === null || e === void 0 ? void 0 : e.index) || 0), this.state !== k.Init && this.destroy(), super.setOptions(n), this.option("enabled") === false ? this.attachEvents() : setTimeout(() => {
                    this.init()
                }, 0))
            }
            init() {
                this.state = k.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)), this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = k.Ready, this.emit("ready")
            }
            initLayout() {
                let {
                    container: t
                } = this, e = this.option("classes");
                v(t, this.cn("container")), et(t, e.isLTR, !this.isRTL), et(t, e.isRTL, this.isRTL), et(t, e.isVertical, !this.isHorizontal), et(t, e.isHorizontal, this.isHorizontal);
                let n = this.option("viewport") || t.querySelector(`.${e.viewport}`);
                n || (n = document.createElement("div"), v(n, e.viewport), n.append(...Fi(t, `.${e.slide}`)), t.prepend(n)), n.addEventListener("scroll", this.onScroll);
                let i = this.option("track") || t.querySelector(`.${e.track}`);
                i || (i = document.createElement("div"), v(i, e.track), i.append(...Array.from(n.childNodes))), i.setAttribute("aria-live", "polite"), n.contains(i) || n.prepend(i), this.viewport = n, this.track = i, this.emit("initLayout")
            }
            initSlides() {
                let {
                    track: t
                } = this;
                if (!t) return;
                let e = [...this.slides],
                    n = [];
                [...Fi(t, `.${this.cn(ce)}`)].forEach(i => {
                    if (G(i)) {
                        let a = hn({
                            el: i,
                            isDom: true,
                            index: this.slides.length
                        });
                        n.push(a)
                    }
                });
                for (let i of [...this.option("slides", []) || [], ...e]) n.push(hn(i));
                this.slides = n;
                for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i;
                for (let i of n) this.emit("beforeInitSlide", i, i.index), this.emit("initSlide", i, i.index);
                this.emit("initSlides")
            }
            setInitialPage() {
                let t = this.option("initialSlide");
                this.page = typeof t == "number" ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0
            }
            setInitialPosition() {
                let {
                    track: t,
                    pages: e,
                    isHorizontal: n
                } = this;
                if (!t || !e.length) return;
                let i = this.page;
                e[i] || (this.page = i = 0);
                let a = (e[i].pos || 0) * (this.isRTL && n ? 1 : -1),
                    l = n ? `${a}px` : "0",
                    c = n ? "0" : `${a}px`;
                t.style.transform = `translate3d(${l}, ${c}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
            }
            initPanzoom() {
                this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
                let t = this.option("Panzoom") || {};
                this.panzoom = new Qt(this.viewport, I({}, {
                    content: this.track,
                    zoom: false,
                    panOnlyZoomed: false,
                    lockAxis: this.isHorizontal ? "x" : "y",
                    infinite: this.isInfinite,
                    click: false,
                    dblClick: false,
                    touch: e => !(this.pages.length < 2 && !e.options.infinite),
                    bounds: () => this.getBounds(),
                    maxVelocity: e => Math.abs(e.target[this.axis] - e.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
                }, t)), this.panzoom.on("*", (e, n, ...i) => {
                    this.emit(`Panzoom.${n}`, e, ...i)
                }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation)
            }
            attachEvents() {
                let t = this.container;
                t && (t.addEventListener("click", this.onClick, {
                    passive: false,
                    capture: false
                }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
            }
            createPages() {
                let t = [],
                    {
                        contentDim: e,
                        viewportDim: n
                    } = this,
                    i = this.option("slidesPerPage");
                i = (i === "auto" || e <= n) && this.option("fill") !== false ? 1 / 0 : parseFloat(i + "");
                let a = 0,
                    l = 0,
                    c = 0;
                for (let u of this.slides)(!t.length || l + u.dim - n > .05 || c >= i) && (t.push(ps()), a = t.length - 1, l = 0, c = 0), t[a].slides.push(u), l += u.dim + u.gap, c++;
                return t
            }
            processPages() {
                let t = this.pages,
                    {
                        contentDim: e,
                        viewportDim: n,
                        isInfinite: i
                    } = this,
                    a = this.option("center"),
                    l = this.option("fill"),
                    c = l && a && e > n && !i;
                if (t.forEach((s, r) => {
                        var d;
                        s.index = r, s.pos = ((d = s.slides[0]) === null || d === void 0 ? void 0 : d.pos) || 0, s.dim = 0;
                        for (let [h, p] of s.slides.entries()) s.dim += p.dim, h < s.slides.length - 1 && (s.dim += p.gap);
                        c && s.pos + .5 * s.dim < .5 * n ? s.pos = 0 : c && s.pos + .5 * s.dim >= e - .5 * n ? s.pos = e - n : a && (s.pos += -.5 * (n - s.dim))
                    }), t.forEach(s => {
                        l && !i && e > n && (s.pos = Math.max(s.pos, 0), s.pos = Math.min(s.pos, e - n)), s.pos = F(s.pos, 1e3), s.dim = F(s.dim, 1e3), Math.abs(s.pos) <= .1 && (s.pos = 0)
                    }), i) return t;
                let u = [],
                    m;
                return t.forEach(s => {
                    let r = Object.assign({}, s);
                    m && r.pos === m.pos ? (m.dim += r.dim, m.slides = [...m.slides, ...r.slides]) : (r.index = u.length, m = r, u.push(r))
                }), u
            }
            getPageFromIndex(t = 0) {
                let e = this.pages.length,
                    n;
                return t = parseInt((t || 0).toString()) || 0, n = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), n
            }
            getSlideMetrics(t) {
                var e, n;
                let i = this.isHorizontal ? "width" : "height",
                    a = 0,
                    l = 0,
                    c = t.el,
                    u = !(!c || c.parentNode);
                if (c ? a = parseFloat(c.dataset[i] || "") || 0 : (c = document.createElement("div"), c.style.visibility = "hidden", (this.track || document.body).prepend(c)), v(c, this.cn(ce) + " " + t.class + " " + t.customClass), a) c.style[i] = `${a}px`, c.style[i === "width" ? "height" : "width"] = "";
                else {
                    u && (this.track || document.body).prepend(c), a = c.getBoundingClientRect()[i] * Math.max(1, ((e = window.visualViewport) === null || e === void 0 ? void 0 : e.scale) || 1);
                    let s = c[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
                    s - 1 > a && (a = s)
                }
                let m = getComputedStyle(c);
                return m.boxSizing === "content-box" && (this.isHorizontal ? (a += parseFloat(m.paddingLeft) || 0, a += parseFloat(m.paddingRight) || 0) : (a += parseFloat(m.paddingTop) || 0, a += parseFloat(m.paddingBottom) || 0)), l = parseFloat(m[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, u ? (n = c.parentElement) === null || n === void 0 || n.removeChild(c) : t.el || c.remove(), {
                    dim: F(a, 1e3),
                    gap: F(l, 1e3)
                }
            }
            getBounds() {
                let {
                    isInfinite: t,
                    isRTL: e,
                    isHorizontal: n,
                    pages: i
                } = this, a = {
                    min: 0,
                    max: 0
                };
                if (t) a = {
                    min: -1 / 0,
                    max: 1 / 0
                };
                else if (i.length) {
                    let l = i[0].pos,
                        c = i[i.length - 1].pos;
                    a = e && n ? {
                        min: l,
                        max: c
                    } : {
                        min: -1 * c,
                        max: -1 * l
                    }
                }
                return {
                    x: n ? a : {
                        min: 0,
                        max: 0
                    },
                    y: n ? {
                        min: 0,
                        max: 0
                    } : a
                }
            }
            repositionSlides() {
                let t, {
                        isHorizontal: e,
                        isRTL: n,
                        isInfinite: i,
                        viewport: a,
                        viewportDim: l,
                        contentDim: c,
                        page: u,
                        pages: m,
                        slides: s,
                        panzoom: r
                    } = this,
                    d = 0,
                    h = 0,
                    p = 0,
                    f = 0;
                r ? f = -1 * r.current[this.axis] : m[u] && (f = m[u].pos || 0), t = e ? n ? "right" : "left" : "top", n && e && (f *= -1);
                for (let B of s) {
                    let w = B.el;
                    w ? (t === "top" ? (w.style.right = "", w.style.left = "") : w.style.top = "", B.index !== d ? w.style[t] = h === 0 ? "" : `${F(h,1e3)}px` : w.style[t] = "", p += B.dim + B.gap, d++) : h += B.dim + B.gap
                }
                if (i && p && a) {
                    let B = getComputedStyle(a),
                        w = "padding",
                        x = e ? "Right" : "Bottom",
                        E = parseFloat(B[w + (e ? "Left" : "Top")]);
                    f -= E, l += E, l += parseFloat(B[w + x]);
                    for (let y of s) y.el && (F(y.pos) < F(l) && F(y.pos + y.dim + y.gap) < F(f) && F(f) > F(c - l) && (y.el.style[t] = `${F(h+p,1e3)}px`), F(y.pos + y.gap) >= F(c - l) && F(y.pos) > F(f + l) && F(f) < F(l) && (y.el.style[t] = `-${F(p,1e3)}px`))
                }
                let Q, b, g = [...this.inTransition];
                if (g.length > 1 && (Q = m[g[0]], b = m[g[1]]), Q && b) {
                    let B = 0;
                    for (let w of s) w.el ? this.inTransition.has(w.index) && Q.slides.indexOf(w) < 0 && (w.el.style[t] = `${F(B+(Q.pos-b.pos),1e3)}px`) : B += w.dim + w.gap
                }
            }
            createSlideEl(t) {
                let {
                    track: e,
                    slides: n
                } = this;
                if (!e || !t || t.el && t.el.parentNode) return;
                let i = t.el || document.createElement("div");
                v(i, this.cn(ce)), v(i, t.class), v(i, t.customClass);
                let a = t.html;
                a && (a instanceof HTMLElement ? i.appendChild(a) : i.innerHTML = t.html + "");
                let l = [];
                n.forEach((s, r) => {
                    s.el && l.push(r)
                });
                let c = t.index,
                    u = null;
                l.length && (u = n[l.reduce((s, r) => Math.abs(r - c) < Math.abs(s - c) ? r : s)]);
                let m = u && u.el && u.el.parentNode ? u.index < t.index ? u.el.nextSibling : u.el : null;
                e.insertBefore(i, e.contains(m) ? m : null), t.el = i, this.emit("createSlide", t)
            }
            removeSlideEl(t, e = false) {
                let n = t?.el;
                if (!n || !n.parentNode) return;
                let i = this.cn(Ui);
                if (n.classList.contains(i) && (O(n, i), this.emit("unselectSlide", t)), t.isDom && !e) return n.removeAttribute("aria-hidden"), n.removeAttribute("data-index"), void(n.style.left = "");
                this.emit("removeSlide", t);
                let a = new CustomEvent(le);
                n.dispatchEvent(a), t.el && (t.el.remove(), t.el = null)
            }
            transitionTo(t = 0, e = this.option("transition")) {
                var n, i, a, l;
                if (!e) return false;
                let c = this.page,
                    {
                        pages: u,
                        panzoom: m
                    } = this;
                t = parseInt((t || 0).toString()) || 0;
                let s = this.getPageFromIndex(t);
                if (!m || !u[s] || u.length < 2 || Math.abs((((i = (n = u[c]) === null || n === void 0 ? void 0 : n.slides[0]) === null || i === void 0 ? void 0 : i.dim) || 0) - this.viewportDim) > 1) return false;
                let r = t > c ? 1 : -1;
                this.isInfinite && (c === 0 && t === u.length - 1 && (r = -1), c === u.length - 1 && t === 0 && (r = 1));
                let d = u[s].pos * (this.isRTL ? 1 : -1);
                if (c === s && Math.abs(d - m.target[this.axis]) < 1) return false;
                this.clearTransitions();
                let h = m.isResting;
                v(this.container, this.cn("inTransition"));
                let p = ((a = u[c]) === null || a === void 0 ? void 0 : a.slides[0]) || null,
                    f = ((l = u[s]) === null || l === void 0 ? void 0 : l.slides[0]) || null;
                this.inTransition.add(f.index), this.createSlideEl(f);
                let Q = p.el,
                    b = f.el;
                h || e === ce || (e = "fadeFast", Q = null);
                let g = this.isRTL ? "next" : "prev",
                    B = this.isRTL ? "prev" : "next";
                return Q && (this.inTransition.add(p.index), p.transition = e, Q.addEventListener(le, this.onAnimationEnd), Q.classList.add(`f-${e}Out`, `to-${r>0?B:g}`)), b && (f.transition = e, b.addEventListener(le, this.onAnimationEnd), b.classList.add(`f-${e}In`, `from-${r>0?g:B}`)), m.current[this.axis] = d, m.target[this.axis] = d, m.requestTick(), this.onChange(s), true
            }
            manageSlideVisiblity() {
                let t = new Set,
                    e = new Set,
                    n = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
                for (let i of this.slides) n.has(i) ? t.add(i) : e.add(i);
                for (let i of this.inTransition) t.add(this.slides[i]);
                for (let i of t) this.createSlideEl(i), this.lazyLoadSlide(i);
                for (let i of e) t.has(i) || this.removeSlideEl(i);
                this.markSelectedSlides(), this.repositionSlides()
            }
            markSelectedSlides() {
                if (!this.pages[this.page] || !this.pages[this.page].slides) return;
                let t = "aria-hidden",
                    e = this.cn(Ui);
                if (e)
                    for (let n of this.slides) {
                        let i = n.el;
                        i && (i.dataset.index = `${n.index}`, i.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(n) ? i.removeAttribute(t) : i.setAttribute(t, "true") : this.pages[this.page].slides.includes(n) ? (i.classList.contains(e) || (v(i, e), this.emit("selectSlide", n)), i.removeAttribute(t)) : (i.classList.contains(e) && (O(i, e), this.emit("unselectSlide", n)), i.setAttribute(t, "true")))
                    }
            }
            flipInfiniteTrack() {
                let {
                    axis: t,
                    isHorizontal: e,
                    isInfinite: n,
                    isRTL: i,
                    viewportDim: a,
                    contentDim: l
                } = this, c = this.panzoom;
                if (!c || !n) return;
                let u = c.current[t],
                    m = c.target[t] - u,
                    s = 0,
                    r = .5 * a;
                i && e ? (u < -r && (s = -1, u += l), u > l - r && (s = 1, u -= l)) : (u > r && (s = 1, u -= l), u < -l + r && (s = -1, u += l)), s && (c.current[t] = u, c.target[t] = u + m)
            }
            lazyLoadImg(t, e) {
                let n = this,
                    i = "f-fadeIn",
                    a = "is-preloading",
                    l = false,
                    c = null,
                    u = () => {
                        l || (l = true, c && (c.remove(), c = null), O(e, a), e.complete && (v(e, i), setTimeout(() => {
                            O(e, i)
                        }, 350)), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (n.updateMetrics(), n.setViewportHeight()), this.emit("load", t))
                    };
                v(e, a), e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.addEventListener("error", () => {
                    u()
                }), e.addEventListener("load", () => {
                    u()
                }), setTimeout(() => {
                    let m = e.parentNode;
                    m && t.el && (e.complete ? u() : l || (c = tt(Xn), m.insertBefore(c, e)))
                }, 300)
            }
            lazyLoadSlide(t) {
                let e = t && t.el;
                if (!e) return;
                let n = new Set,
                    i = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));
                e.dataset.lazySrc && i.push(e), i.map(a => {
                    a instanceof HTMLImageElement ? n.add(a) : a instanceof HTMLElement && a.dataset.lazySrc && (a.style.backgroundImage = `url('${a.dataset.lazySrc}')`, delete a.dataset.lazySrc)
                });
                for (let a of n) this.lazyLoadImg(t, a)
            }
            onAnimationEnd(t) {
                var e;
                let n = t.target,
                    i = n ? parseInt(n.dataset.index || "", 10) || 0 : -1,
                    a = this.slides[i],
                    l = t.animationName;
                if (!n || !a || !l) return;
                let c = !!this.inTransition.has(i) && a.transition;
                c && l.substring(0, c.length + 2) === `f-${c}` && this.inTransition.delete(i), this.inTransition.size || this.clearTransitions(), i === this.page && (!((e = this.panzoom) === null || e === void 0) && e.isResting) && this.emit("settle")
            }
            onDecel(t, e = 0, n = 0, i = 0, a = 0) {
                if (this.option("dragFree")) return void this.setPageFromPosition();
                let {
                    isRTL: l,
                    isHorizontal: c,
                    axis: u,
                    pages: m
                } = this, s = m.length, r = Math.abs(Math.atan2(n, e) / (Math.PI / 180)), d = 0;
                if (d = r > 45 && r < 135 ? c ? 0 : n : c ? e : 0, !s) return;
                let h = this.page,
                    p = l && c ? 1 : -1,
                    f = t.current[u] * p,
                    {
                        pageIndex: Q
                    } = this.getPageFromPosition(f);
                Math.abs(d) > 5 ? (m[h].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (h = Q), h = l && c ? d < 0 ? h - 1 : h + 1 : d < 0 ? h + 1 : h - 1) : h = i === 0 && a === 0 ? h : Q, this.slideTo(h, {
                    transition: false,
                    friction: t.option("decelFriction")
                })
            }
            onClick(t) {
                let e = t.target,
                    n = e && G(e) ? e.dataset : null,
                    i, a;
                n && (n.carouselPage !== void 0 ? (a = "slideTo", i = n.carouselPage) : n.carouselNext !== void 0 ? a = "slideNext" : n.carouselPrev !== void 0 && (a = "slidePrev")), a ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[a](i)) : this.emit("click", t)
            }
            onSlideTo(t) {
                let e = t.detail || 0;
                this.slideTo(this.getPageForSlide(e), {
                    friction: 0
                })
            }
            onChange(t, e = 0) {
                let n = this.page;
                this.prevPage = n, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== n && (this.markSelectedSlides(), this.emit("change", t, n, e))
            }
            onRefresh() {
                let t = this.contentDim,
                    e = this.viewportDim;
                this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
                    friction: 0,
                    transition: false
                })
            }
            onScroll() {
                var t;
                (t = this.viewport) === null || t === void 0 || t.scroll(0, 0)
            }
            onResize() {
                this.option("breakpoints") && this.processOptions()
            }
            onBeforeTransform(t) {
                this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), this.lp = t.current.e
            }
            onEndAnimation() {
                this.inTransition.size || this.emit("settle")
            }
            reInit(t = null, e = null) {
                this.destroy(), this.state = k.Init, this.prevPage = null, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
            }
            slideTo(t = 0, {
                friction: e = this.option("friction"),
                transition: n = this.option("transition")
            } = {}) {
                if (this.state === k.Destroy) return;
                t = parseInt((t || 0).toString()) || 0;
                let i = this.getPageFromIndex(t),
                    {
                        axis: a,
                        isHorizontal: l,
                        isRTL: c,
                        pages: u,
                        panzoom: m
                    } = this,
                    s = u.length,
                    r = c && l ? 1 : -1;
                if (!m || !s) return;
                if (this.page !== i) {
                    let h = new Event("beforeChange", {
                        bubbles: true,
                        cancelable: true
                    });
                    if (this.emit("beforeChange", h, t), h.defaultPrevented) return
                }
                if (this.transitionTo(t, n)) return;
                let d = u[i].pos;
                if (this.isInfinite) {
                    let h = this.contentDim,
                        p = m.target[a] * r;
                    s === 2 ? d += h * Math.floor(parseFloat(t + "") / 2) : d = [d, d - h, d + h].reduce(function(f, Q) {
                        return Math.abs(Q - p) < Math.abs(f - p) ? Q : f
                    })
                }
                d *= r, Math.abs(m.target[a] - d) < 1 || (m.panTo({
                    x: l ? d : 0,
                    y: l ? 0 : d,
                    friction: e
                }), this.onChange(i))
            }
            slideToClosest(t) {
                if (this.panzoom) {
                    let {
                        pageIndex: e
                    } = this.getPageFromPosition();
                    this.slideTo(e, t)
                }
            }
            slideNext() {
                this.slideTo(this.page + 1)
            }
            slidePrev() {
                this.slideTo(this.page - 1)
            }
            clearTransitions() {
                this.inTransition.clear(), O(this.container, this.cn("inTransition"));
                let t = ["to-prev", "to-next", "from-prev", "from-next"];
                for (let e of this.slides) {
                    let n = e.el;
                    if (n) {
                        n.removeEventListener(le, this.onAnimationEnd), n.classList.remove(...t);
                        let i = e.transition;
                        i && n.classList.remove(`f-${i}Out`, `f-${i}In`)
                    }
                }
                this.manageSlideVisiblity()
            }
            addSlide(t, e) {
                var n, i, a, l;
                let c = this.panzoom,
                    u = ((n = this.pages[this.page]) === null || n === void 0 ? void 0 : n.pos) || 0,
                    m = ((i = this.pages[this.page]) === null || i === void 0 ? void 0 : i.dim) || 0,
                    s = this.contentDim < this.viewportDim,
                    r = Array.isArray(e) ? e : [e],
                    d = [];
                for (let h of r) d.push(hn(h));
                this.slides.splice(t, 0, ...d);
                for (let h = 0; h < this.slides.length; h++) this.slides[h].index = h;
                for (let h of d) this.emit("beforeInitSlide", h, h.index);
                if (this.page >= t && (this.page += d.length), this.updateMetrics(), c) {
                    let h = ((a = this.pages[this.page]) === null || a === void 0 ? void 0 : a.pos) || 0,
                        p = ((l = this.pages[this.page]) === null || l === void 0 ? void 0 : l.dim) || 0,
                        f = this.pages.length || 1,
                        Q = this.isRTL ? m - p : p - m,
                        b = this.isRTL ? u - h : h - u;
                    s && f === 1 ? (t <= this.page && (c.current[this.axis] -= Q, c.target[this.axis] -= Q), c.panTo({
                        [this.isHorizontal ? "x" : "y"]: -1 * h
                    })) : b && t <= this.page && (c.target[this.axis] -= b, c.current[this.axis] -= b, c.requestTick())
                }
                for (let h of d) this.emit("initSlide", h, h.index)
            }
            prependSlide(t) {
                this.addSlide(0, t)
            }
            appendSlide(t) {
                this.addSlide(this.slides.length, t)
            }
            removeSlide(t) {
                let e = this.slides.length;
                t = (t % e + e) % e;
                let n = this.slides[t];
                if (n) {
                    this.removeSlideEl(n, true), this.slides.splice(t, 1);
                    for (let i = 0; i < this.slides.length; i++) this.slides[i].index = i;
                    this.updateMetrics(), this.slideTo(this.page, {
                        friction: 0,
                        transition: false
                    }), this.emit("destroySlide", n)
                }
            }
            updateMetrics() {
                let {
                    panzoom: t,
                    viewport: e,
                    track: n,
                    slides: i,
                    isHorizontal: a,
                    isInfinite: l
                } = this;
                if (!n) return;
                let c = a ? "width" : "height",
                    u = a ? "offsetWidth" : "offsetHeight";
                if (e) {
                    let r = Math.max(e[u], F(e.getBoundingClientRect()[c], 1e3)),
                        d = getComputedStyle(e),
                        h = "padding",
                        p = a ? "Right" : "Bottom";
                    r -= parseFloat(d[h + (a ? "Left" : "Top")]) + parseFloat(d[h + p]), this.viewportDim = r
                }
                let m, s = 0;
                for (let [r, d] of i.entries()) {
                    let h = 0,
                        p = 0;
                    !d.el && m ? (h = m.dim, p = m.gap) : ({
                        dim: h,
                        gap: p
                    } = this.getSlideMetrics(d), m = d), h = F(h, 1e3), p = F(p, 1e3), d.dim = h, d.gap = p, d.pos = s, s += h, (l || r < i.length - 1) && (s += p)
                }
                s = F(s, 1e3), this.contentDim = s, t && (t.contentRect[c] = s, t.contentRect[a ? "fullWidth" : "fullHeight"] = s), this.pages = this.createPages(), this.pages = this.processPages(), this.state === k.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), this.emit("refresh")
            }
            getProgress(t, e = false, n = false) {
                t === void 0 && (t = this.page);
                let i = this,
                    a = i.panzoom,
                    l = i.contentDim,
                    c = i.pages[t] || 0;
                if (!c || !a) return t > this.page ? -1 : 1;
                let u = -1 * a.current.e,
                    m = F((u - c.pos) / (1 * c.dim), 1e3),
                    s = m,
                    r = m;
                this.isInfinite && n !== true && (s = F((u - c.pos + l) / (1 * c.dim), 1e3), r = F((u - c.pos - l) / (1 * c.dim), 1e3));
                let d = [m, s, r].reduce(function(h, p) {
                    return Math.abs(p) < Math.abs(h) ? p : h
                });
                return e ? d : d > 1 ? 1 : d < -1 ? -1 : d
            }
            setViewportHeight() {
                let {
                    page: t,
                    pages: e,
                    viewport: n,
                    isHorizontal: i
                } = this;
                if (!n || !e[t]) return;
                let a = 0;
                i && this.track && (this.track.style.height = "auto", e[t].slides.forEach(l => {
                    l.el && (a = Math.max(a, l.el.offsetHeight))
                })), n.style.height = a ? `${a}px` : ""
            }
            getPageForSlide(t) {
                for (let e of this.pages)
                    for (let n of e.slides)
                        if (n.index === t) return e.index;
                return -1
            }
            getVisibleSlides(t = 0) {
                var e;
                let n = new Set,
                    {
                        panzoom: i,
                        contentDim: a,
                        viewportDim: l,
                        pages: c,
                        page: u
                    } = this;
                if (l) {
                    a = a + ((e = this.slides[this.slides.length - 1]) === null || e === void 0 ? void 0 : e.gap) || 0;
                    let m = 0;
                    m = i && i.state !== R.Init && i.state !== R.Destroy ? -1 * i.current[this.axis] : c[u] && c[u].pos || 0, this.isInfinite && (m -= Math.floor(m / a) * a), this.isRTL && this.isHorizontal && (m *= -1);
                    let s = m - l * t,
                        r = m + l * (t + 1),
                        d = this.isInfinite ? [-1, 0, 1] : [0];
                    for (let h of this.slides)
                        for (let p of d) {
                            let f = h.pos + p * a,
                                Q = f + h.dim + h.gap;
                            f < r && Q > s && n.add(h)
                        }
                }
                return n
            }
            getPageFromPosition(t) {
                let {
                    viewportDim: e,
                    contentDim: n,
                    slides: i,
                    pages: a,
                    panzoom: l
                } = this, c = a.length, u = i.length, m = i[0], s = i[u - 1], r = this.option("center"), d = 0, h = 0, p = 0, f = t === void 0 ? -1 * (l?.target[this.axis] || 0) : t;
                r && (f += .5 * e), this.isInfinite ? (f < m.pos - .5 * s.gap && (f -= n, p = -1), f > s.pos + s.dim + .5 * s.gap && (f -= n, p = 1)) : f = Math.max(m.pos || 0, Math.min(f, s.pos));
                let Q = s,
                    b = i.find(g => {
                        let B = g.pos - .5 * Q.gap,
                            w = g.pos + g.dim + .5 * g.gap;
                        return Q = g, f >= B && f < w
                    });
                return b || (b = s), h = this.getPageForSlide(b.index), d = h + p * c, {
                    page: d,
                    pageIndex: h
                }
            }
            setPageFromPosition() {
                let {
                    pageIndex: t
                } = this.getPageFromPosition();
                this.onChange(t)
            }
            destroy() {
                if ([k.Destroy].includes(this.state)) return;
                this.state = k.Destroy;
                let {
                    container: t,
                    viewport: e,
                    track: n,
                    slides: i,
                    panzoom: a
                } = this, l = this.option("classes");
                t.removeEventListener("click", this.onClick, {
                    passive: false,
                    capture: false
                }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), a && (a.destroy(), this.panzoom = null), i && i.forEach(u => {
                    this.removeSlideEl(u)
                }), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), e.offsetParent && n && n.offsetParent && e.replaceWith(...n.childNodes));
                for (let [u, m] of Object.entries(l)) u !== "container" && m && t.classList.remove(m);
                this.track = null, this.viewport = null, this.page = 0, this.slides = [];
                let c = this.events.get("ready");
                this.events = new Map, c && this.events.set("ready", c)
            }
        };
    Object.defineProperty(vt, "Panzoom", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Qt
    }), Object.defineProperty(vt, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ms
    }), Object.defineProperty(vt, "Plugins", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Qs
    });
    var Ii = function(o) {
            if (!G(o)) return 0;
            let t = window.scrollY,
                e = window.innerHeight,
                n = t + e,
                i = o.getBoundingClientRect(),
                a = i.y + t,
                l = i.height,
                c = a + l;
            if (t > c || n < a) return 0;
            if (t < a && n > c || a < t && c > n) return 100;
            let u = l;
            a < t && (u -= t - a), c > n && (u -= c - n);
            let m = u / e * 100;
            return Math.round(m)
        },
        Ot = !(typeof window > "u" || !window.document || !window.document.createElement),
        mn, pn = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
        vi = o => {
            if (o && Ot) {
                mn === void 0 && document.createElement("div").focus({
                    get preventScroll() {
                        return mn = true, false
                    }
                });
                try {
                    if (mn) o.focus({
                        preventScroll: true
                    });
                    else {
                        let t = window.scrollY || document.body.scrollTop,
                            e = window.scrollX || document.body.scrollLeft;
                        o.focus(), document.body.scrollTo({
                            top: t,
                            left: e,
                            behavior: "auto"
                        })
                    }
                } catch {}
            }
        },
        zi = () => {
            let o = document,
                t, e = "",
                n = "",
                i = "";
            return o.fullscreenEnabled ? (e = "requestFullscreen", n = "exitFullscreen", i = "fullscreenElement") : o.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", n = "webkitExitFullscreen", i = "webkitFullscreenElement"), e && (t = {
                request: function(a = o.documentElement) {
                    return e === "webkitRequestFullscreen" ? a[e](Element.ALLOW_KEYBOARD_INPUT) : a[e]()
                },
                exit: function() {
                    return o[i] && o[n]()
                },
                isFullscreen: function() {
                    return o[i]
                }
            }), t
        },
        Nn = {
            animated: true,
            autoFocus: true,
            backdropClick: "close",
            Carousel: {
                classes: {
                    container: "fancybox__carousel",
                    viewport: "fancybox__viewport",
                    track: "fancybox__track",
                    slide: "fancybox__slide"
                }
            },
            closeButton: "auto",
            closeExisting: false,
            commonCaption: false,
            compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
            contentClick: "toggleZoom",
            contentDblClick: false,
            defaultType: "image",
            defaultDisplay: "flex",
            dragToClose: true,
            Fullscreen: {
                autoStart: false
            },
            groupAll: false,
            groupAttr: "data-fancybox",
            hideClass: "f-fadeOut",
            hideScrollbar: true,
            idle: 3500,
            keyboard: {
                Escape: "close",
                Delete: "close",
                Backspace: "close",
                PageUp: "next",
                PageDown: "prev",
                ArrowUp: "prev",
                ArrowDown: "next",
                ArrowRight: "next",
                ArrowLeft: "prev"
            },
            l10n: Object.assign(Object.assign({}, Gi), {
                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                MODAL: "You can close this modal content with the ESC key",
                ERROR: "Something Went Wrong, Please Try Again Later",
                IMAGE_ERROR: "Image Not Found",
                ELEMENT_NOT_FOUND: "HTML Element Not Found",
                AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                IFRAME_ERROR: "Error Loading Page",
                TOGGLE_ZOOM: "Toggle zoom level",
                TOGGLE_THUMBS: "Toggle thumbnails",
                TOGGLE_SLIDESHOW: "Toggle slideshow",
                TOGGLE_FULLSCREEN: "Toggle full-screen mode",
                DOWNLOAD: "Download"
            }),
            parentEl: null,
            placeFocusBack: true,
            showClass: "f-zoomInUp",
            startIndex: 0,
            tpl: {
                closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
                main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
    <div class="fancybox__backdrop"></div>
    <div class="fancybox__carousel"></div>
    <div class="fancybox__footer"></div>
  </div>`
            },
            trapFocus: true,
            wheel: "zoom"
        },
        V, _;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Closing = 2] = "Closing", o[o.CustomClosing = 3] = "CustomClosing", o[o.Destroy = 4] = "Destroy"
    })(V || (V = {})),
    function(o) {
        o[o.Loading = 0] = "Loading", o[o.Opening = 1] = "Opening", o[o.Ready = 2] = "Ready", o[o.Closing = 3] = "Closing"
    }(_ || (_ = {}));
    var yi = "",
        Xt = false,
        de = false,
        pt = null,
        Yi = () => {
            let o = "",
                t = "",
                e = K.getInstance();
            if (e) {
                let n = e.carousel,
                    i = e.getSlide();
                if (n && i) {
                    let a = i.slug || void 0,
                        l = i.triggerEl || void 0;
                    t = a || e.option("slug") || "", !t && l && l.dataset && (t = l.dataset.fancybox || ""), t && t !== "true" && (o = "#" + t + (!a && n.slides.length > 1 ? "-" + (i.index + 1) : ""))
                }
            }
            return {
                hash: o,
                slug: t,
                index: 1
            }
        },
        Be = () => {
            let o = new URL(document.URL).hash,
                t = o.slice(1).split("-"),
                e = t[t.length - 1],
                n = e && /^\+?\d+$/.test(e) && parseInt(t.pop() || "1", 10) || 1;
            return {
                hash: o,
                slug: t.join("-"),
                index: n
            }
        },
        Ai = () => {
            let {
                slug: o,
                index: t
            } = Be();
            if (!o) return;
            let e = document.querySelector(`[data-slug="${o}"]`);
            if (e && e.dispatchEvent(new CustomEvent("click", {
                    bubbles: true,
                    cancelable: true
                })), K.getInstance()) return;
            let n = document.querySelectorAll(`[data-fancybox="${o}"]`);
            n.length && (e = n[t - 1], e && e.dispatchEvent(new CustomEvent("click", {
                bubbles: true,
                cancelable: true
            })))
        },
        Ji = () => {
            if (K.defaults.Hash === false) return;
            let o = K.getInstance();
            if (o?.options.Hash === false) return;
            let {
                slug: t,
                index: e
            } = Be(), {
                slug: n
            } = Yi();
            o && (t === n ? o.jumpTo(e - 1) : (Xt = true, o.close())), Ai()
        },
        Hi = () => {
            pt && clearTimeout(pt), queueMicrotask(() => {
                Ji()
            })
        },
        xi = () => {
            window.addEventListener("hashchange", Hi, false), setTimeout(() => {
                Ji()
            }, 500)
        };
    Ot && (/complete|interactive|loaded/.test(document.readyState) ? xi() : document.addEventListener("DOMContentLoaded", xi));
    var ue = "is-zooming-in",
        Ue = class extends z {
            onCreateSlide(t, e, n) {
                let i = this.instance.optionFor(n, "src") || "";
                n.el && n.type === "image" && typeof i == "string" && this.setImage(n, i)
            }
            onRemoveSlide(t, e, n) {
                n.panzoom && n.panzoom.destroy(), n.panzoom = void 0, n.imageEl = void 0
            }
            onChange(t, e, n, i) {
                O(this.instance.container, ue);
                for (let a of e.slides) {
                    let l = a.panzoom;
                    l && a.index !== n && l.reset(.35)
                }
            }
            onClose() {
                var t;
                let e = this.instance,
                    n = e.container,
                    i = e.getSlide();
                if (!n || !n.parentElement || !i) return;
                let {
                    el: a,
                    contentEl: l,
                    panzoom: c,
                    thumbElSrc: u
                } = i;
                if (!a || !u || !l || !c || c.isContentLoading || c.state === R.Init || c.state === R.Destroy) return;
                c.updateMetrics();
                let m = this.getZoomInfo(i);
                if (!m) return;
                this.instance.state = V.CustomClosing, n.classList.remove(ue), n.classList.add("is-zooming-out"), l.style.backgroundImage = `url('${u}')`;
                let s = n.getBoundingClientRect();
                (((t = window.visualViewport) === null || t === void 0 ? void 0 : t.scale) || 1) === 1 && Object.assign(n.style, {
                    position: "absolute",
                    top: `${n.offsetTop+window.scrollY}px`,
                    left: `${n.offsetLeft+window.scrollX}px`,
                    bottom: "auto",
                    right: "auto",
                    width: `${s.width}px`,
                    height: `${s.height}px`,
                    overflow: "hidden"
                });
                let {
                    x: r,
                    y: d,
                    scale: h,
                    opacity: p
                } = m;
                if (p) {
                    let f = ((Q, b, g, B) => {
                        let w = b - Q,
                            x = B - g;
                        return E => g + ((E - Q) / w * x || 0)
                    })(c.scale, h, 1, 0);
                    c.on("afterTransform", () => {
                        l.style.opacity = f(c.scale) + ""
                    })
                }
                c.on("endAnimation", () => {
                    e.destroy()
                }), c.target.a = h, c.target.b = 0, c.target.c = 0, c.target.d = h, c.panTo({
                    x: r,
                    y: d,
                    scale: h,
                    friction: p ? .2 : .33,
                    ignoreBounds: true
                }), c.isResting && e.destroy()
            }
            setImage(t, e) {
                let n = this.instance;
                t.src = e, this.process(t, e).then(i => {
                    let {
                        contentEl: a,
                        imageEl: l,
                        thumbElSrc: c,
                        el: u
                    } = t;
                    if (n.isClosing() || !a || !l) return;
                    a.offsetHeight;
                    let m = !!n.isOpeningSlide(t) && this.getZoomInfo(t);
                    if (this.option("protected") && u) {
                        u.addEventListener("contextmenu", d => {
                            d.preventDefault()
                        });
                        let r = document.createElement("div");
                        v(r, "fancybox-protected"), a.appendChild(r)
                    }
                    if (c && m) {
                        let r = i.contentRect,
                            d = Math.max(r.fullWidth, r.fullHeight),
                            h = null;
                        !m.opacity && d > 1200 && (h = document.createElement("img"), v(h, "fancybox-ghost"), h.src = c, a.appendChild(h));
                        let p = () => {
                            h && (v(h, "f-fadeFastOut"), setTimeout(() => {
                                h && (h.remove(), h = null)
                            }, 200))
                        };
                        (s = c, new Promise((f, Q) => {
                            let b = new Image;
                            b.onload = f, b.onerror = Q, b.src = s
                        })).then(() => {
                            n.hideLoading(t), t.state = _.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then(() => {
                                p(), this.instance.done(t)
                            }, () => {}), h && setTimeout(() => {
                                p()
                            }, d > 2500 ? 800 : 200)
                        }, () => {
                            n.hideLoading(t), n.revealContent(t)
                        })
                    } else {
                        let r = this.optionFor(t, "initialSize"),
                            d = this.optionFor(t, "zoom"),
                            h = {
                                event: n.prevMouseMoveEvent || n.options.event,
                                friction: d ? .12 : 0
                            },
                            p = n.optionFor(t, "showClass") || void 0,
                            f = true;
                        n.isOpeningSlide(t) && (r === "full" ? i.zoomToFull(h) : r === "cover" ? i.zoomToCover(h) : r === "max" ? i.zoomToMax(h) : f = false, i.stop("current")), f && p && (p = i.isDragging ? "f-fadeIn" : ""), n.hideLoading(t), n.revealContent(t, p)
                    }
                    var s
                }, () => {
                    n.setError(t, "{{IMAGE_ERROR}}")
                })
            }
            process(t, e) {
                return new Promise((n, i) => {
                    var a;
                    let l = this.instance,
                        c = t.el;
                    l.clearContent(t), l.showLoading(t);
                    let u = this.optionFor(t, "content");
                    if (typeof u == "string" && (u = tt(u)), !u || !G(u)) {
                        if (u = document.createElement("img"), u instanceof HTMLImageElement) {
                            let m = "",
                                s = t.caption;
                            m = typeof s == "string" && s ? s.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index+1} of ${((a=l.carousel)===null||a===void 0?void 0:a.pages.length)||1}`, u.src = e || "", u.alt = m, u.draggable = false, t.srcset && u.setAttribute("srcset", t.srcset), this.instance.isOpeningSlide(t) && (u.fetchPriority = "high")
                        }
                        t.sizes && u.setAttribute("sizes", t.sizes)
                    }
                    v(u, "fancybox-image"), t.imageEl = u, l.setContent(t, u, false), t.panzoom = new Qt(c, I({
                        transformParent: true
                    }, this.option("Panzoom") || {}, {
                        content: u,
                        width: (m, s) => l.optionFor(t, "width", "auto", s) || "auto",
                        height: (m, s) => l.optionFor(t, "height", "auto", s) || "auto",
                        wheel: () => {
                            let m = l.option("wheel");
                            return (m === "zoom" || m == "pan") && m
                        },
                        click: (m, s) => {
                            var r, d;
                            if (l.isCompact || l.isClosing() || t.index !== ((r = l.getSlide()) === null || r === void 0 ? void 0 : r.index)) return false;
                            if (s) {
                                let p = s.composedPath()[0];
                                if (["A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(p.nodeName)) return false
                            }
                            let h = !s || s.target && ((d = t.contentEl) === null || d === void 0 ? void 0 : d.contains(s.target));
                            return l.option(h ? "contentClick" : "backdropClick") || false
                        },
                        dblClick: () => l.isCompact ? "toggleZoom" : l.option("contentDblClick") || false,
                        spinner: false,
                        panOnlyZoomed: true,
                        wheelLimit: 1 / 0,
                        on: {
                            ready: m => {
                                n(m)
                            },
                            error: () => {
                                i()
                            },
                            destroy: () => {
                                i()
                            }
                        }
                    }))
                })
            }
            zoomIn(t) {
                return new Promise((e, n) => {
                    let i = this.instance,
                        a = i.container,
                        {
                            panzoom: l,
                            contentEl: c,
                            el: u
                        } = t;
                    l && l.updateMetrics();
                    let m = this.getZoomInfo(t);
                    if (!(m && u && c && l && a)) return void n();
                    let {
                        x: s,
                        y: r,
                        scale: d,
                        opacity: h
                    } = m, p = () => {
                        t.state !== _.Closing && (h && (c.style.opacity = Math.max(Math.min(1, 1 - (1 - l.scale) / (1 - d)), 0) + ""), l.scale >= 1 && l.scale > l.targetScale - .1 && e(l))
                    }, f = g => {
                        (g.scale < .99 || g.scale > 1.01) && !g.isDragging || (O(a, ue), c.style.opacity = "", g.off("endAnimation", f), g.off("touchStart", f), g.off("afterTransform", p), e(g))
                    };
                    l.on("endAnimation", f), l.on("touchStart", f), l.on("afterTransform", p), l.on(["error", "destroy"], () => {
                        n()
                    }), l.panTo({
                        x: s,
                        y: r,
                        scale: d,
                        friction: 0,
                        ignoreBounds: true
                    }), l.stop("current");
                    let Q = {
                            event: l.panMode === "mousemove" ? i.prevMouseMoveEvent || i.options.event : void 0
                        },
                        b = this.optionFor(t, "initialSize");
                    v(a, ue), i.hideLoading(t), b === "full" ? l.zoomToFull(Q) : b === "cover" ? l.zoomToCover(Q) : b === "max" ? l.zoomToMax(Q) : l.reset(.172)
                })
            }
            getZoomInfo(t) {
                let {
                    el: e,
                    imageEl: n,
                    thumbEl: i,
                    panzoom: a
                } = t, l = this.instance, c = l.container;
                if (!e || !n || !i || !a || Ii(i) < 3 || !this.optionFor(t, "zoom") || !c || l.state === V.Destroy || getComputedStyle(c).getPropertyValue("--f-images-zoom") === "0") return false;
                let u = window.visualViewport || null;
                if ((u ? u.scale : 1) !== 1) return false;
                let {
                    top: m,
                    left: s,
                    width: r,
                    height: d
                } = i.getBoundingClientRect(), {
                    top: h,
                    left: p,
                    fitWidth: f,
                    fitHeight: Q
                } = a.contentRect;
                if (!(r && d && f && Q)) return false;
                let b = a.container.getBoundingClientRect();
                p += b.left, h += b.top;
                let g = -1 * (p + .5 * f - (s + .5 * r)),
                    B = -1 * (h + .5 * Q - (m + .5 * d)),
                    w = r / f,
                    x = this.option("zoomOpacity") || false;
                return x === "auto" && (x = Math.abs(r / d - f / Q) > .1), {
                    x: g,
                    y: B,
                    scale: w,
                    opacity: x
                }
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose)
            }
        };
    Object.defineProperty(Ue, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            initialSize: "fit",
            Panzoom: {
                maxScale: 1
            },
            protected: false,
            zoom: true,
            zoomOpacity: "auto"
        }
    }), typeof SuppressedError == "function" && SuppressedError;
    var fn = "html",
        wi = "image",
        Qn = "map",
        st = "youtube",
        ut = "vimeo",
        Nt = "html5video",
        Ti = (o, t = {}) => {
            let e = new URL(o),
                n = new URLSearchParams(e.search),
                i = new URLSearchParams;
            for (let [c, u] of [...n, ...Object.entries(t)]) {
                let m = u + "";
                if (c === "t") {
                    let s = m.match(/((\d*)m)?(\d*)s?/);
                    s && i.set("start", 60 * parseInt(s[2] || "0") + parseInt(s[3] || "0") + "")
                } else i.set(c, m)
            }
            let a = i + "",
                l = o.match(/#t=((.*)?\d+s)/);
            return l && (a += `#t=${l[1]}`), a
        },
        bs = {
            ajax: null,
            autoSize: true,
            iframeAttr: {
                allow: "autoplay; fullscreen",
                scrolling: "auto"
            },
            preload: true,
            videoAutoplay: true,
            videoRatio: 16 / 9,
            videoTpl: `<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,
            videoFormat: "",
            vimeo: {
                byline: 1,
                color: "00adef",
                controls: 1,
                dnt: 1,
                muted: 0
            },
            youtube: {
                controls: 1,
                enablejsapi: 1,
                nocookie: 1,
                rel: 0,
                fs: 1
            }
        },
        gs = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo"],
        ve = class extends z {
            onBeforeInitSlide(t, e, n) {
                this.processType(n)
            }
            onCreateSlide(t, e, n) {
                this.setContent(n)
            }
            onClearContent(t, e) {
                e.xhr && (e.xhr.abort(), e.xhr = null);
                let n = e.iframeEl;
                n && (n.onload = n.onerror = null, n.src = "//about:blank", e.iframeEl = null);
                let i = e.contentEl,
                    a = e.placeholderEl;
                if (e.type === "inline" && i && a) i.classList.remove("fancybox__content"), getComputedStyle(i).getPropertyValue("display") !== "none" && (i.style.display = "none"), setTimeout(() => {
                    a && (i && a.parentNode && a.parentNode.insertBefore(i, a), a.remove())
                }, 0), e.contentEl = void 0, e.placeholderEl = void 0;
                else
                    for (; e.el && e.el.firstChild;) e.el.removeChild(e.el.firstChild)
            }
            onSelectSlide(t, e, n) {
                n.state === _.Ready && this.playVideo()
            }
            onUnselectSlide(t, e, n) {
                var i, a;
                if (n.type === Nt) {
                    try {
                        (a = (i = n.el) === null || i === void 0 ? void 0 : i.querySelector("video")) === null || a === void 0 || a.pause()
                    } catch {}
                    return
                }
                let l;
                n.type === ut ? l = {
                    method: "pause",
                    value: "true"
                } : n.type === st && (l = {
                    event: "command",
                    func: "pauseVideo"
                }), l && n.iframeEl && n.iframeEl.contentWindow && n.iframeEl.contentWindow.postMessage(JSON.stringify(l), "*"), n.poller && clearTimeout(n.poller)
            }
            onDone(t, e) {
                t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
            }
            onRefresh(t, e) {
                e.slides.forEach(n => {
                    n.el && (this.resizeIframe(n), this.setAspectRatio(n))
                })
            }
            onMessage(t) {
                try {
                    let e = JSON.parse(t.data);
                    if (t.origin === "https://player.vimeo.com") {
                        if (e.event === "ready")
                            for (let n of Array.from(document.getElementsByClassName("fancybox__iframe"))) n instanceof HTMLIFrameElement && n.contentWindow === t.source && (n.dataset.ready = "true")
                    } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && e.event === "onReady") {
                        let n = document.getElementById(e.id);
                        n && (n.dataset.ready = "true")
                    }
                } catch {}
            }
            loadAjaxContent(t) {
                let e = this.instance.optionFor(t, "src") || "";
                this.instance.showLoading(t);
                let n = this.instance,
                    i = new XMLHttpRequest;
                n.showLoading(t), i.onreadystatechange = function() {
                    i.readyState === XMLHttpRequest.DONE && n.state === V.Ready && (n.hideLoading(t), i.status === 200 ? n.setContent(t, i.responseText) : n.setError(t, i.status === 404 ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
                };
                let a = t.ajax || null;
                i.open(a ? "POST" : "GET", e + ""), i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.send(a), t.xhr = i
            }
            setInlineContent(t) {
                let e = null;
                if (G(t.src)) e = t.src;
                else if (typeof t.src == "string") {
                    let n = t.src.split("#", 2).pop();
                    e = n ? document.getElementById(n) : null
                }
                if (e) {
                    if (t.type === "clone" || e.closest(".fancybox__slide")) {
                        e = e.cloneNode(true);
                        let n = e.dataset.animationName;
                        n && (e.classList.remove(n), delete e.dataset.animationName);
                        let i = e.getAttribute("id");
                        i = i ? `${i}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", i)
                    } else if (e.parentNode) {
                        let n = document.createElement("div");
                        n.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(n, e), t.placeholderEl = n
                    }
                    this.instance.setContent(t, e)
                } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            setIframeContent(t) {
                let {
                    src: e,
                    el: n
                } = t;
                if (!e || typeof e != "string" || !n) return;
                n.classList.add("is-loading");
                let i = this.instance,
                    a = document.createElement("iframe");
                a.className = "fancybox__iframe", a.setAttribute("id", `fancybox__iframe_${i.id}_${t.index}`);
                for (let [c, u] of Object.entries(this.optionFor(t, "iframeAttr") || {})) a.setAttribute(c, u);
                a.onerror = () => {
                    i.setError(t, "{{IFRAME_ERROR}}")
                }, t.iframeEl = a;
                let l = this.optionFor(t, "preload");
                if (t.type !== "iframe" || l === false) return a.setAttribute("src", t.src + ""), i.setContent(t, a, false), this.resizeIframe(t), void i.revealContent(t);
                i.showLoading(t), a.onload = () => {
                    if (!a.src.length) return;
                    let c = a.dataset.ready !== "true";
                    a.dataset.ready = "true", this.resizeIframe(t), c ? i.revealContent(t) : i.hideLoading(t)
                }, a.setAttribute("src", e), i.setContent(t, a, false)
            }
            resizeIframe(t) {
                let {
                    type: e,
                    iframeEl: n
                } = t;
                if (e === st || e === ut) return;
                let i = n?.parentElement;
                if (!n || !i) return;
                let a = t.autoSize;
                a === void 0 && (a = this.optionFor(t, "autoSize"));
                let l = t.width || 0,
                    c = t.height || 0;
                l && c && (a = false);
                let u = i && i.style;
                if (t.preload !== false && a !== false && u) try {
                    let m = window.getComputedStyle(i),
                        s = parseFloat(m.paddingLeft) + parseFloat(m.paddingRight),
                        r = parseFloat(m.paddingTop) + parseFloat(m.paddingBottom),
                        d = n.contentWindow;
                    if (d) {
                        let h = d.document,
                            p = h.getElementsByTagName(fn)[0],
                            f = h.body;
                        u.width = "", f.style.overflow = "hidden", l = l || p.scrollWidth + s, u.width = `${l}px`, f.style.overflow = "", u.flex = "0 0 auto", u.height = `${f.scrollHeight}px`, c = p.scrollHeight + r
                    }
                } catch {}
                if (l || c) {
                    let m = {
                        flex: "0 1 auto",
                        width: "",
                        height: ""
                    };
                    l && l !== "auto" && (m.width = `${l}px`), c && c !== "auto" && (m.height = `${c}px`), Object.assign(u, m)
                }
            }
            playVideo() {
                let t = this.instance.getSlide();
                if (!t) return;
                let {
                    el: e
                } = t;
                if (!e || !e.offsetParent || !this.optionFor(t, "videoAutoplay")) return;
                if (t.type === Nt) try {
                    let i = e.querySelector("video");
                    if (i) {
                        let a = i.play();
                        a !== void 0 && a.then(() => {}).catch(l => {
                            i.muted = true, i.play()
                        })
                    }
                } catch {}
                if (t.type !== st && t.type !== ut) return;
                let n = () => {
                    if (t.iframeEl && t.iframeEl.contentWindow) {
                        let i;
                        if (t.iframeEl.dataset.ready === "true") return i = t.type === st ? {
                            event: "command",
                            func: "playVideo"
                        } : {
                            method: "play",
                            value: "true"
                        }, i && t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"), void(t.poller = void 0);
                        t.type === st && (i = {
                            event: "listening",
                            id: t.iframeEl.getAttribute("id")
                        }, t.iframeEl.contentWindow.postMessage(JSON.stringify(i), "*"))
                    }
                    t.poller = setTimeout(n, 250)
                };
                n()
            }
            processType(t) {
                if (t.html) return t.type = fn, t.src = t.html, void(t.html = "");
                let e = this.instance.optionFor(t, "src", "");
                if (!e || typeof e != "string") return;
                let n = t.type,
                    i = null;
                if (i = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
                    let a = this.optionFor(t, st),
                        {
                            nocookie: l
                        } = a,
                        c = function(r, d) {
                            var h = {};
                            for (var p in r) Object.prototype.hasOwnProperty.call(r, p) && d.indexOf(p) < 0 && (h[p] = r[p]);
                            if (r != null && typeof Object.getOwnPropertySymbols == "function") {
                                var f = 0;
                                for (p = Object.getOwnPropertySymbols(r); f < p.length; f++) d.indexOf(p[f]) < 0 && Object.prototype.propertyIsEnumerable.call(r, p[f]) && (h[p[f]] = r[p[f]])
                            }
                            return h
                        }(a, ["nocookie"]),
                        u = `www.youtube${l?"-nocookie":""}.com`,
                        m = Ti(e, c),
                        s = encodeURIComponent(i[2]);
                    t.videoId = s, t.src = `https://${u}/embed/${s}?${m}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${s}/mqdefault.jpg`, n = st
                } else if (i = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
                    let a = Ti(e, this.optionFor(t, ut)),
                        l = encodeURIComponent(i[1]),
                        c = i[4] || "";
                    t.videoId = l, t.src = `https://player.vimeo.com/video/${l}?${c?`h=${c}${a?"&":""}`:""}${a}`, n = ut
                }
                if (!n && t.triggerEl) {
                    let a = t.triggerEl.dataset.type;
                    gs.includes(a) && (n = a)
                }
                n || typeof e == "string" && (e.charAt(0) === "#" ? n = "inline" : (i = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (n = Nt, t.videoFormat = t.videoFormat || "video/" + (i[1] === "ogv" ? "ogg" : i[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? n = wi : e.match(/\.(pdf)((\?|#).*)?$/i) && (n = "pdf")), (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${i[1]}/?ll=${(i[2]?i[2]+"&z="+Math.floor(parseFloat(i[3]))+(i[4]?i[4].replace(/^\//,"&"):""):i[4]+"").replace(/\?/,"&")}&output=${i[4]&&i[4].indexOf("layer=c")>0?"svembed":"embed"}`, n = Qn) : (i = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${i[1]}/maps?q=${i[2].replace("query=","q=").replace("api=1","")}&output=embed`, n = Qn), n = n || this.instance.option("defaultType"), t.type = n, n === wi && (t.thumbSrc = t.thumbSrc || t.src)
            }
            setContent(t) {
                let e = this.instance.optionFor(t, "src") || "";
                if (t && t.type && e) {
                    switch (t.type) {
                        case fn:
                            this.instance.setContent(t, e);
                            break;
                        case Nt:
                            let n = this.option("videoTpl");
                            n && this.instance.setContent(t, n.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
                            break;
                        case "inline":
                        case "clone":
                            this.setInlineContent(t);
                            break;
                        case "ajax":
                            this.loadAjaxContent(t);
                            break;
                        case "pdf":
                        case Qn:
                        case st:
                        case ut:
                            t.preload = false;
                        case "iframe":
                            this.setIframeContent(t)
                    }
                    this.setAspectRatio(t)
                }
            }
            setAspectRatio(t) {
                let e = t.contentEl;
                if (!(t.el && e && t.type && [st, ut, Nt].includes(t.type))) return;
                let n, i = t.width || "auto",
                    a = t.height || "auto";
                if (i === "auto" || a === "auto") {
                    n = this.optionFor(t, "videoRatio");
                    let m = (n + "").match(/(\d+)\s*\/\s?(\d+)/);
                    n = m && m.length > 2 ? parseFloat(m[1]) / parseFloat(m[2]) : parseFloat(n + "")
                } else i && a && (n = i / a);
                if (!n) return;
                e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
                let l = e.getBoundingClientRect(),
                    c = l.width || 1,
                    u = l.height || 1;
                e.style.aspectRatio = n + "", n < c / u ? (a = a === "auto" ? u : Math.min(u, a), e.style.width = "auto", e.style.height = `${a}px`) : (i = i === "auto" ? c : Math.min(c, i), e.style.width = `${i}px`, e.style.height = "auto")
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), window.addEventListener("message", t.onMessage)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), window.removeEventListener("message", t.onMessage)
            }
        };
    Object.defineProperty(ve, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: bs
    });
    var he = "play",
        me = "pause",
        Lt = "ready",
        ye = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: Lt
                }), Object.defineProperty(this, "inHover", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                }), Object.defineProperty(this, "timer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "progressBar", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                })
            }
            get isActive() {
                return this.state !== Lt
            }
            onReady(t) {
                this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
            }
            onChange() {
                this.removeProgressBar(), this.pause()
            }
            onSettle() {
                this.resume()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.resume() : this.pause()
            }
            onMouseEnter() {
                this.inHover = true, this.pause()
            }
            onMouseLeave() {
                var t;
                this.inHover = false, !((t = this.instance.panzoom) === null || t === void 0) && t.isResting && this.resume()
            }
            onTimerEnd() {
                let t = this.instance;
                this.state === "play" && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0))
            }
            removeProgressBar() {
                this.progressBar && (this.progressBar.remove(), this.progressBar = null)
            }
            createProgressBar() {
                var t;
                if (!this.option("showProgress")) return null;
                this.removeProgressBar();
                let e = this.instance,
                    n = ((t = e.pages[e.page]) === null || t === void 0 ? void 0 : t.slides) || [],
                    i = this.option("progressParentEl");
                if (i || (i = (n.length === 1 ? n[0].el : null) || e.viewport), !i) return null;
                let a = document.createElement("div");
                return v(a, "f-progress"), i.prepend(a), this.progressBar = a, a.offsetHeight, a
            }
            set() {
                let t = this,
                    e = t.instance;
                if (e.pages.length < 2 || t.timer) return;
                let n = t.option("timeout");
                t.state = he, v(e.container, "has-autoplay");
                let i = t.createProgressBar();
                i && (i.style.transitionDuration = `${n}ms`, i.style.transform = "scaleX(1)"), t.timer = setTimeout(() => {
                    t.timer = null, t.inHover || t.onTimerEnd()
                }, n), t.emit("set")
            }
            clear() {
                let t = this;
                t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar()
            }
            start() {
                let t = this;
                if (t.set(), t.state !== Lt) {
                    if (t.option("pauseOnHover")) {
                        let e = t.instance.container;
                        e.addEventListener("mouseenter", t.onMouseEnter, false), e.addEventListener("mouseleave", t.onMouseLeave, false)
                    }
                    document.addEventListener("visibilitychange", t.onVisibilityChange, false), t.emit("start")
                }
            }
            stop() {
                let t = this,
                    e = t.state,
                    n = t.instance.container;
                t.clear(), t.state = Lt, n.removeEventListener("mouseenter", t.onMouseEnter, false), n.removeEventListener("mouseleave", t.onMouseLeave, false), document.removeEventListener("visibilitychange", t.onVisibilityChange, false), O(n, "has-autoplay"), e !== Lt && t.emit("stop")
            }
            pause() {
                let t = this;
                t.state === he && (t.state = me, t.clear(), t.emit(me))
            }
            resume() {
                let t = this,
                    e = t.instance;
                if (e.isInfinite || e.page !== e.pages.length - 1)
                    if (t.state !== he) {
                        if (t.state === me && !t.inHover) {
                            let n = new Event("resume", {
                                bubbles: true,
                                cancelable: true
                            });
                            t.emit("resume", n), n.defaultPrevented || t.set()
                        }
                    } else t.set();
                else t.stop()
            }
            toggle() {
                this.state === he || this.state === me ? this.stop() : this.start()
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), e.on("Panzoom.touchMove", t.onChange)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), e.off("Panzoom.touchMove", t.onChange), t.stop()
            }
        };
    Object.defineProperty(ye, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            autoStart: true,
            pauseOnHover: true,
            progressParentEl: null,
            showProgress: true,
            timeout: 3e3
        }
    });
    var xe = class extends z {
        constructor() {
            super(...arguments), Object.defineProperty(this, "ref", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            })
        }
        onPrepare(t) {
            let e = t.carousel;
            if (!e) return;
            let n = t.container;
            n && (e.options.Autoplay = I({
                autoStart: false
            }, this.option("Autoplay") || {}, {
                pauseOnHover: false,
                timeout: this.option("timeout"),
                progressParentEl: () => this.option("progressParentEl") || null,
                on: {
                    start: () => {
                        t.emit("startSlideshow")
                    },
                    set: i => {
                        var a;
                        n.classList.add("has-slideshow"), ((a = t.getSlide()) === null || a === void 0 ? void 0 : a.state) !== _.Ready && i.pause()
                    },
                    stop: () => {
                        n.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow")
                    },
                    resume: (i, a) => {
                        var l, c, u;
                        !a || !a.cancelable || ((l = t.getSlide()) === null || l === void 0 ? void 0 : l.state) === _.Ready && (!((u = (c = t.carousel) === null || c === void 0 ? void 0 : c.panzoom) === null || u === void 0) && u.isResting) || a.preventDefault()
                    }
                }
            }), e.attachPlugins({
                Autoplay: ye
            }), this.ref = e.plugins.Autoplay)
        }
        onReady(t) {
            let e = t.carousel,
                n = this.ref;
            n && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && n.start()
        }
        onDone(t, e) {
            let n = this.ref,
                i = t.carousel;
            if (!n || !i) return;
            let a = e.panzoom;
            a && a.on("startAnimation", () => {
                t.isCurrentSlide(e) && n.stop()
            }), t.isCurrentSlide(e) && n.resume()
        }
        onKeydown(t, e) {
            var n;
            let i = this.ref;
            i && e === this.option("key") && ((n = document.activeElement) === null || n === void 0 ? void 0 : n.nodeName) !== "BUTTON" && i.toggle()
        }
        attach() {
            let t = this,
                e = t.instance;
            e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), e.on("keydown", t.onKeydown)
        }
        detach() {
            let t = this,
                e = t.instance;
            e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), e.off("keydown", t.onKeydown)
        }
    };
    Object.defineProperty(xe, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            key: " ",
            playOnStart: false,
            progressParentEl: o => {
                var t;
                return ((t = o.instance.container) === null || t === void 0 ? void 0 : t.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || o.instance.container
            },
            timeout: 3e3
        }
    });
    var ji = {
            classes: {
                container: "f-thumbs f-carousel__thumbs",
                viewport: "f-thumbs__viewport",
                track: "f-thumbs__track",
                slide: "f-thumbs__slide",
                isResting: "is-resting",
                isSelected: "is-selected",
                isLoading: "is-loading",
                hasThumbs: "has-thumbs"
            },
            minCount: 2,
            parentEl: null,
            thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
            type: "modern"
        },
        at;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Hidden = 2] = "Hidden"
    })(at || (at = {}));
    var Ei = "isResting",
        pe = "thumbWidth",
        gt = "thumbHeight",
        q = "thumbClipWidth",
        Pi = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "type", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: "modern"
                }), Object.defineProperty(this, "container", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "track", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "thumbWidth", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "thumbClipWidth", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "thumbHeight", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "thumbGap", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "thumbExtraGap", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "state", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: at.Init
                })
            }
            get isModern() {
                return this.type === "modern"
            }
            onInitSlide(o, t) {
                let e = t.el ? t.el.dataset : void 0;
                e && (t.thumbSrc = e.thumbSrc || t.thumbSrc || "", t[q] = parseFloat(e[q] || "") || t[q] || 0, t[gt] = parseFloat(e.thumbHeight || "") || t[gt] || 0), this.addSlide(t)
            }
            onInitSlides() {
                this.build()
            }
            onChange() {
                var o;
                if (!this.isModern) return;
                let t = this.container,
                    e = this.instance,
                    n = e.panzoom,
                    i = this.carousel,
                    a = i ? i.panzoom : null,
                    l = e.page;
                if (n && i && a) {
                    if (n.isDragging) {
                        O(t, this.cn(Ei));
                        let c = ((o = i.pages[l]) === null || o === void 0 ? void 0 : o.pos) || 0;
                        c += e.getProgress(l) * (this[q] + this.thumbGap);
                        let u = a.getBounds(); - 1 * c > u.x.min && -1 * c < u.x.max && a.panTo({
                            x: -1 * c,
                            friction: .12
                        })
                    } else et(t, this.cn(Ei), n.isResting);
                    this.shiftModern()
                }
            }
            onRefresh() {
                this.updateProps();
                for (let o of this.instance.slides || []) this.resizeModernSlide(o);
                this.shiftModern()
            }
            isDisabled() {
                let o = this.option("minCount") || 0;
                if (o) {
                    let e = this.instance,
                        n = 0;
                    for (let i of e.slides || []) i.thumbSrc && n++;
                    if (n < o) return true
                }
                let t = this.option("type");
                return ["modern", "classic"].indexOf(t) < 0
            }
            getThumb(o) {
                let t = this.option("thumbTpl") || "";
                return {
                    html: this.instance.localize(t, [
                        ["%i", o.index],
                        ["%d", o.index + 1],
                        ["%s", o.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]
                    ])
                }
            }
            addSlide(o) {
                let t = this.carousel;
                t && t.addSlide(o.index, this.getThumb(o))
            }
            getSlides() {
                let o = [];
                for (let t of this.instance.slides || []) o.push(this.getThumb(t));
                return o
            }
            resizeModernSlide(o) {
                this.isModern && (o[pe] = o[q] && o[gt] ? Math.round(this[gt] * (o[q] / o[gt])) : this[pe])
            }
            updateProps() {
                let o = this.container;
                if (!o) return;
                let t = e => parseFloat(getComputedStyle(o).getPropertyValue("--f-thumb-" + e)) || 0;
                this.thumbGap = t("gap"), this.thumbExtraGap = t("extra-gap"), this[pe] = t("width") || 40, this[q] = t("clip-width") || 40, this[gt] = t("height") || 40
            }
            build() {
                let o = this;
                if (o.state !== at.Init) return;
                if (o.isDisabled()) return void o.emit("disabled");
                let t = o.instance,
                    e = t.container,
                    n = o.getSlides(),
                    i = o.option("type");
                o.type = i;
                let a = o.option("parentEl"),
                    l = o.cn("container"),
                    c = o.cn("track"),
                    u = a?.querySelector("." + l);
                u || (u = document.createElement("div"), v(u, l), a ? a.appendChild(u) : e.after(u)), v(u, `is-${i}`), v(e, o.cn("hasThumbs")), o.container = u, o.updateProps();
                let m = u.querySelector("." + c);
                m || (m = document.createElement("div"), v(m, o.cn("track")), u.appendChild(m)), o.track = m;
                let s = I({}, {
                        track: m,
                        infinite: false,
                        center: true,
                        fill: i === "classic",
                        dragFree: true,
                        slidesPerPage: 1,
                        transition: false,
                        preload: .25,
                        friction: .12,
                        Panzoom: {
                            maxVelocity: 0
                        },
                        Dots: false,
                        Navigation: false,
                        classes: {
                            container: "f-thumbs",
                            viewport: "f-thumbs__viewport",
                            track: "f-thumbs__track",
                            slide: "f-thumbs__slide"
                        }
                    }, o.option("Carousel") || {}, {
                        Sync: {
                            target: t
                        },
                        slides: n
                    }),
                    r = new t.constructor(u, s);
                r.on("createSlide", (d, h) => {
                    o.setProps(h.index), o.emit("createSlide", h, h.el)
                }), r.on("ready", () => {
                    o.shiftModern(), o.emit("ready")
                }), r.on("refresh", () => {
                    o.shiftModern()
                }), r.on("Panzoom.click", (d, h, p) => {
                    o.onClick(p)
                }), o.carousel = r, o.state = at.Ready
            }
            onClick(o) {
                o.preventDefault(), o.stopPropagation();
                let t = this.instance,
                    {
                        pages: e,
                        page: n
                    } = t,
                    i = f => {
                        if (f) {
                            let Q = f.closest("[data-carousel-index]");
                            if (Q) return [parseInt(Q.dataset.carouselIndex || "", 10) || 0, Q]
                        }
                        return [-1, void 0]
                    },
                    a = (f, Q) => {
                        let b = document.elementFromPoint(f, Q);
                        return b ? i(b) : [-1, void 0]
                    },
                    [l, c] = i(o.target);
                if (l > -1) return;
                let u = this[q],
                    m = o.clientX,
                    s = o.clientY,
                    [r, d] = a(m - u, s),
                    [h, p] = a(m + u, s);
                d && p ? (l = Math.abs(m - d.getBoundingClientRect().right) < Math.abs(m - p.getBoundingClientRect().left) ? r : h, l === n && (l = l === r ? h : r)) : d ? l = r : p && (l = h), l > -1 && e[l] && t.slideTo(l)
            }
            getShift(o) {
                var t;
                let e = this,
                    {
                        instance: n
                    } = e,
                    i = e.carousel;
                if (!n || !i) return 0;
                let a = e[pe],
                    l = e[q],
                    c = e.thumbGap,
                    u = e.thumbExtraGap;
                if (!(!((t = i.slides[o]) === null || t === void 0) && t.el)) return 0;
                let m = .5 * (a - l),
                    s = n.pages.length - 1,
                    r = n.getProgress(0),
                    d = n.getProgress(s),
                    h = n.getProgress(o, false, true),
                    p = 0,
                    f = m + u + c,
                    Q = r < 0 && r > -1,
                    b = d > 0 && d < 1;
                return o === 0 ? (p = f * Math.abs(r), b && r === 1 && (p -= f * Math.abs(d))) : o === s ? (p = f * Math.abs(d) * -1, Q && d === -1 && (p += f * Math.abs(r))) : Q || b ? (p = -1 * f, p += f * Math.abs(r), p += f * (1 - Math.abs(d))) : p = f * h, p
            }
            setProps(o) {
                var t;
                let e = this;
                if (!e.isModern) return;
                let {
                    instance: n
                } = e, i = e.carousel;
                if (n && i) {
                    let a = (t = i.slides[o]) === null || t === void 0 ? void 0 : t.el;
                    if (a && a.childNodes.length) {
                        let l = F(1 - Math.abs(n.getProgress(o))),
                            c = F(e.getShift(o));
                        a.style.setProperty("--progress", l ? l + "" : ""), a.style.setProperty("--shift", c + "")
                    }
                }
            }
            shiftModern() {
                let o = this;
                if (!o.isModern) return;
                let {
                    instance: t,
                    track: e
                } = o, n = t.panzoom, i = o.carousel;
                if (!(t && e && n && i) || n.state === R.Init || n.state === R.Destroy) return;
                for (let l of t.slides) o.setProps(l.index);
                let a = (o[q] + o.thumbGap) * (i.slides.length || 0);
                e.style.setProperty("--width", a + "")
            }
            cleanup() {
                let o = this;
                o.carousel && o.carousel.destroy(), o.carousel = null, o.container && o.container.remove(), o.container = null, o.track && o.track.remove(), o.track = null, o.state = at.Init, O(o.instance.container, o.cn("hasThumbs"))
            }
            attach() {
                let o = this,
                    t = o.instance;
                t.on("initSlide", o.onInitSlide), t.state === k.Init ? t.on("initSlides", o.onInitSlides) : o.onInitSlides(), t.on(["change", "Panzoom.afterTransform"], o.onChange), t.on("Panzoom.refresh", o.onRefresh)
            }
            detach() {
                let o = this,
                    t = o.instance;
                t.off("initSlide", o.onInitSlide), t.off("initSlides", o.onInitSlides), t.off(["change", "Panzoom.afterTransform"], o.onChange), t.off("Panzoom.refresh", o.onRefresh), o.cleanup()
            }
        };
    Object.defineProperty(Pi, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: ji
    });
    var Fs = Object.assign(Object.assign({}, ji), {
            key: "t",
            showOnStart: true,
            parentEl: null
        }),
        Ni = "is-masked",
        Li = "aria-hidden",
        we = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "ref", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "hidden", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                })
            }
            get isEnabled() {
                let t = this.ref;
                return t && !t.isDisabled()
            }
            get isHidden() {
                return this.hidden
            }
            onClick(t, e) {
                e.stopPropagation()
            }
            onCreateSlide(t, e) {
                var n, i, a;
                let l = ((a = (i = (n = this.instance) === null || n === void 0 ? void 0 : n.carousel) === null || i === void 0 ? void 0 : i.slides[e.index]) === null || a === void 0 ? void 0 : a.type) || "",
                    c = e.el;
                if (c && l) {
                    let u = `for-${l}`;
                    ["video", "youtube", "vimeo", "html5video"].includes(l) && (u += " for-video"), v(c, u)
                }
            }
            onInit() {
                var t;
                let e = this,
                    n = e.instance,
                    i = n.carousel;
                if (e.ref || !i) return;
                let a = e.option("parentEl") || n.footer || n.container;
                if (!a) return;
                let l = I({}, e.options, {
                    parentEl: a,
                    classes: {
                        container: "f-thumbs fancybox__thumbs"
                    },
                    Carousel: {
                        Sync: {
                            friction: n.option("Carousel.friction") || 0
                        }
                    },
                    on: {
                        ready: c => {
                            let u = c.container;
                            u && this.hidden && (e.refresh(), u.style.transition = "none", e.hide(), u.offsetHeight, queueMicrotask(() => {
                                u.style.transition = "", e.show()
                            }))
                        }
                    }
                });
                l.Carousel = l.Carousel || {}, l.Carousel.on = I(((t = e.options.Carousel) === null || t === void 0 ? void 0 : t.on) || {}, {
                    click: this.onClick,
                    createSlide: this.onCreateSlide
                }), i.options.Thumbs = l, i.attachPlugins({
                    Thumbs: Pi
                }), e.ref = i.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = at.Hidden, e.hidden = true)
            }
            onResize() {
                var t;
                let e = (t = this.ref) === null || t === void 0 ? void 0 : t.container;
                e && (e.style.maxHeight = "")
            }
            onKeydown(t, e) {
                let n = this.option("key");
                n && n === e && this.toggle()
            }
            toggle() {
                let t = this.ref;
                if (t && !t.isDisabled()) return t.state === at.Hidden ? (t.state = at.Init, void t.build()) : void(this.hidden ? this.show() : this.hide())
            }
            show() {
                let t = this.ref;
                if (!t || t.isDisabled()) return;
                let e = t.container;
                e && (this.refresh(), e.offsetHeight, e.removeAttribute(Li), e.classList.remove(Ni), this.hidden = false)
            }
            hide() {
                let t = this.ref,
                    e = t && t.container;
                e && (this.refresh(), e.offsetHeight, e.classList.add(Ni), e.setAttribute(Li, "true")), this.hidden = true
            }
            refresh() {
                let t = this.ref;
                if (!t || !t.state) return;
                let e = t.container,
                    n = e?.firstChild || null;
                e && n && n.childNodes.length && (e.style.maxHeight = `${n.getBoundingClientRect().height}px`)
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.state === V.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), e.on("keydown", t.onKeydown)
            }
            detach() {
                var t;
                let e = this,
                    n = e.instance;
                n.off("Carousel.init", e.onInit), n.off("resize", e.onResize), n.off("keydown", e.onKeydown), (t = n.carousel) === null || t === void 0 || t.detachPlugins(["Thumbs"]), e.ref = null
            }
        };
    Object.defineProperty(we, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Fs
    });
    var bn = {
            panLeft: {
                icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
                change: {
                    panX: -100
                }
            },
            panRight: {
                icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
                change: {
                    panX: 100
                }
            },
            panUp: {
                icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
                change: {
                    panY: -100
                }
            },
            panDown: {
                icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
                change: {
                    panY: 100
                }
            },
            zoomIn: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
                action: "zoomIn"
            },
            zoomOut: {
                icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "zoomOut"
            },
            toggle1to1: {
                icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
                action: "toggleZoom"
            },
            toggleZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "toggleZoom"
            },
            iterateZoom: {
                icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
                action: "iterateZoom"
            },
            rotateCCW: {
                icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
                action: "rotateCCW"
            },
            rotateCW: {
                icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
                action: "rotateCW"
            },
            flipX: {
                icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
                action: "flipX"
            },
            flipY: {
                icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
                action: "flipY"
            },
            fitX: {
                icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
                action: "fitX"
            },
            fitY: {
                icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
                action: "fitY"
            },
            reset: {
                icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
                action: "reset"
            },
            toggleFS: {
                icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
                action: "toggleFS"
            }
        },
        ft;
    (function(o) {
        o[o.Init = 0] = "Init", o[o.Ready = 1] = "Ready", o[o.Disabled = 2] = "Disabled"
    })(ft || (ft = {}));
    var Bs = {
            absolute: "auto",
            display: {
                left: ["infobar"],
                middle: [],
                right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]
            },
            enabled: "auto",
            items: {
                infobar: {
                    tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
                },
                download: {
                    tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
                },
                prev: {
                    tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
                },
                next: {
                    tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
                },
                slideshow: {
                    tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
                },
                fullscreen: {
                    tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
                },
                thumbs: {
                    tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
                },
                close: {
                    tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
                }
            },
            parentEl: null
        },
        Us = {
            tabindex: "-1",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
        },
        Xi = "has-toolbar",
        gn = "fancybox__toolbar",
        Te = class extends z {
            constructor() {
                super(...arguments), Object.defineProperty(this, "state", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: ft.Init
                }), Object.defineProperty(this, "container", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                })
            }
            onReady(t) {
                var e;
                if (!t.carousel) return;
                let n = this.option("display"),
                    i = this.option("absolute"),
                    a = this.option("enabled");
                if (a === "auto") {
                    let m = this.instance.carousel,
                        s = 0;
                    if (m)
                        for (let r of m.slides)(r.panzoom || r.type === "image") && s++;
                    s || (a = false)
                }
                a || (n = void 0);
                let l = 0,
                    c = {
                        left: [],
                        middle: [],
                        right: []
                    };
                if (n)
                    for (let m of ["left", "middle", "right"])
                        for (let s of n[m]) {
                            let r = this.createEl(s);
                            r && ((e = c[m]) === null || e === void 0 || e.push(r), l++)
                        }
                let u = null;
                if (l && (u = this.createContainer()), u) {
                    for (let [m, s] of Object.entries(c)) {
                        let r = document.createElement("div");
                        v(r, gn + "__column is-" + m);
                        for (let d of s) r.appendChild(d);
                        i !== "auto" || m !== "middle" || s.length || (i = true), u.appendChild(r)
                    }
                    i === true && v(u, "is-absolute"), this.state = ft.Ready, this.onRefresh()
                } else this.state = ft.Disabled
            }
            onClick(t) {
                var e, n;
                let i = this.instance,
                    a = i.getSlide(),
                    l = a?.panzoom,
                    c = t.target,
                    u = c && G(c) ? c.dataset : null;
                if (!u) return;
                if (u.fancyboxToggleThumbs !== void 0) return t.preventDefault(), t.stopPropagation(), void((e = i.plugins.Thumbs) === null || e === void 0 || e.toggle());
                if (u.fancyboxToggleFullscreen !== void 0) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
                if (u.fancyboxToggleSlideshow !== void 0) {
                    t.preventDefault(), t.stopPropagation();
                    let r = (n = i.carousel) === null || n === void 0 ? void 0 : n.plugins.Autoplay,
                        d = r.isActive;
                    return l && l.panMode === "mousemove" && !d && l.reset(), void(d ? r.stop() : r.start())
                }
                let m = u.panzoomAction,
                    s = u.panzoomChange;
                if ((s || m) && (t.preventDefault(), t.stopPropagation()), s) {
                    let r = {};
                    try {
                        r = JSON.parse(s)
                    } catch {}
                    l && l.applyChange(r)
                } else m && l && l[m] && l[m]()
            }
            onChange() {
                this.onRefresh()
            }
            onRefresh() {
                if (this.instance.isClosing()) return;
                let t = this.container;
                if (!t) return;
                let e = this.instance.getSlide();
                if (!e || e.state !== _.Ready) return;
                let n = e && !e.error && e.panzoom;
                for (let l of t.querySelectorAll("[data-panzoom-action]")) n ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                let i = n && n.canZoomIn(),
                    a = n && n.canZoomOut();
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) i ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                for (let l of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) a ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                for (let l of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
                    a || i ? (l.removeAttribute("disabled"), l.removeAttribute("tabindex")) : (l.setAttribute("disabled", ""), l.setAttribute("tabindex", "-1"));
                    let c = l.querySelector("g");
                    c && (c.style.display = i ? "" : "none")
                }
            }
            onDone(t, e) {
                var n;
                (n = e.panzoom) === null || n === void 0 || n.on("afterTransform", () => {
                    this.instance.isCurrentSlide(e) && this.onRefresh()
                }), this.instance.isCurrentSlide(e) && this.onRefresh()
            }
            createContainer() {
                let t = this.instance.container;
                if (!t) return null;
                let e = this.option("parentEl") || t,
                    n = e.querySelector("." + gn);
                return n || (n = document.createElement("div"), v(n, gn), e.prepend(n)), n.addEventListener("click", this.onClick, {
                    passive: false,
                    capture: true
                }), t && v(t, Xi), this.container = n, n
            }
            createEl(t) {
                let e = this.instance,
                    n = e.carousel;
                if (!n || t === "toggleFS" || t === "fullscreen" && !zi()) return null;
                let i = null,
                    a = n.slides.length || 0,
                    l = 0,
                    c = 0;
                for (let m of n.slides)(m.panzoom || m.type === "image") && l++, (m.type === "image" || m.downloadSrc) && c++;
                if (a < 2 && ["infobar", "prev", "next"].includes(t)) return i;
                if (bn[t] !== void 0 && !l || t === "download" && !c) return null;
                if (t === "thumbs") {
                    let m = e.plugins.Thumbs;
                    if (!m || !m.isEnabled) return null
                }
                if (t === "slideshow" && (!n.plugins.Autoplay || a < 2)) return null;
                if (bn[t] !== void 0) {
                    let m = bn[t];
                    i = document.createElement("button"), i.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), v(i, "f-button"), m.action && (i.dataset.panzoomAction = m.action), m.change && (i.dataset.panzoomChange = JSON.stringify(m.change)), i.appendChild(tt(this.instance.localize(m.icon)))
                } else {
                    let m = (this.option("items") || [])[t];
                    m && (i = tt(this.instance.localize(m.tpl)), typeof m.click == "function" && i.addEventListener("click", s => {
                        s.preventDefault(), s.stopPropagation(), typeof m.click == "function" && m.click.call(this, this, s)
                    }))
                }
                let u = i?.querySelector("svg");
                if (u)
                    for (let [m, s] of Object.entries(Us)) u.getAttribute(m) || u.setAttribute(m, String(s));
                return i
            }
            removeContainer() {
                let t = this.container;
                t && t.remove(), this.container = null, this.state = ft.Disabled;
                let e = this.instance.container;
                e && O(e, Xi)
            }
            attach() {
                let t = this,
                    e = t.instance;
                e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on(["reveal", "Carousel.change"], t.onChange), t.onReady(t.instance)
            }
            detach() {
                let t = this,
                    e = t.instance;
                e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off(["reveal", "Carousel.change"], t.onChange), t.removeContainer()
            }
        };
    Object.defineProperty(Te, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Bs
    });
    var vs = {
            Hash: class extends z {
                onReady() {
                    Xt = false
                }
                onChange(o) {
                    pt && clearTimeout(pt);
                    let {
                        hash: t
                    } = Yi(), {
                        hash: e
                    } = Be(), n = o.isOpeningSlide(o.getSlide());
                    n && (yi = e === t ? "" : e), t && t !== e && (pt = setTimeout(() => {
                        try {
                            if (o.state === V.Ready) {
                                let i = "replaceState";
                                n && !de && (i = "pushState", de = true), window.history[i]({}, document.title, window.location.pathname + window.location.search + t)
                            }
                        } catch {}
                    }, 300))
                }
                onClose(o) {
                    if (pt && clearTimeout(pt), !Xt && de) return de = false, Xt = false, void window.history.back();
                    if (!Xt) try {
                        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (yi || ""))
                    } catch {}
                }
                attach() {
                    let o = this.instance;
                    o.on("ready", this.onReady), o.on(["Carousel.ready", "Carousel.change"], this.onChange), o.on("close", this.onClose)
                }
                detach() {
                    let o = this.instance;
                    o.off("ready", this.onReady), o.off(["Carousel.ready", "Carousel.change"], this.onChange), o.off("close", this.onClose)
                }
                static parseURL() {
                    return Be()
                }
                static startFromUrl() {
                    Ai()
                }
                static destroy() {
                    window.removeEventListener("hashchange", Hi, false)
                }
            },
            Html: ve,
            Images: Ue,
            Slideshow: xe,
            Thumbs: we,
            Toolbar: Te
        },
        Oi = "with-fancybox",
        Fn = "hide-scrollbar",
        Ri = "--fancybox-scrollbar-compensate",
        Ci = "--fancybox-body-margin",
        Bn = "aria-hidden",
        Un = "is-using-tab",
        vn = "is-animated",
        Zi = "is-compact",
        Wi = "is-loading",
        yn = "is-opening",
        fe = "has-caption",
        Ft = "disabled",
        ht = "tabindex",
        Mi = "download",
        xn = "href",
        Bt = "src",
        ct = o => typeof o == "string",
        Si = function() {
            var o = window.getSelection();
            return !!o && o.type === "Range"
        },
        j, P = null,
        mt = null,
        ki = 0,
        Vi = 0,
        Di = 0,
        _i = 0,
        Ut = new Map,
        ys = 0,
        K = class o extends Rt {
            get isIdle() {
                return this.idle
            }
            get isCompact() {
                return this.option("compact")
            }
            constructor(t = [], e = {}, n = {}) {
                super(e), Object.defineProperty(this, "userSlides", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                }), Object.defineProperty(this, "userPlugins", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: {}
                }), Object.defineProperty(this, "idle", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                }), Object.defineProperty(this, "idleTimer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "clickTimer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "pwt", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "ignoreFocusChange", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                }), Object.defineProperty(this, "startedFs", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                }), Object.defineProperty(this, "state", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: V.Init
                }), Object.defineProperty(this, "id", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 0
                }), Object.defineProperty(this, "container", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "caption", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "footer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "carousel", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "lastFocus", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                }), Object.defineProperty(this, "prevMouseMoveEvent", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                }), j || (j = zi()), this.id = e.id || ++ys, Ut.set(this.id, this), this.userSlides = t, this.userPlugins = n, queueMicrotask(() => {
                    this.init()
                })
            }
            init() {
                if (this.state === V.Destroy) return;
                this.state = V.Init, this.attachPlugins(Object.assign(Object.assign({}, o.Plugins), this.userPlugins)), this.emit("init"), this.emit("attachPlugins"), this.option("hideScrollbar") === true && (() => {
                    if (!Ot) return;
                    let e = document,
                        n = e.body,
                        i = e.documentElement;
                    if (n.classList.contains(Fn)) return;
                    let a = window.innerWidth - i.getBoundingClientRect().width,
                        l = parseFloat(window.getComputedStyle(n).marginRight);
                    a < 0 && (a = 0), i.style.setProperty(Ri, `${a}px`), l && n.style.setProperty(Ci, `${l}px`), n.classList.add(Fn)
                })(), this.initLayout(), this.scale();
                let t = () => {
                    this.initCarousel(this.userSlides), this.state = V.Ready, this.attachEvents(), this.emit("ready"), setTimeout(() => {
                        this.container && this.container.setAttribute(Bn, "false")
                    }, 16)
                };
                this.option("Fullscreen.autoStart") && j && !j.isFullscreen() ? j.request().then(() => {
                    this.startedFs = true, t()
                }).catch(() => t()) : t()
            }
            initLayout() {
                var t, e;
                let n = this.option("parentEl") || document.body,
                    i = tt(this.localize(this.option("tpl.main") || ""));
                if (i) {
                    if (i.setAttribute("id", `fancybox-${this.id}`), i.setAttribute("aria-label", this.localize("{{MODAL}}")), i.classList.toggle(Zi, this.isCompact), v(i, this.option("mainClass") || ""), v(i, yn), this.container = i, this.footer = i.querySelector(".fancybox__footer"), n.appendChild(i), v(document.documentElement, Oi), P && mt || (P = document.createElement("span"), v(P, "fancybox-focus-guard"), P.setAttribute(ht, "0"), P.setAttribute(Bn, "true"), P.setAttribute("aria-label", "Focus guard"), mt = P.cloneNode(), (t = i.parentElement) === null || t === void 0 || t.insertBefore(P, i), (e = i.parentElement) === null || e === void 0 || e.append(mt)), i.addEventListener("mousedown", a => {
                            ki = a.pageX, Vi = a.pageY, O(i, Un)
                        }), this.option("closeExisting"))
                        for (let a of Ut.values()) a.id !== this.id && a.close();
                    else this.option("animated") && (v(i, vn), setTimeout(() => {
                        this.isClosing() || O(i, vn)
                    }, 350));
                    this.emit("initLayout")
                }
            }
            initCarousel(t) {
                let e = this.container;
                if (!e) return;
                let n = e.querySelector(".fancybox__carousel");
                if (!n) return;
                let i = this.carousel = new vt(n, I({}, {
                    slides: t,
                    transition: "fade",
                    Panzoom: {
                        lockAxis: this.option("dragToClose") ? "xy" : "x",
                        infinite: !!this.option("dragToClose") && "y"
                    },
                    Dots: false,
                    Navigation: {
                        classes: {
                            container: "fancybox__nav",
                            button: "f-button",
                            isNext: "is-next",
                            isPrev: "is-prev"
                        }
                    },
                    initialPage: this.option("startIndex"),
                    l10n: this.option("l10n")
                }, this.option("Carousel") || {}));
                i.on("*", (a, l, ...c) => {
                    this.emit(`Carousel.${l}`, a, ...c)
                }), i.on(["ready", "change"], () => {
                    this.manageCaption()
                }), this.on("Carousel.removeSlide", (a, l, c) => {
                    this.clearContent(c), c.state = void 0
                }), i.on("Panzoom.touchStart", () => {
                    var a, l;
                    this.isCompact || this.endIdle(), !((a = document.activeElement) === null || a === void 0) && a.closest(".f-thumbs") && ((l = this.container) === null || l === void 0 || l.focus())
                }), i.on("settle", () => {
                    this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus()
                }), this.option("dragToClose") && (i.on("Panzoom.afterTransform", (a, l) => {
                    let c = this.getSlide();
                    if (c && wn(c.el)) return;
                    let u = this.container;
                    if (u) {
                        let m = Math.abs(l.current.f),
                            s = m < 1 ? "" : Math.max(.5, Math.min(1, 1 - m / l.contentRect.fitHeight * 1.5));
                        u.style.setProperty("--fancybox-ts", s ? "0s" : ""), u.style.setProperty("--fancybox-opacity", s + "")
                    }
                }), i.on("Panzoom.touchEnd", (a, l, c) => {
                    var u;
                    let m = this.getSlide();
                    if (m && wn(m.el) || l.isMobile && document.activeElement && ["TEXTAREA", "INPUT"].indexOf((u = document.activeElement) === null || u === void 0 ? void 0 : u.nodeName) !== -1) return;
                    let s = Math.abs(l.dragOffset.y);
                    l.lockedAxis === "y" && (s >= 200 || s >= 50 && l.dragOffset.time < 300) && (c && c.cancelable && c.preventDefault(), this.close(c, "f-throwOut" + (l.current.f < 0 ? "Up" : "Down")))
                })), i.on("change", a => {
                    var l;
                    let c = (l = this.getSlide()) === null || l === void 0 ? void 0 : l.triggerEl;
                    if (c) {
                        let u = new CustomEvent("slideTo", {
                            bubbles: true,
                            cancelable: true,
                            detail: a.page
                        });
                        c.dispatchEvent(u)
                    }
                }), i.on(["refresh", "change"], a => {
                    let l = this.container;
                    if (!l) return;
                    for (let m of l.querySelectorAll("[data-fancybox-current-index]")) m.innerHTML = a.page + 1;
                    for (let m of l.querySelectorAll("[data-fancybox-count]")) m.innerHTML = a.pages.length;
                    if (!a.isInfinite) {
                        for (let m of l.querySelectorAll("[data-fancybox-next]")) a.page < a.pages.length - 1 ? (m.removeAttribute(Ft), m.removeAttribute(ht)) : (m.setAttribute(Ft, ""), m.setAttribute(ht, "-1"));
                        for (let m of l.querySelectorAll("[data-fancybox-prev]")) a.page > 0 ? (m.removeAttribute(Ft), m.removeAttribute(ht)) : (m.setAttribute(Ft, ""), m.setAttribute(ht, "-1"))
                    }
                    let c = this.getSlide();
                    if (!c) return;
                    let u = c.downloadSrc || "";
                    u || c.type !== "image" || c.error || !ct(c[Bt]) || (u = c[Bt]);
                    for (let m of l.querySelectorAll("[data-fancybox-download]")) {
                        let s = c.downloadFilename;
                        u ? (m.removeAttribute(Ft), m.removeAttribute(ht), m.setAttribute(xn, u), m.setAttribute(Mi, s || u), m.setAttribute("target", "_blank")) : (m.setAttribute(Ft, ""), m.setAttribute(ht, "-1"), m.removeAttribute(xn), m.removeAttribute(Mi))
                    }
                }), this.emit("initCarousel")
            }
            attachEvents() {
                let t = this,
                    e = t.container;
                if (!e) return;
                e.addEventListener("click", t.onClick, {
                    passive: false,
                    capture: false
                }), e.addEventListener("wheel", t.onWheel, {
                    passive: false,
                    capture: false
                }), document.addEventListener("keydown", t.onKeydown, {
                    passive: false,
                    capture: true
                }), document.addEventListener("visibilitychange", t.onVisibilityChange, false), document.addEventListener("mousemove", t.onMousemove), t.option("trapFocus") && document.addEventListener("focus", t.onFocus, true), window.addEventListener("resize", t.onResize);
                let n = window.visualViewport;
                n && (n.addEventListener("scroll", t.onResize), n.addEventListener("resize", t.onResize))
            }
            detachEvents() {
                let t = this,
                    e = t.container;
                if (!e) return;
                document.removeEventListener("keydown", t.onKeydown, {
                    passive: false,
                    capture: true
                }), e.removeEventListener("wheel", t.onWheel, {
                    passive: false,
                    capture: false
                }), e.removeEventListener("click", t.onClick, {
                    passive: false,
                    capture: false
                }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
                let n = window.visualViewport;
                n && (n.removeEventListener("resize", t.onResize), n.removeEventListener("scroll", t.onResize)), document.removeEventListener("visibilitychange", t.onVisibilityChange, false), document.removeEventListener("focus", t.onFocus, true)
            }
            scale() {
                let t = this.container;
                if (!t) return;
                let e = window.visualViewport,
                    n = Math.max(1, e?.scale || 1),
                    i = "",
                    a = "",
                    l = "";
                if (e && n > 1) {
                    let c = `${e.offsetLeft}px`,
                        u = `${e.offsetTop}px`;
                    i = e.width * n + "px", a = e.height * n + "px", l = `translate3d(${c}, ${u}, 0) scale(${1/n})`
                }
                t.style.transform = l, t.style.width = i, t.style.height = a
            }
            onClick(t) {
                var e;
                let {
                    container: n,
                    isCompact: i
                } = this;
                if (!n || this.isClosing()) return;
                !i && this.option("idle") && this.resetIdle();
                let a = t.composedPath()[0];
                if (a.closest(".fancybox-spinner") || a.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
                if (a.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
                if (a.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
                if (t.type === "click" && t.detail === 0 || Math.abs(t.pageX - ki) > 30 || Math.abs(t.pageY - Vi) > 30) return;
                let l = document.activeElement;
                if (Si() && l && n.contains(l)) return;
                if (i && ((e = this.getSlide()) === null || e === void 0 ? void 0 : e.type) === "image") return void(this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout(() => {
                    this.toggleIdle(), this.clickTimer = null
                }, 350));
                if (this.emit("click", t), t.defaultPrevented) return;
                let c = false;
                if (a.closest(".fancybox__content")) {
                    if (l) {
                        if (l.closest("[contenteditable]")) return;
                        a.matches(pn) || l.blur()
                    }
                    if (Si()) return;
                    c = this.option("contentClick")
                } else a.closest(".fancybox__carousel") && !a.matches(pn) && (c = this.option("backdropClick"));
                c === "close" ? (t.preventDefault(), this.close(t)) : c === "next" ? (t.preventDefault(), this.next()) : c === "prev" && (t.preventDefault(), this.prev())
            }
            onWheel(t) {
                let e = t.target,
                    n = this.option("wheel", t);
                e.closest(".fancybox__thumbs") && (n = "slide");
                let i = n === "slide",
                    a = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function(u, m) {
                        return Math.abs(m) > Math.abs(u) ? m : u
                    }),
                    l = Math.max(-1, Math.min(1, a)),
                    c = Date.now();
                this.pwt && c - this.pwt < 300 ? i && t.preventDefault() : (this.pwt = c, this.emit("wheel", t, l), t.defaultPrevented || (n === "close" ? (t.preventDefault(), this.close(t)) : n === "slide" && (Qe(e) || (t.preventDefault(), this[l > 0 ? "prev" : "next"]()))))
            }
            onScroll() {
                window.scrollTo(Di, _i)
            }
            onKeydown(t) {
                if (!this.isTopmost()) return;
                this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
                let e = t.key,
                    n = this.option("keyboard");
                if (!n) return;
                let i = t.composedPath()[0],
                    a = document.activeElement && document.activeElement.classList,
                    l = a && a.contains("f-button") || i.dataset.carouselPage || i.dataset.carouselIndex;
                if (e !== "Escape" && !l && G(i) && (i.isContentEditable || ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(i.nodeName) !== -1) || (t.key === "Tab" ? v(this.container, Un) : O(this.container, Un), t.ctrlKey || t.altKey || t.shiftKey)) return;
                this.emit("keydown", e, t);
                let c = n[e];
                c && typeof this[c] == "function" && (t.preventDefault(), this[c]())
            }
            onResize() {
                let t = this.container;
                if (!t) return;
                let e = this.isCompact;
                t.classList.toggle(Zi, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.scale(), this.emit("resize")
            }
            onFocus(t) {
                this.isTopmost() && this.checkFocus(t)
            }
            onMousemove(t) {
                this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle()
            }
            onVisibilityChange() {
                document.visibilityState === "visible" ? this.checkFocus() : this.endIdle()
            }
            manageCloseBtn(t) {
                let e = this.optionFor(t, "closeButton") || false;
                if (e === "auto") {
                    let i = this.plugins.Toolbar;
                    if (i && i.state === ft.Ready) return
                }
                if (!e || !t.contentEl || t.closeBtnEl) return;
                let n = this.option("tpl.closeButton");
                if (n) {
                    let i = tt(this.localize(n));
                    t.closeBtnEl = t.contentEl.appendChild(i), t.el && v(t.el, "has-close-btn")
                }
            }
            manageCaption(t = void 0) {
                var e, n;
                let i = "fancybox__caption",
                    a = this.container;
                if (!a) return;
                O(a, fe);
                let l = this.isCompact || this.option("commonCaption"),
                    c = !l;
                if (this.caption && this.stop(this.caption), c && this.caption && (this.caption.remove(), this.caption = null), l && !this.caption)
                    for (let r of ((e = this.carousel) === null || e === void 0 ? void 0 : e.slides) || []) r.captionEl && (r.captionEl.remove(), r.captionEl = void 0, O(r.el, fe), (n = r.el) === null || n === void 0 || n.removeAttribute("aria-labelledby"));
                if (t || (t = this.getSlide()), !t || l && !this.isCurrentSlide(t)) return;
                let u = t.el,
                    m = this.optionFor(t, "caption", "");
                if (!m) return void(l && this.caption && this.animate(this.caption, "f-fadeOut", () => {
                    this.caption && (this.caption.innerHTML = "")
                }));
                let s = null;
                if (c) {
                    if (s = t.captionEl || null, u && !s) {
                        let r = i + `_${this.id}_${t.index}`;
                        s = document.createElement("div"), v(s, i), s.setAttribute("id", r), t.captionEl = u.appendChild(s), v(u, fe), u.setAttribute("aria-labelledby", r)
                    }
                } else s = this.caption, s || (s = a.querySelector("." + i)), !s && (s = document.createElement("div"), s.dataset.fancyboxCaption = "", v(s, i), (this.footer || a).prepend(s)), v(a, fe), this.caption = s;
                s && (s.innerHTML = "", ct(m) || typeof m == "number" ? s.innerHTML = m + "" : m instanceof HTMLElement && s.appendChild(m))
            }
            checkFocus(t) {
                this.focus(t)
            }
            focus(t) {
                var e;
                if (this.ignoreFocusChange) return;
                let n = document.activeElement || null,
                    i = t?.target || null,
                    a = this.container,
                    l = (e = this.carousel) === null || e === void 0 ? void 0 : e.viewport;
                if (!a || !l || !t && n && a.contains(n)) return;
                let c = this.getSlide(),
                    u = c && c.state === _.Ready ? c.el : null;
                if (!u || u.contains(n) || a === n) return;
                t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = true;
                let m = Array.from(a.querySelectorAll(pn)),
                    s = [],
                    r = null;
                for (let h of m) {
                    let p = !h.offsetParent || !!h.closest('[aria-hidden="true"]'),
                        f = u && u.contains(h),
                        Q = !l.contains(h);
                    if (h === a || (f || Q) && !p) {
                        s.push(h);
                        let b = h.dataset.origTabindex;
                        b !== void 0 && b && (h.tabIndex = parseFloat(b)), h.removeAttribute("data-orig-tabindex"), !h.hasAttribute("autoFocus") && r || (r = h)
                    } else {
                        let b = h.dataset.origTabindex === void 0 ? h.getAttribute("tabindex") || "" : h.dataset.origTabindex;
                        b && (h.dataset.origTabindex = b), h.tabIndex = -1
                    }
                }
                let d = null;
                t ? (!i || s.indexOf(i) < 0) && (d = r || a, s.length && (n === mt ? d = s[0] : this.lastFocus !== a && n !== P || (d = s[s.length - 1]))) : d = c && c.type === "image" ? a : r || a, d && vi(d), this.lastFocus = document.activeElement, this.ignoreFocusChange = false
            }
            next() {
                let t = this.carousel;
                t && t.pages.length > 1 && t.slideNext()
            }
            prev() {
                let t = this.carousel;
                t && t.pages.length > 1 && t.slidePrev()
            }
            jumpTo(...t) {
                this.carousel && this.carousel.slideTo(...t)
            }
            isTopmost() {
                var t;
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.id) == this.id
            }
            animate(t = null, e = "", n) {
                if (!t || !e) return void(n && n());
                this.stop(t);
                let i = a => {
                    a.target === t && t.dataset.animationName && (t.removeEventListener("animationend", i), delete t.dataset.animationName, n && n(), O(t, e))
                };
                t.dataset.animationName = e, t.addEventListener("animationend", i), v(t, e)
            }
            stop(t) {
                t && t.dispatchEvent(new CustomEvent("animationend", {
                    bubbles: false,
                    cancelable: true,
                    currentTarget: t
                }))
            }
            setContent(t, e = "", n = true) {
                if (this.isClosing()) return;
                let i = t.el;
                if (!i) return;
                let a = null;
                if (G(e) ? a = e : (a = tt(e + ""), G(a) || (a = document.createElement("div"), a.innerHTML = e + "")), ["img", "picture", "iframe", "video", "audio"].includes(a.nodeName.toLowerCase())) {
                    let l = document.createElement("div");
                    l.appendChild(a), a = l
                }
                G(a) && t.filter && !t.error && (a = a.querySelector(t.filter)), a && G(a) ? (v(a, "fancybox__content"), t.id && a.setAttribute("id", t.id), i.classList.add(`has-${t.error?"error":t.type||"unknown"}`), i.prepend(a), a.style.display === "none" && (a.style.display = ""), getComputedStyle(a).getPropertyValue("display") === "none" && (a.style.display = t.display || this.option("defaultDisplay") || "flex"), t.contentEl = a, n && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
            }
            revealContent(t, e) {
                let n = t.el,
                    i = t.contentEl;
                n && i && (this.emit("reveal", t), this.hideLoading(t), t.state = _.Opening, (e = this.isOpeningSlide(t) ? e === void 0 ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(i, e, () => {
                    this.done(t)
                }) : this.done(t))
            }
            done(t) {
                this.isClosing() || (t.state = _.Ready, this.emit("done", t), v(t.el, "is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask(() => {
                    var e;
                    (e = t.panzoom) === null || e === void 0 || e.updateControls(), this.option("autoFocus") && this.focus()
                }), this.isOpeningSlide(t) && (O(this.container, yn), !this.isCompact && this.option("idle") && this.setIdle()))
            }
            isCurrentSlide(t) {
                let e = this.getSlide();
                return !(!t || !e) && e.index === t.index
            }
            isOpeningSlide(t) {
                var e, n;
                return ((e = this.carousel) === null || e === void 0 ? void 0 : e.prevPage) === null && t && t.index === ((n = this.getSlide()) === null || n === void 0 ? void 0 : n.index)
            }
            showLoading(t) {
                t.state = _.Loading;
                let e = t.el;
                e && (v(e, Wi), this.emit("loading", t), t.spinnerEl || setTimeout(() => {
                    if (!this.isClosing() && !t.spinnerEl && t.state === _.Loading) {
                        let n = tt(Xn);
                        v(n, "fancybox-spinner"), t.spinnerEl = n, e.prepend(n), this.animate(n, "f-fadeIn")
                    }
                }, 250))
            }
            hideLoading(t) {
                let e = t.el;
                if (!e) return;
                let n = t.spinnerEl;
                this.isClosing() ? n?.remove() : (O(e, Wi), n && this.animate(n, "f-fadeOut", () => {
                    n.remove()
                }), t.state === _.Loading && (this.emit("loaded", t), t.state = _.Ready))
            }
            setError(t, e) {
                if (this.isClosing()) return;
                let n = new Event("error", {
                    bubbles: true,
                    cancelable: true
                });
                if (this.emit("error", n, t), n.defaultPrevented) return;
                t.error = e, this.hideLoading(t), this.clearContent(t);
                let i = document.createElement("div");
                i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i)
            }
            clearContent(t) {
                if (t.state === void 0) return;
                this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
                let e = t.el;
                e && (O(e, "has-error"), O(e, "has-unknown"), O(e, `has-${t.type||"unknown"}`)), t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0
            }
            getSlide() {
                var t;
                let e = this.carousel;
                return ((t = e?.pages[e?.page]) === null || t === void 0 ? void 0 : t.slides[0]) || void 0
            }
            close(t, e) {
                if (this.isClosing()) return;
                let n = new Event("shouldClose", {
                    bubbles: true,
                    cancelable: true
                });
                if (this.emit("shouldClose", n, t), n.defaultPrevented) return;
                t && t.cancelable && (t.preventDefault(), t.stopPropagation());
                let i = () => {
                    this.proceedClose(t, e)
                };
                this.startedFs && j && j.isFullscreen() ? Promise.resolve(j.exit()).then(() => i()) : i()
            }
            clearIdle() {
                this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null
            }
            setIdle(t = false) {
                let e = () => {
                    this.clearIdle(), this.idle = true, v(this.container, "is-idle"), this.emit("setIdle")
                };
                if (this.clearIdle(), !this.isClosing())
                    if (t) e();
                    else {
                        let n = this.option("idle");
                        n && (this.idleTimer = setTimeout(e, n))
                    }
            }
            endIdle() {
                this.clearIdle(), this.idle && !this.isClosing() && (this.idle = false, O(this.container, "is-idle"), this.emit("endIdle"))
            }
            resetIdle() {
                this.endIdle(), this.setIdle()
            }
            toggleIdle() {
                this.idle ? this.endIdle() : this.setIdle(true)
            }
            toggleFullscreen() {
                j && (j.isFullscreen() ? j.exit() : j.request().then(() => {
                    this.startedFs = true
                }))
            }
            isClosing() {
                return [V.Closing, V.CustomClosing, V.Destroy].includes(this.state)
            }
            proceedClose(t, e) {
                var n, i;
                this.state = V.Closing, this.clearIdle(), this.detachEvents();
                let a = this.container,
                    l = this.carousel,
                    c = this.getSlide(),
                    u = c && this.option("placeFocusBack") ? c.triggerEl || this.option("triggerEl") : null;
                if (u && (Ii(u) ? vi(u) : u.focus()), a && (O(a, yn), v(a, "is-closing"), a.setAttribute(Bn, "true"), this.option("animated") && v(a, vn), a.style.pointerEvents = "none"), l) {
                    l.clearTransitions(), (n = l.panzoom) === null || n === void 0 || n.destroy(), (i = l.plugins.Navigation) === null || i === void 0 || i.detach();
                    for (let m of l.slides) {
                        m.state = _.Closing, this.hideLoading(m);
                        let s = m.contentEl;
                        s && this.stop(s);
                        let r = m?.panzoom;
                        r && (r.stop(), r.detachEvents(), r.detachObserver()), this.isCurrentSlide(m) || l.emit("removeSlide", m)
                    }
                }
                Di = window.scrollX, _i = window.scrollY, window.addEventListener("scroll", this.onScroll), this.emit("close", t), this.state !== V.CustomClosing ? (e === void 0 && c && (e = this.optionFor(c, "hideClass")), e && c ? (this.animate(c.contentEl, e, () => {
                    l && l.emit("removeSlide", c)
                }), setTimeout(() => {
                    this.destroy()
                }, 500)) : this.destroy()) : setTimeout(() => {
                    this.destroy()
                }, 500)
            }
            destroy() {
                var t;
                if (this.state === V.Destroy) return;
                window.removeEventListener("scroll", this.onScroll), this.state = V.Destroy, (t = this.carousel) === null || t === void 0 || t.destroy();
                let e = this.container;
                e && e.remove(), Ut.delete(this.id);
                let n = o.getInstance();
                n ? n.focus() : (P && (P.remove(), P = null), mt && (mt.remove(), mt = null), O(document.documentElement, Oi), (() => {
                    if (!Ot) return;
                    let i = document,
                        a = i.body;
                    a.classList.remove(Fn), a.style.setProperty(Ci, ""), i.documentElement.style.setProperty(Ri, "")
                })(), this.emit("destroy"))
            }
            static bind(t, e, n) {
                if (!Ot) return;
                let i, a = "",
                    l = {};
                if (t === void 0 ? i = document.body : ct(t) ? (i = document.body, a = t, typeof e == "object" && (l = e || {})) : (i = t, ct(e) && (a = e), typeof n == "object" && (l = n || {})), !i || !G(i)) return;
                a = a || "[data-fancybox]";
                let c = o.openers.get(i) || new Map;
                c.set(a, l), o.openers.set(i, c), c.size === 1 && i.addEventListener("click", o.fromEvent)
            }
            static unbind(t, e) {
                let n, i = "";
                if (ct(t) ? (n = document.body, i = t) : (n = t, ct(e) && (i = e)), !n) return;
                let a = o.openers.get(n);
                a && i && a.delete(i), i && a || (o.openers.delete(n), n.removeEventListener("click", o.fromEvent))
            }
            static destroy() {
                let t;
                for (; t = o.getInstance();) t.destroy();
                for (let e of o.openers.keys()) e.removeEventListener("click", o.fromEvent);
                o.openers = new Map
            }
            static fromEvent(t) {
                if (t.defaultPrevented || t.button && t.button !== 0 || t.ctrlKey || t.metaKey || t.shiftKey) return;
                let e = t.composedPath()[0],
                    n = e.closest("[data-fancybox-trigger]");
                if (n) {
                    let p = n.dataset.fancyboxTrigger || "",
                        f = document.querySelectorAll(`[data-fancybox="${p}"]`),
                        Q = parseInt(n.dataset.fancyboxIndex || "", 10) || 0;
                    e = f[Q] || e
                }
                if (!(e && e instanceof Element)) return;
                let i, a, l, c;
                if ([...o.openers].reverse().find(([p, f]) => !(!p.contains(e) || ![...f].reverse().find(([Q, b]) => {
                        let g = e.closest(Q);
                        return !!g && (i = p, a = Q, l = g, c = b, true)
                    }))), !i || !a || !l) return;
                c = c || {}, t.preventDefault(), e = l;
                let u = [],
                    m = I({}, Nn, c);
                m.event = t, m.triggerEl = e, m.delegate = n;
                let s = m.groupAll,
                    r = m.groupAttr,
                    d = r && e ? e.getAttribute(`${r}`) : "";
                if ((!e || d || s) && (u = [].slice.call(i.querySelectorAll(a))), e && !s && (u = d ? u.filter(p => p.getAttribute(`${r}`) === d) : [e]), !u.length) return;
                let h = o.getInstance();
                return h && h.options.triggerEl && u.indexOf(h.options.triggerEl) > -1 ? void 0 : (e && (m.startIndex = u.indexOf(e)), o.fromNodes(u, m))
            }
            static fromSelector(t, e, n) {
                let i = null,
                    a = "",
                    l = {};
                if (ct(t) ? (i = document.body, a = t, typeof e == "object" && (l = e || {})) : t instanceof HTMLElement && ct(e) && (i = t, a = e, typeof n == "object" && (l = n || {})), !i || !a) return false;
                let c = o.openers.get(i);
                return !!c && (l = I({}, c.get(a) || {}, l), !!l && o.fromNodes(Array.from(i.querySelectorAll(a)), l))
            }
            static fromNodes(t, e) {
                e = I({}, Nn, e || {});
                let n = [];
                for (let i of t) {
                    let a = i.dataset || {},
                        l = a[Bt] || i.getAttribute(xn) || i.getAttribute("currentSrc") || i.getAttribute(Bt) || void 0,
                        c, u = e.delegate,
                        m;
                    u && n.length === e.startIndex && (c = u instanceof HTMLImageElement ? u : u.querySelector("img:not([aria-hidden])")), c || (c = i instanceof HTMLImageElement ? i : i.querySelector("img:not([aria-hidden])")), c && (m = c.currentSrc || c[Bt] || void 0, !m && c.dataset && (m = c.dataset.lazySrc || c.dataset[Bt] || void 0));
                    let s = {
                        src: l,
                        triggerEl: i,
                        thumbEl: c,
                        thumbElSrc: m,
                        thumbSrc: m
                    };
                    for (let r in a) {
                        let d = a[r] + "";
                        d = d !== "false" && (d === "true" || d), s[r] = d
                    }
                    n.push(s)
                }
                return new o(n, e)
            }
            static getInstance(t) {
                return t ? Ut.get(t) : Array.from(Ut.values()).reverse().find(e => !e.isClosing() && e) || null
            }
            static getSlide() {
                var t;
                return ((t = o.getInstance()) === null || t === void 0 ? void 0 : t.getSlide()) || null
            }
            static show(t = [], e = {}) {
                return new o(t, e)
            }
            static next() {
                let t = o.getInstance();
                t && t.next()
            }
            static prev() {
                let t = o.getInstance();
                t && t.prev()
            }
            static close(t = true, ...e) {
                if (t)
                    for (let n of Ut.values()) n.close(...e);
                else {
                    let n = o.getInstance();
                    n && n.close(...e)
                }
            }
        };
    Object.defineProperty(K, "version", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "5.0.36"
    }), Object.defineProperty(K, "defaults", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Nn
    }), Object.defineProperty(K, "Plugins", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: vs
    }), Object.defineProperty(K, "openers", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Map
    });
    var On = class extends L {
        initialize() {
            this.forceClose = this.forceClose.bind(this)
        }
        connect() {
            this.openValue && this.open(), document.addEventListener("turbo:before-render", this.forceClose)
        }
        disconnect() {
            document.removeEventListener("turbo:before-render", this.forceClose)
        }
        open() {
            this.dialogTarget.showModal()
        }
        close() {
            this.dialogTarget.setAttribute("closing", ""), Promise.all(this.dialogTarget.getAnimations().map(t => t.finished)).then(() => {
                this.dialogTarget.removeAttribute("closing"), this.dialogTarget.close()
            })
        }
        backdropClose(t) {
            t.target === this.dialogTarget && this.close()
        }
        forceClose() {
            this.dialogTarget.close()
        }
    };
    On.targets = ["dialog"], On.values = {
        open: {
            type: Boolean,
            default: false
        }
    };
    var Ki = On;
    var Rn = {};
    A(Rn, {
        default: () => audio_controller
    });
    var audio_controller = class extends L {
        connect() {
            this.nextNote = false
        }
        audioPlayerTargetConnected(o) {
            let t = o.querySelector("audio");
            t.volume = this.volumeValue
        }
        playAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            if (this.playingValue && this.playingValue != t.id) {
                let n = document.getElementById(this.playingValue);
                n && n.querySelector("audio").pause()
            }
            e.paused && e.play(), t.classList.add("playing"), this.playingValue = t.id, t.dataset.bpm && (this.bpmValue = t.dataset.bpm)
        }
        toggleAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            t.classList.contains("playing") ? e.pause() : e.play()
        }
        pauseAudio(o) {
            let t = o.target;
            o.target.classList.contains("audio-player") || (t = o.target.closest(".audio-player"));
            let e = t.querySelector("audio");
            t.classList.remove("playing"), document.querySelector(".audio-player.playing") || (this.playingValue = "")
        }
        spawnNote() {
            if (this.playingValue) {
                let o = document.getElementById(this.playingValue);
                if (o) {
                    let t = o.querySelector(".audio-player__dog");
                    if (t) {
                        o.classList.contains("playing-alt") ? o.classList.remove("playing-alt") : o.classList.add("playing-alt");
                        let e = document.createElement("img");
                        e.src = "https://deltarune.com/assets/images/note-small.png", e.classList.add("absolute", "animate-note", "z-30", "pixel"), e.width = 18, e.height = 18;
                        let n = Math.floor(Math.random() * 10) - 10,
                            i = Math.floor(Math.random() * 10) - 5,
                            a = Math.floor(Math.random() * 10) - 40;
                        e.setAttribute("style", `top: ${Math.floor(Math.random()*10)-10}; left: ${Math.floor(Math.random()*30)+40}%; offset-path: path('M 0 0 C ${n} ${n/2} ${i} ${a} ${i} ${a}`), t.appendChild(e), setTimeout(function() {
                            e.remove()
                        }, 1e3), o.dataset.bpm && (this.bpmValue = o.dataset.bpm), this.nextNote = setTimeout(this.spawnNote.bind(this), 60 / this.bpmValue * 1e3)
                    }
                }
            }
        }
        updateVolume(o) {
            o.target.muted ? (this.mutedValue = true, this.volumeValue = 0) : (this.mutedValue = false, this.volumeValue = o.target.volume);
            for (let t of this.audioPlayerTargets) {
                let e = t.querySelector("audio");
                e.volume = this.volumeValue
            }
        }
        stopNotes() {
            this.nextNote && (clearTimeout(this.nextNote), this.nextNote = false)
        }
        syncNotes() {
            this.stopNotes(), this.spawnNote()
        }
    };
    X(audio_controller, "targets", ["audioPlayer"]), X(audio_controller, "values", {
        playing: {
            type: String
        },
        bpm: {
            type: Number,
            default: 90
        },
        volume: {
            type: Number,
            default: .5
        },
        muted: {
            type: Boolean,
            default: false
        }
    });
    //var Dn = {};
    //A(Dn, {
    //    default: () => Vt
    //});
    var Cn = typeof navigator < "u" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;

    function Zn(o, t, e, n) {
        o.addEventListener ? o.addEventListener(t, e, n) : o.attachEvent && o.attachEvent("on".concat(t), e)
    }

    function Zt(o, t, e, n) {
        o.removeEventListener ? o.removeEventListener(t, e, n) : o.detachEvent && o.detachEvent("on".concat(t), e)
    }

    function to(o, t) {
        let e = t.slice(0, t.length - 1);
        for (let n = 0; n < e.length; n++) e[n] = o[e[n].toLowerCase()];
        return e
    }

    function eo(o) {
        typeof o != "string" && (o = ""), o = o.replace(/\s/g, "");
        let t = o.split(","),
            e = t.lastIndexOf("");
        for (; e >= 0;) t[e - 1] += ",", t.splice(e, 1), e = t.lastIndexOf("");
        return t
    }

    function xs(o, t) {
        let e = o.length >= t.length ? o : t,
            n = o.length >= t.length ? t : o,
            i = true;
        for (let a = 0; a < e.length; a++) n.indexOf(e[a]) === -1 && (i = false);
        return i
    }
    var Mt = {
            backspace: 8,
            "\u232B": 8,
            tab: 9,
            clear: 12,
            enter: 13,
            "\u21A9": 13,
            return: 13,
            esc: 27,
            escape: 27,
            space: 32,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            del: 46,
            delete: 46,
            ins: 45,
            insert: 45,
            home: 36,
            end: 35,
            pageup: 33,
            pagedown: 34,
            capslock: 20,
            num_0: 96,
            num_1: 97,
            num_2: 98,
            num_3: 99,
            num_4: 100,
            num_5: 101,
            num_6: 102,
            num_7: 103,
            num_8: 104,
            num_9: 105,
            num_multiply: 106,
            num_add: 107,
            num_enter: 108,
            num_subtract: 109,
            num_decimal: 110,
            num_divide: 111,
            "\u21EA": 20,
            ",": 188,
            ".": 190,
            "/": 191,
            "`": 192,
            "-": Cn ? 173 : 189,
            "=": Cn ? 61 : 187,
            ";": Cn ? 59 : 186,
            "'": 222,
            "[": 219,
            "]": 221,
            "\\": 220
        },
        nt = {
            "\u21E7": 16,
            shift: 16,
            "\u2325": 18,
            alt: 18,
            option: 18,
            "\u2303": 17,
            ctrl: 17,
            control: 17,
            "\u2318": 91,
            cmd: 91,
            command: 91
        },
        Ne = {
            16: "shiftKey",
            18: "altKey",
            17: "ctrlKey",
            91: "metaKey",
            shiftKey: 16,
            ctrlKey: 17,
            altKey: 18,
            metaKey: 91
        },
        D = {
            16: false,
            18: false,
            17: false,
            91: false
        },
        W = {};
    for (let o = 1; o < 20; o++) Mt["f".concat(o)] = 111 + o;
    var Z = [],
        Wt = null,
        no = "all",
        rt = new Map,
        kt = o => Mt[o.toLowerCase()] || nt[o.toLowerCase()] || o.toUpperCase().charCodeAt(0),
        ws = o => Object.keys(Mt).find(t => Mt[t] === o),
        Ts = o => Object.keys(nt).find(t => nt[t] === o);

    function io(o) {
        no = o || "all"
    }

    function St() {
        return no || "all"
    }

    function Es() {
        return Z.slice(0)
    }

    function Ns() {
        return Z.map(o => ws(o) || Ts(o) || String.fromCharCode(o))
    }

    function Ls() {
        let o = [];
        return Object.keys(W).forEach(t => {
            W[t].forEach(e => {
                let {
                    key: n,
                    scope: i,
                    mods: a,
                    shortcut: l
                } = e;
                o.push({
                    scope: i,
                    shortcut: l,
                    mods: a,
                    keys: n.split("+").map(c => kt(c))
                })
            })
        }), o
    }

    function Xs(o) {
        let t = o.target || o.srcElement,
            {
                tagName: e
            } = t,
            n = true,
            i = e === "INPUT" && !["checkbox", "radio", "range", "button", "file", "reset", "submit", "color"].includes(t.type);
        return (t.isContentEditable || (i || e === "TEXTAREA" || e === "SELECT") && !t.readOnly) && (n = false), n
    }

    function Os(o) {
        return typeof o == "string" && (o = kt(o)), Z.indexOf(o) !== -1
    }

    function Rs(o, t) {
        let e, n;
        o || (o = St());
        for (let i in W)
            if (Object.prototype.hasOwnProperty.call(W, i))
                for (e = W[i], n = 0; n < e.length;) e[n].scope === o ? e.splice(n, 1).forEach(l => {
                    let {
                        element: c
                    } = l;
                    return Mn(c)
                }) : n++;
        St() === o && io(t || "all")
    }

    function Cs(o) {
        let t = o.keyCode || o.which || o.charCode,
            e = Z.indexOf(t);
        if (e >= 0 && Z.splice(e, 1), o.key && o.key.toLowerCase() === "meta" && Z.splice(0, Z.length), (t === 93 || t === 224) && (t = 91), t in D) {
            D[t] = false;
            for (let n in nt) nt[n] === t && ($[n] = false)
        }
    }

    function oo(o) {
        if (typeof o > "u") Object.keys(W).forEach(i => {
            Array.isArray(W[i]) && W[i].forEach(a => Ee(a)), delete W[i]
        }), Mn(null);
        else if (Array.isArray(o)) o.forEach(i => {
            i.key && Ee(i)
        });
        else if (typeof o == "object") o.key && Ee(o);
        else if (typeof o == "string") {
            for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) e[n - 1] = arguments[n];
            let [i, a] = e;
            typeof i == "function" && (a = i, i = ""), Ee({
                key: o,
                scope: i,
                method: a,
                splitKey: "+"
            })
        }
    }
    var Ee = o => {
        let {
            key: t,
            scope: e,
            method: n,
            splitKey: i = "+"
        } = o;
        eo(t).forEach(l => {
            let c = l.split(i),
                u = c.length,
                m = c[u - 1],
                s = m === "*" ? "*" : kt(m);
            if (!W[s]) return;
            e || (e = St());
            let r = u > 1 ? to(nt, c) : [],
                d = [];
            W[s] = W[s].filter(h => {
                let f = (n ? h.method === n : true) && h.scope === e && xs(h.mods, r);
                return f && d.push(h.element), !f
            }), d.forEach(h => Mn(h))
        })
    };

    function $i(o, t, e, n) {
        if (t.element !== n) return;
        let i;
        if (t.scope === e || t.scope === "all") {
            i = t.mods.length > 0;
            for (let a in D) Object.prototype.hasOwnProperty.call(D, a) && (!D[a] && t.mods.indexOf(+a) > -1 || D[a] && t.mods.indexOf(+a) === -1) && (i = false);
            (t.mods.length === 0 && !D[16] && !D[18] && !D[17] && !D[91] || i || t.shortcut === "*") && (t.keys = [], t.keys = t.keys.concat(Z), t.method(o, t) === false && (o.preventDefault ? o.preventDefault() : o.returnValue = false, o.stopPropagation && o.stopPropagation(), o.cancelBubble && (o.cancelBubble = true)))
        }
    }

    function qi(o, t) {
        let e = W["*"],
            n = o.keyCode || o.which || o.charCode;
        if (!$.filter.call(this, o)) return;
        if ((n === 93 || n === 224) && (n = 91), Z.indexOf(n) === -1 && n !== 229 && Z.push(n), ["metaKey", "ctrlKey", "altKey", "shiftKey"].forEach(c => {
                let u = Ne[c];
                o[c] && Z.indexOf(u) === -1 ? Z.push(u) : !o[c] && Z.indexOf(u) > -1 ? Z.splice(Z.indexOf(u), 1) : c === "metaKey" && o[c] && (Z = Z.filter(m => m in Ne || m === n))
            }), n in D) {
            D[n] = true;
            for (let c in nt) nt[c] === n && ($[c] = true);
            if (!e) return
        }
        for (let c in D) Object.prototype.hasOwnProperty.call(D, c) && (D[c] = o[Ne[c]]);
        o.getModifierState && !(o.altKey && !o.ctrlKey) && o.getModifierState("AltGraph") && (Z.indexOf(17) === -1 && Z.push(17), Z.indexOf(18) === -1 && Z.push(18), D[17] = true, D[18] = true);
        let i = St();
        if (e)
            for (let c = 0; c < e.length; c++) e[c].scope === i && (o.type === "keydown" && e[c].keydown || o.type === "keyup" && e[c].keyup) && $i(o, e[c], i, t);
        if (!(n in W)) return;
        let a = W[n],
            l = a.length;
        for (let c = 0; c < l; c++)
            if ((o.type === "keydown" && a[c].keydown || o.type === "keyup" && a[c].keyup) && a[c].key) {
                let u = a[c],
                    {
                        splitKey: m
                    } = u,
                    s = u.key.split(m),
                    r = [];
                for (let d = 0; d < s.length; d++) r.push(kt(s[d]));
                r.sort().join("") === Z.sort().join("") && $i(o, u, i, t)
            }
    }

    function $(o, t, e) {
        Z = [];
        let n = eo(o),
            i = [],
            a = "all",
            l = document,
            c = 0,
            u = false,
            m = true,
            s = "+",
            r = false,
            d = false;
        for (e === void 0 && typeof t == "function" && (e = t), Object.prototype.toString.call(t) === "[object Object]" && (t.scope && (a = t.scope), t.element && (l = t.element), t.keyup && (u = t.keyup), t.keydown !== void 0 && (m = t.keydown), t.capture !== void 0 && (r = t.capture), typeof t.splitKey == "string" && (s = t.splitKey), t.single === true && (d = true)), typeof t == "string" && (a = t), d && oo(o, a); c < n.length; c++) o = n[c].split(s), i = [], o.length > 1 && (i = to(nt, o)), o = o[o.length - 1], o = o === "*" ? "*" : kt(o), o in W || (W[o] = []), W[o].push({
            keyup: u,
            keydown: m,
            scope: a,
            mods: i,
            shortcut: n[c],
            method: e,
            key: n[c],
            splitKey: s,
            element: l
        });
        if (typeof l < "u" && window) {
            if (!rt.has(l)) {
                let h = function() {
                        let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                        return qi(f, l)
                    },
                    p = function() {
                        let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.event;
                        qi(f, l), Cs(f)
                    };
                rt.set(l, {
                    keydownListener: h,
                    keyupListenr: p,
                    capture: r
                }), Zn(l, "keydown", h, r), Zn(l, "keyup", p, r)
            }
            if (!Wt) {
                let h = () => {
                    Z = []
                };
                Wt = {
                    listener: h,
                    capture: r
                }, Zn(window, "focus", h, r)
            }
        }
    }

    function Zs(o) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
        Object.keys(W).forEach(e => {
            W[e].filter(i => i.scope === t && i.shortcut === o).forEach(i => {
                i && i.method && i.method()
            })
        })
    }

    function Mn(o) {
        let t = Object.values(W).flat();
        if (t.findIndex(n => {
                let {
                    element: i
                } = n;
                return i === o
            }) < 0) {
            let {
                keydownListener: n,
                keyupListenr: i,
                capture: a
            } = rt.get(o) || {};
            n && i && (Zt(o, "keyup", i, a), Zt(o, "keydown", n, a), rt.delete(o))
        }
        if ((t.length <= 0 || rt.size <= 0) && (Object.keys(rt).forEach(i => {
                let {
                    keydownListener: a,
                    keyupListenr: l,
                    capture: c
                } = rt.get(i) || {};
                a && l && (Zt(i, "keyup", l, c), Zt(i, "keydown", a, c), rt.delete(i))
            }), rt.clear(), Object.keys(W).forEach(i => delete W[i]), Wt)) {
            let {
                listener: i,
                capture: a
            } = Wt;
            Zt(window, "focus", i, a), Wt = null
        }
    }
    var Wn = {
        getPressedKeyString: Ns,
        setScope: io,
        getScope: St,
        deleteScope: Rs,
        getPressedKeyCodes: Es,
        getAllKeyCodes: Ls,
        isPressed: Os,
        filter: Xs,
        trigger: Zs,
        unbind: oo,
        keyMap: Mt,
        modifier: nt,
        modifierMap: Ne
    };
    for (let o in Wn) Object.prototype.hasOwnProperty.call(Wn, o) && ($[o] = Wn[o]);
    if (typeof window < "u") {
        let o = window.hotkeys;
        $.noConflict = t => (t && window.hotkeys === $ && (window.hotkeys = o), $), window.hotkeys = $
    }

    function Ws(o, t) {
        var e = {};
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && t.indexOf(n) < 0 && (e[n] = o[n]);
        if (o != null && typeof Object.getOwnPropertySymbols == "function")
            for (var i = 0, n = Object.getOwnPropertySymbols(o); i < n.length; i++) t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(o, n[i]) && (e[n[i]] = o[n[i]]);
        return e
    }
    var Sn = {
            debug: false,
            logger: console,
            dispatchEvent: true,
            eventPrefix: true
        },
        kn = class {
            constructor(t, e = {}) {
                var n, i, a;
                this.log = (u, m) => {
                    this.debug && (this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${u}`, "color: #3B82F6", "color: unset"), this.logger.log(Object.assign({
                        controllerId: this.controllerId
                    }, m)), this.logger.groupEnd())
                }, this.warn = u => {
                    this.logger.warn(`%c${this.controller.identifier} %c${u}`, "color: #3B82F6; font-weight: bold", "color: unset")
                }, this.dispatch = (u, m = {}) => {
                    if (this.dispatchEvent) {
                        let {
                            event: s
                        } = m, r = Ws(m, ["event"]), d = this.extendedEvent(u, s || null, r);
                        this.targetElement.dispatchEvent(d), this.log("dispatchEvent", Object.assign({
                            eventName: d.type
                        }, r))
                    }
                }, this.call = (u, m = {}) => {
                    let s = this.controller[u];
                    if (typeof s == "function") return s.call(this.controller, m)
                }, this.extendedEvent = (u, m, s) => {
                    let {
                        bubbles: r,
                        cancelable: d,
                        composed: h
                    } = m || {
                        bubbles: true,
                        cancelable: true,
                        composed: true
                    };
                    return m && Object.assign(s, {
                        originalEvent: m
                    }), new CustomEvent(this.composeEventName(u), {
                        bubbles: r,
                        cancelable: d,
                        composed: h,
                        detail: s
                    })
                }, this.composeEventName = u => {
                    let m = u;
                    return this.eventPrefix === true ? m = `${this.controller.identifier}:${u}` : typeof this.eventPrefix == "string" && (m = `${this.eventPrefix}:${u}`), m
                }, this.debug = (i = (n = e?.debug) !== null && n !== void 0 ? n : t.application.stimulusUseDebug) !== null && i !== void 0 ? i : Sn.debug, this.logger = (a = e?.logger) !== null && a !== void 0 ? a : Sn.logger, this.controller = t, this.controllerId = t.element.id || t.element.dataset.id, this.targetElement = e?.element || t.element;
                let {
                    dispatchEvent: l,
                    eventPrefix: c
                } = Object.assign({}, Sn, e);
                Object.assign(this, {
                    dispatchEvent: l,
                    eventPrefix: c
                }), this.controllerInitialize = t.initialize.bind(t), this.controllerConnect = t.connect.bind(t), this.controllerDisconnect = t.disconnect.bind(t)
            }
        },
        Vn = class extends kn {
            constructor(t, e) {
                super(t, e), this.bind = () => {
                    for (let [n, i] of Object.entries(this.hotkeysOptions.hotkeys)) {
                        let a = i.handler.bind(this.controller);
                        $(n, i.options, l => a(l, l))
                    }
                }, this.unbind = () => {
                    for (let n in this.hotkeysOptions.hotkeys) $.unbind(n)
                }, this.controller = t, this.hotkeysOptions = e, this.enhanceController(), this.bind()
            }
            enhanceController() {
                this.hotkeysOptions.filter && ($.filter = this.hotkeysOptions.filter);
                let t = this.controller.disconnect.bind(this.controller),
                    e = () => {
                        this.unbind(), t()
                    };
                Object.assign(this.controller, {
                    disconnect: e
                })
            }
        },
        Ms = o => ({
            handler: o[0],
            options: {
                element: o[1]
            }
        }),
        Ss = o => {
            if (!o.hotkeys) {
                let t = {};
                Object.entries(o).forEach(([e, n]) => {
                    Object.defineProperty(t, e, {
                        value: Ms(n),
                        writable: false,
                        enumerable: true
                    })
                }), o = {
                    hotkeys: t
                }
            }
            return o
        },
        so = (o, t) => new Vn(o, Ss(t));
    
    var Gn = {};
    A(Gn, {
        default: () => particles_controller
    });
    var particles_controller = class extends L {
        connect() {
            if (this.hasContainerTarget) {
                for (var o = Math.floor(Math.random() * 4) + 6, t = 0; t < o; t++) {
                    var e = Math.floor(Math.random() * 600) + 600 + t * 10,
                        n = Math.floor(Math.random() * 450) + 200 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendParticle(e, n, this.containerTarget)
                }
                for (var i = Math.floor(Math.random() * 4) + 8, t = 0; t < i; t++) {
                    var e = Math.floor(Math.random() * 600) + 800 + t * 10,
                        n = Math.floor(Math.random() * 450) + 200 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendPixel(e, n, this.containerTarget)
                }
            }
            if (this.hasMobileTarget) {
                for (var o = Math.floor(Math.random() * 2) + 4, t = 0; t < o; t++) {
                    var e = Math.floor(Math.random() * 100) + 220 + t * 10,
                        n = Math.floor(Math.random() * 300) + 100 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendParticle(e, n, this.mobileTarget, 3)
                }
                for (var i = Math.floor(Math.random() * 3) + 6, t = 0; t < i; t++) {
                    var e = Math.floor(Math.random() * 100) + 220 + t * 10,
                        n = Math.floor(Math.random() * 300) + 100 + t * 10;
                    t % 2 == 0 && (e = 0 - e - 20), this.appendPixel(e, n, this.mobileTarget, 2)
                }
            }
        }
        appendParticle(o, t, e, n = 12) {
            var i = Math.floor(Math.random() * 3) + 1;
            o > 0 && (i += 3);
            var a = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 80) + 50;
            t += l * 2;
            var c = document.createElement("img");
            c.setAttribute("class", "absolute opacity-50 animate-pulse motion-safe:translate-y-0"), c.setAttribute("data-distance", l), c.setAttribute("data-scroll-target", "parallax"), c.setAttribute("src", `https://deltarune.com/assets/images/particle-${i}.png`), c.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; animation-delay: -${a}s; max-width: ${n}px`), c.setAttribute("aria-hidden", "true"), e.append(c)
        }
        appendPixel(o, t, e, n = 4) {
            var i = Math.floor(Math.random() * n) + 2,
                a = Math.floor(Math.random() * 6) + 1,
                l = Math.floor(Math.random() * 100) + 50,
                c = Math.floor(Math.random() * 200);
            t += l * 2;
            var u = document.createElement("span");
            u.setAttribute("class", "absolute animate-pulse motion-safe:translate-y-0 border-0"), u.setAttribute("data-distance", l), u.setAttribute("data-scroll-target", "parallax"), u.setAttribute("style", `margin-left: ${o}px; margin-top: ${t}px; width: ${i}px; height: ${i}px; background-color: rgb(${c}, ${c}, 255); animation-delay: -${a}s`), u.setAttribute("aria-hidden", "true"), e.append(u)
        }
    };
    X(particles_controller, "targets", ["particle", "container", "mobile"]);
    
	var In = {};
    A(In, {
        default: () => rarecats_controller
    });
    var _t = Pt(Howler(), 1);
    var rarecats_controller = class extends L {
        connect() {
            let o = new _t.Howl({
                src: ["https://deltarune.com/assets/audio/sprinkle.ogg", "https://deltarune.com/assets/audio/sprinkle.mp3"],
                volume: .5
            });
            this.sprinkle = o;
            let t = new _t.Howl({
                src: ["https://deltarune.com/assets/audio/bagel_ralsei.ogg", "https://deltarune.com/assets/audio/bagel_ralsei.mp3"],
                volume: .5
            });
            this.ralsei = t;
            let e = new _t.Howl({
                src: ["https://deltarune.com/assets/audio/bagel_susie.ogg", "https://deltarune.com/assets/audio/bagel_susie.mp3"],
                volume: .5
            });
            this.susie = e;
            let n = new _t.Howl({
                src: ["https://deltarune.com/assets/audio/face.ogg", "https://deltarune.com/assets/audio/face.mp3"],
                volume: .5
            });
            this.face = n,
			localStorage.getItem("rarecats-points") !== null && (this.pointsValue = localStorage.getItem("rarecats-points")),
			this.summonCat(),
			setTimeout(() => {
                this.catTarget.classList.remove("hidden"), this.initializedValue = true, window.requestAnimationFrame(this.catTick.bind(this))
            }, 100)
        }
        summonCat() {
            let o = Math.floor(Math.random() * 1000); // + 1;
            if (this.pullsValue < 0) // >= 100)
			  this.hardReset();
			else if (o < 700) // formerly <=, < makes the numbers nice
			  this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-001.gif"),
			  this.catTarget.setAttribute("data-rarecats-points-param", 10);
			else if (o <= 879)
			  this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-002.gif"),
			  this.catTarget.setAttribute("data-rarecats-points-param", 50);
			else if (o <= 959)
			  this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-005.gif"),
			  this.catTarget.setAttribute("data-rarecats-points-param", 250);
			else if (o <= 989)
			  this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-006.gif"),
			  this.catTarget.setAttribute("data-rarecats-points-param", 1000);
			else //if (o <= 999)
			  this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-007.gif"),
			  this.catTarget.setAttribute("data-rarecats-points-param", 3000);
			//else if (this.initializedValue == false)
			//  this.summonCat();
		    //else
			//  this.hardReset();
			this.xValue = Math.floor(Math.random() * (document.body.clientWidth - 200)),
			this.yValue = Math.floor(Math.random() * (document.body.clientHeight - 200)),
			this.horizontalValue = Math.round(Math.random()) ? 1 : -1,
			this.verticalValue = Math.round(Math.random()) ? 1 : -1,
			this.updateCat()
        }
        clickCat(o) {
            this.catTarget.classList.contains("animate-caught") == false
			  && (this.pullsValue += 1,
			      this.catTarget.classList.add("animate-caught"),
				  this.catTarget.classList.remove("cursor-pointer"),
				  this.caughtValue = true,
				  "points" in o.params && o.params.points == parseInt(o.params.points)
				    ? this.pointsValue += o.params.points
					: this.hardReset(), 
					  setTimeout(() => {
                        this.catTarget.classList.remove("animate-caught"),
				        this.catTarget.classList.add("cursor-pointer"),
				        this.caughtValue = false,
				        this.catTarget.removeAttribute("disabled"),
				        this.summonCat()
                      }, 1000)
				  )
        }
        pointsValueChanged(o, t) {
            if (document.title = `${this.pointsValue} points`, this.initializedValue == true && (localStorage.setItem("rarecats-points", this.pointsValue), o > t)) {
                let e = o - t,
                    n = document.createElement("span");
                n.classList.add("absolute", "w-24", "h-12", "pointer-events-none", "text-2xl", "text-white", "text-center", "font-pixel", "text-center", "z-5");
				if (this.yValue > 80)
				    n.classList.add("animate-toast"),
				    n.setAttribute("style", `left: ${this.xValue+40}px; top: ${this.yValue+20}px`);
				else
					n.classList.add("animate-toast-down"),
				    n.setAttribute("style", `left: ${this.xValue+40}px; top: ${this.yValue+160}px`);
				n.innerHTML = `+${e}`,
				this.containerTarget.append(n),
				setTimeout(() => {
                  n.remove()
                }, 1000);
				if (e >= 3000)
					this.ralsei.rate(.8),
					this.ralsei.play(),
					this.ralsei.rate(.81),
					this.ralsei.play(),
					this.sprinkle.rate(.25),
					this.sprinkle.play();
				else if (e >= 1000)
					this.ralsei.rate(1),
					this.ralsei.play(),
					this.sprinkle.rate(.5),
					this.sprinkle.play();
				else if (e >= 250)
					this.susie.rate(1.3),
					this.susie.play();
				else if (e >= 50)
					this.sprinkle.rate(.95),
					this.sprinkle.play();
				else if (e >= 10)
					this.sprinkle.rate(1),
					this.sprinkle.play();
				if (e > 3000)
					this.hardReset();
                else if (e >= 1000) {
                    let i = Math.floor(Math.random() * (document.body.clientWidth - 200)),
                        a = Math.floor(Math.random() * (document.body.clientHeight - 200));
                    this.windowTarget.setAttribute("style", `left: ${i}px; top: ${a}px`),
					this.windowTarget.classList.add("animate-fade-in"),
					this.windowTarget.classList.remove("hidden", "animate-fade-out"),
					setTimeout(() => {
                        this.windowTarget.classList.remove("animate-fade-in"),
						this.windowTarget.classList.add("animate-fade-out")
                    }, 3000),
					setTimeout(() => {
                        this.windowTarget.classList.add("hidden"),
						this.windowTarget.classList.remove("animate-fade-out", "animate-fade-in")
                    }, 5000)
                }
            }
        }
        catTick() {
            let o = Math.max(document.body.clientWidth - 130, 130),
                t = Math.max(document.body.clientHeight - 150, 150);
            (this.xValue >= o || this.xValue <= -60) && (this.horizontalValue = -this.horizontalValue), this.xValue >= o && (this.xValue = o), (this.yValue >= t || this.yValue <= -65) && (this.verticalValue = -this.verticalValue), this.yValue >= t && (this.yValue = t), this.xValue += this.horizontalValue, this.yValue += this.verticalValue, this.updateCat(), window.requestAnimationFrame(this.catTick.bind(this))
        }
        updateCat() {
            this.caughtValue == false && this.catTarget.setAttribute("style", `left: ${this.xValue}px; top: ${this.yValue}px`)
        }
        reset() {
            this.pointsValue = 0,
			this.summonCat()
        }
        hardReset() {
            this.pointsValue = 0,
			this.catTarget.setAttribute("src", "https://deltarune.com/assets/images/cat-009.gif"),
			this.catTarget.classList.add("animate-megazoom"),
			this.face.play(),
			setTimeout(this.fullReset.bind(this), 500)
        }
        fullReset() {
            this.catTarget.classList.remove("animate-megazoom"), this.summonCat(), window.location.href = "/sweepstakes/"
        }
    };
    X(rarecats_controller, "targets", ["cat", "container", "window"]), X(rarecats_controller, "values", {
        initialized: {
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default: 0
        },
        pulls: {
            type: Number,
            default: 0
        },
        horizontal: {
            type: Number,
            default: 1
        },
        vertical: {
            type: Number,
            default: 1
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        caught: {
            type: Boolean,
            default: false
        }
    });
    
    var Hn = {};
    A(Hn, {
        default: () => scroll_controller
    });
    var Ce = Pt(lo(), 1);
    var scroll_controller = class extends L {
        parallaxTargetConnected(o) {
            o.classList.add("parallax");
            let t = 10;
            "distance" in o.dataset && (t = o.dataset.distance);
            let e = window.innerHeight / 200;
            Ce.create({
                elem: o,
                from: 0,
                to: "bottom-top",
                direct: true,
                props: {
                    "--tw-translate-y": {
                        from: 0,
                        to: `-${e*t}px`
                    }
                }
            }).start()
        }
        parafadeTargetConnected(o) {
            o.classList.add("parafade"), Ce.create({
                elem: o,
                from: "top-bottom",
                to: "top-middle",
                direct: true,
                props: {
                    opacity: {
                        from: 0,
                        to: 1
                    }
                }
            }).start()
        }
        parashadowTargetConnected(o) {
            o.classList.add("parafade"), Ce.create({
                elem: o,
                from: "top-bottom",
                to: "middle-middle",
                direct: true,
                props: {
                    "--shadow-length": {
                        from: "100px",
                        to: "10px"
                    },
                    "--shadow-y": {
                        from: "100px",
                        to: "10px"
                    },
                    "--shadow-z": {
                        from: "-100px",
                        to: "-10px"
                    }
                }
            }).start()
        }
        scrollTo(o) {
            document.querySelector(o.params.element) ? document.querySelector(o.params.element).scrollIntoView({
                behavior: "smooth"
            }) : window.location.href = `${window.location.origin}${o.params.element}`
        }
    };
    X(scroll_controller, "targets", ["parallax", "parafade"]);
    
    var $n = {};
    A($n, {
        default: () => video_controller
    });
    var video_controller = class extends L {
        connect() {
            for (let o of this.element.querySelectorAll("video")) o.setAttribute("data-video-target", "video")
        }
        playVideo(o) {
            this.hasVideoTarget && this.hasPlayButtonTarget && (this.videoTarget.play(), this.videoTarget.setAttribute("controls", true), this.playButtonTarget.classList.add("hidden"), this.videoTarget.focus())
        }
        playExternalVideo(o) {
            this.hasContainerTarget && (o.preventDefault(), this.containerTarget.innerHTML = `<iframe class="w-full aspect-video" src="https://www.youtube-nocookie.com/embed/${o.params.ytid}?autoplay=1" credentialless allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin" csp="sandbox allow-scripts allow-same-origin;" frameborder="0" allow="accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; battery 'none'; browsing-topics 'none'; camera 'none'; display-capture 'none'; domain-agent 'none'; document-domain 'none'; encrypted-media 'none'; execution-while-not-rendered 'none'; execution-while-out-of-viewport ''; gamepad 'none'; geolocation 'none'; gyroscope 'none'; hid 'none'; identity-credentials-get 'none'; idle-detection 'none'; local-fonts 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; otp-credentials 'none'; payment 'none'; picture-in-picture 'none'; publickey-credentials-create 'none'; publickey-credentials-get 'none'; screen-wake-lock 'none'; serial 'none'; speaker-selection 'none'; usb 'none'; window-management 'none'; xr-spatial-tracking 'none'"></iframe>`)
        }
    };
    X(video_controller, "targets", ["container", "playButton", "video"]);
    var ks = {
            "./controllers/audio_controller.js": Rn,
            //"./controllers/chapter3_controller.js": Dn,
            //"./controllers/countdown_controller.js": _n,
            "./controllers/particles_controller.js": Gn,
            "./controllers/rarecats_controller.js": In,
            //"./controllers/romb_controller.js": Yn,
            //"./controllers/roots_controller.js": An,
            "./controllers/scroll_controller.js": Hn,
            //"./controllers/stars_controller.js": jn,
            //"./controllers/thankyou_controller.js": Pn,
            //"./controllers/therapy_controller.js": Kn,
            "./controllers/video_controller.js": $n
        };
    K.bind("[data-fancybox]", {
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"]
            }
        },
        Thumbs: {
            type: "classic"
        },
        Hash: false
    });
    window.Stimulus = ne.start();
    Stimulus.register("dialog", Ki);
    Object.entries(ks).forEach(([o, t]) => {
        if (o.includes("_controller.") || o.includes("-controller.")) {
            let e = o.replace("./controllers/", "").replace(/[_-]controller\..*$/, "").replace(/_/g, "-").replace(/\//g, "--");
            Stimulus.register(e, t.default)
        }
    });
})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
// This is just a sample script. Paste your real code (javascript or HTML) here.

var a = b ? (c % d) : e[f];