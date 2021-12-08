import { combineReducers } from "redux";
import program from "./program";
import course from "./course";
import coursePlan from "./course/plan";
import courseStudying from "./course/studying";
import courseDone from "./course/done";
import subject from "./subject";
import place from "./place";
import facility from "./facility";
import result from "./result";
import schedule from "./schedule";
import points from "./points";
import user from "./user";

import auth from "./auth";

export default combineReducers({
  program,
  course,
  coursePlan,
  courseStudying,
  courseDone,
  points,

  subject,
  place,
  facility,
  result,
  schedule,
  user,

  auth,
});
