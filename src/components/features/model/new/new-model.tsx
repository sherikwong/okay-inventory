import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { EFieldType, IField } from '../../../../types/form/field';
import React, { useState } from 'react';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';
import { Button } from 'grommet';

const newModelForm: IField[] = [
  {
    name: 'name',
    type: EFieldType.TEXT,
  },
  {
    name: 'type',
    type: EFieldType.RADIO_GROUP,
    options: transformEnumToSelectOptions(EFieldType),
  },
];

export const NewModel = () => {
  const [fields, setFields] = useState([]);

  const addField = ($event: any) => {
    console.log($event);
  };

  return (
    <>
      <h1>New Model</h1>
      <DynamicForm fields={fields} />

      <form onSubmit={addField}>
        <DynamicForm fields={newModelForm} />
        <Button type="submit" label="Add" />
      </form>
    </>
  );
};

export default {};
