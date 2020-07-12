const webjs = require("webjs-helper").initialize("web.video", "__$_bridge")

var __web_loaded = false

function on_loaded() {
    if ($data["video-id"] === document.value("video-id")) {
        view.object("web.video").action("show")

        __on_video_ready()
    } else {
        document.value("video-id", $data["video-id"])
    }

    if (document.value("fullscreen")) {
        if (Date.now() - document.value("fullscreen-at") > 1000) {
            view.object("web.video").action("evaluate", { "script":"exit_fullscreen.js" })
        }
    }
}

function on_web_start(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch")) {
        if (__web_loaded) {
            __on_video_ready()
        }

        return
    }

    if (data["url"].startsWith("https://m.youtube.com/")) {
        if (data["url"].match(/\/(channel|results)/)) {
            controller.action("script", {
                "script":"load_url",
                "subview":"V_HOME",
                "routes-to-topmost":"no",
                "url":data["url"].replace(/[&?]pbj=[0-9]/, "")
            })
            controller.action("subview-back")    
        }

        return
    }
}

function on_web_loaded(data) {
    if (data["url"].startsWith("https://m.youtube.com/watch")) {
        webjs.import("youtube_video.js")
        webjs.call("unmute")
        
        view.object("web.video").action("show")

        __on_video_ready()

        __web_loaded = true

        return
    }
}

function on_web_back() {
    if (!document.value("fullscreen")) {
        document.value("video-id", null)
        controller.action("subview-back")    
    } else {
        controller.action("back")
    }
}

function on_begin_fullscreen() {
    document.value("fullscreen", true)
    document.value("fullscreen-at", new Date())
}

function on_end_fullscreen() {
    document.value("fullscreen", false)
}

function __on_video_ready() {
    webjs.call("getVideoSize").then(function(result) {
        if (parseInt(result["width"]) > parseInt(result["height"])) {
            view.object("web.video").property({ "fullscreen-orientations":"landscape" })
        } else {
            view.object("web.video").property({ "fullscreen-orientations":"portrait" })
        }
    })
}
