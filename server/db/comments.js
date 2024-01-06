const pool = require('./pool');

async function getComments(postId) {
    const commentsQuery = `
        SELECT * FROM comments
        WHERE postId = ?
    `;
    const [data] = await pool.query(commentsQuery,[postId]);
    console.log(data);
    return data;
}
// getComments(1)


async function addComment(postId, name, email, body) {
    const insertQuery = `
        INSERT INTO comments(postId, name, email, body)
        VALUES (?, ?, ?,?)
    `;
    const [result] = await pool.query(insertQuery, [postId, name, email, body]);
    console.log(result);
}
// addComment(1, 'Meir','meirvitkin@gmail.com', "i realy like your post")
async function editComment(id, body) {
    const editCommentQuery = `
        UPDATE comments
        SET body =?
        WHERE id = ?
    `
    const [{affectedRows}]= await pool.query(editCommentQuery,[body, id]);
    if(affectedRows){

        return affectedRows
    }
}
// editComment(1,'updated successfully')


async function deledeComment(id){
    const deleteQuery = `
        DELETE FROM comments 
        WHERE id = ? 
    `;
    const [{affectedRows}] = await pool.query(deleteQuery,[id])
    console.log(affectedRows);

}
// deledeComment(7)
module.exports = {
    getComments,
    addComment,
    editComment,
    deledeComment
}