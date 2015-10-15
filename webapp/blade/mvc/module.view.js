define([], function () {
    'use strict';

    return _.inherit({

        propertys: function () {
            //这里设置UI的根节点所处包裹层，必须设置
            this.$el = null;

            //用于定位dom的选择器
            this.selector = '';

            //每个moduleView必须有一个父view，页面级容器
            this.view = null;

            //模板字符串，各个组件不同，现在加入预编译机制
            this.template = '';

            //事件机制
            this.events = {};

            //实体model，跨模块通信的桥梁
            this.entity = null;
        },

        setOption: function (options) {
            //这里可以写成switch，开始没有想到有这么多分支
            for (var k in options) {
                if (k == 'events') {
                    _.extend(this[k], options[k]);
                    continue;
                }
                this[k] = options[k];
            }
            //      _.extend(this, options);
        },

        //@override
        initData: function () {
        },

        //如果传入了dom便
        initWrapper: function (el) {
            if (el && el[0]) {
                this.$el = el;
                return;
            }
            this.$el = this.view.$(this.selector);
        },

        initialize: function (opts) {

            //这种默认属性
            this.propertys();
            //根据参数重置属性
            this.setOption(opts);
            this.initData();

            this.initWithoutRender();

        },

        //处理dom已经存在，不需要渲染的情况
        initWithoutRender: function () {
            if (this.template) return;
            var scope = this;
            this.view.on('onShow', function () {
                scope.initWrapper();
                if (!scope.$el[0]) return;
                //如果没有父view则不能继续
                if (!scope.view) return;
                scope.initElement();
                scope.bindEvents();
            });
        },

        $: function (selector) {
            return this.$el.find(selector);
        },

        //实例化需要用到到dom元素
        initElement: function () { },

        //@override
        //收集来自各方的实体组成view渲染需要的数据，需要重写
        getViewModel: function () {
            throw '必须重写';
        },

        _render: function (callback) {
            var data = this.getViewModel() || {};
            var html = this.template;
            if (!this.template) return '';
            //引入预编译机制
            if (_.isFunction(this.template)) {
                html = this.template(data);
            } else {
                html = _.template(this.template)(data);
            }
            typeof callback == 'function' && callback.call(this);
            return html;
        },

        //渲染时必须传入dom映射
        render: function () {
            this.initWrapper();
            if (!this.$el[0]) return;

            //如果没有父view则不能继续
            if (!this.view) return;

            var html = this._render();
            this.$el.html(html);
            this.initElement();
            this.bindEvents();

        },

        bindEvents: function () {
            var events = this.events;

            if (!(events || (events = _.result(this, 'events')))) return this;
            this.unBindEvents();

            // 解析event参数的正则
            var delegateEventSplitter = /^(\S+)\s*(.*)$/;
            var key, method, match, eventName, selector;

            // 做简单的字符串数据解析
            for (key in events) {
                method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) continue;

                match = key.match(delegateEventSplitter);
                eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateUIEvents' + this.id;

                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }

            return this;
        },

        unBindEvents: function () {
            this.$el.off('.delegateUIEvents' + this.id);
            return this;
        }
    });

});
