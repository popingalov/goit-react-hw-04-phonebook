import React, { Component } from 'react';
import styles from '../ContactListItem/ContactListItem.module.scss';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  static propType = {
    onAddContact: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onAddContact(this.state.name, this.state.number);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <br />
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.handleChange}
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
            onChange={this.handleChange}
          />
        </label>
        <br />
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
