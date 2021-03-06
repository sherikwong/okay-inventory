import { Button, Form, Layer } from 'grommet';
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

const newFieldForm: IField[] = [
  {
    name: 'name',
  },
  {
    name: 'type',
    type: EFieldType.radioGroup,
    options: transformEnumToSelectOptions(EFieldType),
  },
];

export const NewModel = () => {
  const [modelName, setModelName] = useState('');
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>([]);

  const hasOptions = (type) =>
    type === EFieldType.select || type === EFieldType.radioGroup;

  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >(
    (previous, { action, field }) => {
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
    },
    new Map([
      [
        'A',
        {
          name: 'A',
          type: EFieldType.checkbox,
          sort: 100000,
        },
      ],
      [
        'B',
        {
          name: 'B',
          type: EFieldType.checkbox,
          sort: 100000,
        },
      ],
      [
        'C',
        {
          name: 'C',
          type: EFieldType.checkbox,
          sort: 100000,
        },
      ],
      [
        'D',
        {
          name: 'D',
          type: EFieldType.text,
          sort: 100,
        },
      ],
    ])
  );

  const fieldsAsArray = Array.from(fields).map(([, value]) => value);

  const addField = ({ value }) => {
    setFields({
      action: 'add',
      field: value,
    });
  };

  const onSubmit = () => {
    modelsDB.add({
      name: modelName,
      fields: fieldsAsArray,
    });
  };

  const newModelForm: IField[] = [
    {
      name: 'Form Name',
      value: modelName,
      onChange: (value) => setModelName(value.target.value),
    },
  ];

  const onChange = (values: any) => {
    const { type, label, value, name } = values;

    setOptionsFields(hasOptions(type) ? optionsForm : []);
  };

  const onAddOption: any = ({ value }) => {
    setOptions([...options, value]);
  };

  return (
    <>
      {' '}
      <h1>New Model</h1>
      {/* <DynamicForm fields={newModelForm} /> */}
      <DynamicForm
        fields={fieldsAsArray}
        sortable={true}
        onEmitSortedFields={(fields) => console.log(fields)}
      ></DynamicForm>
      {/*
      <Layer position="bottom" modal={false} style={{ background: 'black' }}>
        <Container>
          <Form onSubmit={addField} onChange={onChange}>
            <DynamicForm fields={newFieldForm} />
            <Button type="submit" label="Add Field" />
          </Form>
        </Container>

        {options.length && (
          <Container>
            <h1>Options</h1>
            {options.map(({ value, label }) => (
              <>
                {label}: {value}
              </>
            ))}
          </Container>
        )}
        {optionsFields.length && (
          <Container>
            <Form onSubmit={onAddOption}>
              <Container>
                <DynamicForm fields={optionsFields} />
                <Button type="submit" label="Add Option" />
              </Container>
            </Form>
          </Container>
        )}
      </Layer> */}
      {/* <Button label="Save" onClick={onSubmit} /> */}
    </>
  );
};

export default {};
