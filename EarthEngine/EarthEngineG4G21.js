//Removes Clouds
var cloudMask = function(image) {
  var qa = image.select('pixel_qa');
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};

//Gets Landsat 7 data maps with CloudMask
var dataset2000 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                  .filterDate('2000-01-01', '2000-12-31')
                  .map(cloudMask);
                  
var dataset2020 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
                  .filterDate('2020-01-01', '2020-12-31')
                  .map(cloudMask);                  

//Visual Parameters
var visParams = {
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};

//Sets Austin and Las Vegas Bounding Boxes
var boundingPolygonAustin = ee.Geometry.Polygon(
        [[[-98.12092368764485, 30.720757647889535],
          [-98.12092368764485, 29.957485485610395],
          [-97.2557503478011, 29.957485485610395],
          [-97.2557503478011,30.720757647889535]]],null, false);
          
var boundingPolygonLasVegas = ee.Geometry.Polygon(
        [[[-115.71818443031252, 36.376953990820276],
          [-115.71818443031252, 35.86890657683596],
          [-114.50419517250002, 35.86890657683596],
          [-114.50419517250002, 36.376953990820276]]], null, false);          


//Adds Layers to map          
Map.addLayer(dataset2000.median(), visParams, '2000');
Map.addLayer(dataset2020.median(), visParams, '2020');
Map.addLayer(boundingPolygonAustin,null,'Austin');
Map.addLayer(boundingPolygonLasVegas,null,'Las Vegas');

//Exports Maps to Cloud Storage
/*
Export.map.toCloudStorage({
  image: dataset2000.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2000_Austin',
  bucket: 'geteachkml4',
  path: 'earthEngine/Austin/2000/',
  fileFormat: 'auto',
  writePublicTiles: true,
  maxZoom: 12,
  minZoom: 0,
  skipEmptyTiles: true,
  bucketCorsUris: ['https://geteach.com/' , 'https://earth.google.com'],
  region: boundingPolygonAustin
});

Export.map.toCloudStorage({
  image: dataset2020.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2020_Austin',
  bucket: 'geteachkml4',
  path: 'earthEngine/Austin/2020/',
  fileFormat: 'auto',
  writePublicTiles: true,
  maxZoom: 12,
  minZoom: 0,
  skipEmptyTiles: true,
  bucketCorsUris: ['https://geteach.com/' , 'https://earth.google.com'],
  region: boundingPolygonAustin
});

Export.map.toCloudStorage({
  image: dataset2000.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2000_LV',
  bucket: 'geteachkml4',
  path: 'earthEngine/LV/2000/',
  fileFormat: 'auto',
  writePublicTiles: true,
  maxZoom: 12,
  minZoom: 0,
  skipEmptyTiles: true,
  bucketCorsUris: ['https://geteach.com/' , 'https://earth.google.com'],
  region: boundingPolygonLasVegas
});

Export.map.toCloudStorage({
  image: dataset2020.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2020_LV',
  bucket: 'geteachkml4',
  path: 'earthEngine/LV/2020/',
  fileFormat: 'auto',
  writePublicTiles: true,
  maxZoom: 12,
  minZoom: 0,
  skipEmptyTiles: true,
  bucketCorsUris: ['https://geteach.com/' , 'https://earth.google.com'],
  region: boundingPolygonLasVegas
});
*/

//Exports Images to Drive
/*
Export.image.toDrive({
  image: dataset2000.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2000_Austin',
  folder: 'GTAB',
  dimensions: '1920x1080',
});
Export.image.toDrive({
  image: dataset2020.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2020_Austin',
  folder: 'GTAB',
  dimensions: '1920x1080',
});
*/
/*
Export.image.toDrive({
  image: dataset2000.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2000_LV',
  folder: 'GTAB',
  dimensions: '1920x1080',
});


Export.image.toDrive({
  image: dataset2020.median().visualize({bands: ['B3', 'B2', 'B1'],min: 0,max: 3000,gamma: 1.4,}),
  description: 'Land7_2020_LV',
  folder: 'GTAB',
  dimensions: '1920x1080',
});
*/