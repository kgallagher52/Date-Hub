// Import FirebaseAuth and firebase.
import React, { useContext, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import GlobalContext from '../../context/GlobalContext';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
};

const Auth = () => {
    const { setIsSignedIn } = useContext(GlobalContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user));
        return () => {
            firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user));
        }
    }, [setIsSignedIn])

    return (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
}

export default Auth