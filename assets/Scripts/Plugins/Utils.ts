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
}