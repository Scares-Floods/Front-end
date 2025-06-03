document.addEventListener('DOMContentLoaded', function () {
  const mapElement = document.getElementById('map');

  if (mapElement) {
      // Coordenadas aproximadas para os cantos do estado de São Paulo
      const southWestBound = L.latLng(-25.35, -53.1);  // Ponto Sudoeste
      const northEastBound = L.latLng(-19.77, -44.17); // Ponto Nordeste
      const bounds = L.latLngBounds(southWestBound, northEastBound);
      const mapCenter = bounds.getCenter(); // Calcula o centro geográfico dos limites de SP

      
      const INITIAL_FOCUS_ZOOM = 7;
      const MIN_VIEW_ZOOM = 7;      

      const TILE_LAYER_MAX_ZOOM = 19; 

      // Validações simples para os níveis de zoom
      if (MIN_VIEW_ZOOM > INITIAL_FOCUS_ZOOM) {
          console.warn("Atenção: MIN_VIEW_ZOOM (" + MIN_VIEW_ZOOM + ") não deve ser maior que INITIAL_FOCUS_ZOOM (" + INITIAL_FOCUS_ZOOM + ").");
      }
      if (INITIAL_FOCUS_ZOOM > TILE_LAYER_MAX_ZOOM) {
          console.warn("Atenção: INITIAL_FOCUS_ZOOM (" + INITIAL_FOCUS_ZOOM + ") excede o TILE_LAYER_MAX_ZOOM (" + TILE_LAYER_MAX_ZOOM + ").");
      }
       if (MIN_VIEW_ZOOM > TILE_LAYER_MAX_ZOOM) {
          console.warn("Atenção: MIN_VIEW_ZOOM (" + MIN_VIEW_ZOOM + ") excede o TILE_LAYER_MAX_ZOOM (" + TILE_LAYER_MAX_ZOOM + ").");
      }

      console.log("Configurando mapa com centro: ", mapCenter, " zoom inicial: ", INITIAL_FOCUS_ZOOM, " minZoom: ", MIN_VIEW_ZOOM);

      const map = L.map('map', {
          center: mapCenter,          // Centraliza nos bounds de SP
          zoom: INITIAL_FOCUS_ZOOM,   // Define o zoom inicial
          minZoom: MIN_VIEW_ZOOM,     // Impede de diminuir o zoom além disso
          maxBounds: bounds,          // Impede de arrastar para fora de SP
          maxBoundsViscosity: 0.9,    // Deixa os limites mais "pegajosos" (1.0 é totalmente rígido)
      });

      // Usando a camada de tiles CartoDB Positron
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: TILE_LAYER_MAX_ZOOM,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);
      
      // Forçar uma verificação se o mapa está dentro dos bounds após a inicialização
      map.on('load', function() {
          map.panInsideBounds(bounds, { animate: false });
      });

      console.log("Mapa Leaflet inicializado com tiles CartoDB Positron. Tentando restringir a SP.");

  } else {
      console.error("Elemento #map não encontrado nesta página do mapa.");
  }
});