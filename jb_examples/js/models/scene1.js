{
	"metadata": {
		"version": 4.4,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "1AEF53BB-2F94-419F-BA78-D66231267A3C",
			"type": "BoxGeometry",
			"width": 100,
			"height": 100,
			"depth": 100,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "C9648E33-464A-48E7-8FBC-D072145E9778",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 200,
			"widthSegments": 1,
			"heightSegments": 1
		},
		{
			"uuid": "DB2DCDCF-F3F4-46C2-9384-C9062CA222F0",
			"type": "PlaneGeometry",
			"width": 200,
			"height": 200,
			"widthSegments": 1,
			"heightSegments": 1
		}],
	"materials": [
		{
			"uuid": "F6601CE2-76AC-485C-9757-8739E41AA753",
			"type": "MeshPhongMaterial",
			"color": 16777215,
			"emissive": 9501235,
			"specular": 7171437,
			"shininess": 30
		},
		{
			"uuid": "1CEFE440-099D-4267-8D60-DEA7087F0956",
			"type": "MeshPhongMaterial",
			"color": 339771,
			"emissive": 0,
			"specular": 1118481,
			"shininess": 30
		},
		{
			"uuid": "2352957B-BF2A-4FC0-A2C9-F612F6BDEE30",
			"type": "MeshPhongMaterial",
			"color": 16777215,
			"emissive": 0,
			"specular": 1118481,
			"shininess": 30
		}],
	"object": {
		"uuid": "FF11DC45-2634-477D-8BA1-65BC276505CA",
		"type": "Scene",
		"name": "Scene",
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "75376C34-EEE6-46C5-A1ED-14DBD9E2F144",
				"type": "Mesh",
				"name": "Box 1",
				"castShadow": true,
				"receiveShadow": true,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-64.22000122070312,39.7400016784668,0,1],
				"geometry": "1AEF53BB-2F94-419F-BA78-D66231267A3C",
				"material": "F6601CE2-76AC-485C-9757-8739E41AA753"
			},
			{
				"uuid": "39CC06AC-696E-4AA4-8D8A-8C63BBC3D6E8",
				"type": "SpotLight",
				"name": "SpotLight 1",
				"castShadow": true,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-254.55999755859375,234.72000122070312,172.75999450683594,1],
				"color": 16777215,
				"intensity": 0.88,
				"distance": 0,
				"angle": 0.314,
				"decay": 1,
				"exponent": 10
			},
			{
				"uuid": "FB0765A7-0DCE-48D7-A9B4-08E97780A40A",
				"type": "PointLight",
				"name": "PointLight 2",
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,25.219999313354492,0,46.21208572387695,1],
				"color": 5888511,
				"intensity": 1,
				"distance": 0,
				"decay": 1
			},
			{
				"uuid": "BDB341D6-64FE-46F6-A6E9-C821C2001570",
				"type": "Mesh",
				"name": "Plane 2",
				"receiveShadow": true,
				"matrix": [4.699999809265137,0,0,0,0,0.05074187368154526,-4.699726104736328,0,0,4.699726104736328,0.05074187368154526,0,9.930000305175781,-16.299999237060547,-2.700000047683716,1],
				"geometry": "C9648E33-464A-48E7-8FBC-D072145E9778",
				"material": "1CEFE440-099D-4267-8D60-DEA7087F0956"
			},
			{
				"uuid": "F07A14E0-7D09-4166-9625-689E33CA9116",
				"type": "Mesh",
				"name": "Plane 3",
				"castShadow": true,
				"receiveShadow": true,
				"matrix": [0.05743534117937088,0,5.319689750671387,0,0,1.7799999713897705,0,0,-0.9999417066574097,0,0.010796116665005684,0,491.0299987792969,125.30000305175781,-49.880001068115234,1],
				"geometry": "DB2DCDCF-F3F4-46C2-9384-C9062CA222F0",
				"material": "2352957B-BF2A-4FC0-A2C9-F612F6BDEE30"
			},
			{
				"uuid": "5F358690-9400-4E53-A870-E87D4DFFD6A2",
				"type": "Mesh",
				"name": "Plane 3",
				"castShadow": true,
				"receiveShadow": true,
				"matrix": [5.320000171661377,0,0,0,0,1.7799999713897705,0,0,0,0,1,0,0,125.30000305175781,-450.8299865722656,1],
				"geometry": "DB2DCDCF-F3F4-46C2-9384-C9062CA222F0",
				"material": "2352957B-BF2A-4FC0-A2C9-F612F6BDEE30"
			},
			{
				"uuid": "DF192721-A9C5-481F-93B7-1584C47EFC21",
				"type": "SpotLight",
				"name": "SpotLight 5",
				"castShadow": true,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-817.0900268554688,-82.68258666992188,670.3099975585938,1],
				"color": 7694741,
				"intensity": 1,
				"distance": 0,
				"angle": 0.414,
				"decay": 1,
				"exponent": 10
			}]
	}
}