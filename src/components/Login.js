import React, { useContext } from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
  const { signInWithGoogle, signInWithFacebook } = useContext(AuthContext);

  // SignIn With Google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        // console.log(result);
        toast.success("Login Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // SignIn With Facebook
  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then(() => {
        // console.log(result);
        toast.success("Login Success");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Text Me</h2>

        <div className="login-button google" onClick={handleGoogleSignIn}>
          <GoogleOutlined /> Sign In with Google
        </div>
        <br />
        <br />
        <div className="login-button facebook" onClick={handleFacebookSignIn}>
          <FacebookOutlined /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
