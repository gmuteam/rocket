(function($){

/**
 * detail_content子视图，固定创建
 */
rocket.subview.detail_content = rocket.subview.extend({

    el: '#detail_page_content'

    ,init: function(options){
        var me = this, 
            nid = options.nid,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.detail_content_news
            // 设置100，模拟无gc模式
            ,maxSubpages: 100
        });

        subView = new rocket.subview.detail_content_news(
            $.extend({}, options), 
            me
        );
        me.append(subView);

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
            me.refreshViewHeight();
        }
    }

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        me.$el.height($(window).height() - 40);        
    }

});

})(Zepto);

