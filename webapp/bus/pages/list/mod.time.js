define(['ModuleView', 'UILayerList'], function (ModuleView, UILayerList) {

    return _.inherit(ModuleView, {

        //此处若是要使用model，处实例化时候一定要保证entity的存在，如果不存在便是业务BUG
        initData: function () {
            this.events = {
                'click ': 'showTimeAction'
            };
        },

        showTimeAction: function () {

            if (this.view.uiStationList && this.view.uiStationList.status == 'show') {
                this.view.uiStationList.hide();
            }
            if (this.view.uiStationList2 && this.view.uiStationList2.status == 'show') {
                this.view.uiStationList2.hide();
            }
            if (this.view.dateList && this.view.dateList.status == 'show') {
                this.view.dateList.hide();
                return;
            }

            var scope = this;
            var data = this.timeEntity.getList();
            if (!this.view.dateList) {
                this.view.dateList = new UILayerList({
                    list: data,
                    index: 0,
                    onShow: function () {
                        scope.view.d_js_tabs.css('z-index', '3000');
                        scope.view.d_js_show_setoutdate.addClass('active');
                    },
                    onHide: function () {
                        scope.view.d_js_show_setoutdate.removeClass('active');
                        scope.view.d_js_tabs.css('z-index', '500');
                    },
                    reposition: function () {
                        this.$el.css({
                            'position': 'fixed',
                            '-webkit-box-sizing': 'border-box',
                            'box-sizing': 'border-box',
                            'width': '100%',
                            'left': '0',
                            'bottom': '45px'
                        });
                    },
                    onItemAction: function (data, index) {
                        scope.timeEntity.setIndex(index);
                        this.hide();
                    }
                });
            }
            this.view.dateList.show();

        }

    });

});
