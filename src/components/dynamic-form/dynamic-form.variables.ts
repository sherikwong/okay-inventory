import {
  Calendar,
  CheckBox,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextInput,
} from 'grommet';
import { EFieldType } from '../../types/form/field';
import { TagsInput } from './components/Tags/Tags';
export const fieldTypeMap = new Map<EFieldType, any>([
  [EFieldType.text, TextInput],
  [EFieldType.range, RangeInput],
  [EFieldType.checkbox, CheckBox],
  [EFieldType.select, Select],
  [EFieldType.radioGroup, RadioButtonGroup],
  [EFieldType.date, Calendar],
  [EFieldType.tags, TagsInput]
]);
