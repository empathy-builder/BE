
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('data', table => {
        table.increments()

        //General Data 
        table
            .integer('current_location', 5)
            .notNullable()

        table
            .integer('timestamp')
            .notNullable()

        table
            .integer('desired_relocation', 5)
            .notNullable()

        table
            .string('sex')
            .notNullable()

        table
            .string('relationship_status')
            .notNullable()

        table
            .string('orientation')
            .notNullable()

        table
            .integer('age', 2)
            .notNullable()

        table
            .string('race')
            .notNullable()

        table
            .string('safe_status')
            .notNullable()

        table
            .string('employed')
            .notNullable()

        table
            .string('partner_employed')
            .notNullable()

        table
            .string('children')
            .notNullable()

        table
            .integer('personal_savings')
            .notNullable()

        table
            .integer('individual_income')
            .notNullable()

        //Personal Budget
        table
            .integer('transportation')
            .notNullable()

        table
            .integer('food')
            .notNullable()

        table
            .integer('health_care')
            .notNullable()
        
        table
            .integer('car_loans')
            .notNullable()

        table
            .integer('personal_loans')
            .notNullable()

        table
            .integer('personal_other')
            .notNullable()

        table
            .integer('personal_budget_total')
            .notNullable()

        //Relocation
        table
            .integer('travel_costs')
            .notNullable()

        table
            .integer('rental_deposit')
            .notNullable()

        table
            .integer('utility_connection')
            .notNullable()
        
        table
            .integer('storage_unit')
            .notNullable()

        table
            .integer('rent')
            .notNullable()

        table
            .integer('car_rental')
            .notNullable()

        table
            .integer('cell_phone')
            .notNullable()

        table
            .integer('moving_truck')
            .notNullable()
        
        table
            .integer('mental_health')
            .notNullable()

        table
            .integer('income_loss')
            .notNullable()

        table
            .integer('additional_security')
            .notNullable()

        table
            .integer('relocation_other')
            .notNullable()

        table
            .integer('relocation_budget_total')
            .notNullable()

        //Calculated result
        table
            .integer('calculated_difference')
            .notNullable()
      })
};

exports.down = function(knex, Promise) {
  return knex.schema
      .dropTableIfExists('data')
};
