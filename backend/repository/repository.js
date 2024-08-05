class Repository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async find(data) {
    let filter;
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (this.model.name === "Student" || this.model.name === "Payment") {
      filter = {};
      return await this.model.findAll({ where: filter });
    } else {
      if (!data) {
        filter = {};
      } else if (isValidEmail(data)) {
        filter = { email: data };
      } else {
        const searchTerm = data;
        filter = {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
            { title: { $regex: searchTerm, $options: "i" } },
            { content: { $regex: searchTerm, $options: "i" } },
            { history: { $regex: searchTerm, $options: "i" } },
            { day: { $regex: searchTerm, $options: "i" } },
            { info: { $regex: searchTerm, $options: "i" } },
            { occasion: { $regex: searchTerm, $options: "i" } },
            { date: { $regex: searchTerm, $options: "i" } },
            { time: { $regex: searchTerm, $options: "i" } },
            { link: { $regex: searchTerm, $options: "i" } },
            { firstReading: { $regex: searchTerm, $options: "i" } },
            { secondReading: { $regex: searchTerm, $options: "i" } },
            { responsorialPsalm: { $regex: searchTerm, $options: "i" } },
            { gospel: { $regex: searchTerm, $options: "i" } },
            { place: { $regex: searchTerm, $options: "i" } },
            { type: { $regex: searchTerm, $options: "i" } },
          ],
        };
      }
      return await this.model.find(filter);
    }
  }

  async findById(filter = {}) {
    if (this.model.name === "Student" || this.model.name === "Payment") {
      return await this.model.findByPk(filter);
    } else {
      return await this.model.findById(filter);
    }
  }

  async findOneAndUpdate(id, data, option = {}) {
    if (this.model.name === "Student" || this.model.name === "Payment") {
      const instance = await this.model.findByPk(id);
      if (instance) {
        return await instance.update(data);
      }
      return null;
    } else {
      if (Object.keys(option).length === 0) {
        option = { new: true };
      }
      const filter = { _id: id };
      return await this.model.findOneAndUpdate(filter, data, option);
    }
  }

  async findOneAndDelete(id) {
    if (this.model.name === "Student" || this.model.name === "Payment") {
      const instance = await this.model.findByPk(id);
      if (instance) {
        return await instance.destroy();
      }
      return null;
    } else {
      const filter = { _id: id };
      return await this.model.findOneAndDelete(filter);
    }
  }
}

module.exports = Repository;
