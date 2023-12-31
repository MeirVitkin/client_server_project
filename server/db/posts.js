const pool = require('./pool');

async function getPosts() {
    const postsQuery = `
        SELECT * FROM posts
    `;
    const [data] = await pool.query(postsQuery);
    console.log(data);
    return data;
}
// getPosts()

async function getUserPosts(userId) {
    const postsQuery = `
        SELECT * FROM posts
        WHERE userId = ?
    `;
    const [data] = await pool.query(postsQuery, [userId]);
    console.log(data);
    return data;
}
// getUserPosts(1)
async function addPost(userId, title, body) {
    const insertQuery = `
        INSERT INTO posts(userId, title, body)
        VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(insertQuery, [userId, title, body]);
    console.log(result);
}
// addPost(1,'test', 'i am just testing!!!!')

async function editPostTitle(userId, id, title) {
    const editTitleQuery = `
        UPDATE posts
        SET title =?
        WHERE userId = ?
        AND id = ?
    `
    const [{ affectedRows }] = await pool.query(editTitleQuery, [title, userId, id])
    if (affectedRows) {

        return affectedRows
    }
}
// editPostTitle(1,1,'updated successfully')

async function editPostBody(userId, id, body) {
    const editBodyQuery = `
        UPDATE posts
        SET body =?
        WHERE userId = ?
        AND id = ?
    `
    const [{ affectedRows }] = await pool.query(editBodyQuery, [body, userId, id])
    if (affectedRows) {

        return affectedRows
    }
}
// editPostBody(1,1,' body updated successfully')

async function deletePost(userId, postId) {
    const deletePostQuery = `
        DELETE FROM posts 
        WHERE userId = ? 
        AND id = ?
    `;

    const [{ affectedRows: affectedRowsPost }] = await pool.query(deletePostQuery, [userId, postId]);
    console.log(`Posts deleted: ${affectedRowsPost}`);

    const deleteCommentsQuery = `
        DELETE FROM comments 
        WHERE postId = ? 
    `;

    const [{ affectedRows: affectedRowsComments }] = await pool.query(deleteCommentsQuery, [postId]);
    console.log(`Comments deleted: ${affectedRowsComments}`);
}

// Example usage
// deletePost(2, 12);


module.exports = {
    getPosts,
    getUserPosts,
    addPost, 
    editPostBody, 
    editPostTitle, 
    deletePost
}