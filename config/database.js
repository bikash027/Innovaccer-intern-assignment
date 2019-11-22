const Sequelize=require('sequelize');

const sequelize = new Sequelize('intern', 'username', 'password', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports=sequelize;