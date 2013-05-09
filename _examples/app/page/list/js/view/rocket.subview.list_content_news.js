(function($){

/**
 * list_content_news子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
rocket.subview.list_content_news = rocket.subview.extend({

    template: _.template($('#template_list_news').text())

    ,events: {
        'click .list-page-newslist-content div': 'showDetail' 
    }

    ,className: 'list-page-newslist'

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.type = options.type;
        me.collection = new rocket.collection.list(null, options);
        me.showLoading(me.$el);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.collection.on('reset', me.render, me);

        me.$el.on('scroll', function(e){
            var el = me.el,
                st = el.scrollTop,
                oh = el.offsetHeight,
                sh = el.scrollHeight;

            if(st + oh >= sh){
                el.scrollTop = sh - oh - 1; 
            }

            if(st <= 0){
                el.scrollTop = 1;
            }
        });
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("subpagebeforechange", me.onsubpagebeforechange, me);
        me.collection.off('reset', me.render, me);

        me.$el.off('scroll');
    }

    ,render: function(){
        var me = this;
        me.$el.append(me.template({
            type: me.type, 
            news: me.collection.toJSON()
        }));
        // me.$el.data('type', me.type);
        me.$el.attr('data-type', me.type);

        me.hideLoading();
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
            route = 'detail'
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

});

})(Zepto);
