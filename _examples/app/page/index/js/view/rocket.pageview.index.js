/**
 * 首页View类
 */
(function($) {

rocket.pageview.index = rocket.pageview.extend({
    el: "#index_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new rocket.subview.index_header(options, me));

        // 创建content子视图
        me.setup(new rocket.subview.index_content(options, me));
    }

});

})(Zepto);


