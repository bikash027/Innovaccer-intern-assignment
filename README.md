<p>This is an entry management software. It allows people to be hosts or to be visitors. A visitor can visit the address domain-name/ (in this case it would be localhost:5000/) and choose a host of his/her choice. The host will be informed via email and sms. </p>

<h2>Workflow</h2>
<p>
	Once the user hits the home route (/), he/she is asked to enter the details like email, phone no., etc.. Once the user submits the form he/she is shown page with some details of the visit. Simultaneously, the host choosen will be informed of the visit.
</p>
<p>
	If there are no hosts the user is redirected to the route '/host' where he/she can add a host. 
</p>
<h2>Approach</h2>
<p>
	This application uses ExpressJs for a server and MySQL for a database. The ORM Sequelize has been used as it comes with advantages like database synchronization, easy switching of database, etc.
</p>
<p>
	Sending emails has been done with the help of nodemailer. SMS sending is handled by making api requests to 'way2sms'. The api-requset consists of the receiver's phone no. and the message.
</p>
<p>
	It is recommended not to run the server from behind any proxy server but there is an option to set the proxy configuration in lines 10 and 86 of sendMessage.js
</p>
<p>
	To run this application on your computer, clone or download this repository, run npm install and change the database credentials in config/database.js
</p>
