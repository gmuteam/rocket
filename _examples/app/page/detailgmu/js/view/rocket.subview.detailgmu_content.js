(function($){

/**
 * detailgmu_content子视图，固定创建
 */
rocket.subview.detailgmu_content = rocket.subview.extend({

    el: '#detailgmu_page_content'

    ,init: function(options){
        var me = this, 
            nid = options.nid,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.detailgmu_content_news
            ,maxSubpages: 2
        });

        subView = new rocket.subview.detailgmu_content_news(
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

