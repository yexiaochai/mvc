define(['AbstractModel', 'BusStore'], function (AbstractModel, BusStore) {

    var BaseModel = _.inherit(AbstractModel, {

        initDomain: function () {
            //复杂的环境问题
            //......
            this.domain = 'api.kuai.baidu.com';
        },

        propertys: function ($super) {
            $super();

            this.initDomain();

            var t = (new Date().getTime()).toString();
            this.path = '';

            this.cacheData = null;
            this.param = {
                head: {
                    us: '',
                    version: '1.0.0',
                    ct: 3,
                    time: t.substr(0, t.length - 3),
                    sign:''
                }
            };
            this.dataType = 'jsonp';
            this.ajaxOnly = false;

            this.errorCallback = function () { };

            //统一处理分返回验证
            this.pushValidates(function (data) {
                return this.baseDataValidate(data);
            });

        },

        //首轮处理返回数据，检查错误码做统一验证处理
        baseDataValidate: function (data) {
            if (_.isString(data)) data = JSON.parse(data);
            if (data.errno === 0) return true;
            if (window.APP && data && data.msg) window.APP.showToast(data.msg, this.errorCallback);
            return false;
        },

        dataformat: function (data) {
            if (_.isString(data)) data = JSON.parse(data);
            if (data.data) return data.data;
            return data;
        },

        buildurl: function () {
            return this.protocol + '://' + this.domain + this.path + (typeof this.url === 'function' ? this.url() : this.url);
        },

        getSign: function () {
            var param = this.getParam() || {};
            return JSON.stringify(param);
        },

        onDataSuccess: function (fdata, data) {
            if (this.cacheData && this.cacheData.set)
                this.cacheData.set(fdata, this.getSign());
        },

        execute: function ($super, onComplete, onError, ajaxOnly, scope) {
            var data = null;
            if (!ajaxOnly && !this.ajaxOnly && this.cacheData && this.cacheData.get) {
                data = this.cacheData.get(this.getSign());
                if (data) {
                    onComplete(data);
                    return;
                }
            }
            $super(onComplete, onError, ajaxOnly, scope);
        }

    });


    return {

        SCityModel: _.inherit(BaseModel, {
            //默认属性
            propertys: function ($super) {
                $super();
                this.url = '/city/getstartcitys';
                this.cacheData = BusStore.SCityStore.getInstance();
            }
        }),

        ECityModel: _.inherit(BaseModel, {
            //默认属性
            propertys: function ($super) {
                $super();
                this.url = '/city/getarrivalcitys';
                this.cacheData = BusStore.ECityStore.getInstance();

            }
        }),

        SCitySearchModel: _.inherit(BaseModel, {
            //默认属性
            propertys: function ($super) {
                $super();
                this.url = '/city/searchstart';
                //        this.cacheData = BusStore.ECitySearchStore.getInstance();
            }
        }),

        ECitySearchModel: _.inherit(BaseModel, {
            //默认属性
            propertys: function ($super) {
                $super();
                this.url = '/city/searcharrival';
                //        this.cacheData = BusStore.ECitySearchStore.getInstance();
            }
        }),

        ListModel: _.inherit(BaseModel, {
            //默认属性
            propertys: function ($super) {
                $super();
                this.url = '/schedule/list';
                this.cacheData = BusStore.ListStore.getInstance();

            }
        })
    };
});
