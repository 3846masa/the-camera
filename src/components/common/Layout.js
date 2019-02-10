import React from 'react';
import styles from './Layout.css';

/** @type {React.FC<React.HTMLAttributes<HTMLDivElement>>} */
const Layout = (props) => <div {...props} className={styles.base} />;

export default Layout;
