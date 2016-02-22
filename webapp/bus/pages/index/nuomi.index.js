define([
    'IndexPath/index'
], function (
    IndexView
) {
    return _.inherit(IndexView, {

        clickAction: function () {
            BNJS.ui.dialog.show({
                title: '测试Dialog',
                message: '我是测试Dialog~~~~',
                ok: 'ok',
                onConfirm: function () {
                    BNJS.ui.toast.show('您刚刚点击了ok按钮');
                }
            });
        },

        //应该只处理差异部分，暂时如此
        initHeader: function (name) {
            var title = '多Webview容器';
            this.header.set({
                view: this,
                title: title,
                back: function () {
                    BNJS.page.back();
                }
            });
        }

    });
});
