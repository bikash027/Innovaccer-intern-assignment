const Sequelize=require('sequelize');
const db=require('../config/database');
const Model = Sequelize.Model;

class Host extends Model{};

Host.init({
		name:{
			type: Sequelize.STRING,
			allowNull: false
		},
		email:{
			type: Sequelize.STRING,
			allowNull:false
		},
		phone:{
			type: Sequelize.STRING,
			allowNull:false
		}
	},
	{
		sequelize:db,
		modelName:'Host'
	}
);

Host.sync({force:false});


// Host.create({
// 	name: "paper-cup",
// 	visuals: "paper-cup"
// })
// .then(Host=>console.log(Host+ "mug successfully created"))
// .catch(err=>console.log(err));

// Host.create({
// 	name: "ceramic-hd-coffee-cup",
// 	visuals: "ceramic-hd-coffee-cup"
// })
// .then(Host=>console.log(Host+ "mug successfully created"))
// .catch(err=>console.log(err));

// Host.create({
// 	name: "culver-black-mug",
// 	visuals: "culver-black-mug"
// })
// .then(Host=>console.log(Host+ "mug successfully created"))
// .catch(err=>console.log(err));

// Host.create({
// 	name: "round-ceremic-coffee-cup",
// 	visuals: "round-ceramic-coffee-cup"
// })
// .then(Host=>console.log(Host+ "mug successfully created"))
// .catch(err=>console.log(err));


module.exports=Host;