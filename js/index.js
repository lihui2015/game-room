$(function() {
    var $bgbox = $("#jsBgBox");
    var dialogFlag = true;
    var key1 = 0, key2 = 0, key3 = 0, key4 = 0;
    var $dialog = $("#dialogBox"), $dialogKey = $dialog.find(".dialog-key");
    var $dialogTips = $(".dialog-tips");
    var $dialogTitle = $dialogTips.find("h3"), $dialogDisc = $dialogTips.find("p");
    var lightIsOpened = "true";
    var isFinished = false;
    var isFromDoor = false;
    var addShakeEvent = function() {
        var ShakeEvent = new Shake({
            threshold: 15,
            timeout: 1e3
        });
        ShakeEvent.start();
        window.addEventListener("shake", shakeEventDidOccur, false);
    };
    var removeShakeEvent = function() {
        window.removeEventListener("shake", shakeEventDidOccur, false);
    };
    $(".item").on("tap", function() {
        var $this = $(this);
        var type = $this.attr("data-type"), title = $this.attr("data-title"), disc = $this.attr("data-disc"), isKey = $this.attr("data-iskey"), img = $this.attr("data-img");
        if (type != 2) {
            $(this).addClass("after");
        }
        isFromDoor = false;
        setTimeout(function() {
            if (type == 1) {
                if (!lightIsOpened) {
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {
                    if ($this.attr("id") == "door" && isFinished == true) {
                        isFromDoor = true;
                        showResult();
                    } else {
                        showDialog(title, disc, img, isKey);
                    }
                }
            } else if (type == 2) {
                if (!lightIsOpened) {
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {
                    return false;
                }
            } else if (type == 3) {
                var text1 = $this.attr("data-txt1"), text2 = $this.attr("data-txt2"), Tips = $this.attr("data-tips");
                if (!lightIsOpened) {
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {
                    showDialog(title, disc, img, isKey, Tips);
                }
            } else if (type == 4) {} else if (type == 5) {
                if (!lightIsOpened) {
                    showDialog("太暗了，看不太清楚", "打开灯来吧", "05", "false");
                } else {
                    showDialog(title, disc, img, isKey);
                }
            }
            if ($this.attr("id") == "poster") {
                // initMusic('mp3/poster.mp3');
                $("#audioPoster")[0].play();
            } else if ($this.attr("id") == "trash") {
                $("#audioTrash")[0].play();
            } else if ($this.attr("id") == "video") {
                $("#audioVideo")[0].play();
            } else if ($this.attr("id") == "light") {
                $("#audioLight")[0].play();
            }
        }, 500);
    });
    $("#light").on("touchstart", function() {
        $bgbox.toggleClass("dark");
        $(".item").toggleClass("hide");
        if (lightIsOpened) {
            lightIsOpened = false;
        } else {
            lightIsOpened = true;
            $bgbox.removeClass("dark");
        }
    });
    var lightAIsOpened = false, lightBIsOpened = false;
    $(".item").on("touchstart", function() {
        if ($(this).hasClass("light_a")) {
            if (lightAIsOpened) {
                lightAIsOpened = false;
                $(this).removeClass("after");
            } else {
                lightAIsOpened = true;
                $(this).addClass("after");
            }
        } else if ($(this).hasClass("light_b")) {
            if (lightBIsOpened) {
                lightBIsOpened = false;
                $(this).removeClass("after");
            } else {
                lightBIsOpened = true;
                $(this).addClass("after");
            }
        }
    });
    $(".page-tips").on("touchstart", function() {
        $(this).remove();
    });
    var showResult = function() {
        var count = key1 + key2 + key3 + key4;
        var $progress = $(".dialog-progress span");
        var title = "", disc = "", img = "";
        $progress.html(count);
        // dialogFlag = true;
        if (count == 1) {
            title = "获得一块“记忆碎片”! ";
            disc = "上面好像有奇怪的图案</br>好像只是其中一部分";
            img = "06";
            showDialog(title, disc, img, "false");
        } else if (count == 2) {
            title = "获得第二块“记忆碎片”！ ";
            disc = "两块碎片叠在一起了！</br>图案还是看不太清";
            img = "07";
            showDialog(title, disc, img, "false");
        } else if (count == 3) {
            title = "获得第三块“记忆碎片”！";
            disc = "把碎片叠到一起</br>看起来是些数字";
            img = "08";
            showDialog(title, disc, img, "false");
        } else if (count == 4) {
            title = "获得最后一块“记忆碎片”！ ";
            disc = "终于完成了！“0325”！</br>快去开门解锁吧！";
            img = "09";
            // setTimeout(function(){
            //   $('.lock-key').addClass('show');
            // },2000);
            isFinished = true;
            showDialog(title, disc, img, "false");
            // dialogFlag = false;
            $dialog.on("tap", function() {
                if (isFromDoor) {
                    $(".lock-key").addClass("show");
                }
            });
        }
    };
    var showDialog = function(dTitle, dDisc, dImg, isKey, dTips) {
        $dialog.addClass("show");
        var $mask = $dialog.find(".dialog-mask");
        var $audioResult = $("#audioResult")[0];
        if (dImg !== "none") {
            $dialogKey.removeClass("hide");
            $dialogKey.find(".key-img").removeClass().addClass("key-img key-img_" + dImg);
            $dialogKey.find(".key-tips").html(dTips);
        } else {
            $dialogKey.addClass("hide");
        }
        if (isKey == "true") {
            dialogFlag = false;
        } else {
            dialogFlag = true;
        }
        $dialogTitle.html(dTitle);
        $dialogDisc.html(dDisc);
        $(".key-img span").show();
        if (dImg == 1) {
            if (dTips == "您已经拿到该线索！") {
                dialogFlag = true;
                $(".key-img").addClass("result");
                $(".key-img span").hide();
                $dialogTitle.html("诶，打开里面居然有东西！");
                $dialogDisc.html("");
            } else {
                $(".key-img_01 span").on("tap", function() {
                    $(".key-img_01").addClass("result");
                    $(".key-img span").hide();
                    $dialogTitle.html("诶，打开里面居然有东西！");
                    $dialogDisc.html("");
                    $dialogKey.find(".key-tips").html("");
                    key1 = 1;
                    // setTimeout(function(){showResult();},2000);
                    $("#key01").attr("data-tips", "您已经拿到该线索！");
                    $mask.addClass("show");
                });
            }
        } else if (dImg == 2) {
            if (dTips == "您已经拿到该线索！") {
                dialogFlag = true;
                $(".key-img").addClass("result");
                $(".key-img span").hide();
                $dialogTitle.html("原来上一次下副本<br>已经过了那么久了");
                $dialogDisc.html("");
            } else {
                $(".key-img_02 span").on("tap", function() {
                    $(".key-img_02").addClass("result");
                    $(".key-img span").hide();
                    $dialogTitle.html("原来上一次下副本<br>已经过了那么久了");
                    $dialogDisc.html("");
                    $dialogKey.find(".key-tips").html("");
                    key2 = 1;
                    // setTimeout(function(){},2000);
                    $("#key02").attr("data-tips", "您已经拿到该线索！");
                    $mask.addClass("show");
                });
            }
        } else if (dImg == 3) {
            if (dTips == "您已经拿到该线索！") {
                dialogFlag = true;
            } else {
                addShakeEvent();
            }
        } else if (dImg == 4) {
            if (dTips == "您已经拿到该线索！") {
                dialogFlag = true;
                $(".key-img").addClass("result");
                $(".key-img span").hide();
                $dialogTitle.html("红白机上落了一层灰尘");
                $dialogDisc.html("卡带插上去似乎有些接触不良");
            } else {
                $(".key-img_04 span").on("touchstart", function() {
                    $dialogTitle.html("红白机上落了一层灰尘");
                    $dialogDisc.html("卡带插上去似乎有些接触不良");
                    setTimeout(function() {
                        $(".key-img_04").addClass("result");
                        $(".key-img span").hide();
                        $dialogKey.find(".key-tips").html("");
                        key4 = 1;
                    }, 1e3);
                    $("#key04").attr("data-tips", "您已经拿到该线索！");
                    $mask.addClass("show");
                });
            }
        }
        $dialog.on("tap", function() {
            if (dialogFlag) {
                $(this).removeClass("show");
                $(".item").removeClass("after");
            }
        });
        $mask.on("tap", function() {
            $mask.removeClass("show");
            setTimeout(function() {
                showResult();
            }, 200);
            $audioResult.play();
        });
    };
    function shakeEventDidOccur() {
        $(".key-img_03").addClass("shake");
        $(".key-img_03").on("webkitAnimationEnd", function() {
            var $this = $(this);
            key3 = 1;
            removeShakeEvent();
            $this.removeClass("shake");
            $("#key03").attr("data-tips", "您已经拿到该线索！");
            // setTimeout(function(){showResult();},500)
            $dialog.find(".dialog-mask").addClass("show");
        });
    }
    var keyString = "";
    var openDoor = function() {
        var $keystatus = $(".keystatus"), $keystatusItem = $(".keystatus span"), $numItem = $(".num-item"), $lockKeyClose = $(".lock-key_close");
        var flag = 0;
        $numItem.on("touchstart", function() {
            var value = $(this).attr("data-num");
            flag += 1;
            if (flag > 4) {
                $keystatusItem.removeClass("active");
                $keystatusItem.eq(0).addClass("active");
                keyString = value;
                flag = 1;
                $keystatus.removeClass("wrong");
            } else {
                $keystatusItem.eq(flag - 1).addClass("active");
                keyString += value;
            }
            console.log(keyString);
            if (flag == 4) {
                if (keyString == "0325") {
                    $(".page-finished").addClass("show");
                    $(".page-finished p").eq(1).on("webkitAnimationEnd", function() {
                        $("#pageKV").addClass("show");
                    });
                } else {
                    $keystatus.addClass("wrong");
                }
            }
        });
        $lockKeyClose.on("tap", function() {
            $(".lock-key").removeClass("show");
        });
    };
    openDoor();
    $("#jsTips").on("tap", function() {
        showDialog($(this).attr("data-title"), $(this).attr("data-disc"));
    });
    $("#link").on("tap", function() {
        window.location.href = "http://games.qq.com/a/20160314/031744.htm";
    });
});