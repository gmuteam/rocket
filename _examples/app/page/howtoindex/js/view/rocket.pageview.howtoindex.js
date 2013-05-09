(function($){

rocket.pageview.howtoindex = rocket.pageview.extend({

    el: '#howtoindex_page'

    ,init: function(options){
        var me = this;

        // me.setup(new rocket.subview.howtoindex_header(
        //     $.extend({}, options)
        //     ,me
        // ));

        me.setup(new rocket.subview.howtoindex_content(
            $.extend({}, options)
            ,me
        ));

        // @note: 只是需要简单设置title，无复杂逻辑，毋需单独创建一个toolbar的subview
        //     这个度开发同学自己拿捏，只要既满足要求又不影响易维护性即可
        me.$toolbarTitle = me.$('.vs-toolbar-titlecontainer');
        me.$toolbarTitle.html('ROCKET框架系列文档');

    }

});

})(Zepto);
