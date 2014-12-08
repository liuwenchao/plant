
function getAreaList(){
	var loc = "AreaManage.action";
	$.get(loc,{
		METHOD : "AreaList"
	},function(data) {
			dealAreaList(data);
		});
}

function dealAreaList(data) {
	var html="";
	$(data).find('domain').each( function ()
	{
		var id = $(this).children('id').text();
		if($(this).children('isLocked').text()=="0"){
		
				html += "<div class='item' onclick='selectArea("+id+");'> <input id='isAreaSelected"+id +"' onclick='preventEvent(event);' name='isAreaSelected' type='checkbox' value='"+ id+"' />";
		}else{
			html += "<div class='item inActivity'> <input id='isAreaSelected"+id +"' disabled='disabled' type='checkbox' value='"+ id+"' />";
	 }
		html += "<label class='nodes'>"+$(this).children('name').text()+"</label><label class='node-count'>"+ $(this).children('nodecount').text()+"</label></div>";

	});
	$("#AREALIST").html(html);


}



function getModelList(){
	var loc = "ModelManage.action";
	$.get(loc,{
		METHOD : "ModelInfoList"
	},function(data) {dealModelList(data);});
}

function dealModelList(data) {
	var html="<table class='table table-stripped table-bordered' cellpadding='0' cellspacing='0'> ";
	$(data).find('model').each( function ()
	{
		var id = $(this).children('id').text();
		html += "<tr class='trStyle' onclick='selectModel("+id+")'><td width='60' >";
		html += "<input id='isModelSelected"+id+"' name='isModelSelected' type='radio' onclick='preventEvent(event);' value='"+ id +"' /></td>";
		html += "<td width='100' >"+ $(this).children('name').text() +"</td>";
		html += "<td width='90' >"+ $(this).children('PPFD_RED').text() +"</td>";
		html += "<td width='90' >"+ $(this).children('PPFD_BLUE').text() +"</td>";
		html += "<td width='90' >"+ $(this).children('brightness').text() +"</td>";
		html += "<td width='90' >"+ $(this).children('frequency').text() +"</td>";
		html += "<td width='87' >"+ $(this).children('duty').text() +"</td></tr>";
		
		
	});
	html+="</table>";

	$("#MODELLIST").html(html);


}


function openModel(){

		var areas = "";
		var modelID = "";
	$("[name='isAreaSelected']").each(function(){
				if($(this).prop("checked")){
					areas += $(this).val()+",";
				}
	});
	$("[name='isModelSelected']").each(function(){
				if($(this).prop("checked")){
					modelID = $(this).val();
					return false;
				}
	});
	if(areas=="" || modelID == ""){
		alert("Please select area AND model.");
		return false;
		}
	disableAllBtn();
	addStartLog();
	var loc = "ControlManage.action";
	$.get(loc,{
		METHOD : "Manufacture",
		AREAID : areas,
		MODELID : modelID,
		OPTION : 1 //0:关闭 1:普通模式 2:观察模式 
	},function(data) {addLog(data);});
}

function watchModel(){

	var areas = "";
	$("[name='isAreaSelected']").each(function(){
				if($(this).prop("checked")){
					areas += $(this).val()+",";
				}
	});
	if(areas==""){
		alert("Please select an area at least.");
		return false;
	}
	disableAllBtn();
		addStartLog();
	var loc = "ControlManage.action";
	$.get(loc,{
		METHOD : "Manufacture",
		AREAID : areas,
		MODELID : 1,
		OPTION : 2 //0:关闭 1:普通模式 2:观察模式 
	},function(data) {addLog(data);});
}

function closeAll(){
	var areas = "";
	$("[name='isAreaSelected']").each(function(){
				if($(this).prop("checked")){
					areas += $(this).val()+",";
				}
	});
	if(areas==""){
		alert("Please select an area at least.。");
		return false;
	}
	disableAllBtn();
		addStartLog();
	var loc = "ControlManage.action";
	$.get(loc,{
		METHOD : "Manufacture",
		AREAID : areas,
		MODELID : 0,
		OPTION : 0 //0:关闭 1:普通模式 2:观察模式 
	},function(data) {addLog(data);});
}

function startReproduction(){
	disableAllBtn();
		addStartLog();
	var loc = "ControlManage.action";
	$.get(loc,{
		METHOD : "Reproduction",
		OPTION : 1 //打开
	},function(data) {addLog(data);});
}

function stopReproduction(){
	disableAllBtn();
		addStartLog();
	var loc = "ControlManage.action";
	$.get(loc,{
		METHOD : "Reproduction",
		OPTION : 0 //关
	},function(data) {addLog(data);});
}




function addLog(data){

	var logMsg ="";
	var oldMsg = $("#monitorMsg").html();
	if(oldMsg.length>1024){
		oldMsg ="";
	}
	var dt = new Date();
	var hour = dt.getHours(); 
	if(hour<10)
		hour = "0"+hour;
	
	var minite = dt.getMinutes(); 
	if(minite<10)
		minite = "0"+minite;
		
	var second = dt.getSeconds();
	if(second<10)
		second = "0"+second;
	
	var timeNow = hour+":"+minite+":"+second+" ";
	
		$(data).find('return').each( function ()  
		{ 	
			logMsg += timeNow+$(this).children('message').text() +"<br/>";
		});
				logMsg += oldMsg;
		 $("#monitorMsg").html(logMsg);
		 	enableAllBtn();
}
function addStartLog(){

	var logMsg ="";
	var oldMsg = $("#monitorMsg").html();
	if(oldMsg.length>1024){
		oldMsg ="";
	}
	var dt = new Date();
	var hour = dt.getHours(); 
	if(hour<10)
		hour = "0"+hour;
	
	var minite = dt.getMinutes(); 
	if(minite<10)
		minite = "0"+minite;
		
	var second = dt.getSeconds();
	if(second<10)
		second = "0"+second;
	
	var timeNow = hour+":"+minite+":"+second+" ";
	
	
			logMsg +=timeNow + "Mission started, please wait a monent...<br/>";
		
				logMsg += oldMsg;
		 $("#monitorMsg").html(logMsg);

}

function selectAllArea(obj){
		var isSelected = $(obj).prop("checked");
		$("[name='isAreaSelected']").each(function(){
				$(this).prop("checked",isSelected);
			});
	}

