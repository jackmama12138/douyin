const mysql = require('mysql2');

// 创建连接池
const pool = mysql.createPool({
    host: '101.43.7.52',
    user: 'root',
    password: 'jackma123456',
    database: 'ranklist',
    waitForConnections: true,
    connectionLimit: 30,
    queueLimit: 0
});

// 封装查询函数
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// 封装插入函数
function insertHotlistItem(updateTime, dateText,hot, scores) {
    const sql = 'INSERT INTO hotlist (`update`,`time`, `hot`, `scores`) VALUES (?, ?, ?,?)';
    const params = [updateTime,dateText, JSON.stringify(hot), JSON.stringify(scores)];
    return query(sql, params);
}

// 封装更新函数（示例：更新第一个匹配的记录）
function updateHotlistItem(id, updateTime, hot, scores) {
    const sql = 'UPDATE hotlist SET update = ?, hot = ?, scores = ? WHERE id = ?'; // 假设有id字段
    const params = [updateTime, JSON.stringify(hot), JSON.stringify(scores), id];
    return query(sql, params);
}

// 封装获取所有函数
function getAllHotlistItems() {
    const sql = 'SELECT * FROM hotlist';
    return query(sql);
}

// 封装删除函数（示例：删除指定id的记录）
function deleteHotlistItem(id) {
    const sql = 'DELETE FROM hotlist WHERE id = ?'; // 假设有id字段
    const params = [id];
    return query(sql, params);
}

// 当应用程序结束时，关闭连接池
process.on('exit', () => {
    pool.end();
});

// 导出封装的方法
module.exports = {
    insertHotlistItem,
    updateHotlistItem,
    getAllHotlistItems,
    deleteHotlistItem
};