(function($){

rocket.pageview.detailmulticolumn = rocket.pageview.extend({

    el: '#detailmulticolumn_page'

    ,init: function(options){
        var me = this;

        // setup subview
        me.setup(new rocket.subview.detailmulticolumn_content(
            $.extend({}, options)
            ,me
        ));
    }

});

})(Zepto);
