(function(){

rocket.pageview.detail = rocket.pageview.extend({

    el: '#detail_page'

    ,init: function(options){
        var me = this;
        
        // 创建toolbar视图
        me.setup(new rocket.subview.detail_toolbar(options, me));

        // 创建header视图
        // me.setup(new rocket.subview.detail_header(options, me));

        // 创建content视图
        me.setup(new rocket.subview.detail_content(options, me));
    }

});

})(Zepto);
