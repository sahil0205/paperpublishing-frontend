import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import FooterComponent from '../homepage/FooterComponent';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import PaperServiceComponent from '../../service/paper/PaperServiceComponent';
import { AiFillEye } from "react-icons/ai";

class ViewEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            userName: '',
            role: '',
            contactNumber: '',
            emailId: '',
            paperData: [],
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.view = this.view.bind(this);
        this.update = this.update.bind(this);
    }

    goHome() {
        this.props.history.push('/onlogin/' + this.state.userId);
    }

    logout() {
        UsersServiceComponent.logout().then(res => {
            this.props.history.push('/');
        })
    }

    update(userId){
        this.props.history.push('/updateuser/'+userId);
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

    view(paperId, userId) {
        this.props.history.push('/viewpaper/' + userId + '/' + paperId);
    }

    update(userId){
        this.props.history.push('/updateuser/'+userId);
    }

    componentDidMount(){
        UsersServiceComponent.listUserById(this.state.userId).then(res => {
            this.setState({
                userName: res.data.userName,
                role: res.data.role,
                contactNumber: res.data.contactNumber,
                emailId: res.data.emailId
            });
        })

        PaperServiceComponent.listPaperByEditor(this.state.userId).then(res => {
            this.setState({
                paperData: res.data,
            });
        })
    }

    render() {
        return (
            <div className="login-background">
              <nav className="navbar-container nav-brand"><a className=" a" href="#"><BsNewspaper size={32}></BsNewspaper><i><b>THE PEOPLE'S PAPER</b></i></a>
                    <button className="afterlogin-btn btn" data-toggle="tooltip" data-placement="left" title="Home" onClick={this.goHome}><MdHome size={28}></MdHome></button>
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
                        <h3>Paper List</h3>
                        <table className="table table-striped table-hover table-bordered user-table text-center">
                            <thead className="table-dark">
                                <th><h6>Paper Id</h6></th>
                                <th><h6>Publish Date</h6></th>
                                <th><h6>Price</h6></th>
                                <th><h6>Action</h6></th>
                            </thead>
                            <tbody className="table-danger">
                                {
                                    this.state.paperData.map(
                                        paper =>
                                            <tr key={paper.paperId}>
                                                <td width="50px">{paper.paperId}</td>
                                                <td width="100px">{new Date(paper.publishDate).toLocaleDateString()}</td>
                                                <td width="100px">{paper.price} Rs.</td>
                                                <td width="100px"><button className=" btn" data-toggle="tooltip" data-placement="left" title="View Paper" onClick={() => this.view(paper.paperId, this.state.userId)}><AiFillEye size={30} /></button></td>
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

export default ViewEditor;