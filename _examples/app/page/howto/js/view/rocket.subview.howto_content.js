(function($){

rocket.subview.howto_content = rocket.subview.extend({

    el: '#howto_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.howto_content_article
            ,maxSubpages: 2
            ,subpageTransition: 'fade'
        });

        // 创建第一个子页面
        subView = new rocket.subview.howto_content_article(
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
