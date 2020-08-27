const express = require("express");
const bodyParser = require("body-parser");
//const fileUpload = require("express-fileupload");
const router = express.Router();
const mysql = require("mysql");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//var path = require("path");
function getMySQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kelvin",
  });
}

router.post("/auth", function (request, response) {
  var connection = getMySQLConnection();
  connection.connect();

  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    if (email == "admin@gmail.com" && password == "1") {
      request.session.loggedin = true;
      request.session.email = email;
      response.redirect("/form");
    } else {
      response.send("Please Enter Valid Email or Password!");
    }
    response.end();
  } else {
    response.send("Please enter email and Password!");
    response.end();
  }
});

router.post("/process_post", urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  var response = {
    date_input: req.body.month,
  };
  console.log(response);

  req.session.context = req.body.month;
  res.redirect("/month");
  res.end(JSON.stringify(response));
});

router.get("/month", function (req, res) {
  var context = req.session.context;
  console.log("Query date");
  var month = context.split("-");
  var mon = month[1];
  var mth = Number(mon);
  //console.log("Split month"+" "+month);
  var cur_month;
  switch (mth) {
    case 1:
      cur_month = "temp_jan";
      break;
    case 2:
      cur_month = "temp_feb";
      break;
    case 3:
      cur_month = "temp_mar";
      break;
    case 4:
      cur_month = "temp_apr";
      break;
    case 5:
      cur_month = "temp_may";
      break;
    case 6:
      cur_month = "temp_jun";
      break;
    case 7:
      cur_month = "temp_jul";
      break;
    case 8:
      cur_month = "temp_aug";
      break;
    case 9:
      cur_month = "temp_sep";
      break;
    case 10:
      cur_month = "temp_oct";
      break;
    case 11:
      cur_month = "temp_nov";
      break;
    case 12:
      cur_month = "temp_dec";
      break;
  }
  console.log(cur_month);

  var personList = [];
  var value = cur_month;
  //console.log(value);
  list = [
    "temp_jan",
    "temp_feb",
    "temp_mar",
    "temp_apr",
    "temp_may",
    "temp_jun",
    "temp_jul",
    "temp_aug",
    "temp_sep",
    "temp_oct",
    "temp_nov",
    "temp_dec",
  ];
  for (i = 0; i < list.length; i++) {
    if (list[i].match(value)) {
      //console.log(req.params.month);
      var connection = getMySQLConnection();
      connection.connect();

      connection.query("SELECT * FROM ?? order by time", value, function (
        err,
        rows,
        fields
      ) {
        if (err) {
          res.status(500).json({
            status_code: 500,
            status_message: "internal server error",
          });
        } else {
          for (var i = 0; i < rows.length; i++) {
            var t = rows[i].time;
            var str = t.toString();
            var s = str.split(" ", 5);
            var day = s[0];
            var month = s[1];
            var date = s[2];
            //console.log(s);

            var person = {
              uid: rows[i].uid,
              email: rows[i].email,
              time: s,
              temperature: rows[i].temperature,
              distance: rows[i].distance,
              shift: rows[i].shift,
            };

            personList.push(person);
            //console.log(personList);
          }
          //res.end(JSON.stringify(personList));

          //res.end(personList);
          res.render("index", {
            personList: personList,
          });
        }
      });

      connection.end();
    }
  }
});

router.get("/recent_data", function (req, res) {
  var d = new Date();
  var n = d.getMonth();
  var context = n;
  console.log("recent month");
  //var month = context.split('-');
  //var mon = month[1];
  //var mth = Number(mon);
  //console.log("Split month"+" "+month);
  var cur_month;
  var mth = n + 1;
  switch (mth) {
    case 1:
      cur_month = "temp_jan";
      break;
    case 2:
      cur_month = "temp_feb";
      break;
    case 3:
      cur_month = "temp_mar";
      break;
    case 4:
      cur_month = "temp_apr";
      break;
    case 5:
      cur_month = "temp_may";
      break;
    case 6:
      cur_month = "temp_jun";
      break;
    case 7:
      cur_month = "temp_jul";
      break;
    case 8:
      cur_month = "temp_aug";
      break;
    case 9:
      cur_month = "temp_sep";
      break;
    case 10:
      cur_month = "temp_oct";
      break;
    case 11:
      cur_month = "temp_nov";
      break;
    case 12:
      cur_month = "temp_dec";
      break;
  }
  console.log(cur_month);

  var personList = [];
  var value = cur_month;
  //console.log(value);
  list = [
    "temp_jan",
    "temp_feb",
    "temp_mar",
    "temp_apr",
    "temp_may",
    "temp_jun",
    "temp_jul",
    "temp_aug",
    "temp_sep",
    "temp_oct",
    "temp_nov",
    "temp_dec",
  ];
  for (i = 0; i < list.length; i++) {
    if (list[i].match(value)) {
      //console.log(req.params.month);
      var connection = getMySQLConnection();
      connection.connect();

      connection.query("SELECT * FROM ?? order by time", value, function (
        err,
        rows,
        fields
      ) {
        if (err) {
          res.status(500).json({
            status_code: 500,
            status_message: "internal server error",
          });
        } else {
          for (var i = 0; i < rows.length; i++) {
            var t = rows[i].time;
            var str = t.toString();
            var s = str.split(" ", 5);
            var day = s[0];
            var month = s[1];
            var date = s[2];
            //console.log(s);

            var person = {
              uid: rows[i].uid,
              email: rows[i].email,
              time: s,
              temperature: rows[i].temperature,
              distance: rows[i].distance,
              shift: rows[i].shift,
            };

            personList.push(person);
            //console.log(personList);
          }
          //res.end(JSON.stringify(personList));

          //res.end(personList);
          res.render("index", {
            personList: personList,
          });
        }
      });

      connection.end();
    }
  }
});

