class Tool {
    get controlAttribuition() {
        let controlAttribuition = L.control.condensedAttribution({emblem: "!"});
        controlAttribuition.addAttribution("<a href='#' target='_blank'>Software Ryze</a>");
        controlAttribuition.addAttribution("<a href='https://visualizador.inde.gov.br/VisualizaCamada/' target='_blank'>INDE</a>");
        return controlAttribuition
    };
    get controlScale() {return new L.control.scale({imperial: false})};
    get controlNavbar() {return new L.control.navbar({
        forwardTitle: "Avance no histórico de posições",
        backTitle: "Retroceda no histórico de posições",
        homeTitle: "Vá até sua posição atual!"
    })};
    get controlFullScreen() {return new L.Control.Fullscreen({
        title: {
            "false": "Entrar em modo Tela Cheia",
            "true": "Sair do modo Tela Cheia"
        }
    })};
    get controlBookmarks() {return new L.Control.Bookmarks({position: "bottomleft"})};
    get controlMeasureControl() {return new L.Control.Measure({
        primaryLengthUnit: "meters",
        secondaryLengthUnit: "kilometers",
        primaryAreaUnit: "sqmeters",
        secondaryAreaUnit: "hectares",
        activeColor: "#ABE67E",
        completedColor: "#C8F2BE"
    })};
    get controlMouseCoordinates() {return new L.Control.Coordinates({
        latitudeText: "φ: ",
        longitudeText: "λ: ",
        precision: 6
    })};
    get showLocalPosition() {return new L.easyButton(
        {
            id: "watchPosition",
            states: [
                {
                    stateName: "show",
                    icon: "watchPosition",
                    title: "Mostrar posição atual",
                    onClick: control => {
                        mapping.watchPosition(true);
                        $("#watchPosition").attr("id", "watchPositionRun");
                        control.state("hide");
                    }
                },
                {
                    stateName: "hide",
                    icon: "watchPositionRun",
                    title: "Esconder posição atual",
                    onClick: control => {
                        mapping.watchPosition(false);
                        $("#watchPositionRun").attr("id", "watchPosition");
                        control.state("show");
                    }
                }
            ]
        }
    )};
    get showMouseCoordinates() {return new L.easyButton(
        {
            id: "mouseCoordinates",
            states: [
                {
                    stateName: "show",
                    icon: "mouseCoordinates",
                    title: "Mostrar coordenadas do mouse",
                    onClick: control => {
                        mapping.mouseCoordinates(true);
                        $("#mouseCoordinates").attr("id", "mouseCoordinatesRun");
                        control.state("hide");
                    }
                },
                {
                    stateName: "hide",
                    icon: "mouseCoordinatesRun",
                    title: "Esconder coordenadas do mouse",
                    onClick: control => {
                        mapping.mouseCoordinates(false);
                        $("#mouseCoordinatesRun").attr("id", "mouseCoordinates");
                        control.state("show");
                    }
                }
            ]
        }
    )};
    get controlCompass() {return new L.Control.Compass({
        showDigit: false,
        position: "bottomleft"
    })};
    get print() {return L.control.browserPrint({
        title: 'Print map',
		documentTitle: '',
		position: 'topleft',
        // printLayer: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
        //                 attribution: 'Map tiles by <a href=>Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //                 subdomains: 'abcd',
        //                 minZoom: 1,
        //                 maxZoom: 16,
        //                 ext: 'png'
        //             }),
        closePopupsOnPrint: false,
        printModes: [
            L.control.browserPrint.mode.auto("Auto"),
            L.control.browserPrint.mode.landscape("Paisagem"),
            L.control.browserPrint.mode.portrait("Retrato"),
            L.control.browserPrint.mode.custom("Seleção"),
            L.control.browserPrint.mode(
                "Alert",
                "User specified print action",
                "A6",
                function(context, mode) {
                    return function() {
                        window.alert("We are printing the MAP. Let's do Custom print here!");
                        context._printCustom(mode);
                    }
                },
                false
            ),
        ],
		contentSelector: "[body]",
		pagesSelector: "[leaflet-browser-print-pages]",
		manualMode: false,
		customPrintStyle: { color: "gray", dashArray: '5, 10', pane: "customPrintPane" }
    })};
}