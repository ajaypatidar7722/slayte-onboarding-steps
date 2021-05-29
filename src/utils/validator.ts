import { State } from "../common/OnboardingSteps/typings";
import { fieldStepMap, FormFields, MAX_GOALS } from "../constants";
import { emailRegex } from "./regex";

const isEmptyString = (input: string | null) => {
  if (!input || typeof input !== "string" || !input.length || !input.trim().length)
    return true;
  return false;
};

const isInvalidEmail = (input: string | null) => {
  return !emailRegex.test(String(input).toLowerCase());
};

type Errors = {
  [key: string]: string
}

const getNonEmptyMessage = (input: string) => (`${input} can not be empty`)

const getIsInvalidMessage = (input: string) => (`${input} is invalid`)

export const validateValues = (values: State, step: number): Errors => {
  const fields = fieldStepMap[step];

  const errors: Errors = {};

  fields.forEach(field => {
    switch (field) {
      case FormFields.FirstName:
        if (isEmptyString(values.firstName)) {
          errors[FormFields.FirstName] = getNonEmptyMessage("First Name");
          return;
        }
        break;
      case FormFields.LastName:
        if (isEmptyString(values.lastName)) {
          errors[FormFields.LastName] = getNonEmptyMessage("Last Name");
          return;
        }
        break;
      case FormFields.Email:
        if (isEmptyString(values.email)) {
          errors[FormFields.Email] = getNonEmptyMessage("Email");
          return;
        }
        if (isInvalidEmail(values.email)) {
          errors[FormFields.Email] = getIsInvalidMessage("Email");
          return;
        }
        break;
      case FormFields.Goal:
        if (!values.goals.length) {
          errors[`${FormFields.Goal}.${0}`] = getNonEmptyMessage("Goals");
          return;
        }
        Array.from({ length: MAX_GOALS }, (_, i) => i)
          .forEach((goalIndex) => {
            if (isEmptyString(values.goals[goalIndex])) {
              errors[`${FormFields.Goal}.${goalIndex}`] = getNonEmptyMessage("Goals");
            }
          });
        break;
      case FormFields.Admin:
        if (!values.admins.length) {
          errors[`${FormFields.Admin}.${0}`] = getNonEmptyMessage("Admins");
          return;
        }
        Array.from({ length: values.admins.length }, (_, i) => i)
          .forEach((adminIndex) => {
            if (isInvalidEmail(values.admins[adminIndex].email)) {
              errors[`${FormFields.Admin}.${adminIndex}`] = getIsInvalidMessage("Admin's email");
            }
            if (isEmptyString(values.admins[adminIndex].email)) {
              errors[`${FormFields.Admin}.${adminIndex}`] = getNonEmptyMessage("Admin's email");
            }
          });
        break;
      default:
        break;
    }
  });
  return errors;
};
