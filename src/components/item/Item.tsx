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


const Item = (props) => {
  const { details, onUpdate, match, location } = props;;
  const [quantity, setQty] = useState(0);
  const [queryDirection, setQueryDirection] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const alterQty = useCallback((num, quan = quantity) => {
    setLoading(true);

    const updatedNum = quan + num;
    console.log('Updated', quan, num, updatedNum);
    setQty(updatedNum);


    itemsDB.update(details.id, {
      ...details,
      quantity: updatedNum
    }).then(() => {
      setLoading(false);
    });
  }, [details, quantity])


  useEffect(() => {
    console.log('Details', details.quantity);
    setQty(details.quantity || 0);

    const queryObj = queryString.parse(location.search);

    if (queryObj && queryObj.qty) {
      setLoading(true)
      setQueryDirection(+queryObj.qty);
    }
  }, [details, location]);

  useEffect(() => {
    console.log('Both change', queryDirection, details.quantity);
    if (details.id) {
      alterQty(queryDirection, details.quantity);
    }
  }, [queryDirection, details, alterQty])

  return (
    <Swipeable onSwipedDown={() => alterQty(-1)} onSwipedUp={() => alterQty(1)}>
      <Box direction="column" fill={true} align="center" justify="between">

        <HugeArrowButtons secondary size="large" icon={<Up />} onClick={() => alterQty(1)} />

        <Box align="center">
          <Number> {quantity}</Number>

          <Header className="header-wrapper">
            {(details && details.name) ? details.name.toUpperCase() : ''}
          </Header>


          <ContrastingText> {details.date && new Date(details.date).toLocaleDateString("en-US")}
          </ContrastingText>
          {/* <CalendarIcon date={details.date} /> */}

          <Tags tags={details.tags} />
        </Box>

        <HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => alterQty(-1)} />

      </Box>


      {queryDirection && isLoading && <BouncingArrowOverlay direction={queryDirection} />}


    </Swipeable>
  );
}

export default withRouter(Item);

