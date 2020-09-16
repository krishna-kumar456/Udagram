import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { fileURLToPath } from 'url';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

 
  app.get( "/filteredimage", async ( req, res ) => {
    const url: string = req.query.image_url

    if (url === "" || url === undefined) {
      res.status(400).send("Invalid URL was provided as an Input!")
    }
    
    const imgLocalPath: string = await fileURLToPath(url)
    res.sendFile(imgLocalPath)
    deleteLocalFiles([imgLocalPath])

  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
    
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();