import { useEffect, useState } from 'react';
import { modelsDB } from './../database/models';
import { IModel } from './../models/models';

export const useModel = <T = IModel>(modelID?: string): T | undefined => {
  const [model, setModel] = useState<T | undefined>();

  useEffect(() => {
    if (modelID) {
      modelsDB.get(modelID).then((_model) => {
        setModel(_model);
      });
    }
  }, [modelID]);

  return model as T | undefined;
};
