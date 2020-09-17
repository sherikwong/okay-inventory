import React, { useEffect, useState } from 'react';
import { HugeArrowButtons, Header, QrCodeWrapper, DummyQRCode } from './Item.styles';
import { Box } from 'grommet';
import { Down, Up } from 'grommet-icons';
import { QrCode } from 'qrcode.react';
import { withRouter } from 'react-router-dom';

const Item = (props) => {
  const details = props.details;

  return (
    <Box direction="column" fill={true} align="center" justify="between">
      <Header className="header-wrapper">
        {(details && details.name) ? details.name.toUpperCase() : ''}
      </Header>
    </Box>
  );

  // return (
  //     <HugeArrowButtons secondary size="large" icon={<Up />} onClick={() => { }} />
  //     <Box align="center">
  //       {/* <Number> {num}</Number> */}

  //       <Header className="header-wrapper">
  //         {(details && details.name) ? details.name.toUpperCase() : ''}
  //       </Header>
  //       {details.date && details.date.toLocaleDateString && details.date.toLocaleDateString("en-US")}



  //       {/* {renderTags([...details.tags])} */}
  //     </Box>

  //     <Box direction="row" justify="between" fill="horizontal" pad="medium">
  //       <QrCodeWrapper>
  //         <QrCode bgColor="transparent" value={details.id} size={50} />
  //       </QrCodeWrapper>
  //       <HugeArrowButtons secondary size="large" icon={<Down />} onClick={() => { }} />
  //       <DummyQRCode> </DummyQRCode>
  //     </Box>
  //   </Box>
  // );
}



export default withRouter(Item);
// import { Box, Stack } from 'grommet';
// import { Down, Edit, Menu, Up } from 'grommet-icons';
// import QrCode from 'qrcode.react';
// import { withRouter, Router, Route } from 'react-router-dom';
// import { itemsDB } from '../../../database/items';


// const Item = ({ match, history }) => {
//   // const id = match.params.id;
//   const [num, setNum] = useState(0);


//   const onUpdateQty = direction => () => {
//     setNum(direction > 0 ? num + 1 : num > 0 ? num - 1 : num);

//     itemsDB.update(id, {
//       ...details as IItem,
//       quantity: num
//     })
//   }

//   const navToEdit = () => {
//     history.push(`/item/${id}/edit`);
//   }

//   // const imageTags = [...details.name.split(' '), ...details.tags].join(',');
//   const imageTags = [...details.name.split(' ')].join(',');

//   return (
//     {/*
//     <OverlayLoaderContext.Consumer>
//       {
//         ({ loadOverlay, setLoadOverlay }) => {
//           return (
//             <Swipeable onSwipedUp={onUpdateQty(1)} onSwipedDown={onUpdateQty(-1)} onSwipedRight={navToEdit}>
//               <Stack fill={true} className="item-stack" id="item">

//                 {details.name && <SizedUnsplash keywords={imageTags} width={window.screen.width} height={window.screen.height} style={{ backgroundPosition: 'center center' }} />}

//                 <BlackOverlay fill={true}></BlackOverlay>

//                 <Box align="center" fill={true} justify="between">
//                   <Box direction="row" justify="between" pad="medium" fill="horizontal">
//                     <ContrastingButton secondary icon={<Menu />} onClick={() => history.push('/')} />
//                     <ContrastingButton secondary icon={<Edit />} onClick={navToEdit} />
//                   </Box>




//                   <Router history={history}>
//                     <Route component={Name} />

//                   </Router>



//                   <Box direction="column" fill={true} align="center" justify="between">
//                     <HugeArrowButtons secondary size="large" icon={<Up />} onClick={onUpdateQty(1)} />
//                     <Box align="center">
//                       <Number> {num}</Number>

//                       <Header className="header-wrapper">
//                         {details.name.toUpperCase()}
//                       </Header>
//                       {details.date && details.date.toLocaleDateString && details.date.toLocaleDateString("en-US")}



//                       {renderTags([...details.tags])}
//                     </Box>

//                     <Box direction="row" justify="between" fill="horizontal" pad="medium">
//                       <QrCodeWrapper>
//                         <QrCode bgColor="transparent" value={id} size={50} />
//                       </QrCodeWrapper>
//                       <HugeArrowButtons secondary size="large" icon={<Down />} onClick={onUpdateQty(-1)} />
//                       <DummyQRCode> </DummyQRCode>
//                     </Box>
//                   </Box>




//                 </Box>
//               </Stack>
//             </Swipeable>
//           )
//         }
//       }

//     </OverlayLoaderContext.Consumer >
//     */}
//     <></>
//   );
// }
// export default withRouter(Item);


