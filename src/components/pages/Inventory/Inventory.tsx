import { Box } from 'grommet';
import queryString from 'query-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CalendarIcon from "react-calendar-icon";
import { Swipeable } from 'react-swipeable';
import ReactToPrint from 'react-to-print';
import { entriesDB } from '../../../database/entry';
import { useEntry } from '../../../hooks/useEntry';
import { IFood } from '../../../models/food';
import { PrintableQRCode } from './components/QRCode';
import { ContrastingText, Header, Number } from './Inventory.styles';

export const Inventory = ({ match, location }) => {
  const entry = useEntry<IFood>(match.params.id) || ({} as IFood);
  const { name, date, quantity, type, id } = entry;
  const queryObj = queryString.parse(location.search);
  const [updatedQuantity, setUpdatedQuantity] = useState<number | undefined>(
    undefined
  );
    const [isQROpen, setIsQROpen] = useState(false);
  useEffect(() => {
    if (updatedQuantity === undefined && quantity >= 0) {
      setUpdatedQuantity(quantity);
    }
  }, [quantity, updatedQuantity]);

  const alterQty = useCallback(
    (num, quan = quantity) => {
      const sanitizedQuantity = isNaN(+quan) ? 0 : +quan;

      const updatedNum = sanitizedQuantity + +num;

      const updatedDetails = {
        ...entry,
        quantity: updatedNum,
      };

      setUpdatedQuantity(updatedNum);

      entriesDB
        .update(id, updatedDetails)
        .then((res) => console.log('Quantity altered.'));
    },
    [entry, id, quantity]
  );

  useEffect(() => {
    if (name) {
      if (queryObj && queryObj.qty) {
        // Hack for 1/2 b/c rendering twice
        alterQty(+queryObj.qty / 2);
      }
    }
  }, [name, queryObj, queryObj.qty, alterQty]);

  const openQRCode = () => {
    setIsQROpen(true);
  }

  const qrRef = useRef<any>();
return (
    <>
      {/* <UnsplashBackground value={type}> */}
        <Swipeable
          onSwipedDown={() => alterQty(-1)}
          onSwipedUp={() => alterQty(1)}
          style={{ height: '100%' }}
        >
          <Box
            align="center"
            fill={true}
            justify="between"
            style={{ height: '100%' }}
          >
             <Number> {Math.round(updatedQuantity || 0)}</Number>

            <Box direction="row" justify="between" align="center" style={{transform: 'scale(.8)', width: '100%'}}>


             <CalendarIcon date={date || new Date()} />


            <ReactToPrint
        trigger={() => <PrintableQRCode ref={qrRef} id={match.params.id}/>}
        content={() => qrRef.current}
      />


            </Box>

            <Header className="header-wrapper">{name}</Header>

            <ContrastingText>
              {date && new Date(date).toLocaleDateString('en-US')}
            </ContrastingText>

            {/* <Tags tags={tags} /> */}
            {/* </Box> */}

            {/* {queryObj && queryObj.qty && (
          <BouncingArrowOverlay
            direction="down"
            className="animate__animated animate__fadeOut animate__slower"
          />
        )} */}
          </Box>
        </Swipeable>
      {/* </UnsplashBackground> */}

    </>
  );
};
