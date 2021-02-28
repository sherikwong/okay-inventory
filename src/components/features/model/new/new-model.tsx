import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { EFieldType, IField } from '../../../../types/form/field';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { modelsDB } from '../../../../database/models';

const newFieldForm: IField[] = [
  {
    name: 'Name',
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
  const [modelName, setModelName] = useState('');
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

  const fieldsAsArray = Array.from(fields).map(([, value]) => value);

  const addField = ({ value }) => {
    setFields({ action: 'add', field: value });
  };

  const newModelForm: IField[] = [
    {
      name: 'Form Name',
      type: EFieldType.TEXT,
      value: modelName,
      onChange: (value) => setModelName(value.target.value),
    },
  ];

  const onSubmit = () => {
    modelsDB.add({
      name: modelName,
      fields: fieldsAsArray
    });
  };

  return (
    <>
      <h1>New Model</h1>

      <DynamicForm fields={newModelForm} />

      {fields && (
        <Box
          direction="row"
          border={{ color: 'brand', size: 'small' }}
          pad="medium"
        >
          <DynamicForm fields={fieldsAsArray} />
        </Box>
      )}

      <Box
        direction="row"
        border={{ color: 'brand', size: 'small' }}
        pad="medium"
      >
        <Form onSubmit={addField}>
          <DynamicForm fields={newFieldForm} />
          <Button type="submit" label="Add" />
        </Form>
      </Box>

      <Button label="Save" onClick={onSubmit}/>
    </>
  );
};

export default {};
