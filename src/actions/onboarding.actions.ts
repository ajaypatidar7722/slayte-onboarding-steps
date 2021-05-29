import { actionTypes } from "../reducers/onboarding.reducer";
import { FormFields } from "../constants";
import { Action } from "../common/OnboardingSteps/typings";

export const setFirstName = (name: FormFields): Action => ({
  type: actionTypes.SET_FIRST_NAME,
  payload: name
});

export const setLastName = (name: FormFields): Action => ({
  type: actionTypes.SET_LAST_NAME,
  payload: name
});

export const setEmail = (email: FormFields): Action => ({
  type: actionTypes.SET_EMAIL,
  payload: email
});

export const setPassword = (password: FormFields): Action => ({
  type: actionTypes.SET_PASSWORD,
  payload: password
});


export const addGoal = (goal: FormFields, counter: number): Action => ({
  type: actionTypes.ADD_GOAL,
  payload: goal,
  counter
});

export const addAdmin = (name: FormFields, counter: number): Action => ({
  type: actionTypes.ADD_ADMIN,
  payload: name,
  counter
});

export const markAdmin = (counter:number): Action => ({
  type: actionTypes.MARK_ADMIN_SUCCESSFUL,
  payload: "",
  counter,
});