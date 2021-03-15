import { Box, Button, Collapsible, Form, TextInput } from 'grommet';
import { Add, Checkmark, Close } from 'grommet-icons';
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
import { newFieldForm, optionsForm } from './edit-model.variables';
import { IReducer } from './edit-model.types';
import { fieldsReducer, useExistingModel } from './edit-model.utils';

export const EditModel = ({ match }) => {
  const id = match.params.id;
  const existingModel = useExistingModel(match);
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  // const [options, setOptions] = useState<ISelectOption[]>([]);
  const [options] = useState<ISelectOption[]>([]);
  const [modelName, setModelName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [fieldFormValues, setFieldFormValues] = useState();

  const hasOptions = (type) =>
    type === EFieldType.select || type === EFieldType.radioGroup;

  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >(fieldsReducer(hasOptions, options) as any, new Map([]));

  const fieldsAsArray = Array.from(fields).map(([, value]) => value);

  const addField = ({ value }) => {
    setFields({
      action: 'add',
      field: value,
    });
  };

  const deleteField = (field) => ($event) => {
    setFields({
      action: 'delete',
      field: { name: field.name },
    });

    $event.stopPropagation();
  };

  const onSubmit = (values) => {
    const pending = {
      name: modelName,
      fields: fieldsAsArray,
    };
    if (id) {
      modelsDB.update(id, {
        ...existingModel,
        ...pending,
      });
    } else {
      modelsDB.add(pending);
    }
  };

  const onAddOption: any = (name) => ({ value }) => {
    const oldOptions = fields.get(name)?.options || [];
    setFields({
      action: 'modify',
      field: { name, options: [...oldOptions, value] },
    });
  };

  const addOptionsForm = (name: string) => (
    <Container>
      <Form onSubmit={onAddOption(name)}>
        <DynamicForm fields={optionsForm} />
        <Button type="submit" icon={<Add />} />
      </Form>
    </Container>
  );

  useEffect(() => {
    if (existingModel) {
      setFields({ action: 'overwrite', fields: existingModel.fields });
      setModelName(existingModel.name);
    }
  }, [existingModel]);

  return (
    <Box>
      <NavBox>
        <Button icon={<Checkmark />} onClick={onSubmit} />
      </NavBox>

      <Box margin="large">
        {/* Name Form */}
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

        {/* Existing Fields */}
        <DynamicForm
          fields={fieldsAsArray}
          sortable={true}
          render={({ children, field }) => {
            return (
              <Box
                background="black"
                direction="row"
                border={{ color: 'brand' }}
                pad="medium"
                justify="between"
              >
                <Box>
                  {children}
                  {hasOptions(field.type) ? addOptionsForm(field.name) : null}
                </Box>
                <Button icon={<Close />} onClick={deleteField(field)} />
              </Box>
            );
          }}
        ></DynamicForm>

        <Box margin={{ vertical: 'large' }} alignContent="center">
          <Button
            style={{ textAlign: 'center' }}
            icon={<Add />}
            size="small"
            onClick={() => setShowAddForm(!showAddForm)}
          />
        </Box>

        {/* New Field Form */}
        <Collapsible direction="vertical" open={showAddForm}>
          <Container>
            <Form onSubmit={addField}>
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
        </Collapsible>
      </Box>
    </Box>
  );
};

export default {};
