import db from '../database.json'; // Import your JSON database

export default function handler(req, res) {
  const { id } = req.query;

  const item = db[id];

  if (!item) {
    return res.status(404).send('<h1>Error: Image ID not found</h1>');
  }

  const title = `Photo by ${item.author}`;
  const desc = item.description;
  const image = item.imageUrl;
  const date = item.date;
  const license = item.license;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${desc}" />
      <meta property="og:image" content="${image}" />
      
      <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .image-container {
            position: relative;
            width: 100%;
            max-height: 80vh;
        }
        .caption {
            text-align: left;
            font-size: 14px;
            color: #555;
            padding: 5px;
        }
        dondo {
            color: red;
            font-size: 16px;
            margin: 0 5px 0 5px;
        }
        author {
            font-style: italic;
            color: #888;
        }
    </style>
    </head>
      <body>
        <div class="content">
            <div class="image-container">
                <img src="${image}" alt="${desc}" style="width:100%; height:auto;">
            </div>
            <div class="caption">
                ${desc} <dondo>।</dondo> <author>Photo by ${item.author}, ${date}; ${license}</author>
            </div>
        </div>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
}

