(function($) {

rocket.subview.index_content_tuiguang = rocket.subview.extend({
    el: "#index_page_content_tuiguang"

    ,template: _.template(
        $('#template_index_content_tuiguang').text()
    )

    ,init: function(options){
        var me = this;

        // @note: 标识是否第一次加载，避免后续多次加载
        me.isFirstLoad = true;

        // 通用model
        me.model = rocket.model.vstuiguang.getInstance();

        if(me.model.dataCache){
            me.render();
        }

    }

    ,render: function(){
        var me = this;

        if(!me.isFirstLoad){
            return me;
        }
        me.isFirstLoad = false;

        me.$el.append(me.template({
            tuiguang: me.model.getByPos('407')['407']
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


