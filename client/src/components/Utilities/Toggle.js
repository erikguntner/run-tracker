import { Component } from 'react';

class Toggle extends Component {
  state = {
    open: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { open } = this.state;
    const { children } = this.props;
    const { toggle } = this;

    return children({ open, toggle });
  }
}

export default Toggle;
