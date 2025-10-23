const fs = require("fs");
const teachersArray = require("./src/components/db/teachers-array.json");

const teachersObject = Object.fromEntries(
  teachersArray.map((teacher, index) => [`teacher${index + 1}`, teacher])
);

fs.writeFileSync("teachers.json", JSON.stringify(teachersObject, null, 2));
console.log("✅ teachers.json створено");
