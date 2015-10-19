define(['ModuleView', 'UICalendarBox', 'text!ListPath/tpl.calendar.bar.html'], function (ModuleView, UICalendarBox, tpl) {
    return _.inherit(ModuleView, {

        //此处若是要使用model，处实例化时候一定要保证entity的存在，如果不存在便是业务BUG
        initData: function () {

            this.template = tpl;
            this.events = {
                'click .js_pre_day': 'preAction',
                'click .js_next_day': 'nextAction',
                'click .js_show_calendar': 'showCalendar'
            };

            //初始化时候需要执行的回调
            this.dateEntity.subscribe('init', this.render, this);
            this.dateEntity.subscribe(this.render, this);
            this.dateEntity.subscribe(this.view.refreshList, this.view);

        },

        initDate: function () {
            var t = new Date().getTime();
            //默认情况下获取当前日期，也有过了18.00就设置为第二天日期
            //当时一旦url上有startdatetime参数的话，便需要使用之
            if (_.getUrlParam().startdatetime) t = _.getUrlParam().startdatetime;
            this.dateEntity.initData({
                date: t
            });
        },

        getViewModel: function () {
            var data = this.dateEntity.get();
            data.formatStr = this.dateEntity.getDateStr();
            data.canPreDay = this.dateEntity.canPreDay();
            return data;
        },

        preAction: function () {
            if (this.dateEntity.preDay()) return;
            this.view.showToast('前一天不可预订');
        },

        nextAction: function () {
            this.dateEntity.nextDay();
        },

        showCalendar: function () {
            var scope = this, endDate = new Date();
            var secDate = new Date();
            secDate.setTime(this.dateEntity.getDate());

            endDate.setTime(new Date().getTime() + 2592000000);

            if (!this.calendar) {
                this.calendar = new UICalendarBox({
                    endTime: endDate,
                    selectDate: secDate,
                    onItemClick: function (date, el, e) {
                        scope.dateEntity.set(date);
                        this.hide();
                    }
                });
            } else {
                this.calendar.calendar.selectDate = secDate;
                this.calendar.calendar.refresh();
            }
            this.calendar.show();
        }

    });

});
