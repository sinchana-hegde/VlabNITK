'use strict';
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
}
;
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
        a: !0
    }
      , b = {};
    try {
        return b.__proto__ = a,
        b.a
    } catch (c) {}
    return !1
}
;
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b)
        throw new TypeError(a + " is not extensible");
    return a
}
: null;
$jscomp.inherits = function(a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var c = $jscomp.setPrototypeOf;
        c(a, b)
    } else
        for (c in b)
            if ("prototype" != c)
                if (Object.defineProperties) {
                    var d = Object.getOwnPropertyDescriptor(b, c);
                    d && Object.defineProperty(a, c, d)
                } else
                    a[c] = b[c];
    a.superClass_ = b.prototype
}
;
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a))
            return {
                i: e,
                v: f
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.checkStringArgs = function(a, b, c) {
    if (null == a)
        throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
}
;
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}
    ;
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.Symbol = function() {
    var a = 0;
    return function(b) {
        return $jscomp.SYMBOL_PREFIX + (b || "") + a++
    }
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
}
;
$jscomp.arrayIterator = function(a) {
    var b = 0;
    return $jscomp.iteratorPrototype(function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    })
}
;
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    }
    ;
    return a
}
;
$jscomp.iteratorFromArray = function(a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var c = 0
      , d = {
        next: function() {
            if (c < a.length) {
                var e = c++;
                return {
                    value: b(e, a[e]),
                    done: !1
                }
            }
            d.next = function() {
                return {
                    done: !0,
                    value: void 0
                }
            }
            ;
            return d.next()
        }
    };
    d[Symbol.iterator] = function() {
        return d
    }
    ;
    return d
}
;
var COMPILED = !0
  , goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
    return void 0 !== a
}
;
goog.isString = function(a) {
    return "string" == typeof a
}
;
goog.isBoolean = function(a) {
    return "boolean" == typeof a
}
;
goog.isNumber = function(a) {
    return "number" == typeof a
}
;
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    a[0]in c || !c.execScript || c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift()); )
        !a.length && goog.isDef(b) ? c[d] = b : c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {}
}
;
goog.define = function(a, b) {
    if (!COMPILED) {
        var c = goog.global.CLOSURE_UNCOMPILED_DEFINES
          , d = goog.global.CLOSURE_DEFINES;
        c && void 0 === c.nodeType && Object.prototype.hasOwnProperty.call(c, a) ? b = c[a] : d && void 0 === d.nodeType && Object.prototype.hasOwnProperty.call(d, a) && (b = d[a])
    }
    goog.exportPath_(a, b)
}
;
goog.DEBUG = !1;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
    if (goog.isInModuleLoader_())
        throw Error("goog.provide can not be used within a goog.module.");
    if (!COMPILED && goog.isProvided_(a))
        throw Error('Namespace "' + a + '" already declared.');
    goog.constructNamespace_(a)
}
;
goog.constructNamespace_ = function(a, b) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[a];
        for (var c = a; (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c); )
            goog.implicitNamespaces_[c] = !0
    }
    goog.exportPath_(a, b)
}
;
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
    if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_))
        throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_())
        throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
    if (goog.moduleLoaderState_.moduleName)
        throw Error("goog.module may only be called once per module.");
    goog.moduleLoaderState_.moduleName = a;
    if (!COMPILED) {
        if (goog.isProvided_(a))
            throw Error('Namespace "' + a + '" already declared.');
        delete goog.implicitNamespaces_[a]
    }
}
;
goog.module.get = function(a) {
    return goog.module.getInternal_(a)
}
;
goog.module.getInternal_ = function(a) {
    if (!COMPILED) {
        if (a in goog.loadedModules_)
            return goog.loadedModules_[a];
        if (!goog.implicitNamespaces_[a])
            return a = goog.getObjectByName(a),
            null != a ? a : null
    }
    return null
}
;
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
}
;
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_())
        throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName)
        throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
}
;
goog.setTestOnly = function(a) {
    if (goog.DISALLOW_TEST_ONLY_CODE)
        throw a = a || "",
        Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
}
;
goog.forwardDeclare = function(a) {}
;
COMPILED || (goog.isProvided_ = function(a) {
    return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
}
,
goog.implicitNamespaces_ = {
    "goog.module": !0
});
goog.getObjectByName = function(a, b) {
    a = a.split(".");
    b = b || goog.global;
    for (var c = 0; c < a.length; c++)
        if (b = b[a[c]],
        !goog.isDefAndNotNull(b))
            return null;
    return b
}
;
goog.globalize = function(a, b) {
    b = b || goog.global;
    for (var c in a)
        b[c] = a[c]
}
;
goog.addDependency = function(a, b, c, d) {
    if (goog.DEPENDENCIES_ENABLED) {
        var e = goog.getLoader_();
        e && e.addDependency(a, b, c, d)
    }
}
;
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
    goog.global.console && goog.global.console.error(a)
}
;
goog.require = function(a) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_ && goog.getLoader_().earlyProcessLoad(a);
    if (!COMPILED) {
        if (goog.isProvided_(a)) {
            if (goog.isInModuleLoader_())
                return goog.module.getInternal_(a)
        } else if (goog.ENABLE_DEBUG_LOADER) {
            var b = goog.moduleLoaderState_;
            goog.moduleLoaderState_ = null;
            try {
                var c = goog.getLoader_();
                c ? c.load(a) : goog.logToConsole_("Could not load " + a + " because there is no debug loader.")
            } finally {
                goog.moduleLoaderState_ = b
            }
        }
        return null
    }
}
;
goog.basePath = "";
goog.nullFunction = function() {}
;
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
}
;
goog.addSingletonGetter = function(a) {
    a.instance_ = void 0;
    a.getInstance = function() {
        if (a.instance_)
            return a.instance_;
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
        return a.instance_ = new a
    }
}
;
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.DEBUG_LOADER = "";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
    if (null == goog.hasBadLetScoping) {
        try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
        } catch (b) {
            a = !1
        }
        goog.hasBadLetScoping = a
    }
    return goog.hasBadLetScoping
}
;
goog.workaroundSafari10EvalBug = function(a) {
    return "(function(){" + a + "\n;})();\n"
}
;
goog.loadModule = function(a) {
    var b = goog.moduleLoaderState_;
    try {
        goog.moduleLoaderState_ = {
            moduleName: "",
            declareLegacyNamespace: !1
        };
        if (goog.isFunction(a))
            var c = a.call(void 0, {});
        else if (goog.isString(a))
            goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)),
            c = goog.loadModuleFromSource_.call(void 0, a);
        else
            throw Error("Invalid module definition");
        var d = goog.moduleLoaderState_.moduleName;
        if (goog.isString(d) && d)
            goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c),
            goog.loadedModules_[d] = c;
        else
            throw Error('Invalid module name "' + d + '"');
    } finally {
        goog.moduleLoaderState_ = b
    }
}
;
goog.loadModuleFromSource_ = function(a) {
    eval(a);
    return {}
}
;
goog.normalizePath_ = function(a) {
    a = a.split("/");
    for (var b = 0; b < a.length; )
        "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
    return a.join("/")
}
;
goog.loadFileSync_ = function(a) {
    if (goog.global.CLOSURE_LOAD_FILE_SYNC)
        return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
    try {
        var b = new goog.global.XMLHttpRequest;
        b.open("get", a, !1);
        b.send();
        return 0 == b.status || 200 == b.status ? b.responseText : null
    } catch (c) {
        return null
    }
}
;
goog.transpile_ = function(a, b) {
    var c = goog.global.$jscomp;
    c || (goog.global.$jscomp = c = {});
    var d = c.transpile;
    if (!d) {
        var e = goog.basePath + goog.TRANSPILER
          , f = goog.loadFileSync_(e);
        if (f) {
            (function() {
                eval(f + "\n//# sourceURL=" + e)
            }
            ).call(goog.global);
            if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile)
                throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
            c = goog.global.$jscomp;
            d = c.transpile
        }
    }
    d || (d = c.transpile = function(a, b) {
        goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
        return a
    }
    );
    return d(a, b)
}
;
goog.typeOf = function(a) {
    var b = typeof a;
    if ("object" == b)
        if (a) {
            if (a instanceof Array)
                return "array";
            if (a instanceof Object)
                return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)
                return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                return "function"
        } else
            return "null";
    else if ("function" == b && "undefined" == typeof a.call)
        return "object";
    return b
}
;
goog.isNull = function(a) {
    return null === a
}
;
goog.isDefAndNotNull = function(a) {
    return null != a
}
;
goog.isArray = function(a) {
    return "array" == goog.typeOf(a)
}
;
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return "array" == b || "object" == b && "number" == typeof a.length
}
;
goog.isDateLike = function(a) {
    return goog.isObject(a) && "function" == typeof a.getFullYear
}
;
goog.isFunction = function(a) {
    return "function" == goog.typeOf(a)
}
;
goog.isObject = function(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b
}
;
goog.getUid = function(a) {
    return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
}
;
goog.hasUid = function(a) {
    return !!a[goog.UID_PROPERTY_]
}
;
goog.removeUid = function(a) {
    null !== a && "removeAttribute"in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
}
;
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (a.clone)
            return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a)
            b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
}
;
goog.bindNative_ = function(a, b, c) {
    return a.call.apply(a.bind, arguments)
}
;
goog.bindJs_ = function(a, b, c) {
    if (!a)
        throw Error();
    if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
        }
    }
    return function() {
        return a.apply(b, arguments)
    }
}
;
goog.bind = function(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments)
}
;
goog.partial = function(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b)
    }
}
;
goog.mixin = function(a, b) {
    for (var c in b)
        a[c] = b[c]
}
;
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return +new Date
}
;
goog.globalEval = function(a) {
    if (goog.global.execScript)
        goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (null == goog.evalWorksForGlobals_) {
            try {
                goog.global.eval("var _evalTest_ = 1;")
            } catch (d) {}
            if ("undefined" != typeof goog.global._evalTest_) {
                try {
                    delete goog.global._evalTest_
                } catch (d) {}
                goog.evalWorksForGlobals_ = !0
            } else
                goog.evalWorksForGlobals_ = !1
        }
        if (goog.evalWorksForGlobals_)
            goog.global.eval(a);
        else {
            var b = goog.global.document
              , c = b.createElement("SCRIPT");
            c.type = "text/javascript";
            c.defer = !1;
            c.appendChild(b.createTextNode(a));
            b.head.appendChild(c);
            b.head.removeChild(c)
        }
    } else
        throw Error("goog.globalEval not available");
}
;
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
    if ("." == String(a).charAt(0))
        throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
    var c = function(a) {
        return goog.cssNameMapping_[a] || a
    }
      , d = function(a) {
        a = a.split("-");
        for (var b = [], d = 0; d < a.length; d++)
            b.push(c(a[d]));
        return b.join("-")
    };
    d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
        return a
    }
    ;
    a = b ? a + "-" + d(b) : d(a);
    return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a
}
;
goog.setCssNameMapping = function(a, b) {
    goog.cssNameMapping_ = a;
    goog.cssNameMappingStyle_ = b
}
;
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
    b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
        return null != b && d in b ? b[d] : a
    }));
    return a
}
;
goog.getMsgWithFallback = function(a, b) {
    return a
}
;
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
}
;
goog.exportProperty = function(a, b, c) {
    a[b] = c
}
;
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a;
    a.base = function(a, c, f) {
        for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
            d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d)
    }
}
;
goog.base = function(a, b, c) {
    var d = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d)
        throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (d.superClass_) {
        for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++)
            e[f - 1] = arguments[f];
        return d.superClass_.constructor.apply(a, e)
    }
    e = Array(arguments.length - 2);
    for (f = 2; f < arguments.length; f++)
        e[f - 2] = arguments[f];
    f = !1;
    for (var g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)
        if (g.prototype[b] === d)
            f = !0;
        else if (f)
            return g.prototype[b].apply(a, e);
    if (a[b] === d)
        return a.constructor.prototype[b].apply(a, e);
    throw Error("goog.base called from a method of one name to a method of a different name");
}
;
goog.scope = function(a) {
    if (goog.isInModuleLoader_())
        throw Error("goog.scope is not supported within a goog.module.");
    a.call(goog.global)
}
;
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
    var c = b.constructor
      , d = b.statics;
    c && c != Object.prototype.constructor || (c = function() {
        throw Error("cannot instantiate an interface (no constructor defined).");
    }
    );
    c = goog.defineClass.createSealingConstructor_(c, a);
    a && goog.inherits(c, a);
    delete b.constructor;
    delete b.statics;
    goog.defineClass.applyProperties_(c.prototype, b);
    null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
    return c
}
;
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
    if (!goog.defineClass.SEAL_CLASS_INSTANCES)
        return a;
    var c = !goog.defineClass.isUnsealable_(b)
      , d = function() {
        var b = a.apply(this, arguments) || this;
        b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
        this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
        return b
    };
    return d
}
;
goog.defineClass.isUnsealable_ = function(a) {
    return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
}
;
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
    for (var c in b)
        Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++)
        c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],
        Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
}
;
goog.tagUnsealableClass = function(a) {
    !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
}
;
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return null != a && "write"in a
}
,
goog.findBasePath_ = function() {
    if (goog.isDef(goog.global.CLOSURE_BASE_PATH) && goog.isString(goog.global.CLOSURE_BASE_PATH))
        goog.basePath = goog.global.CLOSURE_BASE_PATH;
    else if (goog.inHtmlDocument_()) {
        var a = goog.global.document
          , b = a.currentScript;
        a = b ? [b] : a.getElementsByTagName("SCRIPT");
        for (b = a.length - 1; 0 <= b; --b) {
            var c = a[b].src
              , d = c.lastIndexOf("?");
            d = -1 == d ? c.length : d;
            if ("base.js" == c.substr(d - 7, 7)) {
                goog.basePath = c.substr(0, d - 7);
                break
            }
        }
    }
}
,
goog.findBasePath_(),
goog.Transpiler = function() {
    this.requiresTranspilation_ = null
}
,
goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
    function a(a, b) {
        d ? c[a] = !0 : b() ? c[a] = !1 : d = c[a] = !0
    }
    function b(a) {
        try {
            return !!eval(a)
        } catch (g) {
            return !1
        }
    }
    var c = {
        es3: !1
    }
      , d = !1
      , e = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
    a("es5", function() {
        return b("[1,].length==1")
    });
    a("es6", function() {
        var a = e.match(/Edge\/(\d+)(\.\d)*/i);
        return a && 15 > Number(a[1]) ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')
    });
    a("es6-impl", function() {
        return !0
    });
    a("es7", function() {
        return b("2 ** 2 == 4")
    });
    a("es8", function() {
        return b("async () => 1, true")
    });
    return c
}
,
goog.Transpiler.prototype.needsTranspile = function(a) {
    if ("always" == goog.TRANSPILE)
        return !0;
    if ("never" == goog.TRANSPILE)
        return !1;
    this.requiresTranspilation_ || (this.requiresTranspilation_ = this.createRequiresTranspilation_());
    if (a in this.requiresTranspilation_)
        return this.requiresTranspilation_[a];
    throw Error("Unknown language mode: " + a);
}
,
goog.Transpiler.prototype.transpile = function(a, b) {
    return goog.transpile_(a, b)
}
,
goog.transpiler_ = new goog.Transpiler,
goog.DebugLoader = function() {
    this.dependencies_ = {
        loadFlags: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {},
        deferred: {}
    };
    this.oldIeWaiting_ = !1;
    this.queuedModules_ = [];
    this.lastNonModuleScriptIndex_ = 0
}
,
goog.DebugLoader.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all),
goog.DebugLoader.prototype.earlyProcessLoad = function(a) {
    goog.DebugLoader.IS_OLD_IE_ && this.maybeProcessDeferredDep_(a)
}
,
goog.DebugLoader.prototype.load = function(a) {
    var b = this.getPathFromDeps_(a);
    if (b) {
        var c = []
          , d = {}
          , e = this.dependencies_
          , f = this
          , g = function(a) {
            if (!(a in e.written || a in e.visited)) {
                e.visited[a] = !0;
                if (a in e.requires)
                    for (var b in e.requires[a])
                        if (!f.isProvided(b))
                            if (b in e.nameToPath)
                                g(e.nameToPath[b]);
                            else
                                throw Error("Undefined nameToPath for " + b);
                a in d || (d[a] = !0,
                c.push(a))
            }
        };
        g(b);
        for (a = 0; a < c.length; a++)
            b = c[a],
            this.dependencies_.written[b] = !0;
        for (a = 0; a < c.length; a++)
            if (b = c[a]) {
                var h = e.loadFlags[b] || {}
                  , k = h.lang || "es3";
                k = this.getTranspiler().needsTranspile(k);
                "goog" == h.module || k ? this.importProcessedScript_(goog.basePath + b, "goog" == h.module, k) : this.importScript_(goog.basePath + b)
            } else
                throw Error("Undefined script input");
    } else
        throw a = "goog.require could not find: " + a,
        this.logToConsole(a),
        Error(a);
}
,
goog.DebugLoader.prototype.addDependency = function(a, b, c, d) {
    var e;
    a = a.replace(/\\/g, "/");
    var f = this.dependencies_;
    d && "boolean" !== typeof d || (d = d ? {
        module: "goog"
    } : {});
    for (var g = 0; e = b[g]; g++)
        f.nameToPath[e] = a,
        f.loadFlags[a] = d;
    for (d = 0; b = c[d]; d++)
        a in f.requires || (f.requires[a] = {}),
        f.requires[a][b] = !0
}
,
goog.DebugLoader.prototype.importScript_ = function(a, b) {
    (goog.global.CLOSURE_IMPORT_SCRIPT || goog.bind(this.writeScriptTag_, this))(a, b) && (this.dependencies_.written[a] = !0)
}
,
goog.DebugLoader.prototype.importProcessedScript_ = function(a, b, c) {
    this.importScript_("", 'goog.debugLoader_.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");")
}
,
goog.DebugLoader.prototype.retrieveAndExec_ = function(a, b, c) {
    if (!COMPILED) {
        var d = a;
        a = this.normalizePath(a);
        var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.bind(this.writeScriptTag_, this)
          , f = this.loadFileSync(a);
        if (null == f)
            throw Error('Load of "' + a + '" failed');
        c && (f = this.getTranspiler().transpile(f, a));
        f = b ? this.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
        goog.DebugLoader.IS_OLD_IE_ && this.oldIeWaiting_ ? (this.dependencies_.deferred[d] = f,
        this.queuedModules_.push(d)) : e(a, f)
    }
}
,
goog.DebugLoader.prototype.wrapModule_ = function(a, b) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n"
}
,
goog.DebugLoader.prototype.loadQueuedModules_ = function() {
    var a = this.queuedModules_.length;
    if (0 < a) {
        var b = this.queuedModules_;
        this.queuedModules_ = [];
        for (var c = 0; c < a; c++)
            this.maybeProcessDeferredPath_(b[c])
    }
    this.oldIeWaiting_ = !1
}
,
goog.DebugLoader.prototype.maybeProcessDeferredDep_ = function(a) {
    this.isDeferredModule_(a) && this.allDepsAreAvailable_(a) && (a = this.getPathFromDeps_(a),
    this.maybeProcessDeferredPath_(goog.basePath + a))
}
,
goog.DebugLoader.prototype.isDeferredModule_ = function(a) {
    var b = (a = this.getPathFromDeps_(a)) && this.dependencies_.loadFlags[a] || {}
      , c = b.lang || "es3";
    return a && ("goog" == b.module || this.getTranspiler().needsTranspile(c)) ? goog.basePath + a in this.dependencies_.deferred : !1
}
,
goog.DebugLoader.prototype.allDepsAreAvailable_ = function(a) {
    if ((a = this.getPathFromDeps_(a)) && a in this.dependencies_.requires)
        for (var b in this.dependencies_.requires[a])
            if (!this.isProvided(b) && !this.isDeferredModule_(b))
                return !1;
    return !0
}
,
goog.DebugLoader.prototype.maybeProcessDeferredPath_ = function(a) {
    if (a in this.dependencies_.deferred) {
        var b = this.dependencies_.deferred[a];
        delete this.dependencies_.deferred[a];
        goog.globalEval(b)
    }
}
,
goog.DebugLoader.prototype.writeScriptSrcNode_ = function(a) {
    goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
}
,
goog.DebugLoader.prototype.appendScriptSrcNode_ = function(a) {
    var b = goog.global.document
      , c = b.createElement("script");
    c.type = "text/javascript";
    c.src = a;
    c.defer = !1;
    c.async = !1;
    b.head.appendChild(c)
}
,
goog.DebugLoader.prototype.writeScriptTag_ = function(a, b) {
    if (this.inHtmlDocument()) {
        var c = goog.global.document;
        if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
            if (/\bdeps.js$/.test(a))
                return !1;
            throw Error('Cannot write "' + a + '" after document load');
        }
        void 0 === b ? goog.DebugLoader.IS_OLD_IE_ ? (this.oldIeWaiting_ = !0,
        b = " onreadystatechange='goog.debugLoader_.onScriptLoad_(this, " + ++this.lastNonModuleScriptIndex_ + ")' ",
        c.write('<script type="text/javascript" src="' + a + '"' + b + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? this.appendScriptSrcNode_(a) : this.writeScriptSrcNode_(a) : c.write('<script type="text/javascript">' + this.protectScriptTag_(b) + "\x3c/script>");
        return !0
    }
    return !1
}
,
goog.DebugLoader.prototype.protectScriptTag_ = function(a) {
    return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1")
}
,
goog.DebugLoader.prototype.onScriptLoad_ = function(a, b) {
    "complete" == a.readyState && this.lastNonModuleScriptIndex_ == b && this.loadQueuedModules_();
    return !0
}
,
goog.DebugLoader.prototype.getPathFromDeps_ = function(a) {
    return a in this.dependencies_.nameToPath ? this.dependencies_.nameToPath[a] : null
}
,
goog.DebugLoader.prototype.getTranspiler = function() {
    return goog.transpiler_
}
,
goog.DebugLoader.prototype.isProvided = function(a) {
    return goog.isProvided_(a)
}
,
goog.DebugLoader.prototype.inHtmlDocument = function() {
    return goog.inHtmlDocument_()
}
,
goog.DebugLoader.prototype.logToConsole = function(a) {
    goog.logToConsole_(a)
}
,
goog.DebugLoader.prototype.loadFileSync = function(a) {
    return goog.loadFileSync_(a)
}
,
goog.DebugLoader.prototype.normalizePath = function(a) {
    return goog.normalizePath_(a)
}
,
goog.debugLoader_ = null,
goog.registerDebugLoader = function(a) {
    if (goog.debugLoader_)
        throw Error("Debug loader already registered!");
    if (!(a instanceof goog.DebugLoader))
        throw Error("Not a goog.DebugLoader.");
    goog.debugLoader_ = a
}
,
goog.getLoader_ = function() {
    if (!goog.debugLoader_ && goog.DEBUG_LOADER)
        throw Error("Loaded debug loader file but no loader was registered!");
    goog.debugLoader_ || (goog.debugLoader_ = new goog.DebugLoader);
    return goog.debugLoader_
}
,
function() {
    if (goog.DEBUG_LOADER) {
        var a = new goog.DebugLoader;
        a.importScript_(goog.basePath + goog.DEBUG_LOADER)
    }
    goog.global.CLOSURE_NO_DEPS || (a = a || new goog.DebugLoader,
    goog.DEBUG_LOADER || goog.registerDebugLoader(a),
    a.importScript_(goog.basePath + "deps.js"))
}());
goog.debug = {};
goog.debug.Error = function(a) {
    if (Error.captureStackTrace)
        Error.captureStackTrace(this, goog.debug.Error);
    else {
        var b = Error().stack;
        b && (this.stack = b)
    }
    a && (this.message = String(a));
    this.reportErrorToServer = !0
}
;
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    goog.debug.Error.call(this, goog.asserts.subs_(a, b));
    this.messagePattern = a
}
;
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
    throw a;
}
;
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_ = function(a, b) {
    a = a.split("%s");
    for (var c = "", d = a.length - 1, e = 0; e < d; e++)
        c += a[e] + (e < b.length ? b[e] : "%s");
    return c + a[d]
}
;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        e += ": " + c;
        var f = d
    } else
        a && (e += ": " + a,
        f = b);
    a = new goog.asserts.AssertionError("" + e,f || []);
    goog.asserts.errorHandler_(a)
}
;
goog.asserts.setErrorHandler = function(a) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
}
;
goog.asserts.assert = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.fail = function(a, b) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1)))
}
;
goog.asserts.assertNumber = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertString = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertFunction = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertObject = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertArray = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertBoolean = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertElement = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertInstanceof = function(a, b, c, d) {
    !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
    return a
}
;
goog.asserts.assertFinite = function(a, b, c) {
    !goog.asserts.ENABLE_ASSERTS || "number" == typeof a && isFinite(a) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
}
;
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var a in Object.prototype)
        goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
}
;
goog.asserts.getType_ = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
}
;
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
    return a[a.length - 1]
}
;
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.indexOf.call(a, b, c)
}
: function(a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (goog.isString(a))
        return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
    for (; c < a.length; c++)
        if (c in a && a[c] === b)
            return c;
    return -1
}
;
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
}
: function(a, b, c) {
    c = null == c ? a.length - 1 : c;
    0 > c && (c = Math.max(0, a.length + c));
    if (goog.isString(a))
        return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
    for (; 0 <= c; c--)
        if (c in a && a[c] === b)
            return c;
    return -1
}
;
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    Array.prototype.forEach.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a)
}
;
goog.array.forEachRight = function(a, b, c) {
    var d = a.length
      , e = goog.isString(a) ? a.split("") : a;
    for (--d; 0 <= d; --d)
        d in e && b.call(c, e[d], d, a)
}
;
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.filter.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var k = g[h];
            b.call(c, k, h, a) && (e[f++] = k)
        }
    return e
}
;
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.map.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++)
        g in f && (e[g] = b.call(c, f[g], g, a));
    return e
}
;
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduce.call(a, b, c)
}
: function(a, b, c, d) {
    var e = c;
    goog.array.forEach(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
}
;
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    goog.asserts.assert(null != b);
    d && (b = goog.bind(b, d));
    return Array.prototype.reduceRight.call(a, b, c)
}
: function(a, b, c, d) {
    var e = c;
    goog.array.forEachRight(a, function(c, g) {
        e = b.call(d, e, c, g, a)
    });
    return e
}
;
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.some.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return !0;
    return !1
}
;
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.every.call(a, b, c)
}
: function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && !b.call(c, e[f], f, a))
            return !1;
    return !0
}
;
goog.array.count = function(a, b, c) {
    var d = 0;
    goog.array.forEach(a, function(a, f, g) {
        b.call(c, a, f, g) && ++d
    }, c);
    return d
}
;
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
}
;
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return f;
    return -1
}
;
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
}
;
goog.array.findIndexRight = function(a, b, c) {
    var d = a.length
      , e = goog.isString(a) ? a.split("") : a;
    for (--d; 0 <= d; d--)
        if (d in e && b.call(c, e[d], d, a))
            return d;
    return -1
}
;
goog.array.contains = function(a, b) {
    return 0 <= goog.array.indexOf(a, b)
}
;
goog.array.isEmpty = function(a) {
    return 0 == a.length
}
;
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length - 1; 0 <= b; b--)
            delete a[b];
    a.length = 0
}
;
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
}
;
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
}
;
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
}
;
goog.array.insertBefore = function(a, b, c) {
    var d;
    2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
}
;
goog.array.remove = function(a, b) {
    b = goog.array.indexOf(a, b);
    var c;
    (c = 0 <= b) && goog.array.removeAt(a, b);
    return c
}
;
goog.array.removeLast = function(a, b) {
    b = goog.array.lastIndexOf(a, b);
    return 0 <= b ? (goog.array.removeAt(a, b),
    !0) : !1
}
;
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(null != a.length);
    return 1 == Array.prototype.splice.call(a, b, 1).length
}
;
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return 0 <= b ? (goog.array.removeAt(a, b),
    !0) : !1
}
;
goog.array.removeAllIf = function(a, b, c) {
    var d = 0;
    goog.array.forEachRight(a, function(e, f) {
        b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
    });
    return d
}
;
goog.array.concat = function(a) {
    return Array.prototype.concat.apply([], arguments)
}
;
goog.array.join = function(a) {
    return Array.prototype.concat.apply([], arguments)
}
;
goog.array.toArray = function(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        return c
    }
    return []
}
;
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
    for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArrayLike(d)) {
            var e = a.length || 0
              , f = d.length || 0;
            a.length = e + f;
            for (var g = 0; g < f; g++)
                a[e + g] = d[g]
        } else
            a.push(d)
    }
}
;
goog.array.splice = function(a, b, c, d) {
    goog.asserts.assert(null != a.length);
    return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
}
;
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(null != a.length);
    return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
}
;
goog.array.removeDuplicates = function(a, b, c) {
    b = b || a;
    var d = function(a) {
        return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
    };
    c = c || d;
    d = {};
    for (var e = 0, f = 0; f < a.length; ) {
        var g = a[f++]
          , h = c(g);
        Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0,
        b[e++] = g)
    }
    b.length = e
}
;
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
}
;
goog.array.binarySelect = function(a, b, c) {
    return goog.array.binarySearch_(a, b, !0, void 0, c)
}
;
goog.array.binarySearch_ = function(a, b, c, d, e) {
    for (var f = 0, g = a.length, h; f < g; ) {
        var k = f + g >> 1;
        var l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
        0 < l ? f = k + 1 : (g = k,
        h = !l)
    }
    return h ? f : ~f
}
;
goog.array.sort = function(a, b) {
    a.sort(b || goog.array.defaultCompare)
}
;
goog.array.stableSort = function(a, b) {
    for (var c = Array(a.length), d = 0; d < a.length; d++)
        c[d] = {
            index: d,
            value: a[d]
        };
    var e = b || goog.array.defaultCompare;
    goog.array.sort(c, function(a, b) {
        return e(a.value, b.value) || a.index - b.index
    });
    for (d = 0; d < a.length; d++)
        a[d] = c[d].value
}
;
goog.array.sortByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(a, c) {
        return d(b(a), b(c))
    })
}
;
goog.array.sortObjectsByKey = function(a, b, c) {
    goog.array.sortByKey(a, function(a) {
        return a[b]
    }, c)
}
;
goog.array.isSorted = function(a, b, c) {
    b = b || goog.array.defaultCompare;
    for (var d = 1; d < a.length; d++) {
        var e = b(a[d - 1], a[d]);
        if (0 < e || 0 == e && c)
            return !1
    }
    return !0
}
;
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length)
        return !1;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e]))
            return !1;
    return !0
}
;
goog.array.compare3 = function(a, b, c) {
    c = c || goog.array.defaultCompare;
    for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
        var f = c(a[e], b[e]);
        if (0 != f)
            return f
    }
    return goog.array.defaultCompare(a.length, b.length)
}
;
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b ? -1 : 0
}
;
goog.array.inverseDefaultCompare = function(a, b) {
    return -goog.array.defaultCompare(a, b)
}
;
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
}
;
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)),
    !0) : !1
}
;
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return 0 <= b ? goog.array.removeAt(a, b) : !1
}
;
goog.array.bucket = function(a, b, c) {
    for (var d = {}, e = 0; e < a.length; e++) {
        var f = a[e]
          , g = b.call(c, f, e, a);
        goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
    }
    return d
}
;
goog.array.toObject = function(a, b, c) {
    var d = {};
    goog.array.forEach(a, function(e, f) {
        d[b.call(c, e, f, a)] = e
    });
    return d
}
;
goog.array.range = function(a, b, c) {
    var d = []
      , e = 0
      , f = a;
    c = c || 1;
    void 0 !== b && (e = a,
    f = b);
    if (0 > c * (f - e))
        return [];
    if (0 < c)
        for (a = e; a < f; a += c)
            d.push(a);
    else
        for (a = e; a > f; a += c)
            d.push(a);
    return d
}
;
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++)
        c[d] = a;
    return c
}
;
goog.array.flatten = function(a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
        var d = arguments[c];
        if (goog.isArray(d))
            for (var e = 0; e < d.length; e += 8192) {
                var f = goog.array.slice(d, e, e + 8192);
                f = goog.array.flatten.apply(null, f);
                for (var g = 0; g < f.length; g++)
                    b.push(f[g])
            }
        else
            b.push(d)
    }
    return b
}
;
goog.array.rotate = function(a, b) {
    goog.asserts.assert(null != a.length);
    a.length && (b %= a.length,
    0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
    return a
}
;
goog.array.moveItem = function(a, b, c) {
    goog.asserts.assert(0 <= b && b < a.length);
    goog.asserts.assert(0 <= c && c < a.length);
    b = Array.prototype.splice.call(a, b, 1);
    Array.prototype.splice.call(a, c, 0, b[0])
}
;
goog.array.zip = function(a) {
    if (!arguments.length)
        return [];
    for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++)
        arguments[d].length < c && (c = arguments[d].length);
    for (d = 0; d < c; d++) {
        for (var e = [], f = 0; f < arguments.length; f++)
            e.push(arguments[f][d]);
        b.push(e)
    }
    return b
}
;
goog.array.shuffle = function(a, b) {
    b = b || Math.random;
    for (var c = a.length - 1; 0 < c; c--) {
        var d = Math.floor(b() * (c + 1))
          , e = a[c];
        a[c] = a[d];
        a[d] = e
    }
}
;
goog.array.copyByIndex = function(a, b) {
    var c = [];
    goog.array.forEach(b, function(b) {
        c.push(a[b])
    });
    return c
}
;
goog.array.concatMap = function(a, b, c) {
    return goog.array.concat.apply([], goog.array.map(a, b, c))
}
;
var mpl$lab$util$Printable = function() {};
mpl$lab$util$Printable.prototype.toStringShort = function() {}
;
var mpl$lab$util$Subject = function(a) {};
mpl$lab$util$Subject.prototype.addObserver = function(a) {}
;
mpl$lab$util$Subject.prototype.broadcast = function(a) {}
;
mpl$lab$util$Subject.prototype.broadcastParameter = function(a) {}
;
mpl$lab$util$Subject.prototype.getName = function() {}
;
mpl$lab$util$Subject.prototype.getObservers = function() {}
;
mpl$lab$util$Subject.prototype.getParameter = function(a) {}
;
mpl$lab$util$Subject.prototype.getParameters = function() {}
;
mpl$lab$util$Subject.prototype.getParameterBoolean = function(a) {}
;
mpl$lab$util$Subject.prototype.getParameterNumber = function(a) {}
;
mpl$lab$util$Subject.prototype.getParameterString = function(a) {}
;
mpl$lab$util$Subject.prototype.removeObserver = function(a) {}
;
var mpl$lab$util$Observer = function(a) {};
mpl$lab$util$Observer.prototype.observe = function(a) {}
;
var mpl$lab$util$Util = function() {
    throw Error();
};
mpl$lab$util$Util.array2string = function(a, b, c) {
    b = b || mpl$lab$util$Util.NF7E;
    goog.isDef(c) || (c = ", ");
    for (var d = a.length, e = "", f = 0; f < d; f++)
        e += (0 < f ? c : "") + b(a[f]);
    return e
}
;
mpl$lab$util$Util.arrayBool2string = function(a, b, c) {
    b = b || "true";
    c = c || "false";
    for (var d = a.length, e = "", f = 0; f < d; f++)
        e += a[f] ? b : c,
        f < d - 1 && (e += ", ");
    return e
}
;
mpl$lab$util$Util.colorString3 = function(a, b, c) {
    var d = "#";
    a = [a, b, c];
    for (b = 0; 3 > b; b++)
        d += mpl$lab$util$Util.numToHexChar1(a[b]);
    goog.asserts.assert(4 == d.length);
    return d
}
;
mpl$lab$util$Util.colorString6 = function(a, b, c) {
    var d = "#";
    a = [a, b, c];
    for (b = 0; 3 > b; b++)
        d += mpl$lab$util$Util.numToHexChar2(a[b]);
    goog.asserts.assert(7 == d.length);
    return d
}
;
mpl$lab$util$Util.createImage = function(a, b, c) {
    var d = document.createElement("img");
    d.src = a;
    d.width = b;
    d.height = goog.isDef(c) ? c : b;
    return d
}
;
mpl$lab$util$Util.drop = function(a, b) {
    return 0 <= b ? a.slice(b) : a.slice(0, a.length + b)
}
;
mpl$lab$util$Util.get = function(a, b) {
    if (!goog.isNumber(b) || 0 > b || b != Math.floor(b))
        throw Error("index is not a non-negative integer: " + b);
    return a[b]
}
;
mpl$lab$util$Util.hypot = function(a, b) {
    return Math.sqrt(a * a + b * b)
}
;
mpl$lab$util$Util.isChrome = function() {
    var a = navigator;
    return null != a ? null != a.userAgent.match(/.*Chrome.*/) : !1
}
;
mpl$lab$util$Util.isIPhone = function() {
    var a = navigator;
    return null != a ? "iPhone" == a.platform : !1
}
;
mpl$lab$util$Util.limitAngle = function(a) {
    if (a > Math.PI) {
        var b = Math.floor((a - -Math.PI) / (2 * Math.PI));
        return a - 2 * Math.PI * b
    }
    return a < -Math.PI ? (b = Math.floor(-(a - Math.PI) / (2 * Math.PI)),
    a + 2 * Math.PI * b) : a
}
;
mpl$lab$util$Util.methodsOf = function(a) {
    var b = [], c;
    for (c in a)
        goog.isFunction(a[c]) && b.push(c);
    goog.array.sort(b);
    return b
}
;
mpl$lab$util$Util.nameOf = function(a, b) {
    for (var c in a)
        if (a[c] === b)
            return c;
    return ""
}
;
mpl$lab$util$Util.newBooleanArray = function(a) {
    for (var b = Array(a), c = 0; c < a; c++)
        b[c] = !1;
    return b
}
;
mpl$lab$util$Util.newNumberArray = function(a) {
    for (var b = Array(a), c = 0; c < a; c++)
        b[c] = 0;
    return b
}
;
mpl$lab$util$Util.NF0 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(0) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF18 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(18) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF1S = function(a) {
    return goog.isDefAndNotNull(a) ? (0 < a ? "+" : "") + a.toFixed(1) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF2 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(2) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF3 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(3) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF5 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(5) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF5E = function(a) {
    return goog.isDefAndNotNull(a) ? 2E-4 < Math.abs(a) || 0 == a ? a.toFixed(5) : a.toExponential(5) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.nf5 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(5).replace(/\.?0+$/, "") : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF7 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(7) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF7E = function(a) {
    return goog.isDefAndNotNull(a) ? 2E-6 < Math.abs(a) ? a.toFixed(7) : a.toExponential(7) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.nf7 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(7).replace(/\.?0+$/, "") : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NF9 = function(a) {
    return goog.isDefAndNotNull(a) ? a.toFixed(9) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NFE = function(a) {
    return goog.isDefAndNotNull(a) ? a.toExponential(7) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.NFSCI = function(a) {
    return goog.isDefAndNotNull(a) ? a.toExponential(17) : null === a ? "null" : "undefined"
}
;
mpl$lab$util$Util.numToHexChar1 = function(a) {
    a = Math.floor(.5 + 16 * a);
    return 15 <= a ? "f" : 0 >= a ? "0" : mpl$lab$util$Util.HEX_DIGITS.charAt(a)
}
;
mpl$lab$util$Util.numToHexChar2 = function(a) {
    a = Math.floor(.5 + 256 * a);
    if (255 <= a)
        return "ff";
    if (0 >= a)
        return "00";
    var b = a % 16;
    return mpl$lab$util$Util.HEX_DIGITS.charAt(Math.floor(a / 16)) + mpl$lab$util$Util.HEX_DIGITS.charAt(b)
}
;
mpl$lab$util$Util.prettyPrint = function(a, b, c) {
    goog.isNumber(b) || (b = 2);
    goog.isString(c) || (c = "  ");
    var d = String(a)
      , e = ""
      , f = 0
      , g = d.length
      , h = !1
      , k = []
      , l = ""
      , m = 0;
    a: for (; m < g; m++) {
        var n = d.charAt(m);
        if (h)
            if (" " == n)
                continue;
            else
                h = !1;
        if ("{" == n || "[" == n) {
            f++;
            if (f <= b) {
                e += n + "\n";
                for (var p = 0; p < f; p++)
                    e += c;
                h = !0
            } else
                e += n;
            k.push(l);
            l = "{" == n ? "}" : "]"
        } else if (n == l) {
            if (f <= b)
                for (f--,
                e += "\n",
                p = 0; p < f; p++)
                    e += c;
            else
                f--;
            e += n;
            l = k.pop();
            if (0 > f)
                throw Error("unbalanced " + l + " at " + m + " in " + a);
        } else {
            if ('"' == n || "'" == n) {
                p = n;
                var q = m;
                for (e += n; ++m < g; )
                    if (n = d.charAt(m),
                    e += n,
                    n == p)
                        continue a;
                throw Error("unbalanced quote at " + q + " in " + a);
            }
            if (("," == n || ";" == n) && f <= b) {
                e += n + "\n";
                for (p = 0; p < f; p++)
                    e += c;
                h = !0
            } else
                e += n
        }
    }
    return e = e.replace(/^\s+\n/gm, "")
}
;
mpl$lab$util$Util.printArray = function(a, b, c) {
    if (mpl$lab$util$Util.DEBUG) {
        b = b || 80;
        c = c || mpl$lab$util$Util.NF5E;
        for (var d = "", e = 0, f = a.length; e < f; e++) {
            var g = c(a[e]);
            d.length + g.length > b ? (console.log(d),
            d = "  " + g) : d += " " + g
        }
        0 < d.length && console.log(d)
    }
}
;
mpl$lab$util$Util.println = function(a) {
    console.log(a)
}
;
mpl$lab$util$Util.printNums5 = function(a, b) {
    for (var c = 1; c < arguments.length; c++)
        a += " " + mpl$lab$util$Util.NF5(arguments[c]);
    console.log(a)
}
;
mpl$lab$util$Util.propertiesOf = function(a, b) {
    if (null === a)
        return ["null"];
    b = b || !1;
    var c = [], d;
    for (d in a)
        goog.isFunction(a[d]) || (b ? c.push(d + ": " + a[d]) : c.push(d));
    goog.array.sort(c);
    return c
}
;
mpl$lab$util$Util.set = function(a, b, c) {
    if (!goog.isNumber(b) || 0 > b || b != Math.floor(b))
        throw Error("index is not a non-negative integer: " + b);
    return a[b] = c
}
;
mpl$lab$util$Util.setErrorHandler = function() {
    window.onerror = function(a, c, d) {
        a = a + "\n" + c + ":" + d;
        mpl$lab$util$Util.DEBUG && console.log(a);
        mpl$lab$util$Util.numErrors++ < mpl$lab$util$Util.maxErrors && alert(a)
    }
    ;
    if (goog.DEBUG && !mpl$lab$util$Util.ADVANCED) {
        try {
            var a = 1;
            goog.asserts.assert(!1);
            a = 2
        } catch (b) {
            console.log("asserts are working")
        }
        if (2 == a)
            throw Error("asserts are not working");
    } else
        mpl$lab$util$Util.DEBUG && console.log("WARNING: asserts are NOT enabled!")
}
;
mpl$lab$util$Util.setImagesDir = function(a) {
    void 0 !== a && (mpl$lab$util$Util.IMAGES_DIR = a)
}
;
mpl$lab$util$Util.systemTime = function() {
    return mpl$lab$util$Util.MODERN_CLOCK && !mpl$lab$util$Util.MOCK_CLOCK ? .001 * performance.now() : .001 * goog.now()
}
;
mpl$lab$util$Util.take = function(a, b) {
    return 0 == b ? "" : 0 < b ? a.slice(0, b) : a.slice(a.length + b, a.length)
}
;
mpl$lab$util$Util.testFinite = function(a) {
    if (!isFinite(a))
        throw Error("not a finite number " + a);
    return a
}
;
mpl$lab$util$Util.testNumber = function(a) {
    if (isNaN(a))
        throw Error("not a number " + a);
    return a
}
;
mpl$lab$util$Util.toName = function(a) {
    return a.toUpperCase().replace(/[ -]/g, "_")
}
;
mpl$lab$util$Util.uniqueElements = function(a) {
    var b = a.length;
    if (1 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        goog.array.sort(c);
        a = c[0];
        for (d = 1; d < b; d++) {
            if (a == c[d])
                return !1;
            a = c[d]
        }
    }
    return !0
}
;
mpl$lab$util$Util.validName = function(a) {
    if (!a.match(/^[A-Z_][A-Z_0-9]*$/))
        throw Error("not a valid name: " + a);
    return a
}
;
mpl$lab$util$Util.veryDifferent = function(a, b, c, d) {
    c = c || 1E-14;
    if (0 >= c)
        throw Error("epsilon must be positive " + c);
    d = d || 1;
    if (0 >= d)
        throw Error("magnitude must be positive " + d);
    var e = Math.max(Math.abs(a), Math.abs(b));
    return Math.abs(a - b) > (e > d ? e : d) * c
}
;
mpl$lab$util$Util.zeroArray = function(a) {
    for (var b = a.length, c = 0; c < b; c++)
        a[c] = 0
}
;
mpl$lab$util$Util.ADVANCED = !1;
mpl$lab$util$Util.COMPILE_TIME = "2019-05-12 11:34:50";
mpl$lab$util$Util.DEBUG = !1;
mpl$lab$util$Util.HEX_DIGITS = "0123456789abcdef";
mpl$lab$util$Util.IMAGES_DIR = ".";
mpl$lab$util$Util.maxErrors = 3;
mpl$lab$util$Util.MAX_INTEGER = Math.pow(2, 53);
mpl$lab$util$Util.MIN_INTEGER = -Math.pow(2, 53);
mpl$lab$util$Util.MOCK_CLOCK = !1;
mpl$lab$util$Util.MODERN_CLOCK = goog.isObject(performance) && goog.isFunction(performance.now);
mpl$lab$util$Util.NaN = Number.NaN;
mpl$lab$util$Util.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
mpl$lab$util$Util.numErrors = 0;
mpl$lab$util$Util.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
mpl$lab$util$Util.VERSION = "2.0.0";
mpl$lab$util$Util.NF = mpl$lab$util$Util.nf5;
var mpl$lab$util$SubjectEvent = function(a) {};
mpl$lab$util$SubjectEvent.prototype.getName = function(a) {}
;
mpl$lab$util$SubjectEvent.prototype.getSubject = function() {}
;
mpl$lab$util$SubjectEvent.prototype.getValue = function() {}
;
mpl$lab$util$SubjectEvent.prototype.nameEquals = function(a) {}
;
var mpl$lab$util$Parameter = function(a) {};
mpl$lab$util$Parameter.prototype.getAsString = function() {}
;
mpl$lab$util$Parameter.prototype.getChoices = function() {}
;
mpl$lab$util$Parameter.prototype.getValues = function() {}
;
mpl$lab$util$Parameter.prototype.isComputed = function() {}
;
mpl$lab$util$Parameter.prototype.setComputed = function(a) {}
;
mpl$lab$util$Parameter.prototype.setFromString = function(a) {}
;
mpl$lab$util$Parameter.CHOICES_MODIFIED = "CHOICES_MODIFIED";
var mpl$lab$util$GenericEvent = function(a, b, c) {
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(b));
    this.subject_ = a;
    this.value_ = c
};
mpl$lab$util$GenericEvent.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", subject_: " + this.subject_.toStringShort() + ", value_: " + this.value_ + "}"
}
;
mpl$lab$util$GenericEvent.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'GenericEvent{name_:"' + this.name_ + '"}'
}
;
mpl$lab$util$GenericEvent.prototype.getName = function(a) {
    return this.name_
}
;
mpl$lab$util$GenericEvent.prototype.getSubject = function() {
    return this.subject_
}
;
mpl$lab$util$GenericEvent.prototype.getValue = function() {
    return this.value_
}
;
mpl$lab$util$GenericEvent.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
var mpl$lab$util$ParameterBoolean = function(a, b, c, d, e, f, g) {
    this.subject_ = a;
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(b));
    this.localName_ = c;
    this.getter_ = d;
    this.setter_ = e;
    this.isComputed_ = !1;
    this.choices_ = [];
    this.values_ = [];
    if (goog.isDefAndNotNull(f))
        if (goog.isDefAndNotNull(g))
            this.setChoices_(f, g);
        else
            throw Error("values not defined");
};
mpl$lab$util$ParameterBoolean.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", isComputed_: " + this.isComputed_ + ", subject_: " + this.subject_.toStringShort() + ', localName_: "' + this.localName_ + '", choices_: ' + this.choices_ + "}"
}
;
mpl$lab$util$ParameterBoolean.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'ParameterBoolean{name_: "' + this.name_ + '", value: ' + this.getValue() + "}"
}
;
mpl$lab$util$ParameterBoolean.prototype.getAsString = function() {
    return this.getValue().toString()
}
;
mpl$lab$util$ParameterBoolean.prototype.getChoices = function() {
    return goog.array.clone(this.choices_)
}
;
mpl$lab$util$ParameterBoolean.prototype.getName = function(a) {
    return a ? this.localName_ : this.name_
}
;
mpl$lab$util$ParameterBoolean.prototype.getSubject = function() {
    return this.subject_
}
;
mpl$lab$util$ParameterBoolean.prototype.getValue = function() {
    return this.getter_()
}
;
mpl$lab$util$ParameterBoolean.prototype.getValues = function() {
    return goog.array.map(this.values_, function(a) {
        return a.toString()
    })
}
;
mpl$lab$util$ParameterBoolean.prototype.isComputed = function() {
    return this.isComputed_
}
;
mpl$lab$util$ParameterBoolean.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$util$ParameterBoolean.prototype.setChoices = function(a, b) {
    this.setChoices_(a, b);
    a = new mpl$lab$util$GenericEvent(this.subject_,mpl$lab$util$Parameter.CHOICES_MODIFIED,this);
    this.subject_.broadcast(a)
}
;
mpl$lab$util$ParameterBoolean.prototype.setChoices_ = function(a, b) {
    this.choices_ = a;
    if (b.length !== a.length)
        throw Error("choices and values not same length");
    this.values_ = b
}
;
mpl$lab$util$ParameterBoolean.prototype.setComputed = function(a) {
    this.isComputed_ = a
}
;
mpl$lab$util$ParameterBoolean.prototype.setFromString = function(a) {
    this.setValue("true" == a || "TRUE" == a)
}
;
mpl$lab$util$ParameterBoolean.prototype.setValue = function(a) {
    if (!goog.isBoolean(a))
        throw Error("non-boolean value: " + a);
    a !== this.getValue() && this.setter_(a)
}
;
var mpl$lab$util$ParameterNumber = function(a, b, c, d, e, f, g) {
    this.subject_ = a;
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(b));
    this.localName_ = c;
    this.getter_ = d;
    this.setter_ = e;
    this.isComputed_ = !1;
    this.signifDigits_ = 3;
    this.decimalPlaces_ = -1;
    this.lowerLimit_ = 0;
    this.upperLimit_ = mpl$lab$util$Util.POSITIVE_INFINITY;
    this.choices_ = [];
    this.values_ = [];
    if (goog.isDefAndNotNull(f))
        if (goog.isDefAndNotNull(g))
            this.setChoices_(f, g);
        else
            throw Error("values is not defined");
};
mpl$lab$util$ParameterNumber.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", isComputed_: " + this.isComputed_ + ", subject_: " + this.subject_.toStringShort() + ', localName_: "' + this.localName_ + '", lowerLimit_: ' + mpl$lab$util$Util.NF(this.lowerLimit_) + ", upperLimit_: " + mpl$lab$util$Util.NF(this.upperLimit_) + ", decimalPlaces_: " + this.decimalPlaces_ + ", signifDigits_: " + this.signifDigits_ + ", choices_: [" + this.choices_ + "], values_: [" + this.values_ + "]}"
}
;
mpl$lab$util$ParameterNumber.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'ParameterNumber{name_: "' + this.name_ + '", value: ' + mpl$lab$util$Util.NF(this.getValue()) + "}"
}
;
mpl$lab$util$ParameterNumber.prototype.getAsString = function() {
    return this.getValue().toString()
}
;
mpl$lab$util$ParameterNumber.prototype.getChoices = function() {
    return goog.array.clone(this.choices_)
}
;
mpl$lab$util$ParameterNumber.prototype.getDecimalPlaces = function() {
    return this.decimalPlaces_
}
;
mpl$lab$util$ParameterNumber.prototype.getLowerLimit = function() {
    return this.lowerLimit_
}
;
mpl$lab$util$ParameterNumber.prototype.getName = function(a) {
    return a ? this.localName_ : this.name_
}
;
mpl$lab$util$ParameterNumber.prototype.getSignifDigits = function() {
    return this.signifDigits_
}
;
mpl$lab$util$ParameterNumber.prototype.getSubject = function() {
    return this.subject_
}
;
mpl$lab$util$ParameterNumber.prototype.getUpperLimit = function() {
    return this.upperLimit_
}
;
mpl$lab$util$ParameterNumber.prototype.getValue = function() {
    return this.getter_()
}
;
mpl$lab$util$ParameterNumber.prototype.getValues = function() {
    return goog.array.map(this.values_, function(a) {
        return a.toString()
    })
}
;
mpl$lab$util$ParameterNumber.prototype.isComputed = function() {
    return this.isComputed_
}
;
mpl$lab$util$ParameterNumber.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$util$ParameterNumber.prototype.setChoices = function(a, b) {
    this.setChoices_(a, b);
    a = new mpl$lab$util$GenericEvent(this.subject_,mpl$lab$util$Parameter.CHOICES_MODIFIED,this);
    this.subject_.broadcast(a)
}
;
mpl$lab$util$ParameterNumber.prototype.setChoices_ = function(a, b) {
    if (b.length !== a.length)
        throw Error("choices and values not same length");
    this.choices_ = a;
    this.values_ = b
}
;
mpl$lab$util$ParameterNumber.prototype.setComputed = function(a) {
    this.isComputed_ = a
}
;
mpl$lab$util$ParameterNumber.prototype.setDecimalPlaces = function(a) {
    this.decimalPlaces_ = a;
    return this
}
;
mpl$lab$util$ParameterNumber.prototype.setFromString = function(a) {
    var b = Number(a);
    if (isNaN(b))
        throw Error("not a number: " + a);
    this.setValue(b)
}
;
mpl$lab$util$ParameterNumber.prototype.setLowerLimit = function(a) {
    if (a > this.getValue() || a > this.upperLimit_)
        throw Error("out of range: " + a + " value=" + this.getValue() + " upper=" + this.upperLimit_);
    this.lowerLimit_ = a;
    return this
}
;
mpl$lab$util$ParameterNumber.prototype.setSignifDigits = function(a) {
    this.signifDigits_ = a;
    return this
}
;
mpl$lab$util$ParameterNumber.prototype.setUpperLimit = function(a) {
    if (a < this.getValue() || a < this.lowerLimit_)
        throw Error("out of range: " + a + " value=" + this.getValue() + " lower=" + this.lowerLimit_);
    this.upperLimit_ = a;
    return this
}
;
mpl$lab$util$ParameterNumber.prototype.setValue = function(a) {
    if (!goog.isNumber(a))
        throw Error("not a number: " + a);
    if (a < this.lowerLimit_ || a > this.upperLimit_)
        throw Error("out of range. " + a + " is not between " + this.lowerLimit_ + " and " + this.upperLimit_);
    if (0 < this.values_.length && !goog.array.contains(this.values_, a))
        throw Error(a + " is not an allowed value among: [" + this.values_.join(",") + "]");
    a !== this.getValue() && this.setter_(a)
}
;
var mpl$lab$util$ParameterString = function(a, b, c, d, e, f, g) {
    this.subject_ = a;
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(b));
    this.localName_ = c;
    this.getter_ = d;
    this.setter_ = e;
    this.isComputed_ = !1;
    this.suggestedLength_ = 20;
    this.maxLength_ = mpl$lab$util$Util.POSITIVE_INFINITY;
    this.choices_ = [];
    this.values_ = [];
    this.inputFunction_ = null;
    if (goog.isDefAndNotNull(f))
        if (goog.isDefAndNotNull(g))
            this.setChoices_(f, g);
        else
            throw Error("values is not defined");
};
mpl$lab$util$ParameterString.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", isComputed_: " + this.isComputed_ + ", subject_: " + this.subject_.toStringShort() + ', localName_: "' + this.localName_ + '", suggestedLength_: ' + this.suggestedLength_ + ", maxLength_: " + this.maxLength_ + ", choices_: [" + this.choices_ + "], values_: [" + this.values_ + "]}"
}
;
mpl$lab$util$ParameterString.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'ParameterString{name_: "' + this.name_ + '", value: "' + this.getValue() + '"}'
}
;
mpl$lab$util$ParameterString.prototype.getAsString = function() {
    return this.getValue()
}
;
mpl$lab$util$ParameterString.prototype.getChoices = function() {
    return goog.array.clone(this.choices_)
}
;
mpl$lab$util$ParameterString.prototype.getMaxLength = function() {
    return this.maxLength_
}
;
mpl$lab$util$ParameterString.prototype.getName = function(a) {
    return a ? this.localName_ : this.name_
}
;
mpl$lab$util$ParameterString.prototype.getSubject = function() {
    return this.subject_
}
;
mpl$lab$util$ParameterString.prototype.getSuggestedLength = function() {
    return this.suggestedLength_
}
;
mpl$lab$util$ParameterString.prototype.getValue = function() {
    return this.getter_()
}
;
mpl$lab$util$ParameterString.prototype.getValues = function() {
    return goog.array.clone(this.values_)
}
;
mpl$lab$util$ParameterString.prototype.isComputed = function() {
    return this.isComputed_
}
;
mpl$lab$util$ParameterString.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$util$ParameterString.prototype.setChoices = function(a, b) {
    this.setChoices_(a, b);
    a = new mpl$lab$util$GenericEvent(this.subject_,mpl$lab$util$Parameter.CHOICES_MODIFIED,this);
    this.subject_.broadcast(a)
}
;
mpl$lab$util$ParameterString.prototype.setChoices_ = function(a, b) {
    this.choices_ = a;
    if (b.length !== a.length)
        throw Error("different lengths choices:" + a + " values:" + b);
    this.values_ = b
}
;
mpl$lab$util$ParameterString.prototype.setComputed = function(a) {
    this.isComputed_ = a
}
;
mpl$lab$util$ParameterString.prototype.setFromString = function(a) {
    this.setValue(a)
}
;
mpl$lab$util$ParameterString.prototype.setInputFunction = function(a) {
    this.inputFunction_ = a;
    return this
}
;
mpl$lab$util$ParameterString.prototype.setMaxLength = function(a) {
    if (a < this.getValue().length)
        throw Error("too long");
    this.maxLength_ = a;
    return this
}
;
mpl$lab$util$ParameterString.prototype.setSuggestedLength = function(a) {
    this.suggestedLength_ = a;
    return this
}
;
mpl$lab$util$ParameterString.prototype.setValue = function(a) {
    null != this.inputFunction_ && (a = this.inputFunction_(a));
    if (!goog.isString(a))
        throw Error("non-string value: " + a);
    if (a.length > this.maxLength_)
        throw Error("string too long: " + a + " maxLength=" + this.maxLength_);
    if (0 < this.values_.length && !goog.array.contains(this.values_, a))
        throw Error('"' + a + '" is not an allowed value among: [' + this.values_.join(",") + "]");
    a !== this.getValue() && this.setter_(a)
}
;
var mpl$lab$util$AbstractSubject = function(a) {
    if (!a)
        throw Error("no name");
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(a));
    this.observers_ = [];
    this.paramList_ = [];
    this.doBroadcast_ = !0;
    this.isBroadcasting_ = !1;
    this.commandList_ = []
};
mpl$lab$util$AbstractSubject.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : ", parameters: [" + goog.array.map(this.paramList_, function(a) {
        return a.toStringShort()
    }) + "], observers: [" + goog.array.map(this.observers_, function(a) {
        return a.toStringShort()
    }) + "]}"
}
;
mpl$lab$util$AbstractSubject.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{name_: "' + this.getName() + '"}'
}
;
mpl$lab$util$AbstractSubject.prototype.addObserver = function(a) {
    this.commandList_.push({
        action: !0,
        observer: a
    });
    this.doCommands()
}
;
mpl$lab$util$AbstractSubject.prototype.doCommands = function() {
    if (!this.isBroadcasting_) {
        for (var a = 0, b = this.commandList_.length; a < b; a++) {
            var c = this.commandList_[a];
            c.action ? goog.array.contains(this.observers_, c.observer) || this.observers_.push(c.observer) : goog.array.remove(this.observers_, c.observer)
        }
        this.commandList_ = []
    }
}
;
mpl$lab$util$AbstractSubject.prototype.addParameter = function(a) {
    var b = a.getName()
      , c = this.getParam(b);
    if (null != c)
        throw Error("parameter " + b + " already exists: " + c);
    this.paramList_.push(a)
}
;
mpl$lab$util$AbstractSubject.prototype.broadcast = function(a) {
    if (this.doBroadcast_) {
        this.isBroadcasting_ = !0;
        try {
            goog.array.forEach(this.observers_, function(b) {
                b.observe(a)
            })
        } finally {
            this.isBroadcasting_ = !1,
            this.doCommands()
        }
    }
}
;
mpl$lab$util$AbstractSubject.prototype.broadcastParameter = function(a) {
    var b = this.getParam(a);
    if (null == b)
        throw Error("unknown Parameter " + a);
    this.broadcast(b)
}
;
mpl$lab$util$AbstractSubject.prototype.getBroadcast = function() {
    return this.doBroadcast_
}
;
mpl$lab$util$AbstractSubject.prototype.getClassName = function() {}
;
mpl$lab$util$AbstractSubject.prototype.getName = function() {
    return this.name_
}
;
mpl$lab$util$AbstractSubject.prototype.getObservers = function() {
    return goog.array.clone(this.observers_)
}
;
mpl$lab$util$AbstractSubject.prototype.getParam = function(a) {
    a = mpl$lab$util$Util.toName(a);
    return goog.array.find(this.paramList_, function(b) {
        return b.getName() == a
    })
}
;
mpl$lab$util$AbstractSubject.prototype.getParameter = function(a) {
    var b = this.getParam(a);
    if (null != b)
        return b;
    throw Error("Parameter not found " + a);
}
;
mpl$lab$util$AbstractSubject.prototype.getParameterBoolean = function(a) {
    var b = this.getParam(a);
    if (b instanceof mpl$lab$util$ParameterBoolean)
        return b;
    throw Error("ParameterBoolean not found " + a);
}
;
mpl$lab$util$AbstractSubject.prototype.getParameterNumber = function(a) {
    var b = this.getParam(a);
    if (b instanceof mpl$lab$util$ParameterNumber)
        return b;
    throw Error("ParameterNumber not found " + a);
}
;
mpl$lab$util$AbstractSubject.prototype.getParameterString = function(a) {
    var b = this.getParam(a);
    if (b instanceof mpl$lab$util$ParameterString)
        return b;
    throw Error("ParameterString not found " + a);
}
;
mpl$lab$util$AbstractSubject.prototype.getParameters = function() {
    return goog.array.clone(this.paramList_)
}
;
mpl$lab$util$AbstractSubject.prototype.removeObserver = function(a) {
    this.commandList_.push({
        action: !1,
        observer: a
    });
    this.doCommands()
}
;
mpl$lab$util$AbstractSubject.prototype.removeParameter = function(a) {
    goog.array.remove(this.paramList_, a)
}
;
mpl$lab$util$AbstractSubject.prototype.setBroadcast = function(a) {
    var b = this.doBroadcast_;
    this.doBroadcast_ = a;
    return b
}
;
var mpl$lab$util$GenericVector = function() {};
mpl$lab$util$GenericVector.prototype.getX = function() {}
;
mpl$lab$util$GenericVector.prototype.getY = function() {}
;
mpl$lab$util$GenericVector.prototype.getZ = function() {}
;
var mpl$lab$util$Vector = function(a, b, c) {
    c = goog.isNumber(c) ? c : 0;
    this.x_ = mpl$lab$util$Util.testNumber(a);
    this.y_ = mpl$lab$util$Util.testNumber(b);
    this.z_ = mpl$lab$util$Util.testNumber(c)
};
mpl$lab$util$Vector.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "Vector{x: " + mpl$lab$util$Util.NF5(this.x_) + ", y: " + mpl$lab$util$Util.NF5(this.y_) + (0 != this.z_ ? ", z: " + mpl$lab$util$Util.NF5(this.z_) : "") + "}"
}
;
mpl$lab$util$Vector.clone = function(a) {
    return a instanceof mpl$lab$util$Vector ? a : new mpl$lab$util$Vector(a.getX(),a.getY(),a.getZ())
}
;
mpl$lab$util$Vector.prototype.add = function(a) {
    return new mpl$lab$util$Vector(this.x_ + a.getX(),this.y_ + a.getY(),this.z_ + a.getZ())
}
;
mpl$lab$util$Vector.prototype.angleTo = function(a) {
    if (0 != this.getZ() || 0 != a.getZ())
        throw Error();
    var b = Math.atan2(this.y_, this.x_);
    a = Math.atan2(a.getY(), a.getX());
    return mpl$lab$util$Util.limitAngle(a - b)
}
;
mpl$lab$util$Vector.prototype.distanceSquaredTo = function(a) {
    var b = this.x_ - a.getX()
      , c = this.y_ - a.getY();
    a = this.z_ - a.getZ();
    return b * b + c * c + a * a
}
;
mpl$lab$util$Vector.prototype.distanceTo = function(a) {
    return Math.sqrt(this.distanceSquaredTo(a))
}
;
mpl$lab$util$Vector.prototype.divide = function(a) {
    if (1 === a)
        return this;
    if (a < mpl$lab$util$Vector.TINY_POSITIVE)
        throw Error("Vector.divide by near zero factor " + mpl$lab$util$Util.NFE(a));
    return new mpl$lab$util$Vector(this.x_ / a,this.y_ / a,this.z_ / a)
}
;
mpl$lab$util$Vector.prototype.dotProduct = function(a) {
    var b = this.x_ * a.getX() + this.y_ * a.getY() + this.z_ * a.getZ();
    if (isNaN(b))
        throw Error(mpl$lab$util$Util.DEBUG ? "dotproduct is not a number " + this + " " + a : "");
    return b
}
;
mpl$lab$util$Vector.prototype.equals = function(a) {
    return goog.isNull(a) ? !1 : a.getX() === this.x_ && a.getY() === this.y_ && a.getZ() === this.z_
}
;
mpl$lab$util$Vector.prototype.getAngle = function() {
    return Math.atan2(this.y_, this.x_)
}
;
mpl$lab$util$Vector.prototype.getX = function() {
    return this.x_
}
;
mpl$lab$util$Vector.prototype.getY = function() {
    return this.y_
}
;
mpl$lab$util$Vector.prototype.getZ = function() {
    return this.z_
}
;
mpl$lab$util$Vector.prototype.length = function() {
    return Math.sqrt(this.lengthSquared())
}
;
mpl$lab$util$Vector.prototype.lengthCheap = function() {
    var a = Math.abs(this.x_) + Math.abs(this.y_);
    return 0 == this.z_ ? a : a + Math.abs(this.z_)
}
;
mpl$lab$util$Vector.prototype.lengthSquared = function() {
    return 0 === this.z_ ? this.x_ * this.x_ + this.y_ * this.y_ : this.x_ * this.x_ + this.y_ * this.y_ + this.z_ * this.z_
}
;
mpl$lab$util$Vector.prototype.multiply = function(a) {
    return 1 === a ? this : new mpl$lab$util$Vector(a * this.x_,a * this.y_,a * this.z_)
}
;
mpl$lab$util$Vector.prototype.nearEqual = function(a, b) {
    return mpl$lab$util$Util.veryDifferent(this.x_, a.getX(), b) || mpl$lab$util$Util.veryDifferent(this.y_, a.getY(), b) || mpl$lab$util$Util.veryDifferent(this.z_, a.getZ(), b) ? !1 : !0
}
;
mpl$lab$util$Vector.prototype.normalize = function() {
    return this.divide(this.length())
}
;
mpl$lab$util$Vector.prototype.rotate = function(a, b) {
    if (goog.isDef(b))
        var c = a;
    else
        c = Math.cos(a),
        b = Math.sin(a);
    if (1E-12 < Math.abs(c * c + b * b - 1))
        throw Error();
    return new mpl$lab$util$Vector(this.x_ * c - this.y_ * b,this.x_ * b + this.y_ * c,this.z_)
}
;
mpl$lab$util$Vector.prototype.subtract = function(a) {
    return new mpl$lab$util$Vector(this.x_ - a.getX(),this.y_ - a.getY(),this.z_ - a.getZ())
}
;
mpl$lab$util$Vector.EAST = new mpl$lab$util$Vector(1,0);
mpl$lab$util$Vector.NORTH = new mpl$lab$util$Vector(0,1);
mpl$lab$util$Vector.ORIGIN = new mpl$lab$util$Vector(0,0);
mpl$lab$util$Vector.SOUTH = new mpl$lab$util$Vector(0,-1);
mpl$lab$util$Vector.TINY_POSITIVE = 1E-10;
mpl$lab$util$Vector.WEST = new mpl$lab$util$Vector(-1,0);
var mpl$lab$util$DoubleRect = function(a, b, c, d) {
    this.left_ = mpl$lab$util$Util.testNumber(a);
    this.right_ = mpl$lab$util$Util.testNumber(c);
    this.bottom_ = mpl$lab$util$Util.testNumber(b);
    this.top_ = mpl$lab$util$Util.testNumber(d);
    if (a > c)
        throw Error("DoubleRect: left > right " + a + " > " + c);
    if (b > d)
        throw Error("DoubleRect: bottom > top " + b + " > " + d);
};
mpl$lab$util$DoubleRect.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DoubleRect{left_: " + mpl$lab$util$Util.NF(this.left_) + ", bottom_: " + mpl$lab$util$Util.NF(this.bottom_) + ", right_: " + mpl$lab$util$Util.NF(this.right_) + ", top_: " + mpl$lab$util$Util.NF(this.top_) + "}"
}
;
mpl$lab$util$DoubleRect.clone = function(a) {
    return new mpl$lab$util$DoubleRect(a.getLeft(),a.getBottom(),a.getRight(),a.getTop())
}
;
mpl$lab$util$DoubleRect.isDuckType = function(a) {
    return a instanceof mpl$lab$util$DoubleRect ? !0 : mpl$lab$util$Util.ADVANCED ? !1 : void 0 !== a.getLeft && void 0 !== a.getRight && void 0 !== a.getTop && void 0 !== a.getBottom && void 0 !== a.translate && void 0 !== a.scale
}
;
mpl$lab$util$DoubleRect.make = function(a, b) {
    var c = Math.min(a.getX(), b.getX())
      , d = Math.max(a.getX(), b.getX())
      , e = Math.min(a.getY(), b.getY());
    a = Math.max(a.getY(), b.getY());
    return new mpl$lab$util$DoubleRect(c,e,d,a)
}
;
mpl$lab$util$DoubleRect.makeCentered = function(a, b, c) {
    var d = a.getX();
    a = a.getY();
    return new mpl$lab$util$DoubleRect(d - b / 2,a - c / 2,d + b / 2,a + c / 2)
}
;
mpl$lab$util$DoubleRect.makeCentered2 = function(a, b) {
    var c = a.getX();
    a = a.getY();
    var d = b.getX();
    b = b.getY();
    return new mpl$lab$util$DoubleRect(c - d / 2,a - b / 2,c + d / 2,a + b / 2)
}
;
mpl$lab$util$DoubleRect.prototype.contains = function(a) {
    return a.getX() >= this.left_ && a.getX() <= this.right_ && a.getY() >= this.bottom_ && a.getY() <= this.top_
}
;
mpl$lab$util$DoubleRect.prototype.equals = function(a) {
    return a === this ? !0 : a instanceof mpl$lab$util$DoubleRect ? a.getLeft() == this.left_ && a.getRight() == this.right_ && a.getBottom() == this.bottom_ && a.getTop() == this.top_ : !1
}
;
mpl$lab$util$DoubleRect.prototype.expand = function(a, b) {
    b = void 0 === b ? a : b;
    return new mpl$lab$util$DoubleRect(this.getLeft() - a,this.getBottom() - b,this.getRight() + a,this.getTop() + a)
}
;
mpl$lab$util$DoubleRect.prototype.getBottom = function() {
    return this.bottom_
}
;
mpl$lab$util$DoubleRect.prototype.getCenter = function() {
    return new mpl$lab$util$Vector(this.getCenterX(),this.getCenterY())
}
;
mpl$lab$util$DoubleRect.prototype.getCenterX = function() {
    return (this.left_ + this.right_) / 2
}
;
mpl$lab$util$DoubleRect.prototype.getCenterY = function() {
    return (this.bottom_ + this.top_) / 2
}
;
mpl$lab$util$DoubleRect.prototype.getHeight = function() {
    return this.top_ - this.bottom_
}
;
mpl$lab$util$DoubleRect.prototype.getLeft = function() {
    return this.left_
}
;
mpl$lab$util$DoubleRect.prototype.getRight = function() {
    return this.right_
}
;
mpl$lab$util$DoubleRect.prototype.getTop = function() {
    return this.top_
}
;
mpl$lab$util$DoubleRect.prototype.getWidth = function() {
    return this.right_ - this.left_
}
;
mpl$lab$util$DoubleRect.prototype.intersection = function(a) {
    var b = Math.max(this.left_, a.getLeft())
      , c = Math.max(this.bottom_, a.getBottom())
      , d = Math.min(this.right_, a.getRight());
    a = Math.min(this.top_, a.getTop());
    return b > d || c > a ? mpl$lab$util$DoubleRect.EMPTY_RECT : new mpl$lab$util$DoubleRect(b,c,d,a)
}
;
mpl$lab$util$DoubleRect.prototype.isEmpty = function(a) {
    a = a || 1E-16;
    return this.getWidth() < a || this.getHeight() < a
}
;
mpl$lab$util$DoubleRect.prototype.maybeVisible = function(a, b) {
    if (this.contains(a) || this.contains(b))
        return !0;
    var c = a.getX();
    a = a.getY();
    var d = b.getX();
    b = b.getY();
    var e = this.left_;
    if (c < e && d < e)
        return !1;
    e = this.right_;
    if (c > e && d > e)
        return !1;
    e = this.bottom_;
    if (a < e && b < e)
        return !1;
    e = this.top_;
    return a > e && b > e ? !1 : !0
}
;
mpl$lab$util$DoubleRect.prototype.nearEqual = function(a, b) {
    return mpl$lab$util$Util.veryDifferent(this.left_, a.getLeft(), b) || mpl$lab$util$Util.veryDifferent(this.bottom_, a.getBottom(), b) || mpl$lab$util$Util.veryDifferent(this.right_, a.getRight(), b) || mpl$lab$util$Util.veryDifferent(this.top_, a.getTop(), b) ? !1 : !0
}
;
mpl$lab$util$DoubleRect.prototype.scale = function(a, b) {
    b = void 0 === b ? a : b;
    var c = this.getCenterX()
      , d = this.getCenterY()
      , e = this.getWidth()
      , f = this.getHeight();
    return new mpl$lab$util$DoubleRect(c - a * e / 2,d - b * f / 2,c + a * e / 2,d + b * f / 2)
}
;
mpl$lab$util$DoubleRect.prototype.translate = function(a, b) {
    goog.isNumber(a) || (b = a.getY(),
    a = a.getX());
    if (!goog.isNumber(a) || !goog.isNumber(b))
        throw Error();
    return new mpl$lab$util$DoubleRect(this.left_ + a,this.bottom_ + b,this.right_ + a,this.top_ + b)
}
;
mpl$lab$util$DoubleRect.prototype.union = function(a) {
    return new mpl$lab$util$DoubleRect(Math.min(this.left_, a.getLeft()),Math.min(this.bottom_, a.getBottom()),Math.max(this.right_, a.getRight()),Math.max(this.top_, a.getTop()))
}
;
mpl$lab$util$DoubleRect.prototype.unionPoint = function(a) {
    return new mpl$lab$util$DoubleRect(Math.min(this.left_, a.getX()),Math.min(this.bottom_, a.getY()),Math.max(this.right_, a.getX()),Math.max(this.top_, a.getY()))
}
;
mpl$lab$util$DoubleRect.EMPTY_RECT = new mpl$lab$util$DoubleRect(0,0,0,0);
var mpl$lab$util$HistoryIterator = function() {};
mpl$lab$util$HistoryIterator.prototype.getIndex = function() {}
;
mpl$lab$util$HistoryIterator.prototype.getValue = function() {}
;
mpl$lab$util$HistoryIterator.prototype.hasNext = function() {}
;
mpl$lab$util$HistoryIterator.prototype.hasPrevious = function() {}
;
mpl$lab$util$HistoryIterator.prototype.nextValue = function() {}
;
mpl$lab$util$HistoryIterator.prototype.previousValue = function() {}
;
var mpl$lab$util$HistoryList = function() {};
mpl$lab$util$HistoryList.prototype.getEndIndex = function() {}
;
mpl$lab$util$HistoryList.prototype.getEndValue = function() {}
;
mpl$lab$util$HistoryList.prototype.getIterator = function(a) {}
;
mpl$lab$util$HistoryList.prototype.getSize = function() {}
;
mpl$lab$util$HistoryList.prototype.getStartIndex = function() {}
;
mpl$lab$util$HistoryList.prototype.getValue = function(a) {}
;
mpl$lab$util$HistoryList.prototype.reset = function() {}
;
mpl$lab$util$HistoryList.prototype.store = function(a) {}
;
var mpl$lab$util$CircularList = function(a) {
    this.capacity_ = a || 3E3;
    if (2 > this.capacity_)
        throw Error();
    this.nextPtr_ = this.cycles_ = this.size_ = 0;
    this.lastPtr_ = -1;
    this.values_ = Array(this.capacity_);
    this.lastValue_ = null
};
mpl$lab$util$CircularList.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "CircularList{capacity_: " + this.capacity_ + ", size_: " + this.size_ + ", cycles_: " + this.cycles_ + ", nextPtr_: " + this.nextPtr_ + ", lastPtr_: " + this.lastPtr_ + "}"
}
;
mpl$lab$util$CircularList.prototype.causeMaxIntError = function() {
    this.size_ = this.capacity_;
    this.cycles_ = Math.floor(mpl$lab$util$Util.MAX_INTEGER / this.capacity_) - 1
}
;
mpl$lab$util$CircularList.prototype.getEndIndex = function() {
    return 0 == this.size_ ? -1 : 0 == this.nextPtr_ ? this.pointerToIndex(this.size_ - 1) : this.pointerToIndex(this.nextPtr_ - 1)
}
;
mpl$lab$util$CircularList.prototype.getEndValue = function() {
    var a = this.getEndIndex();
    return -1 == a ? null : this.values_[this.indexToPointer(a)]
}
;
mpl$lab$util$CircularList.prototype.getIterator = function(a) {
    return new module$contents$myphysicslab$lab$util$CircularList_CircularListIterator(this,a)
}
;
mpl$lab$util$CircularList.prototype.getSize = function() {
    return this.size_
}
;
mpl$lab$util$CircularList.prototype.getStartIndex = function() {
    return this.size_ < this.capacity_ ? 0 : this.pointerToIndex(this.nextPtr_)
}
;
mpl$lab$util$CircularList.prototype.getValue = function(a) {
    a = this.indexToPointer(a);
    return this.values_[a]
}
;
mpl$lab$util$CircularList.prototype.indexToPointer = function(a) {
    return this.size_ < this.capacity_ ? a : a - (this.cycles_ - (a % this.capacity_ < this.nextPtr_ ? 0 : 1)) * this.capacity_
}
;
mpl$lab$util$CircularList.prototype.pointerToIndex = function(a) {
    if (this.size_ < this.capacity_)
        return a;
    a += (this.cycles_ - (a < this.nextPtr_ ? 0 : 1)) * this.capacity_;
    if (a >= mpl$lab$util$Util.MAX_INTEGER)
        throw Error(mpl$lab$util$CircularList.MAX_INDEX_ERROR);
    return a
}
;
mpl$lab$util$CircularList.prototype.reset = function() {
    this.cycles_ = this.nextPtr_ = this.size_ = 0;
    this.lastPtr_ = -1
}
;
mpl$lab$util$CircularList.prototype.store = function(a) {
    this.lastPtr_ = this.nextPtr_;
    this.values_[this.nextPtr_] = a;
    this.nextPtr_++;
    this.size_ < this.capacity_ && this.size_++;
    this.nextPtr_ >= this.capacity_ && (this.cycles_++,
    this.nextPtr_ = 0);
    return this.pointerToIndex(this.lastPtr_)
}
;
mpl$lab$util$CircularList.MAX_INDEX_ERROR = "exceeded max int";
var module$contents$myphysicslab$lab$util$CircularList_CircularListIterator = function(a, b) {
    this.first_ = 0 < a.size_;
    this.cList_ = a;
    if (void 0 === b || 0 > b)
        b = a.getStartIndex();
    if (0 < a.size_ && (b < a.getStartIndex() || b > a.getEndIndex()))
        throw Error("out of range startIndex=" + b);
    this.index_ = b;
    this.pointer_ = a.indexToPointer(b)
};
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.getIndex = function() {
    if (0 == this.cList_.size_)
        throw Error("no data");
    return this.index_
}
;
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.getValue = function() {
    if (0 == this.cList_.size_)
        throw Error("no data");
    return this.cList_.values_[this.pointer_]
}
;
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.hasNext = function() {
    return this.first_ || this.index_ < this.cList_.getEndIndex()
}
;
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.hasPrevious = function() {
    return this.first_ || this.index_ > this.cList_.getStartIndex()
}
;
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.nextValue = function() {
    if (0 === this.cList_.size_)
        throw Error("no data");
    if (this.first_)
        this.first_ = !1;
    else {
        if (this.index_ + 1 > this.cList_.getEndIndex())
            throw Error("cannot iterate past end of list");
        this.index_++;
        this.pointer_ = this.cList_.indexToPointer(this.index_)
    }
    return this.cList_.values_[this.pointer_]
}
;
module$contents$myphysicslab$lab$util$CircularList_CircularListIterator.prototype.previousValue = function() {
    if (0 === this.cList_.size_)
        throw Error("no data");
    if (this.first_)
        this.first_ = !1;
    else {
        if (this.index_ - 1 < this.cList_.getStartIndex())
            throw Error("cannot iterate prior to start of list");
        this.index_--;
        this.pointer_ = this.cList_.indexToPointer(this.index_)
    }
    return this.cList_.values_[this.pointer_]
}
;
var mpl$lab$view$DrawingMode = {
    DOTS: "dots",
    LINES: "lines",
    choiceToEnum: function(a) {
        for (var b = mpl$lab$view$DrawingMode.getChoices(), c = 0, d = b.length; c < d; c++)
            if (a == b[c])
                return mpl$lab$view$DrawingMode.getValues()[c];
        throw Error("DrawingMode not found " + a);
    },
    enumToChoice: function(a) {
        for (var b = mpl$lab$view$DrawingMode.getValues(), c = 0, d = b.length; c < d; c++)
            if (a == b[c])
                return mpl$lab$view$DrawingMode.getChoices()[c];
        throw Error("not found " + a);
    },
    getChoices: function() {
        return [mpl$lab$view$DrawingMode.i18n.DOTS, mpl$lab$view$DrawingMode.i18n.LINES]
    },
    getValues: function() {
        return [mpl$lab$view$DrawingMode.DOTS, mpl$lab$view$DrawingMode.LINES]
    },
    stringToEnum: function(a) {
        for (var b = mpl$lab$view$DrawingMode.getValues(), c = 0, d = b.length; c < d; c++)
            if (a == b[c])
                return b[c];
        throw Error("not found " + a);
    },
    en: {
        DOTS: "Dots",
        LINES: "Lines"
    },
    de_strings: {
        DOTS: "Punkte",
        LINES: "Linien"
    }
};
mpl$lab$view$DrawingMode.i18n = "de" === goog.LOCALE ? mpl$lab$view$DrawingMode.de_strings : mpl$lab$view$DrawingMode.en;
var mpl$lab$graph$GraphPoint = function(a, b, c, d) {
    this.x = a;
    this.y = b;
    this.seqX = c;
    this.seqY = d
};
mpl$lab$graph$GraphPoint.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "GraphPoint{x: " + mpl$lab$util$Util.NF(this.x) + ", y: " + mpl$lab$util$Util.NF(this.y) + ", seqX: " + mpl$lab$util$Util.NF(this.seqX) + ", seqY: " + mpl$lab$util$Util.NF(this.seqY) + "}"
}
;
mpl$lab$graph$GraphPoint.prototype.equals = function(a) {
    return this.x == a.x && this.y == a.y && this.seqX == a.seqX && this.seqY == a.seqY
}
;
mpl$lab$graph$GraphPoint.prototype.getX = function() {
    return this.x
}
;
mpl$lab$graph$GraphPoint.prototype.getY = function() {
    return this.y
}
;
mpl$lab$graph$GraphPoint.prototype.getZ = function() {
    return 0
}
;
var mpl$lab$graph$GraphStyle = function(a, b, c, d) {
    this.index_ = a;
    this.drawMode = b;
    this.color_ = c;
    this.lineWidth = d
};
mpl$lab$graph$GraphStyle.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "GraphStyle{index_: " + this.index_ + ", drawMode: " + this.drawMode + ', color_:"' + this.color_ + '", lineWidth: ' + this.lineWidth + "}"
}
;
var mpl$lab$util$Memorizable = function(a) {};
mpl$lab$util$Memorizable.prototype.memorize = function() {}
;
var mpl$lab$model$Variable = function(a) {};
mpl$lab$model$Variable.prototype.getBroadcast = function() {}
;
mpl$lab$model$Variable.prototype.getSequence = function() {}
;
mpl$lab$model$Variable.prototype.getValue = function() {}
;
mpl$lab$model$Variable.prototype.incrSequence = function() {}
;
mpl$lab$model$Variable.prototype.setBroadcast = function(a) {}
;
mpl$lab$model$Variable.prototype.setValue = function(a) {}
;
mpl$lab$model$Variable.prototype.setValueSmooth = function(a) {}
;
var mpl$lab$model$ConcreteVariable = function(a, b, c) {
    this.varsList_ = a;
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(b));
    this.localName_ = c;
    this.value_ = 0;
    this.isComputed_ = !1;
    this.seq_ = 0;
    this.doesBroadcast_ = !1
};
mpl$lab$model$ConcreteVariable.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", isComputed_: " + this.isComputed_ + ', localName_: "' + this.localName_ + '", varsList_: ' + this.varsList_.toStringShort() + "}"
}
;
mpl$lab$model$ConcreteVariable.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{name_: "' + this.name_ + '", value_: ' + mpl$lab$util$Util.NF(this.getValue()) + "}"
}
;
mpl$lab$model$ConcreteVariable.prototype.getClassName = function() {
    return "ConcreteVariable"
}
;
mpl$lab$model$ConcreteVariable.prototype.getAsString = function() {
    return this.value_.toString()
}
;
mpl$lab$model$ConcreteVariable.prototype.getBroadcast = function() {
    return this.doesBroadcast_
}
;
mpl$lab$model$ConcreteVariable.prototype.getChoices = function() {
    return []
}
;
mpl$lab$model$ConcreteVariable.prototype.getName = function(a) {
    return a ? this.localName_ : this.name_
}
;
mpl$lab$model$ConcreteVariable.prototype.getSequence = function() {
    return this.seq_
}
;
mpl$lab$model$ConcreteVariable.prototype.getSubject = function() {
    return this.varsList_
}
;
mpl$lab$model$ConcreteVariable.prototype.getValue = function() {
    return this.value_
}
;
mpl$lab$model$ConcreteVariable.prototype.getValues = function() {
    return []
}
;
mpl$lab$model$ConcreteVariable.prototype.incrSequence = function() {
    this.seq_++
}
;
mpl$lab$model$ConcreteVariable.prototype.isComputed = function() {
    return this.isComputed_
}
;
mpl$lab$model$ConcreteVariable.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$ConcreteVariable.prototype.setBroadcast = function(a) {
    this.doesBroadcast_ = a
}
;
mpl$lab$model$ConcreteVariable.prototype.setComputed = function(a) {
    this.isComputed_ = a
}
;
mpl$lab$model$ConcreteVariable.prototype.setFromString = function(a) {
    var b = Number(a);
    if (isNaN(b))
        throw Error("not a number: " + a + " (ConcreteVariable)");
    this.setValue(b)
}
;
mpl$lab$model$ConcreteVariable.prototype.setValue = function(a) {
    this.value_ != a && (this.value_ = a,
    this.seq_++,
    this.doesBroadcast_ && this.varsList_.broadcast(this))
}
;
mpl$lab$model$ConcreteVariable.prototype.setValueSmooth = function(a) {
    this.value_ = a
}
;
var mpl$lab$model$VarsList = function(a, b, c) {
    c = goog.isDef(c) ? c : "VARIABLES";
    mpl$lab$util$AbstractSubject.call(this, c);
    this.timeIdx_ = -1;
    if (a.length != b.length)
        throw Error("varNames and localNames are different lengths");
    c = 0;
    for (var d = a.length; c < d; c++) {
        var e = a[c];
        if (!goog.isString(e))
            throw Error("variable name " + e + " is not a string i=" + c);
        e = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(e));
        a[c] = e;
        e == mpl$lab$model$VarsList.TIME && (this.timeIdx_ = c)
    }
    if (!mpl$lab$util$Util.uniqueElements(a))
        throw Error("duplicate variable names");
    this.varList_ = [];
    c = 0;
    for (d = a.length; c < d; c++)
        this.varList_.push(new mpl$lab$model$ConcreteVariable(this,a[c],b[c]));
    this.history_ = mpl$lab$util$Util.DEBUG;
    this.histArray_ = []
};
$jscomp.inherits(mpl$lab$model$VarsList, mpl$lab$util$AbstractSubject);
mpl$lab$model$VarsList.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", timeIdx_: " + this.timeIdx_ + ", history_: " + this.history_ + ", " + goog.array.map(this.varList_, function(a, b) {
        return "(" + b + ") " + a.getName() + ": " + mpl$lab$util$Util.NF5E(a.getValue())
    }) + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$model$VarsList.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", numVars: " + this.varList_.length + "}"
}
;
mpl$lab$model$VarsList.prototype.getClassName = function() {
    return "VarsList"
}
;
mpl$lab$model$VarsList.prototype.addParameter = function(a) {
    throw Error("addParameter not allowed on VarsList");
}
;
mpl$lab$model$VarsList.prototype.addVariable = function(a) {
    var b = a.getName();
    if (b == mpl$lab$model$VarsList.DELETED)
        throw Error('variable cannot be named "' + mpl$lab$model$VarsList.DELETED + '"');
    var c = this.findOpenSlot_(1);
    this.varList_[c] = a;
    b == mpl$lab$model$VarsList.TIME && (this.timeIdx_ = c);
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$VarsList.VARS_MODIFIED));
    return c
}
;
mpl$lab$model$VarsList.prototype.addVariables = function(a, b) {
    var c = a.length;
    if (0 == c)
        throw Error();
    if (a.length != b.length)
        throw Error("names and localNames are different lengths");
    for (var d = this.findOpenSlot_(c), e = 0; e < c; e++) {
        var f = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(a[e]));
        if (f == mpl$lab$model$VarsList.DELETED)
            throw Error("variable cannot be named ''+VarsList.DELETED+''");
        var g = d + e;
        this.varList_[g] = new mpl$lab$model$ConcreteVariable(this,f,b[e]);
        f == mpl$lab$model$VarsList.TIME && (this.timeIdx_ = g)
    }
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$VarsList.VARS_MODIFIED));
    return d
}
;
mpl$lab$model$VarsList.prototype.checkIndex_ = function(a) {
    if (0 > a || a >= this.varList_.length)
        throw Error("bad variable index=" + a + "; numVars=" + this.varList_.length);
}
;
mpl$lab$model$VarsList.prototype.deleteVariables = function(a, b) {
    if (0 != b) {
        if (0 > b || 0 > a || a + b > this.varList_.length)
            throw Error("deleteVariables");
        for (var c = a; c < a + b; c++)
            this.varList_[c] = new mpl$lab$model$ConcreteVariable(this,mpl$lab$model$VarsList.DELETED,mpl$lab$model$VarsList.DELETED);
        this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$VarsList.VARS_MODIFIED))
    }
}
;
mpl$lab$model$VarsList.prototype.findOpenSlot_ = function(a) {
    if (0 > a)
        throw Error();
    for (var b = 0, c = -1, d = 0, e = this.varList_.length; d < e; d++)
        if (this.varList_[d].getName() == mpl$lab$model$VarsList.DELETED) {
            if (-1 == c && (c = d),
            b++,
            b >= a)
                return c
        } else
            c = -1,
            b = 0;
    0 < b ? (a -= b,
    goog.asserts.assert(0 <= c),
    goog.asserts.assert(0 < a)) : c = this.varList_.length;
    for (d = 0; d < a; d++)
        this.varList_.push(new mpl$lab$model$ConcreteVariable(this,mpl$lab$model$VarsList.DELETED,mpl$lab$model$VarsList.DELETED));
    return c
}
;
mpl$lab$model$VarsList.prototype.getHistory = function() {
    return this.history_
}
;
mpl$lab$model$VarsList.prototype.getParameter = function(a) {
    a = mpl$lab$util$Util.toName(a);
    var b = goog.array.find(this.varList_, function(b) {
        return b.getName() == a
    });
    if (null != b)
        return b;
    throw Error("Parameter not found " + a);
}
;
mpl$lab$model$VarsList.prototype.getParameters = function() {
    return goog.array.clone(this.varList_)
}
;
mpl$lab$model$VarsList.prototype.getTime = function() {
    if (0 > this.timeIdx_)
        throw Error("no time variable");
    return this.getValue(this.timeIdx_)
}
;
mpl$lab$model$VarsList.prototype.getValue = function(a) {
    this.checkIndex_(a);
    return this.varList_[a].getValue()
}
;
mpl$lab$model$VarsList.prototype.getValues = function(a) {
    return goog.array.map(this.varList_, function(b) {
        return !a && b.isComputed() ? NaN : b.getValue()
    })
}
;
mpl$lab$model$VarsList.prototype.getVariable = function(a) {
    if (goog.isNumber(a))
        var b = a;
    else if (goog.isString(a)) {
        if (a = mpl$lab$util$Util.toName(a),
        b = goog.array.findIndex(this.varList_, function(b) {
            return b.getName() == a
        }),
        0 > b)
            throw Error("unknown variable name " + a);
    } else
        throw Error();
    this.checkIndex_(b);
    return this.varList_[b]
}
;
mpl$lab$model$VarsList.prototype.incrSequence = function(a) {
    if (0 == arguments.length)
        for (var b = 0, c = this.varList_.length; b < c; b++)
            this.varList_[b].incrSequence();
    else
        for (b = 0,
        c = arguments.length; b < c; b++) {
            var d = arguments[b];
            this.checkIndex_(d);
            this.varList_[d].incrSequence()
        }
}
;
mpl$lab$model$VarsList.prototype.numVariables = function() {
    return this.varList_.length
}
;
mpl$lab$model$VarsList.prototype.printOneHistory = function(a) {
    var b = "";
    if (this.history_ && a <= this.histArray_.length) {
        a = this.histArray_[this.histArray_.length - a];
        b = "//time = " + mpl$lab$util$Util.NF5(a[a.length - 1]);
        for (var c = 0, d = a.length - 1; c < d; c++)
            b += "\nsim.getVarsList().setValue(" + c + ", " + a[c] + ");"
    }
    return b
}
;
mpl$lab$model$VarsList.prototype.printHistory = function(a) {
    if (goog.isNumber(a))
        return this.printOneHistory(a);
    a = this.printOneHistory(10);
    a += "\n" + this.printOneHistory(3);
    a += "\n" + this.printOneHistory(2);
    return a += "\n" + this.printOneHistory(1)
}
;
mpl$lab$model$VarsList.prototype.saveHistory = function() {
    if (this.history_) {
        var a = this.getValues();
        a.push(this.getTime());
        this.histArray_.push(a);
        20 < this.histArray_.length && this.histArray_.shift()
    }
}
;
mpl$lab$model$VarsList.prototype.setComputed = function(a) {
    for (var b = 0, c = arguments.length; b < c; b++) {
        var d = arguments[b];
        this.checkIndex_(d);
        this.varList_[d].setComputed(!0)
    }
}
;
mpl$lab$model$VarsList.prototype.setHistory = function(a) {
    this.history_ = a
}
;
mpl$lab$model$VarsList.prototype.setTime = function(a) {
    this.setValue(this.timeIdx_, a)
}
;
mpl$lab$model$VarsList.prototype.setValue = function(a, b, c) {
    this.checkIndex_(a);
    a = this.varList_[a];
    if (a.getName() != mpl$lab$model$VarsList.DELETED) {
        if (isNaN(b) && !a.isComputed())
            throw Error("cannot set variable " + a.getName() + " to NaN");
        c ? a.setValueSmooth(b) : a.setValue(b)
    }
}
;
mpl$lab$model$VarsList.prototype.setValues = function(a, b) {
    var c = this.varList_.length
      , d = a.length;
    if (d > c)
        throw Error("setValues bad length n=" + d + " > N=" + c);
    for (var e = 0; e < c; e++)
        e < d && this.setValue(e, a[e], b)
}
;
mpl$lab$model$VarsList.prototype.timeIndex = function() {
    return this.timeIdx_
}
;
mpl$lab$model$VarsList.prototype.toArray = function() {
    return goog.array.clone(this.varList_)
}
;
mpl$lab$model$VarsList.VARS_MODIFIED = "VARS_MODIFIED";
mpl$lab$model$VarsList.DELETED = "DELETED";
mpl$lab$model$VarsList.TIME = "TIME";
mpl$lab$model$VarsList.en = {
    TIME: "time"
};
mpl$lab$model$VarsList.de_strings = {
    TIME: "Zeit"
};
mpl$lab$model$VarsList.i18n = "de" === goog.LOCALE ? mpl$lab$model$VarsList.de_strings : mpl$lab$model$VarsList.en;
var mpl$lab$graph$GraphLine = function(a, b, c) {
    mpl$lab$util$AbstractSubject.call(this, a);
    this.varsList_ = b;
    b.addObserver(this);
    this.yVar_ = this.xVar_ = -1;
    this.yVarParam_ = (new mpl$lab$util$ParameterNumber(this,mpl$lab$graph$GraphLine.en.Y_VARIABLE,mpl$lab$graph$GraphLine.i18n.Y_VARIABLE,goog.bind(this.getYVariable, this),goog.bind(this.setYVariable, this))).setLowerLimit(-1);
    this.addParameter(this.yVarParam_);
    this.xVarParam_ = (new mpl$lab$util$ParameterNumber(this,mpl$lab$graph$GraphLine.en.X_VARIABLE,mpl$lab$graph$GraphLine.i18n.X_VARIABLE,goog.bind(this.getXVariable, this),goog.bind(this.setXVariable, this))).setLowerLimit(-1);
    this.addParameter(this.xVarParam_);
    this.buildMenu();
    this.dataPoints_ = new mpl$lab$util$CircularList(c || 1E5);
    this.drawColor_ = "lime";
    this.drawMode_ = mpl$lab$view$DrawingMode.LINES;
    this.lineWidth_ = 1;
    this.hotSpotColor_ = "red";
    this.styles_ = [];
    this.addGraphStyle();
    this.xTransform = function(a, b) {
        return a
    }
    ;
    this.yTransform = function(a, b) {
        return b
    }
    ;
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$graph$GraphLine.en.LINE_WIDTH,mpl$lab$graph$GraphLine.i18n.LINE_WIDTH,goog.bind(this.getLineWidth, this),goog.bind(this.setLineWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$graph$GraphLine.en.DRAWING_MODE,mpl$lab$graph$GraphLine.i18n.DRAWING_MODE,goog.bind(this.getDrawingMode, this),goog.bind(function(a) {
        this.setDrawingMode(mpl$lab$view$DrawingMode.stringToEnum(a))
    }, this),mpl$lab$view$DrawingMode.getChoices(),mpl$lab$view$DrawingMode.getValues()));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$graph$GraphLine.en.GRAPH_COLOR,mpl$lab$graph$GraphLine.i18n.GRAPH_COLOR,goog.bind(this.getColor, this),goog.bind(this.setColor, this)))
};
$jscomp.inherits(mpl$lab$graph$GraphLine, mpl$lab$util$AbstractSubject);
mpl$lab$graph$GraphLine.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ', drawColor_:"' + this.drawColor_ + '", lineWidth_: ' + mpl$lab$util$Util.NF(this.lineWidth_) + ", drawMode_: " + mpl$lab$view$DrawingMode.enumToChoice(this.drawMode_) + ', hotSpotColor_:"' + this.hotSpotColor_ + '", styles_.length: ' + mpl$lab$util$Util.NF(this.styles_.length) + ", varsList: " + this.varsList_.toStringShort() + ", dataPoints_: " + this.dataPoints_ + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$graph$GraphLine.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", xVar: " + mpl$lab$util$Util.NF(this.xVar_) + ", yVar: " + mpl$lab$util$Util.NF(this.yVar_) + "}"
}
;
mpl$lab$graph$GraphLine.prototype.getClassName = function() {
    return "GraphLine"
}
;
mpl$lab$graph$GraphLine.prototype.addGraphStyle = function() {
    this.styles_.push(new mpl$lab$graph$GraphStyle(this.dataPoints_.getEndIndex() + 1,this.drawMode_,this.drawColor_,this.lineWidth_))
}
;
mpl$lab$graph$GraphLine.prototype.buildMenu = function() {
    for (var a = [mpl$lab$graph$GraphLine.i18n.NONE], b = [-1], c = 0, d = this.varsList_.numVariables(); c < d; c++)
        a.push(this.varsList_.getVariable(c).getName(!0)),
        b.push(c);
    this.yVarParam_.setChoices(a, b);
    this.xVarParam_.setChoices(a, b)
}
;
mpl$lab$graph$GraphLine.isDuckType = function(a) {
    return a instanceof mpl$lab$graph$GraphLine ? !0 : mpl$lab$util$Util.ADVANCED ? !1 : goog.isObject(a) && void 0 !== a.setXVariable && void 0 !== a.setYVariable && void 0 !== a.setColor && void 0 !== a.setLineWidth && void 0 !== a.setAxes && void 0 !== a.getVarsList && void 0 !== a.reset && void 0 !== a.getGraphStyle
}
;
mpl$lab$graph$GraphLine.prototype.getColor = function() {
    return this.drawColor_
}
;
mpl$lab$graph$GraphLine.prototype.getDrawingMode = function() {
    return this.drawMode_
}
;
mpl$lab$graph$GraphLine.prototype.getGraphPoints = function() {
    return this.dataPoints_
}
;
mpl$lab$graph$GraphLine.prototype.getGraphStyle = function(a) {
    var b = this.styles_;
    if (0 == b.length)
        throw Error("graph styles list is empty");
    for (var c = b[0], d = 1, e = b.length; d < e; d++) {
        var f = b[d];
        goog.asserts.assert(c.index_ <= f.index_);
        if (f.index_ > a)
            break;
        c = f
    }
    goog.asserts.assertObject(c);
    return c
}
;
mpl$lab$graph$GraphLine.prototype.getHotSpotColor = function() {
    return this.hotSpotColor_
}
;
mpl$lab$graph$GraphLine.prototype.getLineWidth = function() {
    return this.lineWidth_
}
;
mpl$lab$graph$GraphLine.prototype.getVarsList = function() {
    return this.varsList_
}
;
mpl$lab$graph$GraphLine.prototype.getXVariable = function() {
    return this.xVar_
}
;
mpl$lab$graph$GraphLine.prototype.getXVarName = function() {
    return -1 < this.xVar_ ? this.varsList_.getVariable(this.xVar_).getName(!0) : ""
}
;
mpl$lab$graph$GraphLine.prototype.getYVariable = function() {
    return this.yVar_
}
;
mpl$lab$graph$GraphLine.prototype.getYVarName = function() {
    return -1 < this.yVar_ ? this.varsList_.getVariable(this.yVar_).getName(!0) : ""
}
;
mpl$lab$graph$GraphLine.prototype.memorize = function() {
    if (-1 < this.xVar_ && -1 < this.yVar_) {
        var a = this.varsList_.getVariable(this.xVar_)
          , b = this.varsList_.getVariable(this.yVar_)
          , c = a.getValue()
          , d = b.getValue()
          , e = this.xTransform(c, d);
        c = this.yTransform(c, d);
        a = a.getSequence();
        b = b.getSequence();
        e = new mpl$lab$graph$GraphPoint(e,c,a,b);
        b = this.dataPoints_.getEndValue();
        null != b && b.equals(e) || this.dataPoints_.store(e)
    }
}
;
mpl$lab$graph$GraphLine.prototype.observe = function(a) {
    a.getSubject() == this.varsList_ && a.nameEquals(mpl$lab$model$VarsList.VARS_MODIFIED) && this.buildMenu()
}
;
mpl$lab$graph$GraphLine.prototype.reset = function() {
    this.dataPoints_.reset();
    this.resetStyle();
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$graph$GraphLine.RESET))
}
;
mpl$lab$graph$GraphLine.prototype.resetStyle = function() {
    this.styles_ = [];
    this.addGraphStyle()
}
;
mpl$lab$graph$GraphLine.prototype.setColor = function(a) {
    this.drawColor_ != a && (this.drawColor_ = a,
    this.addGraphStyle(),
    this.broadcastParameter(mpl$lab$graph$GraphLine.en.GRAPH_COLOR))
}
;
mpl$lab$graph$GraphLine.prototype.setDrawingMode = function(a) {
    var b = mpl$lab$view$DrawingMode.stringToEnum(a);
    goog.asserts.assert(b == a);
    this.drawMode_ != b && (this.drawMode_ = b,
    this.addGraphStyle());
    this.broadcastParameter(mpl$lab$graph$GraphLine.en.DRAWING_MODE)
}
;
mpl$lab$graph$GraphLine.prototype.setHotSpotColor = function(a) {
    this.hotSpotColor_ = a
}
;
mpl$lab$graph$GraphLine.prototype.setLineWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.lineWidth_) && (this.lineWidth_ = a,
    this.addGraphStyle(),
    this.broadcastParameter(mpl$lab$graph$GraphLine.en.LINE_WIDTH))
}
;
mpl$lab$graph$GraphLine.prototype.setXVariable = function(a) {
    if (-1 > a || a > this.varsList_.numVariables() - 1)
        throw Error("setXVariable bad index " + a);
    a != this.xVar_ && (this.xVar_ = a,
    this.reset(),
    this.broadcastParameter(mpl$lab$graph$GraphLine.en.X_VARIABLE))
}
;
mpl$lab$graph$GraphLine.prototype.setYVariable = function(a) {
    if (-1 > a || a > this.varsList_.numVariables() - 1)
        throw Error("setYVariable bad index " + a);
    a != this.yVar_ && (this.yVar_ = a,
    this.reset(),
    this.broadcastParameter(mpl$lab$graph$GraphLine.en.Y_VARIABLE))
}
;
mpl$lab$graph$GraphLine.RESET = "RESET";
mpl$lab$graph$GraphLine.en = {
    DRAWING_MODE: "draw mode",
    GRAPH_COLOR: "graph color",
    GRAPH_DRAW_MODE: "graph draw mode",
    GRAPH_POINTS: "graph points",
    LINE_WIDTH: "draw width",
    X_VARIABLE: "X variable",
    Y_VARIABLE: "Y variable",
    CLEAR_GRAPH: "clear graph",
    NONE: "-none-"
};
mpl$lab$graph$GraphLine.de_strings = {
    DRAWING_MODE: "Zeichnenart",
    GRAPH_COLOR: "Graph Farbe",
    GRAPH_DRAW_MODE: "Graph Zeichnenart",
    GRAPH_POINTS: "Punkteanzahl",
    LINE_WIDTH: "Zeichenbreite",
    X_VARIABLE: "X Variable",
    Y_VARIABLE: "Y Yariable",
    CLEAR_GRAPH: "Graph erneuern",
    NONE: "-keine-"
};
mpl$lab$graph$GraphLine.i18n = "de" === goog.LOCALE ? mpl$lab$graph$GraphLine.de_strings : mpl$lab$graph$GraphLine.en;
var mpl$lab$util$AffineTransform = function(a, b, c, d, e, f) {
    this.m11_ = a;
    this.m12_ = b;
    this.m21_ = c;
    this.m22_ = d;
    this.dx_ = e;
    this.dy_ = f
};
mpl$lab$util$AffineTransform.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "AffineTransform{m11_: " + mpl$lab$util$Util.NF(this.m11_) + ", m12_: " + mpl$lab$util$Util.NF(this.m12_) + ", m21_: " + mpl$lab$util$Util.NF(this.m21_) + ", m22_: " + mpl$lab$util$Util.NF(this.m22_) + ", dx_: " + mpl$lab$util$Util.NF(this.dx_) + ", dy_: " + mpl$lab$util$Util.NF(this.dy_) + "}"
}
;
mpl$lab$util$AffineTransform.prototype.applyTransform = function(a) {
    a.transform(this.m11_, this.m12_, this.m21_, this.m22_, this.dx_, this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.concatenate = function(a) {
    return new mpl$lab$util$AffineTransform(this.m11_ * a.m11_ + this.m21_ * a.m12_,this.m12_ * a.m11_ + this.m22_ * a.m12_,this.m11_ * a.m21_ + this.m21_ * a.m22_,this.m12_ * a.m21_ + this.m22_ * a.m22_,this.m11_ * a.dx_ + this.m21_ * a.dy_ + this.dx_,this.m12_ * a.dx_ + this.m22_ * a.dy_ + this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.lineTo = function(a, b, c) {
    a = this.transform(a, b);
    c.lineTo(a.getX(), a.getY())
}
;
mpl$lab$util$AffineTransform.prototype.moveTo = function(a, b, c) {
    a = this.transform(a, b);
    c.moveTo(a.getX(), a.getY())
}
;
mpl$lab$util$AffineTransform.prototype.rotate = function(a) {
    var b = Math.cos(a);
    a = Math.sin(a);
    return new mpl$lab$util$AffineTransform(b * this.m11_ + a * this.m21_,b * this.m12_ + a * this.m22_,-a * this.m11_ + b * this.m21_,-a * this.m12_ + b * this.m22_,this.dx_,this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.scale = function(a, b) {
    return new mpl$lab$util$AffineTransform(this.m11_ * a,this.m12_ * a,this.m21_ * b,this.m22_ * b,this.dx_,this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.setTransform = function(a) {
    a.setTransform(this.m11_, this.m12_, this.m21_, this.m22_, this.dx_, this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.transform = function(a, b) {
    goog.isNumber(a) || (b = a.getY(),
    a = a.getX());
    if (!goog.isNumber(a) || !goog.isNumber(b))
        throw Error();
    return new mpl$lab$util$Vector(this.m11_ * a + this.m21_ * b + this.dx_,this.m12_ * a + this.m22_ * b + this.dy_)
}
;
mpl$lab$util$AffineTransform.prototype.translate = function(a, b) {
    goog.isNumber(a) || (b = a.getY(),
    a = a.getX());
    if (!goog.isNumber(a) || !goog.isNumber(b))
        throw Error();
    return new mpl$lab$util$AffineTransform(this.m11_,this.m12_,this.m21_,this.m22_,this.dx_ + this.m11_ * a + this.m21_ * b,this.dy_ + this.m12_ * a + this.m22_ * b)
}
;
mpl$lab$util$AffineTransform.IDENTITY = new mpl$lab$util$AffineTransform(1,0,0,1,0,0);
var mpl$lab$view$HorizAlign = {
    LEFT: "LEFT",
    MIDDLE: "MIDDLE",
    RIGHT: "RIGHT",
    FULL: "FULL",
    VALUE: "VALUE",
    getChoices: function() {
        return [mpl$lab$view$HorizAlign.i18n.LEFT, mpl$lab$view$HorizAlign.i18n.MIDDLE, mpl$lab$view$HorizAlign.i18n.RIGHT, mpl$lab$view$HorizAlign.i18n.FULL, mpl$lab$view$HorizAlign.i18n.VALUE]
    },
    getValues: function() {
        return [mpl$lab$view$HorizAlign.LEFT, mpl$lab$view$HorizAlign.MIDDLE, mpl$lab$view$HorizAlign.RIGHT, mpl$lab$view$HorizAlign.FULL, mpl$lab$view$HorizAlign.VALUE]
    },
    stringToEnum: function(a) {
        for (var b = mpl$lab$view$HorizAlign.getValues(), c = 0, d = b.length; c < d; c++)
            if (a === b[c])
                return b[c];
        throw Error("invalid HorizAlign value:  " + a);
    },
    en: {
        LEFT: "left",
        MIDDLE: "middle",
        RIGHT: "right",
        FULL: "full",
        VALUE: "value"
    },
    de_strings: {
        LEFT: "links",
        MIDDLE: "mitte",
        RIGHT: "rechts",
        FULL: "voll",
        VALUE: "Wert"
    }
};
mpl$lab$view$HorizAlign.i18n = "de" === goog.LOCALE ? mpl$lab$view$HorizAlign.de_strings : mpl$lab$view$HorizAlign.en;
var mpl$lab$view$ScreenRect = function(a, b, c, d) {
    if (!(goog.isNumber(a) && goog.isNumber(b) && goog.isNumber(c) && goog.isNumber(d)))
        throw Error();
    if (0 > c || 0 > d)
        throw Error();
    this.left_ = a;
    this.top_ = b;
    this.width_ = c;
    this.height_ = d
};
mpl$lab$view$ScreenRect.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ScreenRect{left_: " + mpl$lab$util$Util.NF(this.left_) + ", top_: " + mpl$lab$util$Util.NF(this.top_) + ", width_: " + mpl$lab$util$Util.NF(this.width_) + ", height_: " + mpl$lab$util$Util.NF(this.height_) + "}"
}
;
mpl$lab$view$ScreenRect.clone = function(a) {
    return new mpl$lab$view$ScreenRect(a.left_,a.top_,a.width_,a.height_)
}
;
mpl$lab$view$ScreenRect.prototype.equals = function(a) {
    return this.left_ == a.left_ && this.top_ == a.top_ && this.width_ == a.width_ && this.height_ == a.height_
}
;
mpl$lab$view$ScreenRect.isDuckType = function(a) {
    return a instanceof mpl$lab$view$ScreenRect ? !0 : mpl$lab$util$Util.ADVANCED ? !1 : void 0 !== a.getLeft && void 0 !== a.getTop && void 0 !== a.getWidth && void 0 !== a.getHeight && void 0 !== a.isEmpty && void 0 !== a.equals && void 0 !== a.nearEqual
}
;
mpl$lab$view$ScreenRect.prototype.getCenterX = function() {
    return this.left_ + this.width_ / 2
}
;
mpl$lab$view$ScreenRect.prototype.getCenterY = function() {
    return this.top_ + this.height_ / 2
}
;
mpl$lab$view$ScreenRect.prototype.getHeight = function() {
    return this.height_
}
;
mpl$lab$view$ScreenRect.prototype.getLeft = function() {
    return this.left_
}
;
mpl$lab$view$ScreenRect.prototype.getTop = function() {
    return this.top_
}
;
mpl$lab$view$ScreenRect.prototype.getWidth = function() {
    return this.width_
}
;
mpl$lab$view$ScreenRect.prototype.isEmpty = function(a) {
    a = a || 1E-14;
    return this.width_ < a || this.height_ < a
}
;
mpl$lab$view$ScreenRect.prototype.makeOval = function(a) {
    var b = this.width_ / 2
      , c = this.height_ / 2;
    if (goog.isFunction(a.ellipse))
        a.beginPath(),
        a.moveTo(this.left_ + this.width_, this.top_ + c),
        a.ellipse(this.left_ + b, this.top_ + c, b, c, 0, 0, 2 * Math.PI, !1);
    else {
        var d = Math.min(b, c);
        a.beginPath();
        a.moveTo(this.left_ + this.width_, this.top_);
        a.arc(this.left_ + b, this.top_ + c, d, 0, 2 * Math.PI, !1);
        a.closePath()
    }
}
;
mpl$lab$view$ScreenRect.prototype.makeRect = function(a) {
    a.rect(this.left_, this.top_, this.width_, this.height_)
}
;
mpl$lab$view$ScreenRect.prototype.nearEqual = function(a, b) {
    return mpl$lab$util$Util.veryDifferent(this.left_, a.left_, b) || mpl$lab$util$Util.veryDifferent(this.top_, a.top_, b) || mpl$lab$util$Util.veryDifferent(this.width_, a.width_, b) || mpl$lab$util$Util.veryDifferent(this.height_, a.height_, b) ? !1 : !0
}
;
mpl$lab$view$ScreenRect.EMPTY_RECT = new mpl$lab$view$ScreenRect(0,0,0,0);
var mpl$lab$view$VerticalAlign = {
    TOP: "TOP",
    MIDDLE: "MIDDLE",
    BOTTOM: "BOTTOM",
    FULL: "FULL",
    VALUE: "VALUE",
    getChoices: function() {
        return [mpl$lab$view$VerticalAlign.i18n.TOP, mpl$lab$view$VerticalAlign.i18n.MIDDLE, mpl$lab$view$VerticalAlign.i18n.BOTTOM, mpl$lab$view$VerticalAlign.i18n.FULL, mpl$lab$view$VerticalAlign.i18n.VALUE]
    },
    getValues: function() {
        return [mpl$lab$view$VerticalAlign.TOP, mpl$lab$view$VerticalAlign.MIDDLE, mpl$lab$view$VerticalAlign.BOTTOM, mpl$lab$view$VerticalAlign.FULL, mpl$lab$view$VerticalAlign.VALUE]
    },
    stringToEnum: function(a) {
        for (var b = mpl$lab$view$VerticalAlign.getValues(), c = 0, d = b.length; c < d; c++)
            if (a === b[c])
                return b[c];
        throw Error("invalid VerticalAlign value: " + a);
    },
    en: {
        TOP: "top",
        MIDDLE: "middle",
        BOTTOM: "bottom",
        FULL: "full",
        VALUE: "value"
    },
    de_strings: {
        TOP: "oben",
        MIDDLE: "mitte",
        BOTTOM: "unten",
        FULL: "voll",
        VALUE: "Wert"
    }
};
mpl$lab$view$VerticalAlign.i18n = "de" === goog.LOCALE ? mpl$lab$view$VerticalAlign.de_strings : mpl$lab$view$VerticalAlign.en;
var mpl$lab$view$CoordMap = function(a, b, c, d, e, f) {
    this.screen_left_ = mpl$lab$util$Util.testFinite(a);
    this.screen_bottom_ = mpl$lab$util$Util.testFinite(b);
    this.sim_left_ = mpl$lab$util$Util.testFinite(c);
    this.sim_bottom_ = mpl$lab$util$Util.testFinite(d);
    this.pixel_per_unit_x_ = mpl$lab$util$Util.testFinite(e);
    this.pixel_per_unit_y_ = mpl$lab$util$Util.testFinite(f);
    a = mpl$lab$util$AffineTransform.IDENTITY;
    a = a.translate(this.screen_left_, this.screen_bottom_);
    a = a.scale(this.pixel_per_unit_x_, -this.pixel_per_unit_y_);
    this.transform_ = a = a.translate(-this.sim_left_, -this.sim_bottom_)
};
mpl$lab$view$CoordMap.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "CoordMap{screen_left_: " + mpl$lab$util$Util.NF(this.screen_left_) + ", screen_bottom_: " + mpl$lab$util$Util.NF(this.screen_bottom_) + ", sim_left_: " + mpl$lab$util$Util.NF(this.sim_left_) + ", sim_bottom_: " + mpl$lab$util$Util.NF(this.sim_bottom_) + ", pixels_per_unit_x_: " + mpl$lab$util$Util.NF(this.pixel_per_unit_x_) + ", pixels_per_unit_y_: " + mpl$lab$util$Util.NF(this.pixel_per_unit_y_) + (null != this.transform_) ? ", transform: " + this.transform_ : "}"
}
;
mpl$lab$view$CoordMap.make = function(a, b, c, d, e) {
    c = mpl$lab$view$HorizAlign.stringToEnum(c || mpl$lab$view$HorizAlign.MIDDLE);
    d = mpl$lab$view$VerticalAlign.stringToEnum(d || mpl$lab$view$VerticalAlign.MIDDLE);
    e = e || 1;
    if (e < mpl$lab$view$CoordMap.MIN_SIZE || !isFinite(e))
        throw Error("bad aspectRatio " + e);
    var f = b.getLeft()
      , g = b.getBottom()
      , h = b.getRight() - f
      , k = b.getTop() - g;
    if (h < mpl$lab$view$CoordMap.MIN_SIZE || k < mpl$lab$view$CoordMap.MIN_SIZE)
        throw Error("simRect cannot be empty " + b);
    b = a.getTop();
    var l = a.getLeft()
      , m = a.getWidth();
    a = a.getHeight();
    var n = 0
      , p = 0
      , q = 0
      , r = 0;
    c == mpl$lab$view$HorizAlign.FULL && (q = m / h,
    n = 0);
    d == mpl$lab$view$VerticalAlign.FULL && (r = a / k,
    p = 0);
    if (c != mpl$lab$view$HorizAlign.FULL || d != mpl$lab$view$VerticalAlign.FULL)
        if (c == mpl$lab$view$HorizAlign.FULL ? (r = q * e,
        n = !0) : d == mpl$lab$view$VerticalAlign.FULL ? (q = r / e,
        n = !1) : (q = m / h,
        r = q * e,
        n = !0,
        p = Math.floor(.5 + r * k),
        a < p && (r = a / k,
        q = r / e,
        n = !1)),
        n)
            switch (goog.asserts.assert(d != mpl$lab$view$VerticalAlign.FULL),
            n = 0,
            p = Math.floor(.5 + k * r),
            d) {
            case mpl$lab$view$VerticalAlign.BOTTOM:
                p = 0;
                break;
            case mpl$lab$view$VerticalAlign.MIDDLE:
                p = (a - p) / 2;
                break;
            case mpl$lab$view$VerticalAlign.TOP:
                p = a - p;
                break;
            default:
                throw Error("unsupported alignment " + d);
            }
        else
            switch (goog.asserts.assert(c != mpl$lab$view$HorizAlign.FULL),
            p = 0,
            d = Math.floor(.5 + h * q),
            c) {
            case mpl$lab$view$HorizAlign.LEFT:
                n = 0;
                break;
            case mpl$lab$view$HorizAlign.MIDDLE:
                n = (m - d) / 2;
                break;
            case mpl$lab$view$HorizAlign.RIGHT:
                n = m - d;
                break;
            default:
                throw Error("unsupported alignment " + c);
            }
    return new mpl$lab$view$CoordMap(l,b + a,f - n / q,g - p / r,q,r)
}
;
mpl$lab$view$CoordMap.isDuckType = function(a) {
    return a instanceof mpl$lab$view$CoordMap ? !0 : mpl$lab$util$Util.ADVANCED ? !1 : void 0 !== a.getAffineTransform && void 0 !== a.simToScreenX && void 0 !== a.simToScreenY && void 0 !== a.screenToSimX && void 0 !== a.screenToSimY && void 0 !== a.getScaleX && void 0 !== a.getScaleY
}
;
mpl$lab$view$CoordMap.prototype.getAffineTransform = function() {
    return this.transform_
}
;
mpl$lab$view$CoordMap.prototype.getScaleX = function() {
    return this.pixel_per_unit_x_
}
;
mpl$lab$view$CoordMap.prototype.getScaleY = function() {
    return this.pixel_per_unit_y_
}
;
mpl$lab$view$CoordMap.prototype.screenToSim = function(a, b) {
    goog.isNumber(a) || (b = a.getY(),
    a = a.getX());
    if (!goog.isNumber(a) || !goog.isNumber(b))
        throw Error();
    return new mpl$lab$util$Vector(this.screenToSimX(a),this.screenToSimY(b))
}
;
mpl$lab$view$CoordMap.prototype.screenToSimRect = function(a) {
    return new mpl$lab$util$DoubleRect(this.screenToSimX(a.getLeft()),this.screenToSimY(a.getTop() + a.getHeight()),this.screenToSimX(a.getLeft() + a.getWidth()),this.screenToSimY(a.getTop()))
}
;
mpl$lab$view$CoordMap.prototype.screenToSimScaleX = function(a) {
    return a / this.pixel_per_unit_x_
}
;
mpl$lab$view$CoordMap.prototype.screenToSimScaleY = function(a) {
    return a / this.pixel_per_unit_y_
}
;
mpl$lab$view$CoordMap.prototype.screenToSimX = function(a) {
    return this.sim_left_ + (a - this.screen_left_) / this.pixel_per_unit_x_
}
;
mpl$lab$view$CoordMap.prototype.screenToSimY = function(a) {
    return this.sim_bottom_ + (this.screen_bottom_ - a) / this.pixel_per_unit_y_
}
;
mpl$lab$view$CoordMap.prototype.simToScreen = function(a) {
    return new mpl$lab$util$Vector(this.simToScreenX(a.getX()),this.simToScreenY(a.getY()))
}
;
mpl$lab$view$CoordMap.prototype.simToScreenRect = function(a) {
    return new mpl$lab$view$ScreenRect(this.simToScreenX(a.getLeft()),this.simToScreenY(a.getTop()),this.simToScreenScaleX(a.getWidth()),this.simToScreenScaleY(a.getHeight()))
}
;
mpl$lab$view$CoordMap.prototype.simToScreenScaleX = function(a) {
    return a * this.pixel_per_unit_x_
}
;
mpl$lab$view$CoordMap.prototype.simToScreenScaleY = function(a) {
    return a * this.pixel_per_unit_y_
}
;
mpl$lab$view$CoordMap.prototype.simToScreenX = function(a) {
    return this.screen_left_ + (a - this.sim_left_) * this.pixel_per_unit_x_
}
;
mpl$lab$view$CoordMap.prototype.simToScreenY = function(a) {
    return this.screen_bottom_ - (a - this.sim_bottom_) * this.pixel_per_unit_y_
}
;
mpl$lab$view$CoordMap.MIN_SIZE = 1E-15;
var mpl$lab$model$SimObject = function(a) {};
mpl$lab$model$SimObject.prototype.getBoundsWorld = function() {}
;
mpl$lab$model$SimObject.prototype.getExpireTime = function() {}
;
mpl$lab$model$SimObject.prototype.getName = function(a) {}
;
mpl$lab$model$SimObject.prototype.isMassObject = function() {}
;
mpl$lab$model$SimObject.prototype.nameEquals = function(a) {}
;
mpl$lab$model$SimObject.prototype.setExpireTime = function(a) {}
;
mpl$lab$model$SimObject.prototype.similar = function(a, b) {}
;
var mpl$lab$model$MassObject = function(a) {};
mpl$lab$model$MassObject.prototype.alignTo = function(a, b, c) {}
;
mpl$lab$model$MassObject.prototype.bodyToWorld = function(a) {}
;
mpl$lab$model$MassObject.prototype.bodyToWorldTransform = function() {}
;
mpl$lab$model$MassObject.prototype.createCanvasPath = function(a) {}
;
mpl$lab$model$MassObject.prototype.getAngle = function() {}
;
mpl$lab$model$MassObject.prototype.getAngularVelocity = function() {}
;
mpl$lab$model$MassObject.prototype.getBottomBody = function() {}
;
mpl$lab$model$MassObject.prototype.getBottomWorld = function() {}
;
mpl$lab$model$MassObject.prototype.getBoundsBody = function() {}
;
mpl$lab$model$MassObject.prototype.getCenterOfMassBody = function() {}
;
mpl$lab$model$MassObject.prototype.getCentroidBody = function() {}
;
mpl$lab$model$MassObject.prototype.getCentroidRadius = function() {}
;
mpl$lab$model$MassObject.prototype.getCentroidWorld = function() {}
;
mpl$lab$model$MassObject.prototype.getDragPoints = function() {}
;
mpl$lab$model$MassObject.prototype.getHeight = function() {}
;
mpl$lab$model$MassObject.prototype.getKineticEnergy = function() {}
;
mpl$lab$model$MassObject.prototype.getLeftBody = function() {}
;
mpl$lab$model$MassObject.prototype.getLeftWorld = function() {}
;
mpl$lab$model$MassObject.prototype.getMass = function() {}
;
mpl$lab$model$MassObject.prototype.getMinHeight = function() {}
;
mpl$lab$model$MassObject.prototype.getPosition = function() {}
;
mpl$lab$model$MassObject.prototype.getRightBody = function() {}
;
mpl$lab$model$MassObject.prototype.getRightWorld = function() {}
;
mpl$lab$model$MassObject.prototype.getTopBody = function() {}
;
mpl$lab$model$MassObject.prototype.getTopWorld = function() {}
;
mpl$lab$model$MassObject.prototype.getVelocity = function(a) {}
;
mpl$lab$model$MassObject.prototype.getVerticesBody = function() {}
;
mpl$lab$model$MassObject.prototype.getWidth = function() {}
;
mpl$lab$model$MassObject.prototype.getZeroEnergyLevel = function() {}
;
mpl$lab$model$MassObject.prototype.momentAboutCM = function() {}
;
mpl$lab$model$MassObject.prototype.momentum = function() {}
;
mpl$lab$model$MassObject.prototype.rotationalEnergy = function() {}
;
mpl$lab$model$MassObject.prototype.rotateBodyToWorld = function(a) {}
;
mpl$lab$model$MassObject.prototype.rotateWorldToBody = function(a) {}
;
mpl$lab$model$MassObject.prototype.setAngle = function(a) {}
;
mpl$lab$model$MassObject.prototype.setAngularVelocity = function(a) {}
;
mpl$lab$model$MassObject.prototype.setCenterOfMass = function(a, b) {}
;
mpl$lab$model$MassObject.prototype.setDragPoints = function(a) {}
;
mpl$lab$model$MassObject.prototype.setMass = function(a) {}
;
mpl$lab$model$MassObject.prototype.setMinHeight = function(a) {}
;
mpl$lab$model$MassObject.prototype.setMomentAboutCM = function(a) {}
;
mpl$lab$model$MassObject.prototype.setPosition = function(a, b) {}
;
mpl$lab$model$MassObject.prototype.setVelocity = function(a, b) {}
;
mpl$lab$model$MassObject.prototype.setZeroEnergyLevel = function(a) {}
;
mpl$lab$model$MassObject.prototype.translationalEnergy = function() {}
;
mpl$lab$model$MassObject.prototype.worldToBody = function(a) {}
;
var mpl$lab$view$DisplayObject = function(a) {};
mpl$lab$view$DisplayObject.prototype.contains = function(a) {}
;
mpl$lab$view$DisplayObject.prototype.draw = function(a, b) {}
;
mpl$lab$view$DisplayObject.prototype.isDragable = function() {}
;
mpl$lab$view$DisplayObject.prototype.getMassObjects = function() {}
;
mpl$lab$view$DisplayObject.prototype.getPosition = function() {}
;
mpl$lab$view$DisplayObject.prototype.getSimObjects = function() {}
;
mpl$lab$view$DisplayObject.prototype.getZIndex = function() {}
;
mpl$lab$view$DisplayObject.prototype.setDragable = function(a) {}
;
mpl$lab$view$DisplayObject.prototype.setPosition = function(a) {}
;
mpl$lab$view$DisplayObject.prototype.setZIndex = function(a) {}
;
goog.color = {};
goog.color.names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
goog.math = {};
goog.math.randomInt = function(a) {
    return Math.floor(Math.random() * a)
}
;
goog.math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a)
}
;
goog.math.clamp = function(a, b, c) {
    return Math.min(Math.max(a, b), c)
}
;
goog.math.modulo = function(a, b) {
    a %= b;
    return 0 > a * b ? a + b : a
}
;
goog.math.lerp = function(a, b, c) {
    return a + c * (b - a)
}
;
goog.math.nearlyEquals = function(a, b, c) {
    return Math.abs(a - b) <= (c || 1E-6)
}
;
goog.math.standardAngle = function(a) {
    return goog.math.modulo(a, 360)
}
;
goog.math.standardAngleInRadians = function(a) {
    return goog.math.modulo(a, 2 * Math.PI)
}
;
goog.math.toRadians = function(a) {
    return a * Math.PI / 180
}
;
goog.math.toDegrees = function(a) {
    return 180 * a / Math.PI
}
;
goog.math.angleDx = function(a, b) {
    return b * Math.cos(goog.math.toRadians(a))
}
;
goog.math.angleDy = function(a, b) {
    return b * Math.sin(goog.math.toRadians(a))
}
;
goog.math.angle = function(a, b, c, d) {
    return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
}
;
goog.math.angleDifference = function(a, b) {
    a = goog.math.standardAngle(b) - goog.math.standardAngle(a);
    180 < a ? a -= 360 : -180 >= a && (a = 360 + a);
    return a
}
;
goog.math.sign = function(a) {
    return 0 < a ? 1 : 0 > a ? -1 : a
}
;
goog.math.longestCommonSubsequence = function(a, b, c, d) {
    c = c || function(a, b) {
        return a == b
    }
    ;
    d = d || function(b, c) {
        return a[b]
    }
    ;
    for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++)
        g[h] = [],
        g[h][0] = 0;
    for (var k = 0; k < f + 1; k++)
        g[0][k] = 0;
    for (h = 1; h <= e; h++)
        for (k = 1; k <= f; k++)
            c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    var l = [];
    h = e;
    for (k = f; 0 < h && 0 < k; )
        c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)),
        h--,
        k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
    return l
}
;
goog.math.sum = function(a) {
    return goog.array.reduce(arguments, function(a, c) {
        return a + c
    }, 0)
}
;
goog.math.average = function(a) {
    return goog.math.sum.apply(null, arguments) / arguments.length
}
;
goog.math.sampleVariance = function(a) {
    var b = arguments.length;
    if (2 > b)
        return 0;
    var c = goog.math.average.apply(null, arguments);
    return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
        return Math.pow(a - c, 2)
    })) / (b - 1)
}
;
goog.math.standardDeviation = function(a) {
    return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
}
;
goog.math.isInt = function(a) {
    return isFinite(a) && 0 == a % 1
}
;
goog.math.isFiniteNumber = function(a) {
    return isFinite(a)
}
;
goog.math.isNegativeZero = function(a) {
    return 0 == a && 0 > 1 / a
}
;
goog.math.log10Floor = function(a) {
    if (0 < a) {
        var b = Math.round(Math.log(a) * Math.LOG10E);
        return b - (parseFloat("1e" + b) > a ? 1 : 0)
    }
    return 0 == a ? -Infinity : NaN
}
;
goog.math.safeFloor = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.floor(a + (b || 2E-15))
}
;
goog.math.safeCeil = function(a, b) {
    goog.asserts.assert(!goog.isDef(b) || 0 < b);
    return Math.ceil(a - (b || 2E-15))
}
;
goog.color.parse = function(a) {
    var b = {};
    a = String(a);
    var c = goog.color.prependHashIfNecessaryHelper(a);
    if (goog.color.isValidHexColor_(c))
        return b.hex = goog.color.normalizeHex(c),
        b.type = "hex",
        b;
    c = goog.color.isValidRgbColor_(a);
    if (c.length)
        return b.hex = goog.color.rgbArrayToHex(c),
        b.type = "rgb",
        b;
    if (goog.color.names && (c = goog.color.names[a.toLowerCase()]))
        return b.hex = c,
        b.type = "named",
        b;
    throw Error(a + " is not a valid color string");
}
;
goog.color.isValidColor = function(a) {
    var b = goog.color.prependHashIfNecessaryHelper(a);
    return !!(goog.color.isValidHexColor_(b) || goog.color.isValidRgbColor_(a).length || goog.color.names && goog.color.names[a.toLowerCase()])
}
;
goog.color.parseRgb = function(a) {
    var b = goog.color.isValidRgbColor_(a);
    if (!b.length)
        throw Error(a + " is not a valid RGB color");
    return b
}
;
goog.color.hexToRgbStyle = function(a) {
    return goog.color.rgbStyle_(goog.color.hexToRgb(a))
}
;
goog.color.hexTripletRe_ = /#(.)(.)(.)/;
goog.color.normalizeHex = function(a) {
    if (!goog.color.isValidHexColor_(a))
        throw Error("'" + a + "' is not a valid hex color");
    4 == a.length && (a = a.replace(goog.color.hexTripletRe_, "#$1$1$2$2$3$3"));
    return a.toLowerCase()
}
;
goog.color.hexToRgb = function(a) {
    a = goog.color.normalizeHex(a);
    var b = parseInt(a.substr(1, 2), 16)
      , c = parseInt(a.substr(3, 2), 16);
    a = parseInt(a.substr(5, 2), 16);
    return [b, c, a]
}
;
goog.color.rgbToHex = function(a, b, c) {
    a = Number(a);
    b = Number(b);
    c = Number(c);
    if (a != (a & 255) || b != (b & 255) || c != (c & 255))
        throw Error('"(' + a + "," + b + "," + c + '") is not a valid RGB color');
    a = goog.color.prependZeroIfNecessaryHelper(a.toString(16));
    b = goog.color.prependZeroIfNecessaryHelper(b.toString(16));
    c = goog.color.prependZeroIfNecessaryHelper(c.toString(16));
    return "#" + a + b + c
}
;
goog.color.rgbArrayToHex = function(a) {
    return goog.color.rgbToHex(a[0], a[1], a[2])
}
;
goog.color.rgbToHsl = function(a, b, c) {
    a /= 255;
    b /= 255;
    c /= 255;
    var d = Math.max(a, b, c)
      , e = Math.min(a, b, c)
      , f = 0
      , g = 0
      , h = .5 * (d + e);
    d != e && (d == a ? f = 60 * (b - c) / (d - e) : d == b ? f = 60 * (c - a) / (d - e) + 120 : d == c && (f = 60 * (a - b) / (d - e) + 240),
    g = 0 < h && .5 >= h ? (d - e) / (2 * h) : (d - e) / (2 - 2 * h));
    return [Math.round(f + 360) % 360, g, h]
}
;
goog.color.rgbArrayToHsl = function(a) {
    return goog.color.rgbToHsl(a[0], a[1], a[2])
}
;
goog.color.hueToRgb_ = function(a, b, c) {
    0 > c ? c += 1 : 1 < c && --c;
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
}
;
goog.color.hslToRgb = function(a, b, c) {
    a /= 360;
    if (0 == b)
        c = b = a = 255 * c;
    else {
        var d = .5 > c ? c * (1 + b) : c + b - b * c;
        var e = 2 * c - d;
        c = 255 * goog.color.hueToRgb_(e, d, a + 1 / 3);
        b = 255 * goog.color.hueToRgb_(e, d, a);
        a = 255 * goog.color.hueToRgb_(e, d, a - 1 / 3)
    }
    return [Math.round(c), Math.round(b), Math.round(a)]
}
;
goog.color.hslArrayToRgb = function(a) {
    return goog.color.hslToRgb(a[0], a[1], a[2])
}
;
goog.color.validHexColorRe_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
goog.color.isValidHexColor_ = function(a) {
    return goog.color.validHexColorRe_.test(a)
}
;
goog.color.normalizedHexColorRe_ = /^#[0-9a-f]{6}$/;
goog.color.isNormalizedHexColor_ = function(a) {
    return goog.color.normalizedHexColorRe_.test(a)
}
;
goog.color.rgbColorRe_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
goog.color.isValidRgbColor_ = function(a) {
    var b = a.match(goog.color.rgbColorRe_);
    if (b) {
        a = Number(b[1]);
        var c = Number(b[2]);
        b = Number(b[3]);
        if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b)
            return [a, c, b]
    }
    return []
}
;
goog.color.prependZeroIfNecessaryHelper = function(a) {
    return 1 == a.length ? "0" + a : a
}
;
goog.color.prependHashIfNecessaryHelper = function(a) {
    return "#" == a.charAt(0) ? a : "#" + a
}
;
goog.color.rgbStyle_ = function(a) {
    return "rgb(" + a.join(",") + ")"
}
;
goog.color.hsvToRgb = function(a, b, c) {
    var d = 0
      , e = 0
      , f = 0;
    if (0 == b)
        f = e = d = c;
    else {
        var g = Math.floor(a / 60)
          , h = a / 60 - g;
        a = c * (1 - b);
        var k = c * (1 - b * h);
        b = c * (1 - b * (1 - h));
        switch (g) {
        case 1:
            d = k;
            e = c;
            f = a;
            break;
        case 2:
            d = a;
            e = c;
            f = b;
            break;
        case 3:
            d = a;
            e = k;
            f = c;
            break;
        case 4:
            d = b;
            e = a;
            f = c;
            break;
        case 5:
            d = c;
            e = a;
            f = k;
            break;
        case 6:
        case 0:
            d = c,
            e = b,
            f = a
        }
    }
    return [Math.floor(d), Math.floor(e), Math.floor(f)]
}
;
goog.color.rgbToHsv = function(a, b, c) {
    var d = Math.max(Math.max(a, b), c)
      , e = Math.min(Math.min(a, b), c);
    if (e == d)
        e = a = 0;
    else {
        var f = d - e;
        e = f / d;
        a = 60 * (a == d ? (b - c) / f : b == d ? 2 + (c - a) / f : 4 + (a - b) / f);
        0 > a && (a += 360);
        360 < a && (a -= 360)
    }
    return [a, e, d]
}
;
goog.color.rgbArrayToHsv = function(a) {
    return goog.color.rgbToHsv(a[0], a[1], a[2])
}
;
goog.color.hsvArrayToRgb = function(a) {
    return goog.color.hsvToRgb(a[0], a[1], a[2])
}
;
goog.color.hexToHsl = function(a) {
    a = goog.color.hexToRgb(a);
    return goog.color.rgbToHsl(a[0], a[1], a[2])
}
;
goog.color.hslToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a, b, c))
}
;
goog.color.hslArrayToHex = function(a) {
    return goog.color.rgbArrayToHex(goog.color.hslToRgb(a[0], a[1], a[2]))
}
;
goog.color.hexToHsv = function(a) {
    return goog.color.rgbArrayToHsv(goog.color.hexToRgb(a))
}
;
goog.color.hsvToHex = function(a, b, c) {
    return goog.color.rgbArrayToHex(goog.color.hsvToRgb(a, b, c))
}
;
goog.color.hsvArrayToHex = function(a) {
    return goog.color.hsvToHex(a[0], a[1], a[2])
}
;
goog.color.hslDistance = function(a, b) {
    var c = .5 >= a[2] ? a[1] * a[2] : a[1] * (1 - a[2]);
    var d = .5 >= b[2] ? b[1] * b[2] : b[1] * (1 - b[2]);
    return (a[2] - b[2]) * (a[2] - b[2]) + c * c + d * d - 2 * c * d * Math.cos(2 * (a[0] / 360 - b[0] / 360) * Math.PI)
}
;
goog.color.blend = function(a, b, c) {
    c = goog.math.clamp(c, 0, 1);
    return [Math.round(c * a[0] + (1 - c) * b[0]), Math.round(c * a[1] + (1 - c) * b[1]), Math.round(c * a[2] + (1 - c) * b[2])]
}
;
goog.color.darken = function(a, b) {
    return goog.color.blend([0, 0, 0], a, b)
}
;
goog.color.lighten = function(a, b) {
    return goog.color.blend([255, 255, 255], a, b)
}
;
goog.color.highContrast = function(a, b) {
    for (var c = [], d = 0; d < b.length; d++)
        c.push({
            color: b[d],
            diff: goog.color.yiqBrightnessDiff_(b[d], a) + goog.color.colorDiff_(b[d], a)
        });
    c.sort(function(a, b) {
        return b.diff - a.diff
    });
    return c[0].color
}
;
goog.color.yiqBrightness_ = function(a) {
    return Math.round((299 * a[0] + 587 * a[1] + 114 * a[2]) / 1E3)
}
;
goog.color.yiqBrightnessDiff_ = function(a, b) {
    return Math.abs(goog.color.yiqBrightness_(a) - goog.color.yiqBrightness_(b))
}
;
goog.color.colorDiff_ = function(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])
}
;
var mpl$lab$model$AbstractSimObject = function(a, b) {
    a = a || "SIM_OBJ" + mpl$lab$model$AbstractSimObject.ID++;
    this.name_ = mpl$lab$util$Util.validName(mpl$lab$util$Util.toName(a));
    this.localName_ = b || a;
    this.expireTime_ = mpl$lab$util$Util.POSITIVE_INFINITY
};
mpl$lab$model$AbstractSimObject.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{name_: "' + this.getName() + '", expireTime_: ' + mpl$lab$util$Util.NF(this.expireTime_) + "}"
}
;
mpl$lab$model$AbstractSimObject.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{name_: "' + this.getName() + '"}'
}
;
mpl$lab$model$AbstractSimObject.prototype.getBoundsWorld = function() {}
;
mpl$lab$model$AbstractSimObject.prototype.getClassName = function() {}
;
mpl$lab$model$AbstractSimObject.prototype.getExpireTime = function() {
    return this.expireTime_
}
;
mpl$lab$model$AbstractSimObject.prototype.getName = function(a) {
    return a ? this.localName_ : this.name_
}
;
mpl$lab$model$AbstractSimObject.prototype.isMassObject = function() {
    return !1
}
;
mpl$lab$model$AbstractSimObject.prototype.nameEquals = function(a) {
    return this.name_ == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$AbstractSimObject.prototype.setExpireTime = function(a) {
    this.expireTime_ = a;
    return this
}
;
mpl$lab$model$AbstractSimObject.prototype.similar = function(a, b) {
    return a == this
}
;
mpl$lab$model$AbstractSimObject.ID = 1;
var mpl$lab$model$AbstractMassObject = function(a, b) {
    mpl$lab$model$AbstractSimObject.call(this, a, b);
    this.mass_ = 1;
    this.loc_world_ = mpl$lab$util$Vector.ORIGIN;
    this.sinAngle_ = this.angle_ = 0;
    this.cosAngle_ = 1;
    this.velocity_ = mpl$lab$util$Vector.ORIGIN;
    this.angular_velocity_ = 0;
    this.cm_body_ = mpl$lab$util$Vector.ORIGIN;
    this.zeroEnergyLevel_ = null;
    this.dragPts_ = [mpl$lab$util$Vector.ORIGIN];
    this.moment_ = 0;
    this.minHeight_ = mpl$lab$util$Util.NaN
};
$jscomp.inherits(mpl$lab$model$AbstractMassObject, mpl$lab$model$AbstractSimObject);
mpl$lab$model$AbstractMassObject.ID = mpl$lab$model$AbstractSimObject.ID;
mpl$lab$model$AbstractMassObject.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractSimObject.prototype.toString.call(this).slice(0, -1) + ", mass_: " + mpl$lab$util$Util.NF(this.mass_) + ", loc_world_: " + this.loc_world_ + ", angle_: " + this.angle_ + ", velocity_: " + this.velocity_ + ", angular_velocity_: " + mpl$lab$util$Util.NF(this.angular_velocity_) + ", cm_body_: " + this.cm_body_ + ", zeroEnergyLevel_: " + mpl$lab$util$Util.NF(this.zeroEnergyLevel_) + ", moment_: " + mpl$lab$util$Util.NF(this.moment_) + "}"
}
;
mpl$lab$model$AbstractMassObject.prototype.alignTo = function(a, b, c) {
    c = void 0 === c ? this.angle_ : c;
    var d = a.getX() - this.cm_body_.getX();
    a = a.getY() - this.cm_body_.getY();
    var e = Math.sin(c)
      , f = Math.cos(c);
    this.setPosition(new mpl$lab$util$Vector(b.getX() - (d * f - a * e),b.getY() - (d * e + a * f)), c)
}
;
mpl$lab$model$AbstractMassObject.prototype.bodyToWorld = function(a) {
    var b = a.getX() - this.cm_body_.getX()
      , c = a.getY() - this.cm_body_.getY();
    a = this.loc_world_.getX() + (b * this.cosAngle_ - c * this.sinAngle_);
    b = this.loc_world_.getY() + (b * this.sinAngle_ + c * this.cosAngle_);
    return new mpl$lab$util$Vector(a,b)
}
;
mpl$lab$model$AbstractMassObject.prototype.bodyToWorldTransform = function() {
    var a = new mpl$lab$util$AffineTransform(1,0,0,1,this.loc_world_.getX(),this.loc_world_.getY());
    a = a.rotate(this.angle_);
    return a.translate(-this.cm_body_.getX(), -this.cm_body_.getY())
}
;
mpl$lab$model$AbstractMassObject.prototype.createCanvasPath = function(a) {}
;
mpl$lab$model$AbstractMassObject.prototype.getAngle = function() {
    return this.angle_
}
;
mpl$lab$model$AbstractMassObject.prototype.getAngularVelocity = function() {
    return this.angular_velocity_
}
;
mpl$lab$model$AbstractMassObject.prototype.getBottomBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getBottomWorld = function() {
    var a = mpl$lab$util$Util.POSITIVE_INFINITY;
    goog.array.forEach(this.getVerticesBody(), function(b) {
        b = this.bodyToWorld(b);
        b.getY() < a && (a = b.getY())
    }, this);
    return a
}
;
mpl$lab$model$AbstractMassObject.prototype.getBoundsBody = function() {
    return new mpl$lab$util$DoubleRect(this.getLeftBody(),this.getBottomBody(),this.getRightBody(),this.getTopBody())
}
;
mpl$lab$model$AbstractMassObject.prototype.getBoundsWorld = function() {
    return new mpl$lab$util$DoubleRect(this.getLeftWorld(),this.getBottomWorld(),this.getRightWorld(),this.getTopWorld())
}
;
mpl$lab$model$AbstractMassObject.prototype.getCenterOfMassBody = function() {
    return this.cm_body_
}
;
mpl$lab$model$AbstractMassObject.prototype.getCentroidBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getCentroidRadius = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getCentroidWorld = function() {
    return this.bodyToWorld(this.getCentroidBody())
}
;
mpl$lab$model$AbstractMassObject.prototype.getDragPoints = function() {
    return goog.array.clone(this.dragPts_)
}
;
mpl$lab$model$AbstractMassObject.prototype.getHeight = function() {
    return this.getTopBody() - this.getBottomBody()
}
;
mpl$lab$model$AbstractMassObject.prototype.getKineticEnergy = function() {
    return this.translationalEnergy() + this.rotationalEnergy()
}
;
mpl$lab$model$AbstractMassObject.prototype.getLeftBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getLeftWorld = function() {
    var a = mpl$lab$util$Util.POSITIVE_INFINITY;
    goog.array.forEach(this.getVerticesBody(), function(b) {
        b = this.bodyToWorld(b);
        b.getX() < a && (a = b.getX())
    }, this);
    return a
}
;
mpl$lab$model$AbstractMassObject.prototype.getMass = function() {
    return this.mass_
}
;
mpl$lab$model$AbstractMassObject.prototype.getMinHeight = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getPosition = function() {
    return this.loc_world_
}
;
mpl$lab$model$AbstractMassObject.prototype.getRightBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getRightWorld = function() {
    var a = mpl$lab$util$Util.NEGATIVE_INFINITY;
    goog.array.forEach(this.getVerticesBody(), function(b) {
        b = this.bodyToWorld(b);
        b.getX() > a && (a = b.getX())
    }, this);
    return a
}
;
mpl$lab$model$AbstractMassObject.prototype.getTopBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getTopWorld = function() {
    var a = mpl$lab$util$Util.NEGATIVE_INFINITY;
    goog.array.forEach(this.getVerticesBody(), function(b) {
        b = this.bodyToWorld(b);
        b.getY() > a && (a = b.getY())
    }, this);
    return a
}
;
mpl$lab$model$AbstractMassObject.prototype.getWidth = function() {
    return this.getRightBody() - this.getLeftBody()
}
;
mpl$lab$model$AbstractMassObject.prototype.getVelocity = function(a) {
    return goog.isDef(a) ? (a = this.rotateBodyToWorld(mpl$lab$util$Vector.clone(a).subtract(this.cm_body_)),
    new mpl$lab$util$Vector(this.velocity_.getX() - a.getY() * this.angular_velocity_,this.velocity_.getY() + a.getX() * this.angular_velocity_)) : this.velocity_
}
;
mpl$lab$model$AbstractMassObject.prototype.getVerticesBody = function() {}
;
mpl$lab$model$AbstractMassObject.prototype.getZeroEnergyLevel = function() {
    return this.zeroEnergyLevel_
}
;
mpl$lab$model$AbstractMassObject.prototype.isMassObject = function() {
    return !0
}
;
mpl$lab$model$AbstractMassObject.prototype.momentAboutCM = function() {
    return this.mass_ * this.moment_
}
;
mpl$lab$model$AbstractMassObject.prototype.momentum = function() {
    var a = Array(3);
    a[0] = this.mass_ * this.velocity_.getX();
    a[1] = this.mass_ * this.velocity_.getY();
    a[2] = this.momentAboutCM() * this.angular_velocity_ + this.mass_ * (this.loc_world_.getX() * this.velocity_.getY() - this.loc_world_.getY() * this.velocity_.getX());
    return a
}
;
mpl$lab$model$AbstractMassObject.prototype.rotateBodyToWorld = function(a) {
    return mpl$lab$util$Vector.clone(a).rotate(this.cosAngle_, this.sinAngle_)
}
;
mpl$lab$model$AbstractMassObject.prototype.rotateWorldToBody = function(a) {
    return mpl$lab$util$Vector.clone(a).rotate(this.cosAngle_, -this.sinAngle_)
}
;
mpl$lab$model$AbstractMassObject.prototype.rotationalEnergy = function() {
    return .5 * this.momentAboutCM() * this.angular_velocity_ * this.angular_velocity_
}
;
mpl$lab$model$AbstractMassObject.prototype.setAngle = function(a) {
    this.setPosition(this.loc_world_, a)
}
;
mpl$lab$model$AbstractMassObject.prototype.setAngularVelocity = function(a) {
    if (!isFinite(a))
        throw Error("angular velocity must be finite " + a);
    this.angular_velocity_ = a
}
;
mpl$lab$model$AbstractMassObject.prototype.setCenterOfMass = function(a, b) {
    this.cm_body_ = new mpl$lab$util$Vector(a,b);
    this.minHeight_ = mpl$lab$util$Util.NaN
}
;
mpl$lab$model$AbstractMassObject.prototype.setDragPoints = function(a) {
    this.dragPts_ = goog.array.clone(a)
}
;
mpl$lab$model$AbstractMassObject.prototype.setMass = function(a) {
    if (0 >= a || !goog.isNumber(a))
        throw Error("mass must be positive " + a);
    this.mass_ = a;
    return this
}
;
mpl$lab$model$AbstractMassObject.prototype.setMinHeight = function(a) {
    this.minHeight_ = a
}
;
mpl$lab$model$AbstractMassObject.prototype.setMomentAboutCM = function(a) {
    this.moment_ = a
}
;
mpl$lab$model$AbstractMassObject.prototype.setPosition = function(a, b) {
    this.loc_world_ = mpl$lab$util$Vector.clone(a);
    goog.isDef(b) && this.angle_ != b && (this.angle_ = b,
    this.sinAngle_ = Math.sin(b),
    this.cosAngle_ = Math.cos(b))
}
;
mpl$lab$model$AbstractMassObject.prototype.setVelocity = function(a, b) {
    this.velocity_ = mpl$lab$util$Vector.clone(a);
    goog.isDef(b) && this.setAngularVelocity(b)
}
;
mpl$lab$model$AbstractMassObject.prototype.setZeroEnergyLevel = function(a) {
    this.zeroEnergyLevel_ = goog.isDef(a) ? a : this.loc_world_.getY();
    return this
}
;
mpl$lab$model$AbstractMassObject.prototype.translationalEnergy = function() {
    return .5 * this.mass_ * this.velocity_.lengthSquared()
}
;
mpl$lab$model$AbstractMassObject.prototype.worldToBody = function(a) {
    var b = a.getX() - this.loc_world_.getX()
      , c = a.getY() - this.loc_world_.getY()
      , d = -this.sinAngle_
      , e = this.cosAngle_;
    a = this.cm_body_.getX() + (b * e - c * d);
    b = this.cm_body_.getY() + (b * d + c * e);
    return new mpl$lab$util$Vector(a,b)
}
;
var mpl$lab$model$ShapeType = {
    RECTANGLE: 1,
    OVAL: 2
};
var mpl$lab$model$PointMass = function(a, b) {
    goog.isDef(a) && "" != a ? b = b ? b : a : (b = mpl$lab$model$PointMass.ID++,
    a = mpl$lab$model$PointMass.en.POINT_MASS + b,
    b = mpl$lab$model$PointMass.i18n.POINT_MASS + b);
    mpl$lab$model$AbstractMassObject.call(this, a, b);
    this.mass_ = 1;
    this.shape_ = mpl$lab$model$ShapeType.OVAL;
    this.height_ = this.width_ = 1
};
$jscomp.inherits(mpl$lab$model$PointMass, mpl$lab$model$AbstractMassObject);
mpl$lab$model$PointMass.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractMassObject.prototype.toString.call(this).slice(0, -1) + ", shape_: " + this.shape_ + ", width_: " + mpl$lab$util$Util.NF(this.width_) + ", height_: " + mpl$lab$util$Util.NF(this.height_) + "}"
}
;
mpl$lab$model$PointMass.prototype.getClassName = function() {
    return "PointMass"
}
;
mpl$lab$model$PointMass.makeCircle = function(a, b, c) {
    b = new mpl$lab$model$PointMass(b,c);
    b.setWidth(a);
    b.setHeight(a);
    return b
}
;
mpl$lab$model$PointMass.makeOval = function(a, b, c, d) {
    c = new mpl$lab$model$PointMass(c,d);
    c.setWidth(a);
    c.setHeight(b);
    return c
}
;
mpl$lab$model$PointMass.makeSquare = function(a, b, c) {
    b = new mpl$lab$model$PointMass(b,c);
    b.setWidth(a);
    b.setHeight(a);
    b.setShape(mpl$lab$model$ShapeType.RECTANGLE);
    return b
}
;
mpl$lab$model$PointMass.makeRectangle = function(a, b, c, d) {
    c = new mpl$lab$model$PointMass(c,d);
    c.setWidth(a);
    c.setHeight(b);
    c.setShape(mpl$lab$model$ShapeType.RECTANGLE);
    return c
}
;
mpl$lab$model$PointMass.prototype.createCanvasPath = function(a) {
    a.beginPath();
    var b = this.height_ / 2
      , c = this.width_ / 2;
    if (this.shape_ == mpl$lab$model$ShapeType.RECTANGLE)
        a.rect(-c, -b, this.width_, this.height_);
    else if (this.shape_ == mpl$lab$model$ShapeType.OVAL)
        goog.isFunction(a.ellipse) ? (a.moveTo(c, 0),
        a.ellipse(0, 0, c, b, 0, 0, 2 * Math.PI, !1)) : (a.arc(0, 0, Math.min(c, b), 0, 2 * Math.PI, !1),
        a.closePath());
    else
        throw Error();
}
;
mpl$lab$model$PointMass.prototype.getBottomBody = function() {
    return -this.height_ / 2
}
;
mpl$lab$model$PointMass.prototype.getCentroidBody = function() {
    return mpl$lab$util$Vector.ORIGIN
}
;
mpl$lab$model$PointMass.prototype.getCentroidRadius = function() {
    var a = this.width_ / 2
      , b = this.height_ / 2;
    return Math.sqrt(a * a + b * b)
}
;
mpl$lab$model$PointMass.prototype.getLeftBody = function() {
    return -this.width_ / 2
}
;
mpl$lab$model$PointMass.prototype.getMinHeight = function() {
    if (isNaN(this.minHeight_)) {
        var a = this.cm_body_.getX()
          , b = this.cm_body_.getY()
          , c = b - this.getBottomBody()
          , d = a - this.getLeftBody();
        d < c && (c = d);
        d = this.getTopBody() - b;
        d < c && (c = d);
        d = this.getRightBody() - a;
        d < c && (c = d);
        this.minHeight_ = c
    }
    return this.minHeight_
}
;
mpl$lab$model$PointMass.prototype.getRightBody = function() {
    return this.width_ / 2
}
;
mpl$lab$model$PointMass.prototype.getShape = function() {
    return this.shape_
}
;
mpl$lab$model$PointMass.prototype.getTopBody = function() {
    return this.height_ / 2
}
;
mpl$lab$model$PointMass.prototype.getVerticesBody = function() {
    var a = this.width_ / 2
      , b = this.height_ / 2;
    return [new mpl$lab$util$Vector(-a,-b), new mpl$lab$util$Vector(a,-b), new mpl$lab$util$Vector(a,b), new mpl$lab$util$Vector(-a,b)]
}
;
mpl$lab$model$PointMass.prototype.setHeight = function(a) {
    this.height_ = a;
    return this
}
;
mpl$lab$model$PointMass.prototype.setMass = function(a) {
    if (0 > a || !goog.isNumber(a))
        throw Error("mass must be non-negative " + a);
    this.mass_ = a;
    return this
}
;
mpl$lab$model$PointMass.prototype.setShape = function(a) {
    this.shape_ = a;
    return this
}
;
mpl$lab$model$PointMass.prototype.setWidth = function(a) {
    this.width_ = a;
    return this
}
;
mpl$lab$model$PointMass.prototype.similar = function(a, b) {
    return a instanceof mpl$lab$model$PointMass && a.loc_world_.nearEqual(this.loc_world_, b) && !mpl$lab$util$Util.veryDifferent(a.width_, this.width_, b) && !mpl$lab$util$Util.veryDifferent(a.height_, this.height_, b) && a.shape_ == this.shape_ ? !0 : !1
}
;
mpl$lab$model$PointMass.ID = 1;
mpl$lab$model$PointMass.en = {
    POINT_MASS: "PointMass"
};
mpl$lab$model$PointMass.de_strings = {
    POINT_MASS: "Punktmasse"
};
mpl$lab$model$PointMass.i18n = "de" === goog.LOCALE ? mpl$lab$model$PointMass.de_strings : mpl$lab$model$PointMass.en;
var mpl$lab$view$DisplayShape = function(a, b) {
    this.massObject_ = goog.isDefAndNotNull(a) ? a : new mpl$lab$model$PointMass("proto");
    this.proto_ = goog.isDefAndNotNull(b) ? b : null;
    this.dragable_ = isFinite(this.massObject_.getMass()) && 0 < this.massObject_.getDragPoints().length;
    this.lastColor_ = this.getFillStyle();
    this.isDarkColor_ = mpl$lab$view$DisplayShape.darkColor(this.lastColor_)
};
mpl$lab$view$DisplayShape.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", dragable_: " + this.dragable_ + ', fillStyle: "' + this.getFillStyle() + '", strokeStyle: "' + this.getStrokeStyle() + '", thickness: ' + mpl$lab$util$Util.NF(this.getThickness()) + ", drawDragPoints: " + this.getDrawDragPoints() + ", drawCenterOfMass: " + this.getDrawCenterOfMass() + ', nameFont: "' + this.getNameFont() + '", nameColor: "' + this.getNameColor() + '", nameRotate: ' + mpl$lab$util$Util.NF(this.getNameRotate()) + ", zIndex: " + this.getZIndex() + ", proto: " + (null != this.proto_ ? this.proto_.toStringShort() : "null") + "}"
}
;
mpl$lab$view$DisplayShape.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DisplayShape{massObject_: " + this.massObject_.toStringShort() + "}"
}
;
mpl$lab$view$DisplayShape.prototype.contains = function(a) {
    a = this.massObject_.worldToBody(a);
    return this.massObject_.getBoundsBody().contains(a)
}
;
mpl$lab$view$DisplayShape.darkColor = function(a) {
    if (!goog.isString(a) || "" == a)
        return !1;
    var b = a.match(/^rgba\((.*),\s*\d*\.?\d+\)/);
    null != b && (a = "rgb(" + b[1] + ")");
    a = goog.color.parse(a);
    a = goog.color.hexToHsv(a.hex);
    return .65 > a[2] || .57 < a[1] && .11 > Math.abs(a[0] - .677)
}
;
mpl$lab$view$DisplayShape.prototype.draw = function(a, b) {
    a.save();
    var c = b.getAffineTransform()
      , d = 1 / b.getScaleX();
    c = c.concatenate(this.massObject_.bodyToWorldTransform());
    c.setTransform(a);
    this.massObject_.createCanvasPath(a);
    this.getImageClip() && a.clip();
    var e = this.getFillStyle();
    e && (a.fillStyle = e,
    a.fill());
    var f = this.getStrokeStyle();
    if (f) {
        a.lineWidth = b.screenToSimScaleX(this.getThickness());
        var g = this.getBorderDash();
        0 < g.length && goog.isFunction(a.setLineDash) && (g = goog.array.map(g, function(a) {
            return b.screenToSimScaleX(a)
        }),
        a.setLineDash(g));
        a.strokeStyle = f;
        a.stroke();
        a.setLineDash([])
    }
    f = this.getImage();
    g = this.getImageDraw();
    if (null != f || null != g)
        a.translate(this.massObject_.getLeftBody(), this.massObject_.getTopBody()),
        a.scale(d, -d),
        this.getImageAT().applyTransform(a),
        null != f && a.drawImage(f, 0, 0),
        null != g && g(a);
    if (this.massObject_.getMass() != mpl$lab$util$Util.POSITIVE_INFINITY) {
        c.setTransform(a);
        this.lastColor_ !== e && (this.lastColor_ = e,
        this.isDarkColor_ = mpl$lab$view$DisplayShape.darkColor(e));
        e = b.screenToSimScaleX(1);
        a.lineWidth = e;
        if (this.getDrawCenterOfMass()) {
            f = this.massObject_.getCenterOfMassBody();
            a.strokeStyle = this.isDarkColor_ ? "#ccc" : "black";
            g = .2 * Math.min(this.massObject_.getWidth(), this.massObject_.getHeight());
            var h = 8 * e;
            g > h && (g = h);
            a.beginPath();
            a.moveTo(f.getX() - g, f.getY());
            a.lineTo(f.getX() + g, f.getY());
            a.stroke();
            a.beginPath();
            a.moveTo(f.getX(), f.getY() - g);
            a.lineTo(f.getX(), f.getY() + g);
            a.stroke()
        }
        if (this.getDrawDragPoints()) {
            var k = 4 * e;
            e = .15 * Math.min(this.massObject_.getWidth(), this.massObject_.getHeight());
            e < k && (k = e);
            goog.array.forEach(this.massObject_.getDragPoints(), function(b) {
                a.fillStyle = this.isDarkColor_ ? "#ccc" : "gray";
                a.beginPath();
                a.arc(b.getX(), b.getY(), k, 0, 2 * Math.PI, !1);
                a.closePath();
                a.fill()
            }, this)
        }
    }
    this.getNameFont() && (e = this.massObject_.getCentroidBody(),
    c = c.translate(e),
    (e = this.getNameRotate()) && (c = c.rotate(e)),
    c = c.scale(d, -d),
    c.setTransform(a),
    a.fillStyle = this.getNameColor(),
    a.font = this.getNameFont(),
    a.textAlign = "center",
    d = this.massObject_.getName(!0),
    c = a.measureText("M").width,
    a.fillText(d, 0, c / 2));
    a.restore()
}
;
mpl$lab$view$DisplayShape.prototype.getBorderDash = function() {
    return void 0 !== this.borderDash_ ? this.borderDash_ : null != this.proto_ ? this.proto_.getBorderDash() : []
}
;
mpl$lab$view$DisplayShape.prototype.getDrawCenterOfMass = function() {
    return void 0 !== this.drawCenterOfMass_ ? this.drawCenterOfMass_ : null != this.proto_ ? this.proto_.getDrawCenterOfMass() : !1
}
;
mpl$lab$view$DisplayShape.prototype.getDrawDragPoints = function() {
    return void 0 !== this.drawDragPoints_ ? this.drawDragPoints_ : null != this.proto_ ? this.proto_.getDrawDragPoints() : !1
}
;
mpl$lab$view$DisplayShape.prototype.getFillStyle = function() {
    return void 0 !== this.fillStyle_ ? this.fillStyle_ : null != this.proto_ ? this.proto_.getFillStyle() : "lightGray"
}
;
mpl$lab$view$DisplayShape.prototype.getImage = function() {
    return void 0 !== this.image_ ? this.image_ : null != this.proto_ ? this.proto_.getImage() : null
}
;
mpl$lab$view$DisplayShape.prototype.getImageAT = function() {
    return void 0 !== this.imageAT_ ? this.imageAT_ : null != this.proto_ ? this.proto_.getImageAT() : mpl$lab$util$AffineTransform.IDENTITY
}
;
mpl$lab$view$DisplayShape.prototype.getImageClip = function() {
    return void 0 !== this.imageClip_ ? this.imageClip_ : null != this.proto_ ? this.proto_.getImageClip() : !1
}
;
mpl$lab$view$DisplayShape.prototype.getImageDraw = function() {
    return void 0 !== this.imageDraw_ ? this.imageDraw_ : null != this.proto_ ? this.proto_.getImageDraw() : null
}
;
mpl$lab$view$DisplayShape.prototype.getMassObjects = function() {
    return [this.massObject_]
}
;
mpl$lab$view$DisplayShape.prototype.getNameColor = function() {
    return void 0 !== this.nameColor_ ? this.nameColor_ : null != this.proto_ ? this.proto_.getNameColor() : "black"
}
;
mpl$lab$view$DisplayShape.prototype.getNameFont = function() {
    return void 0 !== this.nameFont_ ? this.nameFont_ : null != this.proto_ ? this.proto_.getNameFont() : ""
}
;
mpl$lab$view$DisplayShape.prototype.getNameRotate = function() {
    return void 0 !== this.nameRotate_ ? this.nameRotate_ : null != this.proto_ ? this.proto_.getNameRotate() : 0
}
;
mpl$lab$view$DisplayShape.prototype.getPosition = function() {
    return this.massObject_.getPosition()
}
;
mpl$lab$view$DisplayShape.prototype.getPrototype = function() {
    return this.proto_
}
;
mpl$lab$view$DisplayShape.prototype.getSimObjects = function() {
    return [this.massObject_]
}
;
mpl$lab$view$DisplayShape.prototype.getStrokeStyle = function() {
    return void 0 !== this.strokeStyle_ ? this.strokeStyle_ : null != this.proto_ ? this.proto_.getStrokeStyle() : ""
}
;
mpl$lab$view$DisplayShape.prototype.getThickness = function() {
    return void 0 !== this.thickness_ ? this.thickness_ : null != this.proto_ ? this.proto_.getThickness() : 1
}
;
mpl$lab$view$DisplayShape.prototype.getZIndex = function() {
    return void 0 !== this.zIndex_ ? this.zIndex_ : null != this.proto_ ? this.proto_.getZIndex() : 0
}
;
mpl$lab$view$DisplayShape.prototype.isDragable = function() {
    return this.dragable_
}
;
mpl$lab$view$DisplayShape.prototype.setBorderDash = function(a) {
    this.borderDash_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setDragable = function(a) {
    this.dragable_ = a
}
;
mpl$lab$view$DisplayShape.prototype.setDrawCenterOfMass = function(a) {
    this.drawCenterOfMass_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setDrawDragPoints = function(a) {
    this.drawDragPoints_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setFillStyle = function(a) {
    this.fillStyle_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setImage = function(a) {
    this.image_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setImageAT = function(a) {
    this.imageAT_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setImageClip = function(a) {
    this.imageClip_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setImageDraw = function(a) {
    this.imageDraw_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setNameColor = function(a) {
    this.nameColor_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setNameFont = function(a) {
    this.nameFont_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setNameRotate = function(a) {
    this.nameRotate_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setPosition = function(a) {
    this.massObject_.setPosition(a)
}
;
mpl$lab$view$DisplayShape.prototype.setPrototype = function(a) {
    this.proto_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setStrokeStyle = function(a) {
    this.strokeStyle_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setThickness = function(a) {
    this.thickness_ = a;
    return this
}
;
mpl$lab$view$DisplayShape.prototype.setZIndex = function(a) {
    this.zIndex_ = a
}
;
var mpl$lab$model$CoordType = {
    BODY: 0,
    WORLD: 1
};
var mpl$lab$model$Line = function(a) {};
mpl$lab$model$Line.prototype.getEndPoint = function() {}
;
mpl$lab$model$Line.prototype.getStartPoint = function() {}
;
mpl$lab$model$Line.prototype.getVector = function() {}
;
var mpl$lab$model$Force = function(a, b, c, d, e, f, g) {
    mpl$lab$model$AbstractSimObject.call(this, a);
    this.body_ = b;
    this.location_ = c;
    this.direction_ = e;
    this.locationCoordType_ = d;
    this.directionCoordType_ = f;
    this.contactTolerance = this.contactDistance = 0;
    this.torque_ = void 0 === g ? 0 : g
};
$jscomp.inherits(mpl$lab$model$Force, mpl$lab$model$AbstractSimObject);
mpl$lab$model$Force.ID = mpl$lab$model$AbstractSimObject.ID;
mpl$lab$model$Force.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractSimObject.prototype.toString.call(this).slice(0, -1) + ', body: "' + this.body_.getName() + '", location: ' + this.location_ + ", direction: " + this.direction_ + ", locationCoordType: " + this.locationCoordType_ + ", directionCoordType: " + this.directionCoordType_ + ", torque: " + mpl$lab$util$Util.NF5E(this.torque_) + "}"
}
;
mpl$lab$model$Force.prototype.getClassName = function() {
    return "Force"
}
;
mpl$lab$model$Force.prototype.getBody = function() {
    return this.body_
}
;
mpl$lab$model$Force.prototype.getBoundsWorld = function() {
    return mpl$lab$util$DoubleRect.make(this.getStartPoint(), this.getEndPoint())
}
;
mpl$lab$model$Force.prototype.getEndPoint = function() {
    return this.getStartPoint().add(this.getVector())
}
;
mpl$lab$model$Force.prototype.getStartPoint = function() {
    return this.locationCoordType_ == mpl$lab$model$CoordType.BODY ? this.body_.bodyToWorld(this.location_) : this.location_
}
;
mpl$lab$model$Force.prototype.getTorque = function() {
    return this.torque_
}
;
mpl$lab$model$Force.prototype.getVector = function() {
    return this.directionCoordType_ == mpl$lab$model$CoordType.BODY ? this.body_.rotateBodyToWorld(this.direction_) : this.direction_
}
;
mpl$lab$model$Force.prototype.similar = function(a, b) {
    return a instanceof mpl$lab$model$Force && a.getName() == this.getName() && this.getStartPoint().nearEqual(a.getStartPoint(), b) ? this.getVector().nearEqual(a.getVector(), b) : !1
}
;
var mpl$lab$model$ForceLaw = function(a) {};
mpl$lab$model$ForceLaw.prototype.calculateForces = function() {}
;
mpl$lab$model$ForceLaw.prototype.disconnect = function() {}
;
mpl$lab$model$ForceLaw.prototype.getBodies = function() {}
;
mpl$lab$model$ForceLaw.prototype.getPotentialEnergy = function() {}
;
var mpl$lab$model$Spring = function(a, b, c, d, e, f, g, h) {
    mpl$lab$model$AbstractSimObject.call(this, a);
    this.body1_ = b;
    this.attach1_ = mpl$lab$util$Vector.clone(c);
    this.body2_ = d;
    this.attach2_ = mpl$lab$util$Vector.clone(e);
    this.restLength_ = f;
    this.stiffness_ = void 0 === g ? 0 : g;
    this.damping_ = 0;
    this.compressOnly_ = h || !1
};
$jscomp.inherits(mpl$lab$model$Spring, mpl$lab$model$AbstractSimObject);
mpl$lab$model$Spring.ID = mpl$lab$model$AbstractSimObject.ID;
mpl$lab$model$Spring.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractSimObject.prototype.toString.call(this).slice(0, -1) + ', body1_:"' + this.body1_.getName() + '", attach1_: ' + this.attach1_ + ', body2_:"' + this.body2_.getName() + '", attach2_: ' + this.attach2_ + ", restLength_: " + mpl$lab$util$Util.NF(this.restLength_) + ", stiffness_: " + mpl$lab$util$Util.NF(this.stiffness_) + ", damping_: " + mpl$lab$util$Util.NF(this.damping_) + ", compressOnly_: " + this.compressOnly_ + "}"
}
;
mpl$lab$model$Spring.prototype.getClassName = function() {
    return "Spring"
}
;
mpl$lab$model$Spring.prototype.calculateForces = function() {
    var a = this.getStartPoint()
      , b = this.getEndPoint()
      , c = b.subtract(a)
      , d = c.length()
      , e = -this.stiffness_ * (d - this.restLength_)
      , f = -e * (c.getX() / d);
    c = -e * (c.getY() / d);
    f = new mpl$lab$util$Vector(f,c,0);
    0 != this.damping_ && (!this.compressOnly_ || d < this.restLength_ - 1E-10) && (d = this.body1_.getVelocity(this.attach1_),
    c = this.body2_.getVelocity(this.attach2_),
    d = d.subtract(c).multiply(-this.damping_),
    f = f.add(d));
    return [new mpl$lab$model$Force("spring",this.body1_,a,mpl$lab$model$CoordType.WORLD,f,mpl$lab$model$CoordType.WORLD), new mpl$lab$model$Force("spring",this.body2_,b,mpl$lab$model$CoordType.WORLD,f.multiply(-1),mpl$lab$model$CoordType.WORLD)]
}
;
mpl$lab$model$Spring.prototype.disconnect = function() {}
;
mpl$lab$model$Spring.prototype.getAttach1 = function() {
    return this.attach1_
}
;
mpl$lab$model$Spring.prototype.getAttach2 = function() {
    return this.attach2_
}
;
mpl$lab$model$Spring.prototype.getBodies = function() {
    return [this.body1_, this.body2_]
}
;
mpl$lab$model$Spring.prototype.getBody1 = function() {
    return this.body1_
}
;
mpl$lab$model$Spring.prototype.getBody2 = function() {
    return this.body2_
}
;
mpl$lab$model$Spring.prototype.getBoundsWorld = function() {
    return mpl$lab$util$DoubleRect.make(this.getStartPoint(), this.getEndPoint())
}
;
mpl$lab$model$Spring.prototype.getDamping = function() {
    return this.damping_
}
;
mpl$lab$model$Spring.prototype.getEndPoint = function() {
    if (null == this.attach2_ || null == this.body2_)
        throw Error();
    var a = this.body2_.bodyToWorld(this.attach2_);
    if (this.compressOnly_) {
        var b = this.getStartPoint()
          , c = b.distanceTo(a)
          , d = this.restLength_;
        if (c <= d)
            return a;
        a = a.subtract(b).normalize();
        return b.add(a.multiply(d))
    }
    return a
}
;
mpl$lab$model$Spring.prototype.getLength = function() {
    return this.getEndPoint().distanceTo(this.getStartPoint())
}
;
mpl$lab$model$Spring.prototype.getPotentialEnergy = function() {
    var a = this.getStretch();
    return .5 * this.stiffness_ * a * a
}
;
mpl$lab$model$Spring.prototype.getRestLength = function() {
    return this.restLength_
}
;
mpl$lab$model$Spring.prototype.getStartPoint = function() {
    if (null == this.attach1_ || null == this.body1_)
        throw Error();
    return this.body1_.bodyToWorld(this.attach1_)
}
;
mpl$lab$model$Spring.prototype.getStiffness = function() {
    return this.stiffness_
}
;
mpl$lab$model$Spring.prototype.getStretch = function() {
    return this.getLength() - this.restLength_
}
;
mpl$lab$model$Spring.prototype.getVector = function() {
    return this.getEndPoint().subtract(this.getStartPoint())
}
;
mpl$lab$model$Spring.prototype.setDamping = function(a) {
    this.damping_ = a;
    return this
}
;
mpl$lab$model$Spring.prototype.setRestLength = function(a) {
    this.restLength_ = a
}
;
mpl$lab$model$Spring.prototype.setStiffness = function(a) {
    this.stiffness_ = a;
    return this
}
;
var mpl$lab$view$DisplaySpring = function(a, b) {
    this.spring_ = goog.isDefAndNotNull(a) ? a : null;
    this.proto_ = goog.isDefAndNotNull(b) ? b : null
};
mpl$lab$view$DisplaySpring.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", width: " + mpl$lab$util$Util.NF(this.getWidth()) + ', colorCompressed: "' + this.getColorCompressed() + '", colorExpanded: "' + this.getColorExpanded() + '", thickness: ' + mpl$lab$util$Util.NF(this.getThickness()) + ", drawMode: " + this.getDrawMode() + ", zIndex: " + this.getZIndex() + "}"
}
;
mpl$lab$view$DisplaySpring.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DisplaySpring{spring_: " + (null != this.spring_ ? this.spring_.toStringShort() : "null") + "}"
}
;
mpl$lab$view$DisplaySpring.prototype.contains = function(a) {
    return !1
}
;
mpl$lab$view$DisplaySpring.prototype.draw = function(a, b) {
    if (null != this.spring_) {
        var c = this.spring_.getLength();
        if (!(1E-6 > c || 0 == this.spring_.getStiffness())) {
            a.save();
            a.lineWidth = this.getThickness();
            c < this.spring_.getRestLength() - 1E-5 ? a.strokeStyle = this.getColorCompressed() : a.strokeStyle = this.getColorExpanded();
            if (this.getDrawMode() === mpl$lab$view$DisplaySpring.JAGGED) {
                b = b.getAffineTransform();
                var d = this.spring_.getStartPoint()
                  , e = this.spring_.getEndPoint();
                b = b.translate(d.getX(), d.getY());
                d = Math.atan2(e.getY() - d.getY(), e.getX() - d.getX());
                b = b.rotate(d);
                b = b.scale(c / mpl$lab$view$DisplaySpring.pathLength, this.getWidth() / .5);
                mpl$lab$view$DisplaySpring.drawSpring(a, b)
            } else
                d = b.simToScreen(this.spring_.getStartPoint()),
                e = b.simToScreen(this.spring_.getEndPoint()),
                a.beginPath(),
                a.moveTo(d.getX(), d.getY()),
                a.lineTo(e.getX(), e.getY()),
                a.stroke();
            a.restore()
        }
    }
}
;
mpl$lab$view$DisplaySpring.drawSpring = function(a, b) {
    var c = mpl$lab$view$DisplaySpring.pathLength
      , d = mpl$lab$view$DisplaySpring.pathWidth / 2
      , e = c / 16;
    a.beginPath();
    b.moveTo(0, 0, a);
    b.lineTo(e, 0, a);
    b.lineTo(2 * e, d, a);
    for (var f = 1; 3 >= f; f++)
        b.lineTo(4 * f * e, -d, a),
        b.lineTo((4 * f + 2) * e, d, a);
    b.lineTo(15 * e, 0, a);
    b.lineTo(c, 0, a);
    a.stroke()
}
;
mpl$lab$view$DisplaySpring.prototype.getColorCompressed = function() {
    return void 0 !== this.colorCompressed_ ? this.colorCompressed_ : null != this.proto_ ? this.proto_.getColorCompressed() : "red"
}
;
mpl$lab$view$DisplaySpring.prototype.getColorExpanded = function() {
    return void 0 !== this.colorExpanded_ ? this.colorExpanded_ : null != this.proto_ ? this.proto_.getColorExpanded() : "green"
}
;
mpl$lab$view$DisplaySpring.prototype.getDrawMode = function() {
    return void 0 !== this.drawMode_ ? this.drawMode_ : null != this.proto_ ? this.proto_.getDrawMode() : mpl$lab$view$DisplaySpring.JAGGED
}
;
mpl$lab$view$DisplaySpring.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$view$DisplaySpring.prototype.getPosition = function() {
    return null == this.spring_ ? mpl$lab$util$Vector.ORIGIN : this.spring_.getStartPoint().add(this.spring_.getEndPoint()).multiply(.5)
}
;
mpl$lab$view$DisplaySpring.prototype.getPrototype = function() {
    return this.proto_
}
;
mpl$lab$view$DisplaySpring.prototype.getSimObjects = function() {
    return null == this.spring_ ? [] : [this.spring_]
}
;
mpl$lab$view$DisplaySpring.prototype.getThickness = function() {
    return void 0 !== this.thickness_ ? this.thickness_ : null != this.proto_ ? this.proto_.getThickness() : 4
}
;
mpl$lab$view$DisplaySpring.prototype.getWidth = function() {
    return void 0 !== this.width_ ? this.width_ : null != this.proto_ ? this.proto_.getWidth() : .5
}
;
mpl$lab$view$DisplaySpring.prototype.getZIndex = function() {
    return void 0 !== this.zIndex_ ? this.zIndex_ : null != this.proto_ ? this.proto_.getZIndex() : 0
}
;
mpl$lab$view$DisplaySpring.prototype.isDragable = function() {
    return !1
}
;
mpl$lab$view$DisplaySpring.prototype.setColorCompressed = function(a) {
    this.colorCompressed_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setColorExpanded = function(a) {
    this.colorExpanded_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setDragable = function(a) {}
;
mpl$lab$view$DisplaySpring.prototype.setDrawMode = function(a) {
    this.drawMode_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setPosition = function(a) {}
;
mpl$lab$view$DisplaySpring.prototype.setPrototype = function(a) {
    this.proto_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setThickness = function(a) {
    this.thickness_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setWidth = function(a) {
    this.width_ = a;
    return this
}
;
mpl$lab$view$DisplaySpring.prototype.setZIndex = function(a) {
    this.zIndex_ = a
}
;
mpl$lab$view$DisplaySpring.JAGGED = 1;
mpl$lab$view$DisplaySpring.STRAIGHT = 2;
mpl$lab$view$DisplaySpring.pathLength = 6;
mpl$lab$view$DisplaySpring.pathWidth = .5;
var mpl$lab$view$DisplayList = function(a) {
    mpl$lab$util$AbstractSubject.call(this, a || "DISPLAY_LIST_" + mpl$lab$view$DisplayList.NAME_ID++);
    this.drawables_ = []
};
$jscomp.inherits(mpl$lab$view$DisplayList, mpl$lab$util$AbstractSubject);
mpl$lab$view$DisplayList.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", drawables_: [" + goog.array.map(this.drawables_, function(a, b) {
        return b + ": " + a.toStringShort()
    }) + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$view$DisplayList.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", drawables_.length: " + this.drawables_.length + "}"
}
;
mpl$lab$view$DisplayList.prototype.getClassName = function() {
    return "DisplayList"
}
;
mpl$lab$view$DisplayList.prototype.add = function(a) {
    if (!goog.isObject(a))
        throw Error("non-object passed to DisplayList.add");
    var b = a.getZIndex();
    mpl$lab$util$Util.DEBUG && this.preExist(a);
    this.sort();
    for (var c = 0, d = this.drawables_.length; c < d; c++) {
        var e = this.drawables_[c].getZIndex();
        if (b < e)
            break
    }
    goog.array.insertAt(this.drawables_, a, c);
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$DisplayList.OBJECT_ADDED,a))
}
;
mpl$lab$view$DisplayList.prototype.contains = function(a) {
    if (!goog.isObject(a))
        throw Error("non-object passed to DisplayList.contains");
    return goog.array.contains(this.drawables_, a)
}
;
mpl$lab$view$DisplayList.prototype.draw = function(a, b) {
    this.sort();
    goog.array.forEach(this.drawables_, function(c) {
        c.draw(a, b)
    })
}
;
mpl$lab$view$DisplayList.prototype.find = function(a) {
    if (goog.isNumber(a)) {
        var b = this.drawables_.length;
        if (0 > a || a >= b)
            return null;
        this.sort();
        return this.drawables_[a]
    }
    if (goog.isString(a)) {
        var c = mpl$lab$util$Util.toName(a);
        return goog.array.find(this.drawables_, function(a, b, f) {
            a = a.getSimObjects();
            b = 0;
            for (f = a.length; b < f; b++)
                if (a[b].getName() == c)
                    return !0;
            return !1
        })
    }
    return goog.isObject(a) ? goog.array.find(this.drawables_, function(b, c, f) {
        b = b.getSimObjects();
        return goog.array.contains(b, a)
    }) : null
}
;
mpl$lab$view$DisplayList.prototype.findShape = function(a) {
    var b = this.find(a);
    if (b instanceof mpl$lab$view$DisplayShape)
        return b;
    throw Error("DisplayShape not found: " + a);
}
;
mpl$lab$view$DisplayList.prototype.findSpring = function(a) {
    var b = this.find(a);
    if (b instanceof mpl$lab$view$DisplaySpring)
        return b;
    throw Error("DisplaySpring not found: " + a);
}
;
mpl$lab$view$DisplayList.prototype.get = function(a) {
    var b = this.drawables_.length;
    if (0 > a || a >= b)
        throw Error(a + " is not in range 0 to " + (b - 1));
    this.sort();
    return this.drawables_[a]
}
;
mpl$lab$view$DisplayList.prototype.length = function() {
    return this.drawables_.length
}
;
mpl$lab$view$DisplayList.prototype.preExist = function(a) {
    if (mpl$lab$util$Util.DEBUG)
        for (var b = a.getSimObjects(), c = 0, d = b.length; c < d; c++) {
            var e = b[c]
              , f = this.find(e);
            if (null != f)
                throw console.log("*** WARNING PRE-EXISTING DISPLAYOBJECT " + f),
                console.log("*** FOR SIMOBJECT=" + e),
                console.log("*** WHILE ADDING " + a),
                Error("pre-existing object " + f + " for " + e + " adding " + a);
        }
}
;
mpl$lab$view$DisplayList.prototype.prepend = function(a) {
    if (!goog.isObject(a))
        throw Error("non-object passed to DisplayList.add");
    var b = a.getZIndex();
    mpl$lab$util$Util.DEBUG && this.preExist(a);
    this.sort();
    for (var c = this.drawables_.length; 0 < c; c--) {
        var d = this.drawables_[c - 1].getZIndex();
        if (b > d)
            break
    }
    goog.array.insertAt(this.drawables_, a, c);
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$DisplayList.OBJECT_ADDED,a))
}
;
mpl$lab$view$DisplayList.prototype.remove = function(a) {
    if (!goog.isObject(a))
        throw Error("non-object passed to DisplayList.remove");
    var b = goog.array.indexOf(this.drawables_, a);
    -1 < b && (goog.array.removeAt(this.drawables_, b),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$DisplayList.OBJECT_REMOVED,a)))
}
;
mpl$lab$view$DisplayList.prototype.removeAll = function() {
    goog.array.forEachRight(this.drawables_, function(a) {
        this.remove(a)
    }, this)
}
;
mpl$lab$view$DisplayList.prototype.sort = function() {
    for (var a = !0, b = mpl$lab$util$Util.NEGATIVE_INFINITY, c = 0, d = this.drawables_.length; c < d; c++) {
        var e = this.drawables_[c].getZIndex();
        if (e < b) {
            a = !1;
            break
        }
        b = e
    }
    a || goog.array.stableSort(this.drawables_, function(a, b) {
        a = a.getZIndex();
        b = b.getZIndex();
        return a < b ? -1 : a > b ? 1 : 0
    })
}
;
mpl$lab$view$DisplayList.prototype.toArray = function() {
    this.sort();
    return goog.array.clone(this.drawables_)
}
;
mpl$lab$view$DisplayList.NAME_ID = 1;
mpl$lab$view$DisplayList.OBJECT_ADDED = "OBJECT_ADDED";
mpl$lab$view$DisplayList.OBJECT_REMOVED = "OBJECT_REMOVED";
var mpl$lab$util$MemoList = function(a) {};
mpl$lab$util$MemoList.prototype.addMemo = function(a) {}
;
mpl$lab$util$MemoList.prototype.getMemos = function() {}
;
mpl$lab$util$MemoList.prototype.removeMemo = function(a) {}
;
var mpl$lab$view$LabView = function(a) {};
mpl$lab$view$LabView.prototype.gainFocus = function() {}
;
mpl$lab$view$LabView.prototype.getCoordMap = function() {}
;
mpl$lab$view$LabView.prototype.getDisplayList = function() {}
;
mpl$lab$view$LabView.prototype.getName = function() {}
;
mpl$lab$view$LabView.prototype.getScreenRect = function() {}
;
mpl$lab$view$LabView.prototype.getSimRect = function() {}
;
mpl$lab$view$LabView.prototype.loseFocus = function() {}
;
mpl$lab$view$LabView.prototype.paint = function(a) {}
;
mpl$lab$view$LabView.prototype.setCoordMap = function(a) {}
;
mpl$lab$view$LabView.prototype.setScreenRect = function(a) {}
;
mpl$lab$view$LabView.prototype.setSimRect = function(a) {}
;
mpl$lab$view$LabView.COORD_MAP_CHANGED = "COORD_MAP_CHANGED";
mpl$lab$view$LabView.SCREEN_RECT_CHANGED = "SCREEN_RECT_CHANGED";
mpl$lab$view$LabView.SIM_RECT_CHANGED = "SIM_RECT_CHANGED";
var mpl$lab$util$ConcreteMemoList = function() {
    this.memorizables_ = [];
    this.isMemorizing_ = !1
};
mpl$lab$util$ConcreteMemoList.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ConcreteMemoList{memorizables_: [" + goog.array.map(this.memorizables_, function(a) {
        return a.toStringShort()
    }) + "]}"
}
;
mpl$lab$util$ConcreteMemoList.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ConcreteMemoList{memorizables_.length: " + this.memorizables_.length + "}"
}
;
mpl$lab$util$ConcreteMemoList.prototype.addMemo = function(a) {
    if (this.isMemorizing_)
        throw Error("addMemo during memorize");
    goog.array.contains(this.memorizables_, a) || this.memorizables_.push(a)
}
;
mpl$lab$util$ConcreteMemoList.prototype.getMemos = function() {
    return goog.array.clone(this.memorizables_)
}
;
mpl$lab$util$ConcreteMemoList.prototype.memorize = function() {
    try {
        this.isMemorizing_ = !0,
        goog.array.forEach(this.memorizables_, function(a) {
            a.memorize()
        })
    } finally {
        this.isMemorizing_ = !1
    }
}
;
mpl$lab$util$ConcreteMemoList.prototype.removeMemo = function(a) {
    if (this.isMemorizing_)
        throw Error("removeMemo during memorize");
    goog.array.remove(this.memorizables_, a)
}
;
var mpl$lab$view$SimView = function(a, b) {
    mpl$lab$util$AbstractSubject.call(this, a);
    if (!(b instanceof mpl$lab$util$DoubleRect) || b.isEmpty())
        throw Error("bad simRect: " + b);
    this.panX = this.panY = .05;
    this.zoom = 1.1;
    this.simRect_ = b;
    this.screenRect_ = new mpl$lab$view$ScreenRect(0,0,800,600);
    this.horizAlign_ = mpl$lab$view$HorizAlign.MIDDLE;
    this.verticalAlign_ = mpl$lab$view$VerticalAlign.MIDDLE;
    this.aspectRatio_ = 1;
    this.displayList_ = new mpl$lab$view$DisplayList;
    this.scaleTogether_ = !0;
    this.opaqueness = 1;
    this.coordMap_ = mpl$lab$view$CoordMap.make(this.screenRect_, this.simRect_, this.horizAlign_, this.verticalAlign_, this.aspectRatio_);
    this.width_ = b.getWidth();
    this.height_ = b.getHeight();
    this.centerX_ = b.getCenterX();
    this.centerY_ = b.getCenterY();
    this.ratio_ = this.height_ / this.width_;
    this.memoList_ = new mpl$lab$util$ConcreteMemoList;
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$SimView.en.WIDTH,mpl$lab$view$SimView.i18n.WIDTH,goog.bind(this.getWidth, this),goog.bind(this.setWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$SimView.en.HEIGHT,mpl$lab$view$SimView.i18n.HEIGHT,goog.bind(this.getHeight, this),goog.bind(this.setHeight, this)));
    this.addParameter((new mpl$lab$util$ParameterNumber(this,mpl$lab$view$SimView.en.CENTER_X,mpl$lab$view$SimView.i18n.CENTER_X,goog.bind(this.getCenterX, this),goog.bind(this.setCenterX, this))).setLowerLimit(Number.NEGATIVE_INFINITY));
    this.addParameter((new mpl$lab$util$ParameterNumber(this,mpl$lab$view$SimView.en.CENTER_Y,mpl$lab$view$SimView.i18n.CENTER_Y,goog.bind(this.getCenterY, this),goog.bind(this.setCenterY, this))).setLowerLimit(Number.NEGATIVE_INFINITY));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$view$SimView.en.SCALE_TOGETHER,mpl$lab$view$SimView.i18n.SCALE_TOGETHER,goog.bind(this.getScaleTogether, this),goog.bind(this.setScaleTogether, this)));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$view$SimView.en.VERTICAL_ALIGN,mpl$lab$view$SimView.i18n.VERTICAL_ALIGN,goog.bind(this.getVerticalAlign, this),goog.bind(function(a) {
        this.setVerticalAlign(mpl$lab$view$VerticalAlign.stringToEnum(a))
    }, this),mpl$lab$view$VerticalAlign.getChoices(),mpl$lab$view$VerticalAlign.getValues()));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$view$SimView.en.HORIZONTAL_ALIGN,mpl$lab$view$SimView.i18n.HORIZONTAL_ALIGN,goog.bind(this.getHorizAlign, this),goog.bind(function(a) {
        this.setHorizAlign(mpl$lab$view$HorizAlign.stringToEnum(a))
    }, this),mpl$lab$view$HorizAlign.getChoices(),mpl$lab$view$HorizAlign.getValues()));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$SimView.en.ASPECT_RATIO,mpl$lab$view$SimView.i18n.ASPECT_RATIO,goog.bind(this.getAspectRatio, this),goog.bind(this.setAspectRatio, this)))
};
$jscomp.inherits(mpl$lab$view$SimView, mpl$lab$util$AbstractSubject);
mpl$lab$view$SimView.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", simRect_: " + this.simRect_ + ", screenRect_: " + this.screenRect_ + ", horizAlign_: " + this.horizAlign_ + ", verticalAlign_: " + this.verticalAlign_ + ", aspectRatio_: " + mpl$lab$util$Util.NF5(this.aspectRatio_) + ", opaqueness: " + mpl$lab$util$Util.NF5(this.opaqueness) + ", coordMap_: " + this.coordMap_ + ", memoList_: " + this.memoList_ + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$view$SimView.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", displayList_: " + this.displayList_.toStringShort() + "}"
}
;
mpl$lab$view$SimView.prototype.getClassName = function() {
    return "SimView"
}
;
mpl$lab$view$SimView.prototype.addMemo = function(a) {
    this.memoList_.addMemo(a)
}
;
mpl$lab$view$SimView.prototype.gainFocus = function() {}
;
mpl$lab$view$SimView.prototype.getAspectRatio = function() {
    return this.aspectRatio_
}
;
mpl$lab$view$SimView.prototype.getCenterX = function() {
    return this.centerX_
}
;
mpl$lab$view$SimView.prototype.getCenterY = function() {
    return this.centerY_
}
;
mpl$lab$view$SimView.prototype.getCoordMap = function() {
    return this.coordMap_
}
;
mpl$lab$view$SimView.prototype.getDisplayList = function() {
    return this.displayList_
}
;
mpl$lab$view$SimView.prototype.getHeight = function() {
    return this.height_
}
;
mpl$lab$view$SimView.prototype.getHorizAlign = function() {
    return this.horizAlign_
}
;
mpl$lab$view$SimView.prototype.getMemos = function() {
    return this.memoList_.getMemos()
}
;
mpl$lab$view$SimView.prototype.getScaleTogether = function() {
    return this.scaleTogether_
}
;
mpl$lab$view$SimView.prototype.getScreenRect = function() {
    return this.screenRect_
}
;
mpl$lab$view$SimView.prototype.getSimRect = function() {
    return this.simRect_
}
;
mpl$lab$view$SimView.prototype.getVerticalAlign = function() {
    return this.verticalAlign_
}
;
mpl$lab$view$SimView.prototype.getWidth = function() {
    return this.width_
}
;
mpl$lab$view$SimView.prototype.loseFocus = function() {}
;
mpl$lab$view$SimView.prototype.memorize = function() {
    this.memoList_.memorize()
}
;
mpl$lab$view$SimView.prototype.modifySimRect = function() {
    var a = this.centerX_ - this.width_ / 2
      , b = this.centerY_ - this.height_ / 2;
    a = new mpl$lab$util$DoubleRect(a,b,a + this.width_,b + this.height_);
    this.setSimRect(a)
}
;
mpl$lab$view$SimView.prototype.paint = function(a) {
    a.save();
    a.globalAlpha = this.opaqueness;
    this.displayList_.draw(a, this.coordMap_);
    a.restore()
}
;
mpl$lab$view$SimView.prototype.panDown = function() {
    this.setCenterY(this.centerY_ - this.panY * this.height_)
}
;
mpl$lab$view$SimView.prototype.panLeft = function() {
    this.setCenterX(this.centerX_ - this.panX * this.width_)
}
;
mpl$lab$view$SimView.prototype.panRight = function() {
    this.setCenterX(this.centerX_ + this.panX * this.width_)
}
;
mpl$lab$view$SimView.prototype.panUp = function() {
    this.setCenterY(this.centerY_ + this.panY * this.height_)
}
;
mpl$lab$view$SimView.prototype.realign = function() {
    this.setCoordMap(mpl$lab$view$CoordMap.make(this.screenRect_, this.simRect_, this.horizAlign_, this.verticalAlign_, this.aspectRatio_));
    this.width_ = this.simRect_.getWidth();
    this.height_ = this.simRect_.getHeight();
    this.centerX_ = this.simRect_.getCenterX();
    this.centerY_ = this.simRect_.getCenterY();
    this.ratio_ = this.height_ / this.width_
}
;
mpl$lab$view$SimView.prototype.removeMemo = function(a) {
    this.memoList_.removeMemo(a)
}
;
mpl$lab$view$SimView.prototype.setAspectRatio = function(a) {
    mpl$lab$util$Util.veryDifferent(this.aspectRatio_, a) && (this.aspectRatio_ = a,
    this.realign(),
    this.broadcastParameter(mpl$lab$view$SimView.en.ASPECT_RATIO))
}
;
mpl$lab$view$SimView.prototype.setCenterX = function(a) {
    mpl$lab$util$Util.veryDifferent(this.centerX_, a) && (this.centerX_ = a,
    this.modifySimRect())
}
;
mpl$lab$view$SimView.prototype.setCenterY = function(a) {
    mpl$lab$util$Util.veryDifferent(this.centerY_, a) && (this.centerY_ = a,
    this.modifySimRect())
}
;
mpl$lab$view$SimView.prototype.setCoordMap = function(a) {
    if (!mpl$lab$view$CoordMap.isDuckType(a))
        throw Error("not a CoordMap: " + a);
    this.coordMap_ = a;
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabView.COORD_MAP_CHANGED))
}
;
mpl$lab$view$SimView.prototype.setHeight = function(a) {
    mpl$lab$util$Util.veryDifferent(this.height_, a) && (this.height_ = a,
    this.scaleTogether_ && (this.width_ = this.height_ / this.ratio_),
    this.modifySimRect())
}
;
mpl$lab$view$SimView.prototype.setHorizAlign = function(a) {
    this.horizAlign_ = mpl$lab$view$HorizAlign.stringToEnum(a);
    this.realign();
    this.broadcastParameter(mpl$lab$view$SimView.en.HORIZONTAL_ALIGN)
}
;
mpl$lab$view$SimView.prototype.setScaleTogether = function(a) {
    if (this.scaleTogether_ != a) {
        if (this.scaleTogether_ = a)
            this.ratio_ = this.height_ / this.width_;
        this.broadcastParameter(mpl$lab$view$SimView.en.SCALE_TOGETHER)
    }
}
;
mpl$lab$view$SimView.prototype.setScreenRect = function(a) {
    if (!mpl$lab$view$ScreenRect.isDuckType(a))
        throw Error("not a ScreenRect: " + a);
    if (a.isEmpty())
        throw Error("empty screenrect");
    this.screenRect_.equals(a) || (this.screenRect_ = a,
    this.realign(),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabView.SCREEN_RECT_CHANGED)))
}
;
mpl$lab$view$SimView.prototype.setSimRect = function(a) {
    if (!mpl$lab$util$DoubleRect.isDuckType(a))
        throw Error("not a DoubleRect: " + a);
    a.equals(this.simRect_) || (this.simRect_ = a,
    this.realign(),
    this.broadcastParameter(mpl$lab$view$SimView.en.WIDTH),
    this.broadcastParameter(mpl$lab$view$SimView.en.HEIGHT),
    this.broadcastParameter(mpl$lab$view$SimView.en.CENTER_X),
    this.broadcastParameter(mpl$lab$view$SimView.en.CENTER_Y),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabView.SIM_RECT_CHANGED)))
}
;
mpl$lab$view$SimView.prototype.setVerticalAlign = function(a) {
    this.verticalAlign_ = mpl$lab$view$VerticalAlign.stringToEnum(a);
    this.realign();
    this.broadcastParameter(mpl$lab$view$SimView.en.VERTICAL_ALIGN)
}
;
mpl$lab$view$SimView.prototype.setWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(this.width_, a) && (this.width_ = a,
    this.scaleTogether_ && (this.height_ = this.width_ * this.ratio_),
    this.modifySimRect())
}
;
mpl$lab$view$SimView.prototype.zoomIn = function() {
    this.setHeight(this.height_ / this.zoom)
}
;
mpl$lab$view$SimView.prototype.zoomOut = function() {
    this.setHeight(this.height_ * this.zoom)
}
;
mpl$lab$view$SimView.en = {
    SCALE_TOGETHER: "scale X-Y together",
    WIDTH: "width",
    HEIGHT: "height",
    CENTER_X: "center-x",
    CENTER_Y: "center-y",
    VERTICAL_ALIGN: "vertical-align",
    HORIZONTAL_ALIGN: "horizontal-align",
    ASPECT_RATIO: "aspect-ratio"
};
mpl$lab$view$SimView.de_strings = {
    SCALE_TOGETHER: "X-Y zusammen skalieren",
    WIDTH: "Breite",
    HEIGHT: "H\u00f6he",
    CENTER_X: "Mitte X",
    CENTER_Y: "Mitte Y",
    VERTICAL_ALIGN: "Vertikalejustierung",
    HORIZONTAL_ALIGN: "Horizontalejustierung",
    ASPECT_RATIO: "Querschnittsverh\u00e4ltnis"
};
mpl$lab$view$SimView.i18n = "de" === goog.LOCALE ? mpl$lab$view$SimView.de_strings : mpl$lab$view$SimView.en;
var mpl$lab$graph$AutoScale = function(a, b, c) {
    mpl$lab$util$AbstractSubject.call(this, a);
    if (goog.isDef(b) && !mpl$lab$graph$GraphLine.isDuckType(b))
        throw Error("not a GraphLine " + b);
    this.graphLines_ = [];
    mpl$lab$graph$GraphLine.isDuckType(b) && (this.graphLines_.push(b),
    b.addObserver(this));
    this.simView_ = c;
    c.addMemo(this);
    c.addObserver(this);
    this.isActive_ = this.enabled_ = !0;
    this.ownEvent_ = !1;
    this.axis_ = mpl$lab$graph$AutoScale.BOTH_AXES;
    this.lastIndex_ = goog.array.repeat(-1, this.graphLines_.length);
    this.rangeSetY_ = this.rangeSetX_ = !1;
    this.rangeYLo_ = this.rangeYHi_ = this.rangeXLo_ = this.rangeXHi_ = 0;
    this.timeWindow_ = 10;
    this.extraMargin = .01;
    this.minSize = 1E-14;
    this.addParameter((new mpl$lab$util$ParameterNumber(this,mpl$lab$graph$AutoScale.en.TIME_WINDOW,mpl$lab$graph$AutoScale.i18n.TIME_WINDOW,goog.bind(this.getTimeWindow, this),goog.bind(this.setTimeWindow, this))).setSignifDigits(3));
    a = [mpl$lab$graph$AutoScale.VERTICAL, mpl$lab$graph$AutoScale.HORIZONTAL, mpl$lab$graph$AutoScale.BOTH_AXES];
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$graph$AutoScale.en.AXIS,mpl$lab$graph$AutoScale.i18n.AXIS,goog.bind(this.getAxis, this),goog.bind(this.setAxis, this),a,a));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$graph$AutoScale.en.ACTIVE,mpl$lab$graph$AutoScale.i18n.ACTIVE,goog.bind(this.getActive, this),goog.bind(this.setActive, this)));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$graph$AutoScale.en.ENABLED,mpl$lab$graph$AutoScale.i18n.ENABLED,goog.bind(this.getEnabled, this),goog.bind(this.setEnabled, this)));
    this.setComputed(this.isActive_)
};
$jscomp.inherits(mpl$lab$graph$AutoScale, mpl$lab$util$AbstractSubject);
mpl$lab$graph$AutoScale.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", enabled_: " + this.enabled_ + ", isActive_: " + this.isActive_ + ", axis_: " + this.axis_ + ", extraMargin: " + mpl$lab$util$Util.NF(this.extraMargin) + ", minSize: " + mpl$lab$util$Util.NF(this.minSize) + ", timeWindow_: " + mpl$lab$util$Util.NF(this.timeWindow_) + ", simView_: " + this.simView_.toStringShort() + ", graphLines_: [" + goog.array.map(this.graphLines_, function(a) {
        return a.toStringShort()
    }) + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$graph$AutoScale.prototype.getClassName = function() {
    return "AutoScale"
}
;
mpl$lab$graph$AutoScale.prototype.addGraphLine = function(a) {
    if (mpl$lab$graph$GraphLine.isDuckType(a))
        goog.array.contains(this.graphLines_, a) || (this.graphLines_.push(a),
        this.lastIndex_.push(-1));
    else
        throw Error("not a GraphLine " + a);
}
;
mpl$lab$graph$AutoScale.prototype.clearRange = function() {
    this.rangeXHi_ = this.rangeXLo_ = 0;
    this.rangeSetX_ = !1;
    this.rangeYHi_ = this.rangeYLo_ = 0;
    this.rangeSetY_ = !1
}
;
mpl$lab$graph$AutoScale.prototype.getActive = function() {
    return this.isActive_
}
;
mpl$lab$graph$AutoScale.prototype.getAxis = function() {
    return this.axis_
}
;
mpl$lab$graph$AutoScale.prototype.getEnabled = function() {
    return this.enabled_
}
;
mpl$lab$graph$AutoScale.prototype.getRangeRect = function() {
    return new mpl$lab$util$DoubleRect(this.rangeXLo_,this.rangeYLo_,this.rangeXHi_,this.rangeYHi_)
}
;
mpl$lab$graph$AutoScale.prototype.getTimeWindow = function() {
    return this.timeWindow_
}
;
mpl$lab$graph$AutoScale.prototype.memorize = function() {
    for (var a = 0, b = this.graphLines_.length; a < b; a++) {
        var c = this.graphLines_[a].getGraphPoints();
        this.lastIndex_[a] > c.getEndIndex() && this.reset()
    }
    a = 0;
    for (b = this.graphLines_.length; a < b; a++)
        for (c = this.graphLines_[a].getGraphPoints(),
        c = c.getIterator(this.lastIndex_[a]); c.hasNext(); ) {
            var d = c.nextValue();
            this.updateRange_(this.graphLines_[a], d.x, d.y);
            this.lastIndex_[a] = c.getIndex()
        }
    this.rangeCheck_()
}
;
mpl$lab$graph$AutoScale.prototype.observe = function(a) {
    a.getSubject() == this.simView_ ? a.nameEquals(mpl$lab$view$LabView.SIM_RECT_CHANGED) && (this.ownEvent_ || this.setActive(!1)) : goog.array.contains(this.graphLines_, a.getSubject()) && (a.nameEquals(mpl$lab$graph$GraphLine.en.X_VARIABLE) || a.nameEquals(mpl$lab$graph$GraphLine.en.Y_VARIABLE) ? this.reset() : a.nameEquals(mpl$lab$graph$GraphLine.RESET) && this.setActive(!0))
}
;
mpl$lab$graph$AutoScale.prototype.rangeCheck_ = function() {
    var a = this.minSize;
    if (this.rangeXHi_ - this.rangeXLo_ < a) {
        var b = (this.rangeXHi_ + this.rangeXLo_) / 2;
        var c = Math.max(b * a, a);
        this.rangeXHi_ = b + c;
        this.rangeXLo_ = b - c
    }
    this.rangeYHi_ - this.rangeYLo_ < a && (b = (this.rangeYHi_ + this.rangeYLo_) / 2,
    c = Math.max(b * a, a),
    this.rangeYHi_ = b + c,
    this.rangeYLo_ = b - c);
    b = this.getRangeRect();
    c = this.simView_.getSimRect();
    this.axis_ == mpl$lab$graph$AutoScale.VERTICAL ? b = new mpl$lab$util$DoubleRect(c.getLeft(),b.getBottom(),c.getRight(),b.getTop()) : this.axis_ == mpl$lab$graph$AutoScale.HORIZONTAL && (b = new mpl$lab$util$DoubleRect(b.getLeft(),c.getBottom(),b.getRight(),c.getTop()));
    this.isActive_ && !b.nearEqual(c) && (this.ownEvent_ = !0,
    this.simView_.setSimRect(b),
    this.ownEvent_ = !1,
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$graph$AutoScale.AUTO_SCALE,b)))
}
;
mpl$lab$graph$AutoScale.prototype.removeGraphLine = function(a) {
    if (mpl$lab$graph$GraphLine.isDuckType(a)) {
        var b = goog.array.indexOf(this.graphLines_, a);
        goog.array.removeAt(this.graphLines_, b);
        goog.array.removeAt(this.lastIndex_, b);
        goog.asserts.assert(!goog.array.contains(this.graphLines_, a));
        this.reset()
    } else
        throw Error("not a GraphLine " + a);
}
;
mpl$lab$graph$AutoScale.prototype.reset = function() {
    this.clearRange();
    for (var a = 0, b = this.lastIndex_.length; a < b; a++)
        this.lastIndex_[a] = -1
}
;
mpl$lab$graph$AutoScale.prototype.setActive = function(a) {
    this.isActive_ != a && (a ? this.enabled_ && (this.reset(),
    this.simView_.addMemo(this),
    this.setComputed(!0),
    this.isActive_ = !0,
    this.broadcastParameter(mpl$lab$graph$AutoScale.en.ACTIVE)) : (this.simView_.removeMemo(this),
    this.setComputed(!1),
    this.isActive_ = !1,
    this.broadcastParameter(mpl$lab$graph$AutoScale.en.ACTIVE)));
    goog.asserts.assert(this.enabled_ || !this.isActive_)
}
;
mpl$lab$graph$AutoScale.prototype.setAxis = function(a) {
    if (a == mpl$lab$graph$AutoScale.VERTICAL || a == mpl$lab$graph$AutoScale.HORIZONTAL || a == mpl$lab$graph$AutoScale.BOTH_AXES)
        this.axis_ = a,
        this.broadcastParameter(mpl$lab$graph$AutoScale.en.AXIS);
    else
        throw Error("unknown " + a);
}
;
mpl$lab$graph$AutoScale.prototype.setComputed = function(a) {
    goog.array.forEach([mpl$lab$view$SimView.en.WIDTH, mpl$lab$view$SimView.en.HEIGHT, mpl$lab$view$SimView.en.CENTER_X, mpl$lab$view$SimView.en.CENTER_Y], goog.bind(function(b) {
        this.simView_.getParameter(b).setComputed(a)
    }, this))
}
;
mpl$lab$graph$AutoScale.prototype.setEnabled = function(a) {
    this.enabled_ != a && (this.enabled_ = a,
    this.setActive(a),
    this.broadcastParameter(mpl$lab$graph$AutoScale.en.ENABLED));
    goog.asserts.assert(this.enabled_ || !this.isActive_)
}
;
mpl$lab$graph$AutoScale.prototype.setTimeWindow = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.timeWindow_) && (this.timeWindow_ = a,
    this.reset(),
    this.setActive(!0),
    this.broadcastParameter(mpl$lab$graph$AutoScale.en.TIME_WINDOW))
}
;
mpl$lab$graph$AutoScale.prototype.updateRange_ = function(a, b, c) {
    isFinite(b) || (b == Number.POSITIVE_INFINITY ? b = 1E308 : b == Number.NEGATIVE_INFINITY && (b = -1E308));
    isFinite(c) || (c == Number.POSITIVE_INFINITY ? c = 1E308 : c == Number.NEGATIVE_INFINITY && (c = -1E308));
    var d = a.getVarsList().timeIndex()
      , e = a.getXVariable() == d;
    a = a.getYVariable() == d;
    this.rangeSetX_ ? (b < this.rangeXLo_ && (e ? (this.rangeXLo_ = b,
    this.rangeXHi_ = b + this.timeWindow_) : this.rangeXLo_ = b - this.extraMargin * (this.rangeXHi_ - this.rangeXLo_)),
    e ? b > this.rangeXHi_ - this.extraMargin * this.timeWindow_ && (this.rangeXHi_ = b + this.extraMargin * this.timeWindow_,
    this.rangeXLo_ = this.rangeXHi_ - this.timeWindow_) : b > this.rangeXHi_ && (this.rangeXHi_ = b + this.extraMargin * (this.rangeXHi_ - this.rangeXLo_))) : (this.rangeXLo_ = b,
    this.rangeXHi_ = b + (e ? this.timeWindow_ : 0),
    this.rangeSetX_ = !0);
    this.rangeSetY_ ? (c < this.rangeYLo_ && (a ? (this.rangeYLo_ = c,
    this.rangeYHi_ = c + this.timeWindow_) : this.rangeYLo_ = c - this.extraMargin * (this.rangeYHi_ - this.rangeYLo_)),
    a ? c > this.rangeYHi_ - this.extraMargin * this.timeWindow_ && (this.rangeYHi_ = c + this.extraMargin * this.timeWindow_,
    this.rangeYLo_ = this.rangeYHi_ - this.timeWindow_) : c > this.rangeYHi_ && (this.rangeYHi_ = c + this.extraMargin * (this.rangeYHi_ - this.rangeYLo_))) : (this.rangeYLo_ = c,
    this.rangeYHi_ = c + (a ? this.timeWindow_ : 0),
    this.rangeSetY_ = !0)
}
;
mpl$lab$graph$AutoScale.AUTO_SCALE = "AUTO_SCALE";
mpl$lab$graph$AutoScale.BOTH_AXES = "BOTH_AXES";
mpl$lab$graph$AutoScale.HORIZONTAL = "HORIZONTAL";
mpl$lab$graph$AutoScale.VERTICAL = "VERTICAL";
mpl$lab$graph$AutoScale.en = {
    AXIS: "axis",
    TIME_WINDOW: "time window",
    ACTIVE: "active",
    ENABLED: "enabled"
};
mpl$lab$graph$AutoScale.de_strings = {
    AXIS: "Achse",
    TIME_WINDOW: "Zeitfenster",
    ACTIVE: "aktiviert",
    ENABLED: "erm\u00f6glichte"
};
mpl$lab$graph$AutoScale.i18n = "de" === goog.LOCALE ? mpl$lab$graph$AutoScale.de_strings : mpl$lab$graph$AutoScale.en;
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {}
;
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
    goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
    if (goog.debug.entryPointRegistry.monitorsMayExist_)
        for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++)
            a(goog.bind(b[c].wrap, b[c]))
}
;
goog.debug.entryPointRegistry.monitorAll = function(a) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++)
        goog.debug.entryPointRegistry.refList_[c](b);
    goog.debug.entryPointRegistry.monitors_.push(a)
}
;
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
    var b = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
    a = goog.bind(a.unwrap, a);
    for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++)
        goog.debug.entryPointRegistry.refList_[c](a);
    b.length--
}
;
goog.debug.errorcontext = {};
goog.debug.errorcontext.addErrorContext = function(a, b, c) {
    a[goog.debug.errorcontext.CONTEXT_KEY_] || (a[goog.debug.errorcontext.CONTEXT_KEY_] = {});
    a[goog.debug.errorcontext.CONTEXT_KEY_][b] = c
}
;
goog.debug.errorcontext.getErrorContext = function(a) {
    return a[goog.debug.errorcontext.CONTEXT_KEY_] || {}
}
;
goog.debug.errorcontext.CONTEXT_KEY_ = "__closure__error__context__984382";
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function(a, b) {
    return 0 == a.lastIndexOf(b, 0)
}
;
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return 0 <= c && a.indexOf(b, c) == c
}
;
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
}
;
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
}
;
goog.string.caseInsensitiveEquals = function(a, b) {
    return a.toLowerCase() == b.toLowerCase()
}
;
goog.string.subs = function(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
        d += c.shift() + e.shift();
    return d + c.join("%s")
}
;
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
}
;
goog.string.isEmptyOrWhitespace = function(a) {
    return /^[\s\xa0]*$/.test(a)
}
;
goog.string.isEmptyString = function(a) {
    return 0 == a.length
}
;
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
    return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
}
;
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
}
;
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
}
;
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
}
;
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
}
;
goog.string.isSpace = function(a) {
    return " " == a
}
;
goog.string.isUnicodeChar = function(a) {
    return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
}
;
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
}
;
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
}
;
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
}
;
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
}
;
goog.string.collapseBreakingSpaces = function(a) {
    return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
;
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
    return a.trim()
}
: function(a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
}
;
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
}
;
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
}
;
goog.string.caseInsensitiveCompare = function(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    return a < b ? -1 : a == b ? 0 : 1
}
;
goog.string.numberAwareCompare_ = function(a, b, c) {
    if (a == b)
        return 0;
    if (!a)
        return -1;
    if (!b)
        return 1;
    for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
        c = d[g];
        var h = e[g];
        if (c != h)
            return a = parseInt(c, 10),
            !isNaN(a) && (b = parseInt(h, 10),
            !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
    }
    return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
}
;
goog.string.intAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
}
;
goog.string.floatAwareCompare = function(a, b) {
    return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
}
;
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
    return encodeURIComponent(String(a))
}
;
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
}
;
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
}
;
goog.string.htmlEscape = function(a, b) {
    if (b)
        a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"),
        goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
    else {
        if (!goog.string.ALL_RE_.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
        goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
    }
    return a
}
;
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
    return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document"in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
}
;
goog.string.unescapeEntitiesWithDocument = function(a, b) {
    return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
}
;
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
    var c = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"'
    };
    var d = b ? b.createElement("div") : goog.global.document.createElement("div");
    return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
        var e = c[a];
        if (e)
            return e;
        "#" == b.charAt(0) && (b = Number("0" + b.substr(1)),
        isNaN(b) || (e = String.fromCharCode(b)));
        e || (d.innerHTML = a + " ",
        e = d.firstChild.nodeValue.slice(0, -1));
        return c[a] = e
    })
}
;
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(a, c) {
        switch (c) {
        case "amp":
            return "&";
        case "lt":
            return "<";
        case "gt":
            return ">";
        case "quot":
            return '"';
        default:
            return "#" != c.charAt(0) || (c = Number("0" + c.substr(1)),
            isNaN(c)) ? a : String.fromCharCode(c)
        }
    })
}
;
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
}
;
goog.string.preserveSpaces = function(a) {
    return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
}
;
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = 1 == c ? b : b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length - 1) == e)
            return a.substring(1, a.length - 1)
    }
    return a
}
;
goog.string.truncate = function(a, b, c) {
    c && (a = goog.string.unescapeEntities(a));
    a.length > b && (a = a.substring(0, b - 3) + "...");
    c && (a = goog.string.htmlEscape(a));
    return a
}
;
goog.string.truncateMiddle = function(a, b, c, d) {
    c && (a = goog.string.unescapeEntities(a));
    if (d && a.length > b) {
        d > b && (d = b);
        var e = a.length - d;
        a = a.substring(0, b - d) + "..." + a.substring(e)
    } else
        a.length > b && (d = Math.floor(b / 2),
        e = a.length - d,
        a = a.substring(0, d + b % 2) + "..." + a.substring(e));
    c && (a = goog.string.htmlEscape(a));
    return a
}
;
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\x0B",
    '"': '\\"',
    "\\": "\\\\",
    "<": "<"
};
goog.string.jsEscapeCache_ = {
    "'": "\\'"
};
goog.string.quote = function(a) {
    a = String(a);
    for (var b = ['"'], c = 0; c < a.length; c++) {
        var d = a.charAt(c)
          , e = d.charCodeAt(0);
        b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
    }
    b.push('"');
    return b.join("")
}
;
goog.string.escapeString = function(a) {
    for (var b = [], c = 0; c < a.length; c++)
        b[c] = goog.string.escapeChar(a.charAt(c));
    return b.join("")
}
;
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_)
        return goog.string.jsEscapeCache_[a];
    if (a in goog.string.specialEscapeChars_)
        return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
    var b = a.charCodeAt(0);
    if (31 < b && 127 > b)
        var c = a;
    else {
        if (256 > b) {
            if (c = "\\x",
            16 > b || 256 < b)
                c += "0"
        } else
            c = "\\u",
            4096 > b && (c += "0");
        c += b.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = c
}
;
goog.string.contains = function(a, b) {
    return -1 != a.indexOf(b)
}
;
goog.string.caseInsensitiveContains = function(a, b) {
    return goog.string.contains(a.toLowerCase(), b.toLowerCase())
}
;
goog.string.countOf = function(a, b) {
    return a && b ? a.split(b).length - 1 : 0
}
;
goog.string.removeAt = function(a, b, c) {
    var d = a;
    0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
    return d
}
;
goog.string.remove = function(a, b) {
    return a.replace(b, "")
}
;
goog.string.removeAll = function(a, b) {
    b = new RegExp(goog.string.regExpEscape(b),"g");
    return a.replace(b, "")
}
;
goog.string.replaceAll = function(a, b, c) {
    b = new RegExp(goog.string.regExpEscape(b),"g");
    return a.replace(b, c.replace(/\$/g, "$$$$"))
}
;
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
}
;
goog.string.repeat = String.prototype.repeat ? function(a, b) {
    return a.repeat(b)
}
: function(a, b) {
    return Array(b + 1).join(a)
}
;
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf(".");
    -1 == c && (c = a.length);
    return goog.string.repeat("0", Math.max(0, b - c)) + a
}
;
goog.string.makeSafe = function(a) {
    return null == a ? "" : String(a)
}
;
goog.string.buildString = function(a) {
    return Array.prototype.join.call(arguments, "")
}
;
goog.string.getRandomString = function() {
    return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
}
;
goog.string.compareVersions = function(a, b) {
    var c = 0;
    a = goog.string.trim(String(a)).split(".");
    b = goog.string.trim(String(b)).split(".");
    for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
        var f = a[e] || ""
          , g = b[e] || "";
        do {
            f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            if (0 == f[0].length && 0 == g[0].length)
                break;
            c = 0 == f[1].length ? 0 : parseInt(f[1], 10);
            var h = 0 == g[1].length ? 0 : parseInt(g[1], 10);
            c = goog.string.compareElements_(c, h) || goog.string.compareElements_(0 == f[2].length, 0 == g[2].length) || goog.string.compareElements_(f[2], g[2]);
            f = f[3];
            g = g[3]
        } while (0 == c)
    }
    return c
}
;
goog.string.compareElements_ = function(a, b) {
    return a < b ? -1 : a > b ? 1 : 0
}
;
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c)
        b = 31 * b + a.charCodeAt(c) >>> 0;
    return b
}
;
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
}
;
goog.string.toNumber = function(a) {
    var b = Number(a);
    return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
}
;
goog.string.isLowerCamelCase = function(a) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
}
;
goog.string.isUpperCamelCase = function(a) {
    return /^([A-Z][a-z]*)+$/.test(a)
}
;
goog.string.toCamelCase = function(a) {
    return String(a).replace(/\-([a-z])/g, function(a, c) {
        return c.toUpperCase()
    })
}
;
goog.string.toSelectorCase = function(a) {
    return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
}
;
goog.string.toTitleCase = function(a, b) {
    b = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
    return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])","g"), function(a, b, e) {
        return b + e.toUpperCase()
    })
}
;
goog.string.capitalize = function(a) {
    return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
}
;
goog.string.parseInt = function(a) {
    isFinite(a) && (a = String(a));
    return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
}
;
goog.string.splitLimit = function(a, b, c) {
    a = a.split(b);
    for (var d = []; 0 < c && a.length; )
        d.push(a.shift()),
        c--;
    a.length && d.push(a.join(b));
    return d
}
;
goog.string.lastComponent = function(a, b) {
    if (b)
        "string" == typeof b && (b = [b]);
    else
        return a;
    for (var c = -1, d = 0; d < b.length; d++)
        if ("" != b[d]) {
            var e = a.lastIndexOf(b[d]);
            e > c && (c = e)
        }
    return -1 == c ? a : a.slice(c + 1)
}
;
goog.string.editDistance = function(a, b) {
    var c = []
      , d = [];
    if (a == b)
        return 0;
    if (!a.length || !b.length)
        return Math.max(a.length, b.length);
    for (var e = 0; e < b.length + 1; e++)
        c[e] = e;
    for (e = 0; e < a.length; e++) {
        d[0] = e + 1;
        for (var f = 0; f < b.length; f++)
            d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
        for (f = 0; f < c.length; f++)
            c[f] = d[f]
    }
    return d[b.length]
}
;
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var a = goog.labs.userAgent.util.getNavigator_();
    return a && (a = a.userAgent) ? a : ""
}
;
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
}
;
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
    goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
}
;
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
}
;
goog.labs.userAgent.util.matchUserAgent = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(b, a)
}
;
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
    var b = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(b, a)
}
;
goog.labs.userAgent.util.extractVersionTuples = function(a) {
    for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a); )
        c.push([d[1], d[2], d[3] || void 0]);
    return c
}
;
goog.object = {};
goog.object.is = function(a, b) {
    return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
}
;
goog.object.forEach = function(a, b, c) {
    for (var d in a)
        b.call(c, a[d], d, a)
}
;
goog.object.filter = function(a, b, c) {
    var d = {}, e;
    for (e in a)
        b.call(c, a[e], e, a) && (d[e] = a[e]);
    return d
}
;
goog.object.map = function(a, b, c) {
    var d = {}, e;
    for (e in a)
        d[e] = b.call(c, a[e], e, a);
    return d
}
;
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a))
            return !0;
    return !1
}
;
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a))
            return !1;
    return !0
}
;
goog.object.getCount = function(a) {
    var b = 0, c;
    for (c in a)
        b++;
    return b
}
;
goog.object.getAnyKey = function(a) {
    for (var b in a)
        return b
}
;
goog.object.getAnyValue = function(a) {
    for (var b in a)
        return a[b]
}
;
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
}
;
goog.object.getValues = function(a) {
    var b = [], c = 0, d;
    for (d in a)
        b[c++] = a[d];
    return b
}
;
goog.object.getKeys = function(a) {
    var b = [], c = 0, d;
    for (d in a)
        b[c++] = d;
    return b
}
;
goog.object.getValueByKeys = function(a, b) {
    var c = goog.isArrayLike(b)
      , d = c ? b : arguments;
    for (c = c ? 0 : 1; c < d.length; c++) {
        if (null == a)
            return;
        a = a[d[c]]
    }
    return a
}
;
goog.object.containsKey = function(a, b) {
    return null !== a && b in a
}
;
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b)
            return !0;
    return !1
}
;
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a))
            return d
}
;
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
}
;
goog.object.isEmpty = function(a) {
    for (var b in a)
        return !1;
    return !0
}
;
goog.object.clear = function(a) {
    for (var b in a)
        delete a[b]
}
;
goog.object.remove = function(a, b) {
    var c;
    (c = b in a) && delete a[b];
    return c
}
;
goog.object.add = function(a, b, c) {
    if (null !== a && b in a)
        throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
}
;
goog.object.get = function(a, b, c) {
    return null !== a && b in a ? a[b] : c
}
;
goog.object.set = function(a, b, c) {
    a[b] = c
}
;
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : a[b] = c
}
;
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
    if (b in a)
        return a[b];
    c = c();
    return a[b] = c
}
;
goog.object.equals = function(a, b) {
    for (var c in a)
        if (!(c in b) || a[c] !== b[c])
            return !1;
    for (c in b)
        if (!(c in a))
            return !1;
    return !0
}
;
goog.object.clone = function(a) {
    var b = {}, c;
    for (c in a)
        b[c] = a[c];
    return b
}
;
goog.object.unsafeClone = function(a) {
    var b = goog.typeOf(a);
    if ("object" == b || "array" == b) {
        if (goog.isFunction(a.clone))
            return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a)
            b[c] = goog.object.unsafeClone(a[c]);
        return b
    }
    return a
}
;
goog.object.transpose = function(a) {
    var b = {}, c;
    for (c in a)
        b[a[c]] = c;
    return b
}
;
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            a[c] = d[c];
        for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++)
            c = goog.object.PROTOTYPE_FIELDS_[f],
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
}
;
goog.object.create = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0]))
        return goog.object.create.apply(null, arguments[0]);
    if (b % 2)
        throw Error("Uneven number of arguments");
    for (var c = {}, d = 0; d < b; d += 2)
        c[arguments[d]] = arguments[d + 1];
    return c
}
;
goog.object.createSet = function(a) {
    var b = arguments.length;
    if (1 == b && goog.isArray(arguments[0]))
        return goog.object.createSet.apply(null, arguments[0]);
    for (var c = {}, d = 0; d < b; d++)
        c[arguments[d]] = !0;
    return c
}
;
goog.object.createImmutableView = function(a) {
    var b = a;
    Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a),
    Object.freeze(b));
    return b
}
;
goog.object.isImmutableView = function(a) {
    return !!Object.isFrozen && Object.isFrozen(a)
}
;
goog.object.getAllPropertyNames = function(a, b, c) {
    if (!a)
        return [];
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf)
        return goog.object.getKeys(a);
    for (var d = {}; a && (a !== Object.prototype || b) && (a !== Function.prototype || c); ) {
        for (var e = Object.getOwnPropertyNames(a), f = 0; f < e.length; f++)
            d[e[f]] = !0;
        a = Object.getPrototypeOf(a)
    }
    return goog.object.getKeys(d)
}
;
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera")
}
;
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}
;
goog.labs.userAgent.browser.matchEdge_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
}
;
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
}
;
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
}
;
goog.labs.userAgent.browser.matchCoast_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Coast")
}
;
goog.labs.userAgent.browser.matchIosWebview_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
}
;
goog.labs.userAgent.browser.matchChrome_ = function() {
    return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_()
}
;
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
}
;
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
}
;
goog.labs.userAgent.browser.getVersion = function() {
    function a(a) {
        a = goog.array.find(a, d);
        return c[a] || ""
    }
    var b = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE())
        return goog.labs.userAgent.browser.getIEVersion_(b);
    b = goog.labs.userAgent.util.extractVersionTuples(b);
    var c = {};
    goog.array.forEach(b, function(a) {
        c[a[0]] = a[1]
    });
    var d = goog.partial(goog.object.containsKey, c);
    return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
}
;
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
}
;
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
    var b = /rv: *([\d\.]*)/.exec(a);
    if (b && b[1])
        return b[1];
    b = "";
    var c = /MSIE +([\d\.]+)/.exec(a);
    if (c && c[1])
        if (a = /Trident\/(\d.\d)/.exec(a),
        "7.0" == c[1])
            if (a && a[1])
                switch (a[1]) {
                case "4.0":
                    b = "8.0";
                    break;
                case "5.0":
                    b = "9.0";
                    break;
                case "6.0":
                    b = "10.0";
                    break;
                case "7.0":
                    b = "11.0"
                }
            else
                b = "7.0";
        else
            b = c[1];
    return b
}
;
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
}
;
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
}
;
goog.labs.userAgent.engine.isEdge = function() {
    return goog.labs.userAgent.util.matchUserAgent("Edge")
}
;
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
}
;
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
}
;
goog.labs.userAgent.engine.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent();
    if (a) {
        a = goog.labs.userAgent.util.extractVersionTuples(a);
        var b = goog.labs.userAgent.engine.getEngineTuple_(a);
        if (b)
            return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
        a = a[0];
        var c;
        if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c)))
            return c[1]
    }
    return ""
}
;
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
    if (!goog.labs.userAgent.engine.isEdge())
        return a[1];
    for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if ("Edge" == c[0])
            return c
    }
}
;
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
}
;
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
    return (a = goog.array.find(a, function(a) {
        return b == a[0]
    })) && a[1] || ""
}
;
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
    return goog.labs.userAgent.util.matchUserAgent("Android")
}
;
goog.labs.userAgent.platform.isIpod = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPod")
}
;
goog.labs.userAgent.platform.isIphone = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
}
;
goog.labs.userAgent.platform.isIpad = function() {
    return goog.labs.userAgent.util.matchUserAgent("iPad")
}
;
goog.labs.userAgent.platform.isIos = function() {
    return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
}
;
goog.labs.userAgent.platform.isMacintosh = function() {
    return goog.labs.userAgent.util.matchUserAgent("Macintosh")
}
;
goog.labs.userAgent.platform.isLinux = function() {
    return goog.labs.userAgent.util.matchUserAgent("Linux")
}
;
goog.labs.userAgent.platform.isWindows = function() {
    return goog.labs.userAgent.util.matchUserAgent("Windows")
}
;
goog.labs.userAgent.platform.isChromeOS = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrOS")
}
;
goog.labs.userAgent.platform.isChromecast = function() {
    return goog.labs.userAgent.util.matchUserAgent("CrKey")
}
;
goog.labs.userAgent.platform.getVersion = function() {
    var a = goog.labs.userAgent.util.getUserAgent()
      , b = "";
    goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/,
    b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,
    b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/,
    b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
    b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,
    b = (a = b.exec(a)) && a[1]);
    return b || ""
}
;
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
    return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
}
;
goog.reflect = {};
goog.reflect.object = function(a, b) {
    return b
}
;
goog.reflect.objectProperty = function(a, b) {
    return a
}
;
goog.reflect.sinkValue = function(a) {
    goog.reflect.sinkValue[" "](a);
    return a
}
;
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
    try {
        return goog.reflect.sinkValue(a[b]),
        !0
    } catch (c) {}
    return !1
}
;
goog.reflect.cache = function(a, b, c, d) {
    d = d ? d(b) : b;
    return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
}
;
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
}
;
goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
}
;
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
}
;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigator();
    return a && a.platform || ""
}
;
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
    return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
}
;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
    var a = goog.userAgent.getNavigator();
    return !!a && goog.string.contains(a.appVersion || "", "X11")
}
;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.determineVersion_ = function() {
    var a = ""
      , b = goog.userAgent.getVersionRegexResult_();
    b && (a = b ? b[1] : "");
    return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(),
    null != b && b > parseFloat(a)) ? String(b) : a
}
;
goog.userAgent.getVersionRegexResult_ = function() {
    var a = goog.userAgent.getUserAgentString();
    if (goog.userAgent.GECKO)
        return /rv:([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.EDGE)
        return /Edge\/([\d\.]+)/.exec(a);
    if (goog.userAgent.IE)
        return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (goog.userAgent.WEBKIT)
        return /WebKit\/(\S+)/.exec(a);
    if (goog.userAgent.OPERA)
        return /(?:Version)[ \/]?(\S+)/.exec(a)
}
;
goog.userAgent.getDocumentMode_ = function() {
    var a = goog.global.document;
    return a ? a.documentMode : void 0
}
;
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
}
;
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function() {
        return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a)
    })
}
;
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
    return Number(goog.userAgent.DOCUMENT_MODE) >= a
}
;
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
    var a = goog.global.document
      , b = goog.userAgent.getDocumentMode_();
    if (a && goog.userAgent.IE)
        return b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5)
}();
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
    c = c || goog.global;
    var d = c.onerror
      , e = !!b;
    goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
    c.onerror = function(b, c, h, k, l) {
        d && d(b, c, h, k, l);
        a({
            message: b,
            fileName: c,
            line: h,
            lineNumber: h,
            col: k,
            error: l
        });
        return e
    }
}
;
goog.debug.expose = function(a, b) {
    if ("undefined" == typeof a)
        return "undefined";
    if (null == a)
        return "NULL";
    var c = [], d;
    for (d in a)
        if (b || !goog.isFunction(a[d])) {
            var e = d + " = ";
            try {
                e += a[d]
            } catch (f) {
                e += "*** " + f + " ***"
            }
            c.push(e)
        }
    return c.join("\n")
}
;
goog.debug.deepExpose = function(a, b) {
    var c = []
      , d = []
      , e = {}
      , f = function(a, h) {
        var g = h + "  ";
        try {
            if (goog.isDef(a))
                if (goog.isNull(a))
                    c.push("NULL");
                else if (goog.isString(a))
                    c.push('"' + a.replace(/\n/g, "\n" + h) + '"');
                else if (goog.isFunction(a))
                    c.push(String(a).replace(/\n/g, "\n" + h));
                else if (goog.isObject(a)) {
                    goog.hasUid(a) || d.push(a);
                    var l = goog.getUid(a);
                    if (e[l])
                        c.push("*** reference loop detected (id=" + l + ") ***");
                    else {
                        e[l] = !0;
                        c.push("{");
                        for (var m in a)
                            if (b || !goog.isFunction(a[m]))
                                c.push("\n"),
                                c.push(g),
                                c.push(m + " = "),
                                f(a[m], g);
                        c.push("\n" + h + "}");
                        delete e[l]
                    }
                } else
                    c.push(a);
            else
                c.push("undefined")
        } catch (n) {
            c.push("*** " + n + " ***")
        }
    };
    f(a, "");
    for (a = 0; a < d.length; a++)
        goog.removeUid(d[a]);
    return c.join("")
}
;
goog.debug.exposeArray = function(a) {
    for (var b = [], c = 0; c < a.length; c++)
        goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
    return "[ " + b.join(", ") + " ]"
}
;
goog.debug.normalizeErrorObject = function(a) {
    var b = goog.getObjectByName("window.location.href");
    if (goog.isString(a))
        return {
            message: a,
            name: "Unknown error",
            lineNumber: "Not available",
            fileName: b,
            stack: "Not available"
        };
    var c = !1;
    try {
        var d = a.lineNumber || a.line || "Not available"
    } catch (f) {
        d = "Not available",
        c = !0
    }
    try {
        var e = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b
    } catch (f) {
        e = "Not available",
        c = !0
    }
    return !c && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {
        message: a.message || "Not available",
        name: a.name || "UnknownError",
        lineNumber: d,
        fileName: e,
        stack: a.stack || "Not available"
    }
}
;
goog.debug.enhanceError = function(a, b) {
    a instanceof Error || (a = Error(a),
    Error.captureStackTrace && Error.captureStackTrace(a, goog.debug.enhanceError));
    a.stack || (a.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
    if (b) {
        for (var c = 0; a["message" + c]; )
            ++c;
        a["message" + c] = String(b)
    }
    return a
}
;
goog.debug.enhanceErrorWithContext = function(a, b) {
    a = goog.debug.enhanceError(a);
    if (b)
        for (var c in b)
            goog.debug.errorcontext.addErrorContext(a, c, b[c]);
    return a
}
;
goog.debug.getStacktraceSimple = function(a) {
    if (!goog.debug.FORCE_SLOPPY_STACKS) {
        var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
        if (b)
            return b
    }
    b = [];
    for (var c = arguments.callee.caller, d = 0; c && (!a || d < a); ) {
        b.push(goog.debug.getFunctionName(c));
        b.push("()\n");
        try {
            c = c.caller
        } catch (e) {
            b.push("[exception trying to get caller]\n");
            break
        }
        d++;
        if (d >= goog.debug.MAX_STACK_DEPTH) {
            b.push("[...long stack...]");
            break
        }
    }
    a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
    return b.join("")
}
;
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
    var b = Error();
    if (Error.captureStackTrace)
        return Error.captureStackTrace(b, a),
        String(b.stack);
    try {
        throw b;
    } catch (c) {
        b = c
    }
    return (a = b.stack) ? String(a) : null
}
;
goog.debug.getStacktrace = function(a) {
    var b;
    goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
    b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
    return b
}
;
goog.debug.getStacktraceHelper_ = function(a, b) {
    var c = [];
    if (goog.array.contains(b, a))
        c.push("[...circular reference...]");
    else if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
        c.push(goog.debug.getFunctionName(a) + "(");
        for (var d = a.arguments, e = 0; d && e < d.length; e++) {
            0 < e && c.push(", ");
            var f = d[e];
            switch (typeof f) {
            case "object":
                f = f ? "object" : "null";
                break;
            case "string":
                break;
            case "number":
                f = String(f);
                break;
            case "boolean":
                f = f ? "true" : "false";
                break;
            case "function":
                f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
                break;
            default:
                f = typeof f
            }
            40 < f.length && (f = f.substr(0, 40) + "...");
            c.push(f)
        }
        b.push(a);
        c.push(")\n");
        try {
            c.push(goog.debug.getStacktraceHelper_(a.caller, b))
        } catch (g) {
            c.push("[exception trying to get caller]\n")
        }
    } else
        a ? c.push("[...long stack...]") : c.push("[end]");
    return c.join("")
}
;
goog.debug.setFunctionResolver = function(a) {
    goog.debug.fnNameResolver_ = a
}
;
goog.debug.getFunctionName = function(a) {
    if (goog.debug.fnNameCache_[a])
        return goog.debug.fnNameCache_[a];
    if (goog.debug.fnNameResolver_) {
        var b = goog.debug.fnNameResolver_(a);
        if (b)
            return goog.debug.fnNameCache_[a] = b
    }
    a = String(a);
    goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a),
    goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
    return goog.debug.fnNameCache_[a]
}
;
goog.debug.makeWhitespaceVisible = function(a) {
    return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]")
}
;
goog.debug.runtimeType = function(a) {
    return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
}
;
goog.debug.fnNameCache_ = {};
goog.debug.freezeInternal_ = goog.DEBUG && Object.freeze || function(a) {
    return a
}
;
goog.debug.freeze = function(a) {
    return goog.debug.freezeInternal_(a)
}
;
goog.events = {};
$jscomp.scope.purify = function(a) {
    return a()
}
;
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart"in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart"in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.maxTouchPoints && !goog.global.navigator.msMaxTouchPoints),
    POINTER_EVENTS: "PointerEvent"in goog.global,
    MSPOINTER_EVENTS: "MSPointerEvent"in goog.global && !(!goog.global.navigator || !goog.global.navigator.msPointerEnabled),
    PASSIVE_EVENTS: (0,
    $jscomp.scope.purify)(function() {
        if (!goog.global.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        goog.global.addEventListener("test", goog.nullFunction, b);
        goog.global.removeEventListener("test", goog.nullFunction, b);
        return a
    })
};
goog.disposable = {};
goog.disposable.IDisposable = function() {}
;
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack),
    goog.Disposable.instances_[goog.getUid(this)] = this);
    this.disposed_ = this.disposed_;
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
}
;
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
    var a = [], b;
    for (b in goog.Disposable.instances_)
        goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
    return a
}
;
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
}
;
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
}
;
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0,
    this.disposeInternal(),
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var a = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a))
            throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[a]
    }
}
;
goog.Disposable.prototype.registerDisposable = function(a) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, a))
}
;
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
    this.disposed_ ? goog.isDef(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []),
    this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a))
}
;
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_)
        for (; this.onDisposeCallbacks_.length; )
            this.onDisposeCallbacks_.shift()()
}
;
goog.Disposable.isDisposed = function(a) {
    return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
}
;
goog.dispose = function(a) {
    a && "function" == typeof a.dispose && a.dispose()
}
;
goog.disposeAll = function(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
        var d = arguments[b];
        goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
    }
}
;
goog.events.EventId = function(a) {
    this.id = a
}
;
goog.events.EventId.prototype.toString = function() {
    return this.id
}
;
goog.events.Event = function(a, b) {
    this.type = a instanceof goog.events.EventId ? String(a) : a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.propagationStopped_ = !1;
    this.returnValue_ = !0
}
;
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
}
;
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.returnValue_ = !1
}
;
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
}
;
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
}
;
goog.events.getVendorPrefixedName_ = function(a) {
    return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
}
;
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    SELECTIONCHANGE: "selectionchange",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout",
    CHANGE: "change",
    RESET: "reset",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DEVICEMOTION: "devicemotion",
    DEVICEORIENTATION: "deviceorientation",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    CANPLAY: "canplay",
    CANPLAYTHROUGH: "canplaythrough",
    DURATIONCHANGE: "durationchange",
    EMPTIED: "emptied",
    ENDED: "ended",
    LOADEDDATA: "loadeddata",
    LOADEDMETADATA: "loadedmetadata",
    PAUSE: "pause",
    PLAY: "play",
    PLAYING: "playing",
    RATECHANGE: "ratechange",
    SEEKED: "seeked",
    SEEKING: "seeking",
    STALLED: "stalled",
    SUSPEND: "suspend",
    TIMEUPDATE: "timeupdate",
    VOLUMECHANGE: "volumechange",
    WAITING: "waiting",
    SOURCEOPEN: "sourceopen",
    SOURCEENDED: "sourceended",
    SOURCECLOSED: "sourceclosed",
    ABORT: "abort",
    UPDATE: "update",
    UPDATESTART: "updatestart",
    UPDATEEND: "updateend",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    INSTALL: "install",
    ACTIVATE: "activate",
    FETCH: "fetch",
    FOREIGNFETCH: "foreignfetch",
    MESSAGEERROR: "messageerror",
    STATECHANGE: "statechange",
    UPDATEFOUND: "updatefound",
    CONTROLLERCHANGE: "controllerchange",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXT: "text",
    TEXTINPUT: goog.userAgent.IE ? "textinput" : "textInput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    BEFOREINPUT: "beforeinput",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
    BEFOREPRINT: "beforeprint",
    AFTERPRINT: "afterprint",
    BEFOREINSTALLPROMPT: "beforeinstallprompt",
    APPINSTALLED: "appinstalled"
};
goog.events.getPointerFallbackEventName_ = function(a, b, c) {
    return goog.events.BrowserFeature.POINTER_EVENTS ? a : goog.events.BrowserFeature.MSPOINTER_EVENTS ? b : c
}
;
goog.events.PointerFallbackEventType = {
    POINTERDOWN: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERDOWN, goog.events.EventType.MSPOINTERDOWN, goog.events.EventType.MOUSEDOWN),
    POINTERUP: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERUP, goog.events.EventType.MSPOINTERUP, goog.events.EventType.MOUSEUP),
    POINTERCANCEL: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERCANCEL, goog.events.EventType.MSPOINTERCANCEL, "mousecancel"),
    POINTERMOVE: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERMOVE, goog.events.EventType.MSPOINTERMOVE, goog.events.EventType.MOUSEMOVE),
    POINTEROVER: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROVER, goog.events.EventType.MSPOINTEROVER, goog.events.EventType.MOUSEOVER),
    POINTEROUT: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTEROUT, goog.events.EventType.MSPOINTEROUT, goog.events.EventType.MOUSEOUT),
    POINTERENTER: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERENTER, goog.events.EventType.MSPOINTERENTER, goog.events.EventType.MOUSEENTER),
    POINTERLEAVE: goog.events.getPointerFallbackEventName_(goog.events.EventType.POINTERLEAVE, goog.events.EventType.MSPOINTERLEAVE, goog.events.EventType.MOUSELEAVE)
};
goog.events.BrowserEvent = function(a, b) {
    goog.events.Event.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.platformModifierKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.event_ = null;
    a && this.init(a, b)
}
;
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.PointerType = {
    MOUSE: "mouse",
    PEN: "pen",
    TOUCH: "touch"
};
goog.events.BrowserEvent.IEButtonMap = goog.debug.freeze([1, 4, 2]);
goog.events.BrowserEvent.IE_BUTTON_MAP = goog.events.BrowserEvent.IEButtonMap;
goog.events.BrowserEvent.IE_POINTER_TYPE_MAP = goog.debug.freeze({
    2: goog.events.BrowserEvent.PointerType.TOUCH,
    3: goog.events.BrowserEvent.PointerType.PEN,
    4: goog.events.BrowserEvent.PointerType.MOUSE
});
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type
      , d = a.changedTouches ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    (b = a.relatedTarget) ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(b, "nodeName") || (b = null)) : c == goog.events.EventType.MOUSEOVER ? b = a.fromElement : c == goog.events.EventType.MOUSEOUT && (b = a.toElement);
    this.relatedTarget = b;
    goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX,
    this.offsetY = goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY,
    this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
    this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
    this.screenX = a.screenX || 0,
    this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
    this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
    this.screenX = d.screenX || 0,
    this.screenY = d.screenY || 0);
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.key = a.key || "";
    this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = goog.events.BrowserEvent.getPointerType_(a);
    this.state = a.state;
    this.event_ = a;
    a.defaultPrevented && this.preventDefault()
}
;
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IE_BUTTON_MAP[a])
}
;
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
}
;
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
}
;
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var a = this.event_;
    if (a.preventDefault)
        a.preventDefault();
    else if (a.returnValue = !1,
    goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT)
        try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                a.keyCode = -1
        } catch (b) {}
}
;
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
}
;
goog.events.BrowserEvent.getPointerType_ = function(a) {
    return goog.isString(a.pointerType) ? a.pointerType : goog.events.BrowserEvent.IE_POINTER_TYPE_MAP[a.pointerType] || ""
}
;
goog.events.Listenable = function() {}
;
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
    a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
}
;
goog.events.Listenable.isImplementedBy = function(a) {
    return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
}
;
goog.events.ListenableKey = function() {}
;
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
    return ++goog.events.ListenableKey.counter_
}
;
goog.events.Listener = function(a, b, c, d, e, f) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture = !!e;
    this.handler = f;
    this.key = goog.events.ListenableKey.reserveKey();
    this.removed = this.callOnce = !1
}
;
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0;
    this.handler = this.src = this.proxy = this.listener = null
}
;
goog.events.ListenerMap = function(a) {
    this.src = a;
    this.listeners = {};
    this.typeCount_ = 0
}
;
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
}
;
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var a = 0, b;
    for (b in this.listeners)
        a += this.listeners[b].length;
    return a
}
;
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.listeners[f];
    a || (a = this.listeners[f] = [],
    this.typeCount_++);
    var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e);
    -1 < g ? (b = a[g],
    c || (b.callOnce = !1)) : (b = new goog.events.Listener(b,null,this.src,f,!!d,e),
    b.callOnce = c,
    a.push(b));
    return b
}
;
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.listeners))
        return !1;
    var e = this.listeners[a];
    b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
    return -1 < b ? (e[b].markAsRemoved(),
    goog.array.removeAt(e, b),
    0 == e.length && (delete this.listeners[a],
    this.typeCount_--),
    !0) : !1
}
;
goog.events.ListenerMap.prototype.removeByKey = function(a) {
    var b = a.type;
    if (!(b in this.listeners))
        return !1;
    var c = goog.array.remove(this.listeners[b], a);
    c && (a.markAsRemoved(),
    0 == this.listeners[b].length && (delete this.listeners[b],
    this.typeCount_--));
    return c
}
;
goog.events.ListenerMap.prototype.removeAll = function(a) {
    a = a && a.toString();
    var b = 0, c;
    for (c in this.listeners)
        if (!a || c == a) {
            for (var d = this.listeners[c], e = 0; e < d.length; e++)
                ++b,
                d[e].markAsRemoved();
            delete this.listeners[c];
            this.typeCount_--
        }
    return b
}
;
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
    a = this.listeners[a.toString()];
    var c = [];
    if (a)
        for (var d = 0; d < a.length; ++d) {
            var e = a[d];
            e.capture == b && c.push(e)
        }
    return c
}
;
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
    a = this.listeners[a.toString()];
    var e = -1;
    a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
    return -1 < e ? a[e] : null
}
;
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
    var c = goog.isDef(a)
      , d = c ? a.toString() : ""
      , e = goog.isDef(b);
    return goog.object.some(this.listeners, function(a, g) {
        for (g = 0; g < a.length; ++g)
            if (!(c && a[g].type != d || e && a[g].capture != b))
                return !0;
        return !1
    })
}
;
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d)
            return e
    }
    return -1
}
;
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
    if (d && d.once)
        return goog.events.listenOnce(a, b, c, d, e);
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            goog.events.listen(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? (d = goog.isObject(d) ? !!d.capture : !!d,
    a.listen(b, c, d, e)) : goog.events.listen_(a, b, c, !1, d, e)
}
;
goog.events.listen_ = function(a, b, c, d, e, f) {
    if (!b)
        throw Error("Invalid event type");
    var g = goog.isObject(e) ? !!e.capture : !!e;
    if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL)
            return goog.asserts.fail("Can not register capture listener in IE8-."),
            null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT)
            return null
    }
    var h = goog.events.getListenerMap_(a);
    h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
    c = h.add(b, c, d, g, f);
    if (c.proxy)
        return c;
    d = goog.events.getProxy();
    c.proxy = d;
    d.src = a;
    d.listener = c;
    if (a.addEventListener)
        goog.events.BrowserFeature.PASSIVE_EVENTS || (e = g),
        void 0 === e && (e = !1),
        a.addEventListener(b.toString(), d, e);
    else if (a.attachEvent)
        a.attachEvent(goog.events.getOnString_(b.toString()), d);
    else if (a.addListener && a.removeListener)
        goog.asserts.assert("change" === b, "MediaQueryList only has a change event"),
        a.addListener(d);
    else
        throw Error("addEventListener and attachEvent are unavailable.");
    goog.events.listenerCountEstimate_++;
    return c
}
;
goog.events.getProxy = function() {
    var a = goog.events.handleBrowserEvent_
      , b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
        return a.call(b.src, b.listener, c)
    }
    : function(c) {
        c = a.call(b.src, b.listener, c);
        if (!c)
            return c
    }
    ;
    return b
}
;
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    c = goog.events.wrapListener(c);
    return goog.events.Listenable.isImplementedBy(a) ? (d = goog.isObject(d) ? !!d.capture : !!d,
    a.listenOnce(b, c, d, e)) : goog.events.listen_(a, b, c, !0, d, e)
}
;
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
}
;
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    d = goog.isObject(d) ? !!d.capture : !!d;
    c = goog.events.wrapListener(c);
    if (goog.events.Listenable.isImplementedBy(a))
        return a.unlisten(b, c, d, e);
    if (!a)
        return !1;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.getListener(b, c, d, e))
            return goog.events.unlistenByKey(b);
    return !1
}
;
goog.events.unlistenByKey = function(a) {
    if (goog.isNumber(a) || !a || a.removed)
        return !1;
    var b = a.src;
    if (goog.events.Listenable.isImplementedBy(b))
        return b.unlistenByKey(a);
    var c = a.type
      , d = a.proxy;
    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(goog.events.getOnString_(c), d) : b.addListener && b.removeListener && b.removeListener(d);
    goog.events.listenerCountEstimate_--;
    (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a),
    0 == c.getTypeCount() && (c.src = null,
    b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
    return !0
}
;
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
}
;
goog.events.removeAll = function(a, b) {
    if (!a)
        return 0;
    if (goog.events.Listenable.isImplementedBy(a))
        return a.removeAllListeners(b);
    a = goog.events.getListenerMap_(a);
    if (!a)
        return 0;
    var c = 0;
    b = b && b.toString();
    for (var d in a.listeners)
        if (!b || d == b)
            for (var e = a.listeners[d].concat(), f = 0; f < e.length; ++f)
                goog.events.unlistenByKey(e[f]) && ++c;
    return c
}
;
goog.events.getListeners = function(a, b, c) {
    return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
}
;
goog.events.getListener = function(a, b, c, d, e) {
    c = goog.events.wrapListener(c);
    d = !!d;
    return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
}
;
goog.events.hasListener = function(a, b, c) {
    if (goog.events.Listenable.isImplementedBy(a))
        return a.hasListener(b, c);
    a = goog.events.getListenerMap_(a);
    return !!a && a.hasListener(b, c)
}
;
goog.events.expose = function(a) {
    var b = [], c;
    for (c in a)
        a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
}
;
goog.events.getOnString_ = function(a) {
    return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
}
;
goog.events.fireListeners = function(a, b, c, d) {
    return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
}
;
goog.events.fireListeners_ = function(a, b, c, d) {
    var e = !0;
    if (a = goog.events.getListenerMap_(a))
        if (b = a.listeners[b.toString()])
            for (b = b.concat(),
            a = 0; a < b.length; a++) {
                var f = b[a];
                f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d),
                e = e && !1 !== f)
            }
    return e
}
;
goog.events.fireListener = function(a, b) {
    var c = a.listener
      , d = a.handler || a.src;
    a.callOnce && goog.events.unlistenByKey(a);
    return c.call(d, b)
}
;
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
}
;
goog.events.dispatchEvent = function(a, b) {
    goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
    return a.dispatchEvent(b)
}
;
goog.events.protectBrowserEventEntryPoint = function(a) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
}
;
goog.events.handleBrowserEvent_ = function(a, b) {
    if (a.removed)
        return !0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var c = b || goog.getObjectByName("window.event");
        b = new goog.events.BrowserEvent(c,this);
        var d = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(c)) {
                goog.events.markIeEvent_(c);
                c = [];
                for (var e = b.currentTarget; e; e = e.parentNode)
                    c.push(e);
                a = a.type;
                for (e = c.length - 1; !b.propagationStopped_ && 0 <= e; e--) {
                    b.currentTarget = c[e];
                    var f = goog.events.fireListeners_(c[e], a, !0, b);
                    d = d && f
                }
                for (e = 0; !b.propagationStopped_ && e < c.length; e++)
                    b.currentTarget = c[e],
                    f = goog.events.fireListeners_(c[e], a, !1, b),
                    d = d && f
            }
        } else
            d = goog.events.fireListener(a, b);
        return d
    }
    return goog.events.fireListener(a, new goog.events.BrowserEvent(b,this))
}
;
goog.events.markIeEvent_ = function(a) {
    var b = !1;
    if (0 == a.keyCode)
        try {
            a.keyCode = -1;
            return
        } catch (c) {
            b = !0
        }
    if (b || void 0 == a.returnValue)
        a.returnValue = !0
}
;
goog.events.isMarkedIeEvent_ = function(a) {
    return 0 > a.keyCode || void 0 != a.returnValue
}
;
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
}
;
goog.events.getListenerMap_ = function(a) {
    a = a[goog.events.LISTENER_MAP_PROP_];
    return a instanceof goog.events.ListenerMap ? a : null
}
;
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
    goog.asserts.assert(a, "Listener can not be null.");
    if (goog.isFunction(a))
        return a;
    goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
    a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
        return a.handleEvent(b)
    }
    );
    return a[goog.events.LISTENER_WRAPPER_PROP_]
}
;
goog.debug.entryPointRegistry.register(function(a) {
    goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
});
var mpl$lab$controls$LabControl = function(a) {};
mpl$lab$controls$LabControl.prototype.disconnect = function() {}
;
mpl$lab$controls$LabControl.prototype.getElement = function() {}
;
mpl$lab$controls$LabControl.prototype.getParameter = function() {}
;
mpl$lab$controls$LabControl.prototype.setEnabled = function(a) {}
;
var mpl$lab$controls$ButtonControl = function(a, b, c) {
    this.label_ = a;
    this.button_ = document.createElement("button");
    this.button_.type = "button";
    goog.isDef(c) ? (this.button_.className = "icon",
    this.button_.appendChild(c)) : this.button_.appendChild(document.createTextNode(a));
    this.clickFunction_ = b;
    this.mouseDownKey_ = goog.events.listen(this.button_, goog.events.EventType.MOUSEDOWN, this.handleClick, !0, this);
    this.mouseUpKey_ = goog.events.listen(this.button_, goog.events.EventType.MOUSEUP, this.handleMouseUp, !0, this);
    this.dragLeaveKey_ = goog.events.listen(this.button_, goog.events.EventType.DRAGLEAVE, this.handleMouseUp, !1, this);
    this.timeoutID_ = void 0;
    this.repeatDelay = 0;
    this.repeatFirst = 2
};
mpl$lab$controls$ButtonControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", timeoutID_: " + this.timeoutID_ + ", repeatDelay: " + mpl$lab$util$Util.NF(this.repeatDelay) + ", repeatFirst: " + this.repeatFirst + "}"
}
;
mpl$lab$controls$ButtonControl.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'ButtonControl{label_: "' + this.label_ + '"}'
}
;
mpl$lab$controls$ButtonControl.prototype.disconnect = function() {
    goog.events.unlistenByKey(this.mouseDownKey_);
    goog.events.unlistenByKey(this.mouseUpKey_);
    goog.events.unlistenByKey(this.dragLeaveKey_)
}
;
mpl$lab$controls$ButtonControl.prototype.getElement = function() {
    return this.button_
}
;
mpl$lab$controls$ButtonControl.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$ButtonControl.prototype.handleClick = function(a) {
    this.holdClick()
}
;
mpl$lab$controls$ButtonControl.prototype.handleMouseUp = function(a) {
    goog.isDef(this.timeoutID_) && (clearTimeout(this.timeoutID_),
    this.timeoutID_ = void 0)
}
;
mpl$lab$controls$ButtonControl.prototype.holdClick = function() {
    this.clickFunction_();
    if (0 < this.repeatDelay) {
        var a = goog.isDef(this.timeoutID_) ? this.repeatDelay : this.repeatFirst * this.repeatDelay;
        this.timeoutID_ = setTimeout(goog.bind(this.holdClick, this), a)
    }
}
;
mpl$lab$controls$ButtonControl.prototype.setClickFunction = function(a) {
    this.clickFunction_ = a
}
;
mpl$lab$controls$ButtonControl.prototype.setEnabled = function(a) {
    this.button_.disabled = !a
}
;
goog.dom.BrowserFeature = {
    CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
    CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
    INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
    LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
};
goog.dom.HtmlElement = function() {}
;
goog.dom.TagName = function(a) {
    this.tagName_ = a
}
;
goog.dom.TagName.prototype.toString = function() {
    return this.tagName_
}
;
goog.dom.TagName.A = new goog.dom.TagName("A");
goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
goog.dom.TagName.B = new goog.dom.TagName("B");
goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
goog.dom.TagName.BR = new goog.dom.TagName("BR");
goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
goog.dom.TagName.COL = new goog.dom.TagName("COL");
goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
goog.dom.TagName.DD = new goog.dom.TagName("DD");
goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
goog.dom.TagName.DL = new goog.dom.TagName("DL");
goog.dom.TagName.DT = new goog.dom.TagName("DT");
goog.dom.TagName.EM = new goog.dom.TagName("EM");
goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
goog.dom.TagName.H1 = new goog.dom.TagName("H1");
goog.dom.TagName.H2 = new goog.dom.TagName("H2");
goog.dom.TagName.H3 = new goog.dom.TagName("H3");
goog.dom.TagName.H4 = new goog.dom.TagName("H4");
goog.dom.TagName.H5 = new goog.dom.TagName("H5");
goog.dom.TagName.H6 = new goog.dom.TagName("H6");
goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
goog.dom.TagName.HR = new goog.dom.TagName("HR");
goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
goog.dom.TagName.I = new goog.dom.TagName("I");
goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
goog.dom.TagName.INS = new goog.dom.TagName("INS");
goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
goog.dom.TagName.LI = new goog.dom.TagName("LI");
goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
goog.dom.TagName.META = new goog.dom.TagName("META");
goog.dom.TagName.METER = new goog.dom.TagName("METER");
goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
goog.dom.TagName.OL = new goog.dom.TagName("OL");
goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
goog.dom.TagName.P = new goog.dom.TagName("P");
goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
goog.dom.TagName.Q = new goog.dom.TagName("Q");
goog.dom.TagName.RP = new goog.dom.TagName("RP");
goog.dom.TagName.RT = new goog.dom.TagName("RT");
goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
goog.dom.TagName.S = new goog.dom.TagName("S");
goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
goog.dom.TagName.TD = new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
goog.dom.TagName.TH = new goog.dom.TagName("TH");
goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
goog.dom.TagName.TR = new goog.dom.TagName("TR");
goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
goog.dom.TagName.TT = new goog.dom.TagName("TT");
goog.dom.TagName.U = new goog.dom.TagName("U");
goog.dom.TagName.UL = new goog.dom.TagName("UL");
goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
goog.dom.asserts = {};
goog.dom.asserts.assertIsLocation = function(a) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var b = goog.dom.asserts.getWindow_(a);
        "undefined" != typeof b.Location && "undefined" != typeof b.Element && goog.asserts.assert(a && (a instanceof b.Location || !(a instanceof b.Element)), "Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(a))
    }
    return a
}
;
goog.dom.asserts.assertIsElementType_ = function(a, b) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var c = goog.dom.asserts.getWindow_(a);
        "undefined" != typeof c[b] && "undefined" != typeof c.Location && "undefined" != typeof c.Element && goog.asserts.assert(a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)), "Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, goog.dom.asserts.debugStringForType_(a))
    }
    return a
}
;
goog.dom.asserts.assertIsHTMLAnchorElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLAnchorElement")
}
;
goog.dom.asserts.assertIsHTMLButtonElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLButtonElement")
}
;
goog.dom.asserts.assertIsHTMLLinkElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLLinkElement")
}
;
goog.dom.asserts.assertIsHTMLImageElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLImageElement")
}
;
goog.dom.asserts.assertIsHTMLVideoElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLVideoElement")
}
;
goog.dom.asserts.assertIsHTMLInputElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLInputElement")
}
;
goog.dom.asserts.assertIsHTMLEmbedElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLEmbedElement")
}
;
goog.dom.asserts.assertIsHTMLFormElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLFormElement")
}
;
goog.dom.asserts.assertIsHTMLFrameElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLFrameElement")
}
;
goog.dom.asserts.assertIsHTMLIFrameElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLIFrameElement")
}
;
goog.dom.asserts.assertIsHTMLObjectElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLObjectElement")
}
;
goog.dom.asserts.assertIsHTMLScriptElement = function(a) {
    return goog.dom.asserts.assertIsElementType_(a, "HTMLScriptElement")
}
;
goog.dom.asserts.debugStringForType_ = function(a) {
    return goog.isObject(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a
}
;
goog.dom.asserts.getWindow_ = function(a) {
    return (a = a && a.ownerDocument) && (a.defaultView || a.parentWindow) || goog.global
}
;
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    command: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
};
goog.dom.tags.isVoidTag = function(a) {
    return !0 === goog.dom.tags.VOID_TAGS_[a]
}
;
goog.string.TypedString = function() {}
;
goog.string.Const = function() {
    this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
    this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
}
;
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
    return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
}
;
goog.string.Const.prototype.toString = function() {
    return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
}
;
goog.string.Const.unwrap = function(a) {
    if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_)
        return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
    goog.asserts.fail("expected object of type Const, got '" + a + "'");
    return "type_error:Const"
}
;
goog.string.Const.from = function(a) {
    return goog.string.Const.create__googStringSecurityPrivate_(a)
}
;
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
    var b = new goog.string.Const;
    b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
    return b
}
;
goog.string.Const.EMPTY = goog.string.Const.from("");
goog.html = {};
goog.html.SafeScript = function() {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
    this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
;
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeScript.fromConstantAndArgs = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; d++)
        c.push(goog.html.SafeScript.stringify_(arguments[d]));
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("(" + goog.string.Const.unwrap(a) + ")(" + c.join(", ") + ");")
}
;
goog.html.SafeScript.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
}
;
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
    return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
}
);
goog.html.SafeScript.unwrap = function(a) {
    if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeScript"
}
;
goog.html.SafeScript.stringify_ = function(a) {
    return JSON.stringify(a).replace(/</g, "\\x3c")
}
;
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
}
;
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
    return this
}
;
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
    return goog.fs.url.getUrlObject_().createObjectURL(a)
}
;
goog.fs.url.revokeObjectUrl = function(a) {
    goog.fs.url.getUrlObject_().revokeObjectURL(a)
}
;
goog.fs.url.getUrlObject_ = function() {
    var a = goog.fs.url.findUrlObject_();
    if (null != a)
        return a;
    throw Error("This browser doesn't seem to support blob URLs");
}
;
goog.fs.url.findUrlObject_ = function() {
    return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
}
;
goog.fs.url.browserSupportsObjectUrls = function() {
    return null != goog.fs.url.findUrlObject_()
}
;
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {
    LRE: "\u202a",
    RLE: "\u202b",
    PDF: "\u202c",
    LRM: "\u200e",
    RLM: "\u200f"
};
goog.i18n.bidi.Dir = {
    LTR: 1,
    RTL: -1,
    NEUTRAL: 0
};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
    return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}
;
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
    return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
}
;
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
    return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
    return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
    return goog.i18n.bidi.rtlRe_.test(a)
}
;
goog.i18n.bidi.isLtrChar = function(a) {
    return goog.i18n.bidi.ltrRe_.test(a)
}
;
goog.i18n.bidi.isNeutralChar = function(a) {
    return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
}
;
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
    return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
}
;
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
    return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
    return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
}
;
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
    return goog.i18n.bidi.rtlLocalesRe_.test(a)
}
;
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
    b = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
    return a.replace(goog.i18n.bidi.bracketGuardTextRe_, b + "$&" + b)
}
;
goog.i18n.bidi.enforceRtlInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
}
;
goog.i18n.bidi.enforceRtlInText = function(a) {
    return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
}
;
goog.i18n.bidi.enforceLtrInHtml = function(a) {
    return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
}
;
goog.i18n.bidi.enforceLtrInText = function(a) {
    return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
}
;
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
    return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
}
;
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
    return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
}
;
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = .4;
goog.i18n.bidi.estimateDirection = function(a, b) {
    var c = 0
      , d = 0
      , e = !1;
    a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_);
    for (b = 0; b < a.length; b++) {
        var f = a[b];
        goog.i18n.bidi.startsWithRtl(f) ? (c++,
        d++) : goog.i18n.bidi.isRequiredLtrRe_.test(f) ? e = !0 : goog.i18n.bidi.hasAnyLtr(f) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(f) && (e = !0)
    }
    return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
}
;
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
    return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
}
;
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
    a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT,
    a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
}
;
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
    switch (goog.i18n.bidi.estimateDirection(b)) {
    case goog.i18n.bidi.Dir.LTR:
        a.dir = "ltr";
        break;
    case goog.i18n.bidi.Dir.RTL:
        a.dir = "rtl";
        break;
    default:
        a.removeAttribute("dir")
    }
}
;
goog.i18n.bidi.DirectionalString = function() {}
;
goog.html.TrustedResourceUrl = function() {
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
    this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
;
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
}
;
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
}
;
goog.html.TrustedResourceUrl.prototype.cloneWithParams = function(a) {
    var b = goog.html.TrustedResourceUrl.unwrap(this), c = /\?/.test(b) ? "&" : "?", d;
    for (d in a)
        for (var e = goog.isArray(a[d]) ? a[d] : [a[d]], f = 0; f < e.length; f++)
            null != e[f] && (b += c + encodeURIComponent(d) + "=" + encodeURIComponent(String(e[f])),
            c = "&");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
    return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
}
);
goog.html.TrustedResourceUrl.unwrap = function(a) {
    if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
    goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:TrustedResourceUrl"
}
;
goog.html.TrustedResourceUrl.format = function(a, b) {
    var c = goog.string.Const.unwrap(a);
    if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c))
        throw Error("Invalid TrustedResourceUrl format: " + c);
    a = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(a, e) {
        if (!Object.prototype.hasOwnProperty.call(b, e))
            throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
        a = b[e];
        return a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : encodeURIComponent(String(a))
    });
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
goog.html.TrustedResourceUrl.BASE_URL_ = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank#/i;
goog.html.TrustedResourceUrl.formatWithParams = function(a, b, c) {
    return goog.html.TrustedResourceUrl.format(a, b).cloneWithParams(c)
}
;
goog.html.TrustedResourceUrl.fromConstant = function(a) {
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
}
;
goog.html.TrustedResourceUrl.fromConstants = function(a) {
    for (var b = "", c = 0; c < a.length; c++)
        b += goog.string.Const.unwrap(a[c]);
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.TrustedResourceUrl;
    b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
    return b
}
;
goog.html.SafeUrl = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
;
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
;
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
    return goog.i18n.bidi.Dir.LTR
}
;
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
    return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
);
goog.html.SafeUrl.unwrap = function(a) {
    if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeUrl"
}
;
goog.html.SafeUrl.fromConstant = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
}
;
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:audio\/(?:3gpp|3gpp2|aac|midi|mp4|mpeg|ogg|x-m4a|x-wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|text\/csv|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
    a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
    var b = a.match(goog.html.DATA_URL_PATTERN_);
    b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
}
;
goog.html.SafeUrl.fromTelUrl = function(a) {
    goog.string.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeUrl.fromTrustedResourceUrl = function(a) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))
}
;
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
    if (a instanceof goog.html.SafeUrl)
        return a;
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeUrl.sanitizeAssertUnchanged = function(a) {
    if (a instanceof goog.html.SafeUrl)
        return a;
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
    var b = new goog.html.SafeUrl;
    b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    return b
}
;
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.html.SafeStyle = function() {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
    this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
;
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length)
        return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(a);
    goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
    goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeStyle.checkStyle_ = function(a) {
    goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a)
}
;
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
}
;
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
    return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
}
);
goog.html.SafeStyle.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyle"
}
;
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
}
;
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
    return this
}
;
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
    var b = "", c;
    for (c in a) {
        if (!/^[-_a-zA-Z0-9]+$/.test(c))
            throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
        var d = a[c];
        null != d && (d = goog.isArray(d) ? goog.array.map(d, goog.html.SafeStyle.sanitizePropertyValue_).join(" ") : goog.html.SafeStyle.sanitizePropertyValue_(d),
        b += c + ":" + d + ";")
    }
    if (!b)
        return goog.html.SafeStyle.EMPTY;
    goog.html.SafeStyle.checkStyle_(b);
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.SafeStyle.sanitizePropertyValue_ = function(a) {
    if (a instanceof goog.html.SafeUrl)
        return 'url("' + goog.html.SafeUrl.unwrap(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
    a = a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : goog.html.SafeStyle.sanitizePropertyValueString_(String(a));
    goog.asserts.assert(!/[{;}]/.test(a), "Value does not allow [{;}].");
    return a
}
;
goog.html.SafeStyle.sanitizePropertyValueString_ = function(a) {
    var b = a.replace(goog.html.SafeUrl.FUNCTIONS_RE_, "$1").replace(goog.html.SafeUrl.URL_RE_, "url");
    return goog.html.SafeStyle.VALUE_RE_.test(b) ? goog.html.SafeStyle.hasBalancedQuotes_(a) ? goog.html.SafeStyle.sanitizeUrl_(a) : (goog.asserts.fail("String value requires balanced quotes, got: " + a),
    goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only " + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + " and simple functions, got: " + a),
    goog.html.SafeStyle.INNOCUOUS_STRING)
}
;
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
    for (var b = !0, c = !0, d = 0; d < a.length; d++) {
        var e = a.charAt(d);
        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
    }
    return b && c
}
;
goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ = "[-,.\"'%_!# a-zA-Z0-9]";
goog.html.SafeStyle.VALUE_RE_ = new RegExp("^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$");
goog.html.SafeUrl.URL_RE_ = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
goog.html.SafeUrl.FUNCTIONS_RE_ = /\b(hsl|hsla|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?)\([-0-9a-z.%, ]+\)/g;
goog.html.SafeStyle.sanitizeUrl_ = function(a) {
    return a.replace(goog.html.SafeUrl.URL_RE_, function(a, c, d, e) {
        var b = "";
        d = d.replace(/^(['"])(.*)\1$/, function(a, c, d) {
            b = c;
            return d
        });
        a = goog.html.SafeUrl.sanitize(d).getTypedStringValue();
        return c + b + a + b + e
    })
}
;
goog.html.SafeStyle.concat = function(a) {
    var b = ""
      , c = function(a) {
        goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
    };
    goog.array.forEach(arguments, c);
    return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
}
;
goog.html.SafeStyleSheet = function() {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
    this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
}
;
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.createRule = function(a, b) {
    if (goog.string.contains(a, "<"))
        throw Error("Selector does not allow '<', got: " + a);
    var c = a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
    if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c))
        throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + a);
    if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(c))
        throw Error("() and [] in selector must be balanced, got: " + a);
    b instanceof goog.html.SafeStyle || (b = goog.html.SafeStyle.create(b));
    a = a + "{" + goog.html.SafeStyle.unwrap(b) + "}";
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeStyleSheet.hasBalancedBrackets_ = function(a) {
    for (var b = {
        "(": ")",
        "[": "]"
    }, c = [], d = 0; d < a.length; d++) {
        var e = a[d];
        if (b[e])
            c.push(b[e]);
        else if (goog.object.contains(b, e) && c.pop() != e)
            return !1
    }
    return 0 == c.length
}
;
goog.html.SafeStyleSheet.concat = function(a) {
    var b = ""
      , c = function(a) {
        goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
    };
    goog.array.forEach(arguments, c);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.SafeStyleSheet.fromConstant = function(a) {
    a = goog.string.Const.unwrap(a);
    if (0 === a.length)
        return goog.html.SafeStyleSheet.EMPTY;
    goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
}
;
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
}
;
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
    return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
}
);
goog.html.SafeStyleSheet.unwrap = function(a) {
    if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeStyleSheet"
}
;
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
    return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
}
;
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
    return this
}
;
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeHtml = function() {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
    this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
    this.dir_ = null
}
;
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
    return this.dir_
}
;
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
}
;
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
    return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
}
);
goog.html.SafeHtml.unwrap = function(a) {
    if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
        return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
    return "type_error:SafeHtml"
}
;
goog.html.SafeHtml.htmlEscape = function(a) {
    if (a instanceof goog.html.SafeHtml)
        return a;
    var b = null;
    a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
    a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b)
}
;
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
    if (a instanceof goog.html.SafeHtml)
        return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
}
;
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
    if (a instanceof goog.html.SafeHtml)
        return a;
    a = goog.html.SafeHtml.htmlEscape(a);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
}
;
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {
    action: !0,
    cite: !0,
    data: !0,
    formaction: !0,
    href: !0,
    manifest: !0,
    poster: !0,
    src: !0
};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {
    APPLET: !0,
    BASE: !0,
    EMBED: !0,
    IFRAME: !0,
    LINK: !0,
    MATH: !0,
    META: !0,
    OBJECT: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
};
goog.html.SafeHtml.create = function(a, b, c) {
    goog.html.SafeHtml.verifyTagName(String(a));
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c)
}
;
goog.html.SafeHtml.verifyTagName = function(a) {
    if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a))
        throw Error("Invalid tag name <" + a + ">.");
    if (a.toUpperCase()in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)
        throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
}
;
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
    a && goog.html.TrustedResourceUrl.unwrap(a);
    var e = {};
    e.src = a || null;
    e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
    a = goog.html.SafeHtml.combineAttributes(e, {
        sandbox: ""
    }, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
}
;
goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
    if (!goog.html.SafeHtml.canUseSandboxIframe())
        throw Error("The browser does not support sandboxed iframes.");
    var e = {};
    e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
    e.srcdoc = b || null;
    e.sandbox = "";
    a = goog.html.SafeHtml.combineAttributes(e, {}, c);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
}
;
goog.html.SafeHtml.canUseSandboxIframe = function() {
    return goog.global.HTMLIFrameElement && "sandbox"in goog.global.HTMLIFrameElement.prototype
}
;
goog.html.SafeHtml.createScriptSrc = function(a, b) {
    goog.html.TrustedResourceUrl.unwrap(a);
    a = goog.html.SafeHtml.combineAttributes({
        src: a
    }, {}, b);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", a)
}
;
goog.html.SafeHtml.createScript = function(a, b) {
    for (var c in b) {
        var d = c.toLowerCase();
        if ("language" == d || "src" == d || "text" == d || "type" == d)
            throw Error('Cannot set "' + d + '" attribute');
    }
    c = "";
    a = goog.array.concat(a);
    for (d = 0; d < a.length; d++)
        c += goog.html.SafeScript.unwrap(a[d]);
    a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, a)
}
;
goog.html.SafeHtml.createStyle = function(a, b) {
    b = goog.html.SafeHtml.combineAttributes({
        type: "text/css"
    }, {}, b);
    var c = "";
    a = goog.array.concat(a);
    for (var d = 0; d < a.length; d++)
        c += goog.html.SafeStyleSheet.unwrap(a[d]);
    a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", b, a)
}
;
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
    a = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
    (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'");
    return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
        "http-equiv": "refresh",
        content: (b || 0) + "; url=" + a
    })
}
;
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
    if (c instanceof goog.string.Const)
        c = goog.string.Const.unwrap(c);
    else if ("style" == b.toLowerCase())
        c = goog.html.SafeHtml.getStyleValue_(c);
    else {
        if (/^on/i.test(b))
            throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
        if (b.toLowerCase()in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c instanceof goog.html.TrustedResourceUrl)
                c = goog.html.TrustedResourceUrl.unwrap(c);
            else if (c instanceof goog.html.SafeUrl)
                c = goog.html.SafeUrl.unwrap(c);
            else if (goog.isString(c))
                c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
            else
                throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
    }
    c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
    goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
    return b + '="' + goog.string.htmlEscape(String(c)) + '"'
}
;
goog.html.SafeHtml.getStyleValue_ = function(a) {
    if (!goog.isObject(a))
        throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
    a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
    return goog.html.SafeStyle.unwrap(a)
}
;
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
    b = goog.html.SafeHtml.create(b, c, d);
    b.dir_ = a;
    return b
}
;
goog.html.SafeHtml.concat = function(a) {
    var b = goog.i18n.bidi.Dir.NEUTRAL
      , c = ""
      , d = function(a) {
        goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a),
        c += goog.html.SafeHtml.unwrap(a),
        a = a.getDirection(),
        b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null))
    };
    goog.array.forEach(arguments, d);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b)
}
;
goog.html.SafeHtml.concatWithDir = function(a, b) {
    var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
    c.dir_ = a;
    return c
}
;
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
    return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
}
;
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
    this.dir_ = b;
    return this
}
;
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
    var d = null;
    var e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
    goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
    goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."),
    e += ">") : (d = goog.html.SafeHtml.concat(c),
    e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">",
    d = d.getDirection());
    (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
}
;
goog.html.SafeHtml.stringifyAttributes = function(a, b) {
    var c = "";
    if (b)
        for (var d in b) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d))
                throw Error('Invalid attribute name "' + d + '".');
            var e = b[d];
            goog.isDefAndNotNull(e) && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e))
        }
    return c
}
;
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
    var d = {}, e;
    for (e in a)
        goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"),
        d[e] = a[e];
    for (e in b)
        goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"),
        d[e] = b[e];
    for (e in c) {
        var f = e.toLowerCase();
        if (f in a)
            throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
        f in b && delete d[f];
        d[e] = c[e]
    }
    return d
}
;
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {
    AFTERBEGIN: "afterbegin",
    AFTEREND: "afterend",
    BEFOREBEGIN: "beforebegin",
    BEFOREEND: "beforeend"
};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
    a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c))
}
;
goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
    MATH: !0,
    SCRIPT: !0,
    STYLE: !0,
    SVG: !0,
    TEMPLATE: !0
};
goog.dom.safe.setInnerHtml = function(a, b) {
    if (goog.asserts.ENABLE_ASSERTS) {
        var c = a.tagName.toUpperCase();
        if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c])
            throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
    }
    a.innerHTML = goog.html.SafeHtml.unwrap(b)
}
;
goog.dom.safe.setOuterHtml = function(a, b) {
    a.outerHTML = goog.html.SafeHtml.unwrap(b)
}
;
goog.dom.safe.setFormElementAction = function(a, b) {
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLFormElement(a).action = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setButtonFormAction = function(a, b) {
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLButtonElement(a).formaction = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setInputFormAction = function(a, b) {
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    goog.dom.asserts.assertIsHTMLInputElement(a).formaction = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setStyle = function(a, b) {
    a.style.cssText = goog.html.SafeStyle.unwrap(b)
}
;
goog.dom.safe.documentWrite = function(a, b) {
    a.write(goog.html.SafeHtml.unwrap(b))
}
;
goog.dom.safe.setAnchorHref = function(a, b) {
    goog.dom.asserts.assertIsHTMLAnchorElement(a);
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.href = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setImageSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLImageElement(a);
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.src = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setVideoSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLVideoElement(a);
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.src = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.setEmbedSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLEmbedElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
}
;
goog.dom.safe.setFrameSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLFrameElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
}
;
goog.dom.safe.setIframeSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
}
;
goog.dom.safe.setIframeSrcdoc = function(a, b) {
    goog.dom.asserts.assertIsHTMLIFrameElement(a);
    a.srcdoc = goog.html.SafeHtml.unwrap(b)
}
;
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
    goog.dom.asserts.assertIsHTMLLinkElement(a);
    a.rel = c;
    goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'),
    a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitizeAssertUnchanged(b).getTypedStringValue()
}
;
goog.dom.safe.setObjectData = function(a, b) {
    goog.dom.asserts.assertIsHTMLObjectElement(a);
    a.data = goog.html.TrustedResourceUrl.unwrap(b)
}
;
goog.dom.safe.setScriptSrc = function(a, b) {
    goog.dom.asserts.assertIsHTMLScriptElement(a);
    a.src = goog.html.TrustedResourceUrl.unwrap(b)
}
;
goog.dom.safe.setScriptContent = function(a, b) {
    goog.dom.asserts.assertIsHTMLScriptElement(a);
    a.text = goog.html.SafeScript.unwrap(b)
}
;
goog.dom.safe.setLocationHref = function(a, b) {
    goog.dom.asserts.assertIsLocation(a);
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.href = goog.html.SafeUrl.unwrap(b)
}
;
goog.dom.safe.replaceLocation = function(a, b) {
    goog.dom.asserts.assertIsLocation(a);
    b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitizeAssertUnchanged(b);
    a.replace(goog.html.SafeUrl.unwrap(b))
}
;
goog.dom.safe.openInWindow = function(a, b, c, d, e) {
    a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitizeAssertUnchanged(a);
    return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
}
;
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
}
;
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
    goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
    goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
    return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
}
;
goog.math.Coordinate = function(a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
}
;
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x,this.y)
}
;
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")"
}
);
goog.math.Coordinate.prototype.equals = function(a) {
    return a instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, a)
}
;
goog.math.Coordinate.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
}
;
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x;
    a = a.y - b.y;
    return Math.sqrt(c * c + a * a)
}
;
goog.math.Coordinate.magnitude = function(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y)
}
;
goog.math.Coordinate.azimuth = function(a) {
    return goog.math.angle(0, 0, a.x, a.y)
}
;
goog.math.Coordinate.squaredDistance = function(a, b) {
    var c = a.x - b.x;
    a = a.y - b.y;
    return c * c + a * a
}
;
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x,a.y - b.y)
}
;
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x,a.y + b.y)
}
;
goog.math.Coordinate.prototype.ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this
}
;
goog.math.Coordinate.prototype.floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this
}
;
goog.math.Coordinate.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this
}
;
goog.math.Coordinate.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.x += a.x,
    this.y += a.y) : (this.x += Number(a),
    goog.isNumber(b) && (this.y += b));
    return this
}
;
goog.math.Coordinate.prototype.scale = function(a, b) {
    b = goog.isNumber(b) ? b : a;
    this.x *= a;
    this.y *= b;
    return this
}
;
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
    b = b || new goog.math.Coordinate(0,0);
    var c = this.x
      , d = this.y
      , e = Math.cos(a);
    a = Math.sin(a);
    this.x = (c - b.x) * e - (d - b.y) * a + b.x;
    this.y = (c - b.x) * a + (d - b.y) * e + b.y
}
;
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
    this.rotateRadians(goog.math.toRadians(a), b)
}
;
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
}
;
goog.math.Size.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
}
;
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width,this.height)
}
;
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
    return "(" + this.width + " x " + this.height + ")"
}
);
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
}
;
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
}
;
goog.math.Size.prototype.area = function() {
    return this.width * this.height
}
;
goog.math.Size.prototype.perimeter = function() {
    return 2 * (this.width + this.height)
}
;
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
}
;
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
}
;
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
}
;
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
}
;
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
}
;
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
}
;
goog.math.Size.prototype.scale = function(a, b) {
    b = goog.isNumber(b) ? b : a;
    this.width *= a;
    this.height *= b;
    return this
}
;
goog.math.Size.prototype.scaleToCover = function(a) {
    a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
}
;
goog.math.Size.prototype.scaleToFit = function(a) {
    a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
    return this.scale(a)
}
;
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
}
;
goog.dom.getDocument = function() {
    return document
}
;
goog.dom.getElement = function(a) {
    return goog.dom.getElementHelper_(document, a)
}
;
goog.dom.getElementHelper_ = function(a, b) {
    return goog.isString(b) ? a.getElementById(b) : b
}
;
goog.dom.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(document, a)
}
;
goog.dom.getRequiredElementHelper_ = function(a, b) {
    goog.asserts.assertString(b);
    a = goog.dom.getElementHelper_(a, b);
    return a = goog.asserts.assertElement(a, "No element found with id: " + b)
}
;
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagName = function(a, b) {
    return (b || document).getElementsByTagName(String(a))
}
;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
}
;
goog.dom.getElementByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementByTagNameAndClass_(document, a, b, c)
}
;
goog.dom.getElementsByClass = function(a, b) {
    var c = b || document;
    return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
}
;
goog.dom.getElementByClass = function(a, b) {
    var c = b || document;
    return (c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.getElementByTagNameAndClass_(document, "*", a, b)) || null
}
;
goog.dom.getRequiredElementByClass = function(a, b) {
    b = goog.dom.getElementByClass(a, b);
    return goog.asserts.assert(b, "No element found with className: " + a)
}
;
goog.dom.canUseQuerySelector_ = function(a) {
    return !(!a.querySelectorAll || !a.querySelector)
}
;
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    a = d || a;
    b = b && "*" != b ? String(b).toUpperCase() : "";
    if (goog.dom.canUseQuerySelector_(a) && (b || c))
        return a.querySelectorAll(b + (c ? "." + c : ""));
    if (c && a.getElementsByClassName) {
        a = a.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++)
                b == g.nodeName && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    a = a.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++)
            b = g.className,
            "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
        d.length = e;
        return d
    }
    return a
}
;
goog.dom.getElementByTagNameAndClass_ = function(a, b, c, d) {
    var e = d || a
      , f = b && "*" != b ? String(b).toUpperCase() : "";
    return goog.dom.canUseQuerySelector_(e) && (f || c) ? e.querySelector(f + (c ? "." + c : "")) : goog.dom.getElementsByTagNameAndClass_(a, b, c, d)[0] || null
}
;
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(b, d) {
        b && b.implementsGoogStringTypedString && (b = b.getTypedStringValue());
        "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
    })
}
;
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
}
;
goog.dom.getViewportSize_ = function(a) {
    a = a.document;
    a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
    return new goog.math.Size(a.clientWidth,a.clientHeight)
}
;
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
}
;
goog.dom.getDocumentHeightForWindow = function(a) {
    return goog.dom.getDocumentHeight_(a)
}
;
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document
      , c = 0;
    if (b) {
        c = b.body;
        var d = b.documentElement;
        if (!d || !c)
            return 0;
        a = goog.dom.getViewportSize_(a).height;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight)
            c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            b = d.scrollHeight;
            var e = d.offsetHeight;
            d.clientHeight != e && (b = c.scrollHeight,
            e = c.offsetHeight);
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
}
;
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
}
;
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
}
;
goog.dom.getDocumentScroll_ = function(a) {
    var b = goog.dom.getDocumentScrollElement_(a);
    a = goog.dom.getWindow_(a);
    return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft,b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
}
;
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
}
;
goog.dom.getDocumentScrollElement_ = function(a) {
    return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
}
;
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
}
;
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
}
;
goog.dom.createDom = function(a, b, c) {
    return goog.dom.createDom_(document, arguments)
}
;
goog.dom.createDom_ = function(a, b) {
    var c = String(b[0])
      , d = b[1];
    if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            delete e.type;
            d = e
        }
        c.push(">");
        c = c.join("")
    }
    c = a.createElement(c);
    d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
    2 < b.length && goog.dom.append_(a, c, b, 2);
    return c
}
;
goog.dom.append_ = function(a, b, c, d) {
    function e(c) {
        c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
    }
    for (; d < c.length; d++) {
        var f = c[d];
        goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
    }
}
;
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return goog.dom.createElement_(document, a)
}
;
goog.dom.createElement_ = function(a, b) {
    return a.createElement(String(b))
}
;
goog.dom.createTextNode = function(a) {
    return document.createTextNode(String(a))
}
;
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
}
;
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = goog.dom.createElement_(a, "TABLE"), f = e.appendChild(goog.dom.createElement_(a, "TBODY")), g = 0; g < b; g++) {
        for (var h = goog.dom.createElement_(a, "TR"), k = 0; k < c; k++) {
            var l = goog.dom.createElement_(a, "TD");
            d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
            h.appendChild(l)
        }
        f.appendChild(h)
    }
    return e
}
;
goog.dom.constHtmlToNode = function(a) {
    var b = goog.array.map(arguments, goog.string.Const.unwrap);
    b = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), b.join(""));
    return goog.dom.safeHtmlToNode(b)
}
;
goog.dom.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(document, a)
}
;
goog.dom.safeHtmlToNode_ = function(a, b) {
    var c = goog.dom.createElement_(a, "DIV");
    goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)),
    c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
    return goog.dom.childrenToNode_(a, c)
}
;
goog.dom.childrenToNode_ = function(a, b) {
    if (1 == b.childNodes.length)
        return b.removeChild(b.firstChild);
    for (a = a.createDocumentFragment(); b.firstChild; )
        a.appendChild(b.firstChild);
    return a
}
;
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
}
;
goog.dom.isCss1CompatMode_ = function(a) {
    return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
}
;
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT)
        return !1;
    switch (a.tagName) {
    case "APPLET":
    case "AREA":
    case "BASE":
    case "BR":
    case "COL":
    case "COMMAND":
    case "EMBED":
    case "FRAME":
    case "HR":
    case "IMG":
    case "INPUT":
    case "IFRAME":
    case "ISINDEX":
    case "KEYGEN":
    case "LINK":
    case "NOFRAMES":
    case "NOSCRIPT":
    case "META":
    case "OBJECT":
    case "PARAM":
    case "SCRIPT":
    case "SOURCE":
    case "STYLE":
    case "TRACK":
    case "WBR":
        return !1
    }
    return !0
}
;
goog.dom.appendChild = function(a, b) {
    a.appendChild(b)
}
;
goog.dom.append = function(a, b) {
    goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
}
;
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild; )
        a.removeChild(b)
}
;
goog.dom.insertSiblingBefore = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b)
}
;
goog.dom.insertSiblingAfter = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
}
;
goog.dom.insertChildAt = function(a, b, c) {
    a.insertBefore(b, a.childNodes[c] || null)
}
;
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
}
;
goog.dom.replaceNode = function(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b)
}
;
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
        if (a.removeNode)
            return a.removeNode(!1);
        for (; b = a.firstChild; )
            c.insertBefore(b, a);
        return goog.dom.removeNode(a)
    }
}
;
goog.dom.getChildren = function(a) {
    return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
        return a.nodeType == goog.dom.NodeType.ELEMENT
    })
}
;
goog.dom.getFirstElementChild = function(a) {
    return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
}
;
goog.dom.getLastElementChild = function(a) {
    return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
}
;
goog.dom.getNextElementSibling = function(a) {
    return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
}
;
goog.dom.getPreviousElementSibling = function(a) {
    return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
}
;
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT; )
        a = b ? a.nextSibling : a.previousSibling;
    return a
}
;
goog.dom.getNextNode = function(a) {
    if (!a)
        return null;
    if (a.firstChild)
        return a.firstChild;
    for (; a && !a.nextSibling; )
        a = a.parentNode;
    return a ? a.nextSibling : null
}
;
goog.dom.getPreviousNode = function(a) {
    if (!a)
        return null;
    if (!a.previousSibling)
        return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild; )
        a = a.lastChild;
    return a
}
;
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && 0 < a.nodeType
}
;
goog.dom.isElement = function(a) {
    return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
}
;
goog.dom.isWindow = function(a) {
    return goog.isObject(a) && a.window == a
}
;
goog.dom.getParentElement = function(a) {
    var b;
    if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement))
        return b;
    b = a.parentNode;
    return goog.dom.isElement(b) ? b : null
}
;
goog.dom.contains = function(a, b) {
    if (!a || !b)
        return !1;
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT)
        return a == b || a.contains(b);
    if ("undefined" != typeof a.compareDocumentPosition)
        return a == b || !!(a.compareDocumentPosition(b) & 16);
    for (; b && a != b; )
        b = b.parentNode;
    return b == a
}
;
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b)
        return 0;
    if (a.compareDocumentPosition)
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        if (a.nodeType == goog.dom.NodeType.DOCUMENT)
            return -1;
        if (b.nodeType == goog.dom.NodeType.DOCUMENT)
            return 1
    }
    if ("sourceIndex"in a || a.parentNode && "sourceIndex"in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT
          , d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d)
            return a.sourceIndex - b.sourceIndex;
        var e = a.parentNode
          , f = b.parentNode;
        return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(!0);
    a = d.createRange();
    a.selectNode(b);
    a.collapse(!0);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, a)
}
;
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b)
        return -1;
    for (; b.parentNode != c; )
        b = b.parentNode;
    return goog.dom.compareSiblingOrder_(b, a)
}
;
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (; b = b.previousSibling; )
        if (b == a)
            return -1;
    return 1
}
;
goog.dom.findCommonAncestor = function(a) {
    var b, c = arguments.length;
    if (!c)
        return null;
    if (1 == c)
        return arguments[0];
    var d = []
      , e = Infinity;
    for (b = 0; b < c; b++) {
        for (var f = [], g = arguments[b]; g; )
            f.unshift(g),
            g = g.parentNode;
        d.push(f);
        e = Math.min(e, f.length)
    }
    f = null;
    for (b = 0; b < e; b++) {
        g = d[0][b];
        for (var h = 1; h < c; h++)
            if (g != d[h][b])
                return f;
        f = g
    }
    return f
}
;
goog.dom.getOwnerDocument = function(a) {
    goog.asserts.assert(a, "Node cannot be null or undefined.");
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
}
;
goog.dom.getFrameContentDocument = function(a) {
    return a.contentDocument || a.contentWindow.document
}
;
goog.dom.getFrameContentWindow = function(a) {
    try {
        return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
    } catch (b) {}
    return null
}
;
goog.dom.setTextContent = function(a, b) {
    goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
    if ("textContent"in a)
        a.textContent = b;
    else if (a.nodeType == goog.dom.NodeType.TEXT)
        a.data = String(b);
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild; )
            a.removeChild(a.lastChild);
        a.firstChild.data = String(b)
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)))
    }
}
;
goog.dom.getOuterHtml = function(a) {
    goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
    if ("outerHTML"in a)
        return a.outerHTML;
    var b = goog.dom.getOwnerDocument(a);
    b = goog.dom.createElement_(b, "DIV");
    b.appendChild(a.cloneNode(!0));
    return b.innerHTML
}
;
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
}
;
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, !1);
    return c
}
;
goog.dom.findNodes_ = function(a, b, c, d) {
    if (null != a)
        for (a = a.firstChild; a; ) {
            if (b(a) && (c.push(a),
            d) || goog.dom.findNodes_(a, b, c, d))
                return !0;
            a = a.nextSibling
        }
    return !1
}
;
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PREDEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
}
;
goog.dom.setFocusableTabIndex = function(a, b) {
    b ? a.tabIndex = 0 : (a.tabIndex = -1,
    a.removeAttribute("tabIndex"))
}
;
goog.dom.isFocusable = function(a) {
    var b;
    return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
}
;
goog.dom.hasSpecifiedTabIndex_ = function(a) {
    return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9") ? (a = a.getAttributeNode("tabindex"),
    goog.isDefAndNotNull(a) && a.specified) : a.hasAttribute("tabindex")
}
;
goog.dom.isTabIndexFocusable_ = function(a) {
    a = a.tabIndex;
    return goog.isNumber(a) && 0 <= a && 32768 > a
}
;
goog.dom.nativelySupportsFocus_ = function(a) {
    return "A" == a.tagName || "INPUT" == a.tagName || "TEXTAREA" == a.tagName || "SELECT" == a.tagName || "BUTTON" == a.tagName
}
;
goog.dom.hasNonZeroBoundingRect_ = function(a) {
    a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {
        height: a.offsetHeight,
        width: a.offsetWidth
    } : a.getBoundingClientRect();
    return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width
}
;
goog.dom.getTextContent = function(a) {
    if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText"in a)
        a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, !0);
        a = b.join("")
    }
    a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
    a = a.replace(/\u200B/g, "");
    goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
    " " != a && (a = a.replace(/^\s*/, ""));
    return a
}
;
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, !1);
    return b.join("")
}
;
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT)
            c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
            b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
        else
            for (a = a.firstChild; a; )
                goog.dom.getTextContent_(a, b, c),
                a = a.nextSibling
}
;
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
}
;
goog.dom.getNodeTextOffset = function(a, b) {
    b = b || goog.dom.getOwnerDocument(a).body;
    for (var c = []; a && a != b; ) {
        for (var d = a; d = d.previousSibling; )
            c.unshift(goog.dom.getTextContent(d));
        a = a.parentNode
    }
    return goog.string.trimLeft(c.join("")).replace(/ +/g, " ").length
}
;
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e = null; 0 < a.length && d < b; )
        if (e = a.pop(),
        !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) {
                var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
                d += f.length
            } else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_)
                d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
            else
                for (f = e.childNodes.length - 1; 0 <= f; f--)
                    a.push(e.childNodes[f]);
    goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0,
    c.node = e);
    return e
}
;
goog.dom.isNodeList = function(a) {
    if (a && "number" == typeof a.length) {
        if (goog.isObject(a))
            return "function" == typeof a.item || "string" == typeof a.item;
        if (goog.isFunction(a))
            return "function" == typeof a.item
    }
    return !1
}
;
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
    if (!b && !c)
        return null;
    var e = b ? String(b).toUpperCase() : null;
    return goog.dom.getAncestor(a, function(a) {
        return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c))
    }, !0, d)
}
;
goog.dom.getAncestorByClass = function(a, b, c) {
    return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
}
;
goog.dom.getAncestor = function(a, b, c, d) {
    a && !c && (a = a.parentNode);
    for (c = 0; a && (null == d || c <= d); ) {
        goog.asserts.assert("parentNode" != a.name);
        if (b(a))
            return a;
        a = a.parentNode;
        c++
    }
    return null
}
;
goog.dom.getActiveElement = function(a) {
    try {
        return a && a.activeElement
    } catch (b) {}
    return null
}
;
goog.dom.getPixelRatio = function() {
    var a = goog.dom.getWindow();
    return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1
}
;
goog.dom.matchesPixelRatio_ = function(a) {
    return goog.dom.getWindow().matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0
}
;
goog.dom.getCanvasContext2D = function(a) {
    return a.getContext("2d")
}
;
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
}
;
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
}
;
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
}
;
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.dom.getElementHelper_(this.document_, a)
}
;
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
    return goog.dom.getRequiredElementHelper_(this.document_, a)
}
;
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagName = function(a, b) {
    return (b || this.document_).getElementsByTagName(String(a))
}
;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
}
;
goog.dom.DomHelper.prototype.getElementByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementByTagNameAndClass_(this.document_, a, b, c)
}
;
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
    return goog.dom.getElementsByClass(a, b || this.document_)
}
;
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
    return goog.dom.getElementByClass(a, b || this.document_)
}
;
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
    return goog.dom.getRequiredElementByClass(a, b || this.document_)
}
;
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
}
;
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
}
;
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
    return goog.dom.createDom_(this.document_, arguments)
}
;
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return goog.dom.createElement_(this.document_, a)
}
;
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(String(a))
}
;
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
}
;
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
    return goog.dom.safeHtmlToNode_(this.document_, a)
}
;
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
}
;
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
}
;
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
}
;
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
}
;
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
    return goog.dom.getActiveElement(a || this.document_)
}
;
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;
var mpl$lab$controls$CheckBoxControlBase = function(a, b, c, d) {
    this.label_ = a;
    this.getter_ = b;
    this.setter_ = c;
    this.state_ = b();
    a = null;
    goog.isObject(d) ? (b = goog.dom.getParentElement(d),
    null != b && "LABEL" == b.tagName && (a = b)) : (d = document.createElement("input"),
    d.type = "checkbox",
    a = document.createElement("LABEL"),
    a.appendChild(d),
    a.appendChild(document.createTextNode(this.label_)));
    this.checkBox_ = d;
    this.checkBox_.checked = this.state_;
    this.topElement_ = null !== a ? a : this.checkBox_;
    this.changeKey_ = goog.events.listen(this.checkBox_, goog.events.EventType.CHANGE, this.handleClick, !0, this)
};
mpl$lab$controls$CheckBoxControlBase.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", state_: " + this.state_ + "}"
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{label_: "' + this.label_ + '"}'
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.disconnect = function() {
    goog.events.unlistenByKey(this.changeKey_)
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.getClassName = function() {
    return "CheckBoxControlBase"
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.getElement = function() {
    return this.topElement_
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.getState = function() {
    return this.getter_()
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.handleClick = function(a) {
    this.setState(!this.getState())
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.observe = function(a) {
    this.setState(this.getState())
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.setEnabled = function(a) {
    this.checkBox_.disabled = !a
}
;
mpl$lab$controls$CheckBoxControlBase.prototype.setState = function(a) {
    this.getState() != a && this.setter_(a);
    this.state_ != this.getState() && (this.state_ = this.getState(),
    this.checkBox_.checked = this.state_)
}
;
var mpl$lab$controls$CheckBoxControl = function(a, b) {
    mpl$lab$controls$CheckBoxControlBase.call(this, a.getName(!0), goog.bind(a.getValue, a), goog.bind(a.setValue, a), b);
    this.parameter_ = a;
    this.parameter_.getSubject().addObserver(this)
};
$jscomp.inherits(mpl$lab$controls$CheckBoxControl, mpl$lab$controls$CheckBoxControlBase);
mpl$lab$controls$CheckBoxControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$controls$CheckBoxControlBase.prototype.toString.call(this).slice(0, -1) + ", parameter_: " + this.parameter_.toStringShort() + "}"
}
;
mpl$lab$controls$CheckBoxControl.prototype.disconnect = function() {
    mpl$lab$controls$CheckBoxControlBase.prototype.disconnect.call(this);
    this.parameter_.getSubject().removeObserver(this)
}
;
mpl$lab$controls$CheckBoxControl.prototype.getClassName = function() {
    return "CheckBoxControl"
}
;
mpl$lab$controls$CheckBoxControl.prototype.getParameter = function() {
    return this.parameter_
}
;
mpl$lab$controls$CheckBoxControl.prototype.observe = function(a) {
    a == this.parameter_ && mpl$lab$controls$CheckBoxControlBase.prototype.observe.call(this, a)
}
;
var mpl$lab$controls$ChoiceControlBase = function(a, b, c, d, e) {
    this.getter_ = c;
    this.setter_ = d;
    this.choices = a;
    this.values_ = b;
    this.currentIndex_ = goog.array.indexOf(this.values_, c());
    this.selectMenu_ = document.createElement("select");
    goog.asserts.assert(!this.selectMenu_.multiple);
    goog.asserts.assert("select-one" == this.selectMenu_.type);
    this.buildSelectMenu();
    this.label_ = goog.isString(e) ? e : "";
    a = null;
    0 < this.label_.length && (a = document.createElement("LABEL"),
    a.appendChild(document.createTextNode(this.label_)),
    a.appendChild(this.selectMenu_));
    this.selectMenu_.selectedIndex = this.currentIndex_;
    this.topElement_ = null !== a ? a : this.selectMenu_;
    this.changeKey_ = goog.events.listen(this.selectMenu_, goog.events.EventType.CHANGE, this.itemStateChanged, !0, this)
};
mpl$lab$controls$ChoiceControlBase.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", currentIndex_: " + this.currentIndex_ + ", choices.length: " + this.choices.length + ', selected: "' + (-1 < this.currentIndex_ ? this.choices[this.currentIndex_] : "(none)") + '"}'
}
;
mpl$lab$controls$ChoiceControlBase.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{label_: "' + this.label_ + '"}'
}
;
mpl$lab$controls$ChoiceControlBase.prototype.buildSelectMenu = function() {
    for (var a = this.selectMenu_.options.length = 0, b = this.choices.length; a < b; a++)
        this.selectMenu_.options[a] = new Option(this.choices[a])
}
;
mpl$lab$controls$ChoiceControlBase.prototype.disconnect = function() {
    goog.events.unlistenByKey(this.changeKey_)
}
;
mpl$lab$controls$ChoiceControlBase.prototype.getChoice = function() {
    return this.currentIndex_
}
;
mpl$lab$controls$ChoiceControlBase.prototype.getClassName = function() {
    return "ChoiceControlBase"
}
;
mpl$lab$controls$ChoiceControlBase.prototype.getElement = function() {
    return this.topElement_
}
;
mpl$lab$controls$ChoiceControlBase.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$ChoiceControlBase.prototype.itemStateChanged = function(a) {
    this.selectMenu_.selectedIndex !== this.currentIndex_ && this.setChoice(this.selectMenu_.selectedIndex)
}
;
mpl$lab$controls$ChoiceControlBase.prototype.observe = function(a) {
    a = goog.array.indexOf(this.values_, this.getter_());
    this.setChoice(a)
}
;
mpl$lab$controls$ChoiceControlBase.prototype.setChoice = function(a) {
    if (this.currentIndex_ !== a) {
        var b = this.selectMenu_.options.length;
        if (this.values_.length != b)
            throw Error("ChoiceControl: values_.length=" + this.values_.length + " but menu.options.length=" + b);
        try {
            -1 > a ? a = -1 : a > b - 1 && (a = b - 1),
            this.currentIndex_ = a,
            -1 < a && this.setter_(this.values_[a])
        } catch (c) {
            alert(c),
            this.currentIndex_ = goog.array.indexOf(this.values_, this.getter_())
        }
        this.selectMenu_.selectedIndex = this.currentIndex_
    }
}
;
mpl$lab$controls$ChoiceControlBase.prototype.setChoices = function(a, b) {
    if (a.length != b.length)
        throw Error();
    this.choices = a;
    this.values_ = b;
    this.currentIndex_ = goog.array.indexOf(this.values_, this.getter_());
    this.buildSelectMenu();
    this.selectMenu_.selectedIndex = this.currentIndex_
}
;
mpl$lab$controls$ChoiceControlBase.prototype.setEnabled = function(a) {
    this.selectMenu_.disabled = !a
}
;
var mpl$lab$controls$ChoiceControl = function(a, b, c, d) {
    c = void 0 !== c ? c : a.getChoices();
    d = void 0 !== d ? d : a.getValues();
    b = void 0 !== b ? b : a.getName(!0);
    mpl$lab$controls$ChoiceControlBase.call(this, c, d, goog.bind(a.getAsString, a), goog.bind(a.setFromString, a), b);
    this.parameter_ = a;
    this.parameter_.getSubject().addObserver(this)
};
$jscomp.inherits(mpl$lab$controls$ChoiceControl, mpl$lab$controls$ChoiceControlBase);
mpl$lab$controls$ChoiceControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$controls$ChoiceControlBase.prototype.toString.call(this).slice(0, -1) + ", parameter_: " + this.parameter_.toStringShort() + "}"
}
;
mpl$lab$controls$ChoiceControl.prototype.disconnect = function() {
    mpl$lab$controls$ChoiceControlBase.prototype.disconnect.call(this);
    this.parameter_.getSubject().removeObserver(this)
}
;
mpl$lab$controls$ChoiceControl.prototype.getClassName = function() {
    return "ChoiceControl"
}
;
mpl$lab$controls$ChoiceControl.prototype.getParameter = function() {
    return this.parameter_
}
;
mpl$lab$controls$ChoiceControl.prototype.observe = function(a) {
    a.getValue() == this.parameter_ && a.nameEquals(mpl$lab$util$Parameter.CHOICES_MODIFIED) ? setTimeout(goog.bind(this.rebuildMenu, this), 50) : a == this.parameter_ && mpl$lab$controls$ChoiceControlBase.prototype.observe.call(this, a)
}
;
mpl$lab$controls$ChoiceControl.prototype.rebuildMenu = function() {
    var a = this.parameter_.getChoices();
    goog.array.equals(this.choices, a) || this.setChoices(a, this.parameter_.getValues())
}
;
var mpl$lab$util$ClockTask = function(a, b) {
    this.callBack_ = b;
    this.time_ = a;
    this.timeoutID_ = NaN
};
mpl$lab$util$ClockTask.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ClockTask{time_: " + mpl$lab$util$Util.NF(this.time_) + ", timeoutID_: " + this.timeoutID_ + ", callBack_: " + this.callBack_ + "}"
}
;
mpl$lab$util$ClockTask.prototype.cancel = function() {
    isFinite(this.timeoutID_) && (clearTimeout(this.timeoutID_),
    this.timeoutID_ = NaN)
}
;
mpl$lab$util$ClockTask.prototype.execute = function() {
    goog.isFunction(this.callBack_) && this.callBack_()
}
;
mpl$lab$util$ClockTask.prototype.getTime = function() {
    return this.time_
}
;
mpl$lab$util$ClockTask.prototype.schedule = function(a) {
    this.cancel();
    goog.isFunction(this.callBack_) && (this.timeoutID_ = setTimeout(this.callBack_, Math.round(1E3 * a)))
}
;
mpl$lab$util$ClockTask.prototype.setCallback = function(a) {
    this.callBack_ = a
}
;
var mpl$lab$util$Clock = function(a) {
    mpl$lab$util$AbstractSubject.call(this, a || "CLOCK");
    this.realStart_sys_secs_ = this.clockStart_sys_secs_ = mpl$lab$util$Util.systemTime();
    this.timeRate_ = 1;
    this.saveRealTime_secs_ = this.saveTime_secs_ = 0;
    this.stepMode_ = this.isRunning_ = !1;
    this.tasks_ = [];
    this.clockDebug_ = !1;
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$util$Clock.en.TIME_RATE,mpl$lab$util$Clock.i18n.TIME_RATE,goog.bind(this.getTimeRate, this),goog.bind(this.setTimeRate, this)))
};
$jscomp.inherits(mpl$lab$util$Clock, mpl$lab$util$AbstractSubject);
mpl$lab$util$Clock.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", timeRate_: " + mpl$lab$util$Util.NF5(this.timeRate_) + ", saveTime_secs_: " + mpl$lab$util$Util.NF5(this.saveTime_secs_) + ", saveRealTime_secs_: " + mpl$lab$util$Util.NF5(this.saveRealTime_secs_) + ", isRunning_: " + this.isRunning_ + ", stepMode_: " + this.stepMode_ + ", clockStart_sys_secs_: " + mpl$lab$util$Util.NF5(this.clockStart_sys_secs_) + ", realStart_sys_secs_: " + mpl$lab$util$Util.NF5(this.realStart_sys_secs_) + ", tasks_: [" + this.tasks_ + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$util$Clock.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", time: " + mpl$lab$util$Util.NF5(this.getTime()) + "}"
}
;
mpl$lab$util$Clock.prototype.getClassName = function() {
    return "Clock"
}
;
mpl$lab$util$Clock.prototype.addTask = function(a) {
    goog.array.contains(this.tasks_, a) || (this.tasks_.push(a),
    this.scheduleTask(a))
}
;
mpl$lab$util$Clock.prototype.cancelAllTasks = function() {
    goog.array.forEach(this.tasks_, function(a) {
        a.cancel()
    })
}
;
mpl$lab$util$Clock.prototype.clearStepMode = function() {
    this.stepMode_ = !1
}
;
mpl$lab$util$Clock.prototype.clockToSystem = function(a) {
    return a / this.timeRate_ + this.clockStart_sys_secs_
}
;
mpl$lab$util$Clock.prototype.executeTasks = function(a, b) {
    goog.array.forEach(this.tasks_, function(c) {
        c.getTime() >= a && c.getTime() <= a + b && c.schedule(0)
    })
}
;
mpl$lab$util$Clock.prototype.getRealTime = function() {
    return this.isRunning_ ? (mpl$lab$util$Util.systemTime() - this.realStart_sys_secs_) * this.timeRate_ : this.saveRealTime_secs_
}
;
mpl$lab$util$Clock.prototype.getTasks = function() {
    return goog.array.clone(this.tasks_)
}
;
mpl$lab$util$Clock.prototype.getTime = function() {
    return this.isRunning_ ? (mpl$lab$util$Util.systemTime() - this.clockStart_sys_secs_) * this.timeRate_ : this.saveTime_secs_
}
;
mpl$lab$util$Clock.prototype.getTimeRate = function() {
    return this.timeRate_
}
;
mpl$lab$util$Clock.prototype.isRunning = function() {
    return this.isRunning_
}
;
mpl$lab$util$Clock.prototype.isStepping = function() {
    return this.stepMode_
}
;
mpl$lab$util$Clock.prototype.pause = function() {
    this.clearStepMode();
    this.isRunning_ && (this.saveTime_secs_ = this.getTime(),
    this.saveRealTime_secs_ = this.getRealTime(),
    this.cancelAllTasks(),
    this.isRunning_ = !1,
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$util$Clock.CLOCK_PAUSE)),
    mpl$lab$util$Util.DEBUG && this.clockDebug_ && console.log("Clock.pause " + this.toString()))
}
;
mpl$lab$util$Clock.prototype.removeTask = function(a) {
    goog.array.remove(this.tasks_, a);
    a.cancel()
}
;
mpl$lab$util$Clock.prototype.resume = function() {
    this.clearStepMode();
    this.isRunning_ || (this.isRunning_ = !0,
    this.setTimePrivate(this.saveTime_secs_),
    this.setRealTime(this.saveRealTime_secs_),
    mpl$lab$util$Util.DEBUG && this.clockDebug_ && console.log("Clock.resume " + this.toString()),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$util$Clock.CLOCK_RESUME)))
}
;
mpl$lab$util$Clock.prototype.scheduleTask = function(a) {
    a.cancel();
    if (this.isRunning_) {
        var b = this.clockToSystem(this.getTime())
          , c = this.clockToSystem(a.getTime());
        mpl$lab$util$Util.veryDifferent(c, b) ? c > b && a.schedule(c - b) : a.execute()
    }
}
;
mpl$lab$util$Clock.prototype.setRealTime = function(a) {
    mpl$lab$util$Util.DEBUG && this.clockDebug_ && console.log("Clock.setRealTime " + mpl$lab$util$Util.NF5(a));
    this.isRunning_ ? this.realStart_sys_secs_ = mpl$lab$util$Util.systemTime() - a / this.timeRate_ : this.saveRealTime_secs_ = a
}
;
mpl$lab$util$Clock.prototype.setTime = function(a) {
    var b = this.getTime();
    mpl$lab$util$Util.veryDifferent(b, a, .001) && (this.setTimePrivate(a),
    mpl$lab$util$Util.DEBUG && this.clockDebug_ && console.log("Clock.setTime(" + a + ") getTime=" + b + " realTime=" + mpl$lab$util$Util.NF5(this.getRealTime())),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$util$Clock.CLOCK_SET_TIME)))
}
;
mpl$lab$util$Clock.prototype.setTimePrivate = function(a) {
    this.isRunning_ ? (this.clockStart_sys_secs_ = mpl$lab$util$Util.systemTime() - a / this.timeRate_,
    goog.array.forEach(this.tasks_, goog.bind(this.scheduleTask, this))) : this.saveTime_secs_ = a
}
;
mpl$lab$util$Clock.prototype.setTimeRate = function(a) {
    if (mpl$lab$util$Util.veryDifferent(this.timeRate_, a)) {
        var b = this.getTime()
          , c = this.getRealTime();
        this.timeRate_ = a;
        this.setTimePrivate(b);
        this.setRealTime(c);
        a = Math.abs(b - this.getTime());
        goog.asserts.assert(.002 > a, "time diff=" + a);
        a = Math.abs(c - this.getRealTime());
        goog.asserts.assert(.002 > a, "realTime diff=" + a);
        this.broadcastParameter(mpl$lab$util$Clock.en.TIME_RATE)
    }
}
;
mpl$lab$util$Clock.prototype.step = function(a) {
    this.pause();
    this.stepMode_ = !0;
    goog.asserts.assertNumber(a);
    var b = this.saveTime_secs_;
    this.saveTime_secs_ += a;
    this.saveRealTime_secs_ += a;
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$util$Clock.CLOCK_STEP));
    mpl$lab$util$Util.DEBUG && this.clockDebug_ && console.log("Clock.step timeStep=" + mpl$lab$util$Util.NFE(a) + " " + this.toString());
    this.executeTasks(b, a)
}
;
mpl$lab$util$Clock.prototype.systemToClock = function(a) {
    return (a - this.clockStart_sys_secs_) * this.timeRate_
}
;
mpl$lab$util$Clock.CLOCK_PAUSE = "CLOCK_PAUSE";
mpl$lab$util$Clock.CLOCK_RESUME = "CLOCK_RESUME";
mpl$lab$util$Clock.CLOCK_SET_TIME = "CLOCK_SET_TIME";
mpl$lab$util$Clock.CLOCK_STEP = "CLOCK_STEP";
mpl$lab$util$Clock.en = {
    TIME_RATE: "time rate"
};
mpl$lab$util$Clock.de_strings = {
    TIME_RATE: "Zeitraffer"
};
mpl$lab$util$Clock.i18n = "de" === goog.LOCALE ? mpl$lab$util$Clock.de_strings : mpl$lab$util$Clock.en;
var mpl$lab$graph$DisplayAxes = function(a, b, c) {
    this.simRect_ = a || mpl$lab$util$DoubleRect.EMPTY_RECT;
    this.numFont_ = b || "14pt sans-serif";
    this.drawColor_ = c || "gray";
    this.fontDescent = 8;
    this.fontAscent = 12;
    this.horizAlignValue_ = 0;
    this.horizAxisAlignment_ = mpl$lab$view$VerticalAlign.VALUE;
    this.vertAlignValue_ = 0;
    this.vertAxisAlignment_ = mpl$lab$view$HorizAlign.VALUE;
    this.numDecimal_ = 0;
    this.needRedraw_ = !0;
    this.horizName_ = "x";
    this.verticalName_ = "y";
    this.zIndex = 100
};
mpl$lab$graph$DisplayAxes.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", horizAxisAlignment_: " + this.horizAxisAlignment_ + ", vertAxisAlignment_: " + this.vertAxisAlignment_ + ", this.horizAlignValue_: " + mpl$lab$util$Util.NF(this.horizAlignValue_) + ", this.vertAlignValue_: " + mpl$lab$util$Util.NF(this.vertAlignValue_) + ', drawColor_: "' + this.drawColor_ + '", numFont_: "' + this.numFont_ + '", simRect_: ' + this.simRect_ + ", zIndex: " + this.zIndex + "}"
}
;
mpl$lab$graph$DisplayAxes.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'DisplayAxes{horizName_: "' + this.horizName_ + '", verticalName_: "' + this.verticalName_ + '"}'
}
;
mpl$lab$graph$DisplayAxes.prototype.contains = function(a) {
    return !1
}
;
mpl$lab$graph$DisplayAxes.prototype.draw = function(a, b) {
    a.save();
    a.strokeStyle = this.drawColor_;
    a.fillStyle = this.drawColor_;
    a.font = this.numFont_;
    a.textAlign = "start";
    a.textBaseline = "alphabetic";
    var c = this.simRect_;
    var d = c.getLeft()
      , e = c.getRight()
      , f = c.getBottom()
      , g = c.getTop();
    var h = e - .06 * (e - d);
    var k = d + .01 * (e - d);
    switch (this.vertAxisAlignment_) {
    case mpl$lab$view$HorizAlign.VALUE:
        var l = this.vertAlignValue_;
        l < k ? l = k : l > h && (l = h);
        h = b.simToScreenX(l);
        break;
    case mpl$lab$view$HorizAlign.RIGHT:
        h = b.simToScreenX(h);
        break;
    case mpl$lab$view$HorizAlign.LEFT:
        h = b.simToScreenX(k);
        break;
    default:
        h = b.simToScreenX(c.getCenterX())
    }
    k = b.simToScreenY(g);
    l = b.simToScreenY(f);
    var m = 10 + this.fontDescent + this.fontAscent;
    switch (this.horizAxisAlignment_) {
    case mpl$lab$view$VerticalAlign.VALUE:
        c = b.simToScreenY(this.horizAlignValue_);
        c < k + m ? c = k + m : c > l - m && (c = l - m);
        break;
    case mpl$lab$view$VerticalAlign.TOP:
        c = k + m;
        break;
    case mpl$lab$view$VerticalAlign.BOTTOM:
        c = l - m;
        break;
    default:
        c = b.simToScreenY(c.getCenterY())
    }
    a.beginPath();
    a.moveTo(b.simToScreenX(d), c);
    a.lineTo(b.simToScreenX(e), c);
    a.stroke();
    this.drawHorizTicks(c, a, b, this.simRect_);
    a.beginPath();
    a.moveTo(h, b.simToScreenY(f));
    a.lineTo(h, b.simToScreenY(g));
    a.stroke();
    this.drawVertTicks(h, a, b, this.simRect_);
    a.restore();
    this.needRedraw_ = !1
}
;
mpl$lab$graph$DisplayAxes.prototype.drawHorizTicks = function(a, b, c, d) {
    var e = a - 4
      , f = e + 8
      , g = d.getLeft();
    d = d.getRight();
    for (var h = this.getNiceIncrement(d - g), k = mpl$lab$graph$DisplayAxes.getNiceStart(g, h); k < d; ) {
        g = c.simToScreenX(k);
        b.beginPath();
        b.moveTo(g, e);
        b.lineTo(g, f);
        b.stroke();
        var l = k + h;
        if (l > k) {
            k = k.toFixed(this.numDecimal_);
            var m = b.measureText(k).width;
            b.fillText(k, g - m / 2, f + this.fontAscent)
        } else {
            b.fillText("scale is too small", g, f + this.fontAscent);
            break
        }
        k = l
    }
    e = b.measureText(this.horizName_).width;
    b.fillText(this.horizName_, c.simToScreenX(d) - e - 5, a - 8)
}
;
mpl$lab$graph$DisplayAxes.prototype.drawVertTicks = function(a, b, c, d) {
    var e = a - 4
      , f = e + 8
      , g = d.getBottom();
    d = d.getTop();
    for (var h = this.getNiceIncrement(d - g), k = mpl$lab$graph$DisplayAxes.getNiceStart(g, h); k < d; ) {
        g = c.simToScreenY(k);
        b.beginPath();
        b.moveTo(e, g);
        b.lineTo(f, g);
        b.stroke();
        var l = k + h;
        if (l > k) {
            k = k.toFixed(this.numDecimal_);
            var m = b.measureText(k).width;
            this.vertAxisAlignment_ === mpl$lab$view$HorizAlign.RIGHT ? b.fillText(k, f - (m + 10), g + this.fontAscent / 2) : b.fillText(k, f + 5, g + this.fontAscent / 2)
        } else {
            b.fillText("scale is too small", f, g);
            break
        }
        k = l
    }
    e = b.measureText(this.verticalName_).width;
    this.vertAxisAlignment_ === mpl$lab$view$HorizAlign.RIGHT ? b.fillText(this.verticalName_, a - (e + 6), c.simToScreenY(d) + 13) : b.fillText(this.verticalName_, a + 6, c.simToScreenY(d) + 13)
}
;
mpl$lab$graph$DisplayAxes.prototype.getColor = function() {
    return this.drawColor_
}
;
mpl$lab$graph$DisplayAxes.prototype.getFont = function() {
    return this.numFont_
}
;
mpl$lab$graph$DisplayAxes.prototype.getHorizName = function() {
    return this.horizName_
}
;
mpl$lab$graph$DisplayAxes.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$graph$DisplayAxes.prototype.getNiceIncrement = function(a) {
    var b = Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
    a /= b;
    b *= 8 <= a ? 2 : 5 <= a ? 1 : 3 <= a ? .5 : 2 <= a ? .4 : .2;
    a = Math.log(b) / Math.LN10;
    this.numDecimal_ = 0 > a ? Math.ceil(-a) : 0;
    return b
}
;
mpl$lab$graph$DisplayAxes.getNiceStart = function(a, b) {
    return Math.ceil(a / b) * b
}
;
mpl$lab$graph$DisplayAxes.prototype.getPosition = function() {
    return mpl$lab$util$Vector.ORIGIN
}
;
mpl$lab$graph$DisplayAxes.prototype.getSimObjects = function() {
    return []
}
;
mpl$lab$graph$DisplayAxes.prototype.getSimRect = function() {
    return this.simRect_
}
;
mpl$lab$graph$DisplayAxes.prototype.getVerticalName = function() {
    return this.verticalName_
}
;
mpl$lab$graph$DisplayAxes.prototype.getXAxisAlignment = function() {
    return this.horizAxisAlignment_
}
;
mpl$lab$graph$DisplayAxes.prototype.getYAxisAlignment = function() {
    return this.vertAxisAlignment_
}
;
mpl$lab$graph$DisplayAxes.prototype.getZIndex = function() {
    return this.zIndex
}
;
mpl$lab$graph$DisplayAxes.prototype.isDragable = function() {
    return !1
}
;
mpl$lab$graph$DisplayAxes.prototype.needsRedraw = function() {
    return this.needRedraw_
}
;
mpl$lab$graph$DisplayAxes.prototype.setColor = function(a) {
    this.drawColor_ = a;
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayAxes.prototype.setDragable = function(a) {}
;
mpl$lab$graph$DisplayAxes.prototype.setFont = function(a) {
    this.numFont_ = a;
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayAxes.prototype.setHorizName = function(a) {
    this.horizName_ = a;
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayAxes.prototype.setPosition = function(a) {}
;
mpl$lab$graph$DisplayAxes.prototype.setSimRect = function(a) {
    this.simRect_ = a;
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayAxes.prototype.setVerticalName = function(a) {
    this.verticalName_ = a;
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayAxes.prototype.setXAxisAlignment = function(a, b) {
    this.horizAxisAlignment_ = a;
    goog.isNumber(b) && (this.horizAlignValue_ = b);
    this.needRedraw_ = !0;
    return this
}
;
mpl$lab$graph$DisplayAxes.prototype.setYAxisAlignment = function(a, b) {
    this.vertAxisAlignment_ = a;
    goog.isNumber(b) && (this.vertAlignValue_ = b);
    this.needRedraw_ = !0;
    return this
}
;
mpl$lab$graph$DisplayAxes.prototype.setZIndex = function(a) {
    goog.isDef(a) && (this.zIndex = a)
}
;
var mpl$lab$view$DisplayClock = function(a, b, c, d, e) {
    this.simTimeFn_ = a;
    this.realTimeFn_ = b;
    this.period_ = goog.isNumber(c) ? c : 2;
    this.radius_ = goog.isNumber(d) ? d : 1;
    this.location_ = goog.isObject(e) ? e : mpl$lab$util$Vector.ORIGIN;
    this.dragable_ = !0;
    this.font_ = "14pt sans-serif";
    this.handColor_ = this.textColor_ = "blue";
    this.realColor_ = "red";
    this.outlineWidth_ = this.handWidth_ = 1;
    this.outlineColor_ = "black";
    this.fillStyle_ = "rgba(255, 255, 255, 0.75)";
    this.zIndex_ = 0
};
mpl$lab$view$DisplayClock.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", radius: " + mpl$lab$util$Util.NF(this.radius_) + ", period: " + mpl$lab$util$Util.NF(this.period_) + ", location_: " + this.location_ + ", zIndex: " + this.zIndex_ + "}"
}
;
mpl$lab$view$DisplayClock.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DisplayClock{time: " + mpl$lab$util$Util.NF(this.simTimeFn_()) + "}"
}
;
mpl$lab$view$DisplayClock.prototype.contains = function(a) {
    return a.distanceTo(this.location_) <= this.radius_
}
;
mpl$lab$view$DisplayClock.prototype.draw = function(a, b) {
    var c = b.simToScreen(this.location_)
      , d = b.simToScreenScaleX(this.radius_);
    a.save();
    a.beginPath();
    a.arc(c.getX(), c.getY(), d, 0, 2 * Math.PI, !1);
    a.closePath();
    a.lineWidth = this.outlineWidth_;
    a.strokeStyle = this.outlineColor_;
    a.stroke();
    a.fillStyle = this.fillStyle_;
    a.fill();
    d = this.simTimeFn_();
    var e = this.realTimeFn_();
    this.drawHand(a, b, this.handColor_, d, c);
    this.drawHand(a, b, this.realColor_, e, c);
    b = d.toFixed(3);
    a.fillStyle = this.textColor_;
    a.font = this.font_;
    a.textAlign = "center";
    a.fillText(b, c.getX(), c.getY());
    a.restore()
}
;
mpl$lab$view$DisplayClock.prototype.drawHand = function(a, b, c, d, e) {
    d -= this.period_ * Math.floor(d / this.period_);
    var f = d / this.period_;
    d = b.simToScreenScaleX(this.radius_ * Math.sin(2 * Math.PI * f));
    b = b.simToScreenScaleY(this.radius_ * Math.cos(2 * Math.PI * f));
    a.lineWidth = this.handWidth_;
    a.strokeStyle = c;
    a.beginPath();
    a.moveTo(e.getX(), e.getY());
    a.lineTo(e.getX() + d, e.getY() - b);
    a.stroke()
}
;
mpl$lab$view$DisplayClock.prototype.isDragable = function() {
    return this.dragable_
}
;
mpl$lab$view$DisplayClock.prototype.getFillStyle = function() {
    return this.fillStyle_
}
;
mpl$lab$view$DisplayClock.prototype.getFont = function() {
    return this.font_
}
;
mpl$lab$view$DisplayClock.prototype.getHandColor = function() {
    return this.handColor_
}
;
mpl$lab$view$DisplayClock.prototype.getHandWidth = function() {
    return this.handWidth_
}
;
mpl$lab$view$DisplayClock.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$view$DisplayClock.prototype.getOutlineColor = function() {
    return this.outlineColor_
}
;
mpl$lab$view$DisplayClock.prototype.getOutlineWidth = function() {
    return this.outlineWidth_
}
;
mpl$lab$view$DisplayClock.prototype.getPosition = function() {
    return this.location_
}
;
mpl$lab$view$DisplayClock.prototype.getRealColor = function() {
    return this.realColor_
}
;
mpl$lab$view$DisplayClock.prototype.getSimObjects = function() {
    return []
}
;
mpl$lab$view$DisplayClock.prototype.getTextColor = function() {
    return this.textColor_
}
;
mpl$lab$view$DisplayClock.prototype.getZIndex = function() {
    return this.zIndex_
}
;
mpl$lab$view$DisplayClock.prototype.setDragable = function(a) {
    this.dragable_ = a
}
;
mpl$lab$view$DisplayClock.prototype.setFillStyle = function(a) {
    this.fillStyle_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setFont = function(a) {
    this.font_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setHandColor = function(a) {
    this.handColor_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setHandWidth = function(a) {
    this.handWidth_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setOutlineColor = function(a) {
    this.outlineColor_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setOutlineWidth = function(a) {
    this.outlineWidth_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setPosition = function(a) {
    this.location_ = a
}
;
mpl$lab$view$DisplayClock.prototype.setRealColor = function(a) {
    this.realColor_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setTextColor = function(a) {
    this.textColor_ = a;
    return this
}
;
mpl$lab$view$DisplayClock.prototype.setZIndex = function(a) {
    this.zIndex_ = goog.isDef(a) ? a : 0
}
;
mpl$lab$view$DisplayClock.en = {
    SHOW_CLOCK: "show clock"
};
mpl$lab$view$DisplayClock.de_strings = {
    SHOW_CLOCK: "Zeit anzeigen"
};
mpl$lab$view$DisplayClock.i18n = "de" === goog.LOCALE ? mpl$lab$view$DisplayClock.de_strings : mpl$lab$view$DisplayClock.en;
var mpl$lab$util$Parser = function(a) {};
mpl$lab$util$Parser.prototype.addCommand = function(a, b, c) {}
;
mpl$lab$util$Parser.prototype.parse = function(a) {}
;
mpl$lab$util$Parser.prototype.saveStart = function() {}
;
goog.events.KeyCodes = {
    WIN_KEY_FF_LINUX: 0,
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PLUS_SIGN: 43,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    FF_DASH: 173,
    QUESTION_MARK: 63,
    AT_SIGN: 64,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    WIN_KEY_RIGHT: 92,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SCROLL_LOCK: 145,
    FIRST_MEDIA_KEY: 166,
    LAST_MEDIA_KEY: 183,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    MAC_WK_CMD_LEFT: 91,
    MAC_WK_CMD_RIGHT: 93,
    WIN_IME: 229,
    VK_NONAME: 252,
    PHANTOM: 255
};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
    if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12)
        return !1;
    switch (a.keyCode) {
    case goog.events.KeyCodes.ALT:
    case goog.events.KeyCodes.CAPS_LOCK:
    case goog.events.KeyCodes.CONTEXT_MENU:
    case goog.events.KeyCodes.CTRL:
    case goog.events.KeyCodes.DOWN:
    case goog.events.KeyCodes.END:
    case goog.events.KeyCodes.ESC:
    case goog.events.KeyCodes.HOME:
    case goog.events.KeyCodes.INSERT:
    case goog.events.KeyCodes.LEFT:
    case goog.events.KeyCodes.MAC_FF_META:
    case goog.events.KeyCodes.META:
    case goog.events.KeyCodes.NUMLOCK:
    case goog.events.KeyCodes.NUM_CENTER:
    case goog.events.KeyCodes.PAGE_DOWN:
    case goog.events.KeyCodes.PAGE_UP:
    case goog.events.KeyCodes.PAUSE:
    case goog.events.KeyCodes.PHANTOM:
    case goog.events.KeyCodes.PRINT_SCREEN:
    case goog.events.KeyCodes.RIGHT:
    case goog.events.KeyCodes.SCROLL_LOCK:
    case goog.events.KeyCodes.SHIFT:
    case goog.events.KeyCodes.UP:
    case goog.events.KeyCodes.VK_NONAME:
    case goog.events.KeyCodes.WIN_KEY:
    case goog.events.KeyCodes.WIN_KEY_RIGHT:
        return !1;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
        return !goog.userAgent.GECKO;
    default:
        return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
    }
}
;
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e, f) {
    if (!(goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525")))
        return !0;
    if (goog.userAgent.MAC && e)
        return goog.events.KeyCodes.isCharacterKey(a);
    if (e && !d)
        return !1;
    goog.isNumber(b) && (b = goog.events.KeyCodes.normalizeKeyCode(b));
    e = b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META;
    f = b == goog.events.KeyCodes.SHIFT && (d || f);
    if ((!c || goog.userAgent.MAC) && e || goog.userAgent.MAC && f)
        return !1;
    if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) && d && c)
        switch (a) {
        case goog.events.KeyCodes.BACKSLASH:
        case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
        case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        case goog.events.KeyCodes.TILDE:
        case goog.events.KeyCodes.SEMICOLON:
        case goog.events.KeyCodes.DASH:
        case goog.events.KeyCodes.EQUALS:
        case goog.events.KeyCodes.COMMA:
        case goog.events.KeyCodes.PERIOD:
        case goog.events.KeyCodes.SLASH:
        case goog.events.KeyCodes.APOSTROPHE:
        case goog.events.KeyCodes.SINGLE_QUOTE:
            return !1
        }
    if (goog.userAgent.IE && d && b == a)
        return !1;
    switch (a) {
    case goog.events.KeyCodes.ENTER:
        return !0;
    case goog.events.KeyCodes.ESC:
        return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE)
    }
    return goog.events.KeyCodes.isCharacterKey(a)
}
;
goog.events.KeyCodes.isCharacterKey = function(a) {
    if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == a)
        return !0;
    switch (a) {
    case goog.events.KeyCodes.SPACE:
    case goog.events.KeyCodes.PLUS_SIGN:
    case goog.events.KeyCodes.QUESTION_MARK:
    case goog.events.KeyCodes.AT_SIGN:
    case goog.events.KeyCodes.NUM_PLUS:
    case goog.events.KeyCodes.NUM_MINUS:
    case goog.events.KeyCodes.NUM_PERIOD:
    case goog.events.KeyCodes.NUM_DIVISION:
    case goog.events.KeyCodes.SEMICOLON:
    case goog.events.KeyCodes.FF_SEMICOLON:
    case goog.events.KeyCodes.DASH:
    case goog.events.KeyCodes.EQUALS:
    case goog.events.KeyCodes.FF_EQUALS:
    case goog.events.KeyCodes.COMMA:
    case goog.events.KeyCodes.PERIOD:
    case goog.events.KeyCodes.SLASH:
    case goog.events.KeyCodes.APOSTROPHE:
    case goog.events.KeyCodes.SINGLE_QUOTE:
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    case goog.events.KeyCodes.BACKSLASH:
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        return !0;
    default:
        return !1
    }
}
;
goog.events.KeyCodes.normalizeKeyCode = function(a) {
    return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(a) : a
}
;
goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
    switch (a) {
    case goog.events.KeyCodes.FF_EQUALS:
        return goog.events.KeyCodes.EQUALS;
    case goog.events.KeyCodes.FF_SEMICOLON:
        return goog.events.KeyCodes.SEMICOLON;
    case goog.events.KeyCodes.FF_DASH:
        return goog.events.KeyCodes.DASH;
    case goog.events.KeyCodes.MAC_FF_META:
        return goog.events.KeyCodes.META;
    case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
        return goog.events.KeyCodes.WIN_KEY;
    default:
        return a
    }
}
;
goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(a) {
    switch (a) {
    case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
        return goog.events.KeyCodes.META;
    default:
        return a
    }
}
;
goog.events.EventTarget = function() {
    goog.Disposable.call(this);
    this.eventTargetListeners_ = new goog.events.ListenerMap(this);
    this.actualEventTarget_ = this;
    this.parentEventTarget_ = null
}
;
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
}
;
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
}
;
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
}
;
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
}
;
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    this.assertInitialized_();
    var b = this.getParentEventTarget();
    if (b) {
        var c = [];
        for (var d = 1; b; b = b.getParentEventTarget())
            c.push(b),
            goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
    }
    return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, c)
}
;
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    this.removeAllListeners();
    this.parentEventTarget_ = null
}
;
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
    this.assertInitialized_();
    return this.eventTargetListeners_.add(String(a), b, !1, c, d)
}
;
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
    return this.eventTargetListeners_.add(String(a), b, !0, c, d)
}
;
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
    return this.eventTargetListeners_.remove(String(a), b, c, d)
}
;
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
    return this.eventTargetListeners_.removeByKey(a)
}
;
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
    return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
}
;
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
    a = this.eventTargetListeners_.listeners[String(a)];
    if (!a)
        return !0;
    a = a.concat();
    for (var d = !0, e = 0; e < a.length; ++e) {
        var f = a[e];
        if (f && !f.removed && f.capture == b) {
            var g = f.listener
              , h = f.handler || f.src;
            f.callOnce && this.unlistenByKey(f);
            d = !1 !== g.call(h, c) && d
        }
    }
    return d && 0 != c.returnValue_
}
;
goog.events.EventTarget.prototype.getListeners = function(a, b) {
    return this.eventTargetListeners_.getListeners(String(a), b)
}
;
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
    return this.eventTargetListeners_.getListener(String(a), b, c, d)
}
;
goog.events.EventTarget.prototype.hasListener = function(a, b) {
    a = goog.isDef(a) ? String(a) : void 0;
    return this.eventTargetListeners_.hasListener(a, b)
}
;
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
    this.actualEventTarget_ = a
}
;
goog.events.EventTarget.prototype.assertInitialized_ = function() {
    goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
}
;
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
    var d = b.type || b;
    if (goog.isString(b))
        b = new goog.events.Event(b,a);
    else if (b instanceof goog.events.Event)
        b.target = b.target || a;
    else {
        var e = b;
        b = new goog.events.Event(d,a);
        goog.object.extend(b, e)
    }
    e = !0;
    if (c)
        for (var f = c.length - 1; !b.propagationStopped_ && 0 <= f; f--) {
            var g = b.currentTarget = c[f];
            e = g.fireListeners(d, !0, b) && e
        }
    b.propagationStopped_ || (g = b.currentTarget = a,
    e = g.fireListeners(d, !0, b) && e,
    b.propagationStopped_ || (e = g.fireListeners(d, !1, b) && e));
    if (c)
        for (f = 0; !b.propagationStopped_ && f < c.length; f++)
            g = b.currentTarget = c[f],
            e = g.fireListeners(d, !1, b) && e;
    return e
}
;
goog.events.KeyHandler = function(a, b) {
    goog.events.EventTarget.call(this);
    a && this.attach(a, b)
}
;
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ = -1;
goog.events.KeyHandler.prototype.keyCode_ = -1;
goog.events.KeyHandler.prototype.altKey_ = !1;
goog.events.KeyHandler.EventType = {
    KEY: "key"
};
goog.events.KeyHandler.safariKey_ = {
    3: goog.events.KeyCodes.ENTER,
    12: goog.events.KeyCodes.NUMLOCK,
    63232: goog.events.KeyCodes.UP,
    63233: goog.events.KeyCodes.DOWN,
    63234: goog.events.KeyCodes.LEFT,
    63235: goog.events.KeyCodes.RIGHT,
    63236: goog.events.KeyCodes.F1,
    63237: goog.events.KeyCodes.F2,
    63238: goog.events.KeyCodes.F3,
    63239: goog.events.KeyCodes.F4,
    63240: goog.events.KeyCodes.F5,
    63241: goog.events.KeyCodes.F6,
    63242: goog.events.KeyCodes.F7,
    63243: goog.events.KeyCodes.F8,
    63244: goog.events.KeyCodes.F9,
    63245: goog.events.KeyCodes.F10,
    63246: goog.events.KeyCodes.F11,
    63247: goog.events.KeyCodes.F12,
    63248: goog.events.KeyCodes.PRINT_SCREEN,
    63272: goog.events.KeyCodes.DELETE,
    63273: goog.events.KeyCodes.HOME,
    63275: goog.events.KeyCodes.END,
    63276: goog.events.KeyCodes.PAGE_UP,
    63277: goog.events.KeyCodes.PAGE_DOWN,
    63289: goog.events.KeyCodes.NUMLOCK,
    63302: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.keyIdentifier_ = {
    Up: goog.events.KeyCodes.UP,
    Down: goog.events.KeyCodes.DOWN,
    Left: goog.events.KeyCodes.LEFT,
    Right: goog.events.KeyCodes.RIGHT,
    Enter: goog.events.KeyCodes.ENTER,
    F1: goog.events.KeyCodes.F1,
    F2: goog.events.KeyCodes.F2,
    F3: goog.events.KeyCodes.F3,
    F4: goog.events.KeyCodes.F4,
    F5: goog.events.KeyCodes.F5,
    F6: goog.events.KeyCodes.F6,
    F7: goog.events.KeyCodes.F7,
    F8: goog.events.KeyCodes.F8,
    F9: goog.events.KeyCodes.F9,
    F10: goog.events.KeyCodes.F10,
    F11: goog.events.KeyCodes.F11,
    F12: goog.events.KeyCodes.F12,
    "U+007F": goog.events.KeyCodes.DELETE,
    Home: goog.events.KeyCodes.HOME,
    End: goog.events.KeyCodes.END,
    PageUp: goog.events.KeyCodes.PAGE_UP,
    PageDown: goog.events.KeyCodes.PAGE_DOWN,
    Insert: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525");
goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
    (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !a.metaKey) && this.resetState();
    -1 == this.lastKey_ && (a.ctrlKey && a.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : a.altKey && a.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : a.metaKey && a.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
    goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(a.keyCode),
    goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = a.altKey))
}
;
goog.events.KeyHandler.prototype.resetState = function() {
    this.keyCode_ = this.lastKey_ = -1
}
;
goog.events.KeyHandler.prototype.handleKeyup_ = function(a) {
    this.resetState();
    this.altKey_ = a.altKey
}
;
goog.events.KeyHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent()
      , c = b.altKey;
    if (goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS) {
        var d = this.keyCode_;
        var e = d != goog.events.KeyCodes.ENTER && d != goog.events.KeyCodes.ESC ? b.keyCode : 0
    } else
        (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && a.type == goog.events.EventType.KEYPRESS ? (d = this.keyCode_,
        e = 0 <= b.charCode && 63232 > b.charCode && goog.events.KeyCodes.isCharacterKey(d) ? b.charCode : 0) : goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? (d = this.keyCode_,
        e = goog.events.KeyCodes.isCharacterKey(d) ? b.keyCode : 0) : (d = b.keyCode || this.keyCode_,
        e = b.charCode || 0,
        goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (c = this.altKey_),
        goog.userAgent.MAC && e == goog.events.KeyCodes.QUESTION_MARK && d == goog.events.KeyCodes.WIN_KEY && (d = goog.events.KeyCodes.SLASH));
    var f = d = goog.events.KeyCodes.normalizeKeyCode(d);
    d ? 63232 <= d && d in goog.events.KeyHandler.safariKey_ ? f = goog.events.KeyHandler.safariKey_[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in goog.events.KeyHandler.keyIdentifier_ && (f = goog.events.KeyHandler.keyIdentifier_[b.keyIdentifier]);
    a = f == this.lastKey_;
    this.lastKey_ = f;
    b = new goog.events.KeyEvent(f,e,a,b);
    b.altKey = c;
    this.dispatchEvent(b)
}
;
goog.events.KeyHandler.prototype.getElement = function() {
    return this.element_
}
;
goog.events.KeyHandler.prototype.attach = function(a, b) {
    this.keyUpKey_ && this.detach();
    this.element_ = a;
    this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
    this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
    this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
}
;
goog.events.KeyHandler.prototype.detach = function() {
    this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_),
    goog.events.unlistenByKey(this.keyDownKey_),
    goog.events.unlistenByKey(this.keyUpKey_),
    this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
    this.element_ = null;
    this.keyCode_ = this.lastKey_ = -1
}
;
goog.events.KeyHandler.prototype.disposeInternal = function() {
    goog.events.KeyHandler.superClass_.disposeInternal.call(this);
    this.detach()
}
;
goog.events.KeyEvent = function(a, b, c, d) {
    goog.events.BrowserEvent.call(this, d);
    this.type = goog.events.KeyHandler.EventType.KEY;
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
}
;
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
var mpl$lab$util$GenericMemo = function(a, b) {
    this.function_ = a;
    this.purpose_ = mpl$lab$util$Util.ADVANCED ? "" : b || ""
};
mpl$lab$util$GenericMemo.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort()
}
;
mpl$lab$util$GenericMemo.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "GenericMemo{" + (0 < this.purpose_.length ? 'purpose_:"' + this.purpose_ + '"' : "") + "}"
}
;
mpl$lab$util$GenericMemo.prototype.memorize = function() {
    this.function_()
}
;
var mpl$lab$util$Terminal = function(a, b) {
    if (this.term_input_ = a)
        a.spellcheck = !1;
    if (this.term_output_ = b)
        b.spellcheck = !1;
    this.keyDownKey_ = this.term_input_ ? goog.events.listen(this.term_input_, goog.events.EventType.KEYDOWN, this.handleKey, !1, this) : NaN;
    this.changeKey_ = this.term_input_ ? goog.events.listen(this.term_input_, goog.events.EventType.CHANGE, this.inputCallback, !0, this) : NaN;
    this.hasAlerted_ = !1;
    this.history_ = [];
    this.histIndex_ = -1;
    this.verbose_ = !1;
    this.regexs_ = [];
    this.recalling = !1;
    this.resultStack_ = [];
    this.z = {};
    this.whiteList_ = "myphysicslab goog length name terminal find".split(" ");
    this.parser_ = null;
    this.vars_ = "";
    this.evalCalls_ = 0;
    this.prompt_ = "> ";
    this.addRegex("eval", "terminal.", !1)
};
mpl$lab$util$Terminal.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "Terminal{history.length: " + this.history_.length + ", regexs_.length: " + this.regexs_.length + ", verbose_: " + this.verbose_ + ", parser_: " + (null != this.parser_ ? this.parser_.toStringShort() : "null") + "}"
}
;
mpl$lab$util$Terminal.prototype.addRegex = function(a, b, c, d) {
    c = goog.isDef(c) ? c : !0;
    if (!mpl$lab$util$Util.ADVANCED) {
        if (0 == a.length)
            throw Error();
        if (c) {
            c = a.split("|");
            var e = this.vars_.split("|");
            goog.array.forEach(c, function(a) {
                goog.array.contains(e, a) || (this.vars_ += (0 < this.vars_.length ? "|" : "") + a)
            }, this)
        }
        a = {
            regex: new RegExp("(^|[^\\w.$])(" + a + ")\\b","g"),
            replace: "$1" + b + "$2"
        };
        if (!this.hasRegex(a))
            return d ? this.regexs_.unshift(a) : this.regexs_.push(a),
            !0
    }
    return !1
}
;
mpl$lab$util$Terminal.prototype.addRegex2 = function(a, b, c) {
    return mpl$lab$util$Util.ADVANCED || (a = {
        regex: a,
        replace: b
    },
    this.hasRegex(a)) ? !1 : (c ? this.regexs_.unshift(a) : this.regexs_.push(a),
    !0)
}
;
mpl$lab$util$Terminal.prototype.addWhiteList = function(a, b) {
    b = goog.isDef(b) ? b : !0;
    goog.array.contains(this.whiteList_, a) || (this.whiteList_.push(a),
    b && (this.vars_ += (0 < this.vars_.length ? "|" : "") + a))
}
;
mpl$lab$util$Terminal.prototype.alertOnce = function(a) {
    this.hasAlerted_ ? console.log(a) : (this.hasAlerted_ = !0,
    alert(a))
}
;
mpl$lab$util$Terminal.badCommand = function(a, b, c) {
    for (var d = 0, e = c.length; d < e; d++)
        if (b == c[d])
            return !1;
    return (new RegExp("\\b" + b + "\\b","g")).test(a)
}
;
mpl$lab$util$Terminal.prototype.commands = function() {
    if (this.term_output_) {
        var a = this.term_output_.value;
        a = a.split("\n");
        a = goog.array.map(a, function(a) {
            return a.trim()
        });
        a = goog.array.filter(a, function(a) {
            return 2 < a.length && "> " == a.substr(0, 2) && !a.match(/^> (terminal|this).(remember|commands)\(\s*\);?$/)
        });
        return a = goog.array.map(a, function(a) {
            return a.substr(2)
        })
    }
    return []
}
;
mpl$lab$util$Terminal.prototype.destroy = function() {
    goog.events.unlistenByKey(this.keyDownKey_);
    goog.events.unlistenByKey(this.changeKey_)
}
;
mpl$lab$util$Terminal.deUnicode = function(a) {
    return a.replace(/\\(x|u00)([0-9a-fA-F]{2})/g, function(a, c, d) {
        return String.fromCharCode(Number("0x" + d))
    })
}
;
mpl$lab$util$Terminal.encodeURIComponent = function(a) {
    return encodeURIComponent(a).replace(/[!'()*]/g, function(a) {
        return "%" + a.charCodeAt(0).toString(16)
    })
}
;
mpl$lab$util$Terminal.prototype.eval = function(a, b, c) {
    b = goog.isBoolean(b) ? b : !0;
    if ((c = c || !1) && !b)
        throw Error();
    a = mpl$lab$util$Terminal.deUnicode(a).trim();
    if (!a.match(/^\s*$/)) {
        this.evalCalls_++;
        1 < this.evalCalls_ && (b = !1);
        b ? (goog.asserts.assert(1 == this.evalCalls_),
        goog.asserts.assert(0 == this.resultStack_.length),
        this.history_.unshift(a),
        this.histIndex_ = -1) : (this.resultStack_.push(this.result),
        this.result = void 0);
        var d = this.prompt_;
        try {
            mpl$lab$util$Terminal.vetBrackets(a);
            for (var e = ["", a]; e = this.splitAtSemicolon(e[1]),
            e[0]; ) {
                var f = e[0].trim();
                if (0 != f.length)
                    a: {
                        b && this.println(d + f);
                        if (null != this.parser_) {
                            var g = this.parser_.parse(f);
                            if (void 0 !== g) {
                                this.result = g;
                                break a
                            }
                        }
                        var h = this.expand(f);
                        b && this.verbose_ && this.println(d.trim() + d + h);
                        this.result = this.myEval(h)
                    }
            }
            b && goog.isDef(this.result) && ";" != a.slice(-1) && this.println(String(this.result));
            b && goog.isDef(this.afterEvalFn_) && this.afterEvalFn_()
        } catch (k) {
            if (b ? (this.result = void 0,
            this.println(k)) : this.result = this.resultStack_.pop(),
            !c)
                throw this.evalCalls_--,
                k.message += "\nScript: " + a,
                k;
        }
        this.evalCalls_--;
        if (b)
            return this.scrollDown(),
            this.result;
        a = this.result;
        this.result = this.resultStack_.pop();
        return a
    }
}
;
mpl$lab$util$Terminal.prototype.expand = function(a) {
    a = this.replaceVar(a);
    for (var b = "", c = 0; a; ) {
        if (1E4 < ++c)
            throw Error("Terminal.expand");
        var d = a.match(/^[^'"/]+/);
        if (null !== d && (d = d[0],
        a = a.slice(d.length),
        d = goog.array.reduce(this.regexs_, function(a, b) {
            return a.replace(b.regex, b.replace)
        }, d),
        mpl$lab$util$Terminal.vetCommand(d, this.whiteList_),
        b += d,
        0 == a.length))
            break;
        if (b.match(/.*[=(][ ]*$/) && (d = a.match(/^\/[^*/](\\\/|[^\\/])*\//),
        null !== d)) {
            d = d[0];
            a = a.slice(d.length);
            b += d;
            continue
        }
        0 < a.length && "/" == a[0] ? (b += "/",
        a = a.slice(1)) : (d = a.match(/^"(\\.|[^\\"])*"/),
        null !== d ? (d = d[0],
        a = a.slice(d.length),
        b += d) : 0 < a.length && '"' == a[0] ? (b += '"',
        a = a.slice(1)) : (d = a.match(/^'(\\.|[^\\'])*'/),
        null !== d ? (d = d[0],
        a = a.slice(d.length),
        b += d) : 0 < a.length && "'" == a[0] && (b += "'",
        a = a.slice(1))))
    }
    return b
}
;
mpl$lab$util$Terminal.prototype.focus = function() {
    this.term_input_ && this.term_input_.focus()
}
;
mpl$lab$util$Terminal.prototype.forget = function() {
    try {
        var a = window.localStorage;
        goog.isDefAndNotNull(a) && a.removeItem(this.pageKey())
    } catch (b) {
        this.println("//cannot access localStorage due to: " + b)
    }
}
;
mpl$lab$util$Terminal.prototype.handleKey = function(a) {
    this.term_input_ && this.term_output_ && (a.metaKey && a.keyCode == goog.events.KeyCodes.K ? (this.term_output_.value = "",
    a.preventDefault()) : a.keyCode == goog.events.KeyCodes.UP || a.keyCode == goog.events.KeyCodes.DOWN ? (-1 == this.histIndex_ && "" != this.term_input_.value && (this.history_.unshift(this.term_input_.value),
    this.histIndex_ = 0),
    a.keyCode == goog.events.KeyCodes.UP ? this.histIndex_ < this.history_.length - 1 && (this.histIndex_++,
    this.term_input_.value = this.history_[this.histIndex_]) : a.keyCode == goog.events.KeyCodes.DOWN && (0 < this.histIndex_ ? (this.histIndex_--,
    this.term_input_.value = this.history_[this.histIndex_]) : (this.histIndex_ = -1,
    this.term_input_.value = "")),
    a.preventDefault()) : a.keyCode == goog.events.KeyCodes.ENTER && this.eval(this.term_input_.value, !0, !0))
}
;
mpl$lab$util$Terminal.prototype.hasRegex = function(a) {
    var b = a.regex.toString()
      , c = a.replace;
    return goog.array.some(this.regexs_, function(a) {
        return a.replace == c && a.regex.toString() == b
    })
}
;
mpl$lab$util$Terminal.prototype.inputCallback = function(a) {
    this.term_input_ && this.eval(this.term_input_.value, !0, !0)
}
;
mpl$lab$util$Terminal.prototype.myEval = function(a) {
    if (mpl$lab$util$Util.ADVANCED)
        console.log("JavaScript is disabled due to advanced compilation; try a simple-compiled version: " + a),
        this.println("JavaScript is disabled due to advanced compilation; try a simple-compiled version");
    else
        return eval(a)
}
;
mpl$lab$util$Terminal.prototype.pageKey = function() {
    var a = window.location.href
      , b = a.indexOf("?");
    -1 < b && (a = a.slice(0, b));
    return a
}
;
mpl$lab$util$Terminal.prototype.parseURL = function() {
    null != this.parser_ && this.parser_.saveStart();
    var a = window.location.href
      , b = a.indexOf("?");
    return -1 < b ? (a = a.slice(b + 1),
    a = decodeURIComponent(a),
    this.eval(a),
    !0) : !1
}
;
mpl$lab$util$Terminal.prototype.parseURLorRecall = function() {
    this.parseURL() || this.recall()
}
;
mpl$lab$util$Terminal.prototype.println = function(a) {
    this.term_output_ && (this.term_output_.value += a + "\n",
    this.scrollDown())
}
;
mpl$lab$util$Terminal.prototype.recall = function(a) {
    a = goog.isBoolean(a) ? a : !0;
    this.recalling = !0;
    try {
        var b = window.localStorage;
        if (goog.isDefAndNotNull(b)) {
            var c = b.getItem(this.pageKey());
            c && (this.println("//start of stored scripts"),
            a ? goog.array.forEach(c.split("\n"), function(a) {
                this.eval(a)
            }, this) : goog.array.forEach(c.split("\n"), function(a) {
                this.println(a)
            }, this),
            this.println("//end of stored scripts"))
        }
    } catch (d) {
        this.println("//cannot access localStorage due to: " + d)
    }
    this.recalling = !1
}
;
mpl$lab$util$Terminal.prototype.remember = function(a) {
    a = goog.isDef(a) ? a : this.commands();
    goog.isArray(a) && (a = a.join("\n"));
    try {
        this.pageKey();
        var b = window.localStorage;
        goog.isDefAndNotNull(b) && b.setItem(this.pageKey(), a)
    } catch (c) {
        this.println("//cannot access localStorage due to: " + c)
    }
}
;
mpl$lab$util$Terminal.prototype.replaceVar = function(a) {
    var b = a.match(/^\s*var\s+(\w[\w_\d]*)(.*)/);
    return b ? (goog.asserts.assert(3 <= b.length),
    this.addRegex(b[1], "z.", !0, !0),
    b[1] + b[2]) : a
}
;
mpl$lab$util$Terminal.prototype.scrollDown = function() {
    this.term_input_ && this.term_output_ && (this.term_output_.scrollTop = this.term_output_.scrollHeight - this.term_output_.offsetHeight,
    this.term_input_.value = "")
}
;
mpl$lab$util$Terminal.prototype.setAfterEval = function(a) {
    this.afterEvalFn_ = a
}
;
mpl$lab$util$Terminal.prototype.setParser = function(a) {
    this.parser_ = a;
    mpl$lab$util$Util.ADVANCED || a.addCommand("vars", goog.bind(function() {
        return String(this.vars())
    }, this), "lists available variables")
}
;
mpl$lab$util$Terminal.prototype.setPrompt = function(a) {
    this.prompt_ = String(a)
}
;
mpl$lab$util$Terminal.prototype.setVerbose = function(a) {
    this.verbose_ = a
}
;
mpl$lab$util$Terminal.prototype.splitAtSemicolon = function(a) {
    var b = 0, c = "", d = "", e = !1, f = !1, g = !1, h = "", k;
    var l = 0;
    for (k = a.length; l < k; l++) {
        var m = d;
        " " != d && "\t" != d && "\n" != d && (c = d);
        d = a[l];
        var n = l + 1 < k ? a[l + 1] : "\x00";
        if (e) {
            if ("\n" == d && (e = !1,
            0 == b))
                break
        } else if (f)
            "/" == d && "\\" != m && (f = !1);
        else if (g)
            d == h && "\\" != m && (g = !1,
            h = "");
        else if ("/" == d)
            "/" == n ? e = !0 : "*" == n || !c || "=" != c && "(" != c || (f = !0);
        else if ('"' == d || "'" == d)
            g = !0,
            h = d;
        else if (";" == d && 0 == b)
            break;
        else
            "{" == d ? b++ : "}" == d && b--
    }
    return [a.slice(0, l + 1), a.slice(l + 1)]
}
;
mpl$lab$util$Terminal.stdRegex = function(a) {
    a.addRegex("methodsOf|propertiesOf|prettyPrint", "Util.", !1);
    a.addRegex("println|z", "terminal.", !1);
    a.addRegex("result", "terminal.", !0);
    a.addRegex("AffineTransform|CircularList|Clock|ClockTask|DoubleRect|EasyScriptParser|GenericEvent|GenericMemo|GenericObserver|MutableVector|ParameterBoolean|ParameterNumber|ParameterString|RandomLCG|Terminal|Timer|Util|Vector", "mpl$$lab$$util$$", !1);
    a.addRegex("NF0|NF2|NF1S|NF3|NF5|NF5E|nf5|nf7|NF7|NF7E|NF9|NFE|NFSCI", "Util.", !1);
    a.addRegex("CollisionAdvance|ConcreteVariable|ConcreteLine|ConstantForceLaw|CoordType|DampingLaw|EulersMethod|ExpressionVariable|Force|FunctionVariable|GravityLaw|Gravity2Law|MassObject|ModifiedEuler|NumericalPath|PointMass|RungeKutta|ShapeType|SimList|SimpleAdvance|Spring|VarsList", "mpl$$lab$$model$$", !1);
    a.addRegex("CoordMap|DisplayClock|DisplayConnector|DisplayLine|DisplayList|DisplayPath|DisplayShape|DisplayRope|DisplaySpring|DisplayText|DrawingMode|DrawingStyle|EnergyBarGraph|HorizAlign|LabCanvas|LabView|ScreenRect|SimView|VerticalAlign", "mpl$$lab$$view$$", !1);
    a.addRegex("CircularEdge|CollisionHandling|ContactSim|EdgeRange|ExtraAccel|ImpulseSim|Joint|Polygon|RigidBodyCollision|RigidBodySim|Rope|Scrim|Shapes|StraightEdge|ThrusterSet|Vertex|Walls", "mpl$$lab$$engine2D$$", !1);
    a.addRegex("AutoScale|DisplayGraph|GraphColor|GraphLine|GraphStyle|DisplayAxes|VarsHistory", "mpl$$lab$$graph$$", !1);
    a.addRegex("EventHandler|MouseTracker|RigidBodyEventHandler|SimController|SimRunner|ViewPanner", "mpl$$lab$$app$$", !1);
    a.addRegex("ButtonControl|CheckBoxControl|ChoiceControl|NumericControl|SliderControl|ToggleControl", "mpl$$lab$$controls$$", !1)
}
;
mpl$lab$util$Terminal.prototype.vars = function() {
    var a = this.vars_.split("|");
    goog.array.sort(a);
    return a
}
;
mpl$lab$util$Terminal.vetBrackets = function(a) {
    var b = /^\w\s*\[\s*\d*\s*\]$/
      , c = a.match(/\w\s*\[[^\]]*?\]/g);
    if (null != c)
        for (var d = 0, e = c.length; d < e; d++)
            if (!b.test(c[d]))
                throw Error("prohibited usage of square brackets in script: " + a);
}
;
mpl$lab$util$Terminal.vetCommand = function(a, b, c) {
    for (var d in window)
        if (mpl$lab$util$Terminal.badCommand(a, d, b))
            throw Error('prohibited name: "' + d + '" found in script: ' + a);
    if (/\b(myEval|Function|with|__proto__|call|apply|caller|callee|arguments|addWhiteList|vetCommand|badCommand|whiteList_|addRegex|addRegex2|regexs_|afterEvalFn_|setAfterEval|parentNode|parentElement|innerHTML|outerHTML|offsetParent|insertAdjacentHTML|appendChild|insertBefore|replaceChild|removeChild|ownerDocument|insertBefore|setParser|parser_|defineNames|globalEval|window|defineProperty|defineProperties|__defineGetter__|__defineSetter__)\b/g.test(a) || c && c.test(a))
        throw Error("prohibited name in script: " + a);
}
;
mpl$lab$util$Terminal.en = {
    REMEMBER: "remember",
    FORGET: "forget"
};
mpl$lab$util$Terminal.de_strings = {
    REMEMBER: "erinnern",
    FORGET: "vergessen"
};
mpl$lab$util$Terminal.i18n = "de" === goog.LOCALE ? mpl$lab$util$Terminal.de_strings : mpl$lab$util$Terminal.en;
var mpl$lab$util$EasyScriptParser = function(a, b) {
    mpl$lab$util$EasyScriptParser.checkUniqueNames(a);
    this.subjects_ = a;
    this.dependent_ = goog.isArray(b) ? b : [];
    goog.array.removeAllIf(this.subjects_, function(a) {
        return goog.array.contains(this.dependent_, a)
    }, this);
    this.subjects_ = goog.array.concat(this.subjects_, this.dependent_);
    this.initialNonDependent_ = [];
    this.initialDependent_ = [];
    this.allSubjParamNames_ = [];
    this.allParamNames_ = [];
    this.allSubjects_ = [];
    this.unique_ = [];
    this.commandNames_ = [];
    this.commandFns_ = [];
    this.commandHelp_ = [];
    this.addCommand("url", goog.bind(function() {
        return this.scriptURL()
    }, this), "prints URL with script to recreate current state");
    this.addCommand("script", goog.bind(function() {
        return this.script()
    }, this), "prints script to recreate current state");
    this.addCommand("values", goog.bind(function() {
        return mpl$lab$util$Util.prettyPrint(this.values())
    }, this), "shows available parameters and their current values");
    this.addCommand("names", goog.bind(function() {
        return mpl$lab$util$Util.prettyPrint(this.names().join(";"))
    }, this), "shows available parameter names");
    this.addCommand("help", goog.bind(function() {
        return this.help()
    }, this), "prints this help text");
    this.update()
};
mpl$lab$util$EasyScriptParser.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", subjects_: [" + goog.array.map(this.subjects_, function(a) {
        return a.toStringShort()
    }) + "]}"
}
;
mpl$lab$util$EasyScriptParser.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "EasyScriptParser{subjects_.length: " + this.subjects_.length + "}"
}
;
mpl$lab$util$EasyScriptParser.prototype.addCommand = function(a, b, c) {
    this.commandNames_.push(a);
    this.commandFns_.push(b);
    this.commandHelp_.push(c)
}
;
mpl$lab$util$EasyScriptParser.checkUniqueNames = function(a) {
    var b = [];
    goog.array.forEach(a, function(a) {
        a = a.getName();
        if (goog.array.contains(b, a))
            throw Error("duplicate Subject name: " + a);
        b.push(a)
    })
}
;
mpl$lab$util$EasyScriptParser.prototype.getParameter = function(a) {
    a = mpl$lab$util$Util.toName(a);
    var b = a.split(".");
    if (1 == b.length) {
        var c = "";
        var d = b[0]
    } else if (2 == b.length)
        c = b[0],
        d = b[1];
    else
        return null;
    if ("" == c) {
        if (1 < goog.array.count(this.allParamNames_, function(a) {
            return a == d
        }))
            throw Error("multiple Subjects have Parameter " + d);
        a = goog.array.indexOf(this.allParamNames_, d)
    } else
        a = goog.array.indexOf(this.allSubjParamNames_, a);
    return -1 < a ? this.allSubjects_[a].getParameter(d) : null
}
;
mpl$lab$util$EasyScriptParser.prototype.getSubject = function(a) {
    var b = mpl$lab$util$Util.toName(a);
    return goog.array.find(this.subjects_, function(a) {
        return a.getName() == b
    })
}
;
mpl$lab$util$EasyScriptParser.prototype.getSubjects = function() {
    return goog.array.clone(this.subjects_)
}
;
mpl$lab$util$EasyScriptParser.prototype.help = function() {
    var a = "myPhysicsLab version " + mpl$lab$util$Util.VERSION + ", ";
    a += (mpl$lab$util$Util.ADVANCED ? "advanced" : "simple") + "-compiled on ";
    a += mpl$lab$util$Util.COMPILE_TIME + ".\n";
    a += 'Use the "values" command to see what can be set and the syntax.\n\ncommand-K            clear Terminal window\narrow up/down        retrieve previous or next command\n';
    mpl$lab$util$Util.ADVANCED || (a += "propertiesOf(app)    shows properties of that object\nmethodsOf(app)       shows methods defined on that object\nprettyPrint(app)     prints the object nicely\nprettyPrint(app, 3)  prints the object even nicer\nprintln(1+2)         prints to the Terminal window\nresult               the result of the previous command\n");
    for (var b = 0, c = this.commandNames_.length; b < c; b++) {
        for (var d = this.commandNames_[b]; 20 > d.length; )
            d += " ";
        a += d + " " + this.commandHelp_[b] + "\n"
    }
    return a
}
;
mpl$lab$util$EasyScriptParser.prototype.names = function() {
    return goog.array.clone(this.allSubjParamNames_)
}
;
mpl$lab$util$EasyScriptParser.prototype.namesAndValues = function(a, b, c) {
    a = 1 == a;
    var d = goog.array.map(this.allSubjects_, function(a, b) {
        return a.getParameter(this.allParamNames_[b])
    }, this)
      , e = d;
    b || (e = goog.array.filter(e, function(a) {
        return !a.isComputed()
    }));
    e = goog.array.filter(e, function(b) {
        return goog.array.contains(this.dependent_, b.getSubject()) == a
    }, this);
    var f = /^[a-zA-Z0-9_]+$/;
    b = goog.array.map(e, function(a) {
        var b = mpl$lab$util$Util.toName(a.getName())
          , e = goog.array.indexOf(d, a)
          , g = a.getValue();
        goog.isString(g) && !f.test(g) && (g = '"' + g + '"');
        return !c && this.unique_[e] ? b + "=" + g : mpl$lab$util$Util.toName(a.getSubject().getName()) + "." + b + "=" + g
    }, this);
    return 0 < b.length ? b.join(";") + ";" : ""
}
;
mpl$lab$util$EasyScriptParser.prototype.parse = function(a) {
    ";" == a.slice(-1) && (a = a.slice(0, a.length - 1));
    for (var b = 0, c = this.commandNames_.length; b < c; b++)
        if (a.toLowerCase() == this.commandNames_[b])
            return this.commandFns_[b]();
    a = a.split("=");
    b = mpl$lab$util$Util.toName(a[0].trim());
    c = this.getParameter(b);
    if (!(null == c || 2 < a.length)) {
        if (2 == a.length)
            try {
                var d = mpl$lab$util$EasyScriptParser.unquote(a[1].trim());
                c.setFromString(d)
            } catch (e) {
                throw e.message += '\nwhile setting value "' + d + '" on parameter ' + b,
                e;
            }
        return c.getValue()
    }
}
;
mpl$lab$util$EasyScriptParser.prototype.saveStart = function() {
    this.initialNonDependent_ = this.namesAndValues(!1).split(";");
    this.initialDependent_ = this.namesAndValues(!0).split(";")
}
;
mpl$lab$util$EasyScriptParser.prototype.script = function() {
    var a = this.namesAndValues(!1).split(";");
    a = goog.array.concat(a, this.namesAndValues(!0).split(";"));
    var b = goog.array.concat(this.initialNonDependent_, this.initialDependent_);
    goog.array.removeAllIf(a, function(a) {
        return goog.array.contains(b, a)
    });
    return a.join(";") + (0 < a.length ? ";" : "")
}
;
mpl$lab$util$EasyScriptParser.prototype.scriptURL = function() {
    return window.location.href.replace(/\.html\?.*$/, ".html") + "?" + mpl$lab$util$Terminal.encodeURIComponent(this.script())
}
;
mpl$lab$util$EasyScriptParser.unquote = function(a) {
    if (2 > a.length)
        return a;
    var b = a.charAt(0)
      , c = a.charAt(a.length - 1);
    if (b == c && ('"' == b || "'" == b)) {
        b = "";
        c = 1;
        for (var d = a.length - 1; c < d; c++) {
            var e = a[c];
            if ("\\" == e)
                if (c++,
                c < d)
                    switch (e = a[c],
                    e) {
                    case "0":
                        b += "\x00";
                        break;
                    case "b":
                        b += "\b";
                        break;
                    case "t":
                        b += "\t";
                        break;
                    case "n":
                        b += "\n";
                        break;
                    case "v":
                        b += "\v";
                        break;
                    case "f":
                        b += "\f";
                        break;
                    case "r":
                        b += "\r";
                        break;
                    case '"':
                        b += '"';
                        break;
                    case "'":
                        b += "'";
                        break;
                    case "\\":
                        b += "\\";
                        break;
                    default:
                        b += "\\" + e
                    }
                else
                    b += e;
            else
                b += e
        }
        return b
    }
    return a
}
;
mpl$lab$util$EasyScriptParser.prototype.update = function() {
    var a = goog.array.reduce(this.subjects_, function(a, c) {
        c = goog.array.filter(c.getParameters(), function(a) {
            return "DELETED" != a.getName()
        });
        return a.concat(c)
    }, []);
    this.allSubjects_ = goog.array.map(a, function(a) {
        return a.getSubject()
    });
    this.allParamNames_ = goog.array.map(a, function(a) {
        return mpl$lab$util$Util.toName(a.getName())
    });
    this.allSubjParamNames_ = goog.array.map(a, function(a) {
        return mpl$lab$util$Util.toName(a.getSubject().getName() + "." + a.getName())
    });
    this.unique_ = goog.array.map(this.allParamNames_, function(a) {
        return 1 == goog.array.count(this.allParamNames_, function(b) {
            return b == a
        })
    }, this);
    this.initialDependent_ = this.namesAndValues(!0).split(";")
}
;
mpl$lab$util$EasyScriptParser.prototype.values = function() {
    return this.namesAndValues(!1, !0, !0) + this.namesAndValues(!0, !0, !0)
}
;

mpl$lab$util$EasyScriptParser.de_strings = {
    URL_SCRIPT: "mitteilen",
    PROMPT_URL: "Dr\u00fccken Sie command-C um diesen URL in die Zwischenablage zu kopieren, dies beinhaltet die eingegebenen Parameter.",
    WARN_URL_2048: "Achtung: URL is l\u00e4nger als 2048 Zeichen."
};
mpl$lab$util$EasyScriptParser.i18n = "de" === goog.LOCALE ? mpl$lab$util$EasyScriptParser.de_strings : mpl$lab$util$EasyScriptParser.en;
var mpl$lab$model$EnergyInfo = function(a, b, c, d, e) {
    this.potential_ = a || 0;
    this.translational_ = b || 0;
    this.rotational_ = void 0 === c ? mpl$lab$util$Util.NaN : c;
    this.workDone_ = void 0 === d ? mpl$lab$util$Util.NaN : d;
    this.initialEnergy_ = void 0 === e ? mpl$lab$util$Util.NaN : e
};
mpl$lab$model$EnergyInfo.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "EnergyInfo{potential_: " + mpl$lab$util$Util.NF(this.potential_) + ", translational_: " + mpl$lab$util$Util.NF(this.translational_) + ", rotational_: " + mpl$lab$util$Util.NF(this.rotational_) + ", workDone_: " + mpl$lab$util$Util.NF(this.workDone_) + ", initialEnergy_: " + mpl$lab$util$Util.NF(this.initialEnergy_) + "}"
}
;
mpl$lab$model$EnergyInfo.prototype.getInitialEnergy = function() {
    return this.initialEnergy_
}
;
mpl$lab$model$EnergyInfo.prototype.getPotential = function() {
    return this.potential_
}
;
mpl$lab$model$EnergyInfo.prototype.getRotational = function() {
    return this.rotational_
}
;
mpl$lab$model$EnergyInfo.prototype.getTotalEnergy = function() {
    var a = this.potential_ + this.translational_;
    isNaN(this.rotational_) || (a += this.rotational_);
    return a
}
;
mpl$lab$model$EnergyInfo.prototype.getTranslational = function() {
    return this.translational_
}
;
mpl$lab$model$EnergyInfo.prototype.getWorkDone = function() {
    return this.workDone_
}
;
mpl$lab$model$EnergyInfo.prototype.setInitialEnergy = function(a) {
    this.initialEnergy_ = a
}
;
mpl$lab$model$EnergyInfo.prototype.setPotential = function(a) {
    this.potential_ = a
}
;
mpl$lab$model$EnergyInfo.prototype.setRotational = function(a) {
    this.rotational_ = a
}
;
mpl$lab$model$EnergyInfo.prototype.setTranslational = function(a) {
    this.translational_ = a
}
;
mpl$lab$model$EnergyInfo.prototype.setWorkDone = function(a) {
    this.workDone_ = a
}
;
var mpl$lab$model$EnergySystem = function(a) {};
mpl$lab$model$EnergySystem.prototype.getEnergyInfo = function() {}
;
mpl$lab$model$EnergySystem.prototype.setPotentialEnergy = function(a) {}
;
mpl$lab$model$EnergySystem.en = {
    POTENTIAL_ENERGY: "potential energy",
    TRANSLATIONAL_ENERGY: "translational energy",
    KINETIC_ENERGY: "kinetic energy",
    ROTATIONAL_ENERGY: "rotational energy",
    TOTAL: "total",
    TOTAL_ENERGY: "total energy"
};
mpl$lab$model$EnergySystem.de_strings = {
    POTENTIAL_ENERGY: "potenzielle Energie",
    TRANSLATIONAL_ENERGY: "Translationsenergie",
    KINETIC_ENERGY: "kinetische Energie",
    ROTATIONAL_ENERGY: "Rotationsenergie",
    TOTAL: "gesamt",
    TOTAL_ENERGY: "gesamte Energie"
};
mpl$lab$model$EnergySystem.i18n = "de" === goog.LOCALE ? mpl$lab$model$EnergySystem.de_strings : mpl$lab$model$EnergySystem.en;
var mpl$lab$graph$EnergyBarGraph = function(a) {
    this.graphFont = "10pt sans-serif";
    this.system_ = a;
    this.rect_ = mpl$lab$util$DoubleRect.EMPTY_RECT;
    this.fontDescent_ = 8;
    this.fontAscent_ = 12;
    this.rightEdge_ = this.leftEdge_ = this.graphOrigin_ = 0;
    this.graphFactor_ = 10;
    this.graphDelta_ = 2;
    this.drawBackground_ = this.needRescale_ = !0;
    this.potentialColor = "#666";
    this.translationColor = "#999";
    this.rotationColor = "#ccc";
    this.lastTime_ = mpl$lab$util$Util.systemTime();
    this.lastEnergyDisplay_ = this.totalEnergyDisplay_ = this.lastTime2_ = 0;
    this.totalDigits_ = 1;
    this.totalEnergyPeriod_ = .3;
    this.lastTotalEnergyTime_ = mpl$lab$util$Util.NEGATIVE_INFINITY;
    this.totalEnergy_ = this.maxEnergy_ = this.minEnergy_ = this.megaMaxEnergy_ = this.megaMinEnergy_ = 0;
    this.BUFFER_ = 12;
    this.history_ = Array(this.BUFFER_);
    this.bufptr_ = 0;
    this.dragable_ = !0;
    this.visibleRect_ = mpl$lab$util$DoubleRect.EMPTY_RECT;
    this.needResize_ = !0;
    this.zIndex = 0;
    this.debug_ = !1
};
mpl$lab$graph$EnergyBarGraph.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", visibleRect: " + this.visibleRect_ + ", rect: " + this.rect_ + ", needRescale: " + this.needRescale_ + ", leftEdge: " + mpl$lab$util$Util.NF(this.leftEdge_) + ", rightEdge: " + mpl$lab$util$Util.NF(this.rightEdge_) + ", graphOrigin: " + mpl$lab$util$Util.NF(this.graphOrigin_) + ", graphFactor: " + mpl$lab$util$Util.NF(this.graphFactor_) + ", minHistory: " + mpl$lab$util$Util.NF(this.minHistory()) + ", minEnergy: " + mpl$lab$util$Util.NF(this.minEnergy_) + ", megaMinEnergy: " + mpl$lab$util$Util.NF(this.megaMinEnergy_) + ", megaMinEnergyLoc: " + Math.floor(this.graphOrigin_ + .5 + this.graphFactor_ * this.megaMinEnergy_) + ", maxEnergy: " + mpl$lab$util$Util.NF(this.maxEnergy_) + ", megaMaxEnergy: " + mpl$lab$util$Util.NF(this.megaMaxEnergy_) + ", totalEnergy: " + mpl$lab$util$Util.NF(this.totalEnergy_) + ", time: " + mpl$lab$util$Util.NF(mpl$lab$util$Util.systemTime() - this.lastTime_) + ", zIndex: " + this.zIndex + "}"
}
;
mpl$lab$graph$EnergyBarGraph.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "EnergyBarGraph{system: " + this.system_.toStringShort() + "}"
}
;
mpl$lab$graph$EnergyBarGraph.prototype.contains = function(a) {
    return this.rect_.contains(a)
}
;
mpl$lab$graph$EnergyBarGraph.prototype.draw = function(a, b) {
    if (!this.visibleRect_.isEmpty()) {
        a.save();
        a.font = this.graphFont;
        a.textAlign = "start";
        a.textBaseline = "alphabetic";
        var c = this.system_.getEnergyInfo()
          , d = c.getTranslational()
          , e = c.getPotential()
          , f = c.getRotational()
          , g = mpl$lab$graph$EnergyBarGraph.i18n.TRANSLATIONAL_ENERGY + ",";
        isNaN(f) && (g = mpl$lab$graph$EnergyBarGraph.i18n.KINETIC_ENERGY + ",");
        var h = mpl$lab$graph$EnergyBarGraph.TOP_MARGIN + 3 * mpl$lab$graph$EnergyBarGraph.HEIGHT + this.fontAscent_ + 8 + this.fontDescent_
          , k = b.screenToSimScaleY(h);
        if (this.needResize_ || this.rect_.isEmpty() || mpl$lab$util$Util.veryDifferent(k, this.rect_.getHeight()))
            this.debug_ && mpl$lab$util$Util.DEBUG && console.log("h2 = " + k + " this.rect_.getHeight=" + this.rect_.getHeight()),
            this.resizeRect(k);
        this.debug_ && mpl$lab$util$Util.DEBUG && (k = b.simToScreenRect(this.rect_),
        a.fillStyle = "rgba(255,255,0,0.5)",
        a.fillRect(k.getLeft(), k.getTop(), k.getWidth(), k.getHeight()));
        this.leftEdge_ = b.simToScreenX(this.rect_.getLeft()) + mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN;
        this.rightEdge_ = b.simToScreenX(this.rect_.getRight()) - mpl$lab$graph$EnergyBarGraph.RIGHT_MARGIN;
        k = this.rightEdge_ - this.leftEdge_;
        b = b.simToScreenY(this.rect_.getTop());
        this.drawBackground_ && (a.fillStyle = "rgba(255,255,255,0.75)",
        a.fillRect(this.leftEdge_ - mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN, b + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, k + mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN + mpl$lab$graph$EnergyBarGraph.RIGHT_MARGIN, h));
        this.debug_ && mpl$lab$util$Util.DEBUG && (a.strokeStyle = "#90c",
        a.strokeRect(this.leftEdge_ - mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN, b + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, k + mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN + mpl$lab$graph$EnergyBarGraph.RIGHT_MARGIN, h));
        this.totalEnergy_ = d + e + (isNaN(f) ? 0 : f);
        goog.asserts.assert(1E-12 > Math.abs(this.totalEnergy_ - c.getTotalEnergy()));
        this.minEnergy_ = 0 > e ? e : 0;
        this.maxEnergy_ = 0 < this.totalEnergy_ ? this.totalEnergy_ : 0;
        mpl$lab$util$Util.systemTime() - this.lastTotalEnergyTime_ > this.totalEnergyPeriod_ && (this.lastTotalEnergyTime_ = mpl$lab$util$Util.systemTime(),
        this.lastEnergyDisplay_ = this.totalEnergyDisplay_,
        this.totalEnergyDisplay_ = c.getTotalEnergy());
        this.rescale(k);
        c = this.graphOrigin_;
        a.fillStyle = this.potentialColor;
        0 > e ? (e = Math.floor(.5 - e * this.graphFactor_),
        a.fillRect(c - e, b + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, e, mpl$lab$graph$EnergyBarGraph.HEIGHT),
        c -= e) : (e = Math.floor(.5 + e * this.graphFactor_),
        a.fillRect(c, b + mpl$lab$graph$EnergyBarGraph.HEIGHT + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, e, mpl$lab$graph$EnergyBarGraph.HEIGHT),
        c += e);
        isNaN(f) || (e = Math.floor(.5 + f * this.graphFactor_),
        a.fillStyle = this.rotationColor,
        a.fillRect(c, b + mpl$lab$graph$EnergyBarGraph.HEIGHT + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, e, mpl$lab$graph$EnergyBarGraph.HEIGHT),
        c += e);
        e = Math.floor(.5 + d * this.graphFactor_);
        d = this.graphOrigin_ + Math.floor(.5 + this.totalEnergy_ * this.graphFactor_);
        goog.asserts.assert(2 >= Math.abs(c + e - d));
        a.fillStyle = this.translationColor;
        a.fillRect(c, b + mpl$lab$graph$EnergyBarGraph.HEIGHT + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, d - c, mpl$lab$graph$EnergyBarGraph.HEIGHT);
        d = this.drawScale(a, this.leftEdge_, b + mpl$lab$graph$EnergyBarGraph.HEIGHT + mpl$lab$graph$EnergyBarGraph.TOP_MARGIN, (this.rightEdge_ - this.graphOrigin_) / this.graphFactor_);
        e = this.leftEdge_;
        e = this.drawLegend(a, mpl$lab$graph$EnergyBarGraph.i18n.POTENTIAL_ENERGY + ",", this.potentialColor, !0, e, d);
        isNaN(f) || (e = this.drawLegend(a, mpl$lab$graph$EnergyBarGraph.i18n.ROTATIONAL_ENERGY + ",", this.rotationColor, !0, e, d));
        e = this.drawLegend(a, g, this.translationColor, !0, e, d);
        this.drawTotalEnergy(a, e, d);
        a.restore()
    }
}
;
mpl$lab$graph$EnergyBarGraph.prototype.drawLegend = function(a, b, c, d, e, f) {
    d ? (a.fillStyle = c,
    a.fillRect(e, f, 10, 10)) : (a.strokeStyle = c,
    a.strokeRect(e, f, 10, 10));
    e += 13;
    c = a.measureText(b).width;
    a.fillStyle = "#000";
    a.fillText(b, e, f + this.fontAscent_);
    return e + (c + 5)
}
;
mpl$lab$graph$EnergyBarGraph.prototype.drawScale = function(a, b, c, d) {
    var e = this.fontAscent_;
    if (1E-18 < Math.abs(d) && 1E-18 < this.graphDelta_) {
        a.fillStyle = "#000";
        a.strokeStyle = "#000";
        var f = 0
          , g = 0;
        do {
            var h = this.graphOrigin_ + Math.floor(f * this.graphFactor_);
            a.beginPath();
            a.moveTo(h, c + mpl$lab$graph$EnergyBarGraph.HEIGHT / 2);
            a.lineTo(h, c + mpl$lab$graph$EnergyBarGraph.HEIGHT + 2);
            a.stroke();
            var k = mpl$lab$graph$EnergyBarGraph.numberFormat1(f)
              , l = a.measureText(k).width;
            a.fillText(k, h - l / 2, c + mpl$lab$graph$EnergyBarGraph.HEIGHT + e + 3);
            f += this.graphDelta_;
            this.debug_ && mpl$lab$util$Util.DEBUG && 100 < ++g && console.log("loop 1 x=" + h + " s=" + k + " scale=" + mpl$lab$util$Util.NFE(f) + " total=" + mpl$lab$util$Util.NFE(d) + " graphDelta=" + mpl$lab$util$Util.NFE(this.graphDelta_))
        } while (f < d + this.graphDelta_ + 1E-16);this.debug_ && mpl$lab$util$Util.DEBUG && console.log("megaMinEnergy=" + mpl$lab$util$Util.NFE(this.megaMinEnergy_) + " graphDelta=" + mpl$lab$util$Util.NFE(this.graphDelta_) + " graphFactor=" + mpl$lab$util$Util.NFE(this.graphFactor_) + " scale=" + mpl$lab$util$Util.NFE(f));
        if (-1E-12 > this.megaMinEnergy_) {
            f = -this.graphDelta_;
            do
                h = this.graphOrigin_ + Math.floor(f * this.graphFactor_),
                a.beginPath(),
                a.moveTo(h, c + mpl$lab$graph$EnergyBarGraph.HEIGHT / 2),
                a.lineTo(h, c + mpl$lab$graph$EnergyBarGraph.HEIGHT + 2),
                a.stroke(),
                k = mpl$lab$graph$EnergyBarGraph.numberFormat1(f),
                l = a.measureText(k).width,
                a.fillText(k, h - l / 2, c + mpl$lab$graph$EnergyBarGraph.HEIGHT + e + 3),
                f -= this.graphDelta_,
                this.debug_ && mpl$lab$util$Util.DEBUG && console.log("loop 2 x=" + h + " s=" + k + " scale=" + mpl$lab$util$Util.NFE(f) + " megaMinEnergy=" + mpl$lab$util$Util.NFE(this.megaMinEnergy_));
            while (f > this.megaMinEnergy_ && h >= b)
        }
    }
    return c + mpl$lab$graph$EnergyBarGraph.HEIGHT + e + 3 + this.fontDescent_
}
;
mpl$lab$graph$EnergyBarGraph.prototype.drawTotalEnergy = function(a, b, c) {
    var d = mpl$lab$graph$EnergyBarGraph.i18n.TOTAL + " " + this.formatTotalEnergy(this.totalEnergyDisplay_, this.lastEnergyDisplay_);
    a.fillStyle = "#000";
    a.fillText(d, b, c + this.fontAscent_);
    return b + a.measureText(d).width + 5
}
;
mpl$lab$graph$EnergyBarGraph.prototype.formatTotalEnergy = function(a, b) {
    b = Math.abs(a - b);
    1E-15 < b && (b = -Math.floor(Math.log(b) / Math.log(10)),
    b = 0 < b ? b : 1,
    this.totalDigits_ = 20 > b ? b : 20);
    b = Math.abs(a);
    a = 0 > a ? "-" : "+";
    return 1E-6 > b ? a + b.toExponential(5) : a + b.toFixed(this.totalDigits_)
}
;
mpl$lab$graph$EnergyBarGraph.prototype.getSimObjects = function() {
    return []
}
;
mpl$lab$graph$EnergyBarGraph.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$graph$EnergyBarGraph.prototype.getPosition = function() {
    return this.rect_.isEmpty() ? new mpl$lab$util$Vector(0,0) : this.rect_.getCenter()
}
;
mpl$lab$graph$EnergyBarGraph.prototype.getVisibleArea = function() {
    return this.visibleRect_
}
;
mpl$lab$graph$EnergyBarGraph.prototype.getZIndex = function() {
    return this.zIndex
}
;
mpl$lab$graph$EnergyBarGraph.prototype.isDragable = function() {
    return this.dragable_
}
;
mpl$lab$graph$EnergyBarGraph.prototype.minHistory = function() {
    for (var a = 0, b = 0, c = this.history_.length; b < c; b++)
        this.history_[b] < a && (a = this.history_[b]);
    return a
}
;
mpl$lab$graph$EnergyBarGraph.numberFormat1 = function(a) {
    var b = Math.abs(a);
    1E-16 > b ? b = "0" : .001 > b ? (b = b.toExponential(3),
    b = b.replace(/\.0+([eE])/, "$1"),
    b = b.replace(/(\.\d*[1-9])0+([eE])/, "$1$2")) : 10 > b ? (b = b.toFixed(4),
    b = b.replace(/\.0+$/, ""),
    b = b.replace(/(\.\d*[1-9])0+$/, "$1")) : 100 > b ? (b = b.toFixed(3),
    b = b.replace(/\.0+$/, ""),
    b = b.replace(/(\.\d*[1-9])0+$/, "$1")) : 1E3 > b ? (b = b.toFixed(2),
    b = b.replace(/\.0+$/, ""),
    b = b.replace(/(\.[1-9])0$/, "$1")) : 1E4 > b ? b = b.toFixed(0) : (b = b.toExponential(3),
    b = b.replace(/\.0+([eE])/, "$1"),
    b = b.replace(/(\.\d*[1-9])0+([eE])/, "$1$2"));
    return 0 > a ? "-" + b : b
}
;
mpl$lab$graph$EnergyBarGraph.prototype.printEverything = function(a) {
    mpl$lab$util$Util.DEBUG && this.debug_ && console.log(a + this)
}
;
mpl$lab$graph$EnergyBarGraph.prototype.rescale = function(a) {
    var b = this.timeCheck(this.minEnergy_);
    mpl$lab$util$Util.DEBUG && this.printEverything("(status)");
    this.megaMinEnergy_ = this.minHistory();
    goog.asserts.assert(isFinite(this.megaMinEnergy_));
    -1E-6 > this.megaMinEnergy_ ? (this.graphOrigin_ + Math.floor(.5 + this.megaMinEnergy_ * this.graphFactor_) < this.leftEdge_ - mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN && (mpl$lab$util$Util.DEBUG && this.printEverything("BIG MIN ENERGY"),
    this.needRescale_ = !0),
    b && -this.megaMinEnergy_ * this.graphFactor_ < .2 * (this.graphOrigin_ - this.leftEdge_) && (mpl$lab$util$Util.DEBUG && this.printEverything("SMALL MIN ENERGY"),
    this.needRescale_ = !0)) : 1E-6 < this.megaMinEnergy_ ? this.graphOrigin_ > this.leftEdge_ && (mpl$lab$util$Util.DEBUG && this.printEverything("POSITIVE MIN ENERGY"),
    this.needRescale_ = !0) : b && this.graphOrigin_ - this.leftEdge_ > mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN && (this.needRescale_ = !0);
    this.totalEnergy_ > this.megaMaxEnergy_ && (this.megaMaxEnergy_ = this.totalEnergy_);
    1E-12 < this.totalEnergy_ ? (this.graphOrigin_ + this.totalEnergy_ * this.graphFactor_ > this.rightEdge_ && (this.needRescale_ = !0,
    mpl$lab$util$Util.DEBUG && this.printEverything("BIG TOTAL ENERGY")),
    this.rightEdge_ - this.graphOrigin_ > .2 * (this.graphOrigin_ - this.leftEdge_) && this.totalEnergy_ * this.graphFactor_ < .2 * (this.rightEdge_ - this.graphOrigin_) && (this.needRescale_ = !0,
    this.megaMaxEnergy_ = this.totalEnergy_,
    mpl$lab$util$Util.DEBUG && this.printEverything("SMALL TOTAL ENERGY"))) : -1E-12 > this.totalEnergy_ && b && (0 > this.megaMaxEnergy_ && this.graphOrigin_ < this.rightEdge_ && (this.needRescale_ = !0,
    mpl$lab$util$Util.DEBUG && this.printEverything("NEGATIVE TOTAL ENERGY")),
    this.megaMaxEnergy_ = this.totalEnergy_);
    this.needRescale_ && (this.lastTime_ = mpl$lab$util$Util.systemTime(),
    this.needRescale_ = !1,
    b = 0 < this.totalEnergy_ ? this.totalEnergy_ : 0,
    b -= this.megaMinEnergy_,
    1E-16 > b && (b = 1),
    this.graphFactor_ = b * this.graphFactor_ > a ? .75 * a / b : .95 * a / b,
    goog.asserts.assert(isFinite(this.graphFactor_)),
    this.graphOrigin_ = -1E-12 > this.megaMinEnergy_ ? this.leftEdge_ + Math.floor(.5 + this.graphFactor_ * -this.megaMinEnergy_) : this.leftEdge_,
    a = Math.pow(10, Math.floor(Math.log(b) / Math.log(10))),
    b /= a,
    this.graphDelta_ = 8 <= b ? 2 : 5 <= b ? 1 : 3 <= b ? .5 : 2 <= b ? .4 : .2,
    this.graphDelta_ *= a)
}
;
mpl$lab$graph$EnergyBarGraph.prototype.resizeRect = function(a) {
    goog.asserts.assertObject(this.visibleRect_);
    var b = this.rect_.isEmpty() ? this.visibleRect_.getTop() : this.rect_.getTop()
      , c = b - a;
    b > this.visibleRect_.getTop() || a > this.visibleRect_.getHeight() ? (b = this.visibleRect_.getTop(),
    c = b - a) : c < this.visibleRect_.getBottom() && (c = this.visibleRect_.getBottom(),
    b = c + a);
    this.debug_ && mpl$lab$util$Util.DEBUG && console.log("resizeRect visibleRect=" + this.visibleRect_ + " rect=" + this.rect_ + " top=" + b + " bottom=" + c);
    this.rect_ = new mpl$lab$util$DoubleRect(this.visibleRect_.getLeft(),c,this.visibleRect_.getRight(),b);
    this.debug_ && mpl$lab$util$Util.DEBUG && console.log("resizeRect new rect=" + this.rect_);
    this.needRescale_ = !0;
    this.needResize_ = !1
}
;
mpl$lab$graph$EnergyBarGraph.prototype.setDragable = function(a) {
    this.dragable_ = a
}
;
mpl$lab$graph$EnergyBarGraph.prototype.setPosition = function(a) {
    if (this.rect_.isEmpty())
        this.rect_ = new mpl$lab$util$DoubleRect(-5,a.getY() - .5,5,a.getY() + .5);
    else {
        var b = this.rect_.getHeight() / 2;
        this.rect_ = new mpl$lab$util$DoubleRect(this.rect_.getLeft(),a.getY() - b,this.rect_.getRight(),a.getY() + b);
        this.debug_ && mpl$lab$util$Util.DEBUG && console.log("setPosition " + this.rect_)
    }
}
;
mpl$lab$graph$EnergyBarGraph.prototype.setVisibleArea = function(a) {
    this.visibleRect_ = a;
    this.needResize_ = !0
}
;
mpl$lab$graph$EnergyBarGraph.prototype.setZIndex = function(a) {
    this.zIndex = goog.isDef(a) ? a : 0
}
;
mpl$lab$graph$EnergyBarGraph.prototype.timeCheck = function(a) {
    var b = mpl$lab$util$Util.systemTime();
    1 < b - this.lastTime2_ ? (this.lastTime2_ = b,
    ++this.bufptr_ >= this.history_.length && (this.bufptr_ = 0),
    this.history_[this.bufptr_] = a) : this.minEnergy_ < this.history_[this.bufptr_] && (this.history_[this.bufptr_] = a);
    return b - this.lastTime_ > this.BUFFER_ ? (this.lastTime_ = b,
    !0) : !1
}
;
mpl$lab$graph$EnergyBarGraph.HEIGHT = 10;
mpl$lab$graph$EnergyBarGraph.LEFT_MARGIN = 10;
mpl$lab$graph$EnergyBarGraph.RIGHT_MARGIN = 0;
mpl$lab$graph$EnergyBarGraph.TOP_MARGIN = 0;
mpl$lab$graph$EnergyBarGraph.en = {
    SHOW_ENERGY: "show energy",
    POTENTIAL_ENERGY: "potential",
    TRANSLATIONAL_ENERGY: "translational",
    KINETIC_ENERGY: "kinetic",
    ROTATIONAL_ENERGY: "rotational",
    TOTAL: "total"
};
mpl$lab$graph$EnergyBarGraph.de_strings = {
    SHOW_ENERGY: "Energie anzeigen",
    POTENTIAL_ENERGY: "potenzielle",
    TRANSLATIONAL_ENERGY: "translation",
    KINETIC_ENERGY: "kinetische",
    ROTATIONAL_ENERGY: "rotation",
    TOTAL: "gesamt"
};
mpl$lab$graph$EnergyBarGraph.i18n = "de" === goog.LOCALE ? mpl$lab$graph$EnergyBarGraph.de_strings : mpl$lab$graph$EnergyBarGraph.en;
var mpl$lab$util$GenericObserver = function(a, b, c) {
    this.purpose_ = mpl$lab$util$Util.ADVANCED ? "" : c || "";
    this.subject_ = a;
    a.addObserver(this);
    this.observeFn_ = b
};
mpl$lab$util$GenericObserver.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort()
}
;
mpl$lab$util$GenericObserver.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "GenericObserver{subject_: " + this.subject_.toStringShort() + (0 < this.purpose_.length ? ', purpose_:"' + this.purpose_ + '"' : "") + "}"
}
;
mpl$lab$util$GenericObserver.prototype.disconnect = function() {
    this.subject_.removeObserver(this)
}
;
mpl$lab$util$GenericObserver.prototype.observe = function(a) {
    this.observeFn_(a)
}
;
var mpl$lab$controls$GroupControl = function(a, b, c) {
    this.name_ = a;
    this.topElement_ = b;
    this.controls_ = c
};
mpl$lab$controls$GroupControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", controls_: [" + goog.array.map(this.controls_, function(a) {
        return a.toStringShort()
    }) + "]}"
}
;
mpl$lab$controls$GroupControl.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'GroupControl{name_: "' + this.name_ + '", controls_.length: ' + this.controls_.length + "}"
}
;
mpl$lab$controls$GroupControl.prototype.disconnect = function() {
    goog.array.forEach(this.controls_, function(a) {
        a.disconnect()
    })
}
;
mpl$lab$controls$GroupControl.prototype.getControls = function() {
    return goog.array.clone(this.controls_)
}
;
mpl$lab$controls$GroupControl.prototype.getElement = function() {
    return this.topElement_
}
;
mpl$lab$controls$GroupControl.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$GroupControl.prototype.setEnabled = function(a) {
    goog.array.forEach(this.controls_, function(b) {
        b.setEnabled(a)
    })
}
;
var mpl$lab$view$LabCanvas = function(a, b) {
    mpl$lab$util$AbstractSubject.call(this, b);
    this.canvas_ = a;
    a.contentEditable = !1;
    this.labViews_ = [];
    this.memoList_ = new mpl$lab$util$ConcreteMemoList;
    this.focusView_ = null;
    this.alpha_ = 1;
    this.background_ = "";
    this.debug_ = !1;
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$LabCanvas.en.WIDTH,mpl$lab$view$LabCanvas.i18n.WIDTH,goog.bind(this.getWidth, this),goog.bind(this.setWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$LabCanvas.en.HEIGHT,mpl$lab$view$LabCanvas.i18n.HEIGHT,goog.bind(this.getHeight, this),goog.bind(this.setHeight, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$lab$view$LabCanvas.en.ALPHA,mpl$lab$view$LabCanvas.i18n.ALPHA,goog.bind(this.getAlpha, this),goog.bind(this.setAlpha, this)));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$view$LabCanvas.en.BACKGROUND,mpl$lab$view$LabCanvas.i18n.BACKGROUND,goog.bind(this.getBackground, this),goog.bind(this.setBackground, this)))
};
$jscomp.inherits(mpl$lab$view$LabCanvas, mpl$lab$util$AbstractSubject);
mpl$lab$view$LabCanvas.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", width: " + this.canvas_.width + ", height: " + this.canvas_.height + ', background_: "' + this.background_ + '", alpha_: ' + mpl$lab$util$Util.NF5(this.alpha_) + ", focusView_: " + (null == this.focusView_ ? "null" : this.focusView_.toStringShort()) + ", labViews_: [" + goog.array.map(this.labViews_, function(a) {
        return a.toStringShort()
    }) + "], memoList_: " + this.memoList_ + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$view$LabCanvas.prototype.getClassName = function() {
    return "LabCanvas"
}
;
mpl$lab$view$LabCanvas.prototype.addMemo = function(a) {
    this.memoList_.addMemo(a)
}
;
mpl$lab$view$LabCanvas.prototype.addView = function(a) {
    goog.asserts.assertObject(a);
    if (0 < this.getWidth() && 0 < this.getHeight()) {
        var b = new mpl$lab$view$ScreenRect(0,0,this.getWidth(),this.getHeight());
        a.setScreenRect(b)
    }
    this.labViews_.push(a);
    this.addMemo(a);
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.VIEW_ADDED,a));
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.VIEW_LIST_MODIFIED));
    null == this.focusView_ && this.setFocusView(a)
}
;
mpl$lab$view$LabCanvas.prototype.focus = function() {
    this.canvas_.focus()
}
;
mpl$lab$view$LabCanvas.prototype.getAlpha = function() {
    return this.alpha_
}
;
mpl$lab$view$LabCanvas.prototype.getBackground = function() {
    return this.background_
}
;
mpl$lab$view$LabCanvas.prototype.getCanvas = function() {
    return this.canvas_
}
;
mpl$lab$view$LabCanvas.prototype.getContext = function() {
    return this.canvas_.getContext("2d")
}
;
mpl$lab$view$LabCanvas.prototype.getFocusView = function() {
    return this.focusView_
}
;
mpl$lab$view$LabCanvas.prototype.getHeight = function() {
    return this.canvas_.height
}
;
mpl$lab$view$LabCanvas.prototype.getMemos = function() {
    return this.memoList_.getMemos()
}
;
mpl$lab$view$LabCanvas.prototype.getScreenRect = function() {
    return new mpl$lab$view$ScreenRect(0,0,this.canvas_.width,this.canvas_.height)
}
;
mpl$lab$view$LabCanvas.prototype.getViews = function() {
    return goog.array.clone(this.labViews_)
}
;
mpl$lab$view$LabCanvas.prototype.getWidth = function() {
    return this.canvas_.width
}
;
mpl$lab$view$LabCanvas.prototype.memorize = function() {
    this.memoList_.memorize()
}
;
mpl$lab$view$LabCanvas.prototype.notifySizeChanged = function() {
    var a = this.getScreenRect();
    goog.array.forEach(this.labViews_, function(b) {
        b.setScreenRect(a)
    });
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.SIZE_CHANGED))
}
;
mpl$lab$view$LabCanvas.prototype.paint = function() {
    if (null != this.canvas_.offsetParent) {
        var a = this.canvas_.getContext("2d");
        a.save();
        try {
            "" != this.background_ ? (a.globalAlpha = this.alpha_,
            a.fillStyle = this.background_,
            a.fillRect(0, 0, this.canvas_.width, this.canvas_.height),
            a.globalAlpha = 1) : a.clearRect(0, 0, this.canvas_.width, this.canvas_.height),
            goog.array.forEach(this.labViews_, function(b) {
                b.paint(a)
            })
        } finally {
            a.restore()
        }
    }
}
;
mpl$lab$view$LabCanvas.prototype.removeMemo = function(a) {
    this.memoList_.removeMemo(a)
}
;
mpl$lab$view$LabCanvas.prototype.removeView = function(a) {
    goog.asserts.assertObject(a);
    goog.array.remove(this.labViews_, a);
    this.removeMemo(a);
    this.focusView_ == a && this.setFocusView(goog.array.isEmpty(this.labViews_) ? null : this.labViews_[0]);
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.VIEW_REMOVED,a));
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.VIEW_LIST_MODIFIED))
}
;
mpl$lab$view$LabCanvas.prototype.setAlpha = function(a) {
    mpl$lab$util$Util.veryDifferent(this.alpha_, a) && (this.alpha_ = a,
    mpl$lab$util$Util.veryDifferent(a, 1) && "" == this.background_ && this.setBackground("white"),
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.ALPHA))
}
;
mpl$lab$view$LabCanvas.prototype.setBackground = function(a) {
    this.background_ != a && (this.background_ = a,
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.BACKGROUND))
}
;
mpl$lab$view$LabCanvas.prototype.setFocusView = function(a) {
    if (null != a && !goog.array.contains(this.labViews_, a))
        throw Error("cannot set focus to unknown view " + a);
    this.focusView_ != a && (null != this.focusView_ && this.focusView_.loseFocus(),
    this.focusView_ = a,
    null != a && a.gainFocus(),
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$view$LabCanvas.FOCUS_VIEW_CHANGED,a)))
}
;
mpl$lab$view$LabCanvas.prototype.setHeight = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.canvas_.height) && (this.canvas_.height = a);
    this.notifySizeChanged();
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.HEIGHT)
}
;
mpl$lab$view$LabCanvas.prototype.setScreenRect = function(a) {
    if (!mpl$lab$view$ScreenRect.isDuckType(a))
        throw Error("not a ScreenRect " + a);
    if (0 != a.getTop() || 0 != a.getLeft())
        throw Error("top left must be 0,0, was: " + a);
    this.setSize(a.getWidth(), a.getHeight())
}
;
mpl$lab$view$LabCanvas.prototype.setSize = function(a, b) {
    if (!goog.isNumber(a) || 0 >= a || !goog.isNumber(b) || 0 >= b)
        throw Error("bad size " + a + ", " + b);
    this.canvas_.width = a;
    this.canvas_.height = b;
    this.notifySizeChanged();
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.WIDTH);
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.HEIGHT)
}
;
mpl$lab$view$LabCanvas.prototype.setWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.canvas_.width) && (this.canvas_.width = a);
    this.notifySizeChanged();
    this.broadcastParameter(mpl$lab$view$LabCanvas.en.WIDTH)
}
;
mpl$lab$view$LabCanvas.FOCUS_VIEW_CHANGED = "FOCUS_VIEW_CHANGED";
mpl$lab$view$LabCanvas.SIZE_CHANGED = "SIZE_CHANGED";
mpl$lab$view$LabCanvas.VIEW_LIST_MODIFIED = "VIEW_LIST_MODIFIED";
mpl$lab$view$LabCanvas.VIEW_ADDED = "VIEW_ADDED";
mpl$lab$view$LabCanvas.VIEW_REMOVED = "VIEW_REMOVED";
mpl$lab$view$LabCanvas.en = {
    WIDTH: "width",
    HEIGHT: "height",
    ALPHA: "alpha",
    BACKGROUND: "background"
};
mpl$lab$view$LabCanvas.de_strings = {
    WIDTH: "Breite",
    HEIGHT: "H\u00f6he",
    ALPHA: "alpha",
    BACKGROUND: "Hintergrund"
};
mpl$lab$view$LabCanvas.i18n = "de" === goog.LOCALE ? mpl$lab$view$LabCanvas.de_strings : mpl$lab$view$LabCanvas.en;
var mpl$lab$model$AdvanceStrategy = function(a) {};
mpl$lab$model$AdvanceStrategy.prototype.advance = function(a, b) {}
;
mpl$lab$model$AdvanceStrategy.prototype.getTime = function() {}
;
mpl$lab$model$AdvanceStrategy.prototype.getTimeStep = function() {}
;
mpl$lab$model$AdvanceStrategy.prototype.reset = function() {}
;
mpl$lab$model$AdvanceStrategy.prototype.save = function() {}
;
mpl$lab$model$AdvanceStrategy.prototype.setTimeStep = function(a) {}
;
var mpl$lab$util$ErrorObserver = function(a) {};
mpl$lab$util$ErrorObserver.prototype.notifyError = function(a) {}
;
var mpl$lab$util$Timer = function(a) {
    this.legacy_ = a || !goog.isFunction(requestAnimationFrame);
    this.timeoutID_ = void 0;
    this.callBack_ = null;
    this.timerCallback_ = goog.bind(this.timerCallback, this);
    this.period_ = 0;
    this.firing_ = !1;
    this.fired_sys_ = mpl$lab$util$Util.NaN;
    this.delta_ = 0
};
mpl$lab$util$Timer.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "Timer{period_: " + this.period_ + ", firing_: " + this.firing_ + ", timeoutID_: " + this.timeoutID_ + ", fired_sys_: " + mpl$lab$util$Util.nf7(this.fired_sys_) + ", delta_: " + mpl$lab$util$Util.nf7(this.delta_) + "}"
}
;
mpl$lab$util$Timer.prototype.timerCallback = function() {
    if (null != this.callBack_) {
        var a = mpl$lab$util$Util.systemTime()
          , b = a - (this.fired_sys_ - this.delta_);
        b >= this.period_ && (this.callBack_(),
        this.fired_sys_ = a,
        this.delta_ = 0 < this.period_ ? b % this.period_ : 0);
        this.timeoutID_ = this.legacy_ ? setTimeout(this.timerCallback_, 0 < this.period_ ? Math.round(1E3 * this.period_) : 17) : requestAnimationFrame(this.timerCallback_)
    }
}
;
mpl$lab$util$Timer.prototype.getPeriod = function() {
    return this.period_
}
;
mpl$lab$util$Timer.prototype.isFiring = function() {
    return this.firing_
}
;
mpl$lab$util$Timer.prototype.setCallBack = function(a) {
    this.stopFiring();
    this.callBack_ = a
}
;
mpl$lab$util$Timer.prototype.setPeriod = function(a) {
    if (0 > a)
        throw Error();
    this.period_ = a
}
;
mpl$lab$util$Timer.prototype.startFiring = function() {
    this.firing_ || (this.firing_ = !0,
    this.delta_ = 0,
    this.fired_sys_ = mpl$lab$util$Util.systemTime() - this.period_ - 1E-7,
    this.timerCallback())
}
;
mpl$lab$util$Timer.prototype.stopFiring = function() {
    this.firing_ = !1;
    goog.isDef(this.timeoutID_) && (this.legacy_ ? clearTimeout(this.timeoutID_) : cancelAnimationFrame(this.timeoutID_),
    this.timeoutID_ = void 0);
    this.fired_sys_ = NaN;
    this.delta_ = 0
}
;
var mpl$lab$app$SimRunner = function(a, b) {
    mpl$lab$util$AbstractSubject.call(this, b || "SIM_RUNNER");
    this.appName_ = "";
    this.advanceList_ = [a];
    this.timeStep_ = a.getTimeStep();
    this.displayPeriod_ = 0;
    this.nonStop_ = !1;
    this.timer_ = new mpl$lab$util$Timer;
    this.timer_.setPeriod(this.displayPeriod_);
    this.timer_.setCallBack(goog.bind(this.callback, this));
    this.clock_ = new mpl$lab$util$Clock((b ? b + "_" : "") + "CLOCK");
    a = a.getTime();
    this.clock_.setTime(a);
    this.clock_.setRealTime(a);
    this.clock_.addObserver(this);
    this.canvasList_ = [];
    this.memoList_ = new mpl$lab$util$ConcreteMemoList;
    this.errorObservers_ = [];
    this.addParameter((new mpl$lab$util$ParameterNumber(this,mpl$lab$app$SimRunner.en.TIME_STEP,mpl$lab$app$SimRunner.i18n.TIME_STEP,goog.bind(this.getTimeStep, this),goog.bind(this.setTimeStep, this))).setSignifDigits(3));
    this.addParameter((new mpl$lab$util$ParameterNumber(this,mpl$lab$app$SimRunner.en.DISPLAY_PERIOD,mpl$lab$app$SimRunner.i18n.DISPLAY_PERIOD,goog.bind(this.getDisplayPeriod, this),goog.bind(this.setDisplayPeriod, this))).setSignifDigits(3));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$app$SimRunner.en.RUNNING,mpl$lab$app$SimRunner.i18n.RUNNING,goog.bind(this.getRunning, this),goog.bind(this.setRunning, this)));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$app$SimRunner.en.FIRING,mpl$lab$app$SimRunner.i18n.FIRING,goog.bind(this.getFiring, this),goog.bind(this.setFiring, this)));
    this.addParameter(new mpl$lab$util$ParameterBoolean(this,mpl$lab$app$SimRunner.en.NON_STOP,mpl$lab$app$SimRunner.i18n.NON_STOP,goog.bind(this.getNonStop, this),goog.bind(this.setNonStop, this)))
};
$jscomp.inherits(mpl$lab$app$SimRunner, mpl$lab$util$AbstractSubject);
mpl$lab$app$SimRunner.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", advanceList_: [" + goog.array.map(this.advanceList_, function(a) {
        return a.toStringShort()
    }) + "], clock_: " + this.clock_.toStringShort() + ", timer_: " + this.timer_ + ", timeStep_: " + mpl$lab$util$Util.NF(this.timeStep_) + ", displayPeriod_: " + mpl$lab$util$Util.NF(this.displayPeriod_) + ", nonStop_: " + this.nonStop_ + ", canvasList_: [" + goog.array.map(this.canvasList_, function(a) {
        return a.toStringShort()
    }) + "], memoList_: " + this.memoList_ + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$app$SimRunner.prototype.getClassName = function() {
    return "SimRunner"
}
;
mpl$lab$app$SimRunner.prototype.addCanvas = function(a) {
    goog.array.contains(this.canvasList_, a) || (this.canvasList_.push(a),
    this.addMemo(a))
}
;
mpl$lab$app$SimRunner.prototype.addErrorObserver = function(a) {
    goog.array.contains(this.errorObservers_, a) || this.errorObservers_.push(a)
}
;
mpl$lab$app$SimRunner.prototype.addMemo = function(a) {
    this.memoList_.addMemo(a)
}
;
mpl$lab$app$SimRunner.prototype.addStrategy = function(a) {
    this.advanceList_.push(a)
}
;
mpl$lab$app$SimRunner.prototype.advanceSims = function(a, b) {
    for (var c = a.getTime(); c < b; ) {
        a.advance(this.timeStep_, this);
        var d = c;
        c = a.getTime();
        if (1E-15 >= c - d)
            throw Error("SimRunner: time did not advance");
        if (b - c < this.timeStep_)
            break
    }
}
;
mpl$lab$app$SimRunner.prototype.callback = function() {
    try {
        if (this.clock_.isRunning() || this.clock_.isStepping()) {
            var a = this.clock_.getTime()
              , b = this.advanceList_[0].getTime();
            if (a > b + 1 || a < b - 1) {
                var c = b + this.timeStep_;
                this.clock_.setTime(c);
                this.clock_.setRealTime(c);
                a = c
            }
            c = a;
            for (var d = 0, e = this.advanceList_.length; d < e; d++)
                this.advanceSims(this.advanceList_[d], c);
            this.clock_.isStepping() ? this.clock_.clearStepMode() : (a = this.clock_.getTime(),
            b = this.advanceList_[0].getTime(),
            a - b > 20 * this.timeStep_ && this.clock_.setTime(b))
        }
        this.paintAll()
    } catch (f) {
        this.handleException(f)
    }
}
;
mpl$lab$app$SimRunner.prototype.destroy = function() {
    this.stopFiring()
}
;
mpl$lab$app$SimRunner.prototype.getCanvasList = function() {
    return goog.array.clone(this.canvasList_)
}
;
mpl$lab$app$SimRunner.prototype.getClock = function() {
    return this.clock_
}
;
mpl$lab$app$SimRunner.prototype.getDisplayPeriod = function() {
    return this.displayPeriod_
}
;
mpl$lab$app$SimRunner.prototype.getFiring = function() {
    return this.timer_.isFiring()
}
;
mpl$lab$app$SimRunner.prototype.getMemos = function() {
    return this.memoList_.getMemos()
}
;
mpl$lab$app$SimRunner.prototype.getNonStop = function() {
    return this.nonStop_
}
;
mpl$lab$app$SimRunner.prototype.getRunning = function() {
    return this.clock_.isRunning()
}
;
mpl$lab$app$SimRunner.prototype.getTimeStep = function() {
    return this.timeStep_
}
;
mpl$lab$app$SimRunner.prototype.handleException = function(a) {
    this.pause();
    this.timer_.stopFiring();
    goog.array.forEach(this.errorObservers_, function(b) {
        b.notifyError(a)
    });
    var b = goog.isDefAndNotNull(a) ? " " + a : "";
    alert(mpl$lab$app$SimRunner.i18n.STUCK + b)
}
;
mpl$lab$app$SimRunner.prototype.memorize = function() {
    this.memoList_.memorize()
}
;
mpl$lab$app$SimRunner.prototype.observe = function(a) {
    a.getSubject() == this.clock_ && (a.nameEquals(mpl$lab$util$Clock.CLOCK_RESUME) || a.nameEquals(mpl$lab$util$Clock.CLOCK_PAUSE) ? (a = this.advanceList_[0].getTime(),
    this.clock_.setTime(a),
    this.clock_.setRealTime(a),
    this.broadcastParameter(mpl$lab$app$SimRunner.en.RUNNING)) : a.nameEquals(mpl$lab$util$Clock.CLOCK_SET_TIME) && this.memorize())
}
;
mpl$lab$app$SimRunner.prototype.paintAll = function() {
    goog.array.forEach(this.canvasList_, function(a) {
        a.paint()
    })
}
;
mpl$lab$app$SimRunner.prototype.pause = function() {
    this.clock_.pause();
    return this.clock_.getTime()
}
;
mpl$lab$app$SimRunner.prototype.playUntil = function(a) {
    var b = new mpl$lab$util$ClockTask(a,null);
    b.setCallback(goog.bind(function() {
        this.clock_.pause();
        this.clock_.removeTask(b)
    }, this));
    this.clock_.addTask(b);
    return this.resume()
}
;
mpl$lab$app$SimRunner.prototype.removeCanvas = function(a) {
    goog.array.remove(this.canvasList_, a);
    this.removeMemo(a)
}
;
mpl$lab$app$SimRunner.prototype.removeErrorObserver = function(a) {
    goog.array.remove(this.errorObservers_, a)
}
;
mpl$lab$app$SimRunner.prototype.removeMemo = function(a) {
    this.memoList_.removeMemo(a)
}
;
mpl$lab$app$SimRunner.prototype.reset = function() {
    this.timer_.startFiring();
    this.clock_.pause();
    goog.array.forEach(this.advanceList_, function(a) {
        a.reset()
    });
    var a = this.advanceList_[0].getTime();
    this.clock_.setTime(a);
    this.clock_.setRealTime(a);
    this.paintAll();
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$app$SimRunner.RESET));
    return this.clock_.getTime()
}
;
mpl$lab$app$SimRunner.prototype.resume = function() {
    this.timer_.startFiring();
    this.clock_.resume();
    return this.clock_.getTime()
}
;
mpl$lab$app$SimRunner.prototype.save = function() {
    goog.array.forEach(this.advanceList_, function(a) {
        a.save()
    });
    return this.clock_.getTime()
}
;
mpl$lab$app$SimRunner.prototype.setAppName = function(a) {
    this.appName_ = a
}
;
mpl$lab$app$SimRunner.prototype.setDisplayPeriod = function(a) {
    this.displayPeriod_ = a;
    this.timer_.setPeriod(a);
    this.broadcastParameter(mpl$lab$app$SimRunner.en.DISPLAY_PERIOD)
}
;
mpl$lab$app$SimRunner.prototype.setFiring = function(a) {
    a ? this.startFiring() : this.stopFiring();
    this.broadcastParameter(mpl$lab$app$SimRunner.en.FIRING)
}
;
mpl$lab$app$SimRunner.prototype.setNonStop = function(a) {
    this.nonStop_ = a;
    this.broadcastParameter(mpl$lab$app$SimRunner.en.NON_STOP)
}
;
mpl$lab$app$SimRunner.prototype.setRunning = function(a) {
    a ? this.resume() : this.pause()
}
;
mpl$lab$app$SimRunner.prototype.setTimeStep = function(a) {
    this.timeStep_ = a;
    this.broadcastParameter(mpl$lab$app$SimRunner.en.TIME_STEP)
}
;
mpl$lab$app$SimRunner.prototype.startFiring = function() {
    this.timer_.startFiring()
}
;
mpl$lab$app$SimRunner.prototype.step = function() {
    var a = this.advanceList_[0].getTime() + this.timeStep_ - this.clock_.getTime();
    this.clock_.step(a);
    this.timer_.startFiring();
    return this.clock_.getTime()
}
;
mpl$lab$app$SimRunner.prototype.stopFiring = function() {
    this.nonStop_ || this.timer_.stopFiring()
}
;
mpl$lab$app$SimRunner.RESET = "RESET";
mpl$lab$app$SimRunner.en = {
    TIME_STEP: "time step",
    DISPLAY_PERIOD: "display period",
    RESTART: "restart",
    RUNNING: "running",
    FIRING: "firing",
    PAUSE: "pause",
    RESUME: "resume",
    NON_STOP: "non-stop",
    STEP: "step",
    STUCK: "Simulation is stuck; click reset and play to continue."
};
mpl$lab$app$SimRunner.de_strings = {
    TIME_STEP: "Zeitschritt",
    DISPLAY_PERIOD: "Bilddauer",
    RESTART: "Neustart",
    RUNNING: "laufend",
    FIRING: "t\u00e4tigend",
    PAUSE: "pausieren",
    RESUME: "weiter",
    NON_STOP: "durchgehend",
    STEP: "kleine Schritte",
    STUCK: "Simulation hat sich aufgeh\u00e4ngt; dr\u00fccken Sie Neustart und Weiter um fort zu fahren."
};
mpl$lab$app$SimRunner.i18n = "de" === goog.LOCALE ? mpl$lab$app$SimRunner.de_strings : mpl$lab$app$SimRunner.en;
var mpl$lab$controls$ToggleControl = function(a, b, c) {
    this.parameter_ = a;
    this.name_ = this.parameter_.getName();
    this.state_ = this.parameter_.getValue();
    this.imageOn_ = b;
    this.imageOff_ = c;
    this.button_ = document.createElement("button");
    this.button_.type = "button";
    this.button_.className = "icon";
    c.style.display = this.state_ ? "block" : "none";
    b.style.display = this.state_ ? "none" : "block";
    this.button_.appendChild(b);
    this.button_.appendChild(c);
    this.clickKey_ = goog.events.listen(this.button_, goog.events.EventType.CLICK, this.handleClick, !0, this);
    this.parameter_.getSubject().addObserver(this)
};
mpl$lab$controls$ToggleControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", state_: " + this.state_ + "}"
}
;
mpl$lab$controls$ToggleControl.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ToggleControl{parameter_: " + this.parameter_.toStringShort() + "}"
}
;
mpl$lab$controls$ToggleControl.prototype.disconnect = function() {
    this.parameter_.getSubject().removeObserver(this);
    goog.events.unlistenByKey(this.clickKey_)
}
;
mpl$lab$controls$ToggleControl.prototype.getElement = function() {
    return this.button_
}
;
mpl$lab$controls$ToggleControl.prototype.getParameter = function() {
    return this.parameter_
}
;
mpl$lab$controls$ToggleControl.prototype.getState = function() {
    return this.state_
}
;
mpl$lab$controls$ToggleControl.prototype.handleClick = function(a) {
    this.setState(!this.state_)
}
;
mpl$lab$controls$ToggleControl.prototype.observe = function(a) {
    a == this.parameter_ && this.setState(this.parameter_.getValue())
}
;
mpl$lab$controls$ToggleControl.prototype.setEnabled = function(a) {
    this.button_.disabled = !a
}
;
mpl$lab$controls$ToggleControl.prototype.setState = function(a) {
    this.state_ != a && (this.parameter_.setValue(a),
    this.state_ = a,
    this.imageOff_.style.display = a ? "block" : "none",
    this.imageOn_.style.display = a ? "none" : "block")
}
;
var mpl$sims$common$CommonControls = function() {
    throw Error();
};
mpl$sims$common$CommonControls.makeAxes = function(a, b) {
    var c = new mpl$lab$graph$DisplayAxes(a.getSimRect());
    b && (c.setXAxisAlignment(mpl$lab$view$VerticalAlign.BOTTOM),
    c.setYAxisAlignment(mpl$lab$view$HorizAlign.LEFT));
    new mpl$lab$util$GenericObserver(a,function(b) {
        b.nameEquals(mpl$lab$view$LabView.COORD_MAP_CHANGED) && (b = a.getCoordMap().screenToSimRect(a.getScreenRect()),
        c.setSimRect(b))
    }
    ,"resize axes");
    a.getDisplayList().add(c);
    return c
}
;
mpl$sims$common$CommonControls.makeBackgroundMenu = function(a) {
    var b = [mpl$sims$common$CommonControls.i18n.WHITE, mpl$sims$common$CommonControls.i18n.BLACK, mpl$sims$common$CommonControls.i18n.WHITE_WITH_TRAILS, mpl$sims$common$CommonControls.i18n.BLACK_WITH_TRAILS, mpl$sims$common$CommonControls.i18n.WHITE_WITH_LONG_TRAILS, mpl$sims$common$CommonControls.i18n.BLACK_WITH_LONG_TRAILS]
      , c = [mpl$sims$common$CommonControls.en.WHITE, mpl$sims$common$CommonControls.en.BLACK, mpl$sims$common$CommonControls.en.WHITE_WITH_TRAILS, mpl$sims$common$CommonControls.en.BLACK_WITH_TRAILS, mpl$sims$common$CommonControls.en.WHITE_WITH_LONG_TRAILS, mpl$sims$common$CommonControls.en.BLACK_WITH_LONG_TRAILS];
    c = goog.array.map(c, function(a) {
        return mpl$lab$util$Util.toName(a)
    });
    var d = mpl$sims$common$CommonControls.LONG_TRAILS
      , e = mpl$sims$common$CommonControls.SHORT_TRAILS;
    b = new mpl$lab$controls$ChoiceControlBase(b,c,function() {
        var b = a.getBackground()
          , g = a.getAlpha();
        if ("" == b)
            return c[0];
        if ("black" == b)
            if (mpl$lab$util$Util.veryDifferent(g, 1)) {
                if (!mpl$lab$util$Util.veryDifferent(g, e))
                    return c[3];
                if (!mpl$lab$util$Util.veryDifferent(g, d))
                    return c[5]
            } else
                return c[1];
        else if ("white" == b)
            if (mpl$lab$util$Util.veryDifferent(g, 1)) {
                if (!mpl$lab$util$Util.veryDifferent(g, e))
                    return c[2];
                if (!mpl$lab$util$Util.veryDifferent(g, d))
                    return c[4]
            } else
                return c[0];
        return -1
    }
    ,function(b) {
        switch (goog.array.indexOf(c, b)) {
        case 0:
            a.setBackground("");
            a.setAlpha(1);
            break;
        case 1:
            a.setBackground("black");
            a.setAlpha(1);
            break;
        case 2:
            a.setBackground("white");
            a.setAlpha(e);
            break;
        case 3:
            a.setBackground("black");
            a.setAlpha(e);
            break;
        case 4:
            a.setBackground("white");
            a.setAlpha(d);
            break;
        case 5:
            a.setBackground("black"),
            a.setAlpha(d)
        }
    }
    ,mpl$sims$common$CommonControls.i18n.BACKGROUND);
    a.addObserver(b);
    return b
}
;
mpl$sims$common$CommonControls.makePanZoomControls = function(a, b, c) {
    var d = mpl$lab$util$Util.IMAGES_DIR + "/"
      , e = document.createElement("div");
    e.style.width = "96px";
    var f = mpl$lab$util$Util.createImage(d + "up_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("up",goog.bind(a.panUp, a),f);
    f.repeatDelay = 100;
    e.appendChild(f.getElement());
    var g = document.createElement("div");
    g.style.width = e.style.width;
    f = mpl$lab$util$Util.createImage(d + "backward_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("left",goog.bind(a.panLeft, a),f);
    f.repeatDelay = 100;
    g.appendChild(f.getElement());
    f = mpl$lab$util$Util.createImage(d + "target_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("reset",c,f);
    g.appendChild(f.getElement());
    f = mpl$lab$util$Util.createImage(d + "forward_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("right",goog.bind(a.panRight, a),f);
    f.repeatDelay = 100;
    g.appendChild(f.getElement());
    var h = document.createElement("div");
    f = mpl$lab$util$Util.createImage(d + "down_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("down",goog.bind(a.panDown, a),f);
    f.repeatDelay = 100;
    h.appendChild(f.getElement());
    h.style.width = e.style.width;
    c = document.createElement("div");
    c.appendChild(e);
    c.appendChild(g);
    c.appendChild(h);
    c.style.textAlign = "center";
    e = document.createElement("div");
    f = mpl$lab$util$Util.createImage(d + "plus_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("zoomIn",goog.bind(a.zoomIn, a),f);
    f.repeatDelay = 100;
    e.appendChild(f.getElement());
    e.appendChild(document.createElement("BR"));
    f = mpl$lab$util$Util.createImage(d + "minus_gray.png", 30);
    f = new mpl$lab$controls$ButtonControl("zoomOut",goog.bind(a.zoomOut, a),f);
    f.repeatDelay = 100;
    e.appendChild(f.getElement());
    e.style.cssFloat = "right";
    e.style.marginTop = "18px";
    a = document.createElement("div");
    b && (a.style.position = "absolute",
    a.style.right = "10%",
    a.style.bottom = "12%",
    a.style.width = "126px");
    a.appendChild(e);
    a.appendChild(c);
    a.style.display = "none";
    return a
}
;
mpl$sims$common$CommonControls.makePlaybackControls = function(a, b) {
    var c = mpl$lab$util$Util.IMAGES_DIR + "/"
      , d = document.createElement("div");
    d.style.display = "block";
    b && (d.style.position = "absolute",
    d.style.left = "0",
    d.style.bottom = "0",
    d.style.opacity = .5);
    var e = mpl$lab$util$Util.createImage(c + "rewind.png", 30);
    b = new mpl$lab$controls$ButtonControl(mpl$lab$app$SimRunner.i18n.RESTART,goog.bind(a.reset, a),e);
    d.appendChild(b.getElement());
    e = mpl$lab$util$Util.createImage(c + "forward.png", 30);
    var f = mpl$lab$util$Util.createImage(c + "pause.png", 30);
    f = new mpl$lab$controls$ToggleControl(a.getParameterBoolean(mpl$lab$app$SimRunner.en.RUNNING),e,f);
    d.appendChild(f.getElement());
    e = mpl$lab$util$Util.createImage(c + "next.png", 30);
    a = new mpl$lab$controls$ButtonControl(mpl$lab$app$SimRunner.i18n.STEP,goog.bind(a.step, a),e);
    a.repeatDelay = 100;
    d.appendChild(a.getElement());
    return new mpl$lab$controls$GroupControl("playback",d,[b, f, a])
}
;
mpl$sims$common$CommonControls.makeEasyScript = function(a, b, c, d) {
    a = new mpl$lab$util$EasyScriptParser(a,b);
    a.addCommand("reset", function() {
        return c.reset()
    }, "sets simulation to initial conditions");
    a.addCommand("save", function() {
        return c.save()
    }, "saves simulation initial conditions");
    a.addCommand("step", function() {
        return c.step()
    }, "advance simulation by a small time increment");
    a.addCommand("pause", function() {
        return c.pause()
    }, "pause simulation");
    a.addCommand("resume", function() {
        return c.resume()
    }, "resume simulation");
    d.setParser(a);
    return a
}
;
mpl$sims$common$CommonControls.makeShowClockParam = function(a, b, c) {
    var d = b.getDisplayList();
    
    c.addParameter(b);
    new mpl$lab$util$GenericObserver(d,function(b) {
        b.getValue() == a && c.broadcastParameter(mpl$lab$view$DisplayClock.en.SHOW_CLOCK)
    }
    ,"broadcast show clock parameter");
    return b
}
;
mpl$sims$common$CommonControls.makeShowEnergyParam = function(a, b, c, d, e) {
    var f = goog.isString(d) ? d : mpl$lab$graph$EnergyBarGraph.en.SHOW_ENERGY;
    d = goog.isString(e) ? e : mpl$lab$graph$EnergyBarGraph.i18n.SHOW_ENERGY;
    e = b.getCoordMap().screenToSimRect(b.getScreenRect());
    a.setVisibleArea(e);
    var g = b.getDisplayList();
    b = new mpl$lab$util$ParameterBoolean(c,f,d,goog.bind(g.contains, g, a),function(b) {
        b ? g.add(a) : g.remove(a);
        c.broadcastParameter(f)
    }
    );
    c.addParameter(b);
    new mpl$lab$util$GenericObserver(g,function(b) {
        b.getValue() == a && c.broadcastParameter(f)
    }
    ,"broadcast show energy parameter");
    return b
}
;
mpl$sims$common$CommonControls.makeShowPanZoomParam = function(a, b) {
    var c = new mpl$lab$util$ParameterBoolean(b,mpl$sims$common$CommonControls.en.PAN_ZOOM,mpl$sims$common$CommonControls.i18n.PAN_ZOOM,function() {
        return "none" != a.style.display
    }
    ,function(c) {
        a.style.display = c ? "block" : "none";
        b.broadcastParameter(mpl$sims$common$CommonControls.en.PAN_ZOOM)
    }
    );
    b.addParameter(c);
    return c
}
;
mpl$sims$common$CommonControls.makeURLScriptButton = function(a, b) {
    if (!goog.isDef(a))
        throw Error();
    return new mpl$lab$controls$ButtonControl(mpl$lab$util$EasyScriptParser.i18n.URL_SCRIPT,function() {
        var c = a.scriptURL()
          , d = mpl$lab$util$EasyScriptParser.i18n.PROMPT_URL;
        2048 < c.length && (d = d + "  " + mpl$lab$util$EasyScriptParser.i18n.WARN_URL_2048);
        var e = b.getFiring();
        e && b.stopFiring();
        window.prompt(d, c);
        e && b.startFiring()
    }
    )
}
;
mpl$sims$common$CommonControls.SHORT_TRAILS = .1;
mpl$sims$common$CommonControls.LONG_TRAILS = .05;
mpl$sims$common$CommonControls.en = {
    PAN_ZOOM: "pan-zoom",
    BACKGROUND: "background",
    WHITE: "white",
    BLACK: "black",
    WHITE_WITH_TRAILS: "white with trails",
    BLACK_WITH_TRAILS: "black with trails",
    WHITE_WITH_LONG_TRAILS: "white with long trails",
    BLACK_WITH_LONG_TRAILS: "black with long trails"
};
mpl$sims$common$CommonControls.de_strings = {
    PAN_ZOOM: "pan-zoom",
    BACKGROUND: "Hintergrund",
    WHITE: "weiss",
    BLACK: "schwarz",
    WHITE_WITH_TRAILS: "weiss mit Pfade",
    BLACK_WITH_TRAILS: "schwarz mit Pfade",
    WHITE_WITH_LONG_TRAILS: "weiss mit lange Pfade",
    BLACK_WITH_LONG_TRAILS: "schwarz mit lange Pfade"
};
mpl$sims$common$CommonControls.i18n = "de" === goog.LOCALE ? mpl$sims$common$CommonControls.de_strings : mpl$sims$common$CommonControls.en;
var mpl$lab$model$DiffEqSolver = function(a) {};
mpl$lab$model$DiffEqSolver.prototype.getName = function(a) {}
;
mpl$lab$model$DiffEqSolver.prototype.nameEquals = function(a) {}
;
mpl$lab$model$DiffEqSolver.prototype.step = function(a) {}
;
var mpl$lab$model$Arc = function(a, b, c, d) {
    mpl$lab$model$AbstractSimObject.call(this, a);
    this.startAngle_ = b;
    this.angle_ = 0;
    this.radius_ = c;
    this.center_ = d
};
$jscomp.inherits(mpl$lab$model$Arc, mpl$lab$model$AbstractSimObject);
mpl$lab$model$Arc.ID = mpl$lab$model$AbstractSimObject.ID;
mpl$lab$model$Arc.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractSimObject.prototype.toString.call(this).slice(0, -1) + ", startAngle_: " + mpl$lab$util$Util.NF(this.startAngle_) + ", angle_: " + mpl$lab$util$Util.NF(this.angle_) + ", radius_: " + mpl$lab$util$Util.NF(this.radius_) + ", center_: " + this.center_ + "}"
}
;
mpl$lab$model$Arc.prototype.getClassName = function() {
    return "Arc"
}
;
mpl$lab$model$Arc.prototype.getAngle = function() {
    return this.angle_
}
;
mpl$lab$model$Arc.prototype.getBoundsWorld = function() {
    return mpl$lab$util$DoubleRect.makeCentered(this.center_, this.radius_, this.radius_)
}
;
mpl$lab$model$Arc.prototype.getCenter = function() {
    return this.center_
}
;
mpl$lab$model$Arc.prototype.getRadius = function() {
    return this.radius_
}
;
mpl$lab$model$Arc.prototype.getStartAngle = function() {
    return this.startAngle_
}
;
mpl$lab$model$Arc.prototype.setAngle = function(a) {
    this.angle_ = a
}
;
mpl$lab$model$Arc.prototype.setCenter = function(a) {
    this.center_ = a
}
;
mpl$lab$model$Arc.prototype.setRadius = function(a) {
    this.radius_ = a
}
;
mpl$lab$model$Arc.prototype.setStartAngle = function(a) {
    this.startAngle_ = a
}
;
mpl$lab$model$Arc.prototype.similar = function(a, b) {
    return !(a instanceof mpl$lab$model$Arc) || mpl$lab$util$Util.veryDifferent(a.startAngle_, this.startAngle_, b) || mpl$lab$util$Util.veryDifferent(a.angle_, this.angle_, b) || mpl$lab$util$Util.veryDifferent(a.radius_, this.radius_, b) ? !1 : a.getCenter().nearEqual(this.center_, b)
}
;
var mpl$lab$model$ConcreteLine = function(a, b, c) {
    mpl$lab$model$AbstractSimObject.call(this, a);
    this.startPt_ = goog.isObject(b) ? b : mpl$lab$util$Vector.ORIGIN;
    this.endPt_ = goog.isObject(c) ? c : mpl$lab$util$Vector.ORIGIN
};
$jscomp.inherits(mpl$lab$model$ConcreteLine, mpl$lab$model$AbstractSimObject);
mpl$lab$model$ConcreteLine.ID = mpl$lab$model$AbstractSimObject.ID;
mpl$lab$model$ConcreteLine.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$AbstractSimObject.prototype.toString.call(this).slice(0, -1) + ", startPoint: " + this.getStartPoint() + ", endPoint: " + this.getEndPoint() + "}"
}
;
mpl$lab$model$ConcreteLine.prototype.getClassName = function() {
    return "ConcreteLine"
}
;
mpl$lab$model$ConcreteLine.prototype.getBoundsWorld = function() {
    return mpl$lab$util$DoubleRect.make(this.getStartPoint(), this.getEndPoint())
}
;
mpl$lab$model$ConcreteLine.prototype.getEndPoint = function() {
    return this.endPt_
}
;
mpl$lab$model$ConcreteLine.prototype.getStartPoint = function() {
    return this.startPt_
}
;
mpl$lab$model$ConcreteLine.prototype.getVector = function() {
    return this.getEndPoint().subtract(this.getStartPoint())
}
;
mpl$lab$model$ConcreteLine.prototype.setEndPoint = function(a) {
    this.endPt_ = a
}
;
mpl$lab$model$ConcreteLine.prototype.setStartPoint = function(a) {
    this.startPt_ = a
}
;
mpl$lab$model$ConcreteLine.prototype.similar = function(a, b) {
    return a instanceof mpl$lab$model$ConcreteLine && a.getStartPoint().nearEqual(this.getStartPoint(), b) ? a.getEndPoint().nearEqual(this.getEndPoint(), b) : !1
}
;
var mpl$lab$model$SimList = function() {
    mpl$lab$util$AbstractSubject.call(this, "SIM_LIST");
    this.elements_ = [];
    this.tolerance_ = .1
};
$jscomp.inherits(mpl$lab$model$SimList, mpl$lab$util$AbstractSubject);
mpl$lab$model$SimList.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", tolerance_: " + mpl$lab$util$Util.NF(this.tolerance_) + ", elements_: [" + goog.array.map(this.elements_, function(a, b) {
        return b + ": " + a.toStringShort()
    }) + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$model$SimList.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$util$AbstractSubject.prototype.toStringShort.call(this).slice(0, -1) + ", length: " + this.elements_.length + "}"
}
;
mpl$lab$model$SimList.prototype.getClassName = function() {
    return "SimList"
}
;
mpl$lab$model$SimList.prototype.add = function(a) {
    for (var b = 0; b < arguments.length; b++) {
        var c = arguments[b];
        if (!goog.isDefAndNotNull(c))
            throw Error("cannot add invalid SimObject");
        var d = c.getExpireTime();
        if (isFinite(d))
            for (; d = this.getSimilar(c); )
                this.remove(d);
        goog.array.contains(this.elements_, c) || (this.elements_.push(c),
        this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$SimList.OBJECT_ADDED,c)))
    }
}
;
mpl$lab$model$SimList.prototype.addAll = function(a) {
    for (var b = 0, c = a.length; b < c; b++)
        this.add(a[b])
}
;
mpl$lab$model$SimList.prototype.clear = function() {
    this.removeAll(this.toArray())
}
;
mpl$lab$model$SimList.prototype.contains = function(a) {
    return goog.array.contains(this.elements_, a)
}
;
mpl$lab$model$SimList.prototype.get = function(a) {
    if (goog.isNumber(a)) {
        if (0 <= a && a < this.elements_.length)
            return this.elements_[a]
    } else if (goog.isString(a)) {
        a = mpl$lab$util$Util.toName(a);
        var b = goog.array.find(this.elements_, function(b, d, e) {
            return b.getName() == a
        });
        if (null != b)
            return b
    }
    throw Error("SimList did not find " + a);
}
;
mpl$lab$model$SimList.prototype.getArc = function(a) {
    var b = this.get(a);
    if (b instanceof mpl$lab$model$Arc)
        return b;
    throw Error("no Arc named " + a);
}
;
mpl$lab$model$SimList.prototype.getConcreteLine = function(a) {
    var b = this.get(a);
    if (b instanceof mpl$lab$model$ConcreteLine)
        return b;
    throw Error("no ConcreteLine named " + a);
}
;
mpl$lab$model$SimList.prototype.getPointMass = function(a) {
    var b = this.get(a);
    if (b instanceof mpl$lab$model$PointMass)
        return b;
    throw Error("no PointMass named " + a);
}
;
mpl$lab$model$SimList.prototype.getSimilar = function(a, b) {
    var c = void 0 === b ? this.tolerance_ : b;
    return goog.array.find(this.elements_, function(b, e, f) {
        return b.similar(a, c)
    })
}
;
mpl$lab$model$SimList.prototype.getSpring = function(a) {
    var b = this.get(a);
    if (b instanceof mpl$lab$model$Spring)
        return b;
    throw Error("no Spring named " + a);
}
;
mpl$lab$model$SimList.prototype.getTolerance = function() {
    return this.tolerance_
}
;
mpl$lab$model$SimList.prototype.indexOf = function(a) {
    return goog.array.indexOf(this.elements_, a)
}
;
mpl$lab$model$SimList.prototype.length = function() {
    return this.elements_.length
}
;
mpl$lab$model$SimList.prototype.remove = function(a) {
    goog.array.remove(this.elements_, a) && this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$SimList.OBJECT_REMOVED,a))
}
;
mpl$lab$model$SimList.prototype.removeAll = function(a) {
    for (var b = 0, c = a.length; b < c; b++)
        this.remove(a[b])
}
;
mpl$lab$model$SimList.prototype.removeTemporary = function(a) {
    for (var b = this.elements_.length - 1; 0 <= b; b--) {
        var c = this.elements_[b];
        c.getExpireTime() < a && (this.elements_.splice(b, 1),
        this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$SimList.OBJECT_REMOVED,c)))
    }
}
;
mpl$lab$model$SimList.prototype.setTolerance = function(a) {
    this.tolerance_ = a
}
;
mpl$lab$model$SimList.prototype.toArray = function() {
    return goog.array.clone(this.elements_)
}
;
mpl$lab$model$SimList.OBJECT_ADDED = "OBJECT_ADDED";
mpl$lab$model$SimList.OBJECT_MODIFIED = "OBJECT_MODIFIED";
mpl$lab$model$SimList.OBJECT_REMOVED = "OBJECT_REMOVED";
var mpl$lab$model$Simulation = function(a) {};
mpl$lab$model$Simulation.prototype.getSimList = function() {}
;
mpl$lab$model$Simulation.prototype.getTime = function() {}
;
mpl$lab$model$Simulation.prototype.modifyObjects = function() {}
;
mpl$lab$model$Simulation.prototype.reset = function() {}
;
mpl$lab$model$Simulation.prototype.saveInitialState = function() {}
;
mpl$lab$model$Simulation.RESET = "RESET";
mpl$lab$model$Simulation.INITIAL_STATE_SAVED = "INITIAL_STATE_SAVED";
var mpl$lab$model$ODESim = function(a) {};
mpl$lab$model$ODESim.prototype.evaluate = function(a, b, c) {}
;
mpl$lab$model$ODESim.prototype.getVarsList = function() {}
;
mpl$lab$model$ODESim.prototype.restoreState = function() {}
;
mpl$lab$model$ODESim.prototype.saveState = function() {}
;
var mpl$lab$model$AdaptiveStepSolver = function(a, b, c) {
    this.diffEq_ = a;
    this.energySystem_ = b;
    this.odeSolver_ = c;
    this.totSteps_ = 0;
    this.secondDiff_ = !0;
    this.specialTest_ = !1;
    this.tolerance_ = 1E-6
};
mpl$lab$model$AdaptiveStepSolver.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", odeSolver_: " + this.odeSolver_.toStringShort() + ", energySystem_: " + this.energySystem_.toStringShort() + ", secondDiff_: " + this.secondDiff_ + ", tolerance_: " + mpl$lab$util$Util.NFE(this.tolerance_) + "}"
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "AdaptiveStepSolver{diffEq_: " + this.diffEq_.toStringShort() + "}"
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.getName = function(a) {
    return a ? mpl$lab$model$AdaptiveStepSolver.i18n.NAME + "-" + this.odeSolver_.getName(!0) : mpl$lab$util$Util.toName(mpl$lab$model$AdaptiveStepSolver.en.NAME) + "_" + this.odeSolver_.getName(!1)
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.nameEquals = function(a) {
    return this.getName() == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.getSecondDiff = function() {
    return this.secondDiff_
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.getTolerance = function() {
    return this.tolerance_
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.setSecondDiff = function(a) {
    this.secondDiff_ = a
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.setTolerance = function(a) {
    this.tolerance_ = a
}
;
mpl$lab$model$AdaptiveStepSolver.prototype.step = function(a) {
    this.diffEq_.saveState();
    var b = this.diffEq_.getTime()
      , c = a;
    this.diffEq_.modifyObjects();
    var d = this.energySystem_.getEnergyInfo().getTotalEnergy()
      , e = mpl$lab$util$Util.POSITIVE_INFINITY
      , f = mpl$lab$util$Util.POSITIVE_INFINITY
      , g = !0;
    if (1E-15 > a)
        return null;
    do {
        var h = b;
        if (!g) {
            this.diffEq_.restoreState();
            this.diffEq_.modifyObjects();
            goog.asserts.assert(1E-12 > Math.abs(this.diffEq_.getTime() - b));
            var k = this.energySystem_.getEnergyInfo().getTotalEnergy();
            goog.asserts.assert(1E-10 > Math.abs(k - d));
            c /= 5;
            if (1E-15 > c)
                throw Error("time step too small " + c);
        }
        for (k = 0; h < b + a; ) {
            var l = c;
            h + l > b + a - 1E-10 && (l = b + a - h);
            k++;
            var m = this.odeSolver_.step(l);
            this.diffEq_.modifyObjects();
            if (null != m)
                return m;
            h += l
        }
        h = this.energySystem_.getEnergyInfo().getTotalEnergy();
        h = Math.abs(d - h);
        this.secondDiff_ ? g || (f = Math.abs(h - e)) : f = h;
        e = h;
        g = !1
    } while (f > this.tolerance_);this.totSteps_ += k;
    return null
}
;
mpl$lab$model$AdaptiveStepSolver.en = {
    NAME: "Adaptive Step"
};
mpl$lab$model$AdaptiveStepSolver.de_strings = {
    NAME: "Adaptiert Schritt"
};
mpl$lab$model$AdaptiveStepSolver.i18n = "de" === goog.LOCALE ? mpl$lab$model$AdaptiveStepSolver.de_strings : mpl$lab$model$AdaptiveStepSolver.en;
var mpl$lab$model$EulersMethod = function(a) {
    this.ode_ = a;
    this.inp_ = [];
    this.k1_ = [];
    this.k2_ = []
};
mpl$lab$model$EulersMethod.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort()
}
;
mpl$lab$model$EulersMethod.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "EulersMethod{ode_: " + this.ode_.toStringShort() + "}"
}
;
mpl$lab$model$EulersMethod.prototype.getName = function(a) {
    return a ? mpl$lab$model$EulersMethod.i18n.NAME : mpl$lab$util$Util.toName(mpl$lab$model$EulersMethod.en.NAME)
}
;
mpl$lab$model$EulersMethod.prototype.nameEquals = function(a) {
    return this.getName() == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$EulersMethod.prototype.step = function(a) {
    var b, c = this.ode_.getVarsList(), d = c.getValues(), e = d.length;
    this.inp_.length != e && (this.inp_ = Array(e),
    this.k1_ = Array(e));
    var f = this.inp_
      , g = this.k1_;
    for (b = 0; b < e; b++)
        f[b] = d[b];
    mpl$lab$util$Util.zeroArray(g);
    b = this.ode_.evaluate(f, g, 0);
    if (!goog.isNull(b))
        return b;
    for (b = 0; b < e; b++)
        d[b] += g[b] * a;
    c.setValues(d, !0);
    return null
}
;
mpl$lab$model$EulersMethod.en = {
    NAME: "Eulers Method"
};
mpl$lab$model$EulersMethod.de_strings = {
    NAME: "Eulers Methode"
};
mpl$lab$model$EulersMethod.i18n = "de" === goog.LOCALE ? mpl$lab$model$EulersMethod.de_strings : mpl$lab$model$EulersMethod.en;
var mpl$lab$model$ModifiedEuler = function(a) {
    this.ode_ = a;
    this.inp_ = [];
    this.k1_ = [];
    this.k2_ = []
};
mpl$lab$model$ModifiedEuler.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort()
}
;
mpl$lab$model$ModifiedEuler.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "ModifiedEuler{ode_: " + this.ode_.toStringShort() + "}"
}
;
mpl$lab$model$ModifiedEuler.prototype.getName = function(a) {
    return a ? mpl$lab$model$ModifiedEuler.i18n.NAME : mpl$lab$util$Util.toName(mpl$lab$model$ModifiedEuler.en.NAME)
}
;
mpl$lab$model$ModifiedEuler.prototype.nameEquals = function(a) {
    return this.getName() == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$ModifiedEuler.prototype.step = function(a) {
    var b, c = this.ode_.getVarsList(), d = c.getValues(), e = d.length;
    this.inp_.length != e && (this.inp_ = Array(e),
    this.k1_ = Array(e),
    this.k2_ = Array(e));
    var f = this.inp_
      , g = this.k1_
      , h = this.k2_;
    for (b = 0; b < e; b++)
        f[b] = d[b];
    mpl$lab$util$Util.zeroArray(g);
    b = this.ode_.evaluate(f, g, 0);
    if (!goog.isNull(b))
        return b;
    for (b = 0; b < e; b++)
        f[b] = d[b] + g[b] * a;
    mpl$lab$util$Util.zeroArray(h);
    b = this.ode_.evaluate(f, h, a);
    if (!goog.isNull(b))
        return b;
    for (b = 0; b < e; b++)
        d[b] += (g[b] + h[b]) * a / 2;
    c.setValues(d, !0);
    return null
}
;
mpl$lab$model$ModifiedEuler.en = {
    NAME: "Modified Euler"
};
mpl$lab$model$ModifiedEuler.de_strings = {
    NAME: "Modifiziert Euler"
};
mpl$lab$model$ModifiedEuler.i18n = "de" === goog.LOCALE ? mpl$lab$model$ModifiedEuler.de_strings : mpl$lab$model$ModifiedEuler.en;
var mpl$lab$model$ODEAdvance = function(a) {};
mpl$lab$model$ODEAdvance.prototype.getDiffEqSolver = function() {}
;
mpl$lab$model$ODEAdvance.prototype.setDiffEqSolver = function(a) {}
;
var mpl$lab$model$RungeKutta = function(a) {
    this.ode_ = a;
    this.inp_ = [];
    this.k1_ = [];
    this.k2_ = [];
    this.k3_ = [];
    this.k4_ = []
};
mpl$lab$model$RungeKutta.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort()
}
;
mpl$lab$model$RungeKutta.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "RungeKutta{ode_: " + this.ode_.toStringShort() + "}"
}
;
mpl$lab$model$RungeKutta.prototype.getName = function(a) {
    return a ? mpl$lab$model$RungeKutta.i18n.NAME : mpl$lab$util$Util.toName(mpl$lab$model$RungeKutta.en.NAME)
}
;
mpl$lab$model$RungeKutta.prototype.nameEquals = function(a) {
    return this.getName() == mpl$lab$util$Util.toName(a)
}
;
mpl$lab$model$RungeKutta.prototype.step = function(a) {
    var b, c = this.ode_.getVarsList(), d = c.getValues(), e = d.length;
    this.inp_.length < e && (this.inp_ = Array(e),
    this.k1_ = Array(e),
    this.k2_ = Array(e),
    this.k3_ = Array(e),
    this.k4_ = Array(e));
    var f = this.inp_
      , g = this.k1_
      , h = this.k2_
      , k = this.k3_
      , l = this.k4_;
    for (b = 0; b < e; b++)
        f[b] = d[b];
    mpl$lab$util$Util.zeroArray(g);
    b = this.ode_.evaluate(f, g, 0);
    if (null !== b)
        return b;
    for (b = 0; b < e; b++)
        f[b] = d[b] + g[b] * a / 2;
    mpl$lab$util$Util.zeroArray(h);
    b = this.ode_.evaluate(f, h, a / 2);
    if (null !== b)
        return b;
    for (b = 0; b < e; b++)
        f[b] = d[b] + h[b] * a / 2;
    mpl$lab$util$Util.zeroArray(k);
    b = this.ode_.evaluate(f, k, a / 2);
    if (null !== b)
        return b;
    for (b = 0; b < e; b++)
        f[b] = d[b] + k[b] * a;
    mpl$lab$util$Util.zeroArray(l);
    b = this.ode_.evaluate(f, l, a);
    if (null !== b)
        return b;
    for (b = 0; b < e; b++)
        d[b] += (g[b] + 2 * h[b] + 2 * k[b] + l[b]) * a / 6;
    c.setValues(d, !0);
    return null
}
;
mpl$lab$model$RungeKutta.en = {
    NAME: "Runge-Kutta"
};
mpl$lab$model$RungeKutta.de_strings = {
    NAME: "Runge-Kutta"
};
mpl$lab$model$RungeKutta.i18n = "de" === goog.LOCALE ? mpl$lab$model$RungeKutta.de_strings : mpl$lab$model$RungeKutta.en;
var mpl$lab$model$DiffEqSolverSubject = function(a, b, c, d) {
    mpl$lab$util$AbstractSubject.call(this, d || "DIFF_EQ_SUBJECT");
    this.sim_ = a;
    this.energySystem_ = b;
    this.advanceStrategy_ = c;
    this.solvers_ = [];
    this.solvers_.push(new mpl$lab$model$EulersMethod(this.sim_));
    this.solvers_.push(new mpl$lab$model$ModifiedEuler(this.sim_));
    this.solvers_.push(new mpl$lab$model$RungeKutta(this.sim_));
    null != this.energySystem_ && (a = new mpl$lab$model$AdaptiveStepSolver(this.sim_,this.energySystem_,new mpl$lab$model$ModifiedEuler(this.sim_)),
    this.solvers_.push(a),
    a = new mpl$lab$model$AdaptiveStepSolver(this.sim_,this.energySystem_,new mpl$lab$model$RungeKutta(this.sim_)),
    this.solvers_.push(a));
    a = goog.array.map(this.solvers_, function(a) {
        return a.getName(!0)
    });
    b = goog.array.map(this.solvers_, function(a) {
        return a.getName()
    });
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$lab$model$DiffEqSolverSubject.en.DIFF_EQ_SOLVER,mpl$lab$model$DiffEqSolverSubject.i18n.DIFF_EQ_SOLVER,goog.bind(this.getDiffEqSolver, this),goog.bind(this.setDiffEqSolver, this),a,b))
};
$jscomp.inherits(mpl$lab$model$DiffEqSolverSubject, mpl$lab$util$AbstractSubject);
mpl$lab$model$DiffEqSolverSubject.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", sim_: " + this.sim_.toStringShort() + ", energySystem_: " + (null == this.energySystem_ ? "null" : this.energySystem_.toStringShort()) + ", advanceStrategy_: " + this.advanceStrategy_ + ", solvers_: [ " + goog.array.map(this.solvers_, function(a) {
        return a.toStringShort()
    }) + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$model$DiffEqSolverSubject.prototype.getClassName = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DiffEqSolverSubject"
}
;
mpl$lab$model$DiffEqSolverSubject.prototype.getDiffEqSolver = function() {
    return this.advanceStrategy_.getDiffEqSolver().getName()
}
;
mpl$lab$model$DiffEqSolverSubject.prototype.setDiffEqSolver = function(a) {
    if (!this.advanceStrategy_.getDiffEqSolver().nameEquals(a)) {
        var b = goog.array.find(this.solvers_, function(b) {
            return b.nameEquals(a)
        });
        if (null != b)
            this.advanceStrategy_.setDiffEqSolver(b),
            this.broadcastParameter(mpl$lab$model$DiffEqSolverSubject.en.DIFF_EQ_SOLVER);
        else
            throw Error("unknown solver: " + a);
    }
}
;
mpl$lab$model$DiffEqSolverSubject.en = {
    DIFF_EQ_SOLVER: "Diff Eq Solver"
};
mpl$lab$model$DiffEqSolverSubject.de_strings = {
    DIFF_EQ_SOLVER: "Diff Eq L\u00f6ser"
};
mpl$lab$model$DiffEqSolverSubject.i18n = "de" === goog.LOCALE ? mpl$lab$model$DiffEqSolverSubject.de_strings : mpl$lab$model$DiffEqSolverSubject.en;
var mpl$lab$app$EventHandler = function(a) {};
mpl$lab$app$EventHandler.prototype.startDrag = function(a, b, c, d, e) {}
;
mpl$lab$app$EventHandler.prototype.mouseDrag = function(a, b, c, d) {}
;
mpl$lab$app$EventHandler.prototype.finishDrag = function(a, b, c) {}
;
mpl$lab$app$EventHandler.prototype.handleKeyEvent = function(a, b, c) {}
;
mpl$lab$app$EventHandler.MOUSE_DRAG = "MOUSE_DRAG";
mpl$lab$app$EventHandler.START_DRAG = "START_DRAG";
mpl$lab$app$EventHandler.FINISH_DRAG = "FINISH_DRAG";
var mpl$lab$controls$LabelControl = function(a) {
    this.text_ = a;
    this.label_ = document.createElement("LABEL");
    this.label_.appendChild(document.createTextNode(a));
    this.label_.disabled = !0
};
mpl$lab$controls$LabelControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + "}"
}
;
mpl$lab$controls$LabelControl.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : 'LabelControl{text_: "' + this.text_ + '"}'
}
;
mpl$lab$controls$LabelControl.prototype.disconnect = function() {}
;
mpl$lab$controls$LabelControl.prototype.getElement = function() {
    return this.label_
}
;
mpl$lab$controls$LabelControl.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$LabelControl.prototype.setEnabled = function(a) {
    this.label_.disabled = !a
}
;
var mpl$lab$controls$NumericControlBase = function(a, b, c, d) {
    this.label_ = a;
    this.getter_ = b;
    this.setter_ = c;
    this.value_ = b();
    if (!goog.isNumber(this.value_))
        throw Error("not a number " + this.value_);
    this.signifDigits_ = 3;
    this.decimalPlaces_ = -1;
    this.columns_ = Math.max(8, 1 + this.signifDigits_);
    a = null;
    goog.isObject(d) ? (b = goog.dom.getParentElement(d),
    null != b && "LABEL" == b.tagName && (a = b)) : (d = document.createElement("input"),
    d.type = "text",
    d.size = this.columns_,
    a = document.createElement("LABEL"),
    a.appendChild(document.createTextNode(this.label_)),
    a.appendChild(d));
    this.textField_ = d;
    this.topElement_ = null !== a ? a : this.textField_;
    this.lastValue_ = "";
    this.textField_.textAlign = "right";
    this.changeKey_ = goog.events.listen(this.textField_, goog.events.EventType.CHANGE, this.validate, !0, this);
    this.focusKey_ = goog.events.listen(this.textField_, goog.events.EventType.FOCUS, this.gainFocus, !1, this);
    this.clickKey_ = goog.events.listen(this.textField_, goog.events.EventType.CLICK, this.doClick, !1, this);
    this.firstClick_ = !1;
    this.formatTextField()
};
mpl$lab$controls$NumericControlBase.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", signifDigits_: " + this.signifDigits_ + ", decimalPlaces_: " + this.decimalPlaces_ + ", columns_: " + this.columns_ + "}"
}
;
mpl$lab$controls$NumericControlBase.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.getClassName() + '{label_: "' + this.label_ + '"}'
}
;
mpl$lab$controls$NumericControlBase.prototype.columnsNeeded = function(a, b) {
    var c = mpl$lab$controls$NumericControlBase.magnitude(a);
    return 2 + this.decimalPlacesNeeded(a, b) + (0 < c ? c : 0)
}
;
mpl$lab$controls$NumericControlBase.prototype.decimalPlacesNeeded = function(a, b) {
    if (-1 < this.decimalPlaces_)
        return this.decimalPlaces_;
    a = b - 1 - mpl$lab$controls$NumericControlBase.magnitude(a);
    16 < a && (a = 16);
    return 0 < a ? a : 0
}
;
mpl$lab$controls$NumericControlBase.prototype.disconnect = function() {
    goog.events.unlistenByKey(this.changeKey_);
    goog.events.unlistenByKey(this.clickKey_);
    goog.events.unlistenByKey(this.focusKey_)
}
;
mpl$lab$controls$NumericControlBase.prototype.doClick = function(a) {
    this.firstClick_ && (this.textField_.select(),
    this.firstClick_ = !1)
}
;
mpl$lab$controls$NumericControlBase.prototype.formatTextField = function() {
    var a = this.decimalPlacesNeeded(this.value_, this.signifDigits_)
      , b = this.columnsNeeded(this.value_, this.signifDigits_);
    this.lastValue_ = this.value_.toFixed(a);
    this.textField_.value = this.lastValue_;
    b != this.columns_ && (this.columns_ = b,
    this.textField_.size = this.columns_)
}
;
mpl$lab$controls$NumericControlBase.prototype.gainFocus = function(a) {
    this.firstClick_ = !0
}
;
mpl$lab$controls$NumericControlBase.prototype.getClassName = function() {
    return "NumericControlBase"
}
;
mpl$lab$controls$NumericControlBase.prototype.getDecimalPlaces = function() {
    return this.decimalPlaces_
}
;
mpl$lab$controls$NumericControlBase.prototype.getElement = function() {
    return this.topElement_
}
;
mpl$lab$controls$NumericControlBase.prototype.getParameter = function() {
    return null
}
;
mpl$lab$controls$NumericControlBase.prototype.getSignifDigits = function() {
    return this.signifDigits_
}
;
mpl$lab$controls$NumericControlBase.prototype.getValue = function() {
    return this.value_
}
;
mpl$lab$controls$NumericControlBase.magnitude = function(a) {
    return 1E-15 > Math.abs(a) ? 0 : Math.floor(Math.LOG10E * Math.log(Math.abs(a)))
}
;
mpl$lab$controls$NumericControlBase.prototype.observe = function(a) {
    this.setValue(this.getter_())
}
;
mpl$lab$controls$NumericControlBase.prototype.setDecimalPlaces = function(a) {
    this.decimalPlaces_ != a && (this.decimalPlaces_ = -1 < a ? a : -1,
    this.formatTextField());
    return this
}
;
mpl$lab$controls$NumericControlBase.prototype.setEnabled = function(a) {
    this.textField_.disabled = !a
}
;
mpl$lab$controls$NumericControlBase.prototype.setSignifDigits = function(a) {
    this.signifDigits_ != a && (this.signifDigits_ = a,
    this.formatTextField());
    return this
}
;
mpl$lab$controls$NumericControlBase.prototype.setValue = function(a) {
    if (a != this.value_) {
        try {
            if (isNaN(a))
                throw Error("not a number " + a);
            this.value_ = a;
            this.setter_(a)
        } catch (b) {
            alert(b),
            this.value_ = this.getter_()
        }
        this.formatTextField()
    }
}
;
mpl$lab$controls$NumericControlBase.prototype.validate = function(a) {
    a = this.textField_.value.replace(/^\s*|\s*$/g, "");
    if (a != this.lastValue_) {
        var b = parseFloat(a);
        isNaN(b) ? (alert("not a number: " + a),
        this.formatTextField()) : this.setValue(b)
    }
}
;
var mpl$lab$controls$NumericControl = function(a, b) {
    mpl$lab$controls$NumericControlBase.call(this, a.getName(!0), goog.bind(a.getValue, a), goog.bind(a.setValue, a), b);
    this.parameter_ = a;
    this.setSignifDigits(a.getSignifDigits());
    this.setDecimalPlaces(a.getDecimalPlaces());
    this.parameter_.getSubject().addObserver(this)
};
$jscomp.inherits(mpl$lab$controls$NumericControl, mpl$lab$controls$NumericControlBase);
mpl$lab$controls$NumericControl.magnitude = mpl$lab$controls$NumericControlBase.magnitude;
mpl$lab$controls$NumericControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$controls$NumericControlBase.prototype.toString.call(this).slice(0, -1) + ", parameter_: " + this.parameter_.toStringShort() + "}"
}
;
mpl$lab$controls$NumericControl.prototype.disconnect = function() {
    mpl$lab$controls$NumericControlBase.prototype.disconnect.call(this);
    this.parameter_.getSubject().removeObserver(this)
}
;
mpl$lab$controls$NumericControl.prototype.getClassName = function() {
    return "NumericControl"
}
;
mpl$lab$controls$NumericControl.prototype.getParameter = function() {
    return this.parameter_
}
;
mpl$lab$controls$NumericControl.prototype.observe = function(a) {
    a == this.parameter_ && (mpl$lab$controls$NumericControlBase.prototype.observe.call(this, a),
    this.setSignifDigits(this.parameter_.getSignifDigits()),
    this.setDecimalPlaces(this.parameter_.getDecimalPlaces()))
}
;
var mpl$lab$app$MouseTracker = function(a, b, c, d, e) {
    if (null == a && null == e)
        throw Error();
    this.dragDispObj_ = a;
    this.view_ = b;
    this.eventHandler_ = e;
    this.ehDrag_ = !1;
    this.dragSimObj_ = null;
    null != a && (b = a.getSimObjects(),
    0 < b.length && (this.dragSimObj_ = b[0]));
    this.loc_sim_ = c;
    this.drag_body_ = d;
    this.dragOffset_ = mpl$lab$util$Vector.ORIGIN;
    null != a && (this.dragOffset_ = c.subtract(a.getPosition()))
};
mpl$lab$app$MouseTracker.prototype.startDrag = function(a) {
    this.ehDrag_ = null != this.eventHandler_ ? this.eventHandler_.startDrag(this.dragSimObj_, this.loc_sim_, this.dragOffset_, this.drag_body_, a) : !1
}
;
mpl$lab$app$MouseTracker.prototype.mouseDrag = function(a, b) {
    this.loc_sim_ = this.view_.getCoordMap().screenToSim(a);
    null == this.dragDispObj_ || null != this.dragSimObj_ && this.ehDrag_ ? null != this.eventHandler_ && this.ehDrag_ && this.eventHandler_.mouseDrag(this.dragSimObj_, this.loc_sim_, this.dragOffset_, b) : this.dragDispObj_.setPosition(this.loc_sim_.subtract(this.dragOffset_))
}
;
mpl$lab$app$MouseTracker.prototype.finishDrag = function() {
    null != this.eventHandler_ && this.eventHandler_.finishDrag(this.dragSimObj_, this.loc_sim_, this.dragOffset_)
}
;
mpl$lab$app$MouseTracker.findNearestDragable = function(a, b, c) {
    var d = null
      , e = null
      , f = mpl$lab$util$Util.POSITIVE_INFINITY
      , g = a.getViews()
      , h = g.length - 1;
    a: for (; 0 <= h; h--) {
        var k = g[h]
          , l = k.getCoordMap()
          , m = l.screenToSim(b)
          , n = k.getDisplayList().toArray()
          , p = n.length - 1;
        b: for (; 0 <= p; p--) {
            var q = n[p];
            if (!q.isDragable())
                continue b;
            var r = q.getMassObjects();
            if (!(1 < r.length))
                if (0 == r.length) {
                    if (q.contains(m)) {
                        d = q;
                        var t = k;
                        var u = m;
                        e = mpl$lab$util$Vector.ORIGIN;
                        break a
                    }
                } else {
                    r = r[0];
                    for (var x = r.getDragPoints(), v = x.length - 1; 0 <= v; v--) {
                        var w = r.bodyToWorld(x[v]);
                        w = b.distanceTo(l.simToScreen(w));
                        w <= f && (f = w,
                        d = q,
                        t = k,
                        e = x[v],
                        u = m)
                    }
                }
        }
    }
    if (null == d) {
        a = a.getFocusView();
        if (null != a)
            t = a,
            u = t.getCoordMap().screenToSim(b);
        else
            return null;
        if (null == c)
            return null
    }
    return goog.isDef(t) && goog.isDef(u) ? new mpl$lab$app$MouseTracker(d,t,u,e,c) : null
}
;
var mpl$lab$app$ViewPanner = function(a, b) {
    this.view_ = a;
    this.panMap_ = a.getCoordMap();
    a = a.getSimRect();
    this.center_screen_ = this.panMap_.simToScreen(a.getCenter());
    this.start_screen_ = b
};
mpl$lab$app$ViewPanner.prototype.mouseDrag = function(a) {
    a = this.start_screen_.subtract(a);
    a = this.panMap_.screenToSim(this.center_screen_.add(a));
    var b = this.view_.getSimRect();
    a = mpl$lab$util$DoubleRect.makeCentered(a, b.getWidth(), b.getHeight());
    this.view_.setSimRect(a)
}
;
mpl$lab$app$ViewPanner.prototype.finishDrag = function() {}
;
var mpl$lab$app$SimController = function(a, b, c) {
    this.labCanvas_ = a;
    this.eventHandler_ = b || null;
    this.enablePanning_ = !goog.isNull(c);
    this.panControl_ = goog.isDefAndNotNull(c) ? 1 == c.control : !1;
    this.panMeta_ = goog.isDefAndNotNull(c) ? 1 == c.meta : !1;
    this.panShift_ = goog.isDefAndNotNull(c) ? 1 == c.shift : !1;
    this.panAlt_ = goog.isDefAndNotNull(c) ? 1 == c.alt : !0;
    this.mouseDrag_ = !1;
    this.myViewPanner_ = this.mouseTracker_ = null;
    this.debug_ = !1;
    this.mouseDownKey_ = goog.events.listen(a.getCanvas(), goog.events.EventType.MOUSEDOWN, this.mouseDown, !1, this);
    this.mouseMoveKey_ = goog.events.listen(document, goog.events.EventType.MOUSEMOVE, this.mouseMove, !1, this);
    this.mouseUpKey_ = goog.events.listen(document, goog.events.EventType.MOUSEUP, this.mouseUp, !1, this);
    this.keyDownKey_ = goog.events.listen(document, goog.events.EventType.KEYDOWN, this.keyPressed, !1, this);
    this.keyUpKey_ = goog.events.listen(document, goog.events.EventType.KEYUP, this.keyReleased, !1, this);
    this.touchStartKey_ = goog.events.listen(document, goog.events.EventType.TOUCHSTART, this.touchStart, !1, this);
    this.touchMoveKey_ = goog.events.listen(document, goog.events.EventType.TOUCHMOVE, this.touchMove, !1, this);
    this.touchEndKey_ = goog.events.listen(document, goog.events.EventType.TOUCHEND, this.touchEnd, !1, this)
};
mpl$lab$app$SimController.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", labCanvas_: " + this.labCanvas_.toStringShort() + ", enablePanning_: " + this.enablePanning_ + ", panControl_: " + this.panControl_ + ", panMeta_: " + this.panMeta_ + ", panShift_: " + this.panShift_ + ", panAlt_: " + this.panAlt_ + "}"
}
;
mpl$lab$app$SimController.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "SimController{eventHandler_: " + (null != this.eventHandler_ ? this.eventHandler_.toStringShort() : "null") + "}"
}
;
mpl$lab$app$SimController.prototype.notifyError = function(a) {
    this.mouseDrag_ && this.finishDrag()
}
;
mpl$lab$app$SimController.prototype.destroy = function() {
    goog.events.unlistenByKey(this.mouseDownKey_);
    goog.events.unlistenByKey(this.mouseMoveKey_);
    goog.events.unlistenByKey(this.mouseUpKey_);
    goog.events.unlistenByKey(this.keyDownKey_);
    goog.events.unlistenByKey(this.keyUpKey_);
    goog.events.unlistenByKey(this.touchStartKey_);
    goog.events.unlistenByKey(this.touchMoveKey_);
    goog.events.unlistenByKey(this.touchEndKey_)
}
;
mpl$lab$app$SimController.prototype.mouseDown = function(a) {
    this.doMouseDown(a, a.clientX, a.clientY)
}
;
mpl$lab$app$SimController.prototype.doMouseDown = function(a, b, c) {
    a.target != this.labCanvas_.getCanvas() ? goog.asserts.assert(!1) : (this.labCanvas_.focus(),
    this.mouseDrag_ = !0,
    b = this.eventToScreen(b, c),
    this.enablePanning_ && this.panControl_ == a.ctrlKey && this.panMeta_ == a.metaKey && this.panShift_ == a.shiftKey && this.panAlt_ == a.altKey ? (a = this.labCanvas_.getFocusView(),
    null != a && (this.myViewPanner_ = new mpl$lab$app$ViewPanner(a,b),
    this.myViewPanner_.mouseDrag(b))) : (this.mouseTracker_ = mpl$lab$app$MouseTracker.findNearestDragable(this.labCanvas_, b, this.eventHandler_),
    null != this.mouseTracker_ && this.mouseTracker_.startDrag(a)))
}
;
mpl$lab$app$SimController.prototype.eventToScreen = function(a, b) {
    var c = this.labCanvas_.getCanvas()
      , d = c.getBoundingClientRect();
    a = new mpl$lab$util$Vector(a - d.left,b - d.top);
    c = c.offsetWidth / this.labCanvas_.getWidth();
    return a.divide(c)
}
;
mpl$lab$app$SimController.prototype.mouseMove = function(a) {
    this.doMouseMove(a, a.clientX, a.clientY)
}
;
mpl$lab$app$SimController.prototype.doMouseMove = function(a, b, c) {
    var d = this.labCanvas_.getCanvas();
    null != d.offsetParent && (b = this.eventToScreen(b, c),
    (a.target == d || a.target == document.body) && this.mouseDrag_ && a.preventDefault(),
    null != this.myViewPanner_ ? this.myViewPanner_.mouseDrag(b) : null != this.mouseTracker_ && this.mouseTracker_.mouseDrag(b, a))
}
;
mpl$lab$app$SimController.prototype.mouseUp = function(a) {
    var b = this.labCanvas_.getCanvas();
    null != b.offsetParent && ((a.target == b || a.target == document.body) && this.mouseDrag_ && a.preventDefault(),
    this.finishDrag())
}
;
mpl$lab$app$SimController.prototype.finishDrag = function() {
    null != this.myViewPanner_ ? this.myViewPanner_.finishDrag() : null != this.mouseTracker_ && this.mouseTracker_.finishDrag();
    this.myViewPanner_ = this.mouseTracker_ = null;
    this.mouseDrag_ = !1
}
;
mpl$lab$app$SimController.prototype.keyPressed = function(a) {
    a.target != this.labCanvas_.getCanvas() && a.target != document.body || null == this.eventHandler_ || (mpl$lab$util$Util.DEBUG && this.debug_ && console.log("keyPressed " + mpl$lab$util$Util.propertiesOf(a, !0)),
    this.eventHandler_.handleKeyEvent(a.keyCode, !0, a))
}
;
mpl$lab$app$SimController.prototype.keyReleased = function(a) {
    a.target != this.labCanvas_.getCanvas() && a.target != document.body || null == this.eventHandler_ || (mpl$lab$util$Util.DEBUG && this.debug_ && console.log("keyReleased " + mpl$lab$util$Util.propertiesOf(a, !0)),
    this.eventHandler_.handleKeyEvent(a.keyCode, !1, a))
}
;
mpl$lab$app$SimController.prototype.touchStart = function(a) {
    if (a.target == this.labCanvas_.getCanvas()) {
        var b = a.getBrowserEvent();
        null != b && ((b = b.touches) && 1 == b.length ? this.doMouseDown(a, b[0].clientX, b[0].clientY) : this.finishDrag())
    }
}
;
mpl$lab$app$SimController.prototype.touchMove = function(a) {
    var b = a.getBrowserEvent();
    b = goog.isDefAndNotNull(b) ? b.touches : [];
    this.mouseDrag_ && b && 1 == b.length ? this.doMouseMove(a, b[0].clientX, b[0].clientY) : this.finishDrag()
}
;
mpl$lab$app$SimController.prototype.touchEnd = function(a) {
    this.mouseDrag_ && this.mouseUp(a)
}
;
mpl$lab$app$SimController.modifierToString = function(a) {
    var b = "";
    1 == a.control && (b += "control");
    1 == a.alt && (b += (0 < b.length ? "+" : "") + "alt");
    1 == a.meta && (b += (0 < b.length ? "+" : "") + "meta");
    1 == a.shift && (b += (0 < b.length ? "+" : "") + "shift");
    return b
}
;
mpl$lab$app$SimController.modifierMatchesEvent = function(a, b) {
    return 1 == a.control != b.ctrlKey || 1 == a.alt != b.altKey || 1 == a.meta != b.metaKey || 1 == a.shift != b.shiftKey ? !1 : !0
}
;
var mpl$lab$controls$SliderControl = function(a, b, c, d, e) {
    this.parameter_ = a;
    this.min_ = b;
    var f = a.getLowerLimit();
    if (f > b)
        throw Error("lower limit on slider =" + mpl$lab$util$Util.NF(b) + " is less than parameter lower limit =" + mpl$lab$util$Util.NF(f));
    this.max_ = c;
    if (b >= c)
        throw Error("min >= max");
    f = a.getUpperLimit();
    if (f < c)
        throw Error("upper limit on slider =" + mpl$lab$util$Util.NF(c) + " is greater than parameter upper limit =" + mpl$lab$util$Util.NF(f));
    this.increments_ = e || 100;
    if (2 > e)
        throw Error("increments < 2");
    this.multiply_ = 1 == d;
    if (d && 0 >= b)
        throw Error("slider cannot have min <= 0 and also exponential scale");
    this.delta_ = mpl$lab$controls$SliderControl.rangeToDelta(b, c, this.increments_, this.multiply_);
    this.signifDigits_ = a.getSignifDigits();
    this.decimalPlaces_ = a.getDecimalPlaces();
    this.columns_ = Math.max(8, 1 + this.signifDigits_);
    this.paramValue_ = a.getValue();
    goog.asserts.assert(goog.isNumber(this.paramValue_));
    this.slider_ = document.createElement("input");
    this.slider_.type = "range";
    if ("text" == this.slider_.type)
        throw Error("cannot make slider");
    this.slider_.min = "0";
    this.slider_.max = String(this.increments_);
    this.slider_.step = "1";
    this.slider_.value = String(this.valueToIncrement(this.paramValue_));
    this.sliderValue_ = this.incrementToValue(Number(this.slider_.value));
    this.textField_ = document.createElement("input");
    this.textField_.type = "text";
    this.textField_.size = this.columns_;
    this.label_ = document.createElement("DIV");
    this.label_.className = "slider";
    this.label_.appendChild(document.createTextNode(a.getName(!0)));
    this.label_.appendChild(this.slider_);
    this.label_.appendChild(this.textField_);
    this.textboxValue_ = "";
    this.textField_.textAlign = "right";
    this.sliderKey_ = goog.events.listen(this.slider_, goog.events.EventType.INPUT, this.sliderChange, !0, this);
    this.sliderKey2_ = goog.events.listen(this.slider_, goog.events.EventType.CHANGE, this.sliderChange, !0, this);
    this.clickKey2_ = goog.events.listen(this.slider_, goog.events.EventType.CLICK, this.doClick2, !0, this);
    this.changeKey_ = goog.events.listen(this.textField_, goog.events.EventType.CHANGE, this.validateText, !0, this);
    this.focusKey_ = goog.events.listen(this.textField_, goog.events.EventType.FOCUS, this.gainFocus, !1, this);
    this.clickKey_ = goog.events.listen(this.textField_, goog.events.EventType.CLICK, this.doClick, !0, this);
    this.firstClick_ = !1;
    this.formatTextField();
    this.parameter_.getSubject().addObserver(this)
};
mpl$lab$controls$SliderControl.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", paramValue_: " + mpl$lab$util$Util.NF(this.paramValue_) + ", sliderValue_: " + mpl$lab$util$Util.NF(this.sliderValue_) + ", slider_.value: " + this.slider_.value + ", textboxValue_: " + this.textboxValue_ + ", min_: " + mpl$lab$util$Util.NF(this.min_) + ", max_: " + mpl$lab$util$Util.NF(this.max_) + ", increments_: " + this.increments_ + ", delta_: " + mpl$lab$util$Util.NF(this.delta_) + ", multiply_: " + this.multiply_ + ", signifDigits_: " + this.signifDigits_ + ", decimalPlaces_: " + this.decimalPlaces_ + ", columns_: " + this.columns_ + "}"
}
;
mpl$lab$controls$SliderControl.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "SliderControl{parameter: " + this.parameter_.toStringShort() + "}"
}
;
mpl$lab$controls$SliderControl.prototype.columnsNeeded = function(a, b) {
    var c = mpl$lab$controls$SliderControl.magnitude(a);
    return 2 + this.decimalPlacesNeeded(a, b) + (0 < c ? c : 0)
}
;
mpl$lab$controls$SliderControl.prototype.decimalPlacesNeeded = function(a, b) {
    if (-1 < this.decimalPlaces_)
        return this.decimalPlaces_;
    a = b - 1 - mpl$lab$controls$SliderControl.magnitude(a);
    16 < a && (a = 16);
    return 0 < a ? a : 0
}
;
mpl$lab$controls$SliderControl.prototype.disconnect = function() {
    this.parameter_.getSubject().removeObserver(this);
    goog.events.unlistenByKey(this.sliderKey_);
    goog.events.unlistenByKey(this.sliderKey2_);
    goog.events.unlistenByKey(this.changeKey_);
    goog.events.unlistenByKey(this.clickKey_);
    goog.events.unlistenByKey(this.clickKey2_);
    goog.events.unlistenByKey(this.focusKey_)
}
;
mpl$lab$controls$SliderControl.prototype.doClick = function(a) {
    this.firstClick_ && (this.textField_.select(),
    this.firstClick_ = !1)
}
;
mpl$lab$controls$SliderControl.prototype.doClick2 = function(a) {
    this.slider_.focus()
}
;
mpl$lab$controls$SliderControl.prototype.formatTextField = function() {
    var a = this.decimalPlacesNeeded(this.paramValue_, this.signifDigits_)
      , b = this.columnsNeeded(this.paramValue_, this.signifDigits_);
    this.textboxValue_ = this.paramValue_.toFixed(a);
    this.textField_.value = this.textboxValue_;
    b != this.columns_ && (this.columns_ = b,
    this.textField_.size = this.columns_)
}
;
mpl$lab$controls$SliderControl.prototype.gainFocus = function(a) {
    this.firstClick_ = !0
}
;
mpl$lab$controls$SliderControl.prototype.getDecimalPlaces = function() {
    return this.decimalPlaces_
}
;
mpl$lab$controls$SliderControl.prototype.getElement = function() {
    return this.label_
}
;
mpl$lab$controls$SliderControl.prototype.getParameter = function() {
    return this.parameter_
}
;
mpl$lab$controls$SliderControl.prototype.getSignifDigits = function() {
    return this.signifDigits_
}
;
mpl$lab$controls$SliderControl.prototype.getValue = function() {
    return this.paramValue_
}
;
mpl$lab$controls$SliderControl.prototype.incrementToValue = function(a) {
    return this.multiply_ ? this.min_ * Math.pow(this.delta_, a) : this.min_ + a * this.delta_
}
;
mpl$lab$controls$SliderControl.magnitude = function(a) {
    return 1E-15 > Math.abs(a) ? 0 : Math.floor(Math.LOG10E * Math.log(Math.abs(a)))
}
;
mpl$lab$controls$SliderControl.prototype.observe = function(a) {
    a == this.parameter_ && this.setValue(this.parameter_.getValue())
}
;
mpl$lab$controls$SliderControl.rangeToDelta = function(a, b, c, d) {
    return d ? Math.exp((Math.log(b) - Math.log(a)) / c) : (b - a) / c
}
;
mpl$lab$controls$SliderControl.prototype.setDecimalPlaces = function(a) {
    this.decimalPlaces_ != a && (this.decimalPlaces_ = -1 < a ? a : -1,
    this.formatTextField());
    return this
}
;
mpl$lab$controls$SliderControl.prototype.setEnabled = function(a) {
    this.textField_.disabled = !a
}
;
mpl$lab$controls$SliderControl.prototype.setSignifDigits = function(a) {
    this.signifDigits_ != a && (this.signifDigits_ = a,
    this.formatTextField());
    return this
}
;
mpl$lab$controls$SliderControl.prototype.setValue = function(a) {
    if (a != this.paramValue_) {
        if (isNaN(a))
            throw Error("not a number: " + a);
        try {
            this.paramValue_ = a,
            this.parameter_.setValue(a)
        } catch (b) {
            alert(b),
            this.paramValue_ = this.parameter_.getValue()
        }
        this.formatTextField();
        a = this.valueToIncrement(this.paramValue_);
        this.sliderValue_ = this.incrementToValue(a);
        this.slider_.value = String(a)
    }
}
;
mpl$lab$controls$SliderControl.prototype.sliderChange = function(a) {
    a = this.incrementToValue(Number(this.slider_.value));
    mpl$lab$util$Util.veryDifferent(a, this.sliderValue_) && this.setValue(a)
}
;
mpl$lab$controls$SliderControl.prototype.validateText = function(a) {
    a = this.textField_.value.trim();
    if (a != this.textboxValue_) {
        var b = parseFloat(a);
        isNaN(b) ? (alert("not a number: " + a),
        this.formatTextField()) : this.setValue(b)
    }
}
;
mpl$lab$controls$SliderControl.prototype.valueToIncrement = function(a) {
    return this.multiply_ ? Math.floor(.5 + (Math.log(a) - Math.log(this.min_)) / Math.log(this.delta_)) : Math.floor(.5 + (a - this.min_) / this.delta_)
}
;
var mpl$lab$graph$DisplayGraph = function(a) {
    if (goog.isDef(a) && !mpl$lab$graph$GraphLine.isDuckType(a))
        throw Error("not a GraphLine " + a);
    this.graphLines_ = goog.isDef(a) ? [a] : [];
    this.memDraw_ = goog.array.repeat(-1, this.graphLines_.length);
    this.lastMap_ = this.offScreen_ = null;
    this.screenRect_ = mpl$lab$view$ScreenRect.EMPTY_RECT;
    this.needRedraw_ = !1;
    this.useBuffer_ = !0;
    this.zIndex = 0
};
mpl$lab$graph$DisplayGraph.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", screenRect_: " + this.screenRect_ + ", useBuffer_: " + this.useBuffer_ + ", zIndex: " + this.zIndex + ", graphLines_: [" + goog.array.map(this.graphLines_, function(a) {
        return a.toStringShort()
    }) + "]}"
}
;
mpl$lab$graph$DisplayGraph.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DisplayGraph{graphLines_.length: " + this.graphLines_.length + "}"
}
;
mpl$lab$graph$DisplayGraph.prototype.addGraphLine = function(a) {
    if (mpl$lab$graph$GraphLine.isDuckType(a))
        goog.array.contains(this.graphLines_, a) || (this.graphLines_.push(a),
        this.memDraw_.push(-1));
    else
        throw Error("not a GraphLine " + a);
}
;
mpl$lab$graph$DisplayGraph.prototype.contains = function(a) {
    return !1
}
;
mpl$lab$graph$DisplayGraph.prototype.draw = function(a, b) {
    if (this.screenRect_.isEmpty())
        mpl$lab$util$Util.DEBUG && console.log("DisplayGraph: screenRect is empty");
    else {
        a.save();
        if (null == this.lastMap_ || this.lastMap_ != b)
            this.lastMap_ = b,
            this.needRedraw_ = !0;
        for (var c = 0, d = this.graphLines_.length; c < d; c++)
            if (this.memDraw_[c] > this.graphLines_[c].getGraphPoints().getEndIndex()) {
                this.reset();
                break
            }
        if (this.useBuffer_) {
            c = this.screenRect_.getWidth();
            d = this.screenRect_.getHeight();
            null == this.offScreen_ && (goog.asserts.assert(0 < c && 0 < d),
            this.offScreen_ = document.createElement("canvas"),
            this.offScreen_.width = c,
            this.offScreen_.height = d,
            this.needRedraw_ = !0);
            goog.asserts.assertObject(this.offScreen_);
            var e = this.offScreen_.getContext("2d");
            goog.asserts.assertObject(e);
            this.needRedraw_ ? (e.clearRect(0, 0, c, d),
            this.fullDraw(e, b),
            this.needRedraw_ = !1) : this.incrementalDraw(e, b);
            a.drawImage(this.offScreen_, 0, 0, c, d)
        } else
            this.needRedraw_ = !0,
            this.fullDraw(a, b),
            this.needRedraw_ = !1;
        c = 0;
        for (d = this.graphLines_.length; c < d; c++)
            this.drawHotSpot(a, b, this.graphLines_[c]);
        a.restore()
    }
}
;
mpl$lab$graph$DisplayGraph.prototype.drawHotSpot = function(a, b, c) {
    var d = c.getGraphPoints().getEndValue();
    if (null != d) {
        var e = b.simToScreenX(d.getX());
        b = b.simToScreenY(d.getY());
        if (c = c.getHotSpotColor())
            a.fillStyle = c,
            a.fillRect(e - 2, b - 2, 5, 5)
    }
}
;
mpl$lab$graph$DisplayGraph.prototype.drawPoints = function(a, b, c, d) {
    var e = b.screenToSimRect(this.screenRect_)
      , f = d.getGraphPoints().getIterator(c);
    if (!f.hasNext())
        return c;
    c = f.nextValue();
    var g = d.getGraphStyle(f.getIndex());
    if (g.drawMode == mpl$lab$view$DrawingMode.DOTS) {
        var h = b.simToScreenX(c.x)
          , k = b.simToScreenY(c.y)
          , l = g.lineWidth;
        a.fillStyle = g.color_;
        a.fillRect(h, k, l, l)
    }
    for (; f.hasNext(); )
        if (k = c,
        c = f.nextValue(),
        c.x != k.x || c.y != k.y)
            if (g = d.getGraphStyle(f.getIndex()),
            h = c.seqX == k.seqX && c.seqY == k.seqY,
            g.drawMode != mpl$lab$view$DrawingMode.DOTS && h) {
                if (e.maybeVisible(k, c)) {
                    h = b.simToScreenX(k.x);
                    k = b.simToScreenY(k.y);
                    l = b.simToScreenX(c.x);
                    var m = b.simToScreenY(c.y);
                    a.strokeStyle = g.color_;
                    a.lineWidth = g.lineWidth;
                    a.beginPath();
                    a.moveTo(h, k);
                    a.lineTo(l, m);
                    a.stroke()
                }
            } else
                e.contains(c) && (h = b.simToScreenX(c.x),
                k = b.simToScreenY(c.y),
                l = g.lineWidth,
                a.fillStyle = g.color_,
                a.fillRect(h, k, l, l));
    return f.getIndex()
}
;
mpl$lab$graph$DisplayGraph.prototype.fullDraw = function(a, b) {
    this.memDraw_ = goog.array.repeat(-1, this.graphLines_.length);
    this.incrementalDraw(a, b)
}
;
mpl$lab$graph$DisplayGraph.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$graph$DisplayGraph.prototype.getPosition = function() {
    return mpl$lab$util$Vector.ORIGIN
}
;
mpl$lab$graph$DisplayGraph.prototype.getScreenRect = function() {
    return this.screenRect_
}
;
mpl$lab$graph$DisplayGraph.prototype.getSimObjects = function() {
    return []
}
;
mpl$lab$graph$DisplayGraph.prototype.getUseBuffer = function() {
    return this.useBuffer_
}
;
mpl$lab$graph$DisplayGraph.prototype.getZIndex = function() {
    return this.zIndex
}
;
mpl$lab$graph$DisplayGraph.prototype.incrementalDraw = function(a, b) {
    for (var c = 0, d = this.graphLines_.length; c < d; c++)
        this.memDraw_[c] = this.drawPoints(a, b, this.memDraw_[c], this.graphLines_[c])
}
;
mpl$lab$graph$DisplayGraph.prototype.isDragable = function() {
    return !1
}
;
mpl$lab$graph$DisplayGraph.prototype.removeGraphLine = function(a) {
    if (mpl$lab$graph$GraphLine.isDuckType(a)) {
        var b = goog.array.indexOf(this.graphLines_, a);
        goog.array.removeAt(this.graphLines_, b);
        goog.array.removeAt(this.memDraw_, b);
        goog.asserts.assert(!goog.array.contains(this.graphLines_, a));
        this.needRedraw_ = !0
    } else
        throw Error("not a GraphLine " + a);
}
;
mpl$lab$graph$DisplayGraph.prototype.reset = function() {
    this.memDraw_ = goog.array.repeat(-1, this.graphLines_.length);
    this.needRedraw_ = !0
}
;
mpl$lab$graph$DisplayGraph.prototype.setDragable = function(a) {}
;
mpl$lab$graph$DisplayGraph.prototype.setPosition = function(a) {}
;
mpl$lab$graph$DisplayGraph.prototype.setScreenRect = function(a) {
    this.screenRect_ = a;
    this.offScreen_ = null
}
;
mpl$lab$graph$DisplayGraph.prototype.setUseBuffer = function(a) {
    this.useBuffer_ = a;
    this.useBuffer_ || (this.offScreen_ = null)
}
;
mpl$lab$graph$DisplayGraph.prototype.setZIndex = function(a) {
    this.zIndex = goog.isDef(a) ? a : 0
}
;
var mpl$lab$graph$GraphColor = {
    AQUA: "aqua",
    BLACK: "black",
    BLUE: "blue",
    FUCHSIA: "fuchsia",
    GRAY: "gray",
    GREEN: "green",
    LIME: "lime",
    MAROON: "maroon",
    NAVY: "navy",
    OLIVE: "olive",
    PURPLE: "purple",
    RED: "red",
    SILVER: "silver",
    TEAL: "teal",
    WHITE: "white",
    YELLOW: "yellow",
    getChoices: function() {
        return [mpl$lab$graph$GraphColor.i18n.AQUA, mpl$lab$graph$GraphColor.i18n.BLACK, mpl$lab$graph$GraphColor.i18n.BLUE, mpl$lab$graph$GraphColor.i18n.FUCHSIA, mpl$lab$graph$GraphColor.i18n.GRAY, mpl$lab$graph$GraphColor.i18n.GREEN, mpl$lab$graph$GraphColor.i18n.LIME, mpl$lab$graph$GraphColor.i18n.MAROON, mpl$lab$graph$GraphColor.i18n.NAVY, mpl$lab$graph$GraphColor.i18n.OLIVE, mpl$lab$graph$GraphColor.i18n.PURPLE, mpl$lab$graph$GraphColor.i18n.RED, mpl$lab$graph$GraphColor.i18n.SILVER, mpl$lab$graph$GraphColor.i18n.TEAL, mpl$lab$graph$GraphColor.i18n.WHITE, mpl$lab$graph$GraphColor.i18n.YELLOW]
    },
    getValues: function() {
        return [mpl$lab$graph$GraphColor.AQUA, mpl$lab$graph$GraphColor.BLACK, mpl$lab$graph$GraphColor.BLUE, mpl$lab$graph$GraphColor.FUCHSIA, mpl$lab$graph$GraphColor.GRAY, mpl$lab$graph$GraphColor.GREEN, mpl$lab$graph$GraphColor.LIME, mpl$lab$graph$GraphColor.MAROON, mpl$lab$graph$GraphColor.NAVY, mpl$lab$graph$GraphColor.OLIVE, mpl$lab$graph$GraphColor.PURPLE, mpl$lab$graph$GraphColor.RED, mpl$lab$graph$GraphColor.SILVER, mpl$lab$graph$GraphColor.TEAL, mpl$lab$graph$GraphColor.WHITE, mpl$lab$graph$GraphColor.YELLOW]
    },
    stringToEnum: function(a) {
        for (var b = mpl$lab$graph$GraphColor.getValues(), c = 0, d = b.length; c < d; c++)
            if (a === b[c])
                return b[c];
        throw Error("not found " + a);
    },
    en: {
        AQUA: "aqua",
        BLACK: "black",
        BLUE: "blue",
        FUCHSIA: "fuchsia",
        GRAY: "gray",
        GREEN: "green",
        LIME: "lime",
        MAROON: "maroon",
        NAVY: "navy",
        OLIVE: "olive",
        PURPLE: "purple",
        RED: "red",
        SILVER: "silver",
        TEAL: "teal",
        WHITE: "white",
        YELLOW: "yellow"
    },
    de_strings: {
        AQUA: "Aquamarin",
        BLACK: "Schwarz",
        BLUE: "Blau",
        FUCHSIA: "Purpurrot",
        GRAY: "Grau",
        GREEN: "Gr\u00fcn",
        LIME: "Hellgr\u00fcn",
        MAROON: "Kastanienbraun",
        NAVY: "Marineblau",
        OLIVE: "Olivgr\u00fcn",
        PURPLE: "Purpur",
        RED: "Rot",
        SILVER: "Silber",
        TEAL: "Blaugr\u00fcn",
        WHITE: "Weiss",
        YELLOW: "Gelb"
    }
};
mpl$lab$graph$GraphColor.i18n = "de" === goog.LOCALE ? mpl$lab$graph$GraphColor.de_strings : mpl$lab$graph$GraphColor.en;
var mpl$lab$util$SubjectList = function(a) {};
mpl$lab$util$SubjectList.prototype.getSubjects = function() {}
;
var mpl$sims$common$StandardGraph1 = function(a, b, c, d, e, f) {
    mpl$lab$util$AbstractSubject.call(this, "GRAPH_LAYOUT");
    this.displayStyle = f || "block";
    this.canvas = b;
    e.addCanvas(b);
    this.view = new mpl$lab$view$SimView("X_Y_GRAPH_VIEW",new mpl$lab$util$DoubleRect(0,0,1,1));
    this.view.setHorizAlign(mpl$lab$view$HorizAlign.FULL);
    this.view.setVerticalAlign(mpl$lab$view$VerticalAlign.FULL);
    b.addView(this.view);
    this.displayList = this.view.getDisplayList();
    this.line = new mpl$lab$graph$GraphLine("X_Y_GRAPH_LINE",a);
    this.line.setXVariable(0);
    this.line.setYVariable(1);
    this.line.setColor("lime");
    this.view.addMemo(this.line);
    this.axes = mpl$sims$common$CommonControls.makeAxes(this.view);
    a = goog.bind(function(a) {
        a.nameEquals(mpl$lab$graph$GraphLine.en.X_VARIABLE) && this.axes.setHorizName(this.line.getXVarName());
        a.nameEquals(mpl$lab$graph$GraphLine.en.Y_VARIABLE) && this.axes.setVerticalName(this.line.getYVarName())
    }, this);
    new mpl$lab$util$GenericObserver(this.line,a,"update axes names");
    a(new mpl$lab$util$GenericEvent(this.line,mpl$lab$graph$GraphLine.i18n.X_VARIABLE));
    this.autoScale = new mpl$lab$graph$AutoScale("X_Y_AUTO_SCALE",this.line,this.view);
    this.autoScale.extraMargin = .05;
    this.displayGraph = new mpl$lab$graph$DisplayGraph(this.line);
    this.displayGraph.setScreenRect(this.view.getScreenRect());
    this.displayGraph.setUseBuffer(!0);
    this.displayList.prepend(this.displayGraph);
    new mpl$lab$util$GenericObserver(this.view,goog.bind(function(a) {
        a.nameEquals(mpl$lab$view$LabView.SCREEN_RECT_CHANGED) && this.displayGraph.setScreenRect(this.view.getScreenRect())
    }, this),"resize DisplayGraph");
    this.controls_ = [];
    this.div_controls = c;
    this.addControl(mpl$sims$common$CommonControls.makePlaybackControls(e));
    c = this.line.getParameterNumber(mpl$lab$graph$GraphLine.en.Y_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(c,"Y:"));
    c = this.line.getParameterNumber(mpl$lab$graph$GraphLine.en.X_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(c,"X:"));
    this.addControl(new mpl$lab$controls$ButtonControl(mpl$lab$graph$GraphLine.i18n.CLEAR_GRAPH,goog.bind(this.line.reset, this.line)));
    c = this.line.getParameterString(mpl$lab$graph$GraphLine.en.GRAPH_COLOR);
    this.addControl(new mpl$lab$controls$ChoiceControl(c,void 0,mpl$lab$graph$GraphColor.getChoices(),mpl$lab$graph$GraphColor.getValues()));
    c = this.line.getParameterNumber(mpl$lab$graph$GraphLine.en.LINE_WIDTH);
    this.addControl(new mpl$lab$controls$NumericControl(c));
    c = this.line.getParameterString(mpl$lab$graph$GraphLine.en.DRAWING_MODE);
    this.addControl(new mpl$lab$controls$ChoiceControl(c));
    this.graphCtrl = new mpl$lab$app$SimController(b,null,{
        alt: !1,
        control: !1,
        meta: !1,
        shift: !1
    });
    b = mpl$sims$common$CommonControls.makePanZoomControls(this.view, !0, goog.bind(function() {
        this.autoScale.setActive(!0)
    }, this));
    d.appendChild(b);
    d = mpl$sims$common$CommonControls.makeShowPanZoomParam(b, this);
    this.addControl(new mpl$lab$controls$CheckBoxControl(d))
};
$jscomp.inherits(mpl$sims$common$StandardGraph1, mpl$lab$util$AbstractSubject);
mpl$sims$common$StandardGraph1.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", canvas: " + this.canvas.toStringShort() + ", view: " + this.view.toStringShort() + ", line: " + this.line.toStringShort() + ", axes: " + this.axes.toStringShort() + ", autoScale: " + this.autoScale.toStringShort() + ", displayGraph: " + this.displayGraph.toStringShort() + ", graphCtrl: " + this.graphCtrl.toStringShort() + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$sims$common$StandardGraph1.prototype.getClassName = function() {
    return "StandardGraph1"
}
;
mpl$sims$common$StandardGraph1.prototype.getSubjects = function() {
    return [this, this.line, this.view, this.autoScale]
}
;
mpl$sims$common$StandardGraph1.prototype.addControl = function(a) {
    var b = a.getElement();
    b.style.display = this.displayStyle;
    this.div_controls.appendChild(b);
    this.controls_.push(a);
    return a
}
;
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
    return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
}
;
goog.dom.vendor.getVendorPrefix = function() {
    return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
}
;
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
    if (b && a in b)
        return a;
    var c = goog.dom.vendor.getVendorJsPrefix();
    return c ? (c = c.toLowerCase(),
    a = c + goog.string.toTitleCase(a),
    !goog.isDef(b) || a in b ? a : null) : null
}
;
goog.dom.vendor.getPrefixedEventType = function(a) {
    return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase()
}
;
goog.math.Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
}
;
goog.math.Box.boundingBox = function(a) {
    for (var b = new goog.math.Box(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x), c = 1; c < arguments.length; c++)
        b.expandToIncludeCoordinate(arguments[c]);
    return b
}
;
goog.math.Box.prototype.getWidth = function() {
    return this.right - this.left
}
;
goog.math.Box.prototype.getHeight = function() {
    return this.bottom - this.top
}
;
goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top,this.right,this.bottom,this.left)
}
;
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
    return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
}
);
goog.math.Box.prototype.contains = function(a) {
    return goog.math.Box.contains(this, a)
}
;
goog.math.Box.prototype.expand = function(a, b, c, d) {
    goog.isObject(a) ? (this.top -= a.top,
    this.right += a.right,
    this.bottom += a.bottom,
    this.left -= a.left) : (this.top -= a,
    this.right += Number(b),
    this.bottom += Number(c),
    this.left -= Number(d));
    return this
}
;
goog.math.Box.prototype.expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
}
;
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
    this.top = Math.min(this.top, a.y);
    this.right = Math.max(this.right, a.x);
    this.bottom = Math.max(this.bottom, a.y);
    this.left = Math.min(this.left, a.x)
}
;
goog.math.Box.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
}
;
goog.math.Box.contains = function(a, b) {
    return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
}
;
goog.math.Box.relativePositionX = function(a, b) {
    return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
}
;
goog.math.Box.relativePositionY = function(a, b) {
    return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
}
;
goog.math.Box.distance = function(a, b) {
    var c = goog.math.Box.relativePositionX(a, b);
    a = goog.math.Box.relativePositionY(a, b);
    return Math.sqrt(c * c + a * a)
}
;
goog.math.Box.intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
}
;
goog.math.Box.intersectsWithPadding = function(a, b, c) {
    return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
}
;
goog.math.Box.prototype.ceil = function() {
    this.top = Math.ceil(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
    this.left = Math.ceil(this.left);
    return this
}
;
goog.math.Box.prototype.floor = function() {
    this.top = Math.floor(this.top);
    this.right = Math.floor(this.right);
    this.bottom = Math.floor(this.bottom);
    this.left = Math.floor(this.left);
    return this
}
;
goog.math.Box.prototype.round = function() {
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
    this.left = Math.round(this.left);
    return this
}
;
goog.math.Box.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x,
    this.right += a.x,
    this.top += a.y,
    this.bottom += a.y) : (goog.asserts.assertNumber(a),
    this.left += a,
    this.right += a,
    goog.isNumber(b) && (this.top += b,
    this.bottom += b));
    return this
}
;
goog.math.Box.prototype.scale = function(a, b) {
    b = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.right *= a;
    this.top *= b;
    this.bottom *= b;
    return this
}
;
goog.math.IRect = function() {}
;
goog.math.Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
}
;
goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left,this.top,this.width,this.height)
}
;
goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top,this.left + this.width,this.top + this.height,this.left)
}
;
goog.math.Rect.createFromPositionAndSize = function(a, b) {
    return new goog.math.Rect(a.x,a.y,b.width,b.height)
}
;
goog.math.Rect.createFromBox = function(a) {
    return new goog.math.Rect(a.left,a.top,a.right - a.left,a.bottom - a.top)
}
;
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
    return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
}
);
goog.math.Rect.equals = function(a, b) {
    return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
}
;
goog.math.Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left)
      , c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a)
            return this.left = b,
            this.top = d,
            this.width = c - b,
            this.height = a - d,
            !0
    }
    return !1
}
;
goog.math.Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left)
      , d = Math.min(a.left + a.width, b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top);
        a = Math.min(a.top + a.height, b.top + b.height);
        if (e <= a)
            return new goog.math.Rect(c,e,d - c,a - e)
    }
    return null
}
;
goog.math.Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
}
;
goog.math.Rect.prototype.intersects = function(a) {
    return goog.math.Rect.intersects(this, a)
}
;
goog.math.Rect.difference = function(a, b) {
    var c = goog.math.Rect.intersection(a, b);
    if (!c || !c.height || !c.width)
        return [a.clone()];
    c = [];
    var d = a.top
      , e = a.height
      , f = a.left + a.width
      , g = a.top + a.height
      , h = b.width
      , k = b.top + b.height;
    b.top > a.top && (c.push(new goog.math.Rect(a.left,a.top,a.width,b.top - a.top)),
    d = b.top,
    e -= b.top - a.top);
    k < g && (c.push(new goog.math.Rect(a.left,k,a.width,g - k)),
    e = k - d);
    b.left > a.left && c.push(new goog.math.Rect(a.left,d,b.left - a.left,e));
    h < f && c.push(new goog.math.Rect(h,d,f - h,e));
    return c
}
;
goog.math.Rect.prototype.difference = function(a) {
    return goog.math.Rect.difference(this, a)
}
;
goog.math.Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width)
      , c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
}
;
goog.math.Rect.boundingRect = function(a, b) {
    if (!a || !b)
        return null;
    a = new goog.math.Rect(a.left,a.top,a.width,a.height);
    a.boundingRect(b);
    return a
}
;
goog.math.Rect.prototype.contains = function(a) {
    return a instanceof goog.math.Coordinate ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
}
;
goog.math.Rect.prototype.squaredDistance = function(a) {
    var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
    a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
    return b * b + a * a
}
;
goog.math.Rect.prototype.distance = function(a) {
    return Math.sqrt(this.squaredDistance(a))
}
;
goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width,this.height)
}
;
goog.math.Rect.prototype.getTopLeft = function() {
    return new goog.math.Coordinate(this.left,this.top)
}
;
goog.math.Rect.prototype.getCenter = function() {
    return new goog.math.Coordinate(this.left + this.width / 2,this.top + this.height / 2)
}
;
goog.math.Rect.prototype.getBottomRight = function() {
    return new goog.math.Coordinate(this.left + this.width,this.top + this.height)
}
;
goog.math.Rect.prototype.ceil = function() {
    this.left = Math.ceil(this.left);
    this.top = Math.ceil(this.top);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
}
;
goog.math.Rect.prototype.floor = function() {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
}
;
goog.math.Rect.prototype.round = function() {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
}
;
goog.math.Rect.prototype.translate = function(a, b) {
    a instanceof goog.math.Coordinate ? (this.left += a.x,
    this.top += a.y) : (this.left += goog.asserts.assertNumber(a),
    goog.isNumber(b) && (this.top += b));
    return this
}
;
goog.math.Rect.prototype.scale = function(a, b) {
    b = goog.isNumber(b) ? b : a;
    this.left *= a;
    this.width *= a;
    this.top *= b;
    this.height *= b;
    return this
}
;
goog.style = {};
goog.style.setStyle = function(a, b, c) {
    if (goog.isString(b))
        goog.style.setStyle_(a, c, b);
    else
        for (var d in b)
            goog.style.setStyle_(a, b[d], d)
}
;
goog.style.setStyle_ = function(a, b, c) {
    (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
}
;
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
    var c = goog.style.styleNameCache_[b];
    if (!c) {
        var d = goog.string.toCamelCase(b);
        c = d;
        void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d),
        void 0 !== a.style[d] && (c = d));
        goog.style.styleNameCache_[b] = c
    }
    return c
}
;
goog.style.getVendorStyleName_ = function(a, b) {
    var c = goog.string.toCamelCase(b);
    return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c),
    void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
}
;
goog.style.getStyle = function(a, b) {
    var c = a.style[goog.string.toCamelCase(b)];
    return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
}
;
goog.style.getComputedStyle = function(a, b) {
    var c = goog.dom.getOwnerDocument(a);
    return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
}
;
goog.style.getCascadedStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : null
}
;
goog.style.getStyle_ = function(a, b) {
    return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
}
;
goog.style.getComputedBoxSizing = function(a) {
    return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null
}
;
goog.style.getComputedPosition = function(a) {
    return goog.style.getStyle_(a, "position")
}
;
goog.style.getBackgroundColor = function(a) {
    return goog.style.getStyle_(a, "backgroundColor")
}
;
goog.style.getComputedOverflowX = function(a) {
    return goog.style.getStyle_(a, "overflowX")
}
;
goog.style.getComputedOverflowY = function(a) {
    return goog.style.getStyle_(a, "overflowY")
}
;
goog.style.getComputedZIndex = function(a) {
    return goog.style.getStyle_(a, "zIndex")
}
;
goog.style.getComputedTextAlign = function(a) {
    return goog.style.getStyle_(a, "textAlign")
}
;
goog.style.getComputedCursor = function(a) {
    return goog.style.getStyle_(a, "cursor")
}
;
goog.style.getComputedTransform = function(a) {
    var b = goog.style.getVendorStyleName_(a, "transform");
    return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform")
}
;
goog.style.setPosition = function(a, b, c) {
    if (b instanceof goog.math.Coordinate) {
        var d = b.x;
        b = b.y
    } else
        d = b,
        b = c;
    a.style.left = goog.style.getPixelStyleValue_(d, !1);
    a.style.top = goog.style.getPixelStyleValue_(b, !1)
}
;
goog.style.getPosition = function(a) {
    return new goog.math.Coordinate(a.offsetLeft,a.offsetTop)
}
;
goog.style.getClientViewportElement = function(a) {
    a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
    return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body
}
;
goog.style.getViewportPageOffset = function(a) {
    var b = a.body;
    a = a.documentElement;
    return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft,b.scrollTop || a.scrollTop)
}
;
goog.style.getBoundingClientRect_ = function(a) {
    try {
        var b = a.getBoundingClientRect()
    } catch (c) {
        return {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }
    }
    goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument,
    b.left -= a.documentElement.clientLeft + a.body.clientLeft,
    b.top -= a.documentElement.clientTop + a.body.clientTop);
    return b
}
;
goog.style.getOffsetParent = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8))
        return goog.asserts.assert(a && "offsetParent"in a),
        a.offsetParent;
    var b = goog.dom.getOwnerDocument(a)
      , c = goog.style.getStyle_(a, "position")
      , d = "fixed" == c || "absolute" == c;
    for (a = a.parentNode; a && a != b; a = a.parentNode)
        if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host),
        c = goog.style.getStyle_(a, "position"),
        d = d && "static" == c && a != b.documentElement && a != b.body,
        !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))
            return a;
    return null
}
;
goog.style.getVisibleRectForElement = function(a) {
    for (var b = new goog.math.Box(0,Infinity,Infinity,0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a); )
        if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
            var g = goog.style.getPageOffset(a)
              , h = goog.style.getClientLeftTop(a);
            g.x += h.x;
            g.y += h.y;
            b.top = Math.max(b.top, g.y);
            b.right = Math.min(b.right, g.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
            b.left = Math.max(b.left, g.x)
        }
    d = f.scrollLeft;
    f = f.scrollTop;
    b.left = Math.max(b.left, d);
    b.top = Math.max(b.top, f);
    c = c.getViewportSize();
    b.right = Math.min(b.right, d + c.width);
    b.bottom = Math.min(b.bottom, f + c.height);
    return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
}
;
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
    var d = b || goog.dom.getDocumentScrollElement()
      , e = goog.style.getPageOffset(a)
      , f = goog.style.getPageOffset(d)
      , g = goog.style.getBorderBox(d);
    d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft,
    e = e.y - d.scrollTop,
    goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left,
    e += g.top)) : (b = e.x - f.x - g.left,
    e = e.y - f.y - g.top);
    g = goog.style.getSizeWithDisplay_(a);
    a = d.clientWidth - g.width;
    g = d.clientHeight - g.height;
    f = d.scrollLeft;
    d = d.scrollTop;
    c ? (f += b - a / 2,
    d += e - g / 2) : (f += Math.min(b, Math.max(b - a, 0)),
    d += Math.min(e, Math.max(e - g, 0)));
    return new goog.math.Coordinate(f,d)
}
;
goog.style.scrollIntoContainerView = function(a, b, c) {
    b = b || goog.dom.getDocumentScrollElement();
    a = goog.style.getContainerOffsetToScrollInto(a, b, c);
    b.scrollLeft = a.x;
    b.scrollTop = a.y
}
;
goog.style.getClientLeftTop = function(a) {
    return new goog.math.Coordinate(a.clientLeft,a.clientTop)
}
;
goog.style.getPageOffset = function(a) {
    var b = goog.dom.getOwnerDocument(a);
    goog.asserts.assertObject(a, "Parameter is required");
    var c = new goog.math.Coordinate(0,0)
      , d = goog.style.getClientViewportElement(b);
    if (a == d)
        return c;
    a = goog.style.getBoundingClientRect_(a);
    b = goog.dom.getDomHelper(b).getDocumentScroll();
    c.x = a.left + b.x;
    c.y = a.top + b.y;
    return c
}
;
goog.style.getPageOffsetLeft = function(a) {
    return goog.style.getPageOffset(a).x
}
;
goog.style.getPageOffsetTop = function(a) {
    return goog.style.getPageOffset(a).y
}
;
goog.style.getFramedPageOffset = function(a, b) {
    var c = new goog.math.Coordinate(0,0)
      , d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
    if (!goog.reflect.canAccessProperty(d, "parent"))
        return c;
    do {
        var e = d == b ? goog.style.getPageOffset(a) : goog.style.getClientPositionForElement_(goog.asserts.assert(a));
        c.x += e.x;
        c.y += e.y
    } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));return c
}
;
goog.style.translateRectForAnotherFrame = function(a, b, c) {
    if (b.getDocument() != c.getDocument()) {
        var d = b.getDocument().body;
        c = goog.style.getFramedPageOffset(d, c.getWindow());
        c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
        !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
        a.left += c.x;
        a.top += c.y
    }
}
;
goog.style.getRelativePosition = function(a, b) {
    a = goog.style.getClientPosition(a);
    b = goog.style.getClientPosition(b);
    return new goog.math.Coordinate(a.x - b.x,a.y - b.y)
}
;
goog.style.getClientPositionForElement_ = function(a) {
    a = goog.style.getBoundingClientRect_(a);
    return new goog.math.Coordinate(a.left,a.top)
}
;
goog.style.getClientPosition = function(a) {
    goog.asserts.assert(a);
    if (a.nodeType == goog.dom.NodeType.ELEMENT)
        return goog.style.getClientPositionForElement_(a);
    a = a.changedTouches ? a.changedTouches[0] : a;
    return new goog.math.Coordinate(a.clientX,a.clientY)
}
;
goog.style.setPageOffset = function(a, b, c) {
    var d = goog.style.getPageOffset(a);
    b instanceof goog.math.Coordinate && (c = b.y,
    b = b.x);
    b = goog.asserts.assertNumber(b) - d.x;
    goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (Number(c) - d.y))
}
;
goog.style.setSize = function(a, b, c) {
    if (b instanceof goog.math.Size)
        c = b.height,
        b = b.width;
    else if (void 0 == c)
        throw Error("missing height argument");
    goog.style.setWidth(a, b);
    goog.style.setHeight(a, c)
}
;
goog.style.getPixelStyleValue_ = function(a, b) {
    "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
    return a
}
;
goog.style.setHeight = function(a, b) {
    a.style.height = goog.style.getPixelStyleValue_(b, !0)
}
;
goog.style.setWidth = function(a, b) {
    a.style.width = goog.style.getPixelStyleValue_(b, !0)
}
;
goog.style.getSize = function(a) {
    return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a)
}
;
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
    if ("none" != goog.style.getStyle_(b, "display"))
        return a(b);
    var c = b.style
      , d = c.display
      , e = c.visibility
      , f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    a = a(b);
    c.display = d;
    c.position = f;
    c.visibility = e;
    return a
}
;
goog.style.getSizeWithDisplay_ = function(a) {
    var b = a.offsetWidth
      , c = a.offsetHeight
      , d = goog.userAgent.WEBKIT && !b && !c;
    return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b,c) : (a = goog.style.getBoundingClientRect_(a),
    new goog.math.Size(a.right - a.left,a.bottom - a.top))
}
;
goog.style.getTransformedSize = function(a) {
    if (!a.getBoundingClientRect)
        return null;
    a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
    return new goog.math.Size(a.right - a.left,a.bottom - a.top)
}
;
goog.style.getBounds = function(a) {
    var b = goog.style.getPageOffset(a);
    a = goog.style.getSize(a);
    return new goog.math.Rect(b.x,b.y,a.width,a.height)
}
;
goog.style.toCamelCase = function(a) {
    return goog.string.toCamelCase(String(a))
}
;
goog.style.toSelectorCase = function(a) {
    return goog.string.toSelectorCase(a)
}
;
goog.style.getOpacity = function(a) {
    goog.asserts.assert(a);
    var b = a.style;
    a = "";
    "opacity"in b ? a = b.opacity : "MozOpacity"in b ? a = b.MozOpacity : "filter"in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
    return "" == a ? a : Number(a)
}
;
goog.style.setOpacity = function(a, b) {
    goog.asserts.assert(a);
    a = a.style;
    "opacity"in a ? a.opacity = b : "MozOpacity"in a ? a.MozOpacity = b : "filter"in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
}
;
goog.style.setTransparentBackgroundImage = function(a, b) {
    a = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? a.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (a.backgroundImage = "url(" + b + ")",
    a.backgroundPosition = "top left",
    a.backgroundRepeat = "no-repeat")
}
;
goog.style.clearTransparentBackgroundImage = function(a) {
    a = a.style;
    "filter"in a ? a.filter = "" : a.backgroundImage = "none"
}
;
goog.style.showElement = function(a, b) {
    goog.style.setElementShown(a, b)
}
;
goog.style.setElementShown = function(a, b) {
    a.style.display = b ? "" : "none"
}
;
goog.style.isElementShown = function(a) {
    return "none" != a.style.display
}
;
goog.style.installSafeStyleSheet = function(a, b) {
    b = goog.dom.getDomHelper(b);
    var c = b.getDocument();
    if (goog.userAgent.IE && c.createStyleSheet)
        return b = c.createStyleSheet(),
        goog.style.setSafeStyleSheet(b, a),
        b;
    c = b.getElementsByTagNameAndClass("HEAD")[0];
    if (!c) {
        var d = b.getElementsByTagNameAndClass("BODY")[0];
        c = b.createDom("HEAD");
        d.parentNode.insertBefore(c, d)
    }
    d = b.createDom("STYLE");
    goog.style.setSafeStyleSheet(d, a);
    b.appendChild(c, d);
    return d
}
;
goog.style.uninstallStyles = function(a) {
    goog.dom.removeNode(a.ownerNode || a.owningElement || a)
}
;
goog.style.setSafeStyleSheet = function(a, b) {
    b = goog.html.SafeStyleSheet.unwrap(b);
    goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = b : a.innerHTML = b
}
;
goog.style.setPreWrap = function(a) {
    a = a.style;
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre",
    a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
}
;
goog.style.setInlineBlock = function(a) {
    a = a.style;
    a.position = "relative";
    goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1",
    a.display = "inline") : a.display = "inline-block"
}
;
goog.style.isRightToLeft = function(a) {
    return "rtl" == goog.style.getStyle_(a, "direction")
}
;
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
    return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
}
;
goog.style.setUnselectable = function(a, b, c) {
    c = c ? null : a.getElementsByTagName("*");
    var d = goog.style.unselectableStyle_;
    if (d) {
        if (b = b ? "none" : "",
        a.style && (a.style[d] = b),
        c) {
            a = 0;
            for (var e; e = c[a]; a++)
                e.style && (e.style[d] = b)
        }
    } else if (goog.userAgent.IE || goog.userAgent.OPERA)
        if (b = b ? "on" : "",
        a.setAttribute("unselectable", b),
        c)
            for (a = 0; e = c[a]; a++)
                e.setAttribute("unselectable", b)
}
;
goog.style.getBorderBoxSize = function(a) {
    return new goog.math.Size(a.offsetWidth,a.offsetHeight)
}
;
goog.style.setBorderBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a)
      , d = goog.dom.getDomHelper(c).isCss1CompatMode();
    !goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8") ? goog.style.setBoxSizingSize_(a, b, "border-box") : (c = a.style,
    d ? (d = goog.style.getPaddingBox(a),
    a = goog.style.getBorderBox(a),
    c.pixelWidth = b.width - a.left - d.left - d.right - a.right,
    c.pixelHeight = b.height - a.top - d.top - d.bottom - a.bottom) : (c.pixelWidth = b.width,
    c.pixelHeight = b.height))
}
;
goog.style.getContentBoxSize = function(a) {
    var b = goog.dom.getOwnerDocument(a)
      , c = goog.userAgent.IE && a.currentStyle;
    if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing)
        return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"),
        a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"),
        new goog.math.Size(b,a);
    c = goog.style.getBorderBoxSize(a);
    b = goog.style.getPaddingBox(a);
    a = goog.style.getBorderBox(a);
    return new goog.math.Size(c.width - a.left - b.left - b.right - a.right,c.height - a.top - b.top - b.bottom - a.bottom)
}
;
goog.style.setContentBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a)
      , d = goog.dom.getDomHelper(c).isCss1CompatMode();
    !goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8") ? goog.style.setBoxSizingSize_(a, b, "content-box") : (c = a.style,
    d ? (c.pixelWidth = b.width,
    c.pixelHeight = b.height) : (d = goog.style.getPaddingBox(a),
    a = goog.style.getBorderBox(a),
    c.pixelWidth = b.width + a.left + d.left + d.right + a.right,
    c.pixelHeight = b.height + a.top + d.top + d.bottom + a.bottom))
}
;
goog.style.setBoxSizingSize_ = function(a, b, c) {
    a = a.style;
    goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
    a.width = Math.max(b.width, 0) + "px";
    a.height = Math.max(b.height, 0) + "px"
}
;
goog.style.getIePixelValue_ = function(a, b, c, d) {
    if (/^\d+px?$/.test(b))
        return parseInt(b, 10);
    var e = a.style[c]
      , f = a.runtimeStyle[c];
    a.runtimeStyle[c] = a.currentStyle[c];
    a.style[c] = b;
    b = a.style[d];
    a.style[c] = e;
    a.runtimeStyle[c] = f;
    return +b
}
;
goog.style.getIePixelDistance_ = function(a, b) {
    return (b = goog.style.getCascadedStyle(a, b)) ? goog.style.getIePixelValue_(a, b, "left", "pixelLeft") : 0
}
;
goog.style.getBox_ = function(a, b) {
    if (goog.userAgent.IE) {
        var c = goog.style.getIePixelDistance_(a, b + "Left")
          , d = goog.style.getIePixelDistance_(a, b + "Right")
          , e = goog.style.getIePixelDistance_(a, b + "Top");
        a = goog.style.getIePixelDistance_(a, b + "Bottom");
        return new goog.math.Box(e,d,a,c)
    }
    c = goog.style.getComputedStyle(a, b + "Left");
    d = goog.style.getComputedStyle(a, b + "Right");
    e = goog.style.getComputedStyle(a, b + "Top");
    a = goog.style.getComputedStyle(a, b + "Bottom");
    return new goog.math.Box(parseFloat(e),parseFloat(d),parseFloat(a),parseFloat(c))
}
;
goog.style.getPaddingBox = function(a) {
    return goog.style.getBox_(a, "padding")
}
;
goog.style.getMarginBox = function(a) {
    return goog.style.getBox_(a, "margin")
}
;
goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
};
goog.style.getIePixelBorder_ = function(a, b) {
    if ("none" == goog.style.getCascadedStyle(a, b + "Style"))
        return 0;
    b = goog.style.getCascadedStyle(a, b + "Width");
    return b in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[b] : goog.style.getIePixelValue_(a, b, "left", "pixelLeft")
}
;
goog.style.getBorderBox = function(a) {
    if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
        var b = goog.style.getIePixelBorder_(a, "borderLeft")
          , c = goog.style.getIePixelBorder_(a, "borderRight")
          , d = goog.style.getIePixelBorder_(a, "borderTop");
        a = goog.style.getIePixelBorder_(a, "borderBottom");
        return new goog.math.Box(d,c,a,b)
    }
    b = goog.style.getComputedStyle(a, "borderLeftWidth");
    c = goog.style.getComputedStyle(a, "borderRightWidth");
    d = goog.style.getComputedStyle(a, "borderTopWidth");
    a = goog.style.getComputedStyle(a, "borderBottomWidth");
    return new goog.math.Box(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
}
;
goog.style.getFontFamily = function(a) {
    var b = goog.dom.getOwnerDocument(a)
      , c = "";
    if (b.body.createTextRange && goog.dom.contains(b, a)) {
        b = b.body.createTextRange();
        b.moveToElementText(a);
        try {
            c = b.queryCommandValue("FontName")
        } catch (d) {
            c = ""
        }
    }
    c || (c = goog.style.getStyle_(a, "fontFamily"));
    a = c.split(",");
    1 < a.length && (c = a[0]);
    return goog.string.stripQuotes(c, "\"'")
}
;
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
    return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
}
;
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
};
goog.style.getFontSize = function(a) {
    var b = goog.style.getStyle_(a, "fontSize")
      , c = goog.style.getLengthUnits(b);
    if (b && "px" == c)
        return parseInt(b, 10);
    if (goog.userAgent.IE) {
        if (String(c)in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)
            return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
        if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(c)in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_)
            return a = a.parentNode,
            c = goog.style.getStyle_(a, "fontSize"),
            goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
    }
    c = goog.dom.createDom("SPAN", {
        style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
    });
    goog.dom.appendChild(a, c);
    b = c.offsetHeight;
    goog.dom.removeNode(c);
    return b
}
;
goog.style.parseStyleAttribute = function(a) {
    var b = {};
    goog.array.forEach(a.split(/\s*;\s*/), function(a) {
        var c = a.match(/\s*([\w-]+)\s*:(.+)/);
        c && (a = c[1],
        c = goog.string.trim(c[2]),
        b[goog.string.toCamelCase(a.toLowerCase())] = c)
    });
    return b
}
;
goog.style.toStyleAttribute = function(a) {
    var b = [];
    goog.object.forEach(a, function(a, d) {
        b.push(goog.string.toSelectorCase(d), ":", a, ";")
    });
    return b.join("")
}
;
goog.style.setFloat = function(a, b) {
    a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
}
;
goog.style.getFloat = function(a) {
    return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
}
;
goog.style.getScrollbarWidth = function(a) {
    var b = goog.dom.createElement("DIV");
    a && (b.className = a);
    b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
    a = goog.dom.createElement("DIV");
    goog.style.setSize(a, "150px", "150px");
    b.appendChild(a);
    goog.dom.appendChild(goog.dom.getDocument().body, b);
    a = b.offsetWidth - b.clientWidth;
    goog.dom.removeNode(b);
    return a
}
;
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
    a = goog.style.getComputedTransform(a);
    return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]),parseFloat(a[2])) : new goog.math.Coordinate(0,0) : new goog.math.Coordinate(0,0)
}
;
var mpl$sims$common$TabLayout = function(a, b, c) {
    mpl$lab$util$AbstractSubject.call(this, "TAB_LAYOUT");
    b = 600;
    c = 500;
    this.limitSize_ = !0;
    this.timeGraphWidth_ = this.graphWidth_ = this.simWidth_ = 1;
    mpl$lab$util$Util.setImagesDir(a.images_dir);
    this.debug_layout = !1;
    this.tab_list = mpl$sims$common$TabLayout.getElementById(a, "tab_list");
    this.layout_ = this.getSelectedTab();
    this.terminalEnabled_ = !0;
    "" == this.layout_ && (this.layout_ = mpl$sims$common$TabLayout.Layout.SIM,
    this.setSelectedTab(this.layout_));
    goog.events.listen(this.tab_list, goog.events.EventType.CLICK, goog.bind(function(a) {
        a = a.target;
        if (void 0 === a)
            throw Error("event target is undefined ");
        null != a && "LI" == a.tagName && (-1 < a.className.indexOf("selected") || this.setLayoutFromTab(a.className))
    }, this));
    goog.events.listen(window, goog.events.EventType.RESIZE, goog.bind(this.redoLayout, this));
    goog.events.listen(window, goog.events.EventType.ORIENTATIONCHANGE, goog.bind(this.redoLayout, this));
    var d = mpl$sims$common$TabLayout.maybeElementById(a, "term_output");
    this.term_input = mpl$sims$common$TabLayout.maybeElementById(a, "term_input");
    this.terminal = new mpl$lab$util$Terminal(this.term_input,d);
    mpl$lab$util$Terminal.stdRegex(this.terminal);
    this.div_contain = mpl$sims$common$TabLayout.getElementById(a, "container");
    this.debug_layout && (this.div_contain.style.border = "dashed 1px red");
    this.div_sim = mpl$sims$common$TabLayout.getElementById(a, "sim_applet");
    this.div_sim.style.position = "relative";
    d = document.createElement("canvas");
    d.tabIndex = 0;
    this.simCanvas = new mpl$lab$view$LabCanvas(d,"SIM_CANVAS");
    this.simCanvas.setSize(b, c);
    this.div_sim.appendChild(this.simCanvas.getCanvas());
    this.show_sim_cb = mpl$sims$common$TabLayout.getElementById(a, "show_sim");
    d = goog.dom.getParentElement(this.show_sim_cb);
    if (null == d || "LABEL" != d.tagName)
        throw Error();
    this.show_sim_label = d;
    goog.events.listen(this.show_sim_cb, goog.events.EventType.CLICK, goog.bind(function(a) {
        this.showSim(this.show_sim_cb.checked)
    }, this));
    this.div_graph = mpl$sims$common$TabLayout.getElementById(a, "div_graph");
    this.div_graph.style.position = "relative";
    d = document.createElement("canvas");
    this.graphCanvas = new mpl$lab$view$LabCanvas(d,"GRAPH_CANVAS");
    b = Math.max(b, c);
    this.graphCanvas.setSize(b, b);
    this.div_graph.appendChild(d);
    this.graph_controls = mpl$sims$common$TabLayout.getElementById(a, "graph_controls");
    this.debug_layout && (this.graph_controls.style.border = "dashed 1px green");
    this.controls_ = [];
    this.sim_controls = mpl$sims$common$TabLayout.getElementById(a, "sim_controls");
    this.sim_controls.style.marginLeft = "0px";
    this.sim_controls.style.width = "15%"
    this.debug_layout && (this.sim_controls.style.border = "dashed 1px green");
    this.div_term = mpl$sims$common$TabLayout.getElementById(a, "div_terminal");
    this.div_term.style.display = "none";
    this.debug_layout && (this.div_term.style.border = "dashed 1px green");
    c = mpl$sims$common$TabLayout.getElementById(a, "label_terminal");
    this.terminalEnabled_ ? (c.style.display = "inline",
    this.show_term_cb = mpl$sims$common$TabLayout.getElementById(a, "show_terminal"),
    goog.events.listen(this.show_term_cb, goog.events.EventType.CLICK, goog.bind(function(a) {
        this.showTerminal(this.show_term_cb.checked)
    }, this))) : c.style.display = "none";
    this.div_time_graph = mpl$sims$common$TabLayout.getElementById(a, "div_time_graph");
    this.div_time_graph.style.position = "relative";
    c = document.createElement("canvas");
    this.timeGraphCanvas = new mpl$lab$view$LabCanvas(c,"TIME_GRAPH_CANVAS");
    this.timeGraphCanvas.setSize(b, b);
    this.div_time_graph.appendChild(c);
    this.time_graph_controls = mpl$sims$common$TabLayout.getElementById(a, "time_graph_controls");
    this.debug_layout && (this.time_graph_controls.style.border = "dashed 1px green");
    this.redoLayout();
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$common$TabLayout.en.SIM_WIDTH,mpl$sims$common$TabLayout.i18n.SIM_WIDTH,goog.bind(this.getSimWidth, this),goog.bind(this.setSimWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$common$TabLayout.en.GRAPH_WIDTH,mpl$sims$common$TabLayout.i18n.GRAPH_WIDTH,goog.bind(this.getGraphWidth, this),goog.bind(this.setGraphWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$common$TabLayout.en.TIME_GRAPH_WIDTH,mpl$sims$common$TabLayout.i18n.TIME_GRAPH_WIDTH,goog.bind(this.getTimeGraphWidth, this),goog.bind(this.setTimeGraphWidth, this)));
    this.addParameter(new mpl$lab$util$ParameterString(this,mpl$sims$common$TabLayout.en.LAYOUT,mpl$sims$common$TabLayout.i18n.LAYOUT,goog.bind(this.getLayout, this),goog.bind(this.setLayout, this),mpl$sims$common$TabLayout.getValues(),mpl$sims$common$TabLayout.getValues()));
       
};
$jscomp.inherits(mpl$sims$common$TabLayout, mpl$lab$util$AbstractSubject);
mpl$sims$common$TabLayout.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ', layout_: "' + this.layout_ + '", simWidth_: ' + mpl$lab$util$Util.NF(this.simWidth_) + ", graphWidth_: " + mpl$lab$util$Util.NF(this.graphWidth_) + ", timeGraphWidth_: " + mpl$lab$util$Util.NF(this.timeGraphWidth_) + ", simCanvas: " + this.simCanvas.toStringShort() + ", graphCanvas: " + this.graphCanvas.toStringShort() + ", timeGraphCanvas: " + this.timeGraphCanvas.toStringShort()  + ", controls_: [" + goog.array.map(this.controls_, function(a) {
        return a.toStringShort()
    }) + "]" + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$sims$common$TabLayout.prototype.getClassName = function() {
    return "TabLayout"
}
;
mpl$sims$common$TabLayout.getValues = function() {
    var a = mpl$sims$common$TabLayout.Layout;
    return [a.SIM, a.GRAPH, a.GRAPH_AND_SIM, a.TIME_GRAPH, a.TIME_GRAPH_AND_SIM, a.MULTI_GRAPH, a.MULTI_GRAPH_AND_SIM]
}
;
mpl$sims$common$TabLayout.getElementById = function(a, b) {
    a = a[b];
    if (!goog.isString(a))
        throw Error("unknown elementId: " + b);
    b = document.getElementById(a);
    if (!goog.isObject(b))
        throw Error("not found: element with id=" + a);
    return b
}
;
mpl$sims$common$TabLayout.maybeElementById = function(a, b) {
    a = a[b];
    if (!goog.isString(a))
        throw Error("unknown elementId: " + b);
    return document.getElementById(a)
}
;
mpl$sims$common$TabLayout.prototype.addControl = function(a) {
    var b = a.getElement();
    b.style.display = "block";
    this.sim_controls.appendChild(b);
    this.controls_.push(a);
    return a
}
;
mpl$sims$common$TabLayout.prototype.alignCanvasControls = function(a, b, c) {
    a.style.display = "block";
    b.style.display = "inline-block";
    b.style.columnCount = "1";
    b.style.MozColumnCount = "1";
    b.style.webkitColumnCount = "1";
    b.style.width = "12%";
    var d = b.getBoundingClientRect().width;
    d = 150 < d ? d : 300;
    a = a.offsetWidth || a.getBoundingClientRect().width;
    goog.isDefAndNotNull(c) && (c.style.display = "block",
    a += c.offsetWidth || c.getBoundingClientRect().width);
    c = this.div_contain.offsetWidth || this.div_contain.getBoundingClientRect().width;
    c - a - 2 < d && c > 2 * d && (b.style.width = "100%",
    b.style.columnCount = "1",
    b.style.MozColumnCount = "1",
    b.style.webkitColumnCount = "1")
}
;
mpl$sims$common$TabLayout.prototype.getGraphWidth = function() {
    return this.graphWidth_
}
;
mpl$sims$common$TabLayout.prototype.getLayout = function() {
    return this.layout_
}
;
mpl$sims$common$TabLayout.prototype.getSelectedTab = function() {
    var a = goog.array.find(this.tab_list.childNodes, function(a) {
        return a.nodeType != Node.ELEMENT_NODE || "LI" != a.tagName ? !1 : null != a.className.match(/.*selected/)
    });
    return null == a ? "" : a.className.replace(/[ ]*selected/, "")
}
;
mpl$sims$common$TabLayout.prototype.getSimWidth = function() {
    return this.simWidth_
}
;
mpl$sims$common$TabLayout.prototype.getSubjects = function() {
    return [this, this.simCanvas, this.graphCanvas, this.timeGraphCanvas]
}
;
mpl$sims$common$TabLayout.prototype.getTimeGraphWidth = function() {
    return this.timeGraphWidth_
}
;
mpl$sims$common$TabLayout.prototype.redoLayout = function() {
    var a = mpl$sims$common$TabLayout.Layout
      , b = goog.dom.getViewportSize();
    goog.style.setFloat(this.div_sim, "left");
    goog.style.setFloat(this.div_graph, "left");
    goog.style.setFloat(this.div_time_graph, "left");
    switch (this.layout_) {
    case "":
    case a.SIM:
        this.div_graph.style.display = "none";
        this.graph_controls.style.display = "none";
        this.div_time_graph.style.display = "none";
        this.time_graph_controls.style.display = "none";
        this.setDisplaySize(.95 * this.simWidth_, this.div_graph);
        this.alignCanvasControls(this.div_sim, this.sim_controls);
        this.show_sim_label.style.display = "none";
        break;
    
    default:
        throw Error('redoLayout: no such layout "' + this.layout_ + '"');
    }
}
;
mpl$sims$common$TabLayout.prototype.setDisplaySize = function(a, b) {
    if (this.limitSize_) {
        var c = goog.dom.getViewportSize().height - 80
          , d = this.div_contain.offsetWidth || this.div_contain.getBoundingClientRect().width
          , e = this.simCanvas.getScreenRect()
          , f = e.getWidth();
        e = e.getHeight();
        a = Math.min(a, c / d * (f / e))
    }
    a = Math.floor(100 * a) + "%";
    this.div_sim.style.width = a;
    this.div_sim.style.height = "auto";
    b.style.width = a;
    b.style.height = "auto"
}
;
mpl$sims$common$TabLayout.prototype.setGraphWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.graphWidth_) && (this.graphWidth_ = a);
    this.redoLayout();
    this.broadcastParameter(mpl$sims$common$TabLayout.en.GRAPH_WIDTH)
}
;
mpl$sims$common$TabLayout.prototype.setLayout = function(a) {
    var b = mpl$sims$common$TabLayout.Layout;
    a = a.toLowerCase().trim();
    if (this.layout_ != a) {
        a = this.layout_ = a;
        switch (a) {
        case b.GRAPH_AND_SIM:
            a = b.GRAPH;
            break;
        case b.TIME_GRAPH_AND_SIM:
            a = b.TIME_GRAPH;
            break;
        case b.MULTI_GRAPH_AND_SIM:
            a = b.MULTI_GRAPH
        }
        this.setSelectedTab(a);
        this.redoLayout()
    }
}
;
mpl$sims$common$TabLayout.prototype.setLayoutFromTab = function(a) {
    var b = mpl$sims$common$TabLayout.Layout;
    a = a.toLowerCase().trim();
    switch (a) {
    case b.GRAPH:
        a = b.GRAPH_AND_SIM;
        break;
    case b.TIME_GRAPH:
        a = b.TIME_GRAPH_AND_SIM;
        break;
    case b.MULTI_GRAPH:
        a = b.MULTI_GRAPH_AND_SIM
    }
    this.setLayout(a)
}
;
mpl$sims$common$TabLayout.prototype.setSelectedTab = function(a) {
    this.getSelectedTab() != a && goog.array.forEach(this.tab_list.childNodes, function(b) {
        b.nodeType == Node.ELEMENT_NODE && "LI" == b.tagName && (b.className.trim() == a ? b.className += " selected" : -1 < b.className.indexOf("selected") && (b.className = b.className.replace(/[ ]*selected/, "")))
    }, this)
}
;
mpl$sims$common$TabLayout.prototype.setSimWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.simWidth_) && (this.simWidth_ = a);
    this.redoLayout();
    this.broadcastParameter(mpl$sims$common$TabLayout.en.SIM_WIDTH)
}
;
mpl$sims$common$TabLayout.prototype.setTimeGraphWidth = function(a) {
    mpl$lab$util$Util.veryDifferent(a, this.timeGraphWidth_) && (this.timeGraphWidth_ = a);
    this.redoLayout();
    this.broadcastParameter(mpl$sims$common$TabLayout.en.TIME_GRAPH_WIDTH)
}
;
mpl$sims$common$TabLayout.prototype.showSim = function(a) {
    var b = mpl$sims$common$TabLayout.Layout;
    switch (this.layout_) {
    case "":
    case b.SIM:
        break;
    case b.GRAPH:
        a && this.setLayout(b.GRAPH_AND_SIM);
        break;
    case b.GRAPH_AND_SIM:
        a || this.setLayout(b.GRAPH);
        break;
    case b.TIME_GRAPH:
        a && this.setLayout(b.TIME_GRAPH_AND_SIM);
        break;
    case b.TIME_GRAPH_AND_SIM:
        a || this.setLayout(b.TIME_GRAPH);
        break;
    case b.MULTI_GRAPH:
        a && this.setLayout(b.MULTI_GRAPH_AND_SIM);
        break;
    case b.MULTI_GRAPH_AND_SIM:
        a || this.setLayout(b.MULTI_GRAPH);
        break;
    default:
        throw Error('showSim: no such layout "' + this.layout_ + '"');
    }
}
;
mpl$sims$common$TabLayout.prototype.showTerminal = function(a) {
    this.div_term.style.display = a ? "block" : "none";
    (this.show_term_cb.checked = a) && this.term_input && this.terminalEnabled_ && !this.terminal.recalling && this.term_input.focus()
}
;
mpl$sims$common$TabLayout.Layout = {
    SIM: "sim",
    GRAPH: "graph",
    GRAPH_AND_SIM: "sim+graph",
    TIME_GRAPH: "time_graph",
    TIME_GRAPH_AND_SIM: "sim+time_graph",
    MULTI_GRAPH: "multi_graph",
    MULTI_GRAPH_AND_SIM: "sim+multi_graph"
};
mpl$sims$common$TabLayout.en = {
    SIM_WIDTH: "sim-width",
    GRAPH_WIDTH: "graph-width",
    TIME_GRAPH_WIDTH: "time-graph-width",
    LAYOUT: "layout",
    SHOW_TERMINAL: "show terminal"
};
mpl$sims$common$TabLayout.de_strings = {
    SIM_WIDTH: "Sim Breite",
    GRAPH_WIDTH: "Graf Breite",
    TIME_GRAPH_WIDTH: "Zeit Graf Breite",
    LAYOUT: "layout",
    SHOW_TERMINAL: "zeige Terminal"
};
mpl$sims$common$TabLayout.i18n = "de" === goog.LOCALE ? mpl$sims$common$TabLayout.de_strings : mpl$sims$common$TabLayout.en;
var mpl$sims$common$TimeGraph1 = function(a, b, c, d, e) {
    mpl$lab$util$AbstractSubject.call(this, "TIME_GRAPH_LAYOUT");
    this.canvas = b;
    e.addCanvas(b);
    this.view = new mpl$lab$view$SimView("TIME_GRAPH_VIEW",new mpl$lab$util$DoubleRect(0,0,1,1));
    this.view.setHorizAlign(mpl$lab$view$HorizAlign.FULL);
    this.view.setVerticalAlign(mpl$lab$view$VerticalAlign.FULL);
    b.addView(this.view);
    this.axes = mpl$sims$common$CommonControls.makeAxes(this.view);
    this.line1 = new mpl$lab$graph$GraphLine("TIME_GRAPH_LINE_1",a);
    this.line1.setColor("lime");
    this.view.addMemo(this.line1);
    this.autoScale = new mpl$lab$graph$AutoScale("TIME_GRAPH_AUTO_SCALE",this.line1,this.view);
    this.autoScale.extraMargin = .05;
    this.displayGraph = new mpl$lab$graph$DisplayGraph(this.line1);
    this.displayGraph.setScreenRect(this.view.getScreenRect());
    this.view.getDisplayList().prepend(this.displayGraph);
    new mpl$lab$util$GenericObserver(this.view,goog.bind(function(a) {
        a.nameEquals(mpl$lab$view$LabView.SCREEN_RECT_CHANGED) && this.displayGraph.setScreenRect(this.view.getScreenRect())
    }, this),"resize DisplayGraph");
    var f = this.line1.getVarsList().timeIndex();
    this.line1.setXVariable(f);
    this.line1.setYVariable(0);
    this.displayGraph.setUseBuffer(this.line1.getXVariable() != f);
    this.line2 = new mpl$lab$graph$GraphLine("TIME_GRAPH_LINE_2",a);
    this.autoScale.addGraphLine(this.line2);
    this.view.addMemo(this.line2);
    this.line2.setXVariable(f);
    this.line2.setYVariable(1);
    this.line2.setColor("red");
    this.displayGraph.addGraphLine(this.line2);
    this.line3 = new mpl$lab$graph$GraphLine("TIME_GRAPH_LINE_3",a);
    this.autoScale.addGraphLine(this.line3);
    this.view.addMemo(this.line3);
    this.line3.setXVariable(f);
    this.line3.setYVariable(-1);
    this.line3.setColor("blue");
    this.displayGraph.addGraphLine(this.line3);
    this.controls_ = [];
    this.div_controls = c;
    this.addControl(mpl$sims$common$CommonControls.makePlaybackControls(e));
    a = this.line1.getParameterNumber(mpl$lab$graph$GraphLine.en.Y_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(a,mpl$sims$common$TimeGraph1.i18n.LINE1));
    a = this.line2.getParameterNumber(mpl$lab$graph$GraphLine.en.Y_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(a,mpl$sims$common$TimeGraph1.i18n.LINE2));
    a = this.line3.getParameterNumber(mpl$lab$graph$GraphLine.en.Y_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(a,mpl$sims$common$TimeGraph1.i18n.LINE3));
    a = this.line1.getParameterNumber(mpl$lab$graph$GraphLine.en.X_VARIABLE);
    this.addControl(new mpl$lab$controls$ChoiceControl(a,"X:"));
    a = this.autoScale.getParameterNumber(mpl$lab$graph$AutoScale.en.TIME_WINDOW);
    this.addControl(new mpl$lab$controls$NumericControl(a));
    a = new mpl$lab$controls$ButtonControl(mpl$lab$graph$GraphLine.i18n.CLEAR_GRAPH,goog.bind(function() {
        this.line1.reset();
        this.line2.reset();
        this.line3.reset()
    }, this));
    this.addControl(a);
    this.line1Obs = new mpl$lab$util$GenericObserver(this.line1,goog.bind(function(a) {
        this.displayGraph.setUseBuffer(this.line1.getXVariable() != f);
        this.line2.setXVariable(this.line1.getXVariable());
        this.line3.setXVariable(this.line1.getXVariable())
    }, this),"ensure line2, line3 have same X variable as line1");
    this.graphCtrl = new mpl$lab$app$SimController(b,null,{
        alt: !1,
        control: !1,
        meta: !1,
        shift: !1
    });
    this.view.setScaleTogether(!1);
    new mpl$lab$util$GenericObserver(e,goog.bind(function(a) {
        a.nameEquals(mpl$lab$app$SimRunner.RESET) && (a = this.view.getWidth(),
        this.view.setCenterX(a / 2),
        this.autoScale.setActive(!0))
    }, this));
    b = mpl$sims$common$CommonControls.makePanZoomControls(this.view, !0, goog.bind(function() {
        this.autoScale.setActive(!0)
    }, this));
    d.appendChild(b);
    d = mpl$sims$common$CommonControls.makeShowPanZoomParam(b, this);
    this.addControl(new mpl$lab$controls$CheckBoxControl(d))
};
$jscomp.inherits(mpl$sims$common$TimeGraph1, mpl$lab$util$AbstractSubject);
mpl$sims$common$TimeGraph1.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", canvas: " + this.canvas.toStringShort() + ", view: " + this.view.toStringShort() + ", line1: " + this.line1.toStringShort() + ", line2: " + this.line2.toStringShort() + ", line3: " + this.line3.toStringShort() + ", axes: " + this.axes.toStringShort() + ", autoScale: " + this.autoScale.toStringShort() + ", displayGraph: " + this.displayGraph.toStringShort() + ", graphCtrl: " + this.graphCtrl.toStringShort() + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$sims$common$TimeGraph1.prototype.getClassName = function() {
    return "TimeGraph1"
}
;
mpl$sims$common$TimeGraph1.prototype.addControl = function(a) {
    var b = a.getElement();
    b.style.display = "block";
    this.div_controls.appendChild(b);
    this.controls_.push(a);
    return a
}
;
mpl$sims$common$TimeGraph1.prototype.getSubjects = function() {
    return [this, this.line1, this.line2, this.line3, this.view, this.autoScale]
}
;
mpl$sims$common$TimeGraph1.en = {
    LINE1: "line 1",
    LINE2: "line 2",
    LINE3: "line 3"
};
mpl$sims$common$TimeGraph1.de_strings = {
    LINE1: "linie 1",
    LINE2: "linie 2",
    LINE3: "linie 3"
};
mpl$sims$common$TimeGraph1.i18n = "de" === goog.LOCALE ? mpl$sims$common$TimeGraph1.de_strings : mpl$sims$common$TimeGraph1.en;
var mpl$lab$graph$VarsHistory = function(a, b) {
    this.variablesList_ = a;
    this.dataPoints_ = new mpl$lab$util$CircularList(b || 1E5);
    this.varIndex_ = goog.array.range(this.variablesList_.numVariables());
    this.numberFormat = mpl$lab$util$Util.NF5E;
    this.separator = ", "
};
mpl$lab$graph$VarsHistory.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", samples: " + this.dataPoints_.getSize() + ", varIndex_: [" + mpl$lab$util$Util.array2string(this.varIndex_, mpl$lab$util$Util.NF0) + "]}"
}
;
mpl$lab$graph$VarsHistory.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "VarsHistory{variablesList: " + this.variablesList_.toStringShort() + "}"
}
;
mpl$lab$graph$VarsHistory.prototype.getDataPoints = function() {
    return this.dataPoints_
}
;
mpl$lab$graph$VarsHistory.prototype.getVariables = function() {
    return goog.array.clone(this.varIndex_)
}
;
mpl$lab$graph$VarsHistory.prototype.memorize = function() {
    var a = this.variablesList_.getValues(!0)
      , b = goog.array.map(this.varIndex_, function(b) {
        return a[b]
    })
      , c = this.dataPoints_.getEndValue();
    null != c && goog.array.equals(b, c) || this.dataPoints_.store(b)
}
;
mpl$lab$graph$VarsHistory.prototype.output = function() {
    for (var a = this.dataPoints_.getIterator(), b = ""; a.hasNext(); ) {
        var c = a.nextValue();
        b += mpl$lab$util$Util.array2string(c, this.numberFormat, this.separator) + "\n"
    }
    return b
}
;
mpl$lab$graph$VarsHistory.prototype.reset = function() {
    this.dataPoints_.reset()
}
;
mpl$lab$graph$VarsHistory.prototype.setVariables = function(a) {
    var b = this.variablesList_.numVariables();
    goog.array.forEach(a, function(a) {
        if (0 > a || a > b)
            throw Error("variable index " + a + " not between 0 and " + b);
    });
    this.varIndex_ = a;
    this.dataPoints_.reset()
}
;
mpl$lab$graph$VarsHistory.prototype.toArray = function() {
    for (var a = this.dataPoints_.getIterator(), b = []; a.hasNext(); )
        b.push(a.nextValue());
    return b
}
;
var mpl$lab$model$ExpressionVariable = function(a, b, c, d, e) {
    mpl$lab$model$ConcreteVariable.call(this, a, b, c);
    this.terminal_ = d;
    this.expression_ = e;
    this.setComputed(!0)
};
$jscomp.inherits(mpl$lab$model$ExpressionVariable, mpl$lab$model$ConcreteVariable);
mpl$lab$model$ExpressionVariable.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$ExpressionVariable.superClass_.toString.call(this).slice(0, -1) + ', expression_: "' + this.expression_ + '"}'
}
;
mpl$lab$model$ExpressionVariable.prototype.getBroadcast = function() {
    return !1
}
;
mpl$lab$model$ExpressionVariable.prototype.getClassName = function() {
    return "ExpressionVariable"
}
;
mpl$lab$model$ExpressionVariable.prototype.getValue = function() {
    var a = this.terminal_.eval(this.expression_, !1);
    return goog.isNumber(a) ? a : Number.NaN
}
;
mpl$lab$model$ExpressionVariable.prototype.setBroadcast = function(a) {}
;
mpl$lab$model$ExpressionVariable.prototype.setValue = function(a) {}
;
mpl$lab$model$ExpressionVariable.prototype.setValueSmooth = function(a) {}
;
var mpl$lab$model$FunctionVariable = function(a, b, c, d) {
    mpl$lab$model$ConcreteVariable.call(this, a, b, c);
    this.function_ = d;
    this.setComputed(!0)
};
$jscomp.inherits(mpl$lab$model$FunctionVariable, mpl$lab$model$ConcreteVariable);
mpl$lab$model$FunctionVariable.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : mpl$lab$model$ConcreteVariable.prototype.toString.call(this).slice(0, -1) + ", function_: " + this.function_ + "}"
}
;
mpl$lab$model$FunctionVariable.prototype.getBroadcast = function() {
    return !1
}
;
mpl$lab$model$FunctionVariable.prototype.getClassName = function() {
    return "FunctionVariable"
}
;
mpl$lab$model$FunctionVariable.prototype.getValue = function() {
    return this.function_()
}
;
mpl$lab$model$FunctionVariable.prototype.setBroadcast = function(a) {}
;
mpl$lab$model$FunctionVariable.prototype.setValue = function(a) {}
;
mpl$lab$model$FunctionVariable.prototype.setValueSmooth = function(a) {}
;
var mpl$lab$view$DisplayText = function(a, b, c) {
    this.text_ = a || "";
    this.location_ = b || mpl$lab$util$Vector.ORIGIN;
    this.zIndex_ = 0;
    this.dragable_ = !1;
    this.proto_ = goog.isDefAndNotNull(c) ? c : null
};
mpl$lab$view$DisplayText.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", location: " + this.location_ + ", font: " + this.getFont() + ', fillStyle: "' + this.getFillStyle() + '", textAlign: ' + this.getTextAlign() + ", textBaseline: " + this.getTextBaseline() + ", zIndex: " + this.getZIndex() + "}"
}
;
mpl$lab$view$DisplayText.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "DisplayText{text_: " + this.text_ + "}"
}
;
mpl$lab$view$DisplayText.prototype.contains = function(a) {
    return !1
}
;
mpl$lab$view$DisplayText.prototype.draw = function(a, b) {
    a.save();
    a.fillStyle = this.getFillStyle();
    a.font = this.getFont();
    a.textAlign = this.getTextAlign();
    a.textBaseline = this.getTextBaseline();
    var c = b.simToScreenX(this.location_.getX());
    b = b.simToScreenY(this.location_.getY());
    a.fillText(this.text_, c, b);
    a.restore()
}
;
mpl$lab$view$DisplayText.prototype.getFillStyle = function() {
    return void 0 !== this.fillStyle_ ? this.fillStyle_ : null != this.proto_ ? this.proto_.getFillStyle() : "black"
}
;
mpl$lab$view$DisplayText.prototype.getFont = function() {
    return void 0 !== this.font_ ? this.font_ : null != this.proto_ ? this.proto_.getFont() : "12pt sans-serif"
}
;
mpl$lab$view$DisplayText.prototype.getMassObjects = function() {
    return []
}
;
mpl$lab$view$DisplayText.prototype.getPosition = function() {
    return this.location_
}
;
mpl$lab$view$DisplayText.prototype.getSimObjects = function() {
    return []
}
;
mpl$lab$view$DisplayText.prototype.getTextAlign = function() {
    return void 0 !== this.textAlign_ ? this.textAlign_ : null != this.proto_ ? this.proto_.getTextAlign() : "left"
}
;
mpl$lab$view$DisplayText.prototype.getTextBaseline = function() {
    return void 0 !== this.textBaseline_ ? this.textBaseline_ : null != this.proto_ ? this.proto_.getTextBaseline() : "alphabetic"
}
;
mpl$lab$view$DisplayText.prototype.getText = function() {
    return this.text_
}
;
mpl$lab$view$DisplayText.prototype.getZIndex = function() {
    return void 0 !== this.zIndex_ ? this.zIndex_ : null != this.proto_ ? this.proto_.getZIndex() : 0
}
;
mpl$lab$view$DisplayText.prototype.isDragable = function() {
    return this.dragable_
}
;
mpl$lab$view$DisplayText.prototype.setDragable = function(a) {
    this.dragable_ = a
}
;
mpl$lab$view$DisplayText.prototype.setFillStyle = function(a) {
    this.fillStyle_ = a;
    return this
}
;
mpl$lab$view$DisplayText.prototype.setFont = function(a) {
    this.font_ = a;
    return this
}
;
mpl$lab$view$DisplayText.prototype.setPosition = function(a) {
    this.location_ = a
}
;
mpl$lab$view$DisplayText.prototype.setText = function(a) {
    this.text_ = a
}
;
mpl$lab$view$DisplayText.prototype.setTextAlign = function(a) {
    this.textAlign_ = a;
    return this
}
;
mpl$lab$view$DisplayText.prototype.setTextBaseline = function(a) {
    this.textBaseline_ = a;
    return this
}
;
mpl$lab$view$DisplayText.prototype.setZIndex = function(a) {
    this.zIndex_ = a
}
;
var mpl$sims$common$AbstractApp = function(a, b, c, d, e, f, g) {
    mpl$lab$util$AbstractSubject.call(this, g || "APP");
    this.simRect = b;
    b = Math.round(800 * this.simRect.getHeight() / this.simRect.getWidth());
    this.layout = new mpl$sims$common$TabLayout(a,800,b);
    this.terminal = this.layout.terminal;
    a = this.layout.simCanvas;
    this.sim = c;
    this.terminal.setAfterEval(goog.bind(c.modifyObjects, c));
    new mpl$lab$util$GenericObserver(c,goog.bind(function(a) {
        c.modifyObjects()
    }, this),"modifyObjects after parameter or variable change");
    this.advance = d;
    this.simList = c.getSimList();
    this.varsList = c.getVarsList();
    this.simCtrl = new mpl$lab$app$SimController(a,e);
    this.simView = new mpl$lab$view$SimView("SIM_VIEW",this.simRect);
    a.addView(this.simView);
    this.displayList = this.simView.getDisplayList();
    this.statusView = new mpl$lab$view$SimView("STATUS_VIEW",new mpl$lab$util$DoubleRect(-10,-10,10,10));
    a.addView(this.statusView);
    this.axes = mpl$sims$common$CommonControls.makeAxes(this.simView, !0);
    this.simRun = new mpl$lab$app$SimRunner(this.advance);
    this.simRun.addCanvas(a);
    this.simRun.addErrorObserver(this.simCtrl);
    this.clock = this.simRun.getClock();
    this.showEnergyParam = this.energyGraph = null;
    goog.isDefAndNotNull(f) && (this.energyGraph = new mpl$lab$graph$EnergyBarGraph(f),
    this.showEnergyParam = mpl$sims$common$CommonControls.makeShowEnergyParam(this.energyGraph, this.statusView, this));
    this.displayClock = new mpl$lab$view$DisplayClock(goog.bind(c.getTime, c),goog.bind(this.clock.getRealTime, this.clock),2,2);
    this.displayClock.setPosition(new mpl$lab$util$Vector(8,4));
    this.showClockParam = mpl$sims$common$CommonControls.makeShowClockParam(this.displayClock, this.statusView, this);
    e = mpl$sims$common$CommonControls.makePanZoomControls(this.simView, !0, goog.bind(function() {
        this.simView.setSimRect(this.simRect)
    }, this));
    this.layout.div_sim.appendChild(e);
    this.panZoomParam = mpl$sims$common$CommonControls.makeShowPanZoomParam(e, this);
    this.panZoomParam.setValue(!1);
    this.diffEqSolver = new mpl$lab$model$DiffEqSolverSubject(c,f,d);
    this.graph = new mpl$sims$common$StandardGraph1(c.getVarsList(),this.layout.graphCanvas,this.layout.graph_controls,this.layout.div_graph,this.simRun);
    this.graph.line.setDrawingMode(mpl$lab$view$DrawingMode.LINES);
    this.timeGraph = new mpl$sims$common$TimeGraph1(c.getVarsList(),this.layout.timeGraphCanvas,this.layout.time_graph_controls,this.layout.div_time_graph,this.simRun)
};
$jscomp.inherits(mpl$sims$common$AbstractApp, mpl$lab$util$AbstractSubject);
mpl$sims$common$AbstractApp.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : ", sim: " + this.sim.toStringShort() + ", simList: " + this.simList.toStringShort() + ", simCtrl: " + this.simCtrl.toStringShort() + ", advance: " + this.advance + ", simRect: " + this.simRect + ", simView: " + this.simView.toStringShort() + ", statusView: " + this.statusView.toStringShort() + ", axes: " + this.axes.toStringShort() + ", simRun: " + this.simRun.toStringShort() + ", clock: " + this.clock.toStringShort() + ", energyGraph: " + (null == this.energyGraph ? "null" : this.energyGraph.toStringShort()) + ", displayClock: " + this.displayClock.toStringShort() + ", graph: " + this.graph.toStringShort() + ", timeGraph: " + this.timeGraph.toStringShort() + ", layout: " + this.layout.toStringShort() + ", easyScript: " + this.easyScript.toStringShort() + ", terminal: " + this.terminal + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$sims$common$AbstractApp.prototype.addControl = function(a) {
    return this.layout.addControl(a)
}
;
mpl$sims$common$AbstractApp.prototype.addPlaybackControls = function() {
    this.addControl(mpl$sims$common$CommonControls.makePlaybackControls(this.simRun))
}
;
mpl$sims$common$AbstractApp.prototype.addStandardControls = function() {
    null != this.showEnergyParam && this.addControl(new mpl$lab$controls$CheckBoxControl(this.showEnergyParam));
    this.addControl(new mpl$lab$controls$CheckBoxControl(this.showClockParam));
    
}
;
mpl$sims$common$AbstractApp.prototype.defineNames = function(a) {
    this.simRun.setAppName(a);
    mpl$lab$util$Util.ADVANCED || (this.terminal.addWhiteList(a),
    this.terminal.addRegex("advance|axes|clock|diffEqSolver|displayClock|energyGraph|graph|layout|sim|simCtrl|simList|simRect|simRun|simView|statusView|timeGraph|easyScript|terminal|varsList|displayList", a + "."),
    this.terminal.addRegex("simCanvas", a + ".layout."))
}
;
goog.exportProperty(mpl$sims$common$AbstractApp.prototype, "defineNames", mpl$sims$common$AbstractApp.prototype.defineNames);
mpl$sims$common$AbstractApp.prototype.makeEasyScript = function(a) {
    var b = [this.varsList];
    goog.isArray(a) && (b = goog.array.concat(b, a));
    this.easyScript = mpl$sims$common$CommonControls.makeEasyScript(this.getSubjects(), b, this.simRun, this.terminal)
}
;
mpl$sims$common$AbstractApp.prototype.getSubjects = function() {
    return goog.array.concat([this, this.sim, this.diffEqSolver, this.simRun, this.clock, this.simView, this.statusView, this.varsList], this.layout.getSubjects(), this.graph.getSubjects(), this.timeGraph.getSubjects())
}
;
mpl$sims$common$AbstractApp.prototype.addURLScriptButton = function() {
    this.addControl(mpl$sims$common$CommonControls.makeURLScriptButton(this.easyScript, this.simRun));
    this.graph.addControl(mpl$sims$common$CommonControls.makeURLScriptButton(this.easyScript, this.simRun));
    this.timeGraph.addControl(mpl$sims$common$CommonControls.makeURLScriptButton(this.easyScript, this.simRun))
}
;
mpl$sims$common$AbstractApp.prototype.eval = function(a, b) {
    try {
        return this.terminal.eval(a, b)
    } catch (c) {
        this.terminal.alertOnce(c)
    }
}
;
goog.exportProperty(mpl$sims$common$AbstractApp.prototype, "eval", mpl$sims$common$AbstractApp.prototype.eval);
mpl$sims$common$AbstractApp.prototype.setup = function() {
    this.clock.resume();
    this.terminal.parseURLorRecall();
    this.sim.saveInitialState();
    this.sim.modifyObjects();
    this.simRun.memorize()
}
;
goog.exportProperty(mpl$sims$common$AbstractApp.prototype, "setup", mpl$sims$common$AbstractApp.prototype.setup);
mpl$sims$common$AbstractApp.prototype.start = function() {
    this.simRun.startFiring()
}
;
goog.exportProperty(mpl$sims$common$AbstractApp.prototype, "start", mpl$sims$common$AbstractApp.prototype.start);
var mpl$lab$model$AbstractODESim = function(a, b, c) {
    mpl$lab$util$AbstractSubject.call(this, a || "SIM");
    this.simList_ = b || new mpl$lab$model$SimList;
    this.varsList_ = c || new mpl$lab$model$VarsList([],[],this.getName() + "_VARS");
    this.recentState_ = this.initialState_ = null
};
$jscomp.inherits(mpl$lab$model$AbstractODESim, mpl$lab$util$AbstractSubject);
mpl$lab$model$AbstractODESim.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : ", varsList_: " + this.varsList_.toStringShort() + ", simList_: " + this.simList_.toStringShort() + mpl$lab$util$AbstractSubject.prototype.toString.call(this)
}
;
mpl$lab$model$AbstractODESim.prototype.evaluate = function(a, b, c) {}
;
mpl$lab$model$AbstractODESim.prototype.getTime = function() {
    return this.varsList_.getTime()
}
;
mpl$lab$model$AbstractODESim.prototype.getVarsList = function() {
    return this.varsList_
}
;
mpl$lab$model$AbstractODESim.prototype.modifyObjects = function() {}
;
mpl$lab$model$AbstractODESim.prototype.reset = function() {
    null != this.initialState_ && this.varsList_.setValues(this.initialState_);
    this.simList_.removeTemporary(mpl$lab$util$Util.POSITIVE_INFINITY);
    this.modifyObjects();
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$Simulation.RESET))
}
;
mpl$lab$model$AbstractODESim.prototype.restoreState = function() {
    null != this.recentState_ && this.varsList_.setValues(this.recentState_, !0)
}
;
mpl$lab$model$AbstractODESim.prototype.saveInitialState = function() {
    this.initialState_ = this.varsList_.getValues();
    this.broadcast(new mpl$lab$util$GenericEvent(this,mpl$lab$model$Simulation.INITIAL_STATE_SAVED))
}
;
mpl$lab$model$AbstractODESim.prototype.saveState = function() {
    this.recentState_ = this.varsList_.getValues()
}
;
mpl$lab$model$AbstractODESim.prototype.getSimList = function() {
    return this.simList_
}
;
mpl$lab$model$AbstractODESim.prototype.setVarsList = function(a) {
    this.varsList_ = a
}
;
var mpl$lab$util$MutableVector = function(a, b, c) {
    c = goog.isNumber(c) ? c : 0;
    this.x_ = mpl$lab$util$Util.testNumber(a);
    this.y_ = mpl$lab$util$Util.testNumber(b);
    this.z_ = mpl$lab$util$Util.testNumber(c)
};
mpl$lab$util$MutableVector.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "MutableVector{x: " + mpl$lab$util$Util.NF5(this.x_) + ", y: " + mpl$lab$util$Util.NF5(this.y_) + (0 != this.z_ ? ", z: " + mpl$lab$util$Util.NF5(this.z_) : "") + "}"
}
;
mpl$lab$util$MutableVector.clone = function(a) {
    return new mpl$lab$util$MutableVector(a.getX(),a.getY(),a.getZ())
}
;
mpl$lab$util$MutableVector.prototype.add = function(a) {
    this.x_ += a.getX();
    this.y_ += a.getY();
    this.z_ += a.getZ();
    return this
}
;
mpl$lab$util$MutableVector.prototype.distanceSquaredTo = function(a) {
    var b = this.x_ - a.getX()
      , c = this.y_ - a.getY();
    a = this.z_ - a.getZ();
    return b * b + c * c + a * a
}
;
mpl$lab$util$MutableVector.prototype.distanceTo = function(a) {
    return Math.sqrt(this.distanceSquaredTo(a))
}
;
mpl$lab$util$MutableVector.prototype.divide = function(a) {
    if (1 === a)
        return this;
    if (a < mpl$lab$util$Vector.TINY_POSITIVE)
        throw Error("div by zero");
    this.x_ /= a;
    this.y_ /= a;
    this.z_ /= a;
    return this
}
;
mpl$lab$util$MutableVector.prototype.equals = function(a) {
    return goog.isNull(a) ? !1 : a.getX() === this.x_ && a.getY() === this.y_ && a.getZ() === this.z_
}
;
mpl$lab$util$MutableVector.prototype.getX = function() {
    return this.x_
}
;
mpl$lab$util$MutableVector.prototype.getY = function() {
    return this.y_
}
;
mpl$lab$util$MutableVector.prototype.getZ = function() {
    return this.z_
}
;
mpl$lab$util$MutableVector.prototype.length = function() {
    return Math.sqrt(this.lengthSquared())
}
;
mpl$lab$util$MutableVector.prototype.lengthCheap = function() {
    var a = Math.abs(this.x_) + Math.abs(this.y_);
    return 0 == this.z_ ? a : a + Math.abs(this.z_)
}
;
mpl$lab$util$MutableVector.prototype.lengthSquared = function() {
    return 0 === this.z_ ? this.x_ * this.x_ + this.y_ * this.y_ : this.x_ * this.x_ + this.y_ * this.y_ + this.z_ * this.z_
}
;
mpl$lab$util$MutableVector.prototype.multiply = function(a) {
    this.x_ *= a;
    this.y_ *= a;
    this.z_ *= a;
    return this
}
;
mpl$lab$util$MutableVector.prototype.nearEqual = function(a, b) {
    return mpl$lab$util$Util.veryDifferent(this.x_, a.getX(), b) || mpl$lab$util$Util.veryDifferent(this.y_, a.getY(), b) || mpl$lab$util$Util.veryDifferent(this.z_, a.getZ(), b) ? !1 : !0
}
;
mpl$lab$util$MutableVector.prototype.normalize = function() {
    var a = this.length();
    if (a < mpl$lab$util$Vector.TINY_POSITIVE)
        throw Error();
    return new mpl$lab$util$Vector(this.x_ / a,this.y_ / a,this.z_ / a)
}
;
mpl$lab$util$MutableVector.prototype.setTo = function(a, b, c) {
    this.x_ = a;
    this.y_ = b;
    this.z_ = c || 0;
    return this
}
;
mpl$lab$util$MutableVector.prototype.setToVector = function(a) {
    this.x_ = a.getX();
    this.y_ = a.getY();
    this.z_ = a.getZ();
    return this
}
;
mpl$lab$util$MutableVector.prototype.subtract = function(a) {
    this.x_ -= a.getX();
    this.y_ -= a.getY();
    this.z_ -= a.getZ();
    return this
}
;
var mpl$lab$util$Random = function() {};
mpl$lab$util$Random.prototype.getModulus = function() {}
;
mpl$lab$util$Random.prototype.getSeed = function() {}
;
mpl$lab$util$Random.prototype.nextFloat = function() {}
;
mpl$lab$util$Random.prototype.nextInt = function() {}
;
mpl$lab$util$Random.prototype.nextRange = function(a) {}
;
mpl$lab$util$Random.prototype.randomInts = function(a) {}
;
mpl$lab$util$Random.prototype.setSeed = function(a) {}
;
var mpl$lab$util$RandomLCG = function(a) {
    this.seed_ = a = Math.floor(Math.abs(a)) % mpl$lab$util$RandomLCG.m;
    mpl$lab$util$RandomLCG.checkSeed(this.seed_);
    goog.asserts.assert((mpl$lab$util$RandomLCG.m - 1) * mpl$lab$util$RandomLCG.a + mpl$lab$util$RandomLCG.c < Math.pow(2, 53))
};
mpl$lab$util$RandomLCG.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "RandomLCG{seed: " + this.seed_ + "}"
}
;
mpl$lab$util$RandomLCG.checkSeed = function(a) {
    if (0 > a)
        throw Error("random seed must be 0 or greater " + a);
    if (a >= mpl$lab$util$RandomLCG.m)
        throw Error("random seed must be less than " + mpl$lab$util$RandomLCG.m + " was " + a);
    if (a != Math.floor(a))
        throw Error("random seed must be an integer " + a);
}
;
mpl$lab$util$RandomLCG.prototype.getModulus = function() {
    return mpl$lab$util$RandomLCG.m
}
;
mpl$lab$util$RandomLCG.prototype.getSeed = function() {
    return this.seed_
}
;
mpl$lab$util$RandomLCG.prototype.nextFloat = function() {
    var a = this.nextInt_();
    mpl$lab$util$RandomLCG.DEBUG_RANDOM && console.log(" " + a);
    return a / (mpl$lab$util$RandomLCG.m - 1)
}
;
mpl$lab$util$RandomLCG.prototype.nextInt = function() {
    var a = this.nextInt_();
    mpl$lab$util$RandomLCG.DEBUG_RANDOM && console.log(" " + a);
    return a
}
;
mpl$lab$util$RandomLCG.prototype.nextInt_ = function() {
    var a = this.seed_ * mpl$lab$util$RandomLCG.a + mpl$lab$util$RandomLCG.c
      , b = mpl$lab$util$RandomLCG.m;
    this.seed_ = a - Math.floor(a / b) * b;
    mpl$lab$util$RandomLCG.checkSeed(this.seed_);
    return this.seed_
}
;
mpl$lab$util$RandomLCG.prototype.nextRange = function(a) {
    a = this.nextRange_(a);
    mpl$lab$util$RandomLCG.DEBUG_RANDOM && console.log(" " + a);
    return a
}
;
mpl$lab$util$RandomLCG.prototype.nextRange_ = function(a) {
    if (0 >= a)
        throw Error("n must be positive");
    var b = this.nextInt_() / mpl$lab$util$RandomLCG.m;
    return Math.floor(b * a)
}
;
mpl$lab$util$RandomLCG.prototype.randomInts = function(a) {
    for (var b = Array(a), c = Array(a), d = 0; d < a; d++)
        b[d] = -1,
        c[d] = d;
    d = a;
    var e = 0;
    do
        for (var f = this.nextRange_(d--), g = 0, h = 0; h < a; h++)
            if (!(0 > c[h]) && g++ == f) {
                b[e++] = c[h];
                c[h] = -1;
                break
            }
    while (0 > b[a - 1]);if (mpl$lab$util$RandomLCG.DEBUG_RANDOM) {
        a = "";
        for (d = 0; d < b.length; d++)
            a += " " + b[d];
        console.log(a)
    }
    return b
}
;
mpl$lab$util$RandomLCG.prototype.setSeed = function(a) {
    mpl$lab$util$RandomLCG.checkSeed(a);
    this.seed_ = a
}
;
mpl$lab$util$RandomLCG.DEBUG_RANDOM = !1;
mpl$lab$util$RandomLCG.DEBUG_RANDOM_DEEP = !1;
mpl$lab$util$RandomLCG.m = 4294967296;
mpl$lab$util$RandomLCG.a = 1664525;
mpl$lab$util$RandomLCG.c = 1013904223;
var mpl$sims$springs$ChainOfSpringsSim = function(a) {
    mpl$lab$model$AbstractODESim.call(this, a);
    this.attachRight_ = !0;
    this.dragAtom_ = -1;
    this.gravity_ = 4;
    this.mass_ = 5;
    this.damping_ = .1;
    this.restLength_ = 0;
    this.stiffness_ = 6;
    this.springDamping_ = .1;
    this.potentialOffset_ = 0;
    this.fixed1_ = mpl$lab$model$PointMass.makeSquare(.5, "fixed1");
    this.fixed1_.setPosition(new mpl$lab$util$Vector(-6,4));
    this.fixed2_ = mpl$lab$model$PointMass.makeSquare(.5, "fixed2");
    this.fixed2_.setPosition(new mpl$lab$util$Vector(6,4));
    this.atoms_ = [];
    this.springs_ = [];
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.GRAVITY,mpl$sims$springs$ChainOfSpringsSim.i18n.GRAVITY,goog.bind(this.getGravity, this),goog.bind(this.setGravity, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.MASS,mpl$sims$springs$ChainOfSpringsSim.i18n.MASS,goog.bind(this.getMass, this),goog.bind(this.setMass, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.STIFFNESS,mpl$sims$springs$ChainOfSpringsSim.i18n.STIFFNESS,goog.bind(this.getStiffness, this),goog.bind(this.setStiffness, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.DAMPING,mpl$sims$springs$ChainOfSpringsSim.i18n.DAMPING,goog.bind(this.getDamping, this),goog.bind(this.setDamping, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.SPRING_DAMPING,mpl$sims$springs$ChainOfSpringsSim.i18n.SPRING_DAMPING,goog.bind(this.getSpringDamping, this),goog.bind(this.setSpringDamping, this)));
    this.addParameter(new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.LENGTH,mpl$sims$springs$ChainOfSpringsSim.i18n.LENGTH,goog.bind(this.getLength, this),goog.bind(this.setLength, this)))
};
$jscomp.inherits(mpl$sims$springs$ChainOfSpringsSim, mpl$lab$model$AbstractODESim);
mpl$sims$springs$ChainOfSpringsSim.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", atoms: " + this.atoms_.length + ", gravity_: " + mpl$lab$util$Util.NF(this.gravity_) + ", damping_: " + mpl$lab$util$Util.NF(this.damping_) + ", mass_: " + mpl$lab$util$Util.NF(this.mass_) + ", springDamping_: " + mpl$lab$util$Util.NF(this.springDamping_) + ", stiffness_: " + mpl$lab$util$Util.NF(this.stiffness_) + ", restLength_: " + mpl$lab$util$Util.NF(this.restLength_) + ", fixed1_: " + this.fixed1_ + ", fixed2_: " + this.fixed2_ + mpl$lab$model$AbstractODESim.prototype.toString.call(this)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getClassName = function() {
    return "ChainOfSpringsSim"
}
;
mpl$sims$springs$ChainOfSpringsSim.makeVarNames = function(a, b) {
    for (var c = [], d = 4 * a + 8, e = 0; e < d; e++)
        c.push(mpl$sims$springs$ChainOfSpringsSim.getVariableName(e, a, b));
    return c
}
;
mpl$sims$springs$ChainOfSpringsSim.getVariableName = function(a, b, c) {
    if (8 <= a)
        switch (b = c ? mpl$sims$springs$ChainOfSpringsSim.i18n.BALL : mpl$sims$springs$ChainOfSpringsSim.en.BALL,
        b = b + " " + (1 + Math.floor((a - 8) / 4)) + " ",
        (a - 8) % 4) {
        case 0:
            return b + (c ? mpl$sims$springs$ChainOfSpringsSim.i18n.X_POSITION : mpl$sims$springs$ChainOfSpringsSim.en.X_POSITION);
        case 1:
            return b + (c ? mpl$sims$springs$ChainOfSpringsSim.i18n.Y_POSITION : mpl$sims$springs$ChainOfSpringsSim.en.Y_POSITION);
        case 2:
            return b + (c ? mpl$sims$springs$ChainOfSpringsSim.i18n.X_VELOCITY : mpl$sims$springs$ChainOfSpringsSim.en.X_VELOCITY);
        case 3:
            return b + (c ? mpl$sims$springs$ChainOfSpringsSim.i18n.Y_VELOCITY : mpl$sims$springs$ChainOfSpringsSim.en.Y_VELOCITY)
        }
    else
        switch (a) {
        case 0:
            return c ? mpl$lab$model$VarsList.i18n.TIME : mpl$lab$model$VarsList.en.TIME;
        case 1:
            return c ? mpl$lab$model$EnergySystem.i18n.KINETIC_ENERGY : mpl$lab$model$EnergySystem.en.KINETIC_ENERGY;
        case 2:
            return c ? mpl$lab$model$EnergySystem.i18n.POTENTIAL_ENERGY : mpl$lab$model$EnergySystem.en.POTENTIAL_ENERGY;
        case 3:
            return c ? mpl$lab$model$EnergySystem.i18n.TOTAL_ENERGY : mpl$lab$model$EnergySystem.en.TOTAL_ENERGY;
        case 4:
            return c ? mpl$sims$springs$ChainOfSpringsSim.i18n.ANCHOR1_X : mpl$sims$springs$ChainOfSpringsSim.en.ANCHOR1_X;
        case 5:
            return c ? mpl$sims$springs$ChainOfSpringsSim.i18n.ANCHOR1_Y : mpl$sims$springs$ChainOfSpringsSim.en.ANCHOR1_Y;
        case 6:
            return c ? mpl$sims$springs$ChainOfSpringsSim.i18n.ANCHOR2_X : mpl$sims$springs$ChainOfSpringsSim.en.ANCHOR2_X;
        case 7:
            return c ? mpl$sims$springs$ChainOfSpringsSim.i18n.ANCHOR2_Y : mpl$sims$springs$ChainOfSpringsSim.en.ANCHOR2_Y
        }
    throw Error();
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.makeChain = function(a, b) {
    this.getSimList().removeAll(this.atoms_);
    goog.array.clear(this.atoms_);
    this.getSimList().removeAll(this.springs_);
    goog.array.clear(this.springs_);
    var c = this.getVarsList();
    c.deleteVariables(0, c.numVariables());
    c.addVariables(mpl$sims$springs$ChainOfSpringsSim.makeVarNames(a, !1), mpl$sims$springs$ChainOfSpringsSim.makeVarNames(a, !0));
    c.setComputed(1, 2, 3);
    var d = this.fixed1_.getPosition()
      , e = this.fixed2_.getPosition();
    c.setValue(4, d.getX());
    c.setValue(5, d.getY());
    c.setValue(6, e.getX());
    c.setValue(7, e.getY());
    this.getSimList().add(this.fixed1_);
    this.getSimList().add(this.fixed2_);
    if (0 < a) {
        c = e.subtract(d).length();
        d = Math.min(.5, c / (2 * (a + 1)));
        e = this.mass_ / a;
        for (c = 0; c < a; c++) {
            var f = mpl$lab$model$PointMass.makeCircle(d, "atom" + (c + 1)).setMass(e);
            this.atoms_.push(f)
        }
        this.getSimList().addAll(this.atoms_);
        d = new mpl$lab$model$Spring("spring 0",this.fixed1_,mpl$lab$util$Vector.ORIGIN,this.atoms_[0],mpl$lab$util$Vector.ORIGIN,this.restLength_,this.stiffness_);
        d.setDamping(this.springDamping_);
        this.springs_.push(d);
        for (c = 1; c < a; c++)
            d = new mpl$lab$model$Spring("spring " + c,this.atoms_[c - 1],mpl$lab$util$Vector.ORIGIN,this.atoms_[c],mpl$lab$util$Vector.ORIGIN,this.restLength_,this.stiffness_),
            d.setDamping(this.springDamping_),
            this.springs_.push(d);
        b && (d = new mpl$lab$model$Spring("spring " + (a + 1),this.atoms_[a - 1],mpl$lab$util$Vector.ORIGIN,this.fixed2_,mpl$lab$util$Vector.ORIGIN,this.restLength_,this.stiffness_),
        d.setDamping(this.springDamping_),
        this.springs_.push(d));
        this.getSimList().addAll(this.springs_);
        this.straightLine()
    }
    this.saveInitialState();
    this.modifyObjects()
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.straightLine = function() {
    for (var a = this.getVarsList().getValues(), b = this.fixed1_.getPosition(), c = this.fixed2_.getPosition().subtract(b), d = this.atoms_.length, e = 0; e < d; e++) {
        var f = b.add(c.multiply((e + 1) / (d + 1)));
        a[4 * e + 8] = f.getX();
        a[4 * e + 9] = f.getY();
        a[4 * e + 10] = 0;
        a[4 * e + 11] = 0
    }
    this.getVarsList().setValues(a);
    this.modifyObjects()
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getEnergyInfo = function() {
    var a = this.getVarsList().getValues();
    this.moveObjects(a);
    return this.getEnergyInfo_(a)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getEnergyInfo_ = function(a) {
    var b = 0
      , c = 0;
    goog.array.forEach(this.springs_, function(a) {
        c += a.getPotentialEnergy()
    });
    goog.array.forEach(this.atoms_, function(a) {
        b += a.getKineticEnergy();
        c += this.gravity_ * a.getMass() * a.getPosition().getY()
    }, this);
    return new mpl$lab$model$EnergyInfo(c + this.potentialOffset_,b)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setPotentialEnergy = function(a) {
    this.potentialOffset_ = 0;
    this.potentialOffset_ = a - this.getEnergyInfo().getPotential()
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.modifyObjects = function() {
    var a = this.getVarsList()
      , b = a.getValues();
    this.moveObjects(b);
    b = this.getEnergyInfo_(b);
    a.setValue(1, b.getTranslational(), !0);
    a.setValue(2, b.getPotential(), !0);
    a.setValue(3, b.getTotalEnergy(), !0)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.moveObjects = function(a) {
    goog.array.forEach(this.atoms_, function(b, c) {
        c = 4 * c + 8;
        b.setPosition(new mpl$lab$util$Vector(a[c],a[1 + c]));
        b.setVelocity(new mpl$lab$util$Vector(a[2 + c],a[3 + c],0))
    });
    this.fixed1_.setPosition(new mpl$lab$util$Vector(a[4],a[5]));
    this.fixed2_.setPosition(new mpl$lab$util$Vector(a[6],a[7]))
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.startDrag = function(a, b, c, d, e) {
    this.dragAtom_ = goog.array.indexOf(this.atoms_, a);
    return -1 < this.dragAtom_ || a == this.fixed1_ || a == this.fixed2_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.mouseDrag = function(a, b, c, d) {
    b = b.subtract(c);
    c = this.getVarsList();
    if (a == this.fixed1_)
        c.setValue(4, b.getX()),
        c.setValue(5, b.getY());
    else if (a == this.fixed2_)
        c.setValue(6, b.getX()),
        c.setValue(7, b.getY());
    else if (-1 < this.dragAtom_) {
        if (a != this.atoms_[this.dragAtom_])
            return;
        a = 4 * this.dragAtom_ + 8;
        c.setValue(0 + a, b.getX());
        c.setValue(1 + a, b.getY());
        c.setValue(2 + a, 0);
        c.setValue(3 + a, 0)
    }
    c.incrSequence(1, 2, 3);
    this.moveObjects(c.getValues())
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.finishDrag = function(a, b, c) {
    this.dragAtom_ = -1
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.handleKeyEvent = function(a, b, c) {}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.evaluate = function(a, b, c) {
    mpl$lab$util$Util.zeroArray(b);
    this.moveObjects(a);
    b[0] = 1;
    goog.array.forEach(this.atoms_, function(c, e) {
        if (this.dragAtom_ != e) {
            e = 4 * e + 8;
            b[e] = a[e + 2];
            b[e + 1] = a[e + 3];
            var d = c.getMass()
              , g = new mpl$lab$util$MutableVector(0,0);
            goog.array.forEach(this.springs_, function(a) {
                a.getBody1() == c ? g.add(a.calculateForces()[0].getVector()) : a.getBody2() == c && g.add(a.calculateForces()[1].getVector())
            });
            g.add(new mpl$lab$util$Vector(0,-this.gravity_ * d));
            g.add((new mpl$lab$util$Vector(a[e + 2],a[e + 3])).multiply(-this.damping_));
            b[e + 2] = g.getX() / d;
            b[e + 3] = g.getY() / d
        }
    }, this);
    return null
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getGravity = function() {
    return this.gravity_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setGravity = function(a) {
    this.gravity_ = a;
    this.getVarsList().incrSequence(2, 3);
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.GRAVITY)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getDamping = function() {
    return this.damping_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setDamping = function(a) {
    this.damping_ = a;
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.DAMPING)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getSpringDamping = function() {
    return this.springDamping_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setSpringDamping = function(a) {
    this.springDamping_ = a;
    goog.array.forEach(this.springs_, function(b) {
        b.setDamping(a)
    });
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.SPRING_DAMPING)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getMass = function() {
    return this.mass_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setMass = function(a) {
    this.mass_ = a;
    var b = this.mass_ / this.atoms_.length;
    goog.array.forEach(this.atoms_, function(a, d) {
        a.setMass(b)
    });
    this.getVarsList().incrSequence(1, 2, 3);
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.MASS)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getLength = function() {
    return this.restLength_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setLength = function(a) {
    this.restLength_ = a;
    for (var b = 0; b < this.springs_.length; b++)
        this.springs_[b].setRestLength(a);
    this.getVarsList().incrSequence(2, 3);
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.LENGTH)
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.getStiffness = function() {
    return this.stiffness_
}
;
mpl$sims$springs$ChainOfSpringsSim.prototype.setStiffness = function(a) {
    this.stiffness_ = a;
    for (var b = 0; b < this.springs_.length; b++)
        this.springs_[b].setStiffness(a);
    this.getVarsList().incrSequence(2, 3);
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.STIFFNESS)
}
;
mpl$sims$springs$ChainOfSpringsSim.en = {
    BALL: "ball",
    ANCHOR1_X: "anchor1 X",
    ANCHOR1_Y: "anchor1 Y",
    ANCHOR2_X: "anchor2 X",
    ANCHOR2_Y: "anchor2 Y",
    NUM_LINKS: "chain links",
    X_POSITION: "position X",
    Y_POSITION: "position Y",
    X_VELOCITY: "velocity X",
    Y_VELOCITY: "velocity Y",
    DAMPING: "damping",
    SPRING_DAMPING: "spring damping",
    GRAVITY: "gravity",
    MASS: "mass",
    LENGTH: "spring length",
    STIFFNESS: "spring stiffness",
    STRAIGHT_LINE: "straight line",
    ATTACH_RIGHT: "attach right"
};
mpl$sims$springs$ChainOfSpringsSim.de_strings = {
    BALL: "Ball",
    ANCHOR1_X: "Anker1 X",
    ANCHOR1_Y: "Anker1 Y",
    ANCHOR2_X: "Anker2 X",
    ANCHOR2_Y: "Anker2 Y",
    NUM_LINKS: "Kettenglieder",
    X_POSITION: "Position X",
    Y_POSITION: "Position Y",
    X_VELOCITY: "Geschwindigkeit X",
    Y_VELOCITY: "Geschwindigkeit Y",
    DAMPING: "D\u00e4mpfung",
    SPRING_DAMPING: "Federd\u00e4mpfung",
    GRAVITY: "Gravitation",
    MASS: "Masse",
    LENGTH: "Federl\u00e4nge",
    STIFFNESS: "Federsteifheit",
    STRAIGHT_LINE: "gerade Linie",
    ATTACH_RIGHT: "rechts festmachen"
};
mpl$sims$springs$ChainOfSpringsSim.i18n = "de" === goog.LOCALE ? mpl$sims$springs$ChainOfSpringsSim.de_strings : mpl$sims$springs$ChainOfSpringsSim.en;
var mpl$lab$model$SimpleAdvance = function(a, b) {
    this.sim_ = a;
    this.odeSolver_ = b || new mpl$lab$model$RungeKutta(a);
    this.timeStep_ = .025
};
mpl$lab$model$SimpleAdvance.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", odeSolver_: " + this.odeSolver_.toStringShort() + "}"
}
;
mpl$lab$model$SimpleAdvance.prototype.toStringShort = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : "SimpleAdvance{sim_: " + this.sim_.toStringShort() + "}"
}
;
mpl$lab$model$SimpleAdvance.prototype.advance = function(a, b) {
    this.sim_.getSimList().removeTemporary(this.sim_.getTime());
    a = this.odeSolver_.step(a);
    if (null != a)
        throw Error("error during advance " + a);
    this.sim_.modifyObjects();
    void 0 !== b && b.memorize()
}
;
mpl$lab$model$SimpleAdvance.prototype.getDiffEqSolver = function() {
    return this.odeSolver_
}
;
mpl$lab$model$SimpleAdvance.prototype.getTime = function() {
    return this.sim_.getTime()
}
;
mpl$lab$model$SimpleAdvance.prototype.getTimeStep = function() {
    return this.timeStep_
}
;
mpl$lab$model$SimpleAdvance.prototype.reset = function() {
    this.sim_.reset()
}
;
mpl$lab$model$SimpleAdvance.prototype.save = function() {
    this.sim_.saveInitialState()
}
;
mpl$lab$model$SimpleAdvance.prototype.setDiffEqSolver = function(a) {
    this.odeSolver_ = a
}
;
mpl$lab$model$SimpleAdvance.prototype.setTimeStep = function(a) {
    this.timeStep_ = a
}
;
var mpl$sims$springs$ChainOfSpringsApp = function(a, b, c) {
    mpl$lab$util$Util.setErrorHandler();
    b = goog.isNumber(b) ? b : 10;
    c = goog.isDef(c) ? c : !0;
    var d = new mpl$lab$util$DoubleRect(-6.4,-6,6.4,6)
      , e = new mpl$sims$springs$ChainOfSpringsSim;
    e.makeChain(b, c);
    var f = new mpl$lab$model$SimpleAdvance(e);
    mpl$sims$common$AbstractApp.call(this, a, d, e, f, e, e);
    this.numAtoms = b;
    this.attachRight = c;
    this.mySim = e;
    this.protoMass = (new mpl$lab$view$DisplayShape).setFillStyle("blue");
    this.protoAnchor = (new mpl$lab$view$DisplayShape).setFillStyle("gray");
    this.protoSpring = (new mpl$lab$view$DisplaySpring).setWidth(.3).setColorCompressed("#0c0").setColorExpanded("#6f6");
    this.protoSpring.setZIndex(-1);
    goog.array.forEach(this.simList.toArray(), function(a) {
        this.addBody(a)
    }, this);
    this.simList.addObserver(this);
    this.addPlaybackControls();
    this.addParameter(a = (new mpl$lab$util$ParameterNumber(this,mpl$sims$springs$ChainOfSpringsSim.en.NUM_LINKS,mpl$sims$springs$ChainOfSpringsSim.i18n.NUM_LINKS,goog.bind(this.getNumLinks, this),goog.bind(this.setNumLinks, this))).setDecimalPlaces(0));
    this.addControl(new mpl$lab$controls$SliderControl(a,0,10,!1));
    a = this.mySim.getParameterNumber(mpl$sims$springs$ChainOfSpringsSim.en.GRAVITY);
    this.addControl(new mpl$lab$controls$SliderControl(a,0,40,!1));
    a = this.mySim.getParameterNumber(mpl$sims$springs$ChainOfSpringsSim.en.DAMPING);
    this.addControl(new mpl$lab$controls$SliderControl(a,0,1,!1));
    a = this.mySim.getParameterNumber(mpl$sims$springs$ChainOfSpringsSim.en.MASS);
    this.addControl(new mpl$lab$controls$SliderControl(a,.2,50.2,!0));
    a = this.mySim.getParameterNumber(mpl$sims$springs$ChainOfSpringsSim.en.STIFFNESS);
    this.addControl(new mpl$lab$controls$SliderControl(a,0,100,!1));
    this.addStandardControls();
    
    this.graph.line.setXVariable(9);
    this.graph.line.setYVariable(11);
    this.graph.line.setDrawingMode(mpl$lab$view$DrawingMode.LINES);
    this.timeGraph.line1.setYVariable(1);
    this.timeGraph.line2.setYVariable(2);
    this.makeEasyScript();
    this.addURLScriptButton()
};
$jscomp.inherits(mpl$sims$springs$ChainOfSpringsApp, mpl$sims$common$AbstractApp);
mpl$sims$springs$ChainOfSpringsApp.prototype.toString = function() {
    return mpl$lab$util$Util.ADVANCED ? "" : this.toStringShort().slice(0, -1) + ", numAtoms: " + this.numAtoms + ", attachRight: " + this.attachRight + mpl$sims$common$AbstractApp.prototype.toString.call(this)
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.getClassName = function() {
    return "ChainOfSpringsApp"
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.addBody = function(a) {
    if (null == this.displayList.find(a))
        if (a instanceof mpl$lab$model$PointMass) {
            var b = a.getShape() == mpl$lab$model$ShapeType.OVAL ? this.protoMass : this.protoAnchor;
            this.displayList.add(new mpl$lab$view$DisplayShape(a,b))
        } else
            a instanceof mpl$lab$model$Spring && this.displayList.add(new mpl$lab$view$DisplaySpring(a,this.protoSpring))
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.observe = function(a) {
    if (a.getSubject() == this.simList) {
        var b = a.getValue();
        a.nameEquals(mpl$lab$model$SimList.OBJECT_ADDED) ? this.addBody(b) : a.nameEquals(mpl$lab$model$SimList.OBJECT_REMOVED) && (a = this.displayList.find(b),
        null != a && this.displayList.remove(a))
    }
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.getNumLinks = function() {
    return this.numAtoms
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.setNumLinks = function(a) {
    a = Math.floor(a + .5);
    this.numAtoms != a && (this.numAtoms = a,
    this.mySim.makeChain(this.numAtoms, this.attachRight),
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.NUM_LINKS),
    this.easyScript.update())
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.getAttachRight = function() {
    return this.attachRight
}
;
mpl$sims$springs$ChainOfSpringsApp.prototype.setAttachRight = function(a) {
    this.attachRight != a && (this.attachRight = a,
    this.mySim.makeChain(this.numAtoms, this.attachRight),
    this.broadcastParameter(mpl$sims$springs$ChainOfSpringsSim.en.ATTACH_RIGHT),
    this.easyScript.update())
}
;
function module$contents$myphysicslab$sims$springs$ChainOfSpringsApp_makeChainOfSpringsApp(a, b, c) {
    return new mpl$sims$springs$ChainOfSpringsApp(a,b,c)
}
goog.exportSymbol("makeChainOfSpringsApp", module$contents$myphysicslab$sims$springs$ChainOfSpringsApp_makeChainOfSpringsApp);
