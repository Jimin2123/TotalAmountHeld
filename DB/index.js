const mysql = require('mysql2');

const info = {
    user:'jimin',
    password:'kminening02@',
    host:'localhost',
    database:'projectDB'
};

const con = mysql.createConnection(info);

function query(sql, data){
    return new Promise( (res, rej)=>{
        con.query(sql, data, (err, result)=>{
            if(err) rej(err);
            else res(result);
        });
    });
}

module.exports.query = query;