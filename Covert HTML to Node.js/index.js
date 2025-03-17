const express = require('express');
const path = require('path');

const app = express();
const port = 9000;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/ecommerce', (req, res) => {
    res.render('ecommerce');
});
app.get('/seo', (req, res) => {
    res.render('seo');
});
app.get('/sidebar1', (req, res) => {
    res.render('sidebar1');
});
app.get('/sidebar2', (req, res) => {
    res.render('sidebar2');
});
app.get('/bar', (req, res) => {
    res.render('bar');
});
app.get('/line', (req, res) => {
    res.render('line');
});
app.get('/pie', (req, res) => {
    res.render('pie');
});
app.get('/accordion', (req, res) => {
    res.render('accordion');
});
app.get('/alert', (req, res) => {
    res.render('alert');
});
app.get('/badge', (req, res) => {
    res.render('badge');
});
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
