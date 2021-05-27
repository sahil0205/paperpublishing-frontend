import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import FooterComponent from '../homepage/FooterComponent';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import '../../App.css'

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            userName: '',
            role: '',
            contactNumber: '',
            emailId: '',
            password: '',
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.update = this.update.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.reset = this.reset.bind(this);

    }

    goHome() {
        this.props.history.push('/onlogin/' + this.state.userId);
    }

    logout() {
        UsersServiceComponent.logout().then(res => {
            this.props.history.push('/');
        })
    }

    newsmodule(userId) {
        this.props.history.push('/newshome/' + userId);
    }

    papermodule(userId) {
        this.props.history.push('/paperhome/' + userId);
    }

    categorymodule(userId) {
        this.props.history.push('/categoryhome/'+userId);
    }

    usermodule(userId){
        this.props.history.push('/onlogin/' + userId);
    }

    update(userId) {
        this.props.history.push('/updateuser/' + userId);
    }

    updateUser = (event) => {
        event.preventDefault();
        let userObj = { userId: this.state.userId, userName: this.state.userName, contactNumber: this.state.contactNumber, emailId: this.state.emailId, password: this.state.password, role: this.state.role };
        UsersServiceComponent.updateUser(userObj).then(res => {
            alert('user data updated');
            this.props.history.push('/onlogin/' + res.data.userId);
        })
    }

    reset() {
        this.setState({
            userName: '',
            contactNumber: '',
            emailId: '',
            password: ''
        })
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    componentDidMount() {
        UsersServiceComponent.listUserById(this.state.userId).then(res => {
            this.setState({
                userName: res.data.userName,
                role: res.data.role,
                contactNumber: res.data.contactNumber,
                emailId: res.data.emailId,
                password: res.data.password
            });
        })
    }

    render() {
        return (
            <div className="login-background">
                <nav className="navbar-container nav-brand"><a className=" a" href="#"><BsNewspaper size={32}></BsNewspaper><i><b>THE PEOPLE'S PAPER</b></i></a>
                    <button className="afterlogin-btn btn" data-toggle="tooltip" data-placement="left" title="Home" onClick={this.goHome}><MdHome size={28}></MdHome></button>
                    <button className=" btn" data-toggle="tooltip" data-placement="left" title="Update User" onClick={this.update}><AiFillSetting size={25}></AiFillSetting></button>
                    <button className=" btn" data-toggle="tooltip" data-placement="left" title="Logout" onClick={this.logout}><BiLogOut size={27}></BiLogOut></button>
                </nav>
                <nav className="second-navbar-container row">
                    <div className=" text-center">
                        <ul className="nav ">
                            <li className="nav-item col"><button className="second-nav-userdir" onClick={() => this.usermodule(this.state.userId)}><b><i>User Module</i></b></button></li>
                            <li className="nav-item col"><button className="second-nav-userdir" onClick={() => this.categorymodule(this.state.userId)}><b><i>Category Module</i></b></button></li>
                            <li className="nav-item col"><button className="second-nav-userdir" onClick={() => this.newsmodule(this.state.userId)}><b><i>News Module</i></b></button></li>
                            <li className="nav-item col"><button className="second-nav-userdir" onClick={() => this.papermodule(this.state.userId)}><b><i>Paper Module</i></b></button></li>
                        </ul>
                    </div>
                </nav>
                <div className="row ">
                    <div className="col "></div>
                    <div className="col ">
                        <div className="card bg-light">
                            <form className="card-body">
                                <div className="card-title">
                                    <h3><i>Update User</i></h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            User Id:
                                    <input type="text" className="form-control" name="userId" value={this.state.userId} readOnly />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            User Name:
                                    <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Role:
                                    <input type="text" className="form-control" name="role" value={this.state.role} readOnly />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            Contact Number:
                                    <input type="text" className="form-control" name="contactNumber" value={this.state.contactNumber} onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Email Id:
                                    <input type="text" className="form-control" name="emailId" value={this.state.emailId} />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            Password:
                                    <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button type="button" className="btn btn-success w-50" onClick={this.updateUser}>Update</button>
                                        </div>
                                        <div className="col ">
                                            <button type="button" className="btn btn-warning w-50" onClick={this.reset}>Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col "></div>
                </div>
                <div className="footer-container footer-margin-top">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default UpdateUser;