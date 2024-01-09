const pool = require('./pool');

async function login(userName, password) {
    const userQuery = `
        SELECT * FROM users
        WHERE users.username = ?
    `;
    const [[userData]] = await pool.query(userQuery, [userName]);
    if (userData) {
        const userId = userData.id;
        const passwordQuery = `
        SELECT * FROM passwords
        WHERE userId = ? AND password = ?
    `;
        const [passwordData] = await pool.query(passwordQuery, [userId, password]);
        if(passwordData.length>0) {

            return userData;
        }
        else{
            throw new Error('password does not match');
        }
    }else{
        throw new Error('user does not exist');

    }

}
module.exports = login