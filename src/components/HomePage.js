import React from "react";
import { Button, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import {config} from '../config/config';
import gapi from '../config/gapi';
import './App.css';


export class Sheets extends React.Component {
    constructor() {
        super();  
        this.state = {
            redirect: false,
        };
    }

    googleLogin = () => {
        this.initialise();
    }

    initialise = () => {
        return gapi.load("client:auth2", this.initClient.bind(this));
    }; 

    initClient = () => {        
        gapi.auth.signIn({
            callback: response => this.initGoogleSheets(response),
            apiKey: config.apiKey,
            clientid: config.clientId,
            cookiepolicy: config.cookiepolicy,
            discoveryDocs: config.discoveryDocs,
            requestvisibleactions: config.requestvisibleactions,
            scope: config.scope,
        });    
    }

    initGoogleSheets = () => {
        window.gapi.client.load("sheets", "v4").then(() => {
            this.loadSpreadSheet();
        })        
    }

    loadSpreadSheet = () => {
        window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: config.sheetId,
            range: "A1:B5"
        }).then(function (response) {
            var sheets = JSON.parse(response.body).values;
            sessionStorage.setItem("sheet", sheets);
            this.setState({redirect: true});
        }.bind(this));
    }

    render() {
        return (
            <div className="App">
            {this.renderRedirect()}
                <Button color='google plus' onClick= {this.googleLogin}>
                    <Icon name='google' /> Login with Google
                </Button>
            </div>
        );
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/Success' />
        }
    }
}