import { titleCase } from 'voca';

export const transformEnumToSelectOptions = (itemToParse: {
  [key: string]: string;
}) => {
  return Object.entries(itemToParse).map(([key, value]) => ({
    label: titleCase(value),
    value: value.toLowerCase(),
  }));
};

export default {};
