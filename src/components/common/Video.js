import React from 'react';

/**
 * @typedef Props
 * @property {MediaStream} [srcObject]
 */

/** @extends {React.Component<React.VideoHTMLAttributes<*> & Props>} */
class Video extends React.Component {
  /** @type {React.RefObject<HTMLVideoElement>} */
  ref = React.createRef();

  set srcObject(srcObject) {
    this.ref.current.srcObject = srcObject;
  }

  componentDidMount() {
    this.srcObject = this.props.srcObject;
  }

  /** @param {Props} prevProps */
  componentDidUpdate(prevProps) {
    if (this.props.srcObject !== prevProps.srcObject) {
      this.srcObject = this.props.srcObject;
    }
  }

  render() {
    const { srcObject, ...rest } = this.props;
    return <video {...rest} ref={this.ref} />;
  }
}

export default Video;
