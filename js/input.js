(function() {
    var keys1 = {
        SHIFT: 16,
        CTRL: 17,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
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
        for (var i = 0; i < Object.getOwnPropertyNames(keys).length ; i++) {
            var key = Object.getOwnPropertyNames(keys)[i];

            if ((keys[key] in keys1) && (event.keyCode == keys1[key])) {
                return key;
            } else  {
                for (var j in keys) {
                    if (String.fromCharCode(event.keyCode).toLowerCase() == keys[j]) {
                        return j;
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