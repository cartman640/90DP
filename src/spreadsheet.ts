import {Request, Response} from "express";
import {google} from "googleapis";

const spreadsheetId = process.env.SPREADSHEET_ID;

export const index = (req: Request, res: Response) => {
    fetchSheet().then(sheet => {
        res.json(sheet);
    }).catch(err => {
        console.log('error');
        console.error(err);
        res.send(err.errors[0].message).status(500);
    });
}

async function fetchSheet(){
    const auth = await google.auth.getClient({
        keyFile: 'google-credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    const spreadsheet = google.sheets({
        version: 'v4'
    });
    
    const sheetResponse = await spreadsheet.spreadsheets.get({
        spreadsheetId: spreadsheetId,
        includeGridData: false,
        auth: auth
    });
    const sheet = sheetResponse.data;
    const sheetTitles = sheet.sheets.map(sheet => sheet.properties.title);
    const sheetTitleRanges = sheetTitles.map(sheet => `${sheet}!A8:O90`);
    const sheetBatchGet = await spreadsheet.spreadsheets.values.batchGet({
        auth: auth,
        spreadsheetId: spreadsheetId,
        ranges: sheetTitleRanges,
        valueRenderOption: "UNFORMATTED_VALUE"
    } as any);
    const sheetsData = sheetBatchGet.data.valueRanges.map((range: any, sheetIndex: number) => {
        const spreadsheet: any[] = range.values;
        const headings = spreadsheet.shift();
        if(headings.includes('Poster Titles')) {
            return spreadsheet
                .filter(row => Array.isArray(row) && row.length)
                .map((row: any[]) => {
                    let formattedRow: any = {
                        sheetName: range.range,
                        sheetIndex: sheetIndex
                    };
                    for(const i in row){
                        formattedRow[headings[i]] = row[i];
                    }
                    return formattedRow;
                }
            );
        } else {
            return [];
        }
    });
    return { data: [].concat.apply([], sheetsData) };
}