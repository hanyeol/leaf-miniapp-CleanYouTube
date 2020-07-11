document.addEventListener('DOMContentLoaded', function() {
    var cleanup_contents_style = document.createElement('style');

    cleanup_contents_style.innerHTML = `
        .ad-container,
        .ad-div,
        .masthead-ad-control,
        .video-ads,
        .ytp-ad-progress-list,
        .companion-ad-container,
        #ad_creative_3,
        #footer-ads,
        #masthead-ad,
        #player-ads,
        .ytd-mealbar-promo-renderer,
        #watch-channel-brand-div,
        #watch7-sidebar-ads {
            display: none !important;
        }
    `;

    document.head.appendChild(cleanup_contents_style);
})
