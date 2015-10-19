define(['AbstractEntity'], function (AbstractEntity) {

    var Entity = _.inherit(AbstractEntity, {
        propertys: function ($super) {
            $super();
            this.data = {
                list: [],
                index: 0
            };
        },

        setIndex: function (i, noEvent) {
            this.data.index = i;
            if (!noEvent) this.update();
        },

        getIndex: function () {
            return this.data.index;
        },

        getList: function () {
            return this.data.list;
        },

        getName: function () {
            return this.getList()[this.getIndex()].name;
        },

        getId: function () {
            return this.getList()[this.getIndex()].id;
        },

        setId: function (id, noEvent) {
            var i, len, data = this.getList();
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].id == id) {
                    this.setIndex(i, noEvent); ;
                    return;
                }
            }
        },

        initData: function (arr, sec) {
            if (typeof arr === 'object' && arr.id) arr = [arr];
            if (!_.isArray(arr)) arr = [];
            this.data.list = [{
                id: '',
                name: '全部车站'
            }].concat(arr);
            this.data.index = 0;
            if (sec) {
                this.setId(sec, true);
            } 

            this.handleData();
            this.publish('init', this.get());
        }

    });

    return Entity;
});
