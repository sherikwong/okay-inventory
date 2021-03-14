import { Box, Button, Collapsible, Form, TextInput } from 'grommet';
import { LinkPrevious, Save, Add } from 'grommet-icons';
import React, { Reducer, useReducer, useState } from 'react';
import { modelsDB } from '../../../../database/models';
import {
  EFieldType,
  IField,
  ISelectOption,
} from '../../../../types/form/field';
import transformEnumToSelectOptions from '../../../../utils/transformEnumToSelectOptions';
import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import { Container } from '../../../reusable/container';
import { newFieldForm, newModelForm, optionsForm } from './new-model.form';
import { IReducer } from './new-model.types';
import { fieldsReducer } from './new-model.utils';

export const NewModel = () => {
  const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [modelField, updateModelName] = useState('');
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

  const onSubmit = (values) => {
    modelsDB.add({
      // name: modelName,
      fields: fieldsAsArray,
    });
  };

  const onChange = ({ target }: any) => {
    if (target.name === 'type') {
      setOptionsFields(hasOptions(target.value) ? optionsForm : []);
    }
  };

  const onAddOption: any = ({ value }) => {
    setOptions([...options, value]);
  };

  return (
    <Box>
      <Box direction="row" margin="medium" justify="between">
        <Button icon={<LinkPrevious />} />
        <Button icon={<Save />} onClick={onSubmit} />
      </Box>

      <Box margin="large">
        <TextInput
          name="modelName"
          placeholder="Model Name"
          value={modelField}
          style={{ textAlign: 'center' }}
          required={true}
        />

        <DynamicForm
          fields={fieldsAsArray}
          sortable={true}
          style={{
            field: {
              border: { color: 'brand', size: 'small' },
              pad: 'medium',
            },
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
