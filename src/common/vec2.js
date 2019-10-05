class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vec2) {
    return new Vec2(this.x + vec2.x, this.y + vec2.y)
  }

  sub(vec2) {
    return new Vec2(this.x - vec2.x, this.y - vec2.y)
  }

  div(v) {
    return new Vec2(this.x / v, this.y / v)
  }

  sign() {
    return new Vec2(Math.sign(this.x), Math.sign(this.y))
  }

  length() {
    return this.x * this.x + this.y + this.y
  }

  equal(vec2) {
    return this.x == vec2.x && this.y == vec2.y
  }

  notEqual(vec2) {
    return this.x != vec2.x || this.y != vec2.y
  }
}

module.exports = Vec2
