import { EFieldType, IField } from '../../types/form/field';
import { fieldTypeMap } from './form.variables';
import React from 'react';
import { titleCase } from 'voca';
import { FormField } from 'grommet';

interface IFormProps {
  fields: IField[];
}

export const Form = ({ fields }: IFormProps) => {
  return (
    <>
      {fields?.map((field) => {
        const Input = fieldTypeMap.get(field.type);
        const selectConfig =
          field.type === EFieldType.SELECT ||
          field.type == EFieldType.RADIO_GROUP
            ? {
                labelKey: 'value',
                valueKey: 'label',
              }
            : {};

        return (
          <FormField label={titleCase(field.name)}>
            <Input {...field} {...selectConfig} />
          </FormField>
        );
      })}
    </>
  );
};
