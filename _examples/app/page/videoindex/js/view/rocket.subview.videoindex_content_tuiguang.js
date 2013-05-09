(function($) {

rocket.subview.videoindex_content_tuiguang = rocket.subview.extend({
    el: "#videoindex_page_content_tuiguang"

    ,template: _.template(
        $('#template_videoindex_content_tuiguang').text()
    )

    ,init: function(options){
        var me = this;

        // 通用model
        me.model = rocket.model.vstuiguang.getInstance();

        if(me.model.dataCache){
            me.render();
        }

    }

    ,render: function(){
        var me = this;

        me.$el.append(me.template({
            tuiguang: me.model.getByPos('501')['501']
        }));

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.model.on('change', me.render, me);
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


