import React, { Component } from "react";
import styles from "../../style/pages/activation.module.scss";
import { getApiUrl } from "../../config/ApiURL";

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
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.success);
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
            }
            else if (data.errors[0].title === "UNKNOWN_USER_EMAIL") {
              this.setState({
                activationState: "UNKNOWN_USER_EMAIL_FAILURE",
              });
            }
            else if (data.errors[0].title === "WRONG_ACTIVATION_CODE") {
              this.setState({
                activationState: "WRONG_ACTIVATION_CODE_FAILURE",
              });
            }
            else {
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
    }  else if (this.state.activationState == "ALREADY_ACTIVATED_WARNING") {
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
    if (this.state.activationState == "IN_PROGRESS") {
      return "Activating account...";
    } else if (this.state.activationState == "SUCCESS") {
      return "Account activated";
    } else if (this.state.activationState == "ALREADY_ACTIVATED_WARNING") {
      return "Already activated";
    }  else if (this.state.activationState == "UNKNOWN_USER_EMAIL_FAILURE") {
      return "Email not found";
    }  else if (this.state.activationState == "WRONG_ACTIVATION_CODE_FAILURE") {
      return "Wrong activation code";
    } else if (this.state.activationState == "CONNECTION_FAILURE") {
      return "Connection error";
    } else if (this.state.activationState == "UNKNOWN_FAILURE") {
      return "Unknown failure";
    }
  };

  getDescription = () => {
    if (this.state.activationState == "IN_PROGRESS") {
      return "Please wait...";
    } else if (this.state.activationState == "SUCCESS") {
      return "You can now log in with your credentials.";
    } else if (this.state.activationState == "ALREADY_ACTIVATED_WARNING") {
      return "This account has already been activated.";
    }  else if (this.state.activationState == "UNKNOWN_USER_EMAIL_FAILURE") {
      return "User with this email does not exist.";
    }  else if (this.state.activationState == "WRONG_ACTIVATION_CODE_FAILURE") {
      return "Typed activation code is wrong for this user.";
    } else if (this.state.activationState == "CONNECTION_FAILURE") {
      return "Couldn't connect with server.";
    } else if (this.state.activationState == "UNKNOWN_FAILURE") {
      return "We don't have more details about this error :(";
    }
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
