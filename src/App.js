import React from "react";
import './App.css';
import { WelcomePage } from "./components/WelcomePage";

class App extends React.Component{
    constructor(props) {
        super(props)
    };

    render() {
        return (
          <WelcomePage/>
        );
    }
}

export default App;
