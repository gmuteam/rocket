(function($){

/**
 * listgmu页面视图，包含多个需动态创建的子视图
 */
rocket.pageview.listgmu = rocket.pageview.extend({

    el: '#listgmu_page'

    ,init: function(options){
        var me = this, 
            type = options.type,
            subView;

        // 创建toolbar视图
        me.setup(new rocket.subview.listgmu_toolbar(options, me));

        // 创建header视图
        me.setup(new rocket.subview.listgmu_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.listgmu_content(options, me));
    }

});

})(Zepto);
