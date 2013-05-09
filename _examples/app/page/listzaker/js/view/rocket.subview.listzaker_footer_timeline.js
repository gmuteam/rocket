(function($){

rocket.subview.listzaker_footer_timeline = rocket.subview.extend({

    el: '#listzaker_page_footer .listzaker-page-footer-timeline' 

    ,events: {
    }

    ,init: function(options){
        var me = this;

        me.curType = options.type;

        me.$timeBegin = me.$('.listzaker-page-footer-timeline-ruler-begin');
        me.$timeEnd = me.$('.listzaker-page-footer-timeline-ruler-end-text');
        me.$ruler = me.$('.listzaker-page-footer-timeline-ruler');
        me.$cursor = me.$('.listzaker-page-footer-timeline-ruler-cursor');
        me.$cursorHead = me.$('.listzaker-page-footer-timeline-ruler-cursor-head');
    }

    ,render: function(params){
        var me = this,
            timeBegin = params.timeBegin,
            timeEnd = params.timeEnd,
            currentPage = params.currentPage,
            totalPages = params.totalPages;

        me.$timeBegin.html(timeBegin);
        me.$timeEnd.html(timeEnd);

        // setTimeout(function(){
            me.setCursor(currentPage, totalPages);
        // }, 1000);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on('pagebeforechange', me.onpagebeforechange, me);
        ec.on('settimelineloading', me.onsettimelineloading, me);
        ec.on('unsettimelineloading', me.onunsettimelineloading, me);
        ec.on('settimeline', me.render, me);
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off('pagebeforechange', me.onpagebeforechange, me);
        ec.off('settimelineloading', me.onsettimelineloading, me);
        ec.off('unsettimelineloading', me.onunsettimelineloading, me);
        ec.off('settimeline', me.render, me);
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

    ,onsettimelineloading: function(){
        var me = this;
        me.$timeEnd.hide();
    }

    ,onunsettimelineloading: function(){
        var me = this;
        me.$timeEnd.show();
    }

    ,setCursor: function(currentPage, totalPages){
        var me = this;

        me.$cursorHead.html(currentPage);
        me.$cursor.css({
            left: 132 * ( ( currentPage - 1 ) / ( totalPages - 1 ) ) - 10 + 'px'
        });
    }

});

})(Zepto);
