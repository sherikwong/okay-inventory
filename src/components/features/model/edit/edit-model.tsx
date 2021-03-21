import { Box, Button } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { modelsDB } from '../../../../database/models';
import {
  EFieldType,
  IField,
  ISelectOption
} from '../../../../types/form/field';
import { DynamicForm } from '../../../dynamic-form/dynamic-form';
import NavBox from '../../../reusable/NavBox/NavBox';
import { AddFieldForm } from './components/add-field-form';
import { AddOptionForm } from './components/add-option-form';
import { EditModelNameForm } from './components/edit-model-name';
import { IReducer } from './edit-model.types';
import { fieldsReducer, useExistingModel } from './edit-model.utils';

export const EditModel = ({ match }) => {
  const id = match.params.id;
  const existingModel = useExistingModel(match);
  // const [optionsFields, setOptionsFields] = useState<IField[]>([]);
  const [options] = useState<ISelectOption[]>([]);
  const [modelName, setModelName] = useState('');

  const hasOptions = (type) =>
    type === EFieldType.select || type === EFieldType.radioGroup;

  const [fields, setFields] = useReducer<
    Reducer<Map<string, IField>, IReducer>
  >(fieldsReducer(hasOptions, options) as any, new Map([]));

  const fieldsAsObject = Object.fromEntries(fields);

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
      fields: fieldsAsObject,
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

  const onAddOption: any = (name: string) => ({ value }) => {
    const oldOptions = fields.get(name)?.options || [];
    setFields({
      action: 'modify',
      field: { name, options: [...oldOptions, value] },
    });
  };

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
        <EditModelNameForm modelName={modelName} setModelName={setModelName} />

        {/* Existing Fields */}
        <DynamicForm
          fields={fieldsAsObject}
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
                  {hasOptions(field.type) ? (
                    <AddOptionForm onSubmit={onAddOption(field.name)} />
                  ) : null}
                </Box>
                <Button icon={<Close />} onClick={deleteField(field)} />
              </Box>
            );
          }}
        ></DynamicForm>

        {/* New Field Form */}
        <AddFieldForm onSubmit={addField} />
      </Box>
    </Box>
  );
};

export default {};
