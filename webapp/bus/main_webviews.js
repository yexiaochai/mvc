(function () {
    var project = './';
    var viewRoot = 'pages';

    //需要封装的方法，获取当前平台
    var getPlatform = function () {
        var platform = null;
        var ua = navigator.userAgent.toLowerCase();
        //暂时只判断糯米，待补充
        if (ua.indexOf('bdnuomi') != -1) {
            platform = 'nuomi';
        }

        return platform;
    };

    require.config({
        paths: {
            //BUS相关模板根目录
            IndexPath: project + 'pages/index',
            ListPath: project + 'pages/list',
            CityPath: project + 'pages/city',

            TemplatePath: project + 'templates',

            BusStore: project + 'model/bus.store',
            BusModel: project + 'model/bus.model'
        }
    });

    //处理多容器header问题，真实场景该代码需要重构
    var modules = ['AbstractApp'];

    if (getPlatform() == 'nuomi') {
        modules.push('NuomiHeader');
    } else {
        modules.push('UIHeader');
    }

    require(modules, function (APP, UIHeader) {

        window.APP = new APP({
            App_Mapping: {
                nuomi: [
                    'index'
                ]
            },
            //            @override
            //            buildUrl: function (path) {
            //                var mappingPath = this.viewMapping[path];
            //                return mappingPath ? mappingPath : this.viewRootPath + '/' + path + '/' + path;
            //            },
            //重写掉底层view实例加载规则，如果Webview容器设置了，并且处于该环境便加载之
            buildUrl: function (path) {
                var mappingPath = this.viewMapping[path];
                var _file = path;

                //当前平台，未设置为浏览器
                var platform = null;

                //底层方法获取当前平台，该方法需要补充，这里做简单实现
                platform = getPlatform();

                //最简单处理办法，如果当前处于某一app容器中，并且需要做特殊处理（App_Mapping有配置），则加载之
                if (platform && this.App_Mapping[platform] && _.indexOf(this.App_Mapping[platform], _file) != -1) {
                    _file = platform + '.' + _file;
                }

                return mappingPath ? mappingPath : this.viewRootPath + '/' + path + '/' + _file;
            },

            UIHeader: UIHeader,
            viewRootPath: viewRoot
        });

        //如果是糯米平台需要做特殊处理，准备工作必不可少
        //需要等平台app注入成功后才能实例化APP
        if (getPlatform() == 'nuomi') {
            var BNJSReady = function (readyCallback) {
                if (readyCallback && typeof readyCallback == 'function') {
                    if (window.BNJS && typeof window.BNJS == 'object' && BNJS._isAllReady) {
                        readyCallback();
                    } else {
                        document.addEventListener('BNJSReady', function () {
                            readyCallback();
                        }, false)
                    }
                }
            };

            BNJSReady(function () {
                window.APP.initApp();
            });
            return;
        }


        window.APP.initApp();
    });
})();
