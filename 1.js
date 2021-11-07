const fs = require('fs')

// 耗时 26 分钟
function tournament(input) {
  const data = input.trim().split(/\n/);

  const map = {};
  const handleData = (winName, lossName, draw) => {
    if (!map[winName]) {
      map[winName] = { MP: 0, W: 0, D: 0, L: 0, P: 0 };
    }
    if (!map[lossName]) {
      map[lossName] = { MP: 0, W: 0, D: 0, L: 0, P: 0 };
    }
    if (draw) {
      map[winName].D += 1;
      map[lossName].D += 1;
      map[winName].P += 1;
      map[lossName].P += 1;
    } else {
      map[winName].P += 3;
      map[winName].W += 1;
      map[lossName].L += 1;
    }
    map[winName].MP += 1;
    map[lossName].MP += 1;
  };

  data.forEach((item) => {
    const val = item.split(";").map((v) => v.trim());
    if (val.length !== 3) return;
    const [v0, v1, v2] = val;
    if (!["win", "draw", "loss"].includes(v2)) return;

    switch (val[2]) {
      case "win": {
        handleData(v0, v1, false);
        break;
      }
      case "draw": {
        handleData(v0, v1, true);
        break;
      }
      default: {
        handleData(v1, v0, false);
      }
    }
  });

  const result = Object.keys(map).map((key) => {
      map[key].name = key
      return map[key]
  });
  result.sort((a, b) => b.P - a.P);

  return result;
}

const input = `
  Allegoric Alaskans;Blithering Badgers;win
  Devastating Donkeys;Courageous Californians;draw
  Devastating Donkeys;Allegoric Alaskans;win
  Courageous Californians;Blithering Badgers;loss
  Blithering Badgers;Devastating Donkeys;loss
  Allegoric Alaskans;Courageous Californians;win
  `;

const output = tournament(input);
console.log(output);

let str = `Team                           | MP |  W |  D |  L |  P
`

output.forEach(item => {
    str += `${item.name}${Array.from({ length: 31 - item.name.length }, () => " ").join("")}|  ${item.MP} |  ${item.W} |  ${item.D} |  ${item.L} |  ${item.P}
`
})

fs.writeFileSync('./file.text', str)