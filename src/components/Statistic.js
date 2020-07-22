import React from 'react';
import styles from '../style/components/statistic.module.scss';

class Statistic extends React.Component {
	componentDidMount() {

	}
	
	render() {
        if (this.props.pollution) {
            return	<div className={styles.root}>
            <div className={styles.root2}>
                <div className={styles.leftIconContainer}>
                    <div className={styles.leftIcon}></div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.valueContainer}>
                        <span className={styles.valuePollution}>
                        {Math.round(this.props.value)}
                        </span>
                        <span className={styles.unitPollution}>
                        {this.props.unit}
                        </span>
                    </div>
                    <div className={styles.namePollution}>
                        {this.props.name}
                    </div>
                </div>
                </div>
            </div>
        } else {
            return	<div className={styles.root}>
            <div className={styles.root2}>
                <div className={styles.leftIconContainer}>
                    <div className={styles.leftIcon}></div>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.valueContainer}>
                        <span className={styles.value}>
                        {Math.round(this.props.value)}
                        </span>
                        <span className={styles.unit}>
                        {this.props.unit}
                        </span>
                    </div>
                    <div className={styles.name}>
                        {this.props.name}
                    </div>
                </div>
                </div>
            </div>
        }
	
		
	}
}

export default Statistic;