export class Goal {
  constructor(contents) {
    if (!contents) {
      throw new Error("Cannot create a goal without contents");
    }

    this.contents = contents;
    this.accomplishments = [];
  }

  get() {
    return this.contents;
  }

  equals(object) {
    function contains(accomplishments, accomplishment) {
        let containsAccomplishment = false;
        for (let i = 0; i < accomplishments.length; i++) {
            if (accomplishment.equals(accomplishments[i])) {
                containsAccomplishment = true;
                break;
            }
        }

        return containsAccomplishment;
    }

    let accomplishmentsEquivalent =
      object.accomplishments.length === this.accomplishments.length;

    if (accomplishmentsEquivalent) {
      for (let i = 0; i < this.accomplishments.length; i++) {
        accomplishmentsEquivalent = contains(
          object.accomplishments,
          this.accomplishments[i]
        );

        if (!accomplishmentsEquivalent) {
          break;
        }
      }
    }

    const contentsEquivalent = object.contents === this.contents;
    return contentsEquivalent && accomplishmentsEquivalent;
  }

  copy() {
    const copy = new Goal(this.contents);
    for (let i = 0; i < this.accomplishments.length; i++) {
      copy.associate(this.accomplishments[i].copy());
    }

    return copy;
  }

  associate(accomplishment) {
    if (!accomplishment) {
      throw new Error("Cannot associate a falsy accomplishment");
    }

    this.accomplishments.push(accomplishment.copy());
  }

  getAssociatedAccomplishments() {
    const copied = [];
    for (let i = 0; i < this.accomplishments.length; i++) {
      copied.push(this.accomplishments[i].copy());
    }
    return copied;
  }
}
