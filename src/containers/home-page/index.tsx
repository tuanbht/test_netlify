import React from 'react';
import { ReactComponent as PalomaLogo } from 'assets/images/icons/paloma-logo.svg';
import Styles from './styles';

const HomePage = (): React.ReactElement => {
  const styles = Styles();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.title}>Coming soon...</span>
        <PalomaLogo className={styles.logo} />
      </div>
    </div>
  );
};

export default HomePage;
