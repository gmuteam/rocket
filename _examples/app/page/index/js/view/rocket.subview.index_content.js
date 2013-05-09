(function($) {

rocket.subview.index_content = rocket.subview.extend({
    el: "#index_page_content"

    ,init: function(options){
        var me = this;

        me.setup(new rocket.subview.index_content_list(
            $.extend({}, options),
            me
        ));

        me.setup(new rocket.subview.index_content_tuiguang(
            $.extend({}, options),
            me
        ));
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
        }
    }

});

})(Zepto);


