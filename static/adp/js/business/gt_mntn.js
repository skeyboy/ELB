/** 
 * 命名空间：GT.mntn
 * @namespace GT.mntn
 * @author chengkun,zhangziheng
*/

(typeof(GT) === "undefined")?window.GT={}:GT;
(function(T){
	var lastValue;
	/*********************************章节号***************************************/
	var ammAta= function (aircraftNo,length){
		if(!aircraftNo)
			return ;
		
		length = 4;
		$(function(){
			var $inputs = $('.amm-ata');
			$inputs.addClass('waiting');
			if(!$inputs.length){
				return ;
			}
			 //销毁旧autocomplate
			$inputs.unautocomplete();
		    //首先清空cache
			$inputs.flushCache();
		    
			$.ajax({
				url:GT.ctx+"/maintenancemgt/common/getAmmAta",
				data:{
					aircraftNo:aircraftNo,
					length:length
				},
				type:'get',
				dataType:'json',
				success:function(data){
					$inputs.removeClass('waiting');
					if($.isArray(data)&&data.length){
						$inputs.autocomplete(data, {
		                    max: 1000,     //列表里的条目数
		                    minChars: 0,    //自动完成激活之前填入的最小字符
		                    width: 270,     //提示的宽度，溢出隐藏
		                    scrollHeight: 300,   //提示的高度，溢出显示滚动条
		                    matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		                    autoFill: false,    //自动填充
		                    mustMatch:false,
		                    clickFire:true,
		                    highlight: function(value, term) {
		                		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
		                	},
		                    formatItem: function (row, i, max, val, term) {//显示div里面的格式

		                    	 //return row[0];
		                        //return row.ata.substr(0,2)+'-'+row.ata.substr(2,2)+" "+row.title;
		                        //return row.ata.substr(0,2)+'-'+row.ata.substr(2,2);//+'-'+row[0].substr(4,2);
		                        return row.title;
		                    },
		                    formatMatch: function (row, i, max) {
		                    	return row.ata.substr(0,2)+'-'+row.ata.substr(2,2);//+'-'+row[0].substr(4,2);
		                    },
		                    formatResult: function (row) {//最后在在输入框显示的值
		                    	//console.log(row[0])
		                    	return row.ata.substr(0,2)+'-'+row.ata.substr(2,2);//+'-'+row[0].substr(4,2);
		                    }
		                }).result(function (event, row, formatted) {
		                    
		                });
					}
				},
				error:function(){
					$inputs.removeClass('waiting');
				}
			});
		});
	};
	/*********************************章节号END***************************************/
	/*********************************CAMP号***************************************/
	var campAuto= function (){

		$(function(){
			var $inputs = $('.camp-auto');
			if(!$inputs.length){
				return ;
			}

			var MM_CAMP_NO_ARR = window.__MM_CAMP_NO_ARR;

			if($.isArray(MM_CAMP_NO_ARR)&&MM_CAMP_NO_ARR.length){
				$inputs.autocomplete(MM_CAMP_NO_ARR, {
					max: 2000,     //列表里的条目数
					minChars: 0,    //自动完成激活之前填入的最小字符
					width: 200,     //提示的宽度，溢出隐藏
					scrollHeight: 300,   //提示的高度，溢出显示滚动条
					matchContains: false,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
					autoFill: false,    //自动填充
					mustMatch:false,
					clickFire:true,
					formatItem: function (row, i, max, val, term) {//显示div里面的格式
						var ata = $("#ataNo").val();
						if(!ata){
							return row[0];
						}else{
							if(ata.length>1){
								ata = ata.substr(0,2);
							}
							var regexp = new RegExp("^"+ata);
							if(regexp.test(row[0])||row[0]=='N/A'){
								return row[0];
							}else{
								return false;
							}
						}
					},
					formatResult: function (row) {//最后在在输入框显示的值
						//console.log(row[0])
						return row[0];
					}
				}).result(function (event, row, formatted) {

				});
			}
		});
	};
	/*********************************CAMPEND***************************************/

	/**
	 * 解码--MMWOLINK@@DD_PROCESS@@000001@@id
	 * @param val
	 * @param opts
	 * @param rowObj
	 */
	var messagePushAction = function  (actionType,data){
        var id = data.id?data.id:data.mpId;
		if(actionType == "produce_monitor/monitor_detail"&&id){
			//dialog_monitor_list
			PLG.smartOpen(GT.ctx+'/maintenancemgt/produce_monitor/dialog_monitor_list?routineWorkId='+id);
		}else if(actionType == 'maintenance-order'){
			if(data.processCode&&id){
				GT.mntn.handleWorkOrder(data.processCode,id);
			}

		}
	};
	/**
	 * 解码--MMWOLINK@@DD_PROCESS@@000001@@id
	 * @param val
	 * @param opts
	 * @param rowObj
	 */
	var decodeWorkOrderLink = function  (val,opts,row){
		if(/^MMWOLINK@@/.test(val)){
			var linkStr = "";
			var arr = val.split("@@");
			if(arr.length < 4)
				return "";

			var processCode = arr[1];
			var num = arr[2];
			var id = arr[3];
			linkStr = '<a href="javascript:void(0)" style="display:inline-block;" onclick="GT.mntn.openWorkOrder(\''+processCode+'\',\''+id+'\')"><span style="color:blue;">'+
				num+'</span></a>';
			return linkStr;
		}
		if(GT.isUndefined(val)||GT.isNull(val))
			return "";
		return val;
	};
	/**
	 * 解码--MMWOLINK@@DD_PROCESS@@000001@@id
	 * @param val
	 * @param opts
	 * @param rowObj
	 */
	var decodeWorkOrderText = function  (val,opts,row){
		if(/^MMWOLINK@@/.test(val)){
			var linkStr = "";
			var arr = val.split("@@");
			if(arr.length < 4)
				return "";

			var processCode = arr[1];
			var num = arr[2];
			var id = arr[3];
			linkStr = num;
			return linkStr;
		}
		if(GT.isUndefined(val)||GT.isNull(val))
			return "";
		return val;
	};
	/**
	 * 解码--MMWOLINK@@DD_PROCESS@@000001@@id
	 * @param val
	 * @param opts
	 * @param rowObj
	 */
	var decodeHandleWorkOrderLink = function  (val,opts,row){
		if(/^MMWOLINK@@/.test(val)){
			var linkStr = "";
			var arr = val.split("@@");
			if(arr.length < 4)
				return "";

			var processCode = arr[1];
			var num = arr[2];
			var id = arr[3];
			linkStr = '<a href="javascript:void(0)" style="display:inline-block;" onclick="GT.mntn.handleWorkOrder(\''+processCode+'\',\''+id+'\')"><span style="color:blue;">'+
				num+'</span></a>';
			return linkStr;
		}
		if(GT.isUndefined(val)||GT.isNull(val))
			return "";
		return val;
	};


	var openWorkOrder = function  (processCode,id){
		var url = publicPath+'/maintenancemgt/common/workorder/dialog/'+processCode+'/'+id;
		window.open(url);
	}


	var handleWorkOrder = function  (processCode,id){
		var url = publicPath+'/maintenancemgt/common/workorder/dialog/'+processCode+'/'+id+"?handle=1";
		window.open(url);
	}
	/*********************************飞机状态信息***************************************/
	/**
	 *
	 * @param aircraftNo
	 * @param successCallback ajax
	 */
	var aircraftStatus=function  (_aircraftNo,successCallback){

		if(!_aircraftNo){
			return null;
		}
		$.ajax({
			url:GT.ctx+"/maintenancemgt/common/aircraft/status",
			type:'get',
			cache:false,
			dataType:'json',
			data:{
				aircraftNo:_aircraftNo
			},
			success:function(res){
				$.isFunction(successCallback)&&successCallback.apply(this,arguments);
			},
			error:function(){
				//BS.errorMsg()
			}
		});

	};
	/*********************************飞机状态信息END***************************************/

	/**
	 * 发布任务
	 * @param taskName
	 */
	var publishTask=function  (taskName){	
		setCookie(taskName,new Date().getTime(),4000);
		
		function setCookie(c_name, value, expireMms){
	        var exdate;
	        exdate = new Date();
	        exdate.setTime(exdate.getTime() + expireMms);
		    var ck = c_name+ "=" + decodeURI(value) + ((expireMms==null) ? "" : ";expires="+exdate.toGMTString());
		    ck+=";path=/"
	        document.cookie = ck;
		}
	};
	/**
	 * 接受发布的相应的任务
	 * @param taskName
	 * @param func
	 */
	var acceptTask =function  (taskName,func){
		//上一次获得的时间戳
		var taskNameVal;
		window.setInterval(function(){
			//任务在cookie存储的值---时间戳
			var _taskNameVal = getCookie(taskName);
			if(_taskNameVal){
				if(taskNameVal){
					if(_taskNameVal!=taskNameVal){
						$.isFunction(func)&&func();
					}
				}else{
					$.isFunction(func)&&func();
				}
			}
			
			
			taskNameVal = _taskNameVal;
		},1000);//延长Interval间隔，请延长publishTask中cookie存活时间


	    function getCookie(c_name) {
	        if (document.cookie.length > 0) {//先查询cookie是否为空，为空就return ""
	            var c_start = document.cookie.indexOf(c_name + "=");//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
	            if (c_start != -1) {
	                c_start = c_start + c_name.length + 1;//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
	                c_end = document.cookie.indexOf(";", c_start);//
	                if (c_end == -1)
	                    c_end = document.cookie.length;
	                return decodeURIComponent(document.cookie.substring(c_start, c_end));//通过substring()得到了值
	            }
	        }
	        return "";
	    }

	};

	/*********************************飞机场选择***************************************/
	function airportSelect(inputId,resultCallback){

		$("#clearAirport").on("click",function(){
			$("#"+inputId).val('');
		})

		$("#"+inputId).commonAutoComplete({
			url: GT.ctx+'/ahm/integratedquery/dialogairport/findAllAndOffenUsedAirport?rand=' + Math.random()
			,max:2000     //列表里的条目数
			, width: 170
			, nameKey: 'code3'
			, mustMatch: false
			, clickFire: true
			, formatItem: function (row, i, max) {
				var val = $("#"+inputId).val();
				//console.log(val);
				if(val){
					if(row.isOffenUsed){
						return false;
					}
				}else{
					if(!row.isOffenUsed){
						return false;
					}
				}
				return row.code3 + '-' + row.longCnname;
			},
			formatMatch : function(row, i, max) {

				return row.code3 + row.longCnname;
			}
			, callback: function (event, row, formatted) {
				if(typeof resultCallback === 'function'){
					resultCallback.apply(this,arguments);
				}
			}
		});

	}

	/*********************************飞机场选择END***************************************/

	/*********************************指派人员***************************************/
	function distributeEmployee(taskType,produceMonitorTaskId,workOderId,routineWorkId,aircraftNo,handoverFlag,successCallBack){

        produceMonitorTaskId = produceMonitorTaskId?produceMonitorTaskId:'';
		var modalId = BS.modalDialog('', '90%', '500px' ,MSG.MAINT.assign,
			function(e, text){
				//回调方法

				appendPerson.call(this,taskType,workOderId,aircraftNo,produceMonitorTaskId,handoverFlag,successCallBack);
				return false;
			},
			null,
			true,
			function (e) {
				$(this).find('.modal-body').load( GT.ctx+'/maintenancemgt/produce_monitor/openmodal/person_zhipai'
					+'?'+$.param({routineWorkId:routineWorkId,taskType:taskType,workOderId:workOderId,aircraftNo:aircraftNo}) );
			}
		);


		//将选择的人插入
		function appendPerson(processCode,workOrderId,aircraftNo,produceMonitorTaskId,handoverFlag,successBackFunc){
			//$("body").showModalWaiting();
			var $trs = $("#distributedPersonTable").find("tbody tr.self-segment");

			var personTaskList = [];

			$trs.each(function () {
				var $tr = $(this);
				$tr.find('.person-task:checked').each(function () {
					var personTask = $(this).data();
					var taskId = personTask.taskId;
					var taskIdArr = taskId.split(',');
					if(taskIdArr.length>1){
						var taskTypeArr = personTask.taskType.split(',');
						var subTaskTypeArr = personTask.subTaskType.split(',');
						for(var i in taskIdArr){
                            var _pt = $.extend({},personTask);
                            _pt.taskId = taskIdArr[i];
                            _pt.taskType = taskTypeArr[i];
                            _pt.subTaskType = subTaskTypeArr[i];
                            personTaskList.push(_pt);
                        }

					}else{
                        personTaskList.push(personTask);
					}

                });
            });
			//console.log(personTaskList)



			/*********************************员工id准备END*********************/
			var _data = {
                produceMonitorTaskId:produceMonitorTaskId?produceMonitorTaskId:null,
                workOderId:workOderId,
                maintenanceSegmentId:$("#maintenanceSegmentId_froDistributeEmployee").val()
			};
			for(var i in personTaskList){
                var pt  = personTaskList[i];
                for(var key in pt){
                    _data['personTaskList['+i+'].'+key] = pt[key];
                }
            }

			var $modal = $(this);
			$.ajax({
				url:GT.ctx+'/maintenancemgt/produce_monitor/distributeEmployee',
				type:'post',
				dataType:'json',
				data:_data,
				success:function(res){
					if(!res){
						BS.showMessage('',false);
						$("body").hideModalWaiting();
						return;
					}
					if(res.errorMessage){
						BS.showMessage(res.errorMessage,false);
						$("body").hideModalWaiting();

					}else{
						BS.showMessage({
							message:res.message,
							isSuccess:true
						});
						successBackFunc&&successBackFunc();
						$modal.modal('hide');
						$("body").hideModalWaiting();

					}
				},
				error:function(){
					BS.errorMsg(MSG.TIP.assignmentException);
					$("body").hideModalWaiting();
				}
			});

			return true;
		}



	}

	/*********************************指派人员END***************************************/



	
	
	/********************工具 END******************/
	
	var fmt={
			ammAta:ammAta,
			campAuto:campAuto,
			messagePushAction:messagePushAction,
			decodeWorkOrderLink:decodeWorkOrderLink,
			decodeWorkOrderText:decodeWorkOrderText,
			decodeHandleWorkOrderLink:decodeHandleWorkOrderLink,
			aircraftStatus:aircraftStatus,
			publishTask:publishTask,
			acceptTask:acceptTask,
			openWorkOrder:openWorkOrder,
			handleWorkOrder:handleWorkOrder,
			airportSelect:airportSelect,
			distributeEmployee:distributeEmployee,
	};
	
	T.mntn=fmt;
	
}(GT));




