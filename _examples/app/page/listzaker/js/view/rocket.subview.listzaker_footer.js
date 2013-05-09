(function($){

rocket.subview.listzaker_footer = rocket.subview.extend({

    el: '#listzaker_page_footer' 

    ,events: {
        'click .listzaker-page-footer-backbtn': 'onbackbtnclick'
        ,'click .listzaker-page-footer-refreshbtn': 'onrefreshbtnclick'
    }

    ,init: function(options){
        var me = this;

        me.curType = options.type;

        me.setup(new rocket.subview.listzaker_footer_timeline(
            $.extend({}, options)
            ,me
        ));
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
            me.$el.show();
        }
    }

    ,onbackbtnclick: function(e){
        Backbone.history.navigate(
            '#navzaker'
            ,{trigger: true}
        );
    }

    ,onrefreshbtnclick: function(e){
        location.reload();
    }

});

})(Zepto);
