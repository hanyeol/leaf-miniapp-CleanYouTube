const webjs = require("webjs-helper").initialize("web.video", "__$_bridge")

function on_loaded() {
    if (document.value("video.loaded")) {
        webjs.import("youtube_video.js")
    }

    if ($data["video-id"] === document.value("video-id")) {
        view.object("web.video").property({ "alpha":"0" }) 
        timeout(0.2, function() {
            view.object("web.video").property({ "alpha":"1" })
        })
        view.object("web.video").action("show")            

        __on_video_ready()
    } else {
        document.value("video-id", $data["video-id"])
        view.object("effect.loading").action("show")
    }
}

function on_touched() {
    if ($env["MINIMIZED"] == "yes") {
        controller.action("maximize")
    }    
}

function on_web_loaded(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch")) {
        webjs.import("youtube_video.js")
        webjs.call("unmute")

        view.object("web.video").action("show")
        view.object("effect.loading").action("hide")

        document.value("video.loaded", true)

        __on_video_ready()

        return
    }
}

function on_web_start(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch")) {
        if (document.value("video.loaded")) {
            __on_video_ready()
        }

        return
    }
}

function on_web_back() {
    if (!document.value("fullscreen")) {
        controller.action("minimize")    
    } else {
        controller.action("back")
    }
}

function on_request_url(data) {
    controller.action("script", {
        "script":"on_request_url",
        "subview":"V_HOME",
        "routes-to-topmost":"no",
        "url":data["url"].replace(/[&?]pbj=[0-9]/, "")
    })
    controller.action("minimize")    
}

function on_begin_fullscreen() {
    document.value("fullscreen", true)
}

function on_end_fullscreen() {
    document.value("fullscreen", false)
}

function close() {
    controller.action("subview-back")
}

function __on_video_ready() {
    webjs.call("getVideoSize").then(function(result) {
        if (parseInt(result["width"]) > parseInt(result["height"])) {
            view.object("web.video").property({ "fullscreen-orientations":"landscape" })
        } else {
            view.object("web.video").property({ "fullscreen-orientations":"portrait" })
        }
    })

    webjs.call("getVideoTitle").then(function(result) {
        controller.catalog().submit("subcatalog", "", "video", {
            "video-id":$data["video-id"],
            "title":result["title"].replace(/"/g, "\\\"")
        })
        view.object("label.title").property({ "text":result["title"] })
    })
}
