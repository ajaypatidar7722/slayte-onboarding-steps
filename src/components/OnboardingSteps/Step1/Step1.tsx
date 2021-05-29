import React from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { FormFields } from "../../../constants";
import styles from "./step1.module.css";

const Step1Form = ({ onSubmit, values, handleChange, errors }: any) => {
  const { firstName, lastName, email, password } = values;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Form>
      <Form.Group className={styles.mb24} widths='equal'>
        <Form.Field
          fluid
          control={Input}
          label='First Name'
          value={firstName}
          name={FormFields.FirstName}
          onChange={handleChange}
          error={
            errors[FormFields.FirstName] && {
              content: errors[FormFields.FirstName],
            }}
        />
        <Form.Field
          fluid
          control={Input}
          label='Last Name'
          value={lastName}
          name={FormFields.LastName}
          onChange={handleChange}
          error={errors[FormFields.LastName] && {
            content: errors[FormFields.LastName],
          }}
        />
      </Form.Group>
      <Form.Field
        className={styles.mb24}
        control={Input}
        label='Email'
        value={email}
        name={FormFields.Email}
        onChange={handleChange}
        error={errors[FormFields.Email] && {
          content: errors[FormFields.Email],
        }}
      />
      <Form.Field
        className={styles.mb24}
        control={Input}
        label='Password'
        value={password}
        type="password"
        name={FormFields.Password}
        onChange={handleChange}
        error={errors[FormFields.Password] && {
          content: errors[FormFields.Password],
        }}
      />
      <Button className={styles.proceedBtn} onClick={handleSubmit} content="Proceed" />
    </Form>
  );
};

export default Step1Form;
