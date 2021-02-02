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
import HeaderGroupPrincipal from "../../views/GroupPrincipal/HeaderGroupPrincipal";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact strict>
                        <SignIn/>
                </Route>
                <Route path="/hola" exact strict>
                        <HeaderGroupPrincipal/>
                </Route>
                <Route path="/signup" exact strict>
                        <SingUpUserData/>
                </Route>
                <Route path="/preferences" exact strict>
                        <SingUpPreferences/>
                </Route>
                <Layout>
                    <Route path="/home" exact strict>
                        <GuardedRoute component={Home}/>
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
                    <Route path="/group/management" exact strict>
                        <GuardedRoute component={GroupAdmin}/>
                    </Route>
                </Layout>
            </Switch>

        </Router>
    );
}