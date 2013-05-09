(function($) {

rocket.subview.index_content_list = rocket.subview.extend({
    el: "#index_page_content_list"

    ,template: _.template(
        $('#template_index_content_list').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        me.collection = new rocket.collection.index_news(null, options);

        // 展示loading
        me.showLoading(me.$el);
    }

    ,render: function(){
        var me = this;

        // 使用append，避免将loading冲掉
        me.$el.append(
            me.template({
                content: me.collection.toJSON()
            })
        );

        // 隐藏loading
        me.hideLoading();

        return me;
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        me.collection.on('reset', me.render, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            if(me.isFirstLoad){
                me.collection.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
        }
    }

});

})(Zepto);


