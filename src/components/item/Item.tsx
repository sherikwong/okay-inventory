/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';
import queryString from 'query-string';
import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import { itemsDB } from '../../database/items';
import Tags from '../reusable/Tags/Tags';
import './Item.scss';
import { ContrastingText, Header, HugeArrowButtons, Number } from './Item.styles';
import BouncingArrowOverlay from './Overlay/Overlay';
import useItem from '../../hooks/useItem';
import { IItem } from '../../models/items';


const Item = (props) => {
  const { match, location } = props;;

  const { details, setDetails } = useItem(match.params.id);

  const alterQty = (num, quan = details.quantity) => {

    const updatedNum = quan + num;

    const updatedDetails = {
      ...details,
      quantity: updatedNum
    };

    setDetails(updatedDetails);

    itemsDB.update(details.id, updatedDetails);
  };


  useEffect(() => {
    const queryObj = queryString.parse(location.search);

    if (queryObj && queryObj.qty) {
      alterQty(+queryObj.qty);
    }
  }, []);

  return (
    <Swipeable onSwipedDown={() => alterQty(-1)} onSwipedUp={() => alterQty(1)}>

      <Box direction="column" fill={true} align="center" justify="center">

        <Box align="center">
          <Number> {details.quantity}</Number>

          <Header className="header-wrapper">
            {(details && details.name) ? details.name.toUpperCase() : ''}
          </Header>


          <ContrastingText> {details.date && new Date(details.date).toLocaleDateString("en-US")}
          </ContrastingText>
          {/* <CalendarIcon date={details.date} /> */}

          <Tags tags={details.tags} />
        </Box>


      </Box>

      {/* {queryDirection && isLoading && <BouncingArrowOverlay direction={queryDirection} />} */}

    </Swipeable>
  );
}

export default withRouter(Item);

