(function($){

/**
 * list页面视图，包含多个需动态创建的子视图
 */
rocket.pageview.list = rocket.pageview.extend({

    el: '#list_page'

    ,init: function(options){
        var me = this, 
            type = options.type,
            subView;

        // 创建toolbar视图
        me.setup(new rocket.subview.list_toolbar(options, me));

        // 创建header视图
        me.setup(new rocket.subview.list_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.list_content(options, me));
    }

});

})(Zepto);
