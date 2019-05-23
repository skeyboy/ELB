/**
 * 命名空间：GT
 * @namespace GT
 * @version 1.0.1
 * @author chengkun
 */

(typeof(GT) === "undefined")?window.GT={}:GT;

(function(T){
	'use strict'

	/** IIFE(Immediately-Invoked Function Expression)
	 * T.XXX={}
	 */
	T.ctx = window.publicPath;
	T.locale = window.sp_locale;
	T.timeZone = window.time_zone;

	var isChina, notify ;

	isChina = function(){
		return T.locale=='zh_CN';
	}();

	/**
	 * 通知提醒
	 * @method notify
	 * @static
	 * @param {options} o 传入参数
	 */
	notify = function(options){
		var notifyInstance,
			defualt = {
				message : '新消息',
				effect : 'flash', // flash | scroll 闪烁还是滚动
				interval : 600, //标题闪烁，或者滚动速度
				audio : {
					file : null,
					loop : true
				},
				notification : {
					title : '新消息',
					ico : null,
					body : '',
					id : '',
					tag : 'gener-tech',
					singleton : false,
					autoClose : true,
					time : 5*1000,
					attributes : null,
					backgroundColor : '#FFFFFF',
					onshow  : function(){},
					onerror : function(){},
					onclose : function(){},
					onclick : function(){}
				}
			};


		function notifyInstance(options){
			this.init(options);
		}

		notifyInstance.prototype = {
			init : function(_options){
				$.extend(true, this, defualt, _options);
				this.notifyPool = [];
				this.timer = null;
				this.title = _options.title || document.title;
				if(this.audio && this.audio.file){
					this.setAudio(this.audio.file);
				}
				return this;
			},
			setId : function(id){
				this.notification.id = id;
				return this;
			},
			setAudio : function(url){
				if(url){
					if(this.audioElm) this.audioElm.remove();
					this.audioElm = createAudio(url);
					document.body.appendChild(this.audioElm);
				}
				return this;
			},
			setNotify : function(noti){
				if(noti){
					$.extend(this.notification, noti);
				}
				return this;
			},
			// Chrome 桌面通知
			notify : function(){
				var op = this.notification;
				if(!op.icon){
					op.icon = generatedPicture({backgroundColor : op.backgroundColor});
				}

				if (window.webkitNotifications) {
					//Chrome老版本
					if (window.webkitNotifications.checkPermission() == 0) {
						var _notification = window.webkitNotifications.createNotification(op.icon, op.title, op.body);
						_notification.onshow = function(){
							//关闭通知
							if(op.autoClose) setTimeout(function(){_notification.close();}, op.time);
							$.proxy(op.display, this);
						}
						_notification.onerror = op.onerror;
						_notification.onclose = op.onclose;
						_notification.onclick = op.onclick;
						_notification.replaceId = op.singleton ? op.tag : op.id;
						_notification.attributes = op.attributes;
						_notification.show();

						//加入对象池
						this.notifyPool.push(_notification);
					}
				} else if ('Notification' in window){

					//chrome26+
					//判断是否有权限
					//'default' 等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
					if (window.Notification.permission === 'granted') {
						var _notification = new window.Notification(op.title, {
							icon: op.icon,
							body: op.body,
							tag : op.singleton ? op.tag : op.id
						});

						_notification.onshow = function(){
							//关闭通知
							if(op.autoClose) setTimeout(function(){_notification.close();}, op.time);
							$.proxy(op.display, this);
						}
						_notification.onerror = op.onerror;
						_notification.onclose = op.onclose;
						_notification.onclick = op.onclick;

						_notification.attributes = op.attributes;
						this.notifyPool.push(_notification);//加入对象池

						//关闭通知
						if(op.autoClose) setTimeout(function(){_notification.close();}, op.time);
					} else {
						//询问用户是否允许显示通知
						//如果没权限，则请求权限
						window.Notification.requestPermission(function(permission) {

							// Whatever the user answers, we make sure we store the
							// information
							if (!('permission' in window.Notification)) {
								window.Notification.permission = permission;
							}

							if (permission === 'granted') {
								var _notification = new window.Notification(op.title, {
									icon: op.icon,
									body: op.body,
									tag : op.singleton ? op.tag : op.id
								});
								_notification.onshow = function(){
									//关闭通知
									if(op.autoClose) setTimeout(function(){_notification.close();}, op.time);
									$.proxy(op.display, this);
								}
								_notification.onerror = op.onerror;
								_notification.onclose = op.onclose;
								_notification.onclick = op.onclick;

								_notification.attributes = op.attributes;
								this.notifyPool.push(_notification);//加入对象池

								//关闭通知
								if(op.autoClose) setTimeout(function(){_notification.close();}, op.time);
							}
						});
					}
				} else {
					console.log('Your browser supports desktop notification feature');
				}
			},
			render : function(){
				var t = '.';
				switch (this.effect) {
					case 'flash':
						document.title = (document.title === t) ? this.message : t;
						break;
					case 'scroll':
						document.title = document.title.slice(1);
						if (0 === document.title.length) {
							document.title = this.message
						}
					default:
						break;
				}
			},
			//添加计时器
			addTimer:function(){
				this.clearTimer();
				if(GT.browser.ie && GT.browser.ie < 9){
					this.timer = setInterval(this.render, this.interval);
				}else{
					this.timer = setInterval(this.render.bind(this), this.interval);
				}
				return this;
			},
			//清除计时器
			clearTimer : function(){
				clearInterval(this.timer);
				document.title = this.title;
				return this;
			},
			//显示桌面通知，标题闪烁
			show : function(){
				this.addTimer();
				if(GT.browser.chrome || GT.browser.firefox) this.notify();
				return this;
			},
			//清除桌面通知，标题闪烁
			clear : function(){
				this.clearTimer();
				this.stop();
				for(var i=0, len=this.notifyPool.length; i<len; i++){
					this.notifyPool[i].close();
				}
			},
			//播放声音
			play : function(){
				if(!this.audio || !this.audio.file) return;
				if(!this.audioElm){
					this.audioElm = createAudio(this.audio.file);
					document.body.appendChild(this.audioElm)
				}
				this.audioElm.loop = this.audio.loop;
				this.audioElm.play();
				return this;
			},
			stop : function(){
				if(this.audioElm){
					this.audioElm.loop = false;
					if(this.audioElm.nodeName === 'OBJECT') this.audioElm.stop();
					else this.audioElm.pause();
				}
				return this;
			}
		};

		//生成图片
		function generatedPicture(settings){
			var canvas = document.createElement('canvas'),
				img = document.createElement('img'),
				ctx;

			canvas.height = canvas.width = 32;
			ctx = canvas.getContext('2d');
			ctx.fillStyle = settings.backgroundColor;
			ctx.fillRect(0, 0, 32, 32);

			return canvas.toDataURL('image/png');
		};

		//生成声音标签
		function createAudio(url){
			var source,
				audioElm = document.createElement('audio');

			if('play' in audioElm) {
				if (GT.isArray(url) && url.length > 0) {
					for (var i = 0; i < url.length; i++) {
						source = document.createElement('source');
						source.src = url[i];
						source.type = 'audio/' + getExtension(url[i]);
						audioElm.appendChild(source);
					}
				} else {
					audioElm.src = url;
				}
			}else{
				var _url = (GT.isArray(url) && url.length > 0)? url[0] : url;
				var $wrapAudio = $('<div id="wrap-audio">').appendTo($('body'));
				//$('<embed id="embed-smart-new-alarm" type="'+('audio/' + getExtension(_url))+'" autoplay="false" loop="true" src="'+_url+'"></embed>').appendTo($wrapAudio);
				$('<object id="embed-smart-new-alarm" hidden classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95"><param name="autoStart" value="0" /><param name="src" value="'+_url+'" /><param name="loop" value="true" /></object>').appendTo($wrapAudio);
				audioElm = document.getElementById('embed-smart-new-alarm');
			}
			return audioElm;
		}

		//获取文件后缀
		function getExtension (file_name) {
			return file_name.match(/\.([^\.]+)$/)[1];
		}

		return new notifyInstance(options);
	};

	/**  获取最高z-index */
	var getMaxZindex = function (father){
		var index_highest = 1;
		var searchSpace= father ? father : 'div';
		$(searchSpace).each(function () {
			var index_current = parseInt($(this).css("zIndex"), 10);
			if (index_current > index_highest) {
				index_highest = index_current;
			}
		});
		return index_highest + 1;
	};

	T.isChina = isChina;
	T.notify = notify;
	T.getMaxZindex = getMaxZindex;

}(GT));
