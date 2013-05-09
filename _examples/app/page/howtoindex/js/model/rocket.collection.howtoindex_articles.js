(function($){

rocket.collection.howtoindex_articles = rocket.collection.extend({

    initialize: function(models, options){
        var me = this;
        me.tag = 'webapp框架';
    }

    ,url: function(){
        return '/articles/list_articles.php?'
            + 'tag=' +  encodeURIComponent(this.tag);
    }

    ,parse: function(resp, xhr){
        return resp;
    }

    // 按tag获取数据
    ,getByTag: function(tag){
        var me = this,
            articles;

        articles = $.map(me.models, function(item, index){
            if(new RegExp(tag, 'gi').test(item.get('tag'))){
                return item.toJSON();
            } 
        }); 

        return articles;
    }
});

})(Zepto);
