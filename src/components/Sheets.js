import React, {Component} from 'react';
import gapi from './gapi';

export default class SpreadSheet extends Component {
    componentDidMount() {
        this.initialise();
    }    

    updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.loadSpreadsheet();
        }
    };

    loadSpreadsheet = () => {
        window.gapi.client.load("sheets", "v4").then(() => {
            this.loadSheets();
        })        
    }

    loadSheets = () => {
        window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1SsMUATCjpJSUo_AtVgPT2ZxdBToYO7KP10G7D4ZSsAg",
            range: "A1:B5"
        }).then(function (response) {
            var sheets = JSON.parse(response.body).values;
            console.log(sheets);
        }.bind(this));
    }

    initClient = () => {        
        gapi.auth.signIn({
            callback: response => this.loadSpreadsheet(response),
            apiKey: 'AIzaSyCCV-QqpFTkeeEnsUyZOpd12JKnFqTxk2k',
            clientid: "843221626895-56up5kpiqv8sr6dbmdl6hajtfljcnkc1.apps.googleusercontent.com", //Google client Id
            cookiepolicy: "single_host_origin",
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            requestvisibleactions: "http://schema.org/AddAction",
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.file',
        });    
    }

    initialise = () => {
        return gapi.load("client:auth2", this.initClient.bind(this));
    };    

    updateCell = (sheetName, column, row, value, successCallback, errorCallback) => {
        var data = {
            spreadsheetId: "1SsMUATCjpJSUo_AtVgPT2ZxdBToYO7KP10G7D4ZSsAg",
            range: "Sheet1!A18:B18",
            valueInputOption: 'USER_ENTERED',
            values: [
                [
                  "kumar", "satish donthu"
                ],
              ],
            majorDimension: "ROWS",
        };
        window.gapi.client.sheets.spreadsheets.values.append(data).then((response) => {
            this.successAction(response);
        }, (reason) => {
            this.errorAction(reason);        
        });
    };

    successAction = (response) => {
        console.log(response);
    }

    errorAction = (response) => {
        console.log(response);
    }

    render() {
        return(
            <div>
                Hello.....
                <input type="button" value="update" onClick={this.updateCell}/>
            </div>
        );
    }
}