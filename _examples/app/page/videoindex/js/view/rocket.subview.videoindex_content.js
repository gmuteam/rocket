(function($) {

rocket.subview.videoindex_content = rocket.subview.extend({
    el: "#videoindex_page_content"

    ,init: function(options){
        var me = this;

        // 包含多数据的模型，整个页面共享
        me.model = new rocket.model.videoindex_data(null, options);

        // 创建图片轮播子视图
        me.setup(new rocket.subview.videoindex_content_imageslider(
            $.extend({}, options),
            me
        ));

        // 创建列表子视图
        me.setup(new rocket.subview.videoindex_content_listwrapper(
            $.extend({}, options),
            me
        ));

        // 创建推广子视图
        me.setup(new rocket.subview.videoindex_content_tuiguang(
            $.extend({}, options),
            me
        ));

        me.isFirstLoad = true;

        me.showLoading(me.$el);

        // 调整pageloading容器高度
        me.refreshHeight();
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            me.refreshHeight();
            if(me.isFirstLoad){
                me.model.fetch({
                    success: function(model, resp){
                        me.isFirstLoad = false;
                        me.ec.trigger('dataready', model.toJSON());
                        me.hideLoading();
                    }
                });
            }
        }
    }

    ,refreshHeight: function(){
        var me = this;
        me.$el.height($(window).height() - 40);
    }

});

})(Zepto);


