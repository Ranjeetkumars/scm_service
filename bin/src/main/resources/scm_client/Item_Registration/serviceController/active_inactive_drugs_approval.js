var gactive_inactive_id;
function getActiveAndInActiveDrugs() {
	$("#serviceRemainder").empty();
	var active_inactive_id = $("#active_inactive_id").val();
	gactive_inactive_id =active_inactive_id;
	
	var strUrl = "http://localhost:2000/scmservice/salesIndentRaisedController/listLoadActiveInactive";
	var jsonObj = {
		"drugstatus" : active_inactive_id
	}
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
				alert('DATA NOT FOUND');
			} else {
				var jsonArray = data.objControllerDto;
				active_inactive_dom(jsonArray);
				loadDataTable();
			}
		},
		error : function(err) {
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}
function test(seriaalId) {
	console.log('seriaalId'+ seriaalId);
	$('#registration').modal('show');
	var strUrl = "http://localhost:2000/scmservice/salesIndentRaisedController/getDrugDetailsForApproval";
	var drugId = {
		"drugId" :  seriaalId
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(drugId),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.responseCode;
			if (200 !== responsecode || data.status === "NO_DATA_FOUND") {
				console.log('inside if-condition');
			} else {
				console.log('inside else-part');
				var jsonArray = data.objControllerDto;
				itemDetails(jsonArray);
			}
		},
		error : function(err) {
			alert("@@@@@@@@@@@@@@@@@@@@@@@" + err);
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});
}

var intDrugId;
function itemDetails(jsonArray) {
	$("#itemname").val(jsonArray[0].genricName);
	$("#brandName").val(jsonArray[0].drugBrandName);
	$("#schedule").val(jsonArray[0].sheduleType);
	$("#manufacture").val(jsonArray[0].grpModuleTypeLanGone);
	//"therapeutic"
	$("#materialforme").val(jsonArray[0].formtype);
	//generic_modue
	$("#strength").val(jsonArray[0].strength);
	$("#packingtype").val(jsonArray[0].packingType);
	$("#shortcodes").val(jsonArray[0].shortUniCode);
	$("#central_min_level_qty").val(jsonArray[0].minimumLevelQty);
	$("#central_max_level_qty").val(jsonArray[0].maxLevelQty);
	$("#expiry_alert").val(jsonArray[0].expiryAlert);
	$("#cretaed_by").val(jsonArray[0].userName);
	$("#desigid").val(jsonArray[0].roleName);
	$("#date").val(jsonArray[0].createdDate);
	intDrugId = jsonArray[0].drugId;
}

function approval() {
	console.log('approval function is executed');
	var strUrl = "http://localhost:2000/scmservice/salesIndentRaisedController/updateActiveDrugForApproval";
	var intCount = 1;// every time one row will approve
	var intDrugTypeId = 4; // Active
    var intuserId = 268;//At the time of login that time we can get userId;
    
    /* if (intActiveDrugId == 14) {
        intDrugTypeId = 4; //InActive
    } else {
        intDrugTypeId = 2; //Active
    }*/
    
    var jsonApprovalObj = {
		"size" : intCount,
		"drugIds" : intDrugId,
		"userId" : intuserId,
		"drugTypeId" : intDrugTypeId,
		"strdrugId" : "dummy"
	};
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(jsonApprovalObj),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			var responsecode = data.rtnReponseCount;    
			if (responsecode == 1 || responsecode == '1' || responsecode == "1") {
				toastr.success('Drugs Approved Successfully.'); 
				 $('#registration').modal('hide');
				 getActiveAndInActiveDrugs();
				 } else {
				toastr.warning('Something went wrong ! try again.'); 
				 }
		},
		error : function(err) {
			
			toastr.error('Something went wrong ! try again.'); 
			console.error('itemSearch  error: ' + JSON.stringify(err));
		}
	});

}

function onclickCheckbox(serialId){
	//alert("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::"+serialId);
	test(serialId);
}


function multipleCheckBox(){
	alert("multipleCheckBoxmultipleCheckBoxmultipleCheckBoxmultipleCheckBoxmultipleCheckBox");
	
}
