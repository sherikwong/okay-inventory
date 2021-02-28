import { Form } from '../../../form/form';
import { EFieldType, IField } from '../../../../types/form/field';
import React from 'react';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';

const fields: IField[] = [
  {
    name: 'name',
    type: EFieldType.TEXT,
  },
  {
    name: 'type',
    type: EFieldType.RADIO_GROUP,
    options: transformEnumToSelectOptions(EFieldType),
  },
];

export const NewModel = () => {
  return (
    <>
      <Form fields={fields} />
    </>
  );
};

export default {};
