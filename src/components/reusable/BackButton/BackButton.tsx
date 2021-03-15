import { Button } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import React from 'react';
import { withRouter } from 'react-router-dom';
const BackButton = ({ history }) => {
  return (
    <>
      <Button icon={<LinkPrevious />} onClick={() => history.goBack()} />
    </>
  );
};

export default withRouter(BackButton);
