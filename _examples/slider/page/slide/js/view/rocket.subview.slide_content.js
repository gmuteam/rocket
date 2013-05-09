(function($){

rocket.subview.slide_content = rocket.subview.extend({
    
    el: '#slide_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            sliderIndex = options.sliderindex,
            subView,
            spm;

        spm = me.getSubpageManager({
            subpageClass: rocket.subview.slide_pageslider 
            ,maxSubpages: 2
        });

        subView = new rocket.subview.slide_pageslider(
            $.extend({}, options),
            me
        );
        me.append(subView);

        // 注册子页面
        spm.registerSubpage(me.featureString, subView);
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;

        ec.on("pagebeforechange", me.onpagebeforechange, me);
        ec.on("pageafterchange", me.onpageafterchange, me);

        var keydownLocking = false;
        $(document).on('keydown', function(e){
            if(!keydownLocking){
                keydownLocking = true;

                ec.trigger('keydown', {
                    key: e.which
                    ,target: me.subpageManager._currentSubpage
                });

                setTimeout(function(){
                    keydownLocking = false;
                }, 500);
            }
        });
    }

    ,unregisterEvents: function(){
        var me = this, ec = me.ec;

        ec.off("pagebeforechange", me.onpagebeforechange, me);
        ec.off("pageafterchange", me.onpageafterchange, me);
        $(document).off('keydown');
    }

    ,getSubpageSwitchDir: function(fromSubpage, toSubpage){
        var f = fromSubpage, 
            t = toSubpage,
            dir = 0;

        if(!f || !t){
            dir = 0;
        }
        else{
            dir = 
                parseInt(f.options.sliderindex) 
                    < parseInt(t.options.sliderindex)
                ? 1 : 2;
        }

        return dir;
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params,
            featureString = me.getFeatureString(param);

        if(to == me.ec){
            me.$el.show();
            me.refreshViewHeight();
        }
    }

    ,refreshHeight: function(){
        var me = this;
        window.scrollTo(0, 0);
        me.$el.height($(window).height() - 70);        
    }

    ,onorientationchange: function(from, to){
        var me = this; 
        // @note: 不直接调用refreshHeight，而调用refreshViewHeight，使用其延时
        me.refreshViewHeight();
    }

});

})(Zepto);
