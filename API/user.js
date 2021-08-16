const axios = require('axios');
const {userToken} = require('../DB/models');

const apiDatas = {
  '0x5b5b404193600bce0580e945d723c30f02321c4e' : [],
  '0xa338e75cf75e64cc21017b87a142c352fa272e3d' : [],
  '0x73923fcc41c10754302bbd0363c35e1bf556c11f' : [],
  '0x6cd6e8deda6ed735cab353b6b0dcf1708dcf4b96' : [],
}

async function main(csv) {
  for(let token in apiDatas) {
    apiDatas[token] = [];
  }

  const data = csv_json(csv);
  await getApiDatas();
  const userMap = total_amount(data);

  const list = new Array;
  //csv파일을 편하게 작성하기 위한코드.
  for(let item in userMap) {
    let obj = new Object;
    obj.userID = parseInt(item);
    for(let apiToken in apiDatas) {
      obj[apiToken] = 0;
      for(let token in userMap[item]) {
        if(token == apiToken) {
          obj[apiToken] = userMap[item][token]
          obj[apiToken];
        }
      }
    }
    list.push(obj);
  }

  const result = await file(list);
  
  return result;
}

function file(userMap) {

  const date = new Date();
  const tid = date.toStr();
  const tokens = [
    '0x5b5b404193600bce0580e945d723c30f02321c4e',
    '0xa338e75cf75e64cc21017b87a142c352fa272e3d',
    '0x73923fcc41c10754302bbd0363c35e1bf556c11f',
    '0x6cd6e8deda6ed735cab353b6b0dcf1708dcf4b96',
  ];

  //3차원 배열.
  const a = userMap.map(item => {
    return tokens.map(token => {
      return [item.userID,token,item[token]]
    })
  });

  //2차원 배열
  const b = a.reduce((curr,prev) => {
    curr.push(...prev);
    return curr;
  },[]);

  // amountHeld가 0이 아닌 값
  const c = b.filter(item => {
    return item[2] != 0;
  });
  
  const result = c.map(item => {
    const obj = new Object;
    obj.tid = tid;
    obj.userID = item[0];
    obj.tokenAddress = item[1];
    obj.amountHeld = item[2];

    return obj;
  });

  userToken.bulkCreate(result);

  return result;
}


function csv_json(csvData) {
  const data = csv_array(csvData);
  
  const result = data.reduce((prev,curr,idx) => {
    const userID = parseInt(curr[0])
    const main = curr[1].toLowerCase();
    const sub = curr[2].toLowerCase();
    return {
      ...prev,
      [main]: {
        userID: userID
      },
      [sub] : {
        userID: userID
      }
    }
  }, {});
  
  return result;
}

//이해 안되는 부분.
function csv_array(csvData,delimiter) {
  delimiter = (delimiter || ",");

  const pattern = new RegExp((
    "(\\" + ',' + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\"\\" + ',' + "\\r\\n]*))"), "gi");

  const data = [[]];
  let matches = null;
  //exec : 정규표현식과 일치하는 문자열을 찾아서 배열을 리턴
  while(matches = pattern.exec(csvData)) {
    //공통된 구분기호 찾기
    let matchedDelimiter = matches[1];
    if (matchedDelimiter.length && (matchedDelimiter != delimiter)) {
        data.push([]);
    }
    if (matches[2]) {
        matchedDelimiter = matches[2].replace(
        new RegExp("\"\"", "g"), "\"");
    } else {
        matchedDelimiter = matches[3];
    }
    data[data.length - 1].push(matchedDelimiter);
  }

  return data;
}

function total_amount(userMap) {
  for(let token in apiDatas) {
    const apiData = apiDatas[token];
    for(let item of apiData) {
      const userTokenInfo = userMap[item.address];
      if(userTokenInfo == undefined) continue;
      if(token in userTokenInfo) {
        userTokenInfo[token] += parseInt(item.amountHeld);
      }else {
        userTokenInfo[token] = parseInt(item.amountHeld);
      }
    }
  }

  const result = groupBy_User(userMap);
  return result;
}

function groupBy_User(userMap) {
  const result = {};

  for(item in userMap) {
    const { userID, ...tokens} = userMap[item];

    if(userID in result) {
      for(let tokenAddr in tokens) {
        if(tokenAddr in result[userID]) 
          result[userID][tokenAddr] += tokens[tokenAddr];
        else
          result[userID][tokenAddr] = tokens[tokenAddr];
      }
    }else {
      result[userID] = {};
      for(let tokenAddr in tokens) {
        if(tokenAddr in result[userID]) 
          result[userID][tokenAddr] += tokens[tokenAddr];
        else 
          result[userID][tokenAddr] = tokens[tokenAddr];
      }
    }
  }

  return result;
}

async function getApiDatas() {
  for(let token in apiDatas) {
    const page = await apiData(token);
    const totalPage = Math.ceil(page.total / page.limit);
    for(let page = 1; page <= totalPage; page++) {
      const api = await apiData(token,page);
      apiDatas[token].push(...api.result);
    }
  }

  for(let token in apiDatas) {
    for(item of apiDatas[token]) {
      item.tokenAddress = item.tokenAddress.toLowerCase();
    }
  }
}

function apiData(token,page) {
  const url = `http://api-scope.klaytn.com/v1/tokens/${token}/holders?page=${page}`;

  return axios.get(url).then(res => {
    const data = res.data;

    return data;
  });
}

Date.prototype.toStr = function() {
  let year = this.getFullYear()
  
  let month = `00${this.getMonth() + 1}`;
  month = month.substr(month.length - 2);
  
  let day = `00${this.getDate()}`;
  day = day.substr(day.length - 2);
  
  let hour = `00${this.getHours()}`;
  hour = hour.substr(hour.length - 2); 

  let min = `00${this.getMinutes()}`;
  min = min.substr(min.length - 2);
  
  let sec = `00${this.getSeconds()}`;
  sec = sec.substr(sec.length - 2);

  return `${year}-${month}-${day} [${hour}:${min}:${sec}]`
}

module.exports = main;