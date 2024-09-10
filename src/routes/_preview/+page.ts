import { dev } from '$app/environment';


export async function load({ fetch, params }) {
        const resp = await fetch('/api/content');
        const links = await resp.json();
        //console.log("Links == " + links);
        
        return {
            links: links.data
            }
    
}