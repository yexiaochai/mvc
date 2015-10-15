define(['AbstractEntity'], function (AbstractEntity) {

    var Entity = _.inherit(AbstractEntity, {
        propertys: function ($super) {
            $super();
            this.data = {
                list: [],
                index: 0
            };
        },

        initData: function () {
            this.data.list = [
                { id: 0, name: '全天' },
                { id: 1, name: '早上 00:00-12:00' },
                { id: 2, name: '下午 12:00-18:00' },
                { id: 3, name: '晚上 18:00-24:00' }
            ];

            this.handleData();
            this.publish('init', this.get());
        },

        getList: function () {
            return this.data.list;
        },

        setIndex: function (i) {
            this.data.index = i;
        },

        getId: function () {
            return this.data.list[this.data.index].id;
        },

        getName: function () {
            return this.data.list[this.data.index].name;
        },

        setIndex: function (i) {
            this.data.index = i;
            this.update();
        }

    });

    return Entity;
});
