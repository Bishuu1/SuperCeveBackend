const { Router } = require('express');
const router = Router();

router.route('/index', (req, res) => {
    res.send('Backend its working!');
});

module.exports = router;