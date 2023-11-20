frappe.pages['attendance-report'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Employee Daily Attendance Report',
		single_column: true
	});


	// set primary action button
page.set_primary_action("Refresh", () => window.location.reload());

// Fetch data from API endpoint using frappe.call
    frappe.call({
        method: "aate.aate.page.attendance_report.attendance_report.get_details",
        callback: function (response) {
            var data = response.message;
            console.log(data);
            // Render data using frappe_render template
            $(
                frappe.render_template("attendance_report", {
                    data: data,
                })
            ).appendTo(page.body);
        },
    });


}