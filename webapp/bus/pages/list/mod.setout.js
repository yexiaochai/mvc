define(['ModuleView', 'UILayerList'], function (ModuleView, UILayerList) {

    return _.inherit(ModuleView, {

        //此处若是要使用model，处实例化时候一定要保证entity的存在，如果不存在便是业务BUG
        initData: function () {
            this.events = {
                'click ': 'showSetoutAction'
            };
        },

        showSetoutAction: function () {

            if (this.view.dateList && this.view.dateList.status == 'show') {
                this.view.dateList.hide();
            }

            if (this.view.uiStationList2 && this.view.uiStationList2.status == 'show') {
                this.view.uiStationList2.hide();
            }

            if (this.view.uiStationList && this.view.uiStationList.status == 'show') {
                this.view.uiStationList.hide();
                return;
            }

            var scope = this;
            var data = this.setoutEntity.getList();
            var index = this.setoutEntity.getIndex();

            if (!this.view.uiStationList) {

                //这里注释了车站地图需求
                this.view.uiStationList = new UILayerList({
                    list: data,
                    index: index,
                    onShow: function () {
                        scope.view.d_js_tabs.css('z-index', '3000');
                        scope.view.d_js_show_setstation.addClass('active');
                    },
                    onHide: function () {
                        scope.view.d_js_show_setstation.removeClass('active');
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
                        scope.setoutEntity.setIndex(index);
                        this.hide();
                    }
                });
            } else {
                this.view.uiStationList.list = data;
                this.view.uiStationList.refresh();
            }
            this.view.uiStationList.show();
            this.view.uiStationList.setIndex(index);

        }

    });

});
