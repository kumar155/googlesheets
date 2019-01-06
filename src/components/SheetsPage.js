import React from "react";
import '../src/assets/table.css';
import { initialise } from "../config/googleSheetsConfig";

export class SheetsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sheetData: JSON.parse(sessionStorage.getItem('sheet')),
            firstName : '',
            lastName: '',
        };
    };
    render(){
        return (
            <div className="App">
                <div className="App-intro">
                    <div className="App-title">Login Successful for user</div>
                    <br/>
                        <button onClick={this.LogOut}> Log out</button>
                    <br/>
                    <br/>
                <div className='content_area'>
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
                        <input className='input' type="text" name="firstname" onChange={(e) => this.firstNameChange}/>
                        <br/>
                        Last name:<br/>
                        <input className='input' type="text" name="lastname" onChange={(e) => this.lastNameChange} />
                        <br/><br/>
                        <input className='input' type="submit" value="Submit" onClick={this.initClient}/>
                    </fieldset> 
                </div> 
                </div>                 
                </div>
            </div>       
          )
    }
    firstNameChange = (event) => {
        this.setState({firstName: event.target.value});
    }

    lastNameChange = (event) => {
        this.setState({lastName: event.target.value});
    }
    
    LogOut = () => {
        sessionStorage.removeItem('sheetData');
        sessionStorage.setItem('access', false);
        browserHistory.push('/');
    }

    initClient = () => {
        initialise(this.successAction, this.errorAction);
    }

}