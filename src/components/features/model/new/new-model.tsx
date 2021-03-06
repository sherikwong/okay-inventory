import { Box, Button, Form, Layer, TextInput } from 'grommet';
import { Add } from 'grommet-icons';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import Draggable from 'react-draggable';
import { modelsDB } from '../../../../database/models';
import {
  EFieldType,
  IField,
  ISelectOption,
} from '../../../../types/form/field';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';
import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { Container } from '../../../reusable/container';

interface IReducer {
  action: 'increment' | 'decrement' | 'add' | 'delete' | 'modify';
  field: IField;
}

const optionsForm = [
  {
    name: 'label',
  },
  {
    name: 'value',
  },
];

export const NewModel = () => {
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [modelField, updateModelName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newFieldForm, updateNewFieldForm] = useReducer(
    (fields, [key, value]) => {
      return {
        ...fields,
        [key]: value,
      };
    },
    [
      {
        name: 'name',
        required: true,
      },
      {
        name: 'type',
        type: EFieldType.radioGroup,
        options: transformEnumToSelectOptions(EFieldType),
        required: true,
      },
      {
        name: 'multiple',
        type: EFieldType.checkbox,
        required: true,
      },
    ]
  );

  const hasOptions = (type) =>
    type === EFieldType.select || type === EFieldType.radioGroup;

  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >((previous, { action, field }) => {
    const shallowCopy = new Map(previous);

    switch (action) {
      case 'add':
        let _field = { ...field };

        if (hasOptions(field.type)) {
          _field = { ..._field, options };
        }

        shallowCopy.set(field.name, _field);
        // setOptions([]);
        break;
      case 'delete':
        shallowCopy.delete(field.name);
        break;
      case 'modify':
        const gottenField = shallowCopy.get(field.name);
        shallowCopy.set(field.name, {
          ...gottenField,
          ...field,
        });
    }

    return shallowCopy;
  }, new Map([]));

  const fieldsAsArray = Array.from(fields).map(([, value]) => value);

  const addField = ({ value }) => {
    setFields({
      action: 'add',
      field: value,
    });
  };

  const onSubmit = () => {
    modelsDB.add({
      // name: modelName,
      fields: fieldsAsArray,
    });
  };

  const onChange = (values: any) => {
    // Object.entries(values).forEach(([key, value]) => {
    //   updateNewFieldForm([key, value]);
    // });

    setOptionsFields(hasOptions(values.type) ? optionsForm : []);
  };

  const onAddOption: any = ({ value }) => {
    setOptions([...options, value]);
  };

  return (
    <Box margin="large">
      <TextInput
        onChange={($event) => updateModelName($event.target.value)}
        placeholder="Model Name"
        value={modelField}
      />

      <DynamicForm
        fields={fieldsAsArray}
        sortable={true}
        onEmitSortedFields={(fields) => console.log(fields)}
        style={{
          field: {
            border: { color: 'brand', size: 'small' },
            pad: 'medium',
          },
        }}
      ></DynamicForm>

      <Box margin="large" alignContent="center">
        <Button
          icon={<Add />}
          size="small"
          onClick={() => setShowAddForm(!showAddForm)}
        />
      </Box>

      {showAddForm ? (
        <>
          <Container>
            <Form onSubmit={addField} onChange={onChange}>
              <DynamicForm fields={newFieldForm} />
              <Button type="submit" label="Add Field" />
            </Form>
          </Container>

          {options.length ? (
            <Container>
              <h1>Options</h1>
              {options.map(({ value, label }) => (
                <>
                  {label}: {value}
                </>
              ))}
            </Container>
          ) : null}
          {optionsFields.length ? (
            <Container>
              <Form onSubmit={onAddOption}>
                <Container>
                  <DynamicForm fields={optionsFields} />
                  <Button type="submit" label="Add Option" />
                </Container>
              </Form>
            </Container>
          ) : null}
        </>
      ) : null}

      <Button label="Save" onClick={onSubmit} />
    </Box>
  );
};

export default {};
