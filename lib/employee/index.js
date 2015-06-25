'use strict'

import jsonBody from 'body/json'
import { fail, jsonfy } from '../utils/helpers'
import Employee from './model'

class EmployeeController {

  // --  GET /employees --------------------------------------------------------

  getAll(req, res) {

    Employee
      .find({}, 'fullName picture')
      .then((employees) => {
        res.statusCode = 200
        res.end(jsonfy('OK', employees))
      })
      .catch((err) => fail(err, res))
  }

  // -- GET /employees/:employeId ----------------------------------------------

  get(req, res) {
    let employeeId = this.employeeId

    Employee
      .findById(employeeId)
      .then((employee) => {
        res.statusCode = 200
        res.end(jsonfy('OK', employee))
      })
      .catch((err) => fail(err, res))
  }

  // -- POST /employees --------------------------------------------------------

  save(req, res) {

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)

      Employee
        .create(body)
        .then((employee) => {
          res.statusCode = 201
          res.end(jsonfy('OK', employee))
        })
        .catch((err) => fail(err, res))
    })
  }

  // -- DELETE /employees/:employeeId ------------------------------------------

  remove(req, res, next) {
    let employeeId = this.employeeId
    if (!employeeId) return next()

    Employee
      .findOneAndRemove({ _id: employeeId })
      .then(() => {
        res.statusCode = 204
        res.end(jsonfy(`Employee ${employeeId} deleted succesfully`))
      })
      .catch((err) => fail(err, res))
  }

  // -- PUT /employees/:employeeId ---------------------------------------------

  update(req, res) {
    let employeeId = this.employeeId
    if (!employeeId) return next()

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)
      let updatedEmployee = body

      Employee
        .findOneAndUpdate({ _id: employeeId }, updatedEmployee)
        .then((employee) => {
          res.statusCode = 200
          res.end(jsonfy(`Employee ${employeeId} updated succesfully`, employee))
        })
        .catch((err) => fail(err, res))
    })
  }
}

export default EmployeeController