import { serverURL } from "$lib/shared/molecular";

export const getMetadata = async ( url ) => {
    const URL = serverURL + '/requestMetadata?url=' + encodeURI( url );
    const response = await fetch( URL );
    const json = await response.json();
    return json;
}