/* historyDelCont; */
import ContactListItem from '../ContactListItem/ContactListItem';
const SaveDellCont = ({ contacts }) => (
  <>
    <h2>Dell Contact</h2>
    <ul>
      {contacts.map(contact => (
        <ContactListItem key={contact.id} el={contact} />
      ))}
    </ul>
  </>
);
export default SaveDellCont;
