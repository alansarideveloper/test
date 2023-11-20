frappe.pages["employee-location"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "Location Of all employees",
    single_column: true,
  });

  page.set_title("Employee Location");
  page.set_indicator("Loading Data", "orange");
  page.set_primary_action("Refresh", () => window.location.reload());

  // This will add a div element with map id to the body of the page
  $(
    '<div style="width: 100%; height: 850px; border-radius:10px; border: 5px ridge black; overflow: hidden;"><div id="map" style="z-index:1;width: 100%; height: 100%;"></div></div>'
  ).appendTo(page.body);
  frappe.call({
    method: "aate.aate.page.employee_location.employee_location.emploc",
    callback: function (r) {
      if (r.message) {
        page.set_indicator("Ready", "blue");
        var data = r.message;

        // Create a Leaflet map
        var map = L.map("map").setView(["23.591455", "58.556559"], 10); // Set default center and zoom level

        L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
        ).addTo(map);

        // Loop through the employee location data and create markers
        for (var i = 0; i < data.length; i++) {
          var employee = data[i].employee;
          var time = data[i].time;
          var date = time.split(" ")[0];
          var timeOnly = time.split(" ")[1];
          var employee_name = data[i].employee_name;
          var dp = data[i].file_url;
          var department = data[i].department;
          var payroll_cost_center = data[i].payroll_cost_center;
          var latitude = data[i].latitude;
          var longitude = data[i].longitude;

          var popupContent = `<div style="height:200px;width:320px;font-size:16;font-family:Cambria;">
			<div style="align-items:center;">
		  <div style="height:120px;width:120px;float:right;line-height:1;">
		<p style="text-align:center;font-weight:bold;">EMPLOYEE<br> PICTURE</p> 
		<img src="${dp}" style="max-height: 100%; max-width: 100%; margin: 0px ; padding: 0 px;"><br>
	</div>
		</div> 
		<div style="float:left;position:absolute;width:192px;text-align:left;">
		<strong>Time :</strong> ${timeOnly}<br>
		<strong>DATE :</strong> ${date}<br>
		<strong>ID :</strong> ${employee}<br>
		<strong>EMPLOYEE NAME : </strong><br>${employee_name}<br>
		<strong>DEPARTMENT :</strong><br> ${department}<br>
		<strong>PAYROLL COST CENTER :</strong><br> ${payroll_cost_center}<br>
		<!--Latitude : ${latitude}<br>
		Longitude : ${longitude} -->
		</div>
</div>`;

          // Display employee name when clicking the marker
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(popupContent)
            .openPopup();
        }
      }
    },
  });
};
