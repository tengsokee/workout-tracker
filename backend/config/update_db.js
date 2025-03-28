const db = require('./database');

async function updateDatabase() {
    try {
        await db.query('ALTER TABLE users MODIFY email VARCHAR(255) NULL');
        console.log('Successfully updated users table to make email nullable');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        process.exit();
    }
}

updateDatabase();
