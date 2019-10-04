class Manager {
  constructor(creator) {
    this.creator = creator

    this.objects = {}
  }

  async get(id) {
    return this.objects[id] = this.objects[id] ||
      await this.creator(id, () => this.remove(id))
  }

  remove(id) {
    delete this.objects[id]
  }
}

module.exports = Manager
