export const reddit = d => {
    const cleaner = ( tx ) => tx
        .replace( "TIL that", "" )
        .replace( "TIL about", "" )
        .replace( "TIL :", "" )
        .replace( "TIL:", "" )
        .replace( "TIL", "" )
        .replace( "Today I Learned", "" )
        .trim();

    const getImage = obj => {
        if ( obj === undefined ) return "AMOS Search";

        let returnable;
        if ( obj[ 0 ].resolutions.length > 0 ) {
            const images = obj[ 0 ].resolutions;
            returnable = images.length > 1 ? images[ 1 ].url : images[ 0 ].url;
        } else {
            returnable = obj[ 0 ]?.source?.url;
        }
        return returnable;
    }

    const fetched = d.data.children.map( e => {
        const d = e.data;
        return {
            desc: cleaner( d.title ),
            href: d.url,
            image: getImage( d.preview?.images ).replaceAll( '&amp;', '&' )
        }
    } );

    return fetched;
};

export const wikipedia = r => {
    return {
        title: r.titles.display,
        desc: r.extract_html,
        image: r.thumbnail.source,
        href: r.content_urls.desktop.page,
    };
};