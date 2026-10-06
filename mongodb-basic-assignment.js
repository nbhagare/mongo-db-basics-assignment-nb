db.employees.insertMany([
  {
    "_id": "EMP001",
    "name": "John",
    "department": "Engineering",
    "experience": 4,
    "skills": ["Java", "Spring Boot"],
    "active": true,
    "address": { "city": "Pune", "country": "India" }
  },
  {
    "_id": "EMP002",
    "name": "Alice",
    "department": "HR",
    "experience": 3,
    "skills": ["Recruitment", "Communication"],
    "active": true,
    "address": { "city": "Mumbai", "country": "India" }
  },
  {
    "_id": "EMP003",
    "name": "David",
    "department": "Engineering",
    "experience": 6,
    "skills": ["Java", "MongoDB"],
    "active": true,
    "address": { "city": "Bengaluru", "country": "India" }
  },
  {
    "_id": "EMP004",
    "name": "Emma",
    "department": "Finance",
    "experience": 2,
    "skills": ["Accounting", "Excel"],
    "active": false,
    "address": { "city": "Pune", "country": "India" }
  },
  {
    "_id": "EMP005",
    "name": "Robert",
    "department": "Engineering",
    "experience": 5,
    "skills": ["Java", "Docker"],
    "active": true,
    "address": { "city": "Delhi", "country": "India" }
  }
])


// 2.1 Engineering Employees - Retrieve employees whose department is Engineering. Return only: _id, name,experience
db.employees.find({ department: "Engineering" }, { name: 1, experience: 1, _id: 1 }).sort({ name: 1 })

// 2.2 Employees with 5 or More Years of Experience - Retrieve employees whose experience is greater than or equal to 5. Return only: name, experience
db.employees.find({ experience: { $gte: 5 } },  { name: 1, experience: 1, _id: 0 })

// 2.3 Nested Document Query Retrieve employees whose address city is Pune .
// Return only the employee name and city and sort by name.
db.employees.find({ "address.city": "Pune" }, { name: 1, "address.city": 1, _id: 0 }).sort({ name: 1 })

// 2.4 Array Query Using $in , retrieve employees whose skills contain either: MongoDB or Spring Boot and sort the
// result by name in ascending order.
db.employees.find({ skills: { $in: ["MongoDB", "Spring Boot"] } }).sort({ name: 1 })

// 2.5 Sorting and Limiting Retrieve the top 2 employees with the highest experience. Return: name, experience
db.employees.find({}, { name: 1, experience: 1, _id: 0 }).sort({ experience: -1 }).limit(2)


// 3.1 $inc Increase Alice's experience by 1.
db.employees.updateOne({ _id: "EMP002" }, { $inc: { experience: 1 } })
db.employees.find({ _id: "EMP002" }, { name: 1, experience: 1 })

// 3.2 $set Change Emma's active value from: false to true
db.employees.updateOne( { name: "Emma" },{ $set: { active: true } })
db.employees.find({ name: "Emma" })

// 3.3 $addToSet Add MongoDB to Robert's skills array using $addToSet .
db.employees.updateOne({ name: "Robert" }, { $addToSet: { skills: "MongoDB" } })
db.employees.updateOne({ name: "Robert" }, { $addToSet: { skills: "MongoDB" } })
db.employees.find({ name: "Robert" })

// Task 4: Delete Operation
// Insert the following temporary document:
db.employees.insertOne({ _id: "EMP999", "name": "Temporary Employee", "department": "Training", "experience": 0 })
db.employees.findOne({ _id: "EMP999" })
// Delete only this document using deleteOne() .
db.employees.deleteOne({ _id: "EMP999" })
// Verify that:
// db.employees.findOne({ _id: "EMP999" })
// returns: null
db.employees.findOne({ _id: "EMP999" })


// 5.1 Check Existing Indexes
// Check the indexes available on the employees collection before creating any additional index.
// Identify the automatically created MongoDB index.
db.employees.getIndexes()
db.employees.createIndex({ department: 1 })
db.employees.getIndexes()


// 6.1 Employees per Department
// Use an aggregation pipeline to count the number of employees in each department.
// Sort the result by department name.
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      totalEmployees: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])



// 6.2 Average Experience per Department
// Calculate the average employee experience for each department. Sort the result by department name in
// ascending order.
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      averageExperience: { $avg: "$experience" }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

// 6.3 Top Engineering Employees
// Using an aggregation pipeline:
// 1. Select only Engineering employees.
// 2. 4. 5. Return only name and experience .
// 3. Exclude _id .
// Sort experience in descending order.
// Return only the top 2 employees
db.employees.aggregate([
  {
    $match: { department: "Engineering" }
  },
  {
    $sort: { experience: -1 }
  },
  {
    $limit: 2
  },
  {
    $project: {
      name: 1,
      experience: 1,
      _id: 0
    }
  }
])
