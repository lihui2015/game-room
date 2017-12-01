/* loading */
$(function() {
    var PreLoad = function(a, b) {
        var c = b || {};
        this.source = a, this.count = 0, this.total = a.length, this.onload = c.onload, 
        this.prefix = c.prefix || "", this.init();
    };
    PreLoad.prototype.init = function() {
        var a = this;
        a.source.forEach(function(b) {
            var c = b.replace(/[#\?].*$/, "").substr(b.lastIndexOf(".") + 1).toLowerCase(), d = a.prefix + b;
            switch (c) {
              case "js":
                a.script.call(a, d);
                break;

              case "css":
                a.stylesheet.call(a, d);
                break;

              case "svg":
              case "jpg":
              case "gif":
              case "png":
              case "jpeg":
                a.image.call(a, d);
            }
        });
    }, PreLoad.prototype.getProgress = function() {
        return Math.round(this.count / this.total * 100);
    }, PreLoad.prototype.image = function(a) {
        var b = document.createElement("img");
        this.load(b, a), b.src = a;
    }, PreLoad.prototype.stylesheet = function(a) {
        var b = document.createElement("link");
        this.load(b, a), b.rel = "stylesheet", b.type = "text/css", b.href = a, document.head.appendChild(b);
    }, PreLoad.prototype.script = function(a) {
        var b = document.createElement("script");
        this.load(b, a), b.type = "text/javascript", b.src = a, document.head.appendChild(b);
    }, PreLoad.prototype.load = function(a, b) {
        var c = this;
        a.onload = a.onerror = a.onabort = function(a) {
            c.onload && c.onload({
                count: ++c.count,
                total: c.total,
                item: b,
                type: a.type
            });
        };
    };
    var resources = [ "http://game.gtimg.cn/images/game/cp/a20160310mstt/css/index.css", "http://game.gtimg.cn/images/game/cp/a20160310mstt/js/share.js", "http://game.gtimg.cn/images/game/cp/a20160310mstt/js/lib/touch.js", "http://game.gtimg.cn/images/game/cp/a20160310mstt/js/music.js" ];
    var images = [ "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/light/bg2_01.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/light/bg2_02.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/light/bg2_03.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/light/bg2_04.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/light/bg2_05.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/dark/bg2_01.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/dark/bg2_02.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/dark/bg2_03.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/dark/bg2_04.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/dark/bg2_05.jpg", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/flash/img_01.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/flash/img_02.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/flash/img_03.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/flash/img_04.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key01.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key01_2.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key02.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key02_2.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key03.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key04.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key04_2.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key05.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key06.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key07.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key08.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/key/key09.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/loading/loading01.png", "http://game.gtimg.cn/images/game/cp/a20160310mstt/img/loading/loading02.png" ];
    resources = resources.concat(images);
    new PreLoad(resources, {
        onload: function(load) {
            var count = load.count, total = load.total, percent = Math.ceil(100 * count / total);
            $("#percent").html(percent + "%");
            // $('#loading .animate-item').css({
            //   'transform': 'scale('+ percent/100 +', '+ percent/100 +')',
            // })
            setTimeout(function() {
                $("#audioBg")[0].play();
                $("#jsBgBox").removeClass("dark");
                if (count == total) {
                    var el = $("#loading");
                    $("#percent").hide();
                    $("#loading .animate-item").addClass("loaded");
                    setTimeout(function() {
                        el.find(".text").addClass("show");
                        setTimeout(function() {
                            el.find(".tips").addClass("show");
                            el.find(".animate-item").on("tap", function() {
                                $(el).addClass("complete");
                                setTimeout(function() {
                                    $(el).remove();
                                }, 1e3);
                            });
                        }, 2500);
                    }, 2500);
                }
            }, 500);
        }
    });
});