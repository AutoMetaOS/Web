const baseURL = "https://api.nukes.in";

// https://api.nukes.in/cms/icon?name=generic:amazon.svg
// https://api.nukes.in/cms/icon?name=amos:cmos.svg
// https://api.nukes.in/cms/icon?name=web:worker.svg
// https://api.nukes.in/quick/metadata?url=https://www.amazon.com/

class API {
    constructor () {
        this.baseURL = baseURL;
    }

    async get ( path, params ) {
        const url = new URL( path, this.baseURL );
        if ( params ) {
            Object.keys( params ).forEach( key => url.searchParams.append( key, params[ key ] ) );
        }
        const res = await fetch( url );
        return res.json();
    }

    async post ( path, params ) {
        const url = new URL( path, this.baseURL );
        const res = await fetch( url, {
            method: "POST",
            body: JSON.stringify( params )
        } );
        return res.json();
    }

    async put ( path, params ) {
        const url = new URL( path, this.baseURL );
        const res = await fetch( url, {
            method: "PUT",
            body: JSON.stringify( params )
        } );
        return res.json();
    }

    async delete ( path, params ) {
        const url = new URL( path, this.baseURL );
        const res = await fetch( url, {
            method: "DELETE",
            body: JSON.stringify( params )
        } );
        return res.json();
    }

    async getIcon ( name ) {
        const url = new URL( `/cms/icon?name=${ name }`, this.baseURL );
        const res = await fetch( url );
        return res.blob();
    }

    async getMetadata ( url ) {
        const urlObj = new URL( url );
        const path = `/quick/metadata?url=${ urlObj.hostname }`;
        const res = await this.get( path );
        return res;
    }
}