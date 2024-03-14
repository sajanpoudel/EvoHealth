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

describe("userRegistration", () => {
  it("asks for a username", async () => {
    const res = fakeResponse()
    await AuthController.userRegistration({ body: { email: "a@b.c", password: "pw" } }, res)
    assert.equal(res.statusCode, 400)
    assert.equal(res.body.message, "No username.")
  })

  it("asks for an email", async () => {
    const res = fakeResponse()
    await AuthController.userRegistration({ body: { username: "ada", password: "pw" } }, res)
    assert.equal(res.body.message, "No email.")
  })

  it("asks for a password", async () => {
    const res = fakeResponse()
    await AuthController.userRegistration({ body: { username: "ada", email: "a@b.c" } }, res)
    assert.equal(res.body.message, "No password.")
  })

  it("registers a new user", async () => {
    const res = fakeResponse()
    await AuthController.userRegistration({ body: { username: "ada", email: "ada@x.io", password: "pw" } }, res)
    assert.equal(res.statusCode, 200)
    assert.equal(users.length, 1)
  })

  it("stores a hash instead of the password", async () => {
    await register("ada@x.io", "secret")
    assert.notEqual(users[0].password, "secret")
    assert.ok(await bcryptjs.compare("secret", users[0].password))
  })

  it("refuses an email that is already registered", async () => {
    await register("ada@x.io", "pw")
    const res = fakeResponse()
    await AuthController.userRegistration({ body: { username: "ada", email: "ada@x.io", password: "pw" } }, res)
    assert.equal(res.statusCode, 400)
    assert.equal(users.length, 1)
  })
})
