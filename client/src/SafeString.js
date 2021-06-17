const simpleStr = () => {
  let str = '';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let n = 0; n < 10; n++) {
        for (let m = 0; m < 10; m++) {
          str += '' + i + j + n + m;
        }
      }
    }
  }
  //console.log(str);
  console.log('simple String length:    ' + str.length);
};

export const smartStr = () => {
  // I know that's not the Optimal string of 10003 chars. but 10006 is pretty close :)
  let str = '';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let n = 0; n < 10; n++) {
        for (let m = 0; m < 10; m++) {
          if (!str.includes('' + i + j + n + m)) {
            if (str.endsWith('' + i + j + n)) str += '' + m;
            else if (str.endsWith('' + i + j)) str += '' + n + m;
            else if (str.endsWith('' + i)) str += '' + j + n + m;
            else str += '' + i + j + n + m;
          }
        }
      }
    }
  }
  //console.log(str);
  console.log('Smart String length:     ' + str.length);
};

export const debruijn = (alphabet, wordLength) => {
  let alphabetLength = alphabet.length;

  if (alphabetLength <= 0 || wordLength <= 0) return '';
  let a = [];
  for (let i = 0; i < alphabetLength * wordLength; ++i) a[i] = 0;
  let res = [];
  let db = function (t, p) {
    if (t > wordLength) {
      if (wordLength % p === 0) {
        for (let i = 1; i <= p; ++i) {
          res += alphabet[a[i]];
        }
      }
    } else {
      a[t] = a[t - p];
      db(t + 1, p);
      for (let j = a[t - p] + 1; j < alphabetLength; ++j) {
        a[t] = j;
        db(t + 1, t);
      }
    }
  };
  db(1, 1);

  //// Extra code to avoid having to cycle for the last word
  let extra = '';
  for (let i = 0, nremain = wordLength - 1; nremain > 0; i += 2, --nremain)
    extra += res[i % res.length];
  res += extra;
  ////

  //console.log(res);
  console.log('De Bruijn String length: ' + res.length);
};

export default simpleStr;
