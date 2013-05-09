(function($) {

rocket.subview.videoindex_content_list = rocket.subview.extend({
    className: "videoindex-page-content-list"

    ,template: _.template(
        $('#template_videoindex_content_list').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.videotype = options.videotype;
    }

    ,render: function(data){
        var me = this;

        me.$el.append(
            me.template({
                type: me.videotype,
                typename: app.helper.getVideoClassById(me.videotype).title,
                list: data[me.videotype + '_hot'] 
            })
        );

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


