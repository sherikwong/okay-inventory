import React from 'react';
import { Grid, Box, Stack, Heading, Menu } from 'grommet';
import './List.scss';

import Unsplash from 'react-unsplash-wrapper';
import { createContext } from 'react';

const items = [
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },
  { name: 'Brocolli', quantity: 10, component: Unsplash },

];

const List = () => {
  return (
    <Box fill={true} direction="column" className="overflow-container">
      < Box fill={true} className="items" >
        {
          items.map(item => (<Box className="item">
            <Stack fill={true}>
              {React.createElement(item.component)}
              <Box fill={true} direction="row" align="end" justify="between" pad="small">
                {item.name}

                <Heading>{item.quantity}</Heading>
              </Box>
            </Stack>
          </Box>))
        }
      </Box >
    </Box >

  )
};

export default List;
