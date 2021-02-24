const express = require('express');
const employeeRouter = require('./routers/Employee');
const departmentRouter = require('./routers/Department');
const titleRouter = require('./routers/Title');
const cors = require('cors');
const app = express();



require('./db_connection'); // to connect the database

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use((req, res, next) => {
	next();
});

app.use('/api/employee', employeeRouter);
app.use('/api/department', departmentRouter);
app.use('/api/title', titleRouter);
app.get('/*', (req, res) => {
	res.status(400).send('<h1>Error 404</h1>');
});

// err handller
app.use((err, req, res, next) => {
	res.status(400).json('status bloked');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

