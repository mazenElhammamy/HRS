const mongoose = require('mongoose');
const JobTitle = mongoose.model('JobTitle', {
	titleName: {
		type: String,
		required: true,
	},
	departmentId: {
		type: String,
		required: true,    
	},	
	hierarchyNumber:{
		type: Number,
		required: true,
	}
});
module.exports = JobTitle;
