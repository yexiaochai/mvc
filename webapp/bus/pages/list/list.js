define([
    'AbstractView',
    'text!ListPath/list.css',
    'text!ListPath/tpl.list.html',

    'ListPath/en.station',
    'ListPath/en.date',
    'ListPath/en.time',

    'ListPath/mod.date',
    'ListPath/mod.time',
    'ListPath/mod.setout',
    'ListPath/mod.arrive',

    'BusModel',

    'text!ListPath/tpl.layout.html',
    'text!ListPath/tpl.search.box.html',
    'UIScrollLayer'
], function (
    AbstractView,
    style,
    listTpl,

    StationEntity,
    DateEntity,
    TimeEntity,

    DateModule,
    TimeModule,
    SetoutModule,
    ArriveModule,

    BusModel,

    layoutHtml,
    searchBoxHtml,
    UIScrollLayer
) {
    return _.inherit(AbstractView, {

        _initEntity: function () {
            this.dateEntity = new DateEntity();

            this.timeEntity = new TimeEntity();
            this.timeEntity.subscribe('init', this.renderTime, this);
            this.timeEntity.subscribe(this.renderTime, this);
            this.timeEntity.subscribe(this.refreshList, this);

            this.setoutEntity = new StationEntity();
            this.setoutEntity.subscribe('init', this.renderSetout, this);
            this.setoutEntity.subscribe(this.renderSetout, this);
            this.setoutEntity.subscribe(this.refreshList, this);

            this.arriveEntity = new StationEntity();
            this.arriveEntity.subscribe('init', this.renderArrive, this);
            this.arriveEntity.subscribe(this.renderArrive, this);
            this.arriveEntity.subscribe(this.refreshList, this);

        },

        _initModule: function () {
            this.dateModule = new DateModule({
                view: this,
                selector: '.js_calendar_wrapper',
                dateEntity: this.dateEntity
            });

            this.timeModule = new TimeModule({
                view: this,
                selector: '.js_show_setoutdate',
                timeEntity: this.timeEntity
            });

            this.setOutModule = new SetoutModule({
                view: this,
                selector: '.js_show_setstation',
                setoutEntity: this.setoutEntity
            });

            this.arriveModule = new ArriveModule({
                view: this,
                selector: '.js_show_arrivalstation',
                arriveEntity: this.arriveEntity
            });

        },

        propertys: function ($super) {
            $super();

            this._initEntity();
            this._initModule();

            this.style = style;
            this.template = layoutHtml;

            //主控制器业务属性
            this.urlData = {
                start: {},
                end: {}
            };

            this.needInitStations = true;

            this.listModel = BusModel.ListModel.getInstance();

            this.events = {
                'click .js_bus_list li': 'toBooking'
            };

        },

        toBooking: function (e) {
            if (this.$el.hasClass('page-list--search')) return;
            var el = $(e.currentTarget);
            var id = el.attr('data-key');
            var scope = this;

            if (el.hasClass('disabled')) {
                this.showToast('不可预订');
                return;
            }

            window.location.href = 'http://kuai.baidu.com/webapp/bus/booking.html?id=' + id;
        },

        initHeader: function (name) {
            var title = '班次列表';
            this.header.set({
                view: this,
                title: title,
                back: function () {
                    console.log('回退');
                },
                right: [
                    {
                        tagname: 'search-bar',
                        value: '搜索',
                        callback: function () {
                            this.showSearchBox();
                        }
                    }
                ]
            });
        },

        initElement: function () {
            this.d_list_wrapper = this.$('.js_list_wrapper');
            this.d_none_data = this.$('.js_none_data');

            this.d_js_show_setoutdate = this.$('.js_show_setoutdate');
            this.d_js_show_setstation = this.$('.js_show_setstation');
            this.d_js_show_arrivalstation = this.$('.js_show_arrivalstation');
            this.d_js_list_loading = this.$('.js_list_loading');
            this.d_js_tabs = this.$('.js_tabs');

            this.d_js_day_sec = this.$('.js_day_sec');
            this.d_js_start_sec = this.$('.js_start_sec');
            this.d_js_arrival_sec = this.$('.js_arrival_sec');
        },

        //搜索工具弹出层
        showSearchBox: function () {
            var scope = this;
            if (!this.searchBox) {
                this.searchBox = new UIScrollLayer({
                    title: '请选择搜索条件',
                    html: searchBoxHtml,
                    events: {
                        'click .js-start': function (e) {
                            scope._showCityView('start', $(e.currentTarget));
                        },
                        'click .js-arrive': function (e) {
                            scope._showCityView('end', $(e.currentTarget));
                        },
                        'click .js_search_list': function () {
                            var param = {};

                            if (!scope.urlData.start.id) {
                                scope.showToast('请先选择出发城市');
                                return;
                            }

                            if (!scope.urlData.end.id) {
                                scope.showToast('请先选择到达城市');
                                return;
                            }

                            //这里一定会有出发城市与到达城市等数据
                            param.startcityid = scope.urlData.start.id;
                            param.arrivalcityid = scope.urlData.end.id;
                            param.startdatetime = scope.dateEntity.getDate();
                            param.startname = scope.urlData.start.name;
                            param.arrivename = scope.urlData.end.name;

                            if (scope.urlData.start.station) {
                                param.startstationid = scope.urlData.start.station;
                            }

                            if (scope.urlData.end.station) {
                                param.arrivalstationid = scope.urlData.end.station;
                            }

                            scope.needInitStations = true;
                            scope.forward('list', param);
                            this.hide();
                        }
                    }
                });
            }
            this.searchBox.show();
        },

        _showCityView: function (key, el) {
            var scope = this;

            if (key == 'end') {
                //因为到达车站会依赖出发车站的数据，所以这里得先做判断
                if (!this.urlData.start.id) {
                    this.showToast('请先选择出发城市');
                    return;
                }
            }

            this.showPageView('city', {
                flag: key,
                startId: this.urlData.start.id,
                type: this.urlData.start.type,
                onCityItemClick: function (id, name, station, type) {
                    scope.urlData[key] = {};
                    scope.urlData[key]['id'] = id;
                    scope.urlData[key]['type'] = type;
                    scope.urlData[key]['name'] = name;
                    if (station) scope.urlData[key]['station'] = station;
                    el.text(name);
                    scope.hidePageView();
                },
                onBackAction: function () {
                    scope.hidePageView();
                }
            });
        },

        //初始化出发车站，该数据会随着数据加载结束而变化
        //如果url具有出发站名称以及id，需要特殊处理
        initSetoutEntity: function () {
            var data = {};
            if (_.getUrlParam().startstationid) {
                //出发车站可能并没有传，兼容老代码
                data.name = _.getUrlParam().startname || '全部车站';
                data.id = _.getUrlParam().startstationid;
            }

            this.setoutEntity.initData(data, data.id);
        },

        //初始化到达站
        initArriveEntity: function () {

            var data = {};
            if (_.getUrlParam().arrivalstationid) {
                //出发车站可能并没有传，兼容老代码
                data.name = _.getUrlParam().arrivename || '全部车站';
                data.id = _.getUrlParam().arrivalstationid;
            }

            this.arriveEntity.initData(data, data.id);
        },

        //时段只有变化时候才具有显示状态
        renderTime: function () {
            var name = this.timeEntity.getName();
            this.d_js_day_sec.html(name);
        },

        renderSetout: function () {
            var name = this.setoutEntity.getName();
            this.d_js_start_sec.html(name);
        },

        renderArrive: function () {
            var name = this.arriveEntity.getName();
            this.d_js_arrival_sec.html(name);
        },

        //只有日期导致的变化才需要重置城市
        initPageData: function () {
            //当前索引
            this.index = 0;
            //list页面加载状态，影响滚动加载
            this.loadingStatus = false;
            this.d_list_wrapper.html('');
        },

        refreshList: function () {
            this.unbindScrollEvent();
            window.scrollTo(0, 0);
            this.initPageData();
            this.listInit();
            this.bindScrollEvent();
        },

        listInit: function () {
            var scope = this, i, len, k, param = {}, d = new Date();
            var sid = this.setoutEntity.getId();
            var aid = this.arriveEntity.getId();

            if (sid && sid.charAt(0) !== '-') {
                param.startstationid = sid;
            }
            if (aid && aid.charAt(0) !== '-') {
                param.arrivalstationid = aid;
            }

            param.startcityid = _.getUrlParam().startcityid;
            param.arrivalcityid = _.getUrlParam().arrivalcityid;
            param.starttimetype = this.timeEntity.getId()
            param.startdatetime = parseInt(this.dateEntity.getDate() / 1000);
            param.page = this.index + 1;

            this.d_js_list_loading.show();
            this.listModel.setParam(param);
            this.loadingStatus = true;
            this.listModel.execute(function (data) {
                scope.loadingStatus = false;
                scope.d_js_list_loading.hide();

                if (scope.index == 0 && scope.needInitStations) {
                    scope._initStation(data);
                    scope.needInitStations = false;
                }

                if (!data || !data.schedules || data.schedules.length == 0) {
                    scope.unbindScrollEvent();
                } else {
                    scope.index++;
                }
                scope.renderList(data);
            });

        },

        //数据请求成功后如果localstorage丢失，需要重置出发站文本
        _initStation: function (data) {
            this.setoutEntity.initData(data.startstations, this.setoutEntity.getId());
            this.arriveEntity.initData(data.arrivalstations, this.arriveEntity.getId());
        },

        renderList: function (data) {
            var html = '';
            if (data.schedules.length === 0 && this.index === 0) {
                this.d_none_data.show();
                this.d_list_wrapper.hide();
                return;
            }
            this.d_none_data.hide();
            this.d_list_wrapper.show();
            html = this.renderTpl(listTpl, { data: data.schedules });
            this.d_list_wrapper.append(html);

        },

        addEvent: function () {
            this.on('onShow', function () {
                //初始化date数据
                this.dateModule.initDate();

                //这里判断是否需要弹出搜索弹出层
                if (!_.getUrlParam().startcityid || !_.getUrlParam().arrivalcityid) {
                    this.showSearchBox();
                    return;
                }

                //初始化时段选择
                this.timeEntity.initData();
                this.initSetoutEntity();
                this.initArriveEntity();

                this.initPageData();
                this.listInit();
                this.bindScrollEvent();

            });

            this.on('onHide', function () {
                this.unbindScrollEvent();
            });
        },

        bindScrollEvent: function () {
            this.unbindScrollEvent();
            $(window).on('scroll.scollload' + this.id, $.proxy(function () {
                //如果正在加载便不可用
                if (this.loadingStatus) return;
                //滑到最低的时候才能刷新
                if (window.scrollY + document.documentElement.clientHeight < document.documentElement.scrollHeight - 50) return;
                this.listInit();
            }, this));
        },

        unbindScrollEvent: function () {
            $(window).off('.scollload' + this.id);
        }

    });

});
