const Users = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];
const thoughts = [
    'I love programming!',
    'JavaScript is awesome!',
    'MongoDB is a great database.',
    'I enjoy learning new technologies.',
    'Coding is my passion.',
    'I want to become a full-stack developer.',
    'Debugging is fun!',
    'I love solving problems with code.',
    'Learning never stops.',
    'Collaboration is key in software development.',
    'Open source contributions are rewarding.',
    'I enjoy building web applications.',
    'APIs are fascinating!',
    'Data structures and algorithms are essential.',
    'I love working with React.',
];
// Get a random item given an array
export const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Gets a random User
export const getRandomUsers = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push(`${getRandomArrItem(Users)} ${getRandomArrItem(Users)}`);
    }
    return results;
};
// Function to generate random assignments that we can add to student object.
export const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            name: getRandomArrItem(thoughts),
            score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
        });
    }
    return results;
};
