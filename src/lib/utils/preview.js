/* Create preview of given URL */
import { getLinkPreview } from 'link-preview-js';

export default class Preview {
    
    static async create(url) {
        console.log("Getting preview of " + url);
        return await getLinkPreview(url, {followRedirects: `follow`});
    }
}