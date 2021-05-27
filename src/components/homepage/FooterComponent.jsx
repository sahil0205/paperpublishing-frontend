import React, { Component } from 'react';
import '../../App.css'
class FooterComponent extends Component {
    render() {
        return (
            <div className="container">
            <div className="row">
            <footer className="footer-copyright text-center">
                <div className="container-fluid">
                    <span className="text-muted">2021 Copyright @CodeManiacs</span>
                </div>
            </footer>
            </div>
            </div>
        );
    }
}

export default FooterComponent;