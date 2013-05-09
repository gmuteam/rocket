(function($){

/**
 * detailwithgc_content子视图，固定创建
 */
rocket.subview.detailwithgc_content = rocket.subview.extend({

    el: '#detailwithgc_page_content'

    ,init: function(options){
        var me = this, 
            nid = options.nid,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.detailwithgc_content_news
            ,maxSubpages: 2
        });

        subView = new rocket.subview.detailwithgc_content_news(
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
        }
    }

});

})(Zepto);

