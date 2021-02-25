import React from 'react';
import { Row } from 'react-bootstrap';

import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <Row
      noGutters
      className={`justify-content-center align-items-center ${styles.fullScreen} ${styles.backgroundDark}`}
    >
      <h1>Jktrans</h1>
    </Row>
  );
};

export default LoadingScreen;
