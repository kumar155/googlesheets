import {config} from './config';

export const initialise = (successCallBack, errorCallBack) => {
    return window.gapi.load("client:auth2", initClient.bind(this, successCallBack, errorCallBack));
}; 

const initClient = (successCallBack, errorCallBack) => {        
    window.gapi.auth.signIn({
        callback: response => initGoogleSheets(successCallBack, errorCallBack),
        apiKey: config.apiKey,
        clientid: config.clientId,
        cookiepolicy: config.cookiepolicy,
        discoveryDocs: config.discoveryDocs,
        requestvisibleactions: config.requestvisibleactions,
        scope: config.scope,
    });
}

export const initGoogleSheets = (successCallBack, errorCallBack) => {
    window.window.gapi.client.load("sheets", "v4").then(() => {
        loadSpreadSheet(successCallBack, errorCallBack);
    })        
}

const loadSpreadSheet = (successCallBack, errorCallBack) => {
    window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.sheetId,
        range: "A1:B13"
    }).then(function (response) {
        var sheets = JSON.parse(response.body).values;        
        successCallBack(sheets);
    }, function(error) {
        errorCallBack(error);
    }.bind(this));
}

export const updateSheet = (col1, col2, successCallback, errorCallback) => {
    var data = {
        spreadsheetId: config.sheetId,
        range: "Sheet1!A3:B3",
        valueInputOption: 'USER_ENTERED',
        values: [
            [
              col1, col2
            ],
          ],
        majorDimension: "ROWS",
    };
    window.gapi.client.sheets.spreadsheets.values.append(data).then((response) => {
        successCallback(response);
    }, (reason) => {
        errorCallback(reason);        
    });
};