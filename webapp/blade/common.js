/**
 * @file 公共配置文件
 * @author wanglei48@baidu.com, zhaozhixin@baidu.com
 */

(function () {

    // 项目根路径，这个会跟着外层入口index.html而变化
    var app = '../blade/';
    var common = '../common/';
    // 模板路径

    require.config({
        waitSeconds: 60,
        shim: {

        },
        paths: {
            'text': app + 'libs/require.text',
            'css': app + 'libs/require.css',
            'PbMain': common + 'public/pb.main',
            'PbModel': common + 'public/pb.model',
            'AbstractApp': app + 'mvc/abstract.app',
            'AbstractView': app + 'mvc/abstract.view',
            'ModuleView': app + 'mvc/module.view',

            'AbstractModel': app + 'data/abstract.model',
            'AbstractEntity': app + 'mvc/abstract.entity',
            'AbstractStore': app + 'data/abstract.store',
            'AbstractStorage': app + 'data/abstract.storage',

            'cValidate': app + 'common/c.validate',
            'cUser': app + 'common/c.user',

            'HybridHeader': app + 'hybrid/ui.header',


            'UIAbstractView': app + 'ui/ui.abstract.view',
            'UIMask': app + 'ui/ui.mask',
            'UILayer': app + 'ui/ui.layer',
            'UIPageView': app + 'ui/ui.page.view',

            'UIScroll': app + 'ui/ui.scroll',

            'UISlider': app + 'ui/ui.slider',
            'T_UISlider': app + 'ui/ui.slider.html',
            'UIImageSlider': app + 'ui/ui.image.slider',


            'UIScrollLayer': app + 'ui/ui.scroll.layer',
            'T_UIScrollLayer': app + 'ui/ui.scroll.layer.html',

            'UIAlert': app + 'ui/ui.alert',
            'T_UIAlert': app + 'ui/ui.alert.html',

            // 日历
            'UICalendar': app + 'ui/ui.calendar',
            'T_UICalendar': app + 'ui/ui.calendar.html',

            // 日历
            'UICalendarBox': app + 'ui/ui.calendar.box',
            'T_UICalendarBox': app + 'ui/ui.calendar.box.html',

            'APPUIHeader': app + 'ui/app.ui.header',
            'T_APPUIHeader': app + 'ui/app.ui.header.html',

            'UIHeader': app + 'ui/ui.header',
            'T_UIHeader': app + 'ui/ui.header.html',

            'UIToast': app + 'ui/ui.toast',
            'T_UIToast': app + 'ui/ui.toast.html',

            'UILoading': app + 'ui/ui.loading',
            'T_UILoading': app + 'ui/ui.loading.html',


            'UILayerList': app + 'ui/ui.layer.list',
            'T_UILayerList': app + 'ui/ui.layer.list.html',

            'T_UICalendarBox': app + 'ui/ui.calendar.box.html'

        }
    });

})();