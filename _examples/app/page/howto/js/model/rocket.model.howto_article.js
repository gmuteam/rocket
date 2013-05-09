(function($){

rocket.model.howto_article = rocket.model.extend({

    initialize: function(attributes, options){
        var me = this;
        me.title = options.title;
        // me.title = '什么情况下去跟进PC的HTML5技术';
        // me.title = 'UTF8 and UTF16 Conversions in VIM73';
        // me.title = 'Linux下Apache安装';
        // me.title = 'Linux下MySql的安装';
        // me.title = '切换到VBox4碰到的一些问题';
        // me.title = '用于简单日志分析的Linux命令';
        // me.title = '说说VIM的命令行开关：-c';
        // me.title = 'Linux下安装XPDF及其简单应用';
        // me.title = '如何创建一个webapp页面';
        // me.title = 'webapp framework涉及的一些概念'; 
    }

    ,url: function(){
        return '/articles/get_article.php?'
            + 'title=' +  encodeURIComponent(this.title);
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }
});

})(Zepto);
