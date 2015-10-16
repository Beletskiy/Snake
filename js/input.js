(function() {
    var keys1 = {
        SHIFT: 16,
        CTRL: 17,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        w: 87,
        s: 83,
        a: 65,
        d: 68,
    };

    function isKey(key) {
        var code;
        if (typeof keys1[key] !== 'undefined') {
            code = keys1[key];
        } else {
            code = key.charCodeAt(0);
        }
        return (event.keyCode == code);
    }

   /* function isKeyInArray(keys) {
        var code = null;
        for (var i = 0; i < Object.getOwnPropertyNames(keys).length ; i++) {
          //  var key = keys[i];
            var key = Object.getOwnPropertyNames(keys)[i];
            //console.log(key);
            if (typeof keys[key] !== 'undefined') {
                code = keys[key];
                console.log(code);
            } else {
                code = key.charCodeAt(0);
                console.log(code);
            }
        }
        if (event.keyCode == code) {
            return code;
        }
    } */

    function isKeyInArray(keys) {
        var code = null;
        for (var i = 0; i < Object.getOwnPropertyNames(keys).length ; i++) {
            var key = Object.getOwnPropertyNames(keys)[i];
             //keys - Object {UP: "w", DOWN: "s", LEFT: "a", RIGHT: "d"} or Object {UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"}

            //console.log(key); //up down left right up down left right
            //console.log(keys[key]); // w s a d up down left right
           //console.log(keys[key].charCodeAt(0));
            if ((keys[key] in keys1) && (event.keyCode == keys1[key])) {
                console.log(key);
                return key;
            } else  {
                for (var i in keys) {
                    //console.log(keys[i]);
                    if (String.fromCharCode(event.keyCode).toLowerCase() == keys[i]) {
                        //console.log(i);
                        return i;
                    }
                }

            }
        }
    }

    window.input = {
        isKey: function(key) {
            return isKey(key.toUpperCase());
        },
        isKeyInArray : function (keys) {
           // console.log(isKeyInArray(keys));
            return isKeyInArray(keys);
        }
    };
})();