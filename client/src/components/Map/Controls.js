import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUndoAlt,
  faTimes,
  faMountain,
  faRoute,
  faDrawPolygon,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
  removeLatestPoint,
  clearRoute,
  closeRoute,
  changeToClipPath,
  showElevation,
} from '../../actions';
import styles from '../../stylesheets/Controls.module.scss';

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
        >
          <div className={styles.innerButton} onClick={clearRoute}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className={styles.tooltip}>Clear Route</div>
        </button>
        <button
          disabled={!geoJSONPoints.features.length}
          className={styles.button}
        >
          <div className={styles.innerButton} onClick={removeLatestPoint}>
            <FontAwesomeIcon icon={faUndoAlt} />
          </div>
          <div className={styles.tooltip}>undo last</div>
        </button>
        <button className={styles.button}>
          <div
            className={
              elevation ? styles.innerButtonActive : styles.innerButton
            }
            onClick={showElevation}
          >
            <FontAwesomeIcon icon={faMountain} />
          </div>
          <div className={styles.tooltip}>elevation</div>
        </button>
        <button className={styles.button}>
          <div
            className={clipPath ? styles.innerButtonActive : styles.innerButton}
            onClick={() => changeToClipPath(true)}
          >
            <FontAwesomeIcon icon={faRoute} />
          </div>
          <div className={styles.tooltip}>clip path</div>
        </button>
        <button className={styles.button}>
          <div
            className={
              !clipPath ? styles.innerButtonActive : styles.innerButton
            }
            onClick={() => changeToClipPath(false)}
          >
            <FontAwesomeIcon icon={faDrawPolygon} />
          </div>
          <div className={styles.tooltip}>linear</div>
        </button>
        {/* <button
          disabled={!geoJSONPoints.features.length}
          className={styles.button}
          onClick={fit}
        >
          <div className={styles.innerButton}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </button> */}
        <button
          disabled={!geoJSONLines.features.length}
          className={styles.button}
        >
          <div
            className={styles.innerButton}
            onClick={() => saveRoute(routeData)}
          >
            <FontAwesomeIcon icon={faSave} />
          </div>
          <div className={styles.tooltip}>save route</div>
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
