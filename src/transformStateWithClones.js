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
        removeKeys(latestState, Object.keys(latestState));
        break;

      case 'addProperties':
        Object.assign(latestState, currentAction.extraData);
        break;

      case 'removeProperties':
        removeKeys(latestState, currentAction.keysToRemove);
        break;

      default:
        break;
    }

    if (i === actionsQuantity - 1) {
      break;
    }

    states.push({ ...latestState }); // it prepares a state for next action.
  }

  return states;
}

function removeKeys(objectReference, keysToRemove) {
  for (const key of keysToRemove) {
    delete objectReference[key];
  }
}

module.exports = transformStateWithClones;
