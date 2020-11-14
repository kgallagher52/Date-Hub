import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Page404 from "./components/Page404";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SignUpModal from "./components/Modals/SignUp"
import { geolocated } from "react-geolocated";
import "./App.css";

const App = (props: any) => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(false);



  useEffect(() => {
    if (props.coords) {
      const area = { longitude: props.coords.longitude, latitude: props.coords.latitude }
      sessionStorage.setItem("GEO", JSON.stringify(area));
    }
  }, [props])

  const toggleModal = (key: string) => {
    switch (key) {
      case 'signup':
        setSignUpModal(!signUpModal);
        break;
      case 'login':
        setLogInModal(!logInModal);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {signUpModal && <SignUpModal toggleModal={toggleModal} />}
      <Navigation toggleModal={toggleModal} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route component={Page404} />
      </Switch>
      <Footer />
    </div>
  );
};

export default geolocated({ positionOptions: { enableHighAccuracy: false, }, userDecisionTimeout: 5000, })(App);
