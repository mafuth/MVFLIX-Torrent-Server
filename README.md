# This project uses <a href="https://webtorrent.io/">WebTorrent</a>

## How setup and use <a href="http://mvflix.stream/">MVFLIX</a> Torrent Server

** Your will need <a href="https://nodejs.dev/">nodejs and npm</a> and <a href="https://ffmpeg.org/">ffmpeg</a> to run this server **
1. `npm install`
2. `node server/bin.js`
3. Send all requests to [http://localhost:9000/](http://localhost:9000)
4. All torrents will be temporarily downloaded in to temp directory ( not tested what happens when storage full )

## To change server port change this varible (from server/bin.js) value to any port you want

```JS
    var port = 9000;
```
## API Usage

REQUEST TYPE | Endpoint | Description
--- | --- | ---
GET | `/torrents` | will return the list of all torrents
GET | `/torrents/{infoHash}` | will return one torrent
GET | `/torrents/{infoHash}/archive` | will return the ZIP archive
GET | `/torrents/{infoHash}/files` | will return the M3U playlist
GET | `/torrents/{infoHash}/files/{path}` | will start downloading the original file (honoring the `Range` header)
GET | `/torrents/{infoHash}/stream/{path}` | will start streaming the file (will do a live convert for .mkv and .avi files to .webm files)(honoring the `Range` header)
GET | `/torrents/{infoHash}/stats` | will return the torrent stats (speed, bandwidth, etc.)
POST | `/torrents/{infoHash}/pause` and <br>`/torrents/{infoHash}/resume` | will pause/resume the swarm and peer discovery
POST | `/torrents/{infoHash}/start` and <br>`/torrents/{infoHash}/stop` | will start/stop the download by selecting/deselecting all files
POST | `/torrents/{infoHash}/start/{index}` and <br>`/torrents/{infoHash}/stop/{index}` | will start/stop downloading a particular file (by index)
POST | `/torrents` | will add a new torrent (`{"link":"magnet link or URL"}`)
POST | `/upload` | will accept a .torrent file as an attachment (`file` field in `multipart/form-data`)
DELETE | `/torrents/{infoHash}` | will delete the torrent

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!
