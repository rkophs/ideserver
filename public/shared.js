loadScript = function(sScriptSrc, oCallback) {
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = sScriptSrc;
    oScript.onload = oCallback;
    oScript.onreadystatechange = function() {
        if (this.readyState === 'complete') {
            oCallback();
        }
    };
    oHead.appendChild(oScript);
};

setMode = function(editor, mode){
    loadScript("ace/src-min/mode-" + mode + ".js", function(){
        var Mode = require("ace/mode/" + mode).Mode;
        editor.getSession().setMode(new Mode());

    });
};