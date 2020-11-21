import React, { useEffect, useState } from "react";
import firebase from 'firebase';
import { useHistory } from "react-router";
import { Route, Switch } from "react-router-dom";
import Page404 from "./components/Page404";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Authenticate from "./components/Modals/Authenticate";
import GlobalContext from "./context/GlobalContext";
import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";
import { geolocated } from "react-geolocated";
import "./App.css";
import { handleUserData } from "./firebase/Functions/User";

const App = (props: any) => {
  const [activeModal, setActiveModal] = useState<string>('');
  const [user, setUser] = useState<User | any>({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isSignedIn) {
      firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user))
    }
    if (props.coords) {
      const area = { longitude: props.coords.longitude, latitude: props.coords.latitude }
      sessionStorage.setItem("GEO", JSON.stringify(area));
    }
  }, [props, isSignedIn])

  useEffect(() => {
    if (!isSignedIn) return;
    handleSignIn();
    return () => {
      setUser({});
    }
  }, [isSignedIn,setUser])

  const handleSignIn = async () => {
    const currentUser = firebase.auth().currentUser?.providerData || []
    const userModel = {
      uid: currentUser[0]?.uid,
      displayName: currentUser[0]?.displayName,
      email: currentUser[0]?.email,
      photoURL: currentUser[0]?.photoURL,
      phoneNumber: currentUser[0]?.phoneNumber,
      dates: []
    }
    const user = await handleUserData(userModel);
    setUser(user);
  }

  const handleSignOut = () => {
    var r = window.confirm("Are you sure you want to sign out?");
    if (!r) return;
    firebase.auth().signOut();
    history.push('/')
  }


  return (
    <GlobalContext.Provider
      value={{
        user,
        isSignedIn,
        setActiveModal,
        setIsSignedIn,
        handleSignOut
      }}
    >
      <div>
        {activeModal === '' ? null : activeModal === 'Authenticate' && <Authenticate />}
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
