import { IField, EFieldType } from '../../../../types/form/field';
import { transformEnumToSelectOptions } from '../../../../utils/transformEnumToSelectOptions';

export const optionsForm = [
  {
    name: 'label',
  },
  {
    name: 'value',
  },
];

export const newFieldForm: IField[] = [
  {
    name: 'name',
  },
  {
    name: 'type',
    type: EFieldType.radioGroup,
    options: transformEnumToSelectOptions(EFieldType),
  },
];

export const newModelForm = (modelName: any, setModelName: any): IField[] => [
  {
    name: 'Form Name',
    value: modelName,
    onChange: (value) => setModelName(value.target.value),
  },
];
