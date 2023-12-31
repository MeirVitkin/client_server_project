const pool = require("./pool");

async function getTodos(id) {
    const todosQuery = `
        SELECT * FROM todos
        WHERE userId = ?
    `;
    const [data] = await pool.query(todosQuery, [id]);
    return data;
}

async function getCompletedTodos(id) {
    const todosQuery = `
        SELECT * FROM todos
        WHERE userId = ?
        AND completed = 1
    `;
    const [data] = await pool.query(todosQuery, [id])
    console.log(data);
}
//getCompletedTodos(3)


async function getUnCompletedTodos(id) {
    const todosQuery = `
        SELECT * FROM todos
        WHERE userId = ?
        AND completed = 0
    `;
    const [data] = await pool.query(todosQuery, [id])
    console.log(data);
}
//getUnCompletedTodos(3)


async function addTodos(userId, title) {
    const insertQuery = `
        INSERT INTO todos(userId, title, completed)
        VALUES (?, ?, 0)
    `;
    const [result] = await pool.query(insertQuery, [userId, title]);
    console.log(result);
}
// addTodos(1, "moshe hadar ha-gever")

async function editTitle(userId, id, title){
    const todo = `
        UPDATE todos
        SET title =?
        WHERE userId = ?
        AND id = ?
    `
    const [{affectedRows}]= await pool.query(todo,[title, userId, id])
    if(affectedRows){

        return affectedRows
    }
}
//editTitle(1,3, "i just test it ")

async function checkTodo(userId, id){
    const checked =`
        SELECT completed FROM todos
        WHERE userId = ?
        AND id = ?
    `
    const [[{completed}]] = await pool.query(checked,[userId, id])
    
    let value = completed;
    (value) ? value =0 : value= 1;
    
    const editTodoChecked =`
    UPDATE todos
    SET completed =${value}
    WHERE userId = ?
    AND id = ?
    `
    const [{affectedRows}] = await pool.query(editTodoChecked,[userId, id])
    
    console.log(affectedRows);
    
}
//checkTodo(1,1)


async function deledeTodo(userId, id){
    const deleteQuery = `
        DELETE FROM todos 
        WHERE userId = ? 
        AND id = ?
    `;
    const [{affectedRows}] = await pool.query(deleteQuery,[userId, id])
    console.log(affectedRows);

}
// deledeTodo(1,5);
module.exports = {
    getTodos,
    addTodos,
    editTitle,
    checkTodo,
    deledeTodo
}
