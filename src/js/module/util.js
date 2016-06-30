/**
 * Created by k on 2016/6/21.
 */

var base = require('./base');

module.exports = {
    init:function(){
        console.log('util.js');
    },
    isFunction:function(v){
        return typeof v == 'function';
    },
    log:function(){
        console.log(1111111)
    },
    dep:base.name
};



