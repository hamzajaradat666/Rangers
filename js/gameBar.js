let canvasW = CONFIGURATIONS.canvasW;
let canvasH = CONFIGURATIONS.canvasH;
let barHeight = 300
let GameBar = [
    {
        title:"gameBar",
        sx:0,
        sy:canvasH - barHeight,
        dx:canvasW,
        dy:barHeight,
        gameBarSections:[
            {
                title:"status",
                get ref(){
                    return GameBar[0]
                },
                get sx(){
                    return this.ref.sx
                },
                get sy(){
                    return this.ref.sy
                },
                get dx(){
                    return this.ref.dx/4
                },
                get dy(){
                    return this.ref.dy
                },
                subSections:[
                    {
                        title:"playerHP",
                        get ref(){
                            return GameBar[0].gameBarSections[0]
                        },
                        get sx(){
                            return this.ref.sx+10
                        },
                        get sy(){
                            return this.ref.sy+10
                        },
                        get dx(){
                            return this.ref.dx+10
                        },
                        get dy(){
                            return this.ref.dy+10
                        },
                    },
                    {
                        title:"playerHP",
                        get ref(){
                            return GameBar[0].gameBarSections[0]
                        },
                        get sx(){
                            return this.ref.sx+50
                        },
                        get sy(){
                            return this.ref.sy+50
                        },
                        get dx(){
                            return this.ref.dx+10
                        },
                        get dy(){
                            return this.ref.dy+10
                        },
                    },
                ]
            },
            {
                title:"cards",
                get sx(){
                    return GameBar[0].dx/4
                },
                get sy(){
                    return GameBar[0].sy
                },
                get dx(){
                    return GameBar[0].dx/2
                },
                get dy(){
                    return GameBar[0].dy
                }
            },
            {
                title:"deck",
                get sx(){
                    return GameBar[0].dx - GameBar[0].dx/4
                },
                get sy(){
                    return GameBar[0].sy
                },
                get dx(){
                    return GameBar[0].dx/4
                },
                get dy(){
                    return GameBar[0].dy
                }
            }
        ]
    },
]

export default GameBar