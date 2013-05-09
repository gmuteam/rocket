/**
 * 首页ContentView类
 */
(function($) {

rocket.subview.indexoptimized_content = rocket.subview.extend({
    el: "#indexoptimized_page_content"

    ,template: _.template(
        $('#template_indexoptimized_content').text()
    )

    ,events: {}

    ,init: function(options){
        var me = this;

        me.isFirstLoad = true;

        // 创建collection数据对象
        me.collection = new rocket.collection.indexoptimized_news(null, options);

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

        // setup subviews
        me.$('.indexoptimized-page-content-list-item')
            .each(function(index, item){
                me.setup(new rocket.subview.indexoptimized_contentitem({
                    el: item
                }, me)); 

                // 默认展示，subview比较简单，没有响应pagechange相关事件
                $(item).show();
            });

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


