var heightMap, temperatureMap, s;

function settings (roughness, power, waterLevel, inputStretch, inputDetail, sandLevel, inputSize)
{
	this.roughness = roughness;
	this.power = power;
	this.waterLevel = waterLevel;
	this.stretch = inputStretch;
	this.detail = inputDetail;
	this.sandLevel = sandLevel;
	this.Size = inputSize + inputDetail;
}

function initCanvas() 
{
	var canvas = document.getElementById("render");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#d1e2ff";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

function random(max)
{
	// returns a number from -max to max
	return (Math.random()) * max * 2 - max;
}

function improveDetail(s, map, times)
{
	if (times == 1)
	{
		var mapWidth = map.length; // 513
		var newMap = [];

	    var tempEmptyArray = [];
	    for (var x = 0; x < mapWidth * 2 - 1; x++) 
		{
			tempEmptyArray.push(0);
		}

		for (var y = 0; y < mapWidth; y++) {
			var temparray = []
			for (var x = 0; x < mapWidth; x++) 
			{
				temparray.push(map[y][x]);
				temparray.push(0);
			}
			temparray.pop();
			newMap.push(temparray);
			newMap.push(tempEmptyArray);
		}
		newMap.pop();

		var step = 2;
		var iter = (mapWidth - 1);
		newMap = diamondStep(s, newMap, step, iter);
		// newMap = squareStep(s, newMap, step, iter);

		return newMap;
	}
	return improveDetail(map, times - 1)
}

function stretchTerrain(s, map)
{
	var size = s.Size;
	var factor = s.stretch;
	var offset = s.waterLevel;
	for (var i = 0; i < Math.pow(2,size) + 1; i ++)
	{
		for (var j = 0; j < Math.pow(2,size) + 1; j++)
		{
			var normalized = map[i][j] - offset;
			normalized *= factor;
			map[i][j] = normalized + offset;
		}
	}
	return map;
}

// fix
function initSequence()
{
	initCanvas();

    var inputSize = parseInt(document.getElementById("inputSize").value);
	var roughness = parseFloat(document.getElementById("inputRoughness").value);
	roughness *= Math.pow(2, 9 - inputSize);
	var power = parseFloat(document.getElementById("inputPower").value);
	var inputStretch = parseFloat(document.getElementById("inputStretch").value);
	var waterLevel = parseInt(document.getElementById("waterLevel").value);
	var sandLevel = waterLevel + 1.5;
	var inputDetail = parseInt(document.getElementById("inputDetail").value);

	var seed1 = parseInt(document.getElementById("seed1").value);
	var seed2 = parseInt(document.getElementById("seed2").value);
	var seed3 = parseInt(document.getElementById("seed3").value);
	var seed4 = parseInt(document.getElementById("seed4").value);
    var seed = [seed1, seed2, seed3, seed4];

    s = new settings(roughness, power, waterLevel, inputStretch, inputDetail, sandLevel, inputSize);
    var temperature_s = new settings(roughness, power, 0, 3, inputDetail, sandLevel, inputSize);

    temperature_s.roughness *= 2;
    temperature_s.power *= 0.4;

	heightMap = genDSTerrain(s, seed);
	heightMap = stretchTerrain(s, heightMap);

	temperatureMap = genDSTerrain(temperature_s, [0, 0, 0, 0]);
    temperatureMap = stretchTerrain(temperature_s, temperatureMap);

	drawRender(s, heightMap, temperatureMap, "map");
	drawRender(s, heightMap, temperatureMap, "render");

	console.log(heightMap);
}

function increaseResolutionSequence()
{
	s.stretch = 1 / s.stretch;
	heightMap = stretchTerrain(s, heightMap);
	console.log(heightMap);
	s.detail = s.detail + 1;
	s.Size = s.Size + 1; 
	s.roughness /= 2;
	heightMap = improveDetail(s, heightMap, 1, inputDetail);
	console.log(heightMap);
	// s.stretch = 1 / s.stretch;
	// heightMap = stretchTerrain(s, heightMap);
	// console.log(heightMap);

	temperatureMap = improveDetail(s, temperatureMap, 1, inputDetail);
    drawRender(s, heightMap, temperatureMap, "map");
	drawRender(s, heightMap, temperatureMap, "render");
}

window.onload = initSequence;
