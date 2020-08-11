import React from "react";
import "../style/components/versioninfo.scss";

class VersionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildDate: "",
      version: "",
    };
  }

  componentDidMount() {
    fetch("http://airella.cyfrogen.com/api/info/")
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
