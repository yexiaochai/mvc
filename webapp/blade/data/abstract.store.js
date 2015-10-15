define(['AbstractStorage'], function (AbstractStorage) {

  var Store = _.inherit({
    //默认属性
    propertys: function () {

      //每个对象一定要具有存储键，并且不能重复
      this.key = null;

      //默认一条数据的生命周期，S为秒，M为分，D为天
      this.lifeTime = '30M';

      //默认返回数据
      //      this.defaultData = null;

      //代理对象，localstorage对象
      this.sProxy = new AbstractStorage();

    },

    setOption: function (options) {
      _.extend(this, options);
    },

    assert: function () {
      if (this.key === null) {
        throw 'not override key property';
      }
      if (this.sProxy === null) {
        throw 'not override sProxy property';
      }
    },

    initialize: function (opts) {
      this.propertys();
      this.setOption(opts);
      this.assert();
    },

    _getLifeTime: function () {
      var timeout = 0;
      var str = this.lifeTime;
      var unit = str.charAt(str.length - 1);
      var num = str.substring(0, str.length - 1);
      var Map = {
        D: 86400,
        H: 3600,
        M: 60,
        S: 1
      };
      if (typeof unit == 'string') {
        unit = unit.toUpperCase();
      }
      timeout = num;
      if (unit) timeout = Map[unit];

      //单位为毫秒
      return num * timeout * 1000 ;
    },

    //缓存数据
    set: function (value, sign) {
      //获取过期时间
      var timeout = new Date();
      timeout.setTime(timeout.getTime() + this._getLifeTime());
      this.sProxy.set(this.key, value, timeout.getTime(), sign);
    },

    //设置单个属性
    setAttr: function (name, value, sign) {
      var key, obj;
      if (_.isObject(name)) {
        for (key in name) {
          if (name.hasOwnProperty(key)) this.setAttr(k, name[k], value);
        }
        return;
      }

      if (!sign) sign = this.getSign();

      //获取当前对象
      obj = this.get(sign) || {};
      if (!obj) return;
      obj[name] = value;
      this.set(obj, sign);

    },

    getSign: function () {
      return this.sProxy.getSign(this.key);
    },

    remove: function () {
      this.sProxy.remove(this.key);
    },

    removeAttr: function (attrName) {
      var obj = this.get() || {};
      if (obj[attrName]) {
        delete obj[attrName];
      }
      this.set(obj);
    },

    get: function (sign) {
      var result = [], isEmpty = true, a;
      var obj = this.sProxy.get(this.key, sign);
      var type = typeof obj;
      var o = { 'string': true, 'number': true, 'boolean': true };
      if (o[type]) return obj;

      if (_.isArray(obj)) {
        for (var i = 0, len = obj.length; i < len; i++) {
          result[i] = obj[i];
        }
      } else if (_.isObject(obj)) {
        result = obj;
      }

      for (a in result) {
        isEmpty = false;
        break;
      }
      return !isEmpty ? result : null;
    },

    getAttr: function (attrName, tag) {
      var obj = this.get(tag);
      var attrVal = null;
      if (obj) {
        attrVal = obj[attrName];
      }
      return attrVal;
    }

  });

  Store.getInstance = function () {
    if (this.instance) {
      return this.instance;
    } else {
      return this.instance = new this();
    }
  };

  return Store;
});
