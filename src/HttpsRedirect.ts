import PropTypes from 'prop-types';

const HttpsRedirect = (props: { disabled?: boolean; children: React.ReactElement }): React.ReactElement | null => {
  const { disabled, children } = props;

  if (!disabled && process.env.NODE_ENV === 'production') {
    const replaceUrl = window.location.href.replace(/^http(?!s)/, 'https');

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
