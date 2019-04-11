import React, { Component } from 'react';
import { connect } from 'react-redux';
import Portal from './Portal';
import styles from '../../stylesheets/Popup.module.scss';

import { closePopup } from '../../actions/popup';

class Popup extends Component {
  componentDidUpdate() {
    setTimeout(
      function() {
        console.log('closing');
        this.props.close();
      }.bind(this),
      4000
    );
  }

  render() {
    console.log(this.props);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
