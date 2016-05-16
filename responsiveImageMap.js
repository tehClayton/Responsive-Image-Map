

function updateMapCoords(coordsToUpdate){
	//Note: parameter value for coordsToUpdate will need to match the filename that contains the 
	//JSON coordinates (sans file extension), AND each area element to be updated will need to 
	//match this as well
	
	//path where you're storing the JSON file with map area coordinates
	var jsonPath = "../JS/";
	
	//build complete path for coordinates json file
	var jsonFile = jsonPath + coordsToUpdate + ".json";
	//request the file
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	request.open('GET', jsonFile);
	request.onreadystatechange = function() {
		if ((request.readyState===4) && (request.status===200)) {
			var jsonArray = JSON.parse(request.responseText);
			//update coordinates
			calcCoords(jsonArray, coordsToUpdate);
		}
	}
	request.send();
}

function calcCoords(jsonArray, coordsToUpdate){
	
	//Set timer variable to null (suppressing exorbitant resize calculations)
	var t=null;
	//get dimensions of newly resized image map
	var mapWidth = document.getElementById('mapImage').offsetWidth;
	var mapHeight = document.getElementById('mapImage').offsetHeight;
	
	//Collect array of element IDs to be re-oriented
	var areaButtons = document.getElementsByClassName(coordsToUpdate);
	
	if (t!= null) clearTimeout(t);
	t = setTimeout(function() {
		var newCoords = "";
		
		//for each area button element
		for(i= 0; i < areaButtons.length; i++) {
			//calculate new coordinates and create new coordinate string
			newCoords = (jsonArray[i].cx1 * mapWidth) + "," + (jsonArray[i].cy1 * mapHeight) + "," +
							(jsonArray[i].cx2 * mapWidth) + "," + (jsonArray[i].cy2 * mapHeight);
			
			//set new coordinate string
			if(jsonArray[i].name=areaButtons[i].id){
				document.getElementById(areaButtons[i].id).coords=newCoords;
			}
		}
	   }, 500);
};
