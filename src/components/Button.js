import React from "react";
import "../style/additional/animationLib.scss";
import styles from "../style/components/button.module.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

	render() {
		let result = this.props.isPushed ? (
			<div className={styles.pushed} onClick={this.props.onClick}>
				{this.props.children}
			</div>
		) : (
			<div className={styles.standard} onClick={this.props.onClick}>
				<div className={styles.outerShadow}/>
				<div className={styles.innerShadow}/>
				<div className={styles.content}>
					{this.props.children}
				</div>
			</div>
		)

		return(
			result
		);
	}
}

export default Button;
