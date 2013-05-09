(function($){

rocket.collection.outline_sections = rocket.collection.extend({

    initialize: function(models, options){
        var me = this;

        me.title = options.title
            || 'ROCKET框架介绍';
        me.sections = null;

        // 保留实例引用
        rocket.collection.outline_sections._instances
            || (rocket.collection.outline_sections._instances = {});

        rocket.collection.outline_sections._instances[me.title] = me;
    }

    ,url: function(){
        return '/articles/get_article.php?'
            + 'title=' +  encodeURIComponent(this.title);
    }

    ,parse: function(resp, xhr){
        return resp.content.slice(1);
    }

    ,getSections: function(){
        var me = this,
            models = me.models,
            model,
            sections = [],
            docinfoFlag = true;

        if(me.sections){
            return me.sections;
        }

        for(var i=0; i<models.length; i++){
            model = models[i];
            if('docinfo' == model.get('type')
                || 'headline' == model.get('type') 
                    && 2 == model.get('level')){
                sections.push([model.toJSON()]); 
            }
            else{
                sections[sections.length - 1].push(model.toJSON());
            }
        }
        me.sections = sections;

        return me.sections;
    }

    ,getSection: function(sliderindex){
        var me = this,
            sections = me.getSections(),
            sec = null;

        sec = sections[sliderindex - 1] || sec;

        return sec;
    }

    ,getSectionCount: function(){
        return this.getSections().length;
    }

});

// 通用model，提供跨页面访问
rocket.collection.outline_sections.getInstance = function(title){
    var instances = rocket.collection.outline_sections._instances;
    return instances && instances[title];
}; 

})(Zepto);

