(function($){

rocket.subview.howtoindex_header = rocket.subview.extend({

    el: '#howtoindex_page_header'

    ,template: _.template($('#template_howtoindex_header').text())

    ,init: function(options){
        var me = this;

        // @note: 标识是否第一次加载，避免后续多次加载
        me.isFirstLoad = true;

        // 通用model
        me.model = rocket.model.vstuiguang.getInstance();

        if(me.model.dataCache){
            me.render();
        }

        // @todo: 为什么没有showLoading，因为只用于主体数据的loading，推广数据不给loading反馈 
    }

    // @note: 若不涉及回收，可以不提供unregisterEvents
    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);

        // collection的reset事件，model的change事件
        me.model.on('change', me.render, me);
    }

    ,render: function(){
        var me = this;

        if(!me.isFirstLoad){
            return me;
        }
        me.isFirstLoad = false;

        me.$el.append(me.template({
            tuiguang: me.model.getByPos('501')['501']
        }));

        return me;
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
