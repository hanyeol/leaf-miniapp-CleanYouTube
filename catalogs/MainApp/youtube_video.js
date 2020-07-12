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
