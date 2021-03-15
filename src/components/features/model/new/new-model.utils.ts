import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { IField } from '../../../../types/form/field';
import { modelsDB } from './../../../../database/models';
import { IModel } from './../../../../models/models';

export const fieldsReducer = (hasOptions, options) => (
  previous,
  { action, field, fields }
) => {
  let shallowCopy = new Map<any, any>(previous);

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

  if (fields) {
    switch (action) {
      case 'overwrite':
        if (fields) {
          const fieldsToArray = _.isObject(fields)
            ? Object.values(fields)
            : fields;
          const innerMap = fieldsToArray.map((field) => [field.name, field]);
          shallowCopy = new Map(innerMap || []);
        }
        break;
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
