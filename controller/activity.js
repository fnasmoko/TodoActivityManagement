const db = require('../model/dbTodosManagement');


//get list of activity
const getActivity = (req, res) => {
  db.query("SELECT * FROM activity", (err, result) => {
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

//get list of activity by id
const getActivityByID = (req, res) => {
  const id = req.params.id
  if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
  const sqlQuery = "SELECT * FROM activity WHERE id = ?";
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

//add activity
const addActivity = (req, res) => {
  let {title, email} = req.body;
  if (title == undefined || email == undefined) {
    return res.status(400).json({message: 'Please input data completely'})
  }
  const sqlQuery = "INSERT INTO activity (title, email, createdAt, updatedAt) VALUES (?, ?, now(), now())";
  db.query(sqlQuery, [title, email], (err, result) => {
      if(err) throw err;
  })
  const sqlQuery2 = "select * from activity order by id desc limit 1";
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

//delete activity
const deleteActivityByID = (req, res) => {
  const id = req.params.id
  if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
  const sqlQuery = "DELETE FROM activity WHERE id = ?";
  db.query(sqlQuery, id, (err, result) => {
      if(err) throw err;
  let output = {}
  console.log(result['affectedRows'])
  if (result['affectedRows'] == 0) {return res.status(400).json({message: 'Todo with id ' + id + ' is not found'})}
  else output = {
    "status": "Success",
    "message": 'Activity with id ' + id + ' had been deleted'
  }
  res.status(200).json(output)
  })
}

//update activity
const updateActivity = (req, res) => {
  const id = req.params.id
  let {title, email} = req.body;
  
  if (isNaN(id)) {return res.status(400).json({message: 'id must be a number'})}
  if (title == undefined && email == undefined) {
    return res.status(400).json({message: 'Please input data completely'})
  }
      
  const sqlQuery = "update activity set title = ?, email = ?, updatedAt = now() where id = ?";
  db.query(sqlQuery, [title, email, id], (err, result) => {
      if(err) throw err;
  if (result['affectedRows'] == 0) {return res.status(400).json({message: 'Activity with id ' + id + ' is not found'})}
  else { const sqlQuery2 = "select * from activity where id = ?";
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



module.exports = {getActivity, getActivityByID, addActivity, updateActivity, deleteActivityByID}