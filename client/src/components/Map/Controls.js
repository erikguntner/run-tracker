import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  faUndoAlt,
  faTimes,
  faMountain,
  faRoute,
  faDrawPolygon,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
  removeLatestPoint,
  clearRoute,
  closeRoute,
  changeToClipPath,
  showElevation,
} from '../../actions';

import Modal from '../Utilities/Modal';
import SaveRoute from '../Forms/SaveRoute';
import ControlButton from './ControlButton';

import styles from '../../stylesheets/Controls.module.scss';

class Controls extends Component {
  state = {
    open: false,
  };

  toggleModal = () =>
    this.setState(prevState => ({
      open: !prevState.open,
    }));

  checkForDisabled = (e, callback, data = undefined) => {
    if (e.target.attributes.disabled || e.target.parentNode.attributes.disabled)
      return;

    callback(data);
    return;
  };

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
        <ControlButton
          disabled={!geoJSONPoints.features.length}
          click={e => this.checkForDisabled(e, clearRoute)}
          icon={faTimes}
          tooltip={'Clear Route'}
        />
        <ControlButton
          disabled={!geoJSONPoints.features.length}
          click={e => this.checkForDisabled(e, removeLatestPoint)}
          icon={faUndoAlt}
          tooltip={'Undo Last'}
        />
        <ControlButton
          click={showElevation}
          icon={faMountain}
          activeState={elevation}
          tooltip={'elevation'}
        />
        <ControlButton
          click={() => changeToClipPath(true)}
          icon={faRoute}
          activeState={clipPath}
          tooltip={'clip path'}
        />
        <ControlButton
          click={() => changeToClipPath(false)}
          icon={faDrawPolygon}
          activeState={!clipPath}
          tooltip={'linear'}
        />
        <ControlButton
          disabled={!geoJSONLines.features.length}
          click={e => this.checkForDisabled(e, this.toggleModal)}
          icon={faSave}
          tooltip={'save route'}
        />
        <Modal open={this.state.open} toggle={this.toggleModal}>
          <SaveRoute
            toggleModal={this.toggleModal}
            saveRoute={saveRoute}
            routeData={routeData}
          />
        </Modal>
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
  saveRoute: (routeData, setSubmitting, toggleModal) =>
    dispatch({
      type: 'SAVE_ROUTE',
      payload: { routeData, setSubmitting, toggleModal },
    }),
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
