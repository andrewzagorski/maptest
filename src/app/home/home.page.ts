import { Component, SystemJsNgModuleLoader } from '@angular/core';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})export class HomePage {
  map: any;
  ionViewDidEnter() { //run when app is opened
    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWx6YWdvcnNraSIsImEiOiJjazJtZXF3MTEwaDdsM25sa2VzMG9nbHl0In0.CYoRFT7bS-EpX4l17qro-Q'; // token from previous group
    this.map = new mapboxgl.Map({ //initialize new map object
      style: 'mapbox://styles/alzagorski/ck6e0ghjy0q7n1io965s0ln07', // style defined by previous group
      center: [-89.4125, 43.0766], // center lat and longitude
      zoom: 15,
      pitch: 0,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });
    this.map.on('click', 'fridges', function(e) {
      
      var features = this.map.queryRenderedFeatures(e.point, {
        layers: ['fridges'] // replace this with the name of the layer
      });
    
      if (!features.length) {
        return;
      }
    
      console.log("clicked");

      var feature = features[0];
    
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .setMatWidth("300px")
        .addTo(this.map);
    });
    var markerHeight = 50, markerRadius = 1, linearOffset = 1;
    var popupOffsets = {
    'top': [0, 0],
    'top-left': [0,0],
    'top-right': [0,0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

    //need to figure out how to only open when marker is clicked

    this.map.on('click', marker=>{
      const result = this.map.queryRenderedFeatures({object: marker})
      if (result.length){
        const popup = new mapboxgl.Popup({offset: popupOffsets})
        .setLngLat([-89.398564, 43.072439])
        .setHTML("<h1>Student Activity Center: 333 East Campus Mall, Room 4301 </h1>")
        .setMaxWidth("300px")
        .addTo(this.map);
        const popup2 = new mapboxgl.Popup({offset: popupOffsets})
        .setLngLat([-89.412213, 43.074975])
        .setHTML("<h1>Moore Hall: 2nd Floor 1575 Linden Drive #371 </h1>")
        .setMaxWidth("300px")
        .addTo(this.map);
      }
    })

}
}