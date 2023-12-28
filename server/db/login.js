const pool = require('./pool');

async function login(userName, password) {
    const userQuery = `
        SELECT * FROM users
        WHERE users.username = ?
    `;
    const [userData] = await pool.query(userQuery, [userName]);
    console.log(userData);
    if (userData) {
        const userId = userData[0].id;
        const passwordQuery = `
        SELECT * FROM passwords
        WHERE user_id = ? AND password = ?
    `;
        const [passwordData] = await pool.query(passwordQuery, [userId, password]);
        console.log(passwordData);
        return userData;
    }
}
module.exports = login

// login("Bret", "hildegard.org");