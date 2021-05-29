import React from 'react';

export type Admin = {
  email: string,
  successfullyAdded: boolean
};

export type State = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  goals: (string)[],
  admins: (Admin)[],
};

export type ActionTypes = {
  [key: string]: string
}

export type Action = {
  type: string,
  payload: string,
  counter?: number | null
};

export interface StepDescription {
  [key: string]: string
}


export interface StepParams { stepNumber: string };

export interface ErrorStateProperties {

}

export interface StepFormProps {
  errors: ErrorStateProperties;
  values: State;
  onSubmit: () => Promise<void>;
  handleChange: any;
};

export interface StepForm {
  [key: string]: React.FunctionComponent<StepFormProps>,
}
