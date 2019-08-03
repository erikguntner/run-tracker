import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from '../../stylesheets/CustomSelect.module.scss';

class CustomSelect extends Component {
  state = {
    headerTitle: this.props.headerTitle,
    open: false,
  };

  handleOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  selectItem = (title, id) => {
    const { setSelected } = this.props;
    this.setState(
      prevState => ({
        open: !prevState.open,
        headerTitle: title,
      }),
      setSelected(id)
    );
  };

  render() {
    const { options } = this.props;
    const { open, headerTitle } = this.state;

    const rotateStyle = open ? styles.rotate : '';

    return (
      <div className={styles.container}>
        <div className={styles.select} onClick={this.handleOpen}>
          <div className={styles.title}>{headerTitle}</div>
          <FontAwesomeIcon
            className={`${styles.icon} ${rotateStyle}`}
            icon={faChevronRight}
          />
        </div>
        <ul className={`${styles.dropdown} ${open ? styles.open : ''}`}>
          {options.map(({ id, selected, title }, i) => (
            <li
              id={id}
              key={`option-${i}`}
              className={selected ? styles.selected : ''}
              onClick={() => this.selectItem(title, id)}
            >
              {title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CustomSelect.propTypes = {
  options: PropTypes.array,
};

export default CustomSelect;
