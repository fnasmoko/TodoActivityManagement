const db = require('../model/dbTodosManagement');

//get list of todo
const getTodo = (req, res) => {
    db.query("SELECT * FROM todo", (err, result) => {
      if(err) throw err;
      // res.status(200).json(result)
    let output = {
      "status": "Success",
      "message": "Success"
    }
    output ['data'] = result
    res.json(output)
  })
}

//get list of todo by id
const getTodoByID = (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
    const sqlQuery = "SELECT * FROM todo WHERE id = ?";
    db.query(sqlQuery, id, (err, result) => {
        if(err) throw err;
    let output = {
      "status": "Success",
      "message": "Success"
    }
    if (result[0] == undefined) {return res.status(400).json({message: 'Todo with id ' + id + ' is not found'})} 
    else {
      output['data'] = result
    }
    res.json(output)
    })
}

//add todo
const addTodo = (req, res) => {
    let {title, activity_group_id, is_active} = req.body;
    if (title == undefined || activity_group_id == undefined || is_active == undefined) {
      return res.status(400).json({message: 'Please input data completely'})
    }
    const sqlQuery = "INSERT INTO todo (title, activity_group_id, is_active, priority, createdAt, updatedAt) VALUES (?, ?, ?, 'very-high', now(), now())";
    db.query(sqlQuery, [title, activity_group_id, is_active], (err, result) => {
        if(err) throw err;
      })
    const sqlQuery2 = "select * from todo order by id desc limit 1";
    db.query(sqlQuery2, (err, result) => {
        if(err) throw err;
    let output = {
      "status": "Success",
      "message": "Success"
    }
    output ['data'] = result
    res.status(200).json(output)
    })  

}

//delete todo
const deleteTodoByID = (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
    const sqlQuery = "DELETE FROM todo WHERE id = ?";
    db.query(sqlQuery, id, (err, result) => {
        if(err) throw err;
    let output = {}
    console.log(result['affectedRows'])
    if (result['affectedRows'] == 0) {return res.status(400).json({message: 'Todo with id ' + id + ' is not found'})}
    else output = {
      "status": "Success",
      "message": 'Todo with id ' + id + ' had been deleted'
    }
    res.status(200).json(output)
    })
}

//update todo
const updateTodo = (req, res) => {
    const id = req.params.id
    let {title, priority, is_active} = req.body;
    
    if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
    if (title == undefined && priority == undefined && is_active == undefined) {
      return res.status(400).json({message: 'Please input data completely'})
    }
        
    const sqlQuery = "update todo set title = ?, priority = ?, is_active = ?, updatedAt = now() where id = ?";
    db.query(sqlQuery, [title, priority, is_active, id], (err, result) => {
        if(err) throw err;
    if (result['affectedRows'] == 0) {return res.status(400).json({message: 'Todo with id ' + id + ' is not found'})}
    else { const sqlQuery2 = "select * from todo where id = ?";
    db.query(sqlQuery2, id, (err, result2) => {
        if(err) throw err;
    let output = {
      "status": "Success",
      "message": "Success"
    }
    output ['data'] = result2
    res.status(200).json(output)
    })
    }
    })
}



module.exports = {getTodo, getTodoByID, addTodo, updateTodo, deleteTodoByID}