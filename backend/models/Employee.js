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
		type: Number,
		required: true,
	},
	homeNumber: {
		type: Number,
	},
	sallary: {
		type: Number,
		required: true,
	},
	photo: {
		type: String,
		
	},
	titleID: {
		type: String,
		required: true,
		default: null, 
	},
	Department: {
		type: String,
		required: true,
	},
	mangerID: {
		type: String,
		required: true,
	},
	vacationDays :{
		type: Number,
		default:21 
	},
	assets :{
		type: [],
		 
	},
	admin :{
		type: Boolean,
		default:false 
	}
});
module.exports = Employee;
