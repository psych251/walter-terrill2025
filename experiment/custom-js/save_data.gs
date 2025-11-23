function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the incoming data
  var data = JSON.parse(e.postData.contents);
  
  // If this is the first row, add headers
  if (sheet.getLastRow() === 0) {
    var headers = Object.keys(data);
    sheet.appendRow(headers);
  }
  
  // Add the data row
  var values = Object.keys(data).map(function(key) {
    return data[key];
  });
  sheet.appendRow(values);
  
  // Return success
  return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}