export interface ISelectOption {
  label: string;
  value: string;
}

export enum EFieldType {
  text = 'text',
  range = 'range',
  checkbox = 'checkbox',
  number = 'number',
  select = 'select',
  radioGroup = 'radioGroup',
  date = 'date',
}

export class IField {
  name = '';
  type? = EFieldType.text;
  required? = false;
  options?: ISelectOption[];
  order?: number;
  value?: any;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  label?: string;
  sort?: number;
}

export type Fields = { [key: string]: IField } | IField[];
