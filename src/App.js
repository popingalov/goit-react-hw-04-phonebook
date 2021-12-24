import React, { Component } from 'react';
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
    historyDelCont: [],
  };
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    const localS = JSON.parse(window.localStorage.getItem('historyDelCont'));

    localS && this.setState({ historyDelCont: localS });

    parsedContacts && this.setState({ contacts: parsedContacts });

    window.onunload = () => {
      localStorage.setItem(
        'historyDelCont',
        JSON.stringify(this.state.historyDelCont),
      );
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    };
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

  deleteContact = contactId => {
    const { historyDelCont, contacts } = this.state;
    const newContact = [];
    for (const obj of contacts) {
      if (obj.id === contactId) {
        if (historyDelCont) {
          this.setState(prevState => ({
            historyDelCont: [...prevState.historyDelCont, obj],
          }));
        }
        if (obj.id !== contactId) {
          this.setState({ historyDelCont: [obj] });
        }
      }
      if (obj.id !== contactId) {
        newContact.push(obj);
      }
    }

    this.setState({ contacts: newContact });
  };

  render() {
    const { historyDelCont, contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter
            handleChangeFilter={this.handleChangeFilter}
            filter={filter}
          />
        )}

        <ContactList
          contacts={this.filteredContact()}
          deleteContact={this.deleteContact}
        />
        {historyDelCont && <SaveDellCont contacts={historyDelCont} />}
      </div>
    );
  }
}

export default App;
