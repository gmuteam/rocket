(function(){

rocket.pageview.detailgmu = rocket.pageview.extend({

    el: '#detailgmu_page'

    ,init: function(options){
        var me = this;
        
        // 创建toolbar视图
        me.setup(new rocket.subview.detailgmu_toolbar(options, me));

        // 创建header视图
        // me.setup(new rocket.subview.detailgmu_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.detailgmu_content(options, me));
    }

});

})(Zepto);
