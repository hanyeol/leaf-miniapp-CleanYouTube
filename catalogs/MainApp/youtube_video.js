function getVideoSize(onResult, onError) {
    __getVideoSize(onResult, onError)
}

function __getVideoSize(onResult, onError) {
    try {
        var video = document.getElementsByTagName('video')[0]
        
        onResult({
            "width":video.style.width,
            "height":video.style.height
        })
    } catch (e) {
        setTimeout(function() {
            __getVideoSize(onResult, onError)
        }, 100)
    }
}

function getVideoTitle(onResult, onError) {
    __getVideoTitle(onResult, onError)
}

function __getVideoTitle(onResult, onError) {
    try {
        var h2 = document.getElementsByClassName('slim-video-metadata-title')[0]

        onResult({
            "title":h2.textContent
        })
    } catch (e) {
        setTimeout(function() {
            __getVideoTitle(onResult, onError)
        }, 100)
    }
}

function unmute(onResult, onError) {
    __unmute(onResult, onError)
}

function __unmute(onResult, onError) {
    try {
        document.getElementsByClassName('ytp-unmute')[0].click()

        onResult()
    } catch (e) {
        setTimeout(function() {
            __unmute(onResult, onError)
        }, 100)
    }
}

(function() {
    var open = window.XMLHttpRequest.prototype.open
    window.XMLHttpRequest.prototype.open = function() {
        if (arguments[1].match(/m\.youtube\.com\/(channel|user|results)/)) {
            __$_bridge.postMessage(JSON.stringify({
                "script":"on_request_url",
                "url":arguments[1]
            }))
        } else {
            return open.apply(this, [].slice.call(arguments));
        }
    }
})()
