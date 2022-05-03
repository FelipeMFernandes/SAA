class Frame {
    FONTS = new Object({
        "IBGE": "https://geoservicos.ibge.gov.br/geoserver/ows"
    });

    ZOOM = {
        pais: 4,
        regiao: 7,
        estado: 9,
        cidade: 11
    }
    
    constructor (font) {this.font = this.FONTS[font];}

    #options (layers, zoom) {
        return new Object({
            layers: layers,
            format: "image/png",
            transparent: true,
            minZoom: this.ZOOM[zoom]
        })
    }

    get poligonal() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_EP", "regiao"));}
    get doopler() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_DOP", "regiao"));}
    get gps() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_GPS", "estado"));}
    get rbmc() {return L.tileLayer.wms(this.font, this.#options("CGED:RBMC", "pais"));}
    get rn() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_RN", "cidade"));}
    get planialtimetrica() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_REDE_PLANIALTIMETRICA", "estado"));}
    get gravimetrica() {return L.tileLayer.wms(this.font, this.#options("CGED:BDG_EG", "cidade"));}
    get maregrafica() {return L.tileLayer.wms(this.font, this.#options("CGED:RMPG", "pais"));}

    get municipios() {return L.tileLayer.wms(this.font, this.#options("CCAR:BCIM_Municipio_A", "cidade"));}
    get estados() {return L.tileLayer.wms(this.font, this.#options("CCAR:BCIM_Unidade_Federacao_A", "pais"));}
}