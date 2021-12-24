import { Component, useEffect } from 'react';
import './App.css';
import SaveDellCont from './Components/SaveDellCont/SaveDellCont';
import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [],
    value: 0,
    filter: '',
    historyDelCont: '',
  };
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    const localS = JSON.parse(window.localStorage.getItem('historyDelCont'));
    if (localS) {
      this.setState({ historyDelCont: localS });
    }
    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = (name, number) => {
    if (this.state.contacts.find(contact => name === contact.name)) {
      alert(name + ' is already in contacts');
      return;
    }

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filteredContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  addToLocalDel = contactId => {
    for (const obj of this.state.contacts) {
      if (obj.id === contactId) {
        const localS = JSON.parse(
          window.localStorage.getItem('historyDelCont'),
        );

        if (localS) {
          localS.push(obj);
          window.localStorage.setItem('historyDelCont', JSON.stringify(localS));
          console.log(localS);
          this.setState({ historyDelCont: localS });

          return;
        }
        if (!localS) {
          this.setState({ historyDelCont: [obj] });
          window.localStorage.setItem('historyDelCont', JSON.stringify([obj]));
        }
      }
    }
  };
  deleteContact = contactId => {
    this.addToLocalDel(contactId);

    this.setState(() => {
      return {
        contacts: this.state.contacts.filter(
          contact => contact.id !== contactId,
        ),
      };
    });
  };

  render() {
    /*  const {historyDelCont, contact} = this.state */
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 1 && (
          <Filter
            handleChangeFilter={this.handleChangeFilter}
            filter={this.state.filter}
          />
        )}

        <ContactList
          contacts={this.filteredContact()}
          deleteContact={this.deleteContact}
        />
        {this.state.historyDelCont && (
          <SaveDellCont contacts={this.state.historyDelCont} />
        )}
      </div>
    );
  }
}

export default App;
