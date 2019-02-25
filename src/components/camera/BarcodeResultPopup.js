import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faShareAlt,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import styles from './BarcodeResultPopup.css';

import Layout from '~/components/common/Layout';

const URL_REGEXP = /https?:\/\/[^\/]+\.[^\.\s\/]+(?:\/[^\s()<>]*)?/;

/**
 * @typedef Props
 * @property {string} text
 * @property {() => any} onClose
 */
/**
 * @typedef State
 * @property {boolean} copied
 */

/** @extends {React.Component<Props, State>} */
class BarcodeResultPopup extends React.Component {
  /** @type {State} */
  state = {
    copied: false,
  };

  getResultAsHtml() {
    const text = this.props.text || '';
    const elems = [];
    const regexp = new RegExp(URL_REGEXP, 'g');

    while (true) {
      const currentIndex = regexp.lastIndex;
      const match = regexp.exec(text);
      if (!match) {
        elems.push(text.slice(currentIndex));
        break;
      }

      const [prevText, href] = [
        text.slice(currentIndex, match.index),
        text.slice(match.index, regexp.lastIndex),
      ];
      elems.push(prevText);
      elems.push(
        <a href={href} target="_blank">
          {href}
        </a>,
      );
    }

    return elems;
  }

  onCopy = () => {
    this.setState({ copied: true }, () => {
      navigator.clipboard.writeText(this.props.text);
      setTimeout(() => this.setState({ copied: false }), 3000);
    });
  };

  onShare = () => {
    navigator.share({
      text: this.props.text,
    });
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    const { copied } = this.state;

    if (!this.props.text) {
      return null;
    }

    return (
      <Layout>
        <div className={styles.base}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={this.onClose}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>

            <p>{this.getResultAsHtml()}</p>

            <button className={styles.button} onClick={this.onCopy}>
              <FontAwesomeIcon icon={faClipboard} />
              <span>&nbsp;{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              className={styles.button}
              disabled={!('share' in navigator)}
              onClick={this.onShare}
            >
              <FontAwesomeIcon icon={faShareAlt} />
              <span>&nbsp;Share</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BarcodeResultPopup;
