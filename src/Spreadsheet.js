import config from "./config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets
    .get({
      spreadsheetId: config.spreadsheetId,
    })
    .then(
      response => {
        const sheetTitles = response.result.sheets.map(sheet => sheet.properties.title);
        window.gapi.client.sheets.spreadsheets.values
        .batchGet({
          spreadsheetId: config.spreadsheetId,
          ranges: sheetTitles.map(sheet => `${sheet}!A8:O90`),
          valueRenderOption: "UNFORMATTED_VALUE"
        })
        .then(
          response => {
            const sheetsData = response.result.valueRanges.map(range => {
              const spreadsheet = range.values;
              const headings = spreadsheet.shift();
              if(headings.includes('Poster Titles')) {
                return spreadsheet
                  .filter(row => Array.isArray(row) && row.length)
                  .map(row =>
                    row.reduce((obj, value, i) => Object.assign(obj, {[headings[i]]: value}))
                );
              }
              return [];
            });
            callback({ data: [].concat.apply([], sheetsData) });
          },
          response => {
            callback(false, response.result.error);
          }
        )
      }
    );
  });
}