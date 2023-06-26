const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://user002:<user002>@cluster0.bd2joly.mongodb.net/';
const client = new MongoClient(uri);
async function performTasks() {
  try {
    await client.connect();
    const db = client.db('contact');
    const collection = db.collection('contactlist');
    await collection.insertMany([
      {
        lastName: 'Ben Lahmer',
        firstName: 'Fares',
        email: 'fares@gmail.com',
        age: 26
      },
      {
        lastName: 'Kefi',
        firstName: 'Seif',
        email: 'kefi@gmail.com',
        age: 15
      },
      {
        lastName: 'Fatnassi',
        firstName: 'Sarra',
        email: 'sarra.f@gmail.com',
        age: 40
      },
      {
        lastName: 'Ben Yahia',
        firstName: 'Rym',
        age: 4
      },
      {
        lastName: 'Cherif',
        firstName: 'Sami',
        age: 3
      }
    ]);

    // Display all the contacts
    const allContacts = await collection.find({}).toArray();
    console.log('All Contacts:');
    console.log(allContacts);

    // Display information about a single person using their ID
    const person = await collection.findOne({ _id: personId });
    console.log('Person:');
    console.log(person);

    // Display contacts with an age > 18
    const adults = await collection.find({ age: { $gt: 18 } }).toArray();
    console.log('Adult Contacts:');
    console.log(adults);

    // Display contacts with age > 18 with ah in the name
    const filteredContacts = await collection.find({ age: { $gt: 18 }, firstName: { $regex: 'ah' } }).toArray();
    console.log('Filtered Contacts:');
    console.log(filteredContacts);

    // Change  name from "Kefi Seif" to "Kefi Anis"
    await collection.updateOne({ firstName: 'Seif' }, { $set: { firstName: 'Anis' } });
    await collection.deleteMany({ age: { $lt: 5 } });
    const updatedContacts = await collection.find({}).toArray();
    console.log('Updated Contacts:');
    console.log(updatedContacts);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}
performTasks();
