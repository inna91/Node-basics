const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join('./db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    console.table(parsedContacts);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async contactId => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);
    const contactById = parsedContacts.find(
      contact => contact.id === contactId,
    );

    if (!contactById) {
      console.log(`Such contact with id: ${contactId} is not found`);
    }

    console.table(contactById);
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async contactId => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data.toString());
    const contacts = parsedContacts.filter(contact => contact.id !== contactId);

    if (parsedContacts.length === contacts.length) {
      console.log(`Such contact with id: ${contactId} is not found`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(`Contact with id: ${contactId} was deleted`);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);

    const contactId = parsedContacts[parsedContacts.length - 1].id + 1;
    const newContact = { contactId, name, email, phone };
    parsedContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
