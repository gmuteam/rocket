(function($){

rocket.model.listgmu_nids = rocket.model.extend({

    initialize: function(models, options){
        var me = this;

        me.type = ( options || {} ).type || 'civilnews';

        me.pageIndex = 0;

        // 缓存预取的nid
        me.nidCache = [];

        me.queries = {
            category: app.helper.getClassById(me.type).index
            , ln: 200
            , an: 20
        };
    }

    ,urlTemplate: function(){

        if(0 == this.pageIndex){
            // 首次请求
            return '/news?tn=bdapilist&category=<%=category%>&ln=<%=ln%>&an=<%=an%>&t=' 
                + new Date().getTime();
        }else{
            // 加载更多
            return '/news?tn=bdapirecommend&category=<%=category%>&nids=<%=nids%>&ts=<%=ts%>&wf=0&t=' 
                + new Date().getTime();
        }

    }

    ,cacheNIDS: function(resp){
        var me = this,
            news = resp.news;

        if(news.length > 20){
            // 从第20条开始缓存nid
            for(var i=20; i<news.length; i++){
                me.nidCache.push(news[i].nid);
            }
            // console.log(me.getNIDS(1));
        }
    }

    ,getNIDS: function(pn){
        var me = this,
            cache = me.nidCache,
            nids = ''; 
        
        if(pn < 1){
            return nids;
        }

        for(var i=(pn-1)*20, j=0; j<20 && i< cache.length; i++, j++){
            nids += ',' + cache[i];
        }
        return nids;
    }

    ,url: function(){
        var me = this,
            category = me.queries.category,
            news = me.get('news');

        me.queries.ts = news && news.ts;

        // 非第一次请求
        if(news){
            me.queries.nids = me.getNIDS(me.pageIndex); 
        }

        return _.template(this.urlTemplate(), this.queries);
    }

    ,checkDataLimit: function(resp){
        var me = this;
        if(resp.news.length < 20
            || me.pageIndex > 5
            ){
            me.trigger('datalimit');
        }
    }

    ,parse: function(resp, xhr){
        this.cacheNIDS(resp);
        this.checkDataLimit(resp);
        return resp;
    }

});

})(Zepto);

