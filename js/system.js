function doSysUpdate() {
	var loc = "SystemManage.action";
	var isW3 = 0;
	if ($("#w3Update").prop("checked")) {
		isW3 = 1;
	}
	$.get(loc, {
		METHOD: "SystemUpdate",
		ISW3UPDATE: isW3
	}, function(data) {
		$("#WaitingDialog").dialog('close');
		enableAllBtn();
		$(data).find('return').each( function ()  
		{ 	
				if(parseInt($(this).children('code').text()) > 0){
					alert("Update finished, please reboot server.");
				}else{
					alert("update failed,please try again.");
				}
		});
		
	});
}

function sysUpdate() {
	if (confirm("You are update server system , aren't you?")) {
		disableAllBtn();
		$("#WaitingDialog").dialog('open');
		doSysUpdate();
	}

}

function getsendSetting() {
	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "getSendSetting"
	},

	function(data) {
		$(data).find('SendSetting').each(function() {
			$("#resendTimes").val($(this).children('times').text());
			if ($(this).children('broadcast').text() == "1") {
				$("#chk_broadcast").prop("checked", true);
			}
			if ($(this).children('sendConfirm').text() == "1") {
				$("#sendConfirm").prop("checked", true);
			}
			return false;
		});
	});
}


function sendConfirmed() {
	var times = $("#resendTimes").val();
	var broadcat = $("#chk_broadcast").prop("checked") ? 1 : 0;
	var sendConfirm = $("#sendConfirm").prop("checked") ? 1 : 0;
	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "SaveSendSetting",
		TIMES: times,
		BROADCAST: broadcat,
		SENDCONFIRM: sendConfirm
	},

	function(data) {
		dealReturnMessage(data, "save Setting");
	});
}

function getSysDate() {
	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "GetSysDate"
	}, function(data) {
		setNowDate(data);
	});
}

function setSysDate() {
	var dt = $("#startDatepicker").datepicker("getDate");
	var hour = parseInt($("#dt_hour").val());
	if (isNaN(hour)) {
		alert("The date time is incorrect.");
		return false;
	}
	var minite = parseInt($("#dt_min").val());
	if (isNaN(minite)) {
		alert("The date time is incorrect.");
		return false;
	}
	dt.setHours(hour);
	dt.setMinutes(minite);

	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "setSysDate",
		DATETIME: dt.getTime() / 1000
	}, function(data) {
		dealReturnMessage(data, "Server time setting");
	});
}

function setSysDateByLocal() {
	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "setSysDate",
		DATETIME: (new Date()).getTime() / 1000
	}, function(data) {
		dealReturnMessage(data, "Server time setting");
		getSysDate();
	});
}

function rebootServer() {

	if (!confirm("The server will not response in some minutes during 'reboot',continue?")) {

		return false;
	}

	var loc = "SystemManage.action";
	$.get(loc, {
		METHOD: "RebootServer"
	}, function(data) {});
}

function setNowDate(data) {

	$(data).find('server').each(function() {
		var dateTime = $(this).children('serverDate').text();
		//alert(dateTime);
		var dts = dateTime.split(",");
		var dt = new Date(dts[0], dts[1], dts[2], dts[3], dts[4], dts[5]);

		//alert(dt);
		$("#startDatepicker").datepicker("setDate", dt);
		var hour = dt.getHours();
		if (hour < 10) hour = "0" + hour;
		$("#dt_hour").val(hour);

		var minite = dt.getMinutes();
		if (minite < 10) minite = "0" + minite;
		$("#dt_min").val(minite);
		return false;
	});
	var dt = new Date();
	$("#localTime").html(dt.format("yyyy/MM/dd hh:mm"));
}

function initComp() {
	$("#WaitingDialog").dialog({
		autoOpen: false,
		height: 150,
		width: 180,
		modal: true,
		resizable: false
	});
	$("#startDatepicker").datepicker();
	$("#startDatepicker").datepicker("option", "dateFormat", "yy/mm/dd");
}
