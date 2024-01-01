'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users',[{
      userID: 1,
      firstName: "Tanya",
      lastName: "Mudgal",
      email: "tanya@gmail.com",
      password: "rgb91@",
      contactNumber: 1234567809,
      dob: new Date('2003-11-12'),
      gender: "Female",
      address: "Hapur",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users',null, {})
  }
};
