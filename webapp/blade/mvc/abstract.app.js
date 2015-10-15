define([
  'UIHeader',
  'UIToast',
  'UILoading',
  'UIPageView',
  'UIAlert'
], function (UIHeader, UIToast, UILoading, UIPageView, UIAlert) {

    return _.inherit({
        propertys: function () {
            //view搜索目录
            this.viewRootPath = 'views/';

            //默认view
            this.defaultView = 'index';

            //当前视图路径
            this.viewId;
            this.viewUrl;

            //视图集
            this.views = {};

            //是否开启单页应用
            //      this.isOpenWebapp = _.getHybridInfo().platform == 'baidubox' ? true : false;
            this.isOpenWebapp = true;

            this.viewMapping = {};

            //UIHeader需要释放出来
            this.UIHeader = UIHeader;

            this.interface = [
                'forward',
                'back',
                'jump',
                'showPageView',
                'hidePageView',
                'showLoading',
                'hideLoading',
                'showToast',
                'hideToast',
                'showMessage',
                'hideMessage',
                'showConfirm',
                'hideConfirm',
                'openWebapp',
                'closeWebapp'
            ];

        },

        initialize: function (options) {
            this.propertys();
            this.setOption(options);
            this.initViewPort();
            this.initAppMapping();

            //开启fastclick
            $.bindFastClick && $.bindFastClick();

        },

        setOption: function (options) {
            _.extend(this, options);
        },

        //创建dom结构
        initViewPort: function () {

            this.d_header = $('#headerview');
            this.d_state = $('#js_page_state');
            this.d_viewport = $('#main');

            //实例化全局使用的header，这里好像有点不对
            this.header = new this.UIHeader({
                wrapper: this.d_header
            });

            //非共享资源，这里应该引入app概念了
            this.pageviews = {};
            this.toast = new UIToast();
            this.loading = new UILoading();
            this.alert = new UIAlert();
            this.confirm = new UIAlert();
        },

        openWebapp: function () {
            this.isOpenWebapp = true;
        },

        closeWebapp: function () {
            this.isOpenWebapp = false;
        },

        showPageView: function (name, _viewdata_, id) {
            var view = null, k, scope = this.curViewIns || this;
            if (!id) id = name;
            if (!_.isString(name)) return;
            //    for (k in _viewdata_) {
            //      if (_.isFunction(_viewdata_[k])) _viewdata_[k] = $.proxy(_viewdata_[k], scope);
            //    }
            view = this.pageviews[id];
            var arr = name.split('/');
            if (!view) {
                view = new UIPageView({
                    // bug fixed by zzx
                    viewId: arr[arr.length - 1] || name,
                    viewPath: this.buildUrl(name) || name,
                    _viewdata_: _viewdata_,
                    onHide: function () {
                        scope.initHeader();
                    }
                });
                this.pageviews[id] = view;
            } else {
                view.setViewData(_viewdata_);
            }
            view.show();

        },

        hidePageView: function (name) {
            if (name) {
                if (this.pageviews[name]) this.pageviews[name].hide();
            } else {
                for (var k in this.pageviews) this.pageviews[k].hide();
            }
        },

        showLoading: function () {
            this.loading.show();
        },

        hideLoading: function () {
            this.loading.hide();
        },

        showToast: function (msg, callback) {
            this.toast.resetDefaultProperty();
            this.toast.content = msg;
            if (callback) this.toast.hideAction = callback;
            this.toast.refresh();
            this.toast.show();
        },

        hideToast: function () {
            this.toast.hide();
        },

        showMessage: function (param) {
            if (_.isString(param)) {
                param = { content: param };
            }

            this.alert.resetDefaultProperty();
            this.alert.setOption(param);
            this.alert.refresh();
            this.alert.show();
        },

        hideMessage: function () {
            this.alert.hide();
        },

        showConfirm: function (params) {
            if (!params) params = {};
            if (typeof params == 'string') {
                params = {
                    content: params
                };
            }

            this.confirm.resetDefaultProperty();

            //与showMessage不一样的地方
            this.confirm.btns = [
              { name: '取消', className: 'cm-btns-cancel js_cancel' },
              { name: '确定', className: 'cm-btns-ok js_ok' }
            ];
            this.confirm.setOption(params);
            this.confirm.refresh();
            this.confirm.show();
        },

        hideConfirm: function () {
            this.confirm.hide();
        },

        //初始化app
        initApp: function () {

            //首次加载不需要走路由控制
            this.loadViewByUrl();

            //后面的加载全部要经过路由处理
            if (this.isOpenWebapp === true)
                $(window).on('popstate.app', $.proxy(this.loadViewByUrl, this));

        },

        loadViewByUrl: function (e) {
            this.hidePageView();

            var url = decodeURIComponent(location.href).toLowerCase();
            var viewId = this.getViewIdRule(url);

            viewId = viewId || this.defaultView;
            this.viewId = viewId;
            this.viewUrl = url;
            this.switchView(this.viewId);

        },

        //@override
        getViewIdRule: function (url) {
            var viewId = '', hash = '';
            var reg = /webapp\/.+\/(.+)\.html/;

            var match = url.match(reg);
            if (match && match[1]) viewId = match[1];

            return viewId;
        },

        //@override
        setUrlRule: function (viewId, param, replace, project) {
            var reg = /(webapp\/.+\/)(.+)\.html/;
            var url = window.location.href;
            var match = url.match(reg);
            var proj = project ? 'webapp/' + project : match[1];
            var preUrl = '', str = '', i = 0, _k, _v;
            //这里这样做有点过于业务了 *bug*
            var keepParam = [
              'us'
            ], p;
            if (!viewId) return;
            if (!match || !match[1]) {
                preUrl = url + '/webapp/bus/' + viewId + '.html';
            } else {
                preUrl = url.substr(0, url.indexOf(match[1])) + proj + viewId + '.html'; ;
            }

            //特定的参数将会一直带上去，渠道、来源等标志
            for (i = 0; i < keepParam.length; i++) {
                p = keepParam[i];
                if (_.getUrlParam()[p]) {
                    if (!param) param = {};
                    param[p] = _.getUrlParam()[p];
                }
            }

            i = 0;

            for (k in param) {
                _k = encodeURIComponent(_.removeAllSpace(k));
                _v = encodeURIComponent(_.removeAllSpace(param[k]));
                if (i === 0) {
                    str += '?' + _k + '=' + _v;
                    i++;
                } else {
                    str += '&' + _k + '=' + _v;
                }
            }

            url = preUrl + str;

            if (this.isOpenWebapp === false) {
                window.location = url;
                return;
            }

            if (replace) {
                history.replaceState('', {}, url);
            } else {
                history.pushState('', {}, url);
            }

        },

        switchView: function (id) {

            var curView = this.views[id];

            //切换前的当前view，马上会隐藏
            var tmpView = this.curView;

            if (tmpView && tmpView != curView) {
                this.lastView = tmpView;
            }

            //加载view样式，权宜之计
            //      this.loadViewStyle(id);

            //如果当前view存在，则执行请onload事件
            if (curView) {

                //如果当前要跳转的view就是当前view的话便不予处理
                //这里具体处理逻辑要改*************************************
                if (curView == this.curView) {
                    this.curView.show();
                    return;
                }

                this.curView = curView;
                this.curView.show();
                this.lastView && this.lastView.hide();
            } else {

                //        this.showLoading();
                this.loadView(id, function (View) {
                    //每次加载结束将状态栏隐藏，这个代码要改
                    //          this.hideLoading();

                    this.curView = new View({
                        viewId: id,
                        refer: this.lastView ? this.lastView.viewId : null,
                        APP: this,
                        wrapper: this.d_viewport
                    });

                    //设置网页上的view标志
                    this.curView.$el.attr('page-url', id);

                    //保存至队列
                    this.views[id] = this.curView;

                    this.curView.show();
                    this.lastView && this.lastView.hide();

                });
            }
        },

        //加载view
        loadView: function (path, callback) {
            var self = this;
            requirejs([this.buildUrl(path)], function (View) {
                callback && callback.call(self, View);
            });
        },

        //override
        //配置可能会有的路径扩展，为Hybrid与各个渠道做适配
        initAppMapping: function () {
            //            console.log('该方法必须被重写');
        },

        //@override
        buildUrl: function (path) {
            var mappingPath = this.viewMapping[path];
            return mappingPath ? mappingPath : this.viewRootPath + '/' + path + '/' + path;
        },

        //此处需要一个更新逻辑，比如在index view再点击到index view不会有反应，下次改**************************
        forward: function (viewId, param, replace) {
            if (!viewId) return;
            viewId = viewId.toLowerCase();

            this.setUrlRule(viewId, param, replace);
            this.loadViewByUrl();
        },
        jump: function (path, param, replace) {
            var viewId;
            var project;
            if (!path) {
                return;
            }
            path = path.toLowerCase().split('/');
            if (path.length <= 0) {
                return;
            }
            viewId = path.pop();
            project = path.length === 1 ? path.join('') + '/' : path.join('');
            this.setUrlRule(viewId, param, replace, project);
            this.loadViewByUrl();
        },
        back: function (viewId, param, replace) {
            if (viewId) {
                this.forward(viewId, param, replace)
            } else {
                if (window.history.length == 1) {
                    this.forward(this.defaultView, param, replace)
                } else {
                    history.back();
                }
            }
        }

    });

});
