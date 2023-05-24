const db = require('../data/database');

const express = require('express');

const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/posts');
});

router.get('/posts', async function(req, res){
    const [posts] =  await   db.query('SELECT posts.*, authors.name FROM posts INNER JOIN authors on posts.author_id = authors.id');
    res.render('posts-list', { posts: posts});
});


router.get('/new-post', async function(req, res){
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', {authors: authors});
});

router.post('/posts', async function(req, res){
    const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
    ];
    
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data]);

    res.redirect('/posts');
})

router.get('/posts/:id', async function(req, res){
    const postID = req.params.id;

    
    const [posts] =  await   db.query('SELECT * FROM posts');

    if(postID === [posts[0]])

    for (const post of posts){
     if(postID === post.id){
        res.render('post-detail', {id: postID})
     }
    }
 
    res.render('404');
    
})

module.exports = router;