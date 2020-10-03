import React, { Component } from "react";
import styles from "../../style/pages/activation.module.scss";
import { getApiUrl } from "../../config/ApiURL";
import { fetchWithAuthorization } from "../../config/ApiCalls"

import { IconContext } from "react-icons";
import {
  AiOutlineLoading,
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

class ActivationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activationState: "IN_PROGRESS",
    };
  }

  componentDidMount() {
    let url = getApiUrl("activateAccount", null, {
      email: this.props.match.params.email,
      activationCode: this.props.match.params.activationCode,
    });
    fetchWithAuthorization(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            activationState: "SUCCESS",
          });
        } else {
          if (data.errors && data.errors.length > 0) {
            if (data.errors[0].title === "ALREADY_ACTIVATED") {
              this.setState({
                activationState: "ALREADY_ACTIVATED_WARNING",
              });
            } else if (data.errors[0].title === "UNKNOWN_USER_EMAIL") {
              this.setState({
                activationState: "UNKNOWN_USER_EMAIL_FAILURE",
              });
            } else if (data.errors[0].title === "WRONG_ACTIVATION_CODE") {
              this.setState({
                activationState: "WRONG_ACTIVATION_CODE_FAILURE",
              });
            } else {
              this.setState({
                activationState: "UNKNOWN_FAILURE",
              });
            }
          } else {
            this.setState({
              activationState: "UNKNOWN_FAILURE",
            });
          }
        }
      })
      .catch((e) =>
        this.setState({
          activationState: "CONNECTION_FAILURE",
        })
      );
  }

  getIcon = () => {
    if (this.state.activationState == "IN_PROGRESS") {
      return (
        <IconContext.Provider
          value={{ className: styles.icon + " " + styles.iconLoading }}
        >
          <AiOutlineLoading />
        </IconContext.Provider>
      );
    } else if (this.state.activationState == "SUCCESS") {
      return (
        <IconContext.Provider
          value={{ className: styles.icon + " " + styles.iconSuccess }}
        >
          <AiOutlineCheckCircle />
        </IconContext.Provider>
      );
    } else if (this.state.activationState == "ALREADY_ACTIVATED_WARNING") {
      return (
        <IconContext.Provider
          value={{ className: styles.icon + " " + styles.iconWarning }}
        >
          <AiOutlineCheckCircle />
        </IconContext.Provider>
      );
    } else if (
      this.state.activationState == "UNKNOWN_USER_EMAIL_FAILURE" ||
      this.state.activationState == "WRONG_ACTIVATION_CODE_FAILURE" ||
      this.state.activationState == "CONNECTION_FAILURE" ||
      this.state.activationState == "UNKNOWN_FAILURE"
    ) {
      return (
        <IconContext.Provider
          value={{ className: styles.icon + " " + styles.iconFailure }}
        >
          <AiOutlineExclamationCircle />
        </IconContext.Provider>
      );
    }
  };

  getTitle = () => {
    const message = {
      IN_PROGRESS: "Activating account...",
      SUCCESS: "Account activated",
      ALREADY_ACTIVATED_WARNING: "Already activated",
      UNKNOWN_USER_EMAIL_FAILURE: "Email not found",
      WRONG_ACTIVATION_CODE_FAILURE: "Wrong activation code",
      CONNECTION_FAILURE: "Connection error",
      UNKNOWN_FAILURE: "Unknown failure",
    };
    return message[this.state.activationState];
  };

  getDescription = () => {
    const message = {
      IN_PROGRESS: "Please wait...",
      SUCCESS: "You can now log in with your credentials.",
      ALREADY_ACTIVATED_WARNING: "This account has already been activated.",
      UNKNOWN_USER_EMAIL_FAILURE: "User with this email does not exist.",
      WRONG_ACTIVATION_CODE_FAILURE: "Activation code is wrong for this user.",
      CONNECTION_FAILURE: "Couldn't connect with server.",
      UNKNOWN_FAILURE: "We don't have more details about this error :(",
    };
    return message[this.state.activationState];
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.iconContainer}>{this.getIcon()}</div>
            <div className={styles.title}>{this.getTitle()}</div>
            <div className={styles.description}>{this.getDescription()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivationView;
