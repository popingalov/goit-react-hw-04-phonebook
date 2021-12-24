import { useState } from 'react';
import styles from '../ContactListItem/ContactListItem.module.scss';

export default function ContactForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };
  const restState = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    onAddContact(name, number);
    restState();
  };

  /*  const { name, number } = this.state; */

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

/* class OldContactForm extends Component {
  state = {
    name: '',
    number: '',
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
} */
/* static propType = {
    onAddContact: PropTypes.func.isRequired,
  }; */
