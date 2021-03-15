import { TextInput } from 'grommet';
import React from 'react';

export const EditModelNameForm = ({ modelName, setModelName }) => {
  return (
    <TextInput
      name="modelName"
      placeholder="Model Name"
      value={modelName}
      style={{ textAlign: 'center' }}
      required={true}
      onChange={({ target }) => {
        setModelName(target.value);
      }}
    />
  );
};
