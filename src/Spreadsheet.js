import config from "./config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A8:O90",
        valueRenderOption: "UNFORMATTED_VALUE"
      })
      .then(
        response => {
          const spreadsheet = response.result.values;
          const headings = spreadsheet.shift();
          let data = spreadsheet.map((row) =>
            row.reduce((obj, value, i) => Object.assign(obj, {[headings[i]]: value}))
          );
          callback({data});
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}