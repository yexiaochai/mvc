(function () {
    var project = './';
    var viewRoot = 'pages';

    //这里仅仅需要对list页做A/B Testing
    var ver = 'ver/1.0.0/';

    //在这里设置比例参数，数字0-10，默认A方案为10，只使用最新方案
    //a 方案所占比例为60%
    var APlan = 6;

    //产生1-10随机数，如果条件满足则为plan B 
    var abRandom = parseInt(Math.random() * 10);
    if (abRandom >= APlan) {
        project = './' + ver;
        viewRoot = ver + viewRoot;
    }

    //如果url强制设置plan=b则使用老方案
    if (_.getUrlParam().plan && _.getUrlParam().plan == 'b') {
        project = './' + ver;
        viewRoot = ver + viewRoot;
    }

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
            UIHeader: UIHeader,
            viewRootPath: viewRoot
        });
        window.APP.initApp();
    });
})();
