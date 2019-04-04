import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUndoAlt,
  faTimes,
  faMountain,
  faRoute,
  faDrawPolygon,
  faExpand,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  removeLatestPoint,
  clearRoute,
  closeRoute,
  changeToClipPath,
  showElevation,
} from '../actions';
import styles from '../stylesheets/Controls.module.scss';

class Controls extends Component {
  render() {
    const {
      removeLatestPoint,
      clearRoute,
      geoJSONPoints,
      geoJSONLines,
      clipPath,
      changeToClipPath,
      showElevation,
      elevationData,
      elevation,
      fit,
      saveRoute,
      startPoint,
      endPoint,
      viewport,
      distance,
      matchParams,
    } = this.props;

    const routeData = {
      matchParams,
      elevationData,
      startPoint,
      endPoint,
      viewport,
      geoJSONLines,
      geoJSONPoints,
      distance,
    };

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
        <button
          disabled={!geoJSONPoints.features.length}
          className={styles.button}
          onClick={fit}
        >
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </button>
        <button
          disabled={!geoJSONLines.features.length}
          className={styles.button}
          onClick={() => saveRoute(routeData)}
        >
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faSave} />
          </div>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeLatestPoint: () => dispatch(removeLatestPoint()),
  clearRoute: () => dispatch(clearRoute()),
  closeRoute: () => dispatch(closeRoute()),
  changeToClipPath: status => dispatch(changeToClipPath(status)),
  showElevation: () => dispatch(showElevation()),
  saveRoute: routeData => dispatch({ type: 'SAVE_ROUTE', payload: routeData }),
});

const mapStateToProps = store => ({
  geoJSONPoints: store.map.geoJSONPoints,
  geoJSONLines: store.map.geoJSONLines,
  clipPath: store.map.clipPath,
  elevation: store.map.elevation,
  elevationData: store.map.elevationData,
  startPoint: store.map.startPoint,
  endPoint: store.map.endPoint,
  viewport: store.map.viewport,
  distance: store.map.distance,
});

Controls.propTypes = {
  geoJSONPoints: PropTypes.object,
  geoJSONLines: PropTypes.object,
  clipPath: PropTypes.bool,
  elevation: PropTypes.bool,
  removeLatestPoint: PropTypes.func,
  clearRoute: PropTypes.func,
  closeRoute: PropTypes.func,
  changeToClipPath: PropTypes.func,
  showElevation: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
