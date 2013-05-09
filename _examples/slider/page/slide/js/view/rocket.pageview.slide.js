(function($){

rocket.pageview.slide = rocket.pageview.extend({

    el: '#slide_page'

    ,init: function(options){
        var me = this;

        // setup content子视图
        me.setup(new rocket.subview.slide_content(
            $.extend({}, options), 
            me
        ));
    }

    ,registerEvents: function(){
        var me = this;

        me.$el.on('touchmove', function(e){
            e.preventDefault();
        });
    }

});

})(Zepto);
