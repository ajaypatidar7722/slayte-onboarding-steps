import React, { SyntheticEvent, useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { FormFields, MAX_ADMINS } from "../../../constants";
import styles from "./step3.module.css";
import step2Styles from "../Step2/step2.module.css";
import { Admin } from "../../../common/OnboardingSteps/typings";

const Step3Form = ({ onSubmit, values, handleChange, errors }: any) => {
  const [adminValue, setAdminValue] = useState("");
  const { admins } = values;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit();
  };

  const editAdmin = (value: string, name: string) => {
    handleChange(null, { value, name });
  };

  const addAdmin = () => {
    handleChange(null, { value: adminValue, name: `admin.${admins.length}` });
    setAdminValue("");
  };

  return (
    <Form>
      <h4>What are your main goals with Slayte</h4>
      {!!admins.length && admins.map((admin: Admin, adminIndex: number) => (
        <Form.Group widths='equal'>
          <Form.Field
            fluid
            control={Input}
            value={admin.email}
            disabled={!errors[`${FormFields.Admin}.${adminIndex}`]}
            error={errors[`${FormFields.Admin}.${adminIndex}`] && {
              content: errors[`${FormFields.Admin}.${adminIndex}`],
            }}
            onChange={(_: SyntheticEvent, { value }: { value: string }) => editAdmin(value, `${FormFields.Admin}.${adminIndex}`)}
          />
        </Form.Group>
      ))
      }
      {
        !!(admins.length < MAX_ADMINS) &&
        <>
          <Form.Field
            fluid
            control={Input}
            placeholder='Enter email'
            value={adminValue}
            name={`${FormFields.Admin}.${admins.length}`}
            onChange={(_: SyntheticEvent, { value }: { value: string }) => setAdminValue(value)}
          />
          <div className={styles.addGroup} onClick={addAdmin}>+</div>
        </>
      }
      <Form.Group className={styles.btnGroup} widths='equal'>
        <Button className={step2Styles.backBtn} disabled content="Back" />
        <Button className={styles.finishBtn} onClick={handleSubmit} content="Finish" />
      </Form.Group>
    </Form>
  );
};

export default Step3Form;