router.post("/by_date", urlencodedParser, function (req, res) {
  req.session.context = req.body.date;
  res.redirect("/date");
  //res.end(JSON.stringify(response));
});

router.get("/date", function (req, res) {
  var context = req.session.context;
  console.log("Query date");
  var month = context.split("-");
  var mon = month[1];
  var mth = Number(mon);
  var date1 = month[2];
  var cur_date = Number(date1);
  console.log("Split month" + " " + cur_date);
  var cur_month;
  switch (mth) {
    case 1:
      cur_month = "temp_jan";
      break;
    case 2:
      cur_month = "temp_feb";
      break;
    case 3:
      cur_month = "temp_mar";
      break;
    case 4:
      cur_month = "temp_apr";
      break;
    case 5:
      cur_month = "temp_may";
      break;
    case 6:
      cur_month = "temp_jun";
      break;
    case 7:
      cur_month = "temp_jul";
      break;
    case 8:
      cur_month = "temp_aug";
      break;
    case 9:
      cur_month = "temp_sep";
      break;
    case 10:
      cur_month = "temp_oct";
      break;
    case 11:
      cur_month = "temp_nov";
      break;
    case 12:
      cur_month = "temp_dec";
      break;
  }
  console.log(cur_month);

  var personList = [];
  var value = cur_month;
  //console.log(value);
  list = [
    "temp_jan",
    "temp_feb",
    "temp_mar",
    "temp_apr",
    "temp_may",
    "temp_jun",
    "temp_jul",
    "temp_aug",
    "temp_sep",
    "temp_oct",
    "temp_nov",
    "temp_dec",
  ];
  for (i = 0; i < list.length; i++) {
    if (list[i].match(value)) {
      //console.log(req.params.month);
      var connection = getMySQLConnection();
      connection.connect();

      connection.query("SELECT * FROM ?? order by time", value, function (
        err,
        rows,
        fields
      ) {
        if (err) {
          res.status(500).json({
            status_code: 500,
            status_message: "internal server error",
          });
        } else {
          for (var i = 0; i < rows.length; i++) {
            var t = rows[i].time;
            var str = t.toString();
            var s = str.split(" ", 5);
            var day = s[0];
            var month = s[1];
            var date = s[2];
            var db_date = Number(date);
            if (cur_date == db_date) {
              var person = {
                uid: rows[i].uid,
                email: rows[i].email,
                time: s,
                temperature: rows[i].temperature,
                distance: rows[i].distance,
                shift: rows[i].shift,
              };
              personList.push(person);
            } else {
              console.log("Your Date is not found");
            }

            //console.log(personList);
          }
          //res.end(JSON.stringify(personList));
          //res.end(personList);
          res.render("index", {
            personList: personList,
          });
        }
      });

      connection.end();
    }
  }
});

router.get("/emp_details", function (req, res) {
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();

  connection.query("SELECT * FROM employee order by uid", function (
    err,
    rows,
    fields
  ) {
    if (err) {
      res
        .status(500)
        .json({ status_code: 500, status_message: "internal server error" });
    } else {
      for (var i = 0; i < rows.length; i++) {
        var person = {
          uid: rows[i].uid,
          name: rows[i].name,
          email: rows[i].email,
          gender: rows[i].gender,
          designation: rows[i].designation,
          dept: rows[i].dept,
          mobile: rows[i].mobile,
        };

        personList.push(person);
        //console.log(personList);
      }

      //res.end(JSON.stringify(personList));

      //res.end(personList);
      res.render("employee", {
        personList: personList,
      });
    }
  });

  connection.end();
});

