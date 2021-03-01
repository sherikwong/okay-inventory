import { EFieldType, IField } from '../../types/form/field';
import { fieldTypeMap } from './dynamic-form.variables';
import React from 'react';
import { titleCase } from 'voca';
import { Box, FormField, TextInput } from 'grommet';

interface IFormProps {
  fields: IField[];
  direction?: 'row' | 'column';
}

export const DynamicForm = ({ fields }: IFormProps) => {
  return (
    <Box>
      {fields?.map((field) => {
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
            <Input value={field.value} {...selectConfig} options={options} name={field.name}/>
          </FormField>
        );
      })}
    </Box>
  );
};
