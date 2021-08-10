const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '6bc294ae66774859ab0472ea12487c0a'
});

const handleApiCall = (req, res) => {
   app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
   .then(data => {
   		res.json(data);
   })
   .catch(err => res.status(400).json("unable to upload"))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	let found = false;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("unable count entries"))
}
module.exports = {
	handleImage,
	handleApiCall
}