(function($){

rocket.subview.detailwithgc_toolbar = rocket.subview.extend({

    el: '#detailwithgc_page .vs-toolbar'

    ,events: {}

    ,init: function(options){}

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
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

