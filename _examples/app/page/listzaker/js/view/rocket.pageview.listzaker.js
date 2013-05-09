(function($){

rocket.pageview.listzaker = rocket.pageview.extend({

    el: '#listzaker_page'

    ,init: function(options){
        var me = this;

        // setup头部子视图
        me.setup(new rocket.subview.listzaker_header(
            $.extend({}, options), 
            me
        ));

        // setup content子视图
        me.setup(new rocket.subview.listzaker_content(
            $.extend({}, options), 
            me
        ));

        // setup footer子视图
        me.setup(new rocket.subview.listzaker_footer(
            $.extend({}, options), 
            me
        ));
    }

    ,render: function(){
        var me = this;
        return me;
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

        // @todo: 该方法有重复通用部分，可考虑抽取
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
