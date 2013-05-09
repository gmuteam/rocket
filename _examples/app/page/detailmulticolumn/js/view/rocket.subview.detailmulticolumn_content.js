(function($){

/**
 * detailmulticolumn_content子视图，固定创建
 */
rocket.subview.detailmulticolumn_content = rocket.subview.extend({

    el: '#detailmulticolumn_page_content'

    ,init: function(options){
        var me = this, 
            nid = options.nid,
            subView,
            spm;

        me.currentNewsInfo = $.extend({}, options);

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.detailmulticolumn_pageslider
            ,maxSubpages: 2
        });

        subView = new rocket.subview.detailmulticolumn_pageslider(
            $.extend({}, options), 
            me
        );
        me.append(subView);

        spm.registerSubpage(me.featureString, subView);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);

        ec.on('lastcolumn', me.goNext, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.currentNewsInfo = $.extend({}, param);
            me.$el.show();
        }
    }

    ,goNext: function(){
        var me = this,
            news,
            info = me.currentNewsInfo,
            list = rocket.model.listzaker_nids.getInstance(info.type),
            route;

        list && (news = list.getNextNews(info.nid));
        
        if(!news){
            return;
        }

        route = 'detailmulticolumn'
            + '/' + info.type 
            + '/' + encodeURIComponent(news.url)
            + '/' + encodeURIComponent(news.title)
            + '/' + encodeURIComponent(news.site)
            + '/' + encodeURIComponent(news.ts)
            + '/' + encodeURIComponent(news.nid);

        Backbone.history.navigate(route, {trigger:true});
    }

});

})(Zepto);


