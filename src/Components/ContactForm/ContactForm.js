import { useState } from 'react';
import styles from '../ContactListItem/ContactListItem.module.scss';
import PropTypes from 'prop-types';

function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
      return;
    }
    setNumber(value);
  };
  const resetState = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact(name, number);
    resetState();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <br />
        <input
          type="text"
          value={name}
          name="name"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Number
        <br />
        <input
          className={styles.margin}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>
      <br />
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
