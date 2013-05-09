(function($){

rocket.subview.navzaker_notes = rocket.subview.extend({
    
    el: '#navzaker_page_notes'

    ,events: {
        'click .navzaker-page-notes-item': 'go'
    }

    ,template: _.template($('#template_navzaker_notes').text())

    ,init: function(options){
        var me = this;

        // 列间隔，等同于-webkit-column-gap的值，建议值是0，避免误差
        me.columnGap = 0;

        // 动画持续时间，单位：秒
        me.animateTime = 0.18; 
        // 帧率（FPS）
        me.animateFPS = 30; 

        // 展现配置
        me.itemsPerRow = 2;
        me.rowsPerPage = 4;
        me.setDisplayOptions(me.pageOrientation);

        // 用于页面切换时，避免重复请求数据
        me.isFirstLoad = true;

        // 幻灯索引，向右成功切换一张增1
        me.sliderIndex = 1;

        me.showLoading(me.$el);

        me.render();
    }

    ,render: function(){
        var me = this;

        me.$('.navzaker-page-notes-group').remove();

        me.$el.append(me.template({
            itemsPerRow: me.itemsPerRow,
            itemsPerPage: me.itemsPerRow * me.rowsPerPage, 
            notes: app.conf.classMap.slice(2)
        }));

        me.hideLoading();
        me.refreshViewHeight();
        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
        ec.on('lastcolumn', me.onlastcolumn, me);

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
            me.sliderIndex++;

            if(_finalLeft + me.$el.width() > me.el.scrollWidth){
                _finalLeft = me.el.scrollWidth - me.$el.width(); 
            }
            
            if(_finalLeft + 2 * me.$el.width() > me.el.scrollWidth){
                // @todo: 数据获取优先？交互体验优先？可能需要延时
                $.later(function(){
                    ec.trigger('lastcolumn', {});
                }, 300);
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
            me.sliderIndex--;

            if(0 > _finalLeft){
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

        ec.off('pagebeforechange', me.onpagebeforechange, me);
        ec.off('lastcolumn', me.onlastcolumn, me);

        me.$el.off('touchmove swipeLeft swipeRight');
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            me.$el.show();
        }
    }

    ,onlastcolumn: function(){
        var me = this;


    }

    ,refreshHeight: function(){
        var me = this;

        window.scrollTo(0, 0);
        // @note: window高度可能由于用户操作会变化，body比较稳定
        me.$el.height($(document.body).height());
    }

    ,go: function(e){
        var $ele = $(e.target).closest('.navzaker-page-notes-item'),
            type = $ele.data('type'),
            route = 'listzaker'
                + '/' + encodeURIComponent(type); 

        Backbone.history.navigate(route, {trigger:true});
    }

    ,setDisplayOptions: function(orientation){
        var me = this;

        if(0 == orientation || 180 == orientation){
            me.itemsPerRow = 2;
            me.rowsPerPage = 4;
        }
        
        if(90 == orientation || -90 == orientation){
            me.itemsPerRow = 4;
            me.rowsPerPage = 2;
        }
    }

    ,onorientationchange: function(from, to){
        var me = this;
        

        me.setDisplayOptions(to);
        me.render();

        /**
         * @note: 设置左滚动距离，确保方向切换后页面仍然正常显示在同一页
         * @note: 避免尺寸读取错误，最好延时读取
         */
        setTimeout(function(){
            me.el.scrollLeft = 
                (me.sliderIndex - 1) * me.$el.width();
        }, 0);
    }

});

})(Zepto);
