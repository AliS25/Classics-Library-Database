// PasswordModal.js

import React from 'react';
import Modal from 'react-modal';

const PasswordModal = ({ isOpen, onRequestClose, onPasswordSubmit, password, setPassword }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Password Modal"
    >
      <h2>Enter Password</h2>
      <input
      className='password'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onPasswordSubmit}>Submit</button>
      <button onClick={onRequestClose}>Cancel</button>

    </Modal>
  );
};

export default PasswordModal;
