(function($){

rocket.subview.list_toolbar = rocket.subview.extend({

    el: '#list_page .vs-toolbar'

    ,events: {}

    ,init: function(options){
        var me = this,
            $cont;

        $cont = me.$titleContainer 
            = me.$('.vs-toolbar-titlecontainer');

        $cont.html('Raw Implementation'); 
    }

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
