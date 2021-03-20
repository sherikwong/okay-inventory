import { Header } from 'grommet';
import React from 'react';
import { useEntry } from '../../../hooks/useEntry';
import { useModel } from '../../../hooks/useModel';
import { IFood } from '../../../models/food';
import { IItem } from '../../../models/items';
import { IModel } from '../../../models/models';
import Item from '../../item/Item';
import NavBox from '../../reusable/NavBox/NavBox';

export const Inventory = ({ match }) => {
  const entry = useEntry(match.params.id);
  const { fields } = useModel<IModel>(entry?.modelID) || {};
  // const { name, proteinType, date, quantity } = (fields as IFood) || {};

  return (
    <>
      <NavBox></NavBox>

      {/* <Header className="header-wrapper">{name}</Header> */}
    </>
  );
};
