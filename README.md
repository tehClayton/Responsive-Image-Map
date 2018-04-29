# You will need:
1. A JSON file containing all of the relative coordinates (in decimal form) for
each map area element you'll want to be resized. ex:
```json
	[
		{"name": "AreaBtn01",
		"cx1": 0.009,
		"cy1": 0.057,
		"cx2": 0.103,
		"cy2": 0.089
	    },

		...

		{"name": "AreaBtn09",
		"cx1": 0.018,
		"cy1": 0.53,
		"cx2": 0.980,
		"cy2": 0.752
		}
	]
```
	
### Note: For tips on getting your relative coordinates, see the 'Getting-Coordinates' file.
2. Each area element will need to have a class name that matches the filename of
the JSON coordinates (without the file extension)
3. Each area element will need to have an id that matches its corresponding object name 
in the JSON file.
4. To specify the filepath where your JSON file is stored.
5. Call functions onload="updateMapCoords('stringFeaturingYourJSONFilename');" and
	onresize="updateMapCoords('stringFeaturingYourJSONFilename');" in your body 	element
