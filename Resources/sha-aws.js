var _OBJ = {
    hexcase: 0,
    b64pad: "=",
    chrsz: 8,
    hex_sha1: function(s) {
        return _OBJ.binb2hex(_OBJ.core_sha1(_OBJ.str2binb(s), s.length * _OBJ.chrsz));
    },
    b64_sha1: function(s) {
        return _OBJ.binb2b64(_OBJ.core_sha1(_OBJ.str2binb(s), s.length * _OBJ.chrsz));
    },
    str_sha1: function(s) {
        return _OBJ.binb2str(_OBJ.core_sha1(_OBJ.str2binb(s), s.length * _OBJ.chrsz));
    },
    hex_hmac_sha1: function(key, data) {
        return _OBJ.binb2hex(_OBJ.core_hmac_sha1(key, data));
    },
    b64_hmac_sha1: function(key, data) {
        return _OBJ.binb2b64(_OBJ.core_hmac_sha1(key, data));
    },
    str_hmac_sha1: function(key, data) {
        return _OBJ.binb2str(_OBJ.core_hmac_sha1(key, data));
    },
    sha1_vm_test: function() {
        return "a9993e364706816aba3e25717850c26c9cd0d89d" == _OBJ.hex_sha1("abc");
    },
    core_sha1: function(x, len) {
        x[len >> 5] |= 128 << 24 - len % 32;
        x[(len + 64 >> 9 << 4) + 15] = len;
        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
        for (var i = 0; x.length > i; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;
            for (var j = 0; 80 > j; j++) {
                w[j] = 16 > j ? x[i + j] : _OBJ.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = _OBJ.safe_add(_OBJ.safe_add(_OBJ.rol(a, 5), _OBJ.sha1_ft(j, b, c, d)), _OBJ.safe_add(_OBJ.safe_add(e, w[j]), _OBJ.sha1_kt(j)));
                e = d;
                d = c;
                c = _OBJ.rol(b, 30);
                b = a;
                a = t;
            }
            a = _OBJ.safe_add(a, olda);
            b = _OBJ.safe_add(b, oldb);
            c = _OBJ.safe_add(c, oldc);
            d = _OBJ.safe_add(d, oldd);
            e = _OBJ.safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
    },
    sha1_ft: function(t, b, c, d) {
        if (20 > t) return b & c | ~b & d;
        if (40 > t) return b ^ c ^ d;
        if (60 > t) return b & c | b & d | c & d;
        return b ^ c ^ d;
    },
    sha1_kt: function(t) {
        return 20 > t ? 1518500249 : 40 > t ? 1859775393 : 60 > t ? -1894007588 : -899497514;
    },
    core_hmac_sha1: function(key, data) {
        var bkey = _OBJ.str2binb(key);
        bkey.length > 16 && (bkey = _OBJ.core_sha1(bkey, key.length * _OBJ.chrsz));
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; 16 > i; i++) {
            ipad[i] = 909522486 ^ bkey[i];
            opad[i] = 1549556828 ^ bkey[i];
        }
        var hash = _OBJ.core_sha1(ipad.concat(_OBJ.str2binb(data)), 512 + data.length * _OBJ.chrsz);
        return _OBJ.core_sha1(opad.concat(hash), 672);
    },
    safe_add: function(x, y) {
        var lsw = (65535 & x) + (65535 & y);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return msw << 16 | 65535 & lsw;
    },
    rol: function(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
    },
    str2binb: function(str) {
        var bin = Array();
        var mask = (1 << _OBJ.chrsz) - 1;
        for (var i = 0; str.length * _OBJ.chrsz > i; i += _OBJ.chrsz) bin[i >> 5] |= (str.charCodeAt(i / _OBJ.chrsz) & mask) << 32 - _OBJ.chrsz - i % 32;
        return bin;
    },
    binb2str: function(bin) {
        var str = "";
        var mask = (1 << _OBJ.chrsz) - 1;
        for (var i = 0; 32 * bin.length > i; i += _OBJ.chrsz) str += String.fromCharCode(bin[i >> 5] >>> 32 - _OBJ.chrsz - i % 32 & mask);
        return str;
    },
    binb2hex: function(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; 4 * binarray.length > i; i++) str += hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4) + 4) + hex_tab.charAt(15 & binarray[i >> 2] >> 8 * (3 - i % 4));
        return str;
    },
    binb2b64: function(binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var str = "";
        for (var i = 0; 4 * binarray.length > i; i += 3) {
            var triplet = (255 & binarray[i >> 2] >> 8 * (3 - i % 4)) << 16 | (255 & binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) << 8 | 255 & binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4);
            for (var j = 0; 4 > j; j++) str += 8 * i + 6 * j > 32 * binarray.length ? _OBJ.b64pad : tab.charAt(63 & triplet >> 6 * (3 - j));
        }
        return str;
    }
};

exports.load = function() {
    return _OBJ;
};