export interface ISelectOption {
  label: string;
  value: string;
}

export class IField {
  name = '';
  type? = EFieldType.text;
  required? = false;
  options?: ISelectOption[];
  order?: number;
  value?: any;
  onChange?: any;
}

export enum EFieldType {
  text = 'text',
  range = 'range',
  checkbox = 'checkbox',
  number = 'number',
  select = 'select',
  radioGroup = 'radioGroup',
}

export type Fields = IField[];
