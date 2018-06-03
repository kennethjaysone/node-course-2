const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware

app.use((req, res, next) => {

    var log = `${new Date().toString()} - ${req.method} ${req.url}`;
    
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
        {
            console.log('Unable to append to server log');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



app.get('/', (req, res) => {
    //res.send('Hello Kenneth!');
    res.render('home', {
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'Home Page'
    })
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});