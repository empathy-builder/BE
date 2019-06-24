const db = require('../../data/config/dbConfig.js')
const bcrypt = require('bcryptjs')

const { insert, getAll, remove, findById, update, findBy } = require('./usersModel.js')

beforeEach(async () => {
  await db('users').truncate()
})

describe('users model', () => {

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('insert()', () => {
    it('should insert users', async () => {
      await insert({ email: 'testing@admin.com', password: bcrypt.hashSync('testing', 2)})

      const users = await db('users')

      expect(users).toHaveLength(1)
    })

    it('should insert the provided user', async () => {
      let user = { email: 'testing@admin.com', password: bcrypt.hashSync('testing', 2)}
      let inserted = await insert(user)
      expect(inserted.password).toBe(user.password)
    })
  })

  describe('getAll()', () => {
    it('should retrieve data from test db', async () => {
      await insert({ email: 'testing@admin.com', password: bcrypt.hashSync('testing', 2)})
      await insert({ email: 'testing2@admin.com', password: bcrypt.hashSync('testing', 2)})

      const users = await getAll()
  
      expect(users).toHaveLength(2)
    })
  })

  describe('remove()', () => {
    it('remove the user within the database with the provided id', async () => {
      await insert({ email: 'testing@admin.com', password: bcrypt.hashSync('testing', 2)})

      await remove(1)

      const users = await getAll()
      expect(users).toHaveLength(0)
    })
  })

  describe('findById()', () => {
    it('find a user by their id', async () => {
      const hashed = bcrypt.hashSync('testing', 2)
      await insert({ email: 'testing@admin.com', password: hashed })

      const user = await findById(1)
      expect(user).toEqual({ 
        id: 1,  
        email: 'testing@admin.com', 
        password: hashed
      })
    })
  })

  describe('update', () => {
    it('update users info', async () => {
      await insert({ email: 'test@admin.com', password: bcrypt.hashSync('test', 2)})

      const hashed = bcrypt.hashSync('testing', 2)
      const updatedUser = {
        email: 'testing@admin.com', 
        password: hashed
      }
      
      await update(1, updatedUser)

      const user = await findById(1)
      expect(user).toEqual({ 
        id: 1,  
        email: 'testing@admin.com', 
        password: hashed
      })
    })
  })

  describe('findBy()', () => {
    it('find user/users by the given parameter', async () => {
      const hashed1 = bcrypt.hashSync('testing', 2)
      const hashed2 = bcrypt.hashSync('testing', 2)
      await insert({ email: 'testing@admin.com', password: hashed1})
      await insert({ email: 'test@admin.com', password: hashed2})
      const email = 'testing@admin.com'
      const user = await findBy({ email })
      expect(user).toEqual(
        [
          { 
          id: 1,  
          email: 'testing@admin.com',
          password: hashed1
          }
        ]
      )
    })
  })

})
