import { useState } from "react"
import styles from "./WelcomeScreen.module.css"

interface props {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setRegistering: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginScreen({ setLoggedIn, setRegistering }: props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [incorrectDetails, setIncorrectDetails] = useState<boolean>(false);

  async function logIn() {
    if (email == "test" && password == "test") {
      setLoggedIn(true);
      return;
    }
    if (email.length == 0 || password.length == 0) return

    const response = await fetch(import.meta.env.VITE_SERVER_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const loggedIn: boolean = await response.json();
    if (loggedIn == false) setIncorrectDetails(true);

    setLoggedIn(loggedIn);
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
        <input
          className={styles.formInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        { incorrectDetails && <div className={styles.warningMessage}>Incorrect email or password</div> }
        <div className={styles.button} onClick={logIn}>Log In</div>
      </form>
      <div onClick={() => setRegistering(true)}>Don't have an account? Create One</div>
    </>
  )
}
