class Basemap {
    #options (name, url) {return {attribution: "<a href='" + url + "' target='_blank'>" + name + "</a>"}}
    
    get GOOGLE_Satelite() {return L.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}", this.#options("Google Satélite", "https://www.google.com/intl/zh-CN_cn/permissions/geoguidelines/attr-guide.html"))}
    get ESRI_Satelite() {return L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", this.#options("Esri Satélite", "www.esri.com"))}
    get ESRI_Roads() {return L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", this.#options("Esri Roads", "www.esri.com"))}
    get ESRI_Topographic() {return L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", this.#options("Esri Topographic", "www.esri.com"))}
    get OSM_Roads() {return L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", this.#options("OSM Roads", "https://www.openstreetmap.org/copyright"))}
    get CARTODB_Roads() {return L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", this.#options("CartoDB Roads", "https://carto.com/attributions"))}
    get CARTODB_Light() {return L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", this.#options("CartoDB Light", "https://carto.com/attributions"))}
    get CARTODB_Dark() {return L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", this.#options("CartoDB Black", "https://carto.com/attributions"))}
    get STAMEN_Watercolor() {return L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}", this.#options("Stamen Watercolor", "http://stamen.com"))}
}
