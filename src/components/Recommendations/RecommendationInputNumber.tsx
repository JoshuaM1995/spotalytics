import React from 'react';
import {ControlLabel, HelpBlock, InputNumber} from "rsuite";
import {Field} from "formik";

interface RecommendationInputNumber {
  label: string;
  inputName: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
}

const RecommendationInputNumber = ({ label, inputName, helpText, min, max, step }: RecommendationInputNumber) => {
  return (
    <>
      <ControlLabel style={helpText ? {} : { marginBottom: 8 }}>
        { label }
        {helpText &&
        <HelpBlock tooltip>{ helpText }</HelpBlock>}
      </ControlLabel>
      <Field
        name={inputName}
        render={({field, form}: any) => (
          <InputNumber
            {...field}
            step={step ?? 0.1}
            min={min ?? 0}
            max={max ?? 1}
            onChange={(value) => form.setFieldValue(inputName, value)}
          />
        )}
      />
    </>
  );
};

export default RecommendationInputNumber;
