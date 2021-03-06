import { Box, FormField, TextInput } from 'grommet';
import { isArray } from 'lodash';
import React from 'react';
import Draggable from 'react-draggable';
import { titleCase } from 'voca';
import { EFieldType, Fields, IField } from '../../types/form/field';
import { fieldTypeMap } from './dynamic-form.variables';
interface IFormProps {
  fields: Fields;
  direction?: 'row' | 'column';
  renderFieldWrapper?: (field: any) => any;
  draggable?: boolean;
}

export const DynamicForm = ({
  fields: _fields,
  renderFieldWrapper,
  draggable,
}: IFormProps) => {
  const fields = isArray(_fields)
    ? _fields
    : Object.entries(_fields)
        .sort(([keyA], [keyB]) => (+keyA > +keyB ? 1 : -1 || 0))
        .map(([key, value]) => value);
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

        const options = hasOptions ? field.options : undefined;

        const fieldJSX = (
          <FormField label={titleCase(field.name)}>
            <Input
              value={field.value}
              {...selectConfig}
              options={options}
              name={field.name}
            />
          </FormField>
        );

        const dragWrapper = (children) => (
          <Draggable
            axis="y"
            grid={[25, 25]}
            scale={1}
            onStart={(val) => console.log(val)}
          >
            {children}
          </Draggable>
        );

        const wrapped = renderFieldWrapper?.(fieldJSX);
        const draggableEvaluated =
          draggable && dragWrapper(wrapped || fieldJSX);

        return draggableEvaluated || fieldJSX;
      })}
    </Box>
  );
};
