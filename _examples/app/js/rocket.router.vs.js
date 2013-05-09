/**
 * vs产品的Router类
 */
(function($) {

rocket.router.vs = rocket.router.extend({

    // 路由配置
    routes: {
        '': 'index'
        ,'indexoptimized': 'indexoptimized'
        ,'list/:type': 'list'
        ,'listwithgc/:type': 'listwithgc'
        ,'listgmu/:type': 'listgmu'
        ,'detail/:type/:src/:title/:author/:time/:nid': 'detail'
        ,'detailwithgc/:type/:src/:title/:author/:time/:nid': 'detailwithgc'
        ,'detailgmu/:type/:src/:title/:author/:time/:nid': 'detailgmu'
        ,'detailmulticolumn/:type/:src/:title/:author/:time/:nid': 'detailmulticolumn'
        ,'listzaker/:type': 'listzaker'
        ,'navzaker': 'navzaker'
        ,'howto/:title': 'howto'
        ,'howtoindex': 'howtoindex'
        ,'videoindex': 'videoindex'
        // '*defaultUrl': 'defaultRoute'
    }

    // 页面切换顺序配置
    ,pageOrder: [
        'index'
        , 'indexoptimized'
        , 'navzaker'
        , 'list'
        , 'listwithgc'
        , 'listgmu'
        , 'listzaker'
        , 'detail'
        , 'detailwithgc'
        , 'detailgmu'
        , 'detailmulticolumn'
        , 'howtoindex'
        , 'howto'
        , 'videoindex'
    ]

    // 位置记忆，默认为false，不进行位置记忆
    ,enablePositionRestore: true

    // 默认页面切换动画
    ,defaultPageTransition: 'slide'

    // 页面切换动画配置
    ,pageTransition: {
        /**
         * @note: slide比较适用于固高切换，fade比较适用DOM树较小的两个页面切换，simple性能最好，但效果最一般，合理选择配置
         */
        'index-indexoptimized': 'simple' 

        // @note: 对于启用非固高页面启用位置保留，fade可以提升切换效果
        ,'index-navzaker': 'fade'

        ,'index-listzaker': 'slide'

        ,'index-detailmulticolumn': 'simple'

        ,'indexoptimized-navzaker': 'fade'
        ,'navzaker-indexoptimized': 'slide'

        ,'navzaker-listzaker': 'dropdown'

        ,'howtoindex-howto': 'fade'

        ,'index-howtoindex': 'slide'
        ,'indexoptimized-howtoindex': 'slide'

    }

    ,defautHandler: function(){
        
    }

    ,index: function() {
        this.doAction('index', {});
    }

    ,indexoptimized: function() {
        this.doAction('indexoptimized', {});
    }

    ,detail: function(type, src, title, author, time, nid) {
        this.doAction('detail', {
            type: decodeURIComponent(type),
            src: decodeURIComponent(src),
            title: decodeURIComponent(title),
            author: decodeURIComponent(author),
            time: decodeURIComponent(time),
            nid: nid
        });
    }

    ,detailwithgc: function(type, src, title, author, time, nid) {
        this.doAction('detailwithgc', {
            type: decodeURIComponent(type),
            src: decodeURIComponent(src),
            title: decodeURIComponent(title),
            author: decodeURIComponent(author),
            time: decodeURIComponent(time),
            nid: nid
        });
    }

    ,detailgmu: function(type, src, title, author, time, nid) {
        this.doAction('detailgmu', {
            type: decodeURIComponent(type),
            src: decodeURIComponent(src),
            title: decodeURIComponent(title),
            author: decodeURIComponent(author),
            time: decodeURIComponent(time),
            nid: nid
        });
    }

    ,detailmulticolumn: function(type, src, title, author, time, nid) {
        this.doAction('detailmulticolumn', {
            type: decodeURIComponent(type),
            src: decodeURIComponent(src),
            title: decodeURIComponent(title),
            author: decodeURIComponent(author),
            time: decodeURIComponent(time),
            nid: nid
        });
    }

    ,list: function(type) {
        this.doAction('list', {
            type: decodeURIComponent(type)
        });
    }

    ,listwithgc: function(type) {
        this.doAction('listwithgc', {
            type: decodeURIComponent(type)
        });
    }

    ,listgmu: function(type) {
        this.doAction('listgmu', {
            type: decodeURIComponent(type)
        });
    }

    ,listzaker: function(type) {
        this.doAction('listzaker', {
            type: decodeURIComponent(type)
        });
    }

    ,navzaker: function(){
        this.doAction('navzaker', {});
    }

    ,howtoindex: function(){
        this.doAction('howtoindex', {});
    }

    ,howto: function(title){
        this.doAction('howto', {
            title: decodeURIComponent(title)
        });
    }

    ,videoindex: function(){
        this.doAction('videoindex', {});
    }

    ,defaultRoute: function(defaultUrl) {
        Backbone.history.navigate('index', {trigger: true, replace: true});
    }

    /**
     * action处理逻辑
     * @{param} action {string} action名称
     * @{param} params {object} action参数
     * @{param} statOptions {object} 统计选项{disable:是否屏蔽统计,默认开启;param:{key: value,key: value}}]统计参数}
     */
    ,doAction: function(action, params, statOptions){
        // 必须延时，否则动画性能大打折扣
        // $.later(function(){
        //     var opts = statOptions ? statOptions : {}
        //     if(!opts.disable){
        //         var statObj = _.extend({
        //             'wa_type': action,
        //             'act' : 'switch'
        //         }, opts.params ? opts.params : {});
        //         rocket.v(statObj);
        //     }
        // });

        rocket.router.prototype.doAction.apply(this, arguments);
    }

}); 

})(Zepto);




