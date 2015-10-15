define(['AbstractEntity'], function (AbstractEntity) {

    var Entity = _.inherit(AbstractEntity, {
        propertys: function ($super) {
            $super();
            var n = new Date();
            var curTime = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
            this.data = {
                date: curTime,
                title: '当前日期'
            };
        },

        set: function (date) {
            if (!date) return;
            if (_.isDate(date)) date = date.getTime();
            if (typeof date === 'string') date = parseInt(date);
            this.data.date = date;
            this.update();
        },

        getDateStr: function () {
            var date = new Date();
            date.setTime(this.data.date);
            var dateDetail = _.dateUtil.getDetail(date);
            var name = dateDetail.year + '-' + dateDetail.month + '-' + dateDetail.day + ' ' + dateDetail.weekday + (dateDetail.day1 ? '(' + dateDetail.day1 + ')' : '');
            return name;
        },

        nextDay: function () {
            this.set(this.getDate() + 86400000);
            return true;
        },

        getDate: function () {
            return parseInt(this.data.date);
        },

        //是否能够再往前一天
        canPreDay: function () {
            var n = new Date();
            var curTime = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();

            //如果当前日期已经是第一天，则不可预订
            if (curTime <= this.getDate() - 86400000) {
                return true;
            }
            return false;
        },

        preDay: function () {
            if (!this.canPreDay()) return false;
            this.set(this.getDate() - 86400000);
            return true;
        }

    });

    return Entity;
});
