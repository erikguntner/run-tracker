import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Portal from './Portal';
import styles from '../../stylesheets/Popup.module.scss';

import { closePopup } from '../../actions/popup';

class Popup extends Component {
  componentDidUpdate() {
    setTimeout(
      function() {
        this.props.close();
      }.bind(this),
      2000
    );
  }

  render() {
    const { open, message, status } = this.props;

    return (
      <Portal>
        {open && <div className={styles.container}>{message}</div>}
      </Portal>
    );
  }
}

const mapStateToProps = store => ({
  open: store.popup.open,
  message: store.popup.message,
  status: store.popup.status,
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closePopup()),
});

Popup.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
