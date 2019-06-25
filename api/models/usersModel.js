const db = require('../../data/config/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  findBy
}

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      console.log(ids)
      return db('users')
        .where({ id: ids[0] })
        .first()
    })
}

async function update(id, changes) {
  await db('users')
        .where({ id })
        .update(changes, '*')

        return findById(id)
}

function remove(id) {
  return db('users')
    .where({ id })
    .del()
} 

function getAll() {
  return db('users')
}

function findById(id) {
  return db('users')
  .where({ id })
  .first()
}

function findBy(filter) {
  return db('users')
      .where(filter)
}
