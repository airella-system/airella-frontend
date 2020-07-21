import React from 'react';

class Statistic extends React.Component {
	componentDidMount() {

	}
	
	render() {
	return	<div style={{width: "200px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", marginBottom: "5px"}}>
        <div style={{width: "80%", height: "100%"}}>
            <div style={{float: "left", width: "35%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{background: "#DDDDDD", borderRadius: "50%", width: "50px", height: "50px"}}></div>
            </div>
            <div style={{float: "left", width: "65%", height: "100%"}}>
                <div style={{height: "60%", textAlign: "center"}} >
                    <span style={{fontWeight: "300", fontSize: "28px", textAlign: "center"}}>
                    {Math.round(this.props.value)}
                    </span>
                    <span style={{fontWeight: "300", fontSize: "20px", textAlign: "center"}}>
                    {this.props.unit}
                    </span>
                </div>
                <div style={{height: "40%", fontWeight: "600", fontSize: "14px", textAlign: "center"}} >
                    {this.props.name}
                </div>
            </div>
            </div>
        </div>
		
	}
}

export default Statistic;