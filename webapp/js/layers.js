function limites_municipais() {
    let req = new XMLHttpRequest();
    req.open("GET", "/data/regiao_metropolitana.json", true);
    req.send()

    req.onload = function() {
        alert(`Loaded: ${req.status} ${req.response}`);
    };
    
    req.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
    };
    
    req.onprogress = function(event) { // triggers periodically
        // event.loaded - how many bytes downloaded
        // event.lengthComputable = true if the server sent Content-Length header
        // event.total - total number of bytes (if lengthComputable)
        alert(`Received ${event.loaded} of ${event.total}`);
    };
    
    console.log(req)

    return new L.geoJson(window.features["arruamento"], {
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
                        <td colspan="2"><strong>Nome: </strong>' + (feature.properties['Nome'] !== null) ? feature.properties['Nome']:" " + '</td>\
                    </tr>\
                </table>'
            );
        },
        style: {
            weight: 2, color: '#ff0', opacity: 0,
            dashArray: '7,5', lineCap: 'square', lineJoin: 'bevel',
            zIndex: 402
        },
    })
}