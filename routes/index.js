var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const moment = require("moment");
const MoTaModel = require("../db/models-cdio2/MoTaModel");
const ThongTinChungModel = require("../db/models-cdio2/ThongTinChungModel");
const Model4 = require("../db/models-cdio2/Model4");
const Model5 = require("../db/models-cdio2/Model5");
const Model9 = require("../db/models-cdio2/Model9");
const Model6 = require("../db/models-cdio2/Model6");
const Model7 = require("../db/models-cdio2/Model7");
const Model8 = require("../db/models-cdio2/Model8");
const LogModel = require("../db/models-cdio2/LogModel");
const CommentModel = require("../db/models-cdio2/CommentModel");
const MatrixModel = require("../db/models-cdio2/MatrixModel");
const DanhMucModel = require("../db/models-cdio2/DanhMucModel");
const ModelSurvey = require("../db/models-cdio2/ModelSurvey");
const MucTieuModel = require("../db/models-cdio2/MucTieuModel");
const SurveyQAModel = require("../db/models-cdio2/SurveyQAModel");

//Import Login
const auth = require("../controllers/User/authController");
const config = require("./../config/config");
const jwt = require("jsonwebtoken");
const Users = require("./../service/User/userService");

const dataRender1 = {
  title1: "",
  data1: []
};
const dataRender2 = {
  title2: "",
  data2: []
};
const dataRender3 = {
  title3: "",
  data3: []
};
const dataRender4 = {
  title4: "",
  data4: []
};
const dataRender5 = {
  title5: "",
  data5: []
};
const dataRender6 = {
  title6: "",
  data6: []
};
const dataRender7 = {
  title7: "",
  data7: []
};
const dataRender8 = {
  title8: "",
  data8: []
};
const dataRender9 = {
  title9: "",
  data9: []
};

const compile = async function(templateName, data) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};
hbs.registerHelper("dateFormat", function(value, format) {
  return moment(value).format(format);
});
/* GET export file page. */
router.post("/exportfile", function(req, res, next) {
  function renderNumber(str) {
    switch (str) {
      case "Thông tin chung":
        return "1. ";
      case "Mô tả môn học":
        return "2. ";
      case "Mục tiêu môn học":
        return "3. ";
      case "Chuẩn đầu ra môn học":
        return "4. ";
      case "Kế hoạch giảng dạy lý thuyết":
        return "5. ";
      case "Kế hoạch giảng dạy thực hành":
        return "6. ";
      case "Đánh giá":
        return "7. ";
      case "Tài nguyên môn học":
        return "8. ";
      case "Các quy định chung":
        return "9. ";
      default:
        return "";
    }
  }
  function renderContenByNameTab(key, value) {
    if (value !== [] || value !== "") {
      switch (key) {
        case "Thông tin chung": {
          dataRender1.title1 = renderNumber(key) + key.toUpperCase();
          dataRender1.value1 = value;
          return dataRender1;
        }
        case "Mô tả môn học": {
          dataRender2.title2 = renderNumber(key) + key.toUpperCase();
          dataRender2.value2 = value;
          return dataRender2;
        }
        case "Mục tiêu môn học": {
          dataRender3.title3 = renderNumber(key) + key.toUpperCase();
          dataRender3.value3 = value;
          return dataRender3;
        }
        case "Chuẩn đầu ra môn học": {
          dataRender4.title4 = renderNumber(key) + key.toUpperCase();
          dataRender4.value4 = value;
          return dataRender4;
        }
        case "Kế hoạch giảng dạy lý thuyết": {
          dataRender5.title5 = renderNumber(key) + key.toUpperCase();
          dataRender5.value5 = value;
          return dataRender5;
        }
        case "Kế hoạch giảng dạy thực hành": {
          dataRender6.title6 = renderNumber(key) + key.toUpperCase();
          dataRender6.value6 = value;
          return dataRender6;
        }
        case "Đánh giá": {
          dataRender7.title7 = renderNumber(key) + key.toUpperCase();
          dataRender7.value7 = value;
          return dataRender7;
        }
        case "Tài nguyên môn học": {
          dataRender8.title8 = renderNumber(key) + key.toUpperCase();
          dataRender8.value8 = value;
          return dataRender8;
        }
        case "Các quy định chung": {
          dataRender9.title9 = renderNumber(key) + key.toUpperCase();
          dataRender9.value9 = value;
          return dataRender9;
        }
      }
    }
  }

  (async function() {
    try {
      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });
      const page = await browser.newPage();
      let body = await req.body;
      let data = JSON.parse(body.data);
      let path = "./" + data.nameFile + Date.now() + ".pdf";

      //header
      let content = await compile("header", null);
      //body
      for (let k of Object.keys(JSON.parse(data.content))) {
        let value = JSON.parse(JSON.parse(data.content)[k]);
        content += await compile("content", renderContenByNameTab(k, value));
      }
      //footer
      // if (JSON.parse(body.data)['Thông tin chung'] !== undefined) {
      // content += await compile('footer',renderContenByNameTab('Thông tin chung',JSON.parse(JSON.parse(body.data)['Thông tin chung'])));
      // }
      await page.setContent(content);
      // page.content().then(data => {
      //   console.log(data);
      // })
      await page.emulateMedia("screen");
      await page.pdf({
        path: path,
        format: "A4",
        printBackground: true
      });
      await browser.close();

      res.end("1");
    } catch (e) {
      console.log("error", e);
    }
  })();
});

