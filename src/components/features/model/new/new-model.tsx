import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { EFieldType, IField } from '../../../../types/form/field';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';
import { Box, Button, Form } from 'grommet';

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

interface IReducer {
  action: 'increment' | 'decrement' | 'add' | 'delete';
  field: IField;
}

export const NewModel = () => {
  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >((previous, { action, field }) => {
    const shallowCopy = new Map(previous);

    switch (action) {
      case 'add':
        shallowCopy.set(field.name, field);
        break;
      case 'delete':
        shallowCopy.delete(field.name);
        break;
    }

    return shallowCopy;
  }, new Map([]));

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const addField = ({ value }) => {
    setFields({ action: 'add', field: value });
  };

  return (
    <>
      <h1>New Model</h1>
      {fields && (
        <Box
          direction="row"
          border={{ color: 'brand', size: 'small' }}
          pad="medium"
        >
          <DynamicForm fields={Array.from(fields).map(([, value]) => value)} />
        </Box>
      )}

      <Box
        direction="row"
        border={{ color: 'brand', size: 'small' }}
        pad="medium"
      >
        <Form onSubmit={addField}>
          <DynamicForm fields={newModelForm} />
          <Button type="submit" label="Add" />
        </Form>
      </Box>
    </>
  );
};

export default {};
