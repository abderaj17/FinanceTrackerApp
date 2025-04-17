import React, { useState } from "react";
import Input from "../components/input";
import Button from "../components/Button";
import "./styles.css";
import { auth } from "../firbase"; // Import the firebase configuration
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("Confirmpassword", confirmPassword);

    //Authenticate the user, or basically create a new account using email and pass
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("user>>>", user);
            toast.success("User Created Successfully");
            setLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and confirm Password don't match!");
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          type="password"
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button
          text={"Sighnup Using Email and Password"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: "0" }}>or</p>
        <Button text={"Signup Using Google"} blue={true} />
      </form>
    </div>
  );
};

export default SignupSigninComponent;
