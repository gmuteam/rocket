(function($){

/**
 * detailwithgc_content_news子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
rocket.subview.detailwithgc_content_news = rocket.subview.extend({

    template: _.template($('#template_detailwithgc_news').text())

    ,className: 'detailwithgc-page-content-news'

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.nid = options.nid;
        me.model = new rocket.model.detailwithgc_news(options, options);
        me.showLoading(me.$el);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.off('change', me.render, me);
    }

    ,render: function(){
        var me = this;

        me.$el.prepend(me.template({
            title: me.options.title,
            content: me.model.toJSON()
        }));
        // me.$el.data('nid', me.nid);
        me.$el.attr('data-nid', me.nid);

        me.hideLoading();

        me.contentScroller = new iScroll(me.el,
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
            if(me.nid == param.nid){
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

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        me.$el.height($(window).height() - 40);        
        me.contentScroller && me.contentScroller.refresh();
    }

    ,destroy: function(){
        var me = this;

        me.contentScroller.destroy();
        me.contentScroller = null;
        rocket.subview.prototype.destroy.apply(me, arguments);
    }

});

})(Zepto);

