import React from "react";
import "../style/components/versioninfo.scss";
import { fetchWithAuthorization } from "../config/ApiCalls"

class VersionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildDate: "",
      version: "",
    };
  }

  componentDidMount() {
    fetchWithAuthorization(process.env.REACT_APP_AIRELLA_DOMAIN + "/api/info/")
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          buildDate: json.data.buildDate,
          version: json.data.version,
        })
      );
  }

  render() {
    return (
      <div className="infoContainer">
        {this.state.buildDate || "loading build date..."}
        <br />
        {this.state.version || "loading version..."}
      </div>
    );
  }
}

export default VersionInfo;
