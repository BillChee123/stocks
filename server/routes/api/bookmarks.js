// Importing important packages
const express = require('express');

const bodyParser = require('body-parser');

// Create an Express route
const bookmarkRoute = express.Router();

// create application/json parser
const jsonParser = bodyParser.json();

// Bookmark Schema
let bookmarkSchema = require ('../../models/Bookmark');

// To Get List Of Bookmarks
bookmarkRoute.route('/').get(function (req, res) {
	bookmarkSchema.find(function (err, bookmark) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(bookmark);
		}
	});
});

// To Add New Bookmark
bookmarkRoute.route('/').post(jsonParser, function (req, res) {
    console.log(req.body)
	let bookmark = new bookmarkSchema(req.body);
	bookmark.save()
	.then(game => {
		res.status(200).json({ 'bookmark': 'Bookmark Created Successfully' });
	})
	.catch(err => {
		res.status(400).send(err);
	});
});

// To Get Boomark Details By ID
bookmarkRoute.route('/:id').get(function (req, res) {
	let id = req.params.id;
	bookmarkSchema.findById(id, function (err, bookmark) {
		res.json(bookmark);
	});
});

// To Update The Bookmark Details
bookmarkRoute.route('/:id').put(jsonParser, function (req, res) {
    const bookmarkID = req.params.id
	bookmarkSchema.findById(bookmarkID, function (err, bookmark) {
        if (!bookmark)
            res.status(400).send(`bookmark with id ${bookmarkID} does not exist.`);
		else {
			bookmark.title = req.body.title;
			bookmark.updated_at = Date.now;
			bookmark.priority = req.body.priority;

			bookmark.save().then(emp => {
				res.json('Bookmark Updated Successfully');
			})
			.catch(err => {
				res.status(400).send(`Unable To Update Bookmark: \n${err}`);
			});
		}
	});
});

// To Delete The Bookmark
bookmarkRoute.route('/:id').delete(function (req, res) {
	bookmarkSchema.findByIdAndRemove({ _id: req.params.id }, function (err, bookmark) {
        if (err) {
            res.json(err);
        } else if (!bookmark) {
		    res.json(`Bookmark with id ${req.params.id} does not exist.`);
        } else {
            res.json('Bookmark Deleted Successfully');
        }
	});
});

module.exports = bookmarkRoute;
