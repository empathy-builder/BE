const db = require('../../data/config/dbConfig.js')

const { insert, getAll, findBy } = require('./dataModel.js')

beforeEach(async () => {
  await db('data').truncate()
})

describe('data model', () => {

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('insert()', () => {
    it('should insert data', async () => {
      await insert(sampleData)

      const data = await db('data')

      expect(data).toHaveLength(1)
    })

    it('should insert the provided data', async () => {
      let data = sampleData
      let inserted = await insert(data)
      expect(inserted).toEqual(sampleDBData)
    })
  })

  describe('getAll()', () => {
    it('should retrieve data from test db', async () => {
      await insert(sampleData)
      await insert(sampleData)

      const data = await getAll()
  
      expect(data).toHaveLength(2)
    })
  })

  describe('findBy()', () => {
    it('find data/data by the given parameter', async () => {
      insert(sampleData)
      insert(sampleData)
      insert(sampleData2)
      const data = await findBy( "relationship_status", 'married' )
      expect(data).toHaveLength(1)
    })
  })

})


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

const sampleDBData= {
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
    id: 1,
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