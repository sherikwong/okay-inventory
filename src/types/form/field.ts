export interface ISelectOption {
  label: string;
  value: string;
}

export class IField {
  name = '';
  type = EFieldType.TEXT;
  required? = false;
  options?: ISelectOption[];
}

export enum EFieldType {
  TEXT = 'text',
  RANGE = 'range',
  CHECKBOX = 'checkbox',
  NUMBER = 'number',
  SELECT = 'select',
  RADIO_GROUP = 'radioGroup',
}

export type Fields = IField[];
