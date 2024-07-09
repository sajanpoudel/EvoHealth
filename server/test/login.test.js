import { beforeEach, describe, it } from "node:test"
import assert from "node:assert/strict"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { fakeResponse, mockUserModel } from "./helpers.js"

process.env.JWT_SECRET = "test-secret"

const users = []
mockUserModel(users)
const { default: AuthController } = await import("../controllers/authController.js")

beforeEach(() => {
  users.length = 0
})

async function register(email, password) {
  await AuthController.userRegistration({ body: { username: "ada", email, password } }, fakeResponse())
}

describe("userLogin", () => {
  it("needs both an email and a password", async () => {
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "a@b.c" } }, res)
    assert.equal(res.statusCode, 400)
  })

  it("tells unknown users to register", async () => {
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "nobody@x.io", password: "pw" } }, res)
    assert.equal(res.body.message, "Email not registered!")
  })

  it("rejects a wrong password", async () => {
    await register("ada@x.io", "right")
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "ada@x.io", password: "wrong" } }, res)
    assert.equal(res.body.message, "Password incorrect")
  })

  it("returns a token and the user name", async () => {
    await register("ada@x.io", "right")
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "ada@x.io", password: "right" } }, res)
    assert.equal(res.statusCode, 200)
    assert.ok(res.body.token)
    assert.equal(res.body.name, "ada")
  })

  it("signs the token with the user id", async () => {
    await register("ada@x.io", "right")
    const res = fakeResponse()
    await AuthController.userLogin({ body: { email: "ada@x.io", password: "right" } }, res)
    assert.equal(jwt.verify(res.body.token, "test-secret").userID, users[0]._id)
  })
})
