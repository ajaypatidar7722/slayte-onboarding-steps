import React, { SyntheticEvent, useReducer, useState } from "react";
import { Container } from "semantic-ui-react";
import Step1 from "../../components/OnboardingSteps/Step1/Step1";
import Step2 from "../../components/OnboardingSteps/Step2/Step2";
import Step3 from "../../components/OnboardingSteps/Step3/Step3";
import { onboardingReducer, initialOnboardingState } from "../../reducers/onboarding.reducer";
import { setEmail, setFirstName, setLastName, setPassword, addGoal, addAdmin, markAdmin } from "../../actions/onboarding.actions";
import { DEFAULT_USER_PASSWORD, FormFields, OnboardingSteps } from "../../constants";
import { validateValues } from "../../utils/validator";
import { signIn, signUp } from "../../firebase/db";
import { ErrorStateProperties, StepDescription, StepForm, StepParams } from "../../common/OnboardingSteps/typings";
import styles from "./onboardingStep.module.css";


const getDescription = (stepNumber: string, name: string | null): string => {
  const stepDescription: StepDescription = {
    [OnboardingSteps.STEP_1]: "Hi there.",
    [OnboardingSteps.STEP_2]: `Hi ${name || ""}`,
    [OnboardingSteps.STEP_3]: "Way to go!",
  };

  return stepDescription[stepNumber];
};

const stepForm: StepForm = {
  [OnboardingSteps.STEP_1]: Step1,
  [OnboardingSteps.STEP_2]: Step2,
  [OnboardingSteps.STEP_3]: Step3,
};

const OnboardingStep = ({ match, history, location }: any) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);
  const [errors, setErrors] = useState<ErrorStateProperties>({});

  const { stepNumber }: StepParams = match.params;
  const FormComponent = stepForm[stepNumber];

  const handleSubmit = async () => {
    const formErrors = validateValues(state, Number(stepNumber));
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    } else {
      setErrors({});
    }

    if (stepNumber === OnboardingSteps.STEP_1) {
      const signedInUser = await signIn(state.email, state.password);
      if (signedInUser.code) {
        setErrors({ email: signedInUser.message });
        return;
      }
    }

    if (stepNumber === OnboardingSteps.STEP_3) {
      state.admins.forEach(async (adminEmail, index) => {
        if (!adminEmail.successfullyAdded) {
          const signedUpUser = await signUp(adminEmail.email, DEFAULT_USER_PASSWORD);
          if (signedUpUser.code) {
            setErrors({ [`admin.${index}`]: signedUpUser.message });
            return;
          } else {
            dispatch(markAdmin(index));
          }
        }
      });
    }

    const nextStep = parseInt(stepNumber, 10) + 1;
    if (nextStep !== 4) {
      history.push(`/onboarding/${nextStep}`);
    }
  };

  const handleChange = (_: SyntheticEvent, props: any) => {
    const { value, name } = props;
    switch (name) {
      case FormFields.FirstName:
        dispatch(setFirstName(value));
        break;
      case FormFields.LastName:
        dispatch(setLastName(value));
        break;
      case FormFields.Email:
        dispatch(setEmail(value));
        break;
      case FormFields.Password:
        dispatch(setPassword(value));
        break;
      case name.startsWith("goal.") && name:
        const goalCounter = name.split(".")[1];
        dispatch(addGoal(value, goalCounter));
        break;
      case name.startsWith("admin.") && name:
        const adminCounter = name.split(".")[1];
        dispatch(addAdmin(value, adminCounter));
        break;
    }
  };

  return (
    <Container id={styles.container} className={styles.container}>
      <h1 className={styles.heading}>{getDescription(stepNumber, state.firstName)}</h1>
      <FormComponent errors={errors} values={state} onSubmit={handleSubmit} handleChange={handleChange} />
    </Container>
  );
};

export default OnboardingStep;
