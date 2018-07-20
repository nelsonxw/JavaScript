# UFO Sightings Data Search

Link to web application: https://nelsonxw.github.io/UFO-Sightings/  
<img src="/images/Capture.PNG" width="800">  

### Objectives:
+ Create a web page where a dynamic table is created to show reports of UFO witnesses.
+ Allows users to search and filter data in the table.
+ Allows users to select how many records to display on each page.
+ Create a pagination functions on the web site to handle page changes.

### Tools used:
HTML, CSS, JavaScript, Bootstrap, GitHub

### Major Steps:
+ Used HTML, CSS and Bootstrap to build the index page.
    + Created carousel section
    + Created filter and search section
    + Created page navigation section
    + Created table section
+ Used JavaScript to read in data
+ Used a for loop to insert a table to the table section on the index page
```javascript
/*define a function to populate table*/
function table_update() {
	/*clear the table body*/
	$tbody.innerHTML = "";	
	/*the outer loop fills the rows and the inner loop fills the cells for each row*/
	for (var i = 0; i < filtered_data.length; i++) {
	  var $body_row = $tbody.insertRow(i);
	  for (var j = 0; j < 7; j++) {
	    var $cell = $body_row.insertCell(j);
	    $cell.innerText = Object.values(filtered_data[i])[j];
	  };
	};
	/*refresh pagination navigation section and rows to display*/
	showRows();
	pagination();
}
```
+ Created a search event function which will be called when user enter data for search or filter
```javascript
/*define a function to search and filter data based on user entry and selections*/
function Fn_search(event) {	
	var date_filter,city_filter,state_filter,country_filter;
	event.preventDefault();	
	/*capture user inputs*/
	date_filter = search_date.value;
	city_filter = search_city.value;
	state_filter = search_state.value;
	country_filter = filter_country.value;
	shape_filter = filter_shape.value;
	/*clear table body before refreshing the table*/
	$tbody.innerHTML = "";
	/*reset start page and page number selected to default*/
	start_page = 1;
	page_num = 1;
	/*re-initate the data*/
	filtered_data = ufo_data;
	/*apply filter and search to the data*/
	if (date_filter) {
		filtered_data = filtered_data.filter(element => element.datetime == date_filter);
	};	
	if (city_filter) {
		filtered_data = filtered_data.filter(element => element.city == city_filter);
	};
	if (state_filter) {
		filtered_data = filtered_data.filter(element => element.state == state_filter);
	};
	if (country_filter !="all") {
		filtered_data = filtered_data.filter(element => element.country == country_filter);
	};
	if (shape_filter !="all") {
		filtered_data = filtered_data.filter(element => element.shape == shape_filter);
	};
	/*if search returns no result, display not found message*/
	if (filtered_data.length == 0) {
		var $body_row = $tbody.insertRow(0);
		var $cell = $body_row.insertCell(0);
		$cell.innerText = "No result found."
		$cell.colSpan = 2;
		$ul.innerHTML = "";

	} else {
		/*refresh table*/
		table_update();
	};
}
``` 
Click this [link](/javascript/index.js) to check out all JavaScript codes.
