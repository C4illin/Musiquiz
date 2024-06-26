import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import SettingsStyles from './styles/SettingsStyles';
import IconButton from './styles/IconButton';
import { GameConsumer, GameContext } from '../game-context';
import Button from './styles/Button';
import SpotifyPlayer from '../playback';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      time: 40,
      leaderTime: 10,
      penalty: 1,
      maxPoints: 50,
      minPoints: 10,
      selectedDevice: SpotifyPlayer.device_id,
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    const { context } = this;
    const settings = cookies.get('settings');
    if (settings) {
      this.setState({
        ...settings,
      });
      context.onSaveSettings(settings);
    } else {
      const { penalty, leaderTime, time, maxPoints, minPoints } = this.state;
      cookies.set('settings', { time, leaderTime, penalty, maxPoints, minPoints }, { path: '/' });
    }
    this.updateDevices(SpotifyPlayer.device_id);
    this.playSong('spotify:track:1DCNcPA0Y9ukY5AlXAZKUm');
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { songToPlay } = this.props;
    if (songToPlay !== newProps.songToPlay) {
      console.log(`Playing ${newProps.songToPlay}`);
      this.playSong(newProps.songToPlay);
    }
  }

  playSong(uri) {
    const { selectedDevice } = this.state;
    SpotifyPlayer.controls.play([uri], selectedDevice);
  }

  changeDevice(id) {
    console.log(id);
    SpotifyPlayer.controls.switchPlayback(id);
    this.updateDevices(id);
  }

  updateDevices(id) {
    SpotifyPlayer.controls.getDevices(results => {
      this.setState({ devices: results, selectedDevice: id });
    });
  }

  render() {
    const { devices, selectedDevice } = this.state;
    const { cookies } = this.props;
    return (
      <GameConsumer>
        {context => {
          const { penalty, leaderTime, time, minPoints, maxPoints } = this.state;
          return (
            <SettingsStyles>
              {context.state.showSettings ? (
                <div>
                  <h2 className="settings-header">
                    Settings
                    <IconButton onClick={() => context.onShowSettings()} type="button">
                      <FontAwesomeIcon icon="times" />
                    </IconButton>
                  </h2>
                  <select value={selectedDevice} onChange={e => this.changeDevice(e.target.value)}>
                    {devices.map(device => (
                      <option key={device.id} value={device.id}>
                        {device.name}
                      </option>
                    ))}
                  </select>
                  <form
                    className="settings-form"
                    onSubmit={e => {
                      e.preventDefault();
                      cookies.set('settings', { time, leaderTime, penalty, minPoints, maxPoints }, { path: '/' });
                      context.onSaveSettings({ time, leaderTime, penalty, minPoints, maxPoints });
                      return false;
                    }}
                  >
                    <label className="setting" htmlFor="time">
                      Round time:
                      <input
                        id="time"
                        name="time"
                        className="timer-input"
                        type="number"
                        onChange={event =>
                          this.setState({ time: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value })
                        }
                        value={time}
                        step="1"
                        min="1"
                        max="180"
                      />
                    </label>
                    <label className="setting" htmlFor="leaderTime">
                      Leader timeout:
                      <input
                        id="leaderTime"
                        name="leaderTime"
                        className="timer-input"
                        type="number"
                        onChange={event =>
                          this.setState({ leaderTime: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value })
                        }
                        value={leaderTime}
                        step="1"
                        min="1"
                        max="180"
                      />
                    </label>
                    <label className="setting" htmlFor="penalty">
                      Bad song penalty:
                      <input
                        id="penalty"
                        name="penalty"
                        className="timer-input"
                        type="number"
                        onChange={event =>
                          this.setState({ penalty: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value })
                        }
                        value={penalty}
                        step="1"
                        min="0"
                        max="180"
                      />
                    </label>
                    <label className="setting" htmlFor="minPoints">
                      Min points:
                      <input
                        id="minPoints"
                        name="minPoints"
                        className="timer-input"
                        type="number"
                        onChange={event =>
                          this.setState({ minPoints: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value })
                        }
                        value={minPoints}
                        step="1"
                        min="0"
                        max="180"
                      />
                    </label>
                    <label className="setting" htmlFor="maxPoints">
                      Max points:
                      <input
                        id="maxPoints"
                        name="maxPoints"
                        className="timer-input"
                        type="number"
                        onChange={event =>
                          this.setState({ maxPoints: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value })
                        }
                        value={maxPoints}
                        step="1"
                        min="0"
                        max="180"
                      />
                    </label>
                    <Button type="submit" value="Save settings" />
                  </form>
                </div>
              ) : (
                <IconButton className="cog" onClick={() => context.onShowSettings()} type="button">
                  <FontAwesomeIcon icon="cog" />
                </IconButton>
              )}
            </SettingsStyles>
          );
        }}
      </GameConsumer>
    );
  }
}
Settings.contextType = GameContext;
Settings.propTypes = {
  songToPlay: PropTypes.string,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

Settings.defaultProps = {
  songToPlay: '',
};

export default withCookies(Settings);
