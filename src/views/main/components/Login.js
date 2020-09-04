import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../../../style/main/components/Login.module.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FaRegTimesCircle } from "react-icons/fa";
import { setLoginDialogVisibility } from "../../../redux/actions";

function Login(props) {
  console.log("ess " + props.visibility)
  if (props.visibility) {
    return (
      <div className={styles.container}>
        <div className={styles.dialog}>
          <div className={styles.inside}> 
            <div className={styles.close}>
              <Button onClick={() => props.dispatch(setLoginDialogVisibility(false))}>
                <FaRegTimesCircle
                  className="closeIcon"
                  size={22}
                ></FaRegTimesCircle>
              </Button>
            </div>
            <div className={styles.title}>Airella</div>
            <div className={styles.input}>
              <Input placeholder="Login"></Input>
            </div>
            <div className={styles.input}>
              <Input type="password" placeholder="Password"></Input>
            </div>
            <div className={styles.button}>
              <Button>Log in</Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    visibility: state.loginDialog.visibility,
    mapPositionRequest: state.mapPositionRequest.position,
  };
}

export default connect(mapStateToProps)(Login);
