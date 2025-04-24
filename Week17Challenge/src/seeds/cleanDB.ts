import { Collection, Db } from 'mongodb';
import { getDatabase } from '../config/connection.js'; // Adjust the path as needed

const cleanDB = async (): Promise<void> => {
    const db: Db = await getDatabase();
    const collection: Collection = db.collection('yourCollectionName');
    await collection.deleteMany({});
    console.log('Your collection cleaned.');

  const collections = ['users', 'thoughts']; // Add your collection names here
  try {
    const db: Db = await getDatabase();
    for (const collectionName of collections) {
      const collection: Collection = db.collection(collectionName);
      await collection.deleteMany({});
      console.log(`Collection ${collectionName} cleaned.`);
    }
    console.log('All collections cleaned successfully!');
  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
