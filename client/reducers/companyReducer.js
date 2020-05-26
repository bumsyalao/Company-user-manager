import * as types from '../actions/types';

export default (
  state = {
    userCompany: {},
    requestList: [],
    allCompany: [],
    pagination: {},

  },
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


      default:
        return state;
  }
};