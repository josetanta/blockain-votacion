import { getHashUser, getVoted } from '../../utils/sessionStorage';

export const initStateUser = {
  token: getHashUser(),
  isVoted: getVoted(),
};

export function votarReducer(state = initStateUser, action) {
  switch (action.type) {
    case 'votar':
      return {
        token: getHashUser(),
        isVoted: true,
      };

    default:
      return state;
  }
}
