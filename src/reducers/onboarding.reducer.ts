import { Action, State, ActionTypes } from "../common/OnboardingSteps/typings";

export const actionTypes: ActionTypes = {
  SET_FIRST_NAME: "SET_FIRST_NAME",
  SET_LAST_NAME: "SET_LAST_NAME",
  SET_EMAIL: "SET_EMAIL",
  ADD_GOAL: "ADD_GOAL",
  ADD_ADMIN: "ADD_ADMIN",
  SET_PASSWORD: "SET_PASSWORD",
  MARK_ADMIN_SUCCESSFUL: "MARK_ADMIN_SUCCESSFUL"
};

export const initialOnboardingState: State = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  goals: [],
  admins: []
};

export const onboardingReducer = (state: State = initialOnboardingState, action: Action): State => {
  switch (action.type) {
    case actionTypes.SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case actionTypes.SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.ADD_GOAL:
      const updatedGoals = [...state.goals];
      updatedGoals[Number(action.counter)] = action.payload;
      return { ...state, goals: updatedGoals };
    case actionTypes.ADD_ADMIN:
      const updatedAdmins = [...state.admins];
      updatedAdmins[Number(action.counter)] = { email: action.payload, successfullyAdded: false };
      return { ...state, admins: updatedAdmins };
    case actionTypes.MARK_ADMIN_SUCCESSFUL:
      const addedAdmins = [...state.admins];
      addedAdmins[Number(action.counter)].successfullyAdded = true;
      return { ...state, admins: addedAdmins };
    default:
      return state;
  }
};
