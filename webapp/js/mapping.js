class Mapping {
    dataInterval = 5
    tools = new Object();
    layers = new Object();
    localPosition = new Array();
    default = {
        lat: -15,
        lng: -49,
        acc: 0,
        tms: 0,
        zoom: 4
    }

    attributions = new Array(["<a href='https://leafletjs.com' target='_blank'>Leaflet</a>"]);

    constructor (container) {
        this.askNavigator();

        let map = new L.map(container, {attributionControl: true});
        map.setView(this.getPosition(), this.positionZoom);
        
        this.attributions.push("<a href='#' target='_blank'>Sistema de aprovação de alvarás</a>");
        this.attributions.push("<a href='https://visualizador.inde.gov.br/VisualizaCamada/' target='_blank'>INDE</a>");
    
        let tools = new Tool();
        // this.tools.controlAttribuition = tools.controlAttribuition.addTo(map);
        this.tools.controlScale = tools.controlScale.addTo(map);
        this.tools.controlNavbar = tools.controlNavbar.addTo(map);
        this.tools.controlFullScreen = tools.controlFullScreen.addTo(map);
        this.tools.controlMouseCoordinates = tools.controlMouseCoordinates.addTo(map);
        this.tools.showLocalPosition = tools.showLocalPosition.addTo(map);
        this.tools.showMouseCoordinates = tools.showMouseCoordinates.addTo(map);
        this.tools.controlCompass = tools.controlCompass.addTo(map);
        this.tools.controlBookmarks = tools.controlBookmarks.addTo(map);
        $(".leaflet-bookmarks-control").removeClass("leaflet-bookmarks-to-right");

        this.layers.basemap = new Basemap().CARTODB_Light;
        this.layers.limites_municipais = new Layer().limites_municipais;

        map.addLayer(this.layers.limites_municipais);
        
        this.layers.basemap.addTo(map);
        // this.layers.layer_group = new L.layerGroup([]);
        // new L.Control.PanelLayers(
        //     [],
        //     this.layers.layer_group,
        //     {compact: true, collapsibleGroups: true}
        // ).addTo(map);

        this.map = map;

        this.localPositionMarker = new L.marker(
            this.getPosition(), {icon: L.icon({iconUrl: "./img/local-position.gif", iconSize: [40, 40]})});
        this.localPositionRadius = new L.circle(
            this.getPosition(), 0, {weight: 1, color: "blue", fillColor: "#cacaca", fillOpacity: 0.2});

        this.tracking = setInterval(() => this.getPosition(), this.dataInterval * 1000);

        L.control.layers({}, {"Limites Municipais": this.layers.limites_municipais}, {collapsed: false}).addTo(this.map);
    }

    get positionZoom() {
        return (
            this.currentPosition.latitude === this.default.lat &&
            this.currentPosition.longitude === this.default.lng &&
            this.currentPosition.accuracy === this.default.acc &&
            this.currentPosition.timestamp === this.default.tms
        ) ? this.default.zoom:14;
    }

    set currentPosition($position) {
        if ($position === undefined) {$position = this.default;}
        if (this.tools.controlNavbar) {
            this.tools.controlNavbar.options.center = {
                lat: $position.lat || this.default.lat,
                lng: $position.lng || this.default.lng
            };
            this.tools.controlNavbar.options.zoom = this.positionZoom;
        }
        if (this.localPositionMarker) {
            this.localPositionMarker.setLatLng([$position.lat || this.default.lat, $position.lng || this.default.lng]);
        }
        if (this.localPositionRadius) {
            this.localPositionRadius.setLatLng([$position.lat || this.default.lat, $position.lng || this.default.lng]);
            this.localPositionRadius.setRadius($position.acc / 2 || this.default.acc);
        }
    }

    get currentPosition() {
        if (this.localPosition.at(-1) === undefined) {this.localPosition.push(this.default);}
        return {
            latitude: this.localPosition.at(-1).lat || 0,
            longitude: this.localPosition.at(-1).lng || 0,
            accuracy: this.localPosition.at(-1).acc || 0,
            timestamp: this.localPosition.at(-1).tms || 0
        }
    }

    askNavigator () {this.geolocation = (navigator.geolocation) ? true:false;}

    getPosition ($accuracy=false, $timestamp=false) {
        if (this.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => this.localPosition.push({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    acc: pos.coords.accuracy,
                    tms: new Date().getTime()
                }),
                err => console.log("Não foi possível coletar a localização atual: " + err),
                {
                    maximumAge: 600000,
                    enableHighAccuracy: true
                }
            );
        } else {
            this.askNavigator();
            return;
        }

        this.currentPosition = this.localPosition.at(-1);

        if (this.currentPosition !== undefined) {
            let return_statament = [this.currentPosition.latitude, this.currentPosition.longitude];
            if ($accuracy) {return_statament.push(this.currentPosition.accuracy)}
            if ($timestamp) {return_statament.push(this.currentPosition.timestamp)}

            return return_statament;
        }
    }

    showPositionMarker () {
        if (
            this.geolocation
            && this.getPosition()[0] !== this.default.lat
            && this.getPosition()[1] !== this.default.lng
        ) {
            this.map.addLayer(this.localPositionMarker);
            this.map.addLayer(this.localPositionRadius);
        } else {this.askNavigator();}
    }

    hidePositionMarker () {
        if (this.geolocation) {
            this.map.removeLayer(this.localPositionMarker);
            this.map.removeLayer(this.localPositionRadius);
        } else {this.askNavigator();}
    }

    watchPosition ($checked) {
        if (this.geolocation) {
            if ($checked) {this.showPositionMarker();}
            else {this.hidePositionMarker();}
        } else {this.askNavigator();}
    }

    mouseCoordinates ($checked) {
        if ($checked) {
            this.tools.controlMouseCoordinates.addTo(this.map);
            this.map.on("click", (e) => this.tools.controlMouseCoordinates.setCoordinates(e));
        }
        else {this.tools.controlMouseCoordinates.remove();}
    }
}
