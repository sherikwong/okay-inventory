export const fieldsReducer = (hasOptions, options) => (
  previous,
  { action, field }
) => {
  const shallowCopy = new Map<any, any>(previous);

  switch (action) {
    case 'add':
      let _field = { ...field };

      if (hasOptions(field.type)) {
        _field = { ..._field, options };
      }

      shallowCopy.set(field.name, _field);
      // setOptions([]);
      break;
    case 'delete':
      shallowCopy.delete(field.name);
      break;
    case 'modify':
      const gottenField = shallowCopy.get(field.name);
      shallowCopy.set(field.name, {
        ...gottenField,
        ...field,
      });
  }

  return shallowCopy;
};
