/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from 'grommet';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Swipeable } from 'react-swipeable';
import { itemsDB } from '../../database/items';
import useItem from '../../hooks/useItem';
import Tags from '../reusable/Tags/Tags';
import './Item.scss';
import { ContrastingText, Header, Number } from './Item.styles';
import BouncingArrowOverlay from './Overlay/Overlay';


const Item = (props) => {
  const { match, location } = props;
  const queryObj = queryString.parse(location.search);

  const { details, setDetails } = useItem(match.params.id);
  const [hasInitialized, setInitialized] = useState(false);

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
    if (!hasInitialized && details.name) {
      if (queryObj && queryObj.qty) {
        setInitialized(true);
        alterQty(+queryObj.qty);
      }

    }
  }, [details, hasInitialized]);

  return details.name ? (
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

      {queryObj && queryObj.qty && <BouncingArrowOverlay direction="down" className="animate__animated animate__fadeOut animate__slower" />}

    </Swipeable>
  ) : (<></>);
}

export default withRouter(Item);

