define(['AbstractStore'], function (AbstractStore) {

  return {
    InitAppStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_InitAppStore';
        this.lifeTime = '1D'; //缓存时间
      }
    }),

    SCityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_StartCityStore';
        this.lifeTime = '5D'; //缓存时间
      }
    }),

    ECityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_EndCityStore';
        this.lifeTime = '5D'; //缓存时间

      }
    }),

    ECitySearchStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_EndCitySearchStore';
        this.lifeTime = '1D'; //缓存时间

      }
    }),

    SHisCityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_StartHisCityStore';
        this.lifeTime = '1D'; //缓存时间

      }
    }),

    EHisCityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_EndHisCityStore';
        this.lifeTime = '1D'; //缓存时间

      }
    }),

    //历史选择数据
    HisRouteStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_HisRouteStore';
        this.lifeTime = '30D'; //缓存时间
      }
    }),

    ListStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_ListStore';
        this.lifeTime = '1M'; //缓存时间
      }
    }),

    startCityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_StartCityObjStore';
        this.lifeTime = '1D';

      }
    }),

    endCityStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_EndCityObjStore';
        this.lifeTime = '1D';
      }
    }),

    CityStatusStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_CityStatusStore';
        this.lifeTime = '1D';
      }
    }),

    setOutDateStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_SetOutDateStore';
        this.lifeTime = '1H';
      }
    }),

    ScheduleDetailStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_ScheduleDetailStore';
        this.lifeTime = '30S';
      }
    }),

    UserInfoStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_UserInfoStore';
        this.lifeTime = '1H';
      }
    }),

    ContactListStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_ContactListStore';
        this.lifeTime = '1D';
      }
    }),

    OrderListStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_OrderListStore';
        this.lifeTime = '10S';
      }
    }),

    OrderDetailStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_OrderDetailStore';
        this.lifeTime = '10S';
      }
    }),

    //出发站地图相关接口
    stationListStore: _.inherit(AbstractStore, {
      //默认属性
      propertys: function ($super) {
        $super();
        this.key = 'BUS_StationListStore';
        this.lifeTime = '1D';
      }
    })

  }

});
