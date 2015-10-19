(function() {
    var specialKeys = {
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
        if (typeof specialKeys[key] !== 'undefined') {
            code = specialKeys[key];
        } else {
            code = key.charCodeAt(0);
        }
        return (event.keyCode == code);
    }

    function isKeyInArray(keys) {
        for (var i = 0; i < Object.getOwnPropertyNames(keys).length ; i++) {
            var key = Object.getOwnPropertyNames(keys)[i];

            if ((keys[key] in specialKeys) && (event.keyCode == specialKeys[key])) {
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
            return isKeyInArray(keys);
        }
    };
})();