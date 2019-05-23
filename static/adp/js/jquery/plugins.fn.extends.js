
/*********************datepicker START****************/
//兼容之前的datepicker
/**
 * $('div.date').datepicker();
 */
$.fn.datepicker=function(opt){
	var r = this.smartTimepicker(opt);
	//去除focus,并添加验证
	$(r).find('input').off('focus').on('focusout',function(){
		var v = $(this).val();
		if(v&&!CheckDateTime(v)){
			BS.errorMsg('日期格式错误');
			$(this).val('');
		}
	});
	return r;
}

/**
* 例如 ：$('div.date').smartTimepicker({});
*/
$.fn.smartTimepicker=function(opt){
	var defaultOptions ={
			//两者配合使用
			//format:'yyyy-mm-dd hh:ii',
			//minView: 2,
			format:'yyyy-mm-dd',
			minView: 2 ,//0,'hour'//1,'day'//2,'month' //3,'year' //4,'decade
			//endDate: new Date(),
			//initialDate: new Date(),
			weekStart:1,
			autoclose:true,
			todayBtn:true,
			pickerPosition:'bottom-left',
			pickerReferer :'span'
			
	};
	if(opt){
		$.extend(defaultOptions,opt);
	}
	return this.datetimepicker(defaultOptions);
}


//| 日期时间有效性检查 
//| 格式为：YYYY-MM-DD HH:MM:SS 
function CheckDateTime(str){ 
    //var reg=/^(\d+)-(\d{1,2})-(\d{1,2})(\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	if(!str||typeof str !== 'string')
		return false;
    var reg=/^(\d+)-(\d{1,2})-(\d{1,2})$/; 
    var r=str.match(reg); 
    if(r==null) return false; 
    r[2]=r[2]-1; 
    var d= new Date(r[1],r[2],r[3]); 
    if(d.getFullYear()!=r[1]) return false; 
    if(d.getMonth()!=r[2]) return false; 
    if(d.getDate()!=r[3]) return false; 
   // if(d.getHours()!=r[4]) return false; 
    //if(d.getMinutes()!=r[5]) return false; 
    //if(d.getSeconds()!=r[6]) return false; 
    return true; 
}

/****************datepicker END*************/


/*****************timeline************/
/**
 * 数据格式：
 * 		var tl_data = [{
			title:'报警',
			datetime:'2013-11-05 14:14:14',
			user:'three.zhang',
			content:'内容·····',
			remark:'说明',
			url:'http://www.baidu.com'
		},{
			title:'报警',
			datetime:'2013-11-05 14:14:14',
			user:'three.zhang',
			content:'内容·····',
			remark:'说明',
			url:''
		}
		
		];
 */
