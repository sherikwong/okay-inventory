import React from "react";

import { Box, Button, Text } from "grommet";

import { FormClose } from "grommet-icons";

const renderTag = (children, onRemove?) => (
  <Box
    background="status-warning"
    direction="row"
    align="center"
    round="xsmall"
    pad={{
      top: 'small',
      bottom: 'small',
      left: 'medium',
      right: 'medium'
    }}
    gap="small"
    margin="small"
  >
    <Text size="small" weight="bold"># {children}</Text>
    {onRemove && (
      <Box
        onClick={onRemove}
        background={{ color: "white", opacity: "strong" }} round="full">
        <FormClose color='brand' style={{ width: "12px", height: "12px" }} />
      </Box>
    )}
  </Box>
);

const Tag = ({ children, onRemove, ...rest }) =>
  onRemove ? (
    <Button onClick={onRemove}>{renderTag(children, onRemove)}</Button>
  ) : (
      renderTag(children, onRemove)
    );

export default Tag;
