(function(){

rocket.pageview.detailwithgc = rocket.pageview.extend({

    el: '#detailwithgc_page'

    ,init: function(options){
        var me = this;
        
        // 创建toolbar视图
        me.setup(new rocket.subview.detailwithgc_toolbar(options, me));

        // 创建header视图
        // me.setup(new rocket.subview.detailwithgc_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.detailwithgc_content(options, me));
    }

});

})(Zepto);
