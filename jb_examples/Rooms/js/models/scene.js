{
	"metadata": {
		"version": 4.4,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "1917430B-15AC-4C92-B6A9-A07B2FDAE79B",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 200,
			"widthSegments": 1,
			"heightSegments": 1
		},
		{
			"uuid": "B33B230F-A874-4831-A6ED-AAA32C429FE5",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 200,
			"widthSegments": 1,
			"heightSegments": 1
		}],
	"materials": [
		{
			"uuid": "D3F2DC67-9755-4FBE-A28E-31318BFDE6B8",
			"type": "MeshPhongMaterial",
			"color": 16777215,
			"emissive": 0,
			"specular": 1118481,
			"shininess": 30,
			"side": 2
		},
		{
			"uuid": "A285C1D0-37E1-4C34-ABC5-0F00B228D3A9",
			"type": "MeshPhongMaterial",
			"color": 63744,
			"emissive": 1852,
			"specular": 1118481,
			"shininess": 30
		}],
	"object": {
		"uuid": "3741222A-BD8F-401C-A5D2-5A907E891896",
		"type": "Scene",
		"name": "Scene",
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "113AC8EC-5D73-406F-96B2-167969F1CAD9",
				"type": "Mesh",
				"name": "Plane 1",
				"receiveShadow": true,
				"matrix": [100,0,0,0,0,0.015926534309983253,-19.9999942779541,0,0,19.9999942779541,0.015926534309983253,0,0,0,1283.8870849609375,1],
				"geometry": "1917430B-15AC-4C92-B6A9-A07B2FDAE79B",
				"material": "D3F2DC67-9755-4FBE-A28E-31318BFDE6B8"
			},
			{
				"uuid": "2F28BFD7-3C89-4601-A9F7-898EC4850CE9",
				"type": "Mesh",
				"name": "Plane 2",
				"castShadow": true,
				"receiveShadow": true,
				"matrix": [100,0,0,0,0,20,0,0,0,0,1,0,0,1668.941650390625,-540.219970703125,1],
				"geometry": "B33B230F-A874-4831-A6ED-AAA32C429FE5",
				"material": "A285C1D0-37E1-4C34-ABC5-0F00B228D3A9"
			},
			{
				"uuid": "416A852C-350F-4EE0-97C1-CC0C39B65540",
				"type": "AmbientLight",
				"name": "AmbientLight 1",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,374.9306640625,0,1],
				"color": 2236962
			},
			{
				"uuid": "D7C2346B-916E-4EB8-B7C5-7D592C75CA65",
				"type": "SpotLight",
				"name": "SpotLight 2",
				"matrix": [0.949384331703186,-0.1013474091887474,0.2973182201385498,0,0.12063704431056976,0.9915732741355896,-0.04721382260322571,0,-0.29002779722213745,0.08069165050983429,0.953610360622406,0,109.42359924316406,513.0485229492188,3334.235107421875,1],
				"color": 16777215,
				"intensity": 1,
				"distance": 0,
				"angle": 0.3141592653589793,
				"decay": 1,
				"exponent": 10
			},
			{
				"uuid": "FA7508C0-0A92-41BF-86C5-85EF3933E845",
				"type": "SpotLight",
				"name": "SpotLight 2",
				"matrix": [0.9501581192016602,-0.10656057298183441,0.29299217462539673,0,0.12422112375497818,0.9913529753684998,-0.04228975251317024,0,-0.28595221042633057,0.07657776772975922,0.9551791548728943,0,5821.5498046875,513.0499877929688,3334.239990234375,1],
				"color": 16756634,
				"intensity": 1,
				"distance": 0,
				"angle": 0.314,
				"decay": 1,
				"exponent": 10
			},
			{
				"uuid": "BF63A4A9-DFB0-48DD-959B-621673ACDA48",
				"type": "SpotLight",
				"name": "SpotLight 2",
				"matrix": [0.9501581192016602,-0.10656057298183441,0.29299217462539673,0,0.12422112375497818,0.9913529753684998,-0.04228975251317024,0,-0.28595221042633057,0.07657776772975922,0.9551791548728943,0,-5996.56982421875,513.0499877929688,3334.239990234375,1],
				"color": 8220416,
				"intensity": 1,
				"distance": 0,
				"angle": 0.314,
				"decay": 1,
				"exponent": 10
			}]
	}
}