(function($) {

rocket.subview.videoindex_content_listwrapper = rocket.subview.extend({

    el: "#videoindex_page_content_listwrapper"

    ,init: function(options){
        var me = this;

        $.each(['movie', 'tvplay', 'tvshow', 'comic'], function(index, item){
            me.append(new rocket.subview.videoindex_content_list(
                $.extend({videotype: item}, options)
                ,me
            )); 
        });

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


