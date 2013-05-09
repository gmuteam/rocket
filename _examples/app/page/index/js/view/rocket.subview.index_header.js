(function($) {

rocket.subview.index_header = rocket.subview.extend({
    el: "#index_page_header",

    events: {
    },

    init: function(options){
        var me = this;
        me.render();
    },

    render: function(){
        var me = this;
        // me.$el.html(this.options.type);
        return me;
    },

    registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
        // ec.on("dataready", me.render, me);
    },

    onpagebeforechange: function(params){
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


