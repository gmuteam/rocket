(function($){

rocket.subview.howtoindex_content = rocket.subview.extend({

    el: '#howtoindex_page_content'

    ,template: _.template($('#template_howtoindex_articles').text())

    ,init: function(options){
        var me = this;

        // @note: 标识是否第一次加载，避免后续多次加载
        me.isFirstLoad = true;

        me.collection = new rocket.collection.howtoindex_articles(
            null
            ,$.extend({}, options)
        );

        // 显示页面loading
        me.showLoading(me.$el);
    }

    // @note: 若不涉及回收，可以不提供unregisterEvents
    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);

        // collection的reset事件，model的change事件
        me.collection.on('reset', me.render, me);
    }

    ,render: function(){
        var me = this,
            jianjie_tag = '简介',
            rumen_tag = '入门',
            standards_tag = '规范',
            workshop_tag = 'workshop',
            jinjie_tag = '进阶';

        me.$el.append(me.template({
            jianjie_tag: jianjie_tag 
            ,jianjie_articles: me.collection.getByTag(jianjie_tag)

            ,workshop_tag: workshop_tag 
            ,workshop_articles: me.collection.getByTag(workshop_tag)

            ,rumen_tag: rumen_tag 
            ,rumen_articles: me.collection.getByTag(rumen_tag)

            ,standards_tag: standards_tag 
            ,standards_articles: me.collection.getByTag(standards_tag)

            ,jinjie_tag: jinjie_tag 
            ,jinjie_articles: me.collection.getByTag(jinjie_tag)
        }));

        me.hideLoading();
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            if(me.isFirstLoad){
                me.collection.fetch({
                    success: function(){
                        me.isFirstLoad = false;
                    }
                });
            }
            me.$el.show();
        }
    }

});

})(Zepto);
