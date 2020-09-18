import React from 'react';
import HeaderStyle from './styles';
import { ReactComponent as PalomaLogo } from '../../../assets/images/icons/paloma-logo.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Container } from '@material-ui/core';

const Header = (props: { goBack: () => void; canBack: boolean }): React.ReactElement => {
  const { goBack, canBack } = props;
  const headerStyle = HeaderStyle();

  return (
    <Container className={headerStyle.root}>
      {canBack && <ArrowBackIcon className={headerStyle.goBack} onClick={goBack} />}
      <div className={headerStyle.title}>
        <PalomaLogo />
        <span>Paloma Payments</span>
      </div>
    </Container>
  );
};

export default Header;
