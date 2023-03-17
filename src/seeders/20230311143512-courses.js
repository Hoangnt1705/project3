'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('course', [
      {
        id_course: 1,
        date_up: '17h:56m-28/1/2023',
        course_name: '[BT] Training Program Preparation (JS)',
        image_course: 'https://storage.googleapis.com/projectmodule3-c6f1d.appspot.com/imageCourseUpdate/7f31ba2b-9ca6-4eca-a557-7e0bacbdbe87--ES6.jpg?GoogleAccessId=firebase-adminsdk-cr5gs%40projectmodule3-c6f1d.iam.gserviceaccount.com&Expires=1709917200&Signature=d0COisp75QGocExo7WpTys6AiHdZtfcHEPCbQhLKw%2BYZoftWCZy6OB%2FXQyAPX3vf6zs%2FRyuxHvsq4z4a5kRTuQaMqvgDCNPbGB6%2FHh6n0TAHu1wON9O15gr%2B7xjtRdWW7cKK1%2Fp3nmF4O99WYceL%2FKeuJpQ0Hnxc87OEkxKqTrufDW6iOLu7dboTDh9Uq9q0GYJnEjhJMyPjYI4A6BznULcGgKYoZWlc5y6x4mQnig2vU15%2BAUYUDP4gcS1PDGGXiW1inl6Rbb%2BsAfl0juTXbVohBgpHC4W5XMzw5oxNOKaqGj%2Baq6HSNLH6GCiGUyDTNdqpZcq9IF8vLVwmDZ%2BK2Q%3D%3D',
        description_course: 'Training Program Preparation giúp học viên làm quen với các khai niệm trong lập trình web, từng bước xây dựng cho mình một Websit  cơ bản với HTML, CSS và Javascript',
        level: 'Normal',
        time_learn_course: '79 giờ',
        route_id: 1,
        user_id: 3
      },
      {
        id_course: 2,
        date_up: '18h:1m-28/1/2023',
        course_name: '[BT] Advanced Programming With JavaScript',
        image_course: 'https://storage.googleapis.com/projectmodule3-c6f1d.appspot.com/imageCourse/4973ec43-f38c-4443-ab48-022ff99b1616--1_M_GDn6RXZSZC66kvrMHh5Q.png?GoogleAccessId=firebase-adminsdk-cr5gs%40projectmodule3-c6f1d.iam.gserviceaccount.com&Expires=1709917200&Signature=BREyv%2BOUBOcN8jxszWWu8WEmACah05xrGRkZuFvkMKRaulel3ZCx78%2BrKGUXOTgz%2Bzx4ge9Ere20PuiJeobJdP8wbWrNsAdkh9gUo0SGVizgWaI%2Fv7B9DxjlHqYPdosFwENNQrNnN2nwwGqs5Y3Lt67yVdzwTJR6FehEbgDEUKaBxAQS8LfP7DOpbBbthSrcKqUyqhtukHs2AzZh9AJ2vnfGUp9VyIgDSAtzs4Kbgq%2BzZHruL2ePat1DdflgVzE48akBJ1TJe1JqSNN%2FzktBp4glDT2gcw6ogf2ZnBuBjjOBnFxSTUqI8%2B0z4vdwCxgLgBvgvTbG7lURNQrEVFxStA%3D%3D',
        description_course: 'Module Advanced Programming giúp học viên nắm vững các khái niệm và kỹ thuật cốt lõi trong lập trình, nâng cao tư duy và kỹ năng lập trình.',
        level: 'Intermediate',
        time_learn_course: '79 giờ',
        route_id: 1,
        user_id: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
