/**
 * 首页View类
 */
(function($) {

rocket.pageview.videoindex = rocket.pageview.extend({
    el: "#videoindex_page"

    ,init: function(options){
        var me = this;

        // @note: 子视图多的话，可以循环创建

        // 创建toolbar子视图
        me.setup(new rocket.subview.videoindex_toolbar(
            $.extend({}, options)
            ,me
        ));

        // 创建header子视图
        // me.setup(new rocket.subview.videoindex_header(
        //     $.extend({}, options)
        //     ,me
        // ));

        // 创建content子视图
        me.setup(new rocket.subview.videoindex_content(
            $.extend({}, options)
            ,me
        ));
    }

});

})(Zepto);


