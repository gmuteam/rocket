(function($){

/**
 * listwithgc_content_news子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
rocket.subview.listwithgc_content_news = rocket.subview.extend({

    template: _.template($('#template_listwithgc_news').text())

    ,events: {
        'click .listwithgc-page-newslist-content div': 'showDetail' 
    }

    ,className: 'listwithgc-page-newslist'

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.type = options.type;
        me.collection = new rocket.collection.listwithgc(null, options);

        me.showLoading(me.$el);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.collection.on('reset', me.render, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("subpagebeforechange", me.onsubpagebeforechange, me);
        me.collection.off('reset', me.render, me);
    }

    ,render: function(){
        var me = this;
        me.$el.prepend(me.template({
            type: me.type, 
            news: me.collection.toJSON()
        }));

        // me.$el.data('type', me.type);
        me.$el.attr('data-type', me.type);

        me.hideLoading();

        // 取el的第一个子节点作为scroller
        // 所以列表用prepend而不是append
        me.listScroller = new iScroll(me.el,
            {
                hScroll: false
            }
        );

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
                    me.collection.fetch({
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
            route = 'detailwithgc'
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
        me.$el.height($(window).height() - 80);        
        me.listScroller && me.listScroller.refresh();
    }

    ,destroy: function(){
        var me = this;

        me.listScroller.destroy();
        me.listScroller = null;
        rocket.subview.prototype.destroy.apply(me, arguments);
    }

});

})(Zepto);
