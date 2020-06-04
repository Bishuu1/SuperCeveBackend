const express = require('express');
const router = express.Router();

const items =[
    {id:1,name:'Curriculum 1'},
    {id:2,name:'Curriculum 2'},
    {id:3,name:'Curriculum 3'}
];

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