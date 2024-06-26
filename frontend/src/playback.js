/* global window XMLHttpRequest */

const SpotifyPlayer = {
  base_config: {
    api_endpoint: 'https://api.spotify.com',
    auth_endpoint: 'https://accounts.spotify.com/authorize',
  },
  config: {
    player_name: "Musikwiss",
    client_id: "648d904fb6eb4d34b8ab948c36a73b67",
    redirect_uri: window.location.origin,
    scopes: ['streaming', 'user-read-playback-state', 'user-modify-playback-state'],
  },
  access_token: null,
  player: null,
  device_id: null,
  sendToLogin() {
    window.location = [
      this.base_config.auth_endpoint,
      `?client_id=${this.config.client_id}`,
      `&redirect_uri=${this.config.redirect_uri}`,
      `&scope=${this.config.scopes.join('%20')}`,
      '&response_type=token',
      '&show_dialog=true',
    ].join('');
  },
};

// V2: Added playback controls
SpotifyPlayer.controls = {
  _request(method, endpoint, params) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, SpotifyPlayer.base_config.api_endpoint + endpoint, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Authorization', `Bearer ${SpotifyPlayer.access_token}`);
      xhr.onload = () => {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
          try {
            if (!xhr.responseText) {
              return resolve();
            }
            resolve(JSON.parse(xhr.responseText));
          } catch (err) {
            console.log(err);
            reject();
          }
        }
        return null;
      };
      xhr.send(JSON.stringify(params));
    });
  },
  switchPlayback(id) {
    return this._request('PUT', '/v1/me/player', { device_ids: [id] });
  },
  play(uris, id) {
    if (uris) {
      this._request('PUT', `/v1/me/player/play?device_id=${id}`, { uris });
    } else {
      this._request('PUT', '/v1/me/player/play');
    }
  },
  pause() {
    this._request('PUT', '/v1/me/player/pause');
  },
  prevTrack() {
    this._request('POST', '/v1/me/player/previous');
  },
  nextTrack() {
    this._request('POST', '/v1/me/player/next');
  },
  searchAndPlay(query) {
    this._request('GET', `/v1/search?type=track&q=${query}*&market=from_token`, {}).then(results => {
      SpotifyPlayer.controls.play([results.tracks.items[0].uri]);
    });
  },
  getDevices(callback) {
    this._request('GET', '/v1/me/player/devices').then(results => {
      callback(results.devices);
    });
  },
};

const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
    if (item) {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

// Make our window URL hash empty.
SpotifyPlayer.access_token = hash.access_token;
window.location.hash = '';

export function auth() {
  // If there is no token, redirect to Spotify authorization
  if (!SpotifyPlayer.access_token) {
    SpotifyPlayer.sendToLogin();
  }
}

window.onSpotifyPlayerAPIReady = () => {
  // Initialize our Player
  SpotifyPlayer.player = new window.Spotify.Player({
    name: SpotifyPlayer.config.player_name,
    getOauthToken(cb) {
      cb(SpotifyPlayer.access_token);
    },
    volume: 1.0,
  });

   // Handle errors
  /*
  SpotifyPlayer.player.on('initialization_failed', e => {
    console.log('Initialization Failed', e);
  });
  SpotifyPlayer.player.on('authentication_error', e => {
    console.log('Authentication Error', e);
  });
  SpotifyPlayer.player.on('account_error', e => {
    console.log('Account Error', e);
  });
  SpotifyPlayer.player.on('playback_error', e => {
    console.log('Playback Error', e);
  }); 
  */

  SpotifyPlayer.player.addListener('initialization_error', ({ message }) => { 
    console.error(message);
    console.log("errors lol");
    console.log(SpotifyPlayer.access_token);
    console.log(SpotifyPlayer.device_id);
    console.log(SpotifyPlayer.player);
  });
  SpotifyPlayer.player.addListener('authentication_error', ({ message }) => { console.error(message); });
  SpotifyPlayer.player.addListener('account_error', ({ message }) => { console.error(message); });
  SpotifyPlayer.player.addListener('playback_error', ({ message }) => { console.error(message); });


  // Playback status updates
  SpotifyPlayer.player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  SpotifyPlayer.player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    SpotifyPlayer.device_id = device_id;
  });

  // Not Ready
  SpotifyPlayer.player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  /*
  // Player state changed
  // The event contains information about the current player state
  SpotifyPlayer.player.on('player_state_changed', e => {
    console.log('Player state changed', (window.e = e));
  });

  // Player is ready and can be issued commands
  SpotifyPlayer.player.on('ready', e => {
    console.log('Ready to rock!', e);
    SpotifyPlayer.device_id = e.device_id;
  });
  */
  
  // Connect to the Player
  console.log("Connecting player");
  SpotifyPlayer.player.connect();
};

export default SpotifyPlayer;
