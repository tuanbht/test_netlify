import PropTypes from 'prop-types';

const HttpsRedirect = (props: { disabled?: boolean; children: React.ReactElement }): React.ReactElement | null => {
  const { disabled, children } = props;
  const { protocol, href } = window.location;

  if (!disabled && process.env.NODE_ENV === 'production' && protocol === 'http:') {
    const replaceUrl = href.replace(protocol, 'https:');

    window.location.assign(replaceUrl);
    return null;
  }

  return children;
};

HttpsRedirect.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default HttpsRedirect;
