const express = require('express');
const router = express.Router();


//push alarm via http v1 api
//router.use('/v1', require('./push_httpv1.js')); //being made

//push alarm via 기존 http api
router.use('/', require('./push_http.js'));


module.exports = router;