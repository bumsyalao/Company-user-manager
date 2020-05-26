import * as types from '../actions/types';

const defaultState = {
  userCompany: {},
  requestList: [],
  allCompany: [],
  pagination: {},

}
export default (
  state = defaultState,
  action
) => {

  switch (action.type) {
    case types.GET_USER_COMPANY:
      return {
        ...state,
        userCompany: action.userCompany
      };
    case types.GET_ALL_COMPANY:
      return {
        ...state,
        allCompany: action.companies,
          pagination: action.metaData
      };
    case types.GET_ALL_COMPANY_REQUEST:
      return {
        ...state,
        requestList: action.users,
          pagination: action.metaData
      }
      case types.SIGN_OUT_USER:
        return defaultState


      default:
        return state;
  }
};