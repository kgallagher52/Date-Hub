import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Page404 from "./components/Page404";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SignUpModal from "./components/Modals/SignUp";
import LoginModal from "./components/Modals/LogIn";
import GlobalContext from "./context/GlobalContext";
// import PrivateRoute from "./components/PrivateRoute";
import { geolocated } from "react-geolocated";
import "./App.css";

const App = (props: any) => {
  const [activeModal, setActiveModal] = useState<string>('');
  const [user, setUser] = useState({});
  useEffect(() => {
    if (props.coords) {
      const area = { longitude: props.coords.longitude, latitude: props.coords.latitude }
      sessionStorage.setItem("GEO", JSON.stringify(area));
    }
  }, [props])
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        setActiveModal
      }}
    >
      <div>
        {activeModal === '' ? null : activeModal === 'signup' ? <SignUpModal /> : <LoginModal />}
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
};

export default geolocated({ positionOptions: { enableHighAccuracy: false, }, userDecisionTimeout: 5000, })(App);
