$(document).ready(function() {
	zone();
	viewListOfAmbulanceAndSubStore();
	loadSubStore();
});



function loadSubStore(){
	//var strUrl = 'http://localhost:2000/scmservice/expiryDrugsController/loadSubStore';
	var strUrl = ServiceProcreument.LOAD_SUBSTORE;
	console.log(strUrl);
	try {
		$('#sub-store-id').empty();
		// var strUrl = Service.GET_GENERICNAME_DROPDOWN;
		console.log("loadSubStore Url is:" + strUrl);
		
		var  subStoreObj ={
			"supStoreTypeId":"102"
		 }
		
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(subStoreObj),
			contentType : "application/json",
			async : false,
			crossDomain : true,
					success : function(data) {
						console.log('succes!');
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select One </option>";
							$('#sub-store-id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
							var inventoryFrom = "<option value="
										+ resData.countryId + ">"
										+ resData.countryName + "</option>";
								$(inventoryFrom).appendTo(
										'#sub-store-id');
							});
						}
					},
					error : function(err) {
						console.log("Error in sub-store-id"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.log('Error in sub-store' + err);
	}
	$('#sub-store-id').trigger("chosen:updated");
	$('#sub-store-id').chosen();
	
	
}















function getinventoryItemFormwithoutInputDropDown() {
	var id = $('up_drug_inventoryItemFormId').val();
  $('#inventoryItemFormId').empty();
	var strUrl = MASTER_END_POINT.loadMaterialForm;
	console.log("getinventoryItemFormwithoutInputDropDown Url is:" + strUrl);
	$
			.ajax({
				type : 'GET',
				url : strUrl,
				success : function(data) {
					var responsecode = data.responseCode;
					if (200 !== responsecode) {

					} else {
						var jsonArray = data.dto;

						var selectfirst = "<option value='0'>Select InventoryForm</option>";
						$('#inventoryItemFormId').append(selectfirst);
						$.each(jsonArray, function(i, resData) {
							var FormId = "<option value=" + resData.serialId
									+ ">" + resData.fromType + "</option>";
							$(FormId).appendTo('#inventoryItemFormId');
						});
					}
				},
				error : function(err) {
					console
							.log("Error in getinventoryItemFormwithoutInputDropDown"
									+ JSON.stringify(err));
				}
			});

	$('#inventoryItemFormId').trigger("chosen:updated");
	$('#inventoryItemFormId').chosen();
}

//

function openModalBox() {
	console.log('openModalBox  javascript function is executed');
	$('#packingVolume').modal('show');
	
	
	$('#hideZone').show();
	$('#hideBaseLocation').show();
	$('#hideAmbulance').show();
	
	$('#zone-text-id').hide();
	$('#baselocation-text-id').hide();
	$('#ambulance-text-id').hide();
	
	
	$("#save_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", false);
	$("#update_disable").attr("disabled", true);

}

function saveOrUpdateMaterialUnits() {
	alert("saveOrUpdateMaterialUnits javascript");
	var rtnValidationStatus = validation();
	
    if (rtnValidationStatus != false) {
		console.log("rtnValidationStatus::" + rtnValidationStatus);
    }
	
	var strUrl = MASTER_END_POINT.saveorUpdateMaterialUnit;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnValidationStatus),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully saved');
				$('#packingVolume').modal('hide');
				loadMaterialForm();
			}
			if(data.responseCode==500 ||data.responseCode=='500'){
				toastr.error('Something went wrong');
			}
			
			
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
}








function validation() {
	alert('validation javascript function executd');
	
	var zoneId = $('#zone-id').val();
	var baseLocationId = $('#base-location-id').val();
	var ambulanceId = $('#ambulance-id').val();
	var subStoreId = $('#sub-store-id').val();
	var descriptionId = $('#descriptionId').val();
	var isStatus = ($('input:checkbox[name=checkme]').is(':checked'));
	
	console.log("zoneId-->"+zoneId);
	console.log("baseLocationId--->"+baseLocationId);
	console.log("ambulanceId---->"+ambulanceId);
	console.log("subStoreId----->"+subStoreId);
	console.log("descriptionId--->"+descriptionId);
	
	console.log("Status-->"+isStatus);
	
	
	// stausId
	

	
	
	if (zoneId == 0) {
		toastr.error('Please select zone');
		return false;
	}

	if (baseLocationId == 0) {
		toastr.error('Please select base location');
		return false;
	}

	if (ambulanceId == 0) {
		toastr.error('Please select ambulance');
		return false;
	}
	
	if (subStoreId == 0) {
		toastr.error('Please select sub store');
		return false;
	}
	
	
	
	
//	var jsonSaveOrUpdateMaterialUnitsObj = {
//		"unitId" : 0,
//		"unitName" : unitName,
//		"conversionFactor" : conversion_factor,
//		"userId" : 185,
//		"roleId" : 100,
//		"moduleId" : 40,
//		"status" : isStatus,
//		"operationType" : 1,
//		"materialForm" : inventoryItemForm
//	};
//
//	return jsonSaveOrUpdateMaterialUnitsObj;

}



