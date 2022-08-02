import * as cc from 'cc';


export class Utils {



    static async loadResSync(url: string, type: typeof cc.Asset = cc.Asset): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            cc.resources.load(url, type, (err, asset) => {
                if (err)
                    reject(err);

                resolve(asset);
            })
        });
    }

    static OpenURL(url: string) {
        cc.sys.openURL(url)
    }

    static isEmpty(str) {
        return (!str || str.length === 0);
    }



    static parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

        if (query === url || query === "") return;

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }


}