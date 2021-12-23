import React from 'react';
import styles from './ContactListItem.module.scss';
import PropTypes from 'prop-types';

const ContactListItem = ({ el, delCont }) => (
  <li className={styles.listItem}>
    {el.name}: {el.number}
    {delCont && (
      <button
        className={styles.btn}
        onClick={() => {
          delCont(el.id);
        }}
      >
        Delete
      </button>
    )}
  </li>
);

ContactListItem.propTypes = {
  el: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),

  delCont: PropTypes.func,
};

export default ContactListItem;
