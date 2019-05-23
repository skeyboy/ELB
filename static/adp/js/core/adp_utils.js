/** 
 * 命名空间：GT 
 * @namespace GT
 * @version 1.0.1
 * @author  yi.xw, chengkun
*/

(typeof(GT) === "undefined")?window.GT={}:GT;

(function(GT){
	/** IIFE(Immediately-Invoked Function Expression)
	 */
	GT.version="1.0.1";
    	
	var isUndefined,
      isNull,
      isNumber,
      isString,
      isBoolean,
      isObject,
      isArray,
      isArguments,
      isFunction,
	  isDate,
	  isURL,
      isHTML,
	  isEmail,
	  isPlainObject,
      type,
      isEmpty,
      forEach;
	

    /**
     * 判断变量的值是否是 undefined
	 * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的值是 undefined 时返回 true
     */
    isUndefined = function(o) {
        return typeof(o) === "undefined";
    };
        
    /**
     * 判断变量的值是否是 null
     * 
     * @method isNull 
     * @static 
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的值是 null 时返回 true
     */
    isNull = function(o) {
        return o === null;
    };
    
    /**
     * 判断变量的类型是否是 Number
     * 
     * @method isUndefined
	 * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 number 时返回 true
     */
    isNumber = function(o) {
        return (o === 0 || o) && o.constructor === Number;
    };
    
    /**
     * 判断变量的类型是否是 Boolean
     * 
     * @method isUndefined
     * 
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 boolean 时返回 true
     */
    isBoolean = function(o) {
        return (o === false || o) && (o.constructor === Boolean);
    };
    
    /**
     * 判断变量的类型是否是 String
     * 
     * @method isString
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 string 时返回 true
     */
    isString = function(o) {
        return (o === "" || o) && (o.constructor === String);
    };
    
    /**
     * 判断变量的类型是否是 Object
     * 
     * @method isObject
     * @static   
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 object 时返回 true
     */
    isObject = function(o) {
        return o && (o.constructor === Object || Object.prototype.toString.call(o) === "[object Object]");
    };
    
    /**
     * 判断变量的类型是否是 Array
     * 
     * 
     * @method isArray
     * @static  
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 array 时返回 true
     */
    isArray = function(o) {
        return o && (o.constructor === Array || Object.prototype.toString.call(o) === "[object Array]");
    };
    
    /**
     * 判断变量的类型是否是 Arguments
     * 
     * 
     * @method isArguments
     * @static 
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 arguments 时返回 true
     */
    isArguments = function(o) {
        return o && o.callee && isNumber(o.length) ? true : false;
    };
    
    /**
     * 判断变量的类型是否是 Function
     * 
     * 
     * @method isFunction
     * @static  
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 function 时返回 true
     */
    isFunction = function(o) {
        return o && (o.constructor === Function);
    };

	/**
     * 判断变量的类型是否是 Date
     * 
     * 
     * @method isDate
     * @static 
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean} 当 o 的类型是 function 时返回 true
     */
    isDate = function(o) {
        return o && (o.constructor === Date);
    };
    
   
    /**
     * 判断变量类型的方法
     * 
     * @static  
     * @param {Mixed} o 传入被检测变量的名称
     * @return {String} 返回变量的类型，如果不识别则返回 other
     */
    type = function(o) {
        if(isUndefined(o)){
            return "undefined";
        }else if(isNull(o)){
            return "null";
        }else if(isNumber(o)){
            return "number";
        }else if(isBoolean(o)){
            return "boolean";
        }else if(isString(o)){
            return "string";
        }else if(isObject(o)){
            return "object";
        }else if(isArray(o)){
            return "array";
        }else if(isArguments(o)){
            return "arguments";
        }else if(isFunction(o)){
            return "function";
        }else if(isDate(o)){
            return "date";
        }else{
            return "other";
        }
        
    };

    /**
     * 判断是否为空
     *
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {String} 返回Boolean
     */
    isEmpty = function(o) {
        if(isUndefined(o) || isNull(o)){
            return true;
        }else if(isObject(o)){
            for ( var name in o ) {
                return false;
            }
            return true;
        }else if(isArray(o)){
            if(o.length>0){
                return false;
            }
            return true;
        }else{
            return false;
        }

    };

	/**
	 * @ignore
	 */
    forEach = function( enumerable, iterator, context ) {
		var i, n, t;

		if ( typeof iterator == "function" && enumerable) {

			n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
			if ( typeof n == "number" ) {
				
				if (Object.prototype.toString.call(enumerable) === "[object Function]") {
					return enumerable;
				}

				for ( i=0; i<n; i++ ) {
					
					t = enumerable[ i ]
					t === undefined && (t = enumerable.charAt && enumerable.charAt( i ));

					// 被循环执行的函数，默认会传入三个参数(array[i], i, array)
					iterator.call( context || null, t, i, enumerable );
				}
			
			// enumerable is number
			} else if (typeof enumerable == "number") {

				for (i=0; i<enumerable; i++) {
					iterator.call( context || null, i, i, i);
				}
			
			// enumerable is json
			} else if (typeof enumerable == "object") {

				for (i in enumerable) {
					if ( enumerable.hasOwnProperty(i) ) {
						iterator.call( context || null, enumerable[ i ], i, enumerable );
					}
				}
			}
		}

		return enumerable;
	};	

	/**
     * 判断是否是一个可接受的 url 串
     * 
     * @method isURL	 
     *
	 * @static 
     * @param {Mixed} o 要检测的字符串
     * @return {Boolean} 如果是可接受的 url 则返回 true
     */
    isURL = function(o) {
        var reg = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
        return reg.test(o);
    };

    isHTML = function(o) {
        var reg = /<[^>]+>/g;
        return reg.test(o);
    }

	/**
     * 判断一个字符串是否是邮箱格式
     * @method isEmail	 
     * @static 
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean}
     */
    isEmail = function(o){
        if (emailStr.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1){
            return true;
        }else{
            return false;
        }
    };

	/**
     * 判断对象是否为一个简单对象 {}
	 * @method isPlainObject	 
     * @static
     * @param {Mixed} o 传入被检测变量的名称
     * @return {Boolean}
     */
	isPlainObject = function(o) {
		var key,
			hasOwnProperty = Object.prototype.hasOwnProperty;

		if ( type(unknow) != "object" ) {
			return false;
		}

		//判断new fn()自定义对象的情况
		//constructor不是继承自原型链的
		//并且原型中有isPrototypeOf方法才是Object
		if ( unknow.constructor &&
			!hasOwnProperty.call(unknow, "constructor") &&
			!hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		//判断有继承的情况
		//如果有一项是继承过来的，那么一定不是字面量Object
		//OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
		for ( key in unknow ) {}
		return key === undefined || hasOwnProperty.call( unknow, key );
	};


    /* Browser part */
    var pf = navigator.platform.toLowerCase(),
        ua = navigator.userAgent.toLowerCase(),        
        platform,
        browser,
        toFixedVersion,
        s;
    
    /**
     * @ignore
     * @param String ver
     * @param Number floatLength
     * @return Number 
     */
    toFixedVersion = function(ver, floatLength){
        ver= (""+ver).replace(/_/g,".");
        floatLength = floatLength || 1;
        ver = String(ver).split(".");
        ver = ver[0] + "." + (ver[1] || "0");
        ver = Number(ver).toFixed(floatLength);
        return ver;
    };

    /**
     * platform 名字空间
     * 
     * @namespace
     * @name platform
     * @type Object
     */
    platform = {
        getPlatform:function(){
            return pf;
        },
        
        /**
         * 操作系统的名称
         * 
         * @property name
         * @memberOf platform
         */
        name: (window.orientation != undefined) ? 'iPod' : (pf.match(/mac|win|linux/i) || ['unknown'])[0],
        
        version: 0,
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * iPod touch
         * Mozilla/5.0 (iPod; U; CPU iPhone OS 3_0 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        iPod: 0,
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        iPad:0,
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0_1 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A400 Safari/528.16
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        iPhone:0,
        
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        android:0,
        
        
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * 
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        win: 0,
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * 
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        linux: 0,
        
        /**
         * 操作系统的版本号，如果是0表示不是此操作系统
         * 
         * 
         * @description {Num} 操作系统的版本号，如果是0表示不是此操作系统
         * @constant
         * @type Number
         */
        mac: 0,
        
        /**
         * 设置浏览器类型和版本
         * 
         * @ignore
         * @private
         * @memberOf browser
         * 
         */
        set: function(name, ver){
            this.name = name;
            this.version = ver;
            this[name] = ver;
        }
    };

    platform[platform.name] = true;
    
    // 探测操作系统版本
    (s = ua.match(/windows ([\d.]+)/)) ? platform.set("win",toFixedVersion(s[1])):
    (s = ua.match(/windows nt ([\d.]+)/)) ? platform.set("win",toFixedVersion(s[1])):
    (s = ua.match(/linux ([\d.]+)/)) ? platform.set("linux",toFixedVersion(s[1])) :
    (s = ua.match(/mac ([\d.]+)/)) ? platform.set("mac",toFixedVersion(s[1])):
    (s = ua.match(/ipod ([\d.]+)/)) ? platform.set("iPod",toFixedVersion(s[1])):
    (s = ua.match(/ipad[\D]*os ([\d_]+)/)) ? platform.set("iPad",toFixedVersion(s[1])):
    (s = ua.match(/iphone ([\d.]+)/)) ? platform.set("iPhone",toFixedVersion(s[1])):
    (s = ua.match(/android ([\d.]+)/)) ? platform.set("android",toFixedVersion(s[1])) : 0;

    /**
     * browser 名字空间
     * 
     * @namespace
     * @name browser
     */
    browser = {        
        /**
         * 获取浏览器的插件信息
         * 
         */
        getPlugins: function(){
            return plug;
        },
                      
        /**
         * 获取浏览器的userAgent信息
         * 
         * @memberOf browser
         */
        getUserAgent: function(){
            return ua;
        },
        
        /**
         * 用户使用的浏览器的名称，如：chrome
         * 
         * 
         * @description {String} 用户使用的浏览器的名称，如：chrome
         * @type Number
         */
        name: "unknown",
        
        /**
         * 浏览器的版本
         * @property version
         * @memberOf browser
         */
        version: 0,
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        ie: 0,
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        firefox: 0,
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        chrome: 0,
        
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        opera: 0,
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        safari: 0,
        
        /**
         * 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * 
         * 
         * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
         * @type Number
         */
        mobileSafari: 0,
        
        /**
         * 用户使用的是否是adobe 的air内嵌浏览器
         */
        adobeAir: 0,
        
        /**
         * 是否支持css3的borderimage
         * 
         * @description {boolean} 检测是否支持css3属性borderimage
         */
        //borderimage: false,
        
        /**
         * 设置浏览器类型和版本
         * 
         * @ignore
         * @private
         * @memberOf browser
         * 
         */
        set: function(name, ver){
            this.name = name;
            this.version = ver;
            this[name] = ver;
        }
    };
    
    // 探测浏览器并存入 browser 对象
    (s = ua.match(/msie ([\d.]+)/)) ? browser.set("ie",toFixedVersion(s[1])):
    (s = ua.match(/firefox\/([\d.]+)/)) ? browser.set("firefox",toFixedVersion(s[1])) :
    (s = ua.match(/chrome\/([\d.]+)/)) ? browser.set("chrome",toFixedVersion(s[1])) :
    (s = ua.match(/opera.([\d.]+)/)) ? browser.set("opera",toFixedVersion(s[1])) :
    (s = ua.match(/adobeair\/([\d.]+)/)) ? browser.set("adobeAir",toFixedVersion(s[1])) :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? browser.set("safari",toFixedVersion(s[1])) : 0;

    //mobile safari 判断，可与safari字段并存
    (s = ua.match(/version\/([\d.]+).*mobile.*safari/)) ? browser.set("mobileSafari",toFixedVersion(s[1])) : 0;
    if(platform.iPad) browser.set('mobileSafari', '0.0');
    
    //browser.set("borderimage",browser.firefox>3 || browser.safari || browser.chrome);
    
    if(browser.ie){
        if(!document.documentMode) document.documentMode=Math.floor(browser.ie);
        else if(document.documentMode!==Math.floor(browser.ie)) browser.set("ie",toFixedVersion(document.documentMode));
    }
    /* Browser part */
	

	/**
     * number 命名空间
     * @namespace 
     * @name number
     */
	GT.number = 
	/**
     * @lends number
     */	
	{
		/**
		 * 为目标数字添加逗号分隔
		 * 
		 * @method comma  
		 * @param {Number} number 要分隔的数字
		 * @param {Number} length 两次逗号之间的数字位数，默认为3位
		 *
		 * @return {String} 添加逗号分隔后的字符串
		 *
		 * @example
		 *    1. GT.number.comma(1234567)     
		 *       结果:  "1,234,567"
		 *    2. GT.number.comma(1234567, 3)
		 *       结果:  "1,234,567"
		 */
		comma : function (number, length) {
			var source = number;
			if (!length || length < 1) {
				length = 3;
			}
		
			source = String(source).split(".");
			source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
			return source.join(".");
		},

		
		/**
		 * 生成随机数的方法
		 * 
		 * @method random
		 * 
		 * @param {Number} min 要分隔的数字
		 * @return {Number} max 返回生成的随机数
		 *
         *
		 * @example
		 *    1. GT.number.random(1, 100)     
		 *       结果: 1<=x<=100
		 *    
		 */
		random : function(min, max){
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

        /**
         * 可把 Number 四舍五入为指定小数位数的数字。
         * @param number 指定小数
         * @param num 小数位数 规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。
         * @returns {Number}
         */
        toFixed : function(number, num){
            var fix = num || 0;
            if(isNumber(number)){
                number = number.toFixed(fix);
            }
            return number;
        },
		
		/**
		 * 对目标数字进行0补齐处理
		 * 
		 * @method pad
		 * 
		 * @param {Number} number 需要输出的长度
		 * @param {Number} length 需要输出的长度
		 *
		 * @return {String} 对目标数字进行0补齐处理后的结果
		 *
         * @example
		 *    GT.number.pad(123, 3)  
		 *    结果: 000123
		 */
		pad : function (number, length) {
			var source = number;
			var pre = "",
				negative = (source < 0),
				string = String(Math.abs(source));
		
			if (string.length < length) {
				pre = (new Array(length - string.length + 1)).join('0');
			}
		
			return (negative ?  "-" : "") + pre + string;
		}

	};

	
	/**
     * String 命名空间
     * @namespace 
     * @name string
     */
	GT.string = 
	/**
     * @lends string
     */	
	{
		/**
		 * 清除字符串开头和结尾的空格
		 * 包括全角空格符
		 *		 
		 * @param {String} string 目标字符串
		 * 
		 * @return {String} 返回清除后的字符串
		 *
		 * @example
		 *    GT.string.trim(" GT ")     
		 *       结果: "GT"
		 * 
		 */
		trim : function(string){
			var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
			return String(string).replace(trimer, '');
		},
		/**
		 * 字符串格式化
		 * @param {String} string 目标字符串	
		 * @return {String} 返回格式化后的字符串
		 * @example
		 * GT.string.format('{0} is dead, but {1} is alive! {0} {2}', 'ASP', 'ASP.NET');     
		 * 结果: "ASP is dead, but ASP.NET is alive! ASP {2}"
		 */
		format : function(str){
			    var args = Array.prototype.slice.call(arguments, 1);
			    return str.replace(/{(\d+)}/g, function(match, number) { 
			      return (typeof args[number] != 'undefined') ? args[number] : match;
			    });
		},
		
		/**
		 * 对目标字符串进行html编码	 
		 *
		 * @param {String} string 目标字符串
		 * 
		 * @return {String} html编码后的字符串
		 *
		 * @example
		 *    GT.string.encodeHTML("<div>GT</div>")     
		 *       结果: "&lt;div&gt;GT&lt;/div&gt;"
		 * 
		 */
		encodeHTML : function (string) {
			return string.replace(/&/g,'&amp;')
						.replace(/</g,'&lt;')
						.replace(/>/g,'&gt;')
						.replace(/"/g, "&quot;")
						.replace(/'/g, "&#39;");
		},
		
		/**
		 * 对目标字符串进行html解码		 
		 *
		 * @param {String} string 目标字符串
		 * 
		 * @return {String} html解码后的字符串
		 *
		 * @example
		 *    GT.string.decodeHTML("&lt;div&gt;GT&lt;/div&gt;")     
		 *       结果: "<div>GT</div>"
		 * 
		 */
		decodeHTML : function (string) {
			var str = string
						.replace(/&quot;/g,'"')
						.replace(/&lt;/g,'<')
						.replace(/&gt;/g,'>')
						.replace(/&amp;/g, "&");
			//处理转义的中文和实体字符
			return str.replace(/&#([\d]+);/g, function(_0, _1){
				return String.fromCharCode(parseInt(_1, 10));
			});
		},
		
		/**
		 * 去掉字符串中的html标签	 
		 *
		 * @param {String} string 目标字符串
		 * 
		 * @return {String} 去掉html标签后的字符串
		 *
		 * @example
		 *    GT.string.stripTags("<div>GT</div>")     
		 *       结果: "GT"
		 * 
		 */
		stripTags : function(string) {
			return (string || '').replace(/<[^>]+>/g, '');
		},

		/**
		 * 将目标字符串中常见全角字符转换成半角字符	 
		 *
		 * @param {String} string 目标字符串
		 * 
		 * @return {String} 转换后的字符串
		 *
		 * @example
		 *    GT.string.toHalfWidth("１２３４５６７８９")     
		 *       结果: "123456789"
		 * 
		 */
		toHalfWidth : function (string) {
			return string.replace(/[\uFF01-\uFF5E]/g,
				function(c){
					return String.fromCharCode(c.charCodeAt(0) - 65248);
				}).replace(/\u3000/g," ");
		}
	};

	
	/**
     * Array 命名空间
     * @namespace 
     * @name array
     */
	GT.array = 
	/**
     * @lends array
     */		
	{
		/**
		 * 清空数组
		 * @param {Array} array 目标数组
		 * @return {Array} 空数组
		 * @example
		 *    var arr = ["a","b","c","d","e","b","c"];
		 *    GT.string.empty(arr)     
		 *       结果: []
		 *
		 */
		empty : function (array) {
			array.length = 0;
			return array;
		},

		/**
		 * 从数组中寻找符合条件的第一个元素
		 *
		 *
		 * @param {Array} array 指定数组
		 * @param {Function} iterator 用于做对比的函数
		 *
		 * @return {Object} 匹配的项
		 *
		 * @example		
		 *      var arr = ["GT","GTTech","GT"];
		 *      GT.array.find(arr, function(item1, index){
		 *          //return index == 2;    	
		 *          return item1 == "GT";
		 *      });
		 *      结果: "GT"
		 *
		 */
		find : function (array, iterator) {
			var i, item, n=array.length;

			if (type(iterator) == "function") {
				for (i=0; i<n; i++) {
					item = array[i];
					if (iterator.call(array, item, i, array) === true) {
						return item;
					}
				}
			}else{
                for(var j in array){
                    if(iterator==array[j]) return true;
                }
            }

			return null;
		},
		
		/**
		 * 数组--把匹配项移动最前
		 *
		 *
		 * @param {Array} array 指定数组
		 * @param {item} obj 用于做对比的对象
		 *
		 * @return {Array} 改变后的数组
		 *
		 * @example		
		 *      var arr = [1,2,3,4];
		 *      GT.array.shiftMove(arr, 3);
		 *      结果:  [3,1,2,4]
		 */		
		shiftMove: function (arry , item){
			var re = [item];
			for(var i in arry){
				var temp= arry[i];
				if(temp != item){
					re.push(temp);
				}
			}
		    return re ;
		},
		
		/**
		 * 删除数组项 
		 *
		 *
		 * @param {Array} array 指定数组
		 * @param {Number} match  删除数组项
		 *
		 * @return {Array} 操作后的数组
		 *
		 * @example
		 *   
		 *    var arr = ["GT","GTTech","GT"];
		 *    GT.array.remove(arr, "GTTech");
		 *    结果: ["GT","GT"]
		 *
		 */
		remove : function (array, match) {
			var n = array.length;
				
			while (n--) {				
				if (typeof(match) == "function"){
					if (match.call(array, array[n] , n, array) === true) {
						array.splice(n, 1);
					}
				}else{
					if (array[n] === match) {
						array.splice(n, 1);
					}
				}
				
			}
			return array;
		},

		/**
		 * 删除数组指定的项 
		 * @param {Array} array 指定数组
		 * @param {Number} index 指定项的索引位置
		 *
		 * @return {Boolean} 被删除的项
		 *
		 * @example
		 *   
		 *    var arr = ["GT","GTTech","GT"];
		 *    GT.array.removeAt(arr, 1);
		 *    结果: ["GT","GT"]
		 *
		 */
		removeAt : function (array, index) {			
			return array.splice(index, 1)[0];
		},
		
		fetchItem : function (array, item) {
			var temp=[];
			for(var i in array){
				var field = array[i];
				temp.push(field[item]);
			}
			return temp;
		},
		/**
		 * check数组中的重复项 
		 * @param {Array} array 目标数组
		 * 
		 * @return blooean 
		 * @example
		 *   
		 *    var arr = ["a","b","c","d","e","b","c"];
		 *    GT.array.hasRepeat(arr);
		 *    
		 *    var arr = [{a:1,b:1},{b:1,c:3}];
		 *    GT.array.hasRepeat(arr, 'b' );
		 *    
		 *    结果: true/false
		 *
		 */
		//check数组重复数据
		 hasRepeat : function(arry, code){
			var maps = {};
			
		    for(var i in arry){
		    	//简单数组
		    	var item = '';
		    	 if(typeof(arry[i])=='object'){
		            //object 数组
		        	item = arry[i][code];
		    	}else{
			        //普通数组
			        item = arry[i];
		    	}
		    	
		        if(maps[item]){
		        	return true;
		        }
		        item=item||'';
		        maps[item] =item;
		    }
		     
		    return false;
		},
		
		/**
		 * 去除数组中的重复项 *	 
		 *
		 * 
		 * @param {Array} array 目标数组 
		 * @param {Function} fn 用于做除重对比的函数 
		 *
		 * @return {Array} 已经除重后的数组
		 *
		 * @example
		 *   
		 *    var arr = ["a","b","c","a"];
		 *    GT.array.unique(arr);
		 *    结果: ["a","b","c"]
		 *
		 */
		unique : function (array, fn) {
			var len = array.length,
				result = array.slice(0),
				i, datum;
				
			if ('function' != typeof fn) {
				fn = function (item1, item2) {
					return item1 === item2;
				};
			}
			
			// 从后往前双重循环比较
			// 如果两个元素相同，删除后一个
			while (--len > 0) {
				datum = result[len];
				i = len;
				while (i--) {
					if (fn(datum, result[i])) {
						result.splice(len, 1);
						break;
					}
				}
			}

			len = array.length = result.length;
			for ( i=0; i<len; i++ ) {
				array[ i ] = result[ i ];
			}

			return array;
		}
	};
    
	/**
     * Date 命名空间
     * @namespace 
     * @name date
     */
	GT.date = 
	/**
     * @lends date
     */		
	{
		/**
		 * 对目标日期对象进行格式化
		 *		 
		 * @param {Date} source 目标日期对象
		 * @param {String} pattern 日期格式化规则
		 *
		 * @return {String} 格式化后的字符串
		 *
		 * @example
		 *   
		 *    GT.date.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		 *    结果: "2013-12-21 10:54:21"
		 *
		 */
		format : function (source, pattern) {
			if ('string' != typeof pattern) {
				return source.toString();
			}

			function replacer(patternPart, result) {
				pattern = pattern.replace(patternPart, result);
			}
			
			var pad     = GT.number.pad,
				year    = source.getFullYear(),
				month   = source.getMonth() + 1,
				date2   = source.getDate(),
				hours   = source.getHours(),
				minutes = source.getMinutes(),
				seconds = source.getSeconds();

			replacer(/yyyy/g, pad(year, 4));
			replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
			replacer(/MM/g, pad(month, 2));
			replacer(/M/g, month);
			replacer(/dd/g, pad(date2, 2));
			replacer(/d/g, date2);

			replacer(/HH/g, pad(hours, 2));
			replacer(/H/g, hours);
			replacer(/hh/g, pad(hours % 12, 2));
			replacer(/h/g, hours % 12);
			replacer(/mm/g, pad(minutes, 2));
			replacer(/m/g, minutes);
			replacer(/ss/g, pad(seconds, 2));
			replacer(/s/g, seconds);

			return pattern;
		},
		
		/**
		 * 将目标字符串转换成日期对象
		 *
		 *
		 * @param {String} source 目标字符串
		 *
		 * @return {Date} 转换后的日期对象
		 *
		 * @example
		 *   
		 *    GT.date.parse("2013-12-14 12:12:12.445");
		 *    结果: {Date} Sat Dec 14 00:00:00 UTC+0800 2013
		 *
		 */
		parse : function (source) {
			var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
			if ('string' == typeof source) {
				if (reg.test(source) || isNaN(Date.parse(source))) {
				    var tempDate= new Date();
				    var y= tempDate.getFullYear();
				    var m= tempDate.getMonth();
				    var d = tempDate.getDate();
				    
				    var arr;
				    var re_day = /^(\d{0,4})\-?(\d{0,2})\-?(\d{0,2})\s?(\d{0,2})\:?(\d{0,2})\:?(\d{0,2})\.?(\d{0,3})$/;
				    var re_tm = /^(\d{0,2})\:?(\d{0,2})\:?(\d{0,2})\.?(\d{0,3})$/;
				    if(source.match('-')){
					     arr= re_day.exec(source);
				    }else{
				    	 arr= re_tm.exec(source);
				    }
				    arr.shift();  
	
				    y= arr[0]?Number(arr[0]):y;
				    m= arr[1]?Number(arr[1])-1 :m,
				    d= arr[2]?Number(arr[2]):y;
					return new Date(y, m, d,
							Number(arr[3]), 
							Number(arr[4]), 
							Number(arr[5]), 
							Number(arr[6]));
				} else {
					return new Date(source);
				}
			}
			
			return new Date();
		},

		/**
		 * 获取当前时间的函数	
		 * @method now
		 * @example alert(GT.date.now());
		 *     
		 */
		now : function(){
			return +new Date;
		},
		/**
		 *获取UTC时间
		 * @param {date}  目标date
		 * @return {Date} utcdate
		 * @example   
		 *    GT.date.utcDate();
		 *    结果: {Date} Sat Dec 14 00:00:00 UTC+0800 2013
		 */		
		utcDate : function (o){
		    var tempDate ;
			if(typeof(o) === "undefined"){
				tempDate= new Date();
			}else if(o.constructor === Number){
				tempDate=new Date(o);
			}else if(o.constructor === Date){
				tempDate=o;
			}else{
				tempDate= new Date();
			}
			
		    var y= tempDate.getUTCFullYear();
		    var m= tempDate.getUTCMonth();
		    var d = tempDate.getUTCDate();
		    var hh = tempDate.getUTCHours();
		    var mm = tempDate.getUTCMinutes();
		    var ss = tempDate.getUTCSeconds();
		    var mi = tempDate.getUTCMilliseconds();

		    return new Date(y,m,d,hh,mm,ss,mi);  
		    
		    //var offset = new Date().getTimezoneOffset()*1000*60;
		    //var resultDate = new Date(offset + num);
		    //return resultDate;
		}
		
		
		
	};


	/**
     * JSON 命名空间
     * @namespace 
     * @name json
     */
	GT.json = 
	/**
     * @lends json
     */
	{
		/**
		 * 将字符串解析成json对象。注：不会自动祛除空格
		 * 
		 * @method parse
		 * 
		 * @param {String} data	需要解析的字符串
		 * @return {JSON} 解析结果json对象
		 * 
		 * @example
		 *     var jsonStr = "{\"company\":\"GT Tech\",\"address\":\"Shanghai\"}";
		 *     $.json.parse(jsonStr);
		 *     结果: {Object} JSON 对象
		 * 
		 */
		parse : function (data) {
			return (new Function("return (" + data + ")"))();
		},
		
		/**
		 * 将字符串解析成json对象。注：不会自动祛除空格
		 * 
		 * @method stringify
		 * 
		 * @param {JSON} obj 要解析的字符串
		 * @return {String} 解析结果json对象
		 * 
		 * @example
		 *     var jsonObj = 
		 *      {
		 *        company : "GT Tech",
		 *        address : "Shanghai"
		 *      };
		 *     $.json.stringify(jsonObj);
		 *     结果: '{"company":"GT Tech","address":"Shanghai"}'
		 *
		 */
		stringify : (function () {			
			var escapeMap = {
				"\b": '\\b',
				"\t": '\\t',
				"\n": '\\n',
				"\f": '\\f',
				"\r": '\\r',
				'"' : '\\"',
				"\\": '\\\\'
			};
			
			
			function encodeString(source) {
				if (/["\\\x00-\x1f]/.test(source)) {
					source = source.replace(
						/["\\\x00-\x1f]/g, 
						function (match) {
							var c = escapeMap[match];
							if (c) {
								return c;
							}
							c = match.charCodeAt();
							return "\\u00" 
									+ Math.floor(c / 16).toString(16) 
									+ (c % 16).toString(16);
						});
				}
				return '"' + source + '"';
			}
			
			
			function encodeArray(source) {
				var result = ["["], 
					l = source.length,
					preComma, i, item;
					
				for (i = 0; i < l; i++) {
					item = source[i];
					
					switch (typeof item) {
					case "undefined":
					case "function":
					case "unknown":
						break;
					default:
						if(preComma) {
							result.push(',');
						}
						result.push(GT.json.stringify(item));
						preComma = 1;
					}
				}
				result.push("]");
				return result.join("");
			}
			
			
			function pad(source) {
				return source < 10 ? '0' + source : source;
			}
			
			
			function encodeDate(source){
				return '"' + source.getFullYear() + "-" 
						+ pad(source.getMonth() + 1) + "-" 
						+ pad(source.getDate()) + "T" 
						+ pad(source.getHours()) + ":" 
						+ pad(source.getMinutes()) + ":" 
						+ pad(source.getSeconds()) + '"';
			}
			
			return function (value) {
				switch (typeof value) {
				case 'undefined':
					return 'undefined';
					
				case 'number':
					return isFinite(value) ? String(value) : "null";
					
				case 'string':
					return encodeString(value);
					
				case 'boolean':
					return String(value);
					
				default:
					if (value === null) {
						return 'null';
					} else if (type(value) === 'array') {
						return encodeArray(value);
					} else if (type(value) === 'date') {
						return encodeDate(value);
					} else {
						var result = ['{'],
							encode = GT.json.stringify,
							preComma,
							item;
							
						for (var key in value) {
							if (Object.prototype.hasOwnProperty.call(value, key)) {
								item = value[key];
								switch (typeof item) {
								case 'undefined':
								case 'unknown':
								case 'function':
									break;
								default:
									if (preComma) {
										result.push(',');
									}
									preComma = 1;
									result.push(encode(key) + ':' + encode(item));
								}
							}
						}
						result.push('}');
						return result.join('');
					}
				}
			};
		})()
	};
    /**
     * console 日志打印
     *
     * @example
     *     GT.console.log('打印数据');
     *
     */
    var console = {
        log: function(txt) {
            if(window.console)
                window.console.log(txt);
        },
        timeLog: function(txt) {
            this.log(GT.date.format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' ' + txt);
        }
    };



	GT.isUndefined = isUndefined;
	GT.isNull = isNull;
	GT.isNumber = isNumber;
	GT.isString = isString;
	GT.isBoolean = isBoolean;
	GT.isObject = isObject;
	GT.isArray = isArray;
	GT.isArguments = isArguments;
	GT.isFunction = isFunction;
	GT.isDate = isDate;
	GT.isURL = isURL;
    GT.isHTML = isHTML;
	GT.isEmail = isEmail;
	GT.isPlainObject = isPlainObject;	
    GT.type = type;
    GT.isEmpty = isEmpty;
    GT.forEach = forEach;
    GT.platform = platform;
    GT.browser = browser;
    GT.console= console;
  
	//GT.number
	//GT.string
	//GT.array
	//GT.date
	//GT.json
		
}(GT));


