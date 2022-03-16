const fs = require('fs');
const path = require('path');
/*const jsonTable = require('../data/productos');*/

let tableName = fs.readFileSync(path.join(__dirname, "../data/productos.json"), "utf-8")


let model = function(tableName) {
    return {
        /*filePath: path.join(__dirname, '../data/' + tableName + '.json'),*/
        readFile() {
           /*let fileContents = fs.readFileSync(this.filePath, 'utf8');*/
        
           /* if(fileContents) {*/
           if (tableName){
                /*return JSON.parse(fileContents);*/
                return JSON.parse(tableName)
            }
        
            return [];
        },
        writeFile(contents) {
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },
        all() {
            return this.readFile();
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id)
        },
        create(row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        update(row) {
            let rows = this.readFile();
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            }); 

            this.writeFile(updatedRows);

            return row.id;
        },
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(oneRow => oneRow.id != id); 

            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;