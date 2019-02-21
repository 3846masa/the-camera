import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Loading.css';

import Layout from '~/components/common/Layout';

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
