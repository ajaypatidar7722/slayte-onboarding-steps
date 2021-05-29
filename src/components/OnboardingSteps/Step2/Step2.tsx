import React from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { FormFields, MAX_GOALS } from "../../../constants";
import styles from "./step2.module.css";

const Step2Form = ({ onSubmit, values, handleChange, errors }: any) => {
  const { goals } = values;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Form>
      <h4>What are your main goals with Slayte</h4>
      {Array.from({ length: MAX_GOALS }, (_, i) => i).map((goalIndex) => (
        <Form.Field
          className={styles.field}
          control={Input}
          label={goalIndex + 1}
          value={goals[goalIndex]}
          name={`${FormFields.Goal}.${goalIndex}`}
          onChange={handleChange}
          error={errors[`${FormFields.Goal}.${goalIndex}`] && {
            content: errors[`${FormFields.Goal}.${goalIndex}`],
            pointing: "left",
          }}
        />
      ))}
      <Form.Group className={styles.btnGroup} widths='equal'>
        <Button className={styles.backBtn} disabled content="Back" />
        <Button className={styles.nextBtn} onClick={handleSubmit} content="Next" />
      </Form.Group>
    </Form>
  );
};

export default Step2Form;
