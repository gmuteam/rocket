(function($){

rocket.model.listzaker_nids = rocket.model.extend({

    initialize: function(models, options){
        var me = this;

        rocket.model.listzaker_nids._instances
            || (rocket.model.listzaker_nids._instances = {});

        me.type = ( options || {} ).type || 'civilnews';

        rocket.model.listzaker_nids._instances[me.type] = me;

        // 可请求页面总数限制
        // @todo: 修改成10
        me.totalPages = 5;

        // 逻辑页号，对应后端数据请求，每一次请求增1
        me.pageIndex = 0;

        // 缓存预取的nid
        me.nidCache = [];

        // 数据缓存，用于限量输出、重绘等后续操作
        me.dataCache = [];

        // 标识是否到达数据集末尾而无法再请求 
        me.arriveDataLimit = false; 

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

    /**
     * 增加页面下标
     */
    ,incPageIndex: function(){
        var me = this,
            totalPages = me.totalPages;

        if(me.pageIndex + 1 >= totalPages){
            if(me.pageIndex + 1 == totalPages){
                // @note: 确保只触发一次datalimit事件，也是该函数的可重入性保障
                if(!me.arriveDataLimit){
                    me.arriveDataLimit = true;
                    me.pageIndex++;
                    me.trigger('datalimit');
                    me.pageIndex--;
                }
            }
            return false;
        }   
        me.pageIndex++;
        return true;
    }

    ,getPageIndex: function(){
        return this.pageIndex;
    }

    ,checkDataLimit: function(resp){
        var me = this;
        if(resp.news.length < 20){
            if(!me.arriveDataLimit){
                me.arriveDataLimit = true;
                me.pageIndex++;
                me.trigger('datalimit');
                me.pageIndex--;
            }
        }
    }

    /**
     * 缓存数据
     * @note: 默认数据按序请求，若不能保证，则需要修改逻辑
     */
    ,cacheData: function(resp){
        var me = this, 
            cache = me.dataCache,
            news = resp.news;

        for(var i=0; i<20 && i<news.length; i++){
            me.dataCache.push(news[i]);
        }
    }

    /**
     * 获取符合按页取整的数据，返回下一页数据
     */
    ,getPagedNews: function(num){
        var me = this,
            start = me.pageIndex * num,
            end = start + num;

        // @note: 数据已无法再请求，一次性返回剩余数据
        return me.arriveDataLimit ? 
            me.dataCache.slice(start)
            : me.dataCache.slice(start, end);
    }

    /**
     * 获取符合按页取整的数据，返回从第一页到下一页的全部数据
     */
    ,getPagedNewsUpToNextPage: function(num){
        var me = this,
            start = 0,
            end = me.pageIndex * num + num;

        // @note: 数据已无法再请求，一次性返回剩余数据
        return me.arriveDataLimit ? 
            me.dataCache.slice(start)
            : me.dataCache.slice(start, end);
    }

    /**
     * 获取下一条新闻数据
     * @param nid {string} 当前新闻的nid
     */
    ,getNextNews: function(nid){
        var me = this,
            cache = me.dataCache;

        for(var i=0; i<cache.length; i++){
            if(nid == cache[i].nid){
                return i<cache.length-1?
                    cache[i+1] : null;
            }
        }
        return null;
    }

    /**
     * 获取时间线信息
     * @param {integer} numPerSlider 每张幻灯的新闻条目数
     */
    ,getTimelineInfo: function(numPerSlider){
        var me = this,
            cache = me.dataCache,
            timeBegin = timeEnd = 0;

        $.each(cache, function(index, item){
            if(item.ts > timeBegin || timeBegin == 0){
                timeBegin = item.ts;
            } 

            if(item.ts < timeEnd || timeEnd == 0){
                timeEnd = item.ts;
            }
        });

        return {
            timeBegin: app.helper.getFormatedDate(timeBegin)
            ,timeEnd: app.helper.getFormatedDate(timeEnd)
            ,totalPages: Math.ceil( cache.length /numPerSlider )
        };
    }

    ,parse: function(resp, xhr){
        var me = this;
        me.cacheNIDS(resp);
        me.checkDataLimit(resp);
        me.cacheData(resp);
        return resp;
    }

});

// 通用model例子
rocket.model.listzaker_nids.getInstance = function(type){
    var instances = rocket.model.listzaker_nids._instances;
    return instances && instances[type];
}; 

})(Zepto);


