import React, { Component } from 'react';
import '../navbars/navbar.css';
import '../homepage/homepage.css';
import { BsNewspaper } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);

    }

    login() {
        this.props.history.push('/userlogin');
    }
    render() {
        return (
            <>
                <div className='home-container' >
                <nav className="navbar-container nav-brand"><BsNewspaper size={32}></BsNewspaper><i><b>THE PEOPLE'S PAPER</b></i>
                <button className="aboutus-btn-container btn " data-toggle="tooltip" data-placement="left" title="Info" ><BsInfoCircleFill size={28} /></button>
                <button className="btn-container btn btn-dark" data-toggle="tooltip" data-placement="left" title="Login" onClick={this.login}>LOGIN</button> 
                </nav>
                
                <div class="bottom-left">
                <p className="intro-container"><h6>We at The People's Paper strive to bring forward the truth and serve the nation.</h6></p>
                    <p className="intro-container"><h6>The Peoples's Paper Web Application is an application allows the editors and reporters of the newspaper to access database, add news, view user information.</h6></p>
                    <br />
                    <br />
                    <span className="text-muted ">2021 Copyright @CodeManiacs</span>
                </div>
                </div>
            </>
        );
    }
}

export default HomePage;