/**
 * Google Drive Media Gallery API
 * 
 * ==========================================
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Click "Deploy" -> "New deployment" at the top right of the Apps Script editor.
 * 2. Select type "Web app" (click the gear icon if you don't see it).
 * 3. Set "Execute as" to "Me" (your Google account).
 * 4. Set "Who has access" to "Anyone".
 * 5. Click "Deploy" and copy the resulting Web App URL.
 * 
 * IMPORTANT: EVERY TIME YOU MODIFY THIS SCRIPT, you must create a NEW deployment 
 * (Deploy -> New deployment). Saving the file or using "Test deployments" will NOT 
 * update the live URL used by your website.
 * 
 * FOLDER ID:
 * Navigate to your root gallery folder in Google Drive.
 * The URL will look like: https://drive.google.com/drive/folders/1A2b3C4d5E6f7G8h9I0j
 * Copy the part after "folders/" (e.g., 1A2b3C4d5E6f7G8h9I0j) and paste it below.
 * 
 * CORS:
 * Apps Script automatically handles CORS headers when returning JSON from a Web App 
 * using ContentService. This allows your website to fetch data securely from any origin.
 * 
 * EXPECTED JSON SHAPE:
 * {
 *   "events": [
 *     {
 *       "event": "01_Easter 2025",
 *       "cover": "https://drive.google.com/thumbnail?id=...&sz=w400",
 *       "images": [
 *         {
 *           "id": "file_id",
 *           "name": "photo1.jpg",
 *           "url": "https://drive.google.com/uc?export=view&id=file_id",
 *           "thumb": "https://drive.google.com/thumbnail?id=file_id&sz=w400"
 *         }
 *       ]
 *     }
 *   ]
 * }
 * ==========================================
 */

const ROOT_FOLDER_ID = "YOUR_FOLDER_ID_HERE";

function doGet(e) {
  try {
    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const subfoldersIterator = rootFolder.getFolders();
    const events = [];

    while (subfoldersIterator.hasNext()) {
      const folder = subfoldersIterator.next();
      const filesIterator = folder.getFiles();
      const images = [];

      while (filesIterator.hasNext()) {
        const file = filesIterator.next();
        const mimeType = file.getMimeType();
        
        // Only collect files that are images
        if (mimeType.indexOf("image/") === 0) {
          const fileId = file.getId();
          images.push({
            id: fileId,
            name: file.getName(),
            url: "https://lh3.googleusercontent.com/d/" + fileId + "=w1200",
            thumb: "https://lh3.googleusercontent.com/d/" + fileId + "=w400"
          });
        }
      }

      // Only include folders that have at least one image
      if (images.length > 0) {
        // Sort images alphabetically by file name
        images.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
        
        events.push({
          event: folder.getName(),
          cover: images[0].thumb,
          images: images
        });
      }
    }

    // Sort event folders alphabetically by folder name
    events.sort(function(a, b) {
      return a.event.localeCompare(b.event);
    });

    const responseObj = {
      events: events
    };

    return ContentService.createTextOutput(JSON.stringify(responseObj))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    const errorResponse = {
      error: error.toString(),
      message: "Make sure ROOT_FOLDER_ID is set correctly and the folder exists."
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
