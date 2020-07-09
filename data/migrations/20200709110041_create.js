exports.up = function (knex) {
  return knex.schema.createTable('bookshelf', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.boolean('private').default(false);
    table
      .string('profileId')
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {};
