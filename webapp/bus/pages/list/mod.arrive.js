define(['ModuleView', 'UILayerList'], function (ModuleView, UILayerList) {

    return _.inherit(ModuleView, {

        //此处若是要使用model，处实例化时候一定要保证entity的存在，如果不存在便是业务BUG
        initData: function () {
            this.events = {
                'click ': 'showArrivAction'
            };
        },

        showArrivAction: function () {

            if (this.view.dateList && this.view.dateList.status == 'show') {
                this.view.dateList.hide();
            }

            if (this.view.uiStationList && this.view.uiStationList.status == 'show') {
                this.view.uiStationList.hide();
            }

            if (this.view.uiStationList2 && this.view.uiStationList2.status == 'show') {
                this.view.uiStationList2.hide();
                return;
            }

            var scope = this;
            var data = this.arriveEntity.getList();
            var index = this.arriveEntity.getIndex();

            if (!this.view.uiStationList2) {

                //这里注释了车站地图需求
                this.view.uiStationList2 = new UILayerList({
                    list: data,
                    onShow: function () {
                        scope.view.d_js_tabs.css('z-index', '3000');
                        scope.view.d_js_show_arrivalstation.addClass('active');
                    },
                    onHide: function () {
                        scope.view.d_js_show_arrivalstation.removeClass('active');
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
                        scope.arriveEntity.setIndex(index);
                        this.hide();
                    }
                });
            } else {
                this.view.uiStationList2.list = data;
                this.view.uiStationList2.refresh();
            }
            this.view.uiStationList2.show();
            this.view.uiStationList2.setIndex(index);

        }

    });

});
