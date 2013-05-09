/**
 * 首页View类
 */
(function($) {

rocket.pageview.indexoptimized = rocket.pageview.extend({
    el: "#indexoptimized_page"

    ,init: function(options){
        var me = this;

        // 创建header子视图
        me.setup(new rocket.subview.indexoptimized_header(options, me));

        // 创建content子视图
        me.setup(new rocket.subview.indexoptimized_content(options, me));
    }

});

})(Zepto);


