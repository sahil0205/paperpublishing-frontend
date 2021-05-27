import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from '../homepage/FooterComponent';
import NewsServiceComponent from '../../service/news/NewsServiceComponent';
import PaperServiceComponent from '../../service/paper/PaperServiceComponent';

class CreatePaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            newsList: [],
            editorId:'',
            price:'',
            publishDate:'',
            newsData:[],
            userObj:[]
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
        this.addNews = this.addNews.bind(this);
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
            editorId:'',
            price:'',
            publishDate:'',
            newsData:[],
        })
    }

    submit = (event) => {
        event.preventDefault();
        UsersServiceComponent.listUserById(this.state.editorId).then(res=>{
            this.setState({userObj: res.data});
            console.log(res.data);
            let paperObj={editor: this.state.userObj, price: this.state.price, publishDate: this.state.publishDate, newsList: this.state.newsData}
        PaperServiceComponent.addPaper(paperObj).then(res1=>{
            console.log(res1.data);
            alert("New Paper Created");
            this.props.history.push('/paperhome/' + this.state.userId);
        })
        })
        
    }

    addNews(newsId){
        NewsServiceComponent.listNewsById(newsId).then(res=>{
            this.setState({newsData: [...this.state.newsData, res.data]});
            console.log(this.state.newsData);
            alert("News added to the paper");
        })
    }

    componentDidMount() {
        NewsServiceComponent.listAllNews().then(res => {
            this.setState({
                newsList: res.data
            })
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
                <div className="row">
                    <div className="col"></div>
                    <div className="col w-50">
                        <div className="card bg-light">
                            <form className="card-body">
                                <div className="card-title">
                                    <h3><i>Create Paper</i></h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Editor Id:
                                    <input type="text" className="form-control" name="editorId" onChange={this.myChangeHandler} />
                                        </label>&emsp;
                                        <label className="form-label w-48">
                                            Date :
                                    <input type="date" className="form-control" name="publishDate" onChange={this.myChangeHandler} />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label w-48">
                                            Price:
                                    <input type="text" className="form-control" name="price" onChange={this.myChangeHandler} />
                                    Before submitting please select news from the table below.
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
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className=" col news-paper-table">
                        <h3>News List</h3>
                        <table className="table table-striped table-hover table-bordered user-table text-center table-responsive">
                            <thead className="table-dark">
                                <th><h6>Reporter</h6></th>
                                <th><h6>Headline</h6></th>
                                <th><h6>Location</h6></th>
                                <th><h6>Description</h6></th>
                                <th><h6>Action</h6></th>
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
                                                <td ><button className=" btn" data-toggle="tooltip" data-placement="left" title="Add News" onClick={() => this.addNews(news.newsId)}><GrAddCircle size={30}></GrAddCircle></button></td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
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

export default CreatePaper;