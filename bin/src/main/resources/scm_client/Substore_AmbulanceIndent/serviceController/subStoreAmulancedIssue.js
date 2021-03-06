$(document).ready(function() {
	loadIndentRaisedItems();
});

function loadIndentRaisedItems() {
	var indentCode = localStorage.getItem('indentCode');
	alert('loadIndentRaisedItems function is executed::' + indentCode);
	var strUrl = "http://localhost:2000/scmservice/indentItemListController/loadIndentRaisedItems";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"indentNum" : indentCode
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));
				indentRisedListOfdata(data.objIndentItemListControllerDTO);

			} else {
				toastr.info('Data Not found');
			}

		},
		error : function(err) {
			toastr.error("Something went wrong! try again"
					+ JSON.stringify(err));
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});
}

function insertAndUpdateIndentRaiseds(batchNo,drugId) {
	
	 var itemNmae = $('#item_name').val();
		var barcode = $('#bar_code_id').val();
		var genericModuleId = $('#generic_module_id').val();
		var unicCode = $('#unic_code_id').val();
		var fromName = $('#from_name_id').val();
		var manufaacture = $('#manufacture_id').val();
		var avalQty = $('#aval_qty').val();
		var brandName = $('#brand_name_id').val();
		
		var isssuedQty = $('#issued_quty').val();
		var unitPrice = $('#unit_price_id').val();
		var price = $('#amount_id').val();
		var expiredate = $('#expire_date_id').val();
		var batchNumberId =  $('#bach_number_id').val();
		var indentCode = localStorage.getItem('indentCode');
	
	
	var strUrl = "localhost:2000/scmservice/indentItemListController/insertAndUpdateIndentRaiseds";
	$.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"batch_number" : 0,
			"mainstore_available_stock" : 0,
			"mainstore_id" : batchNumberId,
			"drug_id" : drugId,
			"Batch_number" : batchNo,
			"mrp" : price,
			"purchase_price" : purchagePrice,
			"available_stock" : avalQty,
			"expire_date" : expiredate,
			"recived_stock" : "1",
			"createdbyid" : 268,
			"createdbyroleid" : 167,
			"createdbymoduleid" : 51,
			"unitprice" : unitPrice,
			"indent_code" : indentCode,
			"size" : "1"

		}),
		
		//268,167,51
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {

			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));

				var jsonarr = data.objIndentItemListControllerDTO;
				if (jsonarr.status == 2 || jsonarr.status == '2') {
					toastr.info("Stock is not available for "
							+ jsonarr.batch_number + " batch no")
				}
				if (jsonarr.status == 0 || jsonarr.status == '0') {
					toastr.info(jsonarr.batch_number
							+ 'batch no is already issued');
				}

			} else {
				toastr.info('Somethng went wrong');
			}

		},
		error : function(err) {
			toastr.error("Something went wrong! try again"
					+ JSON.stringify(err));
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});
}
var purchagePrice;
function loadAvailableQty() {
   alert('loadAvailableQty javascript function is excuted');
	var mainStoredId = $('#bach_number_id').val();
	var storeId = 99999;
	var strUrl  = "http://localhost:2000/scmservice/indentItemListController/loadAvailableQty";
    $.ajax({
		type : "POST",
		url : strUrl,
		dataType : "json",
		data : JSON.stringify({
			"main_storeId" : mainStoredId,
			"storeId" : storeId
		}),
		contentType : "application/json",
		async : false,
		crossDomain : true,
		success : function(data) {
			if (data.responseCode == 200 || data.responseCode == '200') {
				console.log('jason values::'
						+ JSON.stringify(data.objIndentItemListControllerDTO));
				var jsonArr = data.objIndentItemListControllerDTO;
				purchagePrice =jsonArr[0].purchase_price; 
				//$('#').val(jsonArr[0].purchase_price);
				$('#amount_id').val(jsonArr[0].mrp);
				$('#expire_date_id').val(jsonArr[0].expire_date);
				$('#aval_qty').val(jsonArr[0].available_stock);
				$('#unit_price_id').val(jsonArr[0].unitCost);
			} else {
				toastr.info('Somethng went wrong');
			}

		},
		error : function(err) {
			toastr.error("Something went wrong! try again"
					+ JSON.stringify(err));
			console.error('loadIndentRaisedItems  error: '
					+ JSON.stringify(err));
		}
	});

}
