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
        body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .embed-container { 
            border: 1px solid #e0e0e0; 
            border-radius: 8px; 
            overflow: hidden; 
            max-width: 100%;
            background: #fff;
        }
        .image-wrapper { width: 100%; background: #f4f4f4; }
        .main-img { width: 100%; display: block; }
        .metadata { padding: 12px 15px; background: #fafafa; border-top: 1px solid #eee; }
        .desc { margin: 0 0 8px; font-size: 14px; color: #333; line-height: 1.4; }
        .footer { font-size: 12px; color: #888; display: flex; justify-content: space-between; }
        .author { font-weight: 600; color: #555; }
        .license { background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
      </style>
    </head>
    <body>
      <div class="embed-container">
        <div class="image-wrapper">
            <a href="${image}" target="_blank">
                <img src="${image}" class="main-img" alt="${desc}" />
            </a>
        </div>
        <div class="metadata">
            <p class="desc">${desc}</p>
            <div class="footer">
                <span class="author">📷 ${item.author}</span>
                <span class="license">${license}</span>
            </div>
        </div>
      </div>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(htmlContent);
}