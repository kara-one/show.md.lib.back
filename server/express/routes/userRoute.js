const Router = require('express');
const router = new Router();

router.get('/users', (req, res) => {
    res.send('users');
});
router.post('/users', (req, res) => {
    res.send('users');
});
router.get('/users/:id', (req, res) => {
    res.send('users');
});
router.put('/users/:id', (req, res) => {
    res.send('users');
});
router.delete('/users/:id', (req, res) => {
    res.send('users');
});

module.exports = router;
