const Sequelize=require('sequelize');
const db=require('../config/database');
const Host=require('./Host');
const Model=Sequelize.Model;

class Visitor extends Model{};

Visitor.init({
		name:{
			type:Sequelize.STRING,
			allowNull: false
		},
		email:{
			type:Sequelize.STRING,
			allowNull:false
		},
		phone:{
			type:Sequelize.STRING,
			allowNull:false
		},
		checkInTime:{
			type:Sequelize.STRING,
			allowNull:false
		},
		checkOutTime:{
			type:Sequelize.STRING
		}
	},{
		sequelize:db,
		modelName:'Visitor'
	})

Host.hasMany(Visitor);

Visitor.sync({force:false});
module.exports=Visitor;