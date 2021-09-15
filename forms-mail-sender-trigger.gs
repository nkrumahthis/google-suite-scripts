var url = "https://calendar.google.com/event?action=TEMPLATE&tmeid=dmdzZXI3bW8zcWhwZnU4ZTNvOGgyODY5ZmMgYWZyb3Npbm9jZW50cmVAbQ&tmsrc=afrosinocentre%40gmail.com";

var EMAIL_SUBJECT = 'Thanks For Registering Successfully';

/**
 * Installs a trigger on the Spreadsheet for when a Form response is submitteed.
 */
function installTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();
}

/**
 * sends a customized email for every response on a form.
 * 
 * @param {Object} event - Form submit event
 */
function onFormSubmit(e){
  var responses = e.namedValues;

  // If the question title is a label, it can be accessed as an object field.
  // If it has spaces or other characters, it can be accessed as a dictionary.
  var email = responses['Email'][0].trim();

  var emailBody = '<h3>Add it to your calendar</h3><p>Click on the below to add the <b>Sino-African Relations: African State Effectiveness and Local Agency</b> to your google calendar</p><a target="_blank" href="https://calendar.google.com/event?action=TEMPLATE&tmeid=dmdzZXI3bW8zcWhwZnU4ZTNvOGgyODY5ZmMgYWZyb3Npbm9jZW50cmVAbQ&tmsrc=afrosinocentre%40gmail.com"style="background-color: green; color: white;padding: 8px 20px;text-decoration:none;font-weight:bold;border-radius:5px;cursor:pointer;">Add To Google Calendar</a><p>This will set up an automatic reminder so that you do not miss this event</p><div><h3>Event</h3><dl><dt>Webinar</dt><dd>International Political Economy Pillar</dd><dt>Title</dt><dd>Sino-African Relations: African State Effectiveness and Local Agency</dd><dt>Date and Time</dt><dd>Octover 1, 2021, 8AM EST / 12 noon GMT</dd><dt>Zoom ID</dt><dd><a href="https://www.google.com/url?q=https://udenver.zoom.us/j/87382190590&sa=D&source=calendar&usd=2&usg=AOvVaw2JPyuRoMRzncvkZSJ6h0ro">84692165764</a></dd><dt>Panelists</dt><dd><b>Dr. Kwame Adovor</b>, University of Minnesota, "African Agency, and Local Capacity for Effective Sino-African Relations"</dd><dd><b>Dr. Mark Obeng, University of Ghana</b>, Legon, "African Agency and the Consumption Chinese Electronics"</dd><dd><b>Mr. Anthony Yaw Baah</b>, Secretary General of Ghana Trade Union Congress, "Labor issues?"</dd><dd><b>Professor Aaron Tesfaye</b>, Moderator, William Paterson University</dd></dl>Attachment: Brief Bio and Abstracts</div>';

  // send email to the registrant
  MailApp.sendEmail({
    to: email,
    subject: EMAIL_SUBJECT,
    htmlBody: emailBody
  });
  status = 'Sent';

  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  var column = e.values.length + 1;
  sheet.getRange(row, column).setValue(status);

  Logger.log("status-" + status + "; responses=" + JSON.stringify(responses));
}




