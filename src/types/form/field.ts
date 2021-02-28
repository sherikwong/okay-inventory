export interface ISelectOption {
  label: string;
  value: string;
}

export class IField {
  name = '';
  type = EFieldType.TEXT;
  required? = false;
  options?: ISelectOption[];
  order?: number;
  value?: any;
  onChange?: any;
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
