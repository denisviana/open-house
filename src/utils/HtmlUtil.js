export default class HtmlUitl{

    static makeHtmlTemplate = (items) => {

        console.log(items);

        let html = `<!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        <link href='https://fonts.googleapis.com/css?family=Quicksand:400,500' rel='stylesheet'>
        <style>
        body {
            text-align: center;
            color: black;
            font-family: Quicksand, sans-serif;
        }
        </style>
        </head>
        <body>
        
        <img src='https://firebasestorage.googleapis.com/v0/b/open-house-9cd52.appspot.com/o/malu1.jpg?alt=media&token=9109dbd9-cd23-4011-8dbf-de0e48b853f0' alt='Avatar' style='width:150px'>
        <img src='https://firebasestorage.googleapis.com/v0/b/open-house-9cd52.appspot.com/o/denis1.png?alt=media&token=8bc6b2d8-0e99-4b7d-a4b1-e343b2b6f276' alt='Avatar' style='width:150px'>
        
        <h3>Olá!! Estamos muito felizes por poder contar com você nessa nova fase.</h3>
        <p>Te esperamos agora na nossa festa :)</p>
        <p>Pra você ficar por dentro, seguem abaixo todos os dados importantes, inclusive os itens que você escolheu.</p>
        
        <div style='text-align: left'>
        <br/>
        <span><b>Data: </b>17/11/2018</span><br/>
        <span><b>Hora: </b>14:00</span><br/>
        <span><b>Local: </b>Rua Augusto de Mari, 3994 - Guaira (Salão de Festas)</span><br/>
        <span><a href='https://goo.gl/maps/eXAxjQat5xT2'>Google Maps</a></span><br/><br/>
        <span>Obs: Se você for de ônibus, é bem ao lado do Terminal do Portão :)</span>
        
        <hr style='margin-top: 30px'/>
        
        <ul style='list-style-type: none;
        margin: 0;
        padding: 0;
        margin-top: 20px'>`

        let middle = ""

        items.map((value,index) => 
        {
            let li =
                `   <li>
                        <div>
                            <img src='`+value.imageUrl+`' alt='Avatar' style='width:60px'>    
                            <div style='display: inline-block'>
                            <span><b>`+value.title+`</b><span><br/>
                            <span>R$ `+value.price+`</span><br/>
                            <a href='`+value.storeUrl+`'>Loja</a>
                            </div>
                        </div> 
                    </li>
                `
            middle += li;
        }
        );
                 
        let bottom = `</ul>
        
        <hr style='margin-top: 30px'/>
        <p style='margin-top: 30px'>
            Com carinho,<br/><br/>
            Denis e Malu
        </p>
        
        </div>
        
        </body>
        </html>`

        console.log(middle);
        middle += bottom;
        html += middle;
        console.log(middle);
        
        return html;
    }

}