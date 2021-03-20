import { Box } from 'grommet';
import React from 'react';
import { Swipeable } from 'react-swipeable';
import { useEntry } from '../../../hooks/useEntry';
import { IFood } from '../../../models/food';
import BouncingArrowOverlay from '../../item/Overlay/Overlay';
import NavBox from '../../reusable/NavBox/NavBox';
import Tags from '../../reusable/Tags/Tags';
import { UnsplashBackground } from '../../reusable/UnsplashBackground/UnsplashBackground';
import {
  ContrastingText,
  Header,
  Number,
  SizedUnsplash,
} from './Inventory.styles';

export const Inventory = ({ match }) => {
  const { name, date, quantity } =
    useEntry<IFood>(match.params.id) || ({} as IFood);

  const alterQty = (num, quan = quantity) => {
    // const sanitizedQuantity = isNaN(+quan) ? 0 : +quan;
    // const updatedNum = sanitizedQuantity + +num;
    // const updatedDetails = {
    //   ...details,
    //   quantity: updatedNum,
    // };
    // setDetails(updatedDetails);
    // itemsDB.update(id, updatedDetails);
  };

  return (
    <>
      <UnsplashBackground value={name}>
        <NavBox></NavBox>
        <Swipeable
          onSwipedDown={() => alterQty(-1)}
          onSwipedUp={() => alterQty(1)}
        >
          <Box direction="column" fill={true} align="center" justify="center">
            <Box align="center">
              <Number> {quantity}</Number>

              <Header className="header-wrapper">{name}</Header>

              <ContrastingText>
                {date && new Date(date).toLocaleDateString('en-US')}
              </ContrastingText>
              {/* <CalendarIcon date={date} /> */}

              {/* <Tags tags={tags} /> */}
            </Box>
          </Box>

          {/* {queryObj && queryObj.qty && (
          <BouncingArrowOverlay
            direction="down"
            className="animate__animated animate__fadeOut animate__slower"
          />
        )} */}
        </Swipeable>
      </UnsplashBackground>
    </>
  );
};
