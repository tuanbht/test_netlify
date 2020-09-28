import React from 'react';
import Styles from '../invalid-order/styles';
import { Header } from '../../components/customer-payments';

const InvalidOrder = (props: { content: { title: string; subtitle: string } }): React.ReactElement => {
  const styles = Styles();
  const { content } = props;

  return (
    <div className={styles.root}>
      <Header showBack={false} />
      <div className={styles.content}>
        <div className={styles.title}>{content.title}</div>
        <div className={styles.subtitle}>{content.subtitle}</div>
      </div>
    </div>
  );
};

export default InvalidOrder;
