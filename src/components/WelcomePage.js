import React from "react";
import { Button, Icon } from 'semantic-ui-react';
import { initialise, updateSheet, initGoogleSheets } from "../config/googleSheetsConfig";
import logo from '../logo.svg';
import '../../src/App.css';
import './table.css';

export class WelcomePage extends React.Component {
    constructor(props, state) {
        super(props, state);  
        this.state = {
            loggedin: false,
            firstName: '',
            lastName: '',
        };
    }

    googleLogin = () => {
        initialise(this.successAction, this.errorAction);
    }

    successAction  = (sheet) => {
        this.setState({sheetData: sheet, loggedin: true});
    }

    errorAction = (error) => {
        console.log(error);
    }

    render() {
        return (
            <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Google Spread Sheets</h1>
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                {!this.state.loggedin ? 
                <Button content='Primary' primary onClick= {this.googleLogin}>
                    <Icon name='users' /> Authorize and Execute
                </Button> :
                <Button color='google plus' onClick= {this.LogOut}>
                    <Icon name='google' /> Logout
                </Button>}
                { this.state.loggedin ? <div className='content_area'>
                    <div className='table_area'>
                    <table>
                        <tbody>
                        {this.state.sheetData.map((item, i) => (
                            <tr key={i}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                    <div className='form_area'>
                    <fieldset className='legend'>
                        <legend className='legend'>Personal information:</legend>
                        First name:<br/>
                        <input className='input' value={this.state.firstName} type="text" name="firstname" onChange={(e) => this.firstNameChange(e)}/>
                        <br/>
                        Last name:<br/>
                        <input className='input' value={this.state.lastName} type="text" name="lastname" onChange={(e) => this.lastNameChange(e)} />
                        <br/><br/>
                       { this.isSubmitShown() ? <input className='input' type="button" value="Submit" onClick={this.updateSheet}/> : null}
                    </fieldset> 
                    {this.state.response ? <div>
                    <p>Updated Cells: {this.state.response.updatedCells}</p>
                    <p>Inserted Rows: {this.state.response.updatedRows}</p>
                </div> : null}
                </div> 
        </div>  : null }
            </div>
        );
    }

    updateSheet = () => {
        updateSheet(this.state.firstName, this.state.lastName, this.updateSuccessAction, this.updateErrorAction);
    }

    updateSuccessAction = (response) => {
        this.deployUpdates(response);
    }

    deployUpdates = (response) => {
        this.setState({response: response.result.updates, firstName: '', lastName: ''});
        this.refreshSheet();
    }

    updateErrorAction = (error) => {
        console.log(error);
    }

    firstNameChange = (event) => {
        this.setState({firstName: event.target.value});
    }

    lastNameChange = (event) => {
        this.setState({lastName: event.target.value});
    }
    
    LogOut = () => {
        this.setState({loggedin: false});
    }

    refreshSheet = () => {
        initGoogleSheets(this.successAction, this.errorAction);
    }

    isSubmitShown = () => {
        if(this.state.firstName !== '' && this.state.lastName !== '') {
            return true;
        }
        return false;
    }
}