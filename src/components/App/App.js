import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import SignIn from "../../views/SignIIn";
import SingUpPreferences from "../../views/SingUp/SingUpPreferences";
import SingUpUserData from "../../views/SingUp/SingUpUserData";
import GroupPrincipal from "../../views/GroupPrincipal";
import Layout from "../Layout";
import GroupAdmin from "../../views/GroupAdmin/GroupAdmin";
import CreateGroup from "../../views/CreateGroup/CreateGroup";
import GuardedRoute from "../GuardedRoute";
import Home from "../../views/Home";
import SearchGroup from "../../views/SearchGroup";
import CreatePost from "../../views/GroupPrincipal/CreatePost";
import FooterPage from "../../views/FooterPage/FooterPage";
import EditProfile from "../../views/EditProfile/EditProfile";

export default function App() {
    return (
        <Router>
        <FooterPage>
            <Switch>
                <Route path="/" component={SignIn} exact strict/>
                <Route path="/hola" component={CreatePost} exact strict/>
                <Route path="/signup" component={SingUpUserData} exact strict/>
                <Route path="/preferences" component={SingUpPreferences} exact strict/>

                <Layout>
                    <Route path="/home" exact strict>
                        <GuardedRoute component={Home}/>
                    </Route>
                    <Route path="/profile/:username" exact strict>
                        <GuardedRoute component={EditProfile}/>
                    </Route>
                    <Route path="/search" exact strict>
                        <GuardedRoute component={SearchGroup}/>
                    </Route>
                    <Route path="/group/:slug/view" exact strict>
                        <GuardedRoute component={GroupPrincipal}>
                        </GuardedRoute>
                    </Route>
                    <Route path="/group/create" exact strict>
                        <GuardedRoute component={CreateGroup}/>
                    </Route>
                    <Route path="/group/:slug/management" exact strict>
                        <GuardedRoute component={GroupAdmin}/>
                    </Route>
                </Layout>

            </Switch>
        </FooterPage>
        </Router>
    );
}