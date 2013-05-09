(function($){

/**
 * detail_content_news子视图，会被动态创建，hash穿透
 * 若动态创建的子视图可枚举，则也可直接作为页面来实现
 * 若不可枚举，则必须用子视图方式来创建
 */
rocket.subview.detail_content_news = rocket.subview.extend({

    template: _.template($('#template_detail_news').text())

    ,className: 'detail-page-content-news'

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        me.nid = options.nid;
        me.model = new rocket.model.detail_news(options, options);
        me.showLoading(me.$el);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);
        me.model.on('change', me.render, me);

        // 注册scroll事件，使原生滚动至首部或尾部时不会触发整个页面的滚动  
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
        me.model.off('change', me.render, me);

        me.$el.off('scroll');
    }

    ,render: function(){
        var me = this;

        me.$el.append(me.template({
            title: me.options.title,
            author: me.options.author,
            date: app.helper.getFormatedDate(me.options.time),
            src: me.options.src,
            content: me.model.toJSON()
        }));

        /**
         * gmu扩展的data方法除了字符串外，还可以保存对象
         * 但是不会作为data-xxx表现在DOM对象上
         * 原来的功能可由attr来代替，需提供data-前缀
         */
        // me.$el.data('nid', me.nid);
        me.$el.attr('data-nid', me.nid);

        var a = me.$('.ui-gotop').gotop({
            container: me.$el
        });


        me.hideLoading();
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
            }
            else{
                me.$el.hide();
            }
        }
    }

});

})(Zepto);

