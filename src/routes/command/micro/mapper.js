export const reddit = d => {
    const cleaner = ( tx ) => tx
        .replace( "TIL that", "" )
        .replace( "TIL about", "" )
        .replace( "TIL :", "" )
        .replace( "TIL:", "" )
        .replace( "TIL", "" )
        .replace( "Today I Learned", "" )
        .trim();

    const fetched = d.data.children[ 0 ].data;
    const data = {
        desc: cleaner( fetched.title ),
        href: fetched.url,
        image: fetched.preview?.images[ 0 ].resolutions[ 1 ].url.replaceAll( '&amp;', '&' ) || "https://voicebot.ai/wp-content/uploads/2021/04/reddit.png"
    };
    return data;
};

export const wikipedia = r => {
    return {
        title: r.titles.display,
        desc: r.extract_html,
        image: r.thumbnail.source,
        href: r.content_urls.desktop.page,
    };
};