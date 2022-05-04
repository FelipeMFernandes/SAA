class Layer {
    get limites_municipais() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://saa-six.vercel.app/data/regiao_metropolitana.geojson", false);
        req.send();
    
        return new L.geoJson(JSON.parse(req.responseText), {
            style: function (feature) {
                return (feature.properties['NM_MUN'] === "Curitiba") ? {
                    weight: 2, color: '#000', opacity: 0.3, fillOpacity: 0.1, fillColor: "#555"
                } : {
                    weight: 1, color: '#000', opacity: 0.2, dashArray: "5", fill: false
                }
            },
        });
    }
    
    get base_alvaras() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://saa-six.vercel.app/data/base_alvaras.geojson", false);
        req.send();
    
        return new L.geoJson(JSON.parse(req.responseText), {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties["name"])
            },
            pointToLayer: function (geoJsonPoint, coordinates) {
                const feat_color = "#d77";

                return new L.circle(coordinates, {
                    radius: 20,
                    color: feat_color,
                    fillColor: feat_color
                });
            }
        });
    }
    
    get malha_viaria() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://saa-six.vercel.app/data/eixos_rua.geojson", false);
        req.send();
    
        return new L.geoJson(JSON.parse(req.responseText), {
            style: {
                weight: 1, color: '#999', opacity: 0.2
            }
        });
    }
    
    get zoneamento() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://saa-six.vercel.app/data/zoneamento.geojson", false);
        req.send();
    
        return new L.geoJson(JSON.parse(req.responseText), {
            onEachFeature: function (feature, layer) {
                layer.on({
                    mouseout: function(e) {
                        for (i in e.target._eventParents) {
                            e.target._eventParents[i].resetStyle(e.target);
                        };
                    }
                });
                layer.bindPopup(feature.properties["NM_ZONA"]);
            },
            style: function (feature) {
                return {
                    width: 1, color: "#fff", opacity: 0.1, fillColor: random_color(), fillOpacity: 0.2
                }
            }
        });
    }
}