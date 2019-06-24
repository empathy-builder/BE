const supertest = require('supertest')

const server = require('../server.js')

const db = require('../../data/config/dbConfig.js')

beforeEach(async () => {
    await db('users').truncate()
  })

describe('server', () => {

    describe('POST /register', () => {

        it('should return the correct response status of 400 with no req.body', async () => {
            const newUser = { }

            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(400)
        })

        it('should return the correct response status of 422 if not all required fields are submitted', async () => {
                const newUser = {
                    email: 'testing@admin.com'
                }
    
                await supertest(server)
                .post('/api/auth/register')
                .send(newUser)
                .set('Accept', 'application/json')
                .expect(422)
            })

        it('should return the correct response status of 201', async () => {
            const newUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)
        })

        it('should post a user to the db though the endpoint', async () => {
            const newUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
                .post('/api/auth/register')
                .send(newUser)
                .set('Accept', 'application/json')
                .then(res =>  {
                    expect(res.body).toEqual({
                        user: {
                            id: 1, 
                            email: 'testing@admin.com'
                        }
                    })
                })
            })

        it('should return the correct response status of 405 if user email is not unique', async () => {
            const newUser = {
                email: 'testing@admin.com', password: 'testing'
            }

            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(405)
        })
    })  

    describe('POST /login', () => {

        it('should return the correct response status of 500 with no req.body', async () => {
            const newUser = { }

            await supertest(server)
            .post('/api/auth/login')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(500)
        })

        it('should return the correct response status of 401 if not all required fields are submitted', async () => {
            const newUser = {
                email: 'testing@admin.com'
            }

            await supertest(server)
            .post('/api/auth/login')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(401)
            })

        it('should return the correct response status of 200', async () => {
            const newUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)

            const regUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
            .post('/api/auth/login')
            .send(regUser)
            .set('Accept', 'application/json')
            .expect(200)
        })

        it('should return the correct response containing the token', async () => {
            const newUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
            .post('/api/auth/register')
            .send(newUser)
            .set('Accept', 'application/json')
            .expect(201)

            const regUser = {
                email: 'testing@admin.com', password: 'testing'
            }
            await supertest(server)
            .post('/api/auth/login')
            .send(regUser)
            .set('Accept', 'application/json')
            .then( res => {
                expect(res.body).toEqual({
                    message: "Welcome testing@admin.com",
                       user: {
                         email: "testing@admin.com",
                         id: 1,
                         token: res.body.user.token
                        }
                })
            })
        })
    })  
})

