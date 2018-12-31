function get_color(s, height, temperature, slope)
{
    // if (height == 0) // empty (test) ?
    // {
    //     return "hsl(0,0%,0%)";
    // }
    // var returncolor = "hsl(" + height * 2 + ", 100%, 50%)";
    // return returncolor;
    var waterLevel = s.waterLevel;
    var sandLevel = s.sandLevel;
    var lightness = height / 2;
    
    if (height < waterLevel) // water?
    {
        // height -= waterLevel;
        if (height > waterLevel - 1)
        {
            lightness = 90 + 30 * slope;
            return "hsl(200,100%," + lightness + "%)";
        }
        if (height > waterLevel - 10)
        {
            var hue = 170 - 3 * (height - waterLevel);
            lightness += 3 * slope;
            return "hsl(" + hue + ",100%," + lightness + "%)";
        }
        lightness = height / 2;
        return "hsl(200,100%," + lightness + "%)";
    }
    if (height < sandLevel) // sand?
    {
        if (temperature < 0) // dirt
        {
            // lightness = 50 - Math.abs(slope) * 20;
            // return "hsl(16,24%," + lightness + "%)";
        }
        else
        {
            lightness = slope * 10 + 80 ;
            return "hsl(36,30%," + lightness + "%)";
        }
    }
    // if (height < sandLevel) // dirt?
    // {
    //  lightness = slope * 10 + 55 ;
    //  return "hsl(16,24%," + lightness + "%)";
    // }
    if (temperature < -130) // snow?
    {
        lightness = slope * 60 + 200;
        return "hsl(0,0%," + lightness / 4 + "%)";
    }
    if (temperature < -10) // forest
    {
        lightness = slope * 15 / 5 + 25;
        var hue = 120 - 0.2 * temperature;
        var saturation = 50 + 0.5 * temperature;
        return "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    }
    if (temperature < 10) // transition from forest --> grass
    {
        lightness = slope * 15 / 5 + 25 + 10 + temperature;
        var saturation = 45 - 0.5 * temperature;
        var hue = 110 - 2 * temperature;
        return "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
    }
    var hue = 80 - 0.2 * temperature;
    lightness = slope * 15 / 4 + 48 ;
    return "hsl(" + hue + ",40%," + lightness + "%)";
}

function drawRender(s, map, temperatureMap, type)
{
    var size = s.Size;
    var detail = s.detail;
    console.log(size);
    console.log(detail);
    var mapSize = Math.pow(2, size) + 1;
    var canvas = document.getElementById(type); 
    var ctx = canvas.getContext("2d");
    var lightness = 0;
    var dM = Math.pow(2, -1 * size + 8) // detail Modifier
    var sM = dM * 2; // slope modifier
    var windowHeight = canvas.height;
    var waterLevel = s.waterLevel

    if (type == "render")
    {
        var width = canvas.width;
        dM = width * Math.pow(2, -1 * size)
        ctx.fillStyle = "#d1e2ff";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    if (type == "map")
    {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 256, 256);
    }
    var scale = Math.pow(2, detail - size + 9);

    for (var y = 1; y < mapSize - 1; y++) 
    {
        for (var x = 1; x < mapSize - 1; x++) 
        {
            var height = map[y][x];
            var temperature = temperatureMap[y][x] - height + waterLevel;
            var xslope = map[y][x + 1] + map[y + 1][x + 1] + 
                         map[y - 1][x + 1] - 3 * map[y][x];
            xslope /= sM;
            ctx.fillStyle = get_color(s, height, temperature, xslope);

            i = x * dM;
            j = y * dM;

            if (type == "map")
            {
                ctx.fillRect(i, j, dM + 1, dM + 1);
            }
            else if (type == "render")
            {
                if (height < waterLevel)
                {
                    height = waterLevel;
                }
                ctx.fillRect(1 * (i + j) / 2, 1 * (j - i) / 4 + canvas.height * 0.56 - 
                            (height - waterLevel) * scale, dM + 1, dM + 10);
            }
        }
    }
}