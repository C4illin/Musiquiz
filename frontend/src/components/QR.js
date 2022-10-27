import React from 'react';
import QRCodeCanvas from 'qrcode.react';
import PropTypes from 'prop-types';
import QRStyles from './styles/QRStyles';

const QR = props => {
  const { name, className, size, value } = props;
  return (
    <QRStyles className={className}>
      <QRCodeCanvas size={size} value={value} />
      <h1>{`#${name}`}</h1>
    </QRStyles>
  );
};
QR.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.string.isRequired,
};
QR.defaultProps = {
  className: '',
  size: 128,
};
export default QR;
