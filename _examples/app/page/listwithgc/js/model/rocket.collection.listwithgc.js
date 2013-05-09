(function($){

rocket.collection.listwithgc = rocket.collection.extend({

    initialize: function(models, options){
        var me = this;
        me.type = ( options || {} ).type || 'internet';
    }

    ,url: function(){
        var category = app.helper.getClassById(this.type).index;
        return '/news?tn=bdapilist&category='
            + category + '&ln=200&an=20'; 
    }

    ,parse: function(resp, xhr){
        return resp.news;
    }

});

})(Zepto);