function viewListOfAmbulanceAndSubStore() {
	var strUrl = subStoreAmbulance.loadVehicleSubStoreMapping;
	
	console.log('viewListOfAmbulanceAndSubStore'+strUrl);
	$.ajax({
		type : 'GET',
		url : strUrl,
		success : function(data) {
			console.log('datadata::' + JSON.stringify(data));
			var arrData = data.objVehicleSubStoreControllerDTO;
			// console.log("@@@@@@@@@@@@@@@@@@@@@@@"+arrData);
			listOfdata(arrData);
		},
		error : function(err) {
			console.log("Error in loadMaterialForm" + JSON.stringify(err));
		}
	});
}
var garrData;
function listOfdata(arrData) {
	garrData = arrData;
	$('#masterIem').dataTable().fnClearTable();
	$('#masterIem').dataTable().fnDestroy();
	var index =1;
	for (var i = 0; i < arrData.length; i++) {
		$('#list_of_data_id')
				.append(
						'<tr>'
								+ '<td>'
								+ index++
								+ '</td>'
								+ '<td>'
								+ arrData[i].vehicleName
								+ '</td>'
								+ '<td>'
								+ arrData[i].subStoreName
								+ '</td>'
								+ '<td>'
								+ arrData[i].description
								+ '</td>'
								+ '<td>'
								+ arrData[i].status
								+ '</td>'
								+ '<td><button type="button" class="btn btn-primary btn-sm"  onClick="getId('+i+','+arrData[i].serialId+')">Edit</button></td></tr>');
	}

	$('#masterIem').DataTable(
			{ // Data table

				"aLengthMenu" : [ [ 05, 10, 15, 25, -1 ],
						[ 05, 10, 15, 25, "All" ] ],
				pageLength : 5,
				responsive : true,
				dom : '<"html5buttons"B>lTfgitp',
				buttons : [
						{
							extend : 'copy'
						},
						{
							extend : 'csv'
						},
						{
							extend : 'excel',
							title : 'ExampleFile'
						},
						{
							extend : 'pdf',
							title : 'ExampleFile'
						},
						{
							extend : 'print',
							customize : function(win) {
								$(win.document.body).addClass('white-bg');
								$(win.document.body).css('font-size', '10px');

								$(win.document.body).find('table').addClass(
										'compact').css('font-size', 'inherit');
							}
						} ]

			});

}


function hideDropDownAndDisplayTextField(){
	alert('Display text fileds');
	$('#hideZone').hide();
	$('#hideBaseLocation').hide();
	$('#hideAmbulance').hide();
	
	$('#zone-text-id').show();
	$('#baselocation-text-id').show();
	$('#ambulance-text-id').show();
	
}




var globalSerialId;
function getId(serialId,serialIds) {
	
	$('#packingVolume').modal('show');
	
	hideDropDownAndDisplayTextField();
	globalSerialId = serialIds;
	console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::' + serialId);
	
	$('#append-zone-text-id').val(garrData[serialId].location);
	$('#append-base-location-text').val(garrData[serialId].baseLocation);
	$('#append-text-ambulance').val(garrData[serialId].vehicleName);
	
	
	alert('base location ::'+garrData[serialId].baseLocation);
	alert('location ::'+garrData[serialId].location);
	alert('vehicleName ::'+garrData[serialId].vehicleName);
//	var packingType = garrData[serialId].packingType;
//	var arr = packingType.split('X');
//	$('#no_of_strips_id').val(arr[0]);
//	$('#no_of_quantity_id').val(arr[1]);
	
	$("#sub-store-id option:contains(" + garrData[serialId].subStoreName+ ")").attr(
			'selected', 'selected').trigger("chosen:updated");
	
	var status = garrData[serialId].status;
	if (status == "Active" || status == 'Active') {
		$('#stausId').prop('checked', true);
	} else {
		$('#stausId').prop('checked', false);
	}
	
	$("#update_disable").attr("disabled", false);
	$("#reset_disable").attr("disabled", true);
	$("#save_disable").attr("disabled", true);
	
	
	
	
}


