const supertest = require('supertest')

const server = require('../server.js')

const db = require('../../data/config/dbConfig.js')



describe('server', () => {
    beforeEach(async () => {
        await db('data').truncate()
        await db('users').truncate()
      })
    describe('POST /insert', () => {
        
        it('should return the correct response status of 201', async () => {
            await supertest(server)
            .post('/api/insert')
            .send(sampleData)
            .set('Accept', 'application/json')
            .expect(201)
        })
    })  

    describe('GET /data', () => {
        console.log("*******************")
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

            let token = ''

            await supertest(server)
            .post('/api/auth/login')
            .send(regUser)
            .set('Accept', 'application/json')
            .then(res => {
                expect(200)
                token = res.body.user.token
                console.log("*******************", token)
            })

            await supertest(server)
            .post('/api/insert')
            .send(sampleData)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .post('/api/insert')
            .send(sampleData)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .get('/api/data')
            .set('authorization', token)
            .expect(200)

            await supertest(server)
            .get('/api/data')
            .set('authorization', token)
            .then(res => {
                expect(res.body).toHaveLength(2)
            })
        })
    })  

    describe('GET /data/:filter', () => {
        
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

            let token = ''

            await supertest(server)
            .post('/api/auth/login')
            .send(regUser)
            .set('Accept', 'application/json')
            .then(res => {
                expect(200)
                token = res.body.user.token
                console.log("*******************", token)
            })

            await supertest(server)
            .post('/api/insert')
            .send(sampleData)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .post('/api/insert')
            .send(sampleData2)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .get('/api/data/search')
            .send({
                column: "relationship_status",
                filter: "married"
            })
            .set('Accept', 'application/json')
            .set('authorization', token)
            .expect(200)

            await supertest(server)
            .get('/api/data/search')
            .send({
                column: "relationship_status",
                filter: "married"
            })
            .set('Accept', 'application/json')
            .set('authorization', token)
            .then(res => {
                expect(res.body).toHaveLength(1)
            })
        })
    }) 

})



const sampleData= {
    //general data
    current_location: 81401,
    timestamp: 20181026,
    desired_relocation: 87401,
    sex: "male",
    relationship_status: "single",
    orientation: "straight",
    age: 28,
    race: "white",
    safe_status: "yes",
    employed: "no",
    partner_employed: "yes",
    children: "yes",
    personal_savings: 1000,
    individual_income: 500,
    
    //personal budget
    transportation: 50,
    food: 200,
    health_care: 0,
    car_loans: 0,
    personal_loans: 0,
    personal_other: 200,
    personal_budget_total: 450,
    
    //relocation budget
    travel_costs: 50,
    rental_deposit: 500,
    utility_connection: 100,
    storage_unit: 50,
    rent: 600,
    car_rental: 0,
    cell_phone: 100,
    moving_truck: 300,
    mental_health: 0,
    income_loss: 0,
    additional_security: 100,
    relocation_other: 200,
    relocation_budget_total: 2000,
    
    //calculated results
    calculated_difference: 1450,
    }

const sampleData2= {
    //general data
    current_location: 81401,
    timestamp: 20181026,
    desired_relocation: 87401,
    sex: "male",
    relationship_status: "married",
    orientation: "straight",
    age: 28,
    race: "white",
    safe_status: "yes",
    employed: "no",
    partner_employed: "yes",
    children: "yes",
    personal_savings: 1000,
    individual_income: 500,
    
    //personal budget
    transportation: 50,
    food: 200,
    health_care: 0,
    car_loans: 0,
    personal_loans: 0,
    personal_other: 200,
    personal_budget_total: 450,
    
    //relocation budget
    travel_costs: 50,
    rental_deposit: 500,
    utility_connection: 100,
    storage_unit: 50,
    rent: 600,
    car_rental: 0,
    cell_phone: 100,
    moving_truck: 300,
    mental_health: 0,
    income_loss: 0,
    additional_security: 100,
    relocation_other: 200,
    relocation_budget_total: 2000,
    
    //calculated results
    calculated_difference: 1450,
    }