import React from "react";
import "../style/additional/animationLib.scss";
import styles from "../style/components/button.module.scss";

class Button extends React.Component {
  constructor(props) {
		super(props);
  }

	render() {
		let {isPushed, isCircle, isFilling, children} = this.props
		let generalStyles = `${isCircle ? styles.circle : ""} ${isFilling ? styles.filling : ""}`
		
		let result = isPushed ? (
			<div className={`${styles.pushed} ${generalStyles}`} onClick={this.props.onClick}>
				{this.props.children}
			</div>
		) : (
			<div className={`${styles.standard} ${generalStyles}`} onClick={this.props.onClick}>
				<div className={styles.outerShadow}/>
				<div className={styles.innerShadow}/>
				<div className={styles.content}>
					{children}
				</div>
			</div>
		)

		return(
			result
		);
	}
}

export default Button;
