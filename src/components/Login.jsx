import styles from "./Login.module.css";
import axios from "axios";

import { useRef } from "react";

const Login = () => {
  const emailRef = useRef();

  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (email === "") {
      alert("Please enter a valid email");
      return;
    } else if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      alert("Password must contain at least one digit.");
      return;
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    const objData = await axios.post("http://127.0.0.1:5000/user_login", {
      email: email,
      password: password,
    });
    console.log(objData);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          ref={emailRef}
          type="text"
          placeholder="Email or Phone"
          id="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          id="password"
          required
        />

        <button type="submit" className={styles.custombutton}>
          Log In
        </button>

        <button type="button" className={styles.socialButton}>
          <span style={{ fontSize: "14px" }}>Sign-up</span>
        </button>
      </form>
    </>
  );
};

export default Login;
