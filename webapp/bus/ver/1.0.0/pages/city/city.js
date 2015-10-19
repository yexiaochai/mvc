define(['AbstractView', 'BusModel', 'BusStore', 'text!CityPath/city.html', 'text!CityPath/city.list.html', 'text!CityPath/city.search.list.html', 'text!CityPath/city.css'
],
function (AbstractView, BusModel, BusStore, html, listTpl, searchTpl, style) {

    return _.inherit(AbstractView, {
        propertys: function ($super) {
            $super();
            this.style = style;
            this.template = html;
            this.events = {
                'click .js_city_list li': 'cityItemAction',
                'click .js_city_item': 'cityItemAction',
                'input .js_search_text': 'openSearch',
                'click .js_cancel_search': 'closeSearch',
                'click .js_nav_city li': 'navItemAction'
            };

        },

        initHeader: function () {
            var scope = this;
            this.header.set({
                view: this,
                title: '城市选择',
                back: function () {
                    this.onBackAction();
                    this.closeSearch();
                }
            });
        },

        onBackAction: function () {

        },

        initElement: function () {
            this.d_hisCity = this.$('.js_his_city_wrapper');
            this.d_city_wrapper = this.$('.js_city_wrapper');
            this.d_search_txt = this.$('.js_search_text');
            this.d_no_data = this.$('.js_none_data');
            this.d_js_nav_city = this.$('.js_nav_city');
            this.d_js_search_list = this.$('.js_search_list');

        },

        openSearch: function () {
            var scope = this;
            this.d_hisCity.hide();
            this.d_js_nav_city.hide();
            this.d_city_wrapper.hide();

            this.$el.addClass('search-active');

            var key = this.d_search_txt.val().trim ? this.d_search_txt.val().trim() : this.d_search_txt.val();
            if (key == '') {
                this.$el.removeClass('search-active');
                this.d_city_wrapper.show();
                this.d_js_search_list.hide();

                return;
            }

            this.searchModel.setParam('word', key);
            this.d_js_search_list.show();
            this.searchModel.execute(function (data) {
                data = data.citys;
                if (data.length == 0) {
                    scope.d_no_data.show();
                    scope.d_js_search_list.html('');
                } else {
                    scope.d_no_data.hide();
                    //渲染搜索列表
                    scope.d_js_search_list.html(scope.renderTpl(searchTpl, { data: data }));
                }
            });

        },

        closeSearch: function () {
            this.$el.removeClass('search-active');
            this.d_js_nav_city.show();
            this.d_no_data.hide();
            this.d_search_txt.val('');
            this.d_search_txt.blur();
            this.d_hisCity.show();
            this.d_city_wrapper.show();
            this.d_js_search_list.hide();

        },

        cityItemAction: function (e) {
            var i, len;
            var el = $(e.currentTarget);
            var id = el.attr('data-city');
            var station = el.attr('data-station');
            var name = el.attr('data-name');
            var type = el.attr('data-type');

            var arr = this.hisCityObj;
            if (this.flag == 'end') arr = this.hisCityObj[this.startId];

            arr = arr.reverse();
            len = arr.length;

            //存在便不予理睬
            for (i = 0; i < len; i++) {
                if (arr[i].regionid == id) { arr.splice(i, 1); break; }
            }

            arr.push({ regionid: id, cnname: name });
            arr = arr.reverse();
            arr = arr.slice(0, 6);

            if (this.flag == 'end') this.hisCityObj[this.startId] = arr;
            else this.hisCityObj = arr;

            //暂时只有城市才存储
            if (type == '2')
                this.hisCity.set(this.hisCityObj);

            this.onCityItemClick(id, name, station, type);
            this.closeSearch();

        },

        onCityItemClick: function (id, name, station, type) {
        },

        addEvent: function () {
            this.on('onShow', function () {
                this.initHisList();
                this.initList();
            });
        },

        initHisList: function () {
            var data;
            if (this.flag && this.flag == 'end') {
                this.hisCity = BusStore.EHisCityStore.getInstance();
            } else {
                this.hisCity = BusStore.SHisCityStore.getInstance();
            }

            this.hisCityObj = this.hisCity.get();
            if (!this.hisCityObj) {
                if (this.flag == 'end') {
                    this.hisCityObj = {};
                    this.hisCityObj[this.startId] = [];
                } else {
                    this.hisCityObj = [];
                }
            }

            if (this.flag == 'end' && !this.hisCityObj[this.startId]) {
                this.hisCityObj[this.startId] = [];
            }

            data = (this.flag == 'end') ? this.hisCityObj[this.startId] : this.hisCityObj;
            data = data || [];

            var html = this.renderTpl(listTpl, { data: [{ 'history': data}] });
            this.d_hisCity.html(html);

        },

        initNavCity: function () {
            var groups = this.$('.js_group_name');
            var item, navs = [];
            navs.push('<ul>');
            for (var i = 0, len = groups.length; i < len; i++) {
                item = groups.eq(i);
                navs.push('<li data-top="' + item.offset().top + '">' + item.html() + '</li>');
            }
            navs.push('</ul>');

            this.d_js_nav_city.html(navs.join(''));

        },

        navItemAction: function (e) {
            e.preventDefault();
            var el = $(e.currentTarget);
            var top = el.attr('data-top');
            window.scroll(0, top);
        },

        getListData: function (data) {
            var citys = {}, sortCitys = [];
            var k, gname, name, i, tmp = {}, index;

            //首先处理每个name生成唯一K
            for (k in data) {
                name = data[k].name;
                if (!name) {
                    continue;
                }
                gname = name[0].toUpperCase();
                if (!citys[gname]) citys[gname] = [];
                citys[gname].push(data[k]);
            }

            for (i = 65; i < 91; i++) {
                tmp = {};
                tmp[String.fromCharCode(i)] = [];
                sortCitys.push(tmp);
            }

            for (k in citys) {
                index = k.charCodeAt() - 65;
                tmp = {};
                tmp[k] = citys[k];
                sortCitys[index] = tmp;
            }

            return sortCitys;
        },

        renderCitys: function (data) {
            var citis = this.getListData(data.cities)
            var html = this.renderTpl(listTpl, { data: citis });
            this.d_city_wrapper.html(html);

            //城市列表渲染结束，便渲染城市导航
            this.initNavCity();
        },

        initList: function () {
            var scope = this;

            if (this.flag && this.flag == 'end') {

                //目的地搜索
                this.searchModel = BusModel.ECitySearchModel.getInstance();
                this.searchModel.setParam({
                    id: this.startId,
                    type: this.type
                });

                this.listModel = BusModel.ECityModel.getInstance();
                this.listModel.setParam({
                    startcityid: this.startId
                });
            } else {
                //目的地搜索
                this.searchModel = BusModel.SCitySearchModel.getInstance();
                this.listModel = BusModel.SCityModel.getInstance();
            }
            this.showLoading();
            this.listModel.execute(function (data) {
                scope.renderCitys(data);
                scope.hideLoading();
            }, function (data) {
                scope.hideLoading();
                if (data.msg)
                    scope.showToast(data.msg, function () {
                        scope.hidePageView();
                    });
            });
        }

    });

});
