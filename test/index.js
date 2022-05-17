class Table {
    #data = [];

    constructor ( schema, data ) {
        this.name = name;
        this.columns = columns;
    }
};

class Row {
    #data = {
        Year: 2022,
        Grade: "4",
        Song: {
            name: "The Sound of Silence",
            artist: "Disturbed",
            release: 2015,
            id: ""
        },
        Instru: {
            name: "The Batman",
            artist: "Michael Giacchino",
            album: "The Batman",
            release: 2022,
            id: ""
        },
        Album: {
            name: "Fallen Ambers",
            artist: "Illenium",
            release: 2021
        },
        Person: {
            name: "Mikhail Gorbachev",
            first: "Discovery",
            source: "Book: Dead Hand"
        },
        Docu: "Planet Earth II",
        Short: "Colin in Black & White",
        Long: "Good Doctor",
        Anime: "OddTaxi",
        Litra: ""
    };

    constructor ( schema, data ) {
        this.name = name;
        this.columns = columns;
    }
}

class Trable {
    #data = [
        [
            [ { row: 1, col: 1, dep: 1 }, { row: 1, col: 1, dep: 2 }, { row: 1, col: 1, dep: 3 } ],
            [ { row: 1, col: 2, dep: 1 }, { row: 1, col: 2, dep: 2 }, { row: 1, col: 2, dep: 3 } ],
            [ { row: 1, col: 3, dep: 1 }, { row: 1, col: 3, dep: 2 }, { row: 1, col: 3, dep: 3 } ]
        ],
        [
            [ { row: 2, col: 1, dep: 1 }, { row: 2, col: 1, dep: 2 }, { row: 2, col: 1, dep: 3 } ],
            [ { row: 2, col: 2, dep: 1 }, { row: 2, col: 2, dep: 2 }, { row: 2, col: 2, dep: 3 } ],
            [ { row: 2, col: 3, dep: 1 }, { row: 2, col: 3, dep: 2 }, { row: 2, col: 3, dep: 3 } ]
        ],
    ];

    constructor ( data = this.#data ) {
        this.#data = data;
    }

    // Getters
    get shape () {
        return this.getShape();
    }
    // Methods
    getShape () {
        return [
            this.#data.length,
            this.#data[ 0 ].length,
            Object.keys( this.#data[ 0 ][ 0 ] ).length
        ];
    }
    // Slice Functions
    byRow ( row = 0 ) {
        return this.#data[ row ];
    }
    byCol ( col = 0 ) {
        return this.#data.map( ( row ) => row[ col ] );
    }
    byDep ( dep = 0 ) {
        return this.#data.map( ( row ) => row.map( ( col ) => col[ dep ] ) );
    }
    // Cell Functions
    getCell ( row = 0, col = 0, dep = 0 ) {
        return this.#data[ row ][ col ][ dep ];
    }
    // Tower Functions

}


const tb = new Trable();

// console.log( tb.byRow( 0 ) );
// console.log( tb.byCol( 0 ) );
console.log( tb.byDep( 0 ) );