'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventosSchema extends Schema {
  up () {
    this.create('eventos', table => {
      table.increments()
      table.string('title')
      table.text('localizacao')
      table.datetime('data')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('eventos')
  }
}

module.exports = EventosSchema
