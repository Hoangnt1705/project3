'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('courses', {
      id_course: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date_up: Sequelize.STRING,
      course_name: Sequelize.STRING,
      image_course: Sequelize.TEXT('long'),
      description_course: Sequelize.TEXT('long'),
      level: Sequelize.STRING,
      time_learn_course: Sequelize.STRING,
      route_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Courses');
  }
};
