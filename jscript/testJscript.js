
/******************begin: test jscript.ajax.js*********************/
function testCreateXHR(){
    jscript.event.addScript('jscript.ajax.js');
    var elem = jscript.dom.getDOMElements('createxhr_but');
    jscript.event.addEvent(elem, 'click', function(){
        var oXHR = jscript.ajax.createXHR();
        alert(oXHR);
    });
}
function testEncode(){
    var elem = jscript.dom.getDOMElements('encode_but');
    jscript.event.addEvent(elem, 'click', function(){
        var str = jscript.ajax.encodeNameAndValue('name', '丘东伟');
        alert(str);
    });
}
/******************end: test jscript.ajax.js*********************/

function loadFunc(){
    testCreateXHR();
    testEncode();
}

jscript.event.addLoadEvent(loadFunc);
