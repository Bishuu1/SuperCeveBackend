const express = require('express');
const router = express.Router();

router.get('/',(req,res)=> {
	res.render('index', {
        title:'CV Generator'
    });
	next();
});
router.get('/curriculum', (req,res,next)=> {
    res.render('curriculum',{
        title:'Lista',
        items: items
    });
});

module.exports = router;