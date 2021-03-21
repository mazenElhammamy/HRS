const mongoose = require('mongoose');
const Request = mongoose.model('Request', {
    employeeId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	mangerId: {
		type: mongoose.Schema.ObjectId,
		required: true,
	},
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,    
	},	
	days:{
		type: Number,
		required: true,
	},
    type: {
		type: String,
		required: true,    
	},
    reason: {
		type: String,
		required: true,    
	},
    appliedOn: {
		type: String,
		required: true,    
	},
    status: {
		type: String,
		required: true, 
        default : "Pending..."   
	}
});
module.exports = Request;