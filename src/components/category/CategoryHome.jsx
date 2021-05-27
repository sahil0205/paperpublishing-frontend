import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from '../homepage/FooterComponent';



class CategoryHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
        }
        this.goHome = this.goHome.bind(this);
        this.logout = this.logout.bind(this);
        this.newsmodule = this.newsmodule.bind(this);
        this.papermodule = this.papermodule.bind(this);
        this.categorymodule = this.categorymodule.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.viewCategory = this.viewCategory.bind(this);
        this.viewById = this.viewById.bind(this);
        this.viewByName = this.viewByName.bind(this);
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

    usermodule(userId){
        this.props.history.push('/onlogin/' + userId);
    }

    addCategory(userId) {
        this.props.history.push('/addcategory/' + userId);
    }

    viewCategory(userId) {
        this.props.history.push('/categorylist/' + userId);
    }

    viewById(userId) {
        this.props.history.push('/viewcategorybyid/'+userId);
    }

    viewByName(userId) {
        this.props.history.push('/viewcategorybyname/'+userId);
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
                <div className="cat-home-btn">
                    <div className="row text-center">

                        <div className="col">
                            <button className="btn w-50 h-25 btn-primary btn-cat btn-lg" onClick={() => this.addCategory(this.state.userId)}>Add Category</button><br />
                            <button className="btn w-50 h-25 btn-primary cat-btn btn-lg" onClick={() => this.viewCategory(this.state.userId)}>View Category List</button>
                        </div>
                        <div className="col">
                            <button className="btn w-50 h-25 btn-primary btn-cat btn-lg" onClick={() => this.viewById(this.state.userId)}>View Category by Id</button><br />
                            <button className="btn w-50 h-25 btn-primary cat-btn btn-lg " onClick={() => this.viewByName(this.state.userId)}>View Category By Name</button>
                        </div>

                    </div>
                </div>

                <div className="footer-container">
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default CategoryHome;