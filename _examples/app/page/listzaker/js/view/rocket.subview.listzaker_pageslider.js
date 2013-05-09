(function($){

/**
 * listzaker_pageslider子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
// @todo: 梳理multicolumn页面开发思路
rocket.subview.listzaker_pageslider = rocket.subview.extend({

    // @todo: 强调view管理本身的el和className等，不跨级管理，做到分而治之
    className: 'listzaker-page-content-pageslider'

    ,events: {
        'click .listzaker-page-content-pageslider-item': 'showDetail' 
    }

    ,template: _.template($('#template_listzaker_news').text())

    ,init: function(options){
        var me = this;

        // 列间隔，等同于-webkit-column-gap的值，建议值是0，避免误差
        me.columnGap = 0;

        // 动画持续时间，单位：秒
        me.animateTime = 0.18; 
        // 帧率（FPS）
        me.animateFPS = 30; 

        // 用于页面切换时，避免重复请求数据
        me.isFirstLoad = true;

        // @todo: 可用于终端适配
        // 展现配置
        me.itemsPerRow = 2;
        me.rowsPerPage = 3;
        me.setDisplayOptions(me.pageOrientation);

        // 幻灯索引，向右成功切换一张增1
        me.sliderIndex = 1;

        me.type = options.type;

        switch(me.type){
            case 'focus':
            case 'lianghui':
            case 'chunwan':
                me.model = new rocket.model.listzaker_ts(null, options);
                break;
            default:
                me.model = new rocket.model.listzaker_nids(null, options);
        }

        // @todo: page loading 遮住footer
        me.showLoading(me.$el);
    }

    ,render: function(model, xhr, refresh){
        var me = this;

        if(!refresh){
            me.$el.append(me.template({
                itemsPerRow: me.itemsPerRow,
                itemsPerPage: me.itemsPerRow * me.rowsPerPage, 
                type: me.type, 
                news: me.model.getPagedNews(18)
            }));
        }
        else{
            me.$('.listzaker-page-content-pageslider-itemgroup').remove();
            me.$el.append(me.template({
                itemsPerRow: me.itemsPerRow,
                itemsPerPage: me.itemsPerRow * me.rowsPerPage, 
                type: me.type, 
                news: me.model.getPagedNewsUpToNextPage(18)
            }));
        }

        me.hideLoading();

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('subpagebeforechange', me.onsubpagebeforechange, me);
        ec.on('last2columns', me.onlast2columns, me);

        me.model.on('datalimit', me.ondatalimit, me);
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

            // 最后一列，不能再滑动
            if(_finalLeft >= me.el.scrollWidth){
                ec.trigger('lastcolumn', {});
                return;
            }

            if(me.swipeLeftLocking){
                return;
            }
            me.swipeLeftLocking = true;

            me.sliderIndex++;
            
            if(_finalLeft + me.$el.width() > me.el.scrollWidth){
                _finalLeft = me.el.scrollWidth - me.$el.width(); 
            }
            
            // 倒数第二列，比如可用于提前发起数据请求
            if(_finalLeft + 2 * me.$el.width() > me.el.scrollWidth){
                // @todo: 数据获取优先？交互体验优先？可能需要延时
                $.later(function(){
                    ec.trigger('last2columns', {});
                }, 300);
            }
            
            function _goRight(){
                me.el.scrollLeft += _step;
                if(me.el.scrollLeft >= _finalLeft){
                    me.el.scrollLeft = _finalLeft;
                    me.swipeLeftLocking = false;
                    // @todo: timeBegin, timeEnd and totalPages
                    ec.trigger(
                        'settimeline', 
                        $.extend(
                            {currentPage: me.sliderIndex},
                            me.model.getTimelineInfo(6)
                        )
                    );
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

            if(0 > _finalLeft){
                _finalLeft = 0;
                ec.trigger('firstcolumn', {});
                return;
            }

            if(me.swipeRightLocking){
                return;
            }
            me.swipeRightLocking = true;

            me.sliderIndex--;
            
            function _goLeft(){
                me.el.scrollLeft -= _step;
                if(me.el.scrollLeft <= _finalLeft){
                    me.el.scrollLeft = _finalLeft;
                    me.swipeRightLocking = false;
                    // @todo: timeBegin, timeEnd and totalPages
                    ec.trigger(
                        'settimeline', 
                        $.extend(
                            {currentPage: me.sliderIndex},
                            me.model.getTimelineInfo(6)
                        )
                    );
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
        ec.off('last2columns', me.onlast2columns, me);
        me.model.off('change', me.render, me);
        me.model.off('datalimit', me.ondatalimit, me);

        me.$el.off('touchmove swipeLeft swipeRight');
    }

    ,onlast2columns: function(){
        var me = this, ec = me.ec;

        if(me.model.incPageIndex()){
            ec.trigger('settimelineloading'); 
            me.model.fetch({
                success: function(){
                    ec.trigger('unsettimelineloading'); 
                }
            });
        }
    }

    ,onsubpagebeforechange: function(params){
        var me = this, ec = me.ec, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            // 仅当参数与当前子页面参数吻合才响应
            if(me.type == param.type){
                if(me.isFirstLoad){
                    ec.trigger('settimelineloading'); 
                    me.model.fetch({
                        success: function(){
                            me.isFirstLoad = false;

                            ec.trigger('unsettimelineloading'); 
                            me.ec.trigger(
                                'settimeline', 
                                $.extend(
                                    {currentPage: me.sliderIndex},
                                    me.model.getTimelineInfo(6)
                                )
                            );

                        }
                    });
                } 
                me.$el.show();
            }
            // 否则隐藏
            else{
                me.$el.hide(); 
            }
        }
    }

    ,showDetail: function(e){
        var $ele = $(e.target).closest('.listzaker-page-content-pageslider-item'),
            nid = $ele.data('id'),
            author = $ele.data('site'),
            time = $ele.data('time'),
            title = $ele.data('title'),
            url = $ele.data('src') || 'emptyurl:' + encodeURIComponent(title),
            route = 'detailmulticolumn'
                + '/' + this.type 
                + '/' + encodeURIComponent(url)
                + '/' + encodeURIComponent(title)
                + '/' + encodeURIComponent(author)
                + '/' + encodeURIComponent(time);

        if(nid) {
            route += '/' + encodeURIComponent(nid);
        }

        Backbone.history.navigate(route, {trigger:true});
    }

    ,ondatalimit: function(params){
        var me = this;
        // 将剩余未展现数据展现出来
        me.render(null, null, false);
    }

    ,setDisplayOptions: function(orientation){
        var me = this;

        if(0 == orientation || 180 == orientation){
            me.itemsPerRow = 2;
            me.rowsPerPage = 3;
            me.$el.removeClass('landscape');
        }
        
        if(90 == orientation || -90 == orientation){
            me.itemsPerRow = 3;
            me.rowsPerPage = 2;
            me.$el.addClass('landscape');
        }
    }

    ,onorientationchange: function(from, to){
        var me = this;


        me.setDisplayOptions(to);
        me.render(null, null, true);

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
