
import React, { createElement } from 'react';
import { Close } from 'grommet-icons';
import { Button } from 'grommet';
const Modal = ({ toggleModal, showModal }) => {
  return (
    <>
      {showModal && (
        <>
          {createElement(showModal)}
          <Button className="close-button" primary icon={<Close />} onClick={() => toggleModal(false)} />
        </>)}
    </>
  );
}
export default Modal;
