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
        const dateSearch = new Date(searchTerm);
        const isValidDate = !isNaN(dateSearch.getTime());

        filter = {
          $or: [
            { name: new RegExp(searchTerm, "i") },
            { description: new RegExp(searchTerm, "i") },
            { title: new RegExp(searchTerm, "i") },
            { content: new RegExp(searchTerm, "i") },
            { history: new RegExp(searchTerm, "i") },
            { day: new RegExp(searchTerm, "i") },
            { "week.masses.occasion": new RegExp(searchTerm, "i") },
            { "week.masses.time": new RegExp(searchTerm, "i") },
            { link: new RegExp(searchTerm, "i") },
            { firstReading: new RegExp(searchTerm, "i") },
            { secondReading: new RegExp(searchTerm, "i") },
            { responsorialPsalm: new RegExp(searchTerm, "i") },
            { gospel: new RegExp(searchTerm, "i") },
            { place: new RegExp(searchTerm, "i") },
            { type: new RegExp(searchTerm, "i") },
          ],
        };

        if (isValidDate) {
          const nextDay = new Date(dateSearch);
          nextDay.setDate(nextDay.getDate() + 1);
          filter.$or.push({ "week.masses.date": { $gte: dateSearch, $lt: nextDay } });
        }
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
        await instance.destroy();
        return instance.dataValues;
      }
      return null;
    } else {
      const filter = { _id: id };
      return await this.model.findOneAndDelete(filter);
    }
  }
}

module.exports = Repository;
