const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const FILE = path.join(__dirname, 'data.json');

const app = express();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

const write = (filePath, data) => {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(data)) {
			return reject('Data must be an array');
		} else {
			fs.writeFile(filePath, JSON.stringify(data), err => {
				if (err) {
					return reject(err);
				} else {
					resolve();
				}
			});
		}
	});
};
  
const read = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				return reject(err);
			}
			let results;
			try {
				results = JSON.parse(data.toString());
				if(!Array.isArray(results)){
					return reject('Data must be an array')
				}
			} catch(ex) {
				reject(ex);
			}
			resolve(results);
		});
	});
};


// write(FILE, [{name: 'moe'}, {name: 'larry'}])
// 	.then(() => console.log('success'))
// 	.catch(ex => console.log(ex));


app.listen(port, () => console.log(`listening on port ${port}`));