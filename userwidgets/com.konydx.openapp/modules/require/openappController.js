define(function () {

    return {
        constructor: function (baseConfig, layoutConfig, pspConfig) {
			this._deviceName = kony.os.deviceInfo().name.toLowerCase();
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function () {

        },

        open: function () {
			if(this._deviceName === "android"){
              this.androidAppLink();
            }else if(this._deviceName === "iphone"){
              this.iosAppLink();
            }
        },
        androidAppLink: function () {
            var KonyMain = java.import("com.konylabs.android.KonyMain");
            this.konyContext = KonyMain.getActivityContext();

            var pm = this.konyContext.getPackageManager();
            var isInstalled;
            try {
                isInstalled = pm.getApplicationInfo(this.bundleId, 0).enabled;
            } catch (e) {
              	kony.application.openURL(this.androidStoreUrl);
                return;
            }
			kony.application.openURL(this.androidScheme + "://" + this.androidHost);			
        },

        iosAppLink: function () {
            try {
                var UIApplication = objc.import("UIApplication");
                var nSURLObj = objc.import("NSURL");
                var url = nSURLObj.URLWithString(this.iosUrlScheme + "://");
                var isAppInstalled = UIApplication.sharedApplication().canOpenURL(url);
              	var appUrl;
              	if(isAppInstalled) {
                  appUrl = this.iosUrlScheme + "://";
                }else{
                  appUrl = this.iosStoreUrl + "";
                }
              	kony.application.openURL(appUrl);
            } catch (e) {
                alert(JSON.stringify(e));
            }
        }

    };
});