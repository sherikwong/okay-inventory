import React from 'react';
import { useEntry } from '../../../hooks/useEntry';
import NavBox from '../../reusable/NavBox/NavBox';

export const Inventory = ({ match }) => {
  const entry = useEntry(match.params.id);
  return (
    <>
      <NavBox></NavBox>
    </>
  );
};
