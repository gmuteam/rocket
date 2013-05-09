(function($){

/**
 * listgmu_content_news子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
rocket.subview.listgmu_content_news = rocket.subview.extend({

    template: _.template($('#template_listgmu_news').text())

    ,events: {
        'click .listgmu-page-content-newslist-container div': 'showDetail' 
    }

    ,className: 'listgmu-page-content-newslist'

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;
        me.isLastPage = false;

        me.type = options.type;

        switch(me.type){
            case 'focus':
            case 'lianghui':
            case 'chunwan':
                me.model = new rocket.model.listgmu_ts(null, options);
                break;
            default:
                me.model = new rocket.model.listgmu_nids(null, options);
        }

        me.showLoading(me.$el);

        // 这种方式创建，验证为比较适合GMU2的setup方式
        me.$el.append([
            '<div class="ui-refresh">'
                ,'<div class="listgmu-page-content-newslist-container"></div>'
                ,'<div class="ui-refresh-down"></div>'
            ,'</div>'
        ].join(''));

        me.$scroller = me.$('.ui-refresh');
        me.$newsContainer = me.$('.listgmu-page-content-newslist-container');
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
        me.model.on('datalimit', me.ondatalimit, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);
        me.model.off('datalimit', me.ondatalimit, me);
    }

    ,render: function(){
        var me = this;

        me.$newsContainer.append(me.template({
            type: me.type, 
            news: me.model.get('news')
        }));

        if(me.model.pageIndex == 0){

            me.hideLoading();

            /**
             * setup一个refresh，并获取其instance
             * 新版只支持setup，并且会自动添加wrapper
             * 所以，创建前children是.ui-refresh，创建以后就变成.ui-refresh-wrapper了
             * 另外，获取refresh ui实例的方式也比较特殊
             */
            me.listScroller = me.$scroller
                .refresh({
                    ready: function(dir, type){
                        me.model.pageIndex++;
                        if(!me.isLastPage){
                            me.model.fetch({
                                success: function(){
                                    // 更新状态
                                    me.listScroller.afterDataLoading(dir);
                                }
                            });
                        }
                    }
                })
                .refresh('this');

            // me.$el.data('type', me.type);
            me.$el.attr('data-type', me.type);

        }

        me.refreshViewHeight();
        return me;
    }

    ,onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            if(me.type == param.type){
                me.$el.show();
                if(me.isFirstLoad){
                    me.model.fetch({
                        success: function(){
                            me.isFirstLoad = false;
                        }
                    });
                }
                me.refreshViewHeight();
            }
            else{
                me.$el.hide();
            }
        }
    }

    ,showDetail: function(e){
        var $ele = $(e.target).closest('div'),
            nid = $ele.data('id'),
            author = $ele.data('site'),
            time = $ele.data('time'),
            title = $ele.data('title'),
            url = $ele.data('src') || 'emptyurl:' + encodeURIComponent(title),
            route = 'detailgmu'
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

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);

        // 创建完refresh控件，会自动外包一个类名为.ui-refresh-wrapper的div
        me.$('.ui-refresh-wrapper').height($(window).height() - 80);        

        // 还得手动调一次，否则第一次打开iScroll1需要拉动一下后才有反应
        me.listScroller && me.listScroller.data('iScroll').refresh();
    }

    /**
     * 重写destroy，清理控件
     */
    ,destroy: function(){
        var me = this;

        me.listScroller.destroy();
        me.listScroller = null;
        me.$scroller = null;
        me.$newsContainer = null;
        rocket.subview.prototype.destroy.apply(me, arguments);
    }

    ,ondatalimit: function(params){
        // 到达数据限制，iscroll不可用
        this.listScroller.disable('down', true);
        this.isLastPage = true;
    }

});

})(Zepto);
