/**
 * ACC Website Database API (Google Drive JSON Store)
 * 
 * ==========================================
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com/ and create a "New Project"
 * 2. Delete the default code and paste this entire file in.
 * 3. Save the project as "ACC Database API".
 * 4. Click "Deploy" -> "New deployment" at the top right.
 * 5. Select type "Web app" (click the gear icon if you don't see it).
 * 6. Set "Execute as" to "Me" (your Google account).
 * 7. Set "Who has access" to "Anyone" (crucial so the website can read it).
 * 8. Click "Deploy", authorize the permissions, and copy the resulting Web App URL.
 * 
 * NOTE ON PERMISSIONS: It will warn you that the app isn't verified. 
 * Click "Advanced" and "Go to ACC Database API (unsafe)" to approve.
 * 
 * IMPORTANT: EVERY TIME YOU MODIFY THIS SCRIPT, you must create a NEW deployment 
 * (Deploy -> New deployment). Saving alone will not update the live URL.
 * ==========================================
 */

// Name of the database file that will be created in your Google Drive root.
const DB_FILE_NAME = "ACC_Website_Database.json";

// The default structure if the database is empty
const DEFAULT_DB = {
  events: [],
  team: [],
  gallery: {}
};

/**
 * Gets or creates the database file in Google Drive.
 */
function getOrCreateDbFile() {
  const files = DriveApp.getFilesByName(DB_FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  } else {
    // Create new file with default JSON
    return DriveApp.createFile(DB_FILE_NAME, JSON.stringify(DEFAULT_DB), MimeType.PLAIN_TEXT);
  }
}

/**
 * Handles public GET requests to read the database. This endpoint is read-only.
 * To support CORS, Apps Script automatically handles OPTIONS requests and 
 * adds CORS headers when returning JSON from a Web App using ContentService.
 */
function doGet(e) {
  try {
    const file = getOrCreateDbFile();
    const content = file.getBlob().getDataAsString();
    
    return ContentService.createTextOutput(content)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Unable to load public site data." }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Reject all public writes. Publish a new Apps Script deployment after updating
 * this file; existing deployments keep running their previously deployed code.
 */
function doPost(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: "This endpoint is read-only."
  })).setMimeType(ContentService.MimeType.JSON);
}
