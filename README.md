## AATE

Al Ansari Trading Enterprise

#### License

MIT
### How to implement Employee Location & Employee Attendance in Erpnext :

### > Go To Client Side Script List in Erpnext

### > Create New Client Side Script

### > Doctype = Employee Checkin

### > Apply To = List

### > Then Check The Enable Button

### > In the Script Section Paste This Code

```
frappe.listview_settings['Employee Checkin'] = {
    onload: function(listview) {
        listview.page.set_secondary_action('View Location', function() {
            frappe.set_route("form","employee-location");
        });
    }
};

```

### > This will make a Button In The Employee Checkin List View that will Redirect to the Employee Location page

### > After That you can install the `aate` app and it will show you the location.

### For The Employee Attendance No prerequisities are required.
