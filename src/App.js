import logo from './logo.svg';
import './App.css';
import CategoryListComponent from './components/category/CategoryListComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import Login from './components/users/Login';
import AfterLogin from './components/homepage/AfterLogin';
import ViewReporter from './components/users/ViewReporter';
import ViewEditor from './components/users/ViewEditor';
import UpdateUser from './components/users/UpdateUser';
import CategoryHome from './components/category/CategoryHome';
import AddCategory from './components/category/AddCategory';
import ViewCategoryByName from './components/category/ViewCategoryByName';
import ViewCategoryById from './components/category/ViewCategoryById';
import NewsHome from './components/news/NewsHome';
import NewsList from './components/news/NewsList';
import AddNews from './components/news/AddNews';
import ViewNewsById from './components/news/ViewNewsById';
import ViewNewsByLocation from './components/news/ViewNewsByLocation';
import UpdateNews from './components/news/UpdateNews';
import PaperHome from './components/paper/PaperHome';
import ViewPaperList from './components/paper/ViewPaperList';
import ViewPaperById from './components/paper/ViewPaperById';
import ViewPaperByEditor from './components/paper/ViewPaperByEditor';
import ViewPaper from './components/paper/ViewPaper';
import CreatePaper from './components/paper/CreatePaper';
import UpdatePaper from './components/paper/UpdatePaper';

function App() {
  return (
    <div >
      <Router>
          <Switch>
            <Route path="/categorylist/:userId" component={CategoryListComponent}></Route>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/userlogin" component={Login}></Route>
            <Route path="/onlogin/:userId" component={AfterLogin}></Route>
            <Route path="/viewreporter/:userId" component={ViewReporter}></Route>
            <Route path="/vieweditor/:userId" component={ViewEditor}></Route>
            <Route path="/updateuser/:userId" component={UpdateUser}></Route>
            <Route path="/categoryhome/:userId" component={CategoryHome}></Route>
            <Route path="/addcategory/:userId" component={AddCategory}></Route>
            <Route path="/viewcategorybyname/:userId" component={ViewCategoryByName}></Route>
            <Route path="/viewcategorybyid/:userId" component={ViewCategoryById}></Route>
            <Route path="/newshome/:userId" component={NewsHome}></Route>
            <Route path="/newslist/:userId" component={NewsList}></Route>
            <Route path="/addnews/:userId" component={AddNews}></Route>
            <Route path="/viewnewsbyid/:userId" component={ViewNewsById}></Route>
            <Route path="/viewnewsbylocation/:userId" component={ViewNewsByLocation}></Route>
            <Route path="/updatenews/:userId/:newsId/:categoryId/:reporterId" component={UpdateNews}></Route>
            <Route path="/paperhome/:userId" component={PaperHome}></Route>
            <Route path="/viewpaperlist/:userId" component={ViewPaperList}></Route>
            <Route path="/viewpaperbyid/:userId" component={ViewPaperById}></Route>
            <Route path="/viewpaperbyeditor/:userId" component={ViewPaperByEditor}></Route>
            <Route path="/viewpaper/:userId/:paperId" component={ViewPaper}></Route>
            <Route path="/createpaper/:userId" component={CreatePaper}></Route>
            <Route path="/updatepaper/:userId/:paperId" component={UpdatePaper}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
