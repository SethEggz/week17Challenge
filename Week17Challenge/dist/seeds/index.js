import { Thought } from '../models/index.js';
import Users from '../models/Users.js';
import cleanDB from './cleanDB.js';
import { getRandomThoughts, getRandomUser } from './data'; // Adjusted to match TypeScript module resolution
import { getDatabase, getClient } from '../config/connection.js'; // Adjust the path as needed
const seedDB = async () => {
    await getDatabase(); // Get the database instance
    const client = getClient(); // Get the MongoDB client instance
    try {
        await cleanDB(); // Clean the database before seeding
        const users = getRandomUser();
        for (const user of users) {
            await Users.create(user);
        }
        await Thought.create(getRandomThoughts(10));
        console.log('Database seeded!');
    }
    catch (err) {
        console.error('Error seeding database:', err);
    }
    finally {
        await client.close(); // Close connection regardless of success/failure
    }
};
seedDB()
    .then(() => {
    console.log('Seeding complete!');
    process.exit(0);
})
    .catch((err) => {
    console.error('Error during seeding:', err);
    process.exit(1);
});
