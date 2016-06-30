/**
 * Created by k on 2016/6/21.
 */

//require('../../css/base');
//require('../../css/page');
//require('../../sass/index');

var $ = require('../module/jquery.js');

var tools = require('../module/util');

$(function(){
    $('body').append('<h1>jQuery console</h1>');
    $('h1').css('color','green');
});

console.log(tools);
console.log('index.js');

