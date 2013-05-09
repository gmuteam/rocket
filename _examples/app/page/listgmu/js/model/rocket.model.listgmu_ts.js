(function($){

rocket.model.listgmu_ts = rocket.model.extend({

    initialize: function(models, options){
        var me = this;

        me.type = ( options || {} ).type || 'focus';

        me.pageIndex = 0;

        me.queries = {
            category: app.helper.getClassById(me.type).index
            , ln: 200
            , an: 20
        };
    }

    ,urlTemplate: function(){

        if(this.pageIndex == 0){
            // 首次请求
            return '/news?tn=bdapilist&category=<%=category%>&ln=<%=ln%>&an=<%=an%>&t=' 
                + new Date().getTime();
        }else{
            // 加载更多
            return '/news?tn=bdapirecommend&category=<%=category%>&nids=1&ts=<%=ts%>&wf=0&t=' 
                + new Date().getTime();
        }

    }

    ,url: function(){
        var me = this,
            category = me.queries.category,
            news = me.get('news');

        // 非第一次请求
        if(news){
            if(me.pageIndex == 1){
                me.queries.ts = me.get('st');     
            }
            else{
                me.queries.ts = me.get('ts');     
            }
        }

        return _.template(this.urlTemplate(), this.queries);
    }

    ,checkDataLimit: function(resp){
        var me = this;
        if(resp.news.length < 20
            || me.pageIndex > 5
            ){
            me.trigger('datalimit', {});
        }
    }

    ,parse: function(resp, xhr){
        this.checkDataLimit(resp);
        return resp;
    }

});

})(Zepto);

