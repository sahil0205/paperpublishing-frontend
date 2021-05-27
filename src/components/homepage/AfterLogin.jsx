import React, { Component } from 'react';
import '../users/login.css';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from './FooterComponent';
import { AiFillEye } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

class AfterLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            userName: '',
            role: '',
            contactNumber: '',
            emailId: '',
            userData: [],
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.view = this.view.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        UsersServiceComponent.listUserById(this.state.userId).then(res => {
            console.log(res.data.userName);
            this.setState({
                userName: res.data.userName,
                role: res.data.role,
                contactNumber: res.data.contactNumber,
                emailId: res.data.emailId
            })
        })

        UsersServiceComponent.listAllUsers().then(res => {
            this.setState({
                userData: res.data,
            })
        })
    }

    goHome() {
        this.props.history.push('/onlogin/' + this.state.userId);
    }

    logout() {
        UsersServiceComponent.logout().then(res => {
            this.props.history.push('/');
        })
    }

    view(userId, role) {
        if(role==="Reporter"){
            this.props.history.push('/viewreporter/'+userId)
        }
        else{
            this.props.history.push('/vieweditor/'+userId)
        }
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

    update(userId){
        this.props.history.push('/updateuser/'+userId);
    }

    delete(userId) {
        if (userId === this.state.userId)
            alert("User is currently logged in cannot delete.");
        else {
            UsersServiceComponent.deleteUser(userId).then(res => {
                this.setState({
                    userData: this.state.userData.filter(userData => userData.userId !== userId)
                });
            }).catch(error => {
                alert(error.response.data);
            })
        }
    }

    render() {
        return (
            <div className="login-background">
                <nav className="navbar-container nav-brand"><a className=" a" href="#"><BsNewspaper size={32}></BsNewspaper><i><b>THE PEOPLE'S PAPER</b></i></a>
                    <button className="afterlogin-btn btn" data-toggle="tooltip" data-placement="left" title="Home"onClick={this.goHome}><MdHome size={28}></MdHome></button>
                    <button className=" btn" data-toggle="tooltip" data-placement="left" title="Update User" onClick={() => this.update(this.state.userId)}><AiFillSetting size={25}></AiFillSetting></button>
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
                <div className="row user-row">
                    <div className="card bg-light col">
                        <img className="card-img-top user-img" src="/user-img.jpg" alt="Card image cap" width="150" height="170" />
                        <div className="card-title">
                            <h4 className="text-center"><i>User Info</i></h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li>User Id: {this.state.userId}</li>
                                <li>User Name: {this.state.userName}</li>
                                <li>Role: {this.state.role}</li>
                                <li>Email Id: {this.state.emailId}</li>
                                <li>Contact: {this.state.contactNumber}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-9 ">
                        <h3>Users List</h3>
                        <table className="table table-striped table-hover table-bordered user-table text-center">
                            <thead className="table-dark">
                                <th ><h6>User Name</h6></th>
                                <th ><h6>Role</h6></th>
                                <th colSpan="2"><h6>Action</h6></th>
                            </thead>
                            <tbody className="table-danger">
                                {
                                    this.state.userData.map(
                                        user =>
                                            <tr key={user.userId}>
                                                <td width="280px">{user.userName}</td>
                                                <td width="280px">{user.role}</td>
                                                <td width="20px"><button className=" btn" data-toggle="tooltip" data-placement="left" title="Delete User" onClick={() => this.delete(user.userId)}><TiDelete size={30}></TiDelete></button></td>
                                                <td width="20px"><button className=" btn" data-toggle="tooltip" data-placement="left" title="View User" onClick={() => this.view(user.userId, user.role)}><AiFillEye size={28} /></button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default AfterLogin;