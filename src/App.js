import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/Auth.js";
import AdminLayout from "./views/admin";
import StudentLayout from "./views/student";
import TeacherLayout from "./views/teacher";

const App = () => {
  // const dispatch = useDispatch();
  // dispatch({
  //   type: constants.action.action_user_login,
  //   value: dataCache.read("", "access"),
  // });

  return (
    <>
      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        autoClose={5000}
      ></ToastContainer>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route
            path="/teacher"
            render={(props) => <TeacherLayout {...props} />}
          />
          <Route
            path="/student"
            render={(props) => <StudentLayout {...props} />}
          />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
