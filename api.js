#!/bin/env node
'use strict';

const express = require('express');
let app = express();

app.get('/', function (req, res) {
    console.log(req['query']);
    //res.send();
});

app.listen(3000, function () {
    console.log('Server running on port 3000!');
});
