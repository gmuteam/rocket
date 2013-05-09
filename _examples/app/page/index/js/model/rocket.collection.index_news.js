(function($){

rocket.collection.index_news = rocket.collection.extend({

    initialize: function(models, options){
        var me = this;
    }

    ,url: function(){
        return '/index?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
