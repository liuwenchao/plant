//------------Reproduction------------------------
function getTimeSpan(){
		var loc = "ReproductionManage.action";
		$.get(loc,{
			METHOD : "TimeSpan"
		},function(data) {dealPhoto_TimeSpan(data);});
	}
function dealPhoto_TimeSpan(data) {
	var html="<ul>";
	$(data).find('TimeSpan').each( function ()
	{
		photoSpan = $(this).children('span').text();

		$("#TimeSpan").val(photoSpan);
		return false;
	});

}

function getPhoto_KrKb(){
		var loc = "ModelManage.action";
		$.get(loc,{
			METHOD : "KBKR"
		},function(data) {dealPhoto_KrKb(data);});
	}
function dealPhoto_KrKb(data) {
	var html="<ul>";
	$(data).find('krkb').each( function ()
	{
		photoRED = $(this).children('kr').text();
		photoBLUE = $(this).children('kb').text();
		photoUV = $(this).children('ku').text();
		return false;
	});

}

function getReproductionList(){
	var loc = "ReproductionManage.action";
	$.get(loc,{
		METHOD : "ReproductionList"
	},function(data) {dealReproductionList(data);});
}

function dealReproductionList(data) {
	var html="";
	$(data).find('reproduction').each( function ()
	{
		
		html += "<div class='item' onclick='showReproductionInfo("+$(this).children('id').text()+");'><label class='area-model'>";
		
		html += $(this).children('name').text() +"</label></div>";

	});


	$("#MODELLIST").html(html);


}


function showReproductionInfo(modelId){
	var loc = "ReproductionManage.action";
	$.get(loc,{
		METHOD : "ReproductionInfo",
		MODELID : modelId
	},function(data) {dealReproductionInfo(data);});
}

function dealReproductionInfo(data) {
	$(data).find('reproduction').each( function ()
	{
		$("#modelId").val($(this).children('id').text());
		$("#modelName").val($(this).children('name').text());
		$("#ppfdRed").val($(this).children('PPFD_RED').text());
		$("#ppfdBlue").val($(this).children('PPFD_BLUE').text());
		$("#frequency").val($(this).children('frequency').text());
		$("#dutyRate").val($(this).children('duty').text());
		$("#brightness").val($(this).children('brightness').text());
	
		$("#red_value").html($(this).children('red').text());
		$("#percentRed" ).slider( "option", "value", $(this).children('red').text());
		$("#blue_value").html($(this).children('blue').text());
		$("#percentBlue" ).slider( "option", "value", $(this).children('blue').text());
	
	
		return false;
	});

}


function newReproduction(){
	$("#modelId").val("-1");
	$("#modelName").val("");
	$("#ppfdRed").val("0");
	$("#ppfdBlue").val("0");
	$("#frequency").val("160");
	$("#dutyRate").val("50");
	$("#brightness").val("0");
	
	$("#red_value").html("0");
	$("#percentRed" ).slider( "option", "value", 0);
	$("#blue_value").html("0");
	$("#percentBlue" ).slider( "option", "value", 0);
	$("#modelName").focus();
}

