import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // The signed-in user info.
        var user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log(user);
        setUser("user : ", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(errorMessage, errorCode, credential, email);
      });
  };

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log("git user: ",user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, credential, email);
      });
  };

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In using Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using github</button>
      <h1>Name : {user.displayName}</h1>
      <h1>Email : {user.email}</h1>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
