import { useEffect, useState } from 'react';
import { entriesDB } from '../database/entry';
import { IEntry } from '../models/entry';

export const useEntry = <T = IEntry>(entryID: string): T | undefined => {
  const [entry, setEntry] = useState<IEntry | undefined>();

  useEffect(() => {
    entriesDB.get(entryID).then((_entry) => {
      setEntry(_entry);
    });
  }, [entryID]);

  return entry as T | undefined;
};
