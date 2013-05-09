(function($){

rocket.subview.listzaker_content = rocket.subview.extend({
    
    el: '#listzaker_page_content'

    ,init: function(options){
        var me = this,
            type = options.type,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.listzaker_pageslider
            ,maxSubpages: 3
        });

        subView = new rocket.subview.listzaker_pageslider(
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

        if(to == me.ec){
            me.$el.show();

            me.refreshViewHeight();
        }
    }

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        me.$el.height($(window).height() - 70);        
    }

    ,onorientationchange: function(from, to){
        var me = this; 
        // @note: 不直接调用refreshHeight，而调用refreshViewHeight，使用其延时
        me.refreshViewHeight();
    }

});

})(Zepto);