router.get("/collect-data/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          ThongTinChungModel.collect(id, resData => {
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

// router.post('/update-data/:id', function (req, res) {
//   let id = req.params
//   let description = req.body;
//   ThongTinChungModel.add(id, description, function (err, description) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("SUCCESS");
//     }
//   })

//   // jwt.verify(req.headers.token, 'secretkey', (err, authData) => {
//   //   if (err) {
//   //     res.sendStatus(403);
//   //   } else {
//   //     let id = req.params
//   //     let description = req.body;
//   //     ThongTinChungModel.add(id, description, function (err, description) {
//   //       if (err) {
//   //         console.log(err);
//   //       } else {
//   //         res.send("SUCCESS");
//   //       }
//   //     })
//   //   }
//   // })
// })

router.get("/get-data-2/:id", (req, res) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          MoTaModel.get(id, resData => {
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-data-2", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let description = req.body.data;
          let data = {
            description: description,
            id: req.body.id
          };
          MoTaModel.save(data, function(err, description) {
            if (err) {
              console.log(err);
            }
            res.end("done");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-danhgia", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model7.save(req.body, function(err, description) {
            if (err) {
              console.log(err);
              res.end("0");
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-tainguyenmonhoc", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model8.save(req.body, function(err, description) {
            if (err) {
              console.log(err);
              res.end("0");
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/test", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model7.test(req.body.data, function(err, description) {
            if (err) {
              console.log(err);
            }
            res.end("done");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-data-3", (req, res) => {
  let data = {
    id: req.body.data.id,
    idCtdt: req.body.data.id_ctdt
  }
  console.log(req.body);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          MucTieuModel.get(data, resData => {
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-muc-tieu-3/:id", (req, res) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          MucTieuModel.getMucTieu(id, resData => {
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-mtmh-cdr-3", (req, res) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          MucTieuModel.getMTMH_HAS_CDR(data, resData => {
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-cdr-3/:id", (req, res) => {
  let idCtdt = req.params.id
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          MucTieuModel.getCDR(idCtdt, resData => {
            resData.forEach(element2 => {
              element2.KeyRow = element2.KeyRow.slice(
                0,
                element2.KeyRow.length - 1
              );
            });
            res.send(resData);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-data-3", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let body = req.body.data;
          console.log(req.body)
          let data = {
            body: body,
            id: req.body.id,
            idCtdt: req.body.id_ctdt
          };
          MucTieuModel.save(data, function(err) {
            if (err) {
              console.log(err);
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

// 4
router.post("/collect-data-4", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.collectdata(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/collect-cdrmdhd-4", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model4.collectcdrmdhd(function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-data-4", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.save(data, function(err, description) {
            if (err) {
              console.log(err);
            } else {
              console.log("done");
              res.send(description);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/collect-subjectlist", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model4.collectsubjectlist(function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-subject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.addsubject(data, function(err, description) {
            if (err) {
              console.log(err);
            } else {
              //console.log("done");
              res.send({});
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-subject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.deletesubject(data, function(err, description) {
            if (err) {
              console.log(err);
            }
            console.log("done");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/edit-subject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.editsubject(data, function(err, description) {
            if (err) {
              console.log(err);
            }
            console.log("done");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

// router.post('/collect-subjectid', function(req, res) {
//   let data = req.body.data
//   Model4.collectsubjectid(data, function(err, data) {
//     if (err) {
//       console.log(err);
//     } else{
//       res.send(data)
//     }
//   })
// })

router.post("/collect-mtmh", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.collectmtmh(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/collect-mtmh-has-cdrcdio", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.collectmtmhhascdrcdio(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/collect-mucdo-mtmh-has-cdrcdio", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.collectmucdomtmhhascdrcdio(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-cdrmdhd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.addcdrmdhd(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/update-cdrmdhd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.updatecdrmdhd(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-cdrmdhd-from-cdr", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.deletecdrmdhdfromcdr(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-cdrmdhd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model4.deletecdrmdhd(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-teacher-list", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.getTeacherList(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-teacher-list-review", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.getTeacherListReview(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-teacher-review", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.deleteTeacherReview(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-teacher-review", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.addTeacherReview(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-teacher-subject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.getTeacherSubject(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-teacher-review-subject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          Model4.getTeacherReviewSubject(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

//
router.post("/add-data-5", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model5.add(data, function(err) {
            if (err == null) {
              res.end("1");
            } else {
              res.end("0");
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/collect-data-5", function(req, res) {
 
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model5.collect(req.body.data, req.body.ctdt, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              //console.log(data)
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-data-9", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body;
          Model9.add(body, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
/* get data layout 9 */
router.get("/get-data-9/:idSubject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let idSubject = req.params.idSubject;
          Model9.get(idSubject, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-data-6/:idSubject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let idSubject = req.params.idSubject;
          Model6.get(idSubject)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-data-6", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body;
          Model6.add(data, function(err, result) {
            if (err) {
              res.end("0");
            }
            console.log("done");
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-teachingacts-6", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body;
          Model6.addTeachingAct(data, function(err, result) {
            if (err) {
              res.end("-1");
            }
            console.log("done");
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

/* get teaching acts for layout 5+6*/
router.get("/get-teachingacts-6", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model6.getTeachingActs(function(err, result) {
            if (err) {
              res.end("0");
            }
            console.log("done");
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-eval-acts-6/:idSubject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let idSubject = req.params.idSubject;
          Model6.getEvalActs(idSubject, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.get("/get-standard-output-6/:idSubject", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let idSubject = req.params.idSubject;
          Model6.getStandardOutput(idSubject, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-danhgia/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model7.getDanhGia(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-chuandaura/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model7.getChuanDaura(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-danhgia", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body;
          Model7.addDanhGia(body, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-chude", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          Model7.addChuDe(data, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-chude", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model7.getChude(function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/update-chude", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model7.updateChuDe(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-chude-from-danhgia", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model7.deletechudefromdanhgia(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-danhgia", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model7.deletedanhgia(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-chude", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;

          Model7.deleteChuDe(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-danhgia/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model7.getDanhGia(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-cdrdanhgia", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          Model7.getCDRDanhGia(body, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-cdr-7", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          Model7.getCDR(body, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-loaitainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model8.getLoaiTaiNguyen(function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-loaitainguyen1", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model8.getLoaiTaiNguyen1(function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-loaitainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          Model8.addLoaiTaiNguyen(data, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/update-loaitainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model8.updateLoaiTaiNguyen(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-loaitainguyen-from-tainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model8.deleteloaitainguyenfromtainguyen(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-tainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model8.deleteTaiNguyen(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/delete-loaitainguyen", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body.data;
          Model8.deleteLoaiTaiNguyen(data, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-tainguyenmonhoc/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model8.getTaiNguyenMonHoc(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-tainguyenmonhoc1/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model8.getTaiNguyenMonHoc1(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-standardoutput-7/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params;
          Model7.getStandardOutput(id, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end(JSON.stringify(result));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-reality-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          const idCtdt = req.body.idCtdt;

          MatrixModel.getRealityMatrix(data,idCtdt)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/insert-standard-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          const idCtdt = req.body.idCtdt;

          MatrixModel.insertStandardMatrix(data,idCtdt)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-cdr-cdio/:idCtdt", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let idCtdt = req.params.idCtdt;
          MatrixModel.getCdrCDIO(idCtdt)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-standard-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          const idCtdt = req.body.idCtdt;

          MatrixModel.getStandardMatrix(data,idCtdt)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/update-standard-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body;

          MatrixModel.updateStandardMatrix(body, function(err, result) {
            if (err) {
              res.end("0");
            }
            res.end("1");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-benchmark-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          const idCtdt = req.body.idCtdt
          MatrixModel.getBenchmarkMatrix(data,idCtdt)
            .then(result => {
              return res.end(JSON.stringify(result));
            })
            .catch(err => {
              return res.end(JSON.stringify(err));
            });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/save-log", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          LogModel.save(body, result => {
            res.end("done");
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-log", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          LogModel.get(body, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-comment", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          CommentModel.get(result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-comment", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          CommentModel.add(body, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-hdd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body.data;
          DanhMucModel.add(body, result => {
            res.send(JSON.stringify(result.affectedRows));
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.get("/get-danhmuc-hdd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          DanhMucModel.get(result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.post("/delete-hdd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body;
          DanhMucModel.deleteById(body, result => {
            res.end(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.post("/update-hdd", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const body = req.body;
          DanhMucModel.update(body, result => {
            res.end(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-teachingacts-5", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          Model5.collectHDD(result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-evalact-5", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const dataID = req.body.data;
          Model5.collectDG(dataID, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/get-standard-output-5", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const dataID = req.body.data;
          const idCtdt = req.body.idCtdt;
          
          Model5.collectCDR(dataID,idCtdt, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-data-survey/:id", function(req, res) {
  let id = req.params.id;
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          ModelSurvey.collectData(id, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-data-survey", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          const data = req.body.data;
          const id_survey = req.body.id_survey;
          ModelSurvey.addData(data, id_survey, result => {
            //res.send(result)
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.post("/save-survey-qa", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          SurveyQAModel.save(req.body.data, result => {
            console.log(result);
            let response = { id: result };
            res.send(response);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-matrix-survey", function(req, res) {
  // if (req.headers &&
  //     req.headers.authorization &&
  //     req.headers.authorization.split(' ')[0] === 'JWT') {
  //     jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
  //         if (err) {
  //             //res.sendStatus(403);
  //             res.send("Unauthorized user!");
  //         } else {
  //             ModelSurvey.getDataMatixSurvey(result => {
  //                 res.send(result);
  //             });
  //         }
  //     })
  // } else {
  //     res.send("Invalid token!");
  // }
  ModelSurvey.getDataMatixSurvey(result => {
    res.send(result);
  });
});

router.post("/get-survey-itu", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          ModelSurvey.getSurveyITU(req.body.data, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/set-status/:id", function(req, res) {
  let id = req.params.id;
  console.log(id);

  ModelSurvey.setStatus(id, result => {
    res.send(result);
  });
});

router.get("/get-surveyqa/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params.id;
          ModelSurvey.getQA(id, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.get("/get-survey/:id", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id = req.params.id;
          ModelSurvey.getITUwithQA(id, result => {
            res.send(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/add-to-edit-matrix", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let data = req.body;
          let idCtdt = req.body.idCtdt
          MatrixModel.addMatrix(data, idCtdt, result => {
            return res.end(result);
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});

router.post("/authen-me", function(req, res) {
  //let body = JSON.parse(req.body.data);
  access = req.body.access;
  jwt.verify(access, config.jwtSecret, (err, authData) => {
    if (err) {
      let response = {};
      response.status = 401;
      res.send(JSON.stringify(response));
    } else {
      Users.authenMe(authData.username)
        .then(data => {
          console.log(data.data);
          let response = {};
          response.status = 200;
          response.code = data.code;
          response.token = data.access_token;
          response.data = data.data;
          response.message = "login success";
          res.send(JSON.stringify(response));
        })
        .catch(err => {
          throw err;
        });
    }
  });
});

router.get("/get-teacher-with-subject/:id", function(req, res) {
  let id = req.params;
  ModelSurvey.getTeacherWithSubject(id, result => {
    res.send(result);
  });
});

router.post("/add-survey-data", function(req, res) {
  let data = req.body;
  ModelSurvey.addSurveyData(data, result => {
    return res.end(result);
  });
});

router.get("/checkstatus/:id", function(req, res) {
  let data = req.params.id;
  ModelSurvey.checkStatus(data, result => {
    if (result !== "done") {
      res.send(result[0]);
    } else res.send(result);
  });
});

router.post('/add-data-survey', function (req, res) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
            if (err) {
                //res.sendStatus(403);
                res.send("Unauthorized user!");
            } else {
                const data = req.body.data;
                const id_survey = req.body.id_survey
                ModelSurvey.addData(data, id_survey, (result) => {
                    res.send("1");
                });
            }
        })
    } else {
        res.send("Invalid token!");
    }
})
router.post('/save-survey-qa', function (req, res) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
            if (err) {
                //res.sendStatus(403);
                res.send("Unauthorized user!");
            } else {
                SurveyQAModel.save(req.body.data, (result) => {
                    console.log(result)
                    let response = { id: result };
                    res.send(response)
                });
            }
        })
    } else {
        res.send("Invalid token!");
    }
})

router.post('/get-matrix-survey', function (req, res) {
    // if (req.headers &&
    //     req.headers.authorization &&
    //     req.headers.authorization.split(' ')[0] === 'JWT') {
    //     jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
    //         if (err) {
    //             //res.sendStatus(403);
    //             res.send("Unauthorized user!");
    //         } else {
    //             ModelSurvey.getDataMatixSurvey(result => {
    //                 res.send(result);
    //             });
    //         }
    //     })
    // } else {
    //     res.send("Invalid token!");
    // }
    const idSurveyList = req.body.data;
    
    ModelSurvey.getDataMatixSurvey(idSurveyList,(result) => {
        res.send(result);
    });
})

router.post('/get-survey-itu', function (req, res) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
            if (err) {
                //res.sendStatus(403);
                res.send("Unauthorized user!");
            } else {
                ModelSurvey.getSurveyITU(req.body.data, (result) => {
                    res.send(result);
                })
            }
        })
    } else {
        res.send("Invalid token!");
    }
})

router.post('/set-status', function(req, res) {
    let data = req.body.data
    ModelSurvey.setStatus(data, result => {
        res.send(result)
    })
})

router.get('/get-surveyqa/:id', function (req, res) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
            if (err) {
                //res.sendStatus(403);
                res.send("Unauthorized user!");
            } else {
                let id = req.params.id
                ModelSurvey.setStatus(id, result => {
                    res.send(result)
                })
            }
        })
    } else {
        res.send("Invalid token!");
    }   
})

router.get('/get-surveyqa/:id', function (req, res) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.jwtSecret, (err, authData) => {
            if (err) {
                //res.sendStatus(403);
                res.send("Unauthorized user!");
            } else {
                let id = req.params.id
                ModelSurvey.getQA(id, (result) => {
                    res.send(result);
                })
            }
        })
    } else {
        res.send("Invalid token!");
    }
})

router.get("/checkdate/:id", function(req, res) {
  let data = req.params.id;
  ModelSurvey.checkDate(data, result => {
    if (result !== "done") {
      res.send(result[0]);
    } else res.send(result);
  });
});

router.get("/get-all-data-survey", function(req, res) {
  ModelSurvey.getDataSurvey(result => {
    res.send(result);
  });
});

router.post("/get-survey-id", function(req, res) {
  let id = req.body;
  console.log(req.body);
  ModelSurvey.getDataSurvey1(id, result => {
    res.send(result);
  });
});

router.post("/get-survey-ctdt-time", function(req, res) {
  let data = req.body;
  ModelSurvey.getSurveyWithCTDTandTime(data, result => {
    res.send(result);
  });
});

router.post("/get-survey-itu", function(req, res) {
  let data = req.body.data;
  ModelSurvey.getSurveyWithCTDTandTime(data, result => {
    res.send(result);
  });
});
router.post("/add-survey-list", function(req, res) {
  let data = req.body;
  ModelSurvey.addSurveyList(data, result => {
    res.send("1");
  });
});

router.get("/getidqa/:id", function(req, res) {
  let id = req.params.id;
  ModelSurvey.getIDQA(id, result => {
    if (result !== "done") {
      res.send(result[0]);
    } else res.send(result);
  });
});

router.post("/get-survey-ctdt-time2", function(req, res) {
  let data = req.body;
  ModelSurvey.getSurveyWithCTDTandTime2(data, result => {
    res.send(result);
  });
});

router.get("/get-survey-list", function(req, res) {
  ModelSurvey.getSurveyList(result => {
    res.send(result);
  });
});

router.get("/get-survey-with-id-survey-list/:id", function(req, res) {
  let id = req.params;
  ModelSurvey.getSurveyWithIdSurveyList(id, result => {
    res.send(result);
  });
});

router.post("/get-subject-with-id", function(req, res) {
  let listId = req.body;
  ModelSurvey.getSubjectWithId(listId, result => {
    res.send(result);
  });
});

router.post("/get-list-survey", function(req, res) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtSecret,
      (err, authData) => {
        if (err) {
          //res.sendStatus(403);
          res.send("Unauthorized user!");
        } else {
          let id_ctdt = req.body.id_ctdt;
          let id_user = req.body.id_user;

          ModelSurvey.getlistSurvey(id_ctdt, id_user, result => {
            res.end(JSON.stringify(result))
          });
        }
      }
    );
  } else {
    res.send("Invalid token!");
  }
});
router.post('/update-status-survey',function(req,res) {
 
    let currentDate = req.body.data;
    ModelSurvey.updateStatusSurveyList(currentDate, result => {
        res.send(result)
    })
})

router.post('/get-subjectname', function(req, res) {
  let id = req.body.id;
  ModelSurvey.getSubjectName(id, result => {
    if (result !== 'done') {
      res.send(result[0])
    } else res.send(result)
  })
})



module.exports = router;