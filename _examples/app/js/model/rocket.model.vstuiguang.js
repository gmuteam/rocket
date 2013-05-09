(function($){

rocket.model.vstuiguang = rocket.model.extend({

    initialize: function(attributes, options){
        var me = this;

        rocket.model.vstuiguang._instances
            || (rocket.model.vstuiguang._instances = {});

        rocket.model.vstuiguang._instances['unique'] = me;

        me.dataCache = null;
    }

    ,url: function(){
        return '/vstuiguang.js?callback=?&' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        var me = this;

        me.dataCache = resp;
        return resp;
    }

    /**
     * 按位置获取推广内容
     * @param pos {string} 位置参数，多个位置以空格分隔
     */
    ,getByPos: function(pos){
        var me = this,
            tmp = pos.split(/\s+/),
            cache = me.dataCache,
            result = {};
        
        $.each(tmp, function(index, item){
            $.each(cache, function(index1, item1){
                if(item1.pos == item){
                    result[item] = item1;
                }
            });   
        });

        return result;
    }

});

// 通用model interface: getInstance
rocket.model.vstuiguang.getInstance = function(){
    var instances = rocket.model.vstuiguang._instances;
    return instances && instances['unique'];
}; 

})(Zepto);

