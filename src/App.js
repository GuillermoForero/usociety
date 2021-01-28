import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import SignIn from "./components/SignIIn";
import SingUpPreferences from "./components/SingUp/SingUpPreferences";
import SingUpUserData from "./components/SingUp/SingUpUserData";
import Master from "./components/Master";
import GroupPrincipal from "./components/GroupPrincipal";
import Chat from "./components/Chat";
import Master2 from "./components/Master2";
import Layout from "./components/Layout";

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
                </Layout>
            </Switch>

        </Router>
    );
}