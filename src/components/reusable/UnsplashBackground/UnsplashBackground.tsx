import { Stack } from 'grommet';
import React from 'react';
import { SizedUnsplash } from '../../pages/Inventory/Inventory.styles';
import BlackOverlay from '../BlackOverlay';

interface IUnsplashBackgroundProps {
  children: any;
  value?: string;
}

export const UnsplashBackground = ({
  children,
  value,
}: IUnsplashBackgroundProps) => {
  let keywords = '';

  if (value) {
    keywords = value.split(' ').join(',');
  }

  return (
    <Stack fill={true} className="item-stack" id="item">
      {value && (
        <SizedUnsplash
          keywords={keywords}
          width="1920px"
          height="1080px"
          style={{
            backgroundPosition: 'center center'
          }}
        />
      )}

      <BlackOverlay></BlackOverlay>

      {children}
    </Stack>
  );
};
