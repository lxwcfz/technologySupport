var commonJS = {
    created: function () {
        console.log("vue created……");
    },
    methods: {
        //设置cookie
        setCookie: function(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;

        },
        //获取cookie
        getCookie: function(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for(let i=0; i<ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) != -1){
                    return c.substring(name.length, c.length)
                }
            }
            return "";
        },
        //清除cookie
        clearCookie: function(name) {
            this.setCookie(name, "", -1);
        } ,
        getPara: function(id){
            let url = window.location.href;
            url = url + "";
            let regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
            let reg = eval(regstr);
            let result = url.match(reg);
            if(result && result[2]){
                return result[2];
            }
        },
        getNowUrl: function () {
            let url = window.location.href;
            if (url.indexOf("?") > -1) {
                return url;
            }
            return url + "?aa=aa";
        }
    }
};

export default commonJS;