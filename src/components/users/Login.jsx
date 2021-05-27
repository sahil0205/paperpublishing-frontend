import React, { Component } from 'react';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import '../../App.css';
import '../homepage/footer.css';
import '../navbars/navbar.css';
import '../users/login.css';
import FooterComponent from '../homepage/FooterComponent';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            role: '',
            userName: '',
            contactNumber: '',
            roleRegister: '',
            emailIdRegister: '',
            passwordRegister: '',
            id:'',
            errors:[]
        }

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    login = (event) => {
        event.preventDefault();
            UsersServiceComponent.login(this.state.emailId, this.state.password).then(res => { 
                console.log(res.data.userId);
                this.setState({
                    id: res.data.userId
                });
                this.props.history.push('/onlogin/'+res.data.userId);
            }).catch(error => {
                alert(error.response.data);
            })
                   
    }

    register = (event) => {
        event.preventDefault();
        let userObj = {userName: this.state.userName, contactNumber: this.state.contactNumber, emailId: this.state.emailIdRegister, password: this.state.passwordRegister, role: this.state.roleRegister};
        UsersServiceComponent.addUser(userObj).then(res => {
            alert("user registered");
            console.log(res.data);
        }).catch(error=>{
             
            alert(error.response.data);
        })
        this.setState({
            userName:'', contactNumber:'', emailIdRegister:'', passwordRegister:'',roleRegister:''
        });
    }

    goHome(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="login-background">
                <nav className="navbar-container nav-brand"><BsNewspaper size={32}></BsNewspaper><i><b>THE PEOPLE'S PAPER</b></i>
                    <button className="loginpage-home-btn btn" onClick={this.goHome}><MdHome size={32}></MdHome></button>
                </nav>
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col">
                            <div className="card bg-light">
                                <form className="card-body validated" noValidate>
                                    <div className="card-title">
                                        <h3><i>Login Form</i></h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group ">
                                            <label className="form-label w-75">
                                                Email:
                                    <input type="email" className="form-control " value={this.state.emailId} name="emailId" onChange={this.myChangeHandler} required/>
                                    
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label w-75">
                                                Password:
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.myChangeHandler} required/>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label w-75">
                                                Role:
                                        <select className="form-select" onChange={this.myChangeHandler} name="role" value={this.state.role}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option key="1" value="Reporter">Reporter</option>
                                                    <option key="2" value="Editor">Editor</option>
                                                </select>
                                            </label>
                                        </div>
                                        <br />
                                        <div className="col-md-12 text-center ">
                                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.login}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="col">
                            <div className="card bg-light">
                                <form className="card-body">
                                    <div className="card-title">
                                        <h3><i>User Registration Form</i></h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label w-48">
                                                User Name:
                                    <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.myChangeHandler} />
                                            </label>&emsp;
                                        <label className="form-label w-48">
                                                Contact Number:
                                    <input type="text" className="form-control" name="contactNumber" value={this.state.contactNumber} onChange={this.myChangeHandler} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label w-48">
                                                Email ID:
                                    <input type="email" className="form-control" name="emailIdRegister" value={this.state.emailIdRegister} onChange={this.myChangeHandler} />
                                            </label>&emsp;
                                        <label className="form-label w-48">
                                                Password:
                                    <input type="password" className="form-control" name="passwordRegister" value={this.state.passwordRegister} onChange={this.myChangeHandler} />
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label w-50">
                                                Role:
                                        <select className="form-select" onChange={this.myChangeHandler} name="roleRegister" value={this.state.roleRegister}>
                                                    <option selected disabled value="">Choose...</option>
                                                    <option key="1" value="Reporter">Reporter</option>
                                                    <option key="2" value="Editor">Editor</option>
                                                </select>
                                            </label>
                                        </div>
                                        <br />
                                        <div className="col-md-12 text-center ">
                                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm" onClick={this.register}>Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                    <div className="footer-container">
                        <FooterComponent />
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;