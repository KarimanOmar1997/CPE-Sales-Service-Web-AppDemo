require([
  "esri/config",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/core/Handles",
  "esri/widgets/Feature",
  "esri/widgets/Popup",
  "esri/core/reactiveUtils",
  "esri/Graphic",
  "esri/rest/locator",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/Compass",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/widgets/Print",
  "esri/widgets/Fullscreen",
  "esri/widgets/FeatureTable",
  "esri/geometry/geometryEngine",
  "esri/geometry/Circle",
], (
  esriConfig,
  MapView,
  WebMap,
  LayerList,
  BasemapGallery,
  Legend,
  Expand,
  FeatureLayer,
  Search,
  Handles,
  Feature,
  Popup,
  reactiveUtils,
  Graphic,
  locator,
  AreaMeasurement2D,
  DistanceMeasurement2D,
  Compass,
  Home,
  Locate,
  Print,
  Fullscreen,
  FeatureTable,
  geometryEngine,
  Circle
) => {
  (async () => {
    let webmapId = "039f70452dd740faaca866197cb0eca3";
    if (window.location.href.indexOf("?id=") > 0) {
      webmapId = window.location.href.split("?id=")[1];
    }

    /************************************************************
     * Creates a new webmap instance. A WebMap can reference
     * a PortalItem ID that represents a WebMap saved to
     * arcgis.com or an on-premise portal.
     * To load a WebMap from an on-premise portal, set the portal
     * url with esriConfig.portalUrl (see above).
     ************************************************************/
    const handles = new Handles();
    let layerBlockArray = [];
    let layerViews = [];
    const panel = document.getElementById("Data_Container_By_Select_all");
    const map = new WebMap({
      portalItem: {
        id: webmapId
      }
    });

    const view = new MapView({
      map: map,
      container: "viewDiv",
      popupEnabled: false,
      popup: new Popup()
    });

    // When view is ready
    await map.when();


    //============================================== create blocks in the right side =======================================
    map.layers.forEach(async (layer) => {
      await layer.load();
      // Create a new Calcite block for each layer and add to an array to access later.
      const layerBlock = document.createElement("calcite-block");
      //  console.log(" layer.title::", layer.title);

      layerBlock.id = layer.title;
      if (layer.title == "RFI Product") {
        layerBlock.heading = "HPSM Tickets";
      } else {

        layerBlock.heading = layer.title;
      }
      layerBlock.open = true;
      console.log(" layerBlock.heading::", layerBlock.heading);

      layerBlockArray.push(layerBlock);
      // Create an array of layerViews to be able to highlight selected features.
      if (layer.type === "feature") {
        const layerView = await view.whenLayerView(layer);
        layerViews.push(layerView);
      }
    });

    //=============================================== see all layer in console ===============================================

    console.log("to get 0 :", map.layers.getItemAt(0).title);
    console.log("to get 1 :", map.layers.getItemAt(1).title);
    console.log("to get 2 :", map.layers.getItemAt(2).title);
    console.log("to get 3 :", map.layers.getItemAt(3).title);
    console.log("to get 4 :", map.layers.getItemAt(4).title);
    console.log("to get 5 :", map.layers.getItemAt(5).title);

    const iraq = map.layers.getItemAt(0)
    const cityOffers = map.layers.getItemAt(1)
    const cells = map.layers.getItemAt(2)
    const sitesFinal = map.layers.getItemAt(3)
    const POSs = map.layers.getItemAt(4)
    const CCTicketsRFIRFIsFC = map.layers.getItemAt(5)
    const iraqTitle = 'Iraq'
    const cityOffersTitle = 'City'
    const cellsTitle = 'Cell'
    const sitesFinalTitle = 'SitesFinal'
    const POSsTitle = 'POSs'
    const CCTicketsRFIRFIsFCTitle = 'CCTickets_RFI - RFIs_FC'
    var cellsSITEID
    var cellsNetworkType
    const featureLayerMaintenanceSiteOperation = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_Cell_V4/FeatureServer/4"
    });
    const featureLayerOutagesData = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_Cell_V4/FeatureServer/5"
    });
    const featureLayerProductList = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/POS_Layers_V2_WFL1/FeatureServer/4"
    });
    const featureLayerOffers = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/city_offers/FeatureServer/3"
    });

    //=============================================== custom popup template ===============================================

    sitesFinal.popupTemplate = {
      title: "{site_id}",
      outFields: ["*"],
      returnGeometry: true,
      fieldInfos: [
        {
          fieldName: "site_id",
          label: "Site ID:"
        },
        {
          fieldName: "ID",
          label: "ID:"
        },
        {
          fieldName: "latitude",
          label: "latitude:"
        },
        {
          fieldName: "plan_longitude",
          label: "plan longitude:"
        },
        {
          fieldName: "plan_latitude",
          label: "plan latitude:"
        }

      ],
      content: [
        // Add FieldContent to popup template.
        {
          type: "fields"
        },
        // Create RelationshipContent with the relationship between
        // the units and fires.
        {
          type: "relationship",
          // The numeric ID value for the defined relationship on the service.
          // This can be found on the service.
          relationshipId: 2,
          description: "",
          // Display two related fire features in the list of related features.
          displayCount: 1,
          title: "Sites Data",
          // Order the related features by the 'GIS_ACRES' in descending order.
          orderByFields: {
            field: "site_id",
            order: "desc"
          }
        },
        // // Create RelationshipContent with the relationship between
        // // the units and wildfire protection facility statistics table.
        {
          type: "relationship",
          relationshipId: 6,
          description: "",
          // Display only the one unit
          displayCount: 1,
          title: "CCTicketsFC Data",
          // Order list of related records by the 'NAME' field in ascending order.
          orderByFields: {
            field: "siteid",
            order: "asc"
          }
        },
      ]
    }

    //=============================================== show layers data in the right side on click ===========================
 
    // On view click, first remove all the previously added features (if any).
    reactiveUtils.on(
      () => view,
      "click",
      async (event) => {
        // Remove any existing highlighted features
        //  handles.removeAll();
        document.getElementById("Data_Container_By_Select").innerHTML = " "
        layerBlockArray.forEach((block) => {
          while (block.lastElementChild) {
            block.removeChild(block.lastElementChild);
          }
        });

        // Call fetchFeatures and pass in the click event location.
        const fetchFeaturesResponse = await view.popup.fetchFeatures(event);
        // Iterate through the returned graphics once the allGraphicsPromise resolves.
        const graphics = await fetchFeaturesResponse.allGraphicsPromise;

        if (graphics.length > 0) {
          graphics.forEach((graphic) => {
            // For each layer's calcite block, loop through the graphics and add
            // the graphic to a feature widget into that block.
            layerBlockArray.forEach((block) => {
              const layerTitle = graphic.layer.title;


              if (block.heading === layerTitle) {
                panel.appendChild(block);
                const featureChild = new Feature({
                  container: document.createElement("div"),
                  graphic: graphic
                });
                block.appendChild(featureChild.container);
                if (block.id == cellsTitle) {
                  cellsSITEID = featureChild.graphic.attributes.SITEID
                  cellsNetworkType = featureChild.graphic.attributes.technology
                  console.log("cellsNetworkType",featureChild.graphic.attributes);

                  //  getSitesFeatureLayer(featureChild.graphic.attributes.site_id,graphic.attributes.network_type , "select_on_map")

                }
                if (block.id == cityOffersTitle) {


                  if (cellsSITEID) {

                    getSitesFeatureLayer(cellsSITEID, cellsNetworkType, graphic.attributes.city_code, "select_on_map")
                    console.log('graphic.attributes.city_code', graphic.attributes);
                    console.log("cellsNetworkType",cellsNetworkType);
                    console.log('cellsSITEID' , cellsSITEID);
                  } else {
                    getSitesFeatureLayer("", "", graphic.attributes.city_code, "select_on_map")
                  }
                  cellsSITEID = ""

                }
                // block.appendChild(featureChild.container);
                // If the graphic comes from a feature layer, add a highlight
                // to that feature using the layerView.highlight method.
                if (graphic.layer.type === "feature") {
                  layerViews.forEach((layerView) => {
                    if (graphic.layer.title === layerView.layer.title) {
                      //  handles.add(layerView.highlight(graphic));
                    }
                  });
                }
              }
            });
          });
        }
      }
    );

    //=============================================== add legend, layerlist, controls and basemapGallery widgets ========================

    // add legend, layerlist and basemapGallery widgets
    view.ui.add(
      [
        new Expand({
          content: new Legend({
            view: view
          }),
          view: view,
          group: "top-left"
        }),
        new Expand({
          content: new LayerList({ view: view }),
          view: view,
          group: "top-left"
        }),
        new Expand({
          content: new BasemapGallery({
            view: view
          }),
          view: view,
          expandIcon: "basemap",
          group: "top-left"
        }),
        new Expand({
          content: controls,
          view: view,
          expandIcon: "filter",
          group: "top-left"
        })
      ],
      "top-left"
    );

    //=============================================== add clear-selection widgets ============================================

    // add clear-selection
    view.ui.add("clear-selection", "top-left");

    // clear selection on click
    document.getElementById("clear-selection").addEventListener("click", () => {
      handles.removeAll();
      view.graphics.removeAll();
      featureTableTwors.highlightIds.removeAll();
      featureTablePOS.highlightIds.removeAll();
      featureTableProductList.highlightIds.removeAll();
      // featureTableNetworkCoverage.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();
      document.getElementById("Data_Container_By_Select").innerHTML = " "
      layerBlockArray.forEach((block) => {
        while (block.lastElementChild) {
          block.removeChild(block.lastElementChild);
        }
      });
    });

    const searchWidget = new Search({
      view: view,
      allPlaceholder: "Site id ",
      includeDefaultSources: false,
      sources: [
        {
          layer: sitesFinal,
          searchFields: ["site_id"],
          displayField: "site_id",
          exactMatch: false,
          outFields: ["*"],
          name: "Sites",
          placeholder: "example: BAG0400"
        }
 
      ]
    });

    // Add the search widget to the top left corner of the view
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    //=============================================== add toolbar for the measurement widgets ============================================

    // add the toolbar for the measurement widgets
    view.ui.add("topbar", "top-right");

    // create the measurement widgets and hide them by default
    const distanceMeasurement2D = new DistanceMeasurement2D({
      view,
      visible: false
    });
    const areaMeasurement2D = new AreaMeasurement2D({
      view,
      visible: false
    });

    // event listener for distance measurements
    document.getElementById("distanceButton").addEventListener("click", function () {
      //  setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

    // event listener for area measurements
    document.getElementById("areaButton").addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("area");
      } else {
        setActiveButton(null);
      }
    });

    document.getElementById('clearButton').addEventListener("click", () => {
      clearMeasurements();
    });

    // Clears all measurements
    function clearMeasurements() {
      setActiveWidget(null);
    }

    function setActiveWidget(type) {
      switch (type) {
        case "distance":
          areaMeasurement2D.visible = false;
          distanceMeasurement2D.visible = true;
          distanceMeasurement2D.viewModel.start();
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case "area":
          distanceMeasurement2D.visible = false;
          areaMeasurement2D.visible = true;
          areaMeasurement2D.viewModel.start();
          setActiveButton(document.getElementById("areaButton"));
          break;
        case null:
          areaMeasurement2D.visible = false;
          distanceMeasurement2D.visible = false;
          break;
      }
    }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();
   
    }

    //=============================================== add home, locate, Compass, Print, Fullscreen  widgets =================================

    const homeBtn = new Home({
      view: view
    });

    // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-right");

    const locateBtn = new Locate({
      view: view
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
      position: "top-right"
    });

    /********************************
    * Create a compass widget object.
     *********************************/

    const compassWidget = new Compass({
      view: view
    });

    view.ui.add(
      [
        new Expand({
          content: new Print({
            view: view,
            // specify your own print service
            printServiceUrl:
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          }),
          view: view,
          group: "top-right"
        }),
      ],
      "top-right"
    );

    const applicationDiv = document.getElementById("applicationDiv");

    view.ui.add(
      new Fullscreen({
        view: view,
        element: applicationDiv
      }),
      "top-right"
    );


    // Add the Compass widget to the top left corner of the view
    view.ui.add(compassWidget, "top-right");



    //=============================================== search by adress ==============================================

    document.getElementById("SearchBTN").addEventListener("click", searchOnMap);
    function searchOnMap() {
      var addressVar = document.getElementById("SearchInput").value
      // console.log(addressVar);
      const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

      const params = {
        address: {
          "address": addressVar
        }
      }

      locator.addressToLocations(geocodingServiceUrl, params).then((results) => {

        showResult(results);
      });


      function showResult(results) {
        view.graphics.removeAll();
        if (results.length) {
          var query = results[0];
          // console.log(query);
          const result = results[0];
          // console.log(result.location.longitude.toFixed(5) + "," + result.location.latitude.toFixed(5))
          view.graphics.add(new Graphic({
            symbol: {
              type: "simple-marker",
              color: "#000000",
              size: "8px",
              outline: {
                color: "#ffffff",
                width: "1px"
              }
            },
            geometry: result.location,
            attributes: {
              title: "Address",
              address: result.address,
              score: result.score
            },
            popupTemplate: {
              title: "{title}",
              content: result.address + "<br><br>" + result.location.longitude.toFixed(5) + "," + result.location.latitude.toFixed(5)
            }
          }
          ));
          if (results.length) {
            const g = view.graphics.getItemAt(view.graphics._items.length - 1);
            view.openPopup({
              features: [g],
              location: g.geometry
            });
            getDitalls(g.geometry)
          }
          view.goTo({
            target: result.location,
            zoom: 13
          });
        }
      }
    };




    function getDitalls(point) {

      var NetworkCoverageQuery = cells.createQuery();
      var ZonesQuery = cityOffers.createQuery();

      // Set the geometry for the query
      NetworkCoverageQuery.geometry = point;
      ZonesQuery.geometry = point;

      // Execute the query

      cityOffers.queryFeatures(ZonesQuery).then(async function (ZonesResult) {

        if (ZonesResult.features.length > 0) {
          var polygonZones = ZonesResult.features[ZonesResult.features.length - 1]; // Assuming you want the first polygon if there are multiple intersections
          // Do something with the polygon, e.g., access attributes: polygon.attributes

          // Check if any features were found
          cells.queryFeatures(NetworkCoverageQuery).then(function (NetworkCoveraResult) {
            // Check if any features were found
            if (NetworkCoveraResult.features.length > 0) {
              var polygonNetworkCoverage = NetworkCoveraResult.features[NetworkCoveraResult.features.length - 1]; // Assuming you want the first polygon if there are multiple intersections
              // Do something with the polygon, e.g., access attributes: polygon.attributes

              getSitesFeatureLayer(polygonNetworkCoverage.attributes.SITEID, polygonNetworkCoverage.attributes.technology, polygonZones.attributes.city_code, "search")
              console.log('polygonNetworkCoverage.attributes.' , polygonNetworkCoverage.attributes);
              // console.log('graphic.attributes.city_code', graphic.attributes);

            } else {
              getSitesFeatureLayer("", "", polygonZones.attributes.city_code, "search")
            }

          }).catch(function (error) {
            console.error("Error during query: ", error);

          });

        } else {
          document.getElementById("Data_Container_By_Search").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        }
      }).catch(function (error) {
        console.error("Error during query: ", error);
      });

    }


    // Define the query parameters
    function getSitesFeatureLayer(site_id,network_type, city, caller) {
console.log('network_type',network_type);

      document.getElementById("Data_Container_By_Search").innerHTML = ` `
      document.getElementById("Data_Container_By_Select").innerHTML = ` `

      if (site_id) {

        var queryParamsForCells = {
          where: `SITEID = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        var queryParamsForOutagesData = {
          where: `site_id = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        var queryParamsNetworkType = {
          where: `Technology = '${network_type}' OR Technology = 'All (voince & data)' OR Technology = 'Data (All)'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        // Execute the query

        var queryParamsOffers = {
          where: `Code = '${city}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        // Execute the query


        if (caller == "search") {
          cells.queryFeatures(queryParamsForCells)
            .then(function (result) {
              // Handle the query result
              if (result.features.length > 0) {
                document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Network Coverage Data
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body" id=${caller == "search" ? "collapseOneBodySearch" : "collapseOneBodySelect"}>
                  </div>
                </div>
              </div>
                `
   
                 for (let index = 0; index < result.features.length; index++) {
                   const element = result.features[index];
                   document.getElementById(caller == "search" ? "collapseOneBodySearch" : "collapseOneBodySelect").innerHTML += `
                  <table  class="mt-3 table table-striped table-bordered">
                  <thead>
                    <th colspan="2">Site ID: ${element.attributes.site_id ? element.attributes.site_id : " "}</th>
                  </thead>
                <tbody>
                  <tr>
                    <th>Coverage Status: </th>
                    <td> ${element.attributes.coverage_status ? element.attributes.coverage_status : " "}</td>
                  </tr>
                  <tr>
                    <th>Coverage Status Date Time: </th>
                    <td> ${element.attributes.coverage_status_date_time ? element.attributes.coverage_status_date_time : " "}</td>
                  </tr>
                  <tr>
                    <th>Coverage Location: </th>
                    <td> ${element.attributes.coverage_location ? element.attributes.coverage_location : " "}</td>
                  </tr>
                  <tr>
                    <th>CGI: </th>
                    <td> ${element.attributes.cgi ? element.attributes.cgi : " "}</td>
                  </tr>
                  <tr>
                    <th>Site Name: </th>
                    <td> ${element.attributes.site_name ? element.attributes.site_name : " "}</td>
                  </tr>
                  <tr>
                    <th>Latitude: </th>
                    <td> ${element.attributes.latitude ? element.attributes.latitude : " "}</td>
                  </tr>
                  <tr>
                    <th>Longitude: </th>
                    <td> ${element.attributes.longitude ? element.attributes.longitude : " "}</td>
                  </tr>
          
                </tbody>
              </table>
                `
                   // console.log("site",element.attributes);
                 }
              }else{
                document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
                <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
                No cells Found
                </button>`
              }

            })
            .catch(function (error) {
              // Handle errors
              console.error("Error performing query:", error);
            });
        }

        // Execute the query
        featureLayerOutagesData.queryFeatures(queryParamsForOutagesData)
          .then(function (result) {
            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Outages Data
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body" id=${caller == "search" ? "collapseThreeBodySearch" : "collapseThreeBodySelect"}>
                </div>
              </div>
            </div>
              `
               for (let index = 0; index < result.features.length; index++) {
                 const element = result.features[index];
                 var clearanceTimeDateObj = new Date(element.attributes.clearance_time);
                 var closeTimeDateObj = new Date(element.attributes.close_time);
                 document.getElementById(caller == "search" ? "collapseThreeBodySearch" : "collapseThreeBodySelect").innerHTML += `
                <table  class="mt-3 table table-striped table-bordered">
                <thead>
                  <th colspan="2">Incident ID: ${element.attributes.incident_id ? element.attributes.incident_id : " "}</th>
                </thead>
              <tbody>
                <tr>
                  <th>Affected Sector: </th>
                  <td> ${element.attributes.affected_sector ? element.attributes.affected_sector : " "}</td>
                </tr>
                <tr>
                  <th>Affectedobject: </th>
                  <td> ${element.attributes.affectedobject ? element.attributes.affectedobject : " "}</td>
                </tr>
                <tr>
                  <th>Alarm Number: </th>
                  <td> ${element.attributes.alarm_number ? element.attributes.alarm_number : " "}</td>
                </tr>
                <tr>
                  <th>Alarm Severity: </th>
                  <td> ${element.attributes.alarm_severity ? element.attributes.alarm_severity : " "}</td>
                </tr>
                <tr>
                  <th>Assignment: </th>
                  <td> ${element.attributes.assignment ? element.attributes.assignment : " "}</td>
                </tr>
                <tr>
                  <th>Cell ID: </th>
                  <td> ${element.attributes.cell_id ? element.attributes.cell_id : " "}</td>
                </tr>
                <tr>
                  <th>Clearance Time: </th>
                  <td> ${clearanceTimeDateObj ? clearanceTimeDateObj.toUTCString() : " "}</td>
                </tr>
                <tr>
                  <th>Close Time: </th>
                  <td> ${closeTimeDateObj ? closeTimeDateObj.toUTCString() : " "}</td>
                </tr>
                <tr>
                  <th>Cluster: </th>
                  <td> ${element.attributes.cluster ? element.attributes.cluster : " "}</td>
                </tr>
                <tr>
                  <th>Duration: </th>
                  <td> ${element.attributes.duration ? element.attributes.duration : " "}</td>
                </tr>
                <tr>
                  <th>Element: </th>
                  <td> ${element.attributes.element ? element.attributes.element : " "}</td>
                </tr>
                <tr>
                  <th>Incident ID: </th>
                  <td> ${element.attributes.incident_id ? element.attributes.incident_id : " "}</td>
                </tr>
                <tr>
                  <th>Kpi Category: </th>
                  <td> ${element.attributes.kpi_category ? element.attributes.kpi_category : " "}</td>
                </tr>
                <tr>
                  <th>Kpi Subcategory: </th>
                  <td> ${element.attributes.kpi_subcategory ? element.attributes.kpi_subcategory : " "}</td>
                </tr>
                <tr>
                  <th>NE Name: </th>
                  <td> ${element.attributes.ne_name ? element.attributes.ne_name : " "}</td>
                </tr>
                <tr>
                  <th>Notification ID: </th>
                  <td> ${element.attributes.notification_id ? element.attributes.notification_id : " "}</td>
                </tr>
                <tr>
                  <th>Open Time: </th>
                  <td> ${element.attributes.open_time ? element.attributes.open_time : " "}</td>
                </tr>
                <tr>
                  <th>Original_event Time: </th>
                  <td> ${element.attributes.original_event_time ? element.attributes.original_event_time : " "}</td>
                </tr>
                <tr>
                  <th>Problem Category: </th>
                  <td> ${element.attributes.problem_category ? element.attributes.problem_category : " "}</td>
                </tr>
                <tr>
                  <th>Province City: </th>
                  <td> ${element.attributes.province_city ? element.attributes.province_city : " "}</td>
                </tr>
                <tr>
                  <th>Reason: </th>
                  <td> ${element.attributes.reason ? element.attributes.reason : " "}</td>
                </tr>
                <tr>
                  <th>Resolution: </th>
                  <td> ${element.attributes.resolution ? element.attributes.resolution : " "}</td>
                </tr>
                <tr>
                  <th>Resolution Code: </th>
                  <td> ${element.attributes.resolution_code ? element.attributes.resolution_code : " "}</td>
                </tr>
                <tr>
                  <th>Service Affected: </th>
                  <td> ${element.attributes.service_affected ? element.attributes.service_affected : " "}</td>
                </tr>
                <tr>
                  <th>Site ID: </th>
                  <td> ${element.attributes.site_id ? element.attributes.site_id : " "}</td>
                </tr>
                <tr>
                  <th>Site Name: </th>
                  <td> ${element.attributes.site_name ? element.attributes.site_name : " "}</td>
                </tr>
                <tr>
                  <th>Status: </th>
                  <td> ${element.attributes.status ? element.attributes.status : " "}</td>
                </tr>
                <tr>
                  <th>Update Time: </th>
                  <td> ${element.attributes.update_time ? element.attributes.update_time : " "}</td>
                </tr>
              </tbody>
            </table>
              `
                 // console.log("OutagesData",element.attributes);
               }
            }else{
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
              No Outages Data Found
              </button>`
            }

          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });
        // Execute the query
        featureLayerProductList.queryFeatures(queryParamsNetworkType)
          .then(function (result) {
            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
            <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              Product List Table
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div class="accordion-body" id=${caller == "search" ? "collapseFourBodySearch" : "collapseFourBodySelect"}>
              </div>
            </div>
          </div>
            `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                document.getElementById(caller == "search" ? "collapseFourBodySearch" : "collapseFourBodySelect").innerHTML += `
              <table  class="mt-3 table table-striped table-bordered">
              <thead>
                <th colspan="2">Item Code: ${element.attributes.Item_Code ? element.attributes.Item_Code : " "}</th>
              </thead>
            <tbody>
              <tr>
                <th>Item Description: </th>
                <td> ${element.attributes.Item_Description ? element.attributes.Item_Description : " "}</td>
              </tr>
              <tr>
                <th>ID: </th>
                <td> ${element.attributes.ID ? element.attributes.ID : " "}</td>
              </tr>
              <tr>
                <th>Technology: </th>
                <td> ${element.attributes.Technology ? element.attributes.Technology : " "}</td>
              </tr>
            </tbody>
          </table>
            `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No Products Found
            </button>`
            }

          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });

        featureLayerOffers.queryFeatures(queryParamsOffers)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingOffers">
                <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOffers" aria-expanded="false" aria-controls="collapseOffers">
                Offers
                </button>
              </h2>
              <div id="collapseOffers" class="accordion-collapse collapse" aria-labelledby="headingOffers" data-bs-parent="#accordionExample">
                <div class="accordion-body" id=${caller == "search" ? "collapseOffersBodySearch" : "collapseOffersBodySelect"}>
                </div>
              </div>
            </div>
              `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                document.getElementById(caller == "search" ? "collapseOffersBodySearch" : "collapseOffersBodySelect").innerHTML += `
                <table  class="mt-3 table table-striped table-bordered">
                <thead>
                  <th colspan="2">City: ${element.attributes.City ? element.attributes.City : " "}</th>
                </thead>
              <tbody>
                <tr>
                  <th>Region: </th>
                  <td> ${element.attributes.Region ? element.attributes.Region : " "}</td>
                </tr>
                <tr>
                  <th>Offer Package Duration: </th>
                  <td> ${element.attributes.Offer_Package_Duration ? element.attributes.Offer_Package_Duration : " "}</td>
                </tr>
                <tr>
                  <th>Offers Packages Bundles: </th>
                  <td> ${element.attributes.Offers_Packages_Bundles ? element.attributes.Offers_Packages_Bundles : " "}</td>
                </tr>
                <tr>
                  <th>Free Social: </th>
                  <td> ${element.attributes.Free_social ? element.attributes.Free_social : " "}</td>
                </tr>
                <tr>
                  <th>Offer Duration: </th>
                  <td> ${element.attributes.Offer_Duration ? element.attributes.Offer_Duration : " "}</td>
                </tr>
                <tr>
                  <th>ID: </th>
                  <td> ${element.attributes.ID ? element.attributes.ID : " "}</td>
                </tr>
                <tr>
                  <th>Yooz Bundles: </th>
                  <td> ${element.attributes.Yooz_bundles ? element.attributes.Yooz_bundles : " "}</td>
                </tr>
              </tbody>
            </table>
              `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
                <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
                No Offers Found
                </button>`
            }

          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });
      } else if (city) {
        // Execute the query
        featureLayerOffers.queryFeatures(queryParamsOffers)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
        <div class="accordion-item">
        <h2 class="accordion-header" id="headingOffers">
          <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOffers" aria-expanded="false" aria-controls="collapseOffers">
          Offers
          </button>
        </h2>
        <div id="collapseOffers" class="accordion-collapse collapse" aria-labelledby="headingOffers" data-bs-parent="#accordionExample">
          <div class="accordion-body" id=${caller == "search" ? "collapseOffersBodySearch" : "collapseOffersBodySelect"}>
          </div>
        </div>
      </div>
        `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                document.getElementById(caller == "search" ? "collapseOffersBodySearch" : "collapseOffersBodySelect").innerHTML += `
          <table  class="mt-3 table table-striped table-bordered">
          <thead>
            <th colspan="2">City: ${element.attributes.City ? element.attributes.City : " "}</th>
          </thead>
        <tbody>
          <tr>
            <th>Region: </th>
            <td> ${element.attributes.Region ? element.attributes.Region : " "}</td>
          </tr>
          <tr>
            <th>Offer Package Duration: </th>
            <td> ${element.attributes.Offer_Package_Duration ? element.attributes.Offer_Package_Duration : " "}</td>
          </tr>
          <tr>
            <th>Offers Packages Bundles: </th>
            <td> ${element.attributes.Offers_Packages_Bundles ? element.attributes.Offers_Packages_Bundles : " "}</td>
          </tr>
          <tr>
            <th>Free Social: </th>
            <td> ${element.attributes.Free_social ? element.attributes.Free_social : " "}</td>
          </tr>
          <tr>
            <th>Offer Duration: </th>
            <td> ${element.attributes.Offer_Duration ? element.attributes.Offer_Duration : " "}</td>
          </tr>
          <tr>
            <th>ID: </th>
            <td> ${element.attributes.ID ? element.attributes.ID : " "}</td>
          </tr>
          <tr>
            <th>Yooz Bundles: </th>
            <td> ${element.attributes.Yooz_bundles ? element.attributes.Yooz_bundles : " "}</td>
          </tr>
        </tbody>
      </table>
        `
                // console.log("OutagesData",element.attributes);
              }
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
        <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
        No Products Found
        </button>`
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
        <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
        No Outages Found
        </button>`
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
        <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
        No Maintenance Found
        </button>`

            } else {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
          <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
          No Products Found
          </button>`
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
          <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
          No Offers Found
          </button>`
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
          <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
          No Outages Found
          </button>`
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
          <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
          No Maintenance Found
          </button>`
            }

          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });
      }
      else {
        if (caller == "search") {
          document.getElementById("Data_Container_By_Search").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        } else if (caller == "select_on_map") {
          document.getElementById("Data_Container_By_Select").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        }
      }
    }

    // =========================================================== tables ========================================



    // Create the feature table
    const featureTableTwors = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: sitesFinal,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },
      container: document.getElementById("tableDiv-Towers")
    });
    const featureTableOutagesData = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerOutagesData,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-OutagesData")
    });
    const featureTablePOS = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: POSs,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-POS")
    });
    const featureTableProductList = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerProductList,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-ProductList")
    });
    const featureTableOffers = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerOffers,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-Offers")
    });
    // const featureTableNetworkCoverage = new FeatureTable({
    //   view: view, // Required for feature highlight to work
    //   layer: featureLayerNetworkCoverage,
    //   visibleElements: {
    //     // Autocast to VisibleElements
    //     menuItems: {
    //       clearSelection: true,
    //       refreshData: true,
    //       toggleColumns: true,
    //       selectedRecordsShowAllToggle: true,
    //       selectedRecordsShowSelectedToggle: true,
    //       zoomToSelection: true
    //     }
    //   },

    //   container: document.getElementById("tableDiv-network-coverage")
    // });
    const featureTableCells = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: cells,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-Cells")
    });

    featureTableProductList.on("selection-change", (event) => {

      console.log("featureTableProductList:", featureTableProductList.highlightIds.length);
      if (event.added[0]) {
        // `selectedRecords` contains the records of the selected features
        handles.removeAll();
        view.graphics.removeAll();
        const selectedRecords = event.added[0].feature.attributes.Technology;
        // console.log(selectedRecords , selectedRecords.includes('All'));
        var queryParamsProductList = {
          where: selectedRecords.includes('All') ? '1=1' : `technology = '${selectedRecords}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };

        cells.queryFeatures(queryParamsProductList)
          .then(function (result) {
            // Handle the query result
            // console.log(result);
            for (let index = 0; index < result.features.length; index++) {
              const element = result.features[index];
              console.log("element:", element.layer.title);

              if (element.layer.title == cellsTitle) {
                if (element.layer.type == "feature") {
                  layerViews.forEach((layerView) => {
                    if (element.layer.title == layerView.layer.title) {

                      handles.add(layerView.highlight(element));
                    }
                  });
                }
              }

            }

          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });




      } else if (event.removed[0]) {
        handles.removeAll();
      }

    });

    // Listen for when the view is stationary.
    // If true, set the table to display only the attributes
    // for the features falling within this extent.

    reactiveUtils.when(
      () => view.stationary,
      () => {
        // Filter out and show only the visible features in the feature table.
        featureTableTwors.filterGeometry = view.extent;
        featureTablePOS.filterGeometry = view.extent;
        // featureTableNetworkCoverage.filterGeometry = view.extent;
        featureTableCells.filterGeometry = view.extent;
      },
      {
        initial: true
      }
    );

    //========================================= Listen for the view's click event and access the associated graphic ========================

    // Circle graphic to represent click location and search radius
    const circleSymbol = {
      type: "simple-fill",
      style: "solid",
      color: [161, 31, 31, 0.1],
      outline: {
        width: 3,
        color: [161, 31, 31],
      },
    };

    await POSs.load();
    let featureLayerViewPOS = await view.whenLayerView(POSs);
    async function showPlaces(geometry) {
      // Buffer graphic represents click location and search radius
      clickPoint = {};
      clickPoint.type = "point";
      // Convert clicked screen location to longitude and latitude
      clickPoint.longitude = geometry.longitude
      clickPoint.latitude = geometry.latitude
      const circleGeometry = new Circle({
        center: clickPoint,
        geodesic: true,
        numberOfPoints: 100,
        radius: 5000,  // set radius to 500 meters
        radiusUnit: "meters",
      });
      const circleGraphic = new Graphic({
        geometry: circleGeometry,
        symbol: circleSymbol,
      });
      // Add buffer graphic to the view


      let query = POSs.createQuery();
      query.geometry = geometry  // the point location of the pointer
      query.distance = 5;
      query.units = "kilometers";
      query.spatialRelationship = "intersects";  // this is the default
      query.returnGeometry = true;
      query.outFields = ["*"];

      featureLayerViewPOS.queryFeatures(query)
        .then(function (response) {
          console.log(response.features);
          // returns a feature set with features containing the
          // POPULATION attribute and each feature's geometry
          for (let index = 0; index < response.features.length; index++) {
            const element = response.features[index];
            console.log("element:", element.layer.title);

            if (element.layer.title == "POSs") {
              if (element.layer.type == "feature") {
                layerViews.forEach((layerView) => {
                  if (element.layer.title == layerView.layer.title) {

                    handles.add(layerView.highlight(element));
                  }
                });
              }
            }

          }
          view.graphics.add(circleGraphic);
        })
        .catch(function (error) {
          console.error("Error during query: ", error);

        });

    }


    view.on("immediate-click", async (event) => {
      const response = await view.hitTest(event);
      handles.removeAll();
      view.graphics.removeAll();
      featureTableTwors.highlightIds.removeAll();
      featureTablePOS.highlightIds.removeAll();
      // featureTableNetworkCoverage.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();


      candidate = response.results.find((result) => {
        // console.log("result::",result);
        if (result.graphic.layer === POSs) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === POSs
        }

        else if (result.graphic.layer === sitesFinal) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === sitesFinal

        }
        else if (result.graphic.layer === cells) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === cells

        }

        else if (result.graphic.layer === cityOffers) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === cityOffers

        }
        else if (result.graphic.layer === CCTicketsRFIRFIsFC) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === CCTicketsRFIRFIsFC

        }

      });

      // Add the graphic's ObjectId into the collection of highlightIds.
      // Check that the featureTableTwors.highlightIds collection
      // does not include an already highlighted feature.
      if (candidate) {
        // console.log("candidate.graphic : " , candidate.layer.title);
        const objectId = candidate.graphic.getObjectId();
        if (candidate.layer.title == sitesFinalTitle) {

          if (featureTableTwors.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableTwors.highlightIds.remove(objectId);
          } else {
            featureTableTwors.highlightIds.add(objectId);
            // Add this feature to the featureTableTwors highlightIds collection
          }
        }
        else if (candidate.layer.title == cellsTitle) {


          if (featureTableCells.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableCells.highlightIds.remove(objectId);
          } else {

            featureTableCells.highlightIds.add(objectId);
          }


        }
        else if (candidate.layer.title == cityOffersTitle) {
          if (candidate.graphic.layer.type === "feature") {
            layerViews.forEach((layerView) => {
              if (candidate.graphic.layer.title === layerView.layer.title) {
                handles.add(layerView.highlight(candidate.graphic));
              }
            });
          }
        }
        else if (candidate.layer.title == POSsTitle) {
          if (featureTablePOS.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTablePOS.highlightIds.remove(objectId);
          } else {

            featureTablePOS.highlightIds.add(objectId);

            // Pass point to the showPlaces() function
            showPlaces(candidate.graphic.geometry);
          }
        }
        else if (candidate.layer.title == CCTicketsRFIRFIsFCTitle) {
          if (candidate.graphic.layer.type === "feature") {
            layerViews.forEach((layerView) => {
              if (candidate.graphic.layer.title === layerView.layer.title) {
                handles.add(layerView.highlight(candidate.graphic));
              }
            });
          }
        }

      }
    });

    // Watch the featureTableTwors's highlightIds.length property,
    // and get the count of highlighted features within
    // the table.

    //=============================================== filter widget function ==============================================

    const typeSelect = document.getElementById("type-select");

    typeSelect.addEventListener("change", async () => {
      const value = typeSelect.value;
      
      await cells.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (cells.type === "feature") {
        const layerView = await view.whenLayerView(cells);

        cells.definitionExpression = value.toLowerCase().includes('all')
          ? null
          : `technology = '${value}'`
        featureLayerProductList.definitionExpression = value === "all"
          ? null
          : `Technology = '${value}'`
      }
      // });
    });

    const SearchInputPOSClass = document.getElementById("SearchInputPOSClass");
    SearchInputPOSClass.addEventListener("change", async () => {
      const value = SearchInputPOSClass.value;
      console.log(value);
      // const layer = POSs;
      await POSs.load();
      // Create an array of layerViews to be able to highlight selected features.
      try {
        // Clear existing highlights
        featureTablePOS.highlightIds.removeAll();
    
        const queryParams = {
          where: `POS_Class = '${value}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
    
        // Query features
        const result = await POSs.queryFeatures(queryParams);
        
        // Handle the query result
        result.features.forEach(async(feature) => {
 
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTablePOS.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTablePOS.highlightIds.add(objectId);
            } 
          
        });
      } catch (error) {
        console.error("Error querying features:", error);
      }
    });
    const SearchInputPOSCity = document.getElementById("SearchInputPOSCity");
    SearchInputPOSCity.addEventListener("change", async () => {
      const value = SearchInputPOSCity.value;
      console.log(value);
      // const layer = POSs;
      await POSs.load();

      try {
        // Clear existing highlights
        featureTablePOS.highlightIds.removeAll();
    
        const queryParams = {
          where: `GOVERNORATE = '${value}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
    
        // Query features
        const result = await POSs.queryFeatures(queryParams);
        
        // Handle the query result
        result.features.forEach(async(feature) => {
 
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTablePOS.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTablePOS.highlightIds.add(objectId);
            } 
          
        });
      } catch (error) {
        console.error("Error querying features:", error);
      }
      
    });
    const SearchInputPOSUSERNAME = document.getElementById("SearchInputPOSUSERNAME");
    SearchInputPOSUSERNAME.addEventListener("change", async () => {
      const value = SearchInputPOSUSERNAME.value;
      console.log(value);

      try {
        // Clear existing highlights
        featureTablePOS.highlightIds.removeAll();
    
        const queryParams = {
          where: `USERNAME = '${value}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
    
        // Query features
        const result = await POSs.queryFeatures(queryParams);
        
        // Handle the query result
        result.features.forEach(async(feature) => {
 
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTablePOS.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTablePOS.highlightIds.add(objectId);
            } 
          
        });
      } catch (error) {
        console.error("Error querying features:", error);
      }

    });

    reactiveUtils.watch(
      () => featureTableTwors.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableTwors.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableTwors.filterBySelection();
            }
          }
        });
      }
    );

    reactiveUtils.watch(
      () => featureTablePOS.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTablePOS.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTablePOS.filterBySelection();
            }
          }
        });
      }
    );

    reactiveUtils.watch(
      () => featureTableCells.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableCells.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableCells.filterBySelection();
            }
          }
        });
      }
    );


  })();
});