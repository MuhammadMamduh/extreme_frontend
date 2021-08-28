import {Router, Route, Switch} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import ImageList from './ImageList';
import AdminUsers from './AdminUsers';
import AdminArt from './AdminArt';
import AddArt from './AddArt';
import ProtectedRoute from './ProtectedRoute';
import history from '../history';
import {connect} from 'react-redux';

const App = ({auth})=>{

    return  (
                <div className="ui container" >
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route path="/" exact component={Login}/>
                                <Route path="/login" exact component={Login}/>
                                <Route path="/signup" exact component={SignUp}/>

                                <ProtectedRoute path="/Gallery" exact component={ImageList} token={sessionStorage.getItem('token') || auth.token} role={sessionStorage.getItem('role') || auth.role} type={["ADMIN", "GUEST"]}/>

                                <ProtectedRoute path="/admin/users" exact component={AdminUsers} token={sessionStorage.getItem('token') || auth.token} role={sessionStorage.getItem('role') || auth.role} type={["ADMIN"]}/>
                                <ProtectedRoute path="/admin/art" exact component={AdminArt} token={sessionStorage.getItem('token') || auth.token} role={sessionStorage.getItem('role') || auth.role} type={["ADMIN"]}/>
                                <ProtectedRoute path="/admin/addArt" exact component={AddArt} token={sessionStorage.getItem('token') || auth.token} role={sessionStorage.getItem('role') || auth.role} type={["ADMIN"]}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            )
};

const mapStateToProps = (state) =>{
    return {auth:state.auth}
}
export default connect(mapStateToProps, {})(App);