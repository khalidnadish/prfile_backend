import dataBase from "./database.js";

export function newUser(req, res) {
  const { username, email, password, phone } = req.body;
  console.log("email row ais : " + email);

  console.log("row ais : " + ckeckUser(email));

  let inset_date = `INSERT INTO user SET username=?,email=?,password=?,phone=?`;
  dataBase.execute(
    inset_date,
    [username, email, password, phone],
    (err, results) => {
      if (err) throw err;

      console.log("row create  dfsfsfs");

      // console.log(results);
      res.send({ msgs: true });
    }
  );
}

function ckeckUser(email) {
  // let xx = "";
  let chek_data = `SELECT email from user WHERE email=?`;
  let xx = dataBase.execute(chek_data, [email], (err, results) => {
    if (err) throw err;
    console.log("dublicate row   :" + results.length);
    xx = results.length;
    // return xx;
  });
  return xx;
}

export function getAlluser(req, res) {
  console.log(req.cookies);
  // res.cookie("sky", "nadish", { httpOnly: true });

  dataBase.execute("SELECT * FROM user", (err, data) => {
    if (err) throw err;
    console.log(data);

    res.send({ data });
  });
}

export function createUser(req, res) {
  const { username, email, password, phone } = req.body;
  dataBase.execute(
    `SELECT email FROM user WHERE email=?`,
    [email],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        console.log("exist");
        return res.send({ message: false });
      }

      let inset_date = `INSERT INTO user SET username=?,email=?,password=?,phone=?`;
      dataBase.execute(
        inset_date,
        [username, email, password, phone],
        (err, results) => {
          if (err) throw err;

          res.send({ message: true });
        }
      );
    }
  );
}

export function avatarUpload(req, res) {
  // res.send("avatar uploaded");
  console.log("user data:" + req.params.userId);
  console.log("user file:" + req.file.filename);
  console.log("user file:" + req.file.filepath);
  console.log("file:" + req.file);
  // console.log("user body:" + req.body);
  let avatraPath = "http://localhost:3001/images/avatar/";
  let avatarImgae = avatraPath + req.file.filename;
  const sqlQuery = `UPDATE user
  SET avatar = ?  WHERE userid = ?`;

  // TODO:   check if the user exisit or not problem : image dublicated

  dataBase.execute(sqlQuery, [avatarImgae, req.params.userId], (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send({ data });
  });
}

export function loginUser(req, res) {
  const { email, password } = req.body;
  dataBase.execute(
    `SELECT email FROM user WHERE email=? and password=?`,
    [email, password],
    (error, result) => {
      if (error) {
        console.log(error);
      }

      if (result.length === 0) {
        console.log("Not Exist");
        return res.send({ message: false });
      }
      return res.send({ message: true });
    }
  );
}

export default { newUser, getAlluser, createUser, loginUser, avatarUpload };
