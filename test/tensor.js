class Trable {
    #data = [
        [
            [ {}, {}, {} ],
            [ {}, {}, {} ],
            [ {}, {}, {} ]
        ],
        [
            [ {}, {}, {} ],
            [ {}, {}, {} ],
            [ {}, {}, {} ]
        ]
    ];

    constructor ( data ) {
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
    // Functions
    getRow ( row ) {
        return this.#data[ row ];
    }
}