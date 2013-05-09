(function($){

rocket.subview.indexoptimized_contentitem = rocket.subview.extend({

    events: {
        'click .indexoptimized-page-content-list-item-title': 'ontitleclick'
        /*
        , 'click .indexoptimized-page-content-list-item-title .ui-icon-arrow-r'
            : 'ontitleiconclick'
            */
    }

    ,init: function(options){
        var me = this;

        me.$title = me.$('.indexoptimized-page-content-list-item-title');
        me.$desc = me.$('.indexoptimized-page-content-list-item-desc');

        me.descHeight = me.$desc.height();

        // setup gmu button控件
        me.$title.button();

        // 默认隐藏
        me.$desc.css({'margin-top': -me.descHeight - 10});
    }

    ,registerEvents: function(e){
        var me = this,
            ec = me.ec;

        ec.on('itemopen', me.onitemopen, me);
    }

    ,unregisterEvents: function(e){
        var me = this,
            ec = me.ec;

        ec.off('itemopen', me.onitemopen, me);
    }

    ,openItem: function(){
        this.$desc.animate({
            'margin-top': 0 
        }, 300, 'easing-out');
    }

    ,closeItem: function(){
        var me = this;
        me.$desc.animate({
            'margin-top': -me.descHeight - 10
        }, 300, 'easing-in');
    }

    ,onitemopen: function(params){
        var me = this,
            target = params.target;

        if(target != me){
            me.closeItem();
        }
    }

    ,ontitleclick: function(e){
        var me = this,
            $target = $(e.target),
            ec = me.ec;

        if($target.hasClass('ui-button-text')){
            // me.$desc.toggle();

            if(parseInt(me.$desc.css('margin-top')) < 0){
                me.openItem();
                ec.trigger('itemopen', {target: me});
            }
            else{
                me.closeItem();
            }
        }
        else{
            location.href = $target
                .closest('.indexoptimized-page-content-list-item-title')
                .data('url');
        }

    } 

    ,ontitleiconclick: function(e){
        var me = this,
            $target = $(e.target);
        
        location.href = $target.parent().data('url');
    }

});

})(Zepto);
