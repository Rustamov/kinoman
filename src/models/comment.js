export default class Comment {
  constructor(data) {
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
    this.id = data[`id`];
  }

  toRAW() {
    return {
      "author": this.author,
      "comment": this.comment,
      "date": this.date,
      "emotion": this.emotion,
      "id": this.id,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}
