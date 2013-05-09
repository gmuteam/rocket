(function($){

/**
 * listwithgc页面视图，包含多个需动态创建的子视图
 */
rocket.pageview.listwithgc = rocket.pageview.extend({

    el: '#listwithgc_page'

    ,init: function(options){
        var me = this, 
            type = options.type,
            subView;

        // 创建toolbar视图
        me.setup(new rocket.subview.listwithgc_toolbar(options, me));

        // 创建header视图
        me.setup(new rocket.subview.listwithgc_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.listwithgc_content(options, me));
    }

});

})(Zepto);
