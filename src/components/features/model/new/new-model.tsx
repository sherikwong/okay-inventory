import { Button, Form } from 'grommet';
import React, { Reducer, useReducer, useState } from 'react';
import { modelsDB } from '../../../../database/models';
import {
  EFieldType,
  IField,
  ISelectOption,
} from '../../../../types/form/field';
import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { Container } from '../../../reusable/container';
import { newFieldForm, newModelForm, optionsForm } from './new-model.form';
import { IReducer } from './new-model.types';
import { fieldsReducer } from './new-model.utils';

export const NewModel = () => {
  const [modelName, setModelName] = useState('');
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>([]);

  const hasOptions = (type) =>
    type === EFieldType.select || type === EFieldType.radioGroup;

  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >(fieldsReducer(hasOptions, options), new Map([]));

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

  const onChange = (values: any) => {
    const { type, label, value, name } = values;

    setOptionsFields(hasOptions(type) ? optionsForm : []);
  };

  const onAddOption: any = ({ value }) => {
    setOptions([...options, value]);
  };

  return (
    <>
      <h1>New Model</h1>

      <DynamicForm fields={newModelForm(modelName, setModelName)} />

      {fields && (
        <Container>
          <DynamicForm fields={fieldsAsArray} />
        </Container>
      )}

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

      <Button label="Save" onClick={onSubmit} />
    </>
  );
};

export default {};
