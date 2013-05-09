(function($){

/**
 * @todo: 类命名规范
 */
rocket.subview.listzaker_header = rocket.subview.extend({

    el: '#listzaker_page_header' 

    ,init: function(options){
        var me = this;

        me.curType = options.type;
        // @note: 子视图逻辑比较简单，不单独再建立tag的子视图
        me.$tag = me.$('.listzaker-page-header-tag span'); 
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('pagebeforechange', me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec){
            var type = me.curType = param.type;
            me.$tag.html(app.helper.getClassById(type).title);
            me.$el.show();
        }
    }
});

})(Zepto);
