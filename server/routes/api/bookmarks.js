const express = require('express');

const bodyParser = require('body-parser');

// Create a bookmark route
const bookmarkRoute = express.Router();

// Bookmark Schema
let bookmarkSchema = require ('../../models/Bookmark');

// To Get List Of Bookmarks
bookmarkRoute.route('/').get(function (req, res) {
	bookmarkSchema.find(function (err, bookmarkList) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		}
		else {
			res.json(bookmarkList);
		}
	});
});

// To Add New Bookmark
bookmarkRoute.route('/').post(function (req, res) {
	let bookmark = new bookmarkSchema(req.body);
	bookmark.save()
	.then(game => {
		res.status(200).json({ 'bookmark': 'Bookmark Created Successfully' });
	})
	.catch(err => {
		res.status(400).json(err.message);
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
bookmarkRoute.route('/:id').put(function (req, res) {
    const bookmarkID = req.params.id
	bookmarkSchema.findById(bookmarkID, function (err, bookmark) {
        if (!bookmark)
            res.status(400).json(`bookmark with id ${bookmarkID} does not exist.`);
		else {
			bookmark.title = req.body.title;
			bookmark.updated_at = Date.now;
			bookmark.priority = req.body.priority;

			bookmark.save().then(emp => {
				res.json('Bookmark Updated Successfully');
			})
			.catch(err => {
				res.status(400).json(err);
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

// To Delete all Bookmarks
bookmarkRoute.route('/').delete(function (req, res) {
	bookmarkSchema.remove({}, function (err) {
        if (err) {
            res.json(err);
		}
		else {
			res.json('All Bookmarks Deleted Successfully');
		}
	});
});

module.exports = bookmarkRoute;
