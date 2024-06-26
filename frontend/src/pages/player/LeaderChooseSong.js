import React from 'react';
import Search from '../../components/Search';
import { GameConsumer } from '../../game-context';

const LeaderChooseSong = () => (
  <GameConsumer>
    {context => (
      <React.Fragment>
        <h2>Pick a song</h2>
        <Search name={context.state.name} recommendations onSelectSong={context.onSelectSong} />
      </React.Fragment>
    )}
  </GameConsumer>
);

export default LeaderChooseSong;
