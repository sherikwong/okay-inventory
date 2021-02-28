import { ComponentClass } from 'react';
import {
  CheckBox,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextInput,
} from 'grommet';
import { EFieldType } from './../../types/form/field';
export const fieldTypeMap = new Map<EFieldType, any>([
  [EFieldType.TEXT, TextInput],
  [EFieldType.RANGE, RangeInput],
  [EFieldType.CHECKBOX, CheckBox],
  [EFieldType.SELECT, Select],
  [EFieldType.RADIO_GROUP, RadioButtonGroup],
]);
