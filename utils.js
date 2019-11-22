const getTimeString=function(){
	const date=new Date();
	const hours=date.getHours();
	const minutes=date.getMinutes();
	let st='';
	if(hours<10)
		st+='0';
	st+=hours;
	st+=':'
	if(minutes<10)
		st+='0'
	st+=minutes;
	return st;
}

const setTemporarySession=function(visitor,res){
	let offset=0;
	if(visitor.checkOutTime==='')
		offset=24*60*60000;
	else{
		const hours=visitor.checkOutTime.substring(0,2);
		const minutes=visitor.checkOutTime.substring(3,5);
		const date=new Date();
		offset=60000*(60*(parseInt(hours)-date.getHours())+parseInt(minutes)-date.getMinutes());

	}
	res.cookie('userId', visitor.id, { expires: new Date(offset + Date.now()) });
}

module.exports={getTimeString,setTemporarySession}