(function($){
	$.fn.extend({
		adpTimeline : function(data,options){
			
			if(!this.length||!data||!data.length){
				
				return null;
			}
			this._options ={
					
			};
			
			$.extend(this._options,options);
			var _container = $('<div class="timeline-container">'+
								'<div class="timeline" >'+
									'<div class="timeline-node-start"></div>'+
									'<div class="timeline-node-end"></div>'+
								'</div>'+
							+'</div>');
			var _height = 500;//高度
			var len = data.length;
			var eventNodes = '';
			for(var i = 0; i<len ;i++ ){
				var top = 10+(_height-20)*(i/len)-i*len;
				
				eventNodes +='<div data-index ="'+i+'" style="top:'+top+'px" class="timeline-node-event" ></div>';
			}
			
			$(eventNodes).appendTo(_container.find('div.timeline'));
			
			_container.appendTo($(this[0]));
			_container.find('.timeline-node-event').each(function(){
				
				var _this = $(this);
				var index = _this.attr('data-index');
				var detail = data[index];
				//要显示的内容
				
				var content='<label>'+MSG.CMN.time+'：</label>'+detail.datetime+'</br>'
						    +'<label>'+MSG.CMN.concerned+'：</label>'+detail.user+'</br>';
				var sub_content="";
				if(detail.content){
					var toggle_html = '<a data-index ="'+index+'"  class="btn timeline-content-show" href="javascript:void(0);"  >'+MSG.CMN.detail+'</a>';
					content += '<label>'+MSG.CMN.content+'：</label>'+toggle_html+'</br>';
					sub_content = detail.content;
				}
				if(detail.remark){
					content +='<label>'+MSG.CMN.explain+'：</label>'+detail.remark+'</br>';
				}
				if(detail.url){
					content +='<label>'+MSG.CMN.status+'：</label>'
					var urlArr = detail.url.split(',');
					for(var i in urlArr){
						url = urlArr[i];
						content +='<a class="btn" onclick="window.open(\''+url+'\');" href="javascript:void(0);"  >'+MSG.CMN.view+'</a>';
					}
				}
					
				var $popover = $(this).popover({
					animation:true,
					html:true,
					placement:index%2==0?'left':'right',
					title:detail.title,
					content:content
					
				})
				if(sub_content){
					$popover.on('shown.bs.popover', function () {
						
							$(this).next().find('.timeline-content-show').popover({
								animation:true,
								html:true,
								placement:index%2==0?'left':'right',
								title:MSG.CMN.detail,
								content:sub_content
								
							});
						
							
					});;
				}
				
				window.setTimeout(function(){
					_this.popover("show");
				},600*index);
				
			});
		}
	});
})(jQuery);

/*************************timeline END*********************************************/

/*****************jquery uploadify and file upload********************************/
/**
 * 
 * requestUrl-----处理文件上传的controllerA
 * rData----------controllerA额外需要的数据
 * initFile-------加载已经上传的文件
 * 
 *文件大小默认20M,最多十个文件 
 * 参考文档：
 * https://github.com/blueimp/jQuery-File-Upload/wiki/API
 * http://www.uploadify.com/documentation/
 */
(function($){
	
	$.fn.extend({
		adpFileUpload : function(contextPath,requestUrl,rData,initFile){
			if(contextPath == undefined){
				BS.errorMsg("adpFileUpload :contextPath must have");
				return ;
			}
			if(!$(this)[0]){
				BS.errorMsg("adpFileUpload :container must have");
				return ;
			}
			var $container = $($(this)[0]);
			fileUplaod($container,contextPath,requestUrl,rData);
			
			//jquery file upload 插件
			function fileUplaod($container,contextPath,requestUrl,rData){
				$container.load(contextPath+'/redirecttofileUpload',function(){
					$(function () {
						var opts = {
						    /* 	url:"${ctx}/postFile",
					    	type:'post', */
					        dataType: 'json'
					        //autoUpload:true,
					        // filesContainer: $('table tbody.files'),
					        /** done: function (e, data) {
					             $.each(data.result.files, function (index, file) {
					                $('<p/>').text(file.name).appendTo(document.body);
					            }); 
					            
					           
					            GT.console.log(e);
					            GT.console.log(data);
					        },
					        fail:function(e,data){
					        	
					        	GT.console.log(e);
					        	GT.console.log(data);
					        }
					        ,formData:function (form) {
					            return form.serializeArray();
					        } */
					        /********Validation options**********/
					        //,acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i
					        ,maxFileSize :20*1024*1024 // 20 MB
					        ,minFileSize:1
					        ,maxNumberOfFiles:10

					        //The maxNumberOfFiles option depends on the getNumberOfFiles option, 
					        //which is defined by the UI and AngularJS implementations.

					    };
						if(rData&& typeof rData ==='object'){
							opts.formData = rData;
						}
						$container.find('form.fileupload')
						.attr('action',requestUrl)
						.fileupload(opts);
					});
					//window.tmpl是一个js模板插件（tmpl.min.js）
					if(initFile&&window.tmpl){
						//获取id为template-download的模板
						var templFunc = window.tmpl("template-download");
						if(templFunc){
							if(typeof initFile ==='string'){
								$.ajax({
									url:initFile,
									type:'get',
									dataType:'json',
									cache:false,
									success:function(files){
										initUploadedFiles(templFunc,files)
									},
									error:function(){
										BS.errorMsg('初始化附件ajax请求异常！');
									}
								});
							}else if($.isArray(initFile)){
								initUploadedFiles(templFunc,initFile);
							}
						}
						
					}
					
				});
				
			}//--function fileUplaod
			
			//判断使用哪个插件
			function isIE(){
				
			}
			// uploadify 插件
			function uploadify($container,contextPath){
				var _width = $container.width();
				var body_w = $('body').width();
				//判断width是否符合要求，不符合延迟100毫秒。最多延迟两次
				
				if(body_w-_width>30){
					$('<iframe id="iframe-upload"    frameborder="0"  ></iframe>').appendTo($container);
					$("#iframe-upload").width(_width).attr("src",contextPath+'/dialogfileUpload');
				}else{
					window.setTimeout(function(){
						_width = $container.width();
						if(body_w-_width>30){
							$('<iframe id="iframe-upload"    frameborder="0"  ></iframe>').appendTo($container);
							$("#iframe-upload").width(_width).attr("src",contextPath+'/dialogfileUpload2');
						}else{
							window.setTimeout(function(){
								_width = $container.width();
								$('<iframe id="iframe-upload"    frameborder="0"  ></iframe>').appendTo($container);
								$("#iframe-upload").width(_width).prop("src",contextPath+'/dialogfileUpload2');
								
							},100);
						}
					},100);
				}
			}//--function uploadify
			
			//初始化已经上传的files
			function initUploadedFiles(templFunc,files){
				var result = templFunc({
		            'files': files,
		            formatFileSize: function (bytes) {
		                if (typeof bytes !== 'number') {
		                    return '';
		                }
		                if (bytes >= 1000000000) {
		                    return (bytes / 1000000000).toFixed(2) + ' GB';
		                }
		                if (bytes >= 1000000) {
		                    return (bytes / 1000000).toFixed(2) + ' MB';
		                }
		                return (bytes / 1000).toFixed(2) + ' KB';
		            }
		        });
				
				if(result){
					$(result).addClass('in').appendTo("tbody.files");
				}
			}
		}
	});
})(jQuery);


