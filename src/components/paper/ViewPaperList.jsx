import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai"
import { AiFillEye } from "react-icons/ai";
import PaperServiceComponent from '../../service/paper/PaperServiceComponent';
import FooterComponent from '../homepage/FooterComponent';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';

class ViewPaperList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            paperList: [],
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.update = this.update.bind(this);
        this.view = this.view.bind(this);
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

    componentDidMount() {
        PaperServiceComponent.listAllPapers().then(res => {
            this.setState({ paperList: res.data });
        })
    }

    delete(paperId) {
        PaperServiceComponent.deletePaper(paperId).then(res => {
            this.setState({
                paperList: this.state.paperList.filter(paperList => paperList.paperId !== paperId)
            })
        }).catch(error=>{
            alert(error.response);
        })
    }

    view(paperId, userId) {
        this.props.history.push('/viewpaper/' + userId + '/' + paperId);
    }

    edit(paperId, userId){
        this.props.history.push('/updatepaper/' + userId + '/' + paperId);
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
                <div className="row paper-table">
                    <h3>Paper List</h3>
                    <table className="table table-striped table-hover table-bordered user-table text-center">
                        <thead className="table-dark">
                            <th><h6>Paper Id</h6></th>
                            <th><h6>Publish Date</h6></th>
                            <th><h6>Editor</h6></th>
                            <th><h6>Price</h6></th>
                            <th colspan="3"><h6>Action</h6></th>
                        </thead>
                        <tbody className="table-danger">
                            {
                                this.state.paperList.map(
                                    paper =>
                                        <tr key={paper.paperId}>
                                            <td >{paper.paperId}</td>
                                            <td>{new Date(paper.publishDate).toLocaleDateString()}</td>
                                            <td >{paper.editor.userName}</td>
                                            <td >{paper.price}</td>
                                            <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="Delete Paper" onClick={() => this.delete(paper.paperId)}><TiDelete size={30}></TiDelete></button></td>
                                            <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="Edit Paper" onClick={() => this.edit(paper.paperId, this.state.userId)}><AiFillEdit size={30}></AiFillEdit></button></td>
                                            <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="View News List" onClick={() => this.view(paper.paperId, this.state.userId)}><AiFillEye size={30} /></button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default ViewPaperList;