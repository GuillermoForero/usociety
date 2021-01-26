import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from "./SignIIn";
import SignUp from "./SingUp";
import SingUpPreferences from "./SingUp/SingUpPreferences";
import SingUpUserData from "./SingUp/SingUpUserData";
import Master from "./Master";
import GroupPrincipal from "./GroupPrincipal";
import Chat from "./Chat";
import Master2 from "./Master2";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact strict>
                        <SignIn />
                    </Route>
                    <Route path="/signup" exact strict>
                        <SingUpUserData />
                    </Route>
                    <Route path="/preferences" exact strict>
                        <SingUpPreferences />
                    </Route>
                    <Route path="/master" exact strict>
                        <Master />
                    </Route>
                    <Route path="/master2" exact strict>
                        <Master2 />
                    </Route>
                    <Route path="/groupPrincipal" exact strict>
                        <GroupPrincipal />
                    </Route>
                    <Route path="/chat" exact strict>
                        <Chat />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}