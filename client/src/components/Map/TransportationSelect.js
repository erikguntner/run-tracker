import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faBicycle,
  faWalking,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { updateTransportation } from '../../actions/index';

import styles from '../../stylesheets/TransportationSelect.module.scss';

class TransportationSelect extends Component {
  render() {
    const { updateTransportation, transportationType } = this.props;

    const transportationIcon = {
      foot: faWalking,
      car: faCar,
      bike: faBicycle,
    };

    return (
      <div className={styles.dropdown}>
        <div className={styles.dropdownSelect}>
          <div className={styles.dropdownIcon}>
            <FontAwesomeIcon icon={transportationIcon[transportationType]} />
          </div>
          <div className={styles.dropdownArrow}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        <ul>
          <li onClick={() => updateTransportation('foot')}>
            <FontAwesomeIcon icon={faWalking} />
          </li>
          <li onClick={() => updateTransportation('bike')}>
            <FontAwesomeIcon icon={faBicycle} />
          </li>
          <li onClick={() => updateTransportation('car')}>
            <FontAwesomeIcon icon={faCar} />
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTransportation: transportation =>
    dispatch(updateTransportation(transportation)),
});

const mapStateToProps = store => ({
  transportationType: store.map.transportationType,
});

TransportationSelect.propTypes = {
  updateTransportation: PropTypes.func,
  transportationType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransportationSelect);
