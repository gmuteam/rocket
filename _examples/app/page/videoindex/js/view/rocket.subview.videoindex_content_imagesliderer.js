(function($) {

rocket.subview.videoindex_content_imageslider = rocket.subview.extend({
    el: "#videoindex_page_content_imageslider"

    ,events: {}

    ,init: function(options){
        var me = this;
    }

    ,render: function(data){
        var me = this,
            arr = data['index_flash'];

        // GMU组件
        $.ui.slider(me.$el, {
            content: $.map(arr, function(item, index){
                var t = {};
                t.href = item.url;
                t.pic = item.img_url;
                t.title = item.title;
                return t;
            })
            ,loop: true
            ,imgInit: 1
            ,viewNum: 1
        });

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
        ec.on("dataready", me.render, me);
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


