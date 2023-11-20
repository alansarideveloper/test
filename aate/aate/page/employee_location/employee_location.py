import frappe


@frappe.whitelist()
def emploc():
    loc = frappe.db.sql(
        """SELECT ec.employee, ec.employee_name, ec.device_id, ec.time, e.department, e.payroll_cost_center, f.file_url
           FROM `tabEmployee Checkin` ec
           INNER JOIN `tabEmployee` e ON ec.employee = e.name
           LEFT JOIN `tabFile` f ON f.attached_to_name = e.user_id AND (f.file_url LIKE '%.png' OR f.file_url LIKE '%.jpg') AND f.attached_to_field = 'user_image'
           WHERE ec.log_type = 'IN';""", as_dict=True)

    for entry in loc:
        device_id = entry.get('device_id', '')
        if device_id:
            # Check if there is a space after the comma
            if ', ' in device_id:
                # Split the device_id by a comma and space
                latitude, longitude = device_id.split(', ')
            else:
                # Split the device_id by a comma (no space)
                latitude, longitude = device_id.split(',')

            entry['latitude'] = latitude
            entry['longitude'] = longitude
            del entry['device_id']

    return loc