let Cookies = {
    get(cname){
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    },
    set(cname, cvalue){
        const d = new Date();
        d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;sameSite=None;Secure";
    },
    remove(cname) {
        const d = new Date();
        d.setTime(0);
        let expires = "expires="+d.toUTCString();
        document.cookie = cname + "=expired" + ";" + expires + ";path=/";
    }
}

export default Cookies