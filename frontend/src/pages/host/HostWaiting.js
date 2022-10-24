/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import QR from '../../components/QR';
import HostScreenStyles from '../../components/styles/HostScreenStyles';
import SpotifyPlayer from '../../playback';

const HostWaiting = ({ name }) => (
  <HostScreenStyles>
    <QR name={name} className="qr" size={256} value={`${window.location.href.replace('#', '')}?id=${name}`} />
    <div className="game">
      <h1>Waiting for players</h1>
    </div>
  </HostScreenStyles>
);
HostWaiting.propTypes = {
  name: PropTypes.string.isRequired,
};
SpotifyPlayer.controls.play(["spotify:track:4mn9xkejyNn8EBKhrOf3aW"], SpotifyPlayer.device_id);
export default HostWaiting;