const Visitor=require('../models/Visitor');
const Host=require('../models/Host');
const sendMessage=require('../sendMessage');
const {getTimeString,setTemporarySession}=require('../utils')
const controllers={};


controllers.home=function(req,res,next){
	let vis='';
	if('userId' in req.cookies){
		Visitor.findOne({ where: { id: req.cookies.userId } })
		.then(visitor=>visitor.dataValues)
		.then(visitor=>{
			vis=visitor;
			return Host.findOne({ where: { id: visitor.HostId } });
		})
		.then(host=>host.dataValues)
		.then(host=>{
			res.render('pages/visitDetails.ejs',{visitor:vis,host:host});
		})
		.catch(next)
	}
	else{
		Host.findAll({
			attributes:['name']
		})
		.then(hosts=>{
			if(hosts.length===0)
				throw new Error('no hosts yet');
			return hosts.map(host=>host.dataValues.name)
		})
		.then(hosts=>{
			const checkin=getTimeString();
			res.render('pages/visitorDetails.ejs',{error:null,hosts,checkin});
		})
		.catch(err=>{
			if(err.message==='no hosts yet')
				res.redirect('/host');
			else
				next(err);
		});
	}
	

}

controllers.postVisitorDetails=function(req,res){
	const visitor={
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		checkInTime: req.body.checkInTime,
		checkOutTime: req.body.checkOutTime
	}
	Host.findOne({
		attributes: ['id'],
		where:{ name: req.body.host }
	})
	.then(host=> host.dataValues.id)
	.then(hostId=>
		Visitor.create(
			{
				...visitor,
				HostId: hostId
			}
		)
		
	)
	.then(visitor=>{
		setTemporarySession(visitor,res);
		sendMessage.Email(visitor,"send to host");
		sendMessage.sms(visitor);
		res.redirect('/');
	})
	.catch(err=>{
		console.log(err);
		res.send("something went wrong");
	})
}

controllers.hostForm=function(req,res){
	res.render('pages/hostDetails.ejs');
}
controllers.postHost=function(req,res){
	const host={
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	}
	Host.create(host)
	.then(host=>{
		res.render('pages/hostWelcome.ejs');
	})
}

controllers.checkout=function(req,res,next){
	if('userId' in req.cookies){
		const userId=req.cookies.userId;
		Visitor.update(
			{checkOutTime: getTimeString() },
			{where: {id: userId }}
		)
		.then(count=>{
			Visitor.findOne({ where:{ id:userId } })
			.then(visitor=>sendMessage.Email(visitor,"send to visitor"));
			res.clearCookie('userId');
			res.redirect('/');
		})
		.catch(next)
	}
}

module.exports=controllers;