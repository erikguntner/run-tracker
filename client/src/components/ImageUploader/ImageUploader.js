import React, { Component, useState } from 'react';

class ImageUploader extends Component {
  state = {
    image: null,
  };

  setImage = e => {
    this.setState({
      image: e.target.files[0],
    });
  };

  render() {
    console.log(this.state.image);
    return (
      <div>
        <h5>Add An Image</h5>
        <input
          onChange={this.setImage}
          type="file"
          accept="image/*"
          name=""
          id=""
        />
      </div>
    );
  }
}

export default ImageUploader;
