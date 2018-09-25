export function load(callback){
  fetch('/spreadsheet').then(response => {
    if(response.status === 200){
      response.json().then(data => {
        callback(data);
      });
    } else {
      callback(false, response.statusText);
    }
  });
}

export function oldload(callback) {
  const config = {spreadsheetId: ''};
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
            const sheetsData = response.result.valueRanges.map((range, sheetIndex) => {
              const spreadsheet = range.values;
              console.log(range);
              const headings = spreadsheet.shift();
              if(headings.includes('Poster Titles')) {
                return spreadsheet
                  .filter(row => Array.isArray(row) && row.length)
                  .map(row =>
                    row.reduce((obj, value, i) => Object.assign(obj, {[headings[i]]: value})))
                  .map(row =>
                    Object.assign(row, {sheetName: range.range, sheetIndex })
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