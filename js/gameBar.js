let canvasW = CONFIGURATIONS.canvasW;
let canvasH = CONFIGURATIONS.canvasH;
let barHeight = 300
let GameBar = [{
    title: "gameBar",
    sx: 0,
    sy: canvasH - barHeight,
    dx: canvasW,
    dy: barHeight,
    gameBarSections: [{
            title: "status",
            get ref() {
                return GameBar[0]
            },
            get sx() {
                return this.ref.sx
            },
            get sy() {
                return this.ref.sy
            },
            get dx() {
                return this.ref.dx / 4
            },
            get dy() {
                return this.ref.dy
            },
            subSections: [{
                    title: "playerHP",
                    margin: 10,
                    get ref() {
                        return GameBar[0].gameBarSections[0]
                    },
                    get sx() {
                        return this.ref.sx + this.margin
                    },
                    get sy() {
                        return this.ref.sy + this.margin
                    },
                    get dx() {
                        return this.ref.dx + this.margin
                    },
                    get dy() {
                        return this.ref.dy + this.margin
                    },
                    get valueSx() {
                        return this.sx * this.sx
                    },
                    get valueSy() {
                        return this.sy
                    },
                    get valueDx() {
                        return this.dx * this.sx
                    },
                    get valueDy() {
                        return this.dy
                    },
                },
                {
                    title: "playerName",
                    margin: 10,
                    get ref() {
                        return GameBar[0].gameBarSections[0]
                    },
                    get sx() {
                        return this.ref.sx + this.margin
                    },
                    get sy() {
                        return this.ref.sy + this.margin * 2
                    },
                    get dx() {
                        return this.ref.dx + this.margin * 2
                    },
                    get dy() {
                        return this.ref.dy + this.margin * 2
                    },
                    get valueSx() {
                        return this.sx * this.sx
                    },
                    get valueSy() {
                        return this.sy
                    },
                    get valueDx() {
                        return this.dx * this.sx
                    },
                    get valueDy() {
                        return this.dy
                    },
                },
                {
                    title: "playerTurn",
                    margin: 10,
                    get ref() {
                        return GameBar[0].gameBarSections[0]
                    },
                    get sx() {
                        return this.ref.sx + this.margin
                    },
                    get sy() {
                        return this.ref.sy + this.margin * 3
                    },
                    get dx() {
                        return this.ref.dx + this.margin * 3
                    },
                    get dy() {
                        return this.ref.dy + this.margin * 3
                    },
                    get valueSx() {
                        return this.sx * this.sx
                    },
                    get valueSy() {
                        return this.sy
                    },
                    get valueDx() {
                        return this.dx * this.sx
                    },
                    get valueDy() {
                        return this.dy
                    },
                },
            ]
        },
        {
            title: "cards",
            get ref() {
                return GameBar[0]
            },
            get sx() {
                return this.ref.dx / 4
            },
            get sy() {
                return this.ref.sy
            },
            get dx() {
                return this.ref.dx / 2
            },
            get dy() {
                return this.ref.dy
            },
            subSections: [{
                margin: 10,
                title:"endTurn",
                get ref() {
                    return GameBar[0].gameBarSections[1]
                },
                get sx() {
                    return this.ref.sx + this.margin
                },
                get sy() {
                    return this.ref.sy + this.margin
                },
                get dx() {
                    return 60
                },
                get dy() {
                    return 20
                },
                get valueSx() {
                    return this.sx * this.sx
                },
                get valueSy() {
                    return this.sy
                },
                get valueDx() {
                    return this.dx * this.sx
                },
                get valueDy() {
                    return this.dy
                },
            }]
        },
        {
            title: "deck",
            get sx() {
                return GameBar[0].dx - GameBar[0].dx / 4
            },
            get sy() {
                return GameBar[0].sy
            },
            get dx() {
                return GameBar[0].dx / 4
            },
            get dy() {
                return GameBar[0].dy
            },
            subSections: [{
                margin: 10,
                title:"endTurn",
                get ref() {
                    return GameBar[0].gameBarSections[2]
                },
                get sx() {
                    return this.ref.sx + this.margin
                },
                get sy() {
                    return this.ref.sy + this.margin
                },
                get dx() {
                    return 60
                },
                get dy() {
                    return 20
                },
                get valueSx() {
                    return this.sx * this.sx
                },
                get valueSy() {
                    return this.sy
                },
                get valueDx() {
                    return this.dx * this.sx
                },
                get valueDy() {
                    return this.dy
                },
            }]
        }
    ]
}, ]

export default GameBar