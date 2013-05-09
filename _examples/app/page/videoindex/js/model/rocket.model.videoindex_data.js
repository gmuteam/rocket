(function($){

rocket.model.videoindex_data = rocket.model.extend({

    initialize: function(attributes, options){
        var me = this;
    }

    ,url: function(){
        return 'http://app.video.baidu.com/wisehome/?action=iphwebindex&callback=?&' 
            + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp;
    }

});

})(Zepto);
