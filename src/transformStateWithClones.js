'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  /*
   * The latest state is already in the array when it's being worked on.
   * Is this type of mutation ok? :/
   */

  const states = [{ ...state }];
  const actionsQuantity = actions.length;

  for (let i = 0; i < actionsQuantity; i++) {
    const currentAction = actions[i];
    const latestState = states[i];

    switch (currentAction.type) {
      case 'clear':
        for (const key of Object.keys(latestState)) {
          delete latestState[key];
        }
        break;

      case 'addProperties':
        Object.assign(latestState, currentAction.extraData);
        break;

      case 'removeProperties':
        for (const key of currentAction.keysToRemove) {
          delete latestState[key];
        }
        break;

      default:
        break;
    }

    if (i === actionsQuantity - 1) {
      break;
    }

    states.push({ ...latestState }); // it prepares a state for a next action.
  }

  return states;
}

module.exports = transformStateWithClones;
