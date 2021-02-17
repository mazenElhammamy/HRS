const mongoose = require('mongoose');
const Department = mongoose.model('User', {
	departmentName: {
		type: String,
		required: true,
	},
	departmentManger: {
		type: String,
		required: true,
        default:"Admin",
	},
	departmentTitlesID: {
		type: [],
		
	},
	
});
module.exports = Department;
