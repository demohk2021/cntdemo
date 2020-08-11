(function Cache() {
    var cacheStatus = '';
    var popupAgainAt = 0;
    setTimeout(function() {
        var appCache = window.applicationCache;
        if (appCache.status === appCache.IDLE) {
            appCache.update();
        }
    }, 3000);

    setInterval(function() {
        var appCache = window.applicationCache;
        if (appCache.status === appCache.IDLE) {
            appCache.update();
        }
    }, 60000);

    setInterval(function() {
        if (cacheStatus !== "UPDATEREADY") {
            var appCache = window.applicationCache;
            switch (appCache.status) {
                case appCache.UNCACHED: // UNCACHED == 0 
                    //console.log('UNCACHED', appCache.status);
                    break;
                case appCache.IDLE: // IDLE == 1 
                    //console.log('IDLE', appCache.status);
                    break;
                case appCache.CHECKING: // CHECKING == 2 
                    //console.log('CHECKING', appCache.status);
                    break;
                case appCache.DOWNLOADING: // DOWNLOADING == 3 
                    //console.log('DOWNLOADING', appCache.status);
                    break;
                case appCache.UPDATEREADY: // UPDATEREADY == 4 
                    //console.log('UPDATEREADY', appCache.status);
                    var current = new Date().getTime();
                    if (popupAgainAt === 0 || current >= popupAgainAt) {
                        cacheStatus = "UPDATEREADY";
                        app.dialog.confirm("Click OK, get a latest version.\nClick CANCEL, popup again after 5 mins.", "Version Update", function() {
                            appCache.swapCache();
                            window.location.reload();
                        }, function() {
                            cacheStatus = "CANCEL";
                            popupAgainAt = new Date().getTime() + 5 * 60 * 1000;
                        });
                    }
                    break;
                case appCache.OBSOLETE: // OBSOLETE == 5
                    //console.log('OBSOLETE', appCache.status);
                    break;
                default:
                    //console.log('UKNOWN', appCache.status);
                    break;
            };
        }
    }, 10000);

})();