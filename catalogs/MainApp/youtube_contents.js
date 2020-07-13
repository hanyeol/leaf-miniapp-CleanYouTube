(function() {
    var open = window.XMLHttpRequest.prototype.open
    window.XMLHttpRequest.prototype.open = function() {
        if (arguments[1].match(/m\.youtube\.com\/watch/)) {
            __$_bridge.postMessage(JSON.stringify({
                "script":"on_request_url",
                "url":arguments[1]
            }))
        } else {
            return open.apply(this, [].slice.call(arguments));
        }
    }
})()
