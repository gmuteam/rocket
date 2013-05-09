(function($){

/**
 * listgmu_content子视图，固定创建
 */
rocket.subview.listgmu_content = rocket.subview.extend({

    el: '#listgmu_page_content'

    ,init: function(options){
        var me = this, 
            type = options.type,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.listgmu_content_news
            ,maxSubpages: 2
        });

        subView = new rocket.subview.listgmu_content_news(
            $.extend({}, options), 
            me
        );
        me.append(subView);

        // 注册子页面
        spm.registerSubpage(me.featureString, subView);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
        }
    }

});

})(Zepto);
