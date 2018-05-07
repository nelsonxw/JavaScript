// Get references to DOM elements
var $thead = document.querySelector("thead");
var $tbody = document.querySelector("tbody");
var $date_search = document.querySelector("#search_date");
var $city_search = document.querySelector("#search_city");
var $state_search = document.querySelector("#search_state");
var $country_filter = document.querySelector("#filter_country");
var $shape_filter = document.querySelector("#filter_shape");
var $ul = document.querySelector("#row-pagination");

/*set initial values for starting page number, page number selected and max number of records per page*/
var page_limit = 25;
var page_num = 1;
var start_page = 1;

/*Start the table body with a blank HTML*/
$tbody.innerHTML = "";

/*initiate and import data*/
var filtered_data = ufo_data;
table_update();

/*define a function to populate table*/
function table_update() {
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

/*define a function to show selected rows of data*/
function showRows() {
	/*Initially hide all rows in the table*/
	var $rows = document.querySelectorAll("tbody tr");
	$rows.forEach(function(element) {
		element.style.display = "none";
	});

	/*display rows based on page limit and page number currently selected*/
	if (filtered_data.length < page_limit) {
		for (var r = 0; r < filtered_data.length; r++) {
		$rows[r].style.display = "";
		};
	} else if (filtered_data.length >= page_num * page_limit) {
		for (var r = (page_num -1) * page_limit; r < page_num * page_limit; r++) {
		$rows[r].style.display = "";
		};
	} else {
		for (var r = (page_num -1) * page_limit; r < (page_num -1) * page_limit + filtered_data.length % page_limit; r++) {
		$rows[r].style.display = "";
		};
	};
}

/*define a function to determine how many pages show up for selection in the pagination navigation section*/
function pagination () {
	/*clear the pagination section*/
	$ul.innerHTML = "";
	/*determine the total number of pages (end page) to show*/
	if (filtered_data.length % page_limit == 0) {
		var end_page = filtered_data.length/page_limit;
	} else {
		end_page = Math.floor(filtered_data.length/page_limit) + 1;
	};
	/*determine how many pages to be available for selection and when previous and next buttons are available*/
	if (start_page + 9 < filtered_data.length/page_limit) {
		if (start_page == 1) {
			for (var p = start_page; p <= start_page + 9; p++) {
			addPage(p);
			};
			addPage("Next");
		} else {
			addPage("Previous");

			for (var p = start_page; p <= start_page + 9; p++) {
				addPage(p);
			};
			addPage("Next");
		}
	} else {
		if (start_page == 1 && end_page == 1) {
			return pass
		} else if (start_page == 1 && end_page != 1) {
			for (var p = start_page; p <= end_page; p++) {
				addPage(p);
				};	
			} else {
				addPage("Previous");
				for (var p = start_page; p <= end_page; p++) {
					addPage(p);
				};
			}
	};
	/*update to show which page is currently selected*/
	activePage();
}

/*define a function to insert list and page IDs under pagination navigation section*/
function addPage(Pnumber) {
	
	var $li = document.createElement("li");
	var $a = document.createElement("a");
	$a.innerText = Pnumber;
	$a.setAttribute("href", "#");
	$a.classList.add("page-link")
	$li.id = "page-" + Pnumber;
	$li.classList.add("page-item")
	$li.appendChild($a);
	$ul.appendChild($li);
}

/*define a function to indicate which page is the currently selected page*/
function activePage() {
	var $active_li = document.querySelector(`#page-${page_num}`);
	$active_li.classList.add("active");
}

/*extract unique list of countries and shapes from dataset for use in filters*/
var country_list = ufo_data.map(element => element.country).filter(Unique_list);
var shape_list = ufo_data.map(element => element.shape).filter(Unique_list);

/*define a function to return unique values from list*/
function Unique_list(value, index, self) { 
    return self.indexOf(value) === index;
}

/*add country list to filter selections*/
for (var country_count = 0; country_count < country_list.length; country_count++) {
	var $option_country = document.createElement("option");
	$option_country.value = country_list[country_count];
	$option_country.innerHTML = country_list[country_count];
	$country_filter.appendChild($option_country);
};
/*add shape list to filter selections*/
for (var shape_count = 0; shape_count < shape_list.length; shape_count++) {
	var $option_shape = document.createElement("option");
	$option_shape.value = shape_list[shape_count];
	$option_shape.innerHTML = shape_list[shape_count];
	$shape_filter.appendChild($option_shape);
}

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

/*define a function to update user selected page number and start page when Previous or Next buttons are clicked*/
function clickPage(input) {
	page_num = input.target.innerHTML;
	if (page_num == "Next") {
		start_page += 10;
		page_num = start_page;
	} else if (page_num == "Previous") {
		start_page = Math.max(1,start_page - 10)
		page_num = start_page;
	};
	/*refresh pagination navigation section and rows to display*/
	showRows();
	pagination ();
}

/*define a function to update the max number of records displayed on the screen per user selection*/
function changeLimit(input) {
	page_limit = input;
	start_page = 1;
	page_num = start_page;
	/*refresh pagination navigation section and rows to display*/
	showRows();
	pagination ();
}
 
