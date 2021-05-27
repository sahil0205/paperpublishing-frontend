import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import FooterComponent from '../homepage/FooterComponent';
import PaperServiceComponent from '../../service/paper/PaperServiceComponent';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';

class ViewPaperByEditor extends Component {
    constructor(props){
        super(props);
        this.state={
            userId: this.props.match.params.userId,
            editorId:'',
            pId:'',
            pDate:'',
            editorName:'',
            price:'',
            paperData: []
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.update = this.update.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.search = this.search.bind(this);
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

    update(userId) {
        this.props.history.push('/updateuser/' + userId);
    }

    newsmodule(userId) {
        this.props.history.push('/newshome/' + userId);
    }

    papermodule(userId) {
        this.props.history.push('/paperhome/' + userId);
    }

    categorymodule(userId) {
        this.props.history.push('/categoryhome/' + userId);
    }

    usermodule(userId){
        this.props.history.push('/onlogin/' + userId);
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    search = (event) =>{
        event.preventDefault();
        PaperServiceComponent.listPaperByEditor(this.state.editorId).then(res =>{
            console.log(res.data);
            this.setState({paperData: res.data});
        }).catch(error =>{
            alert(error.response.data);
        })
    }

    reset = (event) => {
        event.preventDefault();
        this.setState({ nId:'',
       paperData:[], editorId:'' });
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
                <div className="row ">
                    <div className="col "></div>
                    <div className="col ">
                        <div className="card bg-light add-news-card w-100">
                            <form className="card-body">
                                <div className="card-title">
                                    <h3><i>View Paper Details</i></h3>
                                </div>
                                <label className="form-label"> Editor Id </label>
                                <input type="text" className="form-control" onChange={this.myChangeHandler} name="editorId" />
                                <button className="add-cat-btn btn btn-success" onClick={this.search}>Submit</button>&nbsp;
                                <button className="add-cat-btn btn btn-danger" onClick={this.reset}>Reset</button><br /><br />

                                <div >
                                    <table className="table table-striped table-hover table-bordered text-center">
                                        <thead className="table-dark">
                                            <th><h6> Id</h6></th>
                                            <th><h6>Date</h6></th>
                                            <th><h6>Price</h6></th>
                                        </thead>
                                        <tbody className="table-danger"> 
                                            {
                                                this.state.paperData.map(
                                                    paper =>
                                                        <tr key={paper.paperId}>
                                                            <td >{paper.paperId}</td>
                                                            <td >{new Date(paper.publishDate).toLocaleDateString()}</td>
                                                            <td >{paper.price} Rs.</td>
                                                            
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default ViewPaperByEditor;