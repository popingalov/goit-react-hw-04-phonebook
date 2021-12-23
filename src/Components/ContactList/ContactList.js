import React from 'react';
import ContactListItem from '../ContactListItem/ContactListItem';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => (
  <section>
    <ul>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          el={contact}
          delCont={deleteContact}
        />
      ))}
    </ul>
  </section>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ),
  deleteContact: PropTypes.func.isRequired,
};
