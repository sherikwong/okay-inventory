import { Box, Button, Collapsible, Form, TextInput } from 'grommet';
import { Add, Close, LinkPrevious, Save } from 'grommet-icons';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { modelsDB } from '../../../../database/models';
import {
  EFieldType,
  IField,
  ISelectOption,
} from '../../../../types/form/field';
import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { Container } from '../../../reusable/container';
import NavBox from '../../../reusable/NavBox/NavBox';
import { newFieldForm, optionsForm } from './new-model.form';
import { IReducer } from './new-model.types';
import { fieldsReducer, useExistingModel } from './new-model.utils';

export const NewModel = ({ match }) => {
  const existingModel = useExistingModel(match);
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [modelName, updateModelName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

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

  const deleteField = (field) => () => {
    setFields({
      action: 'delete',
      field,
    });
  };

  const onSubmit = (values) => {
    modelsDB.add({
      name: modelName,
      fields: fieldsAsArray,
    });
  };

  const onChange = ({ target }: any) => {
    switch (target.name) {
      case 'type':
        setOptionsFields(hasOptions(target.value) ? optionsForm : []);
        break;
      case 'name':
        updateModelName(target.value);
    }
  };

  const onAddOption: any = ({ value }) => {
    setOptions([...options, value]);
  };

  useEffect(() => {
    if (existingModel) {
      setFields({ action: 'modify', field: existingModel });
    }
  }, [existingModel]);

  return (
    <Box>
      <NavBox>
        <Button icon={<Save />} onClick={onSubmit} />
      </NavBox>

      <Box margin="large">
        <TextInput
          name="modelName"
          placeholder="Model Name"
          value={modelName}
          style={{ textAlign: 'center' }}
          required={true}
        />

        <DynamicForm
          fields={fieldsAsArray}
          sortable={true}
          render={({ children, field }) => (
            <Box
              direction="row"
              border={{ color: 'brand' }}
              pad="medium"
              justify="between"
            >
              {children}
              <Button icon={<Close />} onClick={deleteField(field)} />
            </Box>
          )}
        ></DynamicForm>

        <Box margin={{ vertical: 'large' }} alignContent="center">
          <Button
            style={{ textAlign: 'center' }}
            icon={<Add />}
            size="small"
            onClick={() => setShowAddForm(!showAddForm)}
          />
        </Box>

        <Collapsible direction="vertical" open={showAddForm}>
          <Container>
            <Form onSubmit={addField} onChangeCapture={onChange}>
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
              <Container>
                <DynamicForm fields={optionsFields} />
                <Button type="submit" label="Add Option" />
              </Container>
            </Container>
          ) : null}
        </Collapsible>
      </Box>
    </Box>
  );
};

export default {};
