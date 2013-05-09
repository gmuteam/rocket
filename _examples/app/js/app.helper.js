/**
 * helper对象：提供一些常用帮助函数
 */
(function($) {

window.app = window.app || {};

app.helper = {

    getClassById: function(id) {
        for(var i = 0, iLen = app.conf.classMap.length; i < iLen; i++) {
            var m = app.conf.classMap[i];
            if(m.id == id) {
                return m;
            }
        }
        return {};
    }

    ,getVideoClassById: function(id) {
        var map = app.conf.videoClassMap;
        for(var i = 0, iLen = map.length; i < iLen; i++) {
            var m = map[i];
            if(m.id == id) {
                return m;
            }
        }
        return {};
    }

    ,getDirectionOfClassMap: function(map, currentId, newId) {
        var currentIndex, newIndex;
        _.each(map, function(obj, index) {
            if(currentId == obj.id) {
                currentIndex = index;
            }
            else if(newId == obj.id) {
                newIndex = index;
            }
        });

        return currentIndex > newIndex ? 2 : 1;
    }

    // 统计
    ,sendStatistics: function(options){
        var link = $("#statLink"),
            time = (new Date()).getTime(),
            fr = app.helper.queryString("fr"), 
            fr = fr ? fr : "",
            queryString = "";

        for(opt in options) {
            queryString += (opt + "=" + options[opt] + "&");
        }

        //t_f：小流量标志位
        link.attr("href", "http://nsclick.baidu.com/v.gif?pid=107&wise=1&from=ipad&" 
                + queryString 
                + "fr=" + fr 
                + "&t=" + time
        );
    }

    ,appCache: function(){
        var cache = window.applicationCache;

        cache && cache.addEventListener('updateready', function(e){
            if (cache.status == cache.UPDATEREADY) {
                cache.update();
                cache.swapCache();
            }
        });

    }

    ,startupImage: function(){
        if ($.os.ios
            && window.devicePixelRatio >= 2 
            && $.browser.version >= 5){
            $('head').append($(
'<link rel="apple-touch-startup-image" href="/static/news/webapp_pro/img/startup_640_920.jpg" />'
            ));
        }
    }

    ,getFormatedDate: function(ms) {
        var d_minutes, d_hours, d_days;
        var timeNow = new Date().getTime();
        var d = (timeNow - ms)/1000;
            d_days = Math.round(d / (24*60*60));
            d_hours = Math.round(d / (60*60));
            d_minutes = Math.round(d / 60);
            d_secend = Math.round(d);
        if (d_days > 0 && d_days < 4) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else if (d_minutes <= 0 && d_secend > 0) {
            return d_secend + "秒钟前";
        } else if (d_secend == 0) {
            return "刚刚";
        } else {
            var s = new Date();
                s.setTime(ms);
            return (s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate() + " "+s.getHours() + ":"+s.getMinutes());
        }
    }

    ,getZakerListClass: function(item){
        if(item.imageurls.length > 0){
            return 'b';
        } 
        return 'a';
    }

    ,escapeHTML: function(str){
        // @note: escape & first
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    ,escapeMarkdownText: function(type, content){
        switch(type){
            case 'code':
                return app.helper.escapeHTML(content)
                    .replace(/[ \t]+/g, function($0){
                        var i = $0.length, 
                            str = '';
                        while(i-- > 0){
                            str += '&nbsp;';
                        }
                        return str;
                    });

            case 'paragraph':
            case 'ol':
            case 'ul':
                return app.helper.escapeHTML(content)
                    .replace(/\+@@__LEFT__@@/g, '<')
                    .replace(/-@@__RIGHT__@@/g, '>')
                    .replace(/\+@@__EMPHASIS__@@/g, '<em>')
                    .replace(/-@@__EMPHASIS__@@/g, '</em>');
        }
    }

};
    
rocket.v = app.helper.sendStatistics;


    app.helper.queryString = function(key){
        return (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
    };

    //判断网站是否展现广告
    app.helper.siteHasAD = function() {
        var fr = app.helper.queryString("fr");

        if(fr && app.helper) {
            //app.helper.adBlackList:  [{name:"site name"; params:{/*config*/}}]
            var blackList = app.helper.adBlackList || [];

            var site = _.find(blackList, function(item){
                if(item.name == fr.toLowerCase()) {
                    return item;
                }
            });
            if(site) return false;
        }

        return true;
    };
    
    //判断网站是否链接到旧的应用推荐页
    app.helper.oldRecUrl = function() {
        var fr = app.helper.queryString("fr");

        if(fr && app.helper) {
            var blackList = app.helper.newRecUrlList || [];

            var site = _.find(blackList, function(item){
                if(item.name == fr.toLowerCase()) {
                    return item;
                }
            });
            if(site) return false;
        }

        return true;
    };

    app.helper.formatSearchDate = function(jsonData){
        $.each(jsonData, function(index, item){
            jsonData[index].sortTime = app.helper.getFormatedDate(item.sortTime + '000');
        });
        return jsonData;
    };



    app.helper.cookie = {};

    //cookie methods from Tangram
    app.helper.cookie._isValidKey = function (key) {
        // http://www.w3.org/Protocols/rfc2109/rfc2109
        // Syntax:  General
        // The two state management headers, Set-Cookie and Cookie, have common
        // syntactic properties involving attribute-value pairs.  The following
        // grammar uses the notation, and tokens DIGIT (decimal digits) and
        // token (informally, a sequence of non-special, non-white space
        // characters) from the HTTP/1.1 specification [RFC 2068] to describe
        // their syntax.
        // av-pairs   = av-pair *(";" av-pair)
        // av-pair    = attr ["=" value] ; optional value
        // attr       = token
        // value      = word
        // word       = token | quoted-string
        
        // http://www.ietf.org/rfc/rfc2068.txt
        // token      = 1*<any CHAR except CTLs or tspecials>
        // CHAR       = <any US-ASCII character (octets 0 - 127)>
        // CTL        = <any US-ASCII control character
        //              (octets 0 - 31) and DEL (127)>
        // tspecials  = "(" | ")" | "<" | ">" | "@"
        //              | "," | ";" | ":" | "\" | <">
        //              | "/" | "[" | "]" | "?" | "="
        //              | "{" | "}" | SP | HT
        // SP         = <US-ASCII SP, space (32)>
        // HT         = <US-ASCII HT, horizontal-tab (9)>
            
        return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
    };

    app.helper.cookie.getRaw = function (key) {
        if (app.helper.cookie._isValidKey(key)) {
            var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                result = reg.exec(document.cookie);
                
            if (result) {
                return result[2] || null;
            }
        }

        return null;
    };

    app.helper.cookie.get = function (key) {
        var value = app.helper.cookie.getRaw(key);
        if ('string' == typeof value) {
            value = decodeURIComponent(value);
            return value;
        }
        return null;
    };

    app.helper.cookie.setRaw = function (key, value, options) {
        if (!app.helper.cookie._isValidKey(key)) {
            return;
        }
        
        options = options || {};
        //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
        //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的
        
        // 计算cookie过期时间
        var expires = options.expires;
        if ('number' == typeof options.expires) {
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires);
        }
        
        document.cookie =
            key + "=" + value
            + (options.path ? "; path=" + options.path : "")
            + (expires ? "; expires=" + expires.toGMTString() : "")
            + (options.domain ? "; domain=" + options.domain : "")
            + (options.secure ? "; secure" : ''); 
    };

    app.helper.cookie.set = function (key, value, options) {
        app.helper.cookie.setRaw(key, encodeURIComponent(value), options);
    };

    app.helper.cookie.remove = function (key, options) {
        options = options || {};
        options.expires = new Date(0);
        app.helper.cookie.setRaw(key, '', options);
    };

})(Zepto);

