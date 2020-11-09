import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaCube, FaRegLifeRing, FaUser } from "react-icons/fa";
import Button from './Button';
import styles from '../style/components/menu.module.scss';
import '../style/additional/animationLib.scss';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isFirst: true,
    };
  }

  render() {
    let noneClass = this.state.isFirst ? "none " : "";

		return (
			<div className={`${styles.container} ${this.props.isHorizontal ? styles.horizontalContainer : ""}`}>
				<Link className={`${styles.link} ${styles.map}`} to="/">
					<Button isPushed={this.props.current == "map"}>
						<div className={styles.holder}>
							<div><FaMapMarkedAlt className={styles.icon} /></div>
							<div className={styles.textAligner}>Map</div>
						</div>
					</Button>
				</Link>
				<Link className={`${styles.link} ${styles.account}`} to="/account">
					<Button isPushed={this.props.current == "account"}>
						<div className={styles.holder}>
							<div><FaUser className={styles.icon} /></div>
							<div className={styles.textAligner}>Account</div>
						</div>
					</Button>
				</Link>
				<Link className={`${styles.link} ${styles.about}`} to="/subpage">
					<Button isPushed={this.props.current == "about"}>
						<div className={styles.holder}>
							<div><FaCube className={styles.icon} /></div>
							<div className={styles.textAligner}>About project</div>
						</div>
					</Button>
				</Link>
				<a className={`${styles.link} ${styles.docs}`} href="//airella.cyfrogen.com/api/docs">
					<Button isPushed={this.props.current == "docs"}>
						<div className={styles.holder}>
							<div><FaRegLifeRing className={styles.icon} /></div>
							<div className={styles.textAligner}>API Docs</div>
						</div>
					</Button>
				</a>
			</div>
		);
	}
}

export default Menu;
