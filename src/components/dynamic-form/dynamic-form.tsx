import { EFieldType, Fields, IField } from '../../types/form/field';
import { fieldTypeMap } from './dynamic-form.variables';
import React from 'react';
import { titleCase } from 'voca';
import { Box, FormField, TextInput } from 'grommet';
import { isArray } from 'lodash';
interface IFormProps {
  fields: Fields;
  direction?: 'row' | 'column';
}

export const DynamicForm = ({ fields: _fields }: IFormProps) => {
  const fields = isArray(_fields)
    ? _fields
    : Object.entries(_fields).sort(([keyA], [keyB]) =>
        +keyA > +keyB ? 1 : -1 || 0
      );
  return (
    <Box>
      {(fields as IField[])?.map((field) => {
        const Input =
          fieldTypeMap.get(field.type || EFieldType.text) || TextInput;
        const hasOptions =
          field.type === EFieldType.select ||
          field.type == EFieldType.radioGroup;

        const selectConfig = hasOptions
          ? {
              labelKey: 'value',
              valueKey: 'label',
            }
          : {};

        const options = hasOptions ? field.options || ['hello'] : undefined;

        return (
          <FormField label={titleCase(field.name)}>
            <Input
              value={field.value}
              {...selectConfig}
              options={options}
              name={field.name}
            />
          </FormField>
        );
      })}
    </Box>
  );
};
