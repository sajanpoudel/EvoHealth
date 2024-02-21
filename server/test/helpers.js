import { mock } from "node:test"

// A response object that records the status and the body that a controller sends.
export function fakeResponse() {
  const res = { statusCode: 200, body: undefined }
  res.status = (code) => {
    res.statusCode = code
    return res
  }
  res.json = (payload) => {
    res.body = payload
    return res
  }
  return res
}

// Replaces the user model with an in memory fake and returns the fake.
export function mockUserModel(users = []) {
  // Mongoose models can be called with or without new, so the fake works both ways.
  function FakeUser(data) {
    if (!(this instanceof FakeUser)) return new FakeUser(data)
    Object.assign(this, data)
    this._id = `id-${users.length + 1}`
  }
  FakeUser.prototype.save = async function () {
    users.push(this)
    return this
  }
  FakeUser.findOne = async ({ email }) => users.find((u) => u.email === email) || null
  FakeUser.findById = (id) => {
    const found = users.find((u) => u._id === id) || null
    return { select: async () => (found ? { _id: found._id, username: found.username, email: found.email } : null) }
  }
  mock.module(new URL("../models/authModel.js", import.meta.url).href, { defaultExport: FakeUser })
  return { FakeUser, users }
}
