(function($){
    
rocket.pageview.navzaker = rocket.pageview.extend({

    el: '#navzaker_page'

    ,init: function(options){
        var me = this;

        // setup notes视图
        me.setup(new rocket.subview.navzaker_notes(
            $.extend({}, options)
            ,me
        ));
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('pagebeforechange', me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){

        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            /**
             * @note: pageview不要自行调用show，交由全局切换动画进行，确保动画效果的流畅性
             * me.$el.show();
             */
        }

    }

});

})(Zepto);
