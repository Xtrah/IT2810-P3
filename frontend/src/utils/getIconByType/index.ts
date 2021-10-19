// Using icons from https://github.com/duiker101/pokemon-type-svg-icons/tree/1.0.0

import bug from './bug.svg';
import water from './water.svg';
import dark from './dark.svg';
import dragon from './dragon.svg';
import electric from './electric.svg';
import fairy from './fairy.svg';
import fighting from './fighting.svg';
import fire from './fire.svg';
import flying from './flying.svg';
import ghost from './ghost.svg';
import grass from './grass.svg';
import ground from './ground.svg';
import ice from './ice.svg';
import normal from './normal.svg';
import poison from './poison.svg';
import psychic from './psychic.svg';
import rock from './rock.svg';
import steel from './steel.svg';

// Return image according to string input
const getIconByType = (type: string) => {
  const imageTypeMap = new Map([
    ['normal', normal],
    ['fire', fire],
    ['water', water],
    ['grass', grass],
    ['electric', electric],
    ['ice', ice],
    ['fighting', fighting],
    ['poison', poison],
    ['ground', ground],
    ['flying', flying],
    ['psychic', psychic],
    ['bug', bug],
    ['rock', rock],
    ['ghost', ghost],
    ['dark', dark],
    ['dragon', dragon],
    ['steel', steel],
    ['fairy', fairy],
  ]);

  return imageTypeMap.get(type) || imageTypeMap.get('normal');
};

export default getIconByType;
