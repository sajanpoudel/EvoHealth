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
})
