import React, { Component } from 'react';
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
    this.setState(
      prevState => ({
        open: !prevState.open,
        headerTitle: title,
      }),
      this.props.setSelected(id)
    );
  };

  render() {
    const { options } = this.props;
    const { open, headerTitle } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header} onClick={this.handleOpen}>
          <div className={styles.title}>{headerTitle}</div>
          <div>Arrow</div>
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

export default CustomSelect;
