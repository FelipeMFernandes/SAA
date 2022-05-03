class Layers {
    FRAMES = {
        "Redes Geodésicas": [
            {
                name: "poligonal",
                alias: "Estações de Poligonal",
                frame: new Frame("IBGE").poligonal,
                active: false
            },
            {
                name: "doopler",
                alias: "Estações SAT DOPPLER",
                frame: new Frame("IBGE").doopler,
                active: false
            },
            {
                name: "gps",
                alias: "Estações SAT GPS",
                frame: new Frame("IBGE").gps,
                active: false
            },
            {
                name: "rbmc",
                alias: "Rede GNSS Permanente - RBMC",
                frame: new Frame("IBGE").rbmc,
                active: false
            },
            {
                name: "planialtimetrica",
                alias: "Rede Planialtimétrica",
                frame: new Frame("IBGE").planialtimetrica,
                active: false
            },
            {
                name: "rn",
                alias: "Referências de Nível",
                frame: new Frame("IBGE").rn,
                active: false
            },
            {
                name: "gravimetrica",
                alias: "Estações Gravimétricas",
                frame: new Frame("IBGE").gravimetrica,
                active: false
            },
            {
                name: "maregrafica",
                alias: "Rede Maregráfica Permanente para a Geodésia",
                frame: new Frame("IBGE").maregrafica,
                active: false
            }
        ],
        "Limites": [
            {
                name: "municipios",
                alias: "Limites Municipais",
                frame: new Frame("IBGE").municipios,
                active: false
            },
            {
                name: "estados",
                alias: "Limites Estaduais",
                frame: new Frame("IBGE").estados,
                active: true
            }
        ]
    }

    LEGENDS = new Array();

    makeFrames() {
        Object.entries(this.FRAMES).forEach(([key, value]) => {
            this.LEGENDS.push(new L.control.Legend({
                position: "bottomright",
                title: key,
                column: 1,
                legends: value.map(e => {
                    return {
                        label: e.alias,
                        type: "image",
                        url: "img/frames/" + e.name + ".png",
                        layers: [e.frame],
                        inactive: !e.active
                    };
                }),
                collapsed: true
            }));
        });
        return this.LEGENDS
    }
}