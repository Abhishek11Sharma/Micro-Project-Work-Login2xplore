var jpdbaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var empDBName = 'SCHOOL-DB';
var empRelationName = "STUDENT-TABLE";
var connToken = '90931279|-31949327666501619|90961026';

$('#Roll_No').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var Roll_No = $('#Roll_No').val();
    var jsonStr = {
        Roll_No: Roll_No
    };
    return JSON.stringify(jsonStr);
}


function getStu() {
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#Roll_No").focus();
    }
    else if (resJsonObj.status === 200) {
        $("#Roll_No").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#Full_Name").focus();
    }
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#Full_Name').val(data.Full_Name);
    $('#Class').val(data.Class);
    $('#Birth_Date').val(data.Birth_Date);
    $('#Address').val(data.Address);
    $('#Enrollment_Date').val(data.Enrollment_Date);

}

function resetForm() {
    $('#Roll_No').val("")
    $('#Full_Name').val("")
    $('#Class').val("")
    $('#Birth_Date').val("")
    $('#Address').val("")
    $('#Enrollment_Date').val("")
    $('#Roll_No').prop("disabled", false)
    $('#save').prop("disabled", true)
    $('#change').prop("disabled", true)
    $('#reset').prop("disabled", true)
    $('#Roll_No').focus();
}

function saveData() {
    var jsonObj = validateData();
    if (jsonObj === '') {
        return "";
    }

    var putRequest = createPUTRequest(connToken, jsonObj, empDBName, empRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#Roll_No').focus();
}

function changeData() {
    $('#change').prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $('#Roll_No').focus();
}

function validateData() {
    var Roll_No, Full_Name, Class, Birth_Date, Address, Enrollment_Date;
    Roll_No = $("#Roll_No").val();
    Full_Name = $("#Full_Name").val();
    Class = $("#Class").val();
    Birth_Date = $("#Birth_Date").val();
    Address = $("#Address").val();
    Enrollment_Date = $("#Enrollment_Date").val();

    if (Roll_No === '') {
        alert("Enter Student Roll No.");
        $("#Roll_No").focus();
        return "";
    }
    if (Full_Name === '') {
        alert("Enter Student Name");
        $("#Full_Name").focus();
        return "";
    }
    if (Class === '') {
        alert("Enter Student Class");
        $("#Class").focus();
        return "";
    }
    if (Birth_Date === '') {
        alert("Enter Student Birth Date");
        $("#Birth_Date").focus();
        return "";
    }
    if (Address === '') {
        alert("Enter Student Address");
        $("#Address").focus();
        return "";
    }
    if (Enrollment_Date === '') {
        alert("Enter Student Enrollment Date");
        $("#Enrollment_Date").focus();
        return "";
    }

    var jsonStrObj = {
        Roll_No: Roll_No,
        Full_Name: Full_Name,
        Class: Class,
        Birth_Date: Birth_Date,
        Address: Address,
        Enrollment_Date: Enrollment_Date
    };
    return JSON.stringify(jsonStrObj);

}
