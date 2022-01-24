let canvasW = CONFIGURATIONS.canvasW+10;
let canvasH = CONFIGURATIONS.canvasH+10;
let barHeight = 250
let margin = 13
let GameBar = [{
    title: "gameBar",
    sx: 0,
    sy: canvasH - barHeight,
    dx: canvasW - 10,
    dy: barHeight - 10,
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
                    margin,
                    subSections:[],
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
                    margin,
                    subSections:[],
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
                    margin,
                    subSections:[],
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
                {
                    title: "cardDetails",
                    margin,
                    get ref() {
                        return GameBar[0].gameBarSections[0]
                    },
                    get sx() {
                        return this.ref.sx + this.margin
                    },
                    get sy() {
                        return this.ref.sy + this.margin * 4
                    },
                    get dx() {
                        return this.ref.dx + this.margin * 4
                    },
                    get dy() {
                        return this.ref.dy + this.margin * 4
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
                    subSections:[{
                        title:"cardName",
                        margin,
                        get ref() {
                            return GameBar[0].gameBarSections[0]
                        },
                        get sx() {
                            return this.ref.sx + this.margin
                        },
                        get sy() {
                            return this.ref.sy + this.margin * 5
                        },
                        get dx() {
                            return this.ref.dx + this.margin * 5
                        },
                        get dy() {
                            return this.ref.dy + this.margin * 5
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
                        title:"cardAttack",
                        margin,
                        get ref() {
                            return GameBar[0].gameBarSections[0]
                        },
                        get sx() {
                            return this.ref.sx + this.margin
                        },
                        get sy() {
                            return this.ref.sy + this.margin * 6
                        },
                        get dx() {
                            return this.ref.dx + this.margin * 6
                        },
                        get dy() {
                            return this.ref.dy + this.margin * 6
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
                        title:"cardHP",
                        margin,
                        get ref() {
                            return GameBar[0].gameBarSections[0]
                        },
                        get sx() {
                            return this.ref.sx + this.margin
                        },
                        get sy() {
                            return this.ref.sy + this.margin * 7
                        },
                        get dx() {
                            return this.ref.dx + this.margin * 7
                        },
                        get dy() {
                            return this.ref.dy + this.margin * 7
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
                margin,
                title:"initCardsInHandPalcement",
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
                    return this.ref.dx/5
                },
                get dy() {
                    return this.ref.dy - this.margin*2
                },
            }]
        },
        {
            title: "deck",
            get ref() {
                return GameBar[0]
            },
            get sx() {
                return this.ref.dx - this.ref.dx / 4
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
                margin,
                title:"endTurn",
                get ref() {
                    return GameBar[0].gameBarSections[2]
                },
                get sx() {
                    return this.ref.sx + this.ref.dx - this.dx
                },
                get sy() {
                    return this.ref.sy + this.ref.dy - this.dy
                },
                get dx() {
                    return 60
                },
                get dy() {
                    return 20
                },
                get valueSx() {
                    return this.sx + this.margin
                },
                get valueSy() {
                    return this.sy + this.margin
                },
                get valueDx() {
                    return this.dx
                },
                get valueDy() {
                    return this.dy
                },
            },{
                margin,
                title:"drawCards",
                get ref() {
                    return GameBar[0].gameBarSections[2]
                },
                get sx() {
                    return this.ref.sx
                },
                get sy() {
                    return this.ref.sy
                },
                get dx() {
                    return 60
                },
                get dy() {
                    return 20
                },
                get valueSx() {
                    return this.sx + this.margin
                },
                get valueSy() {
                    return this.sy + this.margin
                },
                get valueDx() {
                    return this.dx
                },
                get valueDy() {
                    return this.dy
                },
            },{
                margin:margin,
                title:"delete",
                get ref() {
                    return GameBar[0].gameBarSections[2]
                },
                get sx() {
                    return this.ref.sx
                },
                get sy() {
                    return this.ref.sy + this.dy
                },
                get dx() {
                    return 60
                },
                get dy() {
                    return 20
                },
                get valueSx() {
                    return this.sx + this.margin
                },
                get valueSy() {
                    return this.sy + this.margin
                },
                get valueDx() {
                    return this.dx + this.margin
                },
                get valueDy() {
                    return this.dy + this.margin * 2
                },
            }]
        }
    ]
}, ]

export default GameBar