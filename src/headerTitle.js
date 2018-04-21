import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class headerTitle extends Component{
    render(){
        return( 
            <Link to='/'><header className="page-header">NBA PLAYOFFS 2018</header></Link>
        )
    }
}

export default headerTitle;