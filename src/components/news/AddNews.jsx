import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from '../homepage/FooterComponent';
import CategoryServiceComponent from '../../service/category/CategoryServiceComponent';
import NewsServiceComponent from '../../service/news/NewsServiceComponent';

class AddNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            editorId: '',
            location: '',
            headline: '',
            newsDescription: '',
            category: '',
            userObj: [],
            categoryObj: []

        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);

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

    reset = (event) => {
        event.preventDefault();
        this.setState({
            editorId: '',
            location: '',
            headline: '',
            newsDescription: '',
            category: '',
        })
    }

    submit = (event) => {
        event.preventDefault();
        let userObj;
        UsersServiceComponent.listUserById(this.state.editorId).then(res => {
            this.setState({ userObj: res.data });

            CategoryServiceComponent.listCategoryByName(this.state.category).then(res1 => {
                this.setState({ categoryObj: res1.data });

                let newsObj = { headline: this.state.headline, reporter: this.state.userObj, location: this.state.location, category: this.state.categoryObj, newsDescription: this.state.newsDescription };
                NewsServiceComponent.addNews(newsObj).then(res => {
                    alert("news Added");
                    this.props.history.push('/newshome/' + this.state.userId);
                }).catch(error => {
                    alert(error.response.data.errors);
                })
            }).catch(error => {
                alert(error.response.data);
            })
        }).catch(error => {
            alert(error);
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
                <div className="row ">
                    <div className="col "></div>
                    <div className="col ">
                        <div className="card bg-light">
                            <form className="card-body">
                                <div className="card-title">
                                    <h3><i>Add News</i></h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Reporter Id:
                                    <input type="text" className="form-control" name="editorId" value={this.state.editorId} onChange={this.myChangeHandler} />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            Location :
                                    <input type="text" className="form-control" name="location" value={this.state.location} onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Category:
                                    <input type="text" className="form-control" name="category" value={this.state.category} onChange={this.myChangeHandler} />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            Headline:
                                    <input type="text" className="form-control" name="headline" value={this.state.headline} onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label w-75">
                                            News Description:
                                    <textarea type="text" className="form-control" name="newsDescription" value={this.state.newsDescription} onChange={this.myChangeHandler} />
                                        </label>&emsp;

                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button type="button" className="btn btn-success w-50" onClick={this.submit}>Submit</button>
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
                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default AddNews;