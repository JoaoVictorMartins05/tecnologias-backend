const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');


const hostname = '127.0.0.1';
const port = 3000;

const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    woff: "font/woof",
};

http.createServer((req,res)=> {
    
    let acesso_uri = url.parse(req.url).pathname;
    let caminho_completo = path.join(process.cwd(), decodeURI(acesso_uri));
    console.log(caminho_completo);
    
    let recurso_carregado;

    try{
        recurso_carregado = fs.lstatSync(caminho_completo);
    }catch(error){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404: Arquivo não encontrado');
        res.end();
    }

    if(recurso_carregado.isFile()){

        let mimeType = mimeTypes[path.extname(caminho_completo).substring(1)];
        res.writeHead(200, {'Content-Type': mimeType});
        let arquivo = fs.createReadStream(caminho_completo);
        arquivo.pipe(res);

    }else if(recurso_carregado.isDirectory()) {

        res.writeHead(302, {'Location': 'index.html'});
        res.end()

    }else{

        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500: Erro interno do servidor');
        res.end()
    }

}).listen(port, hostname, () => {
    
    console.log(`server is running at http://${hostname}:${port}/`)
});