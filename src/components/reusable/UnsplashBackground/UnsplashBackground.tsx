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
          width={window.screen.width}
          height={window.screen.height}
          style={{
            backgroundPosition: 'center center',
            width: '100vw',
            height: '100vh',
          }}
        />
      )}

      <BlackOverlay></BlackOverlay>

      {children}
    </Stack>
  );
};
