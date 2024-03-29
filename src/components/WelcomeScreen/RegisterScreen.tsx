import { useState } from "react"
import styles from "./WelcomeScreen.module.css"

interface props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setRegistering: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginScreen({ setLoggedIn, setRegistering }: props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  async function register() {
    if (email.length == 0 || password.length == 0) return
    if (password == confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
      return;
    }

    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const json = await response.json();
    // returning false means there was an SQL exception on the server, 
    // I think this could only happen if an email exists
    if (json == false) {
      setEmailExists(true);
      return;
    }

    const response2 = await fetch(import.meta.env.VITE_SERVER_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    console.log(response2);

    setLoggedIn(true);
  }

  return (
    <>
      <form className={styles.form}>
        <input
          className={styles.formInput}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        { emailExists && <div className={styles.warningMessage}>This email is already in use</div> }
        <input
          className={styles.formInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        { !passwordsMatch && <div className={styles.warningMessage}>Passwords do not match</div> }
        <div className={styles.button} onClick={register}>Register</div>
      </form>
      <div onClick={() => setRegistering(false)}>Have an account? Log In</div>
    </>
  )
}
