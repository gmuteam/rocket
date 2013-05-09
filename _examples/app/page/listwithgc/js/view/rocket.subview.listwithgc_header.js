(function($){

/**
 * listwithgc_header子视图，固定创建
 */
rocket.subview.listwithgc_header = rocket.subview.extend({

    template: _.template($('#template_listwithgc_header').text())

    ,events: {
        'click .listwithgc-page-header-scroller a': 'onnavclick'
    }

    ,el: '#listwithgc_page_header' 

    ,init: function(options){
        var me = this;

        me.curLink = null;

        me.render();
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,render: function(){
        var me = this;

        me.$el.append(me.template({
            classes: app.conf.classMap
        })); 

        me.navScroller = new iScroll(
            'listwithgc_page_header',
            {
                vScroll: false,
                vScrollbar: false,
                hScrollbar: false
            }
        );

        me.refresh();

        return me;
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;

        if(to == me.ec) {
            me.$el.show();
            // if(me.type == param.type){
            //     if(me.isFirstLoad){
            //         me.collection.fetch({
            //             success: function(){
            //                 me.isFirstLoad = false;
            //             }
            //         });
            //     }
            // }
            // else{
            //     me.$el.hide();
            // }
        }
    }

    ,refresh: function(){
        var me = this;

        setTimeout(function(){
            var blocks = me.$el.children('div').children('a'),
                allWidth = 0;

            blocks.each(function(index, item){
                allWidth += item.offsetWidth;
            });
            me.$el.children('div').width(allWidth);

            me.navScroller.refresh();

        }, 0);

    }

    ,onnavclick: function(e){
        var me = this,
            link = $(e.target).closest('a');

        me.curLink 
            && (me.curLink.removeClass('listwithgc-page-header-scroller-current'));
        link.addClass('listwithgc-page-header-scroller-current');
        me.curLink = link;
        me.refresh();
    }

});

})(Zepto);

