(function($){

rocket.model.detailgmu_news = rocket.model.extend({

    initialize: function(attributes, options){
        var me = this;
        me.nid = options.nid;
        me.type = options.type;
    }
    
    ,url: function(){
        var category = app.helper.getClassById(this.type).index;
        return '/news?tn=bdapibody'
            + '&type=' + (this.type == 'focus' ? 1 : 0)
            + '&nids=' + this.nid
            + '&category=' + category; 
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
