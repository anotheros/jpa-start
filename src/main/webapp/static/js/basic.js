var quoteCss = function(array, basicFlag) {
    var css, src, version, cssSrc, head = document.getElementsByTagName("head")[0];
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].indexOf("http://") < 0) {
            if (basicFlag) {
                cssSrc = BASICCSSPATH
            } else {
                cssSrc = FIELDCSSPATH
            }
            src = cssSrc + array[i] + ".css";
            version = createVersion(array[i], JSCSSVERSION.css, "css层级关系不能超过三层");
            src = src + version
        } else {
            src = array[i]
        }
        css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", src);
        void (head.appendChild(css))
    }
}
;
var createVersion = function(str, obj, warnMsg) {
    var len = (str.split("/")).length - 1;
    if (len == 0) {
        for (var k in obj) {
            if (k == str) {
                return "?v=" + obj[k]
            }
        }
    } else {
        if (len == 1) {
            var str1 = str.substring(0, str.indexOf("/"))
              , str2 = str.substring(str.indexOf("/") + 1, str.length);
            for (var m in obj) {
                if (m == str1) {
                    for (var n in obj[m]) {
                        if (n == str2) {
                            return "?v=" + obj[m][n]
                        }
                    }
                }
            }
        } else {
            if (len == 2) {
                var str1 = str.substring(0, str.indexOf("/"))
                  , str2 = str.substring(str.indexOf("/") + 1, str.lastIndexOf("/"))
                  , str3 = str.substring(str.lastIndexOf("/") + 1, str.length);
                for (var x in obj) {
                    if (x == str1) {
                        for (var y in obj[x]) {
                            if (y == str2) {
                                for (var z in obj[x][y]) {
                                    if (z == str3) {
                                        return "?v=" + obj[x][y][z]
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                // if (!(!-[1, ] && !window.XMLHttpRequest)) {
                //     console.error(warnMsg)
                // }
                return "?v=1";
            }
        }
    }
};
