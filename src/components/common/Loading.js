import React from 'https://dev.jspm.io/react@16';
import { FontAwesomeIcon } from '/libraries/@fortawesome/react-fontawesome/index.js';
import { faSpinner } from '/libraries/@fortawesome/free-solid-svg-icons/index.js';
import styles from './Loading.css';

import Layout from '/components/common/Layout.js';

/**
 * @typedef Props
 * @property {boolean} [loading]
 */

/** @type {React.FC<Props>} */
const Loading = ({ loading }) =>
  !loading ? null : (
    <Layout>
      <div className={styles.base}>
        <FontAwesomeIcon icon={faSpinner} size="3x" pulse />
      </div>
    </Layout>
  );

export default Loading;
