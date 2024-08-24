const mongoose = require(mongoose);

const USER_NAME = "";
const PASSWORD = "";
const DB_NAME = "";

const dbURI = mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.zan8h.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema, "blogPosts");

// // Saving data to MongoDB
// for (let i = 5; i <= 50; i++) {
//   const newBlog = new BlogPost({
//     title: Blog Title ${i},
//     summary: Blog Summary ${i},
//     content: Blog Content ${i},
//     author: Author Name ${i},
//   });

//   newBlog
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// Fetching data from MongoDB and saving it into data.json file
const fs = require("fs");
BlogPost.find()
  .then((result) => {
    console.log("Successfully fetched data from MongoDB!!!");
    const jsonData = JSON.stringify(result);

    return new Promise((resolve, reject) => {
      fs.writeFile("data.json", jsonData, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Data saved to data.json file");
          resolve();
        }
      });
    });
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(Error ${err});
    mongoose.connection.close();
  });