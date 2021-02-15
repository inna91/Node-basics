const Contacts = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      Contacts.listContacts();
      break;

    case 'get':
      Contacts.getContactById(id);
      break;

    case 'add':
      Contacts.addContact(name, email, phone);
      break;

    case 'remove':
      Contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
