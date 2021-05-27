import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from '../homepage/FooterComponent';
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai"
import NewsServiceComponent from '../../service/news/NewsServiceComponent';

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            newsList: [],
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
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

    usermodule(userId) {
        this.props.history.push('/onlogin/' + userId);
    }


    componentDidMount() {
        NewsServiceComponent.listAllNews().then(res => {
            this.setState({ newsList: res.data });
        }).catch(error => {
        });
    }

    delete(newsId) {
        NewsServiceComponent.deleteNews(newsId).then(res => {
            this.setState({
                newsList: this.state.newsList.filter(newsList => newsList.newsId !== newsId)
            })
        })
    }

    edit(newsId, userId, categoryName, reporterId) {
        this.props.history.push('/updatenews/' + userId + '/' + newsId + '/' + categoryName + '/' + reporterId);
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
                <div className="row news-table">
                    <h3>News List</h3>
                    <table className="table  table-striped table-hover table-bordered  text-center">
                        <thead className="table-dark">
                            <th><h6>Reporter</h6></th>
                            <th><h6>Headline</h6></th>
                            <th><h6>Location</h6></th>
                            <th><h6>Description</h6></th>
                            <th colspan="2"><h6>Action</h6></th>
                        </thead>
                        <tbody className="table-danger">
                            {
                                this.state.newsList.map(
                                    news =>
                                        <tr key={news.newsId}>
                                            <td >{news.reporter.userName}</td>
                                            <td >{news.headline}</td>
                                            <td >{news.location}</td>
                                            <td >{news.newsDescription}</td>
                                            <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="Delete News" onClick={() => this.delete(news.newsId)}><TiDelete size={30}></TiDelete></button></td>
                                            <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="Edit News" onClick={() => this.edit(news.newsId, this.state.userId, news.category.categoryName, news.reporter.userId)}><AiFillEdit size={30}></AiFillEdit></button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div >
        );
    }
}

export default NewsList;