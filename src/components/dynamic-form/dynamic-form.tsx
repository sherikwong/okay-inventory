import { Box, FormField, TextInput } from 'grommet';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { titleCase } from 'voca';
import { EFieldType, Fields, IField } from '../../types/form/field';
import { fieldTypeMap } from './dynamic-form.variables';
interface IFormProps {
  fields: Fields;
  direction?: 'row' | 'column';
  renderFieldWrapper?: (field: any) => any;
  sortable?: boolean;
  onEmitSortedFields?: (fields: IField[]) => void;
}

export const DynamicForm = ({
  fields: _fields,
  renderFieldWrapper,
  sortable,
  onEmitSortedFields: onEmitFields,
}: IFormProps) => {
  const [fields, setFields] = useState<IField[]>([]);

  useEffect(() => {
    const pendingFields = (isArray(_fields)
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
      field.type === EFieldType.select || field.type == EFieldType.radioGroup;

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

    return fieldJSX;
  };

  const SortableItem = SortableElement(({ value }) => <Item field={value} />);
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
