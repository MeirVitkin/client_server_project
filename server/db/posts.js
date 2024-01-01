const pool = require('./pool');

async function getPosts() {
    const postsQuery = `
        SELECT * FROM posts
    `;
    const [data] = await pool.query(postsQuery);
    if (data) return data;
    throw new Error('No posts found');
}

async function getUserPosts(userId) {
    const postsQuery = `
        SELECT * FROM posts
        WHERE userId = ?
    `;
    const [data] = await pool.query(postsQuery, [userId]);
     if (data)return data;
    throw new Error('No posts found');
}

async function addPost(userId, title, body) {
    const insertQuery = `
        INSERT INTO posts(userId, title, body)
        VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(insertQuery, [userId, title, body]);
    console.log(result);
}

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

async function editPostBody(userId, id, body) {
    const editBodyQuery = `
        UPDATE posts
        SET body =?
        WHERE userId = ?
        AND id = ?
    `
    const [{ affectedRows }] = await pool.query(editBodyQuery, [body, userId, id])
    if (affectedRows)return
    throw new Error('No post found');


}

async function deletePost(userId, postId) {
    const deletePostQuery = `
        DELETE FROM posts 
        WHERE userId = ? 
        AND id = ?
    `;

    const [{ affectedRows: affectedRowsPost }] = await pool.query(deletePostQuery, [userId, postId]);
    console.log(`Posts deleted: ${affectedRowsPost}`);

    // const deleteCommentsQuery = `
    //     DELETE FROM comments 
    //     WHERE postId = ? 
    // `;

    // const [{ affectedRows: affectedRowsComments }] = await pool.query(deleteCommentsQuery, [postId]);
    // console.log(`Comments deleted: ${affectedRowsComments}`);
}



module.exports = {
    getPosts,
    getUserPosts,
    addPost, 
    editPostBody, 
    editPostTitle, 
    deletePost
}