/****************jquery uploadify and file upload  END*******************/




//======================================================================
//创建一个闭包    
(function($) {
	/**
	 * 将form通过serializeArray后，转化为Object
	 */
	$.fn.form2Object = function(){
		var $form = this;
		var _obj = {};
		var formArr = $form.serializeArray();
		for(var i in formArr){
			var nameVal = formArr[i];
			var name = nameVal.name;
			var val = nameVal.value;
			if(_obj[name] === undefined){
				_obj[name] = val;
			}else{
				if($.isArray(_obj[name])){
					_obj[name].push(val);
				}else{
					_obj[name] = [_obj[name]].push(val);
				}
			}
		}
		return _obj;
	};
	
	

})(jQuery); 


//======================================================================
//创建一个闭包
(function($) {
	/**
	 *
	 */
	$.fn.showModalWaiting = function(opts,clazz){
		var _info=MSG.TIP.inHand;
		if('string' === typeof opts){
			_info = opts;
		}
		var _this = $(this[0]);
		//var _this = $("body");
		_this.addClass('modal-waiting-container');
		var maxZindex = GT.getMaxZindex();
		if(!clazz){
			_this.append('<div class="modal-waiting-info" style="z-index: '+(maxZindex+1)+'">'+_info+'</div>');
		}else{
			_this.append('<div class="modal-holding-info" style="z-index: '+(maxZindex+1)+'">'+_info+'</div>');
		}

		return $('<div class="modal-waiting" style="z-index: '+(maxZindex)+'"></div>').appendTo(_this);
	};
	/**
	 *
	 */
	$.fn.hideModalWaiting = function(){
		var _this = $(this[0]);
		//var _this = $("body");
		_this.find(".modal-waiting,.modal-waiting-info").remove();
		return _this.removeClass('modal-waiting-container')
	};



})(jQuery);

