// CONSTANTS
const baseURL = "https://api.nukes.in/";

// FUNCTIONS
const transformer = ( json ) => {
    const schema = {
        "id": "c0c40fe5-f9fe-491c-83d1-4c605fef672e",
        "url": "https://quantamagazine.org/stuff-20210603/",
        "title": "Threshold when Shapes Give Way",
        "type": "Article",
        "image": "https://placeholder.gif",
    };

    const data = `"${ json.type }":"${ json.url }","title":"${ json.title }","image":"${ json.image }"`;
    return btoa( data );
};
const ssfetch = async ( endpoint ) => {
    const response = await fetch( baseURL + endpoint );
    const json = await response.text();
    return json;
}

// MAIN
export const stack = {
    list: async ( db ) => {
        const res = await ssfetch( `${ db }/list` );
        return res;
    },
    get: async ( db, id ) => {
        const res = await ssfetch( `${ db }/get?id=${ id }` );
        return res;
    },
    delete: async ( db, id ) => {
        const res = await ssfetch( `${ db }/delete?id=${ id }` );
        return res;
    },
    put: async ( db, id, data ) => {
        const res = await ssfetch( `${ db }/put?id=${ id }&value=${ transformer( data ) }` );
        return res;
    },
}