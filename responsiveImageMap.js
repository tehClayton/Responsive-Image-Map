{\rtf1\ansi\ansicpg1252\cocoartf1404\cocoasubrtf460
{\fonttbl\f0\fnil\fcharset0 Monaco;}
{\colortbl;\red255\green255\blue255;\red127\green0\blue85;\red63\green127\blue95;\red42\green0\blue255;
}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs22 \cf2 function\cf0  updateMapCoords(coordsToUpdate)\{\
	\cf3 //Note: parameter value for coordsToUpdate will need to match the filename that contains the \cf0 \
	\cf3 //JSON coordinates (\ul sans\ulnone  file extension), AND each area element to be updated will need to \cf0 \
	\cf3 //match this as well\cf0 \
	\
	\cf3 //path where you're storing the JSON file with map area coordinates\cf0 \
	\cf2 var\cf0  jsonPath = \cf4 "../JS/"\cf0 ;\
	\
	\cf3 //build complete path for coordinates \ul json\ulnone  file\cf0 \
	\cf2 var\cf0  jsonFile = jsonPath + coordsToUpdate + \cf4 ".json"\cf0 ;\
	\cf3 //request the file\cf0 \
	\cf2 var\cf0  request;\
	\cf2 if\cf0  (window.XMLHttpRequest) \{\
		request = \cf2 new\cf0  XMLHttpRequest();\
	\} \cf2 else\cf0  \{\
		request = \cf2 new\cf0  ActiveXObject(\cf4 "Microsoft.XMLHTTP"\cf0 );\
	\}\
	request.open(\cf4 'GET'\cf0 , jsonFile);\
	request.onreadystatechange = \cf2 function\cf0 () \{\
		\cf2 if\cf0  ((request.readyState===4) && (request.status===200)) \{\
			\cf2 var\cf0  jsonArray = JSON.parse(request.responseText);\
			\cf3 //update coordinates\cf0 \
			calcCoords(jsonArray, coordsToUpdate);\
		\}\
	\}\
	request.send();\
\}\
\
\cf2 function\cf0  calcCoords(jsonArray, coordsToUpdate)\{\
	\
	\cf3 //Set timer variable to null (suppressing exorbitant resize calculations)\cf0 \
	\cf2 var\cf0  t=\cf2 null\cf0 ;\
	\cf3 //get dimensions of newly resized image map\cf0 \
	\cf2 var\cf0  mapWidth = document.getElementById(\cf4 'mapImage'\cf0 ).offsetWidth;\
	\cf2 var\cf0  mapHeight = document.getElementById(\cf4 'mapImage'\cf0 ).offsetHeight;\
	\
	\cf3 //Collect array of element IDs to be re-oriented\cf0 \
	\cf2 var\cf0  areaButtons = document.getElementsByClassName(coordsToUpdate);\
	\
	\cf2 if\cf0  (t!= \cf2 null\cf0 ) clearTimeout(t);\
	t = setTimeout(\cf2 function\cf0 () \{\
		\cf2 var\cf0  newCoords = \cf4 ""\cf0 ;\
		\
		\cf3 //for each area button element\cf0 \
		\cf2 for\cf0 (i= 0; i < areaButtons.length; i++) \{\
			\cf3 //calculate new coordinates and create new coordinate string\cf0 \
			newCoords = (jsonArray[i].cx1 * mapWidth) + \cf4 ","\cf0  + (jsonArray[i].cy1 * mapHeight) + \cf4 ","\cf0  +\
							(jsonArray[i].cx2 * mapWidth) + \cf4 ","\cf0  + (jsonArray[i].cy2 * mapHeight);\
			\
			\cf3 //set new coordinate string\cf0 \
			\cf2 if\cf0 (jsonArray[i].name=areaButtons[i].id)\{\
				document.getElementById(areaButtons[i].id).coords=newCoords;\
			\}\
		\}\
	   \}, 500);\
\};}