router.get("/employee/entire", function (req, res) {
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();

  connection.query(
    "select * from temp_jan union select * from temp_feb union select * from temp_mar union select * from temp_apr union select * from temp_may union select * from temp_jun union  select * from temp_jul union select * from temp_aug union select * from temp_sep union select * from temp_oct union select * from temp_nov union select * from temp_dec order by time;;",
    function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //	res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("index", {
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

router.post("/search_post", function (req, res) {
  var response = {
    date_input: req.body.search_id,
  };
  console.log("search id" + " " + response);
  req.session.context = req.body.search_id;
  res.redirect("/search");
  res.end(JSON.stringify(response));
});
router.get("/search", function (req, res) {
  var search_id = req.session.context;
  search_input = Number(search_id);
  console.log(search_input);
  console.log(search_id);
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();
  var l = [
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
  ];
  c = 0;
  for (i = 0; i < l.length; i++) {
    c = c + 1;
  }
  console.log(c);
  connection.query(
    "select * from temp_jan where uid=? union select * from temp_feb  where uid=? union select * from temp_mar where uid=? union select * from temp_apr where uid=? union select * from temp_may where uid=? union select * from temp_jun where uid=? union  select * from temp_jul where uid=? union select * from temp_aug where uid=? union select * from  temp_sep where uid=? union select * from temp_oct where uid=? union select * from temp_nov where uid=? union select * from temp_dec where uid=? order by time;",
    [
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
    ],
    function (err, rows, fields) {
      //connection.query("(select * from temp_jan where uid=?) union (select * from temp_feb where uid=?)",[search_input,search_input], function (err, rows, fields) {

      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //	res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("index", {
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

router.post("/search_email", function (req, res) {
  var response = {
    date_input: req.body.search_email,
  };
  console.log("search email" + " " + response);
  req.session.context = req.body.search_email;
  res.redirect("/search_email_id");
  res.end(JSON.stringify(response));
});
router.get("/search_email_id", function (req, res) {
  var search_input = req.session.context;
  //search_input  = Number(search_email);
  console.log("type" + " " + typeof search_input);
  //	console.log(search_id);
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();
  var l = [
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
  ];
  c = 0;
  for (i = 0; i < l.length; i++) {
    c = c + 1;
  }
  console.log(c);
  connection.query(
    "select * from temp_jan where email=? union select * from temp_feb  where email=? union select * from temp_mar where email=? union select * from temp_apr where email=? union select * from temp_may where email=? union select * from temp_jun where email=? union  select * from temp_jul where email=? union select * from temp_aug where email=? union select * from  temp_sep where email=? union select * from temp_oct where email=? union select * from temp_nov where email=? union select * from temp_dec where email=? order by time;",
    [
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
    ],
    function (err, rows, fields) {
      //connection.query("(select * from temp_jan where uid=?) union (select * from temp_feb where uid=?)",[search_input,search_input], function (err, rows, fields) {

      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //	res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("index", {
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

router.post("/search_dept", function (req, res) {
  var response = {
    date_input: req.body.search_dept,
  };

  console.log("search drop" + " " + req.body.search_dept);
  req.session.context = req.body.search_dept;
  res.redirect("/search_dept");
  res.end(JSON.stringify(response));
});

router.get("/search_dept", function (req, res) {
  var search_input = req.session.context;
  //search_input  = Number(search_email);
  console.log("type" + " " + typeof search_input);
  //	console.log(search_id);
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();
  var l = [
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
    search_input,
  ];
  c = 0;
  for (i = 0; i < l.length; i++) {
    c = c + 1;
  }
  console.log(c);
  var sql =
    "(select temp_jan.uid,employee.email,temp_jan.time, temp_jan.temperature, temp_jan.distance, temp_jan.shift  from temp_jan,employee  where temp_jan.email=employee.email and dept=?) union (select temp_feb.uid,employee.email,temp_feb.time, temp_feb.temperature, temp_feb.distance, temp_feb.shift  from temp_feb,employee  where temp_feb.email=employee.email and dept=?) union (select temp_mar.uid,employee.email,temp_mar.time, temp_mar.temperature, temp_mar.distance, temp_mar.shift  from temp_mar,employee  where temp_mar.email=employee.email and dept=?) union (select temp_apr.uid,employee.email,temp_apr.time, temp_apr.temperature, temp_apr.distance, temp_apr.shift  from temp_apr,employee  where temp_apr.email=employee.email and dept=?) union (select temp_may.uid,employee.email,temp_may.time, temp_may.temperature, temp_may.distance, temp_may.shift  from temp_may,employee  where temp_may.email=employee.email and dept=?) union (select temp_jun.uid,employee.email,temp_jun.time, temp_jun.temperature, temp_jun.distance, temp_jun.shift  from temp_jun,employee  where temp_jun.email=employee.email and dept=?) union (select temp_jul.uid,employee.email,temp_jul.time, temp_jul.temperature, temp_jul.distance, temp_jul.shift  from temp_jul,employee  where temp_jul.email=employee.email and dept=?) union (select temp_aug.uid,employee.email,temp_aug.time, temp_aug.temperature, temp_aug.distance, temp_aug.shift  from temp_aug,employee  where temp_aug.email=employee.email and dept=?) union  (select temp_sep.uid,employee.email,temp_sep.time, temp_sep.temperature, temp_sep.distance, temp_sep.shift  from temp_sep,employee  where temp_sep.email=employee.email and dept=?) union (select temp_oct.uid,employee.email,temp_oct.time, temp_oct.temperature, temp_oct.distance, temp_oct.shift  from temp_oct,employee  where temp_oct.email=employee.email and dept=?) union (select temp_nov.uid,employee.email,temp_nov.time, temp_nov.temperature, temp_nov.distance, temp_nov.shift  from temp_nov,employee  where temp_nov.email=employee.email and dept=?) union (select temp_dec.uid,employee.email,temp_dec.time, temp_dec.temperature, temp_dec.distance, temp_dec.shift  from temp_dec,employee  where temp_dec.email=employee.email and dept=?)";
  //connection.query("select * from temp_jan where email=? union select * from temp_feb  where email=? union select * from temp_mar where email=? union select * from temp_apr where email=? union select * from temp_may where email=? union select * from temp_jun where email=? union  select * from temp_jul where email=? union select * from temp_aug where email=? union select * from  temp_sep where email=? union select * from temp_oct where email=? union select * from temp_nov where email=? union select * from temp_dec where email=? order by time;", [search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input, search_input], function (err, rows, fields) {

  connection.query(
    sql,
    [
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
    ],
    function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //	res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("index", {
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

exports.index = function (req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var name = post.user_name;
    var pass = post.password;
    var fname = post.first_name;
    var lname = post.last_name;
    var mob = post.mob_no;

    if (!req.files) return res.status(400).send("No files were uploaded.");

    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/images/upload_images/" + file.name, function (err) {
        if (err) return res.status(500).send(err);
        var sql =
          "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" +
          fname +
          "','" +
          lname +
          "','" +
          mob +
          "','" +
          name +
          "','" +
          pass +
          "','" +
          img_name +
          "')";

        var query = db.query(sql, function (err, result) {
          res.redirect("profile/" + result.insertId);
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.render("index.ejs", { message: message });
    }
  } else {
    res.render("index");
  }
};

router.post("/add_employee", function (request, response) {
  var uid = request.body.uid;
  var email = request.body.email;
  var name = request.body.name;
  var gender = request.body.gender;
  var designation = request.body.designation;
  var dept = request.body.dept;
  var mobile = Number(request.body.mobile);
  //console.log(typeof(mobile));
  //console.log(Number(mobile));
  //console.log(email + " " + uid + " " + gender + " " + designation + " " + dept + " " + mobile);
  var personList = [];
  var conn = getMySQLConnection();
  conn.connect();

  //if (!request.files)
  //	return response.status(400).send('No files were uploaded.');

  var file = request.files.uploaded_image;
  var img_name = file.name;
  console.log(img_name);

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    console.log("1");

    file.mv("public/images/uploaded_images/" + file.name, function (err) {
      console.log("2");

      if (err) return response.status(500).send(err);
      //var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`mob_no`,`user_name`, `password` ,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + img_name + "')";

      let query = conn.query(
        "INSERT INTO employee SET ??",
        [request.body],
        (err, results) => {
          if (err) throw err;
          console.log("3");
          response.send(
            JSON.stringify({ status: 200, error: null, response: results })
          );
          //res.end(JSON.stringify(personList)
          response.end("Success");
        }
      );
    });
  } else {
    console.log("4");
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    response.render({ message: message });
  }

  //connection.query("INSERT INTO employee (uid,name, email,gender,designation,dept,mobile,photo) VALUES ('"+uid+"', '"+email+"','"+name+"','"+gender+"', '"+designation+"','"+dept+"','"+mobile+"','"+null+"')", function (err, rows, fields) {
  //let data = {
  //	uid: req.body.uid, email: req.body.email, time: req.body.time, temperature: req.body.temperature,
  //	distance: req.body.distance, shift: req.body.shift
  //};

  console.log("Success");

  //res.end(personList);
  //response.render('employee', {
  //"personList": personList
  //	});

  conn.end();
});

router.post("/shift", function (req, res) {
  var response = {
    shift_input: req.body.shift,
  };
  console.log(response);
  req.session.context = req.body.shift;
  res.redirect("/search_shift");
  res.end(JSON.stringify(response));
});
router.get("/search_shift", function (req, res) {
  var search_input = req.session.context;
  search_id = Number(search_input);
  console.log(search_input);
  console.log(search_id);
  var personList = [];

  var connection = getMySQLConnection();
  connection.connect();

  connection.query(
    "select * from temp_jan where shift=? union select * from temp_feb  where shift=? union select * from temp_mar where shift=? union select * from temp_apr where shift=? union select * from temp_may where shift=? union select * from temp_jun where shift=? union  select * from temp_jul where shift=? union select * from temp_aug where shift=? union select * from  temp_sep where shift=? union select * from temp_oct where shift=? union select * from temp_nov where shift=? union select * from temp_dec where shift=? order by time;",
    [
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
      search_input,
    ],
    function (err, rows, fields) {
      //connection.query("(select * from temp_jan where uid=?) union (select * from temp_feb where uid=?)",[search_input,search_input], function (err, rows, fields) {
      if (err) {
        res
          .status(500)
          .json({ status_code: 500, status_message: "internal server error" });
      } else {
        for (var i = 0; i < rows.length; i++) {
          var t = rows[i].time;
          var str = t.toString();
          var s = str.split(" ", 5);
          var day = s[0];
          var month = s[1];
          var date = s[2];

          //console.log(s);

          var person = {
            uid: rows[i].uid,
            email: rows[i].email,
            time: s,
            temperature: rows[i].temperature,
            distance: rows[i].distance,
            shift: rows[i].shift,
          };

          personList.push(person);
          //console.log(personList);
        }
        //res.end(JSON.stringify(personList));
        //res.end(personList);
        res.render("index", {
          personList: personList,
        });
      }
    }
  );

  connection.end();
});

router.post("/range", urlencodedParser, function (req, res) {
  req.session.from1 = req.body.from;
  req.session.to1 = req.body.to;
  res.redirect("/range_search");
  //res.end(JSON.stringify(response));
});

router.get("/range_search", function (req, res) {
  var from = req.session.from1;
  var to = req.session.to1;
  console.log("Jumbalaka Jumbalaka");
  console.log("Query date");
  var month = from.split("-");
  var mon = month[1];
  var mth = Number(mon);

  var month1 = to.split("-");
  var mon1 = month1[1];
  var mth1 = Number(mon1);

  console.log("Split month" + " " + mth + " " + mth1);
  var cur_month;
  table_list = [
    "temp_jan",
    "temp_feb",
    "temp_mar",
    "temp_apr",
    "temp_may",
    "temp_jun",
    "temp_jul",
    "temp_aug",
    "temp_sep",
    "temp_oct",
    "temp_nov",
    "temp_dec",
  ];

  console.log(table_list[mon - 1] + " " + table_list[mon1 - 1]);
  var personList = [];

  var queryString = "";
  queryString +=
    "select * from " + table_list[mon - 1] + " where time>=" + from;
  for (var i = mon; i < mon1 - 1; i++) {
    queryString += " union select * from " + table_list[Number(i)];
  }
  toDate = "'" + to + " 23:59:59" + "'";
  queryString +=
    " union select * from " + table_list[mon1 - 1] + " where time<=" + toDate;
  //console.log(queryString);

  var connection = getMySQLConnection();
  connection.connect();
  connection.query(queryString, function (err, rows, fields) {
    console.log("No of Rows: " + rows.length);
    if (err) {
      res
        .status(500)
        .json({ status_code: 500, status_message: "internal server error" });
    } else {
      for (var i = 0; i < rows.length; i++) {
        var t = rows[i].time;
        var str = t.toString();
        var s = str.split(" ", 5);
        var day = s[0];
        var month = s[1];
        var date = s[2];
        var db_date = Number(date);

        var person = {
          uid: rows[i].uid,
          email: rows[i].email,
          time: s,
          temperature: rows[i].temperature,
          distance: rows[i].distance,
          shift: rows[i].shift,
        };

        personList.push(person);
      }
      console.log("Jumbalaka Out");
      res.render("index", {
        personList: personList,
      });
    }
  });
  connection.end();
});

module.exports = router;
