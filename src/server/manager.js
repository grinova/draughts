class Manager {
  constructor(creator) {
    this.creator = creator

    this.objects = {}
  }

  async get(id, meta) {
    return this.objects[id] = this.objects[id] || await this.creator(id, meta)
  }

  // remove(id) {
  //   delete this.objects[id]
  // }
}

module.exports = Manager
