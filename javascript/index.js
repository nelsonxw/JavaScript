// Get references to the thead and tbody element, input field and button
var $thead = document.querySelector("thead");
var $tbody = document.querySelector("tbody");
var $date_search = document.querySelector("#search_date");
var $city_search = document.querySelector("#search_city");
var $state_search = document.querySelector("#search_state");
var $country_filter = document.querySelector("#filter_country");
var $shape_filter = document.querySelector("#filter_shape");
var $ul = document.querySelector("#row-pagination");
var filtered_data = ufo_data;
var page_limit = 25;
var page_num = 1;


var country_list = ufo_data.map(element => element.country).filter(Unique_list);
var shape_list = ufo_data.map(element => element.shape).filter(Unique_list);

function Unique_list(value, index, self) { 
    return self.indexOf(value) === index;
}

for (var country_count = 0; country_count < country_list.length; country_count++) {
	var $option_country = document.createElement("option");
	$option_country.value = country_list[country_count];
	$option_country.innerHTML = country_list[country_count];
	$country_filter.appendChild($option_country);
};

for (var shape_count = 0; shape_count < shape_list.length; shape_count++) {
	var $option_shape = document.createElement("option");
	$option_shape.value = shape_list[shape_count];
	$option_shape.innerHTML = shape_list[shape_count];
	$shape_filter.appendChild($option_shape);
};

// Start the table head and body with a blank HTML
$thead.innerHTML = "";
$tbody.innerHTML = "";

// Add table headers
header_list = ['Date','City','State','Country','Shape','Duration','Comments']
var $header_row = $thead.insertRow(0);
$header_row.id	 = "header-row";
for (var h = 0; h < 7; h++) {
	var $cell = $header_row.insertCell(h).outerHTML = `<th> ${header_list[h]} </th>`;
}


table_update(filtered_data,page_num);

function table_update(data,page_num) {
	// Add table: the outer loop fills the rows and the inner loop fills the cells for each row

	for (var i = 0; i < data.length; i++) {
  // Insert a row into the table at position i
	  var $body_row = $tbody.insertRow(i);
	  // Insert five cells into the newly created row
	  for (var j = 0; j < 7; j++) {
	    var $cell = $body_row.insertCell(j);
	    $cell.innerText = Object.values(data[i])[j];
	  };
	};

	var $rows = document.querySelectorAll("tbody tr");
	/*console.log($rows);*/
	$rows.forEach(function(element) {
		element.style.display = "none";
	});

	for (var r = 0; r < page_limit; r++) {
		$rows[r].style.display = "";
	};

	pagination(data,page_num);
};


function Fn_search(event) {	
	var date_filter,city_filter,state_filter,country_filter;
	event.preventDefault();	
	date_filter = search_date.value;
	city_filter = search_city.value;
	state_filter = search_state.value;
	country_filter = filter_country.value;
	shape_filter = filter_shape.value;
	$tbody.innerHTML = "";
	filtered_data = ufo_data;
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
	
	table_update(filtered_data);

	
};

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
};

function selectedPage(input) {
	page_num = input.target.innerHTML;
	pagination (filtered_data,page_num);
};

function pagination (data,page_num) {
	
	$ul.innerHTML = "";
	if (data.length > page_limit) {
			if (Math.floor(data.length/page_limit) > 10) {
			addPage("Previous");
			for (var p=1; p <= 10; p++) {
				addPage(p);
			};
			addPage("Next");
			activePage(page_num);
		} else if (data.length % page_limit == 0) {
			for (var p=1; p <= data.length/page_limit; p++) {
				addPage(p);
			};
			activePage(page_num);
		} else {
				for (var p=1; p <= data.length/page_limit + 1; p++) {
					addPage(p);
				};
			activePage(page_num);	
			};
	};	
};



function activePage(page_num) {
	var $active_li = document.querySelector(`#page-${page_num}`);
	$active_li.classList.add("active");
};
