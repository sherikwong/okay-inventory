import { IModel } from './../../../../models/models';
import { modelsDB } from './../../../../database/models';
import { useEffect, useState } from 'react';

export const fieldsReducer = (hasOptions, options) => (
  previous,
  { action, field }
) => {
  const shallowCopy = new Map<any, any>(previous);

  if (field) {
    switch (action) {
      case 'add':
        let _field = { ...field };

        if (hasOptions(field.type)) {
          _field = { ..._field, options };
        }

        shallowCopy.set(field.name, _field);
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
  }

  return shallowCopy;
};

export const useExistingModel = (match: any) => {
  const [model, setModel] = useState<IModel>();
  useEffect(() => {
    modelsDB.get(match.params.id).then((model) => setModel(model));
  }, [match]);
  return (model as unknown) as IModel;
};