function saveReproduction(objButton){
	var modelID = $("#modelId").val();
	
	$(objButton).attr('disabled',"true");
	
	var modelName = $("#modelName").val();
	var ppfdRed = $("#ppfdRed").val();
	var ppfdBlue = $("#ppfdBlue").val();
	var frequency = $("#frequency").val();
	var dutyRate = $("#dutyRate").val();
	var red =  $("#red_value").html();
	var blue = $("#blue_value").html();
	var brightness = $("#brightness").val();
	
	if(modelName=="" ){
		alert("Model name please.");
		$("#modelName").focus();
		$(objButton).removeAttr("disabled");	
		return false;
	}
	
	var stime = $("#TimeSpan").val();
	
	
	
	if(photoSpan === stime){
			stime = 0;
			
		}
	

	saveReproductionDB(modelID,modelName,ppfdRed ,ppfdBlue ,frequency ,dutyRate ,red,blue,brightness,stime,objButton);

}
function saveReproductionDB(modelID,modelName,ppfdRed ,ppfdBlue ,frequency ,dutyRate,red,blue,brightness,stime,objButton){
	var loc = "ReproductionManage.action";
	$.get(loc,{
		METHOD : "SaveReproduction",
		MODELID : modelID, 
		MODELNAME :  modelName, 
		PPFDRED  :  ppfdRed , 
		PPFDBLUE  :  ppfdBlue , 
		FREQUENCY  :  frequency , 
		DUTYRATE  : dutyRate , 
		MAGNITUDERED : red,
		MAGNITUDEBLUE : blue,
		BRIGHTNESS : brightness,
		TIMESPAN : stime
		},function(data) {	$(objButton).removeAttr("disabled");	$("#modelId").val(dealReturnMessage(data,"保存模式"));getReproductionList(false);});
}

function deleteReproduction(){
	var modelID = $("#modelId").val();
	
	if(modelID==-1){
		alert("Please select one model at least.");
		return false;
	}
	
	
	if(!confirm("You are deleting model, aren't you?")){
		return false;
	}
	var loc = "ReproductionManage.action";
	$.get(loc,{
		METHOD : "DeleteReproduction",
		MODELID : modelID
		},function(data) {if(dealReturnMessage(data,"Delete model")>0){newReproduction();getReproductionList(false);}});
}





function initSlider(){

	$( "#percentRed" ).slider({
			range: "max",
			value:0,
			max: 100,
			disabled: false,
			slide: function( event, ui ) {
				$("#red_value").html(ui.value);
			},
			stop: function( event, ui ) {
				
				$("#ppfdRed").val(parseInt(photoRED * ui.value/100));

			}
		});
		
		$( "#percentBlue" ).slider({
			range: "max",
			value:0,
			max: 100,
			disabled: false,
			slide: function( event, ui ) {
				$("#blue_value").html(ui.value);
			},
			stop: function( event, ui ) {
				$("#ppfdBlue").val(parseInt(photoBLUE * ui.value/100));
			}
		});
			
		
		$( "#percentUV" ).slider({
			range: "max",
			value:0,
			max: 100,
			disabled: false,
			slide: function( event, ui ) {
				$("#uv_value").html(ui.value);
			},
			stop: function( event, ui ) {
				$("#ppfdUV").val(parseInt(photoUV * ui.value/100));
			}
		});
}
function isNumber(item){
	var reg = /^[0-9]+$/;
	var value = $(item).val();
	if(!reg.test(value)){
		alert("please input a positive integer.");
			$(item).focus();
			return false;
	}
	return true;
}
function checkFreq(item){
	if(isNumber(item)){
		var value = $(item).val();
		if(value%32 >0){
			alert("FREQ must be a multiple of 32.");
			return false;
		}
	}
}
function PPFD_modi(id,item){

	if(!isNumber(item)){
		return false;
	}
	if(id==0){ //red
		var value = parseInt($("#ppfdRed").val());
		var Kr = parseInt($("#photonRed").val());
		var redPer = parseInt(value/Kr*100);
		if(redPer>100){
				alert("[PPFD-Red]more than limit,please correct it.");
			//$(item).focus();
			return false;
		}
		$("#red_value").html(redPer);
		$( "#percentRed" ).slider( "option", "value", redPer);
		
	}else{
		var value = parseInt($("#ppfdBlue").val());
		var Kb = parseInt($("#photonBlue").val());
		var bluePer = parseInt(value/Kb*100);
		if(bluePer>100){
			alert("[PPFD-Blue]more than limit,please correct it.");
			//$(item).focus();
			return false;
		}
		$("#blue_value").html(bluePer);
		$( "#percentBlue" ).slider( "option", "value", bluePer);
	}
}
// JavaScript Document