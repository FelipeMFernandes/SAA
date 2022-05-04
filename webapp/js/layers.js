class Layer {
    get limites_municipais() {
        let req = new XMLHttpRequest();
        req.open("GET", "https://saa-six.vercel.app/data/regiao_metropolitana.geojson", false);
        req.send();
    
        let layer = new L.geoJson(JSON.parse(req.responseText), {
            onEachFeature: function (feature, layer) {
                layer.on({
                    mouseout: function(e) {
                        for (i in e.target._eventParents) {
                            e.target._eventParents[i].resetStyle(e.target);
                        }
                    },
                    mouseover: function(e) {
                        e.target.setStyle({opacity: 1});
                    }
                });
                layer.bindTooltip(
                    '<table>\
                        <tr>\
                            <td colspan="2"><strong>Nome: </strong>' + (feature.properties['NM_MUN'] !== null) ? feature.properties['NM_MUN']:" " + '</td>\
                        </tr>\
                    </table>'
                );
            },
            style: {
                weight: 10, color: '#000000', opacity: 1
            },
        })
        return layer
    }
}