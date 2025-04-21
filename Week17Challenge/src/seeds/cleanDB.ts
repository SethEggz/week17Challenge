import {  } from '../.js';

const cleanDB = async (): Promise<void> => {
  try {
    await .deleteMany({});
    console.log(' collection cleaned.');


  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