function zone() {
	console.log('zone javascript function executed');
    var strUrl = subStoreAmbulance.load_zones;
	console.log(strUrl);
	try {
		$('#zone-id').empty();
		console.log("zone Url is:" + strUrl);
		$
				.ajax({
					type : 'GET',
					url : strUrl,
					dataType : 'json',
					async : false,
					success : function(data) {
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select One </option>";
							$('#zone-id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
							var inventoryFrom = "<option value="
										+ resData.locationId + ">"
										+ resData.locationName + "</option>";
								$(inventoryFrom).appendTo(
										'#zone-id');
							});
						}
					},
					error : function(err) {
						console.error("Error in zone"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.error('Error in zone()' + err);
	}
	$('#zone-id').trigger("chosen:updated");
	$('#zone-id').chosen();
}


function getBasedLocation(){
	console.log("getBasedLocation javascript function executed");
	var zoneId = $('#zone-id').val();
	console.log(zoneId);
	try {
		$('#base-location-id').empty();
		 var strUrl = subStoreAmbulance.load_baselocations;
		console.log("base location Url is:" + strUrl);
		
		var  subStoreObj = {
				"zoneId":zoneId
		 }
		
		$.ajax({
			type : "POST",
			url : strUrl,
			dataType : "json",
			data : JSON.stringify(subStoreObj),
			contentType : "application/json",
			async : false,
			crossDomain : true,
					success : function(data) {
						console.log('succes!');
						var responsecode = data.responseCode;
						if (200 !== responsecode) {

						} else {
							var jsonArray = data.objControllerDto;
							var selectfirst = "<option value='0'>Select One </option>";
							$('#base-location-id').append(selectfirst);
							$.each(jsonArray, function(i, resData) {
							var inventoryFrom = "<option value="
										+ resData.baseLocationId + ">"
										+ resData.baseLocationName + "</option>";
								$(inventoryFrom).appendTo(
										'#base-location-id');
							});
						}
					},
					error : function(err) {
						console.log("Error in base-location"
								+ JSON.stringify(err));
					}
				});
	} catch (err) {
		console.log('Error in base-location' + err);
	}
	$('#base-location-id').trigger("chosen:updated");
	$('#base-location-id').chosen();
}


function loadAmbulance(){
	console.log('loadAmbulance javascript function executed');
	var baselocationId = $('#base-location-id').val();
		try {
			$('#ambulance-id').empty();
			 var strUrl = subStoreAmbulance.load_vehicles;
			console.log("ambulance Url is:" + strUrl);
			var  baselocationObj = {
					"baselocation":baselocationId
			 }
			$.ajax({
				type : "POST",
				url : strUrl,
				dataType : "json",
				data : JSON.stringify(baselocationObj),
				contentType : "application/json",
				async : false,
				crossDomain : true,
						success : function(data) {
							console.log('succes!');
							var responsecode = data.responseCode;
							if (200 !== responsecode) {

							} else {
								var jsonArray = data.objControllerDto;
								var selectfirst = "<option value='0'>Select One </option>";
								$('#ambulance-id').append(selectfirst);
								$.each(jsonArray, function(i, resData) {
								var inventoryFrom = "<option value="
											+ resData.vehicleId + ">"
											+ resData.permanentRegNo + "</option>";
									$(inventoryFrom).appendTo(
											'#ambulance-id');
								});
							}
						},
						error : function(err) {
							console.log("Error in ambulance"
									+ JSON.stringify(err));
						}
					});
		} catch (err) {
			console.log('Error in ambulance' + err);
		}
		$('#ambulance-id').trigger("chosen:updated");
		$('#ambulance-id').chosen();
}





function updatePackingType(){
	
	var rtnValidationStatus = validation();
	if (rtnValidationStatus != false) {
		console.log("rtnValidationStatus::" + rtnValidationStatus);
	}
	rtnValidationStatus.unitId = globalSerialId;
	rtnValidationStatus.operationType = 2;// This is for update
	console.log("rtnValidationStatus.unitId::"+rtnValidationStatus.unitId);
	console.log("rtnValidationStatus.operationType::"+rtnValidationStatus.operationType);
	var strUrl = MASTER_END_POINT.saveorUpdateMaterialUnit;
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify(rtnValidationStatus),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			console.log('@@@@@@@@@@@@@@@@@@@@@:------------data'
					+ JSON.stringify(data));
			if (data.rtnReponseCount === 1 || data.rtnReponseCount === "1"
					|| data.rtnReponseCount === '1') {
				toastr.success('Successfully Updated');
				$('#packingVolume').modal('hide');
				loadMaterialForm();
			}
			if(data.responseCode==500 ||data.responseCode=='500'){
				toastr.error('Something went wrong');
			}
			
			
		},
		error : function() {
			console.log('something went wrong');
			console.log("Error In insertDrugDetails");
		}
	});
	
}
