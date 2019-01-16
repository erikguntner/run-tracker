import React, { Component, StrictMode } from 'react'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateTransportation } from '../actions/index';
import { faCar, faBicycle, faWalking, faAngleRight, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import styles from '../stylesheets/TransportationSelect.module.scss';


class TransportationSelect extends Component {

  render() {
    const { updateTransportation, transportationType } = this.props;

    const transportationIcon = {
      foot: faWalking,
      car: faCar,
      bike: faBicycle
    }

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
          <li onClick={() => updateTransportation('foot')}><FontAwesomeIcon icon={faWalking} /></li>
          <li onClick={() => updateTransportation('bike')}><FontAwesomeIcon icon={faBicycle} /></li>
          <li onClick={() => updateTransportation('car')}><FontAwesomeIcon icon={faCar} /></li>
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTransportation: (transportation) => dispatch(updateTransportation(transportation))
  }
}

const mapStateToProps = store => {
  return {
    transportationType: store.map.transportationType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransportationSelect);
