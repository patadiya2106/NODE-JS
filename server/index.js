const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Create the Server.....");

  const path = req.url;
  console.log("Requested URL:", path);

  switch (path) {
    case "/":
      res.write(
        "<h1 text-align:center;'>Hello Welcome to the Home Page</h1>"
      );
      res.end();
      break;
    case "/about":
      res.write(
        "<h1 style='color:yellow; text-align:center;'>About Us</h1><p style='text-align:center;'>About the this Webpage </p>"
      );
    case "/blog":
      res.write(
        "<h1 style='color:blue; text-align:center;'>Blog</h1><p style='text-align:center;'>Hello Welcome The Blog Section</p>"
      );
      res.end();
      break;
    case "/contact":
      res.write(
        "<h1 style='color:red; text-align:center;'>Contact Us</h1><p style='text-align:center;'>Contact No:9876543210....!</p>"
      );
      res.end();
      break;
      res.end();
      break;
    case "/blog":
      res.write(
        "<h1 style='color:green; text-align:center;'>Our Blog</h1><p style='text-align:center;'></p>"
      );
      res.end();
      break;;
    default:
      res.write(
        "<h1 style='color:pink; text-align:center;'>404 - Page Not Found</h1><p style='text-align:center;'>Error! This page not available.</p>"
      );
      res.end();
  }
});

server.listen(9000, () =>
  console.log("Server run on 9000......")
);