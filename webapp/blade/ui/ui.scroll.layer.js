define(['UILayer', 'text!T_UIScrollLayer', 'UIScroll'], function (UILayer, template, UIScroll) {
  'use strict';

  return _.inherit(UILayer, {

    resetDefaultProperty: function ($super) {
      $super();
      this.template = template;

      this.title = '';
      this.html = '';

      this.height = $(window).height() * 0.6;

      this.scrollOpts = {};

      this.addEvents({
        'click .js_close': 'closeAction'

      });

      //      this.events = {
      //        'click .js_close': 'closeAction'
      //      };

      this.onCloseAction = function () { };

    },

    closeAction: function () {
      this.hide();
      this.onCloseAction.call(this);
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['title', 'html']);
    },

    initElement: function () {
      this.d_wrapper = this.$('.js_wrapper');
      this.d_scoller = this.$('.js_scroller');
    },

    initScroll: function () {
      if (!this.html) return;
      this.$el.css({
        '-webkit-box-sizing': 'border-box',
        'box-sizing': 'border-box',
        'padding': '10px',
        'width': '100%'
      });

      if (this.d_wrapper.height() < this.height) return;

      this.d_wrapper.css({ 'overflow': 'hidden', 'position': 'absoulute', 'height': this.height + 'px' });
      this.d_scoller.css('position', 'absoulute');

      if (this.scroll && this.scroll.destory) this.scroll.destory();
      this.scrollOpts.wrapper = this.d_wrapper;
      this.scrollOpts.scroller = this.d_scoller;
      this.scroll = new UIScroll(this.scrollOpts);

    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {
        this.initScroll();
      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });

    }

  });


});
