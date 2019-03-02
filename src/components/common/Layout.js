import React from 'https://dev.jspm.io/react@16';
import styles from './Layout.css';

/** @type {React.FC<React.HTMLAttributes<HTMLDivElement>>} */
const Layout = (props) => <div {...props} className={styles.base} />;

export default Layout;
