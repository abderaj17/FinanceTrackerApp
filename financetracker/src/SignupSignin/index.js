import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/input";
import Button from "../components/Button";
import "./styles.css";
import { doc, setDoc, provider } from "../firbase";
import { getDoc } from "firebase/firestore";
import { auth, db } from "../firbase"; // Import the firebase configuration
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setEmailLoading(true);

    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User Created Successfully");
            createDoc(user);
            resetFields();
            navigate("/dashboard");
            setEmailLoading(false);
          })
          .catch((error) => {
            toast.error(error.message);
            setEmailLoading(false);
          });
      } else {
        toast.error("Passwords do not match!");
        setEmailLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setEmailLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date().toISOString(),
        });
        toast.success("User Document Created");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("User document already exists!");
    }
  }

  function loginUsingEmail() {
    setEmailLoading(true);

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Logged in Successfully!");
          navigate("/dashboard");
          setEmailLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
          setEmailLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setEmailLoading(false);
    }
  }

  function googleAuth() {
    setGoogleLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        createDoc(user);
        navigate("/dashboard");
        toast.success("Google Authentication Successful!");
        setGoogleLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setGoogleLoading(false);
      });
  }

  function resetFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login to <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} />
            <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
            <Button
              disabled={emailLoading}
              text={emailLoading ? <div className="button-loading">Loading</div> : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">or</p>
            <Button
              disabled={googleLoading}
              onClick={googleAuth}
              text={googleLoading ? <div className="button-loading">Loading</div> : "Login Using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(false)}>
              Don't have an account? Sign Up
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>
          <form>
            <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} />
            <Input label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} />
            <Input type="password" label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
            <Input type="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
            <Button
              disabled={emailLoading}
              text={emailLoading ? <div className="button-loading">Loading</div> : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">or</p>
            <Button
              disabled={googleLoading}
              onClick={googleAuth}
              text={googleLoading ? <div className="button-loading">Loading</div> : "Signup Using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(true)}>
              Already have an account? Login
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;