(function($){

/**
 * listwithgc_content子视图，固定创建
 */
rocket.subview.listwithgc_content = rocket.subview.extend({

    el: '#listwithgc_page_content'

    ,init: function(options){
        var me = this, 
            type = options.type,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.listwithgc_content_news
            ,maxSubpages: 1
        });

        subView = new rocket.subview.listwithgc_content_news(
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
