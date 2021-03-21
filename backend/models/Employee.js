const mongoose = require('mongoose');
const Employee = mongoose.model('Employee', {
	firstname: {
		type: String,                     
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		 required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	 },
	address: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	homeNumber: {
		type: String,
	},
	sallary: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		default:null,
	},
	titleId: {
		type:  mongoose.Schema.ObjectId,
		required: true,	
	},
	
	departmentId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	
	mangerId: {
		type:  mongoose.Schema.ObjectId,
		default:null
	},
	
	vacationDays :{
		type: Number,
		default:21 
	},
	admin :{
		type: Boolean,
		default:false 
	}
});
module.exports = Employee;

