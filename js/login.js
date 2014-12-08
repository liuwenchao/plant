function keyPressed(e) {
	if (e.keyCode === 13) {
		ckeckLogin();
	}
}


function ckeckLogin() {
	var userName = $("#username").val();
	var password = $("#password").val();
	if (userName.length == 0) {
		alert("Username please.");
		return false;
	}
	if (password.length == 0) {
		alert("Password please.");
		return false;
	}

	var loc = "HomeManage.action";
	$.get(loc, {
		METHOD: "Login",
		USERNAME: userName,
		PASSWORD: password,
		LOGINTIME: (new Date()).getTime() / 1000
	},

	function(data) {
		dealLogin(data);
	});
}

function dealLogin(data) {
	//alert((new XMLSerializer()).serializeToString(data));
	$(data).find('return').each(function() {
		var returnCode = parseInt($(this).children('code').text());
		if (returnCode > 0) {
			$("#dialog-form").dialog("close");
			//alert("login OK.");
			if (returnCode == 1) {
				location.href = "index.html";
			} else {
				if (confirm("Time in server is incorrect,change it?")) {
					location.href = "system.html";
				} else {
					location.href = "index.html";
				}
			}
		} else {
			alert("Login failed ,please try again.");

		}
	});
}

function modiPwd() {
	var userName = $("#oldusername").val();
	var password = $("#oldpassword").val();
	var newpassword1 = $("#newpassword1").val();
	var newpassword2 = $("#newpassword2").val();
	if (userName.length === 0) {
		alert("Username please.");
		return false;
	}
	if (password.length === 0) {
		alert("Old password please.");
		return false;
	}
	if (newpassword1.length === 0) {
		alert("New password please.");
		return false;
	}
	if (!(newpassword1 === newpassword2)) {
		alert("New password and confirm new password are not coincident.");
		return false;
	}

	var loc = "HomeManage.action";
	$.get(loc, {
		METHOD: "ModiPwd",
		USERNAME: userName,
		PASSWORD: password,
		NEWPWD: newpassword1
	},

	function(data) {
		dealModiPwd(data);
	});
}

function dealModiPwd(data) {
	$(data).find('return').each(function() {
		if (parseInt($(this).children('code').text()) > 0) {
			alert("Password changed.");
			$("#dialog-modify").dialog("close");
			$("#dialog-form").dialog("open");
		} else {
			alert("Username or old password is incorrect.");

		}
	});
}

function initComp() {
	$("#dialog-form").dialog({
		autoOpen: true,
		height: 340,
		width: 350,
		modal: true,
		resizable: false,
		buttons: {
			"OK": function() {
				ckeckLogin();
			},

			"Cancel": function() {
				$(this).dialog("close");
			}
		}
	});
}

function modifyPwd() {

	$("#dialog-form").dialog("close");

	$("#dialog-modify").dialog({
		autoOpen: true,
		height: 450,
		width: 350,
		modal: true,
		resizable: false,
		buttons: {
			"OK": function() {
				modiPwd();
			},

			"Cancel": function() {
				$(this).dialog("close");
				$("#dialog-form").dialog("open");
			}
		}
	});
}
