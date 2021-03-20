import { match } from 'assert';
import { useState, useEffect } from 'react';
import { entriesDB } from '../database/entry';
import { modelsDB } from '../database/models';
import { IEntry } from '../models/entry';

export const useEntry = (entryID: string) => {
  const [entry, setEntry] = useState<IEntry | undefined>();

  useEffect(() => {
    entriesDB.get(entryID).then((_entry) => {
      setEntry(_entry);
    });
  }, [entryID]);

  return entry;
};
