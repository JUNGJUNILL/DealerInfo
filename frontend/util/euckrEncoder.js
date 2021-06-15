const iconv = require('iconv-lite');

export const euckrEncoder = (str) =>{

    const buf = iconv.encode(str, "euc-kr");
    let encodeStr = '';
    buf.map((v,i,array)=>{
        encodeStr += '%' + array[i].toString('16');
    })
    
    encodeStr = encodeStr.toUpperCase();
    return encodeStr; 
}

export default euckrEncoder; 