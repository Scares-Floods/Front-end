
document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('map');

    if (mapElement) {
        const southWestBound = L.latLng(-25.358, -53.11);  // Limites um pouco ajustados
        const northEastBound = L.latLng(-19.77, -44.17);
        const bounds = L.latLngBounds(southWestBound, northEastBound);
        const mapCenter = L.latLng(-22.5, -48.0); // Centro um pouco mais para o interior para visualização geral

        // Zoom inicial para ver o estado de SP de forma mais ampla com os diversos pontos.
        const INITIAL_FOCUS_ZOOM = 7;
        const MIN_VIEW_ZOOM = 7;
        const TILE_LAYER_MAX_ZOOM = 19;

        if (MIN_VIEW_ZOOM > INITIAL_FOCUS_ZOOM) {
            console.warn("Atenção: MIN_VIEW_ZOOM não deve ser maior que INITIAL_FOCUS_ZOOM.");
        }
        if (INITIAL_FOCUS_ZOOM > TILE_LAYER_MAX_ZOOM) {
            console.warn("Atenção: INITIAL_FOCUS_ZOOM excede o TILE_LAYER_MAX_ZOOM.");
        }
        if (MIN_VIEW_ZOOM > TILE_LAYER_MAX_ZOOM) {
            console.warn("Atenção: MIN_VIEW_ZOOM excede o TILE_LAYER_MAX_ZOOM.");
        }

        const map = L.map('map', {
            center: mapCenter,
            zoom: INITIAL_FOCUS_ZOOM,
            minZoom: MIN_VIEW_ZOOM,
            maxBounds: bounds,
            maxBoundsViscosity: 0.9,
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: TILE_LAYER_MAX_ZOOM,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        map.on('load', function() {
            // Ajusta para os bounds após o carregamento, mas o zoom inicial é mantido se possível
             map.fitBounds(bounds, {padding: [10, 10]}); // Adiciona um pequeno padding
             // Se quiser forçar o minZoom após o fitBounds:
             // map.setMinZoom(map.getZoom());
        });

        console.log("Adicionando uma lista expandida de áreas com histórico de enchentes no Estado de SP...");

        const areasDeRiscoSP_Expandida = [
            // Capital - São Paulo
            { nome: "Marginal Tietê - Pte. Bandeiras (SP)", lat: -23.527, lng: -46.630, raio: 2000, info: "Transbordamentos do Rio Tietê" },
            { nome: "Marginal Pinheiros - Pte. E. Matoso (SP)", lat: -23.570, lng: -46.700, raio: 2000, info: "Transbordamentos do Rio Pinheiros" },
            { nome: "Av. Aricanduva (SP - Zona Leste)", lat: -23.565, lng: -46.500, raio: 3000, info: "Córrego Aricanduva" },
            { nome: "Av. Prof. L. I. Anhaia Mello (SP - ZL)", lat: -23.585, lng: -46.570, raio: 2500, info: "Córrego da Mooca / Vila Prudente" },
            { nome: "Jardim Pantanal (SP - Zona Leste)", lat: -23.502, lng: -46.421, raio: 2000, info: "Extrema vulnerabilidade ao Tietê" },
            { nome: "Itaim Paulista (SP - Zona Leste)", lat: -23.499, lng: -46.395, raio: 2500, info: "Inundações recorrentes" },
            { nome: "M'Boi Mirim (SP - Zona Sul)", lat: -23.690, lng: -46.770, raio: 3000, info: "Diversos pontos de alagamento" },
            { nome: "Praça da Bandeira (SP - Centro)", lat: -23.549, lng: -46.639, raio: 1000, info: "Ponto crítico no centro" },
            { nome: "Av. São Miguel (SP - Zona Leste)", lat: -23.510, lng: -46.480, raio: 2000, info: "Alagamentos frequentes" },
             { nome: "Ipiranga - R. Juntas Provisórias (SP)", lat: -23.590, lng: -46.608, raio: 1500, info: "Riacho do Ipiranga" },


            // Grande São Paulo (RMSP)
            { nome: "Franco da Rocha - Centro (RMSP)", lat: -23.328, lng: -46.729, raio: 3000, info: "Rio Juquery, enchentes severas" },
            { nome: "Francisco Morato (RMSP)", lat: -23.283, lng: -46.744, raio: 3000, info: "Inundações e deslizamentos" },
            { nome: "Guarulhos - Rio Baquirivu-Guaçu (RMSP)", lat: -23.440, lng: -46.480, raio: 3500, info: "Transbordamentos" },
            { nome: "Santo André - Centro (RMSP)", lat: -23.655, lng: -46.528, raio: 2500, info: "Rio Tamanduateí" },
            { nome: "São Bernardo do Campo - Paulicéia (RMSP)", lat: -23.690, lng: -46.585, raio: 2000, info: "Ribeirão dos Couros" },
            { nome: "Mauá - Centro (RMSP)", lat: -23.668, lng: -46.461, raio: 2500, info: "Rio Tamanduateí" },
            { nome: "Itaquaquecetuba - Centro (RMSP)", lat: -23.480, lng: -46.350, raio: 3000, info: "Próximo ao Rio Tietê" },

            // Interior
            { nome: "Campinas - Av. Orosimbo Maia (Interior)", lat: -22.900, lng: -47.055, raio: 2000, info: "Córregos urbanos" },
            { nome: "Sorocaba - Centro/Rio Sorocaba (Interior)", lat: -23.503, lng: -47.458, raio: 2500, info: "Cheias do Rio Sorocaba" },
            { nome: "Jundiaí - Rio Jundiaí (Interior)", lat: -23.190, lng: -46.880, raio: 2000, info: "Transbordamentos" },
            { nome: "Limeira - Ribeirão Tatu (Interior)", lat: -22.570, lng: -47.400, raio: 1500, info: "Inundações urbanas" },
            { nome: "São José dos Campos - Rio Paraíba (Interior)", lat: -23.180, lng: -45.880, raio: 3000, info: "Enchentes do Rio Paraíba" },
            { nome: "Registro - Centro/Rio Ribeira (Interior)", lat: -24.487, lng: -47.843, raio: 3500, info: "Histórico severo de cheias" },
            { nome: "Capivari - Rio Capivari (Interior)", lat: -22.998, lng: -47.507, raio: 2000, info: "Enchentes do rio homônimo" },


            // Litoral
            { nome: "Santos - Zona Noroeste (Litoral)", lat: -23.935, lng: -46.370, raio: 3000, info: "Problemas crônicos de drenagem" },
            { nome: "São Vicente - Centro (Litoral)", lat: -23.963, lng: -46.392, raio: 2500, info: "Alagamentos frequentes" },
            { nome: "Guarujá - Vicente de Carvalho (Litoral)", lat: -23.950, lng: -46.300, raio: 2000, info: "Inundações em maré alta e chuvas" },
            { nome: "Ubatuba - Centro/Rio Acaraú (Litoral)", lat: -23.433, lng: -45.070, raio: 2000, info: "Enxurradas e inundações" },
            { nome: "São Sebastião - Centro (Litoral)", lat: -23.795, lng: -45.408, raio: 2500, info: "Chuvas intensas, rios e marés" }
        ];

        areasDeRiscoSP_Expandida.forEach(function(area) {
            L.circle([area.lat, area.lng], {
                color: 'red',
                fillColor: '#d32f2f',
                fillOpacity: 0.45,
                weight: 1.5, // Espessura da borda do círculo
                radius: area.raio
            }).addTo(map).bindPopup("<b>Risco de Enchente: " + area.nome + "</b><br>" + (area.info || "Verificar dados locais."));
        });

        console.log("Mapa Leaflet inicializado com lista expandida de áreas de risco em SP.");

    } else {
        console.error("Elemento #map não encontrado nesta página do mapa.");
    }
});