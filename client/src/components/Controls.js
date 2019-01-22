import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndoAlt,
  faTimes,
  faMountain,
  faRoute,
  faDrawPolygon
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  removeLatestPoint,
  clearRoute,
  closeRoute,
  changeToClipPath,
  showElevation
} from "../actions";
import styles from "../stylesheets/Controls.module.scss";

class Controls extends Component {
  render() {
    const {
      removeLatestPoint,
      clearRoute,
      geoJSONPoints,
      clipPath,
      changeToClipPath,
      showElevation,
      elevation
    } = this.props;

    return (
      <div className={styles.controls}>
        <button
          disabled={!geoJSONPoints.features.length}
          className={styles.button}
          onClick={clearRoute}
        >
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </button>
        <button
          disabled={!geoJSONPoints.features.length}
          className={styles.button}
          onClick={removeLatestPoint}
        >
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faUndoAlt} />
          </div>
        </button>
        {/* <button className={styles.button} onClick={closeRoute}>
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faDungeon} />
          </div>
        </button> */}
        <button className={styles.button} onClick={showElevation}>
          <div
            className={
              elevation ? styles.innerButtonActive : styles.innerButton
            }
          >
            <FontAwesomeIcon icon={faMountain} />
          </div>
        </button>
        <button
          className={styles.button}
          onClick={() => changeToClipPath(true)}
        >
          <div
            className={clipPath ? styles.innerButtonActive : styles.innerButton}
          >
            <FontAwesomeIcon icon={faRoute} />
          </div>
        </button>
        <button
          className={styles.button}
          onClick={() => changeToClipPath(false)}
        >
          <div
            className={
              !clipPath ? styles.innerButtonActive : styles.innerButton
            }
          >
            <FontAwesomeIcon icon={faDrawPolygon} />
          </div>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeLatestPoint: () => dispatch(removeLatestPoint()),
    clearRoute: () => dispatch(clearRoute()),
    closeRoute: () => dispatch(closeRoute()),
    changeToClipPath: status => dispatch(changeToClipPath(status)),
    showElevation: () => dispatch(showElevation())
  };
};

const mapStateToProps = store => {
  return {
    geoJSONPoints: store.map.geoJSONPoints,
    geoJSONLines: store.map.geoJSONLines,
    clipPath: store.map.clipPath,
    elevation: store.map.elevation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
