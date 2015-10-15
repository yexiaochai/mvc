(function () {
    var project = './';
    var viewRoot = 'pages';
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
    require(['AbstractApp', 'UIHeader'], function (APP, UIHeader) {
        window.APP = new APP({
            //配置未组件化的城市列表路径
//            viewMapping: {
//                city: 'views/city'
//            },
            UIHeader: UIHeader,
            viewRootPath: viewRoot
        });
        window.APP.initApp();
    });
})();
