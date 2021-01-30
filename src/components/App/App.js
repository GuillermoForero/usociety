import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import SignIn from "../../views/SignIIn";
import SingUpPreferences from "../../views/SingUp/SingUpPreferences";
import SingUpUserData from "../../views/SingUp/SingUpUserData";
import Master from "../../views/Home";
import GroupPrincipal from "../../views/GroupPrincipal";
import Chat from "../Chat";
import Master2 from "../../views/SearchGroup";
import Layout from "../Layout";
import GroupAdmin from "../../views/GroupAdmin/GroupAdmin";
import CreateGroup from "../../views/CreateGroup/CreateGroup";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact strict>
                    <SignIn/>
                </Route>
                <Route path="/signup" exact strict>
                    <SingUpUserData/>
                </Route>
                <Route path="/preferences" exact strict>
                    <SingUpPreferences/>
                </Route>

                <Layout>
                    <Route path="/master" exact strict>
                        <Master/>
                    </Route>
                    <Route path="/master2" exact strict>
                        <Master2/>
                    </Route>
                    <Route path="/groupPrincipal" exact strict>
                        <GroupPrincipal/>
                    </Route>
                    <Route path="/chat" exact strict>
                        <Chat/>
                    </Route>
                    <Route path="/group/create" exact strict>
                        <CreateGroup/>
                    </Route>
                    <Route path="/group/management" exact strict>
                        <GroupAdmin/>
                    </Route>
                </Layout>
            </Switch>

        </Router>
    );
}