import { ComponentClass } from 'react';
import {
  CheckBox,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextInput,
} from 'grommet';
import { EFieldType } from '../../types/form/field';
export const fieldTypeMap = new Map<EFieldType, any>([
  [EFieldType.text, TextInput],
  [EFieldType.range, RangeInput],
  [EFieldType.checkbox, CheckBox],
  [EFieldType.select, Select],
  [EFieldType.radioGroup, RadioButtonGroup],
]);
