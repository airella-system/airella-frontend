import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../style/components/login.module.scss";
import Input from "./Input";
import Button from "./Button";
import Popup from "./Popup";
import { FaTimes } from "react-icons/fa";
import { setLoginDialogVisibility } from "../redux/actions";
import { login as loginFunction } from "../config/ApiCalls";

function LoginModal(props) {
  const [isFailed, setIsFailed] = useState(false)
  const [message, setMessage] = useState("")

  const login = useRef(null)
  const password = useRef(null)

  const close = () => {
    props.dispatch(setLoginDialogVisibility(false))
    setIsFailed(false)
    setMessage("")
  }

  const executeLogin = (email, password) => {
    loginFunction(email, password, props.dispatch)
    .then(_ => close())
    .catch(error => {
      setIsFailed(true)
      setMessage(error)
    })
  }

  const onInputKeyDown = (target) => {
    if (target.keyCode == 13) 
      executeLogin(login.current.value, password.current.value)
  }

  return (
    <Popup visibility={props.visibility} onOutsideClick={() => close()} >
      {
        props.visibility ? (
          <div className={`${styles.loginBox} ${isFailed ? styles.error : ""}`}>
            <div className={styles.close}>
            <Button onClick={() => close()}>
              <FaTimes size={22} rotate={45} />
            </Button>
            </div>
            <div className={styles.title}>Airella</div>
            <div className={styles.input}>
              <Input ref={login} type="email" placeholder="Login" onKeyDown={onInputKeyDown} autofocus={true}/>
            </div>
            <div className={styles.input}>
              <Input ref={password} type="password" placeholder="Password" onKeyDown={onInputKeyDown}/>
            </div>
            <div className={styles.button}>
              <Button onClick={() => executeLogin(login.current.value, password.current.value)}>Log in</Button>
            </div>
            <div className={`${styles.message} ${message ? styles.visibleMessage : ""}`}>
              {message}
            </div>
          </div>
        ) : (
          <div className={styles.loginBox}></div>
        )
      }
    </Popup>
  )
}

function mapStateToProps(state) {
  return {
    visibility: state.loginDialog.visibility,
  };
}

export default connect(mapStateToProps)(LoginModal);
