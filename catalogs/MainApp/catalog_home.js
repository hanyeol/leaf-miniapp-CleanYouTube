var __history_to_back = document.value("youtube.history_to_back") || 0

function on_loaded() {
    if (document.value("web.failed")) {
        view.object("section.error").action("show")
    } else {
        view.object("web").action("show")
    }
}

function on_web_start(data) {
    if (data["is-for-main-frame"] === "yes") {
        view.object("section.error").action("hide")

        timeout(1, function() {
            if (!document.value("web.failed")) {
                view.object("web").action("show")

                view.object("effect.loading").action("hide")
            }
        })
    } else {
        __handle_url_to_start(data["url"])
    }
}

function on_web_failed(data) {
    if (data["is-for-main-frame"] === "yes") {
        view.object("section.error").action("show")

        view.object("web").action("hide")
        view.object("effect.loading").action("hide")
    
        controller.action("toast", { 
            "message":controller.catalog().string("웹페이지를 로드할 수 없습니다.")
        })
    
        document.value("web.failed", true)    
    }
}

function reload() {
    timeout(0.5, function() {
        view.object("web").action("reload")
    })

    view.object("effect.loading").action("show")
    view.object("effect.loading").action("play")

    document.value("web.failed", false)
}

function on_back() {
    if (__history_to_back > 0) {
        view.object("web").action("evaluate", {
            "script":"window.history.go(-" + __history_to_back + ")"
        })

        __history_to_back = 0;
        document.value("youtube.history_to_back", __history_to_back)
    } else {
        controller.action("back")
    }
}

function __handle_url_to_start(url) {
    if (url.search(/m.youtube.com\/watch\?/) != -1) {
        __disable_pull_to_refresh()

        __history_to_back += 1
        document.value("youtube.history_to_back", __history_to_back)

        return;
    } 
    
    if (url.search(/m.youtube.com\/(feed|results|channel|\?)/) != -1) {
        __enable_pull_to_refresh()

        return;
    }
}

function __enable_pull_to_refresh() {
    view.object("web").property({
        "reloads-when-pull":"yes"
    })
}

function __disable_pull_to_refresh() {
    view.object("web").property({
        "reloads-when-pull":"no"
    })
}
