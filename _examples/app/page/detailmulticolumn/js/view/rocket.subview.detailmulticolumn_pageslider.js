(function($){

rocket.subview.detailmulticolumn_pageslider = rocket.subview.extend({

    template: _.template($('#template_detailmulticolumn_list').text())

    ,events: {
        'click h3': 'ontitleclick'
    }

    // @todo: 强调view管理本身的el和className等，不跨级管理，做到分而治之
    ,className: 'detailmulticolumn-page-content-pageslider'

    ,init: function(options){
        var me = this;

        // 列间隔，等同于-webkit-column-gap的值
        me.columnGap = 10;

        // 动画持续时间，单位：秒
        me.animateTime = 0.18; 
        // 帧率（FPS）
        me.animateFPS = 30; 

        me.isFirstLoad = true;

        me.type = options.type;
        me.nid = options.nid;
        me.model = new rocket.model.detailmulticolumn_pageslider(options, options);
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        // @todo: 说明append，prepend，setup的应用场景
        // me.$el.append(me.template({
        me.$el.prepend(me.template({
            title: me.options.title,
            author: me.options.author,
            date: app.helper.getFormatedDate(me.options.time),
            src: me.options.src,
            content: me.model.toJSON()
        }));

        me.$el.attr('data-nid', me.nid);
        me.hideLoading();
        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);

        me.$el.on('touchmove', function(e){
            e.preventDefault();
        });

        me.swipeLeftLocking = false;
        me.swipeRightLocking = false;

        /**
         * @todo: iOS4,切换过程不能记忆scrollLeft
         */
        me.$el.on('swipeLeft', function(e){
            var _width = me.$el.width(),
                _finalLeft = me.el.scrollLeft 
                    + _width + me.columnGap,
                _step = Math.ceil( _width / (me.animateFPS * me.animateTime) );

            if(me.swipeLeftLocking){
                return;
            }
            me.swipeLeftLocking = true;

            if(_finalLeft >= me.el.scrollWidth){
                ec.trigger('lastcolumn', {});
                me.swipeLeftLocking = false;
                return;
            }
            
            if(_finalLeft + me.$el.width() > me.el.scrollWidth){
                _finalLeft = me.el.scrollWidth - me.$el.width(); 
            }
            
            function _goRight(){
                me.el.scrollLeft += _step;
                if(me.el.scrollLeft >= _finalLeft){
                    me.el.scrollLeft = _finalLeft;
                    me.swipeLeftLocking = false;
                }
                else{
                    setTimeout(_goRight, Math.floor(1000/me.animateFPS)); 
                }
            }

            _goRight();
        });

        me.$el.on('swipeRight', function(e){
            var _width = me.$el.width(),
                _finalLeft = me.el.scrollLeft 
                    - _width - me.columnGap,
                _step = Math.ceil( _width / (me.animateFPS * me.animateTime) );

            if(me.swipeRightLocking){
                return;
            }
            me.swipeRightLocking = true;

            if(0 >= _finalLeft){
                _finalLeft = 0;
                ec.trigger('firstcolumn', {});
            }
            
            function _goLeft(){
                me.el.scrollLeft -= _step;
                if(me.el.scrollLeft <= _finalLeft){
                    me.el.scrollLeft = _finalLeft;
                    me.swipeRightLocking = false;
                }
                else{
                    setTimeout(_goLeft, Math.floor(1000/me.animateFPS)); 
                }
            }

            _goLeft();
        });

    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('subpagebeforechange', me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);

        me.$el.off('touchmove swipeLeft swipeRight');
    }

    ,onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            if(me.nid == param.nid){
                me.$el.show();
                me.refreshViewHeight();
                if(me.isFirstLoad){
                    me.model.fetch({
                        success: function(){
                            me.isFirstLoad = false;
                        }
                    });
                }
            }
            else{
                me.$el.hide();
            }

        }
    }

    ,refreshHeight: function(){
        var me = this;

        window.scrollTo(0, 0);
        // @note: window高度可能由于用户操作会变化，body比较稳定
        me.$el.height($(document.body).height());
    }

    ,ontitleclick: function(e){
        var me = this;

        Backbone.history.navigate(
            '#listzaker/' + me.type
            ,{trigger: true}
        );
    }

});

})(Zepto);
