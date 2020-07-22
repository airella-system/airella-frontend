import React from 'react';

class Statistic extends React.Component {
	componentDidMount() {

	}
	
	render() {
        if (this.props.pollution) {
            return	<div style={{width: "200px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", marginBottom: "5px"}}>
            <div style={{width: "80%", height: "100%"}}>
                <div style={{float: "left", width: "35%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div style={{background: "#DDDDDD", borderRadius: "50%", width: "50px", height: "50px"}}></div>
                </div>
                <div style={{float: "left", width: "55%", height: "100%", marginLeft: "10%"}}>
                    <div style={{height: "60%", textAlign: "left"}} >
                        <span style={{fontWeight: "300", fontSize: "28px", textAlign: "left"}}>
                        {Math.round(this.props.value)}
                        </span>
                        <span style={{fontWeight: "300", fontSize: "10px", textAlign: "left", color: "#777"}}>
                        {this.props.unit}
                        </span>
                    </div>
                    <div style={{height: "40%", fontWeight: "500", fontSize: "20px", textAlign: "left"}} >
                        {this.props.name}
                    </div>
                </div>
                </div>
            </div>
        } else {
            return	<div style={{width: "200px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", marginBottom: "5px"}}>
        <div style={{width: "80%", height: "100%"}}>
            <div style={{float: "left", width: "35%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{background: "#DDDDDD", borderRadius: "50%", width: "50px", height: "50px"}}></div>
            </div>
            <div style={{float: "left", width: "55%", height: "100%", marginLeft: "10%"}}>
                <div style={{height: "60%", textAlign: "left"}} >
                    <span style={{fontWeight: "300", fontSize: "28px", textAlign: "left"}}>
                    {Math.round(this.props.value)}
                    </span>
                    <span style={{fontWeight: "300", fontSize: "14px", textAlign: "left"}}>
                    {this.props.unit}
                    </span>
                </div>
                <div style={{height: "40%", fontWeight: "500", fontSize: "14px", textAlign: "left"}} >
                    {this.props.name}
                </div>
            </div>
            </div>
        </div>
        }
	
		
	}
}

export default Statistic;