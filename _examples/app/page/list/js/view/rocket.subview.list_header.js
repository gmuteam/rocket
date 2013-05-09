(function($){

/**
 * list_header子视图，固定创建
 * @todo: 建subview挂navbar
 * @todo: 当前tab保持在可视区
 */
rocket.subview.list_header = rocket.subview.extend({

    template: _.template($('#template_list_header').text())

    ,events: {
        'click .list-page-header-scroller a': 'onnavclick'
    }

    ,el: '#list_page_header' 

    ,init: function(options){
        var me = this;
        
        me.render();
        me.$curTab = me.$('.list-page-header-scroller-current');
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,render: function(){
        var me = this;

        me.$el.append(me.template({
            curType: me.options.type
            ,classes: app.conf.classMap
        })); 

        me.navScroller = new iScroll(
            'list_page_header',
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
            me.switchToTab(me.getTab(param.type));
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

    ,getTab: function(type){
        var me = this,
            blocks = me.$el.children('div').children('a');

        for(var i=0; i<blocks.length; i++){
            if($(blocks[i]).data('type') == type){
                return $(blocks[i]);
            }
        }

        return null;
    }

    ,switchToTab: function(tab){
        var me = this,
            $tab = $(tab);

        me.$curTab 
            && (me.$curTab.removeClass('list-page-header-scroller-current'));
        $tab.addClass('list-page-header-scroller-current');
        me.$curTab = $tab;
        me.refresh();
    }

    ,onnavclick: function(e){
        var me = this,
            $link = $(e.target).closest('a');

        me.switchToTab($link);
    }

});

})(Zepto);

