import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import Page404 from "./components/Page404";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SignUpModal from "./components/Modals/SignUp";
import LoginModal from "./components/Modals/LogIn";
import GlobalContext from "./context/GlobalContext";
import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
import { geolocated } from "react-geolocated";
import "./App.css";
import { User } from "./components/PrivateRoute/PrivateRoute";

const App = (props: any) => {
  const [activeModal, setActiveModal] = useState<string>('');
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleUser = useCallback((user: User) => {
    const localUser = sessionStorage.getItem('user');
    if (localUser === null) {
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      setUser(JSON.parse(localUser));
    }
  }, [])

  useEffect(() => {
    if (props.coords) {
      const area = { longitude: props.coords.longitude, latitude: props.coords.latitude }
      sessionStorage.setItem("GEO", JSON.stringify(area));
    }
    const localUser = sessionStorage.getItem('user');
    if (localUser !== null) {
      handleUser(JSON.parse(localUser))
    }

  }, [props, handleUser])

  const handleSignOut = () => {
    sessionStorage.removeItem('user');
    setUser({});
    history.push('/');
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        handleUser,
        setActiveModal,
        handleSignOut
      }}
    >
      <div>
        {activeModal === '' ? null : activeModal === 'signup' ? <SignUpModal /> : <LoginModal />}
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
};

export default geolocated({
  positionOptions:
    { enableHighAccuracy: false, },
  userDecisionTimeout: 5000,
})(App);
