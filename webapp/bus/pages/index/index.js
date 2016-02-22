define([
    'AbstractView',
    'text!IndexPath/tpl.layout.html'
], function (
    AbstractView,
    layoutHtml
) {
    return _.inherit(AbstractView, {
        propertys: function ($super) {
            $super();
            this.template = layoutHtml;
            this.events = {
                'click .js_clickme': 'clickAction'
            };
        },

        clickAction: function () {
            this.showMessage('显示消息');
        },

        initHeader: function (name) {
            var title = '多Webview容器';
            this.header.set({
                view: this,
                title: title,
                back: function () {
                    console.log('回退');
                }
            });
        }
    });
});
