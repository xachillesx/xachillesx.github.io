function addRandom(s, height, step)
{
    // if (step > Math.pow(2, 9))
    // {
    //     return height;
    // }
    var multiplier = s.roughness;
    var power = s.power;
    var detail = s.detail;
    var waterLevel = s.waterLevel;
    var heightModifier = Math.abs(height - waterLevel) / 80 + 1;
    var detailModifier = Math.pow(2, -1 * detail);
    var allModifiers = Math.pow(step * detailModifier, power);
    allModifiers *= heightModifier;
    return height + random(multiplier) * allModifiers;
}

function set_newHeight(s, map, step, i, j, n, loc)
{
    var newHeight = 0
    for (var k = 0; k < n.length; k++)
    {
        newHeight += map[step * (i + n[k][0])][step * (j + n[k][1])];
        if (i + j == 0)
        {
            console.log(map[step * (i + n[k][0])][step * (j + n[k][1])])
        }
    }
    newHeight = addRandom(s, newHeight / n.length, step);
    if (i + j == 0)
    {
        console.log(newHeight)
    }
    map[step * (i + loc[0])][step * (j + loc[1])] = newHeight;
    return map;
}

function diamondStep(s, map, step, iter)
{
    for (var i = 0; i < iter; i++)
    {
        for (var j = 0; j < iter; j++)
        {
            var points = [[0, 0], [0, 1], [1, 0], [1, 1]];
            map = set_newHeight(s, map, step, i, j, points, [1/2, 1/2]);
        }
    }
    return map;
}

function squareStep(s, map, step, iter)
{
    var points;
    for (var i = 0; i < iter; i++)
    {
        for (var j = 0; j < iter; j++)
        {   
            points = [[0, 0], [1, 0], [1/2, 1/2]];
            if (j > 0)
            {
                points.push([1/2, -1/2])
            }
            map = set_newHeight(s, map, step, i, j, points, [1/2, 0])
            points = [[0, 0], [0, 1], [1/2, 1/2]];
            if (i > 0)
            {
                points.push([-1/2, 1/2])
            }
            map = set_newHeight(s, map, step, i, j, points, [0, 1/2])
        }
        var j = iter;
        points = [[0, 0], [1, 0], [1/2, -1/2]]
        map = set_newHeight(s, map, step, i, j, points, [1/2, 0])
    }
    var i = iter; 
    for (var j = 0; j < iter; j++)
    {
        points = [[0, 0], [0, 1], [-1/2, 1/2]]
        set_newHeight(s, map, step, i, j, points, [0, 1/2])
    }
    return map;
}

function genDSTerrain(s, seed)
{
    var map = [];
    var size = s.Size;
    var mapWidth = Math.pow(2,size) + 1;
    for (var y = 0; y < mapWidth; y++) {
        var temparray = []
        for (var x = 0; x < mapWidth; x++) 
        {
            temparray[x] = 0;
        }
        map[y] = temparray;
    }
    
    // seed

    map[0][0] = seed[0];
    map[0][mapWidth - 1] = seed[1];
    map[mapWidth - 1][0] = seed[2];
    map[mapWidth - 1][mapWidth - 1] = seed[3];

    for (var i = 0; i < size; i++)
    {
        var step = Math.pow(2,size - i);
        var iter = Math.pow(2,i);
        map = diamondStep(s, map, step, iter);
        map = squareStep(s, map, step, iter);
    }

    return map;
}