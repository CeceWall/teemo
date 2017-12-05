/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './Deletable.scss';

function Deletable(props) {
  const { children, onDelete } = props;
  return (
    <div className="deletable-wrapper">
      <div className="deletable-content">
        {children}
      </div>
      <div
        role="button"
        tabIndex="0"
        className="deletable-close"
        onClick={onDelete}
      >
        <i className="fa fa-times fa-lg" aria-hidden="true" />
      </div>
    </div>
  );
}

Deletable.propTypes = {
  children: PropTypes.element.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Deletable;
