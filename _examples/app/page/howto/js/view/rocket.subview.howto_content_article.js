(function($){

/**
 * @note: 子页面平滑切换的要素，绝对定位，高度设置，子页面事件响应（显示不隐藏）
 */

rocket.subview.howto_content_article = rocket.subview.extend({

    // 动态创建使用的class
    className: 'howto-page-content-article'

    ,template: _.template($('#template_howto_article').text())

    ,init: function(options){
        var me = this;

        me.title = options.title;
        me.featureString = me.getFeatureString();
        me.isFirstLoad = true;
        me.model = new rocket.model.howto_article(
            $.extend({}, options)
            ,$.extend({}, options)
        );
        me.showLoading(me.$el);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("subpagebeforechange", me.onsubpagebeforechange, me);

        me.model.on('change', me.render, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("subpagebeforechange", me.onsubpagebeforechange, me);

        me.model.off('change', me.render, me);
    }

    ,render: function(){
        var me = this;
        me.$el.append(me.template({
            article: me.model.toJSON()
        }));

        // 添加辅助信息，非必需
        me.$el.attr('data-title', me.title);
        me.hideLoading();
    }

    ,onsubpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params,
            featureString = me.getFeatureString(param);

        if(to == me.ec) {
            if(me.featureString == featureString){
                if(me.isFirstLoad){
                    me.model.fetch({
                        success: function(){
                            me.isFirstLoad = false;
                        }
                    });
                }

                // 跨页面切换时，需要自行显示
                me.$el.show();
            }
        }
    }

});

})(Zepto);
