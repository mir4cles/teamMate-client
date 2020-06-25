import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <MessageBox />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teams" component={Teams} />
        <Route path="/teams/:id" component={TeamDetails} />
        <Route exact path="/events" component={Events} />
        <Route path="/events/:id" component={EventDetails} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/login" component={Login} />
        <Route path="/profiles/:id" component={MyProfile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/support" component={Support} />
        <Route path="/" component={NotFound} />
        <Route path="/404" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
