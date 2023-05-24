const db = require('../data/database');

const express = require('express');

const router = express.Router();
router.get('/', function(req, res){
    res.redirect('/posts');
});

router.get('/posts', async function(req, res){
    const [posts] =  await   db.query('SELECT * FROM posts ');
    res.render('posts-list', { posts: posts});
});


router.get('/new-post', async function(req, res){
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', function(req, res){
    const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
    ];
    
    db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data]);

    res.redirect('/posts');
})

module.exports = router;