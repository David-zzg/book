//引入事件模块
var events = require("events");

//创建事件监听的一个对象
var  emitter = new events.EventEmitter();
module.exports = emitter
// //监听事件some_event
// emitter.addListener("some_event",function(){
//     console.log("事件触发，调用此回调函数");
// });

// //触发事件some_event
// emitter.emit("some_event");