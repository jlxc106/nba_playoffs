import React, { Component } from "react";
import HeaderTitle from "./headerTitle.js";
import { Route } from "react-router-dom";
import Home from "./home";
import Series_page from "./series_page";
import "./App.css";


class App extends Component{

    render(){
        return(
            <div className=''>
            <HeaderTitle />
                <Route path ="/series_page" component={Series_page} />
                <Route exact path="/" component={Home}/>
            </div>
        )
    }
}

export default App;