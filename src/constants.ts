export enum OnboardingSteps {
  STEP_1 = "1",
  STEP_2 = "2",
  STEP_3 = "3"
}

export enum FormFields {
  FirstName = "firstName",
  LastName = "lastName",
  Email = "email",
  Goal = "goal",
  Admin = "admin",
  Password = "password"
}

type FieldStepMap = {
  [key: number]: string[]
}

export const fieldStepMap: FieldStepMap = {
  1: [FormFields.FirstName, FormFields.LastName, FormFields.Email ],
  2: [FormFields.Goal],
  3: [FormFields.Admin]
};

export const MAX_GOALS = 3;
export const MAX_ADMINS = 5;

export const DEFAULT_USER_PASSWORD: string = process.env.REACT_APP_DEFAULT_PASSWORD || "test@123";
