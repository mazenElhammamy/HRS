const mongoose = require('mongoose');
const Department = mongoose.model('Department', {
	departmentName: {
		type: String,
		required: true,
	},
	departmentManger: {
		type: String,
		required: true,
        
	},
	
});
module.exports = Department;
