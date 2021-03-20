import { Box, FormField, TextInput } from 'grommet';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { titleCase } from 'voca';
import { EFieldType, Fields, IField } from '../../types/form/field';
import { fieldTypeMap } from './dynamic-form.variables';

interface IFormStyle {
  field: any;
}
interface IFormProps {
  fields: Fields;
  direction?: 'row' | 'column';
  sortable?: boolean;
  onEmitSortedFields?: (fields: IField[]) => void;
  style?: IFormStyle;
  render?: Function;
}

export const DynamicForm = ({
  fields: _fields,
  sortable,
  onEmitSortedFields: onEmitFields,
  style,
  render: Render,
}: IFormProps) => {
  const [fields, setFields] = useState<IField[]>([]);

  useEffect(() => {
    const pendingFields = (_.isArray(_fields)
      ? _fields
      : Object.values(_fields).map((value) => value)
    ).sort((a, b) => (a.sort && b.sort && (a.sort > b.sort ? 1 : -1)) || 0);

    setFields(pendingFields);
  }, [_fields]);

  const emitSortData = ({ oldIndex, newIndex }) => {
    const pendingFields = arrayMove(fields, oldIndex, newIndex).map(
      (field, i) => ({
        ...field,
        sort: i,
      })
    ) as IField[];
    setFields(pendingFields);
    if (onEmitFields) onEmitFields(pendingFields);
  };

  const Item = ({ field }) => {
    const Input = fieldTypeMap.get(field.type || EFieldType.text) || TextInput;
    const hasOptions =
      field.type === EFieldType.select || field.type === EFieldType.radioGroup;

    const selectConfig = hasOptions
      ? {
          labelKey: 'value',
          valueKey: 'label',
          options: field.options || [],
        }
      : {};

    const dateConfig =
      field.type === EFieldType.date
        ? {
            size: 'medium',
            onSelect: (val) => console.log(val),
          }
        : {};

    const fieldJSX = (
      <Box {...(style?.field || {})}>
        <FormField label={field.label} name={field.name}>
          <Input
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            required={field.required}
            {...selectConfig}
            {...dateConfig}
          />
        </FormField>
      </Box>
    );

    return fieldJSX;
  };

  const SortableItem = SortableElement(({ value: field }) =>
    Render ? (
      <Render field={field}>
        <Item field={field} />
      </Render>
    ) : (
      <Item field={field} />
    )
  );
  const SortableItems = SortableContainer(({ items }) => (
    <Box>
      {items.map((field, i) => (
        <SortableItem value={field} index={i} />
      ))}
    </Box>
  ));

  return sortable ? (
    <SortableItems items={fields} onSortEnd={emitSortData} />
  ) : (
    <Box>
      {fields.map((field, i) => (
        <Item field={field} />
      ))}
    </Box>
  );
};
