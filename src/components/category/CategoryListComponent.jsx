import React, { Component } from 'react';
import { MdHome } from 'react-icons/md';
import { BsNewspaper } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import CategoryServiceComponent from '../../service/category/CategoryServiceComponent';
import UsersServiceComponent from '../../service/users/UsersServiceComponent';
import FooterComponent from '../homepage/FooterComponent';
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai"

class CategoryListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            categoryList: [],
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
        CategoryServiceComponent.listAllCategories().then(res => {
            this.setState({ categoryList: res.data });
        }).catch(error => {
            alert(error.response.data);
        });
    }

    delete(categoryId) {
        CategoryServiceComponent.deleteCategory(categoryId).then(res => {
            this.setState({
                categoryList: this.state.categoryList.filter(categoryList => categoryList.categoryId !== categoryId)
            })
        }).catch(error => {
            alert(error.response.data);
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
                <div className="row cat-table ">
                    <h3>Category Lists</h3>
                    <table className="table user-table text-center table-striped table-hover table-bordered ">
                        <thead className="table-dark">
                            <th><h6>Category Id</h6></th>
                            <th><h6>Category Name</h6></th>
                            <th><h6>Action</h6></th>
                        </thead>
                        <tbody className="table-danger">
                            {this.state.categoryList.map(
                                cat =>
                                    <tr key={cat.categoryId}>
                                        <td>{cat.categoryId}</td>
                                        <td>{cat.categoryName}</td>
                                        <td><button className=" btn" data-toggle="tooltip" data-placement="left" title="Delete Category" onClick={() => this.delete(cat.categoryId)}><TiDelete size={30}></TiDelete></button></td>
                                    </tr>
                            )}
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

export default CategoryListComponent;