// Serve the index page
const express = require('express');
const router = express.Router();
const { Search } = require('../database');

const db = require('../database/connection');

router.get('/', (request, response, next) => {
    response.render('pages/search',{
        title: "GatorTrade - Search",
        current_category: "All Categories"
    });
});

router.post('/', (request, response, next) => { //when hit search button
    let searchInput = request.body.searchInput.toLowerCase();
    let searchCategory = request.body.categories;

    Search.search(searchInput, searchCategory)
      .then( items => {
        response.render('pages/search', {
            title: "GatorTrade - Search",
            items: items,
            current_category: searchCategory
        });
      }).catch(err => {
          console.log(err);
      });
});

module.exports = router;