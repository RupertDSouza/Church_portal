const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  admissionClass: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherTongue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  anyOtherLanguage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  noOfBrothers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  noOfSisters: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cityVillageTown: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taluk: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  religion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  caste: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  socialCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  belongToBPL: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  bplCardNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  satsNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ifscCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fatherAadharNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherAadharNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fatherQualification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherQualification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fatherOccupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherOccupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  annualIncome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  noOfDependents: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fatherPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  motherPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  previousSchoolAffiliation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transferCertificateNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transferCertificateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  previousSchoolName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pincodeOfPreviousSchool: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diseNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  previousSchoolDistrict: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  previousSchoolTaluk: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  previousSchoolVillageCityTown: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Student;
