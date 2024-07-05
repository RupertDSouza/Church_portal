const Manage = require("../models/manageModel");

class Repository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async save(data) {
    await this.model.save(data);
  }

  async find(filter = {}) {
    return await this.model.find(filter);
  }

  async findById(filter = {}) {
    return await this.model.findById(filter);
  }

  async findOneAndUpdate(id, data) {
    const filter = { _id: id };
    return await this.model.findOneAndUpdate(filter, data, { new: true });
  }

  async deleteOne(id) {
    const filter = { _id: id };
    return await this.model.deleteOne(filter);
  }
}

module.exports = Repository;
