export const environment = {
    production: true,              // Set to true for production
    apiUrl: 'https://your-production-api-url.com/api/',  // Production API URL
    pmsApiUrl: "https://localhost:7121",
    pmsEmployeeApiUrl: "https://localhost:7054",
    pmsProjectApiUrl: "https://localhost:7167",

    departmentGetAll:'/api/department/get-all',

    signatures: {
        '/forecast/arima': '05e72164f413975e977b8088bde5b1cee080a1ad3e339f449cd503a8e78b122ae7ddc4639d5672dce9f160ef576a4147b06085193bca18c1ee53b7dfa02bff836928810730ea29529974a223d965970605e1277cdf33761b5cb3d885f49e02270e6277d77ab8b71e4ff6d810fcbcb8703b317f08f1474acf097112c9a932911bd29f59f83a116c4e3b2de4d1c2637e2e876c4601c5d5dceeba07990e99c9c2be320c19c07806c64ddd170228f6feb65fa479d9d7923dffeafcc7a41870eb0df221969f04109271219f6b8bfcaa9ccac7f4447df0a7feb0a1b97702819738c23e86c44c52e0a870ff25dc3f323c15ae3a4ab13abfa6bba941ae57f87eec1595fb',
        '/forecast/prophet': '6438e7d433149bf3e26f2e147e19999abc551006c759e752f014a58a41c75b87a1bfcc5853c546b7caaf36d795a1ea4957848fdcbb168ac4d77419fc65da852d79d7bfaab52fc7e092c2ef6aae9018d22adb998a6a0b4831e65511cabc5c5a9a3309722e44e2ac898235c39c2da49cb45c768d7ded1e1585598e83015b9dd4de66c98f09445d0649bab918e21b6732b33e6a0a8718e2437c4e7026c28aa450324ebe84b3f78cd7c49864380d5e4e30ab1de9f625ce62d0d64f887f009ce3cd85beda3bc521a52570978e894980697e537f9c62ced5ae918c24d405391d2ad2e582a1b63438a6ea8daa5241968541f698720b5008cf199d2e2635464902fe560f',
        '/update-deal-count': 'fd1c19fdd60d04b1ef3408d4a18b70443b9070d2e182bc39a5a06c1a6b541a4d982e9f91f798c5bf0ea3bc9d92fc6d74'
      }
  };
  