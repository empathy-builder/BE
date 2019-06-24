const supertest = require('supertest')
const server = require('./server.js')

describe('server', () => {
    describe('GET /', () => {
        it('responds with correct status', () => {
            return supertest(server)
                .get('/')
                .expect(200)
        })

        it('responds with correct res.body { message: "The server is on and waiting for requests..." }', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({
                        message: "The server is on and waiting for requests..."
                    })
                })
        })
    })
})