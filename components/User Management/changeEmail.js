import Image from "next/image";
import styles from "../../styles/components/User Management/changeEmail.module.css";
import { useState, useEffect, useContext } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import { auth } from "../../pages/api/API";
import { Context } from "../../context";
import { signInWithEmailAndPassword, updateEmail } from "firebase/auth";

export default function ChangeEmail(props) {
  const { state } = useContext(Context);
  const [mode, setMode] = useState("change");
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmail2, setNewEmail2] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    if (newEmail === newEmail2) {
      signInWithEmailAndPassword(auth, currentEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateEmail(user, newEmail)
            .then(() => {
              console.log("Email Changed");
              setMode("succes");
              setTimeout(() => {
                setMode("change");
              }, 2000);
            })
            .catch(() => {
              setMode("used email");
              setTimeout(() => {
                setMode("change");
              }, 2000);
            });
        })
        .catch((error) => {
          console.log("Failed");
          setMode("fail");
          setTimeout(() => {
            setMode("change");
          }, 2000);
        });
    } else {
      alert("New email doesn't match");
    }
  };

  const handleCancel = () => {};

  return (
    <div className={styles.outer}>
      {mode === "succes" && (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: "green" }}>
            Email Changed
          </h1>
        </div>
      )}
      {mode === "used email" && (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: "red" }}>
            Email Already in Use
          </h1>
        </div>
      )}
      {mode === "fail" && (
        <div className={styles.centered}>
          <h1 className={styles.centered__text} style={{ color: "red" }}>
            Invalid details Entered
          </h1>
        </div>
      )}
      {mode === "change" && (
        <div className={styles.container}>
          <div className={styles.top__bar}>User Management - Change email</div>
          <main className={styles.main}>
            <div className={styles.form}>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Current Email</label>
                <input
                  className={styles.input__field}
                  type="email"
                  onChange={(e) => setCurrentEmail(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>New Email</label>
                <input
                  className={styles.input__field}
                  type="text"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Retype New Email</label>
                <input
                  className={styles.input__field}
                  type="text"
                  onChange={(e) => setNewEmail2(e.target.value)}
                />
              </div>
              <div className={styles.input__box}>
                <label className={styles.input__label}>Password</label>
                <input
                  className={styles.input__field}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderBottom: "2px solid black" }}
                />
              </div>
              <div className={styles.action__buttons}>
                <button className={styles.action__button} onClick={handleSave}>
                  Change
                </button>
                <button
                  className={styles.action__button}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </main>
          <div className={styles.bottom__bar}></div>
        </div>
      )}
    </div>
  );
}
